export interface StepComponent {
  data: any;
  submit(): { isValid: boolean; data: object };
}
