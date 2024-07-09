<template>
    <div ref="searchBar" class="relative w-96 mx-auto mt-5">
      <div class="flex items-center border-b border-teal-500 py-2">
        <input
          class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          v-model="query"
          @input="debouncedOnInput"
          @keydown.down="onArrowDown"
          @keydown.up="onArrowUp"
          @keydown.enter="onEnter"
          placeholder="Введите название объекта"
        />
        <button
          class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
        >
          <svg
            class="fill-current w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M12.9 14.32a8 8 0 111.414-1.414l5.387 5.387-1.414 1.414-5.387-5.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
            />
          </svg>
        </button>
      </div>
      <ul
        v-if="suggestions.length"
        class="absolute border bg-white w-full mt-1 overflow-y-auto z-10"
      >
        <li
          v-for="(suggestion, index) in suggestions"
          :key="index"
          :class="{
            'bg-gray-200': index === activeSuggestion,
            'bg-white': index !== activeSuggestion
          }"
          class="p-2 cursor-pointer hover:bg-gray-200"
          @click="selectSuggestion(index)"
        >
          {{ suggestion.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, watch, defineEmits } from 'vue'
  import { useRouter } from 'vue-router'
  import { objects } from '@/data/objects.js'
  
  const query = ref('')
  const suggestions = ref([])
  const activeSuggestion = ref(-1)
  const searchBar = ref(null)
  const emit = defineEmits(['onSearch'])
  const router = useRouter()
  
  const onInput = () => {
    if (query.value.length >= 3) {
      emit('onSearch', query.value)
      suggestions.value = objects.filter(obj =>
        obj.name.toLowerCase().includes(query.value.toLowerCase())
      ).slice(0, 10)
    } else {
      suggestions.value = []
    }
    activeSuggestion.value = -1
  }
  
  const onArrowDown = () => {
    if (activeSuggestion.value < suggestions.value.length - 1) {
      activeSuggestion.value++
    }
  }
  
  const onArrowUp = () => {
    if (activeSuggestion.value > 0) {
      activeSuggestion.value--
    }
  }
  
  const onEnter = () => {
    if (activeSuggestion.value >= 0) {
      selectSuggestion(activeSuggestion.value)
    }
  }
  
  const selectSuggestion = (index) => {
    router.push(suggestions.value[index].profile)
  }
  
  const handleClickOutside = (event) => {
    if (searchBar.value && !searchBar.value.contains(event.target)) {
      suggestions.value = []
    }
  }
  
  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })
  
  watch(query, () => {
    activeSuggestion.value = -1
  })
  
  const debounce = (func, wait) => {
    let timeout
    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait)
    }
  }
  
  const debouncedOnInput = debounce(onInput, 300)
  </script>
  
  <style scoped>
  </style>
  