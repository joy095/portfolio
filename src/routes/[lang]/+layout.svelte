<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	export let data: {
		lang: string;
		posts: any[];
	};
</script>

<Header data={data.lang} />

<main>
	<slot />
</main>
