<template>
    <main class="content" v-cloak>
        <div class="mv_img" v-if="article.mainimage">
            <img :src="article.mainimage.url" />
        </div>
        <h1 v-cloak>{{ article.title }}</h1>
        <div class="date" v-cloak>
            {{ new Date(article.publishedAt).toLocaleDateString() }}
        </div>
        <div class="article_main" v-html="maintext"></div>
    </main>
    <nav>
        <a :href="/articles/ + prev.id" v-if="prev" class="prev">
            <dl>
                <dt>
                    <span>前の記事</span>
                    {{ prev.title }}
                </dt>
                <dd class="img_box" v-if="prev.mainimage">
                    <img :src="prev.mainimage.url" />
                </dd>
            </dl>
        </a>
        <a :href="/articles/ + next.id" v-if="next" class="next">
            <dl>
                <dt>
                    <span>次の記事</span>
                    {{ next.title }}
                </dt>
                <dd class="img_box" v-if="next.mainimage">
                    <img :src="next.mainimage.url" />
                </dd>
            </dl>
        </a>
    </nav>
</template>

<script>
import axios from "axios";
import cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";

export default {
    name: "ArticleDetail",
    data() {
        return {
            article: {},
            maintext: {},
            prev: {},
            next: {},
        };
    },
    created() {
        this.getArticle();
        this.getPrevNext();
    },
    methods: {
        async getArticle() {
            // idを指定して特定の記事を取得する
            const response = await axios.get(
                process.env.VUE_APP_X_API_URL_BLOG + this.$route.params.id,
                {
                    headers: {
                        "X-API-KEY": process.env.VUE_APP_X_API_KEY,
                    },
                }
            );
            this.article = response.data;
            const $ = cheerio.load(response.data.body);
            $("pre code").each((_, elm) => {
                const result = hljs.highlightAuto($(elm).text());
                $(elm).html(result.value);
                $(elm).addClass("hljs");
            });
            this.maintext = $.html();
            //titleを書き換える
            document.title = this.article.title;
        },
        async getPrevNext() {
            const response = await axios.get(
                process.env.VUE_APP_X_API_URL_BLOG +
                    "?limit=100" +
                    "&fields=id,title,mainimage",
                {
                    headers: {
                        "X-API-KEY": process.env.VUE_APP_X_API_KEY,
                    },
                }
            );
            const contents = response.data.contents;
            const index = contents.findIndex(
                (content) => content.id === this.$route.params.id
            );
            this.prev = contents[index + 1];
            this.next = contents[index - 1];
        },
    },
};
</script>
<style lang="scss" scoped>
[v-cloak] {
    display: none;
}
.content {
    width: 100%;
    margin: 0 auto;
    max-width: 980px;
    @include mq980 {
        padding: 0 2%;
    }
}
.mv_img {
    text-align: center;
    margin: 20px auto;
    max-height: 480px;
    max-width: 980px;
    overflow: hidden;
    width: auto;
    img {
        width: 100%;
    }
}
h1 {
    font-size: 2.8rem;
    padding: 0 0 1rem;
    border-bottom: 2px solid $c_base;
    font-weight: bold;
    @include mq767 {
        font-size: 2.2rem;
        line-height: 1.6;
    }
}
.date {
    font-size: 1.4rem;
    padding: 1rem 0;
    border-bottom: 1px solid $c_base;
    margin: 0 auto 2rem;
}
.article_main {
    font-size: 1.6rem;
    line-height: 2;
    margin: 0 auto 4rem;
    padding: 1rem 0;
}
.fade-enter-active,
.fade-leave-active {
    animation: fadeIn 10s ease;
}
.fade-enter-from,
.fade-leave-to {
    min-height: 90vh;
}
@keyframes fadeIn {
    0% {
        transform: translateY(20px);
    }
    100% {
        transform: translateY(0);
    }
}
nav {
    width: 100%;
    border-top: 1px solid $c_base;
    display: flex;
    > a {
        width: 50%;
        display: block;
        transition: all 0.3s ease-in;
        &:hover {
            background: #e0e0e0;
            opacity: 0.5;
        }
        &.prev {
            border-right: 1px solid $c_base;
            display: block;
            margin: 0 auto 0 0;
        }
        &.next {
            border-left: 1px solid $c_base;
            display: block;
            margin: 0 0 0 auto;
        }
        &.prev + .next {
            border-left: none;
        }
        dl {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 1.4em;
            flex-flow: row wrap;
            dt {
                order: 2;
                padding: 15px;
                text-align: left;
                width: calc(100% - 200px);
                @include mq767 {
                    width: 100%;
                }
                span {
                    display: block;
                    font-weight: bold;
                }
            }
            .img_box {
                background: #ddd;
                width: 200px;
                padding: 5px;
                order: 1;
                img {
                    max-width: 100%;
                }
            }
        }
        &.next dl {
            dt {
                order: 1;
                @include mq767 {
                    order: 2;
                }
            }
            .img_box {
                order: 2;
                @include mq767 {
                    order: 1;
                }
            }
        }
    }
}

</style>
<style lang="scss">
.article_main {
    p {
        font-size: 1.6rem;
        line-height: 2;
        margin: 0 auto 1rem;
    }
    h2 {
        margin: 0 auto 1rem;
        padding: 0 0 1.5rem;
        font-size: 2.4rem;
        font-weight: 600;
        position: relative;
        &:after {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 10px;
            content: "";
            background-image: -webkit-repeating-linear-gradient(
                135deg,
                $c_base,
                $c_base 1px,
                transparent 2px,
                transparent 5px
            );
            background-image: repeating-linear-gradient(
                -45deg,
                $c_base,
                $c_base 1px,
                transparent 2px,
                transparent 5px
            );
            background-size: 7px 7px;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
        }
    }
    h3 {
        margin: 0 auto 1rem;
        font-size: 1.8rem;
        font-weight: 600;
    }
    pre {
        margin: 0 auto 1rem;
    }
    code:not([class]) {
        display: inline-block;
        background: #e0e0e0;
        padding: 0 0.5rem;
        color: $c_base;
        border-radius: 3px;
    }
    a {
        color: #41ba82;
        text-decoration: underline;
    }
    img {
        max-width: 100%;
        margin: 30px auto;
        display: block;
    }

    blockquote {
        box-sizing: border-box;
        position: relative;
        padding: 30px 15px 30px 50px;
        border: none;
        margin: 3rem auto;
        color: #666;
        &::before {
            content: "";
            background: url(/img/icon_blockquate.svg) no-repeat center center;
            background-size: 30px auto;
            width: 50px;
            height: 50px;
            position: absolute;
            display: inline-block;
            border-left: solid 2px #ccc;
            border-top: solid 2px #ccc;
            top: 0;
            left: 0;
        }
        &::after {
            content: "";
            width: 50px;
            height: 50px;
            position: absolute;
            display: inline-block;
            border-right: solid 2px #ccc;
            border-bottom: solid 2px #ccc;
            bottom: 0;
            right: 0;
        }
        a {
            display: block;
            text-align: right;
            margin: 5px 0 0 auto;
            color: #999;
            font-size: 1rem;
        }
    }
}
</style>