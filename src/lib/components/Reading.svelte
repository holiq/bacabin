<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import ChapterPrevNext from '$lib/components/ChapterPrevNext.svelte';

	import type { ReadChapter } from '$lib/scraper/BaseKomik/interfaces';
	import { useLazyImage } from 'svelte-lazy-image';
	export let value: ReadChapter;
	export let server: string;

	$: prev = value.prev ? `/${server}/read/${value.prev}` : null;
	$: next = value.next ? `/${server}/read/${value.next}` : null;
	$: chapterList = value.showLink ? `/${server}/${value.showLink}` : null;
	let images: { img: string; cache: boolean }[] = [];
	// $: images = value.chapterImages;
	const promiseTimeout = (ms: number, promise: any, timeoutMessage: string | null = null) => {
		let timerID: any;

		const timer = new Promise((resolve, reject) => {
			timerID = setTimeout(() => reject(timeoutMessage), ms);
		});

		return Promise.race([promise, timer]).then((result) => {
			clearTimeout(timerID);

			return result;
		});
	};
	const imageComplete = (imageURL: string) =>
		new Promise((resolve, reject) => {
			let image = new Image();
			image.onload = () => resolve(image);
			image.onerror = () => reject(image);

			image.src = imageURL;
		});
	let isRunning = false;
	$: if (browser && isRunning === false) {
		(async () => {
			isRunning = true;
			for (const image of value.chapterImages) {
				try {
					await promiseTimeout(50, imageComplete(image), 'Not loaded from cache');
					images[images.length] = { img: image, cache: true };
					console.log('Loaded From Cache', image);
				} catch (error) {
					images[images.length] = { img: image, cache: false };
					console.log(error, image);
				}
			}
		})();
	}
</script>

<div>
	<div class="content">
		<div class="text-center">
			<h1>{value.title}</h1>
		</div>
		<ChapterPrevNext {prev} {next} {chapterList} />
	</div>
	<div class="flex flex-col justify-center items-center">
		{#each images as image, i}
			{#if image.cache}
				<img use:useLazyImage src={image.img} alt={value.title + ' ' + (i + 1)} loading="lazy" />
			{:else}
				<img
					use:useLazyImage
					data-src={image.img}
					src="/loading.gif"
					alt={value.title + ' ' + (i + 1)}
					loading="lazy"
				/>
			{/if}

			<!-- <img src={imageLink} loading="lazy" /> -->
		{/each}
	</div>

	<div class="content">
		<ChapterPrevNext {prev} {next} {chapterList} />
	</div>

	<div class="text-center">
		<h1>{value.title}</h1>
	</div>
</div>
<!-- <Divider variant="solid" weight={2} orientation="h" class="my-10" /> -->
