import { Type } from '@angular/core';

export class StepItem {
  constructor(public component: Type<any>, public data: any = {}) {}
}
