const errStatusJoin = require('../helpers/errStatus')

module.exports = (err, req, res, next) => {
    const errName = err.name
    const errErrors = err.errors
    const uniqueErr = `SequelizeUniqueConstraintError`
    const validationErr = `SequelizeValidationError`
    const loginErr = `User Not Found`

    let message = 'Internal Server Error'
    let status = 500

    switch(errName) {
        case uniqueErr:
            message = errStatusJoin(errErrors)
            status = 400
            break

        case validationErr:
            message = errStatusJoin(errErrors)
            status = 400
            break
        case loginErr:
            message = loginErr
            status = 400
            break
    }

    res.status(status).json({ msg: message})
}