<template>
    <v-app id="login" class="primary" >
        <v-content>
            <v-container fluid fill-height >
                <v-layout align-center justify-center >
                    <v-flex xs12 sm8 md4 lg4 >
                        <login-form></login-form>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import LoginForm from '@/components/LoginForm/LoginForm.vue';

    @Component({
        components: {
            LoginForm,
        },
    })
    export default class LoginPage extends Vue {

    }
</script>

<style scoped lang="scss">

    #login {

        height: 50%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        z-index: 0;
    }
</style>
