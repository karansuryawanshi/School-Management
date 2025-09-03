import { NextResponse } from "next/server";
import { getPool } from "../../../lib/db";
import path from "path";
import { put } from "@vercel/blob";
import { promises as fs } from "fs";

export const runtime = "nodejs";

export async function GET() {
  try {
    const pool = getPool();
    const [rows] = await pool.query(
      "SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY id DESC"
    );
    return NextResponse.json({ success: true, data: rows });
  } catch (err) {
    console.error("GET /api/schools error:", err);
    return NextResponse.json(
      { success: false, data: [], message: err.message },
      { status: 500 }
    );
  }
}

// export async function POST(req) {
//   try {
//     const form = await req.formData();
//     const name = String(form.get("name") || "").trim();
//     const address = String(form.get("address") || "").trim();
//     const city = String(form.get("city") || "").trim();
//     const state = String(form.get("state") || "").trim();
//     const contact = String(form.get("contact") || "").trim();
//     const email_id = String(form.get("email_id") || "").trim();
//     const file = form.get("image"); // File | null

//     // Basic validations
//     if (!name || !address || !city || !state || !contact || !email_id) {
//       return NextResponse.json(
//         { success: false, message: "All fields are required." },
//         { status: 400 }
//       );
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email_id)) {
//       return NextResponse.json(
//         { success: false, message: "Invalid email." },
//         { status: 400 }
//       );
//     }

//     let imagePath = "";

//     if (file && typeof file === "object" && file.name) {
//       const allowed = ["image/jpeg", "image/png", "image/webp"];
//       if (!allowed.includes(file.type)) {
//         return NextResponse.json(
//           { success: false, message: "Unsupported image type." },
//           { status: 400 }
//         );
//       }

//       const bytes = await file.arrayBuffer();
//       const buffer = Buffer.from(bytes);

//       const ext = path.extname(file.name) || ".jpg";
//       const fileNameSafe = `${Date.now()}-${Math.random()
//         .toString(36)
//         .slice(2)}${ext}`;
//       const folder = path.join(process.cwd(), "public", "schoolImages");
//       const targetPath = path.join(folder, fileNameSafe);
//       await fs.mkdir(folder, { recursive: true });
//       await fs.writeFile(targetPath, buffer);

//       imagePath = `/schoolImages/${fileNameSafe}`; // public URL path
//     }

//     const pool = getPool();
//     const [result] = await pool.query(
//       "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
//       [name, address, city, state, contact, imagePath, email_id]
//     );

//     return NextResponse.json({
//       success: true,
//       id: result.insertId,
//       image: imagePath,
//     });
//   } catch (err) {
//     return NextResponse.json(
//       { success: false, message: err.message },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req) {
  try {
    const form = await req.formData();
    const name = String(form.get("name") || "").trim();
    const address = String(form.get("address") || "").trim();
    const city = String(form.get("city") || "").trim();
    const state = String(form.get("state") || "").trim();
    const contact = String(form.get("contact") || "").trim();
    const email_id = String(form.get("email_id") || "").trim();
    const file = form.get("image");

    if (!name || !address || !city || !state || !contact || !email_id) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_id)) {
      return NextResponse.json(
        { success: false, message: "Invalid email." },
        { status: 400 }
      );
    }

    let imagePath = "";
    if (file && typeof file === "object" && file.name) {
      const allowed = ["image/jpeg", "image/png", "image/webp"];
      if (!allowed.includes(file.type)) {
        return NextResponse.json(
          { success: false, message: "Unsupported image type." },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const ext = path.extname(file.name) || ".jpg";

      // Upload to Vercel Blob (public)
      const key = `schoolImages/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}${ext}`;
      const uploaded = await put(key, buffer, {
        access: "public",
        contentType: file.type,
        token: process.env.BLOB_READ_WRITE_TOKEN, // set in Vercel
      });
      imagePath = uploaded.url; // store this in DB
    }

    const pool = getPool();
    const [result] = await pool.query(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, imagePath, email_id]
    );

    return NextResponse.json({
      success: true,
      id: result.insertId,
      image: imagePath,
    });
  } catch (err) {
    console.error("POST /api/schools error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
