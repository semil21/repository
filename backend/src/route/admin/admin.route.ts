import express from "express";
import ownerController from "../../controller/admin/admin.controller";

const ownerRouter = express.Router();

ownerRouter.post("/create", ownerController.createNewAdmin);
ownerRouter.post("/login", ownerController.adminLogin);
ownerRouter.post("/password-reset", ownerController.forgotPassword);
ownerRouter.put("/update-password", ownerController.updatePassword);
ownerRouter.post("/log-out/:userId", ownerController.adminLogOut);

export default ownerRouter;
