import { Request, Response } from "express";
import { Band, BandInputDTO } from "../model/Band";
import BandBusiness from "../business/BandBusiness";
import BandDatabase from "../data/BandDatabase";
import { CustomError } from "../error/CustomError";

class UserController {
  public createBand = async (req: Request, res: Response) => {
    try {
      const token: string = req.headers.authorization as string;

      const input: BandInputDTO = {
        name: req.body.name,
        musicGenre: req.body.musicGenre,
        responsible: req.body.responsible,
      };
      
      await BandBusiness.createBand(input, token);

      res.status(201).send({ message: "Band created sucessfully"});

    } catch (error) {

      res.status(400).send({
        message: error.message || error.sqlMessage,
      });
    }
  };

  public getBandById = async(req:Request, res:Response):Promise<any> => {
    try {
      const token:string = req.headers.authorization as string

      const input = {
        id: req.params.id
      }

      const band:Band = await BandBusiness.getBandById(input, token)

      if(!band) {
        throw new CustomError(404, 'Not found')
      }

      res.status(200).send({band: band})
      
    } catch(error) {
      res.status(400).send({message: error.message || error.sqlMessage})
    }
  }
}

export default new UserController();
