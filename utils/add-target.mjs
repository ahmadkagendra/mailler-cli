import validator from "validator";

import readerConfiguration from "./reader-configuration.mjs";
import writeConfiguration from "./write-configuration.mjs";
import log from './log-display.mjs'

export default async function (target , readlineInterface) {
    const configuration = await readerConfiguration(readlineInterface)
    const newTargetConfiguration = [...configuration.target];
    
    if (validator.isEmail(target)) {
        if (newTargetConfiguration.includes(target)) {
            return log.error('the target email has been registered');
        }
        newTargetConfiguration.push(target);
        const writeStatus = await writeConfiguration(configuration , {
            target : newTargetConfiguration
        })
        if (writeStatus.status) {
            log.success('target added successfully\n');
            return
        }
        log.error(writeStatus.message)
        return log.error('target added failed\n');
    }
    return log.error('please enter target data with the correct email format\n')

    
}