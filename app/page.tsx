import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="font-bold p-4 rounded-md leading-8">
        Natural Language Processing (NLP)
      </div>
      <div className="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit, iusto! Culpa cupiditate, dolores officia excepturi eligendi rem voluptates iste, ducimus minima incidunt deleniti, ad corporis blanditiis velit sunt facere nihil?
      </div>

      <div className="flex gap-4 mt-4 justify-end ">
        <Link className="bg-slate-300 px-4 py-2 uppercase text-sm font-bold tracking-widest" href={'/edit'}> Edit </Link>

        <button className="bg-red-500 text-white px-4 py-2 uppercase text-sm font-bold tracking-widest">
Delete
        </button>
      </div>
    </div>
  );
}
