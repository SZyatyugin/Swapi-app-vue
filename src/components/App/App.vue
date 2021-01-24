<template>
  <div id="app">
    <AppHeader />
    <AppPeoplePage/>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from "../App-header";
import AppPeoplePage from "../App-people-page";
import AppFooter from "../App-footer";
import "../../scss/main.scss";
export default {
    components: { AppHeader, AppPeoplePage, AppFooter }
};
</script>

<style lang="scss">
@mixin font($font, $weight, $size, $height) {
    font-family: $font;
    font-weight: $weight;
    font-size: $size;
    line-height: $height;
}
*,
*:before,
*:after {
  box-sizing: border-box;
}
.container {
  margin:0 auto;
  max-width: 1268px;
  padding: 0 18px;
}
</style>
