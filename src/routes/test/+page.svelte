<script lang="ts">
	import { onMount } from 'svelte';

	let code = '';

	onMount(async () => {
		const res = await fetch(
			'https://gist.githubusercontent.com/joy095/d6e24ac7fb0e7d0dac2ace1db6757568/raw'
		);
		code = await res.text();
	});
</script>

<h1>Hello</h1>
<h2>Hello2</h2>

<pre><code>{code}</code></pre>
