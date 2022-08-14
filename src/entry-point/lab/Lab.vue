<template>
<div class="main_visual">
<svg class="path" width="100%" height="100%" viewBox="0 0 1400 1400">
<path d="M250,700.5A450.5,450.5 0 1 11151,700.5A450.5,450.5 0 1 1250,700.5"></path>
<g id="group"></g>
</svg>
</div>
</template>

<script>
import gsap from "gsap";
import chroma from "chroma-js";
export default {
    name: "lab",
    data: () => ({
        //
    }),
    mounted() {
        const paths = document.querySelectorAll('.path path');
        const group = document.querySelector('#group');
        const colours = [chroma.scale(['#122538', '#2C3E50', '#395B7C', '#2F6A80', '#748489', '#A8B4B9'])];
        let currentGradient = 1;
        const tl = gsap.timeline({
        onReverseComplete : () => {
            tl.timeScale(1);
            tl.play(0);
        },
        onComplete: () => {
            tl.timeScale(1.5);
            tl.reverse(0);
        }
        });
        function generatePoints () {
        tl.clear();
        group.innerHTML = '';
        let delay = 0;
        paths.forEach(path => {
            const length = path.getTotalLength();
            for (let i = 0; i < length; i+=1) {
            const pointLength = Math.random() * length;
            const point = path.getPointAtLength(pointLength);
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', point.x);
            circle.setAttribute('cy', point.y);
            circle.setAttribute('r', Math.random() * 3 + 1);
            group.appendChild(circle);
            const coloursX = (point.x / 476.5) + ((Math.random() - 0.5) * 0.2);
            tl.to(circle, {
                autoRound: false,
                fill: colours[currentGradient % colours.length](coloursX).hex(),
                cx: point.x + (Math.random() - 0.5) * 60,
                cy: point.y + (Math.random() - 0.5) * 60,
                duration: 'random(0.5, 2)',
                delay: (delay + pointLength) * 0.002,
                ease: 'power2.out'
            }, 0);
            }
            delay += length;
        });
        tl.reversed(false).play(0);
        currentGradient++;
        }
        generatePoints();
    },
};
</script>

<style>
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
    height: 90vh;
    position: relative;
    overflow: hidden;
}
path {
    opacity: 0;
}
.path {
    pointer-events: none;
    position: absolute;
    width: 100vmin;
    height: 100vmin;
    top: calc(50% - 100vmin / 2 );
    left: calc(50% - 100vmin / 2 );
}
</style>
