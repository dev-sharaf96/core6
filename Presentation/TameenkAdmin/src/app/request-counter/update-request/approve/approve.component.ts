import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PolicyService } from '../../../core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})

export class ApproveComponent implements OnInit {
  @Input() policyId;
  @Output() close = new EventEmitter();
  @Output() approve = new EventEmitter();
  @Output() loading = new EventEmitter();

  fileToUpload: File = null;

  handleFileInput(e, files) {
    this.fileToUpload = files[0];
}
  constructor(private _policyService: PolicyService, private _toastrService: ToastrService) { }

  ngOnInit() {}
  closePopup() {
    this.close.emit();
  }

  /**
   * Upload Policy and Update Status
   *
   * @memberof ApproveComponent
   */
  uploadPolicy(): void {
    if (this.fileToUpload) {
      const data = new FormData();
    data.append('policyId', this.policyId);
    data.append('policy', this.fileToUpload);
      this.loading.emit(true);
      this._policyService.uploadPolicy(data).subscribe(
      (res) => {
        this.approve.emit(1);
        this.loading.emit(false);
      },
      (error: any) => {
        this.loading.emit(false);
      //  this.close.emit();
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
      },
      () => {
        this.loading.emit(false);
        this.close.emit();
      }
    );
    }
}
}
