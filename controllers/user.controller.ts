import type { Context } from "hono";
import { UserModel } from "../models/user.model";

export class UserController {
  async getAllUsers(c: Context) {
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

  async getUserDetail(c: Context) {
    const id = c.req.param("id");

    const user = await UserModel.where("id", id).fetch({
      require: false,
      withRelated: ["schools", "classes"],
    });

    const userJson = user.toJSON();

    const classRel = user.related("classess");
    const schoolRel = user.related("schools");

    return c.json({
      status: true,
      massage: "User detail data successfully displayed",
      data: {
        id: userJson.id,
        name: userJson.name,
        gender: userJson.gender,
        address: userJson.address,
        school: {
          id: schoolRel.get("id"),
          name: schoolRel.get("name"),
          address: schoolRel.get("address"),
        },
        class: {
          id: classRel.get("id"),
          name: classRel.get("name"),
        },
      },
    });
  }
}
