'use client'

import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'


const EditPage = ({ params }: { params: { id: string } }) => {
  const [formData, setFormData] = useState({ term: "", interpretation: "" })
  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/interpretations/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch interpretation')
        }

        const data = await response.json();
        setFormData({ term: data.interpretation.term, interpretation: data.interpretation.interpretation })
      } catch (error) {
        setError('Failed to load interpretations')
      }
    }

    fetchData()
  }, [])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prevData) => (
      {
        ...prevData,
        [e.target.name]: e.target.value,
      }
    ));


  }

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.term || !formData.interpretation) {
      setError("Please Fill in All the fields");
      return;
    }

    setError(null);
    setisLoading(true);

    try {
      const response = await fetch(`/api/interpretations/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update interpretation");
      }

      router.push("/");
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setisLoading(false);
    }
  };
  return (
    <div>
      <h2 className='text-2xl font-bold my-8 '>Edit Interpretation</h2>
      <form action="" onSubmit={handleSubmit} className='flex gap-3 flex-col '>
        <input type="text" value={formData.term} onChange={handleInputChange} name='term' placeholder='term' className='py-1 px-4 border rounded-md  ' />

        <textarea name="interpretation" value={formData.interpretation} onChange={handleInputChange} rows={4} placeholder='Interpretation' className='py-1 px-4 border rounded-md resize-none'></textarea>

        <button className='bg-black text-white mt-5 px-4 py-1 rounded-md cursor-pointer'>{isLoading ? 'Updating...' : 'Update Interpretation'}</button>

        {error && <p className='text-red-500 mt-4'>{error}</p>}

      </form>
    </div>
  )
}

export default EditPage