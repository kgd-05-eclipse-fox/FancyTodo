const SERVER = 'http://localhost:3000'

$(document).ready(()=>{
    const token = localStorage.getItem('token')
    if(token){
        $('#content-page').show()
        $('#login-page').hide()
        $('#singup-page').hide()
        $('#formAddTodo-page').hide()
        allTodo()
        // $("#allTodoListData").empty();
    }else{
        $('#login-page').show()
        $('#content-page').hide()
        $('#singup-page').hide()
        $("#formAddTodo-page").hide()
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
        allTodo().clear()
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

function allTodo(){
    const token = localStorage.token
    console.log(token)
    $.ajax({
        method: "GET",
        url: SERVER + '/todos',
        headers: {token}
    })
    .done(res=>{
        res.forEach((el,i)=>{
            $('#allTodoListData').append(
                `<tr>
                <th scope="row">${i+1}</th>
                <td>${el.title}</td>
                <td>${el.description}</td>
                <td>${el.status}</td>
                <td>${el.dueDate}</td>
                <td>
                    <button type="button" class="btn btn-outline-info">Edit</button>
                    <button type="button" class="btn btn-outline-danger">Delete</button>
                </td>
              </tr>`
            )
        })
    })
    .fail(err=>{
        console.log(err)
    })
}

function addTodoListUser(e){
    e.preventDefault()
    let title = $('#add-todo-title').val()
    let description = $('#add-todo-description').val()
    let dueDate = $('#add-todo-dueDate').val()
    let token = localStorage.token
    console.log(title, description, dueDate)

    $.ajax({
        method: "POST",
        url: SERVER + '/todos',
        headers: {token},
        data: {
            title,
            description,
            dueDate
        }
    })
    .done(res=>{
        backToList()
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

$('#cancel-signup').on('click', ()=>{
    cancelSingup()
})

$('#listAll-todo').on('click', ()=>{
    backToList()
})

$('#add-todo').on('click', ()=>{
    addTodo()
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
    $("#allTodoListData").empty()
    $('#login-email').val('')
    $('#login-password').val('')
    $('#content-page').hide()
    $('#login-page').show()
    $('#singup-page').hide()
    localStorage.clear()
}

function backToList(){
    $("#allTodoListData").empty();
    $('#formAddTodo-page').hide()
    $('#All-Todo-page').show()
    allTodo()
}

function addTodo(){
    $('#formAddTodo-page').show()
    $('#All-Todo-page').hide()
}
