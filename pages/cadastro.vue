<template>
    <main>
        <section class="boxRegister">
            <h1>Cadastre-se</h1>

            <error class="animate__animated animate__flash errorCustom" v-if="errorRegister" :msg="errorMessage" />

            <input v-model="name" type="text" placeholder="Digite o seu nome"/>
            <input v-model="email" type="text" placeholder="Digite o seu email"/>
            <input v-model="pass" :type="(showPass) ? 'text' : 'password'" placeholder="Digite a sua senha"/>
            <input v-model="confirmPass" :type="(showPass) ? 'text' : 'password'" placeholder="Confirme sua senha"/>
            <div class="showPass">
                <input @click="showPassAction()" type="checkbox" />
                Mostrar Senha
            </div>
            <button @click="registerAction()" class="registerButton">Cadastrar</button>
            <nuxt-link to="/login" class="link">Já possui uma conta? Faça login</nuxt-link>
        </section>
    </main>
</template>

<script>
    import Cookies from 'js-cookie'
    export default{
        beforeMount: function(){
            (Cookies.get('token')) ? this.$router.push('/') : '';
        },
        head: {
            name: 'IndexPage',
            title: 'Cadastro',
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
        data:()=>{
            return{
                name: '',
                email: '',
                pass: '',
                confirmPass: '',
                errorRegister: '',
                errorMessage: '',
                showPass: false
            }
        },
        methods:{
            async registerAction(){
                
                if(!this.fieldsValidate())
                    return false;

                let response = await this.$axios.$post('https://apicontrolefinanceiro.ga/api/newUser',{
                    name: this.name,
                    email: this.email,
                    pass: this.pass,
                    confirmPass: this.confirmPass,
                });
                
                if(response['error'] != ''){
                    this.errorRegister = true;
                    this.errorMessage = response['error'];
                    return false;
                }

                Cookies.set('token', response['token'])
                this.$router.push('/')
            },
            fieldsValidate(){
                if(!this.email && !this.name && !this.pass && !this.confirmPass){
                    this.errorRegister = true;
                    this.errorMessage = 'Por favor, preencha todos os campos.';
                    return false;
                }

                let user = this.email.substring(0, this.email.indexOf("@"));
                let dominio = this.email.substring(this.email.indexOf("@")+ 1, this.email.length);

                if (!((user.length >=1) && (dominio.length >=3) && (user.search("@")==-1) && (dominio.search("@")==-1) && (user.search(" ")==-1) && (dominio.search(" ")==-1) && (dominio.search(".")!=-1) && (dominio.indexOf(".") >=1) && (dominio.lastIndexOf(".") < dominio.length - 1))){
                    this.errorRegister = true;
                    this.errorMessage = 'O email digitado não é válido.';
                    return false;
                }

                if(this.pass != this.confirmPass){
                    this.errorRegister = true;
                    this.errorMessage = 'A senha e a confirmação não coincidem';
                    return false;
                }

                return true;
            },
            showPassAction: function(){
                this.showPass = !this.showPass;
            }
        }
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
    .boxRegister{
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
    .boxRegister h1{
        color: #D6850C;
        margin-bottom: 10px;
        font-size: 30px;
    }
    .boxRegister input:not(input[type=checkbox]){
        width: 90%;
        padding: 13px 10px;
        border: 1px solid gray;
        border-radius: 2px;
        margin: 10px;
        outline: 0;
    }
    .boxRegister input[type=checkbox]{
        margin-right: 4px;
    }
    .showPass{
        width: 90%;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    .registerButton{
        margin: 10px;
        padding: 10px 30px;
        border-radius: 5px;
        background: #FF8C00;
        color: white;
        font-family: sans-serif;
    }
    .registerButton:active{
        background: #f08400;
        color: rgb(236, 236, 236);
    }

    /*RESPONSIVE*/
    @media screen and (max-width: 440px) {
        .boxRegister{
            width: 90%;
        }
    }
</style>