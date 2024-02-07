import { ServerURL } from "./baseUrl"
import { commonAPI } from "./commonAPI"

//register user
export const userRegisterApi= async(reqBody)=>{
   return await commonAPI('POST',`${ServerURL}/user/register`,reqBody,'')
}

//login user
export const loginUserApi = async(reqBody)=>{
    return await commonAPI('POST',`${ServerURL}/user/login`,reqBody,'')
}

//add post
export const addPostApi = async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${ServerURL}/post/add`,reqBody,reqHeader)
}

//get all posts
export const getAllPostsApi = async()=>{
    return await commonAPI('GET',`${ServerURL}/home/posts`)
}

//get all users
export const getUserDetailsApi = async()=>{
    return await commonAPI('POST',`${ServerURL}/user/details`)
}

//edit profile
export const editProfileApi = async(reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${ServerURL}/profile/update`,reqBody,reqHeader)
}

//delete post
export const deletePostApi = async(id)=>{
   return await commonAPI('DELETE',`${ServerURL}/post/delete/${id}`)
}

//like post 
export const likePostApi = async(reqBody)=>{
    return await commonAPI('POST',`${ServerURL}/post/like`,reqBody,'')
}

//get all liked posts
export const getAllLikedPostApi = async()=>{
    return await commonAPI('GET',`${ServerURL}/post/allLikes`)
}

//to remove liked posts
export const removeLikedPostApi = async(reqBody)=>{
    return await commonAPI('Delete',`${ServerURL}/post/removeLike`,reqBody,'');
}

//to search users
export const searchUsersApi = async(searchKey)=>{
   return await commonAPI('GET',`${ServerURL}/search/users?search=${searchKey}`)
}