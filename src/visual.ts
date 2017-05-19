/*
 *  Power BI Visual CLI
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.extensibility.visual {

    export interface TableDataPoint {
        category: {};
        time: {};
        value: {};
    }

    export interface TableData {
        dataPoints: TableDataPoint[];
    }

    export class Visual implements IVisual {
        private target: HTMLElement;
        private updateCount: number;
        public svg: d3.Selection<SVGElement>;
        private viewport: IViewport;
        public dataView: DataView;
        private data: TableData;
        //private data: ViewModel;
        table: HTMLTableElement;
        private thead: HTMLTableSectionElement;
        private tbody: HTMLTableSectionElement;

        constructor(options: VisualConstructorOptions) {
            /*console.log('Visual constructor', options);
            this.target = options.element;
            this.updateCount = 0;*/
            debugger;
            this.svg = d3.select(options.element)
                .append("svg:svg");
            this.table = document.createElement('table');
            this.thead = <HTMLTableSectionElement>this.table.createTHead();
            this.tbody = <HTMLTableSectionElement>this.table.createTBody();
            var hrow = <HTMLTableRowElement>this.table.tHead.insertRow(0);
            var cell = hrow.insertCell(0);
            cell.innerHTML = "Module ID";
        }

        public static convertor(dataView: DataView, host: IVisualHost): TableData {
            var data: TableData;
            data.dataPoints = [];

            if (dataView && dataView.categorical && dataView.categorical.categories && dataView.categorical.values) {
                var category: any = dataView.categorical.categories[0].values;
                var time: any = dataView.categorical.categories[1].values;
                var values: any = dataView.categorical.values[0].values;
            }
            for (var i = 0; i < values.length; i++) {
                data.dataPoints.push({
                    category: category[i],
                    time: time[i],
                    value: values[i]
                });
            }

            return data;
        }
        public update(options: VisualUpdateOptions) {
            //console.log('Visual update', options);
            //this.target.innerHTML = `<p>Update count: <em>${(this.updateCount++)}</em></p>`;
            //debugger;
            if (!options.dataViews)
                return;
            if (0 === options.dataViews.length)
                return;

            var dataView = options.dataViews[0];
            this.dataView = options.dataViews[0];
            var categories = dataView.categorical.categories[0];
            var value = dataView.categorical.values;

            var data=[];
            // = [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9];
            var x =0; var y =0;
            for (var i = 0; i < value.length; i++) {
                y = value[i].values.indexOf(null,y);
                data = value[i].values.slice(x,y);
                createSparkLine(this.svg, data);
                x = value[i].values.indexOf(null,x);
            }


        }
    }
}