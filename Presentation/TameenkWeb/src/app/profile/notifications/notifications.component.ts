import { Component, OnInit } from '@angular/core';
import { INotification, CommonResponse, PolicyService, AuthService } from 'src/app/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: INotification[];
  totalCount: number;
  loading = false;
  constructor(private _policyService: PolicyService, private _authService: AuthService) { }

  ngOnInit() {
    this.getNotifications();
  }
  getNotifications(paging?) {
    this.loading = true;
    this._policyService.getNotifications(this._authService.getUserId(), paging).subscribe((data: CommonResponse<INotification[]>) => {
      this.loading = false;
      this.notifications = data.data;
      this.totalCount = data.totalCount;
    },
    (error: any) => error);
  }
  downloadPolicy(fileId) {
    this._policyService.downloadUserPolicy(fileId).subscribe((data: CommonResponse<string>) => {
      const a = document.createElement('a');
        a.href = 'data:application/pdf;base64,' + data.data;
        a.download = 'policy';
        document.body.appendChild(a);
        a.click();
    },
    (error: any) => error);
  }
}
