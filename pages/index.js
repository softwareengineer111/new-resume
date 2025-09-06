import { useState, useRef } from 'react';
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

export const initialData = {
  name: 'Золбоо Цолмон',
  title: 'Frontend Developer',
  contact: {
    email: 'altangerel.b@example.com',
    phone: '+976 9911-XXXX',
    linkedin: 'linkedin.com/in/altangerel',
    website: 'www.altangerel.dev',
  },
  summary: 'Өөрийн танилцуулга, ур чадвар, туршлагаа багтаасан товч мэдээлэл.',
  experience: [
    {
      role: 'Frontend Developer',
      company: 'Tech Solutions LLC',
      startDate: '2023-01',
      endDate: '',
      isCurrent: true,
      description:
        'React, Next.js, TypeScript ашиглан вэб аппликейшн хөгжүүлэх, API интеграци хийх гэх мэт.',
    },
    {
      role: 'Junior Web Developer',
      company: 'Digital Agency',
      startDate: '2021-03',
      endDate: '2022-12',
      isCurrent: false,
      description:
        'HTML, CSS, JavaScript ашиглан вэб хуудас үүсгэх, дизайн хийх, сервер талын хөгжүүлэлтэд туслах.',
    },
  ],
  education: [
    {
      degree: 'Компьютерийн ухааны бакалавр',
      university: 'МУИС',
      startDate: '2017-09',
      endDate: '2021-06',
      details:
        'Өгөгдлийн бүтэц, алгоритм, вэб хөгжүүлэлт, програмчлалын хэлний хичээлүүд.',
    },
  ],
  skills: [
    'JavaScript (ES6+)',
    'React.js',
    'Next.js',
    'TypeScript',
    'HTML & CSS',
    'Node.js',
    'Git',
  ],
};

export default function Home() {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [template, setTemplate] = useState('first');

  function update(path, value) {
    setData((prev) => {
      const newData = { ...prev };
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
        </div>
      </div>

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
    </div>
  );
}
