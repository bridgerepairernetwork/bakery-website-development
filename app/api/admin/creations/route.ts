import { NextResponse } from "next/server";
import { db, verifyIdToken } from "@/lib/firebaseAdmin";

async function authenticate(request: Request) {
  const auth = request.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }
  const idToken = auth.split(" ")[1];
  await verifyIdToken(idToken);
}

export async function GET(request: Request) {
  try {
    await authenticate(request);
    const snap = await db
      .collection("creations")
      .orderBy("createdAt", "desc")
      .get();
    const items: any[] = [];
    snap.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ items });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await authenticate(request);
    const body = await request.json();
    const {
      title,
      description,
      category,
      price,
      featured = false,
      imageUrl,
      cloudinaryId,
      type,
    } = body;

    if (!title || !description || !category || !imageUrl || !cloudinaryId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newDocRef = await db.collection("creations").add({
      title,
      description,
      category,
      price,
      featured,
      imageUrl,
      type,
      cloudinaryId,
      createdAt: new Date().toISOString(),
    });
    const newDoc = { id: newDocRef.id };

    return NextResponse.json({ id: newDoc.id }, { status: 201 });
  } catch (err: any) {
    if (err.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
      { error: err.message || "Failed" },
      { status: 500 },
    );
  }
}
