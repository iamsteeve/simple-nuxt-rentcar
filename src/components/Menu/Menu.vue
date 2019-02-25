<template>
    <section id="menu">
        <v-navigation-drawer
                fixed
                :clipped="$vuetify.breakpoint.mdAndUp"
                app
                v-model="drawer"
        >
            <v-list>
                <v-list-tile
                        router
                        :to="item.to"
                        :key="i"
                        v-for="(item, i) in items"
                        exact
                >
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar
                color="primary"
                dark
                app
                :clipped-left="$vuetify.breakpoint.mdAndUp"
                fixed
        >
            <v-toolbar-title style="width: 300px;">
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <span class="hidden-sm-and-down">Pericos RentCart - {{$router.currentRoute.meta.title}}</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>notifications</v-icon>
            </v-btn>
            <v-menu transition="slide-y-transition" bottom>

                <span slot="activator" icon>
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img alt="avatar" src="../../assets/avatar.png">
                        </v-list-tile-avatar>
                    </v-list-tile>
                </span>

                <v-card>
                    <v-list>
                        <v-list-tile avatar>
                            <v-list-tile-avatar>
                                <img src="../../assets/avatar.png">
                            </v-list-tile-avatar>

                            <v-list-tile-content>

                                <v-list-tile-title>{{ username }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ role }}</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list>
                        <v-list-tile @click="logout">
                            <v-list-tile-action>
                                <v-icon>power_settings_new</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-title>Cerrar sesión</v-list-tile-title>
                        </v-list-tile>
                    </v-list>

                </v-card>
            </v-menu>
        </v-toolbar>
    </section>
</template>
<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';
    import Authentication from '@/store/modules/Authentication';

    @Component
    export default class Menu extends Vue {
        public username: string = Authentication.user.username;
        public role: string = Authentication.user.role.name;

        public drawer = null;
        public items = [
            { icon: 'dashboard', title: 'Dashboard', to: '/' },
            { icon: 'directions_car', title: 'Autos', to: '/cars' },
            { icon: 'perm_identity', title: 'Clientes', to: '/customers' },
            { icon: 'payment', title: 'Ventas', to: '/sales' },
            { icon: 'build', title: 'Reparaciones', to: '/fixes' },
            { icon: 'bookmark_border', title: 'Reservaciones', to: '/reservations' },
            { icon: 'person', title: 'Usuarios', to: '/users' },
            { icon: 'settings', title: 'Configuración (Aun en construcción)' }

        ];
        public async logout (){
            await Authentication.logout();
            this.$router.push('/login')
        }
    }
</script>
