import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const presetsSnapshot = await getDocs(collection(db, "presets"));

    const presets = presetsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new Response(JSON.stringify({ presets }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch presets" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
