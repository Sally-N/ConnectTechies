import axios from "axios";
import axiosRetry from 'axios-retry';
import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

axiosRetry(axios, {
  retries: 3, // Number of retry attempts
  retryDelay: (retryCount) => {
    return retryCount * 1000; // Exponential backoff delay
  },
  retryCondition: (error) => {
    return error.response?.status === 429; // Retry only on 429 status code
  },
});

export async function POST(req:NextRequest) {
    const body = req.json();

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          messages: body,
          max_tokens: 50,
          model: "gpt-3.5-turbo",
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const output =
        response.data.choices[0]?.message?.content?.trim() || "Sorry, I do not understand.";
     
        return NextResponse.json({
          status: 200,
          message: output
        })
        // res.status(200).json({ output });

    } catch (error) {
      console.error(error);
      return NextResponse.json({
        status: 500,
        err: error
      })
      // res.status(500).json({ error: "Internal Server Error" });
    }

}