import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="font-bold p-4 my-2 rounded-md leading-8">
        Natural Language Processing (NLP)
      </div>
      <div>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit, iusto! Culpa cupiditate, dolores officia excepturi eligendi rem voluptates iste, ducimus minima incidunt deleniti, ad corporis blanditiis velit sunt facere nihil?
      </div>

      <div>
        <Link className="bg-slate-300 px-4 py-2 " href={'/edit'}> Edit </Link>
      </div>
    </div>
  );
}
