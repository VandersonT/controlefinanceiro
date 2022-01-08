<template>
    <header>
        <section class="welcomeUser">
            <img :src="(isLogged) ? loggedUser['avatar'] : 'images/no-picture.png' " alt="imagem de perfil" />
            <p>Olá, {{isLogged ? 'Nome Usuário' : 'Desconhecido'}}, tudo bom? <i class="far fa-smile-beam"></i></p>
        </section>

        <section class="menuDesktop">
            <div v-if="isLogged" class="menuButton">
            <button>Meu Perfil</button>
            <button class="button__close">Sair</button>
            </div>
            <div v-else class="menuButton">
            <button>Login</button>
            <button>Cadastrar</button>
            </div>
        </section>

        <section class="boxMenuMobile">
            <button @click="activeMobileMenu()" class="btnOpenMenuMobile"><i class="fas fa-bars"></i></button>
            <div class="menuMobile" v-if="mobileMenuIsActive">
            <button>Login</button>
            <button>Cadastrar</button>
            </div>
        </section>
    </header>
</template>

<style scoped>
    /*-------HEADER-------*/
    header{
        width: 100vw;
        max-width: 100%;
        height: 75px;
        background: var(--header);
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        padding: 0 20px;
    }
    .welcomeUser{
        height: 100%;
        display: flex;
        align-items: center;
    }
    .welcomeUser img{
        width: 50px;
        height: 48px;
        border-radius: 50px;
        margin-right: 10px;
    }
    .menuButton button{
        background: rgb(228, 222, 212);
        color: black;
        margin: 5px;
        padding: 5px 10px;
        border-radius: 3px;
    }
    .menuButton button:active{
        background: rgb(207, 201, 192);
    }

    .boxMenuMobile{display: none;}

    .btnOpenMenuMobile{font-size: 26px;}

    .menuMobile{
        padding: 10px 20px;
        background: rgb(235, 235, 235);
        position: fixed;
        right: 2%;
        display: flex;
        flex-direction: column;
        border-radius: 3px;
        border: 1px solid gray;
    }
    .menuMobile button{
        padding: 10px 25px;
        border-radius: 5px;
        border: rgb(26, 26, 26) 1px solid;
        color: rgb(26, 26, 26);
    }
    .menuMobile button:nth-child(1){
        margin-bottom: 10px;
    }
    .menuMobile button:active{
        background: rgb(219, 219, 219);
    }

    /*RESPONSIVE*/
    @media screen and (max-width: 830px){
        .menuDesktop{display: none;}
        .boxMenuMobile{display: block;}
    }
    @media screen and (max-width: 680px){
        .welcomeUser img{
            width: 45px;
            height: 45px;
        }
        .welcomeUser p{
            font-size: 14px;
        }
    }
</style>

<script>
    export default {
        props: ['loggedUser', 'isLogged'],
        data:()=>{
            return {
                mobileMenuIsActive: false,
            }
        },
        methods:{
            activeMobileMenu: function(){
                this.mobileMenuIsActive = !this.mobileMenuIsActive;
            }
        },
    }
</script>