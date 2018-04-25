import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'material-select',
  templateUrl: 'material-select.component.html',
  styleUrls: ['material-select.component.scss']
})
export class MaterialSelectComponent {
  @Input()
  public placeholderText: string = 'Choose an option';
  @Input()
  public items: string[] = [];
  @Output()
  public onItemSelected: EventEmitter<string> = new EventEmitter();

  public isActive = false;
  public selectedItem: string;

  public toggleDropdownState(event: Event) {
    this.isActive = !this.isActive;
    event.stopPropagation();
  }

  public notifyItemSelection(item: string) {
    this.selectedItem = item;
    this.onItemSelected.emit(item);
  }

  /**
  Closes the dropdown when the user clicks something
  other than the dropdown
  */
  @HostListener('document:click')
  public closeDropdown() {
    this.isActive = false;
  }
}
