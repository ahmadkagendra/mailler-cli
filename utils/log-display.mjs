
import chalk from "chalk"

const log = console.log;
export default {
    info,
    error,
    execute,
    success,
    reply
}

function info (text) {
    log(chalk.blueBright(`[info] ${text}`));    
};

function error (text) {
    log(chalk.red(`[error] ${text}`))
}
function execute (text) {
    log(chalk.yellow(`[execute] ${text}`))
}

function success (text) {
    log(chalk.greenBright(`[success] ${text}`))
}

function reply (text) {
    log(chalk.white(`[reply] ${text}`))
}
