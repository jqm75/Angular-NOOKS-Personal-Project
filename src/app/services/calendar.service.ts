import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventCalendar } from '../interfaces/event-calendar.interface';
import { DateSelectArg, EventInput } from '@fullcalendar/core';
import { createEventId } from '../calendar/event-utils';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private URL_API = 'https://nooks.muchplanet.com/api.php'
  public events: EventInput[] | undefined
  public selectInfo! : DateSelectArg 

  constructor(private http: HttpClient) { }

  public getAllEvents(): Observable<EventCalendar[]> {
    return this.http.get<EventCalendar[]>(`${this.URL_API}?action=get-events`)
  }

  addEvent (){
    alert ('Hola lo que sea')

    const title = 'Título'
    const calendarApi = this.selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection

    calendarApi.addEvent({
      id: createEventId(),
      title,
      start: this.selectInfo.startStr,
      end: this.selectInfo.endStr,
      //allDay: selectInfo.allDay,
      allDay: false,
      color: 'green',
      durationEditable: true
    });


  }


}



//TODO: Crear función getActivities. Full Calendar GET EVENTS. Hacer función updateEvent