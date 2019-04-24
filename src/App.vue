<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="stylus">
#app{
  font-family 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing antialiased;
  -moz-osx-font-smoothing grayscale;
  text-align center;
  color #2c3e50;
  #black {
    background-color: #212124;
    .inputAll {
      background-color: #161618;
      input {
        background-color: #161618;
        &::placeholder {
          color: #E6E6E6;
        }
      }
    }

  }
  #red{
    background-color:#c62f2f;
    .inputAll {
      background-color: #a82828;
      input {
        background-color: #a82828;
        &::placeholder {
          color: #E6E6E6;
        }
      }
    }
  }
  #pink{
    background-color:#f9a0c3;
    .inputAll {
      background-color: #e36a95;
      input {
        background-color: #e36a95;
        &::placeholder {
          color: #E6E6E6;
        }
      }
    }
  }
  #blue{
    background-color:#40aaf8;
    .inputAll {
      background-color: #478bd4;
      input {
        background-color: #478bd4;
        &::placeholder {
          color: #E6E6E6;
        }
      }
    }

  }
  #green{
    background-color:#3bba7d;
    .inputAll {
      background-color: #449769;
      input {
        background-color: #449769;
        &::placeholder {
          color: #E6E6E6;
        }
      }
    }
  }
  #gold{
    background-color:#d89f55;
    .inputAll {
      background-color: #be8c4f;
      input {
        background-color: #be8c4f;
        &::placeholder {
          color: #E6E6E6;
        }
      }
    }
  }
}



</style>
