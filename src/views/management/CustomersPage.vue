<template>
    <div>
        <v-toolbar flat>
            <v-toolbar-title>Clientes</v-toolbar-title>
            <v-divider
                    class="mx-2"
                    inset
                    vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" color="primary" dark class="mb-2">Agrega un nuevo cliente</v-btn>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ editedItem.firstName ? editedItem.firstName : formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form">
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field v-model="editedItem.firstName"
                                                      v-validate="'required'"
                                                      data-vv-name="firstName"
                                                      :error-messages="errors.collect('firstName')"
                                                      type="text"
                                                      label="Nombre del cliente"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field v-model="editedItem.lastName"
                                                      v-validate="'min:3'"
                                                      data-vv-name="lastName"
                                                      :error-messages="errors.collect('lastName')"
                                                      type="text"
                                                      label="Apellido"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm4 md4>
                                        <v-text-field v-model.number="editedItem.age"
                                                      v-validate="'min:1'"
                                                      :error-messages="errors.collect('age')"
                                                      data-vv-name="age"
                                                      type="number"
                                                      label="Edad"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm8 md8>
                                        <v-text-field v-model="editedItem.address" type="text" label="Dirección"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm4 md4>
                                        <v-text-field v-model.number="editedItem.phone"
                                                      type="phone"
                                                      mask="###-###-####"
                                                      label="Telefono"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm8 md8>
                                        <v-text-field v-model="editedItem.email"
                                                      type="email"
                                                      v-validate="'required|email'"
                                                      :error-messages="errors.collect('email')"
                                                      data-vv-name="email"

                                                      label="Email"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model="editedItem.license"
                                                      type="text"
                                                      label="Licencia de conducir"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-menu
                                                v-model="dateLicenseExp"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                lazy
                                                transition="scale-transition"
                                                offset-y
                                                full-width
                                                min-width="290px"
                                        >
                                            <v-text-field
                                                    slot="activator"
                                                    v-model="editedItem.issuanceLicense"
                                                    label="Fecha de expedición de Licencia para conducir"
                                                    prepend-icon="event"
                                                    readonly
                                            ></v-text-field>
                                            <v-date-picker v-model="editedItem.issuanceLicense"
                                                           @input="dateLicenseExp = false"></v-date-picker>
                                        </v-menu>
                                    </v-flex>

                                    <v-flex xs12 sm6 md6>
                                        <v-menu
                                                v-model="dateLicenseVen"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                lazy
                                                transition="scale-transition"
                                                offset-y
                                                full-width
                                                min-width="290px"
                                        >
                                            <v-text-field
                                                    slot="activator"
                                                    v-model="editedItem.licenseExpiration"
                                                    label="Fecha de Vencimiento de Licencia para conducir"
                                                    prepend-icon="event"
                                                    readonly
                                            ></v-text-field>
                                            <v-date-picker v-model="editedItem.licenseExpiration"
                                                           @input="dateLicenseVen = false"></v-date-picker>
                                        </v-menu>
                                    </v-flex>
                                    <v-flex
                                            xs12
                                            md6
                                    >
                                        <v-checkbox
                                                v-model="editedItem.haveFiscal"
                                                label="¿Tiene Fiscal?"
                                        ></v-checkbox>

                                    </v-flex>
                                    <v-flex xs12 sm12 md12 v-if="editedItem.haveFiscal">
                                        <v-text-field v-model="editedItem.fiscalName"
                                                      label="Nombre Fiscal"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12 v-if="editedItem.haveFiscal">
                                        <v-text-field v-model="editedItem.fiscalRFC" label="RFC Fiscal"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12 v-if="editedItem.haveFiscal">
                                        <v-text-field v-model="editedItem.fiscalAddress"
                                                      label="Dirección fiscal"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12 v-if="editedItem.haveFiscal">
                                        <v-text-field v-model.number="editedItem.fiscalPhone"
                                                      mask="###-###-####"
                                                      type="phone"
                                                      label="Telefono Fiscal"></v-text-field>
                                    </v-flex>

                                </v-layout>
                            </v-container>
                        </v-form>
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
                :items="customers"
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td class="subheading">{{ props.item.id }}</td>
                <td class="subheading">{{ props.item.firstName }}</td>
                <td class="text-sm-center subheading">{{ props.item.lastName }}</td>
                <td class="text-sm-center subheading">{{ props.item.age }}</td>
                <td class="text-sm-center subheading">{{ props.item.address }}</td>
                <td class="text-sm-center subheading">{{ props.item.phone }}</td>
                <td class="text-sm-center subheading">{{ props.item.email}}</td>
                <td class="text-sm-center subheading">{{ props.item.license}}</td>
                <td class="text-sm-center subheading">{{ props.item.issuanceLicense }}</td>
                <td class="text-sm-center subheading">{{ props.item.licenseExpiration }}</td>

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
                <h2>No hay disponible ningun data</h2>
            </template>
        </v-data-table>
    </div>

</template>

<script lang="ts">
    import {Vue, Component, Watch} from 'vue-property-decorator';
    import {Customer, Role, User} from "@/types";
    import StrapiServices from '@/services/StrapiService'

    @Component({
        $_veeValidate: { validator: "new" }
    })
    export default class CustomersPage extends Vue {

        async mounted() {
            await this.fetchCustomer();
        }


        async fetchCustomer(){
            const response = await StrapiServices.Strapi.axios.get(`/customers`);
            this.customers = response.data.map((customer: any) => {
                return {
                    ...customer,
                    issuanceLicense: customer.issuanceLicense.substr(0, 10),
                    licenseExpiration: customer.licenseExpiration.substr(0, 10)
                }
            })

        }


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

        public customers: Customer[] = [];
        public dialog: boolean = false;
        public dateLicenseVen: boolean = false;
        public dateLicenseExp: boolean = false;
        public headers: Array<any> = [
            {
                text: 'ID',
                align: 'left',
                sortable: false,
                class: 'subheading',
                value: 'id'
            },
            {text: 'Nombre', class: 'subheading', value: 'firstName'},
            {text: 'Apellidos', class: 'subheading', value: 'lastName'},
            {text: 'Edad', class: 'subheading', value: 'age'},
            {text: 'Domicilio', class: 'subheading', value: 'address'},
            {text: 'Telefono', class: 'subheading', value: 'phone'},
            {text: 'Email', class: 'subheading', value: 'email'},
            {text: 'Numero de licencia', class: 'subheading', value: 'licenseCode'},
            {text: 'Fecha de expedición de licencia', class: 'subheading', value: 'issuanceLicense'},
            {text: 'Fecha de vencimiento de licencia', class: 'subheading', value: 'licenseExpiration'},

            {text: 'Actions', class: 'subheading', value: 'actions', sortable: false}
        ];
        public editedIndex: number = -1;
        public editedItem: Customer = {
            id: '',
            firstName: '',
            lastName: '',
            age: 0,
            address: '',
            phone: 9841401234,
            email: '',
            license: '',
            issuanceLicense: new Date().toISOString().substr(0, 10),
            licenseExpiration: new Date().toISOString().substr(0, 10),
            haveFiscal: false,
            fiscalName: '',
            fiscalPhone: 0,
            fiscalAddress: '',
            fiscalRFC: ''
        };
        public defaultItem: Customer = {
            id: '',
            firstName: '',
            lastName: '',
            age: 0,
            address: '',
            haveFiscal: false,
            phone: 9841401234,
            email: '',
            license: '',
            issuanceLicense: new Date().toISOString().substr(0, 10),
            licenseExpiration: new Date().toISOString().substr(0, 10),
            fiscalName: '',
            fiscalPhone: 0,
            fiscalAddress: '',
            fiscalRFC: ''
        };

        public get formTitle() {
            return this.editedIndex === -1 ? 'Nuevo Cliente' : 'Editar Cliente'
        }

        @Watch('dialog')
        dialogWatch(val: any) {
            val || this.close()
        }

        editItem(item:any) {
            this.editedIndex = this.customers.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        }

        async deleteItem(item:any) {
            confirm('¿Quiere eliminar este cliente?')  && await StrapiServices.Strapi.axios.delete(`/customers/${item.id}/`)
            await this.fetchCustomer();
        }

        close() {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        }

        async save() {
            let allowOK = await this.$validator.validateAll();

            if (allowOK) {
                if (this.editedIndex > -1) {
                    const customers = await StrapiServices.Strapi.axios.put(`/customers/${this.editedItem.id}`,
                        {
                            firstName: this.editedItem.firstName,
                            lastName: this.editedItem.lastName,
                            age: this.editedItem.age,
                            address: this.editedItem.address,
                            phone: this.editedItem.phone,
                            email: this.editedItem.email,
                            license: this.editedItem.license,
                            issuanceLicense: this.editedItem.issuanceLicense,
                            licenseExpiration: this.editedItem.licenseExpiration,
                            haveFiscal: this.editedItem.haveFiscal,
                            fiscalName: this.editedItem.fiscalName,
                            fiscalPhone: this.editedItem.fiscalPhone,
                            fiscalAddress: this.editedItem.fiscalAddress,
                            fiscalRFC: this.editedItem.fiscalRFC

                        });
                    await this.fetchCustomer();
                } else {
                    const customers = await StrapiServices.Strapi.axios.post(`/customers`,
                        {
                            firstName: this.editedItem.firstName,
                            lastName: this.editedItem.lastName,
                            age: this.editedItem.age,
                            address: this.editedItem.address,
                            phone: this.editedItem.phone,
                            email: this.editedItem.email,
                            license: this.editedItem.license,
                            issuanceLicense: this.editedItem.issuanceLicense,
                            licenseExpiration: this.editedItem.licenseExpiration,
                            haveFiscal: this.editedItem.haveFiscal,
                            fiscalName: this.editedItem.fiscalName,
                            fiscalPhone: this.editedItem.fiscalPhone,
                            fiscalAddress: this.editedItem.fiscalAddress,
                            fiscalRFC: this.editedItem.fiscalRFC
                        });
                    await this.fetchCustomer();
                }
                this.close()
            }
        }




    }
</script>

<style scoped lang="scss">

</style>