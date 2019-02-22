<template>
  <section class="clientes">
    <v-content>
      <v-container fluid grid-list-md text-xs-center >
        <v-layout row wrap>

          <v-flex xs12>
            <h1 style="padding-bottom: .5em">
              Estadísticas actuales
            </h1>
            <h3 style="padding-bottom: 1em">
              Bienvenido {{username}}
            </h3>
          </v-flex>

          <v-flex xs12 sm6 md4>
            <v-card color="teal" class="white--text">
              <v-layout>
                <v-flex xs4>
                  <v-icon style="font-size: 90px" color="white">person</v-icon>
                </v-flex>
                <v-flex xs8>
                  <v-card-title primary-title>
                    <div>
                      <div class="title">Clientes</div>
                      <div class="headline">{{stats.totalCustomers}}</div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                Ir a Clientes
                <v-btn router to="/customers" flat icon dark >
                  <v-icon>directions</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-card color="green darken-3" class="white--text">
              <v-layout>
                <v-flex xs4>
                  <v-icon style="font-size: 90px">person_add</v-icon>
                </v-flex>
                <v-flex xs8>
                  <v-card-title primary-title>
                    <div>
                      <div class="title">Ventas</div>
                      <div class="headline">{{stats.totalSales}}</div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-spacer></v-spacer>
                Ir a Ventas
                <v-btn router to="/sales" flat icon dark >
                  <v-icon>directions</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-card color="orange darken-1" class="white--text">
              <v-layout>
                <v-flex xs4>
                  <v-icon color="white" style="font-size: 90px">payment</v-icon>
                </v-flex>
                <v-flex xs8>
                  <v-card-title primary-title>
                    <div>
                      <div class="title" >Reservaciones</div>
                      <div class="headline">{{stats.totalReservations}}</div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-spacer></v-spacer>
                Ir a Reservaciones
                <v-btn router to="/reservations" flat icon dark >
                  <v-icon>directions</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

export interface Stats {
  totalCustomers: number;
  totalSales: number;
  totalReservations: number;
}

@Component
export default class Home extends Vue {
  stats: Stats = {
    totalCustomers: 1,
    totalReservations: 2,
    totalSales: 3
  }
  username: string = 'Steeve'
}
</script>

<style scoped lang="scss">
  .title {
    font-family: 'Dosis', sans-serif!important;
  }
  .headline {
    font-family: 'Dosis', sans-serif!important;
  }
</style>