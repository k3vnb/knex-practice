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

function getProductsByDateAfter(daysAgo){
    knexInstance
        .select('name', 'date_added')
        .from('shopping_list')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? DAYS'::INTERVAL`, daysAgo)
        )
        .then(res => {
            console.log(res)
        })
}

function paginateShoppingListItems(pageNumber){
    const productsPerPage = 6
    const offset = productsPerPage * (pageNumber - 1)
    knexInstance
        .select('name', 'category', 'price')
        .from('shopping_list')
        .limit(6)
        .offset(offset)
        .then(res => {
            console.log(res)
        })
}

function getTotalCostPerCategory(){
    knexInstance
        .select('category')
        .sum('price')
        .from('shopping_list')
        .groupBy('category')
        .then(res => {
            console.log(res)
        })
}

// getTotalCostPerCategory()
paginateShoppingListItems(15)
// findProductByKeyword('pretend')
// getProductsByDateAfter(10)