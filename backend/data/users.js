import bcrypt from "bcryptjs"

const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('dioufadama17D', 10),
    isAdmin: true,
  },
  {
    name: 'Semou Diouf',
    email: 'semou@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Jane Doe',
    email: 'jane@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin:false,
  },
]

export default  users