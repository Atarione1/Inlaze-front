import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Configuración de NextAuth para autenticación
const handler = NextAuth({
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
  callbacks: {
    // Callbacks para manejar tokens JWT y sesiones
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token
      return session
    },
  }, 
  pages: {
    signIn: "/",
  },
})

export { handler as GET, handler as POST }