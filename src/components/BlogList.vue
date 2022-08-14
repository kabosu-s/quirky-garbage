<template>
    <div class="article_list">
        <transition-group name="fade" appear>
            <div v-for="article in articles" :key="article.id" class="article">
                <router-link
                    :to="{
                        name: 'article-detail',
                        params: { id: article.id },
                    }"
                >
                    <img :src="article.mainimage.url" />
                    <h2>{{ article.title }}</h2>
                    <div class="date">
                        {{ new Date(article.publishedAt).toLocaleDateString() }}
                    </div>
                </router-link>
            </div>
        </transition-group>
    </div>
    <div ref="observe_element"></div>
</template>

<script>
import axios from "axios";

export default {
    name: "BlogList",
    data() {
        return {
            articles: [],
            observer: null,
            page: 0,
        };
    },
    created() {
        this.getPosts();
    },
    mounted() {
        //無限スクロール
        this.observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry && entry.isIntersecting) {
                // 記事を取得する
                this.getPosts();
            }
        });
        const observe_element = this.$refs.observe_element;
        this.observer.observe(observe_element);
    },
    methods: {
        async getPosts() {
            const response = await axios.get(
                process.env.VUE_APP_X_API_URL_BLOG +
                    "?limit=" +
                    (this.page = this.page + 6) +
                    "&fields=id,title,mainimage,publishedAt",
                {
                    headers: {
                        "X-API-KEY": process.env.VUE_APP_X_API_KEY,
                    },
                }
            );
            this.articles = response.data.contents;
        },
    },
};
</script>


<style lang="scss" scoped>
.article_list {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    margin: 0 auto -1px;
}
.article {
    width: calc(100% / 3);
    @include mq767 {
        width: 100%;
    }
    a {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
        border-right: 1px solid #444;
        border-bottom: 1px solid #444;
        padding: 5% 5% 85px;
        transition: all 0.3s ease-in;
        &:hover {
            background: #e0e0e0;
            color: rgba($c_base, .5);
        }
        @include mq767 {
            border-right: none;
        }
        &::before {
            display: inline-block;
            position: absolute;
            bottom: 10px;
            left: 5%;
            margin: 0 10px 0 0;
            content: "MORE";
        }
    }
    &:nth-child(3n) {
        a {
            border-right: none;
        }
    }
    img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        margin: 10px auto;
        display: block;
        -webkit-filter: grayscale(100%);
        -moz-filter: grayscale(100%);
        -ms-filter: grayscale(100%);
        -o-filter: grayscale(100%);
        filter: grayscale(100%);
        transition: filter 0.6s ease;
    }
    h2 {
        font-size: 2rem;
        font-weight: 600;
        line-height: 1.4;
        padding: 0;
        margin: 0 auto 10px;
    }
    .date {
        position: absolute;
        bottom: 30px;
        left: 5%;
        right: 5%;
        display: block;
        width: 90%;
        font-size: 1.2rem;
        padding: 10px 0 10px 30px;
        border-top: 2px solid #444;
        border-bottom: 1px solid #444;
        margin: 0 auto 10px;

        &::before {
            display: inline-block;
            position: absolute;
            top: 10px;
            left: 0;
            width: 20px;
            height: 20px;
            margin: 0 10px 0 0;
            content: "";
            background: url(/img/img_date.svg) no-repeat center center;
            background-size: 100% auto;
        }
    }

    a:hover img {
        -webkit-filter: grayscale(0);
        -moz-filter: grayscale(0);
        -ms-filter: grayscale(0);
        -o-filter: grayscale(0);
        filter: grayscale(0);
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
    animation: fadeIn 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@keyframes fadeIn {
    0% {
        transform: translateY(20px);
    }
    100% {
        transform: translateY(0);
    }
}
</style>