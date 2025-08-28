import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid body", details: parsed.error.flatten() });
    }
    // assign parsed data back for type-safety
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req as any).validatedBody = parsed.data;
    next();
  };
}


