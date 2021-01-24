<template>
    <section class="people-page">
        <div class="container">
            <div class="people-page__inner">
                <h2 class="people-page__title">People</h2>
                <template v-if="loading"><AppLoading /></template>
                <template v-else>
                    <AppFiltersTemplate />
                    <AppPeopleList :data="allPeople" />
                </template>
            </div>
        </div>
    </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppFiltersTemplate from "../App-filters-template";
import AppLoading from "../App-loading";
import AppPeopleList from "../App-people-list";
export default {
    name: "AppPeoplePage",
    components: { AppFiltersTemplate, AppLoading, AppPeopleList },
    computed: {
        allPeople() {
            return this.getAllPeople();
        },
        loading() {
            return this.getLoadingStatus();
        },
    },
    created() {
        this.getResponseAllPeople();
    },
    methods: {
        ...mapActions(["getResponseAllPeople", "sortPeople"]),
        ...mapGetters(["getAllPeople", "getLoadingStatus"]),
    },
};
</script>

<style lang="scss">
@mixin font($font, $weight, $size, $height) {
    font-family: $font;
    font-weight: $weight;
    font-size: $size;
    line-height: $height;
}
.people-page__inner {
    margin-top: 64px;
}
.people-page__title {
    @include font("HelveticaRegular", 400, 32px, 47.36px);
}
</style>
