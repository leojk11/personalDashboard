import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NotificationData } from '../shared/notification-data.model';

// notification service
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('notificationAnim', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(5px)'
        }),
        animate('150ms ease-out')
      ]),
      transition(':leave', [
        animate(125, style({
          opacity: 0,
          transform: 'scale(0.85)'
        }))
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit {

  notification!: NotificationData | null;

  timeout: any;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.notifications.subscribe((notification: NotificationData) => {
      // set the notification text to be the passed text
      this.notification = notification;

      // clear timeout, so when you click mutiple times the notification will still go away afte one second
      clearTimeout(this.timeout);

      // timeout function, notification goes away after one second
      this.timeout = setTimeout(() => {
        this.notification = null; 
      }, this.notification.duration);
    })
  }

}
