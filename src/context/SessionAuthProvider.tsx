"use client";
import React from 'react'
import { SessionProvider } from 'next-auth/react'


interface Props {
  children: React.ReactNode
}

// Proveedor de contexto para manejar la autenticación de sesiones
// Envuelve la aplicación con el proveedor de sesión de NextAuth
const SessionAuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default SessionAuthProvider