<script>
  export let label = "Example";
  export let cls = "";
  export let active = false;
</script>

<button class:active on:click={() => active = !active} class="{cls}">
  {label}
</button>

<style>
  button {
    padding: 6px 12px 6px 12px;
    transition: 0.3s ease-out;
    background: linear-gradient(to left, transparent 50%, white 50%) right;
    background-size: 205%;
    border: 1px solid white;
    color: white;
  }

  button:hover {
    background-position: left;
    color:black;
  }

  .active{
      background: white;
      color:black;
  }



  .primary {
    background: black;
    color: white;
    background: linear-gradient(to left, black 50%, white 50%) right;
    background-size: 210%;
    border: 1px solid black;
  }
  .primary:hover {
    color: black;
  }

  .secondary {
    background: white;
    color: black;
    background: linear-gradient(to left, white 50%, black 50%) right;
    background-size: 210%;
    transition: 0.3s ease-out;
    border: 1px solid black;
  }

  .secondary:hover {
    color: white;
  }
</style>
