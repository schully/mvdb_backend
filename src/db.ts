import mysql from 'mysql'

let _db: mysql.Connection

export const db = () => _db

class QueryOptions {
    forceArray?: boolean
    skipObjectIfSingleResult?: boolean;
}

export const query = (sql: string, args?: any, opts?: QueryOptions) => 
    new Promise(async (resolve,reject) => {
        let result = _db.query(sql, Array.isArray(args) ? args : [args], (e, res: any[]) => {
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
        _db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'snacksis'
        })
        _db.connect(e => {
            if (e) {
                console.error("DB_ERROR: ",e);
                reject()
                return process.exit(1)
            }

            return resolve(_db)
        })
    })
}

