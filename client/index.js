const SERVER = 'http://localhost:3000'

$(document).ready(()=>{
    const token = localStorage.getItem('token')
    if(token){
        $('#content-page').show()
        $('#login-page').hide()
        $('#singup-page').hide()
    }else{
        $('#login-page').show()
        $('#content-page').hide()
        $('#singup-page').hide()
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
        const token = res.token
        localStorage.setItem('token', token)
        $('#content-page').show()
        $('#login-page').hide()
        $('#singup-page').hide()
    })
    .fail(err=>{
        console.log(err)
    })
    
}

function userSignUp(e){
    e.preventDefault()
    let email = $('#regis-email').val()
    let password = $('#regis-password').val()

    $.ajax({
        method: "POST",
        url: SERVER + '/user/register',
        data: {
            email,
            password
        }
    })
    .done(res=>{
        $('#content-page').hide()
        $('#singup-page').hide()
        $('#login-page').show()
    })
    .fail(err=>{
        console.log(err)
    })
}

$('#btn-logout').on('click', ()=>{
    logout()
})

$('#user-singUp').on('click', ()=>{
    signup()
})

$('cancel-signup').on('click', ()=>{
    cancelSingup()
})

function cancelSingup(){
    $('#content-page').hide()
    $('#login-page').show()
    $('#singup-page').hide()
    localStorage.clear()
}

function signup(){
    $('#content-page').hide()
    $('#login-page').hide()
    $('#singup-page').show()
    localStorage.clear()
}

function logout(){
    $('#content-page').hide()
    $('#login-page').show()
    $('#singup-page').hide()
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