import help from "../command-flow/help.mjs"
import log from "./log-display.mjs"

export default function (commandState) {
    const helpList = help[commandState]
    const keysHelpList = Object.keys(helpList)
    keysHelpList.forEach((help , index) => {
        log.info(`${help} : ${helpList[help]} `)
    })
    console.log('\n');
    return
}