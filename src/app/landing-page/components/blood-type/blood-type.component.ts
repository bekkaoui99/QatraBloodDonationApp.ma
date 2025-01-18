import { Component } from '@angular/core';

@Component({
  selector: 'app-blood-type',
  templateUrl: './blood-type.component.html',
  styleUrls: ['./blood-type.component.css']
})
export class BloodTypeComponent {

// Blood types
  bloodTypes = ['O−', 'O+', 'A−', 'A+', 'B−', 'B+', 'AB−', 'AB+'];
  leftBloodTypes = ['O−', 'A−', 'B−','AB-'];
  rightBloodTypes = ['O+', 'A+', 'B+', 'AB+'];

  // Selected blood type
  selectedBloodType: string | null = null;

  // Blood compatibility map
  bloodCompatibility: { [key: string]: string[] } = {
    'O−': ['O−', 'O+', 'A−', 'A+', 'B−', 'B+', 'AB−', 'AB+'],
    'O+': ['O+', 'A+', 'B+', 'AB+'],
    'A−': ['A−', 'A+', 'AB−', 'AB+'],
    'A+': ['A−', 'A+', 'AB−', 'AB+'],
    'B−': ['B−', 'B+', 'AB−', 'AB+'],
    'B+': ['B+', 'AB+'],
    'AB−': ['AB−', 'AB+'],
    'AB+': ['AB+'],
  };

  /**
   * Selects the blood type and highlights the compatible paths.
   * @param type The blood type clicked.
   */
  selectBloodType(type: string): void {
    this.selectedBloodType = type;
  }

  /**
   * Determines if the given blood type can receive from the selected type.
   * @param type The blood type to check.
   * @returns True if compatible; otherwise, false.
   */
  canReceiveBlood(type: string): boolean {
    if (!this.selectedBloodType) {
      return false;
    }
    return this.bloodCompatibility[this.selectedBloodType].includes(type);
  }

}
