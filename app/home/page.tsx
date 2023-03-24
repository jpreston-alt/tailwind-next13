import Link from "next/link";

// example of a server component
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
