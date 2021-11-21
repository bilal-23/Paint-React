import { connectToDatabase } from '../../util/database'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(400).json({ error: 'Invalid method request' });
        return;
    }
    const path = req.body.path;
    const email = req.body.email;

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

    // save paths to db
    try {
        const db = client.db();
        const result = await db.collection('canvasPaths').insertOne({ path: path, email: email });
        client.close();
        res.status(201).json({ message: 'Saved', error: null, result: result });
    }
    catch (error) {
        client.close();
        res.status(400).json({ error: 'Something went wrong', message: error.message })
    }
}