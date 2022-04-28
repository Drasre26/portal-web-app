<template>
  <div>
    <h2>Inscripción</h2>
    <hr />
    <v-container fluid>
      <v-row>
        <v-col cols="4">
          <v-subheader>Nombre:</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field label="Nombre"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-subheader>Apellido:</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field
            label="Apellido"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-subheader>Email:</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field
            label="Email"
            placeholder="adali@micorreo.com"
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
  </div>
</template>