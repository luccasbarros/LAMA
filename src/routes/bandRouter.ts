import express from "express";
import BandController from "../controller/BandController";

export const bandRouter = express.Router();

bandRouter.put("/createband", BandController.createBand);

bandRouter.get("/getband/:id", BandController.getBandById);

