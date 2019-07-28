<template>
    <div>
        <NavBar id="NavBar"/>
        <router-view/>

        <div @click="upPage()" class="botao-up-page bg-warning justify-content-center align-items-center">
            <b-row>
                <b-col cols="auto">
                    <icon class="text-dark" icon="arrow-up"/>
                </b-col>
            </b-row>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Dash',
    computed: {
        ...mapState({ usuario: state => { return state.Usuario.user } })
    },
    watch: {
        '$route' (to, from) {
            if(_.isEmpty(this.usuario)) { this.$router.push({ name: 'Login' }) }
        }
    },
    methods: {
        upPage() { $('html, body').animate({scrollTop: 0}, 500) }
    },
    mounted() {
        if(_.isEmpty(this.usuario)) {
            this.$router.push({ name: 'Login' })
        }
        $(window).scroll(function (e) {
            e.preventDefault()
            let btn = $('.botao-up-page')
            let nav = $('#NavBar')
            if ($(this).scrollTop() > 60) {
                nav.addClass('d-none')
                btn.removeClass('d-none').addClass('d-flex')
            } else {
                btn.addClass('d-none').removeClass('d-flex')
                nav.removeClass('d-none')
            }
        }).scroll()
    },
}
</script>

<style lang="scss" scoped>
.botao-up-page {
    position: fixed;
    top: 90%;
    left: 90%;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    &:hover { opacity: .8; }
}
</style>