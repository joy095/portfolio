<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	export let data: {
		lang: string;
		posts: any[];
		langCookie: string;
	};
</script>

<Header lang={data.langCookie} />

<main>
	<slot />
</main>
