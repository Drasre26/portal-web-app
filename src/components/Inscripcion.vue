<template>
  <div id="inscripcion">
    <br />
    <v-sheet color="white" rounded="lg" class="mx-2 px-3">
      <v-row>
        <v-col cols="6">
          <h2>Inscripción</h2>
          <v-container fluid>
            <v-row>
              <v-col cols="4">
                <v-subheader>Prefix for dollar currency</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  label="Amount"
                  value="10.00"
                  prefix="$"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-subheader>Suffix for weight</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  label="Weight"
                  value="28.00"
                  suffix="lbs"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-subheader>Suffix for email domain</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  label="Email address"
                  value="example"
                  suffix="@gmail.com"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-subheader>Suffix for time zone</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  label="Label Text"
                  value="12:30:00"
                  type="time"
                  suffix="PST"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-divider
      class="mx-4"
      vertical
    ></v-divider>
        <v-col cols="5">
            
          <v-card class="mx-auto" max-width="400">
            <v-img
              class="white--text align-end"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
              <v-card-title>Top 10 Australian beaches</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0"> Number 10 </v-card-subtitle>

            <v-card-text class="text--primary">
              <div>Whitehaven Beach</div>

              <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text> Share </v-btn>

              <v-btn color="orange" text> Explore </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>