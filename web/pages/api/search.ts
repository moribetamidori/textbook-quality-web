import type { NextApiRequest, NextApiResponse } from "next";

type GetDocsRequest = {
  topic: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body: GetDocsRequest = req.body;
    const response = await fetch("http://207.53.234.170:8888/get_docs", {
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
      res.status(response.status).json({ message: "Failed to get documents." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}