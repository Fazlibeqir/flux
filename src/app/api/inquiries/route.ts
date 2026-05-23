import { NextResponse } from "next/server";
import { notifyNewInquiry } from "@/lib/notifications/inquiry";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const serviceType = String(body.serviceType ?? body.service_type ?? "").trim() || null;
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const supabase = supabaseServer();
    const { error } = await supabase.from("inquiries").insert({
      name,
      email,
      service_type: serviceType,
      message,
      status: "new",
    });

    if (error) {
      console.error("inquiry insert error:", error.message);
      return NextResponse.json({ error: "Could not save your message. Please email us directly." }, { status: 500 });
    }

    void notifyNewInquiry({ name, email, serviceType, message });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
