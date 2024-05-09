import type { NextApiRequest, NextApiResponse } from "next";
import { ILogProps, addLog, getAllUsers } from 'lib/api/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const result = await getAllUsers();
      return res.status(200).json(result);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: e.toString()
      });
    }
  } else if (req.method === 'POST') {
    const { logData } = req.body
    try {
      const logInfo: ILogProps = {
        ...logData,
        timestamp: Date.now()
      }
      const result = await addLog(logInfo);
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
