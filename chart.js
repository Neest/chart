class Chart {
  constructor(args) {
    if(args.persent > 100) args.persent = 100;
    if(args.persent < 0) args.persent = 0;

    this._persent = args.persent;
    this._r = args.r;
    this._width = args.width;
    this._parent = Snap.select(args.parent);
    this._strokeFilled = args.strokeFilled || '#3d3d3d';
    this._strokeEmpty = args.strokeEmpty || args.fill || '#eee';
    this._fill = args.fill || args.strokeEmpty || 'transparent';
    this._fontClass = args.fontClass;
    this._fontColor = args.fontColor || args.strokeFilled;
  }

  /*****************************
  /* Private
  /****************************/

  _polarToCartesian(cx, cy, r, angle) {
    angle = (angle - 90) * Math.PI / 180;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    };
  }
  _describeArc(x, y, r, startAngle, endAngle) {
    startAngle = startAngle % 360
    let start = this._polarToCartesian(x, y, r, startAngle);
    let end = this._polarToCartesian(x, y, r, endAngle);
    let large = Math.abs(endAngle - startAngle) >= 180;
    return `M${start.x},${start.y} A${r},${r},0,${large ? 1 : 0}1,${end.x},${end.y}`;
  }

  _updatePath(coords, radius, persents) {
    let deg = persents * 359.9999 / 100;
    this._path.attr({
      d: this._describeArc(coords.x,coords.y, radius, 0, deg)
    });
  }

  /*****************************
  /* Public
  /****************************/

  parent(selector) {
    this._parent = Snap.select(selector);
    return this;
  }

  persent(persent) {
    if(persent > 100) persent = 100;
    if(persent < 0) persent = 0;

    this._persent = persent;
    return this;
  }

  r(radius) {
    this._r = radius;
    return this;
  }

  strokeFilled(color) {
    this._strokeFilled = color;
    this._fontColor = color;
    return this;
  }

  strokeEmpty(color) {
    this._strokeEmpty = color;
    return this;
  }

  fill(color) {
    this._fill = color;
    return this;
  }

  width(width) {
    this._width = width;
    return this;
  }

  fontColor(color) {
    this._fontColor = color;
    return this;
  }

  fontFamily(font) {
    this._fontFamily = font;
    return this;
  }

  fontWeight(weight) {
    this._fontWeight = weight;
    return this;
  }

  draw(duration) {
    this._sector = Snap(this._parent);

    this._circle = this._sector
    .circle(this._r + this._width, this._r + this._width, this._r)
    .attr({
      fill: this._fill,
      stroke: this._strokeEmpty,
      strokeWidth: this._width
    });

    this._path = this._sector.path('').attr({
      fill: 'transparent',
      stroke: this._strokeFilled,
      strokeWidth: this._width
    });

    let persent = 1;

    let t = this._sector.text(0, 0, persent < 10 ? '0%' : '00%')
    .attr({
      fontSize: this._r / 2.7 + 'px',
      textAnchor: 'middle',
      fill: this._fontColor,
      fontFamily: this._fontFamily,
      fontWeight: this._fontWeight
    })
    .addClass(this._fontClass);
    let textParams = t.getBBox();

    t.attr({
      y: (this._r + this._width) + textParams.h / 2,
      x: (this._r + this._width),
      text: 75 + '%',
    });
    let coords = {
      x: this._r + this._width,
      y: this._r + this._width
    }

    let timer = setInterval(() => {
      if(persent >= this._persent) clearInterval(timer);
      this._updatePath(coords, this._r, persent);
      t.attr({text: persent + '%'})

      persent++;
    }, duration / this._persent);

    this._path.attr({strokeWidth: this._width || 10})
  }
}


/*****************************
/* Test
/****************************/

let settings = {
  r: 100,
  width: 15,
  strokeFilled: '#90be8c',
  strokeEmpty: '#fff',
}

let a = new Chart(settings)
  .parent('#first')
  .persent(70)
  .width(11)
  .r(110)
  .fill('transparent')
  .strokeEmpty('transparent')
  .fontFamily('Poiret One')
  .fontWeight('bold')
  .strokeFilled('#00c8ff')
  .draw(300);


let b = new Chart(settings)
  .parent('#second')
  .persent(60)
  .r(110)
  .strokeFilled('#53d260')
  .strokeEmpty('transparent')
  .fill('#eee')
  .fontColor('#3d3d3d')
  .fontFamily('PT Sans')
  .draw(700);

let c = new Chart(settings)
  .parent('#third')
  .persent(43)
  .strokeFilled('#ff6c6c')
  .strokeEmpty('#535353')
  .fill('transparent')
  .fontFamily('Open Sans')
  .fontWeight('bold')
  .fontColor('#fff')
  .r(110)
  .width(8)
  .draw(700);
