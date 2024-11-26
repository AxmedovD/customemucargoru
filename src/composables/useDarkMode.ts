import { ref, onMounted, watch } from 'vue'

const isDarkMode = ref(true) // Set dark mode as default

export function useDarkMode() {
  onMounted(() => {
    const darkMode = localStorage.getItem('darkMode')
    isDarkMode.value = darkMode === null ? true : darkMode === 'true'
    updateTheme()
  })

  watch(isDarkMode, () => {
    localStorage.setItem('darkMode', isDarkMode.value.toString())
    updateTheme()
  })

  const updateTheme = () => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
  }

  return {
    isDarkMode,
    toggleDarkMode
  }
}