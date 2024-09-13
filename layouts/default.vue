<template>
  <div class="container">
    <header>
      <p class="text text-1">Welcome</p>
    </header>
    <main>
      <NuxtPage />
    </main>
    <footer>
      <p class="text text-2">to horse race</p>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.container {
    position: relative;
    width: 100vw;
    height: 100vh;
    color: white !important;
    header {
        background: red;
    }
    footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        display: block;
        background: red;
    }
}
.text {
    font-family: 'arial black';
	font-size: 60px;
	text-align: center;
	padding: 0;
	margin: 0;
	opacity: 0;
}
.text-1{
	animation: slide-in-anim 1.5s ease-out forwards;
}

@keyframes slide-in-anim {
	20% {
		opacity: 0;
	}
	60% {
		transform: translateX(-100%);
	}
	75% {
		transform: translateX(-50%);
	}
    85% {
		transform: translateX(5%);
	}
	100% {
		opacity: 1;
		transform: translateX(0%);
	}
}
.text-2{
	animation: slide-in-anim-2 1.5s ease-out forwards;
}

@keyframes slide-in-anim-2 {
	20% {
		opacity: 0;
	}
	60% {
		transform: translateX(100%);
	}
	75% {
		transform: translateX(50%);
	}
	85% {
		transform: translateX(-5%);
	}
	100% {
		opacity: 1;
		transform: translateX(0%);
	}
}

</style>
