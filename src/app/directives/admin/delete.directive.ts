import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { ProductService } from '../../services/common/models/product.service';
import { SpinnerType } from '../../bases/bases.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import {
  DeleteDialogComponent,
  DeleteState,
} from '../../dialogs/delete-dialog/delete-dialog.component';

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective implements OnInit {
  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) {}

  @Input() id!: string;
  @Output() loadProductsBack: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
    this.createButton();
  }

  createButton() {
    const button = this.renderer.createElement('button');
    this.renderer.setAttribute(button, 'mat-raised-button', '');
    this.renderer.setAttribute(button, 'color', 'warn');
    this.renderer.addClass(button, 'mdc-button');
    this.renderer.addClass(button, 'mdc-button--raised');
    this.renderer.addClass(button, 'mat-mdc-raised-button');
    this.renderer.addClass(button, 'mat-warn');
    this.renderer.addClass(button, 'mat-mdc-button-base');
    this.renderer.setStyle(button, 'margin-right', '1px');

    const ripple = this.renderer.createElement('span');
    this.renderer.addClass(ripple, 'mat-mdc-button-persistent-ripple');
    this.renderer.addClass(ripple, 'mdc-button__ripple');
    this.renderer.appendChild(button, ripple);

    const icon = this.renderer.createElement('mat-icon');
    this.renderer.setAttribute(icon, 'role', 'img');
    this.renderer.addClass(icon, 'mat-icon');
    this.renderer.addClass(icon, 'notranslate');
    this.renderer.addClass(icon, 'material-icons');
    this.renderer.addClass(icon, 'mat-ligature-font');
    this.renderer.addClass(icon, 'mat-icon-no-color');
    this.renderer.setAttribute(icon, 'aria-hidden', 'true');
    const iconText = this.renderer.createText('delete');
    this.renderer.appendChild(icon, iconText);
    this.renderer.appendChild(button, icon);

    const label = this.renderer.createElement('span');
    this.renderer.addClass(label, 'mdc-button__label');
    const labelText = this.renderer.createText(' Delete ');
    this.renderer.appendChild(label, labelText);
    this.renderer.appendChild(button, label);

    const focusIndicator = this.renderer.createElement('span');
    this.renderer.addClass(focusIndicator, 'mat-mdc-focus-indicator');
    this.renderer.appendChild(button, focusIndicator);

    const touchTarget = this.renderer.createElement('span');
    this.renderer.addClass(touchTarget, 'mat-mdc-button-touch-target');
    this.renderer.appendChild(button, touchTarget);

    const matRipple = this.renderer.createElement('span');
    this.renderer.addClass(matRipple, 'mat-ripple');
    this.renderer.addClass(matRipple, 'mat-mdc-button-ripple');
    this.renderer.appendChild(button, matRipple);

    // this.renderer.listen(button, 'click', () => this.handleClick());

    this.renderer.appendChild(this.element.nativeElement, button);
  }

  @HostListener('click')
  async handleClick() {
    this.openDialog(async () => {
      await this.confirmAndDelete();
    });
  }

  private async confirmAndDelete() {
    this.spinner.show(SpinnerType.BallScaleMultiple);
    await this.deleteProduct(this.id);
    const tableRow = this.element.nativeElement.closest('tr');
    if (tableRow) {
      this.renderer.setStyle(tableRow, 'transition', 'opacity 2s');
      this.renderer.setStyle(tableRow, 'opacity', '0');
      setTimeout(() => {
        this.renderer.removeChild(tableRow.parentElement, tableRow);
        this.loadProductsBack.emit();
      }, 1500);
    }
  }

  private async deleteProduct(id: string): Promise<void> {
    await this.productService.delete(id);
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      panelClass: 'custom-dialog-container',
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === DeleteState.Yes) afterClosed();
    });
  }
}
