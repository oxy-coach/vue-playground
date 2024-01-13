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
    }
}
</script>

<style lang="css">

</style>