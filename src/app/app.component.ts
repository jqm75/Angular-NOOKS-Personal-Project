import { Component, OnInit } from '@angular/core';
import { CalendarService } from './services/calendar.service';
import { EventInput } from '@fullcalendar/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'S9-Angular4-NOOKS-Personal-Project';

  constructor(private calendarService: CalendarService) {}
  
  /* ngOnInit(): void {
    this.calendarService.getAllEvents().subscribe(events => {
      
      this.calendarService.events = events.map(e => {
        const event: EventInput = {
          id: String(e.id_activity),
          start: e.f_ini,
          end: e.f_fin,
          color: e.color
        }
        if (e.name_sub_classroom_work) {
          event.title = e.name_sub_classroom_work
        }
        return event
      })

      console.log('🚀 ~ AppComponent ~ this.calendarService.getAllEvents ~ this.calendarService.events:', this.calendarService.events)

    })
  } */
}
