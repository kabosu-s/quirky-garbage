<template>
    <header>
        <router-link to="/" active-class="link_active" exact>
            <div class="title">
                <img class="logo" :src="logo" width="50" height="79" />
                <div class="title_text">QUIRKY<br>GARBAGE</div>
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
  @include mq767 {
    height: 60px;
    padding: 0 1%;
  }
  justify-content: space-between;
  padding: 0;
  position: relative;
  width: 100%;
  &::before {
    background: url(/img/img_scissors.svg) no-repeat center center $c_bacckground;
    background-size: 100% auto;
    bottom: -15px;
    content: '';
    display: block;
    height: 30px;
    @include mq767 {
      right: 70px;
      width: 30px;
    }
    position: absolute;
    right: 120px;
    width: 60px;
  }
}
.title {
  align-items: center;
  border-right: 1px solid #2c3e50;
  display: flex;
  flex-flow: row nowrap;
  @include mq767 {
    border-right: none;
    padding: 0;
  }
  padding: 10px 20px;
  .logo {
    @include mq767 {
      height: 60px;
      margin: 0 10px 0 0;
      width: 30px;
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
    font-family: 'Oswald', sans-serif;
    font-size: 3.8rem;
    font-weight: 700;
    @include mq767 {
      font-size: 3.2rem;
      br {
        display: none;
      }
    }
    line-height: 1;
  }
}
nav {
  display: none;
  a {
    opacity: .1;
    color: #fff;
    display: flex;
    font-family: 'Oswald', sans-serif;
    font-size: 4rem;
    transition: all .3s ease-in;
    width: 100%;
  }
  &.active {
    align-items: center;
    animation: fadePosition 1s ease;
    background: $c_base;
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    box-shadow: -5px 0 5px 0 rgba(0,0,0,.2);
    @include mq767 {
      width: 100%;
    }
    justify-content: center;
    padding: 0 5px;
    position: fixed;
    right: 0;
    top: 0;
    width: 50%;
    z-index: 10;
    a {
      opacity: 1;
      padding: 16px 5%;
      &:hover {
        color: #91979a;
        padding-left: 4%;
      }
    }
  }
}
.openbtn {
  border-left: 1px solid $c_base;
  cursor: pointer;
  display: block;
  height: 100px;
  @include mq767 {
    height: 60px;
    width: 50px;
  }
  position: relative;
  width: 100px;
  z-index: 11;
  span {
    background-color: $c_base;
    display: inline-block;
    height: 2px;
    position: absolute;
    right: 7px;
    transition: transform .2s ease;
    &:nth-of-type(1) {
      @include mq767 {
        top: 25px;
        width: 70%;
      }
      top: 35px;
      width: 80%;
    }
    &:nth-of-type(2) {
      @include mq767 {
        top: 35px;
        width: 40%;
      }
      top: 55px;
      width: 50%;
    }
  }
  &.active span {
    background-color: #fff;
    @include mq767 {
      right: 10px;
      width: 50px;
    }
    position: fixed;
    right: 20px;
    width: 100px;
    &:nth-of-type(1) {
      @include mq767 {
        top: 37px;
      }
      top: 57px;
      transform: translateY(6px) rotate(-45deg);
    }
    &:nth-of-type(2) {
      @include mq767 {
        top: 50px;
      }
      top: 70px;
      transform: translateY(-6px) rotate(45deg);
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