# chart
Build simple and tunable circle svg diagrams

![image](https://pp.vk.me/c636629/v636629817/31a52/_Ba-ICVKnW4.jpg)

You can change radius, width of stroke, all of colors, font, persentage and animation duration of each diagram you created.
You can also put any diagram at any place of your page using css selectors.

All you need is to add javascript file to you html page

![image](https://pp.vk.me/c636629/v636629817/31a60/zyd6A7J5ClM.jpg)

```javascript
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
```

## Requirements
Snap.svg
