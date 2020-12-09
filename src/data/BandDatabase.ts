import { Band } from "../model/Band";
import BaseDatabase from "./BaseDatabase";

class BandDatabase extends BaseDatabase {

  private static tableName:string = "bands"

    public async createBand(band:Band){

      try {
        await BaseDatabase.connection.insert({
          id: band.getId(),
          name: band.getName(),
          genre: band.getGenre(),
          responsible: band.getResponsible()
        })
        .into(BandDatabase.tableName)

      } catch(error) {
        throw new Error(error.message || error.sqlMessage)
      }
    }
}

export default new BandDatabase()