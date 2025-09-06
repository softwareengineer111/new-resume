import React from 'react';
import Editable from './Editable';

// An ultra-minimalist, text-only layout focusing on typography.
export default function TenthPreview({ data, onUpdate, onAdd, onRemove }) {
  return (
    <div className='panel preview'>
      <div className='preview-inner-10'>
        <Editable tag='h1' path='name' onUpdate={onUpdate} className='name'>
          {data.name}
        </Editable>
        <Editable tag='p' path='title' onUpdate={onUpdate} className='title'>
          {data.title}
        </Editable>

        <div className='section'>
          <Editable tag='p' path='summary' onUpdate={onUpdate} multiline>
            {data.summary}
          </Editable>
        </div>

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
                {exp.company} / {exp.date}
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
                {edu.university} / {edu.date}
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
          <p>
            {data.skills.map((skill, i) => (
              <React.Fragment key={i}>
                <Editable tag='span' path={`skills.${i}`} onUpdate={onUpdate}>
                  {skill}
                </Editable>
                {i < data.skills.length - 1 && ' · '}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
      <style jsx>{`
        .preview-inner-10 {
          font-family: system-ui, -apple-system, sans-serif;
          background: #fff;
          padding: 3rem;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow);
          max-width: 800px;
          margin: auto;
        }
        .name {
          font-size: 2rem;
          font-weight: 500;
          margin: 0;
        }
        .title {
          font-size: 1.1rem;
          color: #6b7280;
          margin: 0.25rem 0 2rem 0;
        }
        .section {
          margin-bottom: 2rem;
        }
        .section-title {
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #374151;
          margin-bottom: 1rem;
        }
        .entry {
          position: relative;
          margin-bottom: 1.5rem;
        }
        .entry strong,
        .entry em {
          display: block;
        }
        .entry em {
          font-style: normal;
          color: #6b7280;
          font-size: 0.9rem;
        }
        .btn-add,
        .btn-remove {
          position: absolute;
          right: 0;
          top: 0;
          background: transparent;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .entry:hover .btn-remove {
          opacity: 1;
        }
        .btn-add {
          position: static;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
