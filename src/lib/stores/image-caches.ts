import { writable } from "svelte-local-storage-store";

export let chapterLink = writable('image-cache.chapter-link', '')
export let chapterImagesStore = writable<string[]>('image-cache.chapter-images', [])