<template>
  <ParentLayout>
    <template #page>
      <main class="page min-h-screen">
        <div class="max-w-[800px] mx-auto px-[20px] py-[40px]">
          <!-- 标题 -->
          <div class="text-center mb-[40px]">
            <h1 class="text-[2rem] font-[700] font-serif tracking-tight">
              <span class="bg-gradient-to-r from-[#1a5c3a] to-[#2d8cf0] bg-clip-text text-transparent">更新时间轴</span>
            </h1>
            <p class="mt-[8px] text-[14px] text-[#9494a8]">记录网站与文章的每一次变化</p>
          </div>

          <!-- Tab 切换 -->
          <div class="flex justify-center mb-[36px]">
            <div class="inline-flex bg-[var(--surface-muted)] rounded-[12px] p-[4px] border border-[var(--border-subtle)]">
              <button
                @click="activeTab = 'site'"
                :class="[
                  'px-[24px] py-[8px] rounded-[10px] text-[13px] font-[600] transition-all duration-300',
                  activeTab === 'site'
                    ? 'bg-[#1a5c3a] text-white shadow-md'
                    : 'text-[#5a5a72] dark:text-[#9494a8] hover:text-[#1a5c3a]'
                ]"
              >
                🛠️ 网站更新
                <span v-if="data.site.length" class="ml-[6px] text-[11px] opacity-70">({{ data.site.length }})</span>
              </button>
              <button
                @click="activeTab = 'post'"
                :class="[
                  'px-[24px] py-[8px] rounded-[10px] text-[13px] font-[600] transition-all duration-300',
                  activeTab === 'post'
                    ? 'bg-[#2d8cf0] text-white shadow-md'
                    : 'text-[#5a5a72] dark:text-[#9494a8] hover:text-[#2d8cf0]'
                ]"
              >
                📄 文章更新
                <span v-if="data.post.length" class="ml-[6px] text-[11px] opacity-70">({{ data.post.length }})</span>
              </button>
            </div>
          </div>

          <!-- 加载状态 -->
          <div v-if="loading" class="text-center py-[60px]">
            <div class="inline-block w-[32px] h-[32px] border-[3px] border-[#e8e8e8] border-t-[#1a5c3a] rounded-full animate-spin"></div>
            <p class="mt-[12px] text-[13px] text-[#9494a8]">加载中...</p>
          </div>

          <!-- 时间轴内容 -->
          <div v-else-if="currentTimeline.length" class="relative">
            <!-- 连接线 -->
            <div class="absolute left-[18px] top-0 bottom-0 w-[2px] bg-gradient-to-b"
              :class="activeTab === 'site'
                ? 'from-[#1a5c3a] via-[#1a5c3a]/30 to-transparent'
                : 'from-[#2d8cf0] via-[#2d8cf0]/30 to-transparent'"
            ></div>

            <!-- 年份分组 -->
            <div v-for="group in currentTimeline" :key="group.year" class="mb-[32px]">
              <!-- 年份标签 -->
              <div class="relative flex items-center mb-[20px] pl-[44px]">
                <div class="absolute left-[10px] w-[18px] h-[18px] rounded-full border-[3px] border-white dark:border-[#161822] shadow-md z-10"
                  :class="activeTab === 'site' ? 'bg-[#1a5c3a]' : 'bg-[#2d8cf0]'"
                ></div>
                <span class="text-[1.3rem] font-[700] font-serif tracking-tight"
                  :class="activeTab === 'site' ? 'text-[#1a5c3a] dark:text-[#4eca8a]' : 'text-[#2d8cf0]'"
                >
                  {{ group.year }}
                </span>
                <span class="ml-[10px] text-[12px] text-[#9494a8] font-mono">{{ group.items.length }} 条更新</span>
              </div>

              <!-- 更新条目 -->
              <div v-for="(item, idx) in group.items" :key="idx"
                class="relative pl-[44px] mb-[16px] group"
              >
                <!-- 圆点 -->
                <div class="absolute left-[14px] top-[14px] w-[10px] h-[10px] rounded-full border-[2px] bg-white dark:bg-[#161822] z-10 transition-all duration-300 group-hover:scale-125"
                  :class="activeTab === 'site' ? 'border-[#1a5c3a] group-hover:bg-[#1a5c3a]' : 'border-[#2d8cf0] group-hover:bg-[#2d8cf0]'"
                ></div>

                <!-- 卡片 -->
                <div class="bg-white dark:bg-[#1a1d2e] rounded-[12px] p-[16px] border border-[var(--border-subtle)] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-[2px]">
                  <!-- 头部：日期 + 图标 -->
                  <div class="flex items-center justify-between mb-[8px]">
                    <div class="flex items-center gap-[8px]">
                      <span class="text-[16px]">{{ item.icon }}</span>
                      <span class="text-[12px] text-[#9494a8] font-mono">{{ item.date }}</span>
                      <span v-if="item.time" class="text-[11px] text-[#bbb] font-mono">{{ item.time }}</span>
                    </div>
                    <span class="text-[11px] text-[#9494a8] font-mono bg-[var(--surface-muted)] px-[6px] py-[2px] rounded-[4px]">{{ item.hash }}</span>
                  </div>

                  <!-- 标题 -->
                  <h3 class="text-[14px] font-[600] text-[#1a1a2e] dark:text-[#e2e0da] mb-[6px] leading-[1.5]">
                    {{ item.title }}
                  </h3>

                  <!-- 描述（如果与标题不同） -->
                  <p v-if="item.description !== item.title" class="text-[13px] text-[#5a5a72] dark:text-[#9494a8] mb-[8px] leading-[1.6]">
                    {{ item.description }}
                  </p>

                  <!-- 修改的文件 -->
                  <div v-if="item.files.length" class="flex flex-wrap gap-[4px] mt-[8px]">
                    <span v-for="(file, fi) in item.files" :key="fi"
                      class="inline-block text-[10px] text-[#9494a8] bg-[var(--surface-muted)] px-[6px] py-[2px] rounded-[4px] font-mono max-w-[200px] truncate"
                    >
                      {{ file }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 空状态 -->
          <div v-else class="text-center py-[60px]">
            <p class="text-[48px] mb-[12px]">{{ activeTab === 'site' ? '🛠️' : '📄' }}</p>
            <p class="text-[14px] text-[#9494a8]">暂无{{ activeTab === 'site' ? '网站' : '文章' }}更新记录</p>
          </div>
        </div>
      </main>
    </template>
  </ParentLayout>
</template>

<script setup lang="ts">
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import { useTimeline } from '../composables/useTimeline'

const { data, loading, activeTab, currentTimeline } = useTimeline()
</script>
