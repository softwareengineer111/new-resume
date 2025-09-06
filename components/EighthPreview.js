import React, { useState, useRef } from 'react';
import Editable from './Editable';

// A tech-focused, dark-theme style resume.
export default function EighthPreview({
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
      e.target.closest('.entry, .skill-tag-wrapper').classList.add('dragging');
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
      <div className='preview-inner-8' onDragOver={(e) => e.preventDefault()}>
        <div className='header'>
          <img src={data.avatarUrl} alt={data.name} className='avatar' />
          <div>
            <Editable
              tag='div'
              path='name'
              onUpdate={onUpdate}
              className='name'
            >
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
              <div
                key={i}
                className={`skill-tag-wrapper ${
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
                <Editable
                  tag='span'
                  className='skill-tag'
                  path={`skills.${i}`}
                  onUpdate={onUpdate}
                >
                  {skill}
                </Editable>
              </div>
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
          border: 1px solid #334155; /* Darker border for dark theme */
          box-shadow: var(--shadow);
          max-width: 800px;
          margin: 0 auto;
        }
        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 4px;
          object-fit: cover;
          border: 2px solid #475569;
        }
        .header {
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
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
          border-left: 2px solid #475569; /* Fallback */
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
        .skill-tag-wrapper {
          position: relative;
        }
        .skill-tag {
          background: #334155;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          display: block;
        }
        .skill-tag-wrapper .drag-handle {
          color: #64748b;
          width: 1rem;
          left: -1rem;
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
          padding: 0.2rem 0.5rem;
          opacity: 1;
          pointer-events: all;
        }
        .drag-handle {
          position: absolute;
          left: -1.5rem;
          top: 0;
          width: 1.5rem;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: grab;
          color: #475569;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .entry:hover .drag-handle,
        .skill-tag-wrapper:hover .drag-handle {
          opacity: 1;
        }
        .drag-handle:active {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
}
