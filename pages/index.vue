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
        <section class="boxFinanceInfo">
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

        <section class="boxTransactions">
          <button class="newTransaction"><i class="fas fa-plus"></i> Nova Transação</button>
          <div @click="moreInfo(index)" v-for="(transaction, index) in transactions" v-bind:key="transaction.id" class="transactionSingle">
            <article v-if="transaction['totalValue'] >= 0">
              <div class="transactionInfo">
                <p>{{transaction['title']}}</p>
                <div class="info2">
                  <p class="positiveValue">R$ {{transaction['totalValue'].toFixed(2)}}</p>
                  <p  class="arrow"><i class="fas fa-chevron-left"></i></p>
                </div>
              </div>
              <div class="moreTransactionInfo">
                more info {{transaction['descrição']}}
              </div>
            </article>
            <article v-else>
              <div class="transactionInfo">
                <p>{{transaction['title']}}</p>
                <div class="info2">
                  <p class="negativeValue">R$ {{transaction['totalValue'].toFixed(2)}}</p>
                  <p class="arrow"><i class="fas fa-chevron-left"></i></p>
                </div>
              </div>
              <div class="moreTransactionInfo">
                more info {{transaction['descrição']}}
              </div>
            </article>
          </div>
        </section>

      </main>
    </div>

</template>


<style scoped>
  /*HEADER*/
  .screen{
    min-height: 100vh;
    background: var(--mainBackground);
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

  /*boxFinanceInfo*/
  .boxFinanceInfo{
    width: 100vw;
    max-width: 100%;
    height: 160px;
    background: var(--systemTitleBackground);
    color: var(--systemTitleColor);
    display: flex;
    justify-content: center;
    padding-top: 40px;
  }
  .boxFinanceInfo h1 i{
    font-size: 20px;
    color: rgb(0, 185, 0);
  }
  .boxFinanceInfo h1{
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
  /*boxTransactions*/
  .boxTransactions{
    width: 85%;
    margin: 0 auto;
    margin-top: 100px;
  }
  .newTransaction{
    color: #0096ec;
  }
  .newTransaction:hover{
    color: #007fe7;
  }
  .transactionInfo{
    background: rgb(255, 255, 255);
    border: 1px solid #767676;
    cursor: pointer;
    margin: 5px 0;
    padding: 17px 10px;
    display: flex;
    justify-content: space-between;
  }
  .moreTransactionInfo{
    display: none;
  }
  .positiveValue{
    color: #10C522;
  }
  .negativeValue{
    color: #EE0F0F;
  }
  .info2{
    display: flex;
    align-items: center;
  }
  .arrow{
    margin-left: 10px;
    font-size: 12px;
    color: #424242;
  }
</style>


<script>
export default {
  name: 'IndexPage',
  head: {
    title: 'Home',
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
  data: () =>{
    return {
      isLogged: false,
      loggedUser: [],
      theme: '#111319',
      transactions: [
        {id: 1, title: 'X-box One', data: '25/12/2025', takenFrom: 'Disponivel', totalValue: -20.00},
        {id: 2, title: 'Salario', data: '25/12/2025', totalValue: 2500.00, netValue: 2000.00, savedValue: 500.00}
      ]
    };
  },
  methods:{
    moreInfo: function(idToOpen){
      let allBoxMoreInfo = document.querySelectorAll('.moreTransactionInfo');
      let arrows = document.querySelectorAll('.arrow');
      
      for(let i = 0; i < allBoxMoreInfo.length; i++){
        allBoxMoreInfo[i].style.display = 'none';
        arrows[i].innerHTML = '';
        arrows[i].innerHTML = '<i class="fas fa-chevron-left"></i>'
      }
  
      allBoxMoreInfo[idToOpen].style.display = 'block';
      arrows[idToOpen].innerHTML = '<i class="fas fa-chevron-down"></i>'
    }
  }
}
</script>
