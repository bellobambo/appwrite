'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IInterpretation {
  $id: string;
  term: string;
  interpretation: string;
}

export default function Home() {
  const [interpretation, setInterpretation] = useState<IInterpretation[]>([]);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    const fetchInterpretations = async () => {
      setisLoading(true);

      try {
        const response = await fetch('/api/interpretations');
        if (!response) {
          throw new Error('Failed to fetch interpretations');
        }
        const data = await response.json();
        setInterpretation(data);


      } catch (error) {
        console.log('Error', error)
        setError('Failed To Load Interpretations')
      }
      finally {
        setisLoading(false);
      }
    }

    fetchInterpretations()
  }, [])


  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/interpretations/${id}`, { method: 'DELETE' });
      setInterpretation((prevIn) => prevIn?.filter((i) => i.$id !== id))
    } catch (error) {
      setError('Failed to delete interpretaion.  Please try try again')
    }
  };

  return (
    <div>
      {error && <p className="py-4 text-red-500">{error}</p>}
      {isLoading ? (<p>Loading interpretations...</p>) :

interpretation?.length > 0  ?
        (<div>
          {
            interpretation?.map((interpretation) => (
              <div key={interpretation.$id} className=" my-2 border-b p-4 rounded-md leading-8">

                <div className="font-bold ">
                  {interpretation.term}

                </div>

                <div className="">
                  {interpretation.interpretation}

                </div>

                <div className="flex gap-4 mt-4 justify-end ">
                  <Link className="bg-slate-300 px-4 py-2 uppercase text-sm font-bold tracking-widest" href={`/edit/${interpretation.$id}`}> Edit </Link>

                  <button onClick={() => handleDelete(interpretation.$id)} className="bg-red-500 text-white px-4 py-2 uppercase text-sm font-bold tracking-widest">
                    Delete
                  </button>
                </div>

              </div>
            ))
          }
        </div>) :  (
          <p>No Interpretations found</p>
        )
      }
    </div>
  );
}
