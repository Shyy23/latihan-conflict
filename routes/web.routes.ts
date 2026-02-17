import { Hono } from "hono";
import { SchoolController } from "../controllers/school.controller";
import { ClassController } from "../controllers/class.controller";

const web = new Hono();

const schoolController = new SchoolController();
const classController = new ClassController();
web.get("/schools", schoolController.getListData);
web.get("/school/:id", schoolController.getDetailData);
web.get("/classes", classController.getClassList);
web.get("/class/:id", classController.getClassDetail);
export default web;
