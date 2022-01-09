<template>
    <p class="error">
        <i class="fas fa-exclamation-circle"></i>
        {{msg}}
    </p>
</template>

<style scoped>
    .error{
        width: 100%;
        background: rgb(160, 15, 10);
        color: rgb(233, 233, 233);
        padding: 5px;
        text-align: center;
        border-radius: 2px;
        font-size: 15px;
    }
    .error i{
        color: rgb(255, 255, 255);
        font-size: 12px;
    }

    @media screen and (max-width: 930px){
        .error{font-size: 14px;}
        .error i{font-size: 12px;}
    }
    @media screen and (max-width: 680px){
        .error{font-size: 12px;}
    }
</style>

<script>
    export default {
        props: ['msg']
    }
</script>