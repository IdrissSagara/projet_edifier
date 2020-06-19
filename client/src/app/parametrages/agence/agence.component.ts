import {Component, OnInit} from '@angular/core';
import {NgModel} from "@angular/forms";
import {Agence} from "../../model/agence";
import {AgenceService} from "../../services/agence.service";
import {SpinnerService} from "../../services/spinner.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.css']
})
export class AgenceComponent implements OnInit {
  showError: boolean = false;
  agence: Agence;
  erreursServeur: any;

  constructor(private agenceService: AgenceService,
              private spinner: SpinnerService, private toastService: ToastrService) {
  }

  ngOnInit(): void {
    this.agenceService.getAgence().subscribe((res) => {
      this.agence = res;
    }, error => {
      this.toastService.error(`Impossible de récupérer les informations de l'agence`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }

  enregistrerFormulaire() {
    this.spinner.show();
    this.agenceService.getOrCreateAgence(this.agence).subscribe((response) => {
      this.agence = response;
      this.toastService.success('L\'information de l\'agence à été enregistré avec succes', '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
      this.spinner.hide();
    }, error => {
      console.log(error);
      this.toastService.error(`Une erreur est survenue lors de l'enregistrement des informations de l'agence`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
      this.spinner.hide();
    });
  }

  inputEnErreur(input: NgModel): boolean {

    // validation côté client (validation html)
    if (input.invalid && input.touched) {
      return true;
    }

    if (input.untouched && input.errors && !input.errors.required) {
      return true;
    }
  }
}
