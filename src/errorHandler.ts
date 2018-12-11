import { Response } from "express";

/**
 * @author Daniel Grigore
 * @param res 
 */
export default async (res: Response, blame: 'client'|'server', message?: string|Object, error?: any) =>{
    if (error) {
        console.error(error)
    }

    res.status(blame == 'client' ? 400 : 500).end(JSON.stringify({
        message: message || (blame == 'client' ? "Bas request" : "Server error")
    }))
}