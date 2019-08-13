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

// searchByProductName('holo')

function paginateProducts(page){
    const productsPerPage = 10
    const offset = productsPerPage * (page - 1)
    knexInstance
        .select('product_id', 'name', 'price', 'category')
        .from('amazong_products')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}

// paginateProducts(2)

function getProductsWithImages(){
    knexInstance
        .select('product_id', 'name', 'price', 'category', 'image')
        .from('amazong_products')
        .whereNotNull('image')
        .then(res => {
            console.log(res)
        })
}

getProductsWithImages()