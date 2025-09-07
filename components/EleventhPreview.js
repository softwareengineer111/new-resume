import Editable from '../common/Editable';
import EditableDateRange from '../common/EditableDateRange';
import { useDragAndDrop } from '../common/useDragAndDrop';

const EleventhPreview = ({ data, onUpdate, onAdd, onRemove, onReorder }) => {
  const {
    draggedOverSection,
    draggedOverIndex,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
  } = useDragAndDrop(onReorder);

  return (
    <div className='preview preview-11'>
      <div className='preview-inner' onDragOver={(e) => e.preventDefault()}>
        <header className='header'>
          <Editable tag='h1' path='name' onUpdate={onUpdate} className='name'>
            {data.name}
          </Editable>
          <Editable tag='p' path='title' onUpdate={onUpdate} className='title'>
            {data.title}
          </Editable>
        </header>

        <div className='contact-list'>
          <Editable tag='span' path='contact.email' onUpdate={onUpdate}>
            {data.contact.email}
          </Editable>
          <Editable tag='span' path='contact.phone' onUpdate={onUpdate}>
            {data.contact.phone}
          </Editable>
          <Editable tag='span' path='contact.linkedin' onUpdate={onUpdate}>
            {data.contact.linkedin}
          </Editable>
        </div>

        <div className='section'>
          <h3 className='section-title'>Summary</h3>
          <Editable
            tag='p'
            path='summary'
            onUpdate={onUpdate}
            multiline
            className='summary'
          >
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
              className={`entry draggable-item ${
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

        <div className='section'>
          <div className='section-header'>
            <h3 className='section-title'>Education</h3>
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
              className={`entry draggable-item ${
                draggedOverSection === 'education' && draggedOverIndex === index
                  ? 'drag-over'
                  : ''
              }`.trim()}
              onDragEnter={() => handleDragEnter('education', index)}
              onDragEnd={handleDragEnd}
            >
              <div className='entry-header'>
                <Editable
                  tag='strong'
                  path={`education.${index}.degree`}
                  onUpdate={onUpdate}
                  className='degree'
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
                <EditableDateRange
                  className='date'
                  startDate={edu.startDate}
                  endDate={edu.endDate}
                  isCurrent={edu.isCurrent}
                  onUpdate={(newDates) => {
                    onUpdate(
                      `education.${index}.startDate`,
                      newDates.startDate
                    );
                    onUpdate(`education.${index}.endDate`, newDates.endDate);
                    onUpdate(
                      `education.${index}.isCurrent`,
                      newDates.isCurrent
                    );
                  }}
                  showCurrentOption={true}
                />
              </div>
              <Editable
                tag='div'
                path={`education.${index}.university`}
                onUpdate={onUpdate}
                className='university'
              >
                {edu.university}
              </Editable>
              <button
                className='btn-remove'
                onClick={() => onRemove('education', index)}
              >
                &times;
              </button>
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
        </div>
      </div>
      <style jsx>{`
        .preview-11 {
          font-family: 'Garamond', serif;
          background-color: #fdfdfd;
          color: #2c3e50;
        }
        .preview-inner {
          padding: 40px;
          max-width: 850px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .name {
          font-size: 2.8rem;
          font-weight: 600;
          color: #34495e;
          margin-bottom: 5px;
        }
        .title {
          font-size: 1.3rem;
          font-weight: 300;
          color: #7f8c8d;
          border-top: 1px solid #e0e0e0;
          border-bottom: 1px solid #e0e0e0;
          padding: 5px 0;
          display: inline-block;
        }
        .contact-list {
          display: flex;
          justify-content: center;
          gap: 25px;
          margin-bottom: 30px;
          font-size: 0.9rem;
          list-style: none;
          padding: 0;
        }
        .section {
          position: relative;
          margin-bottom: 20px;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .section-title {
          color: #2980b9;
          font-size: 1.2rem;
          font-weight: bold;
          border-bottom: 1px solid #2980b9;
          padding-bottom: 5px;
          margin-bottom: 15px;
        }
        .summary {
          font-style: italic;
          color: #34495e;
        }
        .entry {
          position: relative;
          margin-bottom: 15px;
          padding-left: 1.5rem;
        }
        .entry-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .role,
        .degree {
          font-weight: bold;
          font-size: 1.1rem;
        }
        .date {
          color: #7f8c8d;
          font-size: 0.9rem;
        }
        .company,
        .university {
          font-style: italic;
          margin-bottom: 5px;
        }
        .skills-list {
          list-style: disc;
          padding-left: 1.5rem;
        }
        .skills-list li {
          position: relative;
          margin-bottom: 0.5rem;
          padding-left: 1.5rem;
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
        .section:hover .btn-add {
          opacity: 1;
          pointer-events: all;
        }
        .entry:hover .btn-remove,
        .skills-list li:hover .btn-remove {
          opacity: 1;
          pointer-events: all;
        }
        .btn-add:hover,
        .btn-remove:hover {
          background: #333;
          color: #fff;
          border-color: #333;
        }
        .btn-remove {
          position: absolute;
          top: 0;
          right: 0;
        }
        .skills-list .btn-remove {
          right: -2rem;
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
};

export default EleventhPreview;
