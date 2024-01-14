<template>
    <div class="full-width">
      <h1>{{ title }}</h1>

        <div class="switch">
            <div v-bind:class="switchState === 'simple' ? 'active' : ''" @click="switchTo('simple')">Локальные данные</div>
            <div v-bind:class="switchState === 'store' ? 'active' : ''" @click="switchTo('store')">Данные из store</div>
        </div>
        <div class="content-simple" v-if="switchState === 'simple'">
            <div class="simple">
                <h2>{{ simpleTitle }}</h2>
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
        <div class="content-store-based" v-if="switchState === 'store'">
            <div >
                <h2>{{ storeTitle }}</h2>
                <div class="form">
                    <div class="component" v-for="element, ind in getStoreElementsList" v-bind:key="ind">
                        <ListElement :id="ind" :text="element.text" @updateText="updateStoreElementText" @remove="removeStoreElement" />
                    </div>
                </div>
                <button class="save" @click="addStoreELement">Добавить элемент</button>
            </div>
            <div class="result">
                <h2>Дела на сегодня (из store)</h2>
                <ul class="list">
                    <li v-for="element, ind in getStoreElementsList" v-bind:key="ind">
                        {{  element.text }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<script>
import ListElement from './components/ListElement.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: {
        ListElement
    },
    data() {
        return {
            title: "Список дел",
            simpleTitle: "Управление делами",
            storeTitle: "Управление делами",
            switchState: 'store',
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
            this.list.push({text: ''})
        },
        removeElement(ind) {
            this.list.splice(ind, 1) // реактивно
        },
        updateListText (data) {
            this.$set(this.list, data.ind, {text: data.text});
            // this.list[data.ind] = {text: data.text}; - не реактивно !
        },
        switchTo(state) {
            this.switchState = state;
        },
        ...mapActions(['loadList', 'addToList', 'removeFromList', 'updateListElement']),
        ...mapGetters({
            getStoreList: 'getList'
        }),
        updateStoreElementText(data) {
            this.updateListElement({ text: data.text, index: data.ind});
        },
        removeStoreElement(index) {
            this.removeFromList(index);
        },
        addStoreELement() {
            this.addToList({text: ''});
        }
    },
    computed: {
        getStoreElementsList() {
            let list = this.getStoreList();
            return list;
        }
    },
    created() {
        this.loadList(); // упрощенная запись
        // this.$store.dispatch('loadList')
    }
  }
</script>
  
  
<style lang="css">
@import url('https://fonts.googleapis.com/css?family=PT+Sans');

.full-width {
    font-family: 'PT Sans', sans-serif;
    width: 100%;
    margin: 0 auto;
    width: 1400px;
}

.font-weight-bold {
    font-weight: bold;
}

.result > .list li {
    font-size: 18px;
}

.form {
    margin: 20px 0 15px;
}

button {
    background: #0b990b;
    color: white;
    border: 0;
    padding: 5px 15px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}

button.save {
    padding: 10px 15px;
}

.switch {
    display: flex;
}

.switch > div {
    border: 1px solid black;
    background-color: rgb(215 215 215);
    color: black;
    padding: 10px 15px;
    cursor: pointer;
}

.switch .active {
    color: white;
    background-color: #0b990b;
}

</style>