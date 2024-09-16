'use client'

import axios from 'axios';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  cpf: z.string().length(11),
});

type FormData = z.infer<typeof schema>;

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    console.log("Form submitted with data:", data);
    try {
      const response = await axios.get(`http://localhost:3000/api/cpf`, 
        { params: { cpf: data.cpf } }
      );
      if (response.data.score) {
        alert(`Score: ${response.data.score}`);
      }
    } catch (error) {
      console.error("Error fetching score:", error);
      alert("Failed to fetch score. Please try again.");
    }
  }

  return (
    <>
      <section className="flex justify-center items-center min-h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border-2 border-gray-300 p-8 rounded-md w-full max-w-lg h-96 flex flex-col justify-between">
          <div>
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
              CPF
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="cpf"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="00000000000"
                {...register("cpf")}
              />
              {errors.cpf && <p className="text-red-500 text-xs mt-1">CPF deve ter 11 caracteres</p>}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
