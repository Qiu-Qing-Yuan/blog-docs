<template>
  <main>
    <client-only v-if="show">
      <LoadingPage></LoadingPage>
    </client-only>
    <div v-show="!show">
      <HomeHero />
      <div id="articles">
        <HomeBlog />
      </div>
      <HomeFooter />
    </div>
  </main>
</template>
<script setup lang="ts">
import HomeBlog from './HomeBlog.vue'
import HomeFooter from '@theme/HomeFooter.vue'
import HomeHero from './HomeHero.vue'
import { onMounted, ref } from 'vue'
const show = ref(true)
onMounted(() => {
  const firstLoad = Boolean(sessionStorage.getItem('firstLoad')) ? false : true
  if (firstLoad) {
    window.setTimeout(() => {
      show.value = false
      sessionStorage.setItem('firstLoad', 'false')
    }, 1000)
  } else {
    show.value = false
  }
})
</script>
