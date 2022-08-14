<template>
    <Header />
    <router-view />
    <Footer />
    <MouseStalker/>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import MouseStalker from "@/components/MouseStalker.vue";

export default {
    components: {
        Header,
        Footer,
        MouseStalker,
    },
    methods: {
        //titleをセットするメソッド
        createTitleDesc: function (routeInstance) {
            //引数でrouteインスタンスを渡すmountedオプションで代入
            // route.meta.titleで設定したtitleを取得
            if (routeInstance.meta.title) {
                //titleが設定されていれば
                const setTitle = routeInstance.meta.title + " | Garbage Base";
                document.title = setTitle;
            } else {
                //titleが設定されていない時
                
                document.title = "Garbage Base";
            }
            //descriptionを判定
            if (routeInstance.meta.desc) {
                //descが設定されていれば
                const setDesc = routeInstance.meta.desc;
                document
                    .querySelector("meta[name='description']")
                    .setAttribute("content", setDesc);
            } else {
                //descが設定されていない時
                document
                    .querySelector("meta[name='description']")
                    .setAttribute("content", "description is not set");
            }
        },
    },
    mounted: function () {
        const routeInstance = this.$route; //routeインスタンス（$rounte）を変数(routeInstance)に代入
        this.createTitleDesc(routeInstance); //実行。method呼ぶときはthis.
    },
    watch: {
        $route(routeInstance) {
            this.createTitleDesc(routeInstance);
        },
    },
};
</script>


<style lang="scss">
#app {
    width: calc(100% - 2%);
    max-width: 1800px;
    min-height: 98vh;
    margin: 10px auto;
    border: 1px solid $c_base;
    display: flex;
    flex-flow: column wrap;
}
</style>
