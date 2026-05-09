import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // ── CORS preflight ────────────────────────────────────────────────────────
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: CORS_HEADERS,
    });
  }

  try {
    const { email, user_type, message } = await req.json();

    // Basic validation
    if (!email || !user_type || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        },
      );
    }

    // Ensure user_type matches DB constraints: 'local' or 'explorer'
    if (user_type !== "local" && user_type !== "explorer") {
      return new Response(JSON.stringify({ error: "Invalid user_type" }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // 1️⃣ Upsert into waitlist
    const { error: upsertError } = await supabase
      .from("waitlist")
      .upsert({ email, user_type }, { onConflict: "email" });

    if (upsertError) throw upsertError;

    // 2️⃣ Insert into contact_messages
    const { error: msgError } = await supabase
      .from("contact_messages")
      .insert({ email, user_type, message });

    if (msgError) throw msgError;

    // 3️⃣ Send emails via Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const inboxEmail = Deno.env.get("INBOX_EMAIL");

    console.log("Resend config:", {
      hasKey: !!resendApiKey,
      inboxEmail,
    });

    if (resendApiKey && inboxEmail) {
      // 3a. Owner email (to you)
      const ownerEmailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Contact Form <koffe.kyoto@gmail.com>", // use your Resend-allowed sender
          to: inboxEmail, // likely same email as your Resend login while testing [web:170]
          reply_to: [email], // array form [web:157]
          subject: `New message from ${
            user_type === "local" ? "📍 Local" : "🌏 Cultural"
          } Explorer — ${email}`,
          html: `
            <div style="font-family:sans-serif;max-width:560px;margin:auto;padding:32px;color:#261D0D">
              <h2 style="margin:0 0 4px">New Contact Message</h2>
              <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0"/>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Type:</strong> ${
                user_type === "local"
                  ? "📍 Local Explorer"
                  : "🌏 Cultural Explorer"
              }</p>
              <p><strong>Message:</strong></p>
              <blockquote style="border-left:3px solid #261D0D;padding-left:16px;color:#555">
                ${message.replace(/\n/g, "<br/>")}
              </blockquote>
              <hr style="border:none;border-top:1px solid #e5e5e5;margin:24px 0"/>
              <p style="color:#aaa;font-size:12px">
                Reply to this email to respond directly to ${email}
              </p>
            </div>
          `,
        }),
      });

      const ownerText = await ownerEmailRes.text();
      console.log("Resend owner status:", ownerEmailRes.status, ownerText);

      if (!ownerEmailRes.ok) {
        throw new Error(`Resend owner email failed: ${ownerText}`);
      }

      // 3b. Confirmation email to USER
      // const userEmailRes = await fetch("https://api.resend.com/emails", {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${resendApiKey}`,
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     from: "Koffee <koffe.kyoto@gmail.com>",
      //     to: email,
      //     subject: "We received your message ✓",
      //     html: `
      //       <div style="font-family:sans-serif;max-width:560px;margin:auto;padding:32px;color:#261D0D">
      //         <h2 style="margin:0 0 8px">Thanks for reaching out!</h2>
      //         <p style="color:#7a7060;line-height:1.6">
      //           We've received your message and will get back to you soon.
      //         </p>
      //         <hr style="border:none;border-top:1px solid #e5e5e5;margin:24px 0"/>
      //         <p style="font-size:14px;color:#7a7060">Here's a copy of what you sent:</p>
      //         <p><strong>Type:</strong> ${
      //           user_type === "local"
      //             ? "📍 Local Explorer"
      //             : "🌏 Cultural Explorer"
      //         }</p>
      //         <p><strong>Message:</strong></p>
      //         <blockquote style="border-left:3px solid #261D0D;padding-left:16px;color:#555">
      //           ${message.replace(/\n/g, "<br/>")}
      //         </blockquote>
      //         <hr style="border:none;border-top:1px solid #e5e5e5;margin:24px 0"/>
      //         <p style="color:#aaa;font-size:12px">
      //           You're receiving this because you submitted a message on our website.
      //         </p>
      //       </div>
      //     `,
      //   }),
      // });

      // const userText = await userEmailRes.text();
      // console.log("Resend user status:", userEmailRes.status, userText);

      // if (!userEmailRes.ok) {
      //   console.warn(
      //     "User confirmation email failed (non-blocking):",
      //     userText,
      //   );
      // }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }
});
