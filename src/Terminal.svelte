<script lang="typescript">
  export let prompt;
</script>

<style>
  #terminal {
    grid-area: terminal;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-areas: "history" "controls";
    overflow-y: auto;
    color: var(--primary-color);
    background-color: var(--primary-background-color);
  }

  #history {
    display: grid;
    grid-template-rows: 5fr 1fr;
    grid-template-areas: "entries" "prompt";
    overflow-y: auto;
  }

  #entries {
    grid-area: entries;
    margin: 0;
    padding: 0;
    font: var(--monospace-font);
    overflow-y: auto;
  }

  #prompt {
    grid-area: prompt;
    width: 100%;
    font: var(--monospace-font);
    background-color: #312f2f;
    border-style: none;
    color: #eaeaf0;
  }

  #controls {
    grid-area: controls;
    padding: 10px;
    display: flex;
  }

  button:first-child {
    margin-left: auto;
  }
  button {
    margin-left: 10px;
  }
</style>

<div id="terminal">
  <div id="history">
    <ul id="entries" />
    <textarea id="prompt" bind:value={prompt} />
  </div>
  <div id="controls">
    <button>Compile</button>
    <button>Step</button>
    <button>Continue</button>
  </div>
</div>
