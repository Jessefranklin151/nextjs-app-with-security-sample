// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import HttpClient from '../../core/http-client-adapter';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const response = await HttpClient.post("http://localhost:3333/api/v1/login", req.body);
    const token = response.headers.get("Authorization");
    if (token) {
      res.setHeader("Authorization", token)
    }
    res.status(response.status)
    res.json(response.body);
  }
}
