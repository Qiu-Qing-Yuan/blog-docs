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
            <div class="inline-flex flex-wrap justify-center bg-[var(--surface-muted)] rounded-[12px] p-[4px] border border-[var(--border-subtle)] gap-[2px]">
              <button
                v-for="tab in tabs"
                :key="tab.key"
                @click="activeTab = tab.key"
                :class="[
                  'px-[18px] py-[8px] rounded-[10px] text-[13px] font-[600] transition-all duration-300 whitespace-nowrap',
                  activeTab === tab.key
                    ? `text-white shadow-md ${tab.activeClass}`
                    : 'text-[#5a5a72] dark:text-[#9494a8] hover:opacity-80'
                ]"
              >
                {{ tab.icon }} {{ tab.label }}
                <span v-if="data[tab.key].length" class="ml-[4px] text-[11px] opacity-70">({{ data[tab.key].length }})</span>
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
              :class="activeColor.line"
            ></div>

            <!-- 年份分组 -->
            <div v-for="group in currentTimeline" :key="group.year" class="mb-[32px]">
              <!-- 年份标签 -->
              <div class="relative flex items-center mb-[20px] pl-[44px]">
                <div class="absolute left-[10px] w-[18px] h-[18px] rounded-full border-[3px] border-white dark:border-[#161822] shadow-md z-10"
                  :class="activeColor.dot"
                ></div>
                <span class="text-[1.3rem] font-[700] font-serif tracking-tight"
                  :class="activeColor.text"
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
                  :class="[activeColor.border, activeColor.hoverBg]"
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
            <p class="text-[48px] mb-[12px]">{{ activeTabInfo.icon }}</p>
            <p class="text-[14px] text-[#9494a8]">暂无{{ activeTabInfo.emptyText }}更新记录</p>
          </div>
        </div>
      </main>
    </template>
  </ParentLayout>
</template>

<script setup lang="ts">
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import { useTimeline, type TimelineTab } from '../composables/useTimeline'
import { computed } from 'vue'

const { data, loading, activeTab, currentTimeline } = useTimeline()

const tabs: { key: TimelineTab; icon: string; label: string; activeClass: string }[] = [
  { key: 'site', icon: '🛠️', label: '网站更新', activeClass: 'bg-[#1a5c3a]' },
  { key: 'post', icon: '📄', label: '文章更新', activeClass: 'bg-[#2d8cf0]' },
  { key: 'taxonomy', icon: '🏷️', label: '分类标签', activeClass: 'bg-[#c9963b]' },
  { key: 'settings', icon: '⚙️', label: '站点设置', activeClass: 'bg-[#a371f7]' },
]

const colorMap: Record<TimelineTab, { line: string; dot: string; text: string; border: string; hoverBg: string }> = {
  site: {
    line: 'from-[#1a5c3a] via-[#1a5c3a]/30 to-transparent',
    dot: 'bg-[#1a5c3a]',
    text: 'text-[#1a5c3a] dark:text-[#4eca8a]',
    border: 'border-[#1a5c3a]',
    hoverBg: 'group-hover:bg-[#1a5c3a]',
  },
  post: {
    line: 'from-[#2d8cf0] via-[#2d8cf0]/30 to-transparent',
    dot: 'bg-[#2d8cf0]',
    text: 'text-[#2d8cf0]',
    border: 'border-[#2d8cf0]',
    hoverBg: 'group-hover:bg-[#2d8cf0]',
  },
  taxonomy: {
    line: 'from-[#c9963b] via-[#c9963b]/30 to-transparent',
    dot: 'bg-[#c9963b]',
    text: 'text-[#c9963b]',
    border: 'border-[#c9963b]',
    hoverBg: 'group-hover:bg-[#c9963b]',
  },
  settings: {
    line: 'from-[#a371f7] via-[#a371f7]/30 to-transparent',
    dot: 'bg-[#a371f7]',
    text: 'text-[#a371f7]',
    border: 'border-[#a371f7]',
    hoverBg: 'group-hover:bg-[#a371f7]',
  },
}

const emptyTextMap: Record<TimelineTab, string> = {
  site: '网站',
  post: '文章',
  taxonomy: '分类标签',
  settings: '站点设置',
}

const activeColor = computed(() => colorMap[activeTab.value])
const activeTabInfo = computed(() => ({
  icon: tabs.find(t => t.key === activeTab.value)?.icon || '📌',
  emptyText: emptyTextMap[activeTab.value],
}))
</script>
