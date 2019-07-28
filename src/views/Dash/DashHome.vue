<template>
    <b-container class="pt-5">
        
        <b-row align-h="center" class="space-top-100">
            <b-col cols="9" sm="10" md="7" lg="6">
                <b-input v-model="pesquisa" :state="verifySearch" type="text" placeholder="Procura por nome,codigo ou tipo" autocomplete="off"/>
            </b-col>
            <b-col cols="auto">
                <b-button @click="$router.push({ name: 'AddGames' })" class="text-white" variant="warning" v-b-popover.hover="'Click Para adicionar um jogo'" title="Adicionar jogo" block><Icon icon="plus"/></b-button>
            </b-col>
        </b-row>

        <b-container class="mt-5">
            <b-row align-h="center" v-for="(jogo, i) in filter" :key="i">
                <b-col cols="12" sm="10" md="10" lg="10" xl="10">
                    <JogoItenList :jogo="jogo"/>
                </b-col>
            </b-row>
        </b-container>

    </b-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'DashHome',
    data() {
        return {
            pesquisa: '',
            lista: [],
        }
    },
    computed: {
        verifySearch() {
            if(_.isEmpty(this.pesquisa.trim())) return null
            if(_.isEmpty(this.filter)) return false
        },
        filter(self) {
            if(this.filterByName()) {
                return this.filterByName()
            } else if(this.filterByType()) {
                return this.filterByType()
            } else if (this.filterByCode()) {
                return this.filterByCode()
            }
        },
        ...mapState({
            isUser: state => { return state.Usuario.isLogado }
        })
    },
    methods: {
        filterByName() {
            let result = _.filter(this.lista, j => {
                return j.nome.toLowerCase().trim().indexOf(this.pesquisa.toLowerCase().trim()) >= 0
            })
            if(!_.isEmpty(result)) { return result }
        },
        filterByType() {
            let result = _.filter(this.lista, j => {
                return j.tipo.toLowerCase().trim().indexOf(this.pesquisa.toLowerCase().trim()) >= 0
            })
            if(!_.isEmpty(result)) { return result }
        },
        filterByCode() {
            let result = _.filter(this.lista, j => {
                return j.codigo == Number(this.pesquisa.trim())
            })
            if(!_.isEmpty(result)) { return result }
        },
        fetchJogos() {
            if(!this.isUser) return
            this.$snotify.async('Espere Por favor ...', 'Atualizando!', () => new Promise((resolve, reject) => {
                api.get('/jogos')
                .then(({status, data}) => {
                    if(status === 200) {
                        this.lista = data
                        resolve({
                            title: "Pronto Senhor!!!",
                            body: "Lista de Jogo Atualizada",
                            config: { 
                                pauseOnHover: true,
                                timeout: 1500,
                                showProgressBar: true,
                                closeOnClick: true,
                            }
                        })
                    }
                })
                .catch(error => {
                    reject({
                        title: "Ops... :(",
                        body: 'Erro ao buscar jogos',
                        config: { 
                            pauseOnHover: true,
                            timeout: 3000,
                            showProgressBar: true,
                            closeOnClick: true,
                        }
                    })
                })
            }))
        },
        ...mapActions(['setGameForEditX'])
    },
    mounted() {
        this.$root.$on('removeJogo', _id => {
            _.remove(this.lista, j => { return j._id == _id })
            this.$set(this.lista, this.lista)
            this.$nextTick(() => { this.$forceUpdate() })
        })
        this.setGameForEditX({})
        this.fetchJogos()
    }
}
</script>

<style scoped>

</style>
