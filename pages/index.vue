<template>
    <div class="screen">
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

      <main>
        <!--Floating Section with available and emergency value-->
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
                <p class="infoFinanceSingle--value">R$ 0,00</p>
              </div>
          </div>
        </section>

        <section class="boxTransactions">
          <!--Open Box New Transaction-->
          <button class="newTransaction" @click="toggleBoxNewTransaction()"><i class="fas fa-plus"></i> Nova Transação</button>
          
          <warning v-if="loggedUser['access'] == 0" msg="Ative sua conta no seu email para usar o sistema sem nenhum problema."/>
          
          <warning v-if="!isLogged" msg="Crie uma conta para ter acesso às suas transações de qualquer lugar."/>

          <div class="transactionSingle" v-for="(transaction, index) in transactions" v-bind:key="transaction.id">
            <!--Positive Transaction structure-->
            <article class="boxTransactionInfo" v-if="transaction['totalValue'] >= 0">
              <div @click="moreTransactionInfo(index)" class="transactionInfo">
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

            <!--Negative Transaction structure-->
            <article class="boxTransactionInfo" v-else>
              <div @click="moreTransactionInfo(index)" class="transactionInfo">
                <p>{{transaction['title']}}</p>
                <div class="info2">
                  <p class="negativeValue">R$ {{transaction['totalValue'].toFixed(2).replace(".", ",")}}</p>
                  <p class="arrow"><i class="fas fa-chevron-left"></i></p>
                </div>
              </div>
              <div class="moreTransactionInfo">
                <div class="fieldTransaction">
                  <p><b>Descrição:</b> {{transaction['title']}}</p>
                  <p><b>Data:</b> {{transaction['date']}}</p>
                </div>
                <div class="fieldTransaction">
                  <p><b>Retirado do valor:</b> {{transaction['takenFrom']}}</p>
                  <p><b>Valor Retirado:</b> R${{transaction['totalValue']}}</p>
                </div>
                <div class="boxButtons">
                  <button @click="deleteTransaction(transaction['id'], index)"><i class="fas fa-trash-alt trashIcon"></i></button>
                </div>
              </div>
            </article>

          </div>
        </section>

        <!--Section To Send New Transaction-->
        <section v-if="showBoxNewTransaction" class="screenNewTransaction">
          <div class="boxNewTransaction">
            
            <h1>Nova Transação</h1>
            
            <div class="selectAnAction">
              <div class="boxAction">
                <button @click="selectAnAction('deposit')" class="select" :class="selectedTransaction == 'deposit' ? 'selected' : ''"></button>
                Depositar
              </div>
              <div class="boxAction">
                <button @click="selectAnAction('toWithdraw')" class="select" :class="selectedTransaction == 'toWithdraw' ? 'selected' : ''"></button>
                Retirar
              </div>
            </div>

            <input v-model="titleTransaction" class="fieldNewTransaction" type="text" placeholder="Titulo da transação" />
            <p v-if="titleTransactionError" class="inputError">O maximo de caracteres permitido é 25.</p>

            <input v-model="totalTransactionAmount" class="fieldNewTransaction" type="text" placeholder="Digite o valor total [Ex: 10.000,30]" />
            
            <input v-if="selectedTransaction == 'deposit'" v-model="savedAmount" class="fieldNewTransaction" type="text" placeholder="Valor para caso de urgência [Ex: 2.000,15] [opcional]" />
            <p v-if="savedAmountError" class="inputError">Você não pode guardar um valor maior do que o total.</p>

            <div v-if="selectedTransaction == 'toWithdraw'" class="boxFieldNewTransaction">
              <p>De onde deseja retirar o dinheiro?</p>
              <select v-model="takenFrom">
                <option selected>Valor Disponivel</option>
                <option>Valor de Emergência</option>
              </select>
            </div>

            <input v-model="date" class="fieldNewTransaction" type="date" placeholder="xx/xx/xxxx" />

            <div>
              <button @click="toggleBoxNewTransaction()" class="button button--cancel">Cancelar</button>
              <button @click="confirmTransaction()" class="button button--confirm">Confirmar</button>
            </div>

          </div>
        </section>

      </main>
    </div>

</template>


<style scoped>
  /*-------HEADER-------*/
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

  /*-------Main > boxFinanceInfo-------*/
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
    width: 100vw;
    max-width: 100%;
    position: absolute;
    top: 170px;
    display: flex;
    justify-content: center;
  }
  .infoFinanceSingle{
    width: 250px;
    padding: 20px;
    background: rgb(255, 255, 255);
    color: black;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    -webkit-box-shadow: -3px 0px 15px -3px #000000; 
    box-shadow: -3px 0px 15px -3px #000000;
  }
  .infoFinanceSingle:nth-child(1){
    margin-right: 100px;
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

  /*-------Main > boxTransactions-------*/
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
    max-width: 1000px;
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

  /*-------Main > ScreenNewTransaction-------*/
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
    width: 480px;
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
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }
  .boxFieldNewTransaction{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
  }
  .fieldNewTransaction{
    width: 90%;
    box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.75);
    border: 1px solid rgb(172, 172, 172);
    padding: 10px 10px;
    outline: 0;
    margin: 10px 0;
  }
  .boxNewTransaction select{
    width: 90%;
    margin: 10px 0;
    padding: 10px;
    outline: 0;
    font-size: 17px;
    box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.75);
    border: 1px solid rgb(172, 172, 172);;
  }

  /*-------Responsive-------*/
  @media screen and (max-width: 950px){
    /*Main > boxFinanceInfo*/
    .boxFinanceInfo h1 i{font-size: 18px;}
    .boxFinanceInfo h1{font-size: 20px;}
    .infoFinanceSingle{
      width: 220px;
      padding: 15px;
    }
    .infoFinanceSingle:nth-child(1){margin-right: 30px;}
    .infoFinanceSingle--title span{font-size: 16px;}
    .up{font-size: 24px;}
    .emergency{font-size: 20px;}
    .infoFinanceSingle--value{font-size: 23px;}

    /*Main > boxTransactions*/
    .boxTransactions{
      width: 80%;
    }
    .transactionInfo{
      font-size: 13px;
    }
    .fieldTransaction{
      font-size: 13px;
    }
  }

  @media screen and (max-width: 830px){
    .menuDesktop{display: none;}
    .boxMenuMobile{display: block;}
  }

  @media screen and (max-width: 680px){
    /*HEADER*/
    .welcomeUser img{
      width: 45px;
      height: 45px;
    }
    .welcomeUser p{
      font-size: 14px;
    }
    /*Main > boxFinanceInfo*/
    .infoFinanceSingle{
      width: 190px;
    }
    .infoFinanceSingle--title span{font-size: 15px;}
    .up{font-size: 22px;}
    .emergency{font-size: 18px;}
    .infoFinanceSingle--value{font-size: 20px;}

    /*Main > boxTransactions*/
    .newTransaction{font-size: 14px;}
  }

  @media screen and (max-width: 500px){
    /*Main > boxFinanceInfo*/
    .infoFinanceSingle{
      width: calc(80% / 2);
    }
    .up{font-size: 20px;}
    .emergency{font-size: 17px;}
    .infoFinanceSingle--value{font-size: 18px;}
    /*Main > boxTransactions*/
    .boxTransactions{
      width: 90%;
    }
    /*Main > ScreenNewTransaction*/
    .boxNewTransaction{
      width: 90%;
    }

    .boxNewTransaction select,
    .fieldNewTransaction{
      font-size: 12px;
    }
  }

  @media screen and (max-width: 390px){
     /*Main > boxFinanceInfo*/
    .boxInfoFinance{
      top: 180px;
    }
    /*Main > boxFinanceInfo*/
    .infoFinanceSingle--title span{font-size: 13px;}
    .up{font-size: 15px;}
    .emergency{font-size: 14px;}
    .infoFinanceSingle--value{font-size: 12px;}
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
      /*System Datas*/
      isLogged: false,
      loggedUser: [],
      theme: '#111319',
      mobileMenuIsActive: false,
      
      /*New Transaction Datas*/
      transictionSelected: -1,
      transactions: [
        {id: 1, title: 'Site MaxCorres', date: '25/12/2025', totalValue: 2500.10, netValue: 2000.08, savedValue: 500.02},
        {id: 2, title: 'X-box One', date: '25/12/2025', takenFrom: 'Disponivel', totalValue: -1000.00},
        {id: 3, title: 'Site advogado teteu', date: '25/12/2025', totalValue: 500.00, netValue: 300.00, savedValue: 200.00},
        {id: 4, title: 'torradeira plut', date: '25/12/2025', takenFrom: 'Emergêncial', totalValue: -500.00},
        {id: 5, title: 'ganhei da Be', date: '25/12/2025', totalValue: 800.00, netValue: 800.00, savedValue: 0.00}
      ],
      selectedTransaction: 'deposit',
      showBoxNewTransaction: false,

      /*New Transaction Fields*/
      titleTransaction: '',
      lastTitleTransactionValid: '',
      titleTransactionError: false,
      totalTransactionAmount: '',
      savedAmount: '',
      savedAmountError: false,
      lastSavedAmountValid: '',
      takenFrom: '',
      date: ''
    };
  },

  methods:{
    activeMobileMenu: function(){
      this.mobileMenuIsActive = !this.mobileMenuIsActive;
    },
    moreTransactionInfo: function(idToOpen){
      let allBoxMoreInfo = document.querySelectorAll('.moreTransactionInfo');
      let arrows = document.querySelectorAll('.arrow');
      
      for(let i = 0; i < allBoxMoreInfo.length; i++){
        allBoxMoreInfo[i].style.display = 'none';
        arrows[i].innerHTML = '';
        arrows[i].innerHTML = '<i class="fas fa-chevron-left"></i>'
      }

      if(this.transictionSelected == idToOpen){
        this.transictionSelected = NaN;
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
    selectAnAction: function(action){
      this.selectedTransaction = action;
      this.savedAmountError = false;
    },
    toggleBoxNewTransaction: function(){
      this.showBoxNewTransaction = !this.showBoxNewTransaction;
      this.savedAmountError = false;
    },
    confirmTransaction: function(){

      if(!this.fieldsValidate()){
        alert('Por favor, preencha todos os campos');
        return false;
      }

      this.formatValueToReal();

      /*Get ID to add a new transaction*/
      let id = (this.transactions == 0) ? 0 : this.transactions.length + 1; 

      switch(this.selectedTransaction){
        case 'deposit':
          this.transactions.push({id: id, title: this.titleTransaction, date: this.date, totalValue: parseFloat(this.totalTransactionAmount), netValue: (parseFloat(this.totalTransactionAmount) - parseFloat(this.savedAmount)), savedValue: parseFloat(this.savedAmount)})
          break;
        case 'toWithdraw':
          this.transactions.push({id: id, title: this.titleTransaction, date: this.date, takenFrom: this.takenFrom, totalValue: (~parseFloat(this.totalTransactionAmount) + 1)});
          break;
      }

      //faça o envio ao BD Aqui
      
      this.resetTransactionsFields();
    },
    fieldsValidate: function(){
      if(!this.titleTransaction || !this.totalTransactionAmount || !this.date)
        return false;

      if(!this.takenFrom && (this.selectedTransaction == 'toWithdraw'))
        return false;

      return true;
    },
    formatValueToReal: function(){
      if(this.selectedTransaction == 'deposit'){
          (this.savedAmount) ? '' : this.savedAmount = '0,00';
          this.savedAmount = this.savedAmount.replace('.', '');
          this.savedAmount = this.savedAmount.replace(',', '.');
      }
      this.totalTransactionAmount = this.totalTransactionAmount.replace('.', '');
      this.totalTransactionAmount = this.totalTransactionAmount.replace(',', '.');
    },
    resetTransactionsFields: function(){
      this.showBoxNewTransaction = false;
      this.titleTransaction = '',
      this.lastTitleTransactionValid = '',
      this.titleTransactionError = false,
      this.totalTransactionAmount = '',
      this.savedAmount = '',
      this.savedAmountError = false,
      this.lastSavedAmountValid = '',
      this.takenFrom = '',
      this.date = ''
    },
    changeToDefaultTheme: function(){
      document.body.style.setProperty('--mainBackground', '#C9C9C9');
      document.body.style.setProperty('--header', '#111319');
      document.body.style.setProperty('--systemTitleBackground', '#171A21');
      document.body.style.setProperty('--systemTitleColor', 'white');
    },
    changeToTheme1: function(){
      document.body.style.setProperty('--mainBackground', '#F3D2FF');
      document.body.style.setProperty('--header', '#AC348B');
      document.body.style.setProperty('--systemTitleBackground', '#D26AD4');
      document.body.style.setProperty('--systemTitleColor', 'white');
    },
    changeToTheme2: function(){
      document.body.style.setProperty('--mainBackground', '#171A21');
      document.body.style.setProperty('--header', '#0B0B0B');
      document.body.style.setProperty('--systemTitleBackground', '#0F0F0F');
      document.body.style.setProperty('--systemTitleColor', 'white');
    },
    changeToTheme3: function(){
      document.body.style.setProperty('--mainBackground', '#DEDEDE');
      document.body.style.setProperty('--header', '#1A1423');
      document.body.style.setProperty('--systemTitleBackground', '#3D314A');
      document.body.style.setProperty('--systemTitleColor', 'white');
    },
    changeToTheme4: function(){
      document.body.style.setProperty('--mainBackground', '#DCDCDC');
      document.body.style.setProperty('--header', '#999999');
      document.body.style.setProperty('--systemTitleBackground', '#B9B9B9');
      document.body.style.setProperty('--systemTitleColor', 'black');
    },
  },

  watch:{
    titleTransaction: function(){
      if(this.titleTransaction.length > 25){
          this.titleTransaction = this.lastTitleTransactionValid;
          this.titleTransactionError = true;
      }else{
        this.lastTitleTransactionValid = this.titleTransaction;
      }
    },
    totalTransactionAmount: function(){
      this.totalTransactionAmount = this.totalTransactionAmount.replace(/[^0-9,.]/g, '');
    },
    savedAmount: function(){
      this.savedAmount = this.savedAmount.replace(/[^0-9,.]/g, '');

      if(parseFloat(this.savedAmount) > parseFloat(this.totalTransactionAmount) || !this.totalTransactionAmount){
        this.savedAmount = this.lastSavedAmountValid;
        this.savedAmountError = true;
      }else{
        this.lastSavedAmountValid = this.savedAmount;
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
        this.changeToTheme3();
        break;
      case 'theme4':
        this.changeToTheme4();
        break;
    }
  }
}
</script>
