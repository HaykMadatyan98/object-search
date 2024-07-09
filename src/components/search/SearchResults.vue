<template>
  <div>
    <table class="table-auto w-full">
      <thead>
        <tr>
          <th class="px-4 py-2">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(obj, index) in filteredObjects" :key="index">
          <td class="border px-4 py-2">
            <router-link :to="'/profile/' + obj.id">{{ obj.name }}</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { defineProps } from 'vue'
import { objects } from '@/data/objects.js'

const props = defineProps({
  query: String
})

const filteredObjects = computed(() => {
  if (typeof props.query !== 'string') {
    return []
  }
  return objects.filter(obj =>
    obj.name.toLowerCase().includes(props.query.toLowerCase())
  )
})
</script>

<style scoped>
</style>
