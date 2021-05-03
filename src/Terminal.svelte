<script lang="typescript">
  import type { Vm } from "./vm";

  export let prompt: string;
  export let vm: Vm;
  export let onRun: () => void;
  export let onCompile: () => void;
  export let onStep: () => void;
  export let onContinue: () => void;
</script>

<div id="terminal">
  <div id="history">
    <ul id="entries">
      {#each vm.environment.history as entry (entry.id)}
        {#if entry.type === "Input"}
          <li class="input">{entry.input}</li>
        {:else if entry.type === "Output"}
          <li class="output">{entry.output}</li>
        {:else if entry.type === "Error"}
          <li class="error">{entry.error}</li>
        {/if}
      {/each}
    </ul>
    <textarea id="prompt" bind:value={prompt} />
  </div>
  <div id="controls">
    <button on:click={onRun}>Run</button>
    <button on:click={onCompile}>Compile</button>
    <button on:click={onStep}>Step</button>
    <button on:click={onContinue}>Continue</button>
  </div>
</div>

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

  li {
    white-space: pre-wrap;
  }
  li.input {
    color: rgba(247, 248, 242, 0.7);
  }
  li.input:before {
    content: "> ";
  }
  li.error {
    color: rgb(248, 80, 80);
  }
  li.error:before {
    content: "! ";
  }
</style>
