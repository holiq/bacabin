import type { Komik } from '$lib/scraper/BaseKomik'
import { writable } from 'svelte-local-storage-store'

export type Bookmark = Komik & {
    server: string,
    serverLocation: string
}
export let bookmarks = writable<{[i:string]: Bookmark}>('bookmarks', {})