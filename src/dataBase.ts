import mysql from 'mysql'

let dataBaseConnection: mysql.Connection

export const db = () => dataBaseConnection

class QueryOptions {
    forceArray?: boolean
    skipObjectIfSingleResult?: boolean;
}

/**
 * @author Daniel Grigore
 */
export const query = (sql: string, args?: any, opts?: QueryOptions) => 
    new Promise(async (resolve,reject) => {
        let result = dataBaseConnection.query(sql, Array.isArray(args) ? args : [args], (e, res: any[]) => {
            if (!opts) {
                opts = new QueryOptions()
                opts.forceArray = false
                opts.skipObjectIfSingleResult = true
            }

            if (e) {
                return reject(e)
            }

            let output: any = res

            if (Array.isArray(output)) {
                if (opts.skipObjectIfSingleResult) {
                    output = res.map(e => {
                        let keys = Object.keys(e)

                        if (keys.length == 1) {
                            return e[keys[0]]
                        } else {
                            return e
                        }
                    })
                }

                if (!opts.forceArray && res.length < 2) {
                    output = res[0]
                }
            }

            return resolve(output)
        })
    })

export function setupDb() {
    return new Promise(async (resolve, reject) => {
        console.log("setting up db...");
        dataBaseConnection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'snacksis'
        })
        dataBaseConnection.connect(e => {
            if (e) {
                console.error("DB_ERROR: ",e);
                reject()
                return process.exit(1)
            }

            return resolve(dataBaseConnection)
        })
    })
}

