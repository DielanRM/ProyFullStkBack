const errorHandler = (err, req, next) => {
    //Si encuentra un error lo asigna a statusCode
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.MODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {errorHandler}