import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const dateFormat = (date: string, type?: string): string => {
  const d = dayjs.tz(date, 'Asia/Shanghai')
  return type === 'year' ? d.format('YYYY') : d.format('M-D')
}
