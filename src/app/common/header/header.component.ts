import { Component, signal } from '@angular/core';
import { BundleService } from '../../services/bundle.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EvilButtonComponent } from '../../components/evil-button/evil-button.component';
import { ElectronService } from '../../core/services/electron/electron.service';
import { ToastService } from '../../util/toast/toast.service';
import { CreateAreaModalComponent } from '../../modals/create-area-modal/create-area-modal.component';
import * as path from 'path';
import { Area } from '../../domain/area.domain';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, EvilButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    protected bundleService: BundleService,
    private electronService: ElectronService,
    private toastService: ToastService
  ) {}

  bundleDirectory: string =
    'C:\\Dev\\Workspace\\ranvier\\ranvier-cyberwarlock\\bundles\\overworld';

  openDirectorySelect() {
    this.electronService
      .openDirectorySelectDialog({ properties: ['openDirectory'] })
      .then((result: any) => {
        this.bundleDirectory = result.filePaths[0];
      });
  }
  loadBundle() {
    if (!this.bundleDirectory || this.bundleDirectory.length === 0) {
      this.toastService.open({
        color: 'toast-red',
        message: 'Please select a bundle directory.',
        header: 'Nothing to load',
      });
    } else {
      this.bundleService.loadBundle(this.bundleDirectory);
    }
  }

  createArea() {
    this.bundleService.createArea();
  }

  selectActiveArea(newArea: Area) {
    this.bundleService.switchArea(newArea);
  }
}
