<template>
  <div class="container">
    <div class="start">
        <button @click="navigateFunc"> Start </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { count, increment } = useCounter()
const router = useRouter()


const navigateFunc = () : void =>  {
    router.push('/horsetrack')
}
</script>

<style scoped lang="scss">
.container {
    color :black !important;
    display: grid;
    place-items: center;
    height: 100%;
    .start {
        display: flex;
        gap: 30px;
        font-size: 50px;
        margin-top: 10% !important;
        
        button {
            padding: 20px 40px !important;
            background: red;
            border: none;
            border-radius: 27px;
            color: white;
        }
    }
}
</style>