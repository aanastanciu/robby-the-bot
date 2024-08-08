import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { MissionService } from '../../services/mission.service';
import { Mission } from '../../utils/interfaces/mission.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('player') player!: ElementRef;
  displayedColumns: string[] = ['id', 'missionName'];
  missionsData = new MatTableDataSource<Partial<Mission>>();
  private destroy$ = new Subject<void>();

  missions: Mission[] = [];
  animationTimeout: any;
  initialRobotPosition = { x: 0, y: 0 };
  displayScaleFactor = 5;

  constructor(
    private missionService: MissionService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getMissions();
  }

  ngAfterViewInit(): void {
    this.setPlayerBoxDimensions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  getMissions() {
    this.missionService
      .getMissions()
      .pipe(takeUntil(this.destroy$))
      .subscribe((missions: Mission[]) => {
        this.missions = missions;
        const simplifiedMissions = missions.map((mission) => ({
          id: mission.id,
          missionName: mission.missionName,
        }));
        this.missionsData.data = simplifiedMissions;
      });
  }

  setPlayerBoxDimensions() {
    const { maxX, maxY } = this.calculateMaxCoordinates();
    const playerBoxEl = document.querySelector('.player-box') as HTMLElement;
    if (playerBoxEl) {
      playerBoxEl.style.width = `${(maxX + 1) * this.displayScaleFactor}px`;
      playerBoxEl.style.height = `${(maxY + 1) * this.displayScaleFactor}px`;
    }
  }

  calculateMaxCoordinates() {
    let maxX = 0;
    let maxY = 0;

    this.missions.forEach((mission) => {
      if (mission.xCoordinate > maxX) {
        maxX = mission.xCoordinate + this.displayScaleFactor;
      }
      if (mission.yCoordinate > maxY) {
        maxY = mission.yCoordinate + this.displayScaleFactor;
      }
    });

    return { maxX, maxY };
  }

  deployMission() {
    if (this.missions.length > 0) {
      this.animatePlayer(0);
      this.initSnackBar('Anybotics robot is deployed!');
    }
  }

  abortMission() {
    clearTimeout(this.animationTimeout);
    this.initSnackBar('Mission is aborted!');
  }

  returnHome() {
    clearTimeout(this.animationTimeout);

    const playerEl = this.player.nativeElement;
    playerEl.style.transition = 'transform 500ms linear';
    playerEl.style.transform = `translate(${this.initialRobotPosition.x}px, ${this.initialRobotPosition.y}px)`;

    this.initSnackBar('Returning to base!');
  }

  animatePlayer(index: number, abort: boolean = false) {
    if (abort) return;

    if (index >= this.missions.length) return;

    const mission = this.missions[index];
    const playerEl = this.player.nativeElement;
    const duration = 1000;

    const xCoordinate = mission.xCoordinate * this.displayScaleFactor;
    const yCoordinate = mission.yCoordinate * this.displayScaleFactor;

    playerEl.style.transition = `transform ${duration}ms linear`;
    playerEl.style.transform = `translate(${xCoordinate}px, ${yCoordinate}px)`;

    this.animationTimeout = setTimeout(() => {
      this.animatePlayer(index + 1);
    }, duration);
  }

  initSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 5000,
    });
  }

  navigateToPlannerPage() {
    this.router.navigate(['/planner']);
  }
}
