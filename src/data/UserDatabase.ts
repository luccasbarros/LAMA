import { User } from "../model/User";
import BaseDatabase from "./BaseDatabase";



class UserDatabase extends BaseDatabase {


  private static tableName:string = "users"

    public async signup(user:User){

      try {

        await BaseDatabase.connection.insert({
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          password: user.getPassword(),
          role: user.getRole()
        })
        .into(UserDatabase.tableName)

      } catch(error) {
        throw new Error(error.message || error.sqlMessage)
      }

    }

}

export default new UserDatabase()