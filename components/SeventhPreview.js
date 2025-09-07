import React from 'react';
import Editable from '../common/Editable';
import EditableDateRange from '../common/EditableDateRange';
import { useDragAndDrop } from '../common/useDragAndDrop';

export default function SeventhPreview({
  data,
  onUpdate,
  onAdd,
  onRemove,
  onReorder,
}) {
  const {
    draggedOverSection,
    draggedOverIndex,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
  } = useDragAndDrop(onReorder);

  return (
    <div className='panel preview'>
      <div className='preview-inner-7' onDragOver={(e) => e.preventDefault()}>
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
            <div
              key={i}
              className={`entry draggable-item ${
                draggedOverSection === 'education' && draggedOverIndex === i
                  ? 'drag-over'
                  : ''
              }`.trim()}
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
              <strong>
                <Editable
                  tag='span'
                  path={`education.${i}.degree`}
                  onUpdate={onUpdate}
                >
                  {edu.degree}
                </Editable>
                ,{' '}
                <EditableDateRange
                  startDate={edu.startDate}
                  endDate={edu.endDate}
                  onUpdate={(newDates) => {
                    onUpdate(`education.${i}.startDate`, newDates.startDate);
                    onUpdate(`education.${i}.endDate`, newDates.endDate);
                  }}
                />
              </strong>
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
            <div
              key={i}
              className={`entry draggable-item ${
                draggedOverSection === 'experience' && draggedOverIndex === i
                  ? 'drag-over'
                  : ''
              }`.trim()}
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
              <strong>
                <Editable
                  tag='span'
                  path={`experience.${i}.role`}
                  onUpdate={onUpdate}
                >
                  {exp.role}
                </Editable>
                ,{' '}
                <Editable
                  tag='span'
                  path={`experience.${i}.company`}
                  onUpdate={onUpdate}
                >
                  {exp.company}
                </Editable>
              </strong>
              <EditableDateRange
                startDate={exp.startDate}
                endDate={exp.endDate}
                isCurrent={exp.isCurrent}
                onUpdate={(newDates) => {
                  onUpdate(`experience.${i}.startDate`, newDates.startDate);
                  onUpdate(`experience.${i}.endDate`, newDates.endDate);
                  onUpdate(`experience.${i}.isCurrent`, newDates.isCurrent);
                }}
                showCurrentOption={true}
              />
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
              <li
                key={i}
                className={`draggable-item ${
                  draggedOverSection === 'skills' && draggedOverIndex === i
                    ? 'drag-over'
                    : ''
                }`.trim()}
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
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow);
          padding: 3rem;
          max-width: 800px;
          margin: 0 auto;
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
          padding-left: 1.5rem;
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
          padding-left: 1.5rem;
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
          opacity: 0;
          pointer-events: none;
        }
        .entry:hover .btn-remove,
        .skills-list li:hover .btn-remove {
          opacity: 1;
          pointer-events: all;
        }
        .btn-add {
          position: static;
          margin-top: 0.5rem;
          opacity: 1;
          pointer-events: all;
        }
        .skills-list .btn-remove {
          position: absolute;
          right: -22px;
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
      `}</style>
    </div>
  );
}
