<template>
    <v-card color="white" class="elevation-1 pa-3">
        <v-card-text>
            <div class="layout column align-center">
                <img
                        src="../../assets/periquito.png"
                        alt="Pericos"
                        style="width: 100%;"
                >
                <!-- <h1 class="flex my-4 primary--text">Laundry</h1> -->
            </div>
            <v-form>
                <v-text-field
                        append-icon="person"
                        name="login"
                        label="Login"
                        type="text"
                        v-model="model.identifier"
                ></v-text-field>
                <v-text-field
                        append-icon="lock"
                        name="password"
                        label="Password"
                        id="password"
                        type="password"
                        v-model="model.password"
                ></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn icon>
                <v-icon color="blue">fab fa-facebook-square fa-lg</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon color="red">fab fa-google fa-lg</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon color="light-blue">fab fa-twitter fa-lg</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Authentication from '@/store/modules/Authentication';

    @Component
    export default class LoginForm extends Vue {
        public loading = false;
        public model = {
            identifier: 'pericosadmin',
            password: 'pericosadmin',
        };


        public async login() {
            if (this.model) {
                await Authentication.login(this.model);
                console.log(Authentication.user);
                this.$router.push('/');
            }
        }

    }
</script>

<style scoped lang="scss">

</style>
