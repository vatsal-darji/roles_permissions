import db from "../models/index";
import { createModuleType } from "../types/module";

const createModuleInDB = async (payload: createModuleType) => {
  const moduleName = await db.Module.findOne({
    where: {
      key: payload.key,
    },
  });
  if (moduleName) {
    throw new Error("Module already exists");
  }
  const createdModule = await db.Module.create(payload);
  return createdModule.dataValues.key;
};

export { createModuleInDB };
