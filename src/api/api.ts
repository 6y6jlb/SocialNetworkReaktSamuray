import axios from "axios";
import {UsersResponseType} from "../components/MainWrapper/Users/UserPage.container";
import {UserFromProfileResponseType} from "../Redux/profileReducer";
import {SetUserDataType, UserDataFromAuthAuthType} from "../Redux/auth-reducer";

type FollowUserResponseType = {
    resultCode:number
    messages: string[]
    data:Object
}
interface ResponseHeaderContainerType extends SetUserDataType{
    fieldsErrors: any
    messages: string
    resultCode: number
}


const instanceForGetUsersSamuraiAPI = axios.create({
    withCredentials: true,
    baseURL:"https://social-network.samuraijs.com/api/1.0/"

})
const instanceForUnFollowUserAndFollowUserSamuraiAPI = axios.create({
    withCredentials: true,
    baseURL:"https://social-network.samuraijs.com/api/1.0/",
    headers:{
        "API-KEY":'5dd18682-d8ca-4034-bcc6-76fd868cb4ec'
    }

})
const instanceForProfileSamuraiAPI = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.0/'
})
const instanceForAuthSamuraiAPI = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    withCredentials:true
})


export const UsersAPI = {
    getUsers:(pageSize:number,currentPage:number) =>{
        return instanceForGetUsersSamuraiAPI.get<UsersResponseType> ( `users/?count=${pageSize }&page=${currentPage }`,
        )
    },
    unFollowUser:(userId:number) =>{
        return instanceForUnFollowUserAndFollowUserSamuraiAPI.delete<FollowUserResponseType> ( `follow/${userId}`,
        )
    },
    followUser:(userId:number) =>{
        return instanceForUnFollowUserAndFollowUserSamuraiAPI.post<FollowUserResponseType> ( `follow/${userId}`,
        )
    }
}
export const ProfileAPI = {
    setUserProfile:(userIdForURL:number) => {
        return instanceForProfileSamuraiAPI.get<UserFromProfileResponseType> ( `profile/${ userIdForURL }` )
    }
}
export const AuthAPI = {
    setUserFromHeader () {
        return instanceForAuthSamuraiAPI.get<ResponseHeaderContainerType> ( `auth/me`,{
        } )
            },
    }