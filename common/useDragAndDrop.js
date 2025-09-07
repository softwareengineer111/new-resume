import { useState, useRef } from 'react';

/**
 * Жагсаалтын дарааллыг өөрчлөх drag-and-drop логикийг агуулсан дахин ашиглагдах hook.
 * @param {function} onReorder - Элементийг шинэ байрлалд зөөж тавихад ажиллах функц.
 * Энэ функц нь (sectionName, sourceIndex, destIndex) гэсэн утгуудыг авна.
 */
export function useDragAndDrop(onReorder) {
  const dragItem = useRef(null); // Яг одоо чирч буй элементийн мэдээллийг хадгалах
  const [draggedOverSection, setDraggedOverSection] = useState(''); // Хаана чирж аваачсаныг хадгалах state
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);

  const handleDragStart = (e, section, index) => {
    dragItem.current = { section, index };
    // Харагдах байдлыг өөрчлөхийн тулд хамгийн ойр байрлах .draggable-item-д класс нэмнэ
    setTimeout(() => {
      e.target.closest('.draggable-item')?.classList.add('dragging');
    }, 0);
  };

  const handleDragEnter = (section, index) => {
    // Зөвхөн ижил хэсэг дотор чирж байгаа эсэхийг шалгана
    if (dragItem.current && dragItem.current.section === section) {
      setDraggedOverSection(section);
      setDraggedOverIndex(index);
    }
  };

  const handleDragEnd = (e) => {
    // Хэрэв хүчинтэй, өөр байрлалд тавьсан бол...
    if (
      draggedOverIndex !== null &&
      dragItem.current &&
      dragItem.current.index !== draggedOverIndex
    ) {
      onReorder(draggedOverSection, dragItem.current.index, draggedOverIndex);
    }

    // Цэвэрлэгээ: dragging классыг устгаж, state-үүдийг анхны байдалд нь оруулна
    document.querySelector('.dragging')?.classList.remove('dragging');
    dragItem.current = null;
    setDraggedOverSection('');
    setDraggedOverIndex(null);
  };

  return {
    draggedOverSection,
    draggedOverIndex,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
  };
}
