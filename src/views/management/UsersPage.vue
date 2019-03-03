<template>
    <div>
        <v-toolbar flat>
            <v-toolbar-title>Usuarios</v-toolbar-title>
            <v-divider
                    class="mx-2"
                    inset
                    vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" color="primary" class="mb-2">Agrega un nuevo Usuario</v-btn>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ editedItem.firstName ? editedItem.firstName : formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="editedItem.username"
                                                  v-validate="'required'"
                                                  :error-messages="errors.collect('username')"
                                                  data-vv-name="username"
                                                  label="Nombre de usuario"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="editedItem.email"
                                                  v-validate="'required|email'"
                                                  :error-messages="errors.collect('email')"
                                                  data-vv-name="email"
                                                  type="email" label="Email"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field
                                            v-if="editedIndex === -1"
                                            v-model="editedItem.password"
                                            v-validate="'required'"
                                            :error-messages="errors.collect('password')"
                                            data-vv-name="password"
                                            type="password" label="Contraseña"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-select
                                            v-if="editedIndex > -1"
                                            v-model="editedItem.role._id"
                                            :items="rolesSelected"
                                            item-text="text"
                                            item-value="value"
                                            label="Escoga un Rol"
                                            v-validate="'required'"
                                            data-vv-name="select"
                                            :error-messages="errors.collect('select')"
                                            required
                                    ></v-select>
                                </v-flex>
                                <v-checkbox
                                        v-if="editedIndex > -1"
                                        v-model="editedItem.blocked"
                                        :label="`¿Bloquear? `"
                                ></v-checkbox>
                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
                        <v-btn color="blue darken-1" flat @click="save">Guardar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-data-table
                :headers="headers"
                :items="users"
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td class="text-sm-center subheading">{{ props.item.username }}</td>
                <td class="text-sm-center subheading">{{ props.item.role? props.item.role.name: 'No tiene rol' }}
                </td>
                <td class="justify-center layout px-0">
                    <v-btn flat icon color="blue lighten-2">

                        <v-icon
                                medium
                                @click="editItem(props.item)"
                        >
                            edit
                        </v-icon>
                    </v-btn>
                    <v-btn flat icon color="red darken-2">
                        <v-icon
                                medium
                                @click="deleteItem(props.item)"
                        >
                            delete
                        </v-icon>
                    </v-btn>

                </td>
            </template>
            <template slot="no-data">
                <h2> No hay datos disponibles</h2>
            </template>
        </v-data-table>

        <v-toolbar flat>
            <v-toolbar-title>Roles Diponibles</v-toolbar-title>
            <v-divider
                    class="mx-2"
                    inset
                    vertical
            ></v-divider>
            <v-spacer></v-spacer>

        </v-toolbar>
        <v-data-table
                :headers="headersRoles"
                :items="roles"
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td class="text-sm-center subheading">{{ props.item.name }}</td>
                <td class="text-sm-center subheading">{{ props.item.description }}
                </td>

            </template>
            <template slot="no-data">
                <h2> No hay datos disponibles</h2>
            </template>
        </v-data-table>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Watch} from 'vue-property-decorator';
    import {Role, User} from "@/types";
    import StrapiService from '@/services/StrapiService';
    import Authentication from "@/store/modules/Authentication";

    @Component({
        $_veeValidate: { validator: "new" }
    })
    export default class UsersPage extends Vue {

        public users: User[] = [];

        public dialog: boolean = false;
        public headers: Array<any> = [

            {text: 'Nombre de Usuario', class: 'subheading', value: 'username'},
            {text: 'Tipo de usuario', class: 'subheading', value: 'role', sortable: false,},

            {text: 'Actions', class: 'subheading', value: 'actions', sortable: false}
        ];
        public headersRoles: Array<any> = [

            {text: 'Nombre del Rol', class: 'subheading', value: 'name'},
            {text: 'Descripción', class: 'subheading', value: 'description', sortable: false,},

        ];

        public dictionary = {
            attributes: {
                email: 'E-mail Address'
                // custom attributes
            },
            custom: {
                name: {
                    required: () => 'Name can not be empty',
                    max: 'The name field may not be greater than 10 characters'
                    // custom messages
                },
                select: {
                    required: 'Select field is required'
                }
            }
        };
        public editedIndex: number = -1;
        public editedItem: any = {
            _id: '',
            confirmed: true,
            blocked: false,
            username: '',
            email: '',
            provider: 'local',
            role: {
                _id: "",

            },
        };
        public defaultItem: any = {
            _id: '',
            confirmed: true,
            blocked: false,
            username: '',
            email: '',
            provider: 'local',
            role: {
                _id: "",

            },
        };

        public get formTitle() {
            return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
        }


        @Watch('dialog')
        dialogWatch(val: any) {
            val || this.close();
        }
        public roles: any[] = [];
        public rolesSelected: any[] = [];
        async fetchRoles(){
            const response = await StrapiService.Strapi.axios.get(`/users-permissions/roles`);
            this.rolesSelected = response.data.roles.map((role: any) => {
                return {
                    text: `${role.name}`,
                    value: role.id
                }
            });
            this.roles = response.data.roles;
        }


        async mounted() {
            await this.fetchRoles();
            await this.fetchUsers();
        }

        editItem(item:any) {

            this.editedIndex = this.users.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        }

        async deleteItem(item:any) {

            if (Authentication.user._id !== item._id){
                confirm('Está seguro de querer eliminar el usuario?') && await StrapiService.Strapi.axios.delete(`/users/${item._id}`)
                await this.fetchUsers();
            } else {
                alert('No puede eliminar su usuario')
            }



        }

        close() {
            this.dialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1
            }, 300)
        }

        async save() {
            let allowOK = await this.$validator.validateAll();
            if (allowOK){
                if (this.editedIndex > -1) {
                    const users = await StrapiService.Strapi.axios.put(`/users/${this.editedItem._id}`,
                        {
                            email: this.editedItem.email,
                            username: this.editedItem.username,
                            blocked: this.editedItem.blocked,
                            confirmed: this.editedItem.confirmed,
                            provider: this.editedItem.provider,
                            role: this.editedItem.role._id
                        });
                    await this.fetchUsers();
                } else {
                    const users = await StrapiService.Strapi.axios.post(`/auth/local/register`,
                        {
                            email: this.editedItem.email,
                            username: this.editedItem.username,
                            password: this.editedItem.password
                        });
                    await this.fetchUsers();
                }
                this.close()
            }
        }

        async fetchUsers(){
            const response = await StrapiService.Strapi.axios.get(`/users`);
            this.users = response.data;
        }

    }
</script>

<style scoped>

</style>
