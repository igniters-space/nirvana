import create from 'zustand'
import axe from '../utils/api'

const login = async (data) => {
  try {
    const res = await axe.post('/auth/login', data)
    localStorage.setItem('token', res.data.token)
    const user = await getUserData()
    console.log('the user is ', user)
    return user
  } catch (err) {
    localStorage.removeItem('token')
    return
  }
}

const signup = async (data) => {
  try {
    const res = await axe.post('/auth/signup', data)
    localStorage.setItem('token', res.data.token)
    const user = await getUserData()
    return user
  } catch (err) {
    localStorage.removeItem('token')
    return
  }
}

export const getUserData = async () => {
  if (localStorage.getItem('token')) {
    axe.defaults.headers.common = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    try {
      const res = await axe.get('/users/authuser')
      return res.data
    } catch (err) {
      localStorage.removeItem('token')
      return null
    }
  } else {
    console.log('flag 2')
    localStorage.removeItem('token')
    return null
  }
}

export const useAuth = create((set) => ({
  authUser: null,
  isAuthenticated: undefined,
  login: (data) => login(data),
  signup: (data) => signup(data),
  setAuthUser: (authUser) => set((state) => ({ ...state, authUser })),
  setIsAuthenticated: (isAuthenticated) =>
    set((state) => ({ ...state, isAuthenticated })),
}))
