<template>
    <p class="warning">
        <i class="fas fa-exclamation-triangle"></i>
        {{msg}}
    </p>
</template>

<style scoped>
    .warning{
        width: 100%;
        background: rgb(5, 130, 233);
        color: rgb(233, 233, 233);
        padding: 5px;
        margin: 5px 0;
        text-align: center;
        border-radius: 2px;
        font-size: 15px;
    }
    .warning i{
        color: rgb(212, 199, 18);
        font-size: 12px;
    }

    @media screen and (max-width: 930px){
        .warning{font-size: 14px;}
        .warning i{font-size: 12px;}
    }
    @media screen and (max-width: 680px){
        .warning{font-size: 12px;}
    }
</style>

<script>
    export default {
        props: ['msg']
    }
</script>