import React from 'react'
import ScheduleFreeDemoModal from './ScheduleFreeDemoModal'

export default function ContactModal({ isOpen, onClose, classSubject = null }) {
  return (
    <ScheduleFreeDemoModal
      isOpen={isOpen}
      onClose={onClose}
      classSubject={classSubject}
    />
  )
}
