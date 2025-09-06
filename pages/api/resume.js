import clientPromise from '../../mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const collection = db.collection('resumes');

  if (req.method === 'GET') {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: 'A resume ID is required.' });
    }
    try {
      const resume = await collection.findOne({ _id: id });
      if (resume) {
        res.status(200).json(resume.data);
      } else {
        res.status(404).json({ message: 'Resume not found.' });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { resumeId, resumeData } = req.body;
      if (!resumeId) {
        return res.status(400).json({ message: 'A resume ID is required.' });
      }
      await collection.updateOne(
        { _id: resumeId },
        { $set: { data: resumeData, updatedAt: new Date() } },
        { upsert: true } // This creates the document if it doesn't exist
      );
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
