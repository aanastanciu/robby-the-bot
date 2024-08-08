import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MissionService } from '../../../services/mission.service';
import { Mission } from '../../../utils/interfaces/mission.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-planner-mission-table',
  templateUrl: './planner-mission-table.component.html',
  styleUrl: './planner-mission-table.component.scss'
})
export class PlannerMissionTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'missionName', 'xCoordinate', 'yCoordinate'];
  missionsData = new MatTableDataSource<Mission>()
  private destroy$ = new Subject<void>();

  constructor(private missionService: MissionService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getMissions();
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  getMissions() {
    this.missionService.getMissions().pipe(
      takeUntil(this.destroy$)
    ).subscribe((missions: Mission[]) => {
      this.missionsData.data = missions;
      this.cdr.detectChanges();
      this.missionsData.paginator = this.paginator;
    })
  }

  clearTable() {
    this.missionService.clearLocalStorage();
  }
}