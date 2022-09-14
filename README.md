This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) that uses React Table by Tanstack to deliver a leaderboard table that is sortable and paginated. The styling is delivered almost 100% by Tailwind utility classes as well.

It also uses SWR for fetching data for the leaderboard table.

The table is sortable by rank and will display either the top 100 or all entries. The data lives in the leaderboard.js API but could also easily be hooked up to a database.

## To Run Yourself

In order to install all dependencies, be sure to run:

```bash
npm i
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The API is visitable at [http://localhost:3000/api/leaderboard](http://localhost:3000/api/leaderboard). Here, you can see all of the data in JSON form.
