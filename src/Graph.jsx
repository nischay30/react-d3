import React, { Component } from 'react';
import * as d3 from 'd3';

class Graph extends Component {
	componentDidMount() {

    const { width, height } = this.props;
	  d3.selectAll("svg").remove();
    let svg=d3.select(this.refs.mountPoint).append('svg')
      .attr('width', width)
      .attr('height', height)

    svg.append("svg:defs").selectAll("marker")
      .data(["end"])      
      .enter()
      .append("svg:marker")    
      .attr("id", String)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", -1.5)
      .attr("markerWidth",  40)
      .attr("markerHeight",  30)
      .attr("orient", "auto")
      .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");

   let force = d3.layout.force()
      .size([width, height]) 
      .nodes(d3.values(this.props.nodes))
      .links(this.props.links)
      .linkDistance(300)
      .charge(function(d) {
                -Math.pow(d.radius*5.0, 2.0) / 1
              })
              .gravity(0.01)
      .start();

    let link = svg.selectAll('.link')
      .data(this.props.links)
      .enter().append('line')
      .attr('class', 'link')
      .style('stroke', '#777')
      .style('stroke-opacity', 0.6)
      .style('stroke-width',2)
      .attr("marker-end", "url(#end)");

    let gnodes = svg.selectAll('g.gnode')
      .data(force.nodes())
      .enter()
      .append('g')
      .classed('gnode', true);
        
    let node = gnodes.append("circle")
      .attr('class', 'node')
      .attr('r', width * 0.07)
      .style('stroke', '#fff')
      .style('stroke-width', 2)
      .attr('text-anchor', 'middle')
      .style('fill','#ccc');

    let labels = gnodes.append("text")
      .text(function(d) { console.log(d.name); return d.name; })
      .style("fill", "#555")
      .style("font-family", "Arial")
      .style("font-size", 12);

    force.on('tick', () => {
      gnodes.attr("transform", (d) => 'translate(' + [d.x, d.y] + ')')
          .call(force.drag);
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y)
    });
	}

	render() {
		const { width, height } = this.props;
		const styles = {
      width,
      height,
      bottom: 0,
      position: 'fix',
      border: '1px solid #323232',
  	};
	   return <div style={this.props.style} ref="mountPoint" />;
  }
}

export default Graph;
