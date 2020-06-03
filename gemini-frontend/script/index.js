(() => {
    let allUsers = [];
    let currentUserName;

    const onPasswordLogin = () => {
        const password = document.getElementById('pass-input').value;
        let currentUser = false;

        allUsers.forEach(user => {
            if(user.username === currentUserName && user.password === password){
                $('#wrong-pass').hide();
                $('#link-to-home').html(`<a href="./home.html" id="home"></a>`)
                location.href = $('#home').attr('href');
                localStorage.setItem('currentUserName', currentUserName);
                currentUser = true;
            }
        })

        if( !currentUser ){
            $('#wrong-pass').slideDown(500);
        }
    }

    const onNameLogin = () => {
        const username = document.getElementById('name-input').value;
        let currentUser = false;
        
        allUsers.forEach(user => {
            if(user.username === username) {
                $('#wrong-name').hide();
                $('#next-btn').hide();
                $('.password-part').slideDown(500);
                $('#login-btn').slideDown(500);
                currentUserName = username;
                currentUser = true;
            }
        })
        
        if( !currentUser ){
            $('#wrong-name').slideDown(500);
        }
    }

    const onLoginSubmit = ( event ) => { event.preventDefault(); }

    const setupListeners = () => {
        $('#login-form').on('submit', onLoginSubmit);
        $('#next-btn').on('click', onNameLogin);
        $('#login-btn').on('click', onPasswordLogin);
    }

    const run = async () => {
        setupListeners();
        
        allUsers = await getAllUsers();

        $('#wrong-name').hide();
        $('#wrong-pass').hide();
        $('#login-btn').hide();
        $('.password-part').hide();
    }
    run();
})();