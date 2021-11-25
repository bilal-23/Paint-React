import { connectToDatabase } from '../../util/database'
import { ObjectID } from 'bson';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(400).json({ error: 'Invalid method request' });
        return;
    }
    const id = req.body.id || false;


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

    // delete from db
    try {
        let result;
        const db = client.db();
        result = await db.collection('canvasPaths').deleteOne({ _id: ObjectID(id) })
        client.close();
        res.status(201).json({ message: 'Deleted', error: null, result: result });
    }
    catch (error) {
        client.close();
        res.status(400).json({ error: 'Something went wrong', message: error.message })
    }
}