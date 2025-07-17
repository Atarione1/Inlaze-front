"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { getAdmin, getProject, getUserr } from "@/app/api/services/service";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteTask, getTask, getTasks } from "@/app/api/services/serviceTasks";
import { Project } from "../../[id]/page";
import { comment } from "postcss";

export interface Props {
  params: {
    id: string;
  };
}
export interface Task {
  id: string;
  name: string
  description: string
  finishedAt: string
}
export interface Comments {
  id: number;
  userId: number
  description: string
  taskId: number
}

const Project = ({ params }: Props) => {
  const { data: session, status } = useSession();
  const [admin, setAdmin] = useState()
  const [user, setUser] = useState()
  const [coment, setComent] = useState<[]>([])
  const [project, setProject] = useState<Project>()
  const [tasks, setTasks] = useState<Task>()
  const searchParams = useSearchParams()
  const newTask = searchParams.get('task')
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("")
  const [userId, SetUserId] = useState<string>("")


  useEffect(() => {
    if (session) { getPage() }
    console.log(params)
  }, [session])

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  async function getPage() {
    const coments = await getComents()
    const addmin = await getAdmin(session)
    const project = await getProject(session, params?.id)
    const userr = await getUserr(session)
    setComent(coments)
    setAdmin(addmin)
    setProject(project)
    setUser(userr)
    SetUserId(userr.id)
    getTASK()
  }

  async function getTASK() {
    const taskss = await getTask(session, newTask)
    setTasks(taskss)
  }
  const handleSubmit = async () => {

    await deleteTask(session, newTask)
    router.push(`/project/${params?.id}?user=${user?.id}`);

  };
  const getComents = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/2`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

      },
    });
    const data = await res.json();
    console.log(data)

    return data;

  };
  const SubmitComent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          userId,
          taskId: tasks?.id,

        }),
      }
    );

    const responseAPI = await res.json();

    if (!res.ok) {
      setErrors(responseAPI.message.split(","));
      return;
    }


    router.push(`/project/tasks/${params.id}?task=${tasks?.id}`);

  };
  return (
    <div className="w-screen">
      <h1 className=" text-3xl md:text-5xl text-center mx-auto font-bold w-screen">{tasks?.name} </h1>
      <div className=" w-screen mx-auto justify-center">
        <div className=' w-[300px] md:w-screen h-20 justify-center mx-3 text-ellipsis text-center  md:mx-auto my-10'><pre>
          <p className='text-center md:text-lg mb-3 font-normal text-gray-700 dark:text-gray-400 container text-ellipsis'>
            {tasks?.description}

          </p>
        </pre>
        </div>
      </div>
      {admin ? (
        <div className="flex mx-auto w-full my-10 justify-center" >
          <div>
            <Link href={`/project/tasks/${newTask}/edit`}>
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Editar Tarea

              </button>
            </Link>
            <button onClick={handleSubmit} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">ELiminar Tarea
            </button>
          </div>
        </div>) : (<></>)}{ }

      <div>
      </div>
      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion</h2>
          </div>
          <form className="mb-6" onSubmit={SubmitComent}  >
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label className="sr-only">Your comment</label>
              <textarea name="description"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Bueno bueno"
                onChange={(event) => setDescription(event.target.value)}></textarea>
            </div>
            <button type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Post comment
            </button>
          </form>
          {coment?.map((com: Comments, i) => (
            <div key={i}>
              <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="text-sm text-gray-600 …">
                      <span title="February 8th, 2022">{com.userId} </span>
                    </p>
                  </div>
                  <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    type="button">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                    <span className="sr-only">Comment settings</span>
                  </button>

                  <div id="dropdownComment1"
                    className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownMenuIconHorizontalButton">
                      <li>
                        <a href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                      </li>
                      <li>
                        <a href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                      </li>
                      <li>
                        <a href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                      </li>
                    </ul>
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">{com.description} </p>
                <div className="flex items-center mt-4 space-x-4">
                  <button type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                    </svg>
                    Reply
                  </button>
                </div>
              </article>
            </div>
          ))}
          <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">Michael Gough</p>
                <p className="text-sm text-gray-600 dark:text-gray-400"><p
                  title="February 8th, 2022">Feb. 8, 2022</p></p>
              </div>
              <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
                <span className="sr-only">Comment settings</span>
              </button>

              <div id="dropdownComment1"
                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconHorizontalButton">
                  <li>
                    <a href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                  </li>
                  <li>
                    <a href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                  </li>
                  <li>
                    <a href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                  </li>
                </ul>
              </div>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
              instruments for the UX designers. The knowledge of the design tools are as important as the
              creation of the design strategy.</p>
            <div className="flex items-center mt-4 space-x-4">
              <button type="button"
                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                </svg>
                Reply
              </button>
            </div>
          </article>


        </div>
      </section>
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
  );
};
export default Project;