import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import { StepDirective } from '../../directives/step.directive';
import { StepItem } from '../../models/step-item';
import { StepComponent } from '../../models/step-component';
import { StepService } from '../../services/step.service';
import { Meeting } from '../../models/meeting';
import { WizardService } from '../../services/wizard.service';

@Component({
  selector: 'app-meeting-wizard',
  templateUrl: './meeting-wizard.component.html',
})
export class MeetingWizardComponent implements OnInit {
  private steps: StepItem[];
  private currentRef: StepComponent;
  private wizardData: Meeting;

  currentStepIndex = 0;
  stepErrorMessage: string;

  @ViewChild(StepDirective, { static: true }) stepHost: StepDirective;

  constructor(
    private ss: StepService,
    private ws: WizardService,
    private cfr: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.steps = this.ss.getSteps();
    this.renderComponent();
  }

  get totalSteps(): number {
    return this.steps.length;
  }

  get isLastStep(): boolean {
    return this.currentStepIndex + 1 === this.steps.length;
  }

  goBack(): void {
    this.currentStepIndex--;
    this.renderComponent();
  }

  goNext(): void {
    const { isValid, data, error } = this.currentRef.submit();
    if (!isValid) {
      this.stepErrorMessage = error;
      return;
    }
    this.ws.updateData({ ...this.wizardData, ...data });

    if (this.isLastStep) {
      const meetingData = this.ws.getData();
      alert('Check wizard data on console');
      console.log(meetingData);
      return;
    }

    this.currentStepIndex++;
    this.renderComponent();
  }

  renderComponent(): void {
    const stepItem = this.steps[this.currentStepIndex];

    const componentFactory = this.cfr.resolveComponentFactory(
      stepItem.component
    );

    const viewContainerRef = this.stepHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<StepComponent>(
      componentFactory
    );
    // read and pass wizardData
    this.stepErrorMessage = '';
    this.wizardData = this.ws.getData();
    componentRef.instance.data = this.wizardData;
    this.currentRef = componentRef.instance;
  }
}
