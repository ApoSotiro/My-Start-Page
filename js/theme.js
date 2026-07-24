const themeButton =
document.getElementById(
    "themeButton"
);





function loadTheme(){


    let theme =
    localStorage.getItem(
        "theme"
    );



    if(
        theme === "light"
    ){


        document.body.classList.add(
            "light"
        );


        themeButton.textContent =
        "🌙";


    }


    else{


        document.body.classList.remove(
            "light"
        );


        themeButton.textContent =
        "☀️";


    }



}









function setupTheme(){


    themeButton.onclick =
    function(){



        document.body.classList.toggle(
            "light"
        );



        if(
            document.body.classList.contains(
                "light"
            )
        ){


            themeButton.textContent =
            "🌙";


            localStorage.setItem(
                "theme",
                "light"
            );


        }

        else{


            themeButton.textContent =
            "☀️";


            localStorage.setItem(
                "theme",
                "dark"
            );


        }





        // Ενημέρωση wallpaper

        let savedWallpaper =

        localStorage.getItem(
            "wallpaper"
        );



        if(
            savedWallpaper &&
            typeof setWallpaper ===
            "function"
        ){


            setWallpaper(
                savedWallpaper
            );


        }



    };


}