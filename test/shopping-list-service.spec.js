const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`Shopping List Service object`, function(){
    let db
    let testShoppingListItems = [
        {
            id: 1,
            name: 'First Item Test Name',
            price: "1.25",
            date_added: new Date('2019-01-22T16:28:32.615Z'),
            checked: true,
            category: 'Main'
        },
        {
            id: 2,
            name: 'Second Item Test Name',
            price: "110.99",
            date_added: new Date('1929-10-22T16:28:32.615Z'),
            checked: false,
            category: 'Lunch'
        },
        {
            id: 3,
            name: 'Third Item Test Name',
            price: "18.00",
            date_added: new Date('2030-05-22T16:28:32.615Z'),
            checked: true,
            category: 'Snack'
        },
        {
            id: 4,
            name: 'Fourth Item Test Name',
            price: "0.79",
            date_added: new Date('2019-08-22T16:28:32.615Z'),
            checked: false,
            category: 'Breakfast'
        },
    ]

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
    })
    
    before(() => db('shopping_list').truncate())

    afterEach(() => db('shopping_list').truncate())
  
    after(() => db.destroy())

    context(`Given 'shopping_list' has data`, () => {
        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert(testShoppingListItems)
        })

        it(`getAllShoppingListITems() resolves all items from 'shopping_list' table`, () => {
            return ShoppingListService.getAllShoppingListItems(db)
                .then(actual => {
                    expect(actual).to.eql(testShoppingListItems)
                })
        })

        it(`getById() resolves an item by id from 'shopping_list' table`, () => {
            const thirdId = 3
            const thirdTestItem = testShoppingListItems[thirdId - 1]
            return ShoppingListService.getById(db, thirdId)
                .then(actual => {
                    expect(actual).to.eql({
                        id: thirdId,
                        name: thirdTestItem.name,
                        price: thirdTestItem.price,
                        checked: thirdTestItem.checked,
                        category: thirdTestItem.category,
                        date_added: thirdTestItem.date_added,
                    })
                })
        })

        it(`deleteShoppingListItem() removes an item from 'shopping_list' table`, () => {
            const itemId = 3
            return ShoppingListService.deleteShoppingListItem(db, itemId)
                .then(() => {
                    return ShoppingListService.getAllShoppingListItems(db)
                }).then(allItems => {
                    const expected = allItems.filter(item => item.id !== itemId)
                    expect(allItems).to.eql(expected)
                })
        })

        it(`updateShoppingListItem() updates an article from the 'shopping_list' table`, () => {
            const idOfItemToUpdate = 3
            const newItemData = {
              name: 'updated title',
              price: '99.99',
              date_added: new Date(),
              checked: true,
              category: 'Snack'
            }
            const originalItem = testShoppingListItems[idOfItemToUpdate - 1]
            return ShoppingListService.updateShoppingListItem(db, idOfItemToUpdate, newItemData)
              .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
              .then(article => {
                expect(article).to.eql({
                  id: idOfItemToUpdate,
                  ...originalItem,
                  ...newItemData,
                })
              })
          })        
        })
        context(`Given 'shopping_list' has no data`, () => {
            it(`getAllShoppingListItems() resolves an empty array`, () => {
                return ShoppingListService.getAllShoppingListItems(db)
                    .then(actual => {
                        expect(actual).to.eql([])
                })
            })
            
            it(`insertNewShoppingListItem() inserts an item and resolves the item with 'id`, () => {
                const newItem = {                 
                    name: 'Test 1 2',
                    price: "0.79",
                    date_added: new Date('2019-08-22T16:28:32.615Z'),
                    checked: false,
                    category: 'Main'                
                }
                return ShoppingListService.insertNewShoppingListItem(db, newItem)
                    .then(actual => {
                        expect(actual).to.eql({
                            id: 1,
                            name: newItem.name,
                            price: newItem.price,
                            date_added: newItem.date_added,
                            checked: newItem.checked,
                            category: newItem.category,
                        })
                    })
            })
        })
})