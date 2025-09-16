const TOKEN_KEY = 'admin_token'

const tokenManager = {
  // حفظ التوكن في localStorage
  setToken: (token) => {
    localStorage.setItem(TOKEN_KEY, token)
  },
  
  // جلب التوكن من localStorage
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY)
  },
  
  // حذف التوكن من localStorage
  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY)
  },
  
  // التحقق إن المستخدم مسجل دخول
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY)
  }
}

export default tokenManager