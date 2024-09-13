<template>
  <div class="head">
    <span>
      Horse Racing
    </span>
    <div class="btns">
      <button :style="{background: !isGenarated ? 'green' : 'pink' , cursor :!isGenarated ? 'pointer' : 'help'}" :disabled="isGenarated" class="btn" @click="generateProgram"> Generate Program </button>
      <button :style="{background: resetBtn ? 'green' : 'pink' , cursor : resetBtn ? 'pointer' : 'help'}"  :disabled="!resetBtn" @click="startStop" class="btn"> Start /Stop </button>
      <button :style="{background: resetBtn ? 'green' : 'pink' , cursor : resetBtn ? 'pointer' : 'help'}"  :disabled="!resetBtn" @click="resetProgram" class="btn"> Reset </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHorseStore } from '@/stores/useHorseStore'

const horseStore = useHorseStore()
const isGenarated = computed(() => horseStore.isGenarated)
const resetBtn = computed(() => horseStore.resetProgram)
const generateProgram = () => {
  horseStore.runIsGenarated()
  horseStore.generateRunHorses()
  horseStore.changeResetProgramVal()
}

const startStop = () => {
  horseStore.changePlayState()
}
const resetProgram = () => {
  window.location.reload()
}

</script>

<style lang="scss" scoped>
.head {
  display: flex;
  justify-content: space-between;
  background: lightgray;
  padding: 10px !important; 
  border-radius: 10px;
  align-items: center;
  color: white;
}
.btns {
  display: flex;
  gap: 10px;
}
</style>
