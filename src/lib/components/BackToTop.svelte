<script>
	export let showOnPx = 200;
	let hidden = true;

	function goTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function scrollContainer() {
		return document.documentElement || document.body;
	}

	function handleOnScroll() {
		if (!scrollContainer()) {
			return;
		}

		if (scrollContainer().scrollTop > showOnPx) {
			hidden = false;
		} else {
			hidden = true;
		}
	}
</script>

<svelte:window on:scroll={handleOnScroll} />

<div class="back-to-top rounded py-2 px-4 cursor-pointer" on:click={goTop} class:hidden>
	Back to top
</div>

<style>
	.back-to-top {
		opacity: 1;
		transition: opacity 0.5s, visibility 0.5s;
		position: fixed;
		z-index: 99;
		right: 20px;
		user-select: none;
		bottom: 20px;
		color: white;
		background-color: black;
	}

	.back-to-top.hidden {
		opacity: 0;
		visibility: hidden;
	}
</style>
