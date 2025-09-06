import React, { useState, useRef } from 'react';
import Editable from './Editable';

export default function FourthPreview({
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
    setTimeout(() => {
      e.target.closest('.entry, li').classList.add('dragging');
    }, 0);
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
    document.querySelector('.dragging')?.classList.remove('dragging');
    dragItem.current = null;
    setDraggedOverSection('');
    setDraggedOverIndex(null);
  };

  return (
    <div className='panel preview'>
      <div className='preview-inner-4' onDragOver={(e) => e.preventDefault()}>
        <header className='header'>
          <div className='header-main'>
            <Editable tag='h1' path='name' onUpdate={onUpdate} className='name'>
              {data.name}
            </Editable>
            <Editable
              tag='p'
              path='title'
              onUpdate={onUpdate}
              className='title'
            >
              {data.title}
            </Editable>
          </div>
          <img src={data.avatarUrl} alt={data.name} className='avatar' />
          <div className='header-contact'>
            <Editable tag='div' path='contact.email' onUpdate={onUpdate}>
              {data.contact.email}
            </Editable>
            <Editable tag='div' path='contact.phone' onUpdate={onUpdate}>
              {data.contact.phone}
            </Editable>
            <Editable tag='div' path='contact.website' onUpdate={onUpdate}>
              {data.contact.website}
            </Editable>
          </div>
        </header>

        <main className='main-content'>
          <div className='section'>
            <h3 className='section-title'>Profile</h3>
            <Editable tag='p' path='summary' onUpdate={onUpdate} multiline>
              {data.summary}
            </Editable>
          </div>

          <div className='section'>
            <div className='section-header'>
              <h3 className='section-title'>Experience</h3>
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
                onDragEnter={() => handleDragEnter('experience', i)}
                onDragEnd={handleDragEnd}
              >
                <div
                  className='drag-handle'
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'experience', i)}
                >
                  ::
                </div>
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
                onDragEnter={() => handleDragEnter('education', i)}
                onDragEnd={handleDragEnd}
              >
                <div
                  className='drag-handle'
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'education', i)}
                >
                  ::
                </div>
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
                  tag='em'
                  className='date'
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
                  onDragEnter={() => handleDragEnter('skills', i)}
                  onDragEnd={handleDragEnd}
                >
                  <div
                    className='drag-handle'
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'skills', i)}
                  >
                    ::
                  </div>
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
        </main>
      </div>
      <style jsx>{`
        .preview-inner-4 {
          font-family: 'Roboto', sans-serif;
          background: #fff;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow);
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          background: #1a202c;
          color: #fff;
          padding: 2.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #4a5568;
          margin: 0 2rem;
        }
        .name {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0;
        }
        .title {
          font-size: 1.2rem;
          font-weight: 300;
          color: #a0aec0;
          margin: 0.25rem 0 0 0;
        }
        .header-contact {
          text-align: right;
          font-size: 0.9rem;
          line-height: 1.6;
        }
        .main-content {
          padding: 2.5rem;
        }
        .section {
          margin-bottom: 2rem;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .section-title {
          font-size: 1.2rem;
          font-weight: 500;
          color: #2d3748;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .entry {
          position: relative;
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
          padding-left: 2rem;
          border-left: 3px solid #cbd5e0;
        }
        .entry-header {
          font-size: 1.1rem;
          font-weight: 500;
          color: #2d3748;
        }
        .entry-header span {
          margin-left: 0.5rem;
          color: #718096;
          font-weight: 400;
        }
        .date {
          font-size: 0.9rem;
          color: #718096;
          display: block;
          margin: 0.25rem 0;
        }
        .skills-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .skills-list li {
          background: #edf2f7;
          color: #4a5568;
          padding: 0.4rem 0.8rem;
          border-radius: 16px;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
          padding-left: 1.5rem;
        }
        .actions {
          position: absolute;
          top: 0;
          right: 0;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
        }
        .entry:hover .actions {
          opacity: 1;
        }
        .btn-add,
        .btn-remove {
          background: #e2e8f0;
          border: none;
          color: #718096;
          border-radius: 50%;
          width: 22px;
          height: 22px;
          cursor: pointer;
          pointer-events: all;
          transition: all 0.2s;
        }
        .btn-add:hover {
          background: #2d3748;
          color: #fff;
        }
        .btn-remove {
          background: #fed7d7;
          color: #c53030;
        }
        .btn-remove:hover {
          background: #f56565;
          color: #fff;
        }
        .drag-handle {
          position: absolute;
          left: 0;
          top: 0;
          width: 1.5rem;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: grab;
          color: #ccc;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .entry:hover .drag-handle,
        .skills-list li:hover .drag-handle {
          opacity: 1;
        }
        .drag-handle:active {
          cursor: grabbing;
        }
        :global(.editable:focus) {
          box-shadow: 0 0 0 2px rgba(45, 55, 72, 0.3);
          background: #ebf8ff;
        }
        .header :global(.editable:focus) {
          background: #4a5568;
        }
      `}</style>
    </div>
  );
}
