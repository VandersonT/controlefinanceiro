<template>
    <main>

        <section v-if="!accountConfirmed" class="mainBox">
            <h1 class="confirm">Confirme sua Conta</h1>
            <p>Você está a um passo de liberar sua para ter acesso à 100% do sistema.</p>
            <p>Para que isso ocorra, clique no botão abaixo.</p>
            <img src="images/happy.png" />
            <button class="buttonConfirm">Confirmar</button>
        </section>

        <section v-else class="mainBox">
            <h1 class="confirmed">Conta Confirmada</h1>
            <p>Uhuul, sua conta foi ativada com sucesso! Agora você pode ultilizar o sistema sem nenhum problema!</p>
            <img src="images/celebrating.png" />
            <button class="buttonConfirmed">Início</button>
        </section>

    </main>
</template>

<script>
    export default {
        head: {title: 'Conta Confirmada'},
        data: () => {
            return {
                accountConfirmed: true
            }
        }
    }
</script>

<style scoped>
    main{
        width: 100vw;
        max-width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #C5C5C5;
    }
    .mainBox{
        width: 500px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: rgb(255, 255, 255);
        font-family: 'Roboto Condensed', sans-serif;
        border-radius: 5px;
        -webkit-box-shadow: 0px 0px 12px -3px rgba(0,0,0,0.42); 
        box-shadow: 0px 0px 12px -3px rgba(0,0,0,0.42);
        text-align: center;
    }
    /*Title*/
    .confirm{
        color: #615FE1;
        margin-bottom: 10px;
    }
    .confirmed{
        color: #0CD675;
        margin-bottom: 10px;
    }
    /***/
    .mainBox p {
        color: #464646;
    }
    .mainBox img{
        width: 100px;
        height: 100px;
        margin: 18px 0 15px 0;
    }
    .mainBox button{
      margin: 10px;
      padding: 10px 25px;
      border-radius: 5px;
      color: white;
    }
    
    /*Custom Button*/
    .buttonConfirm{
      background: #00C2FF;
      font-weight: bold;
    }
    .buttonConfirm:hover{
      background: #00bcf5;
    }
    .buttonConfirmed{
      background: #FFA800;
      font-weight: bold;
    }
    .buttonConfirmed:hover{
      background: #f5a300;
    }
    /***/

    /*RESPONSIVE*/
    @media screen and (max-width: 520px){
        .mainBox{
            width: 90%;
        }
    }
    @media screen and (max-width: 390px){
        .mainBox p {
           font-size: 13px;
           padding: 0 10px;
        }
        .mainBox h1{
            font-size: 20px;
        }
        .mainBox img{
            width: 80px;
            height: 80px;
        }
        .mainBox button{
            font-size: 15px;
            padding: 8px 20px;
        }
    }
</style>