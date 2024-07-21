import validator from "validator";

import log from "./log-display.mjs";

import readerConfiguration from "./reader-configuration.mjs";
import writeConfiguration from "./write-configuration.mjs";


export default async function (line , readlineInterface) {
    const configurationData = await readerConfiguration(readlineInterface)
    const validation = validator.isNumeric(line , {no_symbols : true});
    if (!validation || Number(line) >= configurationData.target.length) {
        return log.error("please enter valid number index\n");
    }

    const newTarget = [] 
    configurationData.target.forEach((target , index) => {
        if (index != line) {
            newTarget.push(target);
        }
    })
    const resultWrite = await writeConfiguration(configurationData , {target : newTarget});
    if (!resultWrite) {
        log.error(resultWrite.message + '\n');
        return
    }
    log.success('remove target successfully\n');
    
}