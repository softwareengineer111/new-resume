import React, { useState, useEffect, useRef, useCallback } from 'react';

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

  const handleSave = useCallback(() => {
    onUpdate({
      startDate: localStartDate,
      endDate: localIsCurrent ? '' : localEndDate,
      isCurrent: showCurrentOption ? localIsCurrent : false,
    });
    setIsEditing(false);
  }, [
    onUpdate,
    localStartDate,
    localEndDate,
    localIsCurrent,
    showCurrentOption,
  ]);

  const handleCancel = useCallback(() => {
    // Reset state to original props
    setLocalStartDate(startDate);
    setLocalEndDate(endDate);
    setLocalIsCurrent(isCurrent);
    setIsEditing(false);
  }, [startDate, endDate, isCurrent]);

  // Click outside to cancel
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (isEditing) {
          handleCancel();
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [wrapperRef, isEditing, handleCancel]);

  // When editing starts, sync local state with current props
  useEffect(() => {
    if (isEditing) {
      setLocalStartDate(startDate);
      setLocalEndDate(endDate);
      setLocalIsCurrent(isCurrent);
    }
  }, [isEditing, startDate, endDate, isCurrent]);

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

          <div className='date-editor-footer'>
            {showCurrentOption && (
              <label className='date-editor-current-label'>
                <input
                  type='checkbox'
                  checked={localIsCurrent}
                  onChange={(e) => setLocalIsCurrent(e.target.checked)}
                />
                Present
              </label>
            )}
            <div className='date-editor-buttons'>
              <button onClick={handleCancel} className='btn-cancel'>
                Cancel
              </button>
              <button onClick={handleSave} className='btn-save'>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
