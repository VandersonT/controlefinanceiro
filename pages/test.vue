<template>
    <div>
        <h1>Clica pra ver o que dá:</h1>
        teste: {{userName}}
        <br/><button @click="changeUserName('sao jua0')">Clica aqui</button>
    </div>
</template>

<style scoped>

</style>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default{
        name: 'Counter',
        methods:{
            ...mapActions(['changeUserName']),
            ...mapActions(['changeCity']),
        },
        computed: {
            ...mapGetters(['userName'])
        }
    }
</script>