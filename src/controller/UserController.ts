import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/User";
import UserBusiness from "../business/UserBusiness";

class UserController {

    public signup = async (req:Request, res:Response) => {

        try {
            const input:UserInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
                
            }
            const token = await UserBusiness.signup(input)

            console.log(token)

            res.status(201).send({message: 'User created sucessfully', token})

        } catch(error) {
            let {message} = error

            if (message.includes("Duplicate entry")) {
                res.statusCode = 400
                message = 'User already exists'
            }

            res.status(400).send({
                message: error.message || error.sqlMessage
            })
        }
    }

    public login = async(req:Request, res:Response):Promise<void> => {

        try {
            const input:LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            let message = 'Success'
            const token = await UserBusiness.login(input)
            res.status(200).send({message, token})
         
        } catch (error) {

            res.status(400).send(error.message || error.sqlMessage)
        }
    }
}




export default new UserController()