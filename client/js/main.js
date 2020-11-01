const URL = 'http://localhost:3000'
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

$(document).ready(function () {
    if (!localStorage.accessToken) {
        loginRegisterPage()
    } else {
        landingPage()
    }
});

function logout() {
    localStorage.clear()
    loginRegisterPage()
    $('#home').hide()
}

function loginRegisterPage() {
    $('#reglog').show()
    $('#home').hide()
}

function landingPage() {
    $('#reglog').hide()
    $('#home').show()
    showTodoList()
    showCompleted()
}

function login(e) {
    e.preventDefault()
    const email = $('#log-email').val() 
    const password = $('#log-password').val() 
    $.ajax({
        method: 'POST',
        url: `${URL}/login`,
        data: {
            email,
            password
        }
    })
    .done(data => {
        localStorage.setItem('accessToken', data.accessToken)
        Swal.fire({
            icon: 'success',
            title: 'Login Success!!',
            showConfirmButton: false,
            timer: 1500
          })
        landingPage()
        
    })
    .fail(err => {
        Swal.fire({
            icon: 'error',
            title: 'Login Failed!!',
            text: err.responseJSON.err
          })
    })
}

function register(e) {
    e.preventDefault()
    const email = $('#reg-email').val() 
    const password = $('#reg-password').val() 
    $.ajax({
        method: 'POST',
        url: `${URL}/register`,
        data: {
            email,
            password
        }
    })
    .done(data => {
        Swal.fire({
            icon: 'success',
            title: 'Register Success!',
            showConfirmButton: false,
            timer: 1500
          })
    })
    .fail(err => {
        console.log(err)
        Swal.fire({
            icon: 'error',
            title: 'Register Failed!!',
            text: err.responseJSON.err
          })
    })
}

function showTodoList() {
    const accessToken = localStorage.accessToken
    $.ajax({
        method: 'GET',
        url: `${URL}/todos`,
        headers: {
            token: accessToken
        }
    })
    .done(data => {
        $('#todo-list').empty()
        data.forEach(el => {
            $('#todo-list').append(`
            <div class="card shadow-lg">
            <div class="card-body">
              <h5 class="card-title">${el.title}</h5>
              <ul class="list-group">
                <li class="list-group-item list-group-item-info"><i class="fa fa-briefcase"style="font-size:20px;"></i>   ${el.description}</li>
                <li class="list-group-item list-group-item-info"><i class="fa fa-user"style="font-size:20px;"></i>   ${el.due_date}</li>
              </ul>
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-primary" id="left-panel-link" onclick="complete(${el.id})">Done</button>
              <button type="button" class="btn btn-info" id="left-panel-link" onclick="editTodo(${el.id})" data-toggle="modal" data-target="#modalLoginForm">Edit</button>
              <button type="button" class="btn btn-danger" id="left-panel-link" onclick="deleteTodo(${el.id})">Delete</button>
            </div>
          </div>`)
        });
    })
    .fail(err => {
        console.log(err)
    })
}

function deleteTodo(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          const delId = +id
          const accessToken = localStorage.accessToken
          $.ajax({
            method: 'DELETE',
            url: `${URL}/todos/${delId}`,
            headers: {
                token: accessToken
            }
        })
        .done(data => {
            $('#todo-list').empty()
            showTodoList()
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Failed to delete!',
                text: err.responseJSON.err
              })
        })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
      };
    

function complete(id) {
    const accessToken = localStorage.accessToken
    $.ajax({
        url: `${URL}/todos/${id}`,
        type : 'PATCH',
        headers: {
            token: accessToken
        },
        data: { 
            status: true 
        }
    })
    .done(data => {
        $('#todo-list').empty()
        showTodoList()
        Swal.fire({
            icon: 'success',
            title: 'Congratulations! You just completed your task!',
            showConfirmButton: false,
            timer: 1500
          })
    })
    .fail(err => {
        Swal.fire({
            icon: 'error',
            title: 'Failed to complete!',
            text: err.responseJSON.err
          })
    })
}

function getById(id) {

}


function editTodo(id) {
    const accessToken = localStorage.accessToken
    $.ajax({
        method: 'GET',
        url: `${URL}/todos/${id}`,
        headers: {
            token: accessToken
        },
        data: { 
            id
        }
    })
    .done(data => {
        console.log
        $.ajax({
            method: 'POST',
            url: `${URL}/todos/${id}`,
            headers: {
                token: accessToken
            },
            data: {
                id
            }
        })
    })
    .done(data => {
        const date = getDate(new Date(data.due_date))
        $('#edit-todo').append(`
    <div class="modal fade" id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h4 class="modal-title w-100 font-weight-bold">Edit Todo</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mx-3">
          <div class="md-form mb-5">
            <input type="text" class="form-control" value="${data.title}">
            <label data-error="wrong" data-success="right" for="title">Title</label>
          </div>
  
          <div class="md-form mb-4">
            <input type="text" id="defaultForm-pass" class="form-control validate" value="${data.description}">
            <label data-error="wrong" data-success="right" for="description">Description</label>
          </div>
          
          <div class="md-form mb-3">
          <input type"date" class="form-control" value"${date}">
          <label>Due Date</label>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button class="btn btn-default" onclick="editedTodo">Submit</button>
        </div>
      </div>
    </div>
  </div>
  
  <div class="text-center">
    <a href="" class="btn btn-default btn-rounded mb-4" >Launch
      Modal Login Form</a>
  </div>`)
    })
    .fail(err => {
        console.log(err)
    })
}

function addTodo(e) {
    const accessToken = localStorage.accessToken
    const title = $('#title').val()
    const description = $('#description').val()
    const due_date = $('#date').val()
    console.log(title,description,due_date)
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: `${URL}/todos`,
        headers: {
            token: accessToken
        },
        data: {
            title,
            description,
            date
        }
    })
    .done(data => {
        Swal.fire({
            icon: 'success',
            title: 'A new Todo List successfully added!',
            showConfirmButton: false,
            timer: 1500
          })
    })
    .fail(err => {
        console.log(err)
        Swal.fire({
            icon: 'error',
            title: 'Failed to add!',
            text: err.responseJSON.msg
          })
    })
}

function showCompleted() {
    const accessToken = localStorage.accessToken
    $.ajax({
        method: 'GET',
        url: `${URL}/todos/completed`,
        headers: {
            token: accessToken
        }
    })
    .done(data => {
        data.forEach(el => {
            $('#completed').append(`
            <div class="card shadow-lg">
            <div class="card-body">
              <h5 class="card-title">${el.title}</h5>
              <ul class="list-group">
                <li class="list-group-item list-group-item-success"><i class="fa fa-briefcase"style="font-size:20px;"></i>   ${el.description}</li>
                <li class="list-group-item list-group-item-success"><i class="fa fa-user"style="font-size:20px;"></i>   ${el.due_date}</li>
              </ul>
            </div>
          </div>`)
        });
    })
    .fail(err => {
        console.log(err)
    })
}

function getDate(val){
    const year = new Date(val).getFullYear()
    const month = new Date(val).getMonth()
    const date = new Date(val).getDate()
    return `${year}-${month}-${date}`
}