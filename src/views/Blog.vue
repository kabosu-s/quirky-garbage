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
    align-items: flex-start;
    background: url(/img/img_gramophone.svg) no-repeat bottom 25% right 10%;
    background-size: 180px auto;
    border-bottom: 1px solid #444;
    color: #666;
    display: flex;
    font-size: 1.4rem;
    font-weight: 400;
    height: 300px;
    justify-content: space-evenly;
    align-content: flex-start;
    margin: auto;
    padding: 5%;
    width: 100%;
    flex-direction: column;
    flex-wrap: nowrap;
    .title {
    display: block;
    width: 100%;
    font-family: "Oswald", sans-serif;
    font-size: 9rem;
    font-weight: 700;
    color: #2c3e50;
    }
    p {
      width: 100%;
    }
}

</style>