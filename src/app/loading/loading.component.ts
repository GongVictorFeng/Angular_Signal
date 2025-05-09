import {Component, inject, Signal} from "@angular/core";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {LoadingService} from "./loading.service";

@Component({
    selector: "loading",
    templateUrl: "./loading.component.html",
    styleUrls: ["./loading.component.scss"],
    imports: [MatProgressSpinner]
})
export class LoadingIndicatorComponent {

    loading!: Signal<boolean>

    constructor(private loadingService: LoadingService) {
        this.loading = this.loadingService.loading;
    }

}
