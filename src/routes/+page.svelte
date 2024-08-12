<script>
import "../lib/app.css";
import ToolItem from "$lib/todolist.svelte";
     

const pagettle="Todo";
const tle1="check"
</script>
<svelte:head>
    <title>Todos</title>
</svelte:head>
<h1>{pagettle}</h1>
<form action="" method="">
    <div  class="todo-container">
<input type="text" name="text" placeholder="+type tp add a todo">
</div>
</form>
<ToolItem/>