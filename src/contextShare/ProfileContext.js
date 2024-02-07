import React, { createContext, useState } from 'react'

export const ProfileViewContext = createContext()
export const postDeleteContext = createContext()
export const postUpdateContext = createContext()

function ProfileContext({children}) {
    const [isLogOUt,setIsLogOut] =useState(true)
    const [isDeletePost,setIsDeletePost] = useState(false)
    const [isUpdatePost,setIsUpdatePost] = useState(0)
  return (
    <div>

      <postUpdateContext.Provider value={{isUpdatePost,setIsUpdatePost}}>
        <postDeleteContext.Provider value={{isDeletePost,setIsDeletePost}}> <ProfileViewContext.Provider value={{isLogOUt,setIsLogOut}}>{children}</ProfileViewContext.Provider></postDeleteContext.Provider>
  
      </postUpdateContext.Provider>
    </div>
  )
}

export default ProfileContext