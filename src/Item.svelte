<script context="module" lang="ts">
  import type { ItemProp, DeleteItemEvent } from "./types";

  export const blurOnKey: svelte.JSX.KeyboardEventHandler<HTMLInputElement> = (event) => {
    const { code } = event;
    if (code === "Enter" || code === "Escape" || code === "Tab") {
      event.currentTarget.blur();
    }
  };
</script>

<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let item: ItemProp;
  const dispatch = createEventDispatcher<DeleteItemEvent>();
  let editing = false;
</script>

<li>
  <input type="checkbox" bind:checked={item.packed} />
  {#if editing}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      autofocus
      bind:value={item.name}
      on:blur={() => (editing = false)}
      on:keydown={(e) => blurOnKey(e)}
      type="text"
    />
  {:else}
    <span class="packed-{item.packed}" on:click={() => (editing = true)}>
      {item.name}
    </span>
  {/if}
  <button class="icon" on:click={() => dispatch("deleteItem", { itemId: item.id })}>&#x1F5D1;</button>
</li>

<style>
  button {
    background-color: transparent;
    border: none;
  }
  input[type="checkbox"] {
    --size: 1.5rem;
    height: var(--size);
    width: var(--size);
  }
  input[type="text"] {
    border: solid lightgray 1px;
  }
  li {
    display: flex;
    align-items: center;
  }
  .packed-true {
    color: gray;
    text-decoration: line-through;
  }
  span {
    margin: 0 0.5rem;
  }
</style>
