import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
    FormGroup,
} from '@angular/forms';
import { MissionService } from '../../services/mission.service';

export function duplicateMissionValidator(
    missionService: MissionService
): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!(control instanceof FormGroup)) {
            return null;
        }

        const mission = control.value;
        let isMissionDuplicated = false;

        missionService.getMissions().subscribe((missions) => {
            isMissionDuplicated = missions.some(
                (existingMission) =>
                    existingMission.missionName === mission.missionName &&
                    existingMission.xCoordinate === mission.xCoordinate &&
                    existingMission.yCoordinate === mission.yCoordinate
            );
        });

        return isMissionDuplicated
            ? { duplicateMission: 'Mission with the same values already exists!' }
            : null;
    };
}
