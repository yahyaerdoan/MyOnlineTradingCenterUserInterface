import { NgxSpinnerService } from 'ngx-spinner';

export class BasesComponent {

  constructor(private spinner: NgxSpinnerService) { }

  showSpinner(spinnerNameType: SpinnerType) {
    this.spinner.show(spinnerNameType);
    //setTimeout(()=> this.hideSpinner(spinnerNameType), 1000)
  }

  hideSpinner(spinnerNameType: SpinnerType) {
    this.spinner.hide(spinnerNameType);
  }
}

export enum SpinnerType {
  BallScaleMultiple = "s1",
}