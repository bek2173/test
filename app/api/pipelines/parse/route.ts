import { NextResponse } from "next/server";

// This is the URL of your FastAPI backend.
// In a real application, this would be an environment variable.
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000"; // Changed to NEXT_PUBLIC_BACKEND_URL

export async function POST(request: Request) {
  try {
    const { nodes, edges } = await request.json();

    const backendResponse = await fetch(`${BACKEND_URL}/pipelines/parse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nodes, edges }),
    });

    // Always get the text response first for debugging, regardless of .ok status
    const rawBackendResponseText = await backendResponse.text();

    if (!backendResponse.ok) {
      console.error("Backend error response (status not OK):", backendResponse.status, rawBackendResponseText);
      return NextResponse.json(
        { error: `Backend error: ${backendResponse.statusText}`, details: rawBackendResponseText },
        { status: backendResponse.status }
      );
    }

    let data;
    try {
      data = JSON.parse(rawBackendResponseText);
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      console.error("Raw response that caused parsing error:", rawBackendResponseText);
      return NextResponse.json(
        { error: "Failed to parse backend response as JSON", details: rawBackendResponseText },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API route (request or fetch setup):", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
