import type { Context } from "hono";
import { UserModel } from "../models/user.model";

export class UserController {
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
