<template>
  <v-container>
    <h3 class="text-center mb-4 grey--text">
      ALL AVAILABLE URLS
    </h3>
    <v-alert type="error" v-if="error">
      {{ error }}
    </v-alert>
    <v-row class="mb-6">
      <v-col cols="12" md="4" offset-md="8">
        <v-text-field
          label="Search"
          v-model="search"
          append-icon="mdi-magnify"
          @input="onSearch"
          clearable
        ></v-text-field>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="tableItems"
      :loading="loading"
    >
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

const MIN_CHARS_TO_SEARCH = 2;

export default {
  name: "list",
  head() {
    return {
      title: 'All Available URL',
    };
  },
  data() {
    return {
      search: null,
      searchResults: [],
      headers: [
        {
          text: 'Long Url',
          align: 'left',
          sortable: true,
          value: 'longUrl',
        },
        {
          text: 'Short Url',
          align: 'left',
          sortable: true,
          value: 'shortUrl',
        },
        {
          text: 'Clicks',
          align: 'left',
          sortable: true,
          value: 'clicks',
        },
        {
          text: 'Last Used',
          align: 'left',
          sortable: true,
          value: 'lastAccess',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      loading: 'url/getIsReady',
      urls: 'url/getUrls',
      error: 'url/getError',
    }),
    tableItems () {
      return (this.search && this.search.length > MIN_CHARS_TO_SEARCH) ? this.searchResults : this.urls;
    }
  },
  mounted() {
    this.$store.dispatch('url/fetchUrls');
  },
  methods: {
    onSearch () {
      if (this.search && this.search.length > MIN_CHARS_TO_SEARCH) {
        this.searchResults = this.urls.filter(url => {
          return url.longUrl.includes(this.search);
        });
      }
    }
  }
}
</script>
