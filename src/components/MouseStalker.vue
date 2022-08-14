<template>
    <div class="loader" :class="{ open: isOpen }"></div>
    <div class="mouse-stalker" :class="{ set: set }">
        <span></span>
    </div>
</template>

<script>
export default {
    name: "MouseStalker",
    data() {
        return {
            stalker: { x: 0, y: 0 },
            mouse: { x: 0, y: 0 },
            mouseStalker: null,
            targets: null,
            set: false,
            click: false,
            isOpen: true,
        };
    },
    mounted() {
        this.setup();
        document.addEventListener("mousemove", this.mousemove);

        this.$router.beforeEach((to, from, next) => {
            console.log(to.path, from.path);
            if (to.path === from.path) {
                    // this.isOpen = true;
                    // this.setpointer();
                next();
            } else {
                this.isOpen = false;
                setTimeout(() => {
                    this.setpointer();
                    this.isOpen = true;
                    next();
                }, 800);
                
            }
        });
    },
    methods: {
        setup() {
            this.mouseStalker = document.querySelector(".mouse-stalker");
            this.update();
        },
        update() {
            // マウスストーカー要素の位置を更新
            this.stalker.x += (this.mouse.x - this.stalker.x) * 0.1;
            this.stalker.y += (this.mouse.y - this.stalker.y) * 0.1;
            // マウスストーカーの位置を小数点第一位まで四捨五入
            let x = Math.round(this.stalker.x * 10) / 10;
            let y = Math.round(this.stalker.y * 10) / 10;
            // マウスストーカー要素のスタイルを更新
            this.mouseStalker.style.transform =
                `translate3d(` + x + "px," + y + "px, 0)";
            // ループ
            requestAnimationFrame(this.update);
        },
        mousemove(e) {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        },
        setpointer() {
            this.set = false;
            this.click = false;
            this.targets = document.getElementsByTagName("a");
            this.targets.forEach((target) => {
                target.addEventListener("mouseover", this.hovertarget, false);
                target.addEventListener("mouseout", this.leavetarget, false);
                target.addEventListener("click", this.clicktarget, false);
            });
        },
        hovertarget() {
            this.set = true;
        },
        leavetarget() {
            this.set = false;
        },
        clicktarget() {
            this.click = true;
        },
    },
};
</script>


<style lang="scss" scoped>
.loader {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10001;
    pointer-events: none;
    background: $c_base;
    transition: all .2s ease-in;
    opacity: 1;
    &.open {
        opacity: 0;
    }
}
.mouse-stalker {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1px;
    height: 1px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    pointer-events: none;
    > span {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: $c_base;
        border: 1px solid $c_base;
        flex-shrink: 0;
        transition: all 0.8s ease-in;
    }
    &.set > span {
        width: 30px;
        height: 30px;
        background: transparent;
        animation: ripple 2s infinite;
    }
    // &.click > span {
    //     width: 300vw;
    //     height: 300vw;
    //     border: 1px solid transparent;
    //     opacity: 0;
    // }
}
@keyframes ripple {
    0% {
        transform: scale(0);
        opacity: 1;
    }
    100% {
        transform: scale(3);
        opacity: 0;
    }
}
</style>