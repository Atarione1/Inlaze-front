"use client";
import { Params } from "@/app/project/page";
import { Session } from "next-auth";

// Función para obtener proyectos con parámetros y sesión
// Realiza una solicitud GET al backend para obtener proyectos
// Devuelve los datos obtenidos
export async function getProjects(session: Session | null, params: Params) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/project?` +
      new URLSearchParams(params as URLSearchParams),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    }
  );
  const data = await res.json();

  return data;
}

// Función para obtener información de administrador
// Realiza una solicitud GET al backend para verificar si el usuario es administrador
// Devuelve el estado de administrador del usuario
export const getAdmin = async (session?: Session | null) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${session?.user?.name}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    }
  );
  const data = await res.json();
  return data.admin;
};

// Función para obtener información del usuario
// Realiza una solicitud GET al backend para obtener datos del usuario
// Devuelve los datos del usuario
export const getUserr = async (session?: Session | null) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${session?.user?.name}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    }
  );
  const data = await res.json();
  return data;
};

// Función para obtener todos los usuarios
// Realiza una solicitud GET al backend para obtener la lista de usuarios
// Devuelve los datos de los usuarios
export const getUsers = async (session?: Session | null) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session?.user?.token}`,
    },
  });
  console.log(res);
  const data = await res.json();
  console.log(data);
  return data;
};

// Función para obtener un proyecto específico por ID
// Realiza una solicitud GET al backend para obtener los detalles del proyecto
// Devuelve los datos del proyecto
export async function getProject(session: Session | null, id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session?.user?.token}`,
    },
  });
  console.log(res);
  const data = await res.json();

  return data;
}

// Función para eliminar un proyecto por ID
// Realiza una solicitud DELETE al backend para eliminar el proyecto
// Devuelve los datos de la respuesta
export async function deleteProject(session: Session | null, id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session?.user?.token}`,
    },
  });
  console.log(res);
  const data = await res.json();

  return data;
}