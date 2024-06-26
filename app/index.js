"use strict";
import Generator from "yeoman-generator";
import path from "path";

import { fileURLToPath } from "url";
import { camelCase } from "lodash-es";
import { globSync } from "glob";
import { readFileSync } from "fs";
import { getDependencyVersions } from "./env.js";
import { convertSlugsArrayToInterfaceTypes, idToTypeMap, slugGenerator } from "./utils/index.js";
import { globalPromptConfig } from "./prompt-configuration.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let paths = [];

/**
 * 
 * @param {string} path 
 * @returns string
 */
const defaultRouteNameSetter = (path) => {
let startIndex = 1;
let endIndex = path.length;
  if(path.endsWith("/")) {
    endIndex--;
  }

const intermediateStep =  path.slice(startIndex, endIndex);
let defaultName = intermediateStep.toLowerCase();
defaultName[0].toUpperCase();
return defaultName;
}

const helperMappingFxn = (routes, parent = "") => {
  for (let route of routes) {
    if (route.children) {
      helperMappingFxn(route.children, route.path);
    } else {
      paths.push({
        path: path.join(parent, route.path),
        name: route.name ?? defaultRouteNameSetter(route.path),
      });
      return;
    }
  }
};

const mappingConfigToPath = (data) => {
  const routes = data.routes;

  if (routes.length === 0) return [];
  helperMappingFxn(routes, "");
  return paths;
};

export default class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.options = opts;
    this.description = "Generates templates from CLI";
    this.option("template", {
      alias: "t",
      type: Boolean,
      description: "Forge templates using zanpakuto",
    });
    this.option("utility", {
      alias: "u",
      type: Boolean,
      description: "Utilities using zanpakuto",
    });
    this.env.options.nodePackageManager = "npm";
    this.options.defaultPrompt = "template";
  }

  async initializing() {
    const versions = await getDependencyVersions();

    this.options.dep = (depName) => {
      const version = versions[depName];
      `${JSON.stringify(depName)} : ${JSON.stringify(version)}`;
    };
  }

  async prompting() {
    await globalPromptConfig.eval();
    const answers =  globalPromptConfig.getAnswers();
    this.options = {
      ...this.options,
      ...answers
    }
  }

  writing() {
    if (this.options.promptType === "template") {
      if (this.options.confirm === false) {
        this.destinationRoot(this.options.dirname);
        this.appname = this.options.dirname;
      }

      this.log();
      this.log(`Writing in ${this.destinationPath()}...`);
      this.sourceRoot(path.join(__dirname, "templates", this.options.type));

      globSync("**", {
        cwd: this.sourceRoot(),
      }).map((file) =>
        this.fs.copyTpl(this.templatePath(file), this.destinationPath(file), {
          name: this.options.dirname,
        })
      );
    } else {
      this.env.options.skipInstall = true;
      const routesConfigFile = this.options.routesFileName;

      const out = readFileSync(this.destinationPath(routesConfigFile));
      const data = JSON.parse(out);

      const paths = mappingConfigToPath(data);

      const hasTs = this.options.hasTs;
      const hasSrcDirectory = this.options.hasSrcDirectory;

      let sourceFile = hasTs ? "page.tsx" : "page.jsx";

      this.sourceRoot(path.join(__dirname, "templates", "nextjs-app-router"));

      const rootRoute = hasSrcDirectory ? "src/app" : "app";

      this.log("Paths: ", paths);

      let isDynamicRoute = false;
      let isApiRoute = false;
      if (paths.length > 0)
        paths.forEach((p) => {
          let temp = p.path.trim();

          if (temp.startsWith("/api")) {
            isApiRoute = true;
            sourceFile = hasTs ? "route.ts" : "route.js";
          }

        let slugs = slugGenerator(temp);
        if(slugs.length > 0 && !slugs.includes("")) {
               isDynamicRoute = true;
        }

          let dynamicTemplateFile = hasTs
            ? "page-dynamic.tsx"
            : "page-dynamic.jsx";


          let isDynamicFile = !isDynamicRoute || isApiRoute;
          let templateFile =
            isDynamicFile ? sourceFile : dynamicTemplateFile;
          
            let pathName = camelCase(p.name.trim());
          let data = {
            "name": pathName,
            "defaultName": p.name.trim()
          }

          if(slugs) {
            data["slugs"] = convertSlugsArrayToInterfaceTypes(slugs)
          }
          

          this.fs.copyTpl(
            this.templatePath(templateFile),
            this.destinationPath(path.join(rootRoute, p.path, sourceFile)),
            data
          );
        });
    }
  }

  install() {
    if (this.options.promptType === "template") {
      this.log.info("Installing npm packages...");
      this.spawnSync("cd", [this.destinationPath()]);
      this.spawnSync("npm", ["install"]);
    }
  }

  end() {
    if (this.options.promptType === "template") {
      this.log("npm packages has been installed");
      this.log("Template has been generated successfully...");
    } else {
      this.log(
        "Success: next.js app router routes have been added Successfully..."
      );
    }
  }
}
