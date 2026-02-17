import { bookshelf } from "../config/database";
import { ClassModel } from "./class.model";
import { SchoolModel } from "./school.model";

const GENDER_MAP: Record<number, string> = {
  1: "Laki-laki",
  2: "Perempuan",
};

export const UserModel = bookshelf.model("UserModel", {
  tableName: "users",
  schools() {
    return this.belongsTo(SchoolModel);
  },
  classes() {
    return this.belongsTo(ClassModel);
  },

  toJSON() {
    const attrs = bookshelf.Model.prototype.toJSON.apply(this, arguments);

    attrs.gender = GENDER_MAP[attrs.gender] || "Tidak Diketahui";
    return attrs;
  },
});
