import React from 'react';
import Editable from './Editable';

// A compact, two-column layout designed to fit a lot of information.
export default function SixthPreview({ data, onUpdate, onAdd, onRemove }) {
  return (
    <div className='panel preview'>
      <div className='preview-inner-6'>
        <header className='header'>
          <Editable tag='h1' path='name' onUpdate={onUpdate} className='name'>
            {data.name}
          </Editable>
          <Editable tag='p' path='title' onUpdate={onUpdate} className='title'>
            {data.title}
          </Editable>
          <div className='contact-bar'>
            <Editable tag='span' path='contact.email' onUpdate={onUpdate}>
              {data.contact.email}
            </Editable>{' '}
            |
            <Editable tag='span' path='contact.phone' onUpdate={onUpdate}>
              {data.contact.phone}
            </Editable>{' '}
            |
            <Editable tag='span' path='contact.website' onUpdate={onUpdate}>
              {data.contact.website}
            </Editable>
          </div>
        </header>

        <div className='section'>
          <h3 className='section-title'>Summary</h3>
          <Editable tag='p' path='summary' onUpdate={onUpdate} multiline>
            {data.summary}
          </Editable>
        </div>

        <div className='columns'>
          <div className='main-col'>
            <div className='section'>
              <h3 className='section-title'>Experience</h3>
              {data.experience.map((exp, i) => (
                <div key={i} className='entry'>
                  <Editable
                    tag='strong'
                    path={`experience.${i}.role`}
                    onUpdate={onUpdate}
                  >
                    {exp.role}
                  </Editable>
                  <Editable
                    tag='em'
                    path={`experience.${i}.company`}
                    onUpdate={onUpdate}
                  >
                    {exp.company} | {exp.date}
                  </Editable>
                  <Editable
                    tag='p'
                    path={`experience.${i}.description`}
                    onUpdate={onUpdate}
                    multiline
                  >
                    {exp.description}
                  </Editable>
                  <button
                    className='btn-remove'
                    onClick={() => onRemove('experience', i)}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                className='btn-add'
                onClick={() =>
                  onAdd('experience', {
                    role: 'Role',
                    company: 'Company',
                    date: 'Date',
                    description: 'Description',
                  })
                }
              >
                +
              </button>
            </div>
          </div>
          <div className='side-col'>
            <div className='section'>
              <h3 className='section-title'>Education</h3>
              {data.education.map((edu, i) => (
                <div key={i} className='entry'>
                  <Editable
                    tag='strong'
                    path={`education.${i}.degree`}
                    onUpdate={onUpdate}
                  >
                    {edu.degree}
                  </Editable>
                  <Editable
                    tag='p'
                    path={`education.${i}.university`}
                    onUpdate={onUpdate}
                  >
                    {edu.university}, {edu.date}
                  </Editable>
                  <button
                    className='btn-remove'
                    onClick={() => onRemove('education', i)}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                className='btn-add'
                onClick={() =>
                  onAdd('education', {
                    degree: 'Degree',
                    university: 'University',
                    date: 'Year',
                  })
                }
              >
                +
              </button>
            </div>
            <div className='section'>
              <h3 className='section-title'>Skills</h3>
              <Editable tag='p' path='skills' onUpdate={onUpdate}>
                {data.skills.join(', ')}
              </Editable>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .preview-inner-6 {
          font-family: 'Lato', sans-serif;
          font-size: 0.9rem;
          line-height: 1.5;
          background: #fff;
          padding: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .name {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
        }
        .title {
          font-size: 1.1rem;
          color: #4b5563;
          margin: 0.2rem 0 0.5rem;
        }
        .contact-bar {
          font-size: 0.85rem;
          color: #6b7280;
        }
        .section-title {
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 0.3rem;
          margin-bottom: 0.8rem;
        }
        .columns {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }
        .entry {
          position: relative;
          margin-bottom: 1rem;
        }
        .entry strong,
        .entry em {
          display: block;
        }
        .entry em {
          font-style: normal;
          color: #6b7280;
          font-size: 0.85rem;
        }
        .btn-add,
        .btn-remove {
          position: absolute;
          right: 0;
          top: 0;
          background: #eee;
          border: none;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          cursor: pointer;
          font-size: 0.9rem;
          line-height: 1;
        }
        .btn-add {
          position: static;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}
