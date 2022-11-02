export default {
  jwt: {
    secret: process.env.NODE_ENV != "test" ? process.env.JWT_SECRET as string : "senhasecreta123",
    expiresIn: '1d'
  }
}
