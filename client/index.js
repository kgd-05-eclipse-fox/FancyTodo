// const SERVER = 'https://todo-naim.herokuapp.com'
const SERVER = 'http://localhost:3000'
  
$(document).ready(()=>{
    const token = localStorage.getItem('token')
    if(token){
        $('#content-page').show()
        $('#login-page').hide()
        $('#singup-page').hide()
        $('#formAddTodo-page').hide()
        $('#form-Edit-Todo-page').hide()
        $("#allTodoListData").empty();
        $("#form-edit-todo").empty()
        localStorage.removeItem('UserId')
        allTodo()
    }else{
        $('#login-page').show()
        $('#content-page').hide()
        $('#singup-page').hide()
        $("#formAddTodo-page").hide()
        $('#form-Edit-Todo-page').hide()
        localStorage.removeItem('UserId')
    }
})



function userLogin(e){
    e.preventDefault()
    let email = $('#login-email').val()
    let password = $('#login-password').val()

    const name = email.substring(0, email.indexOf('@'))

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    

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
        allTodo()


        Toast.fire({
            icon: 'success',
            title: `${name} Signed in successfully`
        })
    })
    .fail(err=>{
        Toast.fire({
            icon: 'error',
            title: `Email or password is incorrect`
        })
        console.log(err)
    })
    
}

//google Sign in ===>>>>>>>>>>
function onSignIn(googleUser) {
    let google_access_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: "POST",
        url: SERVER + '/user/loginGoogle',
        data: {
            google_access_token
        }
    })
    .done(res=>{
        const token = res.access_token
        console.log(token)
        localStorage.setItem('token', token)
        $('#content-page').show()
        $('#login-page').hide()
        $('#singup-page').hide()
        allTodo()


        Toast.fire({
            icon: 'success',
            title: `${name} Signed in successfully`
        })
    })
    .fail(err=>[
        console.log(err)
    ])
}

// function signOut() {
// var auth2 = gapi.auth2.getAuthInstance();
// auth2.signOut().then(function () {
//     console.log('User signed out.');
// });
// }

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
    $.ajax({
        method: "GET",
        url: SERVER + '/todos',
        headers: {token}
    })
    .done(res=>{
        res.forEach((el,i)=>{
            let date = ''
            for(let i=0; i<10; i++){
                date += el.dueDate[i]
            }
            let makeDate = date.split('-')
            let newDate = `${makeDate[2]}-${makeDate[1]}-${makeDate[0]}`
            if(el.status === 'done'){
                $('#allTodoListData').append(
                    `<tr style="color: #EE964B;">
                    <th scope="row">${i+1}</th>
                    <td>${el.title}</td>
                    <td>${el.description}</td>
                    <td>${el.status}</td>
                    <td>${newDate}</td>
                    <td>
                        <button type="button" class="btn  btn-mini btn-outline-info mx-2 my-1" onclick="showEditForm(${el.id})">Edit</button>
                        <button type="button" class="btn  btn-mini btn-outline-danger mx-2 my-1" onclick="deletTodo(${el.id})">Delete</button>
                    </td>
                  </tr>`
                )
            }else{
                $('#allTodoListData').append(
                    `<tr>
                    <th scope="row">${i+1}</th>
                    <td>${el.title}</td>
                    <td>${el.description}</td>
                    <td>${el.status}</td>
                    <td>${newDate}</td>
                    <td>
                        <button type="button" class="btn  btn-mini btn-outline-info mx-2 my-1" onclick="showEditForm(${el.id})">Edit</button>
                        <button type="button" class="btn  btn-mini btn-outline-danger mx-2 my-1" onclick="deletTodo(${el.id})">Delete</button>
                        <button type="button" class="btn  btn-mini btn-outline-success mx-2 my-1" onclick="todoDone(${el.id})">DONE</button>
                    </td>
                  </tr>`
                )
            }
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
    let dateDay = new Date
    let datePick = new Date(dueDate)
    let checkDate = dateDay < datePick
    let token = localStorage.token

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    if(checkDate === false && title === '' && description === '') {
        Toast.fire({
            icon: 'error',
            title: `Error`
        })
    } else if(checkDate === false) {
        Toast.fire({
            icon: 'error',
            title: `Select 1 day from today`
        })
    } else if(description === '' ) {
        Toast.fire({
            icon: 'error',
            title: `Do not Empty Title`
        })
    } else if(title === '') {
        Toast.fire({
            icon: 'error',
            title: `Do not Empty Sescription`
        })
    } else {
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

}

function editTodo(id){
    const token = localStorage.token
    const UserId = id
    localStorage.setItem('UserId', UserId)
    $.ajax({
        method: "GET",
        url: SERVER + `/todos/${UserId}`,
        headers: {token}
    })
    .done(res=>{
        let title = res.title
        let description = res.description
        let dueDate = res.dueDate
        let date = ''
            for(let i=0; i<10; i++){
                date += dueDate[i]
            }
        $('#form-edit-todo').append(
        `<form onsubmit="editDataTodo(event)">
            <div class="form-group">
                <label class="text-light"><b>Title</b></label>
                <input id="edit-todo-title" type="text" class="form-control" placeholder="You'r Title To Do" value="${title}">
            </div>
            <div class="form-group">
                <label class="text-light"><b>Description</b></label>
                <input id="edit-todo-description" type="text" class="form-control" placeholder="You'r Description To Do" value="${description}">
            </div>
            <div class="form-group">
                <label class="text-light"><b>Due Date</b></label>
                <input id="edit-todo-dueDate" type="date" class=" form-control" value="${date}">
                <small class="form-text text-muted text-light">Minimal 1 hari dari hari ini</small>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>`
        )
        
    })
    .fail(err=>{
        console.log(err)
    })
}

function editDataTodo(e){
    e.preventDefault()
    let title = $('#edit-todo-title').val()
    let description = $('#edit-todo-description').val()
    let dueDate = $('#edit-todo-dueDate').val()
    let token = localStorage.token
    let UserId = localStorage.UserId

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        $.ajax({
            type: "PUT",
            url: SERVER + `/todos/${UserId}`,
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
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        backToList()
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

}

function todoDone(id){
    let UserId = id
    let token = localStorage.token
    $.ajax({
        type: "PATCH",
        url: SERVER + `/todos/${UserId}`,
        headers: {token},
        data: {
            status: 'done'
        }
    })
    .done(res=>{
        backToList()
    })
    .fail(err=>[
        console.log(err)
    ])
}

function deletTodo(id){
    let UserId = id
    let token = localStorage.token

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
              method: "DELETE",
              url: SERVER + `/todos/${UserId}`,
              headers: {token}
          })
          .done(res=>{
              backToList()
          })
          .fail(err=>{
              console.log(err)
          })
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })


}

$('#User-back-login').on('click', () => {
    backToSignin()
})

$('#btn-logout').on('click', ()=>{
  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Logout!'
  }).then((result) => {
    if (result.isConfirmed) {
      logout()
      signOut()
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
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

function showEditForm(id){
    $('#form-Edit-Todo-page').show()
    $('#formAddTodo-page').hide()
    $('#All-Todo-page').hide()
    editTodo(id)
    // localStorage.removeItem('UserId')
}

function cancelSingup(){
    $('#content-page').hide()
    $('#login-page').show()
    $('#singup-page').hide()
    localStorage.removeItem('token')
    localStorage.removeItem('UserId')
}

function signup(){
    $('#content-page').hide()
    $('#login-page').hide()
    $('#singup-page').show()
    localStorage.removeItem('token')
    localStorage.removeItem('UserId')
}

function backToSignin() {
    $('#content-page').hide()
    $('#login-page').show()
    $('#singup-page').hide()
    localStorage.removeItem('token')
    localStorage.removeItem('UserId')
}

function logout(){
    $("#form-edit-todo").empty()
    $("#allTodoListData").empty()
    $('#login-email').val('')
    $('#login-password').val('')
    $('#content-page').hide()
    $('#login-page').show()
    $('#singup-page').hide()
    localStorage.removeItem('token')
    localStorage.removeItem('UserId')
}

function backToList(){
    $('#add-todo-title').val('')
    $('#add-todo-description').val('')
    $('#add-todo-dueDate').val('')
    $("#allTodoListData").empty();
    $("#form-edit-todo").empty()
    $('#formAddTodo-page').hide()
    $('#form-Edit-Todo-page').hide()
    $('#All-Todo-page').show()
    localStorage.removeItem('UserId')
    allTodo()
}

function addTodo(){
    $('#formAddTodo-page').show()
    $('#form-Edit-Todo-page').hide()
    $('#All-Todo-page').hide()
    localStorage.removeItem('UserId')
}
