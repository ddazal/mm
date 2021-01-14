import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import { StepDirective } from '../../directives/step.directive';
import { StepItem } from '../../step-item';
import { StepComponent } from '../../step.component';
import { StepService } from '../../service/step.service';
import { WizardData } from '../../wizard-data';

@Component({
  selector: 'app-schedule-wizard',
  templateUrl: './schedule-wizard.component.html',
  styleUrls: ['./schedule-wizard.component.scss'],
})
export class ScheduleWizardComponent implements OnInit {
  private steps: StepItem[];
  private currentRef: StepComponent;
  currentStepIndex = 0;
  wizardData: WizardData = {
    eventTitle: '',
    eventDescription: '',
    events: [],
    adminName: '',
    adminEmail: '',
  };
  @ViewChild(StepDirective, { static: true }) appStepHost: StepDirective;

  constructor(
    private stepService: StepService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.steps = this.stepService.getSteps();
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
    this.wizardData = { ...this.wizardData, ...data };
    if (this.isLastStep) {
      console.log(this.wizardData);
      alert('Check wizard data on console');
    } else {
      this.currentStepIndex++;
      this.renderComponent();
    }
  }

  renderComponent(): void {
    const stepItem = this.steps[this.currentStepIndex];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      stepItem.component
    );

    const viewContainerRef = this.appStepHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<StepComponent>(
      componentFactory
    );
    // pass wizardData
    componentRef.instance.data = this.wizardData;
    this.currentRef = componentRef.instance;
  }
}
