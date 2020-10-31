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

const hideAll = _ => {
    $('.home').hide()
    $('.login').hide()
}

// * Get User Location
const getLocation = _ => {
    if (navigator.geolocation) {
        if (!localStorage.getItem('userlocation')) {
            swal({
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
        swal({
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
        swal({
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