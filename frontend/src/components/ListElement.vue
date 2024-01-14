<template>
    <div class="list-element">
        <input type="text" v-model="localText" @change="updateText">
        <button class="remove-btn" @click="removeElement">Удалить</button>
    </div>
</template>

<script>
export default {
    props: {
        text: String,
        id: Number
    },
    data() {
        return {
            localText: ''
        }
    },
    methods: {
        updateText() {
            this.$emit('updateText', { text: this.localText, ind: this.id })
        },
        removeElement() {
            this.$emit('remove', this.id)
        }
    },
    mounted () {
        this.localText = this.text
    },
    watch: {
        text() {
            // отслеживаем последующие изменения от родителя
            this.localText = this.text
        }
    }
}
</script>

<style lang="css">

.list-element {
    display: flex;
    margin: 5px 0 5px;
}

.list-element input {
    width: 250px;
    margin-right: 20px;
    font-size: 15px;
    padding: 5px 5px 5px 15px;
    border-radius: 5px;
    border: 1px solid gray;
}

.list-element .remove-btn {
    background-color: red;
}

</style>