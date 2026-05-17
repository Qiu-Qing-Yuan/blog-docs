<template>
  <footer class="footer-wrapper mt-[32px]">
    <div class="max-w-[900px] mx-auto px-[20px] pb-[24px]">
      <!-- 顶部渐变分隔 -->
      <div class="h-px bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent mb-[16px]"></div>

      <!-- 主体内容 -->
      <div class="flex flex-col items-center gap-[14px] py-[10px]">
        <!-- 站点信息 -->
        <div class="flex flex-col items-center gap-[6px]">
          <span class="text-[15px] font-serif font-[700] tracking-tight text-[#1a1a2e] dark:text-[#e2e0da]">沉潜</span>
          <span class="text-[12px] text-[#9494a8] tracking-wider">AI / ML / NLP / CV</span>
        </div>

        <!-- 社交链接 -->
        <div class="flex items-center gap-[10px]">
          <a v-for="(item, index) in socialLinks" :key="index" :href="item.link" target="_blank" class="inline-flex items-center justify-center w-[32px] h-[32px] rounded-[8px] text-[#9494a8] dark:text-[#5a5a72] transition-all duration-300 hover:text-[#1a5c3a] dark:hover:text-[#4eca8a] hover:bg-[rgba(26,92,58,0.06)] dark:hover:bg-[rgba(78,202,138,0.06)]">
            <Icon :icon="item.icon" :iconSize="16" />
          </a>
        </div>
      </div>

      <!-- 底部信息栏 -->
      <div class="flex flex-wrap justify-center items-center gap-[6px] pt-[16px] border-t border-[var(--border-subtle)]">
        <span class="text-[11px] text-[#b0b0c0] dark:text-[#475569]">
          <Icon icon="CopyrightCircleOutlined" :iconSize="11" class="opacity-40" /> {{ currentYear }} 沉潜
        </span>
        <span class="text-[#d0d0dd] dark:text-[#2a2e3e] text-[10px]">&#183;</span>
        <span class="inline-flex items-center text-[11px] text-[#b0b0c0] dark:text-[#475569]">
          <Icon icon="FireOutlined" :iconSize="11" class="opacity-30">
            <span class="waline-pageview-count" data-path="/blog-docs/" style="padding-left: 3px; font-size: 11px;"></span>
          </Icon>
        </span>
        <span class="text-[#d0d0dd] dark:text-[#2a2e3e] text-[10px]">&#183;</span>
        <span class="text-[11px] text-[#b0b0c0] dark:text-[#475569]">Powered by VuePress</span>
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

const currentYear = new Date().getFullYear()
</script>
