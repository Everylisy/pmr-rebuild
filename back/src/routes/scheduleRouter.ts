import { Router } from "express";
import { ScheduleController } from "../controllers/scheduleController";
import { check } from "express-validator";
import { validatorErrorChecker } from "../middlewares/validator";
import { verifyToken } from "../middlewares/verifyToken";

const ScheduleRouter = Router();

ScheduleRouter.use(verifyToken);

// 주간 스케줄 조회 (스케줄, 체크리스트, 데일리 영양제)
ScheduleRouter.get("/", ScheduleController.getSchedulePage);

// 주간 스케줄 조회 (스케줄, 체크리스트)
ScheduleRouter.get("/week", ScheduleController.getWeeklySchedule);

// 생체 리듬, 스케줄 추가
ScheduleRouter.post(
  "/create",
  [
    check("type").exists().isIn(["B", "S"]),
    check("start").exists().isISO8601(),
    check("finish").exists().isISO8601(),
    check("to_do").exists(),
    validatorErrorChecker,
  ],
  ScheduleController.create,
);

// 생체 리듬, 스케줄 삭제
ScheduleRouter.delete("/delete/:schedule_id", ScheduleController.deleteSchedule);

// Daily Supplement 등록
ScheduleRouter.post("/daily-supplement", ScheduleController.createDailySupplement);

// Daily Supplement 삭제
ScheduleRouter.delete("/daily-supplement/:plan_id", ScheduleController.deleteDailySupplement);

export { ScheduleRouter };
