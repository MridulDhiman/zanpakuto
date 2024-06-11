import { kebabCase } from "lodash-es";

export const slugGenerator = (stre) => {
  const slugs = [];
  let str = "";
  for (let i = 0; i < stre.length; i++) {
    let curr = stre[i];
    str += curr.trim();

    if (curr === "[") {
      str = "";
      continue;
    }

    if (curr === "]") {
      str = str.slice(0, str.length - 1);
      slugs.push(kebabCase(str));
      str = "";
      continue;
    }
  }

  return slugs;
};


export const convertSlugsArrayToInterfaceTypes = (slugs) => {

    slugs = slugs.map((slug) => {
        return `${slug} : string;`
    });

    return slugs.join("\n");
}


