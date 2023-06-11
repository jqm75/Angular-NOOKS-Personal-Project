import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventCalendar } from '../interfaces/event-calendar.interface';
import { EventInput } from '@fullcalendar/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private URL_API = 'https://nooks.muchplanet.com/api.php'
  public events: EventInput[] | undefined

  constructor(private http: HttpClient) { }

  public getAllEvents(): Observable<EventCalendar[]> {
    return this.http.get<EventCalendar[]>(`${this.URL_API}?action=get-events`)
  }
}


//TODO: Crear función getActivities. Full CAlendar GET EVENTS. Hacer función updatEvent