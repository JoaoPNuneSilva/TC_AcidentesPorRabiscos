
import { comicApi } from "@/services/api";
import { ComicCreateDto } from "@/services/api-back";



function useComicHook() {
    
    const comicControllerCreate = async (comicCreateDto: ComicCreateDto) => {
        try {
            const  { data, status }  = await comicApi.comicControllerCreate(
                comicCreateDto
            )
            // Dispare a ação para definir o token no Redux
           

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
    const comicControllerComicHome = async (comicId: string,) => {
        try {
            const  { data, status }  = await comicApi.comicControllerComicHome(
                comicId
            )
            // Dispare a ação para definir o token no Redux
           

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
    const comicControllerComicRead = async (comicId: string, page?: number,) => {
        try {
            const  { data, status }  = await comicApi.comicControllerComicRead(
                comicId, page,
            )
            // Dispare a ação para definir o token no Redux
           

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
    const comicControllerFindAllHome = async (page: string, perPage: string, title?: string,) => {
        try {
            const  { data, status }  = await comicApi.comicControllerFindAllHome(
                page, perPage, title,
            )
            // Dispare a ação para definir o token no Redux
           

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
        comicControllerCreate,
        comicControllerComicHome,
        comicControllerComicRead,   
        comicControllerFindAllHome,


    }
}

export default useComicHook
