const fetchTodo = _ => {
    const access_token = localStorage.getItem('access_token')
    const userlocation = localStorage.getItem('userlocation')
    
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
            console.log(err);
            swal({
                title: `${err.statusText}`,
                text: `${err.responseJSON.msg}\nStatus Code: ${err.status}`,
                icon: 'error'
            })
        })

    $('#go-home').on('click', e => {
        e.preventDefault()
        showHome()
    })

    $('#logout').on('click', e => {
        swal({
            title: 'Tunggu',
            text: 'Kamu yakin mau keluar?',
            icon: 'warning',
            buttons: ['Nggak jadi', 'Keluar'],
            dangerMode: true
        })
            .then( keluar => {
                if (keluar) {
                    showLoginRegister()
                    localStorage.removeItem('access_token')
                    swal({
                        title: 'Sampai Jumpa!',
                        text: 'Kamu berhasil keluar',
                        icon: 'success'
                    })
                    // localStorage.removeItem('userlocation') // * Ga perlu karena suatu saat user bisa login lagi
                }
            })
    })
}