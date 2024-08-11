<script>
// import ToolItem from "../lib/todolist.svelte"
import ToolItem from "$lib/todolist.svelte"
const pagettle="Todo";
</script>
<svelte:head>
    <title>Todos</title>
</svelte:head>
<h1>{pagettle}</h1>
<form action="" method="">
<input type="text" name="text" placeholder="+type tp add a todo">

</form>
<ToolItem/>