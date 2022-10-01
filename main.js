let body = document.querySelector("body");
let darkLightBtn = document.getElementById("toggle");
let textMode = document.querySelector("div span");
let input = document.querySelector("input[type='search']");
let countries = document.querySelector(".countries")
let selected = document.querySelector(".selected");
let optionsCountainer = document.querySelector(".optionContainer");
let selectBox = document.querySelector(".selectBox");
let optionsList = document.querySelectorAll(".option");
let model = document.querySelector(".model");

darkLightBtn.onclick = function() {
    darkLightBtn.classList.toggle("active");
    textMode.innerText= "dark";
    body.classList.toggle("dark")

    if(darkLightBtn.classList == "active") {
        textMode.innerText= "dark";
    }else {
        textMode.innerText= "light";
    }
}

let api = "https://restcountries.com/v3.1";

async function getAllCountry() {
    try {
        let response = await fetch(`${api}/all`);
        let data = await response.json();
        addDataToPage(data);
        console.log(data)
    }catch(e){
        console.log("Erorr:",e.message)
    }
}

input.addEventListener("input", () => {
    if(input.value !== "") {
        fetchSearchData(input.value);
    }
});

selected.addEventListener("click", () => {
    optionsCountainer.classList.toggle("done");
});
optionsList.forEach (o => {
    o.addEventListener("click", (e) => {
        selected.innerHTML = o.querySelector("label").innerHTML;
        optionsCountainer.classList.remove("done");
        getRegionData(selected.innerText)
        input.value = "";
    })
})

async function getRegionData(name) {
    try {
        if (name !== "select" && name !== "All") {
            let response = await fetch(`${api}/region/${name}`);
            let data = await response.json();
            addDataToPage(data)
        }
        else if (name == "All") {
            let response = await fetch(`${api}/all`);
            let data = await response.json();
            addDataToPage(data);
        }
    }catch(e){
        console.log("Erorr:",e.message)
    }
}

async function fetchSearchData(name) {
    try {
        let response = await fetch(`${api}/name/${name}`);
        let data = await response.json();
        addDataToPage(data)
    }catch(e){
        console.log("Erorr:",e.message)
    }
}




function addDataToPage(data) {
    countries.innerHTML = `<div class="apiSec"> <div class="boxs">
    ${Object.values(data).map(data => 
        `<div class="box" id="box">
            <img src="${data.flags.png}" width="250"/>
            <div class="textContent">
                <h2 class="countryName">${data.name.common}</h2>
                <h4>Population: ${data.population}</h4>
                <h4>region : ${data.region}</h4>
                <h4>capital : ${data.capital}</h4>
            </div>
        </div>`).join("")}
</div></div>`;
let countryName = document.getElementsByClassName("countryName");

Array.from(countryName).forEach(c => c.addEventListener("click", () => {
    model.classList.add("show")
    countries.classList.remove("show")
    fetchCountryDetails(c.innerText);
}));

}


async function fetchCountryDetails(name) {
    try {
        let response = await fetch(`${api}/name/${name}`);
        let data = await response.json();
        showCountriesDetails(data);
    }catch(e){
        console.log("Erorr:",e.message)
    }
}

function showCountriesDetails(data) {
    model.innerHTML =`
    <button class="back">Back</button>
    <div class="container">
        <div class="image">
            <img src="${data[0].flags.png}" width="250" alt="">
        </div>
        <div class="details">
            <div class="left">
                <h2 class="name">${data[0].name.common}</h2>
                <p>independent : ${data[0].independent}</p>
                <p>populations :  ${data[0].population}</p>
                <p>region : ${data[0].region}</p>
                <p>subregion : ${data[0].subregion}</p>
                <p>capital : ${data[0].capital}</p>
            </div>
            <div class="right">
                <p>landlocked : ${data[0].landlocked }</p>
                <p>timezones : ${data[0].timezones}</p>
                <p>Area : ${data[0].area}</p>
            </div>
            <div class="bottom">
                <p>flag: ${data[0].flag} </p>
            </div>
        </div>    
    </div>`;
    let back = document.querySelector(".back");
    back.addEventListener("click", () => {
        model.classList.remove("show");
        countries.classList.add("show");
        input.value = "";
    })
}

getAllCountry();
