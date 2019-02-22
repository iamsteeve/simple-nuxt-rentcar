<template>
  <v-app :dark="isUserLogged">
    <Menu v-if="isUserLogged"></Menu>
    <v-content>
      <v-container fluid grid-list-md text-xs-center>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer v-if="isUserLogged" app>
      <span>&copy; 2019 Foxlabs</span>
    </v-footer>
  </v-app>
</template>
<script lang="ts">
  import {Vue} from 'vue-property-decorator';
  import Authentication from '@/store/modules/Authentication';
  import Menu from '@/components/Menu/Menu.vue';
  import Component from 'vue-class-component';

  @Component({
    components: {
      Menu,
    },
  })
  export default class App extends Vue {
    public get isUserLogged() {
      return Authentication.isLogged;
    }
  }
</script>
<style lang="scss">

  @import url('https://fonts.googleapis.com/css?family=Dosis:300,400,500');

  #app {
    font-family: 'Dosis', sans-serif;
  }

  .application table.v-table thead tr {
    height: 35px;
  }

  table.v-table tbody td {
    /*font-weight: 400;*/
    /*font-size: 1.1em;*/
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.12);
  }

  ::-webkit-scrollbar {
    width: 0px;
    height: 5px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 0;
  }

  ::-webkit-scrollbar-thumb {
    background: #039be5;
    border-radius: 0;
  }
</style>
