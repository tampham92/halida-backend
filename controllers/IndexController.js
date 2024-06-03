const showStore = (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' })   
}

module.exports = {
    showStore
}