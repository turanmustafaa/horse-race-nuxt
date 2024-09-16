<template>
  <section class="container-wrapper">
    <div class="wrapper-item">
      <h1>Program</h1>
      <div v-for="(race, index) in programList" :key="index" class="race list">
        <h2>Lap {{ index + 1 }}</h2>
         <h3> {{ 1000 + (index + 1) * 200 }} m</h3>
        <div class="item">
          <div class="head">
            <span>Name /Color</span>
            <span>Condition</span>
          </div>
          <div class="body" v-for="horse in race" :key="horse.id">
                 <span :style="{ background: horse.color}"> {{horse.name}} </span> 
                 <span>{{ horse.condition }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper-item">
      <h1>Winners</h1>
      <div v-for="(winner, index) in totalWinnerList" :key="index" class="winner list">
        <h2>Lap {{ index + 1 }} Winners</h2>
         <h3> {{ 1000 + (index + 1) * 200 }} m</h3>
         <div class="item">
          <div class="head">
            <span>Position</span>
            <span>Name /Color</span>
            <span>Condition</span>
            <span>LapTime</span>
          </div>
          <div class="body" v-for="(horse,index) in winner" :key="horse.id">
                 <span>{{ index + 1  }}</span>
                 <span :style="{ background: horse.color}"> {{horse.name}} </span> 
                 <span>{{ horse.condition }}</span>
                 <span>{{ horse.lapTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useHorseStore } from '@/stores/useHorseStore';

const horseStore = useHorseStore();
const programList = computed(() => horseStore.programList);
const totalWinnerList = computed(() => horseStore.totalWinnerList);
const currentLap = computed(() => horseStore.currentLap)
const laps = computed(() => horseStore.laps)
</script>

<style lang="scss" scoped>
.container-wrapper {
  display: flex;
  flex-direction: row;
  font-size: 12px;
  height: 100%;
  flex-wrap: nowrap;
  
    .wrapper-item {
        margin: 20px !important;
    }
  & > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    gap: 20px;

    span {
        display: block;
        text-align: center;
    }
  }

  .list {
    margin-bottom: 20px;
    .item {
        & > div {
          display: flex; 
          flex-direction: row;
          gap: px;
          align-items: center;
        }
        .head {
            font-weight: 600;
            font-size: 14px;
            display: flex;
            gap: 20px;
        }
        .body {
            padding: 5px 0px !important;
            span {
                text-align: center;
                flex: 1;
                padding: 5px !important;
            }
        }
    }
  }

  .winner {
    margin-bottom: 20px;
  }
  .item {
    display: flex;
flex-direction: column;
flex-wrap: nowrap;
font-size: 10px;
    span {
      margin: 5px 0px;
    }
  }
  h2, h3 {
    margin-bottom: 10px !important;
  }
}
</style>
