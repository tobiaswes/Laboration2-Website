import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {
  searchTerm: string = '';

  @Output() searchEvent = new EventEmitter<string>();

  onSearchChange(): void {
    console.log('Search term:', this.searchTerm); // Log the search term
    this.searchEvent.emit(this.searchTerm); // Emit search term to parent component
  }
}
