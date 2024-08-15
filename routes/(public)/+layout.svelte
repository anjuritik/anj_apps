<script lang="ts">
	import '../../app.pcss'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Nav from '$lib/components/seva/Nav.svelte'
	import NavPublic from '$lib/components/seva/NavPublic.svelte'
	import { fade, fly } from 'svelte/transition'
	export let data
</script>

<main class="mx-auto flex min-h-screen w-full flex-col justify-between">
	<div class="h-full">
		<NavPublic />

		{#if $page.url.pathname !== '/' && $page.url.pathname !== '/auth/login'}
			<div class="grid grid-cols-5 gap-2 overflow-x-auto px-3 pb-1 pt-3"></div>
		{/if}

		<div class="flex-1 px-3 py-1">
			{#key data.url}
				<div in:fly={{ y: -50, duration: 100 }} out:fade={{ duration: 100 }} class="">
					<slot />
				</div>
			{/key}
		</div>
	</div>
</main>
