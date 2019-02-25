<template>
    <div>
        <v-toolbar flat >
            <v-toolbar-title>Reparaciones</v-toolbar-title>
            <v-divider
                    class="mx-2"
                    inset
                    vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" color="primary" dark class="mb-2">Agrega una reparación</v-btn>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ editedItem.code ? `${editedItem.car.model} - ${editedItem.licensePlate}` : formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field
                                            v-model="editedItem.description"
                                            label="Descripción"
                                            v-validate="'required'"
                                            data-vv-name="description"
                                            :error-messages="errors.collect('description')"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="editedItem.provider" label="Proovedor"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model.number="editedItem.amount"
                                                  v-validate="'required'"
                                                  data-vv-name="amount"
                                                  :error-messages="errors.collect('amount')"
                                                  prefix="$" label="Monto"></v-text-field>

                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model.number="editedItem.km" label="KM"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
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
                                                label="Fecha"
                                                prepend-icon="event"
                                                readonly
                                        ></v-text-field>
                                        <v-date-picker v-model="editedItem.date"
                                                       @input="dateMenu = false"></v-date-picker>
                                    </v-menu>                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="editedItem.licensePlate" label="Placa"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-select
                                            v-model="editedItem.car.id"
                                            :items="cars"
                                            item-text="text"
                                            item-value="value"
                                            label="Escoga un Auto"
                                            v-validate="'required'"
                                            data-vv-name="select"
                                            :error-messages="errors.collect('select')"
                                            required
                                    ></v-select>
                                </v-flex>
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
                :items="fixes"
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td class="subheading">{{ props.item.id }}</td>
                <td class="text-sm-center subheading">{{ props.item.description }}</td>
                <td class="text-sm-center subheading">{{ props.item.provider }}</td>
                <td class="text-sm-center subheading">${{ props.item.amount }}</td>
                <td class="text-sm-center subheading">{{ props.item.km }}</td>
                <td class="text-sm-center subheading">{{ props.item.licensePlate }}</td>

                <td class="text-sm-center subheading">{{ props.item.date }}</td>
                <td class="text-sm-center subheading">{{ props.item.car.model }}</td>

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
                <h2>No hay datos disponible para mostrar</h2>
            </template>
        </v-data-table>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {Car, Fix} from "@/types";
    import StrapiService from '@/services/StrapiService'

    @Component({
        $_veeValidate: { validator: "new" }

    })
    export default class FixesPage extends Vue {
        public dialog: boolean = false;
        public cars: Car[] = [];

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

        public headers: Array<any> = [
            {
                text: 'ID',
                align: 'left',
                sortable: false,
                class: 'subheading',
                value: 'id'
            },
            {text: 'Description', class: 'subheading', value: 'description'},
            {text: 'Provider', class: 'subheading', value: 'provider'},
            {text: 'Monto', class: 'subheading', value: 'amount'},
            {text: 'km', class: 'subheading', value: 'km'},
            {text: 'Placa', class: 'subheading', value: 'licensePlate'},
            {text: 'Fecha', class: 'subheading', value: 'date'},
            {text: 'Carro', class: 'subheading', value: 'car'},

            {text: 'Actions', class: 'subheading', value: 'actions', sortable: false}
        ];
        public fixes: Array<Fix> = [] ;
        public dateMenu: boolean = false;
        public editedIndex: number = -1;
        public editedItem: Fix = {
            id: '',
            description: '',
            provider: '',
            amount: 0,
            km: 0,
            date: new Date().toISOString().substr(0, 10),
            licensePlate: '',
            car: {
                id: ''
            },
        };
        public defaultItem: Fix = {
            id: '',
            description: '',
            provider: '',
            amount: 0,
            licensePlate: '',
            km: 0,
            date: new Date().toISOString().substr(0, 10),
            car: {
                id: ''
            },
        };

        public get formTitle() {
            return this.editedIndex === -1 ? 'Nueva Reparación' : 'Editar Reparación'
        }


        @Watch('dialog')
        dialogWatch(val: any) {
            val || this.close()
        }

        async mounted(){
            await this.fetchCars();
            await this.fetchFixes();
        }

        async fetchFixes(){
            const responseFix = await StrapiService.Strapi.axios.get(`/fixes`);
            this.fixes = responseFix.data.map((fix: Fix) => {
                return {
                    ...fix,
                    date: fix.date.substr(0, 10)
                }
            })

        }

        async fetchCars(){
            const responseCars = await StrapiService.Strapi.axios.get(`/cars`);
            this.cars = responseCars.data.map((car: Car) => {
                return {
                    text: `${car.brand} ${car.model}`,
                    value: car.id
                }
            })
        }


        created() { }

        editItem(item:any) {
            this.editedIndex = this.fixes.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        }

        async deleteItem(item:any) {
            confirm('Quieres eliminar esta reparación?') && await StrapiService.Strapi.axios.delete(`/fixes/${item.id}`)
            await this.fetchCars();
            await this.fetchFixes();
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
            if (allowOK){
                if (this.editedIndex > -1) {
                    const fix = await StrapiService.Strapi.axios.put(`/fixes/${this.editedItem.id}`,
                        {
                            amount: this.editedItem.amount,
                            description: this.editedItem.description,
                            provider: this.editedItem.provider,
                            km: this.editedItem.km,
                            licensePlate: this.editedItem.licensePlate,
                            date: this.editedItem.date,
                            car: this.editedItem.car.id,
                        });
                    await this.fetchCars();
                    await this.fetchFixes();
                } else {
                    const fix = await StrapiService.Strapi.axios.post(`/fixes`,
                        {
                            amount: this.editedItem.amount,
                            description: this.editedItem.description,
                            provider: this.editedItem.provider,
                            km: this.editedItem.km,
                            licensePlate: this.editedItem.licensePlate,
                            date: this.editedItem.date,
                            car: this.editedItem.car.id,
                        });
                    await this.fetchCars();
                    await this.fetchFixes();
                }
                this.close()
            }
        }


    }
</script>

<style scoped lang="scss">

</style>