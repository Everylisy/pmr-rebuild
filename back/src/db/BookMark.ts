import { Op } from "./models";
import { Users } from "./models/user";
import { BookMarks } from "./models/bookMark";
import { Supplements } from "./models/supplement";
import { IBookMarkCreateInput } from "../interfaces/bookMarkInput";

const BookMark = {
  findById: async (fk_user_id: string) => {
    const schedule = await BookMarks.findAll({
      include: [
        { model: Users, attributes: [], where: { pk_user_id: fk_user_id } },
        {
          model: Supplements,
          attributes: [
            "pk_supplement_id",
            "update_date",
            "shape",
            "name",
            "caution",
            "company",
            "function",
            "how_to_eat",
            "raw",
            "img_link",
            "link",
          ],
        },
      ],
    });
    return schedule;
  },

  createBookMark: async (data: IBookMarkCreateInput) => {
    const newBookMark = await BookMarks.create(data);
    return newBookMark;
  },

  findByBookMarkUser: async (fk_user_id: string, fk_supplement_id: number) => {
    const bookmark = await BookMarks.findOne({
      attributes: ["pk_bookmark_id"],
      include: [
        { model: Users, attributes: [], where: { pk_user_id: fk_user_id } },
        { model: Supplements, attributes: [], where: { pk_supplement_id: fk_supplement_id } },
      ],
    });
    return bookmark;
  },

  deleteSchedule: async (pk_bookmark_id: number) => {
    const bookmark = await BookMarks.destroy({
      where: { pk_bookmark_id: pk_bookmark_id },
      force: true,
    });
    return bookmark;
  },
};

export { BookMark };
