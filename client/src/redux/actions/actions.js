export function getApiDogs() {
    return function(dispatch) {
        return fetch(`${process.env.REACT_APP_DOG_API}`)
            .then(r => r.json())
            .then(dogs => dispatch({ type: "GET_API_DOGS", payload: dogs }))
            .catch(() => dispatch({ type: "GET_API_DOGS", payload: "error" }))
    }
};

export function getDbDogs() {
    return function(dispatch) {
        return fetch(`${process.env.REACT_APP_DOG_SV_URL}/dogs`)
            .then(r => r.json())
            .then(dogs => dispatch({ type: "GET_DB_DOGS", payload: dogs }))
            .catch(() => dispatch({ type: "GET_DB_DOGS", payload: "error" }))
    }
};

export function getAllDogs() {
    return { type: "GET_ALL_DOGS" }
}



export function searchApiDogs(breed) {
    return function(dispatch) {
        return fetch(`https://api.thedogapi.com/v1/breeds/search?q=${breed}&api_key=live_qJ4geMUe7XLJIdOTOzYE3SXypdeNQaOUjJnfaU11zHCLGMS93J0gKX7AeIl8YkQX`)
            .then(r => r.json())
            .then(dogs => dogs.filter(d => d.reference_image_id))
            .then(dogs => dispatch({ type: "SEARCH_API_DOGS", payload: dogs }))
            .catch(() => dispatch({ type: "SEARCH_API_DOGS", payload: [] }))
    }
}

export function searchDbDogs(breed) {
    if (breed === undefined || breed === "" || breed === " ") {
        return { type: "SEARCH_DB_DOGS", payload: [] }
    }
    return function(dispatch) {
        return fetch(`${process.env.REACT_APP_DOG_SV_URL}/dogs?name=${breed}`)
            .then(r => r.json())
            .then(dogs => dispatch({ type: "SEARCH_DB_DOGS", payload: dogs }))
            .catch(() => dispatch({ type: "SEARCH_DB_DOGS", payload: [] }))
    }
}


export function getTemperaments() {
    return function(dispatch) {
        return fetch(`${process.env.REACT_APP_DOG_SV_URL}/temperaments`)
            .then(r => r.json())
            .then(temps => dispatch({ type: "GET_TEMPERAMENTS", payload: temps }))
            .then(temps => console.log(temps))
            .catch(err => console.log(err))
    }
}

export function cleanDogs() {
    return { type: "CLEAN_DOGS" }
}

export function getDogDetails(id) {
    if (id > 999) {
        return function(dispatch) {
            return fetch(`${process.env.REACT_APP_DOG_SV_URL}/dogs/${id}`)
                .then(r => r.json())
                .then(dog => dispatch({ type: "GET_DOG_DETAILS", payload: dog }))
                .catch(err => console.log(err))
        }
    } else {
        return { type: "GET_DOG_DETAILS", payload: id }
    }

}


export function getDogImage(dog, apiDogs) {
    if (!dog.image) {
        if (!dog.reference_image_id) {
            let img = "https://static.vecteezy.com/system/resources/thumbnails/006/720/668/small/dog-face-logo-free-vector.jpg"
            return img;
        }
        let imgId = dog.reference_image_id;
        let found = apiDogs.find(d => d.reference_image_id === imgId)
        let img = found.image.url
        return img
    } else {
        if (dog.id > 999) {
            let img = dog.image
            return img
        } else {
            let img = dog.image.url
            return img
        }
    }
}