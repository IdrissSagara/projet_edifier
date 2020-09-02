import {Component, Input, OnInit} from '@angular/core';
import {Photo} from "../../../model/photo";

@Component({
  selector: 'app-pin-board',
  templateUrl: './pin-board.component.html',
  styleUrls: ['./pin-board.component.css']
})
export class PinBoardComponent implements OnInit {

  constructor() {
  }

  @Input() photos: Photo[];

  ngOnInit(): void {
  }

  deleteImage(photo: Photo): void {
    console.log('delete this image', photo);
    // the emit an event to inform the parent
  }

  trackByImage(_, photo: Photo): string {
    return photo.path;
  }
}
