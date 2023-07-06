import { Component, ChangeDetectorRef, ViewChild, OnInit } from '@angular/core';

import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

// import allLocales from '@fullcalendar/core/locales-all';
import caLocale from '@fullcalendar/core/locales/ca';
import esLocale from '@fullcalendar/core/locales/es';
import { ModalService } from 'src/app/services/modal.service';
import { CalendarService } from '../services/calendar.service';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})


export class CalendarComponent implements OnInit {
  
  calendarVisible:boolean = true;
  calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      interactionPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    locales: [esLocale, caLocale], // Idioma
    locale: 'es',
    initialView: 'dayGridMonth',
    weekends: false,
    editable: true,
    selectable: true,
    selectMirror: true,
    select: this.handleDateSelect.bind(this),
    dayMaxEvents: true
  };
  currentEvents: EventApi[] = []

  @ViewChild('modalContent') modalContent: any;
  
  constructor(
      private modalService: ModalService,
      private changeDetector: ChangeDetectorRef,
      private calendarService: CalendarService,
  ) {}
  ngOnInit(): void {
    this.calendarService.getAllEvents().subscribe(events => {
      
      const finishEvents = events.map(e => {
        const event: EventInput = {
          id: String(e.id_activity),
          start: e.f_ini,
          end: e.f_fin,
          color: e.color,
          //title: e.name_sub
        }
        
        return event
      })

    })
  }

  handleDateSelect( selectInfo: DateSelectArg ) {
    
    this.calendarService.selectInfo = selectInfo
    this.modalService.openModal('addEvent')

  }


  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  /* handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  } */


  
  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
  
}
