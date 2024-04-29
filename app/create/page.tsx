'use client'

import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'

const CreatePage = () => {

    const [formData, setFormData] = useState({ term: "", interpretation: "" })
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    const router = useRouter();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        ));


    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.term || !formData.interpretation) {
            setError('Please Fill in All the fields');
            return;
        }

        setError(null);
        setisLoading(true);


        try {
            const response = await fetch('/api/interpretations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if (!response.ok) {
                throw new Error('Failed to create interpretation')
            }

            router.push('/');
        } catch (error) {
            console.log(error);
            setError('Something went wrong')

        } finally {
            setisLoading(false);
        }
    }

    return (
        <div>
            <h2 className='text-2xl font-bold my-8 '>Add New Interpretation</h2>
            <form onSubmit={handleSubmit} action="" className='flex gap-3 flex-col '>
                <input type="text" name='term' onChange={handleInputChange} value={formData.term} placeholder='term' className='py-1 px-4 border rounded-md  ' />

                <textarea value={formData.interpretation} onChange={handleInputChange} name="interpretation" rows={4} placeholder='Interpretation' className='py-1 px-4 border rounded-md resize-none'></textarea>

                <button className='bg-black text-white mt-5 px-4 py-1 rounded-md cursor-pointer'>{isLoading ? 'Adding...' : 'Add Interpretation'}</button>
            </form>

            {error && <p className='text-red-500 mt-4'>{error}</p>}
        </div>
    )
}

export default CreatePage