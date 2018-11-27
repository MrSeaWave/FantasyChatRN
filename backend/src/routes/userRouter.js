import Router from "koa-router";
import * as user_controller from "../controllers/usersControllers.js";
const router = new Router({
    prefix: '/api'
});

router.get("/get", user_controller.get);
router.post("/post", user_controller.post);
router.post("/login", user_controller.login);
router.post("/register", user_controller.register);
router.post("/update/user", user_controller.updateUserInfo);

export default router
