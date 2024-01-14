import Vuex from 'vuex';
import Vue from 'vue';
import client from '@/api/ListService';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        list: [],
    },
    getters: {
        getList(state) {
            return state.list;
        }
    },
    mutations: {
        updateList(state, payload) {
            // state.list = payload; - не реактивно
            Vue.set(state, 'list', [...payload])
        },
    },
    actions: {
        async loadList({commit}) {
            // получение с серва данных
            const data = await client.getList();
            commit('updateList', data)
        },
        async addToList({commit, state}, element) {
            let oldList = state.list
            oldList.push(element)
            // отправка на бекенд
            await client.saveList(oldList)
            commit('updateList', oldList)
        },
        removeFromList({commit, state}, index) {
            let oldList = state.list
            oldList.splice(index, 1)
            // отправка на бекенд
            client.saveList(oldList).then(() => {
                commit('updateList', oldList)
            })
        },
        async updateListElement({commit, state}, {text, index}) {
            let oldList = state.list
            oldList[index] = {text: text}
            // отправка на бекенд
            await client.saveList(oldList)
            commit('updateList', oldList)
        }
    }
});

