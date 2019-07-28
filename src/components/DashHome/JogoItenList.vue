<template>
    <b-row id="jogo" class="my-2 py-2 shadow rounded color bg-white  text-dark jogo" align-h="center" align-v="center">
        <b-col cols="auto" sm="auto" md="auto" lg="auto" xl="auto">
            <b-img  height="120" :src="jogo.linkCapa"></b-img>
        </b-col>
        <b-col class="font-weight-bold" cols="8" sm="" md="" lg="" xl="">
            <span>#{{ jogo.codigo }}</span><br>
            <span class="text-justify">{{ jogo.nome }}</span><br>
            <span>{{ jogo.tipo }}</span><br>
            <span>{{ jogo.formato }}</span><br>
            <b-badge variant="danger">{{ jogo.tamanho }} {{ jogo.unidade }}</b-badge>
        </b-col>
        <b-col class="my-1 my-md-0" cols="6" sm="auto" md="auto" lg="auto" xl="auto">
            <b-button variant="info" @click="edit()" block><Icon icon="pencil-alt"/></b-button>
        </b-col>
        <b-col class="my-1 my-md-0" cols="6" sm="auto" md="auto" lg="auto" xl="auto">
            <b-button variant="danger" @click="openModal()" block><Icon icon="times"/></b-button>
            <b-modal 
                :id="`modal-del-game-${jogo._id}`"
                centered
                hide-header
                hide-footer
                body-bg-variant="primary"
                no-close-on-backdrop
            >
                <b-row align-h="center">
                    <b-col cols="auto">
                        <span class="text-white font-weight-bold">Deseja Apagar? {{ jogo.nome }} </span>
                    </b-col>
                </b-row>

                <b-form @submit.prevent="acessToRemove()">
                    <b-row align-v="center">
                        <b-col cols="12">
                            <sup class="text-white font-weight-bold text-uppercase">Senha</sup>
                            <b-form-input type="password" v-model="senha" :state="senhaValid" placeholder="Senha" :disabled="carregando"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row align-v="center" class="mt-2">
                        <b-col cols="12">
                            <b-alert variant="danger" class="text-center" :show="senhaIncorreta">Senha Incorreta!!!</b-alert>
                        </b-col>
                    </b-row>
                    <b-row align-v="center">
                        <b-col cols="12">
                            <b-button variant="danger" type="submit" block>
                                <b-spinner small v-if="carregando" class="mr-2"></b-spinner>
                                <span>Remover Jogo</span>    
                                <Icon icon="trash-alt" class="ml-2"/>
                                <Icon icon="trash" class="ml-2"/>
                            </b-button>
                        </b-col>
                    </b-row>
                </b-form>
            </b-modal>
        </b-col>
    </b-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'JogoItenList',
    data() {
        return {
            senha: '',
            senhaIncorreta: false,
            carregando: false,
        }
    },
    props: {
        jogo: {
            type: Object,
            default: {},
        },
        hover: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        senhaValid() {
            if(this.senha.length <= 0) return null
            return true
        },
        ...mapState({ usuario: state => { return state.Usuario.user.usuario } })
    },
    methods: {
        edit(jogo) {
            this.setGameForEditX(this.jogo)
            this.$router.push('edit-games')
        },
        openModal() { this.$bvModal.show(`modal-del-game-${this.jogo._id}`) },
        acessToRemove() {
            if(this.carregando) return
            this.carregando = true
            api.post('/usuarios/acesso', { usuario: this.usuario,  senha: this.senha })
            .then(({status, data}) => {
                this.senhaIncorreta = false
                this.carregando = false
                if(status == 200) {
                    this.apiDelGame()
                    this.$bvModal.hide(`modal-del-game-${this.jogo._id}`)
                }                 
            })
            .catch(err => { 
                this.carregando = false
                this.senhaIncorreta = true
            })
            this.senha = ''
        },
        apiDelGame() {
            this.$snotify.async('Espere Por favor ...', 'Deletando', () => new Promise((resolve, reject) => {
                api.delete(`/jogos/${this.jogo._id}`)
                .then(({status, data}) => {
                    if(status == 200) {
                        this.$root.$emit('removeJogo', this.jogo._id)
                        resolve({
                            title: "Deletado!!!",
                            body: 'Jogo Deletado',
                            config: { 
                                pauseOnHover: true,
                                timeout: 3000,
                                showProgressBar: true,
                                closeOnClick: true,
                            }
                        })
                    }
                })
                .catch(err => {
                    reject({
                        title: "Ops... :'(",
                        body: 'Erro ao tentar apagar',
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
        if(!this.hover) {  $('#jogo').removeClass('jogo') }
        else { $('#jogo').addClass('jogo') }
    }
}
</script>

<style lang="scss" scoped>
.color { transition: .2s linear; }
.jogo:hover {
    transform: scale(1.05) !important;
    transition: .2s linear;
}
</style>