import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormBuilder, FormControl } from '@angular/forms';
import { BooksStore } from '@readily/shared/data-access/store';

@Component({
  selector: 'readily-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  vm$ = this.bookStore.vm$;

  searchFormGroup = this.formBuilder.group({
    searchTerm: ['']
  });

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly formBuilder: FormBuilder,
    private readonly bookStore: BooksStore) { }

}
