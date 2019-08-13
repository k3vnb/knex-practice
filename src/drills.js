require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

function findProductByKeyword(keyword){
    knexInstance
        .select('name')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${keyword}%`)
        .then(response => {
            console.log(response)
        })
}

findProductByKeyword('Pretend')