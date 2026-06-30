/** @type {import('@dhis2/cli-app-scripts').D2Config} */
// const config = {
//     type: 'app',

//     entryPoints: {
//         app: './src/App.jsx',
//     },

//     direction: 'auto',
// }

// module.exports = config
const config = {
    type: 'app',
    name: 'dhis2-sql-reports',

    entryPoints: {
        app: './src/App.jsx',
    },

    dataStore: true,

    auth: {
        baseUrl: 'https://palu.togodhis2.org/mid',
    },
}

export default config
