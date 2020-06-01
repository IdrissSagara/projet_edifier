import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[showHidePassword]'
})
export class ShowHidePasswordDirective {

  @HostBinding() type: string;

  constructor() {
    this.type = 'password';
  }

  changeType(type: string): void {
    this.type = type;
  }

}
