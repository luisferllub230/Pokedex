

exports.GetHome = (req, res, next) => {
    res.render('index', {
        title: 'Home',
        activeHome: true,
    })
}