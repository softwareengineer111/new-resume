import React from 'react';
import Editable from './Editable';

// A tech-focused, dark-theme style resume.
export default function EighthPreview({ data, onUpdate, onAdd, onRemove }) {
  return (
    <div className='panel preview'>
      <div className='preview-inner-8'>
        <div className='header'>
          <Editable tag='div' path='name' onUpdate={onUpdate} className='name'>
            <span className='prompt'>user@host:~$</span> {data.name}
          </Editable>
          <Editable
            tag='div'
            path='title'
            onUpdate={onUpdate}
            className='title'
          >
            {data.title}
          </Editable>
        </div>

        <div className='section'>
          <h3 className='section-title'>/contact</h3>
          <div className='contact-grid'>
            <span>email:</span>{' '}
            <Editable tag='span' path='contact.email' onUpdate={onUpdate}>
              '{data.contact.email}'
            </Editable>
            <span>phone:</span>{' '}
            <Editable tag='span' path='contact.phone' onUpdate={onUpdate}>
              '{data.contact.phone}'
            </Editable>
            <span>web:</span>{' '}
            <Editable tag='span' path='contact.website' onUpdate={onUpdate}>
              '{data.contact.website}'
            </Editable>
          </div>
        </div>

        <div className='section'>
          <h3 className='section-title'>/experience</h3>
          {data.experience.map((exp, i) => (
            <div key={i} className='entry'>
              <Editable
                tag='strong'
                path={`experience.${i}.role`}
                onUpdate={onUpdate}
              >
                {exp.role} @ {exp.company}
              </Editable>
              <Editable
                tag='em'
                path={`experience.${i}.date`}
                onUpdate={onUpdate}
              >
                // {exp.date}
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
            $ add
          </button>
        </div>

        <div className='section'>
          <h3 className='section-title'>/skills</h3>
          <div className='skills-container'>
            {data.skills.map((skill, i) => (
              <Editable
                key={i}
                tag='span'
                className='skill-tag'
                path={`skills.${i}`}
                onUpdate={onUpdate}
              >
                {skill}
              </Editable>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .preview-inner-8 {
          font-family: 'Fira Code', 'Courier New', monospace;
          background: #1e293b;
          color: #e2e8f0;
          padding: 2rem;
          border-radius: 8px;
        }
        .header {
          margin-bottom: 2rem;
        }
        .name {
          font-size: 1.8rem;
          color: #a5b4fc;
        }
        .prompt {
          color: #64748b;
        }
        .title {
          color: #94a3b8;
          margin-top: 0.25rem;
        }
        .section {
          margin-bottom: 2rem;
        }
        .section-title {
          color: #818cf8;
          font-size: 1.1rem;
          margin-bottom: 0.8rem;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 0.2rem 1rem;
          color: #cbd5e1;
        }
        .contact-grid span:first-child {
          color: #94a3b8;
        }
        .entry {
          position: relative;
          border-left: 2px solid #475569;
          padding-left: 1rem;
          margin-bottom: 1rem;
        }
        .entry strong {
          color: #c7d2fe;
        }
        .entry em {
          display: block;
          color: #64748b;
          font-style: normal;
        }
        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .skill-tag {
          background: #334155;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
        }
        .btn-add,
        .btn-remove {
          position: absolute;
          right: 0;
          top: 0;
          background: #475569;
          border: none;
          border-radius: 4px;
          color: #94a3b8;
          cursor: pointer;
        }
        .btn-add {
          position: static;
          margin-top: 0.5rem;
          padding: 0.2rem 0.5rem;
        }
      `}</style>
    </div>
  );
}
