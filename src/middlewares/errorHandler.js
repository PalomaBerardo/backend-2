import {AppError} from '../utils/AppError.js';
import {config} from "../config/config.js";

export const errorHandler = (err, req, res, next) => {
    const isProd = config.env === "production";
    const normalized=
    err instanceof AppError
        ? err
        : new AppError("Ocurrio un error", 500, "INTERNAL_ERROR", {
            originalMessage: err.message,
            originalStack : err.stack,
        });
    
        console.error ("Error:",{
            method: req.method,
            path: req.originalUrl,
            status: normalized.statusCode,
            code: normalized.code,
            message: normalized.message,
            details: normalized.details,
        });
    const response = {
        code: normalized.code,
        message: normalized.message,
    };

    if (!isProd) response.debug = { original: err.message};

    return res.status(normalized.statusCode).json(response);
};