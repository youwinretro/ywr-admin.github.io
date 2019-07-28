import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import user from './modules/user/main'
import game from './modules/game/main'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        Usuario: user,
        Game: game,
    },
    plugins: [vuexLocal.plugin]
})
