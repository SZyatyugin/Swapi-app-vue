<template>
    <div class="innerfilter-wrapper__slider">
        <div class="slider-wrapper">
            <div class="slider-input__wrapper">
                <input
                    ref="minValue"
                    v-model.number="value[0]"
                    type="text"
                    class="slider-input__innerfilter"
                    @change.prevent="setSliderValue"
                />
                <input
                    ref="maxValue"
                    v-model.number="value[value.length - 1]"
                    type="text"
                    class="slider-input__innerfilter"
                    @change.prevent="setSliderValue"
                />
            </div>

            <vue-slider
                v-model="value"
                v-bind="options"
                :marks="marks"
                :enable-cross="false"
            >
            </vue-slider>
        </div>
    </div>
</template>
<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import { mapGetters, mapActions } from "vuex";
export default {
    name: "AppRangeSliderTemplate",
    components: { VueSlider },
    data() {
        return {
            value: [],
            marks: [],
            options: {
                min: 0,
                max: 0,
                tooltip: "none",
            },
        };
    },
    computed: {
        defaultValue() {
            return this.getFilters();
        },
        updatedValue() {
            return this.getActiveFilterSliderValue();
        },
        activeFilter() {
            return this.getActiveFilter();
        },
    },
    watch: {
        value: function (cur, prev) {
            if (cur !== prev) {
                this.setActiveInnerFilter(cur);
            }
        },
    },
    created() {
        this.setDefaultSliderValue();
    },

    methods: {
        ...mapGetters([
            "getFilters",
            "getActiveInnerFilter",
            "getActiveFilter",
            "getActiveFilterSliderValue",
        ]),
        ...mapActions(["setActiveInnerFilter"]),
        setDefaultSliderValue() {
            let value;
            let [min, max] = this.defaultValue;
            let measure = this.activeFilter === "Height" ? "cm" : "BBY";
            this.options = { ...this.options, min: min, max: max };
            this.marks = [...[`${min} ${measure}`, `${max} ${measure}`]];
            if (!this.updatedValue) {
                value = this.defaultValue;
            } else {
                value = this.updatedValue.value;
            }
            this.value = [...value];
        },
        setSliderValue() {
            let minVal = +this.$refs.minValue.value;
            let maxVal = +this.$refs.maxValue.value;
            let { max, min } = this.options;
            if (maxVal > max) {
                maxVal = max;
            } else if (maxVal < min) {
                maxVal = 0;
            }
            if (minVal < min) {
                minVal = min;
            } else if (minVal > max) {
                minVal = max;
            }
            this.value = [...[minVal, maxVal]];
        },
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
.innerfilter-wrapper__slider {
    margin-top: 14px;
    border-radius: 6px;
    z-index: 1;
}
.slider-wrapper {
    padding: 20px 20px 26px 20px;
}
.slider-input__wrapper {
    display: flex;
}
.slider-input__innerfilter,
.vue-slider-mark-label {
    @include font("HelveticaRegular", 100, 14px, 25.2px);
}
.vue-slider-ltr .vue-slider-mark-label,
.vue-slider-rtl .vue-slider-mark-label {
    margin-top: 0;
    top: -33px;
}
.vue-slider-ltr .vue-slider-mark-label{
    left:17px;
}

.vue-slider-mark:nth-child(2) {
    .vue-slider-mark-label:nth-child(2) {
        left: 190px;
    }
}

.slider-input__innerfilter {
    width: 100px;
    height: 42px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    padding: 8px 0 9px 12px;
}
.slider-input__innerfilter + .slider-input__innerfilter {
    margin-left: 9px;
}
.vue-slider {
    margin-top: 42px;
}
.vue-slider-process {
    background-color: #ff634a;
}
.vue-slider-dot-handle {
    background-color: #ff634a;
    border-color: #ff634a;
}
</style>
