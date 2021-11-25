import { connectToDatabase } from '../../util/database';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(400).json({ error: 'Invalid method request' });
        return;
    }
    const session = await getSession({ req: context.req });
    //connecting to data
    let client;
    try {
        client = await connectToDatabase();
        if (!client) throw new Error('Database Connection Failed');
    }
    catch (error) {
        client?.close();
        res.status(503).json({ error: error.message });
        return;
    }

    // get from db
    try {
        let result;
        const db = client.db();
        result = await db.collection('canvasPaths').find({ email: session.user.email }).sort({ timestamp: -1 }).toArray();
        client.close();
        res.status(201).json({ message: 'Loaded', error: null, result: result });
    }
    catch (error) {
        client.close();
        res.status(400).json({ error: 'Something went wrong', message: error.message })
    }
}