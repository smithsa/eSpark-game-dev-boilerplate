import {Scene} from 'phaser';

export default class PreloaderScene extends Scene {
  constructor () {
    super({
      key: 'Preload'
    });
  }

  preload () {
    var loa = this.add.graphics(0, 0);
    loa.fillStyle(0xffffff, 1);
    loa.fillRect(512-105, 350, 210, 26);
    loa.fillStyle(0x111111, 1);
    loa.fillRect(512-103, 352, 206, 22);
    loa.fillStyle(0x1e90ff, 1);
    this.load.on('progress', function (value) {
      loa.fillRect(512-100, 354, 200*value, 18);
    });

    this.load.path = './img/';
    this.load.image('background', 'bg.png');
    this.load.multiatlas('mainatlas', 'mainatlas.json');

    // Sounds
    this.load.path = './sounds/';
    this.load.audioSprite('sfx', './sounds_audio_sprite.json', ['./sounds_audio_sprite.ogg', './sounds_audio_sprite.m4a']);
    this.load.audio('incorrect',['incorrect.webm']);
    this.load.audio('correct',['correct.webm']);
    this.load.audio('back',['back.webm']);
    this.load.audio('click',['click.webm']);
    this.load.audio('ding',['ding.webm']);
    this.load.audio('slide',['slide.webm']);
    this.load.audio('win_ding',['win_ding.webm']);

    // Music
    this.load.path = './music/';
    this.load.audio('gamemusic',['gamemusic.webm','gamemusic.m4a']);

    // Voice Over
    this.load.path = './voice/';
    this.load.audio('Click_a_kid',['Click a kid to ride the rainbow.m4a']);
    this.load.audio('Completed',['Completed Game.m4a']);
    this.load.audio('FirstQ',['First Question.m4a']);
    this.load.audio('GameDir',['Game Directions.m4a']);
    this.load.audio('RightAnsw1',['Right Answer Behavior 1.m4a']);
    this.load.audio('RightAnsw2',['Right Answer Behavior 2.m4a']);
    this.load.audio('RightAnsw3',['Right Answer Behavior 3.m4a']);
    this.load.audio('RightAnsw4',['Right Answer Behavior 4.m4a']);
    this.load.audio('Intro',['Story Intro.m4a']);
    this.load.audio('Title',['Title.m4a']);
    this.load.audio('WrongAnsw1',['Wrong Answer Behavior 1.m4a']);
    this.load.audio('WrongAnsw2',['Wrong Answer Behavior 2.m4a']);
    this.load.audio('WrongAnsw3',['Wrong Answer Behavior 3.m4a']);

    this.load.path = '';
  }

  create () {
    console.log('%cSCENE::PRELOAD', 'color: #fff; background: #0f0;');
    this.scene.start('Game');
  }
}
