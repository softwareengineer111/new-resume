import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Preview from '../components/Preview';
import EditableDateRange from '../components/EditableDateRange';
import SecondPreview from '../components/SecondPreview';
import ThirdPreview from '../components/ThirdPreview';
import FourthPreview from '../components/FourthPreview';
import FifthPreview from '../components/FifthPreview';
import SixthPreview from '../components/SixthPreview';
import SeventhPreview from '../components/SeventhPreview';
import EighthPreview from '../components/EighthPreview';
import NinthPreview from '../components/NinthPreview';
import TenthPreview from '../components/TenthPreview';

const initialData = {
  name: 'Firstname Lastname',
  design: {
    fontFamily: 'Inter, system-ui, sans-serif',
    accentColor: '#0070f3',
  },
  avatarUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=John%20Doe',
  title: 'Job Title (e.g. Software Engineer)',
  contact: {
    email: 'your.email@example.com',
    phone: '(555) 123-4567',
    linkedin: 'linkedin.com/in/yourname',
    website: 'yourportfolio.com',
  },
  summary:
    'A brief and compelling summary about your professional background, skills, and career goals. Highlight what makes you a great fit for the role you are applying for.',
  experience: [
    {
      role: 'Job Title',
      company: 'Company Name',
      startDate: '2023-01',
      endDate: '',
      isCurrent: true,
      description:
        'Describe your responsibilities and achievements in this role. Use bullet points to list key accomplishments and the technologies you used.',
    },
  ],
  education: [
    {
      degree: 'Degree or Certificate',
      university: 'University or Institution Name',
      startDate: '2017-09',
      endDate: '2021-06',
      details:
        'Mention any relevant coursework, academic achievements, or extracurricular activities.',
    },
  ],
  skills: [
    'Skill 1 (e.g., JavaScript)',
    'Skill 2 (e.g., React.js)',
    'Skill 3 (e.g., Project Management)',
  ],
  languages: [
    { language: 'Language', proficiency: 'Proficiency (e.g., Fluent)' },
  ],
  hobbies: ['Hobby 1', 'Hobby 2'],
  awards: [
    {
      name: 'Award or Honor Name',
      year: 'Year',
      from: 'Awarding Institution',
    },
  ],
};

export default function Home() {
  const [data, setData] = useState(null); // Start with null until data is loaded
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [template, setTemplate] = useState('first');
  const [saveStatus, setSaveStatus] = useState('Saved');
  const [resumeId, setResumeId] = useState(null);
  const debounceTimeout = useRef(null);

  function update(path, value) {
    setData((prev) => {
      // Use structuredClone for a true deep copy, preventing mutation bugs.
      const newData = structuredClone(prev);
      const keys = path.split('.');
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  }

  function addSection(sectionName, newEntry) {
    setData((prev) => ({
      ...prev,
      [sectionName]: [...(prev[sectionName] || []), newEntry],
    }));
  }

  function removeEntry(sectionName, index) {
    setData((prev) => ({
      ...prev,
      [sectionName]: prev[sectionName].filter((_, i) => i !== index),
    }));
  }

  function reorderList(sectionName, sourceIndex, destIndex) {
    if (sourceIndex === destIndex) return;

    setData((prev) => {
      const list = [...prev[sectionName]];
      const [removed] = list.splice(sourceIndex, 1);
      list.splice(destIndex, 0, removed);

      return {
        ...prev,
        [sectionName]: list,
      };
    });
  }

  // Effect to fetch initial data from the database
  useEffect(() => {
    let id = localStorage.getItem('resumeId');

    if (!id) {
      // First-time visit for this browser: generate a new ID and use initial data.
      id = uuidv4();
      localStorage.setItem('resumeId', id);
      setResumeId(id);
      setData(initialData);
      setSaveStatus('New resume created');
    } else {
      // Returning user: fetch their data from the database.
      setResumeId(id);
      setSaveStatus('Loading...');
      fetch(`/api/resume?id=${id}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          // If not found in DB (e.g., cleared DB), treat as a new resume.
          return initialData;
        })
        .then((dbData) => {
          setData(dbData);
          setSaveStatus('Loaded');
        })
        .catch(() => {
          // On network error, use initial data as a fallback.
          setData(initialData);
          setSaveStatus('Error loading data');
        });
    }
  }, []); // Empty dependency array means this runs once on mount

  // Effect for autosaving with debouncing
  useEffect(() => {
    // Don't save if data or the resumeId is not ready
    if (!data || !resumeId) {
      return;
    }

    setSaveStatus('Saving...');

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId, resumeData: data }),
      })
        .then((res) => setSaveStatus(res.ok ? 'Saved' : 'Error'))
        .catch(() => setSaveStatus('Error'));
    }, 1500); // Save 1.5 seconds after the last edit

    return () => clearTimeout(debounceTimeout.current);
  }, [data, resumeId]); // This effect runs whenever 'data' or 'resumeId' changes

  const downloadPdf = () => {
    const resumeElement = document.querySelector('.preview');
    if (!resumeElement) {
      console.error('Preview element not found for PDF generation.');
      return;
    }

    setPdfLoading(true);

    // Temporarily remove box-shadow for a cleaner PDF capture
    const originalShadow = resumeElement.style.boxShadow;
    resumeElement.style.boxShadow = 'none';

    html2canvas(resumeElement, {
      scale: 2, // Use a higher scale for better image quality
      useCORS: true, // Necessary for external images like avatars
      logging: false,
    })
      .then((canvas) => {
        // Restore the box-shadow after capture
        resumeElement.style.boxShadow = originalShadow;

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'pt',
          format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / pdfWidth;
        const imgHeight = canvasHeight / ratio;

        // Add the image to the PDF, handling multiple pages if necessary
        let heightLeft = imgHeight;
        let position = 0;
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
          heightLeft -= pdfHeight;
        }

        pdf.save('resume.pdf');
        setPdfLoading(false);
      })
      .catch((err) => {
        console.error('Error generating PDF:', err);
        resumeElement.style.boxShadow = originalShadow; // Restore shadow on error
        setPdfLoading(false);
      });
  };

  async function downloadZipServer() {
    // ... (Энэ хэсэгт өөрчлөлт ороогүй, таны өгсөн код хэвээр үлдэнэ)
  }

  return (
    <div className='app'>
      <div className='editor'>
        <div className='panel'>
          <h3>Загвар сонгох</h3>
          <div className='template-selector'>
            <div
              className={`template-thumbnail ${
                template === 'first' ? 'active' : ''
              }`}
              onClick={() => setTemplate('first')}
            >
              <div className='t1-preview'>
                <div className='t1-header'></div>
                <div className='t1-line'></div>
                <div className='t1-line short'></div>
              </div>
              <p>Classic</p>
            </div>
            <div
              className={`template-thumbnail ${
                template === 'second' ? 'active' : ''
              }`}
              onClick={() => setTemplate('second')}
            >
              <div className='t2-preview'>
                <div className='t2-sidebar'></div>
                <div className='t2-main'></div>
              </div>
              <p>Modern</p>
            </div>
            <div
              className={`template-thumbnail ${
                template === 'third' ? 'active' : ''
              }`}
              onClick={() => setTemplate('third')}
            >
              <div className='t3-preview'>
                <div className='t3-header'></div>
                <div className='t3-line'></div>
                <div className='t3-line short'></div>
              </div>
              <p>Elegant</p>
            </div>
            <div
              className={`template-thumbnail ${
                template === 'fourth' ? 'active' : ''
              }`}
              onClick={() => setTemplate('fourth')}
            >
              <div className='t4-preview'>
                <div className='t4-header'>
                  <div className='t4-header-main'></div>
                  <div className='t4-header-side'></div>
                </div>
                <div className='t4-body'></div>
              </div>
              <p>Professional</p>
            </div>
            <div
              className={`template-thumbnail ${
                template === 'fifth' ? 'active' : ''
              }`}
              onClick={() => setTemplate('fifth')}
            >
              <div className='t5-preview'></div>
              <p>Creative</p>
            </div>
            <div
              className={`template-thumbnail ${
                template === 'sixth' ? 'active' : ''
              }`}
              onClick={() => setTemplate('sixth')}
            >
              <div className='t6-preview'></div>
              <p>Compact</p>
            </div>
            <div
              className={`template-thumbnail ${
                template === 'seventh' ? 'active' : ''
              }`}
              onClick={() => setTemplate('seventh')}
            >
              <div className='t7-preview'></div>
              <p>Academic</p>
            </div>
            <div
              className={`template-thumbnail ${
                template === 'eighth' ? 'active' : ''
              }`}
              onClick={() => setTemplate('eighth')}
            >
              <div className='t8-preview'></div>
              <p>Tech</p>
            </div>
            <div
              className={`template-thumbnail ${
                template === 'ninth' ? 'active' : ''
              }`}
              onClick={() => setTemplate('ninth')}
            >
              <div className='t9-preview'></div>
              <p>Corporate</p>
            </div>
            <div
              className={`template-thumbnail ${
                template === 'tenth' ? 'active' : ''
              }`}
              onClick={() => setTemplate('tenth')}
            >
              <div className='t10-preview'></div>
              <p>Minimal</p>
            </div>
          </div>
          <button
            className='btn'
            onClick={downloadPdf}
            disabled={pdfLoading}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            {pdfLoading ? 'Generating PDF...' : 'Download as PDF'}
          </button>
          <div className='save-status'>{saveStatus}</div>
        </div>
        <div className='panel' style={{ marginTop: '24px' }}>
          <h3>Design & Font Toolbar</h3>
          <div className='field'>
            <label>Accent Color</label>
            <input
              type='color'
              className='color-input'
              value={data?.design.accentColor || '#0070f3'}
              onChange={(e) => update('design.accentColor', e.target.value)}
            />
          </div>
          <div className='field'>
            <label>Font Family</label>
            <select
              value={data?.design.fontFamily || 'Inter, system-ui, sans-serif'}
              onChange={(e) => update('design.fontFamily', e.target.value)}
            >
              <option value='Inter, system-ui, sans-serif'>
                Inter (Default)
              </option>
              <option value="'Georgia', serif">Georgia (Serif)</option>
              <option value="'Roboto', sans-serif">Roboto (Sans-serif)</option>
              <option value="'Lato', sans-serif">Lato (Sans-serif)</option>
              <option value="'Montserrat', sans-serif">
                Montserrat (Sans-serif)
              </option>
              <option value="'Courier New', monospace">
                Courier (Monospace)
              </option>
            </select>
          </div>
        </div>
      </div>

      {!data ? (
        <div>Loading...</div>
      ) : (
        <>
          {template === 'first' && (
            <Preview
              data={data}
              onUpdate={update}
              onAdd={addSection}
              onRemove={removeEntry}
              onReorder={reorderList}
            />
          )}
          {template === 'second' && (
            <SecondPreview
              data={data}
              onUpdate={update}
              onAdd={addSection}
              onRemove={removeEntry}
              onReorder={reorderList}
            />
          )}
          {template === 'third' && (
            <ThirdPreview
              data={data}
              onUpdate={update}
              onAdd={addSection}
              onRemove={removeEntry}
              onReorder={reorderList}
            />
          )}
          {template === 'fourth' && (
            <FourthPreview
              data={data}
              onUpdate={update}
              onAdd={addSection}
              onRemove={removeEntry}
              onReorder={reorderList}
            />
          )}
          {template === 'fifth' && (
            <FifthPreview
              data={data}
              onUpdate={update}
              onAdd={addSection}
              onRemove={removeEntry}
              onReorder={reorderList}
            />
          )}
          {template === 'sixth' && (
            <SixthPreview
              data={data}
              onUpdate={update}
              onAdd={addSection}
              onRemove={removeEntry}
              onReorder={reorderList}
            />
          )}
          {template === 'seventh' && (
            <SeventhPreview
              data={data}
              onUpdate={update}
              onAdd={addSection}
              onRemove={removeEntry}
              onReorder={reorderList}
            />
          )}
          {template === 'eighth' && (
            <EighthPreview
              data={data}
              onUpdate={update}
              onAdd={addSection}
              onRemove={removeEntry}
              onReorder={reorderList}
            />
          )}
          {template === 'ninth' && (
            <NinthPreview
              data={data}
              onUpdate={update}
              onAdd={addSection}
              onRemove={removeEntry}
              onReorder={reorderList}
            />
          )}
          {template === 'tenth' && (
            <TenthPreview
              data={data}
              onUpdate={update}
              onAdd={addSection}
              onRemove={removeEntry}
              onReorder={reorderList}
            />
          )}
        </>
      )}
    </div>
  );
}
