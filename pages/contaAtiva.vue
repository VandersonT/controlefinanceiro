<template>
    <main>

        <section class="mainBox">
            <h1>Conta Ativa</h1>
            <p>Uhuul, parabéns, {{loggedUser['nickname']}}, sua conta está ativa! Você pode ultilizar o sistema sem nenhum empecilho!</p>
            <img src="images/celebrating.png" />
            <nuxt-link class="confirmedButton" to="/">Início</nuxt-link>
        </section>

    </main>
</template>

<script>
    import Cookies from 'js-cookie'
    export default {
        head: {title: 'Conta Confirmada'},
        data: () => {
            return {
                loggedUser: []
            }
        },
        methods:{
            async getUserInfo(token){
                await this.$axios.$post('https://apicontrolefinanceiro.ga/api/auth',{
                    token: token
                })
                .then(response=>{
                    this.loggedUser = response.loggedUser;
                    this.loggedUser['nickname'] = this.loggedUser['name'].split(' ')[0];
                })
            },
        },
        mounted: function(){
            this.getUserInfo(Cookies.get('token'));
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
    .mainBox h1{
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
    .mainBox .confirmedButton{
      margin: 10px;
      padding: 8px 22px;
      border-radius: 5px;
      color: white;
      background: #FFA800;
      font-weight: bold;
      text-decoration: none;
    }
    .mainBox .confirmedButton:hover{
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