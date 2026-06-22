import React, { createContext, useCallback, useContext, useState } from 'react';
import ScheduleFreeDemoModal from '../component/ScheduleFreeDemoModal';

const DemoModalContext = createContext();

export function useDemoModal() {
  const ctx = useContext(DemoModalContext);
  if (!ctx) throw new Error('useDemoModal must be used within DemoModalProvider');
  return ctx;
}

export default function DemoModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDemoModal = useCallback(() => setIsOpen(true), []);
  const closeDemoModal = useCallback(() => setIsOpen(false), []);

  return (
    <DemoModalContext.Provider value={{ openDemoModal, closeDemoModal }}>
      {children}
      <ScheduleFreeDemoModal isOpen={isOpen} onClose={closeDemoModal} />
    </DemoModalContext.Provider>
  );
}
