<template>
  <div>
    <SearchBar @onSearch="onSearch" />
    <SearchResults :query="query" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SearchBar from '@/components/search/SearchBar.vue'
import SearchResults from '@/components/search/SearchResults.vue'

const query = ref('')

const onSearch = (newQuery) => {
  query.value = newQuery
}

</script>

<style scoped>
</style>
