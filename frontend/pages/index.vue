<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col md="4" cols="12" class="text-center">
        <v-form ref="fromGenerate" lazy-validation>
          <h3 class="mb-8">URL Shortener</h3>
          <v-text-field
            label="URL"
            class="mb-8"
            v-model="url"
            validate-on-blur
            :rules="validationRules.url"
          ></v-text-field>
          <v-btn
            class="primary"
            left
            @click="onGenerateUrl"
          >
            <v-icon small>mdi-link-variant</v-icon>
            Generate
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  head() {
    return {
      title: 'Home',
    }
  },
  data () {
    return {
      url: null,
      validationRules: {
        url: [
          v => !!v || 'Url field cannot be empty',
        ],
      }
    }
  },
  methods: {
    onGenerateUrl() {
      if (this.$refs.fromGenerate.validate()) {

      }
    },
  }
}
</script>
