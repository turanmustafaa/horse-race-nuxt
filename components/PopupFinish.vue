<template>
  <div v-if="isFinish" class="popup-overlay">
    <div class="popup-content">
      <h2>Winner!</h2>
      <div v-if="winner">
        <p><strong>Name:</strong> {{ winner.name }}</p>
        <p>
          <strong>Color:</strong>
          <span :style="{ background: winner.color }">{{ winner.color }}</span>
        </p>
        <p><strong>Lap Time:</strong> {{ winner.lapTime }} seconds</p>
      </div>
      <button @click="closePopup">Restart</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useHorseStore } from "@/stores/useHorseStore";

const horseStore = useHorseStore();
const isFinish = computed(() => horseStore.isFinish);
const winner = computed(() => {
  return horseStore.totalRunnedHorses.sort((a, b) => a.lapTime - b.lapTime)[0];
});
const closePopup = () => {
  window.location.reload();
};
</script>

<style scoped lang="scss">
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;

  .popup-content {
    width: 50%;
    height: 50%;
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;

    button {
      padding: 10px 20px !important;
      background: green;
      width: 200px;
      border-radius: 30px;
      border: none;
      color: white;
    }
    & > div {
      display: flex;
      flex-direction: column;
      gap: 10px;

      & > p:nth-child(2) {
        span {
          display: inline-block;
          width: 100px;
          height: 30px;
          border-radius: 10px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
