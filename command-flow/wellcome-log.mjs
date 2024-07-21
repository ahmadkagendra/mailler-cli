import chalk from "chalk"
import delay from "../utils/delay.mjs";

const log = console.log;

export default async function () {
    log(chalk.yellowBright.bold("\nWELLCOME TO MAILLER CLI"));
    await delay(100);
    log(chalk.whiteBright.bold("Created by ") + chalk.blueBright.underline.bold("ahmad kagendra"));
    await delay(100);
    log(chalk.whiteBright.bold("\ntype the " + chalk.bgRed.whiteBright.bold(" help ") +" to display the commands that can be used"));
    await delay(100);
    log(chalk.whiteBright.bold("type the " + chalk.bgWhiteBright.black.bold(" command -status ") +" to find out where your status is\n"));
    await delay(100);
    log(chalk.whiteBright.bold("documentation : " + chalk.blueBright.underline.bold("https://www.npmjs.com/package/chalk \n")));
    await delay(100);
};

