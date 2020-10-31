const SERVER = 'http://127.0.0.1:3000'

// * Login Template Script
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
// * End Login Template Script

$(document).ready( () => {
    // * Check Local Storage
    const loggedIn = localStorage.getItem('access_token')
    if (loggedIn) {
        showHome()
    } else {
        showLoginRegister()
    }
})

// * Route
const showLoginRegister = _ => {
    $(".loader-wrapper").hide()
    $('.loginregister').show()
    $('.home').hide()
    login()
    getLocation()
}

const showHome = _ => {
    $('.loader-wrapper').show()
    $('.loginregister').hide()
    $('.home').show()
    fetchTodo()
}

const refreshHome = _ => {
    $('.loginregister').hide()
    $('.home').show()
    fetchTodo()
}

const hideAll = _ => {
    $('.home').hide()
    $('.login').hide()
}

// * Get User Location
const getLocation = _ => {
    if (navigator.geolocation) {
        if (!localStorage.getItem('userlocation')) {
            Swal.fire({
                title: 'Tunggu!',
                text: 'Aku butuh akses lokasi kamu nih',
                icon: 'info',
                buttons: ['Nggak Boleh', 'Boleh Dong']
            })
                .then( akses => {
                    if(akses) {
                        navigator.geolocation.getCurrentPosition(success, error)
                    } else {
                        error()
                    }
                })
        }
    } else {
        Swal.fire({
            title: 'Maaf :(',
            text: 'Fitur Geolocation nggak disupport browser kamu...',
            icon: 'warning',
        })
            .then( akses => {
                if(akses) {
                    error()
                }
            })
    }

    function success(location) {
        const userlocation = {
            lat: location.coords.latitude,
            lon: location.coords.longitude
        }
        localStorage.setItem('userlocation', JSON.stringify(userlocation))
    }

    function error() {
        hideAll()
        Swal.fire({
            title: 'Oops...',
            text: 'Kamu tidak dapat lanjut ke website ini :(',
            icon: 'error'
        })
            .then( close => {
                if (close) {
                    window.close()
                }
            })
    }
}

// * Toast SweetAlert 
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

// * Delete Todo
const deleteTodo = id => {
    const access_token = localStorage.getItem('access_token')
    const userlocation = localStorage.getItem('userlocation')
    Swal.fire({
        title: `Delete Todo`,
        text: `Kamu yakin mau hapus todo dengan id ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        reverseButtons: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Hapus'
    })
        .then( button => {
            if (button.isConfirmed) {
                $.ajax({
                    method: 'DELETE',
                    url: `http://127.0.0.1:3000/todos/${id}`,
                    headers: {
                        access_token,
                        userlocation
                    }
                })
                    .done( () => {
                        refreshHome()
                        Toast.fire({
                            title: `Berhasil!`,
                            text: `Kamu berhasil menghapus Todo dengan id ${id}`,
                            icon: `success`
                        })
                    })
            }
        })
}

// * Edit Todo (Put)
const editTodo = (id, title, description, due_date) => {
    // const access_token = localStorage.getItem('access_token')
    // const userlocation = localStorage.getItem('userlocation')
    Swal.fire({
        title: `Edit Todo`,
        html: `
        <input type="text" id="title" class="swal2-input" placeholder="Judul" value="${title}">
        <input type="text" id="description" class="swal2-input" placeholder="Deskripsi" value="${description}">
        <input type="date" id="due_date" class="swal2-input" placeholder="Tanggal" value="${due_date}">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        reverseButtons: true,
        confirmButtonText: 'Edit',
        preConfirm : _ => {
            const title = Swal.getPopup().querySelector('#title').value
            const description = Swal.getPopup().querySelector('#description').value
            const due_date = Swal.getPopup().querySelector('#due_date').value
            if (!title || !description || !due_date) {
                Swal.showValidationMessage(`Tolong lengkapi semua kolom`)
            }
            return { title, description, due_date, status: false }
        }
    })
        .then( status => {
            if (status.isConfirmed) { // ! WAIT FROM SERVER-SIDE (on-progress)
                // $.ajax({
                //     method: 'PUT',
                //     url: `http://127.0.0.1:3000/todos/${id}`,
                //     headers: {
                //         access_token,
                //         userlocation
                //     },
                //     data: {

                //     }
                // })
                //     .done( () => {
                //         refreshHome()
                //         Toast.fire({
                //             title: `Berhasil!`,
                //             text: `Kamu berhasil menghapus Todo dengan id ${id}`,
                //             icon: `success`
                //         })
                //     })
            }
        })
}