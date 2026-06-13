'use client';
import { useEffect } from 'react';

export default function SecurityLock() {
  useEffect(() => {
    // 1. Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, Ctrl+S
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+I, J, C (Inspector tools)
      if (
        e.ctrlKey &&
        e.shiftKey &&
        (e.key === 'I' ||
          e.key === 'i' ||
          e.key === 'J' ||
          e.key === 'j' ||
          e.key === 'C' ||
          e.key === 'c')
      ) {
        e.preventDefault();
        return false;
      }
      // Ctrl+U (View Page Source)
      if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        return false;
      }
      // Ctrl+S (Save Page)
      if (e.ctrlKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Anti-debugging loop: crashes/pauses the page if devtools are opened
    const blockDevtools = setInterval(() => {
      // eslint-disable-next-line no-debugger
      debugger;
    }, 50);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(blockDevtools);
    };
  }, []);

  return null;
}
