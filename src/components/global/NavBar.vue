<template>
    <b-navbar class="justify-content-between" fixed="top" type="dark" variant="">
        <router-link class="navbar-brand js-scroll-trigger" tag="a" :to="{ name: 'Home'}">
            <img src="@/assets/img/photo.jpg" width="80px" style="border-radius:50px;">
            <span class="ml-4 font-weight-bold text-capitalize">Iae {{ usuario.nome }}</span>
        </router-link>

        <input type="checkbox" id="nav" class="d-none"/>
        <label for="nav" class="nav-btn">
            <i></i>
            <i></i>
            <i></i>
        </label>

        <div class="nav-side py-4">
            <ul>
                <li class="mr-0 mr-md-4">
                    <label for="nav" class="lbl-list" @click="goAddGames()">
                        <svg><rect></rect></svg>Add Game
                    </label>
                </li>
                <li class="mr-0 mr-md-4">
                    <label for="nav" class="lbl-list" @click="logout()">
                        <svg><rect></rect></svg>Sair
                    </label>
                </li>
            </ul>
        </div>
    </b-navbar>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'NavBar',
    computed: {
        ...mapState({
            usuario: state => { return state.Usuario.user }
        })
    },
    methods: {
        goAddGames() {
            this.setGameForEditX({})
            this.$root.$emit('updateToEditGame')
            this.$router.push({ name: 'AddGames'})
        },
        logout() {
            this.setUserX({})
            this.setIsLogadoX(false)
            this.$router.push({ name: 'Login' })
        },
        ...mapActions(['setUserX', 'setIsLogadoX', 'setGameForEditX'])
    },
}
</script>

<style scoped>
.nav-side ul { float: right; margin-top: -8px; }
.nav-side ul li { display: inline-block; float: left; }
.nav-side ul li .lbl-list {
    display: inline-block;
    outline: none;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 14px;
    letter-spacing: 1.2px;
    font-weight: 600;
    text-align: center;
    color: #fff !important;
    width: 120px;
    height: 25px;
}
.nav-side ul li .lbl-list svg { transform: translateY(95%); }
.nav-side ul li .lbl-list svg,
.nav-side ul li .lbl-list svg rect {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    fill: transparent;
}
.nav-side ul li .lbl-list svg rect {
    stroke: rgb(255, 0, 0);
    stroke-width: 3;
    transition: 1s;
    stroke-dasharray: 25 16;
    stroke-dashoffset: 136;
}
.nav-side ul li .lbl-list svg rect:hover {
    stroke: #fff;
    stroke-dasharray: 25 120;
    stroke-dashoffset: 12;
}
@media screen and (max-width: 864px) {
    .nav-side {
        position: absolute;
        left: calc(100% - 200px);
        top: 100%;
        background: rgba(75, 2, 2, 0.712);
        transform-origin: right;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.842);
        transform: rotateY(90deg);
        transition: .5s ease;
    }
    .nav-btn {
        position: fixed;
        right: 10px;
        top: 10px;
        display: block;
        width: 48px;
        height: 48px;
        cursor: pointer;
        z-index: 9999;
        border-radius: 50%;
    }
    .nav-btn i {
        display: block;
        width: 30px;
        height: 5px;
        background: #fff;
        border-radius: 2px;
        margin-left: 14px;
        transition: all 0.2s ease;
    }
    .nav-btn i:nth-child(1) { margin-top: 16px; }
    .nav-btn i:nth-child(2) { margin-top: 4px; opacity: 1; }
    .nav-btn i:nth-child(3) { margin-top: 4px; }
}
#nav:checked ~ .nav-side { transform: rotateY(0deg); }
#nav:checked + .nav-btn { transform: rotate(45deg);}
#nav:checked + .nav-btn i { background: rgb(229, 255, 0); transition: all 0.2s ease; }
#nav:checked + .nav-btn i:nth-child(1) { transform: translate(0px, 5px) rotate(180deg); }
#nav:checked + .nav-btn i:nth-child(2) { opacity: 0; }
#nav:checked + .nav-btn i:nth-child(3) { transform: translate(-5px, -18px) rotate(90deg); }
</style>
