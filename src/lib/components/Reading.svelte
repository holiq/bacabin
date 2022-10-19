<script lang="ts">
	import ChapterPrevNext from '$lib/components/ChapterPrevNext.svelte';
	import { refererImage } from '$lib/mirrorimage';

	import type { ReadChapter } from '$lib/scraper/BaseKomik/interfaces';
	import { lazyimage } from 'svelte-lazyimage-cache';
	export let value: ReadChapter;
	export let server: string;

	$: prev = value.prev ? `/${server}/read/${value.prev}` : null;
	$: next = value.next ? `/${server}/read/${value.next}` : null;
	$: chapterList = value.showLink ? `/${server}/${value.showLink}` : null;
	$: chapterImages = value.chapterImages;
	function onError(index: number) {
		return (el: any) => {
			setTimeout(() => {
				const target = new URL(chapterImages[index]);
				if (target.searchParams.has('url') && target.searchParams.has('referer')) {
					let url = target.searchParams.get('url') || '';
					let referer = target.searchParams.get('referer') || '';
					chapterImages[index] = refererImage(url, referer);
					console.log('new chap', chapterImages[index]);
				} else {
					target.searchParams.set('time', Date.now().toString());
					chapterImages[index] = target.toString();
				}
				// @ts-ignore
				el.target.src = chapterImages[index];
			}, 2000);
		};
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
		{#each chapterImages as image, i}
			<img
				use:lazyimage
				data-src={image}
				on:error={onError(i)}
				src="/placeholder.png"
				alt={value.title + ' ' + (i + 1)}
				loading="lazy"
			/>
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
