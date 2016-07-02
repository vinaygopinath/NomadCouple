import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'material-select',
  templateUrl: 'material-select.component.html',
  styleUrls: ['material-select.component.css']
})
export class MaterialSelectComponent {
  @Input()
  placeholderText: string = 'Choose an option';
  @Input()
  items: any[] = [];
  @Output()
  onItemSelected: EventEmitter<any> = new EventEmitter();

  isActive = false;
  selectedItem: any;

  toggleDropdownState(event) {
    this.isActive = !this.isActive;
    event.stopPropagation();
  }

  notifyItemSelection(item) {
    this.selectedItem = item;
    this.onItemSelected.emit(item);
  }

  /**
  Closes the dropdown when the user clicks something
  other than the dropdown
  */
  @HostListener('document:click')
  closeDropdown() {
    this.isActive = false;
  }
}
