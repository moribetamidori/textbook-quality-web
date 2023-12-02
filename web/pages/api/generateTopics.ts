import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const response = await fetch("http://app:8000/generate_topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.status === "success" && data.file) {
        const fileResponse = await fetch(data.file);
        if (fileResponse.ok) {
          const fileData = await fileResponse.json();
          data.fileContent = fileData;
        }
      }
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ message: "Generation failed." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
