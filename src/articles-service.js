const ArticlesService = {
    getAllArticles(knex){
        // return Promise.resolve('all the articles!!')
        return knex.select('*').from('blogful_articles')
    },
    insertArticle(knex, newArticle){
        // return Promise.resolve({})
        return knex
            .insert(newArticle)
            .into('blogful_articles')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }
}

module.exports = ArticlesService