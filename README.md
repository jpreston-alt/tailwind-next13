# tailwind-next13

An experiment with TailwindCSS and Next.js 13

## Next.js 13 notes

- https://blog.logrocket.com/next-js-13-new-app-directory/
- error.tsx in any directory when an error occurs inside that directory the error comp is shown
- loading.tsx in app directory
- layout.tsx whenever a route changes to another component wihtin the layout it's state is preserved
- template.tsx similar to layout.tsx but upon navigation a new instance of the comp is mounted and state is not preserved
- server components:

  - components inside app directory are React Server componentsn by default
  - add "use client" to the top of file to use as client component
  - cannot use hooks or other client side objects/methods
  - api calls directly inside of your component instead of in a hook:

    ```
    async function getData() {
      const res = await fetch(`https://dog.ceo/api/breeds/image/random`, {
        cache: "no-store",
      });
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      }
      console.log(res);
      return res.json();
    }

    export default async function Home() {
      const data = await getData();
      console.log({ data });
      return (
        <div>
          <h1 className="font-bold underline">Hello world!</h1>
          <Link href="/breaking">navigate to breaking</Link>
          <img src={data.message} />
        </div>
      );
    }
    ```

  - Using the Fetch API natively inside the component provides us with the ability to cache and revalidate the requests as per our requirement. Therefore, the previous utils like getStaticProps and getServerSideProps can be implemented via just one API as seen below:

    ```
    // Generates statically like getStaticProps.
    fetch(URL, { cache: 'force-cache' });

    // Generates server-side upon every request like getServerSideProps.
    fetch(URL, { cache: 'no-store' });

    // Generates statically but revalidates every 20 seconds
    fetch(URL, { next: { revalidate: 20 } });
    ```

- https://beta.nextjs.org/docs/rendering/server-and-client-components

## Tailwind notes

- pseudo classes: `hover:bg-violet-600` `last:pb-0` `dd:bg-white`
- Style form elements in different states using modifiers like required, invalid, and `disabled:bg-slate-50`
- When you need to style an element based on the state of some parent element, mark the parent with the group class, and use group-\* modifiers like group-hover to style the target element:

```
<a href="#" class="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500">
  <div class="flex items-center space-x-3">
    <svg class="h-6 w-6 stroke-sky-500 group-hover:stroke-white" fill="none" viewBox="0 0 24 24"><!-- ... --></svg>
    <h3 class="text-slate-900 group-hover:text-white text-sm font-semibold">New project</h3>
  </div>
  <p class="text-slate-500 group-hover:text-white text-sm">Create a new project from a variety of starting templates.</p>
</a>
```

- If you want to add your own default base styles for specific HTML elements, use the @layer directive to add those styles to Tailwind’s base layer:

```
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    @apply text-2xl;
  }
  h2 {
    @apply text-xl;
  }
  /* ... */
}
```

- Use the components layer for any more complicated classes you want to add to your project that you’d still like to be able to override with utility classes.
  - By defining component classes in the components layer, you can still use utility classes to override them when necessary:

```
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .card {
    background-color: theme('colors.white');
    border-radius: theme('borderRadius.lg');
    padding: theme('spacing.6');
    box-shadow: theme('boxShadow.xl');
  }
  /* ... */
}
```

- Add any of your own custom utility classes to Tailwind’s utilities layer:
  - Any custom styles you add to Tailwind with @layer will automatically support Tailwind’s modifier syntax for handling things like hover states, responsive breakpoints, dark mode, and more.

```
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .content-auto {
    content-visibility: auto;
  }
}
```
