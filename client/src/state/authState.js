import create from 'zustand'
import axe from '../utils/api'

// export interface AuthUser {
//   uid: string;
//   username: string;
//   email: string;
//   activeRooms: string[];
//   profileImgUrl: string | undefined;
//   profileImgFileName: string | undefined;
// }

const login = async (data) => {
  try {
    const res = await axe.post('/auth/login', data)
    localStorage.setItem('token', res.data.token)
    return res.data.token
  } catch (err) {
    localStorage.removeItem('token')
  }
}
export const useAuth = create((set) => ({
  authUser: null,
  loading: true,
  isAuthenticated: undefined,
  login,
  setAuthUser: (authUser) => set((state) => ({ ...state, authUser })),
  setLoading: (loading) => set((state) => ({ ...state, loading })),
}))
