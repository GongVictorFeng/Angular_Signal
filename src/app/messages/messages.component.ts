import {Component, Signal} from "@angular/core";
import {MessagesService} from "./messages.service";
import {NgClass} from "@angular/common";
import { Message } from "../models/message.model";

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
    imports: [
        NgClass
    ]
})
export class MessagesComponent {

    message!: Signal<Message | null>;

    constructor(private messageService: MessagesService) {
        this.message = this.messageService.message
    };

    onClose() {
        this.messageService.clear();
    }

}
