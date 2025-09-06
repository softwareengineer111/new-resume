import { useState } from 'react';
import Preview from '../components/Preview';
import SecondPreview from '../components/SecondPreview';

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
      date: '2023 — Одоог хүртэл',
      description:
        'React, Next.js, TypeScript ашиглан вэб аппликейшн хөгжүүлэх, API интеграци хийх гэх мэт.',
    },
    {
      role: 'Junior Web Developer',
      company: 'Digital Agency',
      date: '2021 — 2023',
      description:
        'HTML, CSS, JavaScript ашиглан вэб хуудас үүсгэх, дизайн хийх, сервер талын хөгжүүлэлтэд туслах.',
    },
  ],
  education: [
    {
      degree: 'Компьютерийн ухааны бакалавр',
      university: 'МУИС',
      date: '2017 — 2021',
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

  async function downloadZipServer() {
    // ... (Энэ хэсэгт өөрчлөлт ороогүй, таны өгсөн код хэвээр үлдэнэ)
  }

  return (
    <div className='app'>
      <div className='editor'>
        <div className='panel'>
          <h3>Загвар сонгох</h3>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <button className='btn' onClick={() => setTemplate('first')}>
              Загвар 1
            </button>
            <button className='btn' onClick={() => setTemplate('second')}>
              Загвар 2
            </button>
          </div>
          {/* <button
            className='btn'
            onClick={downloadZipServer}
            disabled={loading}
          >
            {loading ? 'Бэлтгэж байна...' : 'Download ZIP'}
          </button> */}
          {/* <p className='small' style={{ marginTop: '12px' }}>
            Preview дээрээ шууд edit хийж болно 👆
          </p> */}
        </div>
      </div>

      {template === 'first' && (
        <Preview
          data={data}
          onUpdate={update}
          onAdd={addSection}
          onRemove={removeEntry}
        />
      )}
      {template === 'second' && (
        <SecondPreview
          data={data}
          onUpdate={update}
          onAdd={addSection}
          onRemove={removeEntry}
        />
      )}
    </div>
  );
}
