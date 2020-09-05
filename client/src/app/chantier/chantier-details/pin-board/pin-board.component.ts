import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Photo} from "../../../model/photo";

@Component({
  selector: 'app-pin-board',
  templateUrl: './pin-board.component.html',
  styleUrls: ['./pin-board.component.css']
})
export class PinBoardComponent {

  @Input() photos: Photo[];
  @Output() onPhotoDeleted = new EventEmitter<number>();

  deletePhoto(id: number): void {
    const conf = confirm(`Voulez-vous supprimer l'image ?`);

    conf ? this.onPhotoDeleted.emit(id) : this.onPhotoDeleted.emit(-1);
  }

  trackByImage(_, photo: Photo): string {
    return photo.path;
  }
}
