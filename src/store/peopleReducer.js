import AppServices from "../services";
const peopleReducer = {
    state: {
        people: [],
        loadingStatus: false,
        errorStatus: false,
        errorMsg: "",
    },
    getters: {
        getAllPeople(state, getters, rootState) {
            let {
                filterReducer: { activeInnerFilters },
            } = rootState;
            let people = getters.sortPeople;
            if (activeInnerFilters.length === 0) {
                return people;
            }
            let peopleFiltered = people
                .map((elem) => {
                    return activeInnerFilters
                        .map((elemFilter) => {
                            if (elemFilter.title in elem) {
                                let arrayOfElemValues = Object.values(elem);
                                if (elemFilter.type === "list") {
                                    return elemFilter.value
                                        .map((innerFilterElem) => {
                                            if (
                                                arrayOfElemValues.includes(
                                                    innerFilterElem.innerFilterTitle
                                                )
                                            ) {
                                                return elem;
                                            }
                                        })
                                        .find((elem) => {
                                            if (elem !== "undefined")
                                                return elem;
                                        });
                                }
                                if (elemFilter.type === "range") {
                                    let value = Number(elem[elemFilter.title]);
                                    let [min, max] = elemFilter.value;
                                    if (value >= min && value <= max) {
                                        return elem;
                                    }
                                }
                            }
                        })
                        .filter((elem) => {
                            if (elem !== "undefined") return elem;
                        });
                })
                .filter((elem) => {
                    if (elem.length === activeInnerFilters.length) {
                        return elem;
                    }
                })
                .map((elem) => elem.find((innerElem) => innerElem));
            return peopleFiltered;
        },
        sortPeople(state, getters, rootState) {
            let {
                filterReducer: { activeSortItem },
            } = rootState;
            let { people } = state;
            switch (activeSortItem) {
            case "Age":
                return people.sort((a, b) => a.age - b.age);
            case "Height":
                return people.sort((a, b) => a.height - b.height);
            case "mass":
                return people.sort((a, b) => a.mass - b.mass);
            default:
                return people;
            }
        },
        getLoadingStatus(state) {
            return state.loadingStatus;
        },
    },
    actions: {
        async getResponseAllPeople({ commit }) {
            commit("changeLoadingStatus", true);
            await AppServices.getAllPeople().then((response) => {
                commit("setAllPeople", response);
                commit("setFilters", AppServices.getFilters(response), {
                    root: true,
                });
            });
            commit("changeLoadingStatus", false);
        },
    },
    mutations: {
        changeLoadingStatus(state, payload) {
            state.loadingStatus = payload;
        },
        changeErrorStatus(state, payload) {
            state.loadingStatus = payload;
        },
        setAllPeople(state, payload) {
            state.people = payload;
        },
    },
};
export default peopleReducer;
