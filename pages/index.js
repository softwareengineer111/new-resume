import { useState } from 'react';
import Preview from '../components/Preview';

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
    <div style={{ padding: 20 }}>
      {/* <h2>Resume Builder (Inline Editing)</h2> */}
      <div className='app'>
        <Preview
          data={data}
          onUpdate={update}
          onAdd={addSection}
          onRemove={removeEntry}
        />
        {/* <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className='panel' style={{ padding: 12 }}>
            <button
              className='btn'
              onClick={downloadZipServer}
              disabled={loading}
            >
              {loading ? 'Бэлтгэж байна...' : 'Download ZIP'}
            </button>
            <p className='small'>Preview дээрээ шууд edit хийж болно 👆</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
