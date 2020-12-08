
import  UserDatabase  from "../data/UserDatabase";
import { User, UserInputDTO } from "../model/User";
import Authenticator from "../services/Authenticator";
import HashManager from "../services/HashManager";
import IdGenerator from "../services/IdGenerator";

class UserBusiness {

    public signup = async(input:UserInputDTO) => {
        

        try {

            if(!input.name || !input.email || !input.password) {
                throw new Error("Invalid fields. Complete all fields")
            }

            if(input.email.indexOf("@") === -1) {
                throw new Error("Insert a valid e-mail")
            }

            if(input.password.length < 6) {
                throw new Error("Password need 6 character at least")
            }

            const id:string = IdGenerator.generate()

            const cypherPassword = await HashManager.hash(input.password)

            const newUser:User = new User(
                id,
                input.name,
                input.email,
                cypherPassword,
                input.role
            )

            await UserDatabase.signup(newUser)

            const token:string = Authenticator.generateToken({id, role:input.role})

            return token


        } catch(error) {

        }

    }

}