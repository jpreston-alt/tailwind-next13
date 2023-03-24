"use client";

export default function Page() {
  return (
    <div>
      <div>BREAKING</div>
      <div>
        <button onClick={(e) => console.log(e.b.c)}>break this</button>
      </div>
    </div>
  );
}
