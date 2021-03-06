<script lang="typescript">
  import Canvas from "./Canvas.svelte";
  import Examples from "./Examples.svelte";
  import Machine from "./Machine.svelte";
  import Terminal from "./Terminal.svelte";
  import type { Vm } from "./vm";

  interface Size {
    width: number;
    height: number;
  }

  export let worker: Worker;
  let vm: Vm = {
    stack: [],
    instructions: [],
    scopes: [],
    environment: {
      history: [],
      objects: [],
      turtle: { x: 0, y: 0, direction: 0 },
    },
    programCounter: 0,
  };

  worker.addEventListener("message", (event) => {
    vm = event.data;
    vm.environment.history.reverse();
  });

  let size: Size = { width: window.innerWidth, height: window.innerHeight };

  window.addEventListener("resize", () => {
    size = { width: window.innerWidth, height: window.innerHeight };
  });

  let prompt = "";

  const onClick = (code: string) => {
    prompt = code;
  };

  const onRun = () => {
    worker.postMessage({ type: "Run", source: prompt });
  };

  const onCompile = () => {
    worker.postMessage({ type: "Compile", source: prompt });
  };

  const onStep = () => {
    worker.postMessage({ type: "Step" });
  };

  const onContinue = () => {
    worker.postMessage({ type: "Continue" });
  };
</script>

<main>
  <Canvas {vm} {size} />
  <div id="overlay">
    <div id="overlay-left">
      <Terminal bind:prompt {vm} {onRun} {onCompile} {onStep} {onContinue} />
      <Examples {onClick} />
    </div>
    <Machine {vm} />
  </div>
</main>

<style>
  :global(:root) {
    --primary-color: rgb(248, 248, 242);
    --primary-background-color: rgb(37, 36, 36);
    --monospace-font: 12px "Fira Code", monospace;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
  }

  :global(button) {
    color: var(--primary-background-color);
    background-color: #cfcfcf;
    border-radius: 5px;
    border-style: none;
    padding: 5px 20px;
    cursor: pointer;
    transition: background-color 0.2s ease-in;
  }
  :global(button:hover) {
    background-color: #efefef;
    transition: background-color 0.2s ease-in;
  }

  main {
    width: 100%;
    height: 100%;
    position: relative;
    font-family: "Raleway", -apple-system, system, sans-serif;
  }

  #overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 4fr 9fr 3fr;
    grid-template-areas: "overlay-left . vm";
  }

  #overlay-left {
    grid-area: overlay-left;
    display: grid;
    grid-template-rows: 5fr auto;
    grid-template-areas: "terminal" "examples";
    overflow-y: auto;
    box-shadow: 5px 5px 5px 0 rgb(201, 199, 199);
  }
</style>
