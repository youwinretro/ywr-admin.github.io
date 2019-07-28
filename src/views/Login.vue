<template>
    <b-container id="container" class="d-flex flex-column justify-content-center align-items-center">
        
        <b-row>
            <b-col>
                <img src="@/assets/img/photo.jpg" width="150px" class="rounded-circle"/>
            </b-col>
        </b-row>

        <b-form @submit.prevent="logar">
            <b-row>
                <b-col cols="12" class="py-2">
                    <b-input v-model="usuario" type="text" placeholder="Usuario" required autofocus/>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12" class="py-2">
                    <b-input v-model="senha" type="password" placeholder="Senha" required/>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12" class="py-2">
                    <b-alert variant="danger" :show="incorrectLogin">Usuario ou Senha Incorretos!!!</b-alert>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="auto" class="mx-auto py-2">
                    <b-button variant="warning" class="text-uppercase text-white font-weight-bold px-5" type="submit"><b-spinner class="mr-2" small v-if="carregando"/>LOGIN</b-button>
                </b-col>
            </b-row>
        </b-form>
    </b-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'Login',
    data() {
        return {
            usuario: '',
            senha: '',
            carregando: false,
            incorrectLogin: false
        }
    },
    computed: {
        ...mapState({
            isLogado: state => { return state.Usuario.isLogado }
        })
    },
    methods: {
        logar() {
            if(this.carregando) return
            this.carregando = true
            api.post('/usuarios/acesso', { usuario: this.usuario,  senha: this.senha })
            .then(({status, data}) => {
                if(status == 200) {
                    this.setUserX(data)
                    this.setIsLogadoX(true)
                    this.$router.push({ name: 'Dash' })
                } else {
                    this.setIsLogadoX(false)
                    this.incorrectLogin = true
                }
            })
            .catch(err => {
                this.setIsLogadoX(false)
                this.carregando = false
                this.incorrectLogin = true
            })
        },
        ...mapActions(['setUserX', 'setIsLogadoX'])
    },
    mounted() {
        if(this.isLogado) this.$router.push({ name: 'Dash' })
    }
}
</script>

<style lang="scss" scoped>
#container { min-height: 100vh; }
</style>
