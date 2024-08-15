<script lang="ts">
	import axios from 'axios'
	import { onMount } from 'svelte'
	let msgs: any = []
	onMount(async () => {
		const res = await axios.get('/api/an')
		//msgs = res.data
		console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz', res.data)
	})
</script>

<h1>Home New-Anjapps</h1>
{#each msgs as msg}
	<div><h1>{msg.message}</h1></div>
	<div>{msg.receiver}</div>
	<div>{msg.id}</div>
	<div>{msg.sender}</div>
{/each}

<style>
	div {
		border: 1px solid black;
		padding: 10px;
		margin: 10px;
	}
</style>
