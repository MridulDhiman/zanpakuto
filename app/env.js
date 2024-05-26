

'use strict';

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';


export async function getDependencyVersions() {

    const currentFileName = fileURLToPath(import.meta.url);
    const versions = JSON.parse((await fs.promises.readFile(path.join(currentFileName, '..', 'dependencyVersions', 'package.json'))).toString()).dependencies;
    return versions;
}
