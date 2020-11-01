const login = _ => {
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

    // * Masuk Button @ form.login
    $('#login-btn').on('click', e => {
        e.preventDefault()
        const email = $('#login-email').val()
        const password = $('#login-password').val()

        $.ajax({
            method: 'POST',
            url: `${SERVER}/login`,
            data: { email, password }
        })
            .done(res => {
                const access_token = res.access_token
                localStorage.setItem('access_token', access_token)
                Toast.fire({
                    icon: 'success',
                    title: `Haloo ${email}`,
                    text: 'Kamu berhasil login!'
                })
                showHome()
                // Hapus bekas form login
                $('#login-email').val('')
                $('#login-password').val('')
            })
            .fail(err => {
                let errormessage = err.responseJSON.msg
                Swal.fire({
                    title: `Oops...`,
                    text: `${errormessage}`,
                    icon: 'error'
                })
            })
    
    })
    
    $('#register-btn').on('click', e => {
        e.preventDefault()
        const email = $('#register-email').val()
        const password = $('#register-password').val()
    
        $.ajax({
            method: 'POST',
            url: `${SERVER}/register`,
            data: { email, password }
        })
            .done(res => {
                $('#register-email').val('')
                $('#register-password').val('')
                Swal.fire({
                    title: `Yay Berhasil!`,
                    text: `Kamu berhasil daftar! Yuk login~`,
                    icon: 'success'
                })
                    .then( () => {
                        container.classList.remove("right-panel-active")
                    })
            })
            .fail(err => {
                const newerrormessage = err.responseJSON.msg
                Swal.fire({
                    title: `Oops...`,
                    html: `${newerrormessage}`,
                    icon: 'error'
                })
            })
    })

    $('#github-login').on('click', e => {
        e.preventDefault()
        githubLoginRegister()
    })

    $('#github-register').on('click', e => {
        e.preventDefault()
        githubLoginRegister()
    })

    $('#google-login').on('click', e => {
        e.preventDefault()
    })

    $('#google-register').on('click', e => {
        e.preventDefault()
    })

    const githubLoginRegister = _ => {
        const loginPage = window.open('https://github.com/login/oauth/authorize?client_id=31b94fb7d76b5c38f316')
        let check = setInterval( _ => {
            if(loginPage.closed) {
                clearInterval(check)
                const access_token = localStorage.getItem('access_token')
                const email = localStorage.getItem('email')

                if (access_token) {
                    Toast.fire({
                        icon: 'success',
                        title: `Haloo ${email}`,
                        text: 'Kamu berhasil login via Github!'
                    })
                    showHome()
                } else {
                    Swal.fire({
                        title: 'Oops...',
                        text: 'Login via github gagal :('
                    })
                }
            }
        }, 1000)
    }

    let startApp = function() {
        gapi.load('auth2', function(){
            auth2 = gapi.auth2.init({
                client_id: '90829278115-r63c6hjluiea75fpue3gheon7fc6jrc1.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin'
            });
            attachSignin(document.getElementById('google-login'))
            attachSignin(document.getElementById('google-register'))
        });
    };

    function attachSignin(element) {
        auth2.attachClickHandler(element, {}, function(googleUser) {
        const id_token = googleUser.getAuthResponse().id_token
        $.ajax({
            method:'POST',
            url: 'http://localhost:3000/googlelogin',
            data: {
            id_token
            }
        })
            .done(data => {
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('email', data.email)

                Toast.fire({
                    icon: 'success',
                    title: `Haloo ${data.email}`,
                    text: 'Kamu berhasil login via Google!'
                })
                showHome()
            })
            .fail(err => {
                Swal.fire({
                    title: 'Oops...',
                    text: 'Login via google gagal :('
                })
            })
        });
    }

    startApp()
}
