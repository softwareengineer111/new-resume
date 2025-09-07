import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Preview from '../components/Preview';
import EditableDateRange from '../common/EditableDateRange';
import SecondPreview from '../components/SecondPreview';
import ThirdPreview from '../components/ThirdPreview';
import FourthPreview from '../components/FourthPreview';
import FifthPreview from '../components/FifthPreview';
import SixthPreview from '../components/SixthPreview';
import SeventhPreview from '../components/SeventhPreview';
import EighthPreview from '../components/EighthPreview';
import NinthPreview from '../components/NinthPreview';
import TenthPreview from '../components/TenthPreview';
import EleventhPreview from '../components/EleventhPreview';
import TwelfthPreview from '../components/TwelfthPreview';

// Define templates in a structured way to avoid repetition
const TEMPLATES = [
  {
    id: 'first',
    name: 'Classic',
    component: Preview,
    thumbnail: (
      <div className='t1-preview'>
        <div className='t1-header'></div>
        <div className='t1-line'></div>
        <div className='t1-line short'></div>
      </div>
    ),
  },
  {
    id: 'second',
    name: 'Modern',
    component: SecondPreview,
    thumbnail: (
      <div className='t2-preview'>
        <div className='t2-sidebar'></div>
        <div className='t2-main'></div>
      </div>
    ),
  },
  {
    id: 'third',
    name: 'Elegant',
    component: ThirdPreview,
    thumbnail: (
      <div className='t3-preview'>
        <div className='t3-header'></div>
        <div className='t3-line'></div>
        <div className='t3-line short'></div>
      </div>
    ),
  },
  {
    id: 'fourth',
    name: 'Professional',
    component: FourthPreview,
    thumbnail: (
      <div className='t4-preview'>
        <div className='t4-header'>
          <div className='t4-header-main'></div>
          <div className='t4-header-side'></div>
        </div>
        <div className='t4-body'></div>
      </div>
    ),
  },
  {
    id: 'fifth',
    name: 'Creative',
    component: FifthPreview,
    thumbnail: <div className='t5-preview'></div>,
  },
  {
    id: 'sixth',
    name: 'Compact',
    component: SixthPreview,
    thumbnail: <div className='t6-preview'></div>,
  },
  {
    id: 'seventh',
    name: 'Academic',
    component: SeventhPreview,
    thumbnail: <div className='t7-preview'></div>,
  },
  {
    id: 'eighth',
    name: 'Tech',
    component: EighthPreview,
    thumbnail: <div className='t8-preview'></div>,
  },
  {
    id: 'ninth',
    name: 'Corporate',
    component: NinthPreview,
    thumbnail: <div className='t9-preview'></div>,
  },
  {
    id: 'tenth',
    name: 'Minimal',
    component: TenthPreview,
    thumbnail: <div className='t10-preview'></div>,
  },
  {
    id: 'eleventh',
    name: 'Chronological',
    component: EleventhPreview,
    thumbnail: <div className='t11-preview'></div>,
  },
  {
    id: 'twelfth',
    name: 'Artistic',
    component: TwelfthPreview,
    thumbnail: <div className='t12-preview'></div>,
  },
];

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

// A helper for API calls with a timeout
const apiCall = async (url, options = {}, timeout = 20000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export default function Home() {
  const [data, setData] = useState(null); // Start with null until data is loaded
  const [pdfLoading, setPdfLoading] = useState(false);
  const [templateId, setTemplateId] = useState('first');
  const [saveStatus, setSaveStatus] = useState('Saved');
  const [resumeId, setResumeId] = useState(null);
  const debounceTimeout = useRef(null);
  const isInitialLoad = useRef(true);

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

    const loadResume = async (resumeIdToLoad) => {
      setResumeId(resumeIdToLoad);
      setSaveStatus('Loading...');
      try {
        const res = await apiCall(`/api/resume?id=${resumeIdToLoad}`);
        isInitialLoad.current = true; // Prevent autosave on this initial load

        if (res.ok) {
          const dbData = await res.json();
          setData(dbData);
          setSaveStatus('Loaded');
        } else {
          // If not found in DB (e.g., cleared DB), treat as a new resume.
          setData(initialData);
          setSaveStatus('Loaded'); // Still "Loaded", just with initial data
        }
      } catch (error) {
        isInitialLoad.current = true; // Prevent autosave on this failed load
        if (error.name === 'AbortError') {
          setSaveStatus('Server is not responding. Working offline.');
        } else {
          setSaveStatus('Error loading data. Working offline.');
        }
        console.error('Failed to fetch resume:', error);
        // On network error or timeout, use initial data as a fallback.
        setData(initialData);
      }
    };

    if (!id) {
      // First-time visit for this browser: generate a new ID and use initial data.
      id = uuidv4();
      localStorage.setItem('resumeId', id);
      setResumeId(id);
      setData(initialData);
      setSaveStatus('New resume created');
      isInitialLoad.current = true; // Prevent autosave
    } else {
      // Returning user: fetch their data from the database.
      loadResume(id);
    }
  }, []); // Empty dependency array means this runs once on mount

  // Effect for autosaving with debouncing
  useEffect(() => {
    // Don't save if data or the resumeId is not ready
    if (!data || !resumeId) return;

    // Prevent autosave on the initial data load
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    setSaveStatus('Saving...');

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      try {
        const res = await apiCall('/api/resume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resumeId, resumeData: data }),
        });
        setSaveStatus(res.ok ? 'Saved' : 'Error saving');
      } catch (error) {
        setSaveStatus(
          error.name === 'AbortError' ? 'Error: Save timed out' : 'Error saving'
        );
        console.error('Failed to save resume:', error);
      }
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

  // Find the current template's component based on the selected ID
  const CurrentPreviewComponent =
    TEMPLATES.find((t) => t.id === templateId)?.component || Preview;

  // Props that are common to all preview components
  const commonPreviewProps = {
    data,
    onUpdate: update,
    onAdd: addSection,
    onRemove: removeEntry,
    onReorder: reorderList,
  };

  return (
    <div className='app'>
      <div className='editor'>
        <div className='panel'>
          <h3>Загвар сонгох</h3>
          <div className='template-selector'>
            {TEMPLATES.map((t) => (
              <div
                key={t.id}
                className={`template-thumbnail ${
                  templateId === t.id ? 'active' : ''
                }`}
                onClick={() => setTemplateId(t.id)}
              >
                {t.thumbnail}
                <p>{t.name}</p>
              </div>
            ))}
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
      </div>

      {!data ? (
        <div>Loading...</div>
      ) : (
        <CurrentPreviewComponent {...commonPreviewProps} />
      )}
    </div>
  );
}
