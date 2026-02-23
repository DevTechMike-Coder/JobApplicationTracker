import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: process.env.CLIENT_BETTER_AUTH_URL,
})

export const {signIn, signUp, signOut, useSession} = authClient