import * as readline from 'node:readline/promises';
import process from 'node:process';
//UTILS
import readerConfiguration from './utils/reader-configuration.mjs';
import applyConfiguration from './utils/apply-configuration.mjs';
import displayHelp from './utils/display-help.mjs';
import log from './utils/log-display.mjs'
//COMMAND FLOWS
import wellcomeLog from './command-flow/wellcome-log.mjs';
import configurationFlow from './command-flow/configuration-flow.mjs';
import targetFlow from './command-flow/target-flow.mjs';
import sendmail from './command-flow/sendmail.mjs';


const readlineInterface = readline.createInterface({
    input  : process.stdin, 
    output : process.stdout,
    historySize : 2,
    prompt : `< MAILER > `
});

await wellcomeLog()

const checking = await readerConfiguration(readlineInterface)
const {email , password} = checking;

if (email == 'undefined' || password == 'undefined') {
    await applyConfiguration(checking , readlineInterface , true);
}

let commandState = 'main';
let targetState = 'none';

export function setTargetState (value) {
    targetState = value
}
export function closeCommandState () {
    commandState = 'main'
} 

readlineInterface.prompt()
readlineInterface.on('line' , async function (line) {
    if (commandState == 'main') {
        switch (line) {
            case 'command -status' : {
                log.info(`command state : ${commandState}\n`);
                break
            }
            case 'help' : {
                displayHelp('main')
                break;
            }
            case 'configuration' : {
                commandState = 'configuration'
                log.execute("changed the command to configuration\n")
                break;
            }
            case 'target' : {
                commandState = 'target'
                log.execute("changed the command to target state\n")
                break;
            }
            case 'sendmail' : {
                await sendmail(readlineInterface)
                break;
            }
            default : log.error("type help to display the commands that can be used\n");
        }
    }else if (commandState == 'target') {
        await targetFlow(line , targetState , commandState);
     }
    else if (commandState == 'configuration') {
        await configurationFlow(line , readlineInterface , commandState);
    }
    readlineInterface.prompt();
})




