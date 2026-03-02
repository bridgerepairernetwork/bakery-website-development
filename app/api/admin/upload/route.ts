import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { verifyIdToken } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  try {
    // Authorization header must be Bearer <idToken>
    const auth = request.headers.get("authorization");
    if (!auth || !auth.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const idToken = auth.split(" ")[1];
    await verifyIdToken(idToken);

    const form = await request.formData();
    const file = form.get("file");
    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // convert to base64
    const buffer = Buffer.from(await file.arrayBuffer());
    const mime = (file as Blob).type || "image/jpeg";
    const dataUri = `data:${mime};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "portfolio",
      resource_type: "image",
    });

    return NextResponse.json(
      {
        url: result.secure_url,
        public_id: result.public_id,
      },
      { status: 200 },
    );
  } catch (err: any) {
    console.error("Upload error", err);
    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 },
    );
  }
}
