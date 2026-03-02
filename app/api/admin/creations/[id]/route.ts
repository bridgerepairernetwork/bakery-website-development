import { NextResponse } from "next/server";
import { db, verifyIdToken } from "@/lib/firebaseAdmin";
import cloudinary from "@/lib/cloudinary";

async function authenticate(request: Request) {
  const auth = request.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }
  const idToken = auth.split(" ")[1];
  await verifyIdToken(idToken);
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await authenticate(request);
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { error: "Missing creation ID" },
        { status: 400 },
      );
    }
    const snap = await db.collection("creations").doc(id).get();
    if (!snap.exists) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ id: snap.id, ...snap.data() });
  } catch (err: any) {
    console.error("GET creation error", err);
    return NextResponse.json(
      { error: err.message || "Failed" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await authenticate(request);
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { error: "Missing creation ID" },
        { status: 400 },
      );
    }
    const body = await request.json();
    const {
      title,
      description,
      category,
      featured,
      imageUrl,
      cloudinaryId,
      oldCloudinaryId,
    } = body;

    const updates: any = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (category !== undefined) updates.category = category;
    if (featured !== undefined) updates.featured = featured;
    if (imageUrl !== undefined) updates.imageUrl = imageUrl;
    if (cloudinaryId !== undefined) updates.cloudinaryId = cloudinaryId;

    if (oldCloudinaryId && cloudinaryId && oldCloudinaryId !== cloudinaryId) {
      try {
        await cloudinary.uploader.destroy(oldCloudinaryId);
      } catch (e) {
        console.warn("failed to delete old image", e);
      }
    }

    await db.collection("creations").doc(id).update(updates);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("PUT creation error", err);
    if (err.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
      { error: err.message || "Failed" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await authenticate(request);

    // validate path parameter
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { error: "Missing creation ID" },
        { status: 400 },
      );
    }

    // attempt to delete existing document/image
    const snap = await db.collection("creations").doc(id).get();
    if (snap.exists) {
      const data = snap.data() as any;
      if (data.cloudinaryId) {
        try {
          await cloudinary.uploader.destroy(data.cloudinaryId);
        } catch (e) {
          console.warn("failed to delete image", e);
        }
      }
    }
    // firestore-admin uses method on document reference
    await db.collection("creations").doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("DELETE creation error", err);
    if (err.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
      { error: err.message || "Failed" },
      { status: 500 },
    );
  }
}
