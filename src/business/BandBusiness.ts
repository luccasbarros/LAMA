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

      if (!authentication.id) {
        throw new CustomError(401, "Unauthorized");
      }

      if (authentication.role === "ADMIN") {
        if (!input.name || !input.genre || !input.responsible) {
          throw new Error("Invalid fields. Complete all fields");
        }
        const id: string = IdGenerator.generate();

        const newBand: Band = new Band(
          id,
          input.name,
          input.genre,
          input.responsible
        );

        await BandDatabase.createBand(newBand);
      } else {
        throw new CustomError(401, "Unauthorized");
      }
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}

export default new BandBusiness();
