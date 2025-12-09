import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'textarea[autoResize]'
})
export class AutoResizeDirective {

  @Input() maxHeight: number = 180; // Значение по умолчанию

  constructor(private elementRef: ElementRef) {}

  @HostListener('input')
  onInput(): void {
    this.resize();
  }

  ngOnInit(): void {
    // Инициализация при загрузке
    setTimeout(() => this.resize(), 0);
  }

  private resize(): void {
    const textarea = this.elementRef.nativeElement;
    textarea.style.height = 'auto';

    const scrollHeight = textarea.scrollHeight;

    // Устанавливаем высоту, но не больше максимальной
    if (scrollHeight > this.maxHeight) {
      textarea.style.height = this.maxHeight + 'px';
      textarea.style.overflowY = 'auto'; // Добавляем скролл если превышен лимит
    } else {
      textarea.style.height = scrollHeight + 'px';
      textarea.style.overflowY = 'hidden'; // Убираем скролл
    }
  }
}
