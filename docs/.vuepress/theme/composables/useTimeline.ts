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
}

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
  const data = ref<TimelineData>({ site: [], post: [] })
  const loading = ref(true)
  const activeTab = ref<'site' | 'post'>('site')

  const loadTimeline = async () => {
    try {
      const res = await fetch('/blog-docs/_temp/timeline.json')
      if (res.ok) {
        data.value = await res.json()
      }
    } catch (e) {
      console.warn('Failed to load timeline data:', e)
    } finally {
      loading.value = false
    }
  }

  const siteTimeline = computed(() => groupByYear(data.value.site))
  const postTimeline = computed(() => groupByYear(data.value.post))
  const currentTimeline = computed(() =>
    activeTab.value === 'site' ? siteTimeline.value : postTimeline.value
  )

  loadTimeline()

  return {
    data,
    loading,
    activeTab,
    siteTimeline,
    postTimeline,
    currentTimeline,
    refresh: loadTimeline
  }
}
