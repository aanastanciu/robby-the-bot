import { Injectable } from '@angular/core';
import { Mission } from '../utils/interfaces/mission.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private missionsSubject$ = new BehaviorSubject<Mission[]>([]);

  constructor() {
    this.getStoredMissions()
  }

  saveMission(mission: Mission): void {
    const missions = this.missionsSubject$.getValue();

    // Assign unique ID to our mission
    const newId = this.getUniqueId(missions);
    const newMission = { ...mission, id: newId };

    missions.push(newMission);
    localStorage.setItem('missions', JSON.stringify(missions));
    this.missionsSubject$.next(missions)
  }

  getMissions(): BehaviorSubject<Mission[]> {
    return this.missionsSubject$;
  }

  getStoredMissions(): void {
    const parsedMission = localStorage.getItem('missions');
    const missions: Mission[] = parsedMission
      ? JSON.parse(parsedMission)
      : [];
    this.missionsSubject$.next(missions);
  }

  getUniqueId(missions: Mission[]): number {
    if (missions.length === 0) {
      return 1;
    }
    const latestId = missions.reduce((max, mission) => mission.id > max ? mission.id : max, missions[0].id);
    return latestId + 1;
  }

  clearLocalStorage() {
    localStorage.removeItem('missions');
    this.missionsSubject$.next([])
  }
}
