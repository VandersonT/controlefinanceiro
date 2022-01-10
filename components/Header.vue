<template>
    <header>
        <section class="welcomeUser" v-show="!loading">
            <img :src="(isLogged) ? loggedUser['avatar'] : 'images/no-picture.png' " alt="imagem de perfil" />
            <p>Olá, {{isLogged ? loggedUser['name'] : 'Desconhecido'}}, tudo bom? <i class="far fa-smile-beam"></i></p>
        </section>

        <p v-show="loading">Carregando...</p>

        <section class="menuDesktop">
            <div v-if="isLogged" class="menuButton">
                <nuxt-link to="/perfil" class="headerButton">Meu Perfil</nuxt-link>
                <button @click="logOut()" class="headerButton button__close">Sair</button>
            </div>
            <div v-else class="menuButton">
                <nuxt-link to="/login" class="headerButton">Login</nuxt-link>
                <nuxt-link to="/cadastro" class="headerButton">Cadastrar</nuxt-link>
            </div>
        </section>

        <section class="boxMenuMobile">
            <button @click="activeMobileMenu()" class="btnOpenMenuMobile"><i class="fas fa-bars"></i></button>
            <div class="menuMobile" v-if="mobileMenuIsActive && !isLogged">
                <nuxt-link to="/login" class="headerButton">Login</nuxt-link>
                <nuxt-link to="/cadastro" class="headerButton">Cadastrar</nuxt-link>
            </div>
            <div class="menuMobile" v-if="mobileMenuIsActive && isLogged">
                <nuxt-link to="/perfil" class="headerButton">Meu Perfil</nuxt-link>
                <button @click="logOut()" class="headerButton button__close">Sair</button>
            </div>
            
        </section>
    </header>
</template>


<script>
    import Cookies from 'js-cookie'
    export default {
        props: ['loggedUser', 'isLogged', 'loading'],
        data:()=>{
            return {
                mobileMenuIsActive: false
            }
        },
        methods:{
            activeMobileMenu: function(){
                this.mobileMenuIsActive = !this.mobileMenuIsActive;
            },
            logOut: function(){

                if(!confirm("Você deseja realmente sair da sua conta?"))
                    return false;

                Cookies.remove('token');
                this.$router.push('/login')
            }
        },
    }
</script>

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
    .menuButton .headerButton{
        background: rgb(228, 222, 212);
        color: black;
        margin: 5px;
        padding: 5px 10px;
        border-radius: 3px;
        text-decoration: none;
    }
    .menuButton .headerButton:active{
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
    .menuMobile .headerButton{
        padding: 10px 25px;
        border-radius: 5px;
        border: rgb(26, 26, 26) 1px solid;
        color: rgb(26, 26, 26);
    }
    .menuMobile .headerButton:nth-child(1){
        margin-bottom: 10px;
    }
    .menuMobile .headerButton:active{
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