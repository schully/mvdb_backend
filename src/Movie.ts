
/**
 * @author Daniel Grigore
 * 
 */
export default class Movie {
    id: any
    title: string
    ageRated: number
    runtime: number
    imdbScore?: number
    genre: string[]
    plot?: string
    possessor?: string

}

export function convertRatingValue(rating: string) {
    switch (rating) {
        case "G":
            return 7
            
        case "PG":
            return 12
        case "PG-13":
            return 13
        case "R":
            return 15
            
        default:
            return
    }
}
