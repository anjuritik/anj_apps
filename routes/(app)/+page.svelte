<script>
	import Button from '$lib/components/ui/button/button.svelte'
	import * as Card from '$lib/components/ui/card'
	// import { currency } from '$lib/utils'
	import { DollarSign, Users } from 'lucide-svelte'
	export let data
	// $: console.log('data', data)
</script>

<!-- <div class="hero flex">
	<a class="section banner food blue-card" href="/po">
		<h1>Purchase Orders</h1>
	</a>
	<a class="section banner travel red-card" href="/rr">
		<h1>Receivings</h1>
	</a>
	<a class="section banner food blue-card" href="/da">
		<h1>DA</h1>
	</a>
	<a class="section banner travel red-card" href="/dispatch">
		<h1>Dispatch</h1>
	</a>
</div> -->
<div class="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3">
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium ">Purchase Orders</Card.Title>
			<DollarSign class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="mb-2 text-2xl font-bold">{data.po_count}</div>
			<a href="/po" class="text-xs text-muted-foreground">
				<Button>View Details</Button>
			</a>
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Receivings</Card.Title>
			<Users class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="mb-2 text-2xl font-bold">{data.rr_count}</div>
			<a href="/rr" class="text-xs text-muted-foreground">
				<Button>View Details</Button>
			</a>
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">DA</Card.Title>
			<Users class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="mb-2 text-2xl font-bold">{data.da_count}</div>
			<a href="/da" class="text-xs text-muted-foreground">
				<Button>View Details</Button>
			</a>
		</Card.Content>
	</Card.Root>
	<!-- <Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Dispatch</Card.Title>
			<Users class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="mb-2 text-2xl font-bold">₹1,00,000</div>
			<a href="/dispatch" class="text-xs text-muted-foreground">
				<Button>View Details</Button>
			</a>
		</Card.Content>
	</Card.Root> -->
</div>

<style>
	.banner {
		flex: 1;
		margin: 10px;
		padding: 1rem;
		border-radius: 3px;
		color: #fff;
	}
	.yellow-card {
		box-shadow: 10px 10px 30px -15px #c7581d;
		background: linear-gradient(87deg, #e48c3a 0, #eb6e2b 100%);
		border-color: #69beda;
		color: #fff;
	}
	.blue-card {
		box-shadow: 10px 10px 30px -15px #1c45da;
		background: linear-gradient(87deg, #40c8fb 0, #1c45da 100%);
		border-color: #69beda;
		color: #fff;
	}
	.red-card {
		box-shadow: 10px 10px 30px -15px #da1c5f;
		background: linear-gradient(87deg, #fb6340 0, #da1c5f 100%);
		border-color: #fb6340;
		color: #fff;
	}
	.yellow-card:hover {
		box-shadow: 10px 10px 30px -15px #c7581d;
		background: linear-gradient(87deg, #eb6e2b 0, #e48c3a 100%);
		border-color: #69beda;
		color: #fff;
	}
	.blue-card:hover {
		box-shadow: 10px 10px 30px -15px #1c45da;
		background: linear-gradient(87deg, #1c45da 0, #40c8fb 100%);
		border-color: #69beda;
		color: #fff;
	}
	.red-card:hover {
		box-shadow: 10px 10px 30px -15px #da1c5f;
		background: linear-gradient(87deg, #da1c5f 0, #fb6340 100%);
		border-color: #fb6340;
		color: #fff;
	}
</style>
