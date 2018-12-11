import fetch from "node-fetch";
import ImdbID from "./IdFromImdb";

const omdbApiKey = '3227a5fa'
const baseUrl = `http://www.omdbapi.com/?apikey=${omdbApiKey}`

/**
 * @author Daniel Grigore 
 */
export const fetchMovie = async (id: string): Promise<{result: ImdbID | string}> => {
    let url = `${baseUrl}&i=${encodeURIComponent(id)}`
    console.log("req ", url);

    let result: any = await fetch(`${baseUrl}&i=${encodeURIComponent(id)}`)
    result = await result.json()
    
    if(result.Response == "False"){
        return {
            result: 'noMatch'
        }
    }

    filterMovie(result)

    console.log(result);
    

    let genre = (result.Genre || "").split(",").map(c => c.trim())
    
    return {
        result: {
            id,
            genre,
            imdbId: id,
            runtime: parseInt(result.Runtime),
            ageRated: result.Rated,
            title: result.Title,
            plot:result.Plot,
            imdbScore: parseFloat(result.imdbRating)
        }
    }
    
}

const filterMovie = movie => {
    ["Rated", "imdbRating"].forEach( k => {
        if (movie[k] == "N/A") {
            movie[k] = null
        }
    })
}
