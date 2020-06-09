(() => {
    const logout = () => {
        $('#go-to-login').html(`<a href="./index.html" id="index"></a>`)
        location.href = $('#index').attr('href');

        localStorage.removeItem('currentUser');
    }

    const setupListeners = () => {
        document.getElementById('logout').addEventListener('click', logout);
    }

    const run = async () => {
       var currentUser = localStorage.getItem('currentUser');
       currentUser = currentUser ? JSON.parse(currentUser) : {};
       document.getElementById('loginName').innerHTML = currentUser.username;

        setupListeners();
    }   
    run();
})();