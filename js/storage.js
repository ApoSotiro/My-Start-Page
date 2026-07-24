function saveData(key, data){

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}



function loadData(key, fallback){

    let data =
    localStorage.getItem(key);


    if(data){

        return JSON.parse(data);

    }


    return fallback;

}