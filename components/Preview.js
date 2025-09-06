import React, { useState, useRef } from 'react';
import Editable from './Editable';
import EditableDateRange from './EditableDateRange';

export default function Preview({
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
      <div className='preview-inner' onDragOver={(e) => e.preventDefault()}>
        <header className='preview-header'>
          <Editable tag='h1' path='name' onUpdate={onUpdate} className='h1'>
            {data.name}
          </Editable>
          <Editable tag='p' path='title' onUpdate={onUpdate} className='h2'>
            {data.title}
          </Editable>
        </header>

        {/* Contact Section */}
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
              <Editable tag='span' path='contact.linkedin' onUpdate={onUpdate}>
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

        {/* Summary Section */}
        <div className='section'>
          <h3 className='section-title'>Summary</h3>
          <Editable tag='p' path='summary' onUpdate={onUpdate} multiline>
            {data.summary}
          </Editable>
        </div>

        {/* Experience Section */}
        <div className='section'>
          <div className='section-header'>
            <h3 className='section-title'>Work Experience</h3>
            <button
              className='btn-add'
              onClick={() =>
                onAdd('experience', {
                  role: 'New Role',
                  company: 'Company Name',
                  date: 'Date Range',
                  description:
                    'Description of responsibilities and achievements.',
                })
              }
            >
              + Add
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
                  className='company'
                  path={`experience.${i}.company`}
                  onUpdate={onUpdate}
                >
                  {exp.company}
                </Editable>
                <EditableDateRange
                  className='date'
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

        {/* Education Section */}
        <div className='section'>
          <div className='section-header'>
            <h3 className='section-title'>Education</h3>
            <button
              className='btn-add'
              onClick={() =>
                onAdd('education', {
                  degree: 'Degree or Certificate',
                  university: 'Institution Name',
                  date: 'Year',
                  details: 'Details about the program.',
                })
              }
            >
              + Add
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
              <div className='entry-header'>
                <Editable
                  tag='strong'
                  path={`education.${i}.degree`}
                  onUpdate={onUpdate}
                >
                  {edu.degree}
                </Editable>
                <Editable
                  tag='span'
                  className='university'
                  path={`education.${i}.university`}
                  onUpdate={onUpdate}
                >
                  {edu.university}
                </Editable>
                <EditableDateRange
                  className='date'
                  startDate={edu.startDate}
                  endDate={edu.endDate}
                  isCurrent={false}
                  onUpdate={(newDates) => {
                    onUpdate(`education.${i}.startDate`, newDates.startDate);
                    onUpdate(`education.${i}.endDate`, newDates.endDate);
                  }}
                  showCurrentOption={false}
                />
              </div>
              <Editable
                tag='p'
                path={`education.${i}.details`}
                onUpdate={onUpdate}
                multiline
              >
                {edu.details}
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

        {/* Skills Section */}
        <div className='section'>
          <div className='section-header'>
            <h3 className='section-title'>Skills</h3>
            <button
              className='btn-add'
              onClick={() => onAdd('skills', 'New Skill')}
            >
              + Add
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
      </div>
      <style jsx>{`
        .preview-inner {
          background: #fff;
          padding: 2.5rem;
          box-shadow: var(--shadow);
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }
        .preview-header {
          text-align: center;
          margin-bottom: 2.5rem;
          border-bottom: 1px solid #eee;
          padding-bottom: 2rem;
        }
        .h1 {
          font-size: 2.2rem;
          margin-bottom: 0.25rem;
          font-weight: 600;
        }
        .h2 {
          font-size: 1.2rem;
          font-weight: 400;
          color: #0070f3;
        }
        .section {
          margin-bottom: 2rem;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #0070f3;
          padding-bottom: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .section-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0;
        }
        .btn-add {
          background: #eaf5ff;
          color: #0070f3;
          border: 1px solid #bde3ff;
          border-radius: 5px;
          padding: 0.25rem 0.75rem;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        .btn-add:hover {
          background: #0070f3;
          color: white;
        }
        .contact-list {
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem 2rem;
        }
        .contact-list li {
          font-size: 0.95rem;
        }
        .entry {
          position: relative;
          padding: 0.5rem 0 0.5rem 1rem;
          margin-bottom: 1rem;
          border-left: 3px solid #e0e0e0;
          transition: all 0.2s ease-in-out;
        }
        .entry:hover {
          background-color: #fcfdff;
          border-left-color: #0070f3;
        }
        .entry .actions {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease-in-out;
        }
        .entry:hover .actions {
          opacity: 1;
        }
        .btn-remove {
          background: #f1f1f1;
          color: #555;
          border: 1px solid #ddd;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          cursor: pointer;
          font-size: 1.1rem;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: all;
          transition: all 0.2s;
        }
        .btn-remove:hover {
          background: #ff4d4d;
          color: white;
          border-color: #ff4d4d;
        }
        .entry-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.25rem;
          flex-wrap: wrap;
          gap: 0 0.5rem;
        }
        .entry-header strong {
          font-size: 1.05rem;
          font-weight: 500;
        }
        .company,
        .university {
          font-style: italic;
          color: #555;
          flex-grow: 1;
        }
        .date {
          color: #777;
          font-size: 0.9rem;
          font-weight: 300;
        }
        .entry p {
          color: #444;
          line-height: 1.6;
        }
        .skills-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .skills-list li {
          position: relative;
          background: #f0f0f0;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          padding-left: 1.5rem;
          transition: all 0.2s;
        }
        .skills-list li:hover {
          background: #e0e0e0;
        }
        .skills-list li:hover .btn-remove {
          opacity: 1;
        }
        .skills-list .btn-remove {
          opacity: 0;
          width: 20px;
          height: 20px;
          font-size: 0.9rem;
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
        :global(.editable) {
          outline: none;
          padding: 2px 4px;
          margin: -2px -4px;
          border-radius: 4px;
          transition: box-shadow 0.2s;
        }
        :global(.editable:focus) {
          box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.4);
          background: #fefce8;
        }
      `}</style>
    </div>
  );
}
