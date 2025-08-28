import type { NextFunction, Request, Response } from "express";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  // Basic centralized error handler
  const message = err instanceof Error ? err.message : "Error desconocido";
  res.status(500).json({ message });
}


