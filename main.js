let username =document.getElementById("username");
let password = document.getElementById("password");
let email = document.getElementById("email");
let signup = document.getElementById("signup");
let lform = document.querySelector(".lform")

let loader = document.getElementById('loader');


signup.addEventListener("click" , (e)=>{
    e.preventDefault();
    loader.style.display = 'block';//loading page
    lform.style.display = 'none';

    if (username.value === "" || email.value === ""  ||password.value === "" ) {
        alert("please ineter missing data")
        loader.style.display = 'none';//loading page
        lform.style.display = 'block';
    }else{     
        let datalist = [
        {
            username:username.value,
            email:email.value,
            password:password.value,
        }
    ]
    localStorage.setItem("datalist", JSON.stringify(datalist))
    console.log(datalist)
    window.location="home.html";

    }

    setTimeout( ()=> {
    username.value="";
    email.value="";
    password.value="";
},2000
    );

})