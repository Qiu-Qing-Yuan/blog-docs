import { ref, onMounted } from 'vue'

const serverURL = 'https://waline.anyfork.top/'

export interface SiteStats {
  totalViews: number
  totalComments: number
  recentComments: any[]
  loading: boolean
}

export const useStats = () => {
  const stats = ref<SiteStats>({
    totalViews: 0,
    totalComments: 0,
    recentComments: [],
    loading: true
  })

  const fetchStats = async () => {
    try {
      const [commentRes, articleRes] = await Promise.all([
        fetch(`${serverURL}api/comment?pageSize=5&sortBy=created`).catch(() => null),
        fetch(`${serverURL}api/article?pageSize=100`).catch(() => null)
      ])

      let totalComments = 0
      let recentComments: any[] = []
      if (commentRes?.ok) {
        const commentData = await commentRes.json()
        totalComments = commentData.count || 0
        recentComments = (commentData.data || []).slice(0, 3)
      }

      let totalViews = 0
      if (articleRes?.ok) {
        const articleData = await articleRes.json()
        const articles = articleData.data || articleData || []
        if (Array.isArray(articles)) {
          totalViews = articles.reduce((sum: number, a: any) => sum + (a.time || a.view || 0), 0)
        }
      }

      stats.value = { totalViews, totalComments, recentComments, loading: false }
    } catch {
      stats.value.loading = false
    }
  }

  onMounted(fetchStats)

  return { stats, refreshStats: fetchStats }
}
