import clientPromise from '../../mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const collection = db.collection('resumes');
  const resumeId = 'default-resume'; // Using a single document for this app

  if (req.method === 'GET') {
    try {
      const resume = await collection.findOne({ _id: resumeId });
      if (resume) {
        res.status(200).json(resume.data);
      } else {
        // If no resume is found, the client will use its initial default data.
        res.status(404).json({ message: 'Resume not found.' });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else if (req.method === 'POST') {
    try {
      const resumeData = req.body;
      await collection.updateOne(
        { _id: resumeId },
        { $set: { data: resumeData } },
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
