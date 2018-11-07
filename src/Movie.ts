export default class Movie {
    title: string
    ageRated: number
    imdbScore?: number
    director?: string
    genre: string
    plot?: string
    possessor?: string

    static fromImdbMovie(json): Movie{
        return {
            title: json.Title,
            ageRated: json.Rated,
            imdbScore: json.imdbRating,
            director: json.Director,
            genre: json.Genre,
            possessor: undefined
        }

    }
}