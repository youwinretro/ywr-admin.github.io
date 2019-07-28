<template>
    <b-container class="py-5">
        <WorkTable class="mt-5" v-if="!reload"/>
    </b-container>
</template>

<script>
export default {
    name: 'WorkTableRoot',
    data() {
        return {
            reload: false,
        }
    },
    mounted() {
        this.$root.$on('updateToEditGame', () => {
            this.reload = true
            this.$nextTick(() => { this.reload = false })
        })
    }
}
</script>

<style>

</style>
