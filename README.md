# Charts
Tunable, animated svg charts.

## Linear, Area, Bar kinds of charts

Object ```Chart``` has different methods to build different kinds of charts.
There are 3 different types of charts to build on cartesian coordinate system
```Chart.linear(settings, dataOptions)```,
```Chart.area(settings, dataOptions)```,
```Chart.bar(settings, dataOptions)```,

Settings object for each of them can be slightly different, for example, point description is needed only for linear charts

```javascript
Chart.linear({
  selector: '#pie',
  height: 160,
  width: 500,
  period: 30,
  scale: 10,
  axis: false,
  hover: function() {},
  grid: {
   rows: true,
   columns: true,
   color: '#6D6C6C',
   text: {
     color: '#fff',
     fontFamily: 'PT Sans',
     fontWeight: 'bold',
     fontSize: '.8em'
   }
  }
  , [
    {
      data: data,
      line: {
        color: '#fff',
        width: 3
      },
      point: {
        radius: 5,
        innerColor: '#fff',
        outerColor: '#3d3d3d',
        strokeWidth: 1
      },
    },
  ] 
);
```
![Linear chart](https://img-fotki.yandex.ru/get/95629/68361812.0/0_15ed8b_bd65ce03_orig)
![Bar chart](https://img-fotki.yandex.ru/get/59572/68361812.0/0_15ed8a_d9254dcb_orig)
![Area chart](https://img-fotki.yandex.ru/get/109344/68361812.0/0_15ed89_4509c866_orig)

## Pie, Radial charts
Pie chart constructor offers you two different ways to describe circle sectors:

Static description
```javascript
Chart.pie({
  selector: '#pie',
  r: 100,
  r2: 40,
  animationDuration: 500,
  hintColor: '#fff',
  hover: function() {},
  sectors: [
    {persent: 30, fill: '#EE543A' },
    {persent: 20, fill: '#7BB0A6' },
    {persent: 25, fill: '#97CE68' },
    {persent: 25, fill: '#ffffff' },
  ]
});
```

Dynamic description
```javascript
Chart.pie({
  selector: '#pie',
  r: 100,
  r2: 40,
  animationDuration: 500,
  hintColor: '#fff',
  hover: function() {},
  sectors: {
    data: todos,
    key: 'priority',
    colors: { 
      1: '#EE543A',
      2: '#7BB0A6',
      3: '#97CE68'
    },
  }
});
```
Object 'colors' contains all possible values of 'priority' field of each todo object
Inner instruments of the constructor will parse the data and generate a sectors description automatically

![Pie chart](https://img-fotki.yandex.ru/get/222565/68361812.0/0_15ed8c_f9daa6a6_orig)

Radial charts constructor

```javascript
Chart.radial({
  selector: '#pie',
  persent: 70, 
  r: 100,
  width: 15,
  duration: 700,
  strokeFilled: '#00c8ff',
  strokeEmpty: 'transparent',
  fontFamily: 'Ubuntu Light',
  fontWeight: '0'
});

```

![Radial charts](https://img-fotki.yandex.ru/get/30536/68361812.0/0_15ed8d_34a725bf_orig)

# Requirements
Snap.svg