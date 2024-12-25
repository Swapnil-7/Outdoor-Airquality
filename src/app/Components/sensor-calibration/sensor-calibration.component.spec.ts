import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorCalibrationComponent } from './sensor-calibration.component';

describe('SensorCalibrationComponent', () => {
  let component: SensorCalibrationComponent;
  let fixture: ComponentFixture<SensorCalibrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SensorCalibrationComponent]
    });
    fixture = TestBed.createComponent(SensorCalibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
