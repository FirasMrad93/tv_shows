export const getShows = () => {
    return fetch('https://api.tvmaze.com/shows')
}

export const searchShow = (query: string) => {
    return fetch(` https://api.tvmaze.com/search/shows?q=${query}`)
}

export const getShowDetails = (id: string) => {
    return fetch(` https://api.tvmaze.com/shows/${id}?embed=cast`)
}