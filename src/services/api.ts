import { AuthApi, ComicApi, Configuration, UserApi } from './api-back'
import apiInterceptorInstance from './interceptor'





const configuration = new Configuration({
    basePath: import.meta.env.VITE_BASE_API
})

const authApi = new AuthApi(configuration, undefined, apiInterceptorInstance)
const userApi = new UserApi(configuration, undefined, apiInterceptorInstance)
const comicApi = new ComicApi(configuration, undefined, apiInterceptorInstance)



export {
    authApi,
    userApi,
    comicApi


}