(() => {
    let allUsers = [];
    let currentUser;

    const onPasswordLogin = () => {
        const password = document.getElementById('pass-input').value;
        let isCurrentUser = false;

        allUsers.forEach(user => {
            if(user.username === currentUser.username && user.password === password){
                $('#wrong-pass').hide();
                if(currentUser.role === 'astronomer'){
                    $('#link-to-home').html(`<a href="./home.html" id="home"></a>`)
                    location.href = $('#home').attr('href');
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                }else if(currentUser.role === 'science observer'){
                    $('#link-to-home').html(`<a href="./executedSciencePlan.html" id="executedSciencePlan"></a>`)
                    location.href = $('#executedSciencePlan').attr('href');
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                }
                isCurrentUser = true;
            }
        })

        if( !isCurrentUser ){
            $('#wrong-pass').slideDown(500);
        }
    }

    const onNameLogin = () => {
        const username = document.getElementById('name-input').value;
        let isCurrentUser = false;
        
        allUsers.forEach(user => {
            if(user.username === username) {
                $('#wrong-name').hide();
                $('#next-btn').hide();
                $('.password-part').slideDown(500);
                $('#login-btn').slideDown(500);
                currentUser = user;
                isCurrentUser = true;
            }
        })
        
        if( !isCurrentUser ){
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

        $('#wrong-name').hide();
        $('#wrong-pass').hide();
        $('#login-btn').hide();
        $('.password-part').hide();

        allUsers = await getAllUsers();
    }
    run();
})();