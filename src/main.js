import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import Vuex from 'vuex'
import web3ModalStore from "@/store/modules/web3Modal";

const store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        web3Modal: web3ModalStore,
    }
})

createApp(App).use(Quasar, quasarUserOptions).use(store).mount('#app')

export default store;