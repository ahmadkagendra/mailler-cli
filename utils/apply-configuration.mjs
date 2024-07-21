import process from 'node:process'
import validator from 'validator';

import log from './log-display.mjs'; 
import writeConfiguration from './write-configuration.mjs';

export default async function applyConfiguration (defaultData , readlineInterface , recursive) {

    log.info("please enter gmail configuration");
    const email = await readlineInterface.question("email : ");
    const password = await readlineInterface.question("password : ");

    if (!validator.isEmail(email)) {
        log.error("please enter you valid email :)\n");
        if (!recursive) return
        return applyConfiguration (defaultData , readlineInterface , recursive)
    }
    const result = await writeConfiguration(defaultData , {email , password});
    if (!result) {
        log.error(result.message);
        log.error("pleaser re-run program\n")
        readlineInterface.close()
        return process.exit()
    }
    log.success(result.message+`\n`);
}