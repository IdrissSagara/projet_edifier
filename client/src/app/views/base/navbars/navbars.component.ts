import {AfterViewChecked, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {CollapseDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-navbars',
  templateUrl: './navbars.component.html',
  styleUrls: ['./navbars.component.css']
})
export class NavbarsComponent implements OnInit, AfterViewChecked {

  @ViewChild(CollapseDirective, {read: ElementRef, static: false}) collapse !: CollapseDirective;
  collapseRef;

  constructor(
    private renderer: Renderer2,
  ) {
  }

  private _isCollapsed: boolean = true;

  get isCollapsed() {
    if (this.collapseRef) {
      // temp fix for "overflow: hidden"
      if (getComputedStyle(this.collapseRef.nativeElement).getPropertyValue('display') === 'flex') {
        this.renderer.removeStyle(this.collapseRef.nativeElement, 'overflow');
      }
    }
    return this._isCollapsed;
  }

  set isCollapsed(value) {
    this._isCollapsed = value;
  }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    this.collapseRef = this.collapse;
  }
}
