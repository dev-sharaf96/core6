import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../core/services';
import { Notification } from '../core/models';

/**
 * notifications Component
 *
 * @export
 * @class NotificationsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notificationSummary: NotificationSummary[];

  /**
   * create instance of notification component.
   * @constructor
   */
  constructor(private _notificationService: NotificationService) { }

  /**
   * On Component Initial
   *
   * @memberof NotificationsComponent
   */
  ngOnInit() {
    this._notificationService.getInsuranceProviderNotifications().subscribe(r => {
      const summary = {};
      r.data.forEach(n => {
        summary[n.type] = summary[n.type] || [];
        summary[n.type].push(n);
      });
      this.notificationSummary = [];
      for (const t in summary) {
        const length = summary[t].length;
        var d = new Date(summary[t][length - 1].createdAt);
        d = d;
        this.notificationSummary.push(new NotificationSummary(t, length, d));
      }
    });
  }
  /**
   * convert date into local date time zone.
   * @param date - The  date.
   */
  convertUTCDateToLocalDate(date) {
    const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    const offset = date.getTimezoneOffset() / 60;
    const hours = date.getHours();
    newDate.setHours(hours - offset);

    return newDate;
  }
}
/**
 * create Notification Summary Model
 *
 * @class NotificationSummary
 */
class NotificationSummary {
  /**
   * @property {string} type - The notification type.
   */
  type: string;
  /**
   * @property {number} count - The count of notifications with the same type.
   */
  count: number;
  /**
   * @property {Date} date - The notification date.
   */
  date: Date;
  /**
   * Create instance of notification summary.
   * @constructor
   * @param {string} type - The notification type.
   * @param {number} count - The count of notifications with the same type.
   * @param {Date} date - The notification date.
   */
  constructor(type: string, count: number, date: Date) {
    this.type = type;
    this.count = count;
    this.date = date;
  }

}
