import { useState } from 'react';
import Preview from '../components/Preview';
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
