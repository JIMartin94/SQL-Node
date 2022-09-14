//usuario root
const dbConfig = {
    host: "127.0.0.1",
    port: 3306,
    user: 'root',
    password: '442242',
    database: 'coder'
}

// usuario coder 
// const dbConfig = {
//     host: '127.0.0.1',
//     port: 3306,
//     user: 'coder',
//     password: 'house',
//     database: 'coderhouse'
// }

export const knexConfig = {
    client: 'mysql',
    connection: dbConfig
}

const dbConfig2 = {
    filename: './DB/db.sqlite3'
}

export const knexConfig2 = {
    client: 'sqlite3',
    connection: dbConfig2,
    useNullAsDefault: true
}