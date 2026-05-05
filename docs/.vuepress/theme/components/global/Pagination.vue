<template>
  <div class="pagination-wrapper w-full py-[16px]" v-if="pageTotal > pageSize">
    <!-- 分页按钮 -->
    <div class="flex items-center justify-center">
      <Paginate v-model="currentPageNumber" :page-count="pageCount" :prev-text="prevText" :next-text="nextText" :container-class="'pagination'" :page-class="'page-item'" :page-range="3" :margin-pages="2" :hide-prev-next="false" />
    </div>
    <!-- 辅助信息 -->
    <div class="pagination-meta flex items-center justify-center flex-wrap gap-[12px] mt-[14px] text-[12px]">
      <!-- 总数 -->
      <span class="text-[#94a3b8]">共 <span class="font-[600] text-[#475569] dark:text-[#94a3b8] tabular-nums">{{ props.pageTotal }}</span> 条</span>
      <span class="w-px h-[12px] bg-[#e2e8f0] dark:bg-[rgba(255,255,255,0.08)]"></span>
      <!-- 每页条数 -->
      <span class="inline-flex items-center gap-[4px] text-[#94a3b8] whitespace-nowrap">
        <span>每页</span>
        <select v-model="currentPageSize" class="pagination-select bg-[#f8fafb] dark:bg-[#1a1e2e] border border-[#e2e8f0] dark:border-[rgba(255,255,255,0.08)] rounded-[6px] px-[6px] py-[2px] text-[12px] text-[#475569] dark:text-[#94a3b8] outline-none cursor-pointer focus:border-[#2c7a5a] transition-colors w-[48px]">
          <option :value="10">10</option>
          <option :value="15">15</option>
          <option :value="20">20</option>
        </select>
        <span>条</span>
      </span>
      <span class="w-px h-[12px] bg-[#e2e8f0] dark:bg-[rgba(255,255,255,0.08)]"></span>
      <!-- 跳页 -->
      <span class="inline-flex items-center gap-[4px] text-[#94a3b8] whitespace-nowrap">
        <span>跳至</span>
        <input type="text" v-model="jumpPageNumber" class="pagination-input w-[36px] h-[22px] bg-[#f8fafb] dark:bg-[#1a1e2e] border border-[#e2e8f0] dark:border-[rgba(255,255,255,0.08)] rounded-[6px] px-[6px] text-[12px] text-center text-[#475569] dark:text-[#94a3b8] outline-none focus:border-[#2c7a5a] transition-colors tabular-nums" />
        <span>页</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Paginate from 'vuejs-paginate-next'
import { isMobile } from '../../utils'

const props = withDefaults(
  defineProps<{
    pageTotal: number
    pageSize?: number
    pageNumber?: number
  }>(),
  { pageSize: 10, pageNumber: 1 }
)

const emit = defineEmits<{
  (e: 'click', value: { page: number; pageSize: number }): void
}>()

const currentPageNumber = ref(props.pageNumber)
const currentPageSize = ref(props.pageSize)

watch(
  () => props.pageNumber,
  (v) => {
    if (v !== currentPageNumber.value) currentPageNumber.value = v
  }
)
watch(
  () => props.pageSize,
  (v) => {
    if (v !== currentPageSize.value) currentPageSize.value = v
  }
)

const prevText = computed(() => (isMobile.value ? '‹' : '‹ 上一页'))
const nextText = computed(() => (isMobile.value ? '›' : '下一页 ›'))

const pageCount = computed(() => Math.ceil(props.pageTotal / currentPageSize.value))

const jumpPageNumber = ref<undefined | string>(undefined)

watch(jumpPageNumber, (newVal) => {
  if (newVal) {
    const num = parseInt(newVal)
    if (num > 0 && num <= pageCount.value) {
      currentPageNumber.value = num
      emit('click', { page: num, pageSize: currentPageSize.value })
    }
  }
})

watch(currentPageNumber, (newVal) => {
  if (newVal + '' !== jumpPageNumber.value) jumpPageNumber.value = undefined
  emit('click', { page: newVal, pageSize: currentPageSize.value })
})

watch(currentPageSize, (newVal) => {
  currentPageNumber.value = 1
  emit('click', { page: 1, pageSize: newVal })
})
</script>

<style lang="css">
/* ─── 分页器容器 ─── */
.pagination {
  display: inline-flex;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
  gap: 6px;
  line-height: 1;
}

/* ─── 分页项 ─── */
.page-item {
  list-style: none;
}

.page-item a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 34px;
  height: 34px;
  padding: 0 10px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  color: #64748b;
  background: #fff;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  user-select: none;
  outline: none;
}

.page-item a:hover {
  color: #2c7a5a;
  border-color: rgba(44, 122, 90, 0.3);
  background: rgba(44, 122, 90, 0.04);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(44, 122, 90, 0.1);
}

/* ─── 激活态 ─── */
.page-item.active a {
  color: #fff;
  background: linear-gradient(135deg, #2c7a5a, #3eaf7c);
  border-color: transparent;
  box-shadow: 0 2px 12px rgba(44, 122, 90, 0.25);
  font-weight: 600;
}

.page-item.active a:hover {
  transform: none;
  box-shadow: 0 4px 16px rgba(44, 122, 90, 0.3);
}

/* ─── 禁用态 ─── */
.page-item.disabled a {
  color: #cbd5e1;
  background: #f8fafb;
  border-color: #f1f5f9;
  cursor: not-allowed;
  pointer-events: none;
}

/* ─── 上一页/下一页 ─── */
.page-item:first-child a,
.page-item:last-child a {
  font-size: 12px;
  color: #94a3b8;
  border-color: transparent;
  background: transparent;
  padding: 0 8px;
}

.page-item:first-child a:hover,
.page-item:last-child a:hover {
  color: #2c7a5a;
  background: rgba(44, 122, 90, 0.04);
  border-color: transparent;
  box-shadow: none;
  transform: none;
}

.page-item.disabled:first-child a,
.page-item.disabled:last-child a {
  color: #e2e8f0;
  background: transparent;
  border-color: transparent;
}

/* ─── 省略号 ─── */
.page-item.disabled:not(:first-child):not(:last-child) a {
  border-color: transparent;
  background: transparent;
  color: #94a3b8;
  cursor: default;
  pointer-events: none;
}

/* ─── 暗色模式 ─── */
.dark .page-item a {
  color: #94a3b8;
  background: #1a1e2e;
  border-color: rgba(255, 255, 255, 0.06);
}

.dark .page-item a:hover {
  color: #4eca8a;
  border-color: rgba(78, 202, 138, 0.2);
  background: rgba(78, 202, 138, 0.06);
  box-shadow: 0 2px 8px rgba(78, 202, 138, 0.08);
}

.dark .page-item.active a {
  color: #fff;
  background: linear-gradient(135deg, #2c7a5a, #3eaf7c);
  box-shadow: 0 2px 12px rgba(44, 122, 90, 0.3);
}

.dark .page-item.disabled a {
  color: #334155;
  background: #0f1117;
  border-color: rgba(255, 255, 255, 0.03);
}

.dark .page-item:first-child a,
.dark .page-item:last-child a {
  background: transparent;
  border-color: transparent;
}

.dark .page-item:first-child a:hover,
.dark .page-item:last-child a:hover {
  color: #4eca8a;
  background: rgba(78, 202, 138, 0.06);
}

.dark .page-item.disabled:first-child a,
.dark .page-item.disabled:last-child a {
  color: #1e293b;
  background: transparent;
  border-color: transparent;
}

/* ─── 移动端 ─── */
@media (max-width: 640px) {
  .page-item a {
    min-width: 30px;
    height: 30px;
    font-size: 12px;
    border-radius: 8px;
    padding: 0 6px;
  }
}
</style>
