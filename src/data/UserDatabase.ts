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

    public login = async (email:string):Promise<User> => {

      try {
        const result = await BaseDatabase.connection.raw(`
        SELECT * FROM ${UserDatabase.tableName} as user
        WHERE user.email = "${email}"
        `)

        return new User(
          result[0][0].id,
          result[0][0].name,
          result[0][0].email,
          result[0][0].password,
          result[0][0].role
        )
      } catch(error) {
        throw new Error(error.message || error.sqlMessage)
      }
    }

}

export default new UserDatabase()