<template>
    <form @submit.prevent="checkFrom">
        <div class="input-group name">
            <input
                type="text"
                name="namedata"
                v-model="input.namearea"
                placeholder="Name"
            />
            <label for="namedata">Name</label>
            <p class="error" v-show="!validation.namearea">
                {{ errormessage.namearea }}
            </p>
        </div>
        <div class="input-group">
            <textarea
                name="textboxdata"
                v-model="input.textboxarea"
                placeholder="Message"
            ></textarea>
            <label for="textboxdata">Message</label>
            <p class="error" v-show="!validation.textboxarea">
                {{ errormessage.textboxarea }}
            </p>
        </div>
        <div class="button-group">
        <button type="submit">確認</button>
        </div>
    </form>
</template>

<script>
export default {
    name: "ContactInput",
    data() {
        return {
            input: {
                namearea: "",
                textboxarea: "",
            },
            validation: {
                namearea: false,
                textboxarea: false,
            },
            errormessage: {
                namearea: "",
                textboxarea: "",
            },
        };
    },
    methods: {
        checkFrom(event) {
            //I名前バリデーション
            this.validation.namearea = false;
            this.validation.textboxarea = false;
            if (!this.input.namearea) {
                this.errormessage.namearea = "名前を入力してください";
            } else {
                this.validation.namearea = true;
            }

            //Iテキストのバリデーション
            if (!this.input.textboxarea) {
                this.errormessage.textboxarea = "メッセージを入力してください";
            } else {
                this.validation.textboxarea = true;
            }
            if (
                this.validation.namearea == true &&
                this.validation.textboxarea == true
            ) {
                this.submit();
            }
            event.preventDefault();
        },

        submit() {
            this.$emit("update", {
                namearea: this.input.namearea,
                textboxarea: this.input.textboxarea,
            });
        },
    },
};
</script>


<style lang="scss" scoped>

</style>