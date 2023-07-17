import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

import { DateSelectArg, EventInput } from '@fullcalendar/core';
import { createEventId } from '../calendar/event-utils';
import { ApiCalendarResponse, EventCalendar } from '../interfaces';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  //private URL_API = 'http://nooks.muchplanet.com/api.php'
  private URL_API = environment.apiBaseUrl;
  public events: EventInput[] | undefined
  public selectInfo!: DateSelectArg



  constructor(private http: HttpClient) { }

  public getAllEvents(): Observable<EventInput[]> {
    console.log(this.URL_API);
 
    
    return this.http.get<ApiCalendarResponse[]>(`${this.URL_API}?action=get-events`).pipe(
      map(events => events.map(e => {
        const event: EventInput = {
          id: String(e.id_activity),
          start: e.f_ini,
          end: e.f_fin,
          color: e.color,
          //title: e.name_sub
        }
        return event
      })),
      tap(console.log)
    )
  }

  addEvent(form: FormGroup) {

    alert('Hola lo que sea');

    const formData = form.value;

    console.log('🚀 ~ formData:', formData)

    const title = formData.title;
    const calendarApi = this.selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection

    const currentEvent = {
      id: createEventId(),
      title: title,
      start: formData.start,
      end: formData.end,
      allDay: false,
      color: 'green',
      durationEditable: true
    }

    calendarApi.addEvent(currentEvent);
    // this.http.post(`${this.URL_API}?action=insert-event`, event).subscribe(console.log)
    return currentEvent

  }

  updateEvent(event: EventInput) {

    const eventId = event.id;
    const eventTitle = event.title;
    const eventStart = event.start;
    const eventEnd = event.end;
    const eventAllDay = event.allDay;
    const eventColor = event.color;
    const eventDurationEditable = event.durationEditable;

    const body = {
      action: 'update-event',
      id: eventId,
      title: eventTitle,
      start: eventStart,
      end: eventEnd,
      allDay: eventAllDay,
      color: eventColor,
      durationEditable: eventDurationEditable
    };

    return this.http.put<ApiCalendarResponse>(`${this.URL_API}`, body).pipe(
      map(response => response)
    );
  }
}



//TODO: Crear función getActivities. Full Calendar GET EVENTS. Hacer función updateEvent