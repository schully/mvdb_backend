import { readFileSync } from "fs";
import path from 'path'

export default {

    assertParams: (props: string[], obj: any, allowEmptyString = false) => {
        let missingProps = []

        for (let p of props) {
            if (!obj.hasOwnProperty(p) || (allowEmptyString ? false : obj[p] == '')) {
                missingProps.push(p)
            }
        }

        if (missingProps.length > 0) {
            throw new Error('Missing parameters: ' + missingProps.join(','))
            
        }
    },

    readContents(filePath) {
        console.log(__dirname);
        return readFileSync(path.resolve(filePath)).toString()
        
    },

    getQuery(name) {
        if (!name.endsWidth('.sql')) {
            name += ".sql";
        }
        return readFileSync(path.resolve(__dirname, '../queries', name)).toString()
    },

    reobject(original){
        return JSON.parse(JSON.stringify(original))
    }
}