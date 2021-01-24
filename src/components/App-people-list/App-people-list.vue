<template>
    <div v-if="data.length !== 0" class="people-page__list-wrapper">
        <div
            v-for="(item, index) in data"
            :key="index"
            :class="`list-item-${index + 1} item-card`"
        >
            <img :src="item.img" :alt="item.name" class="list-item-bgImg" />
            <div class="list-items__wrapper">
                <div class="list-item__age">{{ item.age }}BBY</div>
                <h2 class="list-item__title">{{ item.name }}</h2>
                <div class="list-item__info">
                    <div class="list-item__info-elem">
                        Eye color : {{ item.eye_color }}
                    </div>
                    <div class="list-item__info-elem">
                        Height : {{ item.height }}
                    </div>
                    <div class="list-item__info-elem">
                        Mass : {{ item.mass }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="people-page__infomsg-wrapper">
        <div class="people-page__infomsg">No data to show</div>
    </div>
</template>
<script>
export default {
    name: "AppPeopleList",
    props: { data: { type: Array, default: Array } },
};
</script>
<style lang="scss">
@mixin font($font, $weight, $size, $height) {
    font-family: $font;
    font-weight: $weight;
    font-size: $size;
    line-height: $height;
}
.people-page__infomsg-wrapper{
    padding:20px 0;
}
.people-page__infomsg {
    @include font("HelveticaRegular", 400, 23px, 14.56px);
    text-align: center;
}
.item-card {
    @include font("HelveticaRegular", 400, 14px, 14.56px);
    height: 410px;
    position: relative;
    color: #ffffff;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.56) 0%,
        rgba(0, 0, 0, 0.08) 100%
    );
    border-radius: 6px;
    overflow: hidden;
}
.list-items__wrapper {
    padding: 21px 0 0 24px;
}
.list-item-bgImg {
    position: absolute;
    width: inherit;
    height: inherit;
    object-fit: cover;
    object-position: center;
    z-index: -2;
}
.people-page__list-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(339px, 608px));
    grid-gap: 16px;
}
.list-item {
    position: relative;
    width: 608px;
    height: 410px;
}
.list-item__age {
    opacity: 0.8;
}
.list-item__title {
    font-size: 24px;
    line-height: 35.52px;
    margin: 16px 0 8px 0;
}
.list-item__info {
    display: flex;
    font-weight: 100;
}
.list-item__info-elem {
    @include font("HelveticaThin", 100, 14px, 25.2px);
}
.list-item__info-elem + .list-item__info-elem {
    margin-left: 24px;
}
</style>
