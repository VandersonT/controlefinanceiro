<template>
    <main>
        <section class="boxLogin">
            <h1>Login</h1>
            <input type="text" placeholder="Digite o seu email"/>
            <input type="password" placeholder="Digite a sua senha"/>
            <div class="keepConnected">
                <input type="checkbox" />
                Manter conectado
            </div>
            <button class="loginButton">Entrar</button>
            <p class="link">Não possui uma conta? Cadastre-se</p>
        </section>
        <section class="alternateLogin">
            <div class="alternateLogin__logo">
                <img src="images/googleIcon.png" />
                <p>Google</p>
            </div>
            <div class="alternateLogin__logo">
                <img src="images/facebookIcon.png" />
                <p>Google</p>
            </div>
        </section>
    </main>
</template>

<script>
    export default{
        head: {
            name: 'IndexPage',
            title: 'Login',
            meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: 'Gerencie seu dinheiro com muito mais facilidade e de forma 100% gratuita. Registre todas as entradas e saidas e tenha um melhor controle da sua vida financeira.'
            }
            ],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
        },
    }
</script>

<style scoped>
    main{
        width: 100vw;
        max-width: 100%;
        min-height: 100vh;
        padding: 10px 0 20px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: #C5C5C5;
    }
    .boxLogin{
        width: 400px;
        padding: 20px 10px;
        background: rgb(255, 255, 255);
        border: 1px solid #999999;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 5px;
        margin-bottom: 5px;
        font-family: 'Roboto Condensed', sans-serif;
        box-shadow: 0px 0px 14px -5px rgba(0,0,0,0.73);
        -webkit-box-shadow: 0px 0px 14px -5px rgba(0,0,0,0.73);
        -moz-box-shadow: 0px 0px 14px -5px rgba(0,0,0,0.73);
    }
    .boxLogin h1{
        color: #D6850C;
        margin-bottom: 10px;
        font-size: 30px;
    }
    .boxLogin input:not(input[type=checkbox]){
        width: 90%;
        padding: 13px 10px;
        border: 1px solid gray;
        border-radius: 2px;
        margin: 10px;
        outline: 0;
    }
    .boxLogin input[type=checkbox]{
        margin-right: 4px;
    }
    .keepConnected{
        width: 90%;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    .loginButton{
        margin: 10px;
        padding: 10px 30px;
        border-radius: 5px;
        background: #FF8C00;
        color: white;
        font-family: sans-serif;
    }
    .loginButton:active{
        background: #f08400;
        color: rgb(236, 236, 236);
    }

    .alternateLogin{
        width: 400px;
        border: 1px solid #999999;
        background: rgb(226, 226, 226);
        display: flex;
        justify-content:center;
        text-align: center;
        box-shadow: 0px 0px 14px -5px rgba(0,0,0,0.73);
        -webkit-box-shadow: 0px 0px 14px -5px rgba(0,0,0,0.73);
        -moz-box-shadow: 0px 0px 14px -5px rgba(0,0,0,0.73);
        cursor: pointer;
    }
    .alternateLogin__logo{
        padding: 6px 25px;
        margin: 0 5px;
    }
    .alternateLogin__logo:hover{
        background: rgb(197, 197, 197);        
    }
    .alternateLogin img{
        width: 45px;
        height: 45px;
    }
    .alternateLogin p{
        font-size: 14px;
        color: #343434;
        font-family: 'Roboto Condensed', sans-serif;
    }
    /*RESPONSIVE*/
    @media screen and (max-width: 440px) {
        .alternateLogin,
        .boxLogin{
            width: 90%;
        }
        .alternateLogin img{
            width: 40px;
            height: 40px;
        }
    }
</style>