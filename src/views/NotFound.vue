<template>
    <v-layout row wrap align-center justify-center>
        <v-flex xs12 sm4 md4 class="text-md-center">
            <img src="../assets/deadpage2.png" height="340"/>
            <h2 class="my-3 headline ">No deberías estar aqui... solo hay Nada</h2>
            <h3 class="my-3 headline ">404</h3>
            <v-btn color="primary" @click="goHome">¡¡Quiero salir Ahora!!</v-btn>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class NotFound extends Vue {

        public goHome() {
            this.$router.push({path: '/'});
        }

    }
</script>
<style scoped lang="scss">
    #404 {
        h1 {
            font-size: 150px;
            line-height: 150px;
            font-weight: 700;
            color: #252932;
            text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px, rgba(61, 61, 61, 0.3) 3px 3px;
        }
    }

</style>

