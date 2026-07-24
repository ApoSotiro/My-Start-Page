let wallpaperButton;
let wallpaperPanel;
let wallpaperUpload;
let defaultWallpaperButton;



const wallpapers = {

    cyberpunk:
    "assets/wallpapers/cyberpunk.jpeg",

    galaxy:
    "assets/wallpapers/galaxy.jpeg",

    forest:
    "assets/wallpapers/forest.jpeg",

    futuristic:
    "assets/wallpapers/futuristic.jpeg"

};





function setupWallpaper(){


    wallpaperButton =
    document.getElementById(
        "wallpaperButton"
    );


    wallpaperPanel =
    document.getElementById(
        "wallpaperPanel"
    );


    wallpaperUpload =
    document.getElementById(
        "wallpaperUpload"
    );


    defaultWallpaperButton =
    document.getElementById(
        "defaultWallpaper"
    );



    if(
        !wallpaperButton ||
        !wallpaperPanel
    ){

        return;

    }



    loadWallpaper();





    wallpaperButton.onclick =
    function(){


        if(
            wallpaperPanel.style.display
            ===
            "block"
        ){

            wallpaperPanel.style.display =
            "none";

        }

        else{

            wallpaperPanel.style.display =
            "block";

        }

    };








    document
    .querySelectorAll(
        ".wallpaperOption"
    )
    .forEach(
        function(option){



        option.onclick =
        function(){



            let selected =
            this.dataset.wallpaper;



            let image =
            wallpapers[selected];



            if(image){


                setWallpaper(
                    image
                );


                localStorage.setItem(
                    "wallpaper",
                    image
                );


            }



            wallpaperPanel.style.display =
            "none";


        };


    });









    if(wallpaperUpload){



        wallpaperUpload.onchange =
        function(){



            let file =
            this.files[0];



            if(!file)
                return;



            let reader =
            new FileReader();



            reader.onload =
            function(event){



                let image =
                event.target.result;



                setWallpaper(
                    image
                );



                localStorage.setItem(
                    "wallpaper",
                    image
                );


            };



            reader.readAsDataURL(
                file
            );


        };


    }








    if(defaultWallpaperButton){



        defaultWallpaperButton.onclick =
        function(){



            document.body.style
            .backgroundImage =
            "";


            localStorage.removeItem(
                "wallpaper"
            );


            wallpaperPanel.style.display =
            "none";


        };


    }



}









function setWallpaper(image){



    let overlay;



    if(
        document.body.classList.contains(
            "light"
        )
    ){


        // LIGHT MODE

        overlay =
        `
        linear-gradient(
        rgba(255,255,255,0.15),
        rgba(255,255,255,0.15)
        )
        `;


    }

    else{


        // DARK MODE

        overlay =
        `
        linear-gradient(
        rgba(0,0,0,0.45),
        rgba(0,0,0,0.45)
        )
        `;


    }





    document.body.style
    .backgroundImage =

    `
    ${overlay},
    url("${image}")
    `;



    document.body.style
    .backgroundSize =
    "cover";


    document.body.style
    .backgroundPosition =
    "center";


    document.body.style
    .backgroundRepeat =
    "no-repeat";



}









function loadWallpaper(){



    let saved =

    localStorage.getItem(
        "wallpaper"
    );



    if(saved){


        setWallpaper(
            saved
        );


    }



}