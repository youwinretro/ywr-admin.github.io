export default {
    setUserX(context, payload) {
        context.commit('SET_USER', payload)
    },
    setIsLogadoX(context, payload) {
        context.commit('SET_IS_LOGADO', payload)
    },
}