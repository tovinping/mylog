import type { NextApiRequest, NextApiResponse } from "next";
import { UserProps, addUser, searchUser } from 'lib/api/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const result = await searchUser(req.query.query as string);
      return res.status(200).json(result);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: e.toString()
      });
    }
  } else if (req.method === 'PUT') {
    const { content } = req.body;
    try {
      const user: UserProps = {
        content,
        timestamp: Date.now()
      }
      const result = await addUser(user);
      if (result) {
        await res.revalidate(`/`);
      }
      return res.status(200).json({});
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: e.toString()
      });
    }
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
