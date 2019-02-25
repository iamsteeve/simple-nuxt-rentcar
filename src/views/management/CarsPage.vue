<template>
    <div>
        <v-toolbar flat>
            <v-toolbar-title>Autos</v-toolbar-title>
            <v-divider
                    class="mx-2"
                    inset
                    vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" color="primary" dark class="mb-2">Agrega un Nuevo Auto</v-btn>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ editedItem.code ? editedItem.code : formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-form >
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field
                                                v-validate="'required'"
                                                data-vv-name="code"
                                                :error-messages="errors.collect('code')"
                                                v-model="editedItem.code"
                                                label="Codigo del Auto"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4 d-flex>
                                        <v-select
                                                v-model="editedItem.brand"
                                                :items="itemsBrand"
                                                item-text="text"
                                                item-value="value"
                                                v-validate="'required'"
                                                :error-messages="errors.collect('select')"
                                                data-vv-name="select"
                                                label="Marca"
                                                required
                                        ></v-select>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field
                                                v-model="editedItem.model"
                                                label="Modelo"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field
                                                v-model="editedItem.color"
                                                label="Color"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field
                                                v-model.number="editedItem.year"
                                                label="Año"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field
                                                v-model="editedItem.licensePlate"
                                                label="Placa"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field
                                                v-model.number="editedItem.price"
                                                prefix="$"
                                                v-validate="'required'"
                                                :error-messages="errors.collect('price')"
                                                data-vv-name="price"
                                                label="Precio"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex
                                            xs12
                                            md6
                                    >
                                        <v-checkbox
                                                v-model="editedItem.active"
                                                label="¿Quiere activarlo?"
                                        ></v-checkbox>

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
                :items="cars"
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td class="subheading">{{ props.item.code }}</td>
                <td class="text-sm-center subheading">{{ props.item.brand }}</td>
                <td class="text-sm-center subheading">{{ props.item.model }}</td>
                <td class="text-sm-center subheading">{{ props.item.color }}</td>
                <td class="text-sm-center subheading">{{ props.item.year }}</td>
                <td class="text-sm-center subheading">{{ props.item.licensePlate }}</td>
                <td class="text-sm-center subheading">${{ props.item.price }}</td>
                <td class="text-sm-center subheading">{{ props.item.active? 'Activo': 'Inactivo' }}</td>

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
                <h2>No hay datos disponibles</h2>
            </template>
        </v-data-table>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {Car} from "@/types";
    import strapiService from '@/services/StrapiService'

    @Component({
        $_veeValidate: { validator: "new" }
    })
    export default class CarsPage extends Vue {

        public dialog: boolean = false;
        public validForm: boolean = false;
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
                text: 'Código',
                align: 'left',
                sortable: false,
                class: 'subheading',
                value: 'code'
            },
            {text: 'Marca', class: 'subheading', value: 'brand'},
            {text: 'Modelo', class: 'subheading', value: 'model'},
            {text: 'Color', class: 'subheading', value: 'color'},
            {text: 'Año', class: 'subheading', value: 'year'},
            {text: 'Placas', class: 'subheading', value: 'licensePlate'},
            {text: 'Precio', class: 'subheading', value: 'price'},
            {text: 'Status', class: 'subheading', value: 'active'},
            {text: 'Actions', class: 'subheading', value: 'actions', sortable: false}
        ];
        public itemsBrand: any[] = [
            {text: 'Audi', value: 'Audi'},
            {text: 'Jeep', value: 'Jeep'},
            {text: 'Wrangler', value: 'Wrangler'},
            {text: 'Chevrolet', value: 'Chevrolet'},
            {text: 'Mercedez', value: 'Mercedez'},
            {text: 'Ford', value: 'Ford'},
            {text: 'Nissan', value: 'Nissan'},
            {text: 'VW', value: 'VW'},
            {text: 'Fiat', value: 'Fiat'},
            {text: 'Honda', value: 'Honda'},
            {text: 'Dodge', value: 'Dodge'},
            {text: 'Renault', value: 'Renault'},
            {text: 'Toyota', value: 'Toyota'},
            {text: 'Otra', value: 'Otra'}
        ];
        public cars: Array<Car> = [];
        public editedIndex: number = -1;
        public editedItem: Car = {
            id: '',
            code: '',
            brand: '',
            model: '',
            color: '',
            year: new Date().getFullYear(),
            licensePlate: '',
            price: 0.0,
            active: false,
        };
        public defaultItem: Car = {
            id: '',
            code: '',
            brand: '',
            model: '',
            color: '',
            year: new Date().getFullYear(),
            licensePlate: '',
            price: 0.0,
            active: false,
        }

        public get formTitle() {
            return this.editedIndex === -1 ? 'Nuevo Auto' : 'Editar Auto'
        }

        async mounted() {
            await this.fetchCars();
        }

        async fetchCars(){
            try {
                const response = await strapiService.Strapi.axios.get(`/cars`);
                this.cars = response.data as Car[];
            } catch (e) {
                console.log(e.message);
            }
        }


        @Watch('dialog')
        dialogWatch(val: any) {
            val || this.close()
        }

        async created() {
        }


        async editItem(item:any) {
            this.editedIndex = this.cars.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true
        }

        async deleteItem(item:any) {
            console.log(this.cars.indexOf(item));
            confirm('Realmente desea eliminar el automovil?') && await strapiService.Strapi.axios.delete(`/cars/${item.id}`)
            await this.fetchCars();
        }

        close() {
            this.dialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1
            }, 300)
        }

        async save() {
            const allowOk = await this.$validator.validateAll();
            if (allowOk){
                if (this.editedIndex > -1) {
                    const car = await strapiService.Strapi.axios.put(`/cars/${this.editedItem.id}`,
                        {
                            code: this.editedItem.code,
                            brand: this.editedItem.brand,
                            model: this.editedItem.model,
                            color: this.editedItem.color,
                            year: this.editedItem.year,
                            licensePlate: this.editedItem.licensePlate,
                            price: this.editedItem.price,
                            active: this.editedItem.active
                        });
                    await this.fetchCars();
                } else {
                    const car = await strapiService.Strapi.axios.post(`/cars`,
                        {
                            code: this.editedItem.code,
                            brand: this.editedItem.brand,
                            model: this.editedItem.model,
                            color: this.editedItem.color,
                            year: this.editedItem.year,
                            licensePlate: this.editedItem.licensePlate,
                            price: this.editedItem.price,
                            active: this.editedItem.active

                        });
                    await this.fetchCars();
                }
                this.close()
            }
        }


    }
</script>

<style scoped lang="scss">

</style>