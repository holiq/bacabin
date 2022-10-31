<script>
	function handler() {
		let targetScroll = (window.outerHeight * 75) / 100;
		targetScroll += document.documentElement.scrollTop;
		window.scrollTo({ top: targetScroll, behavior: 'smooth' });
	}
</script>

<div on:dblclick={handler}>
	<slot />
</div>
