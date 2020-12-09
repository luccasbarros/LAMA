
import  UserDatabase  from "../data/UserDatabase";
import { CustomError } from "../error/CustomError";
import { LoginInputDTO, User, UserInputDTO } from "../model/User";
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
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public login = async(input:LoginInputDTO) => {

        try {
            if(!input.email || !input.password ||input.email.indexOf("@") === -1) {
                throw new CustomError(404, 'User does not exist')
            }
            const user = await UserDatabase.login(input.email)

            if(!user) {
                throw new CustomError(400, "User doest not exist or invalid password")
            }
            
            const isPasswordCorrect = await HashManager.compare(input.password, user.getPassword())
    
            if(!isPasswordCorrect) {
                throw new CustomError(400, "Wrong password or e-mail")
            }
    
            const token:string = Authenticator.generateToken({id: user.getId(), role:user.getRole()})
    
            return token

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}

export default new UserBusiness()