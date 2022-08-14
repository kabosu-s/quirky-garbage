<template>
<div class="main_visual">
    <svg class="circles" width="100%" height="100%" viewBox="0 0 1400 1400">
    <def>
    <path id="circle-1" d="M382,700.5A318.5,318.5 0 1 11019,700.5A318.5,318.5 0 1 1382,700.5"></path>
    <path id="circle-2" d="M487,700.5A213.5,213.5 0 1 1914,700.5A213.5,213.5 0 1 1487,700.5"></path>
    <path id="circle-3" d="M567.5,700.5A133,133 0 1 1833.5,700.5A133,133 0 1 1567.5,700.5"></path>
    </def>
    <text class="circles_text circles_text_1">
    <textPath class="circles_text-path" xlink:href="#circle-1" aria-label="" textLength="2000">Garbage Base Circle TEXT</textPath>
    </text>
    <text class="circles_text circles_text_2">
    <textPath class="circles_text-path" xlink:href="#circle-2" aria-label="" textLength="1800">Garbage Base Circle TEXT</textPath>
    </text>
    <text class="circles_text circles_text_3">
    <textPath class="circles_text-path" xlink:href="#circle-3" aria-label="" textLength="800">Garbage Base Circle TEXT Garbage Base Circle TEXT</textPath>
    </text>
    </svg>
</div>
<main class="about content">
<div class="header">
    <img src="/img/img_misin.svg" alt="" />
    <h1>ABOUT</h1>
    <p class="message">
        Vue-CliとHeadlessCMSの勉強を兼ねてブログを作ったので…<br>
        がんばって続けてみます。
    </p>
</div>

</main>
</template>

<script>
import  { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default {
    name: "Home",
    components: {
    },
    mounted() {
    this.scrollRotation();
    },
    methods: {
        scrollRotation() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".circles",
                start: "top center",
                end: "center 0%",
                scrub: true,
                // markers: true
            }
        });
        tl.to(".circles", {rotation: "360deg"});
        },
    }
};
</script>

<style lang="scss" scoped>
.main_visual {
    align-items: center;
    color: #666;
    display: flex;
    flex-flow: column wrap;
    font-size: 1.4rem;
    font-weight: 400;
    justify-content: center;
    align-content: center;
    margin: auto;
    padding: 5%;
    width: 100%;
    height: 600px;
    position: relative;
    overflow: hidden;
    flex-grow: 2;
}

.circles {
    pointer-events: none;
    position: absolute;
    width: 170vmin;
    height: 170vmin;
    top: calc(80% - 170vmin / 2 );
    left: calc(70% - 170vmin / 2 );
}
.circles_text {
    text-transform: uppercase;
    transform-origin: 700px 700px;
    will-change: transform, opacity;
}
.circles_text_1 {
    font-size: 17vmin;
    font-size: clamp(136px,17vmin,153px);
    font-family: 'Bellefair', serif;
    font-weight: 400;
    fill: #26414b;
    animation: rotate-anime 180s linear infinite;
}
.circles_text_2 {
    font-size: 13.5vmin;
    font-size: clamp(110px,13.5vmin,120px);
    font-family: 'Fredericka the Great', cursive;
    font-weight: 400;
    fill: #91979a;
    animation: rotate-anime 130s linear infinite;
}
.circles_text_3 {
    font-size: 9.5vmin;
    font-size: clamp(85px,9.5vmin,94px);
    font-family: 'Dorsa', sans-serif;
    font-weight: 400;
    fill:#2C3E50;
    animation: rotate-anime 80s linear infinite;
}
@keyframes rotate-anime {
    0%  {transform: rotate(0);}
    100%  {transform: rotate(360deg);}
}
</style>