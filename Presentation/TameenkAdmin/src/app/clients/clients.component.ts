import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clientsData: any[];
  clientsLoading: boolean;
  clientsTotalRecords: number;
  /**
   * @constructor Creates an instance of ClientsComponent.
   *
   * @param {TranslateService} translate
   * @memberof ClientsComponent
   */
  constructor() { }

  ngOnInit() {
    this.clientsLoading = true;
  }
  /**
   * @method clientsLazyLoad()
   * @summary load clients data by pagination
   *
   * @param {*} event
   * @memberof ClientsComponent
   */
  clientsLazyLoad(event) {
    // this.clientsLoading = true;
    // setTimeout(() => {
    //   if (this.clientsSource) {
    //     this.clientsData = this.clientsSource.slice(
    //       event.first,
    //       event.first + event.rows
    //     );
    //     this.clientsLoading = false;
    //   }
    // }, 1000);
  }
}
