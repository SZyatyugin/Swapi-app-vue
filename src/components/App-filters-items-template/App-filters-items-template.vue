<template>
    <ul class="innerfilter-wrapper">
        <li
            v-for="(elem, index) in filters"
            :key="index"
            :class="`innerfilter-list__item ${elem.isActive ? 'active' : ''}`"
            @click="setFilter(elem)"
        >
            {{ elem.innerFilterTitle || elem }}
        </li>
    </ul>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "AppFiltersItemsTemplate",
    computed: {
        filters() {
            return this.getFilters();
        },
        filter() {
            return this.getActiveFilter();
        },
    },
    methods: {
        ...mapGetters(["getFilters", "getActiveFilter"]),
        ...mapActions(["setActiveInnerFilter"]),
        setFilter(elem) {
            this.setActiveInnerFilter(elem);
        },
    },
};
</script>
<style lang="scss">
.innerfilter-list__item {
    &.active {
        color: #ff634a;
    }
}
</style>
