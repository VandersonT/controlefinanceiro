<template>
    <main>
        <section class="profileBox">
            <warning v-if="updatedSuccessfully" msg="Seu perfil foi atualizado com sucesso"/>
            <error v-if="failedToUpdate" msg="Não foi possivel atualizar o seu perfil"/>
            <img src="images/no-picture.png" />
            <h1>Vanderson Thiago</h1>

            <h3>Theme</h3>
            <div class="selectAnAction">
                <div class="boxAction">
                    <button @click="selectAnAction('deposit')" class="select" :class="selectedTransaction == 'deposit' ? 'selected' : ''"></button>
                    Default
                </div>
                <div class="boxAction">
                    <button @click="selectAnAction('Theme1')" class="select" :class="selectedTransaction == 'Theme1' ? 'selected' : ''"></button>
                    Theme1
                </div>
                <div class="boxAction">
                    <button @click="selectAnAction('Theme2')" class="select" :class="selectedTransaction == 'Theme2' ? 'selected' : ''"></button>
                    Theme2
                </div>
                <div class="boxAction">
                    <button @click="selectAnAction('theme3')" class="select" :class="selectedTransaction == 'theme3' ? 'selected' : ''"></button>
                    theme3
                </div>
                <div class="boxAction">
                    <button @click="selectAnAction('theme4')" class="select" :class="selectedTransaction == 'theme4' ? 'selected' : ''"></button>
                    theme4
                </div>
            </div>

            <h3>Usuário</h3>
            <input class="styleInput" type="text"/>

            <h3>Email</h3>
            <input class="styleInput" type="text"/>

            <h3>Senha Atual</h3>
            <input class="styleInput" type="password"/>

            <h3>Nova Senha</h3>
            <input class="styleInput" :type="(showPass) ? 'text' : 'password'"/>

            <div class="keepConnected">
                <input type="checkbox" @click="showPassToggle" />
                Mostrar senha
            </div>

            <div class="ButtonsBox">
              <button @click="toggleBoxNewTransaction()" class="button button__close">Voltar</button>
              <button @click="confirmTransaction()" class="button button--update">Atualizar</button>
            </div>
        </section>
    </main>
</template>

<script>
    export default{
        head: {
            name: 'IndexPage',
            title: 'Meu Perfil',
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
        data: () => {
            return {
                selectedTransaction: 'deposit',
                showPass: false,
                updatedSuccessfully: false,
                failedToUpdate: false
            }
        },
        methods: {
            selectAnAction: function(action){
                this.selectedTransaction = action;
            },
            showPassToggle: function(){
                this.showPass = !this.showPass;
            },
            changeToDefaultTheme: function(){
                document.querySelector('main').style.background = '#C5C5C5';
                document.querySelector('.profileBox').style.background = 'white';
                document.querySelector('.profileBox').style.border = '1px solid #bbbbbb';
                document.querySelector('.profileBox img').style.border = '1px solid #808080';
                document.querySelector('.profileBox h1').style.color = '#D6850C';
                document.querySelector('.keepConnected').style.color = 'black';

                let h3color = document.querySelectorAll('.profileBox h3')
                for(let i = 0; i < h3color.length; i++)
                    h3color[i].style.color = '#515151';
                
                let color = document.querySelectorAll('.boxAction')
                for(let i = 0; i < color.length; i++)
                    color[i].style.color = '#262626';

                let input = document.querySelectorAll('.styleInput')
                for(let i = 0; i < input.length; i++){
                    input[i].style.background = 'white';
                    input[i].style.color = '#333332';
                }
            },
            changeToTheme1: function(){
                document.querySelector('main').style.background = '#F3D2FF';
                document.querySelector('.profileBox').style.background = '#d78dd9';
                document.querySelector('.profileBox').style.border = '1px solid #808080';
                document.querySelector('.profileBox img').style.border = '1px solid #808080';
                document.querySelector('.profileBox h1').style.color = '#333332';
                document.querySelector('.keepConnected').style.color = 'black';

                let h3color = document.querySelectorAll('.profileBox h3')
                for(let i = 0; i < h3color.length; i++)
                    h3color[i].style.color = '#333332';
                
                let color = document.querySelectorAll('.boxAction')
                for(let i = 0; i < color.length; i++)
                    color[i].style.color = '#333332';

                let input = document.querySelectorAll('.styleInput')
                for(let i = 0; i < input.length; i++){
                    input[i].style.border = '1px solid #404040';
                    input[i].style.color = '#333332';
                }
    
            },
            changeToTheme2: function(){
                document.querySelector('main').style.background = '#1E1E1E';
                document.querySelector('.profileBox').style.background = '#0F0F0F';
                document.querySelector('.profileBox').style.border = '1px solid #000000';
                document.querySelector('.profileBox img').style.border = '1px solid #808080';
                document.querySelector('.profileBox h1').style.color = '#D6850C';
                document.querySelector('.keepConnected').style.color = 'white';

                let h3color = document.querySelectorAll('.profileBox h3')
                for(let i = 0; i < h3color.length; i++)
                    h3color[i].style.color = 'gray';
                
                let color = document.querySelectorAll('.boxAction')
                for(let i = 0; i < color.length; i++)
                    color[i].style.color = 'white';

                let input = document.querySelectorAll('.styleInput')
                for(let i = 0; i < input.length; i++){
                    input[i].style.background = 'white';
                    input[i].style.color = '#333332';
                }
            }
        },
        
        mounted: function(){
            let theme = 'default';
            switch(theme){
                case 'default':
                this.changeToDefaultTheme();
                break;
                case 'theme1':
                this.changeToTheme1();
                break;
                case 'theme2':
                this.changeToTheme2();
                break;
                case 'theme3':
                this.changeToDefaultTheme();
                break;
                case 'theme4':
                this.changeToDefaultTheme();
                break;
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
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: #C5C5C5;
        padding: 20px 0 40px 0;
    }
    .profileBox{
        width: 600px;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 10px;
        border: 1px solid rgb(187, 187, 187);
        -webkit-box-shadow: 0px 0px 12px -3px rgba(0,0,0,0.42); 
        box-shadow: 0px 0px 12px -3px rgba(0,0,0,0.42);
    }
    .profileBox img{
        width: 70px;
        height: 70px;
        border-radius: 40px;
        margin: 10px 0;
        border: 1px solid rgb(189, 189, 189);
    }
    .profileBox h1{
        font-family: 'Roboto Condensed', sans-serif;
        color: #D6850C;
        font-size: 16px;
        margin-bottom: 25px;
    }
    .profileBox h3{
        font-family: 'Roboto Condensed', sans-serif;
        color: #515151;
        font-size: 16px;
        margin: 10px 0 5px 0;
        margin-top: 10px;
    }
    .selectAnAction{
      margin: 0 auto;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
    .boxAction{
      margin: 0 10px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      color: #262626;
    }
    .select{
      width: 13px;
      height: 13px;
      margin-right: 5px;
      border: 1px solid rgb(163, 163, 163);
      background: rgb(223, 223, 223);
      border-radius: 10px;
      cursor: pointer;
    }
    .selected{
      background: rgb(255, 145, 0);
    }
    .styleInput{
        width: 80%;
        padding: 8px;
        outline: 0;
        color: #6e6e6e;
        font-size: 17px;
        text-align: center;
        margin-bottom: 10px;
        border: 1px solid rgb(175, 175, 175);
    }
    .keepConnected{
        width: 80%;
        display: flex;
        align-items: center;
        margin-bottom: 30px;
    }
    .keepConnected input[type=checkbox]{
        margin-right: 4px;
    }
    /*RESPONSIVE*/
    @media screen and (max-width: 630px){
        .profileBox{
            width: 90%;
        }
    }
    @media screen and (max-width: 500px){
        .styleInput{
            width: 90%;
        }
    }
</style>