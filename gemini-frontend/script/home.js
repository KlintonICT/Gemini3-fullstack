(() => {
    const run = async () => {
       var currentUser = localStorage.getItem('currentUser');
       currentUser = currentUser ? JSON.parse(currentUser) : {};
       document.getElementById('loginName').innerHTML = currentUser.username;
    }   
    run();
})();