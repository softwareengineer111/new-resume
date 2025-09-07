import React from 'react';

const Editable = ({
  tag: Tag = 'div',
  path,
  onUpdate,
  children,
  className,
  multiline = false,
}) => {
  const handleBlur = (e) => {
    onUpdate(path, e.target.innerText);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      e.target.blur();
    }
  };

  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`editable ${className || ''}`}
    >
      {children}
    </Tag>
  );
};

export default Editable;
