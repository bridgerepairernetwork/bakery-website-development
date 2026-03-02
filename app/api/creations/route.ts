import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

// public endpoint: returns paginated creations without auth
// query parameters:
//   limit - number of items to fetch (default 10)
//   startAfter - value of createdAt from last item to paginate
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const startAfter = url.searchParams.get("startAfter");

    let query: any = db.collection("creations").orderBy("createdAt", "desc");
    if (startAfter) {
      query = query.startAfter(startAfter);
    }
    if (limit) {
      query = query.limit(limit);
    }

    const snap = await query.get();
    const items: any[] = [];
    snap.forEach((doc: any) => items.push({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ items });
  } catch (err: any) {
    console.error("public GET creations error", err);
    return NextResponse.json(
      { error: err.message || "Failed" },
      { status: 500 },
    );
  }
}
