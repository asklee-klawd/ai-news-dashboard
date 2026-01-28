'use client';

import { useState } from 'react';

const shortcuts = [
  { key: 'R', description: 'Refresh news' },
  { key: 'B', description: 'Toggle bookmarks' },
  { key: 'D', description: 'Toggle dark mode' },
  { key: '/', description: 'Focus search' },
  { key: 'Esc', description: 'Clear/close' },
];

export function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-gray-800 dark:bg-gray-700 text-white shadow-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-all hover:scale-110 z-30"
        title="Keyboard shortcuts"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed bottom-20 right-4 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                ⌨️ Keyboard Shortcuts
              </h3>
            </div>
            <div className="p-2">
              {shortcuts.map(({ key, description }) => (
                <div 
                  key={key}
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {description}
                  </span>
                  <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded border border-gray-200 dark:border-gray-600">
                    {key}
                  </kbd>
                </div>
              ))}
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-900 text-center">
              <button
                onClick={() => setIsOpen(false)}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Press Esc to close
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
