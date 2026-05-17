<template>
  <div class="clustrmaps-wrapper">
    <div id="clustrmaps-container" ref="containerRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const containerRef = ref<HTMLElement>()

onMounted(() => {
  if (!containerRef.value) return
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.id = 'clstr_globe'
  script.src = '//clustrmaps.com/globe.js?d=xaLFRosMd2LLRVA2g74tEvag4y60V9ZTGTb99yXFlW0'
  containerRef.value.appendChild(script)
})
</script>

<style scoped>
.clustrmaps-wrapper {
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: center;
  border-radius: var(--radius-md, 10px);
  overflow: hidden;
}

#clustrmaps-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
