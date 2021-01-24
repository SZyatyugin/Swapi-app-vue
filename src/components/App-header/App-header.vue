<template>
    <header class="app-header">
        <div class="container">
            <div class="app-header__inner">
                <img
                    src="../../assets/images/Star_Wars.png"
                    alt=""
                    class="app-header__logo"
                />
                <div class="app-header__nav">
                    <form action="#" class="app-header__form">
                        <select id="" name="" class="app-header__lang">
                            <option value="En">En</option>
                            <option value="Uk">Uk</option>
                        </select>
                    </form>
                    <button class="app-header__btn-login btn">Log in</button>
                    <button class="app-header__btn-signup btn">Sign up</button>
                    <div class="app-header__menu">
                        <div class="app-header__menu-item"></div>
                        <div class="app-header__menu-item"></div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "Appheader",
    data() {
        return {
            title: "Star Wars",
        };
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
.app-header,
.app-header__lang {
    background-color: #f2eeee;
}
.app-header__lang,
.app-header__btn-login,
.app-header__btn-signup {
    @include font("HelveticaRegular", 400, 14px, 14.56px);
    border: none;
}
.app-header__menu {
    display: none;
    width: 24px;
}
.app-header__menu-item {
    width: inherit;
    border-top: 1.3px solid black;
}
.app-header__menu-item + .app-header__menu-item {
    margin-top: 7.4px;
}
.app-header__inner,
.app-header__nav {
    height: 80px;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
}
.app-header__btn-signup {
    font-family: "GTWalsheimProRegular";
    background-color: #ff634a;
    padding: 16.5px 56px;
    border-radius: 6px;
}
.app-header__btn-login {
    margin: 0 43px 0 57px;
}
</style>
