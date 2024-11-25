import { Request, Response } from "express";
import { createModuleType } from "../types/module";
import { createModuleInDB } from "../services/module";

const createModule = async (req: Request, res: Response) => {
  try {
    const modulePayload: createModuleType = {
      name: req.body.name,
      description: req.body.description,
      key: req.body.key,
    };

    const createdModule = await createModuleInDB(modulePayload);
    return res.status(200).json({
      success: true,
      message: "Module created successfully!",
      data: createdModule,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      data: null,
    });
  }
};

export { createModule };
