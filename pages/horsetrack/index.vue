<template>
  <section class="container">
    <div class="wrapper">
      <div>
        <header-top />
      </div>
      <div class="content">
        <div>
          <horse-list />
        </div>
        <div :style="{ minWidth: lengthVal + 100 + 'px !important' }">
          <track-area />
        </div>
        <div>
          <result-comp />
        </div>
      </div>
    </div>
    <popup-finish />
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "horsetrack",
});
import { computed } from 'vue'
import { useHorseStore } from '@/stores/useHorseStore'

const horseStore = useHorseStore()
const lengthVal = computed(() => horseStore.laps[horseStore.laps.length - 1])

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  margin-top: 20px !important;
  .wrapper {
    width: 90%;
  }
  .content {
    display: flex;
    flex-direction: row;
     & > div:nth-child(1) {
      flex: 2;
      min-width: 300px;
      }
     & > div:nth-child(2) {
      flex: 3;
      }
     & > div:nth-child(3) {
      flex: 2;
      max-height: 600px;
      overflow-y: scroll;
      }
  }
}
</style>
