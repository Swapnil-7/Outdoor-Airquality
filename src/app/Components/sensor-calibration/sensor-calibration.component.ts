import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from 'src/app/Services/device.service';

@Component({
  selector: 'app-sensor-calibration',
  templateUrl: './sensor-calibration.component.html',
  styleUrls: ['./sensor-calibration.component.css']
})
export class SensorCalibrationComponent {


    formData: any;
    sensorForm = new FormGroup({
      mCO2: new FormControl( ),
      mPM1: new FormControl( ),
      mPM25: new FormControl( ),
      mPM10: new FormControl( ),
     
      
      
      
    })
    constructor(private deviceService: DeviceService, private router: Router, private route: ActivatedRoute) {
  
    }
  
    ngOnInit() {
      this.getSensorSet();
  
    }
  
    getSensorSet() {
      // Fetch initial configuration from the server if not found in localStorage
      this.deviceService.getSensor().subscribe((result: any) => {
        console.log("GET Sensor-Calibration", result);
        this.sensorForm.patchValue(result);
        this.formData = result;
      }, (err:any) => {
        console.error(err.message);
        alert("An error Occured While fetching data");
      });
  
  
    }
  
    saveSensor() {
      console.log("save sensor calibration", this.sensorForm.value);
      // Save only the changed fields
      this.deviceService.setSensor(this.sensorForm.value).subscribe((result: any) => {
        console.log(result);
        if (result.sts === true) {
          alert('Sensor Calibration Update Successfully');
        } else {
          alert('Sensor Calibration Failed to update');
        }
      }, (err:any) => {
        console.error(err.message);
        alert("An error Occured While Updating Sensor Calibration data");
      });
    }
  
    ngOnDestroy(): void {
  
    }

}
