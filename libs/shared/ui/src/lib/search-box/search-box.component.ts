import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Book } from '@readily/shared/data-access/models';
import { BehaviorSubject, merge, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { AutoCompleteOption } from './search-box.model';

@Component({
  selector: 'readily-search-box',
  templateUrl: './search-box.component.html',
  styles: [`:host {display: block}`],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchBoxComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input()
  set autoCompleteOptions(options: AutoCompleteOption[]) {
    this._autoCompleteOptions = options ?? [];
    this.autoCompleteChange$.next();
  }
  get autoCompleteOptions() {
    return this._autoCompleteOptions;
  }

  private _autoCompleteOptions: AutoCompleteOption[] = [];

  autoCompleteOptions$: Observable<AutoCompleteOption[]> = of([]);

  autoCompleteChange$ = new Subject<void>();

  @ViewChild('search', { static: true }) search!: ElementRef<HTMLInputElement>;

  searchTerm = new FormControl('');

  focusChanged$ = new Subject<boolean>();

  private onChange: (value: string) => any = () => { };

  private onTouched: () => any = () => { };

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.autoCompleteOptions$ = merge(this.autoCompleteChange$, this.searchTerm.valueChanges).pipe(
      distinctUntilChanged(),
      map(() => this.searchTerm.value),
      tap((value: string) => value.length === 0 && this.clearSearchTerm()),
      map((searchTerm) => this.autoCompleteOptions.filter(option => {
        return this.normalizeValue(option.name).includes(searchTerm.toLowerCase());
      })),
      takeUntil(this.destroy$)
    );
  }

  writeValue(value: string): void {
    this.searchTerm.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInputFocus() {
    this.focusChanged$.next(true);
    this.search.nativeElement.focus();
    this.onTouched();
  }

  onInputBlur() {
    this.focusChanged$.next(false);
  }

  clearSearchTerm() {
    this.searchTerm.setValue('');
    this.onChange(this.searchTerm.value);
  }

  onOptionSelected() {
    this.onChange(this.searchTerm.value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase();
  }

}
