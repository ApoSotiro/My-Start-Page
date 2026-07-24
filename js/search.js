const searchInput =
document.getElementById("searchInput");


const searchButton =
document.getElementById("searchButton");


const engineButton =
document.getElementById("engineButton");


const engineMenu =
document.getElementById("engineMenu");



let currentEngine =
localStorage.getItem("engine") || "google";



const engines = {

    google: {
        icon:"🌐",
        name:"Google",
        url:"https://www.google.com/search?q="
    },

    bing:{
        icon:"🔷",
        name:"Bing",
        url:"https://www.bing.com/search?q="
    },

    duckduckgo:{
        icon:"🦆",
        name:"DuckDuckGo",
        url:"https://duckduckgo.com/?q="
    }

};





function setupSearch(){


    updateEngine();



    engineButton.onclick=function(){

        if(engineMenu.style.display==="block"){

            engineMenu.style.display="none";

        }

        else{

            engineMenu.style.display="block";

        }

    };




    engineMenu
    .querySelectorAll("div")
    .forEach(function(option){


        option.onclick=function(){


            currentEngine =
            this.dataset.engine;


            localStorage.setItem(
                "engine",
                currentEngine
            );


            updateEngine();


            engineMenu.style.display="none";


        };


    });





    searchButton.onclick=function(){

        search();

    };





    searchInput.addEventListener(
    "keydown",
    function(e){


        if(e.key==="Enter"){

            search();

        }


    });



}







function updateEngine(){


    let e =
    engines[currentEngine];


    engineButton.innerHTML =
    `${e.icon} ${e.name} ▼`;


}







function search(){


    let text =
    searchInput.value.trim();



    if(text==="")
        return;



    let e =
    engines[currentEngine];



    window.open(
        e.url + encodeURIComponent(text),
        "_blank"
    );


}