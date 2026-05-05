<template>
  <footer class="footer-wrapper mt-[40px] py-[30px] text-center border-t border-t-[color:rgba(0,0,0,0.06)] dark:border-t-[color:rgba(255,255,255,0.06)]">
    <div class="max-w-[900px] mx-auto px-[15px]">
      <!-- 社交链接 -->
      <div class="flex justify-center gap-[20px] mb-[16px]">
        <a v-for="(item, index) in socialLinks" :key="index" :href="item.link" target="_blank" class="inline-flex items-center justify-center w-[36px] h-[36px] rounded-full bg-[#f0f0f0] dark:bg-[#2a2a3a] text-[#666] dark:text-[#ccc] transition-all duration-300 hover:bg-[#3eaf7c] hover:text-[#fff] hover:scale-110 hover:shadow-md">
          <Icon :icon="item.icon" :iconSize="18" />
        </a>
      </div>
      <!-- 版权信息 -->
      <div class="flex flex-wrap justify-center items-center gap-[16px] text-[13px] text-[#999]">
        <Icon icon="SafetyCertificateOutlined" link="https://beian.miit.gov.cn/" target="_blank" text="陕ICP备2022010303号-1" :textSize="13" class="hover:text-[#3eaf7c] transition-colors duration-200" />
        <span class="hidden sm:inline text-[#ddd] dark:text-[#444]">|</span>
        <Icon icon="CopyrightCircleOutlined" text="游履平生 2022" :textSize="13" />
        <span class="hidden sm:inline text-[#ddd] dark:text-[#444]">|</span>
        <Icon icon="FireOutlined" class="text-[13px]">
          <span class="waline-pageview-count" data-path="/" style="padding-left: 5px"></span>
        </Icon>
      </div>
      <!-- Powered by -->
      <div class="mt-[12px] text-[12px] text-[#ccc] dark:text-[#555]">
        Powered by VuePress & Theme AnyFork
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { useCount } from '../composables'
import { useThemeData } from '@vuepress/plugin-theme-data/lib/client'

interface ThemeData {
  socialLinks?: Array<{ icon: string; link: string }>;
  [key: string]: any;
}

const themeData = useThemeData() as unknown as ThemeData
const socialLinks = themeData.value?.socialLinks || []
useCount()
</script>
