import { Request, Response } from "express";
import { BandInputDTO } from "../model/Band";
import BandBusiness from "../business/BandBusiness";

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
}

export default new UserController();
