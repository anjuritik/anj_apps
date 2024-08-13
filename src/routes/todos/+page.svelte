<script>
  import { onMount } from "svelte";
let products = []
    onMount(async()=>{
const x= await (await fetch('//dummyjson.com/products')).json()
products = x.products
    })
</script>

<h2>hello Anjana , good job</h2>
<h1>Inside todos</h1>

{#each products as product}
<p>{product.title}</p>
{/each}