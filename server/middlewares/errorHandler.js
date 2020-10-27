module.exports = (err, req, res, next) =>{
    let status
    let msg 
    if(!err.cek){
        status = 500
        msg = 'Internal Server Error, try again leter'
    }else{
        status = err.status
        msg = err.msg
    }

    res.status(status).json({msg})
}