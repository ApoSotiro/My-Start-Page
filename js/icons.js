const icons = {

    youtube:"▶️",

    steam:"🎮",

    google:"🌐",

    github:"🐙",

    spotify:"🎵",

    discord:"🎧",

    netflix:"🎬",

    gmail:"✉️",

    linkedin:"💼",

    chat:"🤖"

};



function getIcon(url){


    url =
    url.toLowerCase();



    for(let key in icons){


        if(url.includes(key)){

            return icons[key];

        }

    }


    return "🌐";

}