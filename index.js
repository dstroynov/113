var jsgam=window.jsgam.default;

//Basic game configuration
var config={
  width:1280, //Must be the same the image backgrounds
  height:960, //Must be the same the image backgrounds
  container:'JSGAM',
  //autoResize:false,
  //fitToContainer: true,
  files:[
    'data/imgs/spritesheet.json',
    'data/fonts/comic-sans-ms.fnt',
    'data/backgrounds/backgrounds.json',
    'data/game.min.json',
  ]
};

new jsgam(config); //This command makes all the magic
