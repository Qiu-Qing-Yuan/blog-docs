<template>
  <ParentLayout>
    <template #page>
      <main class="page h-screen">
        <div class="mt-[40px] sm:w-[var(--content-width)] my-0 relative ul-item mx-[15px] sm:mx-auto">
          <h3 class="title relative pl-[1.6rem] text-[1.4rem] font-[600]">
            <span class="bg-gradient-to-r from-[#3eaf7c] to-[#2d8cf0] bg-clip-text text-transparent">时间轴</span>
          </h3>
          <ul class="relative mt-[50px]">
            <li v-for="(item, index) in timelineData" :key="index" class="leading-[50px]">
              <h3 class="point relative text-[1.2rem] font-[600] text-[#333] dark:text-[#eee]">
                <span class="year-badge inline-block px-[12px] py-[2px] rounded-full bg-gradient-to-r from-[#3eaf7c] to-[#2d8cf0] text-[#fff] text-[0.9rem] ml-[-4px]">{{ item.year }}</span>
              </h3>
              <ul class="pl-0">
                <li v-for="{ info, path } in item.value" class="relative leading-[50px] transition-all duration-200 hover:pl-[8px]">
                  <span class="point mr-[10px] text-[13px] text-[#999]">{{ dateFormat(info.data.frontmatter.date) }}</span>
                  <span class="hover:text-[#3eaf7c] cursor-pointer text-[14px] transition-colors duration-200" @click="$router.push(path)">{{ info.data.title }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </main>
    </template>
  </ParentLayout>
</template>
<script setup lang="ts">
import { useBlogType } from 'vuepress-plugin-blog2/lib/client'
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import { computed } from 'vue'
import { dateFormat } from '../utils'
const timelines = useBlogType('timeline')
interface TimelineYearGroup {
  year: string;
  value: Array<any>;
}

const timelineData = computed<TimelineYearGroup[]>(() => {
  const items = timelines.value.items
  const objData: Record<string, Array<any>> = {}
  const objArray: TimelineYearGroup[] = []
  items.forEach((item: any) => {
    const date = item.info.data.frontmatter?.date
    if (date) {
      const year = dateFormat(date, 'year')
      objData[year] ? objData[year].push(item) : (objData[year] = [item])
    }
  })
  Object.keys(objData).forEach((item) => {
    objArray.unshift({ year: item, value: objData[item] })
  })
  return objArray
})
</script>
<style lang="css" scoped>
ul {
  list-style: none;
}
li {
  border-bottom: 1px dashed rgba(0, 0, 0, 0.06);
}
.dark li {
  border-bottom: 1px dashed rgba(255, 255, 255, 0.06);
}
.ul-item::after {
  content: ' ';
  position: absolute;
  top: 14px;
  left: 0;
  z-index: -1;
  margin-left: -2px;
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, #3eaf7c, #2d8cf0, transparent);
}
.title:before {
  content: ' ';
  position: absolute;
  z-index: 2;
  top: 50%;
  margin-left: -6px;
  margin-top: -4px;
  width: 10px;
  height: 10px;
  background: #3eaf7c;
  border: 2px solid #fff;
  border-radius: 50%;
  left: 0px;
  box-shadow: 0 0 0 3px rgba(62, 175, 124, 0.2);
}
.point::before {
  content: ' ';
  position: absolute;
  z-index: 2;
  left: -20px;
  top: 50%;
  margin-left: -4px;
  margin-top: -4px;
  width: 8px;
  height: 8px;
  background: #fff;
  border: 2px solid #3eaf7c;
  border-radius: 50%;
  transition: all 0.2s ease;
}
li:hover .point::before {
  background: #3eaf7c;
  box-shadow: 0 0 0 4px rgba(62, 175, 124, 0.15);
}
</style>
