import {Scene} from 'phaser';

export default class PreloaderScene extends Scene {
  constructor () {
    super({
      key: 'Preload'
    });
  }

  // TODO change load paths to dist folder
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

    this.load.path = 'src/img/';
    this.load.image('background', 'bg.png');
    this.load.multiatlas('mainatlas', 'mainatlas.json');

    // Sounds
    this.load.path = 'src/sounds/';
    this.load.audio('incorrect',['incorrect.webm','incorrect.m4a']);
    this.load.audio('correct',['correct.webm','correct.m4a']);
    this.load.audio('back',['back.webm','back.m4a']);
    this.load.audio('click',['click.webm','click.m4a']);
    this.load.audio('ding',['ding.webm','ding.m4a']);
    this.load.audio('slide',['slide.webm','slide.m4a']);
    this.load.audio('win_ding',['win_ding.webm','win_ding.m4a']);
    this.load.audio('gamemusic',['gamemusic.webm','gamemusic.m4a']);

    // Voice Over
    this.load.path = 'src/voice/';
    this.load.audio('Click_a_kid',['Click a kid to ride the rainbow.webm','Click a kid to ride the rainbow.m4a']);
    this.load.audio('Completed',['Completed Game.webm','Completed Game.m4a']);
    this.load.audio('FirstQ',['First Question.webm','First Question.m4a']);
    this.load.audio('GameDir',['Game Directions.webm','Game Directions.m4a']);
    this.load.audio('RightAnsw1',['Right Answer Behavior 1.webm','Right Answer Behavior 1.m4a']);
    this.load.audio('RightAnsw2',['Right Answer Behavior 2.webm','Right Answer Behavior 2.m4a']);
    this.load.audio('RightAnsw3',['Right Answer Behavior 3.webm','Right Answer Behavior 3.m4a']);
    this.load.audio('RightAnsw4',['Right Answer Behavior 4.webm','Right Answer Behavior 4.m4a']);
    this.load.audio('Intro',['Story Intro.webm','Story Intro.m4a']);
    this.load.audio('Title',['Title.webm','Title.m4a']);
    this.load.audio('WrongAnsw1',['Wrong Answer Behavior 1.webm','Wrong Answer Behavior 1.m4a']);
    this.load.audio('WrongAnsw2',['Wrong Answer Behavior 2.webm','Wrong Answer Behavior 2.m4a']);
    this.load.audio('WrongAnsw3',['Wrong Answer Behavior 3.webm','Wrong Answer Behavior 3.m4a']);

    this.load.path = '';
  }

  create () {
    console.log('%cSCENE::PRELOAD', 'color: #fff; background: #0f0;');
    this.scene.start('Game');
  }
}
