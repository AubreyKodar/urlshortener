<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col md="4" cols="12" class="text-center">
        <v-form ref="fromGenerate" lazy-validation :disabled="loading">
          <h3 class="mb-8">URL Shortener</h3>
          <v-text-field
            label="URL"
            class="mb-8"
            v-model="url"
            validate-on-blur
            :rules="validationRules.url"
            clearable
            @click:clear="onClearUrlField"
          ></v-text-field>
          <v-btn
            class="primary"
            :loading="loading"
            left
            @click="onGenerateUrl"
          >
            <v-icon small>mdi-link-variant</v-icon>
            Generate
          </v-btn>
        </v-form>
        <v-row class="mt-12 grey white--text">
          <v-col cols="12">
            <div style="width: 80%; float: left">
              <pre>{{ shortUrl }}</pre>
            </div>
            <div style="width: 20%; float: left">
              <v-btn
                small
                class="white"
                :rounded="false"
                @click="copyToClipBoard"
              >
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
              <v-snackbar
                absolute
                tile
                v-model="snackBar.show"
              >
                {{ snackBar.text }}
              </v-snackbar>
            </div>
          </v-col>
        </v-row>
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
      shortUrl: null,
      loading: false,
      validationRules: {
        url: [
          v => !!v || 'Url field cannot be empty',
        ],
      },
      snackBar: {
        show: false,
        text: 'Url copied',
      }
    }
  },
  methods: {
    async onGenerateUrl() {
      if (this.$refs.fromGenerate.validate()) {
        this.loading = true;

        try {
          const shortUrl = await this.$api.shortUrl.createShortUrl(this.url);
          this.shortUrl = shortUrl.url;
        } catch (e) {
          console.log(e);
        } finally {
          this.loading = false;
        }
      }
    },
    copyToClipBoard() {
      navigator.clipboard.writeText(this.shortUrl);
      this.snackBar.show = true;

      setTimeout(() => {
        this.snackBar.show = false;
      }, 1000)
    },
    onClearUrlField() {
      this.shortUrl = null;
    }
  }
}
</script>

<style>

</style>
