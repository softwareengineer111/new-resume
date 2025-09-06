import React from 'react';
import Editable from './Editable';

// A formal, academic-style CV layout.
export default function SeventhPreview({ data, onUpdate, onAdd, onRemove }) {
  return (
    <div className='panel preview'>
      <div className='preview-inner-7'>
        <header className='header'>
          <Editable tag='h1' path='name' onUpdate={onUpdate} className='name'>
            {data.name}
          </Editable>
          <div className='contact-info'>
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
          <h3 className='section-title'>Education</h3>
          {data.education.map((edu, i) => (
            <div key={i} className='entry'>
              <Editable
                tag='strong'
                path={`education.${i}.degree`}
                onUpdate={onUpdate}
              >
                {edu.degree}, {edu.date}
              </Editable>
              <Editable
                tag='p'
                path={`education.${i}.university`}
                onUpdate={onUpdate}
              >
                {edu.university}
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
          <h3 className='section-title'>Professional Experience</h3>
          {data.experience.map((exp, i) => (
            <div key={i} className='entry'>
              <Editable
                tag='strong'
                path={`experience.${i}.role`}
                onUpdate={onUpdate}
              >
                {exp.role}, {exp.company}
              </Editable>
              <Editable
                tag='em'
                path={`experience.${i}.date`}
                onUpdate={onUpdate}
              >
                {exp.date}
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
          <h3 className='section-title'>Skills</h3>
          <ul className='skills-list'>
            {data.skills.map((skill, i) => (
              <li key={i}>
                <Editable tag='span' path={`skills.${i}`} onUpdate={onUpdate}>
                  {skill}
                </Editable>
                <button
                  className='btn-remove'
                  onClick={() => onRemove('skills', i)}
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
          <button
            className='btn-add'
            onClick={() => onAdd('skills', 'New Skill')}
          >
            +
          </button>
        </div>
      </div>
      <style jsx>{`
        .preview-inner-7 {
          font-family: 'Times New Roman', serif;
          line-height: 1.6;
          background: #fff;
          padding: 3rem;
        }
        .header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .name {
          font-size: 2.5rem;
          font-variant: small-caps;
          letter-spacing: 1px;
          margin: 0;
        }
        .contact-info {
          font-size: 1rem;
          margin-top: 0.5rem;
        }
        .section {
          margin-bottom: 1.5rem;
        }
        .section-title {
          font-size: 1.2rem;
          font-weight: bold;
          border-bottom: 1px solid #000;
          padding-bottom: 0.25rem;
          margin-bottom: 1rem;
        }
        .entry {
          position: relative;
          margin-bottom: 1rem;
        }
        .entry strong {
          font-size: 1.1rem;
        }
        .entry em {
          display: block;
          font-style: italic;
          color: #555;
        }
        .skills-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .skills-list li {
          position: relative;
        }
        .btn-add,
        .btn-remove {
          position: absolute;
          right: 0;
          top: 0;
          background: transparent;
          border: 1px solid #ccc;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          cursor: pointer;
          font-size: 0.9rem;
          line-height: 1;
          color: #999;
        }
        .btn-add {
          position: static;
          margin-top: 0.5rem;
        }
        .skills-list .btn-remove {
          position: absolute;
          right: -22px;
        }
      `}</style>
    </div>
  );
}
