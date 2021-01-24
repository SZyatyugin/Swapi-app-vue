import { createStore } from "vuex";
import peopleReducer from "./peopleReducer";
import filterReducer from "./filterReducer";
export default createStore({
    modules: {
        peopleReducer,
        filterReducer
    }
});
