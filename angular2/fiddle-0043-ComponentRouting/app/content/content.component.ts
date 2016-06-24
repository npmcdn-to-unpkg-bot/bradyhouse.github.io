import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES }    from '@angular/router';
import 'jquery';

declare let jQuery:any;

@Component({
    selector: 'content',
    templateUrl: './app/content/content.component.html',
    styleUrls: ['./app/content/content.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class ContentComponent implements OnInit {

    private _width:number;
    private _height:number;


    onWindowResize() {
        this._width = jQuery('.content-component').width();
        this._height = jQuery('.sidebar-component').height();
    }

    get width() {
        if (!this._width) {
            this._width = jQuery('.content-component').width();
        }
        return this._width;
    }

    get height() {
        if (!this._height) {
            this._height = jQuery('.sidebar-component').height();

        }
        return this._height;
    }

}
