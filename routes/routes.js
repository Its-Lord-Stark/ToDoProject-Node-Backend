import express from "express";
import {
    logout
} from "../controllers/controller.js";

import {
    newRegister
} from "../controllers/controller.js";

import {
    login
} from "../controllers/controller.js";

import { isAuthenticated } from "../middlewares/isAuth.js";
import {
    getMyProfile
} from "../controllers/controller.js";



const router = express.Router();


router.post("/new", newRegister);

router.post("/login", login);

router.get("/logout", logout);


router.get("/me", isAuthenticated ,getMyProfile);


export default router;