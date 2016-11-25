window.Chart = {

  radialChart: function(args) {
    if(args.persent > 100) args.persent = 100;
    if(args.persent < 0) args.persent = 0;

    /********************************************
    * INIT
    ********************************************/
    let persent = args.persent,
      r = args.r,
      width = args.width,
      parent = Snap.select(args.parent),
      strokeFilled = args.strokeFilled || '#3d3d3d',
      strokeEmpty = args.strokeEmpty || args.fill || '#eee',
      fill = args.fill || args.strokeEmpty || 'transparent',
      fontClass = args.fontClass,
      fontColor = args.fontColor || args.strokeFilled,
      fontFamily = args.fontFamily,
      fontWeight = args.fontWeight,
      duration = args.duration;

      let path;

    /********************************************
    * PRIVATE
    ********************************************/

    function polarToCartesian(cx, cy, r, angle) {
      angle = (angle - 90) * Math.PI / 180;
      return {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle)
      };
    }

    function describeArc(x, y, r, startAngle, endAngle) {
      startAngle = startAngle % 360;
      let start = polarToCartesian(x, y, r, startAngle),
          end = polarToCartesian(x, y, r, endAngle),
          large = Math.abs(endAngle - startAngle) >= 180;
      return `M${start.x},${start.y} A${r},${r},0,${large ? 1 : 0}1,${end.x},${end.y}`;
    }

    function updatePath(coords, radius, persents) {
      let deg = persents * 359.9999 / 100;
      path.attr({
        d: describeArc(coords.x, coords.y, radius, 0, deg)
      });
    }

    function draw(duration) {
      const sector = Snap(parent).attr({
        height: r * 2 + width * 2,
        width: r * 2 + width * 2
      });

      let circle = sector
      .circle(r + width, r + width, r)
      .attr({
        fill: fill,
        stroke: strokeEmpty,
        strokeWidth: width
      });

      path = sector.path('').attr({
        fill: 'transparent',
        stroke: strokeFilled,
        strokeWidth: width
      });

      let currentPersent = 1;

      let t = sector.text(0, 0, currentPersent < 10 ? '0%' : '00%')
      .attr({
        fontSize: r / 2.7 + 'px',
        textAnchor: 'middle',
        fill: fontColor,
        fontFamily: fontFamily,
        fontWeight: fontWeight
      })
      .addClass(fontClass);

      t.attr({
        y: (r + width) + t.getBBox().h / 2,
        x: (r + width),
        text: 75 + '%',
      });

      let coords = {
        x: r + width,
        y: r + width
      }

      let timer = setInterval(() => {
        if(currentPersent >= persent) clearInterval(timer);
        updatePath(coords, r, currentPersent);
        t.attr({text: currentPersent + '%'})

        currentPersent++;
      }, duration / persent);

      path.attr({strokeWidth: width || 10})
    }

    draw(duration);

  },

  plainChart: function(data, ops) {
    if(!ops) return false;

    let columns = getColumnsData(),
    colWidth = ops.width / ops.period,
    offsetX = colWidth,
    offsetY = 5,
    type = ops.type || 'linear',
    scale = ops.scale || 10,

    lineColor = ops.line.color,
    fillColor = ops.line.fill,
    fillOpacity = ops.line.opacity,
    hoverColor = ops.line.hoverColor,
    radius = ops.point.radius,
    pointInnerColor = ops.point.innerColor,
    pointOuterColor = ops.point.outerColor;
    gridColor = ops.grid.color || '#ccc',
    gridRows = ops.grid.rows,
    gridCols = ops.grid.columns

    ops.width += offsetX * 2;
    ops.height += offsetY * 2;

    let paper = Snap(ops.selector).attr({
      height: ops.height,
      width: ops.width,
      viewBox: `0 -${ops.height-5} ${ops.width} ${ops.height}`,
    });

    if(gridCols || gridRows) buildGrid();

    let chartPath = paper.path().attr({
      stroke: lineColor,
      fill: '#fff',
      strokeWidth: '2px',
      strokeDasharray: 2000,
      strokeDashoffset: 2000,
      strokeLinejoin: 'round',
    });

    switch(type) {
      case 'area': buildAreaPath(); break;
      case 'linear': buildLinearPath(); break;
      case 'bar': buildBarChart(); break;
      default: buildBarChart();
    }

    if(ops.axis) buildAxis();

    function buildAxis() {
      let axisPath = paper.path(`M0,${-ops.height} L0,0 L${ops.width},0`)
      .attr({
        fill: 'transparent',
        stroke: '#aaa',
        strokeWidth: '2px'
      });
    }

    function buildGrid() {
      let rowsPathString = colsPathString = '',
          rows = [], _offsetX = offsetX;

      const gridStyle = {
        fill: 'transparent',
        stroke: '#ccc',
        strokeWidth: '.5px'
      };

      if(gridRows) {
        for(let i = 0; i < ops.height / scale; i++)
          if(i % 2 == 0) rows.push(i);
        for(let point of rows) {
          let y = point * scale + offsetY;
          rowsPathString += ` M0,-${y} L${ops.width},-${y}`;
        }
        let rowsPath = paper.path(rowsPathString).attr(gridStyle);
      }

      if(gridCols) {
        for(let i = 0; i < ops.width / colWidth; i++) {
          if(i % 2 == 0) {
            colsPathString += `M${_offsetX},0 L${_offsetX},-${ops.height}`;
          }
          _offsetX += colWidth;
        }
        let colsPath = paper.path(colsPathString).attr(gridStyle)
      }
    }

    function buildAreaPath() {
      for(let col of columns) {

        let pathString = chartPath.attr('d'),
            coords = `${offsetX},${-col.count * scale - offsetY}`,
            startPos = `M${ops.width-offsetX},-${offsetY} L${offsetY},-${offsetY}`;

        chartPath.attr({
          d: pathString ? pathString + `L ${coords}` : startPos + `L ${coords}`,
        });
        offsetX += colWidth;
      }

      chartPath.attr({ d: chartPath.attr('d') + 'Z' })
      chartPath.animate({
        strokeDashoffset: 0,
      }, 1000, function() {
        chartPath.animate({fill: fillColor, fillOpacity: fillOpacity}, 1000);
      });
    }

    function buildLinearPath() {
      chartPath.attr({fill: 'transparent'})

      let timeout = 0;

      for(let col of columns) {
        let point = paper.circle(offsetX, -col.count * scale - offsetY, 0).attr({
          stroke: pointOuterColor,
          fill: pointInnerColor,
          id: 'point',
        });

        setTimeout(function() {
          point.animate({r: radius}, 200, mina.easein);
        }, timeout);
        timeout += 30;

        let timer;
        point.hover(function() {
          this.stop().animate({r: radius * 2}, 1000, mina.elastic);
        }, function() {
          clearTimeout(timer);
          this.stop().animate({r: radius}, 1000, mina.elastic);
        });

        let pathString = chartPath.attr('d'),
            coords = `${offsetX}, ${-col.count * scale - offsetY}`;

        chartPath.attr({
          d: pathString ? pathString + `L ${coords}` : `M ${coords}`,
        });
        offsetX += colWidth;
      }

      chartPath.animate({
        strokeDashoffset: 0
      }, 2500); 
    }

    function buildBarChart() {
      let timeout = 0;

      for(let col of columns) {
        if(col.count) {
          let bar = paper.rect(offsetX, 0 , colWidth, colWidth * scale * 2)
          .attr({
            fill: fillColor,
            stroke: lineColor
           });

          setTimeout(() => {
            bar.animate({
              y: -col.count * scale - offsetY,
            }, 1500, mina.elastic);
          }, timeout);

          bar.hover(function() {
            this.stop().animate({
              fill: hoverColor,
            }, 200, mina.easeinout);
          }, function() {
            this.stop().animate({
              fill: fillColor
            }, 200, mina.easeinout);
          });

        }
        timeout += 20;
        offsetX += colWidth;
      }
    }

    function getColumnsData() {
      const period = ops.period || 30,
        daysInMonth = function(year, month) {
          return 32 - new Date(year, month, 32).getDate();
        };

      let curDate = new Date(),
        columns = [],
        curDay = curDate.getDate(),
        curMonth = curDate.getMonth(),
        curYear = curDate.getFullYear();

      /*************************************************
      * CREATE LIST OF CHART COLUMNS
      *************************************************/
      for(let i = 0; i < period; i++) {
        if(curDay == 0){
          curDay = daysInMonth(curYear, --curMonth);
        }

        columns.push({
          date: new Date(curYear, curMonth, curDay--).getTime(),
          count: 0,
          tasks: [],
        });
      }

      /*************************************************
      * CREATE CHART POINTS
      *************************************************/
      for(let task of data) {
        let taskTime = task.date.setHours(0,0,0,0);

        for(let col of columns)
          if(col.date == taskTime) {
            col.count++;
            col.tasks.push(task);
          }
      }

      return columns.reverse();
    }
  },

}

