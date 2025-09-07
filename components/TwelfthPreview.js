import Editable from '../common/Editable';
import EditableDateRange from '../common/EditableDateRange';
import { useDragAndDrop } from '../common/useDragAndDrop';

const TwelfthPreview = ({ data, onUpdate, onAdd, onRemove, onReorder }) => {
  const accentColor = '#4a90e2'; // A nice blue
  const backgroundColor = '#f4f7f6';
  const textColor = '#333';

  const {
    draggedOverSection,
    draggedOverIndex,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
  } = useDragAndDrop(onReorder);

  return (
    <div className='preview preview-12'>
      <div className='preview-inner' onDragOver={(e) => e.preventDefault()}>
        {/* Left Column */}
        <div className='left-column'>
          <div className='avatar-container'>
            <img src={data.avatarUrl} alt='Avatar' className='avatar' />
          </div>

          <h3 className='section-title'>Contact</h3>
          <Editable
            tag='p'
            path='contact.email'
            onUpdate={onUpdate}
            className='contact-item'
          >
            {data.contact.email}
          </Editable>
          <Editable
            tag='p'
            path='contact.phone'
            onUpdate={onUpdate}
            className='contact-item'
          >
            {data.contact.phone}
          </Editable>
          <Editable
            tag='p'
            path='contact.linkedin'
            onUpdate={onUpdate}
            className='contact-item'
          >
            {data.contact.linkedin}
          </Editable>

          <div className='section-header'>
            <h3 className='section-title skills-title'>Skills</h3>
            <button
              className='btn-add'
              onClick={() => onAdd('skills', 'New Skill')}
            >
              +
            </button>
          </div>
          <ul className='skills-list'>
            {data.skills.map((skill, index) => (
              <li
                key={index}
                className={`draggable-item ${
                  draggedOverSection === 'skills' && draggedOverIndex === index
                    ? 'drag-over'
                    : ''
                }`.trim()}
                onDragEnter={() => handleDragEnter('skills', index)}
                onDragEnd={handleDragEnd}
              >
                <div
                  className='drag-handle'
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'skills', index)}
                >
                  ::
                </div>
                <Editable
                  tag='span'
                  path={`skills.${index}`}
                  onUpdate={onUpdate}
                >
                  {skill}
                </Editable>
                <button
                  className='btn-remove'
                  onClick={() => onRemove('skills', index)}
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>

          <div className='section-header'>
            <h3 className='section-title education-title'>Education</h3>
            <button
              className='btn-add'
              onClick={() =>
                onAdd('education', {
                  degree: 'Degree',
                  university: 'University',
                })
              }
            >
              +
            </button>
          </div>
          {data.education.map((edu, index) => (
            <div
              key={index}
              className={`education-entry draggable-item ${
                draggedOverSection === 'education' && draggedOverIndex === index
                  ? 'drag-over'
                  : ''
              }`.trim()}
              onDragEnter={() => handleDragEnter('education', index)}
              onDragEnd={handleDragEnd}
            >
              <Editable
                tag='strong'
                path={`education.${index}.degree`}
                onUpdate={onUpdate}
              >
                {edu.degree}
              </Editable>
              <div
                className='drag-handle'
                draggable
                onDragStart={(e) => handleDragStart(e, 'education', index)}
              >
                ::
              </div>
              <Editable
                tag='p'
                path={`education.${index}.university`}
                onUpdate={onUpdate}
                className='university'
              >
                {edu.university}
              </Editable>
              <EditableDateRange
                className='date'
                startDate={edu.startDate}
                endDate={edu.endDate}
                isCurrent={edu.isCurrent}
                onUpdate={(newDates) => {
                  onUpdate(`education.${index}.startDate`, newDates.startDate);
                  onUpdate(`education.${index}.endDate`, newDates.endDate);
                  onUpdate(`education.${index}.isCurrent`, newDates.isCurrent);
                }}
                showCurrentOption={true}
              />
              <button
                className='btn-remove'
                onClick={() => onRemove('education', index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className='right-column'>
          <Editable tag='h1' path='name' onUpdate={onUpdate} className='name'>
            {data.name}
          </Editable>
          <Editable tag='h2' path='title' onUpdate={onUpdate} className='title'>
            {data.title}
          </Editable>

          <div className='section-header'>
            <h3 className='section-title'>Summary</h3>
          </div>
          <Editable
            tag='p'
            path='summary'
            onUpdate={onUpdate}
            multiline
            className='summary'
          >
            {data.summary}
          </Editable>

          <div className='section-header'>
            <h3 className='section-title'>Experience</h3>
            <button
              className='btn-add'
              onClick={() =>
                onAdd('experience', {
                  role: 'Role',
                  company: 'Company',
                  description: 'Description',
                })
              }
            >
              +
            </button>
          </div>
          {data.experience.map((exp, index) => (
            <div
              key={index}
              className={`experience-entry draggable-item ${
                draggedOverSection === 'experience' &&
                draggedOverIndex === index
                  ? 'drag-over'
                  : ''
              }`.trim()}
              onDragEnter={() => handleDragEnter('experience', index)}
              onDragEnd={handleDragEnd}
            >
              <div className='entry-header'>
                <Editable
                  tag='strong'
                  path={`experience.${index}.role`}
                  onUpdate={onUpdate}
                  className='role'
                >
                  {exp.role}
                </Editable>
                <div
                  className='drag-handle'
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'experience', index)}
                >
                  ::
                </div>
                <EditableDateRange
                  className='date'
                  startDate={exp.startDate}
                  endDate={exp.endDate}
                  isCurrent={exp.isCurrent}
                  onUpdate={(newDates) => {
                    onUpdate(
                      `experience.${index}.startDate`,
                      newDates.startDate
                    );
                    onUpdate(`experience.${index}.endDate`, newDates.endDate);
                    onUpdate(
                      `experience.${index}.isCurrent`,
                      newDates.isCurrent
                    );
                  }}
                  showCurrentOption={true}
                />
              </div>
              <Editable
                tag='div'
                path={`experience.${index}.company`}
                onUpdate={onUpdate}
                className='company'
              >
                {exp.company}
              </Editable>
              <Editable
                tag='p'
                path={`experience.${index}.description`}
                onUpdate={onUpdate}
                multiline
              >
                {exp.description}
              </Editable>
              <button
                className='btn-remove'
                onClick={() => onRemove('experience', index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .preview-12 {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
        .preview-inner {
          display: flex;
          background-color: white;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }
        .left-column {
          width: 35%;
          background-color: ${backgroundColor};
          padding: 40px 25px;
          color: ${textColor};
        }
        .right-column {
          width: 65%;
          padding: 40px 30px;
        }
        .avatar-container {
          text-align: center;
          margin-bottom: 30px;
        }
        .avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 4px solid ${accentColor};
          object-fit: cover;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .section-title {
          color: ${accentColor};
          text-transform: uppercase;
          font-size: 1rem;
          font-weight: bold;
          letter-spacing: 1px;
          margin-top: 0;
          margin-bottom: 15px;
        }
        .skills-title,
        .education-title {
          margin-top: 30px;
        }
        .contact-item {
          margin-bottom: 8px;
        }
        .skills-list {
          padding: 0;
          list-style: none;
        }
        .skills-list li,
        .education-entry,
        .experience-entry {
          position: relative;
          margin-bottom: 5px;
          padding-left: 1.5rem;
        }
        .education-entry {
          margin-bottom: 15px;
        }
        .education-entry :global(strong) {
          font-weight: bold;
        }
        .education-entry .university {
          font-size: 0.9em;
        }
        .education-entry .date {
          font-size: 0.8em;
          color: #666;
        }
        .name {
          font-size: 2.5rem;
          font-weight: bold;
          color: ${accentColor};
          margin: 0;
        }
        .title {
          font-size: 1.2rem;
          margin-top: 0;
          margin-bottom: 20px;
          border-bottom: 2px solid ${backgroundColor};
          padding-bottom: 10px;
        }
        .summary {
          margin-bottom: 20px;
        }
        .experience-entry {
          position: relative;
          margin-bottom: 20px;
        }
        .entry-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .role {
          font-size: 1.1rem;
          font-weight: bold;
        }
        .experience-entry .date {
          font-size: 0.8em;
          color: #666;
        }
        .company {
          font-style: italic;
          margin-bottom: 5px;
        }
        .btn-add,
        .btn-remove {
          background: transparent;
          border: 1px solid #ccc;
          color: #888;
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
          opacity: 0;
          pointer-events: none;
        }
        .section-header:hover .btn-add,
        .draggable-item:hover .btn-remove {
          opacity: 1;
          pointer-events: all;
        }
        .btn-add:hover,
        .btn-remove:hover {
          background: ${accentColor};
          color: #fff;
          border-color: ${accentColor};
        }
        .btn-remove {
          position: absolute;
          top: 0;
          right: 0;
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
        .draggable-item:hover .drag-handle {
          opacity: 1;
        }
        .drag-handle:active {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
};

export default TwelfthPreview;
