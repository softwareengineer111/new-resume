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
  const isInitialRenderForEdit = useRef(true);

  // Click outside to close the popover
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (isEditing) {
          setIsEditing(false);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isEditing]);

  // When editing starts, sync local state with current props and set initial flag
  useEffect(() => {
    if (isEditing) {
      isInitialRenderForEdit.current = true;
      setLocalStartDate(startDate);
      setLocalEndDate(endDate);
      setLocalIsCurrent(isCurrent);
    }
  }, [isEditing, startDate, endDate, isCurrent]);

  // Real-time updates to parent component
  useEffect(() => {
    if (!isEditing) return;

    // Prevents update on the initial opening of the popover
    if (isInitialRenderForEdit.current) {
      isInitialRenderForEdit.current = false;
      return;
    }

    onUpdate({
      startDate: localStartDate,
      endDate: localIsCurrent ? '' : localEndDate,
      isCurrent: showCurrentOption ? localIsCurrent : false,
    });
  }, [
    localStartDate,
    localEndDate,
    localIsCurrent,
    onUpdate,
    showCurrentOption,
    isEditing,
  ]);

  return (
    <div className={`date-range-wrapper ${className}`} ref={wrapperRef}>
      <span
        onClick={() => setIsEditing(true)}
        className='editable date-display'
      >
        {formatDate(startDate)} - {isCurrent ? 'Present' : formatDate(endDate)}
      </span>

      {isEditing && (
        <div className='date-editor-popover'>
          <div className='date-editor-grid'>
            <div className='date-editor-field'>
              <label>Start Date</label>
              <input
                type='month'
                value={localStartDate || ''}
                onChange={(e) => setLocalStartDate(e.target.value)}
                autoFocus
              />
            </div>
            <div className='date-editor-field'>
              <label>End Date</label>
              <input
                type='month'
                value={localEndDate || ''}
                onChange={(e) => setLocalEndDate(e.target.value)}
                disabled={localIsCurrent}
              />
            </div>
          </div>

          {showCurrentOption && (
            <div className='date-editor-footer'>
              <label className='date-editor-current-label'>
                <input
                  type='checkbox'
                  checked={localIsCurrent}
                  onChange={(e) => setLocalIsCurrent(e.target.checked)}
                />
                Present
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
