module.exports = function errorHandler (err, req, res, next) {
  let msg = err.msg || "Internal Server Error" 
  let status = 500 || err.status

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError'){
    status = 400
    msg = err.errors.map(e => e.message).join(", ")
  } else if (err.response.data) {
    status = err.response.data.cod
    console.log("errorHandler -> status", status)
    msg = err.response.data.message
    console.log("errorHandler -> msg", msg)
  }
  res.status(status).json({msg})
}