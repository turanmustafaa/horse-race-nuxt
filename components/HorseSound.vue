<template>
  <div>
    <audio ref="backgroundMusic" src="/gifs/horse-sound.wav" loop></audio>

    <audio ref="specialMusic" src="/gifs/special.mp3" loop></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useHorseStore } from '@/stores/useHorseStore'

const horseStore = useHorseStore()
const backgroundMusic = ref<HTMLAudioElement | null>(null)
const specialMusic = ref<HTMLAudioElement | null>(null)

watch(() => horseStore.playState, (newVal) => {
  if (newVal) {
    backgroundMusic.value?.play() 
  } else {
    backgroundMusic.value?.pause()
    specialMusic.value?.pause()
  }
})

watch(() => horseStore.runHorses, (newVal) => {
  const hasSpecialHorse = newVal.some(horse => horse.name === 'Sahbatur' || horse.name === 'Gulbatur')
  if (hasSpecialHorse && horseStore.playState) {
    specialMusic.value?.play()
  } else {
    specialMusic.value?.pause()
  }
}, { deep: true })
</script>
