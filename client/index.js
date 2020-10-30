const SERVER = 'http://localhost:3000'

$(document).ready(()=>{
    const token = localStorage.getItem('token')
    if(token){
        $('#content-page').show()
        $('#login-page').hide()
    }else{
        $('#login-page').show()
        $('#content-page').hide()
    }
})


function userLogin(e){
    e.preventDefault()
    let email = $('#login-email').val()
    let password = $('#login-password').val()
    console.log(email, password)

    $.ajax({
        method: "POST",
        url: SERVER + '/user/login',
        data: {
            email,
            password
        }
    })
    .done(res=>{
        console.log(res)
        const token = res.token
        localStorage.setItem('token', token)
        $('#content-page').show()
        $('#login-page').hide()
    })
    .fail(err=>{
        console.log(err)
    })
    
}

$('#btn-logout').on('click', ()=>{
    logout()
})

function logout(){
    // e.preventDefault()
    $('#content-page').hide()
    $('#login-page').show()
    localStorage.clear()
}


// $('.btn').on('click', ()=>{
//     console.log('masukkkkkkkkkk')
//     // $('.p1').hide()
//     log = !log
//     if(log){
//         $('.p1').hide()
//     }else{
//         $('.p1').show()
//     }
// })

// $('.btn').on('click', ()=>{
//     let email = $('login-email')
//     let password = $('login-password')
//     console.log(email)
//     console.log(password)
// })