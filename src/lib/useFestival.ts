import { useSyncExternalStore } from 'react'
import { FESTIVAL, daysUntil, isFestivalLive } from './festival'

// The date does not change while a page is open, so there is nothing to subscribe to.
const subscribe = () => () => {}

/** Whether the offers should be on screen. The prerendered HTML and the first
 *  browser render follow the config so they agree; after that the date check
 *  takes over and hides the offers once the season is over. */
export function useFestivalLive(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => isFestivalLive(),
    () => FESTIVAL.enabled,
  )
}

/** Days left until the given day, or null in the prerendered HTML / after the day has passed. */
export function useDaysLeft(iso: string): number | null {
  return useSyncExternalStore(
    subscribe,
    () => {
      const days = daysUntil(iso)
      return days >= 0 ? days : null
    },
    () => null,
  )
}

export function daysLeftLabel(days: number, what: string): string {
  if (days === 0) return `${what} is today`
  return `${days} ${days === 1 ? 'day' : 'days'} to ${what}`
}
