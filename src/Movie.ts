import Actor from "./Participant"

export default class Movie {
    id: any
    title: string
    ageRated: number
    imdbScore?: number
    director?: string
    genre: string
    plot?: string
    cast?: Actor[] = []
    possessor?: string

}