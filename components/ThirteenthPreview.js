import React from 'react';
import Editable from '../common/Editable';
import EditableDateRange from '../common/EditableDateRange';
import { useDragAndDrop } from '../common/useDragAndDrop';

export default function ThirteenthPreview({
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
      <div className='preview-inner-13' onDragOver={(e) => e.preventDefault()}>
        {/* Left Column */}
        <div className='left-column'>
          {/* Profile Image */}
          <div className='avatar-wrapper'>
            {data.avatarUrl && (
              <img src={data.avatarUrl} alt={data.name} className='avatar' />
            )}
          </div>

          {/* Contact */}
          <div className='contact-section-background'>
            <h2 className='section-title'>Contact</h2>
            <div className='contact-info'>
              <p>
                📞{' '}
                <Editable tag='span' path='contact.phone' onUpdate={onUpdate}>
                  {data.contact.phone}
                </Editable>
              </p>
              <p>
                📧{' '}
                <Editable tag='span' path='contact.email' onUpdate={onUpdate}>
                  {data.contact.email}
                </Editable>
              </p>
              <p>
                🌐{' '}
                <Editable tag='span' path='contact.website' onUpdate={onUpdate}>
                  {data.contact.website}
                </Editable>
              </p>
            </div>
          </div>

          {/* Education */}
          <div className='education-section-background'>
            <div className='section-header'>
              <h2 className='section-title'>Education</h2>
              <button
                className='btn-add'
                onClick={() =>
                  onAdd('education', {
                    degree: 'Bachelor of Arts',
                    university: 'University Name',
                    startDate: '2015-09',
                    endDate: '2018-06',
                  })
                }
              >
                +
              </button>
            </div>
            <div className='education-list'>
              {data.education.map((edu, i) => (
                <div
                  key={i}
                  className={`entry draggable-item ${
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
                  <div className='education-item'>
                    <EditableDateRange
                      className='date-range'
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
                    <Editable
                      tag='p'
                      className='degree'
                      path={`education.${i}.degree`}
                      onUpdate={onUpdate}
                    >
                      {edu.degree}
                    </Editable>
                    <Editable
                      tag='p'
                      className='university'
                      path={`education.${i}.university`}
                      onUpdate={onUpdate}
                    >
                      {edu.university}
                    </Editable>
                  </div>
                  <button
                    className='btn-remove'
                    onClick={() => onRemove('education', i)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className='right-column'>
          {/* Header */}
          <header>
            <Editable tag='h1' className='name' path='name' onUpdate={onUpdate}>
              {data.name}
            </Editable>
            <Editable
              tag='h2'
              className='title'
              path='title'
              onUpdate={onUpdate}
            >
              {data.title}
            </Editable>
            <Editable
              tag='p'
              className='summary'
              path='summary'
              onUpdate={onUpdate}
              multiline
            >
              {data.summary}
            </Editable>
          </header>

          {/* Experience */}
          <div className='experience-section-background'>
            <div className='section-header'>
              <h2 className='section-title'>Experience</h2>
              <button
                className='btn-add'
                onClick={() =>
                  onAdd('experience', {
                    role: 'Senior Product Designer',
                    company: 'Company Name',
                    startDate: '2021-01',
                    endDate: '',
                    isCurrent: true,
                    description: 'Description of work.',
                  })
                }
              >
                +
              </button>
            </div>
            <div className='experience-list'>
              {data.experience.map((exp, i) => (
                <div
                  key={i}
                  className={`entry draggable-item ${
                    draggedOverSection === 'experience' &&
                    draggedOverIndex === i
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
                  <div className='experience-item'>
                    <EditableDateRange
                      className='date-range'
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
                    <Editable
                      tag='p'
                      className='role'
                      path={`experience.${i}.role`}
                      onUpdate={onUpdate}
                    >
                      {exp.role}
                    </Editable>
                    <Editable
                      tag='p'
                      className='company'
                      path={`experience.${i}.company`}
                      onUpdate={onUpdate}
                    >
                      {exp.company}
                    </Editable>
                    <Editable
                      tag='p'
                      className='description'
                      path={`experience.${i}.description`}
                      onUpdate={onUpdate}
                      multiline
                    >
                      {exp.description}
                    </Editable>
                  </div>
                  <button
                    className='btn-remove'
                    onClick={() => onRemove('experience', i)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className='skills-section-background'>
            <div className='section-header'>
              <h2 className='section-title'>Skills</h2>
              <button
                className='btn-add'
                onClick={() => onAdd('skills', 'New Skill')}
              >
                +
              </button>
            </div>
            <div className='skills-grid'>
              {data.skills.map((skill, i) => (
                <div
                  key={i}
                  className={`entry draggable-item ${
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
                    tag='p'
                    className='skill-item'
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .preview-inner-13 {
          max-width: 896px;
          margin: auto;
          background-color: #fff;
          box-shadow: var(--shadow);
          padding: 2rem;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.5rem;
          border-radius: 1rem;
          font-family: 'Inter', sans-serif;
        }
        .left-column {
          grid-column: span 1 / span 1;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .right-column {
          grid-column: span 2 / span 2;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .avatar-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .avatar {
          border-radius: 0.5rem;
          object-fit: cover;
        }
        .section-title {
          color: #937f31;
          border-bottom: 2px solid #facc15;
          padding-bottom: 0.25rem;
          margin-bottom: 0.5rem;
          font-family: Urbanist;
          font-weight: 700;
          font-style: Bold;
          font-size: 14px;
          letter-spacing: 2px;
          vertical-align: middle;
          text-transform: uppercase;
        }
        .contact-section-background {
          background-color: #f7f3d7;
          top: 274px;
          left: 24px;
          padding-top: 16px;
          padding-right: 10px;
          padding-bottom: 16px;
          padding-left: 10px;
          gap: 20px;
        }
        .experience-section-background {
          background-color: #f7f6f0;
          padding-top: 16px;
          padding-right: 10px;
          padding-bottom: 16px;
          padding-left: 10px;
          gap: 20px;
        }
        .education-section-background {
          background-color: #f7f1eb;
          left: 24px;
          padding-top: 16px;
          padding-right: 10px;
          padding-bottom: 16px;
          padding-left: 10px;
          gap: 20px;
        }
        .skills-section-background {
          background-color: #f2f5f7;
          padding-top: 16px;
          padding-right: 10px;
          padding-bottom: 16px;
          padding-left: 10px;
          gap: 20px;
        }
        .contact-info p {
          font-size: 0.875rem;
          color: #374151;
          margin-bottom: 0.25rem;
          word-break: break-all;
        }
        .education-list,
        .experience-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .education-item,
        .experience-item {
          font-size: 0.875rem;
        }
        .date-range {
          font-weight: 600;
        }
        .degree,
        .role {
          font-weight: 700;
        }
        .university,
        .company {
          font-style: italic;
          color: #4b5563;
        }
        .description {
          color: #4b5563;
        }
        .name {
          font-size: 1.875rem;
          font-weight: 700;
          color: #111827;
        }
        .title {
          color: #ca8a04;
          font-weight: 600;
          font-size: 1.125rem;
        }
        .summary {
          color: #374151;
          font-size: 0.875rem;
          margin-top: 0.5rem;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
          font-size: 0.875rem;
        }
        .entry {
          position: relative;
          padding-left: 1.5rem;
        }
        .drag-handle {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          cursor: grab;
          color: #ccc;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .entry:hover .drag-handle {
          opacity: 1;
        }
        .btn-add,
        .btn-remove {
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
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
          background: #e5e7eb;
        }
        .btn-remove {
          position: absolute;
          top: 0;
          right: 0;
          opacity: 0;
        }
        .entry:hover .btn-remove {
          opacity: 1;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}
