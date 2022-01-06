<template>
    <div class="screen">
      <header>
        <div class="welcomeUser">
          <img src="https://files.jornaluniao.com.br/conteudos/95213.jpg" alt="imagem de perfil" />
          <p>Olá, {{isLogged ? 'Nome Usuário' : 'Usuário Desconhecido'}} <i class="far fa-smile-beam"></i></p>
        </div>
        <div v-if="isLogged" class="menuButton">
          <button>Meu Perfil</button>
          <button class="button__close">Sair</button>
        </div>
        <div v-else class="menuButton">
          <button>Cadastrar</button>
          <button>Login</button>
        </div>
      </header>

      <main>
        <section class="boxSystemTitle">
          <h1><i class="fas fa-dollar-sign"></i> Controle Financeiro</h1>
          <div class="boxInfoFinance">
              <div class="infoFinanceSingle">
                <div class="infoFinanceSingle--title">
                  <span>Disponivel</span>
                  <i class="far fa-arrow-alt-circle-up up"></i>
                </div>
                <p class="infoFinanceSingle--value">R$ 500.000,00</p>
              </div>
              <div class="infoFinanceSingle infoFinanceSingle__blue">
                <div class="infoFinanceSingle--title">
                  <span>Emergência</span>
                  <i class="fas fa-lock emergency"></i>
                </div>
                <p class="infoFinanceSingle--value">R$ 140.000,00</p>
              </div>
          </div>
        </section>
      </main>
    </div>

</template>


<style scoped>
  /*HEADER*/
  .screen{
    max-width: 3000px;
    margin: 0 auto;
    min-height: 100vh;
    background: #C9C9C9;
  }
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
  .button__close{
    background: rgb(170, 12, 12) !important;
    color: rgb(255, 255, 255) !important;
  }
  .button__close:active{
    background: rgb(156, 10, 10) !important;
    color: rgb(230, 230, 230) !important;
  }

  /*boxSystemTitle*/
  .boxSystemTitle{
    width: 100vw;
    max-width: 100%;
    height: 160px;
    background: var(--systemTitleBackground);
    color: var(--systemTitleColor);
    display: flex;
    justify-content: center;
    padding-top: 40px;
  }
  .boxSystemTitle h1 i{
    font-size: 20px;
    color: rgb(0, 185, 0);
  }
  .boxSystemTitle h1{
    font-weight: lighter;
    font-size: 25px;
  }
  .boxInfoFinance{
    position: absolute;
    top: 24%;
    display: flex;
  }
  .infoFinanceSingle{
    min-width: 250px;
    height: 100px;
    padding: 20px;
    background: rgb(255, 255, 255);
    color: black;
    border-radius: 5px;
    margin-right: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    -webkit-box-shadow: -3px 0px 15px -3px #000000; 
    box-shadow: -3px 0px 15px -3px #000000;
  }
  .infoFinanceSingle--title{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .infoFinanceSingle--title span{
    font-size: 18px;
  }
  .up{
    font-size: 28px;
    color: rgb(0, 185, 0);
  }
  .emergency{
    font-size: 28px;
    color: #6b1616;
  }
  .infoFinanceSingle--value{
    text-align: center;
    margin-top: 10px;
    font-size: 24px;
    font-family: 'Poppins', sans-serif;
  }

  .infoFinanceSingle__blue{
    background: #056be0;
    color: rgb(255, 255, 255);
  }
</style>


<script>
export default {
  name: 'IndexPage',
  data: () =>{
    return {
      isLogged: false,
      loggedUser: [],
      theme: '#111319'
    };
  }
}
</script>
