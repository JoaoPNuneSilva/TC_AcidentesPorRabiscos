

import {  userApi } from "@/services/api";
import { UserCreateDto } from "@/services/api-back";

function useUserHook() {
    
    const signUp = async (userCreateDto: UserCreateDto) => {
        try {
            const  { data, status }  = await userApi.userControllerSubscribe(
                userCreateDto
            )
            // Dispare a ação para definir o token no Redux
            //@ts-ignore
            localStorage.setItem('token', data)
            
            //@ts-ignore
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



    return {

        signUp,

    }
}

export default useUserHook
