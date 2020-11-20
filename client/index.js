const SERVER = "http://localhost:3000"
$(document).ready(() => {
  const token = localStorage.token;
  $("#add-todo-page").hide();
  $("#register-page").hide();
  $(".error-message").empty();
  if (token) {
    getAllTodo();
    $("#landing-page").hide();
    $("#home-page").show();
    $("#homepage_navbar").show()
    $("#nowPlayingMovie").hide()
  } else {
    $("#todo-cart").hide()
    $("landing_navbar").hide()
    $("#landing-page").show();
    $("#home-page").hide();
    $("#homepage_navbar").hide()
    $("#nowPlayingMovie").hide()
  }
})
$("#register-link").on("click", () => {
  $("#register-page").show();
  $(".error-message").empty();
  $("#landing-page").hide();
  $("#home-page").hide();
  $('#homepage_navbar').hide()
  $("#todo-cart").hide()
})

$("#logo-home").on("click", () => {
  getAllTodo();
  $("#landing-page").hide();
  $("#home-page").show();
  $("#homepage_navbar").show()
  $("#nowPlayingMovie").hide()
})

$("#cancel-register").on("click", () => {
  $("#add-todo-page").hide();
  $("#edit-todo-page").empty();
  $('#homepage_navbar').hide()
  $("#todo-cart").hide()
  ready();
})
$(".cancel-button").on("click", () => {
  $("#add-todo-page").hide();
  $("#edit-todo-page").empty();
  ready();
})
$("#logout-button").on("click", () => {
  $("#landing-page").show();
  $("#home-page").hide();
  $(".error-message").empty();
  $('#homepage_navbar').hide()
  signOut();
  $('.grid-item-1').empty();

  localStorage.clear();
})
$("#del-button").on("click", () => {
  ready()
})
$("#add-todo-button").on("click", () => {
  $("#success-message").empty();
  $("#home-page").hide();
  $("#add-todo-page").show();
})

$("#list-all-movie").on("click", () => {
  $("home-page").hide();
  $("nowPlayingMovie").show();

})

function getAllTodo() {
  const token = localStorage.getItem("token");
  $.ajax({
    method: "GET",
    url: SERVER + "/todos",
    headers: {
      token
    }
  }).done(response => {
    if (response.length !== 0) {
      response.forEach(element => {
        $("#content-card").append(`
          <div class="row justify-content-center mt-5">
            <div class="card text-black bg-light mb-3" style="width: 100rem;">
              <div class="card-header" style="height: 3rem;">${new Date(element.due_date).toISOString().split('T')[0]}</div>
              <div class="card-body" style="display:block;">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text" id="todo-description${element.id}"></p>
                <div id="dropdown${element.id}" class="btn-group" role="group">
                  <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    More
                  </button>
                  <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <a class="dropdown-item" id="back-button${element.id}" href="#">Close</a>
                    <a class="dropdown-item" id="edit-button${element.id}" href="#">Edit</a>
                  </div>
                </div>
                <button type="button" id="info-button${element.id}" class="btn btn-light" onclick="todoInfo(${element.id})">Info</button><br><br>
                <p>At: ${new Date(element.due_date).toString().split(" ")[4].split(":").slice(0, 2).join(":")} o'clock</p>
                <a href="#" id="done${element.id}">
                  <svg width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg>
                </a>
                <a href="#" id="yetDone${element.id}">
                  <svg width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-check-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                  </svg>
                </a>
                <p class="text-right"><button id="del-button" class="btn btn-warning" onclick="del(${element.id})">Delete</button></p>
              </div>
            </div>
          </div>
        `)
        if(element.status === true) {
          $(`#yetDone${element.id}`).hide();
        }else {
          $(`#done${element.id}`).hide();
        }
        $(`#dropdown${element.id}`).hide()
        $(`#back-button${element.id}`).on("click", () => {
          $(`#info-button${element.id}`).show();
          $(`#todo-description${element.id}`).empty();

        });
        $(`#edit-button${element.id}`).on("click", () => {
          $(`#info-button${element.id}`).show();
          $(`#todo-description${element.id}`).empty();
          $(`#dropdown${element.id}`).hide();
          $('#homepage_navbar').show()
          editTodoSource(element.id)
        })
        $(`#done${element.id}`).on("click", () => {
          yetDoneStatus(element.id);
          $(`#yetDone${element.id}`).show();
          $(`#done${element.id}`).hide();    
        })
        $(`#yetDone${element.id}`).on("click", () => {
          doneStatus(element.id);
          $(`#done${element.id}`).show();
          $(`#yetDone${element.id}`).hide();
        })
      });
    } else {
      $("#content-card").append(`
        <div class="row justify-content-center mt-5">
          <p>It's empty here</p>
        </div>
      `)
    }
  }).fail(err => {
    errorMessage(err)
  })
}
function addTodo(event) {
  event.preventDefault();
  const token = localStorage.getItem("token");
  const title = $("#add-title-todo").val();
  const description = $("#add-description-todo").val();
  const due_date = $("#add-due-date-todo").val();
  const clock = $("#add-clock-todo").val();
  const date = new Date(due_date + " " + clock)
  console.log('masuk')
  $.ajax({
    method: "POST",
    url: SERVER + "/todos",
    headers: {
      token
    },
    data: {
      title,
      description,
      due_date: date
    }
  }).done(response => {
    $("#content-card").empty();
    getAllTodo()
    $("#landing-page").hide();
    $("#home-page").show();
    $("#add-todo-page").hide();
  }).fail(err => {
    errorMessage(err)
  })
}
function editTodoSource(id) {
  const token = localStorage.getItem("token")
  $.ajax({
    method: "GET",
    url: SERVER + "/todos/" + id,
    headers: {
      token
    }
  }).done(response => {
    console.log(response)
    $(`#home-page`).hide();
    $(`#edit-todo-page`).empty();
    $(`#edit-todo-page`).append(`
    <h1 class="font-weight-bold" style="text-align: center;">Edit Form</h1>
      <div class="row justify-content-center mt-5">
        <div class="col-5">
          <form onsubmit="editTodo(${response.id}, event)">
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text" id="edit-title-todo" class="form-control" value="${response.title}">
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea class="form-control" id="edit-description-todo" rows="3" maxlength="255">${response.description}</textarea>
            </div>
            <div class="form-group">
              <label for="due_date">Due Date</label>
              <input type="date" id="edit-due-date-todo" class="form-control" value="${new Date(response.due_date).toISOString().split("T")[0]}">
            </div>
            <div class="form-group">
              <label for="clock">Clock</label>
              <input type="time" id="edit-clock-todo" class="form-control" value="${new Date(response.due_date).toString().split(" ")[4].split(":").slice(0, 2).join(":")}">
              <small id="emailHelp" class="form-text text-muted">e.g. 00:00 AM</small>
            </div>
            <div class="form-check" id="form-check">
              
            </div><br>
            <button type="submit" class="btn btn-primary">Finish Edit</button>
            <a href="#" class="cancel-button">Cancel</a><br><br>
            <div class="error-message"></div>
            <div class="register-success"></div>
          </form>
        </div>
      </div>
    `);
    if(response.status === true) {
      $('#form-check').empty();
      $('#form-check').append(`
        <input style="cursor:pointer" class="form-check-input" type="radio" id="status-true" name="status" value="true" checked>
        <label for="male">Done</label><br>
        <input style="cursor:pointer" class="form-check-input" type="radio" id="status-false" name="status" value="false">
        <label for="female">Not Yet Done</label>
      `)
    } else {
      $('#form-check').empty();
      $('#form-check').append(`
        <input style="cursor:pointer" class="form-check-input" type="radio" id="status-true" name="status" value="true">
        <label for="male">Done</label><br>
        <input style="cursor:pointer" class="form-check-input" type="radio" id="status-false" name="status" value="false" checked>
        <label for="female">Not Yet Done</label>
      `)
    }
    $(".cancel-button").on("click", () => {
      $("#add-todo-page").hide();
      $("#edit-todo-page").empty();
      ready();
    })
  }).fail(err => {
    errorMessage(err)
  })
}
function editTodo(id, event) {
  event.preventDefault();
  const token = localStorage.getItem("token");
  const title = $("#edit-title-todo").val();
  const description = $("#edit-description-todo").val();
  const due_date = $("#edit-due-date-todo").val();
  const clock = $("#edit-clock-todo").val();
  const date = new Date(due_date + " " + clock)
  $.ajax({
    method: "PUT",
    url: SERVER + "/todos/" + id,
    headers: {
      token
    },
    data: {
      title,
      description,
      due_date: date
    }
  }).done(response => {
    $("#content-card").empty();
    getAllTodo()
    $("#landing-page").hide();
    $("#home-page").show();
    $("#add-todo-page").hide();
    $("#edit-todo-page").empty()
  }).fail(err => {
    errorMessage(err)
  })
}
function todoInfo(id) {
  const token = localStorage.getItem("token");
  $("todo-description").show()
  $.ajax({
    method: "GET",
    url: SERVER + "/todos/" + id,
    headers: {
      token
    }
  }).done(response => {
    $(`#todo-description${id}`).append(response.description);
    $(`#dropdown${id}`).show();
    $(`#info-button${id}`).hide();
  }).fail(err => {
    console.log(err)
  })
}
function del(params) {
  const token = localStorage.getItem("token")
  $.ajax({
    method: "DELETE",
    url: SERVER + "/todos/" + params,
    headers: {
      token
    }
  }).done(response => {
    $("#content-card").empty();
    successMessage(response.message)
  }).fail(err => {
    console.log(err)
  })
}
function successMessage(message) {
  $("#success-message").empty();
  getAllTodo()
  $("#success-message").append(`
    <div class="row justify-content-center mt-5">
      <p class="alert alert-success" role="alert" style="color: green;">${message}</p>
    </div>
  `)
  setTimeout(() => {
    $("#success-message").empty();
  }, 3000);
}
function errorMessage(message) {
  $(".error-message").empty();
  // let errors = message.responseJSON.message.split(', ');
  console.log(message)
  errors.forEach(element => {
    $(".error-message").append(`
        <p class="alert alert-danger" role="alert" style="color: red;">${element}</p>
      `)
  })
}
function doneStatus(id) {
  const token = localStorage.getItem("token");
  const status = true;
  $.ajax({
    method: "PATCH",
    url: SERVER + "/todos/" + id,
    headers: {
      token
    },
    data: {
      status
    }
  }).done(response => {
    console.log(response)
  }).fail(fail => {
    console.log(err)
  })
}
function yetDoneStatus(id) {
  const token = localStorage.getItem("token");
  const status = false;
  $.ajax({
    method: "PATCH",
    url: SERVER + "/todos/" + id,
    headers: {
      token
    },
    data: {
      status
    }
  }).done(response => {
    console.log(response)
  }).fail(fail => {
    console.log(err)
  })
}
function login(event) {
  event.preventDefault();
  const email = $("#login-email").val();
  const password = $("#login-password").val();
  $.ajax({
    method: "POST",
    url: SERVER + "/login",
    data: {
      email,
      password
    }
  }).done(response => {
    console.log(response.picture)
    $("#content-card").empty();
    const token = response.access_token;
    const email = response.email;
    localStorage.setItem("token", token);
    localStorage.setItem("picture", "anon/unknown.png");
    localStorage.setItem("email", email);
    getAllTodo()
    $("#landing-page").hide();
    $("#home-page").show();
    $('#homepage_navbar').show()
}).fail(err => {
    errorMessage(err)
    
  })
}
function register(event) {
  event.preventDefault();
  const email = $("#register-email").val();
  const password = $("#register-password").val();
  $.ajax({
    method: "POST",
    url: SERVER + "/register",
    data: {
      email,
      password
    }
  }).done(response => {
    $("#landing-page").show();
    $("#home-page").hide();
    $("#register-page").hide();
    $(".register-success").empty();
    $(".register-success").append(`
      <p class="alert alert-success" role="alert" style="color: green;">Successful register</p>
    `)
  }).fail(err => {
    errorMessage(err)
  })
}
function ready() {
  $(document).ready(() => {
    const token = localStorage.token
    $("#register-page").hide();
    $(".error-message").empty();
    if (token) {
      $("#landing-page").hide();
      $("#home-page").show();
      $('#homepage_navbar').show()
    } else {
      $("#landing-page").show();
      $("#home-page").hide();
      $('#homepage_navbar').hide()
    }
  })
}

//Google Sign In
function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  console.log(id_token)
  $.ajax({
    method: "POST",
    url: SERVER + "/loginGoogle",
    data: {
      google_access_token: id_token
    }
  }).done(response => {
    $("#content-card").empty();
    const token = response.access_token
    const picture = response.picture
    const email = response.email
    localStorage.setItem("access_token", token);
    localStorage.setItem("picture", picture);
    localStorage.setItem("email", email);
    getAllTodo()
    $("#landing-page").hide();
    $("#home-page").show();
    $("#homepage_navbar").show()
    $("#nowPlayingMovie").hide()
  }).fail(err => {
    console.log(err)
  })
}
// Google Sign Out
function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function movies() {
  $('#login_page').hide()
  $('#landing_navbar').hide()
  $('#register').hide()
  $('#allMovies').show()
  $('#homepage_navbar').show()
}

function listPlaying(){

    $('#landing_navbar').hide()
    $('#homepage_navbar').hide()
    $('#nowPlayingMovie').show()
    $("#todo-cart").hide()
}

function viewAllMovies (){
  $("#listmovie").html("")
  $.ajax({
    url : "http://www.omdbapi.com/",
    type : "GET",
    datatype : "json",
    data : {
      "apikey" : "16c6c427",
      "s" : $("#carijudul").val()
    },
    success : function(result){
      let movie = result.Search
      if(result.Response === "True"){
        $.each(movie, function(i, data){
          $("#listmovie").append(`
            <div class = "col col-md-4 mb-3">
              <div class="card">
                <img src="`+ data.Poster +`" class="card-img-top"  alt="...">
                <div class="card-body">
                  <h5 class="card-title">`+ data.Title +`</h5>
                  <h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
                  <a href="#" class="btn btn-primary lihatdetail" data-toggle="modal" 
                  data-target="#exampleModal" data-id="`+ data.imdbID + `">detail</a>
                </div>
              </div>
            </div>
          `)
        })
      }else {
        $("#listmovie").html(`
        <div class="col">
          <h3 class = "text-center">` + result.Error +`</h3>`)
      }
    }
  })
}
$("#tombolcari").on("click", function(){
  viewAllMovies()
})

$("#carijudul").on("keyup", function(e){
  if(e.keyCode == 13){
    viewAllMovies()
  }
})

$("#listmovie").on("click", ".lihatdetail", function(){
  let idmovie= $(this).data('id')
  $.ajax({
    url : "http://www.omdbapi.com/",
    type : "GET",
    datatype : "json",
    data : {
      "apikey" : "16c6c427",
      "i" : idmovie
    },
    success : function(result){
      if(result.Response === "True"){
        $(".modal-title").html("")
        $(".modal-title").html(result.Title)
        $(".modal-body").html(`
          <div class ="container-fluid">
            <div class="row">
            <div class="col-md-4">
              <img src="`+ result.Poster +`" class ="img-fluid">
            </div>
            <div class ="col-md-8>
              <ul class="list-group">
                <li class="list-group-item">Year : `+result.Year+`</li>
                <li class="list-group-item">Released : `+result.Released+`</li>
                <li class="list-group-item">Genre : `+result.Genre+`</li>
                <li class="list-group-item">Actors : `+result.Actors+`</li>
                <li class="list-group-item">Plot : `+result.Plot+`</li>
            </ul>
            </div>
          </div>
        </div>
        `)
      }
    }
  })
})