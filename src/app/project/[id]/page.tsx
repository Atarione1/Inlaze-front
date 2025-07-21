"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { getAdmin, getProject } from "@/app/api/services/service";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getTasks, getTaskss, getUserTask } from "@/app/api/services/serviceTasks";

export interface Props {
  params: {
    id: string;
  },

}
export interface Project {
  id: string;
  name: string
  description: string
  createdAt: string
}

const Project = () => {
  const { data: session, status } = useSession();
  const [admin, setAdmin] = useState()
  const [user, setUser] = useState()
  const [project, setProject] = useState<Project>()
  const [tasks, setTasks] = useState<[]>([])
  const searchParams = useSearchParams()
  const params = useParams();
  const newUser = searchParams.get('user')


  useEffect(() => {
    if (session) { getPage() }



  }, [session])

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  async function getPage() {
    const addmin = await getAdmin(session)
    const project = await getProject(session, params?.id as string)
    const userr = await getUserTask(session, newUser)
    setAdmin(addmin)
    setProject(project)
    setUser(userr)


    const taskss = await getTaskss(session, params?.id as string)
    setTasks(taskss)

  }
  return (
    <div className="w-screen">
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-medium break-words overflow-hidden">{project?.name}</h1>
          </div>
          <div className="inline-flex space-x-2 items-center">
            {admin ? (
              <div className="flex mx-auto w-full my-2">
                <div>
                  <Link href={`/project/${params?.id}/edit`}>
                    <button className="text-white bg-black hover:bg-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-black dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-black">Editar Proyecto

                    </button>
                  </Link>

                </div>
              </div>) : (<></>)}{ }
          </div>
        </div>
        <p className="text-slate-500 truncate">{project?.description}</p>
        <div id="tasks" className="my-5">
          {tasks.map((pro: any, i) => (
            <div key={i}>
              <Link href={`/project/tasks/${params?.id}?task=${pro.id}`} >
                <div id="task" className="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent bg-gradient-to-r from-transparent to-transparent hover:from-slate-100 transition ease-linear duration-150">
                  <div className="inline-flex  items-center space-x-2">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-slate-500 hover:text-indigo-600 hover:cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>

                    </div>
                    <div className=" max-w-[200px] truncate">{pro.name} </div>

                  </div>

                  <div className=" flex items-center gap-2">
                    <div className=" ">Usuario: {pro.userId} </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-slate-500 hover:text-slate-700 hover:cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {admin ? (
          <div className="flex mx-16 my-3 justify-center" >
            <Link href={`/project/tasks/new?project=${params.id}&user=${newUser}`}>
              <button className="text-white bg-[#edb80c] hover:bg-[#edb80c] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Crear Tarea</button>
            </Link>
          </div>) : (<></>)}{ }
      </div>
    </div>
  );
};
export default Project;