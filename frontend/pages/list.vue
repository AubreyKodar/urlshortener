<template>
  <v-container>
    <h3 class="text-center mb-4">Url List</h3>
    <v-row class="mb-6">
      <v-col cols="12" md="4" offset-md="8">
        <v-text-field
          label="Search"
          v-model="search"
          prepend-icon="mdi-magnify"
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
  data() {
    return {
      search: null,
      searchResults: [],
      headers: [
        {
          text: 'Long Url',
          align: 'left',
          sortable: false,
          value: 'longUrl',
        },
        {
          text: 'Short Url',
          align: 'left',
          sortable: false,
          value: 'shortUrl',
        },
        {
          text: 'Clicks',
          align: 'left',
          sortable: false,
          value: 'clicks',
        },
        {
          text: 'Last Used',
          align: 'left',
          sortable: false,
          value: 'lastAccess',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      loading: 'url/getIsReady',
      urls: 'url/getUrls'
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
