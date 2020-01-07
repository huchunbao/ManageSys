import defaultSettings from '@/settings'

const title = defaultSettings.title || 'galasys managesys'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
