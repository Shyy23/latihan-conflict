import type { Context } from "hono";
import { ClassModel } from "../models/class.model";

export class ClassController {
  async getClassList(c: Context) {
    const classes = await ClassModel.fetchAll().map((item: any) => {
      return {
        id: item.get("id"),
        name: item.get("name"),
      };
    });
    return c.json({
      status: true,
      message: "Class data successfully displayed",
      data: classes,
    });
  }

  async getClassDetail(c: Context) {
    const id = c.req.param("id");

    const classExist = await ClassModel.where("id", id).fetch({
      require: false,
      withRelated: ["users.schools"],
    });

    const userRel = classExist.related("users");
    const users = userRel.map((item: any) => {
      const userJson = item.toJSON();

      const schoolRel = item.related("schools");
      return {
        id: userJson.id,
        name: userJson.name,
        gender: userJson.gender,
        address: userJson.address,
        school: {
          id: schoolRel.get("id"),
          name: schoolRel.get("name"),
        },
      };
    });

    return c.json({
      status: true,
      message: "Class detail data successfully displayed",
      data: {
        id: classExist.get("id"),
        name: classExist.get("name"),
        users: users,
      },
    });
  }
}
