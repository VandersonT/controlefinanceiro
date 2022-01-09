<template>
  <main>

    <section class="errorBox">
      <img :src="this.error.statusCode === 404 ? 'images/404.png' : 'images/error.png'" />
      <h1>Oooops...</h1>
      <h3>{{this.error.statusCode === 404 ? 'Página não encontrada' : 'Ocorreu algum erro'}}</h3>
      <button class="goHomeButton">Home</button>
    </section>
    
  </main>
</template>

<script>
  export default {
    name: 'EmptyLayout',
    layout: 'empty',
    props: {
      error: {
        type: Object,
        default: null
      }
    },
    head () {
      const title = this.error.statusCode === 404 ? 'Página não encontrada' : 'Ocorreu algum erro'
      return {title}
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
  .errorBox{
    width: 500px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto Condensed', sans-serif;
  }
  .errorBox img{
    width: 290px;
    height: 150px;
    margin-bottom: 30px;
  }
  .errorBox h1{
    font-size: 30px;
    color: rgb(58, 58, 58);
    font-weight: lighter;
  }
  .errorBox h3{
    font-size: 21px;
    color: rgb(58, 58, 58);
    font-weight: lighter;
    margin-bottom: 10px;
  }
  .goHomeButton{
      margin: 10px;
      padding: 8px 22px;
      border-radius: 5px;
      background: #009ffc;
      color: white;
  }
  .goHomeButton:hover{
      background: #0098f0;
  }
  /*RESPONSIVE*/
  @media screen and (max-width: 535px){
    .errorBox{
      width: 100%;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: 'Roboto Condensed', sans-serif;
    }
    .errorBox img{
      width: 220px;
      height: 100px;
      margin-bottom: 10px;
    }
    .errorBox h3{
      font-size: 18px;
    }
    .goHomeButton{
      padding: 7px 19px;
      font-size: 15px;
  }
  }
</style>
