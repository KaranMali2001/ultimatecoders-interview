import { BASE_URL } from "@/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";

  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        language: "en-US",
        page: page,
      },
    });

    return NextResponse.json({
      ...response.data,
      page: parseInt(page, 10),
    });
  } catch (error) {
    console.error("Error fetching from TMDB:", error);
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}
