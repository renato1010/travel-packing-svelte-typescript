## This App

This App is based on `travel-packing` app shown in book [Svelte and Sapper in Action](https://www.manning.com/books/svelte-and-sapper-in-action) by Mark Volkmann  
**The twist** is that original app was written in _JavaScript_ I build the app in _Typescript_ as an exercise

## Things I learned

1. To import/export Typescript tokens e.g _types_/_interfaces_ a good deal is to "centralize" as posible,  
   defined in one file (exports) and import(consume) in a `<script context="module" lang="ts">` in the consumer  
   .svelte component

Example:
At [src/types.ts](src/types.ts)

export:

```typescript
export type ItemProp = {
  id: string;
  name: string;
  packed: boolean;
};

export type CategoryType = {
  id: string;
  name: string;
  items: ItemProp[];
};

export type ShowType = "all" | "packed" | "unpacked";
```

import:
At [src/Item.svelte](src/Item.svelte)

```svelte
<script context="module" lang="ts">
  import type { ItemProp, CategoryType, ShowType } from "./types";
  import { blurOnKey } from "./Item.svelte";
</script>
...
```

2. For typing DOM Elements the namescpace `svelte` is only available in .svelte files not for .ts  
   So if you need to type a say a callback function/event handler, you'll need to define it in a `.svelte`  
   file like this: at [src/Item.svelte](src/Item.svelte)

```svelte
<script context="module" lang="ts">
  import type { ItemProp } from "./types";

  export const blurOnKey: svelte.JSX.KeyboardEventHandler<HTMLInputElement> = (event) => {
    const { code } = event;
    if (code === "Enter" || code === "Escape" || code === "Tab") {
      event.currentTarget.blur();
    }
  };
</script>
```

and then import as in (1);
at [src/Category.svelte](src/Category.svelte)

```svelte
<script context="module" lang="ts">
  import type { ItemProp, CategoryType, ShowType } from "./types";
  import { blurOnKey } from "./Item.svelte";
</script>
```

\* The type `svelte.JSX.KeyboardEventHandler<HTMLInputElement>` is not availabe in .ts file  
so take this into account when refactoring

## Chapter 5 take away

for typing custom events, defined a type at `src/types.ts`

```typescript
export type DeleteItemEvent = { deleteItem: { itemId: string } };
```

then use it to type the custom event at `src/Item.svelte`

```typescript
const dispatch = createEventDispatcher<DeleteItemEvent>();
```

So when dispatch:
you'll have type info & auto-completion
![type info & auto completion](screenshots/type-completion-available_Peek%202021-08-23%2019-19.gif)

Same as when consuming custom event in parent component
you'll have correct type for event

![consuming custom event in parent cmp](screenshots/consuming-custom-event-Peek%202021-08-23%2019-25.gif)

## Get started

Install the dependencies...

```bash
cd travel-packing-svelte-typescript
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for _any_ path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

## Using TypeScript

This template comes with a script to set up a TypeScript development environment, you can run it immediately after cloning the template with:

```bash
node scripts/setupTypeScript.js
```

Or remove the script via:

```bash
rm scripts/setupTypeScript.js
```

## Deploying to the web

### With [Vercel](https://vercel.com)

Install `vercel` if you haven't already:

```bash
npm install -g vercel
```

Then, from within your project folder:

```bash
cd public
vercel deploy --name my-project
```

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```
