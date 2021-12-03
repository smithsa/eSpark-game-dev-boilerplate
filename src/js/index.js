import {AUTO, Scale, Game} from 'phaser';
import PreloaderScene from './preload';
import GameScene from './gamejs';

var gameConfig = {
  type: AUTO,
  width: 1024,
  height: 610,
  backgroundColor: '#000',
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH
  },
  scene: null
};

var game = new Game(gameConfig);

game.scene.add('Preload', PreloaderScene);
game.scene.add('Game', GameScene);

game.scene.start('Preload');
