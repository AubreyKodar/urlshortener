<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col md="6" cols="12" class="text-center">
        <v-form ref="formGenerate" lazy-validation :disabled="loading">
          <h3 class="mb-8">URL SHORTENER</h3>
          <v-alert
            type="error"
            class="text-left"
            v-if="error"
          >
            {{ error }}
          </v-alert>
          <v-text-field
            label="Long URL"
            class="mb-8"
            v-model="url"
            validate-on-blur
            :rules="validationRules.url"
            clearable
            @click:clear="onClearUrlField"
          ></v-text-field>
          <v-btn
            class="secondary"
            to="/list"
            :disabled="loading"
          >
            <v-icon left>mdi-eye</v-icon>
            View URL List
          </v-btn>
          <v-btn
            class="primary"
            :loading="loading"
            left
            @click="onGenerateUrl"
          >
            <v-icon small>mdi-link-variant</v-icon>
            Generate Short URL
          </v-btn>
        </v-form>
        <v-row class="mt-12 grey white--text short-url-container" v-if="shortUrl">
          <v-col cols="12">
            <div class="short-url-content">
              <pre>{{ shortUrl }}</pre>
            </div>
            <div class="short-url-btn text-right">
              <v-btn
                small
                class="pr-0 mr-0"
                text
                @click="copyToClipBoard"
              >
                <v-icon right color="white">mdi-content-copy</v-icon>
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
      title: 'Shorten URL',
    }
  },
  data () {
    return {
      url: null,
      shortUrl: null,
      loading: false,
      error: null,
      validationRules: {
        url: [
          v => !!v || 'URL field cannot be empty',
        ],
      },
      snackBar: {
        show: false,
        text: 'Url Copied',
      }
    }
  },
  methods: {
    async onGenerateUrl() {
      if (this.$refs.formGenerate.validate()) {
        this.loading = true;

        try {
          const shortUrl = await this.$api.shortUrl.createShortUrl(this.url);
          this.shortUrl = shortUrl.url;
        } catch (e) {
          this.error = e.message;
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
.short-url-container {
  border-radius: 10px;
}

.short-url-content {
  width: 80%;
  float: left
}

.short-url-btn {
  width: 20%;
  float: left
}
</style>
