<style>
.todo
{
    display: grid;
grid-template-columns: 2rem 1fr 2rem;
grid-gap:0.5 rem;
align-items: center;
margin:0 0 0.5rem 0;
padding: 0.5rem;
background-color: white;
border-radius: 8px;
filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.1));
transform: translate(-1px,-1px);
transition: filter 0.2s transform 0.2s;
}
.todo button{
    width: 2rem;
    height: 2rem;
    border: none;
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
    border: 1px solid rgba(0,0,0,0.2);  
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
.save
{
    position: absolute;
    right:0;
    opacity: 0;
    background-image: url('../routes/images/save1.png');
}
.todo input:focus +.save,
.save:focus
{transition: opacity 0.2s;
 opacity: 1;
}
.delete
{
    /* position: absolute;
    right:0; */
    opacity: 1;
    background-image: url('../routes/images/del1.png');

}
.delete:hover,
.delete:focus
{
    transition: opacity 0.2;
    opacity: 1;
}
.toggle {
 
    background-image: url('../routes/images/dn1.png');
}
</style>
<script>
    import mySvg from '../routes/images/savebtn.svg'; // Adjust path accordingly
  </script>
<div class="todo">
<form action="" method="">
    <input type="hidden" name="done" value="">
    <button aria-label="Mark done/Not done" class="toggle"> </button>
</form>

<form action="" method="" class="text">
    <input type="text" />
    <button aria-label="Save Todo "  class="save"> </button>
</form>
<form action="" method="">
    <button aria-label="Delete " class="delete"> </button>
</form>

</div>
