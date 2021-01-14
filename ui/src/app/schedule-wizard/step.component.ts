import { WizardData } from './wizard-data';

export interface StepComponent {
  data: WizardData;
  submit(): { isValid: boolean; data: object };
}
