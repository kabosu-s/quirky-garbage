<template>
    <div class="main_visual">
        <h1 class="title">Blog</h1>
        <p>Vue勉強がてら色々作ってみたので飽きるまで頑張るブログ</p>
    </div>
    <BlogList />
</template>

<script>
// @ is an alias to /src
import BlogList from "@/components/BlogList.vue";

export default {
    name: "Blog",
    components: {
        BlogList,
    },
};
</script>

<style lang="scss" scoped>
.main_visual {
    background: url(/img/img_gramophone.svg) no-repeat bottom 10% right 5%;
    background-size: 180px auto;
    border-bottom: 1px solid #444;
    color: #666;
    height: 300px;
    margin: auto;
    overflow: hidden;
    padding: 0 3%;
    width: 100%;
    .title {
        font-family: 'Bellefair', serif;
        font-size: 22rem;
        color: #c9d0d4;
        margin: -25px auto auto -4%;
        white-space: nowrap;
        line-height: 1;
    }
    p {
        width: 100%;
    }
}

</style>