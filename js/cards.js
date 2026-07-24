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



let cards = loadData(
    "cards",
    []
);


let editIndex = null;





function renderCards(){


    cardsContainer.innerHTML = "";



    cards.forEach(function(card,index){



        let element =
        document.createElement("div");



        element.className = "card";

        element.draggable = true;

        element.dataset.index = index;



        element.innerHTML = `

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




        element.onclick = function(e){


            if(e.target.tagName !== "BUTTON"){


                window.open(
                    card.url,
                    "_blank"
                );


            }


        };



        setupDrag(element);



        cardsContainer.appendChild(element);



    });




    cardsContainer.appendChild(addCard);



}









function setupDrag(card){



    card.addEventListener(
    "dragstart",
    function(){


        card.classList.add(
            "dragging"
        );


    });





    card.addEventListener(
    "dragend",
    function(){


        card.classList.remove(
            "dragging"
        );


        updateCardOrder();


    });





    card.addEventListener(
    "dragover",
    function(e){


        e.preventDefault();



        const dragging =
        document.querySelector(".dragging");



        if(!dragging || dragging === card)
            return;





        let rect =
        card.getBoundingClientRect();




        let after =
        (
            e.clientX -
            rect.left
        )
        >
        (
            rect.width / 2
        );





        cardsContainer.insertBefore(

            dragging,

            after
            ?
            card.nextSibling
            :
            card

        );



    });



}








function updateCardOrder(){



    let newCards = [];



    document
    .querySelectorAll(".card")
    .forEach(function(card){



        let index =
        Number(card.dataset.index);




        if(cards[index]){


            newCards.push(
                cards[index]
            );


        }



    });





    cards =
    newCards;



    saveData(
        "cards",
        cards
    );



    renderCards();



}









addCard.onclick = function(){



    editIndex = null;



    cardName.value = "";

    cardUrl.value = "";



    modal.style.display = "flex";



};









saveCard.onclick = function(){



    let name =
    cardName.value.trim();



    let url =
    cardUrl.value.trim();




    if(!name || !url)
        return;





    if(!url.startsWith("http")){


        url =
        "https://" + url;


    }





    let newCard = {


        name:name,

        url:url


    };






    if(editIndex === null){


        cards.push(
            newCard
        );


    }

    else{


        cards[editIndex] =
        newCard;


    }





    saveData(
        "cards",
        cards
    );





    modal.style.display = "none";



    renderCards();



};









cancelCard.onclick = function(){


    modal.style.display = "none";


};









window.editCard = function(index){



    editIndex = index;



    cardName.value =
    cards[index].name;



    cardUrl.value =
    cards[index].url;




    modal.style.display = "flex";



};









window.deleteCard = function(index){



    if(confirm("Να διαγραφεί η καρτέλα;")){


        cards.splice(
            index,
            1
        );



        saveData(
            "cards",
            cards
        );



        renderCards();



    }



};









function startCards(){


    renderCards();


}