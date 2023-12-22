import dayjs from 'dayjs'

export const formatDate = (timestamp: string, format = 'YYYY-MM-DD HH:mm') =>
  dayjs(timestamp).format(format)
