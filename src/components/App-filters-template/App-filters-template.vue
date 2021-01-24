<template>
    <div class="people-page__filters-wrapper">
        <ul class="people-page__filters-list">
            <li
                v-for="(elem, index) in filters"
                :key="index"
                :class="`people-page__filters-list-item ${
                    filter === elem.title ? `active` : ``
                }`"
            >
                <span
                    @click="
                        () => {
                            setActiveFilter(elem.title);
                        }
                    "
                    >{{ elem.title }}</span
                >
                <template v-if="filter === elem.title && elem.type === 'list'"
                    ><AppFiltersItemsTemplate
                /></template>
                <template
                    v-else-if="filter === elem.title && elem.type === 'range'"
                    ><AppRangeSliderTemplate
                /></template>
            </li>
        </ul>
        <ul class="people-page__sort-list">
            <li
                :class="`people-page__sort-list-item ${
                    filter === 'Sort by' ? 'active' : ''
                }`"
                @click="
                    () => {
                        setActiveFilter('Sort by');
                    }
                "
            >
                <div class="people-page__sort-list-title">Sort by</div>
                <div class="people-page__sort-list-menu">
                    <div class="sort-list-menu__item itm-1"></div>
                    <div class="sort-list-menu__item itm-2"></div>
                    <div class="sort-list-menu__item itm-3"></div>
                </div>
                <AppFiltersItemsTemplate />
            </li>
        </ul>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import AppFiltersItemsTemplate from "../App-filters-items-template";
import AppRangeSliderTemplate from "../App-range-slider-template";
export default {
    name: "AppFiltersTemplate",
    components: { AppFiltersItemsTemplate, AppRangeSliderTemplate },
    computed: {
        filters() {
            return this.getFiltersTitle();
        },
        filter() {
            return this.getActiveFilter();
        },
    },
    methods: {
        ...mapGetters(["getFiltersTitle", "getActiveFilter"]),
        ...mapActions(["setActiveFilter"]),
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
.people-page__filters-wrapper {
    @include font("HelveticaRegular", 400, 14px, 14.56px);
    display: flex;
    justify-content: space-between;
    margin: 24px 0 48px 0;
}
.people-page__filters-list {
    display: flex;
    flex-flow: row wrap;
}

.innerfilter-wrapper {
    border-radius: 6px;
    @include font("HelveticaRegular", 100, 14px, 25.2px);
    margin-top: 17.36px;
    padding: 12.64px 26px 16px 20px;
    z-index: 1;
}
.people-page__filters-list-item,
.people-page__sort-list-item {
    position: relative;
    cursor: pointer;
    padding-right: 12px;
    & > .innerfilter-wrapper,
    & > .innerfilter-wrapper__slider {
        display: none;
    }
    &.active {
        & > .innerfilter-wrapper,
        & > .innerfilter-wrapper__slider {
            display: block;
            position: absolute;
            background-color: #ffffff;
        }
    }
}
.people-page__filters-list-item + .people-page__filters-list-item {
    margin-left: 40px;
}
.people-page__filters-list-item::after,
.people-page__sort-list-item::after {
    content: "";
    position: absolute;
    background-image: url("../../assets/images/Shape.png");
    background-size: cover;
    top: 7px;
    right: 0;
    width: 6px;
    height: 3px;
}
.innerfilter-list__item {
    width: 55px;
    white-space: nowrap;
}
.innerfilter-list__item + .innerfilter-list__item {
    margin-top: 8px;
}
.people-page__sort-list-menu {
    display: none;
    width: 21.16px;
}
.sort-list-menu__item {
    border-top: 1.5px solid #000000;
}
.sort-list-menu__item+.sort-list-menu__item{
    margin-top: 4px;
}
.itm-1 {
    width: inherit;
}
.itm-2 {
    width: 14.4px;
}
.itm-3 {
    width: 7.59px;
}
</style>
