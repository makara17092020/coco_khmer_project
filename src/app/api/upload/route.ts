// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { v2 as cloudinary } from "cloudinary";
// import { NextRequest, NextResponse } from "next/server";

// export const config = {
//   runtime: "nodejs",
// };

// cloudinary.config({
// cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
// api_key: process.env.CLOUDINARY_API_KEY!,
// api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();

//     // Debug: log form keys to check incoming data
//     console.log("FormData keys:", [...formData.keys()]);

//     const file = formData.get("file") as File;

//     if (!file) {
//       console.log("No file found in form data!");
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     console.log("File received:", {
//       name: file.name,
//       size: file.size,
//       type: file.type,
//     });

//     const MAX_SIZE = 10 * 1024 * 1024; // 10MB
//     if (file.size > MAX_SIZE) {
//       return NextResponse.json(
//         { error: "File too large. Max 10MB allowed." },
//         { status: 400 }
//       );
//     }

//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     const uploadResult = await new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         { resource_type: "image", folder: "products" },
//         (error, result) => {
//           if (error) {
//             console.error("Cloudinary upload error:", error);
//             reject(error);
//           } else {
//             resolve(result);
//           }
//         }
//       );
//       uploadStream.end(buffer);
//     });

//     return NextResponse.json({
//       message: "Upload success",
//       url: (uploadResult as any).secure_url,
//     });
//   } catch (err: any) {
//     console.error("Upload error:", err);
//     return NextResponse.json(
//       { error: "Upload failed", details: err.message },
//       { status: 500 }
//     );
//   }
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { uploadImage } from "../../lib/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const images = formData.getAll("file") as File[];

    if (images.length === 0) {
      return NextResponse.json(
        { success: false, error: "No images were provided." },
        { status: 400 }
      );
    }

    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Image = `data:${image.type};base64,${buffer.toString(
          "base64"
        )}`;
        return uploadImage(base64Image, "products");
      })
    );

    return NextResponse.json(
      {
        success: true,
        message: "Images uploaded successfully.",
        data: {
          urls: imageUrls,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading images:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to upload images.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
// import { v2 as cloudinary } from "cloudinary";
// import { NextRequest, NextResponse } from "next/server";
// import streamifier from "streamifier";

// // ✅ Force Node.js runtime (NOT edge)
// export const runtime = "nodejs";

// // ✅ Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

// export async function POST(req: NextRequest) {
//   try {
//     // ✅ Parse form data
//     const formData = await req.formData();
//     const file = formData.get("file") as File | null;

//     if (!file) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     // ✅ Convert file to buffer
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     // ✅ Upload to Cloudinary via stream
//     const uploadResult: any = await new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         {
//           resource_type: "image",
//           folder: "products", // 👈 change folder if needed
//         },
//         (error, result) => {
//           if (error) return reject(error);
//           resolve(result);
//         }
//       );

//       streamifier.createReadStream(buffer).pipe(uploadStream);
//     });

//     return NextResponse.json({
//       message: "Upload success ✅",
//       url: uploadResult.secure_url,
//       public_id: uploadResult.public_id,
//     });
//   } catch (err: any) {
//     console.error("Upload error:", err);
//     return NextResponse.json(
//       { error: "Upload failed", details: err.message },
//       { status: 500 }
//     );
//   }
// }
