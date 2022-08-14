<template>
    <div class="contact content">
        <div class="header">
            <img src="/img/img_tel.svg" alt="" />
            <h1>CONTACT</h1>
            <p class="message">お問い合わせはこちらから</p>
        </div>
        <div class="section">
            <ContactInputList
                v-show="stepNumber === 1"
                @update="updateForm"
            ></ContactInputList>
            <ContactConfirm
                v-if="stepNumber === 2"
                v-bind:form="form"
            ></ContactConfirm>
            <button @click="backStep" v-show="stepNumber != 1" class="back">
                Back
            </button>
        </div>
    </div>
</template>

<script>
import ContactInputList from "@/components/ContactInput.vue";
import ContactConfirm from "@/components/ContactConfirm.vue";

export default {
    name: "Contact",
    components: {
        ContactInputList,
        ContactConfirm,
    },
    data() {
        return {
            stepNumber: 1,
            form: {
                namearea: null,
                textboxarea: null,
            },
        };
    },
    methods: {
        updateForm: function (formData) {
            Object.assign(this.form, formData);
            this.stepNumber = 2;
        },
        backStep: function () {
            this.stepNumber--;
        },
        nextStep: function () {
            this.stepNumber++;
        },
    },
};
</script>

<style lang="scss" scoped>
.back {
    position: relative;
    padding: 0 0 10px 30px;
    transition: all .3s;
    &::before {
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 1px;
        background: $c_base;
        transition: all .3s;
    }
    &::after {
        content: "";
        position: absolute;
        bottom: 5px;
        left: 0;
        width: 15px;
        height: 1px;
        background: $c_base;
        transform: rotate(-35deg);
        transition: all .3s;
    }
    &:hover {
    color: #666;
        &::before {
            right: 20%;
            background: #666;
        }
        &::after {
            left: -20%;
            background: #666;
        }
    }
}
</style>