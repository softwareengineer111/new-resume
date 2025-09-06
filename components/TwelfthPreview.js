import Editable from './Editable';
import EditableDateRange from './EditableDateRange';

const TwelfthPreview = ({ data, onUpdate }) => {
  const accentColor = '#4a90e2'; // A nice blue
  const backgroundColor = '#f4f7f6';
  const textColor = '#333';

  return (
    <div className='preview preview-12'>
      <div className='preview-inner'>
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

          <h3 className='section-title skills-title'>Skills</h3>
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

          <h3 className='section-title education-title'>Education</h3>
          {data.education.map((edu, index) => (
            <div key={index} className='education-entry'>
              <Editable
                tag='strong'
                path={`education.${index}.degree`}
                onUpdate={onUpdate}
              >
                {edu.degree}
              </Editable>
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

          <h3 className='section-title'>Experience</h3>
          {data.experience.map((exp, index) => (
            <div key={index} className='experience-entry'>
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
        .skills-list li {
          margin-bottom: 5px;
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
      `}</style>
    </div>
  );
};

export default TwelfthPreview;
