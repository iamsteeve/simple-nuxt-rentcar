<template>
    <div>
        <v-toolbar flat>
            <v-toolbar-title>Reservaciones</v-toolbar-title>
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
                        <span class="headline">{{ editedItem.hotel ? editedItem.hotel : formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form">
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12 sm6 md4 d-flex>
                                        <v-select
                                                v-model="editedItem.car.id"
                                                :items="cars"
                                                item-text="text"
                                                item-value="value"
                                                label="Elige un Auto"
                                                data-vv-name="select"
                                                required
                                        ></v-select>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4 d-flex>
                                        <v-select
                                                v-model="editedItem.customer.id"
                                                :items="customers"
                                                item-text="text"
                                                item-value="value"
                                                label="Elige un cliente"
                                                data-vv-name="select"
                                                required
                                        ></v-select>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field v-model="editedItem.hotel" type="text"
                                                      label="Hotel"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field v-model="editedItem.roomNumber" type="text"
                                                      label="Número de Cuarto"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm4 md4>
                                        <v-text-field v-model.number="editedItem.advancePayment" prefix="$" type="number"
                                                      label="Adelanto de Pago"></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 sm8 md8>
                                        <v-textarea
                                                name="note"
                                                label="Notas"
                                                v-model="editedItem.notes"
                                                hint="Escribe algo"
                                        ></v-textarea>
                                    </v-flex>

                                    <v-flex xs12 sm6 md6>
                                        <v-menu
                                                v-model="dateMenu"
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
                                                    v-model="editedItem.date"
                                                    label="Fecha de expedición de Licencia para conducir"
                                                    prepend-icon="event"
                                                    readonly
                                            ></v-text-field>
                                            <v-date-picker v-model="editedItem.date"
                                                           @input="dateMenu = false"></v-date-picker>
                                        </v-menu>
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
                :items="reservations"
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td class="subheading">{{ props.item.id }}</td>
                <td class="text-sm-center subheading">{{ `${props.item.car.model} - ${props.item.car.brand}` }}</td>
                <td class="text-sm-center subheading">{{ props.item.customer.firstName }}</td>
                <td class="text-sm-center subheading">{{ props.item.hotel }}</td>
                <td class="text-sm-center subheading">{{ props.item.roomNumber}}</td>
                <td class="text-sm-center subheading">{{ props.item.date.substr(0,10)}}</td>

                <td class="text-sm-center subheading">{{ props.item.advancePayment}}</td>


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
    import {Car, Customer, Reservation, User} from "@/types";
    import StrapiService from '@/services/StrapiService';


    @Component({
        $_veeValidate: { validator: "new" }
    })
    export default class Reservations extends Vue {



        async fetchData() {
            const response = await StrapiService.Strapi.axios.get(`/reservations`);
            const newReservations = response.data.map((customer) => {
                return {
                    ...customer,
                    date: customer.date.substr(0,10)
                }
            });
            const responseCar = await StrapiService.Strapi.axios.get(`/cars`);
            const newCars = responseCar.data.map((car) => {
                return {
                    text: `${car.brand} ${car.model}`,
                    value: car.id
                }
            })
            const responseCustomer= await StrapiService.Strapi.axios.get(`/customers`);
            const newCustomers = responseCustomer.data
                .map((customer)=> (
                    {
                        text: `${customer.firstName} ${customer.lastName}`,
                        value: customer.id
                    }
                ));
            this.reservations = newReservations;
            this.cars = newCars;
            this.customers = newCustomers
        }

        async mounted(){
            await this.fetchData();
        }

        public customers: any[] = [];
        public cars: any[] = [];

        public reservations: Reservation[] = [];
        public dialog: boolean = false;
        public dateMenu: boolean = false;
        public dateLicenseExp: boolean = false;
        public headers: Array<any> = [
            {
                text: 'ID',
                align: 'left',
                sortable: false,
                class: 'subheading',
                value: 'id'
            },
            {text: 'Automovil', class: 'subheading', value: 'car'},
            {text: 'Cliente', class: 'subheading', value: 'customer'},
            {text: 'Hotel', class: 'subheading', value: 'hotel'},
            {text: 'Número de cuarto', class: 'subheading', value: 'roomNumber'},
            {text: 'Fecha', class: 'subheading', value: 'date'},
            {text: 'Adelanto', class: 'subheading', value: 'advancePayment'},


            {text: 'Actions', class: 'subheading', value: 'actions', sortable: false}
        ];
        public editedIndex: number = -1;
        public editedItem: Reservation = {
            id: '',
            date: new Date().toISOString().substr(0, 10),
            hotel: '',
            roomNumber: '',
            advancePayment: 0,
            notes: '',
            customer: {
                id: ''
            },
            car: {
                id: ''
            },
        };
        public defaultItem: Reservation = {
            id: '',
            date: new Date().toISOString().substr(0, 10),
            hotel: '',
            roomNumber: '',
            advancePayment: 0,
            notes: '',
            customer: {
                id: ''
            },
            car: {
                id: ''
            },
        };

        public get formTitle() {
            return this.editedIndex === -1 ? 'Nuevo Cliente' : 'Editar Cliente'
        }

        public parseDateIss(item) {
            const date = new Date(item);
            return `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`
        }

        public parseDateVen(item) {
            const date = new Date(item);
            return `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`
        }

        @Watch('dialog')
        dialogWatch(val) {
            val || this.close()
        }

        editItem(item) {
            this.editedIndex = this.reservations.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        }

        async deleteItem(item) {
            const index = this.reservations.indexOf(item)
            confirm('Está seguro de eliminarlo?') && await StrapiService.Strapi.axios.delete(`/reservations/${item.id}`)
            this.fetchData();
        }

        close() {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        }

        async save() {
            if (this.editedIndex > -1) {
                const reservations = await StrapiService.Strapi.axios.put(`/reservations/${this.editedItem.id}`,
                    {
                        date: this.editedItem.date,
                        hotel: this.editedItem.hotel,
                        roomNumber: this.editedItem.roomNumber,
                        advancePayment: this.editedItem.advancePayment,
                        notes: this.editedItem.notes,
                        customer: this.editedItem.customer.id,
                        car: this.editedItem.car.id,
                    });
                await this.fetchData();
            } else {
                const reservations = await StrapiService.Strapi.axios.post(`/reservations`,
                    {
                        date: this.editedItem.date,
                        hotel: this.editedItem.hotel,
                        roomNumber: this.editedItem.roomNumber,
                        advancePayment: this.editedItem.advancePayment,
                        notes: this.editedItem.notes,
                        customer: this.editedItem.customer.id,
                        car: this.editedItem.car.id,
                    });
                await this.fetchData();

            }
            this.close()
        }




    }
</script>

<style scoped lang="scss">

</style>