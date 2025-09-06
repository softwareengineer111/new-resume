import React, { useState, useRef } from 'react';
import Editable from './Editable';

export default function SecondPreview({
  data,
  onUpdate,
  onAdd,
  onRemove,
  onReorder,
}) {
  const dragItem = useRef(null);
  const [draggedOverSection, setDraggedOverSection] = useState('');
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);

  const handleDragStart = (e, section, index) => {
    dragItem.current = { section, index };
    setTimeout(() => e.target.classList.add('dragging'), 0);
  };

  const handleDragEnter = (section, index) => {
    if (dragItem.current && dragItem.current.section === section) {
      setDraggedOverSection(section);
      setDraggedOverIndex(index);
    }
  };

  const handleDragEnd = (e) => {
    if (
      draggedOverIndex !== null &&
      dragItem.current.index !== draggedOverIndex
    ) {
      onReorder(draggedOverSection, dragItem.current.index, draggedOverIndex);
    }
    e.target.classList.remove('dragging');
    dragItem.current = null;
    setDraggedOverSection('');
    setDraggedOverIndex(null);
  };

  return (
    <div className='panel preview'>
      <div className='preview-inner-2' onDragOver={(e) => e.preventDefault()}>
        <aside className='sidebar'>
          <Editable tag='h1' path='name' onUpdate={onUpdate} className='name'>
            {data.name}
          </Editable>
          <Editable tag='p' path='title' onUpdate={onUpdate} className='title'>
            {data.title}
          </Editable>

          <div className='section'>
            <h3 className='section-title'>Contact</h3>
            <ul className='contact-list'>
              <li>
                <strong>Email:</strong>{' '}
                <Editable tag='span' path='contact.email' onUpdate={onUpdate}>
                  {data.contact.email}
                </Editable>
              </li>
              <li>
                <strong>Phone:</strong>{' '}
                <Editable tag='span' path='contact.phone' onUpdate={onUpdate}>
                  {data.contact.phone}
                </Editable>
              </li>
              <li>
                <strong>LinkedIn:</strong>{' '}
                <Editable
                  tag='span'
                  path='contact.linkedin'
                  onUpdate={onUpdate}
                >
                  {data.contact.linkedin}
                </Editable>
              </li>
              <li>
                <strong>Website:</strong>{' '}
                <Editable tag='span' path='contact.website' onUpdate={onUpdate}>
                  {data.contact.website}
                </Editable>
              </li>
            </ul>
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
              <div
                key={i}
                className={`entry ${
                  draggedOverSection === 'education' && draggedOverIndex === i
                    ? 'drag-over'
                    : ''
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, 'education', i)}
                onDragEnter={() => handleDragEnter('education', i)}
                onDragEnd={handleDragEnd}
              >
                <Editable
                  tag='strong'
                  path={`education.${i}.degree`}
                  onUpdate={onUpdate}
                >
                  {edu.degree}
                </Editable>
                <Editable
                  tag='span'
                  path={`education.${i}.university`}
                  onUpdate={onUpdate}
                >
                  {edu.university}
                </Editable>
                <Editable
                  tag='span'
                  path={`education.${i}.date`}
                  onUpdate={onUpdate}
                >
                  {edu.date}
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
                <li
                  key={i}
                  className={`${
                    draggedOverSection === 'skills' && draggedOverIndex === i
                      ? 'drag-over'
                      : ''
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'skills', i)}
                  onDragEnter={() => handleDragEnter('skills', i)}
                  onDragEnd={handleDragEnd}
                >
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
        </aside>

        <main className='main-content'>
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
              <div
                key={i}
                className={`entry ${
                  draggedOverSection === 'experience' && draggedOverIndex === i
                    ? 'drag-over'
                    : ''
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, 'experience', i)}
                onDragEnter={() => handleDragEnter('experience', i)}
                onDragEnd={handleDragEnd}
              >
                <div className='entry-header'>
                  <Editable
                    tag='strong'
                    path={`experience.${i}.role`}
                    onUpdate={onUpdate}
                  >
                    {exp.role}
                  </Editable>
                  <Editable
                    tag='span'
                    path={`experience.${i}.company`}
                    onUpdate={onUpdate}
                  >
                    {exp.company}
                  </Editable>
                  <Editable
                    tag='span'
                    path={`experience.${i}.date`}
                    onUpdate={onUpdate}
                  >
                    {exp.date}
                  </Editable>
                </div>
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
        </main>
      </div>
      <style jsx>{`
        .preview-inner-2 {
          display: grid;
          grid-template-columns: 1fr 2.2fr;
          background: #fff;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border-radius: 8px;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          min-height: 1100px;
          max-width: 800px;
          margin: 0 auto;
        }
        .sidebar {
          background: #2d3748;
          color: #f7fafc;
          padding: 2rem;
          border-radius: 8px 0 0 8px;
        }
        .sidebar .name {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          line-height: 1.2;
          color: #fff;
        }
        .sidebar .title {
          font-size: 1.1rem;
          font-weight: 300;
          color: #a0aec0;
          margin-top: 0;
          margin-bottom: 2rem;
          border-bottom: 1px solid #4a5568;
          padding-bottom: 2rem;
        }
        .sidebar .section {
          margin-bottom: 2rem;
        }
        .sidebar .section-title {
          color: #63b3ed;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 1rem;
        }
        .sidebar .contact-list {
          list-style: none;
          padding: 0;
          font-size: 0.9rem;
          color: #e2e8f0;
        }
        .sidebar .contact-list li {
          margin-bottom: 0.75rem;
          word-break: break-all;
        }
        .sidebar .contact-list strong {
          color: #a0aec0;
          margin-right: 0.5rem;
          display: block;
          font-weight: 500;
        }
        .sidebar .entry {
          margin-bottom: 1.25rem;
          position: relative;
          cursor: grab;
        }
        .sidebar .entry strong,
        .sidebar .entry span {
          display: block;
        }
        .sidebar .entry strong {
          font-weight: 500;
          font-size: 0.95rem;
          color: #e2e8f0;
        }
        .sidebar .entry span {
          font-size: 0.85rem;
          color: #a0aec0;
        }
        .sidebar .skills-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .sidebar .skills-list li {
          background: #4a5568;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.85rem;
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: grab;
        }
        .main-content {
          padding: 2.5rem;
          color: #4a5568;
        }
        .main-content .section-title {
          font-size: 1.4rem;
          font-weight: 600;
          color: #2d3748;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .main-content .entry {
          margin-bottom: 1.5rem;
          position: relative;
          cursor: grab;
        }
        .entry-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.25rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .entry-header strong {
          font-size: 1.1rem;
          font-weight: 500;
          color: #2d3748;
        }
        .entry-header span {
          font-style: italic;
          color: #718096;
        }
        .entry p {
          font-size: 0.95rem;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .btn-add {
          background: transparent;
          border: 1px solid #cbd5e0;
          color: #718096;
          border-radius: 50%;
          width: 22px;
          height: 22px;
          cursor: pointer;
          font-size: 1rem;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .btn-add:hover {
          background: #e2e8f0;
          color: #2d3748;
        }
        .sidebar .btn-add {
          border-color: #718096;
          color: #a0aec0;
        }
        .sidebar .btn-add:hover {
          background: #4a5568;
          color: #fff;
        }
        .actions {
          position: absolute;
          top: 0;
          right: 0;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none; /* Allow dragging from anywhere on the entry */
        }
        .entry:hover .actions {
          opacity: 1;
        }
        .btn-remove {
          background: #e53e3e;
          color: white;
          border: none;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: all; /* Make the button itself clickable */
          transition: all 0.2s;
        }
        .btn-remove:hover {
          background: #c53030;
        }
        .skills-list .btn-remove {
          width: 18px;
          height: 18px;
          font-size: 0.8rem;
          background: #718096;
          opacity: 0;
          pointer-events: all; /* Make the button itself clickable */
        }
        .skills-list li:hover .btn-remove {
          opacity: 1;
        }
        :global(.editable) {
          outline: none;
          padding: 2px 4px;
          margin: -2px -4px;
          border-radius: 4px;
          transition: box-shadow 0.2s;
        }
        :global(.editable:focus) {
          box-shadow: 0 0 0 2px rgba(99, 179, 237, 0.5);
          background: #4a5568;
        }
        .main-content :global(.editable:focus) {
          background: #ebf8ff;
        }
      `}</style>
    </div>
  );
}
