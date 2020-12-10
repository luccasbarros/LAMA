import BandDatabase from "../data/BandDatabase";
import { CustomError } from "../error/CustomError";
import { Band, BandInputDTO } from "../model/Band";
import Authenticator, { AuthenticationData } from "../services/Authenticator";
import IdGenerator from "../services/IdGenerator";

class BandBusiness {
  public createBand = async (
    input: BandInputDTO,
    token: string
  ): Promise<any> => {

    try {

      const authentication: AuthenticationData = Authenticator.getData(token);

      if (!authentication) {
        throw new CustomError(401, "Unauthorized");
      }

      if (authentication.role === "ADMIN") {

        if (!input.name || !input.musicGenre || !input.responsible) {
          throw new CustomError(400, "Preencha os campos corretamente")
        }

        const id: string = IdGenerator.generate();

        const newBand: Band = new Band(
          id,
          input.name,
          input.musicGenre,
          input.responsible
        );

        await BandDatabase.createBand(newBand);

      } else {
        throw new CustomError(401, "Unauthorized");
      }

    } catch (error) {

      let{message} = error

      if(message.includes("Duplicate Entry")) {
        throw new CustomError(400, "User already exists")
      }

      if(message === "jwt must be provided") {
        throw new CustomError(401, "Unauthorized")
      }

      throw new CustomError(400, error.sqlMessage || error.message)
    }
  };
}

export default new BandBusiness();
