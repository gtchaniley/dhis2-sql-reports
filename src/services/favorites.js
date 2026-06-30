const KEY = 'dhis2_sql_favorites'

export function getFavorites() {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
}

export function addFavorite(view) {
    const favs = getFavorites()
    if (!favs.find((f) => f.id === view.id)) {
        favs.push(view)
        localStorage.setItem(KEY, JSON.stringify(favs))
    }
}

export function removeFavorite(id) {
    const favs = getFavorites().filter((f) => f.id !== id)
    localStorage.setItem(KEY, JSON.stringify(favs))
}