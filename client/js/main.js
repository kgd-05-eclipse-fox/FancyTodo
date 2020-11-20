// const URL = 'http://localhost:3000'
const URL = 'https://tofancydo.herokuapp.com'
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
	const gToken = googleUser.getAuthResponse().id_token;
	$.ajax({
		method: 'POST',
		url: `${URL}/googleSignIn`,
		data: {
			gToken
		}
	})
	.done(response => {
		Swal.fire({
			imageUrl: `${profile.getImageUrl()}`,
			title: `Hello ${profile.getName()}!`,
			showConfirmButton: false,
			timer: 1500
		})
		localStorage.setItem('accessToken', response.accessToken)
		landingPage()
	})
	.fail(error => {
		console.log(error)
	})
}

$(document).ready(function () {
    if (!localStorage.accessToken) {
        loginRegisterPage()
    } else {
        landingPage()
    }
});

function logout() {
    Swal.fire({
      title: 'Are you sure to logout and leave me alone?',
      imageUrl: 'https://media1.tenor.com/images/94ec8e77f201109a234ae494b82bb514/tenor.gif?itemid=4988274',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
      backdrop: `
      rgba(0,0,123,0.4)
      left top
      no-repeat
    `
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Logged Out!',
          'Please come back anytime!',
          'success'
        )
        localStorage.clear()
        loginRegisterPage()
				$('#home').hide()
      }
		})
		var auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut().then(function () {
			console.log('User signed out.');
		});
}

function loginRegisterPage() {
    $('#reglog').show()
    $('#home').hide()
}

function landingPage() {
    $('#todo-list').show()
    $('#completed').show()
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
        $('#log-email').val('')
        $('#log-password').val('')
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
          $('#reg-email').val('')
          $('#reg-password').val('')
    })
    .fail(err => {
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
                <li class="list-group-item list-group-item-info"><i class="fa fa-tasks"style="font-size:20px;"></i>   ${el.description}</li>
                <li class="list-group-item list-group-item-info"><i class="fa fa-calendar-week"style="font-size:20px;"></i>  ${getDate(el.due_date)}</li>
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
      Swal.fire({
        icon: 'error',
        title: 'Failed to show!',
        text: err.responseJSON.err
      })
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
        $('#completed').empty()
        showCompleted()
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
        }
    })
    .done(data => {
      const date = getDate(new Date(data.due_date), 'aa').replace('/','-').replace('/','-')
      console.log(date)
      Swal.fire({
        title: 'Edit Todo',
        html: `<input type="text" id="input-title" class="swal2-input" value="${data.title}">
        <input type="text" id="input-desc" class="swal2-input" value="${data.description}">
        <input type="date" class="form-control" value="${date}" id="input-date">`,
        confirmButtonText: 'Submit',
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
          const title = Swal.getPopup().querySelector('#input-title').value
          const description = Swal.getPopup().querySelector('#input-desc').value
          const due_date = Swal.getPopup().querySelector('#input-date').value
          if (!title || !description || !due_date) {
            Swal.showValidationMessage(`Please complete all the fields`)
          }
          return { title,description,due_date }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          editedTodo(id, result.value)
        }
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to edit!',
          text: err.responseJSON.err
        })
      })
  })
  .fail(err => {
    Swal.fire({
      icon: 'error',
      title: 'Failed to edit!',
      text: err.responseJSON.err
    })
  })
}

function addTodo(e) {
    const accessToken = localStorage.accessToken
    const title = $('#title').val()
    const description = $('#description').val()
    const due_date = $('#date').val()
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
          due_date
      }
    })
    .done(data => {
        $('#title').val('')
        $('#description').val('')
        $('#date').val('')
        Swal.fire({
            icon: 'success',
            title: 'A new Todo List successfully added!',
            showConfirmButton: false,
            timer: 1500
          })
          $('#todo-list').empty()
          landingPage()
    })
    .fail(err => {
        Swal.fire({
            icon: 'error',
            title: 'Failed to add!',
            text: err.responseJSON.msg
          })
    })
}

function showCompleted() {
		$('#completed').empty()
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
                <li class="list-group-item list-group-item-success"><i class="fa fa-tasks"style="font-size:20px;"></i>     ${el.description}</li>
								<li class="list-group-item list-group-item-success"><i class="fa fa-calendar-week"style="font-size:20px;"></i>     ${getDate(el.due_date)}</li>
                <li class="list-group-item list-group-item-success"><i class="fa fa-user-check"style="font-size:20px;"></i>     ${getDate(el.updatedAt)}</li>
							
              </ul>
            </div>
          </div>`)
        });
    })
    .fail(err => {
      Swal.fire({
        icon: 'error',
        title: 'Failed to show!',
        text: err.responseJSON.err
      })
    })
}

function editedTodo(id, data) {
    const accessToken = localStorage.accessToken
    Swal.fire({
      title: 'Are you sure to edit this Todo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, edit it!'
    })
    .then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          method: 'PUT',
          url: `${URL}/todos/${id}`,
          headers: {
              token: accessToken,
          },
          data: data
      })
        .done(data => {
          Swal.fire(
            'Edited!',
            'Todo has been edited.',
            'success'
          )
          landingPage()

        })
        .fail(err => {
          Swal.fire({
            icon: 'error',
            title: 'Failed to edit!',
            text: err.responseJSON.err
          })
        })
      }
    })

}

function getDate(val, type){
  if (!type) {
    let o = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "long",
    });
    return o.format(new Date(val))
  } else {
    var d = new Date(val),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }
}
