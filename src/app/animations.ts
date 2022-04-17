import { animate, state, style, transition, trigger } from '@angular/animations';

export const slideIn = trigger('slideIn', [
  state('in', style({ opacity: 1, transform: 'translateX(0%)' })),
  transition('void <=> *', [style({ opacity: 0, transform: 'translateX(-100%)' }), animate('600ms ease')]),
  transition('* <=> void', [animate('600ms ease', style({ opacity: 0, transform: 'translateX(100%)' }))]),
]);
