const server = 'http://localhost:3000'

$('#btn-home').on('click', () => 
    home()  
)
$('#btn-list').on('click', () => 
    getAllTodo()
)


$(document).ready(function () {
    const token = localStorage.getItem("token")
    // console.log(token)
    if(token){
        $("#home-page").show()
        $("#add-todo").show()
        $("#sign-in-page").hide()
        $("#sign-up-page").hide()
        $("#edit-todo").hide()
        $("#show-todo").hide()
    }
    else{
        $("#home-page").hide()
        $("#sign-in-page").show()
        $("#sign-up-page").hide()
    }
})

function showSignUpForm() {
    $('#sign-up-page').show()
    $('#sign-in-page').hide()
}

function saveFormSignUp(e) {
    e.preventDefault()
    const email = $('#sign-up-email').val()
    const password = $('#sign-up-password').val()
    // console.log(email, password)
    $.ajax({
        method: "POST",
        url: server + "/register",
        data: {
            email,
            password
        }
    })
    .done(response => {
        $('#sign-up-page').hide()
        $('#sign-in-page').show()
    })
    .fail(err => {
        console.log(err)
    })
}

function saveFormSignIn(e) {
    e.preventDefault()
    const email = $('#sign-in-email').val()
    const password = $('#sign-in-password').val()
    $.ajax({
        method: "POST",
        url: server + "/login",
        data: {
            email,
            password
        }
    })
    .done(response => {
        let token = response.access_token
        localStorage.setItem("token", token)
        // console.log('masuk ke home page')
        $('#home-page').show()
        $("#add-todo").show()
        $('#sign-up-page').hide()
        $('#sign-in-page').hide()
        $("#edit-todo").hide()
        $("#show-todo").hide()
    })
    .fail(err => {
        console.log(err)
    })
}

function saveFormTodo(e) {
    e.preventDefault()
    const title = $('#title').val()
    const description = $('#description').val()
    const due_date = $('#due_date').val()
    const token = localStorage.getItem("token")
    // console.log(token)
    $.ajax({
        method: "POST",
        url: server + "/todos",
        headers: {token},
        data: {
            title,
            description,
            due_date
        }
    })
    .done(response => {
        // console.log(response)
        getAllTodo()
    })
    .fail(err => {
        console.log(err)
    })
}

function signOutUser(e){
    e.preventDefault()
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    $('#home-page').hide()
    $('#sign-in-page').show()
    signOut()
}

function home() {
    $('#home-page').show()
    $('#add-todo').show()
    $('#show-todo').hide()
}

function getAllTodo() {
    const token = localStorage.getItem("token")
    $.ajax({
        method: "GET",
        url: server + "/todos",
        headers: {token}
    })
    .done(response => {
        // console.log(response)
        $('#show-todo').show()
        $('#add-todo').hide()
        $('#edit-todo').hide()
        $('#table-list').empty()
        // $('#edit-todo').empty()
        response.forEach(element => {
            $('#table-list').append(`
            <tr>
                <td>${element.title}</td>
                <td>${element.description}</td>
                <td>${element.due_date}</td>
                <td>${element.status}</td>
                <td>
                    <button class="btn btn-primary text-white mt-3" onclick="showFormEdit(${element.id})" style="background-color: #42b0f8;"> Edit</button>
                    <button class="btn btn-primary text-white mt-3" onclick="deleteTodo(${element.id})" style="background-color: #42b0f8;"> Delete</button>
                    <button class="btn btn-primary text-white mt-3" onclick="updateStatusTodo(${element.id})" style="background-color: #42b0f8;"> End Task</button>
                </td>
            </tr>`
            )
        })
    })
    .fail(err => {
        console.log(err)
    })
}

function showFormEdit(id) {
    $('#edit-form').empty()
    const token = localStorage.getItem("token")
    $.ajax({
        method: "GET",
        url: server + `/todos/${id}`,
        headers: {token}
    })
    .done(response => {
        // console.log(response)
        function convertDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
        
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
        
            return [year, month, day].join('-');
        }
        const newDate = convertDate(response.due_date)
        $('#edit-todo').show()
        $('#add-todo').hide()
        $('#show-todo').hide()
        $('#edit-form').append(
        `<label for="title">Title</label>
        <input class="form-control" type="text" id="edit_title" value="${response.title}"><br>
        <label for="description">Description</label>
        <input class="form-control" type="text" id="edit_description" value="${response.description}"><br>
        <label for="due_date">Due Date</label><br>
        <input type="date" id="edit_due_date" value="${newDate}"><br><br>
        <button class="btn btn-primary btn-block" type="submit">Update</button>`
        )
        localStorage.setItem("id", response.id)
    })
    .fail(err => {
        console.log(err)
    })
}

function saveFormEdit(e) {
    e.preventDefault()
    const token = localStorage.getItem("token")
    const id = localStorage.getItem("id")
    const title = $('#edit_title').val()
    const description = $('#edit_description').val()
    const due_date = $('#edit_due_date').val()
    $.ajax({
        method: "PUT",
        url: server + `/todos/${id}`,
        headers: {token},
        data: {
            title,
            description,
            due_date
        }
    })
    .done(response => {
        $('#edit-todo').hide()
        getAllTodo()
    })
    .fail(err => {
        console.log(err)
    })
}

function updateStatusTodo(id) {
    const token = localStorage.getItem("token")
    $.ajax({
        method: "PATCH",
        url: server + `/todos/${id}`,
        headers: {token},
        data: {
            status: "Done"
        }
    })
    .done(response => {
        getAllTodo()
    })
    .fail(err => {
        console.log(err)
    })
}

function deleteTodo(id) {
    const token = localStorage.getItem("token")
    $.ajax({
        method: "DELETE",
        url: server + `/todos/${id}`,
        headers: {token},
    })
    .done(response => {
        getAllTodo()
    })
    .fail(err => {
        console.log(err)
    })
}

function onSignIn(googleUser) {
    const token = googleUser.getAuthResponse().id_token
    $.ajax({
        method: "POST",
        url: server + '/login/google',
        data: {
            token
        }
    })
    .done(response => {
        let token = response.access_token
        localStorage.setItem("token", token)
        $('#home-page').show()
        $("#add-todo").show()
        $('#sign-up-page').hide()
        $('#sign-in-page').hide()
        $("#edit-todo").hide()
        $("#show-todo").hide()
    })
    .fail(err => {
        console.log(err)
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
