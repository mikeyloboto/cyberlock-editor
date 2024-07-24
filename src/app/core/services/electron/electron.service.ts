import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as remote from '@electron/remote';
import * as path from 'path';
import { Area } from '../../../domain/area.domain';
import * as yaml from 'js-yaml';
import { Room } from '../../../domain/room.domain';
import { Npc } from '../../../domain/npc.domain';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  ipcRenderer!: typeof ipcRenderer;
  webFrame!: typeof webFrame;
  childProcess!: typeof childProcess;
  fs!: typeof fs;

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      console.log('Electron detected');
      this.ipcRenderer = (window as any).require('electron').ipcRenderer;
      this.webFrame = (window as any).require('electron').webFrame;

      this.fs = (window as any).require('fs');

      this.childProcess = (window as any).require('child_process');
      this.childProcess.exec('node -v', (error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout:\n${stdout}`);
      });

      // Notes :
      // * A NodeJS's dependency imported with 'window.require' MUST BE present in `dependencies` of both `app/package.json`
      // and `package.json (root folder)` in order to make it work here in Electron's Renderer process (src folder)
      // because it will loaded at runtime by Electron.
      // * A NodeJS's dependency imported with TS module import (ex: import { Dropbox } from 'dropbox') CAN only be present
      // in `dependencies` of `package.json (root folder)` because it is loaded during build phase and does not need to be
      // in the final bundle. Reminder : only if not used in Electron's Main process (app folder)

      // If you want to use a NodeJS 3rd party deps in Renderer process,
      // ipcRenderer.invoke can serve many common use cases.
      // https://www.electronjs.org/docs/latest/api/ipc-renderer#ipcrendererinvokechannel-args
    }
  }

  openDirectorySelectDialog(options: any) {
    return this.ipcRenderer.invoke('openDirectorySelectDialog', options);
  }

  getAreasList(baseDir: string) {
    return this.fs
      .readdirSync(baseDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory());
  }

  createArea(baseDir: string, areaName: string) {
    this.fs.mkdirSync(path.join(baseDir, 'areas', areaName), {
      recursive: true,
    });
  }

  loadRooms(area: Area) {
    if (this.fs.existsSync(path.join(area.areaDirectory!, 'rooms.yml'))) {
      return yaml.load(
        this.fs.readFileSync(
          path.join(area.areaDirectory!, 'rooms.yml'),
          'utf8'
        )
      ) as Room[];
    } else {
      console.log('No rooms.yml file found, creating');
      this.fs.writeFileSync(path.join(area.areaDirectory!, 'rooms.yml'), '[]');
      return [];
    }
  }

  loadNpcs(area: Area) {
    if (this.fs.existsSync(path.join(area.areaDirectory!, 'npcs.yml'))) {
      return yaml.load(
        this.fs.readFileSync(path.join(area.areaDirectory!, 'npcs.yml'), 'utf8')
      ) as Npc[];
    } else {
      console.log('No npcs.yml file found, creating');
      this.fs.writeFileSync(path.join(area.areaDirectory!, 'npcs.yml'), '[]');
      return [];
    }
  }

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }
}
