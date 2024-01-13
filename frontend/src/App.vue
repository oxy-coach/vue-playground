<template>
    <div class="full-width">
      <h1>{{ title }}</h1>

      <div class="dynamic">
        <h2>{{ dynamicTitle }}</h2>
        <div class="form">
            <div class="component" v-for="element, ind in list" v-bind:key="ind">
                <ListElement :id="ind" :text="element.text" @updateText="updateListText" @remove="removeElement" />
            </div>
        </div>
        <button class="save" @click="addElement">Добавить элемент</button>
      </div>

      <div class="result">
        <h2>Дела на сегодня</h2>
        <ul class="list">
            <li v-for="element, ind in list" v-bind:key="ind">
                {{  element.text }}
            </li>
        </ul>
      </div>
    </div>
</template>
  
<script>
import ListElement from './components/ListElement.vue';
  
  export default {
    components: {
    ListElement
},
    data() {
        return {
            title: "Список дел",
            dynamicTitle: "Управление делами",
            list: [
                {
                    "text": "проснуться"
                },
                {
                    "text": "улыбнуться"
                }
            ],
        }
    },
    methods: {
        addElement() {
            this.list.push({"text": ""})
        },
        removeElement(ind) {
            // удаление элемента
            this.list.splice(ind, 1)
        },
        updateListText (data) {
            console.log(data)
            console.log('update text ' + data + ' for ind ');
            this.list[data.ind] = data.text;
        }
    }
  }
</script>
  
  
<style lang="css">
@import url('https://fonts.googleapis.com/css?family=PT+Sans');

.full-width {
    font-family: 'PT Sans', sans-serif;
    width: 100%;
}

.font-weight-bold {
    font-weight: bold;
}

.result > .list {
    font-size: 16;
}

</style>