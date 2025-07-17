"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Project, Props } from "../page";
import { getProject } from "@/app/api/services/service";
import { useSession } from "next-auth/react";

const EditarProyect = ({ params }: Props) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [project, setProject] = useState<Project>()
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
    const project = await getProject(session, params?.id)

    setProject(project)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${params?.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
        }),
      }
    );

    const responseAPI = await res.json();

    if (!res.ok) {
      setErrors(responseAPI.message.split(","));
      return;
    }


    router.push(`/project/${params.id}`);

  };

  return (
    <div>


      <section className="bg-gray-50 dark:bg-gray-900 w-screen h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-screen">

          <div className="w-screen bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Editar Proyecto
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del proyecto</label>
                  <input
                    type="text"
                    defaultValue={project?.name}
                    name="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(event) => setName(event.target.value)} />

                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
                  <textarea
                    defaultValue={project?.description}
                    name="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(event) => setDescription(event.target.value)}
                     />
                </div>
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
export default EditarProyect