"use client";
import { Session } from "next-auth";

export  const getUserTask = async (session?:Session|null,id?:string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/task/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session?.user?.token}`,
    },
  });
  console.log(res)
  const data = await res.json();
  console.log(data)
 return data;
};
export async function getTasks(session:Session| null,project:string,user:string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${project}/${user}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session?.user?.token}`,
    },
  });
  console.log(res)
  const data = await res.json();

  return data
}
export async function getTaskss(session:Session| null,project:string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/project/${project}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session?.user?.token}`,
    },
  });
  console.log(res)
  const data = await res.json();

  return data
}
export async function getTask(session:Session| null,task:string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${task}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session?.user?.token}`,
    },
  });
  console.log(res)
  const data = await res.json();
 
  return data
}
export async function deleteTask(session:Session| null,task:string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${task}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session?.user?.token}`,
    },
  });
  console.log(res)
  const data = await res.json();
 
  return data
}