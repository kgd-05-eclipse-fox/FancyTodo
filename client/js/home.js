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
            $('.data').empty()
            new Promise( res => {
                const todayWeather = data.todayWeather
                const todos = data.todos
                const weather = `
                <p>
                    You are currently in ${todayWeather.location}</br>
                    Current Weather is ${todayWeather.weather} with temperature ${todayWeather.temperature.temp} Degree
                </p>
                `
                $('.weather').append(weather)
                
                todos.forEach( todo => {
                    $('.data').append(`${todo.id}, ${todo.title}, ${todo.description}, ${todo.status}`)
                })
                res()
            })
                .then( () => {
                    $('.loader-wrapper').fadeOut('slow')
                })
        })
        .fail(err => {
            Swal.fire({
                title: `${err.statusText}`,
                text: `${err.responseJSON.msg}\nStatus Code: ${err.status}`,
                icon: 'error'
            })
        })

    $('.go-home').on('click', e => {
        e.preventDefault()
        console.log('kepencet');
        showHome()
    })

    $('#logout').on('click', e => {
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
                    showLoginRegister()
                    localStorage.removeItem('access_token')
                    Toast.fire({
                        icon: 'success',
                        title: 'Berhasil Keluar'
                    })
                    // localStorage.removeItem('userlocation') // * Ga perlu karena suatu saat user bisa login lagi
                }
            })
    })
}