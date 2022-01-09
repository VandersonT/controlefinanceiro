<template>
    <Nuxt />
</template>

<style>
  /*------------------------->GLOBAL CSS BELLOW<-------------------------*/

  /*------------Main Css----------------*/
    :root {
      --mainBackground: #C9C9C9;
      --header: #111319;
      --systemTitleBackground: #171A21;
      --systemTitleColor: white;
    }
    html{
      max-width: 3000px;
      margin: 0 auto;
      overflow: auto;
    }
    .link{
      color: #00A3FF;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 14px;
      cursor: pointer;
    }
    .link:hover{
      color: #0093e9;
    }
  /*------------------------------------*/

  /*--------------Flash's---------------*/
    .inputError{
      color: rgb(148, 15, 15);
      font-size: 14px;
    }
  /*------------------------------------*/

  /*-----------CUSTON BUTTONS-----------*/
  
    /*Default Button*/
    .button{
      margin: 10px;
      padding: 10px 25px;
      border-radius: 5px;
    }

    /*Button Cancel*/
    .button--cancel{
      border: 2px solid #da4d4d !important;
      color: #da4d4d !important;
    }
    .button--cancel:hover{
      border: 2px solid rgb(240, 10, 10) !important;
      color: rgb(240, 10, 10)!important;
    }

    @media screen and (max-width: 430px) {
      .button{
        padding: 7px 10px;
      }
    }

    /*Button Confirm*/
    .button--confirm{
      border: 2px solid transparent !important;
      background: #38CF1F !important;
      color: white !important;
    }
    .button--confirm:hover{
      background: #37c51e !important;
      color: rgb(230, 230, 230) !important;
    }

    /*Button Close*/
    .button__close{
      background: rgb(170, 12, 12) !important;
      color: rgb(255, 255, 255) !important;
    }
    .button__close:active{
      background: rgb(156, 10, 10) !important;
      color: rgb(230, 230, 230) !important;
    }

    /*Button Update*/
    .button--update{
      border: 2px solid transparent !important;
      background: #02a1fd !important;
      color: white !important;
    }
    .button--update:hover{
      background: #009af3 !important;
      color: rgb(243, 243, 243) !important;
    }
  /*------------------------------------*/
</style>