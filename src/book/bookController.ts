import type { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary.js";
import path from 'node:path'

const uploadsDir = path.join(process.cwd(), 'public', 'data', 'uploads');

//for files - form data is send ~ multi part form data
const createBook = async(
    req: Request,res: Response, next: NextFunction)=>{

        console.log(req.files);

        const files = req.files as { [fieldname: string]: Express.Multer.File[] | undefined };
        const coverImageMimeType = files.coverImage?.[0]?.mimetype?.split("/")?.at(-1) ?? "default-mime-type";

        const fileName = files.coverImage?.[0]?.filename;

        if (!fileName) {
            return next(new Error('Cover image is required'));
        }

        const filePath = path.join(uploadsDir, fileName);
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            filename_override: fileName,
            folder: 'book-covers',
            // format: coverImageMimeType,
        });

        const bookFileName = files.file?.[0]?.filename;

        if (!bookFileName) {
            return next(new Error('Book file is required'));
        }

        const bookFilePath = path.join(uploadsDir, bookFileName);

        //pdf file
        const bookFileUploadResult = await cloudinary.uploader.upload(bookFilePath, {
            resource_type: "raw",
            filename_override: bookFileName,
            folder: 'book-pdfs',
            format: "pdf",
        });

        console.log("bookFileUploadResult", bookFileUploadResult);



        console.log('uploadResult', uploadResult);
        res.json({})
        // try {
        //     const uploadResult = await cloudinary.uploader.upload(filePath, {
        //         folder: "book-covers",
        //     });
        
        //     console.log("Upload successful:");
        //     console.log(uploadResult);
        
        //     res.json(uploadResult);
        // } catch (err) {
        //     console.error("Cloudinary error:", err);
        //     next(err);
        // }
    };

export {createBook};