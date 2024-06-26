import { animate, style, transition, trigger } from '@angular/animations';

export const routeTransitionAnimations = trigger('fadeAnimation', [
  transition('* <=> *', [
    style({ opacity: 0 }),
    animate('300ms', style({ opacity: 1 })),
  ]),
]);
