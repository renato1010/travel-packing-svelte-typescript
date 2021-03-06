<script context="module" lang="ts">
  import type { CategoryType, DeleteCatEvent, ShowType } from "./types";
</script>

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Category from "./Category.svelte";
  import { getGuid, sortOnName } from "./util";

  const dispatch = createEventDispatcher();
  let categoryArray: CategoryType[] = [];
  let categories: CategoryType[] = [];
  let categoryName: string = "";
  let message = "";
  let show: ShowType = "all";

  $: categoryArray = sortOnName(categories);

  function addCategory() {
    const duplicate = categories.some((cat) => cat.name === categoryName);
    if (duplicate) {
      message = `The category "${categoryName}" already exists.`;
      alert(message); // will change to a dialog later
      return;
    }

    const id = getGuid();
    const newCategory = { id, name: categoryName, items: [] };
    categories = [...categories, newCategory];
    categoryName = ""; // clear the input
  }

  function clearAllChecks() {
    for (const category of categories) {
      for (const item of Object.values(category.items)) {
        item.packed = false;
      }
    }
    categories = categories;
  }
  const deleteCategory = (evt: CustomEvent<DeleteCatEvent["deleteCat"]>) => {
    const { catId } = evt.detail;
    const keepCats = [...categoryArray].filter((cat) => cat.id !== catId);
    categoryArray = keepCats;
  };
  const restore = () => {
    const text = localStorage.getItem("travel-packing");
    if (text && text !== "{}") {
      categories = JSON.parse(text);
    }
  };

  restore();
  $: if (categories) persist();
  const persist = () => {
    localStorage.setItem("travel-packing", JSON.stringify(categories));
  };
</script>

<section>
  <header>
    <form on:submit|preventDefault={addCategory}>
      <label>
        New Category
        <input required bind:value={categoryName} />
      </label>
      <button disabled={!categoryName}>Add Category</button>
      <button on:click={() => dispatch("logout")} class="logout-btn">Log Out</button>
    </form>
    <p>
      Suggested categories include Backpack, Clothes,
      <br />
      Last Minute, Medicines, Running Gear, and Toiletries.
    </p>

    <div class="radios">
      <span>Show</span>
      <label>
        <input name="show" type="radio" value="all" bind:group={show} />
        All
      </label>
      <label>
        <input name="show" type="radio" value="packed" bind:group={show} />
        Packed
      </label>
      <label>
        <input name="show" type="radio" value="unpacked" bind:group={show} />
        Unpacked
      </label>

      <button class="clear" on:click={clearAllChecks}>Clear All Checks</button>
    </div>
  </header>

  <div class="categories">
    {#each categories as category (category.id)}
      <Category on:deleteCat={deleteCategory} on:persist={persist} bind:category {categories} {show} />
    {/each}
  </div>
</section>

<style>
  .categories {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .clear {
    margin-left: 2rem;
  }

  input[type="radio"] {
    --size: 1.5rem;
    height: var(--size);
    width: var(--size);
  }

  .logout-btn {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }

  .radios {
    display: flex;
    align-items: center;
  }

  .radios > label:not(:first-of-type) {
    display: inline-flex;
    align-items: center;

    margin-left: 1rem;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;

    font-size: 1.5rem;
    margin-top: 1rem;
  }
  button:disabled {
    cursor: not-allowed;
  }
</style>
