<template>
    <header>
        <router-link to="/" active-class="link_active" exact>
            <div class="title">
                <img class="logo" :src="logo" width="50" height="79" />
                <div class="title_text">Garbage<br>Base.</div>
            </div>
        </router-link>
        <div
            class="openbtn"
            v-on:click="ActiveBtn = !ActiveBtn"
            v-bind:class="{ active: ActiveBtn }"
        >
            <span></span><span></span>
        </div>
        <nav v-bind:class="{ active: ActiveBtn }" class="nav">
            <router-link
                to="/blog"
                active-class="link_active"
                exact
                v-on:click="ActiveBtn = !ActiveBtn"
                >Blog</router-link
            >
            <router-link
                to="/about"
                active-class="link_active"
                exact
                v-on:click="ActiveBtn = !ActiveBtn"
                >About</router-link
            >
            <router-link
                to="/contact"
                active-class="link_active"
                exact
                v-on:click="ActiveBtn = !ActiveBtn"
                >Contact</router-link
            >
        </nav>
    </header>
</template>

<script>
import logo from "@/assets/logo.svg";

export default {
    name: "Header",
    data() {
        return {
            logo,
            ActiveBtn: false,
        };
    },
};
</script>

<style lang="scss" scoped>
header {
  border-bottom: 1px dashed #666;
  display: flex;
  flex-flow: row nowrap;
  height: 100px;
  justify-content: space-between;
  padding: 0;
  position: relative;
  width: 100%;
  @include mq767 {
    height: 60px;
    padding: 0 1%;
  }
  &::before {
    background: url(/img/img_scissors.svg) no-repeat center center $c_bacckground;
    background-size: 100% auto;
    bottom: -15px;
    content: "";
    display: block;
    height: 30px;
    position: absolute;
    right: 3%;
    width: 60px;
    @include mq767 {
      width: 30px;
      right: 70px;
    }
  }
}
.title {
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  border-right: 1px solid #2c3e50;
  padding: 10px 20px;
  @include mq767 {
    padding: 0;
    border-right: none;
  }
  .logo {
    @include mq767 {
      margin: 0 10px 0 0;
      width: 30px;
      height: 60px;
    }
    line-height: 1;
    margin: 0 20px 0 0;
    width: 50px;
    img {
      max-width: 100%;
      width: 50px;
    }
  }
  .title_text {
    font-family: "Oswald", sans-serif;
    font-size: 3.8rem;
    font-weight: 700;
    line-height: 1;
    @include mq767 {
      font-size: 3.2rem;
      br {
        display: none;
      }
    }
  }
}
nav {
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  @include mq767 {
    display: none;
    &.active {
      animation: fadePosition 1s ease;
      display: block;
      position: absolute;
      top: 70px;
      width: 100px;
      right: 5px;
      background: $c_bacckground;
      z-index: 0;
      padding: 0 5px;
      border-radius: 5px;
      box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.2);
      z-index: 1;
    }
  }
  a {
    font-family: "Oswald", sans-serif;
    font-size: 2rem;
    width: 120px;
    display: flex;
    @include mq767 {
      display: block;
      text-align: right;
      border-bottom: 1px dotted $c_base;
      margin: 10px auto;
      padding: 0 10px;
    }
  }
}
.openbtn {
  display: none;
  position: relative;
  cursor: pointer;
  height: 60px;
  width: 50px;
  border-left: 1px solid $c_base;
  @include mq767 {
    display: block;
  }
  span {
    background-color: $c_base;
    display: inline-block;
    height: 2px;
    left: 7px;
    position: absolute;
    transition: all 0.2s;
    &:nth-of-type(1) {
      top: 25px;
      width: 80%;
    }
    &:nth-of-type(2) {
      top: 35px;
      width: 50%;
    }
  }
  &.active span {
    &:nth-of-type(1) {
      left: 10px;
      top: 25px;
      transform: translateY(6px) rotate(-45deg);
      width: 65%;
    }
    &:nth-of-type(2) {
      left: 10px;
      top: 37px;
      transform: translateY(-6px) rotate(45deg);
      width: 65%;
    }
  }
}

@keyframes fadePosition {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>