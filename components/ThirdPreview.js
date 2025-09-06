import React from 'react';
import Editable from './Editable';

export default function ThirdPreview({ data, onUpdate, onAdd, onRemove }) {
  return (
    <div className='panel preview'>
      <div className='preview-inner-3'>
        <header className='header'>
          <Editable tag='h1' path='name' onUpdate={onUpdate} className='name'>
            {data.name}
          </Editable>
          <Editable tag='p' path='title' onUpdate={onUpdate} className='title'>
            {data.title}
          </Editable>
          <ul className='contact-list'>
            <li>
              <Editable tag='span' path='contact.email' onUpdate={onUpdate}>
                {data.contact.email}
              </Editable>
            </li>
            <li>
              <Editable tag='span' path='contact.phone' onUpdate={onUpdate}>
                {data.contact.phone}
              </Editable>
            </li>
            <li>
              <Editable tag='span' path='contact.linkedin' onUpdate={onUpdate}>
                {data.contact.linkedin}
              </Editable>
            </li>
          </ul>
        </header>

        <div className='section'>
          <h3 className='section-title'>Summary</h3>
          <Editable tag='p' path='summary' onUpdate={onUpdate} multiline>
            {data.summary}
          </Editable>
        </div>

        <div className='section'>
          <div className='section-header'>
            <h3 className='section-title'>Work Experience</h3>
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
          {data.experience.map((exp, i) => (
            <div key={i} className='entry'>
              <div className='entry-header'>
                <Editable
                  tag='strong'
                  path={`experience.${i}.role`}
                  onUpdate={onUpdate}
                >
                  {exp.role}
                </Editable>
                <span> at </span>
                <Editable
                  tag='span'
                  path={`experience.${i}.company`}
                  onUpdate={onUpdate}
                >
                  {exp.company}
                </Editable>
              </div>
              <Editable
                tag='em'
                className='date'
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
              <div className='actions'>
                <button
                  className='btn-remove'
                  onClick={() => onRemove('experience', i)}
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className='section'>
          <div className='section-header'>
            <h3 className='section-title'>Education</h3>
            <button
              className='btn-add'
              onClick={() =>
                onAdd('education', {
                  degree: 'Degree',
                  university: 'University',
                  date: 'Year',
                  details: 'Details',
                })
              }
            >
              +
            </button>
          </div>
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
              <div className='actions'>
                <button
                  className='btn-remove'
                  onClick={() => onRemove('education', i)}
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className='section'>
          <div className='section-header'>
            <h3 className='section-title'>Skills</h3>
            <button
              className='btn-add'
              onClick={() => onAdd('skills', 'New Skill')}
            >
              +
            </button>
          </div>
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
        </div>
      </div>
      <style jsx>{`
        .preview-inner-3 {
          font-family: 'Garamond', 'Times New Roman', serif;
          padding: 3rem;
          background: #fff;
          max-width: 850px;
          margin: auto;
        }
        .header {
          text-align: center;
          margin-bottom: 2.5rem;
          border-bottom: 1px solid #ddd;
          padding-bottom: 2rem;
        }
        .name {
          font-size: 2.8rem;
          font-weight: 300;
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
        }
        .title {
          font-size: 1.2rem;
          font-weight: 300;
          color: #555;
          margin-top: 0;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 3px;
        }
        .contact-list {
          list-style: none;
          padding: 0;
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          font-size: 0.9rem;
          color: #888;
        }
        .section {
          margin-bottom: 2rem;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .section-title {
          font-size: 1.3rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #333;
          border-bottom: 2px solid #333;
          padding-bottom: 0.5rem;
          margin-bottom: 1rem;
          display: inline-block;
        }
        .entry {
          position: relative;
          margin-bottom: 1.5rem;
        }
        .entry-header {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          font-size: 1.1rem;
        }
        .date {
          font-size: 0.9rem;
          color: #777;
          font-style: italic;
          display: block;
          margin-bottom: 0.5rem;
        }
        .skills-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .skills-list li {
          background: #eee;
          padding: 0.3rem 0.8rem;
          border-radius: 4px;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .actions {
          position: absolute;
          top: -5px;
          right: 0;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .entry:hover .actions {
          opacity: 1;
        }
        .btn-add,
        .btn-remove {
          background: transparent;
          border: 1px solid #ccc;
          color: #888;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          cursor: pointer;
          font-size: 1rem;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .btn-add:hover,
        .btn-remove:hover {
          background: #333;
          color: #fff;
          border-color: #333;
        }
        .skills-list .btn-remove {
          background: #ddd;
        }
        :global(.editable:focus) {
          box-shadow: 0 0 0 2px rgba(100, 100, 100, 0.2);
          background: #f7f7f7;
        }
      `}</style>
    </div>
  );
}
