import React from 'react'
import { render } from 'react-dom'
import MeetingScheduler from './pages/meeting/MeetingScheduler'
import './index.css'

document.addEventListener('DOMContentLoaded', function () {
    render(
        <MeetingScheduler />,
        document.body.appendChild(document.createElement('div'))
    )
})