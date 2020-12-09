import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/User";
import UserBusiness from "../business/UserBusiness";
import { BandInputDTO } from "../model/Band";
import BandBusiness from "../business/BandBusiness";

class UserController {

    public createBand = async (req:Request, res:Response) => {

        try {
            const input:BandInputDTO = {
                name: req.body.name,
                genre: req.body.genre,
                responsible: req.body.password 
            }
            const token = await BandBusiness.createBand(input)

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
}




export default new UserController()