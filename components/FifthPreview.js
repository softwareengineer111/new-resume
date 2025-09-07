import React from 'react';
import Editable from './Editable';
import EditableDateRange from './EditableDateRange';
import { useDragAndDrop } from './useDragAndDrop';

// A more creative layout with an avatar placeholder and icons.
export default function FifthPreview({
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
      <div className='preview-inner-5' onDragOver={(e) => e.preventDefault()}>
        <header className='header'>
          <div className='avatar-placeholder'></div>
          <Editable tag='h1' path='name' onUpdate={onUpdate} className='name'>
            {data.name}
          </Editable>
          <Editable tag='p' path='title' onUpdate={onUpdate} className='title'>
            {data.title}
          </Editable>
        </header>

        <div className='content'>
          <div className='column-left'>
            <div className='section'>
              <h3 className='section-title'>Contact</h3>
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
                  <Editable
                    tag='span'
                    path='contact.website'
                    onUpdate={onUpdate}
                  >
                    {data.contact.website}
                  </Editable>
                </li>
              </ul>
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
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'skills', i)}
                    onDragEnter={() => handleDragEnter('skills', i)}
                    onDragEnd={handleDragEnd}
                  >
                    <Editable
                      tag='span'
                      path={`skills.${i}`}
                      onUpdate={onUpdate}
                    >
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

          <div className='column-right'>
            <div className='section'>
              <h3 className='section-title'>Summary</h3>
              <Editable tag='p' path='summary' onUpdate={onUpdate} multiline>
                {data.summary}
              </Editable>
            </div>
            <div className='section'>
              <h3 className='section-title'>Experience</h3>
              {data.experience.map((exp, i) => (
                <div key={i} className='entry'>
                  <div
                    className={`draggable-item ${
                      draggedOverSection === 'experience' &&
                      draggedOverIndex === i
                        ? 'drag-over'
                        : ''
                    }`.trim()}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'experience', i)}
                    onDragEnter={() => handleDragEnter('experience', i)}
                    onDragEnd={handleDragEnd}
                  >
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
        </div>
      </div>
      <style jsx>{`
        .preview-inner-5 {
          font-family: 'Montserrat', sans-serif;
          background: #fff;
          border-radius: 8px;
          box-shadow: var(--shadow);
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
          padding: 2rem;
          border-radius: 8px 8px 0 0;
        }
        .avatar-placeholder {
          width: 100px;
          height: 100px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          margin: 0 auto 1rem;
          border: 3px solid white;
        }
        .name {
          font-size: 2.2rem;
          font-weight: 700;
          margin: 0;
        }
        .title {
          font-size: 1.1rem;
          font-weight: 300;
          margin: 0.25rem 0 0;
          opacity: 0.9;
        }
        .content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 2rem;
          padding: 2rem;
        }
        .section-title {
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #764ba2;
          margin-bottom: 1rem;
        }
        .contact-list,
        .skills-list {
          list-style: none;
          padding: 0;
        }
        .contact-list li {
          margin-bottom: 0.5rem;
        }
        .skills-list li {
          background: #f3f4f6;
          padding: 0.3rem 0.8rem;
          border-radius: 15px;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          position: relative;
          cursor: grab;
        }
        .entry {
          position: relative;
          margin-bottom: 1.5rem;
          cursor: grab;
        }
        .entry strong,
        .entry em {
          display: block;
        }
        .entry strong {
          font-weight: 600;
        }
        .entry em {
          color: #6b7280;
          font-style: normal;
          font-size: 0.9rem;
          margin: 0.2rem 0;
        }
        .btn-add,
        .btn-remove {
          position: absolute;
          right: 0;
          top: 0;
          background: #eee;
          border: none;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
        .skills-list .btn-remove {
          position: static;
          margin-left: auto;
        }
        .btn-add {
          position: static;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}
