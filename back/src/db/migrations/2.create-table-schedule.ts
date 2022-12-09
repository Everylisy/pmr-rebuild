// ./node_modules/.bin/ts-node .\src\db\migrations\2.create-table-schedule.ts

import { Schedules } from "../models/schedule";

console.log("======Create schedule Table======");
const create_table_schedule = async () => {
  // await Schedules.sync({ force: true })
  await Schedules.sync()
    .then(() => {
      console.log("✅Success Create schedule Table");
    })
    .catch((err: Error) => {
      console.log("❗️Error in Create schedule Table : ", err);
    });
};

create_table_schedule();
