module.exports = (err, req, res, next) =>{
    console.log(err)
    let status
    let msg 

    if(!err.cek){
        status = 500
        msg = 'Internal Server Error, try again leter'
    }else if(err.errors[0].message === 'E-mail tidak valid' || err.errors[0].message === 'Password tidak valid' || err.errors[0].message === 'email must be unique' || err.errors[0].message === 'dueDate is not defined'){
        status = 400
        msg = err.message
    }
    else{
        status = err.status
        msg = err.msg
    }

    res.status(status).json({msg})
}