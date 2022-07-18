<template>
  <nav>
    <h1 @click="goToHomePage">TV SHOWS</h1>
  </nav>
  <router-view/>
</template>

<script setup lang="ts">
import router from './router';

const goToHomePage = () => {
      router.push('/')

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #192837;
}

nav {
  padding-top: 30px;
}
h1{
  font-size: xx-large;
  cursor: pointer;
}
</style>
