import { ref, computed } from 'vue'

export interface TimelineItem {
  hash: string
  date: string
  time: string
  icon: string
  title: string
  description: string
  files: string[]
}

export interface TimelineData {
  site: TimelineItem[]
  post: TimelineItem[]
  taxonomy: TimelineItem[]
  settings: TimelineItem[]
}

export type TimelineTab = 'site' | 'post' | 'taxonomy' | 'settings'

interface YearGroup {
  year: string
  items: TimelineItem[]
}

function groupByYear(items: TimelineItem[]): YearGroup[] {
  const map = new Map<string, TimelineItem[]>()
  for (const item of items) {
    const year = item.date.slice(0, 4)
    if (!map.has(year)) map.set(year, [])
    map.get(year)!.push(item)
  }
  return Array.from(map.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([year, items]) => ({ year, items }))
}

export const useTimeline = () => {
  const data = ref<TimelineData>({ site: [], post: [], taxonomy: [], settings: [] })
  const loading = ref(true)
  const activeTab = ref<TimelineTab>('site')

  const loadTimeline = async () => {
    try {
      const res = await fetch('/blog-docs/_temp/timeline.json')
      if (res.ok) {
        const json = await res.json()
        data.value = {
          site: json.site || [],
          post: json.post || [],
          taxonomy: json.taxonomy || [],
          settings: json.settings || [],
        }
      }
    } catch (e) {
      console.warn('Failed to load timeline data:', e)
    } finally {
      loading.value = false
    }
  }

  const siteTimeline = computed(() => groupByYear(data.value.site))
  const postTimeline = computed(() => groupByYear(data.value.post))
  const taxonomyTimeline = computed(() => groupByYear(data.value.taxonomy))
  const settingsTimeline = computed(() => groupByYear(data.value.settings))

  const timelineMap = computed(() => ({
    site: siteTimeline.value,
    post: postTimeline.value,
    taxonomy: taxonomyTimeline.value,
    settings: settingsTimeline.value,
  }))

  const currentTimeline = computed(() => timelineMap.value[activeTab.value])

  loadTimeline()

  return {
    data,
    loading,
    activeTab,
    siteTimeline,
    postTimeline,
    taxonomyTimeline,
    settingsTimeline,
    currentTimeline,
    refresh: loadTimeline
  }
}
