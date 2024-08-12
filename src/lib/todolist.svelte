<style>
.todo
{display: grid;
grid-template-columns: 2rem 1fr 2rem;
grid-gap:0.5 rem;
align-items: center;
margin:0 0 0.5rem 0;
padding: 0.5rem;
border-radius: 8px;
filter: drop-shadow(2px 4px 6px black);
transform: translate(-1px,-1px);
transition: filter 0.2s transform 0.2s;
}
.todo button{
    width: 2rem;
    height: 2rem;
    background-color: transparent;
    background-position: 50% 50%;
    background-repeat: no-repeat;
}
.todo input
{
flex: 1;
padding: 0.5em 2em 0.5em 0.8em;
border-radius: 4px;

}
.toggle
{
    border: 1px solid black;
    border-radius: 50%;
    box-sizing: border-box;
    background-size: 1em auto;
}
.text{
    position: relative;
    display: flex;
    align-items: center;
    flex:1;
}
</style>
<div class="todo">
<form action="" method="">
    <input type="text" name="done" value="">
    <button aria-label="Mark done/Not done" class="toggle"> Done/NotDone</button>
</form>

<form action="" method="">
    <input type="text" name="done" value="">
    <button aria-label="Save Todo "  class="save"> Save</button>
</form>
<form action="" method="">
    <input type="text" name="done" value="">
    <button aria-label="Delete " class="delete"> Delete</button>
</form>

</div>