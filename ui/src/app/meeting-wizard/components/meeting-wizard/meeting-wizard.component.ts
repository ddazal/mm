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

  @ViewChild(StepDirective, { static: true }) stepHost: StepDirective;

  constructor(
    private ss: StepService,
    private ws: WizardService,
    private cfr: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.steps = this.ss.getSteps();
    this.wizardData = this.ws.getData();
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
    const { isValid, data } = this.currentRef.submit();
    if (!isValid) {
      return;
    }
    this.wizardData = this.ws.updateData({ ...this.wizardData, ...data });

    if (this.isLastStep) {
      alert('Check wizard data on console');
      console.log(this.wizardData);
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
    // pass wizardData
    componentRef.instance.data = this.wizardData;
    this.currentRef = componentRef.instance;
  }
}
