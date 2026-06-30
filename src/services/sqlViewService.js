export async function executeSqlView(id, params = {}) {
    const query = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
        query.append('var', `${key}:${value}`)
    })

    const res = await fetch(
        `/api/sqlViews/${id}/data.json?${query.toString()}`
    )

    if (!res.ok) {
        throw new Error('Erreur exécution SQL View')
    }

    return res.json()
}