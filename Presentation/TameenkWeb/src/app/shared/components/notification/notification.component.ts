import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  notification;
  subscription: Subscription;
    constructor(private _notificationService: NotificationService) {
      this.subscription = this._notificationService.getMessage().subscribe(notification => { this.notification = notification; });
    }

    ngOnInit() {
    }
    ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
    }
    close() {
      this._notificationService.clearMessage();
    }
  }
