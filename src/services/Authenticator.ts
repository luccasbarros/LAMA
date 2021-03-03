import * as jwt from "jsonwebtoken";
import { UserRole } from "../model/User";

export type AuthenticationData = {
  id:string,
  role: UserRole
}

class Authenticator {

  public generateToken = (input:AuthenticationData) => {
    return jwt.sign(
      {
        id:input.id,
        role:input.role
      },
      process.env.JWT_KEY as string,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    )
  }


  public getData = (token:string):AuthenticationData => {

    const payload = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as AuthenticationData

    const result = {
      id:payload.id,
      role: payload.role
    }


    return result
  }

}

export default new Authenticator()
