<template>
  <div class="horse-container">
    <h1>Horse List (1-20)</h1>
    <div class="horse-wrapper" v-if="horses.length > 0">
    <div class="head item">
        <span>Name</span>
        <span>Color</span>
        <span>Condition</span>
    </div>
      <div class="item" v-for="horse in horses" :key="horse.id">
        <span>{{ horse.name }}</span>
        <span :style="{ background: horse.color}"></span>
        <span>{{ horse.condition }}</span>
      </div>
    </div>
    <p v-else>No horses available</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useHorseStore } from '@/stores/useHorseStore'
import {makeColor} from '@/utils/makeColor'
const horseStore = useHorseStore()

const { horses } = storeToRefs(horseStore)

onMounted(() => {
  horseStore.fetchHorses()
})
</script>

<style lang="scss" scoped>
.horse-container {
width: 100%;
overflow-x: scroll;
.horse-wrapper {
    .item {
        display: flex;
        margin: 5px 0px !important;
        span {
            flex : 1;
            padding: 1px !important;
            text-align: center;
        }
    }
}
.head {
    font-weight: bold;
    margin: 20px 0px;
    padding: 10px 0px;
    background: lightgray;
    border-radius: 20px;
}
}
</style>