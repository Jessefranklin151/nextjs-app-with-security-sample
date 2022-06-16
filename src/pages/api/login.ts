// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import HttpClient from '../../core/http-client-adapter';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const credentials = req.body;
    const clientResponse = await HttpClient.post("http://localhost:3333/api/v1/login", credentials);
    const response = await clientResponse.json();
    const token = clientResponse.headers.get("Authorization")
    if (token) {
      res.setHeader("Authorization", token)
    }
    res.status(clientResponse.status);
    res.json(response);
  }
}
