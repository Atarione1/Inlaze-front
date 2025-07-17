"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect, ChangeEvent } from "react";
import { getAdmin, getProjects, getUserr } from "../api/services/service";
import Link from "next/link";
import { useDebounce } from "@/hooks/debounce-hook";

export interface Params {
  name?: string,
  order?: Order,
  take?: number,
  page?: number
}
export enum Order {
  Asc = 'ASC',
  Desc = 'DESC'
}


const Project = () => {
  const { data: session, status } = useSession();
  const [admin, setAdmin] = useState()
  const [project, setProject] = useState<[]>([])
  const [user, setUser] = useState()
  const [params, setParams] = useState<Params>({ page: 1, take: 10 })
  const debounce = useDebounce(params, 1000)


  const handleChange = (event: any) => { const { value } = event.target; setParams((prevState) => ({ ...prevState, order: prevState.order === value ? undefined : value })); };

  useEffect(() => {
    if (session)
      getPage()

  }, [session, debounce])

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  async function getPage() {
    const addmin = await getAdmin(session)
    const projects = await getProjects(session, params)
    const userr = await getUserr(session)
    setAdmin(addmin)
    setProject(projects)
    setUser(userr)
    console.log(addmin)
  }

  return (
    <div className=" w-screen">

      <div className="flex w-full md:w-[400px] mx-auto flex-col gap-y-1 gap-x-2">


        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setParams({ ...params, name: e.target.value })
          }
          } defaultValue={params?.name} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Project" required />
        </div>
      </div>

      <h1 className=" text-5xl text-center mx-auto font-bold w-screen my-5">Proyectos </h1>

      {admin ? (
        <div className="flex mx-auto md:mx-[15%] my-10 justify-center md:justify-end" >
          <Link href={"/project/new"}>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Crear Proyecto</button>
          </Link>
        </div>) : (<></>)}{ }
      <div className="container grid-cols-1 sm:grid-cols-2 grid md:grid-cols-3 w-screen  mx-auto justify-center gap-y-5 ">
        {project.map((pro: any, i) => (
          <div key={i} className=" mx-auto sm:mx-0" >

            <div className=" max-w-[26rem] min-w-[250px] whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-4 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
            >
              <div className="mb-2 flex items-center gap-3">
                <a
                  href="#"
                  className="block font-sans text-base font-medium leading-relaxed tracking-normal text-blue-gray-900 antialiased transition-colors hover:text-pink-500"
                >
                  @{pro.name}
                </a>
                <div
                  className="center relative inline-block select-none whitespace-nowrap rounded-full bg-purple-500 py-1 px-2 align-baseline font-sans text-xs font-medium capitalize leading-none tracking-wide text-white"

                >
                  <div className="mt-px">Public</div>
                </div>
              </div>
              <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased my-5">
                {pro.description}
              </p>
              <Link href={`/project/${pro.id}?user=${user?.id}`} className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                Detalle
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </Link>
              <div className="mt-4 flex items-center gap-5">
                <div className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-blue-400"></span>
                  <p className="block font-sans text-xs font-normal text-gray-700 antialiased">
                    {pro.userId}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="-mt-0.5 h-4 w-4 text-yellow-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="block font-sans text-xs font-normal text-gray-700 antialiased">
                    3,480
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="-mt-px h-4 w-4 text-green-300"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="block font-sans text-xs font-normal text-gray-700 antialiased">
                    Veritied
                  </p>
                </div>
              </div>
            </div>


          </div>
        ))}

      </div>

    </div>
  );
};
export default Project;