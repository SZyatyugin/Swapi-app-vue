import router from "../router";
const filterReducer = {
    state: {
        filters: [],
        activeFilter: "",
        activeInnerFilters: [],
        activeSortItem: "",
    },
    getters: {
        getFilters(state) {
            let { activeFilter, filters } = state;
            if (activeFilter === "Sort by") {
                return filters
                    .map((elem) => elem.title)
                    .filter((elem) => {
                        if (elem !== "Eye color") return elem;
                    });
            }
            return filters
                .filter((elem) => {
                    if (elem.title === activeFilter) return elem;
                })
                .map((elem) => elem.value)
                .find((elem) => elem);
        },
        getFiltersTitle(state) {
            return state.filters
                .map((elem) => {
                    return { title: elem.title, type: elem.type };
                })
                .filter((elem) => {
                    if (elem.title !== "mass") return elem;
                });
        },
        getActiveFilter(state) {
            return state.activeFilter;
        },
        getActiveSortItem(state) {
            return state.activeSortItem;
        },
        getActiveInnerFilter(state) {
            return state.activeInnerFilters;
        },
        getActiveFilterSliderValue(state) {
            let { activeFilter, activeInnerFilters } = state;
            let filter = activeInnerFilters
                .filter((elem) => {
                    if (elem.title === activeFilter.toLowerCase()) {
                        return elem;
                    }
                })
                .find((elem) => elem);
            return filter;
        },
    },
    actions: {
        setActiveFilter({ state, commit }, value) {
            let { activeFilter } = state;
            if (value != activeFilter) {
                commit("setActiveFilter", value);
            } else {
                commit("setActiveFilter", "");
            }
        },
        async setActiveInnerFilter({ state, commit, dispatch }, val) {
            let data;
            let innerActiveFilters;

            let { activeInnerFilters, activeFilter, filters } = state;
            if (activeFilter === "Sort by") {
                commit("setActiveSortItem", val);
                dispatch("changeUrl");
                return;
            }
            let filter = filters.find((elem) => {
                if (elem.title === activeFilter) return elem;
            });
            let filterIndexToChange = activeInnerFilters.findIndex((elem) => {
                if (
                    elem.title.split("_").join(" ") ===
                    activeFilter.toLowerCase()
                )
                    return elem;
            });
            let filterToChange = activeInnerFilters[filterIndexToChange];
            switch (filter.type) {
            case "list":
                data = {
                    title: activeFilter.split(" ").join("_").toLowerCase(),
                    type: "list",
                    value: [val],
                };
                break;
            case "range":
                data = {
                    title: activeFilter.toLowerCase(),
                    type: "range",
                    value: val,
                };
                break;
            }
            if (filterIndexToChange != -1) {
                switch (filter.type) {
                case "list":
                    if (filterToChange.value.includes(val)) {
                        let innerFilterIndex = filterToChange.value.findIndex(
                            (elem) => {
                                if (elem === val) return elem;
                            }
                        );
                        filterToChange.value = [
                            ...filterToChange.value.slice(
                                0,
                                innerFilterIndex
                            ),
                            ...filterToChange.value.slice(
                                innerFilterIndex + 1
                            ),
                        ];
                    } else {
                        filterToChange.value = [
                            ...filterToChange.value,
                            val,
                        ];
                    }
                    break;
                case "range":
                    filterToChange.value = val;
                    break;
                }
                if (filterToChange.value.length == 0) {
                    innerActiveFilters = [
                        ...activeInnerFilters.slice(0, filterIndexToChange),
                        ...activeInnerFilters.slice(filterIndexToChange + 1),
                    ];
                } else {
                    innerActiveFilters = [
                        ...activeInnerFilters.slice(0, filterIndexToChange),
                        ...activeInnerFilters.slice(filterIndexToChange + 1),
                        filterToChange,
                    ];
                }
            } else {
                innerActiveFilters = [...activeInnerFilters, data];
            }
            if (filter.type === "list") {
                await dispatch("changeFiltersStatus", [val, activeFilter]);
            }
            commit("setActiveInnerFilters", innerActiveFilters);
            dispatch("changeUrl");
        },
        changeUrl({ state }) {
            let url = "";
            let { activeInnerFilters, activeSortItem } = state;
            if (activeSortItem) {
                url += `/Sort by/${activeSortItem}`;
            }
            activeInnerFilters.map((elem) => {
                url += `/${elem.title}`;
                elem.value.map((innerElem) => {
                    url += `/${
                        innerElem.innerFilterTitle
                            ? innerElem.innerFilterTitle
                            : innerElem
                    }`;
                });
            });
            router.push(url);
        },
        changeFiltersStatus({ state, commit }, value) {
            let { filters } = state;
            let [val, activeFilter] = value;
            let filterToChange = filters.find((elem) => {
                if (elem.title === activeFilter) return elem;
            });
            let filterToChangeIndex = filters.findIndex((elem) => {
                if (elem.title === activeFilter) return elem;
            });
            filterToChange.value.map((elem) => {
                if (elem.innerFilterTitle === val.innerFilterTitle) {
                    elem.isActive = !elem.isActive;
                    return elem;
                }
                return elem;
            });
            let changedFiltersStatus = [...filters];
            changedFiltersStatus.splice(filterToChangeIndex, 1, filterToChange);
            commit("setFilters", changedFiltersStatus);
        },
    },
    mutations: {
        setFilters(state, payload) {
            state.filters = payload;
        },
        setActiveFilter(state, payload) {
            state.activeFilter = payload;
        },
        setActiveSortItem(state, payload) {
            state.activeSortItem = payload;
        },
        setActiveInnerFilters(state, payload) {
            state.activeInnerFilters = payload;
        },
    },
};
export default filterReducer;
