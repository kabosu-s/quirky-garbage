<template>
    <form @submit.prevent="submitForm" v-show="!comp">
        <dl class="input-group name">
            <dt>Name</dt>
            <dd>
                {{ form.namearea }}
            </dd>
        </dl>
        <dl class="input-group">
            <dt>Message</dt>
            <dd class="messagearea">
                {{ form.textboxarea }}
            </dd>
        </dl>

        <p class="message">こちらの内容でお送りします</p>
        <button type="submit">送信</button>
    </form>
    <div v-show="comp">
    <p class="message">ありがとうございました！</p>
    </div>
</template>

<script>
export default {
    name: "ContactComfirm",
    data() {
        return {
            comp: false,
        };
    },
    props: {
        form: Object,
    },
    methods: {
        submitForm() {
            fetch(process.env.VUE_APP_X_API_URL_CONTACT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-WRITE-API-KEY": process.env.VUE_APP_X_WRITE_API_KEY,
                },
                body: JSON.stringify({
                    name: this.form.namearea,
                    text: this.form.textboxarea,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.comp = true;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>

