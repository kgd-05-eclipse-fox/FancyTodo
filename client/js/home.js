const fetchTodo = _ => {
    const access_token = localStorage.getItem('access_token')
    const userlocation = localStorage.getItem('userlocation')

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: toast => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    
    $.ajax({
        method: 'GET',
        url: 'http://127.0.0.1:3000/todos',
        headers: {
            access_token,
            userlocation
        }
    })
        .done(data => {
            $('.weather').empty()
            $('#todos-pending').empty()
            $('#todos-finished').empty()
            new Promise( res => {
                const todayWeather = data.todayWeather
                const todos = data.todos
                const weather = `
                <img src="${todayWeather.icon}" />
                <p>
                    You are currently in <b>${todayWeather.location}</b></br>
                    Current Weather is ${todayWeather.weather} with temperature <b>${todayWeather.temperature.temp} Celcius</b>
                </p>
                `
                $('.weather').append(weather)
                todos.forEach( todo => {
                    let todostatus = todo.status
                    if (!todostatus) {
                        $('#todos-pending').append(`
                        <tr>
                            <th scope="row">${todo.id}</th>
                            <th scope="row">
                              <div class="media align-items-center">
                                <div class="media-body">
                                  <span class="mb-0 text-sm">${todo.title}</span>
                                </div>
                              </div>
                            </th>
                            <td>${todo.description}</td>
                            <td>${todo.due_date}</td>
                            <td>
                                <span class="badge badge-dot mr-4">
                                    <i class="bg-warning"></i> Pending
                                </span>
                            </td>
                            <td class="text-right"> 
                              <button type="button" onclick="editTodo(${todo.id}, '${todo.title}', '${todo.description}', '${todo.due_date}')" class="edit-todo btn btn-primary">Edit</button>
                              <button type="button" onclick="markDoneTodo(${todo.id})" class="markdone-todo btn btn-success">Mark Done</button>
                              <button type="button" onclick="deleteTodo(${todo.id})" class="delete-todo btn btn-danger">Delete</button>
                            </td>
                          </tr>
                        `)
                    } else {
                        $('#todos-finished').append(`
                        <tr>
                            <th scope="row">${todo.id}</th>
                            <th scope="row">
                              <div class="media align-items-center">
                                <div class="media-body">
                                  <span class="mb-0 text-sm">${todo.title}</span>
                                </div>
                              </div>
                            </th>
                            <td>${todo.description}</td>
                            <td>${todo.due_date}</td>
                            <td>
                                <span class="badge badge-dot">
                                    <i class="bg-info"></i> Done
                                </span>
                            </td>
                            <td class="text-right"> 
                              <button type="button" onclick="markUndoneTodo(${todo.id})" class="markdone-todo btn btn-success">Mark Undone</button>
                              <button type="button" onclick="deleteTodo(${todo.id})" class="delete-todo btn btn-danger">Delete</button>
                            </td>
                          </tr>
                        `)
                    }
                    // ${todo.id}, ${todo.title}, ${todo.description}, ${todo.status}
                })
                res()
            })
                .then( () => {
                    $('.loader-wrapper').fadeOut('slow')
                })
        })
        .fail(err => {
            $('.loader-wrapper').fadeOut('slow')
            localStorage.removeItem('access_token')
            showLoginRegister()
            Swal.fire({
                title: `${err.statusText}`,
                text: `${err.responseJSON.msg}\nStatus Code: ${err.status}`,
                icon: 'error'
            })
        })

    $('.go-home').on('click', e => {
        e.preventDefault()
        showHome()
    })

    $('#logout').on('click', e => {
        e.preventDefault()
        Swal.fire({
            title: 'Sebentar',
            text: 'Kamu yakin mau keluar?',
            icon: 'question',
            allowOutsideClick: false,
            showCancelButton: true,
            focusCancel: true,
            reverseButtons: true,
            confirmButtonText: 'Keluar',
            cancelButtonText: 'Nggak jadi'
        })
            .then( button => {
                if (button.isConfirmed) {
                    container.classList.remove("right-panel-active")
                    showLoginRegister()
                    localStorage.removeItem('access_token')
                    localStorage.removeItem('email')
                    Toast.fire({
                        icon: 'success',
                        title: 'Berhasil Keluar'
                    })
                    // * Google SignOut
                    var auth2 = gapi.auth2.getAuthInstance()
                    auth2.signOut()
                    // localStorage.removeItem('userlocation') // * Ga perlu karena suatu saat user bisa login lagi
                }
            })
    })
}