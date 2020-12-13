import { Shows } from "../model/Shows";
import BaseDatabase from "./BaseDatabase";

class ShowsDatabase extends BaseDatabase {
  private static tableName: string = "shows";

  public async createShow(show: Shows) {
    try {
      await BaseDatabase.connection
        .insert({
          id: show.getId(),
          week_day: show.getWeekDay(),
          start_time: show.getStartTime(),
          end_time: show.getEndTime()
        })
        .into(ShowsDatabase.tableName);
    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  }
}

export default new ShowsDatabase();
