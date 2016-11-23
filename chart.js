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
      const sector = Snap(parent);

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

  }

}

Chart.radialChart({
  parent: '#first',
  persent: 70, 
  r: 100,
  width: 15,
  duration: 700,
  strokeFilled: '#00c8ff',
  strokeEmpty: 'transparent',
  fontFamily: 'Poiret One',
  fontWeight: 'bold'
});