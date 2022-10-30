<script lang="ts">
	import { beforeNavigate, goto, prefetch } from '$app/navigation';

	import { page } from '$app/stores';
	import BackToTop from '$lib/components/BackToTop.svelte';
	import GotoDown from '$lib/components/GotoDown.svelte';
	import { historyChapter, historyKomik } from '$lib/stores/history';
	import type { PageData } from './$types';
	import Reading from '$lib/components/Reading.svelte';
	import DoubleClickToScroll from '$lib/components/DoubleClickToScroll.svelte';
	import { chapterImagesStore, chapterLink } from '$lib/stores/image-caches';
	export let data: PageData;
	let preloadImages: string[] = [];
	$: {
		data.item.chapterImages;
		for (let i = 0; i < 3; i++) {
			preloadImages[preloadImages.length] = data.item.chapterImages[i];
		}
	}
	if ($page.url.toString() == $chapterLink) {
		data.item.chapterImages = $chapterImagesStore;
	} else {
		$chapterLink = $page.url.toString();
		$chapterImagesStore = data.item.chapterImages;
	}

	async function save() {
		const historyData = {
			title: data.item.title,
			server: data.server,
			id: data.showLink,
			link: $page.url.toString()
		};
		$historyKomik = [
			historyData,
			...$historyKomik.filter((history) => history.id != data.showLink)
		];
		$historyChapter = [
			historyData,
			...$historyChapter.filter((history) => history.id != data.server + data.item.title)
		];
	}

	async function reload() {
		goto(window.location.href, { noscroll: true });
	}
	save();
</script>

<svelte:head>
	<title>{data.item.title}</title>
	{#each preloadImages as image}
		<link rel="preload" as="image" href={image} />
	{/each}
</svelte:head>

<!-- Recreate element when value key is change -->
{#key $page.url.toString()}
	<GotoDown />
	<BackToTop />
	<DoubleClickToScroll>
		<div class="mb-[30vh]">
			<Reading value={data.item} server={data.server} />
		</div>
	</DoubleClickToScroll>
	<div id="reload" on:click={reload}>Reload</div>
{/key}

<style>
	#reload {
		@apply rounded py-2 px-4 cursor-pointer;
		opacity: 1;
		transition: opacity 0.5s, visibility 0.5s;
		position: fixed;
		z-index: 99;
		right: 20px;
		user-select: none;
		bottom: 80px;
		color: white;
		background-color: black;
	}
</style>
