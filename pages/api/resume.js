import clientPromise from '../../mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection('resumes');

    switch (req.method) {
      case 'GET': {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ message: 'A resume ID is required.' });
        }
        const resume = await collection.findOne({ _id: id });
        if (resume) {
          res.status(200).json(resume.data);
        } else {
          res.status(404).json({ message: 'Resume not found.' });
        }
        break;
      }
      case 'POST': {
        const { resumeId, resumeData } = req.body;
        if (!resumeId || !resumeData) {
          return res
            .status(400)
            .json({ message: 'Both resumeId and resumeData are required.' });
        }
        await collection.updateOne(
          { _id: resumeId },
          { $set: { data: resumeData, updatedAt: new Date() } },
          { upsert: true } // This creates the document if it doesn't exist
        );
        res
          .status(200)
          .json({ success: true, message: 'Resume saved successfully.' });
        break;
      }
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (e) {
    console.error('API Error:', e);
    res
      .status(500)
      .json({
        message: 'An internal server error occurred.',
        error: e.message,
      });
  }
}
