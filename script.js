// =====================
// THEME
// =====================


const themeButton =
document.getElementById("themeButton");


themeButton.onclick=function(){


    document.body.classList.toggle("light");


    if(document.body.classList.contains("light")){

        themeButton.textContent="🌙";

        localStorage.setItem(
            "theme",
            "light"
        );

    }

    else{

        themeButton.textContent="☀️";

        localStorage.setItem(
            "theme",
            "dark"
        );

    }

};



if(localStorage.getItem("theme")==="light"){

    document.body.classList.add("light");

    themeButton.textContent="🌙";

}





// =====================
// SEARCH ENGINE
// =====================


const searchInput =
document.getElementById("searchInput");


const searchButton =
document.getElementById("searchButton");


const engineButton =
document.getElementById("engineButton");


const engineMenu =
document.getElementById("engineMenu");



let engine =
localStorage.getItem("engine")
|| "google";





function updateEngine(){


    if(engine==="google"){

        engineButton.textContent=
        "🌐 Google ▼";

    }


    if(engine==="bing"){

        engineButton.textContent=
        "🔷 Bing ▼";

    }


    if(engine==="duckduckgo"){

        engineButton.textContent=
        "🦆 DuckDuckGo ▼";

    }


}



updateEngine();





engineButton.onclick=function(){


    if(engineMenu.style.display==="block"){

    engineMenu.classList.remove("show");

    setTimeout(function(){

        engineMenu.style.display="none";

    },250);


}
else{


    engineMenu.style.display="block";


    setTimeout(function(){

        engineMenu.classList.add("show");

    },10);


}


};





document.querySelectorAll(
"#engineMenu div"
)
.forEach(function(item){


    item.onclick=function(){


        engine =
        this.dataset.engine;


        localStorage.setItem(
            "engine",
            engine
        );


        updateEngine();


        engineMenu.style.display="none";


    };


});






function search(){


    let text =
    searchInput.value.trim();


    if(!text)
        return;



    let q =
    encodeURIComponent(text);


    let url;



    if(engine==="google"){

        url=
        "https://www.google.com/search?q="+q;

    }


    else if(engine==="bing"){


        url=
        "https://www.bing.com/search?q="+q;


    }


    else{


        url=
        "https://duckduckgo.com/?q="+q;


    }




    window.open(
        url,
        "_blank"
    );

}



searchButton.onclick=search;



searchInput.addEventListener(
"keydown",
function(e){


    if(e.key==="Enter"){

        search();

    }


});









// =====================
// AUTO ICONS
// =====================


function getIcon(url){


    url=url.toLowerCase();


    if(url.includes("youtube"))
        return "▶️";


    if(url.includes("steam"))
        return "🎮";


    if(url.includes("chat.openai"))
        return "🤖";


    if(url.includes("google"))
        return "🌐";


    if(url.includes("github"))
        return "🐙";


    if(url.includes("gmail"))
        return "✉️";


    if(url.includes("spotify"))
        return "🎵";


    if(url.includes("netflix"))
        return "🎬";


    if(url.includes("discord"))
        return "🎧";


    if(url.includes("linkedin"))
        return "💼";



    return "🌐";


}









// =====================
// CARDS
// =====================


const cardsContainer =
document.getElementById("cardsContainer");


const addCard =
document.getElementById("addCard");


const modal =
document.getElementById("modal");


const cardName =
document.getElementById("cardName");


const cardUrl =
document.getElementById("cardUrl");


const saveCard =
document.getElementById("saveCard");


const cancelCard =
document.getElementById("cancelCard");





let cards =
JSON.parse(
localStorage.getItem("cards")
)
|| [];



let editIndex=null;





function renderCards(){


    cardsContainer.innerHTML="";


    cards.forEach(function(card,index){



        let div =
        document.createElement("div");


        div.className="card";


        div.innerHTML=`

        <div class="cardIcon">
        ${getIcon(card.url)}
        </div>

        <div class="cardName">
        ${card.name}
        </div>


        <div class="cardActions">

        <button onclick="editCard(${index})">
        ✏️
        </button>


        <button onclick="deleteCard(${index})">
        🗑️
        </button>


        </div>

        `;




        div.onclick=function(e){


            if(e.target.tagName!=="BUTTON"){

                window.open(
                    card.url,
                    "_blank"
                );

            }

        };



        cardsContainer.appendChild(div);


    });



    cardsContainer.appendChild(addCard);


}







addCard.onclick=function(){


    editIndex=null;


    cardName.value="";

    cardUrl.value="";


    modal.style.display="flex";


};






saveCard.onclick=function(){


    let name =
    cardName.value.trim();


    let url =
    cardUrl.value.trim();



    if(!name || !url)
        return;



    if(!url.startsWith("http")){

        url="https://"+url;

    }



    let card={

        name:name,

        url:url

    };



    if(editIndex===null){

        cards.push(card);

    }

    else{

        cards[editIndex]=card;

    }




    localStorage.setItem(
        "cards",
        JSON.stringify(cards)
    );



    modal.style.display="none";


    renderCards();


};







cancelCard.onclick=function(){


    modal.style.display="none";


};







window.editCard=function(index){


    editIndex=index;


    cardName.value=
    cards[index].name;


    cardUrl.value=
    cards[index].url;



    modal.style.display="flex";


};






window.deleteCard=function(index){


    if(confirm("Να διαγραφεί;")){


        cards.splice(index,1);


        localStorage.setItem(
            "cards",
            JSON.stringify(cards)
        );


        renderCards();


    }


};





renderCards();









// =====================
// CLOCK
// =====================


function updateClock(){


    let now =
    new Date();



    let s =
    now.getSeconds();


    let m =
    now.getMinutes();


    let h =
    now.getHours();




    document.querySelector(".second")
    .style.transform=
    `rotate(${s*6}deg)`;


    document.querySelector(".minute")
    .style.transform=
    `rotate(${m*6+s/10}deg)`;


    document.querySelector(".hour")
    .style.transform=
    `rotate(${h*30+m/2}deg)`;


}



setInterval(updateClock,1000);

updateClock();