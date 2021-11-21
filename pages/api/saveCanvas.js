import { connectToDatabase } from '../../util/database'
import { ObjectID } from 'bson';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(400).json({ error: 'Invalid method request' });
        return;
    }
    const path = req.body.path;
    const email = req.body.email;
    const name = req.body.name;
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

    // save paths to db
    try {
        let result;
        const db = client.db();
        // IF id then update
        if (id) {
            result = await db.collection('canvasPaths')
                .updateOne(
                    { _id: ObjectID(id), email: email },
                    { $set: { name: name, timestamp: new Date(), path: path } }
                )
        } else {
            result = await db.collection('canvasPaths').insertOne({ path: path, email: email, name: name, timestamp: new Date() });
        }
        client.close();
        res.status(201).json({ message: 'Saved', error: null, result: result });

    }
    catch (error) {
        client.close();
        res.status(400).json({ error: 'Something went wrong', message: error.message })
    }
}