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

  areaChart: function(data, ops) {
    if(!ops) return false;

    let paper = Snap(ops.selector).attr({
      height: ops.height,
      width: ops.width,
      viewBox: `0 -${ops.height-5} ${ops.width} ${ops.height}`,
    });

    let columns = getColumnsData(),
    colWidth = ops.width / ops.period,
    radius = offsetX = 1,
    scale = 25;

    let path = paper.path().attr({
      stroke: '#1D7988',
      fill: '#33A6B8',
      strokeWidth: '1px',
    });

    for(let col of columns) {
      // if(col.count)
      //   paper.circle(offsetX, -col.count * scale, radius).attr({
      //     fill: '#fff',
      //   }); 

      let pathString = path.attr('d');
      let coords = `${offsetX},${-col.count * scale}`;
      let startPos = `M ${ops.width-offsetX},0 L 0,0`;

      path.attr({
        // d: pathString ? pathString + `L ${coords}` : `M ${coords}`,
        d: pathString ? pathString + `L ${coords}` : startPos + `L ${coords}`,
      });
      offsetX += colWidth;
    }

    path.attr({ d: path.attr('d') + 'Z' })

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

