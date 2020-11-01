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
}
