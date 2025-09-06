import React, { useState, useEffect, useRef } from 'react';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const [year, month] = dateString.split('-');
  const date = new Date(year, month - 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export default function EditableDateRange({
  startDate,
  endDate,
  isCurrent,
  onUpdate,
  showCurrentOption = false,
  className = '',
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);
  const [localIsCurrent, setLocalIsCurrent] = useState(isCurrent);
  const wrapperRef = useRef(null);

  const handleSave = () => {
    onUpdate({
      startDate: localStartDate,
      endDate: localIsCurrent ? '' : localEndDate,
      isCurrent: showCurrentOption ? localIsCurrent : false,
    });
    setIsEditing(false);
  };

  // Click outside to save and close
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (isEditing) {
          handleSave();
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [
    wrapperRef.current,
    isEditing,
    localStartDate,
    localEndDate,
    localIsCurrent,
  ]);

  if (isEditing) {
    return (
      <div className={`date-editor ${className}`} ref={wrapperRef}>
        <input
          type='month'
          value={localStartDate}
          onChange={(e) => setLocalStartDate(e.target.value)}
          autoFocus
        />
        {!localIsCurrent && (
          <>
            <span>-</span>
            <input
              type='month'
              value={localEndDate}
              onChange={(e) => setLocalEndDate(e.target.value)}
            />
          </>
        )}
        {showCurrentOption && (
          <label>
            <input
              type='checkbox'
              checked={localIsCurrent}
              onChange={(e) => setLocalIsCurrent(e.target.checked)}
            />
            Present
          </label>
        )}
      </div>
    );
  }

  return (
    <span
      onClick={() => setIsEditing(true)}
      className={`editable ${className}`}
    >
      {formatDate(startDate)} - {isCurrent ? 'Present' : formatDate(endDate)}
    </span>
  );
}
