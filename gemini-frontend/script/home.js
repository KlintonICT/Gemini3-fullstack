(() => {
    const run = async () => {
       const username = localStorage.getItem('currentUserName');
       document.getElementById('loginName').innerHTML = username;
    }   
    run();
})();