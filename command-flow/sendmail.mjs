
import { ThrowMail } from "../tools/thrower.mail.mjs";
import readerConfiguration from "../utils/reader-configuration.mjs";

import log from "../utils/log-display.mjs";

export default async function (readlineInterface) {
    const configuration = await readerConfiguration(readlineInterface);
    const validationGmail = configuration.email == 'undefined' || configuration.password == 'undefined' 
    if (validationGmail || configuration.target.length == 0) {
        return log.error("apply valid configuration and target first\n");
    };
    const subject = await readlineInterface.question("Add subject : ");
    const textContent = await readlineInterface.question("Add mail content : ");

    const sendMail = new ThrowMail({
        email : configuration.email,
        password : configuration.password,
        emailTarget : configuration.target,
    })

    const sender = sendMail.mailContent({
        subject : subject,
        text : textContent
    }).send()

    await sender.then(response => console.log(response))
        .catch(error => console.log(error));

}