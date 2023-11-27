'use client'
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import {updateDueDate} from '../lib/api'
import {toast} from 'sonner'
import {
  EventClickArg,
  EventContentArg,
  EventDropArg,
} from '@fullcalendar/core/index.js'

function renderEventContent(eventInfo: EventContentArg) {
  return (
    <>
      <p className="text-blue-600 font-semibold">Due Date: </p>
      <p>{eventInfo.timeText}</p> | <p>{eventInfo.event.title}</p>
    </>
  )
}

export const Calendar = ({calendarInfo}: any) => {
  const handleEventDrop = async (info: EventDropArg) => {
    const result = await updateDueDate(
      info.event.id,
      new Date(info.event.startStr),
    )
    if (result.data) {
      toast.success('Date updated successfully')
    } else {
      toast.error('Something went wrong when updated the date')
    }
  }

  const handleEventClick = (args: EventClickArg) => {
    console.log('args :', args.event.title)
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: '',
      }}
      weekends={false}
      events={calendarInfo}
      eventColor="#378006"
      eventClick={handleEventClick}
      selectMirror={true}
      droppable={true}
      editable={true}
      nowIndicator={true}
      eventDrop={handleEventDrop}
      // dateClick={handleDateClick}
      eventContent={renderEventContent}
    />
  )
}
