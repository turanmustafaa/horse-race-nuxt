<template>
  <div>
    <h1>Track Area</h1>
    <div v-if="runHorses.length > 0">
      <div v-for="horse in runHorses" :key="horse.id" class="track" :style="{width : lengthVal + 50 + 'px !important' }">
        <img @load="runFunc(horse, $event)" 
        class="horse"
             :src="horseGif" 
             :alt="horse.name" 
             :style="{borderBottom : `10px solid ${horse.color}` ,padding : '10px !important', transform : 'translateX(' + horse.position + 'px)'}"
              />
             <hr style="width : 100%">
      </div>
      <div class="lap"> 
        <span>Lap {{ currentLap + 1 }} / {{ laps.length }} - {{ 1000 + (currentLap + 1) * 200 }} m</span>
      </div>
    </div>
    <p v-else>No horses selected for the race</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHorseStore } from '@/stores/useHorseStore'
import type IHorse from '@/types/IHorse'

const horseGif = '/gifs/horse.gif'

const horseStore = useHorseStore()
const runHorses = computed(() => horseStore.$state.runHorses)
const playState = computed(() => horseStore.$state.playState)
const currentLap = computed(() => horseStore.currentLap)
const laps = computed(() => horseStore.laps)
const lengthVal = computed(() => horseStore.laps[horseStore.currentLap])
const runFunc = (horse: IHorse, e: any) => {
  const horseInner = e.target as HTMLElement;
    const interval = setInterval(() => {
        horseStore.updateHorsePosition(horse.id)

        // if(currentLap.value == 2){
        //     clearInterval(interval)
        // }
    },300)
};

</script>

<style scoped lang="scss">
.track {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 200px !important;
}

img {
  width: 50px;
  animation-name: run;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  transition: .5s ease all;
}
.lap {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px !important;

    span {
        font-size: 32px;
        padding: 10px 20px !important;
        border-radius: 27px;
        background: black;
        color : white;
        display: inline-block;
    }
}
</style>
