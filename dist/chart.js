window.Chart = {
  radial: function(settings) {
    new Radial(settings);
  },
  bar: function(settings, charts) {
    new Bar(settings, charts);
  },
  linear: function(settings, charts) {
    new Linear(settings, charts);
  },
  area: function(settings, charts) {
    new Area(settings, charts);
  }
}
