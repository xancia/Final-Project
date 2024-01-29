/// <reference types="vite/client" />
import { JakanData } from "jakan"

export type animeIDType = {
    mal_id: number
}

export interface ExtendedAnimeData extends JakanData {
    broadcast?: {
        day: string,
        string: string,
        time: string,
        timezone: string
    },
    score?: number,
    images?: {
        jpg: {
            image_url: string,
        }
    },
    title?: string,
    title_english?: string
}

export type userType = {
    username: string,
    password: string,
    email: string
}
