import {Component, OnInit} from '@angular/core';
import {NgModel} from "@angular/forms";
import {Agence} from "../../model/agence";
import {AgenceService} from "../../services/agence.service";
import {SpinnerService} from "../../services/spinner.service";
import {ToastrService} from "ngx-toastr";
import {finalize, first} from "rxjs/operators";

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.css']
})
export class AgenceComponent implements OnInit {
  agence: Agence;
  erreursServeur: any;
  isLoading: boolean;

  constructor(private agenceService: AgenceService,
              private spinner: SpinnerService, private toastService: ToastrService) {
  }

  ngOnInit(): void {
    this.getAgence();
  }

  getAgence(): void {
    this.isLoading = true;
    this.spinner.show();
    this.agenceService.getAgence().pipe(first(), finalize(() => this.spinner.hide())).subscribe((res) => {
      this.agence = !!res ? res : new Agence();
    }, error => {
      this.toastService.error(`Impossible de récupérer les informations de l'agence`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    }, () => {
      this.spinner.hide();
      this.isLoading = false;
    });
  }

  enregistrerFormulaire() {
    const formData = this.toFormData();
    this.spinner.show();
    this.agenceService.insertOrUpdate(formData).pipe(first(), finalize(() => this.spinner.hide())).subscribe((response) => {
      const msg = response ? 'Les informations de la societé ont été enregistrées avec succes'
        : 'Les informations de la societé ont été modifiées avec succes';
      this.toastService.success(msg, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    }, error => {
      this.toastService.error(`Une erreur est survenue lors de l'enregistrement des informations de l'agence`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }

  // save file from angular example https://stackoverflow.com/a/47938117
  handleFileInput(files: FileList) {
    this.agence.logo = files.item(0);
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

  private toFormData() {
    const formData: FormData = new FormData();
    formData.append('id', this.agence.id.toString());
    formData.append('rccm', this.agence.rccm);
    formData.append('fiscal', this.agence.fiscal);
    formData.append('libelle', this.agence.libelle);
    formData.append('telephone', this.agence.telephone);
    formData.append('fax', this.agence.fax);
    formData.append('mail', this.agence.mail);
    formData.append('adresse', this.agence.adresse);
    formData.append('logo', this.agence.logo);
    return formData;
  }
}
