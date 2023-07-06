import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild, TemplateRef } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss'],
})
export class EventModalComponent {

  @ViewChild('modalContent') modalContent!: TemplateRef<any>;
  title!: string;

  constructor(
    private modalFunctions: NgbModal,
    private modalService: ModalService,
    private calendarService : CalendarService,
  ) {
    this.modalService.modals['addEvent'] = this
  }

  open(){
    this.modalFunctions.open(this.modalContent);
  }

  addEvent(){
    this.calendarService.addEvent()
    // Aquí: Recoger datos del formulario y enviarlo a un servicio. Con un 'subcribe' a un 'subject' con array o un objeto.
  }

  //TODO: Crear formulario reactivo aquí.

  
}
