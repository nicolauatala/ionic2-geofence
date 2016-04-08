import { Component, Input, Output, EventEmitter } from "angular2/core";
import { Geofence } from "../../models/geofence";
import { IONIC_DIRECTIVES } from "ionic-angular";
import { GeofenceService } from "../../services/geofence-service";

/*
 Generated class for the GeofenceListItem component.

 See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
 for more info on Angular 2 Components.
 */
@Component({
  selector: "geofence-list-item",
  templateUrl: "build/components/geofence-list-item/geofence-list-item.html",
  directives: [IONIC_DIRECTIVES],
})
export class GeofenceListItem {
  @Input() geofence: Geofence;
  @Output() onItemTapped = new EventEmitter();

  constructor(private geofenceService: GeofenceService) {

  }

  get header() {
    return this.geofence.notification.text;
  }

  get details() {
    return `When ${this.transitionTypeText} within ${this.geofence.radius}m`;
  }

  get transitionTypeText() {
    switch(this.geofence.transitionType) {
      case 1: return "entering region";
      case 2: return "exiting region";
      case 3: return "entering or exiting region";
    }
  }

  itemTapped() {
    this.onItemTapped.emit();
  }

  remove() {
    this.geofenceService.remove(this.geofence);
  }
}
