// Importación de NextAuth y el proveedor de credenciales
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Configuración de NextAuth para manejar la autenticación
const handler = NextAuth({
  // Define los proveedores de autenticación disponibles
  providers: [
    // Proveedor de credenciales para manejar inicio de sesión personalizado
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "name", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },

      },
      // Función authorize para validar las credenciales del usuario
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              name: credentials?.name,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        )
       
        const user = await res.json()
        console.log(user)
        if (user.error) throw user

        return user
      }
    })
  ],
  // Callbacks para manejar tokens JWT y sesiones
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token
      return session
    },
  }, 
  // Página personalizada para inicio de sesión
  pages: {
    signIn: "/",
  },
})

export { handler as GET, handler as POST }