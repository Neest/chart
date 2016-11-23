/*********************************
* TEST DATA
*********************************/
let data = [
  {date: new Date(2016, 10, 23), task: 'Some task'},
  {date: new Date(2016, 10, 23), task: 'Some task'},
  {date: new Date(2016, 10, 23), task: 'Some task'},
  {date: new Date(2016, 10, 22), task: 'Some task'},
  {date: new Date(2016, 10, 21), task: 'Some task'},
  {date: new Date(2016, 10, 21), task: 'Some task'},
  {date: new Date(2016, 10, 19), task: 'Some task'},
  {date: new Date(2016, 10, 18), task: 'Some task'},
  {date: new Date(2016, 10, 7), task: 'Some task'},
  {date: new Date(2016, 10, 7), task: 'Some task'},
  {date: new Date(2016, 10, 7), task: 'Some task'},
  {date: new Date(2016, 10, 7), task: 'Some task'},
  {date: new Date(2016, 10, 2), task: 'Some task'},
  {date: new Date(2016, 10, 16), task: 'Some task'},
  {date: new Date(2016, 10, 16), task: 'Some task'},
  {date: new Date(2016, 10, 14), task: 'Some task'},
  {date: new Date(2016, 10, 13), task: 'Some task'},
  {date: new Date(2016, 10, 19), task: 'Some task'},
  {date: new Date(2016, 10, 18), task: 'Some task'},
  {date: new Date(2016, 10, 6), task: 'Some task'},
  {date: new Date(2016, 10, 5), task: 'Some task'},
  {date: new Date(2016, 10, 3), task: 'Some task'},
  {date: new Date(2016, 10, 2), task: 'Some task'},
  {date: new Date(2016, 10, 2), task: 'Some task'},
  {date: new Date(2016, 10, 1), task: 'Some task'},
  {date: new Date(2016, 9, 27), task: 'Some task'},
  {date: new Date(2016, 9, 27), task: 'Some task'},
  {date: new Date(2016, 9, 28), task: 'Some task'},
  {date: new Date(2016, 9, 29), task: 'Some task'},
  {date: new Date(2016, 9, 29), task: 'Some task'},
  {date: new Date(2016, 9, 29), task: 'Some task'},
  {date: new Date(2016, 9, 29), task: 'Some task'},
  {date: new Date(2016, 9, 30), task: 'Some task'},
  {date: new Date(2016, 9, 30), task: 'Some task'},
  {date: new Date(2016, 9, 30), task: 'Some task'},
  {date: new Date(2016, 9, 31), task: 'Some task'},
  {date: new Date(2016, 9, 31), task: 'Some task'},
  {date: new Date(2016, 9, 25), task: 'Some task'},
  {date: new Date(2016, 9, 25), task: 'Some task'},
  {date: new Date(2016, 9, 25), task: 'Some task'},
  {date: new Date(2016, 9, 26), task: 'Some task'},
];

/*********************************
* TEST CALL
*********************************/
chart(data, {
  selector: '#paper',
  height: 250,
  width: 350,
  period: 30
});


/*********************************
* CHART
*********************************/
function chart(data, ops) {
  if(!ops) return false;

  let paper = Snap(ops.selector).attr({
    height: ops.height,
    width: ops.width,
    viewBox: `0 -${ops.height-5} ${ops.width} ${ops.height}`,
  });

  let columns = getColumnsData(),
  colWidth = ops.width / ops.period,
  radius = offsetX = 1,
  scale = 10;

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
};

