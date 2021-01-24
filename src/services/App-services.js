export default {
    async getResponse(url) {
        return await fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`We've got a problem. ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                throw new Error(error);
            });
    },
    async getAllPeople() {
        let data = await this.getResponse("https://swapi.dev/api/people/");
        return data.results.map((elem) => {
            return this.AllPeopleTemplate(elem);
        });
    },
    AllPeopleTemplate(data) {
        return {
            age: this.convertAge(data.birth_year),
            name: data.name,
            eye_color: data.eye_color,
            height: Number(data.height),
            mass: Number(data.mass),
            img: require(`../assets/images/${data.name.split(" ").join("-")}.jpg`),
        };
    },
    getFilters(data) {
        let filter = [
            {
                title: "Eye color",
                type: "list",
                value: this.filterTemplate(data, "eye_color"),
            },
            {
                title: "Age",
                type: "range",
                value: this.filterTemplate(data, "age"),
            },
            {
                title: "Height",
                type: "range",
                value: this.filterTemplate(data, "height"),
            },
            { title: "mass" },
        ];
        return filter;
    },
    filterTemplate(data, filter) {
        let uniqueValue = new Set();
        let value = data
            .map((elem) => {
                return elem[filter];
            })
            .sort((a, b) => {
                return a - b;
            });
        if (filter !== "eye_color") {
            return [Number(value[0]), Number(value[value.length - 1])];
        }
        value.map((elem) => {
            uniqueValue.add(elem);
        });
        return Array.from(uniqueValue).map((elem) => {
            return { innerFilterTitle: elem, isActive: false };
        });
    },
    convertAge(value) {
        if (value === "unknown") {
            return 0;
        }
        let pattern = /^[\d.]+/gm;
        let age = value.match(pattern);
        return Number(age[0]);
    },
};
