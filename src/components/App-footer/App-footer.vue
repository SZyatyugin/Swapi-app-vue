<template>
    <footer class="app-footer">
        <div class="container">
            <div class="app-footer__wrapper">
                <div class="app-footer__logo">
                    <img
                        src="../../assets/images/Star_Wars.png"
                        alt=""
                        class="app-header__logo"
                    />
                    <div class="app-footer__icons">
                        <img
                            src="../../assets/images/facebook.png"
                            alt=""
                            class="app-footer__icon"
                        />
                        <img
                            src="../../assets/images/instagram.png"
                            alt=""
                            class="app-footer__icon"
                        />
                    </div>
                    
                </div>

                <div class="app-footer__text-wrapper">
                    <div class="app-footer__logo-text">
                        All Rights Reserved.
                    </div>
                    <div class="app-footer__logo-text">Privacy Policy</div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "AppFooter",
};
</script>
<style lang="scss">
.app-footer {
    margin-top: 112px;
    height: 195px;
    background-color: #f2eeee;
}
.app-footer__wrapper {
    padding-top: 43.9px;
}
.app-footer__logo{
    display: flex;
    justify-content: space-between;
    .app-header__logo{
        width: 135.92px;
    }
}
.app-footer__logo-text {
    font-family: "GTWalsheimProRegular";
    font-weight: 300;
    font-size: 14px;
    line-height: 25.2px;
    color:#100F0F;
}
.app-footer__icon{
    width: 40px;
    height: auto;
}
.app-footer__icon+.app-footer__icon{
    margin-left: 16px;
}
.app-footer__text-wrapper{
    display: flex;
    justify-content: space-between;
     margin-top: 65.53px;
}
</style>
