import { Component, Input, OnInit } from '@angular/core';
import { Status } from '../shared/models/models';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  @Input() status: Status = 'initial';

  constructor() { }

  ngOnInit(): void {
  }

}
