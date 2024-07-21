import process from 'node:process'

import applyConfiguration from '../utils/apply-configuration.mjs';
import writeConfiguration from '../utils/write-configuration.mjs';
import readerConfiguration from '../utils/reader-configuration.mjs';

import log from '../utils/log-display.mjs'


import { closeCommandState } from '../app.mjs';
import displayHelp from '../utils/display-help.mjs';


export default async function (line , readlineInterface , commandState) {
    switch (line) {
        case 'command -status' : {
            log.info(`command state : ${commandState}\n`);
            break;
        }
        case 'help' : {
            displayHelp('configuration');
            break;
        }
        case 'reset' : {
            const reader = await readerConfiguration(readlineInterface);
            const resultWrite = await writeConfiguration(reader , {
                email : 'undefined',
                password : 'undefined'
            });
            if (!resultWrite) {
                log.error(resultWrite.message);
                log.error("pleaser re-run program\n")
                readlineInterface.close()
                return process.exit()
            }
            log.success('reset configuration successfully');
            log.success(resultWrite.message+`\n`);
            break;
        }
        case 'show' : {
            const reader = await readerConfiguration(readlineInterface);
            const keys = ['email' , 'password'];
            keys.forEach(key => {
                log.reply(`${key} : ${reader[`${key}`]}`)
            })
            console.log('\n');
            break;
        }
        case 'update' : {
            const reader = await readerConfiguration(readerConfiguration);
            await applyConfiguration(reader , readlineInterface , false)
            break;
        }
        case 'close' : {
            log.execute('exit the configuration command\n');
            closeCommandState()
            break;
        }
        default : log.error("type help to display the configuration commands that can be used \n")
    }
    return
}