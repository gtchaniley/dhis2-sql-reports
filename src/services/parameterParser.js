export function extractParameters(sqlView) {
    const regex = /\$\{(.*?)\}/g
    const params = new Set()

    let match
    while ((match = regex.exec(sqlView?.sqlQuery || ''))) {
        params.add(match[1])
    }

    return Array.from(params)
}