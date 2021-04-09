import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnim', [
      // INCREMENT ANIMATION
      transition(':increment', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),

        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'block'
          })
        ], { optional: true }),

        group([
          query(':leave', [
            animate('250ms ease-in', style({
              opacity: 0,
              transform: 'translateX(-50px)'
            }))
          ], { optional: true }),
  
          query(':enter', [
            style({
              transform: 'translateX(50px)',
              opacity: 0
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0)'
            }))
          ], { optional: true })
        ])
      ]),

      // DECREMENT ANIMATION
      transition(':decrement', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),

        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'block'
          })
        ], { optional: true }),

        group([
          query(':leave', [
            animate('250ms ease-in', style({
              opacity: 0,
              transform: 'translateX(50px)'
            }))
          ], { optional: true }),
  
          query(':enter', [
            style({
              transform: 'translateX(-50px)',
              opacity: 0
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0)'
            }))
          ], { optional: true })
        ])
      ])
    ]),
    trigger('bgAnim', [
      transition(':leave', [
        animate(1000, style({
          opacity: 0
        }))
      ])
    ]),
    trigger('fadeAnim', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250, style({
          opacity: 1
        }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(250, style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class AppComponent {

  backgrounds: string[] = ["https://images.unsplash.com/photo-1617555378116-5608115f9943?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixlib=rb-1.2.1&q=80&w=1920"]

  loadingBgImage!: boolean;

  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      return outlet.activatedRouteData['tab']
    } else {
      return 
    }
  }

  async changeBgImage() {
    // set to true, to prevent the user from clicking the reload buttom before the next image is loaded
    this.loadingBgImage = true;

    // get random image url from API
    const result = await fetch('https://source.unsplash.com/random/1920x1080', {
      method: 'HEAD'
    })

    // check if we already got the image, if it is duplicate get another image
    const alreadyGot = this.backgrounds.includes(result.url);
    if(alreadyGot) {
      return this.reloadImage()
    }

    // push the new background in the array of backgrounds
    this.backgrounds.push(result.url);
  }
  reloadImage() {
    this.changeBgImage();
  }

  // show back the reload butoon
  onBgImageLoad(imgEvent: Event) {
    // when new image get loaded remove the oldest one 
    const imgElement = imgEvent.target as HTMLImageElement;

    // get the url from image
    const src = imgElement.src;

    // keep only the new loaded image in the array
    this.backgrounds = this.backgrounds.filter(b => b === src)

    this.loadingBgImage = false;
  }

}
