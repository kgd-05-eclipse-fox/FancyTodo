const login = _ => {
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
                showHome()
                // Hapus bekas form login
                $('#login-email').val('')
                $('#login-password').val('')
            })
            .fail(err => {
                let errormessage = err.responseJSON.msg
                swal({
                    title: `Oops...`,
                    text: `${errormessage}`,
                    icon: 'error',
                    dangerMode: true
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
                swal({
                    title: `Yay Berhasil!`,
                    text: `Kamu berhasil daftar! Yuk login~`,
                    icon: 'success'
                })
                    .then( () => {
                        container.classList.remove("right-panel-active")
                    })
            })
            .fail(err => {
                let newerrormessage = ''
                err.responseJSON.msg.split(',').forEach( error => {
                    newerrormessage += `* ${error}\n\n`
                })
                swal({
                    title: `Oops...`,
                    text: `${newerrormessage}`,
                    icon: 'error',
                    dangerMode: true
                })
            })
    })
}
