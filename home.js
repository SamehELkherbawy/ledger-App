let title =document.getElementById ("title")
let price = document.getElementById ("price")
let taxes= document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount= document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")
let content=document.getElementById("content")
let deleteall = document.querySelector(".deleteall")
let gtotal = document.getElementById("gtotal")
let mood ="create"
let temp;

let LandingPage = document.querySelector(".content")
let info =document.getElementById("info");
let userDom = document.getElementById("user");
let link = document.getElementById("link");
let logout = document.getElementById("logout");

let username = localStorage.getItem("datalist")

let loader = document.getElementById('loader');
let heads = document.querySelector(".heads")
let inputs =document.querySelector(".inputs")

//welcome 

if (username){
    link.remove()
    info.style.display="flex"
    userDom.innerHTML = "Welcom "+ JSON.parse(username)[0].username
}
 logout.addEventListener ("click",()=>{
    loader.style.display = 'block';//loading page 
    inputs.style.display = 'none';
    
    setTimeout ( ()=>{
        window.location= "index.html"

        
    },2000)
 })

// total
function getTotal() {

    if (discount.value.includes('%')) {
        discount.value = ((+discount.value.slice(0, -1) / 100) * +price.value);
    } else {
        discount.value = discount.value; 
    };
        if(taxes.value.includes('%')){
            taxes.value= ((+taxes.value.slice(0, -1) / 100) * +price.value);
        } taxes.value= taxes.value;
    
        let result = +price.value + +taxes.value+ +ads.value - +discount.value
        total.innerHTML = result;
        if(total.innerHTML != ""){
            total.style.backgroundColor="green"
        }
        if( total.innerHTML =="0"){
            total.style.backgroundColor="red"
        };
    };
 

//save data

let accounts;
if(localStorage.account != null){
    accounts=JSON.parse(localStorage.account);
}else{
    accounts =[];
}
submit.onclick = function create(){
    let newAccount ={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
        gtotal:count.value*total.innerHTML
        
    };
    if(title.valu !== "" && price.value !== "" && category.value !== ""){
        if ( mood ==="create"){
            accounts.push(newAccount);
        }else{
            accounts[temp] = newAccount;
            submit.innerHTML= "create";
            mood ="create";
        }
         
    }else{
        alert("please insert the necessary field");
    }
    console.log(accounts);
    localStorage.setItem("account",JSON.stringify(accounts));
    generate()
};

    
// generate table

function generate(){
    let table=""
    for(let i=0;i<accounts.length;i++){
        table +=`
        <tr>
                <td>${i+1}</td>
                <td>${accounts[i].title}</td>
                <td>${accounts[i].price}</td>
                <td>${accounts[i].taxes}</td>
                <td>${accounts[i].ads}</td>
                <td>${accounts[i].discount}</td>
                <td>${accounts[i].count}</td>
                <td>${accounts[i].category}</td>
                <td>${accounts[i].total}</td>
                <td>${accounts[i].gtotal}</td>
                <td><button onclick="updateItem(${i})">Update</button></td>
                <td><button onclick="deleteItem(${i})">Delete </button></td>

            </tr>
        `
    }
    content.innerHTML=table
    title.value=""
    price.value=""
    taxes.value=""
    ads.value=""
    discount.value=""
    count.value=""
    category.value=""
    total.innerHTML=""

    if(accounts.length >1){
        deleteall.innerHTML =` <button onclick ="clearAll()"> Delete All </button>`
    } else{
        deleteall.innerHTML=""
    }

}




//delete item by item 
function deleteItem(i){
    accounts.splice(i,1);
    localStorage.account = JSON.stringify(accounts)
    generate()
}

//delete All 
function clearAll(){
    localStorage.clear()
    window.location.reload();
}
//update
function updateItem(i){
    title.value = accounts[i].title;
    price.value = accounts[i].price;
    taxes.value = accounts[i].taxes;
    ads.value = accounts[i].ads;
    discount.value = accounts[i].discount;
    count.value = accounts[i].count;
    category.value = accounts[i].category;
    submit.innerHTML="Update";
    mood ="update";
    temp=i;
    scroll({
        top:0,
        behavior:"smooth"
    });
    getTotal()
};
generate();


//search
let searchMood ="title"
function getSearchMood(id){
    let search = document.getElementById("search")
    if (id ==="searchByTitle"){ 
        searchMood ="title";
        search.placeholder = "Search By Title"
    } else{
        searchMood ="category";
        search.placeholder = "Search By Category"
    }
    search.focus();
}
function searchData(value){
    let table = "";
    if(searchMood==="title"){
        for(let i = 0 ; i<accounts.length;i++){
            if(accounts[i].title.includes(value)){
                table += `
        <tr>
                <td>${i+1}</td>
                <td>${accounts[i].title}</td>
                <td>${accounts[i].price}</td>
                <td>${accounts[i].taxes}</td>
                <td>${accounts[i].ads}</td>
                <td>${accounts[i].discount}</td>
                <td>${accounts[i].count}</td>
                <td>${accounts[i].category}</td>
                <td>${accounts[i].total}</td>
                <td>${accounts[i].gtotal}</td>
                <td><button onclick="updateItem(${i})">Update</button></td>
                <td><button onclick="deleteItem(${i})">Delete </button></td>

            </tr>
        `;
            }
        }
    }else{
       
        for(let i = 0 ; i<accounts.length;i++){
            if(accounts[i].category.includes(value)){
                table += `
            <tr>
                <td>${i+1}</td>
                <td>${accounts[i].title}</td>
                <td>${accounts[i].price}</td>
                <td>${accounts[i].taxes}</td>
                <td>${accounts[i].ads}</td>
                <td>${accounts[i].discount}</td>
                <td>${accounts[i].count}</td>
                <td>${accounts[i].category}</td>
                <td>${accounts[i].total}</td>
                <td>${accounts[i].gtotal}</td>
                <td><button onclick="updateItem(${i})">Update</button></td>
                <td><button onclick="deleteItem(${i})">Delete </button></td>

            </tr>
        `;
            }
        }
    }
    document.getElementById("content").innerHTML =table;
    
};
