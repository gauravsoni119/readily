import { Attribute, Directive, ElementRef, EventEmitter, HostBinding, HostListener, OnInit, OnDestroy, Output, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[readilyDropContainer]'
})
export class DropContainerDirective implements OnInit, OnDestroy {

  private readonly dragOver$: Subject<void> = new Subject();

  private readonly destroy$: Subject<DragEvent> = new Subject();

  @Output() readilyDrop: EventEmitter<File> = new EventEmitter();

  @HostBinding('class') dropContainerClasses = '';

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver$.next();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.renderer.removeClass(this.elementRef.nativeElement, this.dragOverClasses);
    this.renderer.addClass(this.elementRef.nativeElement, this.dragLeaveClasses);
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length) {
      this.readilyDrop.emit(files[0]);
    }
    this.renderer.removeClass(this.elementRef.nativeElement, this.dragOverClasses);
  }

  constructor(
    @Attribute('dragOverClasses') private readonly dragOverClasses: string,
    @Attribute('dragLeaveClasses') private readonly dragLeaveClasses: string,
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.dragOver$.pipe(
      throttleTime(500),
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.renderer.removeClass(this.elementRef.nativeElement, this.dragLeaveClasses);
      this.renderer.addClass(this.elementRef.nativeElement, this.dragOverClasses)
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
