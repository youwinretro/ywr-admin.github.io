<template>
    <b-container id="container" class="d-flex flex-column justify-content-center align-items-center">
        <b-row>
            <b-col>
                <router-link tag="h1" :to="{ name: 'Login' }" class="font-weight-bold text-white text-uppercase">home app</router-link>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: 'HomeApp',
}
</script>

<style scoped>
#container { min-height: 100vh; }
</style>
