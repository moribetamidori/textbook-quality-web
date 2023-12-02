import type { NextApiRequest, NextApiResponse } from "next";

type BookGeneratorRequest = {
  topics_file: string;
  books_file: string;
  workers: number;
  max?: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body: BookGeneratorRequest = req.body;
    const response = await fetch("http://app:8000/generate_books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ message: "Book generation failed." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
