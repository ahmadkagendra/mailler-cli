import log from "../utils/log-display.mjs";

import readerConfiguration from "../utils/reader-configuration.mjs";
import writeConfiguration from "../utils/write-configuration.mjs";
import addTarget from "../utils/add-target.mjs";
import removeTarget from "../utils/remove-target.mjs";

import { closeCommandState ,setTargetState } from "../app.mjs";
import displayHelp from "../utils/display-help.mjs";

export default async function (line , targetState  , readlineInterface) {
    const linePurify = line.replaceAll(' ', '')
    if (targetState != 'none') {
        if (linePurify == 'close') {
            log.execute(`close ${targetState} state\n`);
            setTargetState('none');
        }else if (linePurify == 'help') {
            log.info('help is not available in this state, type close to exit the state\n');
        }else {
            switch (targetState) {
                case 'add' : {
                    await addTarget(linePurify , readlineInterface);
                    break;
                };
                case 'remove' : {
                    await removeTarget(linePurify , readlineInterface)
                    break;
                }
            }
        }
        return
    }
    switch (line) {
        case 'command -status' : {
            log.info(`command state : ${commandState}\n`);
            break
        }
        case 'help' : {
            displayHelp('target')
            break
        }
        case 'add' : {
            log.info("Enter the target email in the format @gmail.com");
            log.info('type close to exit the add target session\n')
            setTargetState('add')
            break
        }
        case 'remove' : {
            const configurationData = await readerConfiguration(readlineInterface)
            setTargetState('remove');
            configurationData.target.forEach((target , index) => {
                log.reply(`${index} : ${target}`);
            })
            log.info("enter the index target for remove target");
            log.info('type close to exit the remove target session\n')
            break
        }
        case 'remove -all' : {
            const configurationData = await readerConfiguration(readlineInterface)
            const resultWrite = await writeConfiguration(configurationData , {target : []});
            if (!resultWrite) {
                log.error(resultWrite.message + '\n');
                break
            }
            log.success("remove all configuration successfully");
            log.success(resultWrite.message + '\n');
            break;
        }
        case 'show' : {
            const configurationData = await readerConfiguration(readlineInterface)
            if (configurationData.target.length == 0) {
                return log.reply('no targets added\n')
            }
            configurationData.target.forEach((target , index) => {
                log.reply(`${index} : ${target}`);
            });
            console.log('\n')
            break;

        } 
        case 'close' : {
            log.execute('exit the target command\n');
            closeCommandState()
            break;
        }
        default : log.error("type help to display the target commands that can be used\n")
    }   
    
    return
}