import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { Bundle } from '../domain/bundle.domain';
import { ElectronService } from '../core/services/electron/electron.service';
import * as path from 'path';
import { Area } from '../domain/area.domain';
import { ToastService } from '../util/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class BundleService {
  selectedBundle: Bundle | undefined;

  currentArea: Area = {};

  loadBundle(baseDirectory: string) {
    this.selectedBundle = {
      directory: baseDirectory,
    };
    this.selectedBundle.bundleName = baseDirectory.split(/[\\\\|/]/).pop();
    this.loadAreas();
  }

  loadAreas() {
    let areasPath = path.join(this.selectedBundle!.directory, 'areas');
    let areas = this.electronService.getAreasList(areasPath);
    this.selectedBundle!.areas = [];
    areas.forEach((area) => {
      this.selectedBundle!.areas!.push({
        areaName: area.name,
        areaDirectory: path.join(area.path, area.name),
      });
    });
    if (areas.length > 0) {
      this.switchArea(this.selectedBundle!.areas![0]);
    }
  }

  createArea() {
    this.toastService.open({
      color: 'toast-blue',
      message: 'Enter name of new area:',
      header: 'Creating Area',
      inputCallback: (areaName) => {
        areaName = areaName.trim().toLowerCase();
        const newArea = {
          areaName: areaName,
          areaDirectory: path.join(
            this.selectedBundle!.directory,
            'areas',
            areaName
          ),
        };
        if (areaName && areaName.length > 0) {
          if (
            this.selectedBundle?.areas?.find(
              (a) => a.areaName?.toLowerCase() === areaName.toLowerCase()
            )
          ) {
            return false;
          }
          this.selectedBundle!.areas!.push(newArea);
          this.electronService.createArea(
            this.selectedBundle!.directory,
            areaName
          );
        } else return false;

        this.switchArea(newArea);

        this.toastService.open({
          color: 'toast-green',
          message: `${areaName} created.`,
          header: 'Area Created',
        });
        return true;
      },
    });
  }

  switchArea(area: Area) {
    this.currentArea = area;
    this.loadRooms(area);
    this.loadNpcs(area);
    console.log(`Switched to area: ${area.areaName}`);
    console.log(area);
  }

  loadRooms(area: Area) {
    area.rooms = this.electronService.loadRooms(area);
  }

  loadNpcs(area: Area) {
    area.npcs = this.electronService.loadNpcs(area);
  }

  constructor(
    private electronService: ElectronService,
    private toastService: ToastService
  ) {}
}
