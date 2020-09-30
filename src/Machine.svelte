<style>
  h2 {
    margin: 0;
  }

  ul {
    font: var(--monospace-font);
    padding: 0;
    list-style: none;
  }

  table {
    font: var(--monospace-font);
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
    <ul />
  </div>

  <div id="scopes">
    <h2>Scopes</h2>
    <ul />
  </div>

  <div id="instructions">
    <h2>Instructions</h2>
    <h3>Next</h3>
    <table />
    <table id="program" />
  </div>
</div>
