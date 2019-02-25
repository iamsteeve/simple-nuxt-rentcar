<template>
    <div>
        <v-toolbar flat>
            <v-toolbar-title>Ventas</v-toolbar-title>
            <v-divider
                    class="mx-2"
                    inset
                    vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" color="primary" dark class="mb-2">Agrega una nueva venta</v-btn>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ editedItem.contractNumber ? contractSerie : formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form">
                            <v-container grid-list-md>
                                <v-layout wrap>

                                    <v-flex xs12 sm6 md6>
                                        <v-text-field v-model.number="editedItem.contractNumber" type="number"
                                                      label="Numero de contrato"></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 sm6 md6 >
                                        <h2>
                                            Vendedor: {{editedItem.user.name}}
                                        </h2>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model="editedItem.notes"
                                                      label="Comentarios"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-select
                                                v-model="editedItem.serie"
                                                :items="serieList"
                                                item-text="text"
                                                item-value="value"
                                                label="Serie"
                                                data-vv-name="select"
                                                required
                                        ></v-select>
                                    </v-flex>

                                    <v-flex xs12 sm6 md6>
                                        <v-select
                                                v-model="editedItem.car.id"
                                                :items="cars"
                                                item-text="text"
                                                item-value="value"
                                                label="Escoga un Auto"
                                                data-vv-name="select"
                                                required
                                        ></v-select>
                                    </v-flex>

                                    <v-flex xs12 sm6 md6>
                                        <v-select
                                                v-model="editedItem.customer.id"
                                                :items="customers"
                                                item-text="text"
                                                item-value="value"
                                                label="Escoga un Cliente"
                                                data-vv-name="select"
                                                required
                                        ></v-select>
                                    </v-flex>

                                    <v-flex xs12 sm4 md4>
                                        <v-switch
                                                v-model="editedItem.haveDriver"
                                                :label="`¿Tiene Conductor?`"
                                        ></v-switch>

                                    </v-flex>
                                    <v-flex xs12 sm8 md8 v-if="editedItem.haveDriver">
                                        <v-text-field  v-model="editedItem.driverName" type="email"
                                                       label="Nombre del conductor"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12 v-if="editedItem.haveDriver">
                                        <v-text-field v-model="editedItem.driverLicense"
                                                      label="Licencia de conducir"></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 sm12 md12 v-if="editedItem.haveDriver">
                                        <v-flex xs12 sm12 md12>
                                            <v-menu
                                                    ref="issuanceDrivedate"
                                                    v-model="issuanceLicenseDriveDate"
                                                    :close-on-content-click="false"
                                                    :nudge-right="40"
                                                    :return-value.sync="editedItem.issuanceLicenseDriveDate"
                                                    lazy
                                                    transition="scale-transition"
                                                    offset-y
                                                    full-width
                                                    min-width="290px"
                                            >
                                                <v-text-field
                                                        slot="activator"
                                                        v-model="editedItem.issuanceLicenseDriveDate"
                                                        label="Expedición de licencia de conducir"
                                                        prepend-icon="event"
                                                        readonly
                                                ></v-text-field>
                                                <v-date-picker v-model="editedItem.issuanceLicenseDriveDate" no-title scrollable>
                                                    <v-spacer></v-spacer>
                                                    <v-btn flat color="primary" @click="issuanceLicenseDriveDate = false">Cancel</v-btn>
                                                    <v-btn flat color="primary" @click="$refs.issuanceDrivedate.save(editedItem.issuanceLicenseDriveDate)">OK</v-btn>
                                                </v-date-picker>
                                            </v-menu>
                                        </v-flex>

                                    </v-flex>
                                    <v-flex xs12 sm12 md12 v-if="editedItem.haveDriver">
                                        <v-flex xs12 sm12 md12>
                                            <v-menu
                                                    ref="driveExpiration"
                                                    v-model="expirationLicenseDriverDate"
                                                    :close-on-content-click="false"
                                                    :nudge-right="40"
                                                    :return-value.sync="editedItem.expirationLicenseDriverDate"
                                                    lazy
                                                    transition="scale-transition"
                                                    offset-y
                                                    full-width
                                                    min-width="290px"
                                            >
                                                <v-text-field
                                                        slot="activator"
                                                        v-model="editedItem.expirationLicenseDriverDate"
                                                        label="Expiración de licencia de conducir"
                                                        prepend-icon="event"
                                                        readonly
                                                ></v-text-field>
                                                <v-date-picker v-model="editedItem.expirationLicenseDriverDate" no-title scrollable>
                                                    <v-spacer></v-spacer>
                                                    <v-btn flat color="primary" @click="expirationLicenseDriverDate = false">Cancel</v-btn>
                                                    <v-btn flat color="primary" @click="$refs.driveExpiration.save(editedItem.expirationLicenseDriverDate)">OK</v-btn>
                                                </v-date-picker>
                                            </v-menu>
                                        </v-flex>
                                    </v-flex>
                                    <v-flex
                                            xs12
                                            md6
                                    >
                                        <v-switch
                                                v-model="editedItem.haveFiscal"
                                                label="¿Tiene Fiscal?"
                                        ></v-switch>

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
                                                      type="phone"
                                                      label="Telefono Fiscal"></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 sm12 md12>
                                        <v-menu
                                                ref="menu"
                                                v-model="entryDate"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                :return-value.sync="editedItem.entryDate"
                                                lazy
                                                transition="scale-transition"
                                                offset-y
                                                full-width
                                                min-width="290px"
                                        >
                                            <v-text-field
                                                    slot="activator"
                                                    v-model="editedItem.entryDate"
                                                    label="Fecha de Entrada"
                                                    prepend-icon="event"
                                                    readonly
                                            ></v-text-field>
                                            <v-date-picker v-model="editedItem.entryDate" no-title scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn flat color="primary" @click="entryDate = false">Cancel</v-btn>
                                                <v-btn flat color="primary" @click="$refs.menu.save(editedItem.entryDate)">OK</v-btn>
                                            </v-date-picker>
                                        </v-menu>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <v-menu
                                                ref="exitd"
                                                v-model="exitDate"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                :return-value.sync="editedItem.exitDate"
                                                lazy
                                                transition="scale-transition"
                                                offset-y
                                                full-width
                                                min-width="290px"
                                        >
                                            <v-text-field
                                                    slot="activator"
                                                    v-model="editedItem.exitDate"
                                                    label="Fecha de Salida"
                                                    prepend-icon="event"
                                                    readonly
                                            ></v-text-field>
                                            <v-date-picker v-model="editedItem.exitDate" no-title scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn flat color="primary" @click="exitDate = false">Cancel</v-btn>
                                                <v-btn flat color="primary" @click="$refs.exitd.save(editedItem.exitDate)">OK</v-btn>
                                            </v-date-picker>
                                        </v-menu>
                                    </v-flex>

                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model.number="editedItem.days" type="number"
                                                      label="Días"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <v-checkbox
                                                v-model="editedItem.haveAccidentInsurance"
                                                :label="`¿Tiene seguro de accidente?`"
                                        ></v-checkbox>

                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <v-checkbox
                                                v-model="editedItem.haveCollisionInsurance"
                                                :label="`¿Tiene seguro de colisión?`"
                                        ></v-checkbox>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model.number="editedItem.deposit"
                                                      prefix="$"
                                                      type="number"
                                                      label="Depósito"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model.number="editedItem.advancePayment"
                                                      prefix="$"
                                                      type="number"
                                                      label="Adelanto"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <v-checkbox
                                                v-model="editedItem.haveIVA"
                                                :label="`¿Tiene IVA?`"
                                        ></v-checkbox>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model.number="editedItem.priceForDay"
                                                      prefix="$"
                                                      type="number"
                                                      label="Precio por día"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field type="number" v-model.number="editedItem.eighthsGasEntry"
                                                      label="Octanos de gas de entrada"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field type="number" v-model.number="editedItem.eighthsGasExit"
                                                      label="Octanos de gas de salida"></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 sm12 md12>
                                        <v-select
                                                v-model="editedItem.payment"
                                                :items="paymentList"
                                                item-text="text"
                                                item-value="value"
                                                label="Elige un Tipo de pago"
                                                data-vv-name="select"
                                                required
                                        ></v-select>
                                    </v-flex>

                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model="editedItem.exitKilometers"
                                                      label="Kilometro de salida"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <v-select
                                                v-model="editedItem.typeCard"
                                                :items="cardList"
                                                item-text="text"
                                                item-value="value"
                                                label="Elige un Tipo de tarjeta"
                                                data-vv-name="select"
                                                required
                                        ></v-select>
                                    </v-flex>

                                    <v-flex xs12 sm12 md6>
                                        <h2>Total en Días: ${{totalDays}}</h2>
                                    </v-flex>
                                    <v-flex xs12 sm12 md6>
                                        <h2>Total Hora extra: ${{totalExtraHour}}</h2>
                                    </v-flex>
                                    <v-flex xs12 sm12 md6>
                                        <h2>Total Gas: ${{totalGas}}</h2>
                                    </v-flex>
                                    <v-flex xs12 sm12 md6>
                                        <h2>Kilometros Recorridos: {{kilometersTraveled}}</h2>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <h2>totalIVA: ${{totalIVA}}</h2>
                                    </v-flex>

                                    <v-flex xs12 sm12 md12>
                                        <h2>Total: ${{total}}</h2>
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
                :items="sales"
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td class="subheading">{{ props.item.id }}</td>
                <td class="text-sm-center subheading">{{ props.item.contractNumber }}</td>
                <td class="text-sm-center subheading">{{ props.item.total }}</td>
                <td class="text-sm-center subheading">{{ props.item.totalExtraHour }}</td>

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
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {Car, CardTypes, Customer, ISelectVueData, PayTypes, Sale, Serie, User} from "@/types";
    import StrapiService from '@/services/StrapiService';
    import Authentication from "@/store/modules/Authentication";



    @Component({
        $_veeValidate: { validator: "new" }
    })
    export default class Sales extends Vue {

        async fetchAll() {
            const responseSales = await StrapiService.Strapi.axios.get(`/sales`);
            const responseCustomers = await StrapiService.Strapi.axios.get(`/customers`);
            const responseCars = await StrapiService.Strapi.axios.get(`/cars`);
            const responseUsers = await StrapiService.Strapi.axios.get(`/users`);

            const newSales = responseSales.data.map((sale) => {
                return {
                    ...sale,
                    issuanceLicenseDriveDate: sale.issuanceLicenseDriveDate? sale.issuanceLicenseDriveDate.substr(0,10): '',
                    expirationLicenseDriverDate: sale.expirationLicenseDriverDate ? sale.expirationLicenseDriverDate.substr(0,10): '',
                    entryDate: sale.entryDate ?sale.entryDate.substr(0,10): '',
                    exitDate: sale.exitDate ?  sale.exitDate.substr(0,10): ''
                }
            });
            const newCustomers = responseCustomers.data
                .map((customer)=> (
                    {
                        text: `${customer.firstName} ${customer.lastName}`,
                        value: customer.id
                    }
                ));
            const newCars = responseCars.data
                .map((car) => {
                    return {
                        text: `${car.brand} - ${car.model}`,
                        value: car.id
                    }
                });
            this.sales = newSales;
            this.customers = newCustomers;
            this.cars = newCars;
            this.users = responseUsers.data;
        }

        async mounted(){
            await this.fetchAll();

            this.editedItem.user.id = this.userID;
            this.defaultItem.user.id = this.userID;
            const user = this.users.find((user)=> {
                return user._id === this.userID
            });
            this.defaultItem.user.name = user.username;
            this.editedItem.user.name = user.username;

        }

        public sales: Sale[] = [];
        public customers: any[] = [];
        public cars: any[] = [];
        public users: User[] = [];
        public dialog: boolean = false;
        public dateLicenseVen: boolean = false;
        public issuanceLicenseDriveDate: boolean = false;
        public expirationLicenseDriverDate: boolean = false;
        public dateLicenseExp: boolean = false;
        public entryDate: boolean = false;
        public exitDate: boolean = false;


        public serieList: any[] = [
            {
                text: 'C',
                value: 'C'
            },
            {
                text: 'D',
                value: 'D'
            }
        ];
        public paymentList: any[] = [
            {
                text: 'CASH',
                value: 'CASH'
            },
            {
                text: 'CARD',
                value: 'CARD'
            },
            {
                text: 'PENDING',
                value: 'PENDING'
            }
        ];
        public cardList: any[] = [
            {
                text: 'MASTERCARD',
                value: 'MASTERCARD'
            },
            {
                text: 'VISA',
                value: 'VISA'
            }
        ];
        public headers: Array<any> = [
            {
                text: 'Nombre',
                align: 'left',
                sortable: false,
                class: 'subheading',
                value: 'firstName'
            },
            {text: 'Apellidos', class: 'subheading', value: 'lastName'},
            {text: 'Edad', class: 'subheading', value: 'age'},
            {text: 'Domicilio', class: 'subheading', value: 'address'},

            {text: 'Actions', class: 'subheading', value: 'name', sortable: false}
        ];
        public editedIndex: number = -1;
        public editedItem: any= {
            id: '',
            contractNumber: 0,
            car: {
                id:''
            },
            customer: {
                id:''
            },
            user: {
                id: '',
                name: ''
            },
            exitDate: new Date().toISOString().substr(0, 10),
            entryDate: new Date().toISOString().substr(0, 10),
            priceForDay: 0,
            notes: '',
            entryKilometers: 0,
            exitKilometers: 0,
            kilometersTraveled: 0,
            finished: false,
            extraHour: 0,
            dayPrice: 0,
            haveAccidentInsurance: false,
            haveCollisionInsurance: false,
            haveDriver: false,
            driverName:  '',
            driverLicense: '',
            expirationLicenseDriverDate: new Date().toISOString().substr(0, 10),
            issuanceLicenseDriveDate: new Date().toISOString().substr(0, 10),
            deposit: 0,
            moneyAdvance: 0,
            haveIVA: false,
            eighthsGasEntry: 0,
            eighthsGasExit: 0,
            refunds: 0,
            totalIVA: 0,
            totalExtraHour: 0,
            totalDays: 0,
            totalInsurance: 0,
            totalDriver: 0,
            total: 0,
            damage: 0,
            days: 0,
            typeCard: CardTypes.MASTERCARD,
            payment: PayTypes.CASH,
            serie: Serie.C,
        };
        public defaultItem: any = {
            id: '',
            contractNumber: 0,
            car: {
                id: ''
            },
            customer: {
                id:''
            },
            user: {
                id: '',
                name: ''
            },
            exitDate: new Date().toISOString().substr(0, 10),
            entryDate: new Date().toISOString().substr(0, 10),
            priceForDay: 0,
            notes: '',
            entryKilometers: 0,
            exitKilometers: 0,
            kilometersTraveled: 0,
            finished: false,
            extraHour: 0,
            dayPrice: 0,
            haveAccidentInsurance: false,
            haveCollisionInsurance: false,
            haveDriver: false,
            driverName:  '',
            driverLicense: '',
            expirationLicenseDriverDate: '',
            issuanceLicenseDriveDate: '',
            deposit: 0,
            moneyAdvance: 0,
            haveIVA: false,
            eighthsGasEntry: 0,
            eighthsGasExit: 0,
            refunds: 0,
            totalGas: 0,
            totalIVA: 0,
            totalExtraHour: 0,
            totalDays: 0,
            totalInsurance: 0,
            totalDriver: 0,
            total: 0,
            damage: 0,
            days: 0,
            typeCard: CardTypes.MASTERCARD,
            payment: PayTypes.CASH,
            serie: Serie.C,
        };

        public get formTitle() {
            return this.editedIndex === -1 ? 'Nueva Venta' : 'Editar Venta'
        }

        public parseDateIss(item) {
            const date = new Date(item);
            return `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`
        }

        public parseDateVen(item) {
            const date = new Date(item);
            return `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`
        }
        get contractSerie (){
            return `${this.editedItem.contractNumber} - ${this.editedItem.serie}`
        }




        get totalDays(){
            return this.editedItem.priceForDay * this.editedItem.days;
        }
        get totalExtraHour(){
            return this.editedItem.extraHour * 12
        }
        get totalGas(){
            return (this.editedItem.eighthsGasExit - this.editedItem.eighthsGasEntry) * 25
        }
        get total(){
            let totalResult = (
                this.totalDays +
                this.totalExtraHour +
                this.totalGas +
                this.totalInsurance
            );
            if (this.editedItem.haveIVA){
                totalResult +=  (totalResult * this.costIVA)
            }
            return totalResult

        }
        get totalIVA(){
            let totalResult = (
                this.totalDays +
                this.totalExtraHour +
                this.totalGas +
                this.totalInsurance +
                this.totalDriver
            );
            if (this.editedItem.haveIVA){
                return totalResult * this.costIVA
            } else {
                return 0
            }
        }

        get costIVA() {
            return .11
        }
        get kilometersTraveled(){
            return this.editedItem.entryKilometers - this.editedItem.exitKilometers;
        }
        get totalInsurance(){
            let totalIn = 0
            if (this.editedItem.haveAccidentInsurance){
                totalIn += 12;
            } 
            if (this.editedItem.haveCollisionInsurance){
                totalIn += 24 * this.editedItem.days
            }
            return totalIn;
        }


        get totalDriver(){
            if (this.editedItem.haveDriver){
                return 21;
            }
            return 0
        }


        @Watch('dialog')
        dialogWatch(val) {
            val || this.close()
        }

        editItem(item) {
            this.editedIndex = this.sales.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        }

        async deleteItem(item) {
            const index = this.sales.indexOf(item)
            confirm('¿De verdad necesita eliminar la venta?') && await StrapiService.Strapi.axios.delete(`/sales/${item.id}`)
            await this.fetchAll();
        }

        close() {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        }
        get userID(){
            return Authentication.user._id;
        }

        async save() {
            if (this.editedIndex > -1) {
                const customers = await StrapiService.Strapi.axios.put(`/sales/${this.editedItem.id}/`,
                    {
                        contractNumber: this.editedItem.contractNumber,
                        car: this.editedItem.car,
                        customer: this.editedItem.customer,
                        user: this.editedItem.user.id,
                        exitDate: this.editedItem.exitDate,
                        entryDate: this.editedItem.entryDate,
                        priceForDay: this.editedItem.priceForDay,
                        notes: this.editedItem.notes,
                        entryKilometers: this.editedItem.entryKilometers,
                        exitKilometers: this.editedItem.entryKilometers,
                        kilometersTraveled: this.editedItem.kilometersTraveled,
                        finished: this.editedItem.finished,
                        extraHour: this.editedItem.extraHour,
                        dayPrice: this.editedItem.dayPrice,
                        haveAccidentInsurance: this.editedItem.haveAccidentInsurance,
                        haveCollisionInsurance: this.editedItem.haveCollisionInsurance,
                        haveDriver: this.editedItem.haveDriver,
                        driverName:  this.editedItem.driverName,
                        driverLicense: this.editedItem.driverLicense,
                        expirationLicenseDriverDate: this.editedItem.expirationLicenseDriverDate,
                        issuanceLicenseDriveDate: this.editedItem.issuanceLicenseDriveDate,
                        deposit: this.editedItem.deposit,
                        moneyAdvance: this.editedItem.moneyAdvance,
                        haveIVA: this.editedItem.haveIVA,
                        eighthsGasEntry: this.editedItem.eighthsGasEntry,
                        eighthsGasExit: this.editedItem.eighthsGasExit,
                        refunds: this.editedItem.refunds,
                        totalIVA: this.totalIVA,
                        totalExtraHour: this.totalExtraHour,
                        totalDays: this.totalDays,
                        totalInsurance: this.totalInsurance,
                        totalDriver: this.totalDriver,
                        total: this.total,
                        damage: this.editedItem.damage,
                        days: this.editedItem.days,
                        typeCard: this.editedItem.typeCard,
                        payment: this.editedItem.payment,
                        serie: this.editedItem.serie,

                    });
                await this.fetchAll();
            } else {
                const customers = await StrapiService.Strapi.axios.put(`/sales`,
                    {
                        contractNumber: this.editedItem.contractNumber,
                        car: this.editedItem.car.id,
                        customer: this.editedItem.customer.id,
                        user: this.editedItem.user,
                        exitDate: this.editedItem.exitDate,
                        entryDate: this.editedItem.entryDate,
                        priceForDay: this.editedItem.priceForDay,
                        notes: this.editedItem.notes,
                        entryKilometers: this.editedItem.entryKilometers,
                        exitKilometers: this.editedItem.entryKilometers,
                        kilometersTraveled: this.editedItem.kilometersTraveled,
                        finished: this.editedItem.finished,
                        extraHour: this.editedItem.extraHour,
                        dayPrice: this.editedItem.dayPrice,
                        haveAccidentInsurance: this.editedItem.haveAccidentInsurance,
                        haveCollisionInsurance: this.editedItem.haveCollisionInsurance,
                        haveDriver: this.editedItem.haveDriver,
                        driverName:  this.editedItem.driverName,
                        driverLicense: this.editedItem.driverLicense,
                        expirationLicenseDriverDate: this.editedItem.expirationLicenseDriverDate,
                        issuanceLicenseDriveDate: this.editedItem.issuanceLicenseDriveDate,
                        deposit: this.editedItem.deposit,
                        moneyAdvance: this.editedItem.moneyAdvance,
                        haveIVA: this.editedItem.haveIVA,
                        eighthsGasEntry: this.editedItem.eighthsGasEntry,
                        eighthsGasExit: this.editedItem.eighthsGasExit,
                        refunds: this.editedItem.refunds,
                        totalIVA: this.totalIVA,
                        totalExtraHour: this.totalExtraHour,
                        totalDays: this.totalDays,
                        totalInsurance: this.totalInsurance,
                        totalDriver: this.totalDriver,
                        total: this.total,
                        damage: this.editedItem.damage,
                        days: this.editedItem.days,
                        typeCard: this.editedItem.typeCard,
                        payment: this.editedItem.payment,
                        serie: this.editedItem.serie,
                    });
                await this.fetchAll();
            }
            this.close()
        }

    }
</script>

<style scoped lang="scss">

</style>