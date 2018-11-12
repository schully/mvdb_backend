import fetch from "node-fetch";
import Movie from "./Movie";
import ImdbID from "./IdFromImdb";
import Worker from "./Participant"

const omdbApiKey = '3227a5fa'
const baseUrl = 'http://www.omdbapi.com/?apikey=${omdbApiKey}'


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

    let cast = getCast(result)
    let categories = (result.Genre || "").split(",").map(c => c.trim())
    
    return {
        result: {
            cast,
            categories,
            imdbId: id,
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

function getCast(imdbMovieResut:any): Worker[]{
    function fromString(str:string): Worker[] {
        if (!str || /N\/A/i.test(str)) {
            return []
        }
        return str.split(",").map(name => new Worker(name.replace(/\(.+\)/g, '').trim(), null))
    }

    let actors = fromString(imdbMovieResut.Actors)
    actors.forEach(worker => worker.role = 'cast')

    let director = fromString(imdbMovieResut.Actors)
    actors.forEach(worker => worker.role = 'director')
    
    return {
        ...actors,
        ...director
    }
}