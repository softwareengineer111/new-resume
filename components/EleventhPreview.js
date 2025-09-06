import Editable from './Editable';
import EditableDateRange from './EditableDateRange';

const EleventhPreview = ({ data, onUpdate, onAdd, onRemove }) => {
  return (
    <div className='preview preview-11'>
      <div className='preview-inner'>
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
          <h3 className='section-title'>Experience</h3>
          {data.experience.map((exp, index) => (
            <div key={index} className='entry'>
              <div className='entry-header'>
                <Editable
                  tag='strong'
                  path={`experience.${index}.role`}
                  onUpdate={onUpdate}
                  className='role'
                >
                  {exp.role}
                </Editable>
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
            </div>
          ))}
        </div>

        <div className='section'>
          <h3 className='section-title'>Education</h3>
          {data.education.map((edu, index) => (
            <div key={index} className='entry'>
              <div className='entry-header'>
                <Editable
                  tag='strong'
                  path={`education.${index}.degree`}
                  onUpdate={onUpdate}
                  className='degree'
                >
                  {edu.degree}
                </Editable>
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
            </div>
          ))}
        </div>

        <div className='section'>
          <h3 className='section-title'>Skills</h3>
          <ul className='skills-list'>
            {data.skills.map((skill, index) => (
              <li key={index}>
                <Editable
                  tag='span'
                  path={`skills.${index}`}
                  onUpdate={onUpdate}
                >
                  {skill}
                </Editable>
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
          margin-bottom: 20px;
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
          margin-bottom: 15px;
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
          padding-left: 20px;
        }
      `}</style>
    </div>
  );
};

export default EleventhPreview;
