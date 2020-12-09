
import BandDatabase from "../data/BandDatabase";
import { CustomError } from "../error/CustomError";
import { Band, BandInputDTO } from "../model/Band";
import { UserRole } from "../model/User";
import Authenticator from "../services/Authenticator";
import IdGenerator from "../services/IdGenerator";

class UserBusiness {

    public createBand = async(input:BandInputDTO) => {
        
        try {
            if(UserRole.ADMIN) {

                if(!input.name || !input.genre || !input.responsible) {
                    throw new Error("Invalid fields. Complete all fields")
                }
                const id:string = IdGenerator.generate()
    
                const newBand:Band = new Band(
                    id,
                    input.name,
                    input.genre,
                    input.responsible
                )
    
                await BandDatabase.createBand(newBand)
    
                const token:string = Authenticator.generateToken({id, role:UserRole.ADMIN})
    
                return token
            } else {
                throw new CustomError(401, "Unauthorized")
            }
            

        } catch(error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}

export default new UserBusiness()