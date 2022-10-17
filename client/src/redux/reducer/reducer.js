const initialState = {
    permanentDogs: [],
    dogs: [],
    apiDogs: [],
    dbDogs: [],
    temperaments: [],
    dogDetails: {},
    dogName: undefined,
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case "GET_API_DOGS":
            return {
                ...state,
                apiDogs: action.payload,
            }


        case "GET_DB_DOGS":
            return {
                ...state,
                dbDogs: action.payload,
            }

        case "GET_ALL_DOGS":
            return {
                ...state,
                dogs: state.apiDogs.concat(state.dbDogs),
                permanentDogs: state.apiDogs.concat(state.dbDogs),
            }



        case "SEARCH_API_DOGS":
            return {
                ...state,
                dogs: action.payload,
            }

        case "SEARCH_DB_DOGS":
            return {
                ...state,
                dogs: state.dogs.concat(action.payload)
            }

        case "CLEAN_DOGS":
            return {
                ...state,
                dogs: state.permanentDogs
            }


        case "GET_TEMPERAMENTS":
            return {
                ...state,
                temperaments: action.payload,
            }


        case "GET_DOG_DETAILS":
            let dog
            if (typeof action.payload === "number") {
                dog = state.dogs.find(d => d.id === action.payload)
            } else {
                dog = action.payload[0]
            }
            return {
                ...state,
                dogDetails: dog,
            }

        case "GET_DOG_NAME":
            return {
                ...state,
                dogName: action.payload
            }


        default:
            return {
                ...state,
            }
    }
}

export default rootReducer;