import { computed, reactive } from 'vue'

interface PaginationOptions<T> {
  dataSource: T[] | (() => T[])
  defaultPageSize?: number
}

export function usePagination<T>(options: PaginationOptions<T>) {
  const getData = typeof options.dataSource === 'function'
    ? options.dataSource
    : () => options.dataSource

  const pages = reactive({
    pageTotal: 0,
    pageNumber: 1,
    pageSize: options.defaultPageSize || 10
  })

  const paginatedData = computed(() => {
    const data = getData()
    pages.pageTotal = data.length
    return data.slice(
      (pages.pageNumber - 1) * pages.pageSize,
      pages.pageNumber * pages.pageSize
    )
  })

  const onPageChange = (value: { page: number; pageSize: number }) => {
    pages.pageNumber = value.page
    pages.pageSize = value.pageSize
  }

  return { pages, paginatedData, onPageChange }
}
