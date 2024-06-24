

import { authApi } from "@/services/api";

function useAuthHook() {
    
    const signIn = async (userEmail: string, userPassword: string) => {
        try {
            const  { data, status }  = await authApi.authControllerLogin(
                userEmail,
                userPassword
            )
            // Dispare a ação para definir o token no Redux
            localStorage.setItem('token', data)

            if (data) {
                window.location.reload();       
            }

            return {
                status: status,
                message: '',
                data: data,
            }
        } catch (error: any) {
            return {
                status: 401,
                message: `Error: ${error}`,
            }
        }
    }
    
    const signOut = () => {
        try {
            localStorage.removeItem('token')
            localStorage.removeItem('slug')
            window.location.replace('/sign-in')

          
        } catch (error: any) {
            return {
                status: 401,
                message: `Error: ${error}`,
            }
        }
    }



    return {

        signIn,
        signOut

    }
}

export default useAuthHook
