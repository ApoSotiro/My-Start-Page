function updateClock(){


    let now =
    new Date();



    let seconds =
    now.getSeconds();



    let minutes =
    now.getMinutes();



    let hours =
    now.getHours();




    let secondHand =
    document.querySelector(".second");


    let minuteHand =
    document.querySelector(".minute");


    let hourHand =
    document.querySelector(".hour");




    if(secondHand){


        secondHand.style.transform =
        `rotate(${seconds * 6}deg)`;


    }



    if(minuteHand){


        minuteHand.style.transform =
        `rotate(${minutes * 6 + seconds/10}deg)`;


    }



    if(hourHand){


        hourHand.style.transform =
        `rotate(${hours * 30 + minutes/2}deg)`;


    }


}





function startClock(){


    updateClock();


    setInterval(
        updateClock,
        1000
    );


}