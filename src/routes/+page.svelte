<script>
import "../lib/app.css";
import ToolItem from "$lib/todolist.svelte";
     

const pagettle="Todo";
const tle1="check"
</script>
<style>
    .todos
    {
        width: 100%;
        max-width: 42rem;
        margin: 4rem auto 0 auto;

    }
    .new {
        margin:0 0 0.5rem 0;
    }
    .new input
    {

        font-size: 28px;
        width: 100%;
        border-radius: 8px;
        padding: 0.5rem 1rem 0.3rem 1rem ;
        box-sizing: border-box;
        text-align: center;

    }
    .todos :global(input)
    {border: 1px solid transparent;}
    .todos :global(input:focus-visible)
    {
        box-shadow: inset 1px 1px 6px black;
        outline: none;
        border: 1px solid red !important;
    }
</style>
<svelte:head>
 <title>Todos</title>
</svelte:head>
<div class="todos">
    <h1>{pagettle}</h1>
    <form action="" method="" class="new">

        <input type="text" name="text" placeholder="+type tp add a todo">
        
    </form>
        <ToolItem/>
    
</div>



    
    
