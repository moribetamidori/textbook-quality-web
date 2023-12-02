import { writeFile, mkdir } from "fs";
import { resolve, dirname } from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { openAIKey, serplyKey } = req.body;

    const data = `OPENAI_KEY=${openAIKey}\nSERPLY_KEY=${serplyKey}\nSEARCH_BACKEND=serply\nDATABASE_URL=postgresql://admin:admin@db/textbook\n`;

    const filePath = resolve("../textbook_quality/local.env");

    mkdir(dirname(filePath), { recursive: true }, (err) => {
      if (err) {
        res.status(500).json({ message: "Failed to create directory." });
        throw err;
      } else {
        writeFile(filePath, data, (err: any) => {
          if (err) {
            res.status(500).json({ message: "Failed to write keys." });
            throw err;
          } else {
            res
              .status(200)
              .json({ message: "Keys have been written successfully." });
          }
        });
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
