import type { Context } from "hono";
import { ClassController } from "./class.controller";
import { UserModel } from "../models/user.model";

export class UserController {
  async getAllusers(c: Context) {
    const users = await UserModel.fetchAll({
      withRelated: ["schools", "classess"],
    }).map((item: any) => {
      const itemJson = item.toJson();

      const classRel = item.related("classes");
      const schoolRel = item.related("schools");

      return {
        id: itemJson.id,
        name: itemJson.name,
        gender: itemJson.gender,
        address: itemJson.address,
        school: {
          id: schoolRel.get("id"),
          name: schoolRel.get("name"),
        },
        class: {
          id: classRel.get("id"),
          name: classRel.get("name"),
        },
      };
    });
    return c.json({
      status: true,
      message: "User data successfully displayed",
      data: users,
    });
  }
}
