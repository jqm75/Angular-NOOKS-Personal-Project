import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';

import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
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



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})


export class CalendarComponent {

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    locales: [esLocale, caLocale], // Idioma
    locale: 'es',
    initialView: 'timeGridWeek',
    allDaySlot: false,
    initialEvents: INITIAL_EVENTS, // Alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = []

  @ViewChild('modalContent') modalContent: any;

  constructor(
      private modalService: ModalService,
      private changeDetector: ChangeDetectorRef,
      //private modalService: NgbModal
  ) {}

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  //TODO: Lanzar Modal. Y montar un formulario dentro.
  handleDateSelect(selectInfo: DateSelectArg) {
    const title = 'título'
    const calendarApi = selectInfo.view.calendar;

    this.addNewEvent();

    calendarApi.unselect(); // clear date selection

    /* if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        //allDay: selectInfo.allDay,
        allDay: false,
        color: 'green',
        durationEditable: true
      });
    } */
  }
  addNewEvent() {
    this.modalService.openModal('addEvent')
  }
  // handleDateSelect(selectInfo: DateSelectArg) {
  //   this.modalService.open(this.modalContent, { size: 'lg', backdrop: 'static' });
  //   this.selectedInfo = selectInfo;
  // }
  
  // addEvent(modal: any) {
  //   const title = /* Obtén el valor del título del formulario */;
  //   const calendarApi = this.selectedInfo.view.calendar;
  
  //   calendarApi.unselect(); // clear date selection
  
  //   if (title) {
  //     calendarApi.addEvent({
  //       id: createEventId(),
  //       title,
  //       start: this.selectedInfo.startStr,
  //       end: this.selectedInfo.endStr,
  //       allDay: false,
  //       color: 'green',
  //       durationEditable: true
  //     });
  //   }
  
  //   modal.dismiss(); // Cierra el modal
  // }

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
