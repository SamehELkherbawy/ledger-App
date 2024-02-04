let loader = document.getElementById('loader');
let lform = document.querySelector(".lform")

function logoIn(){
    loader.style.display = 'block';//loading page 
    lform.style.display = 'none';
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById('password').value;
    setTimeout(function() {
    let storedData = JSON.parse(localStorage.getItem('datalist'));
    
    if (storedData) {
  
        let storedUsername = storedData[0].username;
        let storedPassword = storedData[0].password;
        
        if (username === storedUsername && password === storedPassword) {
            window.location.href ="home.html"
            console.log("done")
        } else {
            console.log('Username and password do not match');
            alert("Username and password do not match")
            loader.style.display = 'none';//loading page 
            lform.style.display = 'block';
        }
    } else {
        console.log('No user data found');
        alert("No user data found. Please register.")
        loader.style.display = 'none';//loading page 
        lform.style.display = 'block';
    }
}, 2000);
}