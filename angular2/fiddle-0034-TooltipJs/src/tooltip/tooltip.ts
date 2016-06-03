
@Component({
    selector: 'tooltip',
    template: `
        <div *ngIf="isVisible"
             role="tooltip"
             [ngStyle]="{'top': top + 'px', 'left': left + 'px', 'display': 'block', 'position': 'absolute'}">
            <div class="tooltip-inner" [ngStyle]="{'height': height +'px', 'width': width + 'px'}">
                <div class="row" *ngFor="#line of lines">
                    <span role="field">{{line.field}}</span><span role="value">{{line.value}}</span>
                </div>
            </div>
        </div>
    `
})
class Tooltip {

    @Input() options:TooltipInterface;

    constructor() {
    }

    get isVisible():boolean {
        let visibleWidth = this.browserWidth,
            visibleHeight = this.browserHeight,
            width = this.width,
            height = this.height;

        return this.options &&
        this.options.visible &&
        width < visibleWidth &&
        height < visibleHeight ? this.options.visible : false;
    }

    get lines():Array<TooltipInterface> {
        return this.options && this.options.lines ? this.options.lines : [];
    }

    get browserWidth():number {
        return window.document.documentElement.clientWidth;
    }

    get browserHeight():number {
        return window.document.documentElement.clientHeight;
    }

    get left():number {
        let left = this.options && this.options.left ? this.options.left : 0,
            width = this.width,
            visibleWidth = this.browserWidth;
        return left + width < visibleWidth ? left :
            left - width < visibleWidth && left - width > 0 ? left - width : 0;
    }

    get top():number {
        let top = this.options && this.options.top ? this.options.top : 0,
            height = this.height,
            visibleHeight = this.browserHeight;
        return (top + height) < visibleHeight ? top :
            top - height < visibleHeight && top - height > 0 ? top - height : 0;
    }

    get height():number {
        return this.options && this.options.lines && this.options.lines.length ?
        this.options.lines.length * 21 : 100;
    }

    get width():number {
        return this.options && this.options.width ? this.options.width : 150;
    }

}