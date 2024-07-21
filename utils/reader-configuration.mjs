import * as fs from 'node:fs/promises';
import process from 'node:process';

import log from './log-display.mjs'

export default async function (readlineInterface) {
    const relativePath = process.cwd();

    const read = await fs.readFile(`${relativePath}/app.config.json` , {encoding : 'utf8'})
        .catch(error => {
            log.error(error + '\n')
            readlineInterface.close()
            return process.exit()
        });
        
    return JSON.parse(read);
}