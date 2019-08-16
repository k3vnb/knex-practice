require('dotenv').config()
const knex = require('knex')
const ShoppingListService = require('shopping-list-service')

const knexInstance = {
    client: 'pg',
    connection: process.env.DB_URL
}

ShoppingListService.getAllShoppingListItems(knexInstance)
    .then(() => {
        return ShoppingListService.insertNewShoppingListItem(knexInstance, 
            {
                name: 'Filberts',
                price: 12.24,
                date_added: new Date(),
                checked: false,
                category: 'Breakfast',
            }
    ).then(newItem => {
        console.log(newItem)
        return ShoppingListService.updateShoppingListItem(knexInstance, newItem.id, {title: 'Updated Title'})
    }).then(updatedItem => {
        console.log(updatedItem)
        return ShoppingListService.getById(knexInstance, updatedItem.id)
    }).then(updatedItem => {
        console.log(updatedItem)
        return ShoppingListService.deleteShoppingListItem(knexInstance, updatedItem)
    })
})

