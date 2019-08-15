const ArticlesService = {
    getAllArticles(knex){
        // return Promise.resolve('all the articles!!')
        return knex.select('*').from('blogful_articles')
    }
}

module.exports = ArticlesService