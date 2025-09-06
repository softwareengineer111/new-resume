import JSZip from 'jszip'; // `npm install jszip` хийх шаардлагатай
import { Resend } from 'resend'; // Жишээнд Resend-г ашигласан. Та өөр хувилбар хэрэглэж болно.

// Next.js API route
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { resume } = req.body;

  try {
    const zip = new JSZip();

    // Generate a basic HTML resume file
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${resume.name}'s Resume</title>
        <style>
          body { font-family: sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: auto; }
          h1, h2 { color: #333; }
          .section { margin-bottom: 20px; }
          ul { list-style: none; padding: 0; }
          li { margin-bottom: 8px; }
        </style>
      </head>
      <body>
        <h1>${resume.name}</h1>
        <h2>${resume.title}</h2>
        <div class="section">
          <h3>Contact</h3>
          <ul>
            <li>Email: ${resume.contact.email}</li>
            <li>Phone: ${resume.contact.phone}</li>
            <li>LinkedIn: ${resume.contact.linkedin}</li>
            <li>Website: ${resume.contact.website}</li>
          </ul>
        </div>
        <div class="section">
          <h3>Summary</h3>
          <p>${resume.summary}</p>
        </div>
        <div class="section">
          <h3>Experience</h3>
          ${resume.experience
            .map(
              (exp) => `
            <div>
              <strong>${exp.role}</strong> at ${exp.company} (${exp.date})
              <p>${exp.description}</p>
            </div>
          `
            )
            .join('')}
        </div>
        <div class="section">
          <h3>Education</h3>
          ${resume.education
            .map(
              (edu) => `
            <div>
              <strong>${edu.degree}</strong> from ${edu.university} (${edu.date})
              <p>${edu.details}</p>
            </div>
          `
            )
            .join('')}
        </div>
        <div class="section">
          <h3>Skills</h3>
          <ul>
            ${resume.skills.map((skill) => `<li>${skill}</li>`).join('')}
          </ul>
        </div>
      </body>
      </html>
    `;
    zip.file('resume.html', htmlContent);

    // Generate and send the ZIP file
    const content = await zip.generateAsync({ type: 'nodebuffer' });
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.zip');
    res.send(content);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
