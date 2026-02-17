import type { Context } from "hono";
import { SchoolModel } from "../models/school.model";

export class SchoolController {
  async getListData(c: Context) {
    const school = await SchoolModel.fetchAll().map((item: any) => {
      return {
        id: item.get("id"),
        name: item.get("name"),
        address: item.get("address"),
      };
    });
    return c.json({
      status: true,
      message: "Data successfully displayed",
      data: school,
    });
  }

  async getDetailData(c: Context) {
    const id = c.req.param("id");

    const school = await SchoolModel.where("id", id).fetch({
      require: false,
      withRelated: ["users"],
    });

    return c.json({
      status: true,
      message: "Data detail successfully displayed",
      data: {
        id: school.get("id"),
        name: school.get("name"),
        address: school.get("address"),
        users: school.related("users"),
      },
    });
  }
}
