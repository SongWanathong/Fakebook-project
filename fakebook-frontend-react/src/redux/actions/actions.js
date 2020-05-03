// import { TOKEN } from '../../config/constants'

export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const PROFILEPIC = 'PROFILEPIC'
export const FETCHFRINDPROFILE = 'FETCHFRINDPROFILE'

export function logoutUser() {
  localStorage.removeItem("ACCESS_TOKEN")
  return {
    type: LOGOUT_USER,
  }
}

function fetchLogin(token) {
  localStorage.setItem("ACCESS_TOKEN", token)
}

export function login(user, token) {
  fetchLogin(token)
  return {
    type: LOGIN_USER,
    ...user
  }
}

export function profilepic(profile_img_url){
  return{ type :PROFILEPIC  ,
    profile_img_url:profile_img_url
  }
}

export function fetchFriendProfile(friendid){
  return{ type :FETCHFRINDPROFILE  ,
    friendid:friendid
  }
}

function fetchLogout() {
  localStorage.removeItem("ACCESS_TOKEN")
}

export function logout() {
  fetchLogout()
  return {
    type: LOGOUT_USER,
  }
}