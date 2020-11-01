const URLSERVER = "http://localhost:3000";


$(document).ready(function () {
    checklogin();
})

const checklogin = () => {
    const token = localStorage.getItem('token')
    if (token) {
        $('#home-page').show();
        $('#login-page').hide();
        $('#register-page').hide();
        $('#list-page').hide();
        $('#add-activity-page').hide();
        $('#edit-page').hide();
        $('#nav-weather').show();

    } else {
        $('#login-page').show();
        $('#home-page').hide();
        $('#register-page').hide();
        $('#register-page').hide();
        $('#list-page').hide();
        $('#add-activity-page').hide();
        $('#edit-page').hide();
        $('#nav-weather').hide();

    }
}

const showloginpage = (event) => {
    event.preventDefault(event)
    const token = localStorage.getItem('token')
    if(token) {
        $('#home-page').show()
    } else {
        $('#login-page').show();
        $('#register-page').hide();
    }
}

const login = (event) => {
    event.preventDefault();
    const email = $('#inputemail').val();
    const password = $('#inputpassword').val();
    $.ajax({
        method: 'POST',
        url: `${URLSERVER}/login`,
        data: {
            email,
            password
        }
    })
    .done(response=> {
        weather(event)
        const token = response.access_token
        localStorage.setItem('token', token)
        console.log('login sukses');
        $('#home-page').show();
        $('#login-page').hide();

    })
    .fail(err=>{
        $('#register-page').show();
        $('#login-page').hide();
        $('#home-page').hide();
        console.log(err);
    })
}

//Google Sign In
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var google_access_token = googleUser.getAuthResponse().id_token;
    // console.log(google_access_token);

    //VERIFY GOOGLE ACCESS TOKEN
    //PAKE AJAX(METHOD,URL)

    $.ajax({
        url: `${URLSERVER}/googleLogin`,
        method: 'POST',
        data:{
            google_access_token
        }
    })
    .done(response => {
        console.log(response);
        const token = response.access_token
        localStorage.setItem('token', token);
        checklogin();
    })
    .fail(err => {
        console.log(err);
    })

  }

//Google Sign Out
function signOut() {

}





const showregisterpage = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token')
    if(token) {
        $('#home-page').show()
    } else {
        $('#login-page').show();
        $('#register-page').hide();
    }
}

const register = (event) => {
    event.preventDefault();
    const email = $('#email-register').val();
    const password = $('#password-register').val();

    console.log(email,password);

    $.ajax({
        method: 'POST',
        url: `${URLSERVER}/register`,
        data: {
            email,
            password
        }
    })
    .done(response => {
        console.log('register sukses');
        $('#login-page').show();
        $('#register-page').hide();
    })
    .fail(err => {
        console.log(err);
    })
}

function logout() {
    localStorage.clear();
    $('#home-page').hide();
    $('#list-page').hide();
    $('#add-activity-page').hide();
    $('#login-page').show();
    
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function list(event) {
    event.preventDefault();
    $('#list-page').show();
    $('#home-page').hide();
    $('#add-activity-page').hide();
    
    const token = localStorage.getItem('token');
    $.ajax({
        url: `${URLSERVER}/todos`,
        method: 'GET',
        headers: {
            token: token
        }
    })
    .done(response => {
        
        $('#list').empty();
        response.forEach((element, index) => {
        $('#list').append(`
            <tr>
                <td>${index+1}</td>
                <td>${element.title}</td>
                <td>${element.description}</td>
                <td>${element.status}</td>
                <td>${element.due_date}</td>
                <td>
                <a href=""><button class="btn btn-success btn-sm" onclick="showEditForm(event, ${element.id})">Edit</button></a>
                <br>
                <a href=""><button class="btn btn-danger btn-sm" onclick="deleteById(event, ${element.id})">Delete</button></a>
                <br>
                <a href=""><button class="btn btn-dark btn-sm" onclick="patchById(event,${element.id})">Done</button></a>
                </td>
            </tr>
        `)
        })
    })
    .fail(err => {
        console.log(err);
    })
}


const showAddActivity = () => {
    $('#add-activity-page').show();
    $('#home-page').hide();
    $('#list-page').hide();
    $('#edit-page').hide();
}

const addActivity = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    const title = $('#title-activity').val();
    const description = $('#description-activity').val();
    const date = $('#date-activity').val();

    $.ajax({
        url: `${URLSERVER}/todos`,
        method: 'POST',
        headers: {
            token: token
        },
        data: {
            title: title,
            description: description,
            due_date: date
        }
    })
    .done(response => {
        list(event)
    })
    .fail(err => {
        console.log(err);
    })
}

const deleteById = (event, id) => {
    console.log('ini delete');
    event.preventDefault();
    const todoId = id
    console.log(todoId);
    const token = localStorage.getItem('token')
    $.ajax({
        url: `${URLSERVER}/todos/${todoId}`,
        method: 'DELETE',
        headers: {
            token: token
        },
        data:{
            id: todoId
        }
    })
    .done(response => {
        $('#list-page').hide();
        $('#home-page').show();
        $('#add-activity-page').hide();
    })
    .fail(err => {
        console.log(err);
    })
}

const showEditForm = (event,id) => {
    event.preventDefault()
    $('#edit-page').show();
    $('#list-page').hide();
    $('#home-page').hide();
    getDateEditById(id)

}


const getDateEditById = (id) => {
    const token = localStorage.getItem('token')
    $.ajax({
        url: `${URLSERVER}/todos/${id}`,
        method: 'GET',
        headers: {
            token: token
        }
    })
    .done(response => {
        console.log(response);
        $('#edit-page').show();
        $('#edit-form').append(`
        <div class="form-row">
            <div class="col-lg-7">
              <!--Title-->
              <input id="edit-title" type="text" placeholder="${response.title}" class="form-control my-3 p-4">
              <label for="title" style="font-weight: bold;">Title</label>
            </div>
          </div>
           <!--End Title-->
  
           <!--Description-->
          <div class="form-row">
            <div class="col-lg-7">
              <input id="edit-description" type="text" placeholder="${response.description}" class="form-control my-3 p-4">
              <label for="description" style="font-weight: bold;">Description</label>
            </div>
          </div>
           <!--End Description-->
  
           <!--Date-->
          <div class="form-row">
            <div class="col-lg-7">
              <input id="edit-date" class="form-control my-3 p-4"
              type="date" placeholder="${response.due_date}">
              <label for="due_date" style="font-weight: bold;">Due Date</label>
              </div>
          </div>
           <!--End Date-->

          <div class="form-row">
            <div class="col-lg-7">
              <button type="submit" class="btn1 mt-2 mb-5" onclick="editById(event, ${response.id})">Edit</button>
            </div>
        `)
    })
    .fail(err=> {
        console.log(err);
    })
}

const editById = (event, id) => {
    event.preventDefault();
    
    const token = localStorage.getItem('token')
    const title = $('#edit-title').val();
    const description = $('#edit-description').val();
    const date = $('#edit-date').val();

    $.ajax({
        url: `${URLSERVER}/todos/${id}`,
        method: 'PUT',
        headers: {
            token: token
        },
        data: {
            title: title,
            description: description,
            due_date: date
        }
    })
    .done(response => {
        $('#home-page').show();
        $('#edit-page').hide();
    })
    .fail(err => {
        console.log(err);
    })
}

const patchById = (event, id) => {
    event.preventDefault()
    console.log('aku di patch');
    console.log(id);
    const finished = 'finished'
    const token = localStorage.getItem('token')

    $.ajax({
        url: `${URLSERVER}/todos/${id}`,
        method: 'PATCH',
        headers: {
            token: token
        },
        data: {
            status: finished
        }
    })
    .done(response => {
        $('#home-page').show();
        $('#list-page').hide();
    })
    .fail(err => {
        console.log(err);
    })
}

const weather = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token')

    $.ajax({
        url: `${URLSERVER}/weathers/location`,
        method: 'GET',
        headers: {
            token: token
        }
    })
    .done(response => {
        console.log(response);
        const city = response.name
        console.log(city);
        const wind = `${response.wind.speed} m/s`
        const temp = `${Math.floor(response.main.temp - 273.15)} Celcius`
        const weather = `${response.weather[0].main}`

        console.log(temp,weather);


        $('#nav-weather').append(`
        <li class="nav-item">
        <p>City: ${city}</p>
        <p>Wind: ${wind}</p>
        </li>
        <li class="nav-item">
        <p>Weather: ${weather}</p>
        <p>Temp: ${temp}</p>
        </li>
        `)
    })
    .fail(err => {
        console.log(err);
    })

}