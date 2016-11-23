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
Chart.areaChart(data, {
  selector: '#paper',
  height: 250,
  width: 350,
  period: 30 
});

