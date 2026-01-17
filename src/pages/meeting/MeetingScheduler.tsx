import React from 'react'

import {
    EventApi,
    DateSelectArg,
    EventClickArg,
    EventContentArg,
    formatDate,
} from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '../../event-utils'
import "../../components/meetings/MeetingStylesheet.css"
import MeetingSidebar from '../../components/meetings/MeetingSidebar'

interface MeetingSchedulerState {
    weekendsVisible: boolean
    currentEvents: EventApi[]
}

export default class MeetingScheduler extends React.Component<{}, MeetingSchedulerState> {

    state: MeetingSchedulerState = {
        weekendsVisible: true,
        currentEvents: []
    }

    render() {
        return (
            <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
                <div className="flex items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Meetings Scheduler</h1>
                        <p className="text-gray-600">Manage your startup's important files</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

                    {/* Calendar */}
                    <div className="lg:col-span-3 min-w-0">
                        <div className="bg-white rounded-lg shadow border p-4">
                            <FullCalendar
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                headerToolbar={{
                                    left: "prev,next today",
                                    center: "title",
                                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                                }}
                                initialView="dayGridMonth"
                                editable
                                selectable
                                selectMirror
                                dayMaxEvents
                                weekends={this.state.weekendsVisible}
                                initialEvents={INITIAL_EVENTS}
                                select={this.handleDateSelect}
                                eventContent={renderEventContent}
                                eventClick={this.handleEventClick}
                                eventsSet={this.handleEvents}
                                height="auto"
                            />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 min-w-0">
                        <MeetingSidebar />
                    </div>


                </div>
            </div>



        )
    }

    renderSidebar() {
        return (
            <div className='meeting-sidebar'>


                <div className='meeting-sidebar-section'>
                    <h2>All Events ({this.state.currentEvents.length})</h2>
                    <ul>
                        {this.state.currentEvents.map(renderSidebarEvent)}
                    </ul>

                </div>

            </div>
        )
    }

    handleWeekendsToggle = () => {
        this.setState({
            weekendsVisible: !this.state.weekendsVisible
        })
    }

    handleDateSelect = (selectInfo: DateSelectArg) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }
    }

    handleEventClick = (clickInfo: EventClickArg) => {
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove()
        }
    }

    handleEvents = (events: EventApi[]) => {
        this.setState({
            currentEvents: events
        })
    }

}

function renderEventContent(eventContent: EventContentArg) {
    return (
        <div className="flex flex-col">
            <span className="text-xs font-semibold">
                {eventContent.timeText}
            </span>
            <span className="text-xs">
                {eventContent.event.title}
            </span>
        </div>
    );
}


function renderSidebarEvent(event: EventApi) {
    return (
        <li key={event.id}>
            <b>{formatDate(event.start!, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
            <i>{event.title}</i>
        </li>
    )
}