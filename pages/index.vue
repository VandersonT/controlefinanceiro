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
          <button class="newTransaction" @click="newTrasaction()"><i class="fas fa-plus"></i> Nova Transação</button>
          <div class="transactionSingle" v-for="(transaction, index) in transactions" v-bind:key="transaction.id">
            <article class="boxTransactionInfo" v-if="transaction['totalValue'] >= 0">
              <div @click="moreInfo(index)" class="transactionInfo">
                <p>{{transaction['title']}}</p>
                <div class="info2">
                  <p class="positiveValue">R$ {{transaction['totalValue'].toFixed(2).replace(".", ",")}}</p>
                  <p  class="arrow"><i class="fas fa-chevron-left"></i></p>
                </div>
              </div>
              <div class="moreTransactionInfo">
                <div class="fieldTransaction">
                  <p><b>Descrição:</b> {{transaction['title']}}</p>
                  <p><b>Valor Guardado:</b> R${{transaction['savedValue'].toFixed(2).replace(".", ",")}}</p>
                </div>
                <div class="fieldTransaction">
                  <p><b>Data:</b> {{transaction['date']}}</p>
                  <p><b>Valor Liquido:</b> R${{transaction['netValue'].toFixed(2).replace(".", ",")}}</p>
                </div>
                <div class="fieldTransaction centerField">
                  <p><b>Valor Total:</b> R${{transaction['totalValue'].toFixed(2).replace(".", ",")}}</p>
                </div>
                <div class="boxButtons">
                  <button @click="deleteTransaction(transaction['id'], index)"><i class="fas fa-trash-alt trashIcon"></i></button>
                </div>
              </div>
            </article>
            <article class="boxTransactionInfo" v-else>
              <div @click="moreInfo(index)" class="transactionInfo">
                <p>{{transaction['title']}}</p>
                <div class="info2">
                  <p class="negativeValue">R$ {{transaction['totalValue'].toFixed(2).replace(".", ",")}}</p>
                  <p class="arrow"><i class="fas fa-chevron-left"></i></p>
                </div>
              </div>
              <div class="moreTransactionInfo">
                <div class="fieldTransaction">
                  <p><b>Descrição:</b> {{transaction['title']}}</p>
                  <p><b>Data:</b> R${{transaction['date']}}</p>
                </div>
                <div class="fieldTransaction">
                  <p><b>Retirado do valor:</b> {{transaction['takenFrom']}}</p>
                  <p><b>Valor Total:</b> R${{transaction['totalValue']}}</p>
                </div>
                <div class="boxButtons">
                  <button @click="deleteTransaction(transaction['id'], index)"><i class="fas fa-trash-alt trashIcon"></i></button>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section v-if="boxNewTransactionActive" class="screenNewTransaction">
          <div class="boxNewTransaction">
            <h1>Nova Transação</h1>
            <div class="selectAnAction">
              <div class="boxAction">
                <button @click="selectAnAction()" class="select" :class="selectedTransaction == 'deposit' ? 'selected' : ''"></button>
                Depositar
              </div>
              <div class="boxAction">
                <button @click="selectAnAction()" class="select" :class="selectedTransaction == 'toWithdraw' ? 'selected' : ''"></button>
                Retirar
              </div>
            </div>
            <input v-model="titleTransaction" class="fieldTransaction" type="text" placeholder="Titulo da transação" />
            
            <input class="fieldTransaction" type="text" placeholder="Digite o valor total" />

            <input v-if="selectedTransaction == 'deposit'" class="fieldTransaction" type="text" placeholder="Valor para caso de urgencia (opcional)" />

            <select v-if="selectedTransaction == 'toWithdraw'">
              <option selected disabled>De onde vai pegar o dinheiro?</option>
              <option>Valor Disponivel</option>
              <option>Valor de emergencia</option>
            </select>

            <input class="fieldTransaction" type="date" placeholder="xx/xx/xxxx" />

            <div>
              <button @click="cancelTransaction()" class="button button--cancel">Cancelar</button>
              <button @click="confirmTransaction()" class="button button--confirm">Confirmar</button>
            </div>

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
    padding-bottom: 50px;
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
    width: 60%;
    margin: 0 auto;
    margin-top: 120px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: rgb(78, 78, 78);
  }
  .newTransaction{
    color: #0096ec;
    margin-bottom: 10px;
    width: 100%;
    text-align: left;
  }
  .newTransaction:hover{
    color: #007fe7;
  }
  .transactionSingle{
    width: 100%;
    max-width:1000px;
    margin: 0 auto;
  }
  .boxTransactionInfo{
    margin: 15px 0;
  }
  .transactionInfo{
    width: 100%;
    background: rgb(255, 255, 255);
    cursor: pointer;
    padding: 17px 10px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.75);
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
  .moreTransactionInfo{ 
    display: none;
    padding: 20px 15px 5px 15px;
    background: white;
    border-top:1px solid #c2c2c2;
    box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.75);
  }
  .fieldTransaction{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
  .fieldTransaction b{
    color: rgb(43, 43, 43);
  }
  .centerField{
    justify-content: center;
  }
  .boxButtons{
    display: flex;
    justify-content: center;
    border-top: 1px solid gray;
    padding: 10px;
  }
  .trashIcon{
    color: rgb(134, 10, 10);
  }
  /*ScreenNewTransaction*/
  .screenNewTransaction{
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.7);
    width: 100vw;
    max-width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .boxNewTransaction{
    width: 500px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
  }
  .boxNewTransaction h1{
    font-weight: lighter;
    margin-bottom: 15px;
  }
  .selectAnAction{
    margin: 0 auto;
    display: flex;
  }
  .boxAction{
    margin: 0 10px;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
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
  .fieldTransaction{
    width: 90%;
    box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.75);
    border: 1px solid rgb(172, 172, 172);
    padding: 10px 10px;
    outline: 0;
  }
  .button{
    margin: 10px;
    padding: 10px 25px;
    border-radius: 5px;
  }
  .button--cancel{
    border: 2px solid #da4d4d !important;
    color: #da4d4d !important;
  }
  .button--cancel:hover{
    border: 2px solid rgb(240, 10, 10) !important;
    color: rgb(240, 10, 10)!important;
  }
  .button--confirm{
    background: #38CF1F !important;
    color: white !important;
  }
  .button--confirm:hover{
    background: #37c51e !important;
    color: rgb(230, 230, 230) !important;
  }
  .boxNewTransaction select{
    width: 90%;
    margin-bottom: 20px;
    padding: 10px;
    outline: 0;
    font-size: 17px;
    box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.75);
    border: 1px solid rgb(172, 172, 172);;
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
      transictionSelected: -1,
      transactions: [
        {id: 1, title: 'Site MaxCorres', date: '25/12/2025', totalValue: 2500.10, netValue: 2000.08, savedValue: 500.02},
        {id: 2, title: 'X-box One', date: '25/12/2025', takenFrom: 'Disponivel', totalValue: -1000.00},
        {id: 3, title: 'Site advogado teteu', date: '25/12/2025', totalValue: 500.00, netValue: 300.00, savedValue: 200.00},
        {id: 4, title: 'torradeira plut', date: '25/12/2025', takenFrom: 'Emergêncial', totalValue: -500.00},
        {id: 5, title: 'ganhei da Be', date: '25/12/2025', totalValue: 800.00, netValue: 800.00, savedValue: 0.00}
      ],
      selectedTransaction: 'deposit',
      boxNewTransactionActive: false,
      titleTransaction: ''
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

      if(this.transictionSelected == idToOpen){
        this.transictionSelected = -1;
      }else{
        allBoxMoreInfo[idToOpen].style.display = 'block';
        arrows[idToOpen].innerHTML = '<i class="fas fa-chevron-down"></i>';
        this.transictionSelected = idToOpen;
      }
    },
    deleteTransaction: function(idTransaction, index){

      if(!confirm('Tem certeza que deseja apagar essa transição?')){
        return false;
      }

      //deleta no banco de dados a transição id: idTransaction
      //faça uma nova requisição para saber os novos valores da informações principais lá dos blocos
      this.transactions.splice(index, 1);
    },
    selectAnAction: function(){

      switch(this.selectedTransaction){
        case 'deposit':
          this.selectedTransaction = 'toWithdraw';
          break;
        case 'toWithdraw':
          this.selectedTransaction = 'deposit';
          break;
      }

    },
    cancelTransaction: function(){
      this.boxNewTransactionActive = false;
    },
    newTrasaction: function(){
      this.boxNewTransactionActive = true;
    },
    confirmTransaction: function(){
      document.querySelector('.ScreenNewTransaction').style.display = 'flex';

      //envie as informações ao banco de dados
    }
  }
}
</script>
