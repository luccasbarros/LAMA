import { Band } from "../model/Band";
import BaseDatabase from "./BaseDatabase";

class BandDatabase extends BaseDatabase {
  private static tableName: string = "bands";

  public async createBand(band: Band) {
    try {
      await BaseDatabase.connection
        .insert({
          id: band.getId(),
          name: band.getName(),
          music_genre: band.getGenre(),
          responsible: band.getResponsible()
        })
        .into(BandDatabase.tableName);
    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  }

  public getBandById = async(id:string):Promise<Band> => {
    try {

      const result = await BaseDatabase.connection.raw(`
      SELECT * FROM ${BandDatabase.tableName} as band
      WHERE band.id = "${id}"
      `)

      return new Band(
        result[0][0].id,
        result[0][0].name,
        result[0][0].music_genre,
        result[0][0].responsible
      )

    } catch(error) {
      throw new Error(error.message || error.sqlMessage)
    }
  }
}

export default new BandDatabase();
