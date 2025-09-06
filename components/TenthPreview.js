import React, { useState, useRef } from 'react';
import Editable from './Editable';

// An ultra-minimalist, text-only layout focusing on typography.
export default function TenthPreview({
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
      e.target.closest('.entry, .skill-item').classList.add('dragging');
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
      <div className='preview-inner-10' onDragOver={(e) => e.preventDefault()}>
        <img src={data.avatarUrl} alt={data.name} className='avatar' />
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
          <div className='skills-container'>
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className={`skill-item ${
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
              </span>
            ))}
          </div>
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
        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 2rem;
          border: 1px solid #eee;
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
          padding-left: 1.5rem;
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
        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0 0.5rem;
          line-height: 1.8;
        }
        .skill-item {
          position: relative;
          padding-left: 1.5rem;
        }
        .skill-item::after {
          content: '·';
          margin-left: 0.5rem;
          color: #6b7280;
        }
        .skill-item:last-child::after {
          content: '';
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
          pointer-events: none;
        }
        .entry:hover .btn-remove {
          opacity: 1;
          pointer-events: all;
        }
        .btn-add {
          position: static;
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
        .entry:hover .drag-handle,
        .skill-item:hover .drag-handle {
          opacity: 1;
        }
        .drag-handle:active {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
}
