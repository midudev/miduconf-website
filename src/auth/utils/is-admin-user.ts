export const isAdminUser = (email: string) => {
  const isAdminUser = ADMIN_USERS.includes(email)
  return isAdminUser
}

const ADMIN_USERS = ['alvarez.fing@gmail.com', 'railly_2009@hotmail.com', 'miduga@gmail.com']
