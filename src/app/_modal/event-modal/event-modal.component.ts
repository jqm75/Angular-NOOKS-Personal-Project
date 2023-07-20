import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild, TemplateRef } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { CalendarService } from 'src/app/services/calendar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss'],
})

export class EventModalComponent {
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;
  @Output() serverChanged: EventEmitter<boolean> = new EventEmitter()
  title!: string;
  public eventForm: FormGroup;
  selectedOption: string = '';

  constructor(
    private modalFunctions: NgbModal,
    private modalService: ModalService,
    private calendarService: CalendarService,
    public fb: FormBuilder
  ) {
    this.modalService.modals['addEvent'] = this;

    this.eventForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      group: ['', Validators.required],
      activity: ['', Validators.required],
      image: ['']
    });
  }

  open() {
    this.modalFunctions.open(this.modalContent);
  }

  addEvent() {
    if (this.eventForm.valid) {
    
      this.calendarService.addEvent(this.eventForm);

      //TODO si todo está bien en el post hacer esto: crear event emitter y pasar por output al padre (calendar) que se ha guardado correctamente para volver a hacer la petición de getAll al server
      // if todo bien  this.serverChanged.emit(true)
      // if todo mal  this.serverChanged.emit(false)
      //


      this.modalFunctions.dismissAll();
    } else {
      console.log('El formulario no es válido');
    }
  }
  
}
