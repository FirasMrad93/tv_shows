import { Cast } from "./cast"
import { Network } from "./network"

export type Show = {
    id : number
    image : {
        medium : string
        original : string
    }
    name : string
    language : string
    runtime : number
    summary : string
    genres : string[]
    rating : {
        average : number
    }
    premiered : string
    ended : string | null
    network : Network
    _embedded : {
        cast : Cast[]
    }
}