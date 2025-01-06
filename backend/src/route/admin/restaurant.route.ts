import express from "express";
import ownerController from "../../controller/admin/owner.controller";

const ownerRouter = express.Router();

ownerRouter.post("/create", ownerController.createNewAdmin);
ownerRouter.post("/login", ownerController.adminLogin);
ownerRouter.post("/password-reset", ownerController.passwordReset);

export default ownerRouter;
