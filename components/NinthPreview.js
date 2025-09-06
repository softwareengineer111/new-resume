import React, { useState, useRef } from 'react';
import Editable from './Editable';

// A clean, corporate layout with a right-hand sidebar.
export default function NinthPreview({
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
      e.target.closest('.entry').classList.add('dragging');
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
      <div className='preview-inner-9' onDragOver={(e) => e.preventDefault()}>
        <main className='main-content'>
          <header className='header'>
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
          </header>
          <div className='section'>
            <h3 className='section-title'>Summary</h3>
            <Editable tag='p' path='summary' onUpdate={onUpdate} multiline>
              {data.summary}
            </Editable>
          </div>
          <div className='section'>
            <h3 className='section-title'>Experience</h3>
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
        </main>
        <aside className='sidebar'>
          <div className='section'>
            <h3 className='section-title'>Contact</h3>
            <ul className='contact-list'>
              <li>
                <strong>Email</strong>
                <Editable tag='span' path='contact.email' onUpdate={onUpdate}>
                  {data.contact.email}
                </Editable>
              </li>
              <li>
                <strong>Phone</strong>
                <Editable tag='span' path='contact.phone' onUpdate={onUpdate}>
                  {data.contact.phone}
                </Editable>
              </li>
            </ul>
          </div>
          <div className='section'>
            <h3 className='section-title'>Education</h3>
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
        </aside>
      </div>
      <style jsx>{`
        .preview-inner-9 {
          display: grid;
          grid-template-columns: 2.5fr 1fr;
          background: #fff;
          font-family: 'Helvetica Neue', sans-serif;
          max-width: 800px;
          margin: 0 auto;
        }
        .main-content {
          padding: 2.5rem;
        }
        .sidebar {
          background: #f8f9fa;
          padding: 2.5rem;
          border-left: 1px solid #dee2e6;
        }
        .header {
          margin-bottom: 2rem;
        }
        .name {
          font-size: 2.8rem;
          font-weight: 300;
          margin: 0;
        }
        .title {
          font-size: 1.2rem;
          color: #007bff;
          font-weight: 400;
          margin: 0.25rem 0 0;
        }
        .section {
          margin-bottom: 2rem;
        }
        .section-title {
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #6c757d;
          border-bottom: 1px solid #ced4da;
          padding-bottom: 0.5rem;
          margin-bottom: 1rem;
        }
        .entry {
          position: relative;
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        .entry strong,
        .entry em {
          display: block;
        }
        .entry em {
          font-style: normal;
          color: #6c757d;
          font-size: 0.9rem;
        }
        .contact-list {
          list-style: none;
          padding: 0;
        }
        .contact-list li {
          margin-bottom: 0.8rem;
        }
        .contact-list strong {
          display: block;
          font-size: 0.8rem;
          color: #6c757d;
        }
        .btn-add,
        .btn-remove {
          position: absolute;
          right: 0;
          top: 0;
          background: #e9ecef;
          border: none;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          cursor: pointer;
          opacity: 0;
          pointer-events: none;
        }
        .entry:hover .btn-remove {
          opacity: 1;
          pointer-events: all;
        }
        .btn-add {
          position: static;
          margin-top: 0.5rem;
          opacity: 1;
          pointer-events: all;
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
        .entry:hover .drag-handle {
          opacity: 1;
        }
        .drag-handle:active {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
}
