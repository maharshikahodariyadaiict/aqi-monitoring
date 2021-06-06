import React, { useEffect, useRef } from 'react';
//import * as d3 from 'd3';
import './Chart.css';
import { AQIData } from '../../Shared/Types/Types';

interface Props {
    data: AQIData[];
    isSparkLine?: boolean;
    id: string;
}

declare global {
    interface Window {
        d3: any;
    }
}

const Chart: React.FC<Props> = props => {
    const lineChartRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        drawChart();
    }, [JSON.stringify(props.data)]);

    function drawChart() {
        var dataset = props.data;
        const { d3 } = window;
        var margin = { top: 10, right: 30, bottom: 30, left: 50 },
            width = (wrapperRef.current?.clientWidth || 500) - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        var svg = d3.select(`#line-chart-${props.id}`).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleTime()
            .domain(d3.extent(dataset, function (d: any) { return new Date(d.timeStamp); }))
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + (height + 5) + ")")
            .call(d3.axisBottom(x).ticks(5).tickSizeOuter(0));

        var y = d3.scaleLinear() 
            .domain(d3.extent(dataset, function (d: any) { return d.aqi; }))
            .range([height, 0]);
        svg.append("g")
            .attr("transform", "translate(-5,0)")
            .call(d3.axisLeft(y).tickSizeOuter(0));


        // Add the area
        svg.append("path")
            .datum(dataset)
            .attr("fill", "#69b3a2")
            .attr("fill-opacity", .3)
            .attr("stroke", "none")
            .attr("d", d3.area()
                .x(function (d: any) { return x(new Date(d.timeStamp)) })
                .y0(height)
                .y1(function (d: any) { return y(d.aqi) })
            )

        // Add the line
        svg.append("path")
            .datum(dataset)
            .attr("fill", "none")
            .attr("stroke", "#69b3a2")
            .attr("stroke-width", 4)
            .attr("d", d3.line()
                .x(function (d: any) { return x(new Date(d.timeStamp)) })
                .y(function (d: any) { return y(d.aqi) })
            )

        // Add the line
        svg.selectAll("myCircles")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("fill", "red")
            .attr("stroke", "none")
            .attr("cx", function (d: any) { return x(new Date(d.timeStamp)) })
            .attr("cy", function (d: any) { return y(d.aqi) })
            .attr("r", 3)

        if (lineChartRef.current?.lastChild && wrapperRef.current) {
            wrapperRef.current.innerHTML = '';
            wrapperRef.current.append(lineChartRef.current?.lastChild);
        }
    }

    return (
        <>
            <div className="line-chart" ref={wrapperRef}></div>
            <div id={`line-chart-${props.id}`} ref={lineChartRef} style={{ display: 'none' }}></div>
        </>
    );
}

export default Chart;