"use client";

import { getUsers } from "@/app/api/services/service";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CreateProyect = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [user, setUser] = useState<string>("1");
  const [users, setUsers] = useState<[]>([]);
  const [description, setDescription] = useState<string>("");
  const searchParams = useSearchParams()
  const newUser = searchParams.get('user')
  const newproject = searchParams.get('project')
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session)
      getPage()

  }, [session])

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  async function getPage() {

    const userr = await getUsers(session)

    setUsers(userr)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          finishedAt: "2025-05-06T17:43:24.585Z",
          userId: parseInt(user, 10),
          projectId: parseInt(newproject, 10),
          status: "POR_HACER"


        }),
      }
    );

    const responseAPI = await res.json();

    if (!res.ok) {
      toast.error(res.statusText)
      setErrors(responseAPI.message.split(","));
      return;
    }

    toast.success('Proyecto creado ✅');
    router.push(`/project/${newproject}?user=${newUser}`);

  };

  return (
    <div>


      <section className="bg-gray-50 dark:bg-gray-900 w-screen h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-screen">

          <div className="w-screen bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Crear Tarea
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del proyecto</label>
                  <input
                    type="text"
                    placeholder="Nombre del proyecto"
                    name="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={name}
                    onChange={(event) => setName(event.target.value)} />

                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
                  <textarea
                    placeholder="Description"
                    name="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)} />

                </div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                <select key={1} onChange={(event) => setUser(event.target.value)} name="user" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  {users.map((user: any, i) => (

                    <option key={i} value={user.id}>{user.name} </option>


                  ))}
                </select>


                <button type="submit" className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Crear</button>

              </form>
              {errors.length > 0 && (
                <div className=" p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                  <ul className="mb-0">
                    {errors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
export default CreateProyect;