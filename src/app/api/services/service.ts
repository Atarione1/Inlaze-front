"use client";
import { Params } from "@/app/project/page";
import { Session } from "next-auth";




export async function getProjects(session:Session| null,params:Params) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project?`+ new URLSearchParams(params as URLSearchParams), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session?.user?.token}`,
    },
    
  });
  const data = await res.json();
 
  return data
}

export  const getAdmin = async (session?:Session|null) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${session?.user?.name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session?.user?.token}`,
    },
  });
  const data = await res.json();
 return data.admin;
};

export  const getUserr = async (session?:Session|null) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${session?.user?.name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session?.user?.token}`,
    },
  });
  const data = await res.json();
 return data;
};

export  const getUsers = async (session?:Session|null) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
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

export async function getProject(session:Session| null, id:string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${id}`, {
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
export async function deleteProject(session:Session| null, id:string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${id}`, {
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