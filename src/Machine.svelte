<script lang="typescript">
  import type { Vm } from "./vm";

  export let vm: Vm;

  let currentInstruction: string;

  $: currentInstruction = vm.instructions[vm.programCounter] ?? "none";
</script>

<style>
  h2 {
    margin: 0;
  }

  ul {
    font: var(--monospace-font);
    padding: 0;
    list-style: none;
  }

  li {
    padding: 0.2em 0;
  }

  table {
    font: var(--monospace-font);
  }

  tr.current {
    color: rgb(18, 18, 18);
    background-color: var(--primary-color);
  }

  #machine {
    grid-area: vm;
    padding: 1em;
    overflow-y: auto;
    color: var(--primary-color);
    background-color: var(--primary-background-color);
    box-shadow: -5px 5px 5px 0 rgb(201, 199, 199);
  }

  #program {
    overflow-y: auto;
  }
</style>

<div id="machine">
  <div id="stack">
    <h2>Stack</h2>
    <ul>
      {#each vm.stack as entry}
        <li>{entry}</li>
      {/each}
    </ul>
  </div>

  <div id="scopes">
    <h2>Scopes</h2>
    <ul>
      {#each vm.scopes as scope}
        {#if scope.type === 'Root'}
          <li>
            <h3>Root</h3>
            <table>
              {#each Object.entries(scope.variables) as [name, binding]}
                <tr>
                  <td>{name}</td>
                  <td>{binding ?? '_'}</td>
                </tr>
              {/each}
            </table>
          </li>
        {:else if scope.type === 'Local'}
          <li>
            <h3>Local@{scope.address}</h3>
            <table>
              {#each Object.entries(scope.variables) as [name, binding]}
                <tr>
                  <td>{name}</td>
                  <td>{binding ?? '_'}</td>
                </tr>
              {/each}
            </table>
          </li>
        {:else if scope.type === 'Template'}
          <li>
            <h3>Template</h3>
            <table>
              <tr>
                <td>current</td>
                <td>{scope.current ?? '_'}</td>
              </tr>
              <tr>
                <td>rest</td>
                <td>{scope.rest}</td>
              </tr>
            </table>
          </li>
        {:else if scope.type === 'Loop'}
          <li>
            <h3>Loop@{scope.current}</h3>
          </li>
        {/if}
      {/each}
    </ul>
  </div>

  <div id="instructions">
    <h2>Instructions</h2>
    <h3>Next</h3>
    <table>
      <tr class="current">
        <td>{vm.programCounter}</td>
        <td>{currentInstruction}</td>
      </tr>
    </table>
    <table id="program">
      {#each vm.instructions as instruction, i}
        {#if i === vm.programCounter}
          <tr class="current">
            <td>{i}</td>
            <td>{instruction}</td>
          </tr>
        {:else}
          <tr>
            <td>{i}</td>
            <td>{instruction}</td>
          </tr>
        {/if}
      {/each}
    </table>
  </div>
</div>
