import App from "./App.svelte";

// This is an external dependency that is, as of October 2020, not part of
// svelte-logo-frontend.
//
// It can be copied from the build output of [elm-logo].
//
// [elm-logo]: https://github.com/cruessler/elm-logo
const worker = new Worker("./build/worker.js");

const app = new App({
  target: document.body,
  props: { worker },
});

export default app;
