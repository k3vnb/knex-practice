require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

// const q1 = knexInstance('amazong_products').select('*').toQuery()

//SELECT * FROM amazong_products;
// knexInstance.from('amazong_products').select('*')
//     .then(res => {
//         console.log(res)
//     })

//SELECT product_id, name, price, category FROM amazong_products WHERE name = 'Point of view gun';
// knexInstance
//     .select('product_id', 'name', 'price', 'category')
//     .from('amazong_products')
//     .where({ name: 'Point of view gun' })
//     .first()
//     .then(res => {
//         console.log(res)
//     })


function searchByProductName(searchTerm){
    knexInstance
        .select('product_id', 'name', 'price', 'category')
        .from('amazong_products')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(res => {
            console.log(res)
        })
}

searchByProductName('holo')