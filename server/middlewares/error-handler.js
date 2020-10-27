const errorHandler = (err, req, res, next) => {
    let status;
    let msg;
    
    if (err.name === "SequelizeValidationError") {
        status = 400
        let arrayErrors = []
        for (let i = 0; i < err.errors.length; i++) {
            arrayErrors.push(err.errors[i].message)
        }
        msg = arrayErrors.toString();
        res.status(status).json({
            msg
        })
    } else if (err.name === undefined) {
        status = err.status;
        msg = err.msg;
        res.status(status).json({
            msg
        })
    } else {
        status = 500
        msg = 'Internal Server Error'
        res.status(status).json({
            msg
        })
    }
}


module.exports = errorHandler;