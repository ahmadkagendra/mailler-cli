import * as fs from 'node:fs/promises';
import process from 'node:process';

const configurationPath = `${process.cwd()}/app.config.json`

export default async function (defaultData , {email = false , password = false , target = false}) {
    const fields = [email , password , target];
    const keys = ['email' , 'password' , 'target']
    const stringWrite = {}

    fields.forEach((field , index) => {
        if (!field) {
            stringWrite[keys[index]] = defaultData[keys[index]];
        }else {
            stringWrite[keys[index]] = field;
        };
    })

    const result = await fs.writeFile(configurationPath , JSON.stringify(stringWrite) , {encoding : 'utf8'})
        .then(() => {
            return {
                message : "apply configuration successfully",
                status : true
            }
        }).catch (error => {
            return {
                message : "apply configuration failed",
                status : false
            }
        })
    return result
}

// y ({password : "kontol"})