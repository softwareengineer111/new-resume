import React from 'react';
import Editable from './Editable';
import EditableDateRange from './EditableDateRange';
import { useDragAndDrop } from './useDragAndDrop';

// A compact, two-column layout designed to fit a lot of information.
export default function SixthPreview({
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
      <div className='preview-inner-6' onDragOver={(e) => e.preventDefault()}>
        <header className='header'>
          <Editable tag='h1' path='name' onUpdate={onUpdate} className='name'>
            {data.name}
          </Editable>
          <Editable tag='p' path='title' onUpdate={onUpdate} className='title'>
            {data.title}
          </Editable>
          <div className='contact-bar'>
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
          <h3 className='section-title'>Summary</h3>
          <Editable tag='p' path='summary' onUpdate={onUpdate} multiline>
            {data.summary}
          </Editable>
        </div>

        <div className='columns'>
          <div className='main-col'>
            <div className='section'>
              <h3 className='section-title'>Experience</h3>
              {data.experience.map((exp, i) => (
                <div
                  key={i}
                  className={`entry draggable-item ${
                    draggedOverSection === 'experience' &&
                    draggedOverIndex === i
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
                  <Editable
                    tag='strong'
                    path={`experience.${i}.role`}
                    onUpdate={onUpdate}
                  >
                    {exp.role}
                  </Editable>
                  <em>
                    <Editable
                      tag='span'
                      path={`experience.${i}.company`}
                      onUpdate={onUpdate}
                    >
                      {exp.company}
                    </Editable>{' '}
                    |{' '}
                    <EditableDateRange
                      startDate={exp.startDate}
                      endDate={exp.endDate}
                      isCurrent={exp.isCurrent}
                      onUpdate={(newDates) => {
                        onUpdate(
                          `experience.${i}.startDate`,
                          newDates.startDate
                        );
                        onUpdate(`experience.${i}.endDate`, newDates.endDate);
                        onUpdate(
                          `experience.${i}.isCurrent`,
                          newDates.isCurrent
                        );
                      }}
                      showCurrentOption={true}
                    />
                  </em>
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
          </div>
          <div className='side-col'>
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
                  <Editable
                    tag='strong'
                    path={`education.${i}.degree`}
                    onUpdate={onUpdate}
                  >
                    {edu.degree}
                  </Editable>
                  <p>
                    <Editable
                      tag='span'
                      path={`education.${i}.university`}
                      onUpdate={onUpdate}
                    >
                      {edu.university}
                    </Editable>
                    ,{' '}
                    <EditableDateRange
                      startDate={edu.startDate}
                      endDate={edu.endDate}
                      onUpdate={(newDates) => {
                        onUpdate(
                          `education.${i}.startDate`,
                          newDates.startDate
                        );
                        onUpdate(`education.${i}.endDate`, newDates.endDate);
                      }}
                    />
                  </p>
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
              <Editable
                tag='p'
                path='skills'
                onUpdate={(path, value) => {
                  // When the user edits the skills, the value is a single string.
                  // We need to convert it back to an array before updating the state.
                  const skillsArray = value
                    .split(',')
                    .map((s) => s.trim())
                    .filter((s) => s);
                  onUpdate(path, skillsArray);
                }}
              >
                {Array.isArray(data.skills) ? data.skills.join(', ') : ''}
              </Editable>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .preview-inner-6 {
          font-family: 'Lato', sans-serif;
          font-size: 0.9rem;
          line-height: 1.5;
          background: #fff;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow);
          padding: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .name {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
        }
        .title {
          font-size: 1.1rem;
          color: #4b5563;
          margin: 0.2rem 0 0.5rem;
        }
        .contact-bar {
          font-size: 0.85rem;
          color: #6b7280;
        }
        .section-title {
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 0.3rem;
          margin-bottom: 0.8rem;
        }
        .columns {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
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
          color: #6b7280;
          font-size: 0.85rem;
        }
        .btn-add,
        .btn-remove {
          position: absolute;
          right: 0;
          top: 0;
          background: #eee;
          border: none;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          cursor: pointer;
          font-size: 0.9rem;
          line-height: 1;
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
      `}</style>
    </div>
  );
}
