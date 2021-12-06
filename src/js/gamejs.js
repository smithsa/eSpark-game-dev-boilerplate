import {Scene, Math as PMath, Geom, Curves} from 'phaser';

var bg2,bg3;
var rainbow,rainb_start,gamename,playbtn,questbtn,clock,clock_hint,minute_hand,hour_hand,clock_point,replaybtn,particles,emitter,emitterWin;
var follower,path,path2,graphics;
var sfx;

var menuarr = [];
var levs = [];
var answers = [];
var tasks = [];
var feedbacks = [];
var kids = [];
var kid_move = null;

var rainbowColor = 1;
var TaskHour = 1;
var TaskMinute = 1;
var TaskHourS = '';
var TaskMinuteS = '';
var WaitKidClick = false;
var WaitMove = false;
var music;

var clickkidV,completedV,firstquestV,gamedirV,RightAnsw1V,RightAnsw2V,RightAnsw3V,RightAnsw4V,IntroV,TitleV,WrongAnsw1V,WrongAnsw2V,WrongAnsw3V;


export default class GameScene extends Scene {
  constructor () {
    super({
      key: 'Game'
    });
  }
  create() {
    console.log('%cSTATE::GAME', 'color: #fff; background: #f0f;');

    this.add.sprite(511, 305,'background').setOrigin(0.5).setScale(1.05,1);
    bg2 = this.add.sprite(512, 480+400, 'mainatlas','gui/bg2').setDepth(0.1);

    //	set-up audio sprite
    sfx = this.sound.addAudioSprite('sfx');

    music = this.sound.add('gamemusic',{loop:true,volume:0.5});

    clickkidV = this.sound.add('Click_a_kid',{volume:1});
    completedV = this.sound.add('Completed',{volume:1});
    firstquestV = this.sound.add('FirstQ',{volume:1});
    gamedirV = this.sound.add('GameDir',{volume:1});
    RightAnsw1V = this.sound.add('RightAnsw1',{volume:1});
    RightAnsw2V = this.sound.add('RightAnsw2',{volume:1});
    RightAnsw3V = this.sound.add('RightAnsw3',{volume:1});
    RightAnsw4V = this.sound.add('RightAnsw4',{volume:1});
    IntroV = this.sound.add('Intro',{volume:1});
    TitleV = this.sound.add('Title',{volume:1});
    WrongAnsw1V = this.sound.add('WrongAnsw1',{volume:1});
    WrongAnsw2V = this.sound.add('WrongAnsw2',{volume:1});
    WrongAnsw3V = this.sound.add('WrongAnsw3',{volume:1});

    this.menuadd();

    music.play();

  }
  menuadd () {
    bg2.setPosition(512, 650+400).setScale(1);
    rainb_start = this.add.sprite(1312, 600, 'mainatlas','gui/rainbow_start').setOrigin(1,0.8).setDepth(0.05).setAngle(90);

    this.tweens.add({targets: bg2,y: 650,duration: 350,ease: 'Back',easeParams: [ 1 ],delay: 0 });
    gamename = this.add.sprite(512, 100-200, 'mainatlas','gui/gamename').setDepth(0.1);
    this.tweens.add({targets: gamename,y: 100,duration: 300,ease: 'Back',easeParams: [ 1 ],delay: 0 });
    var shape = new Geom.Circle(178, 176, 150);
    playbtn = this.add.sprite(512, 420+400, 'mainatlas','gui/playbtn').setDepth(0.1).setInteractive(shape, Geom.Circle.Contains);
    playbtn.setScale(0.85);
    playbtn.work = true;
    this.tweens.add({targets: playbtn,y: 410,duration: 300,ease: 'Back',easeParams: [ 1 ],delay: 0 });

    menuarr.push(gamename,playbtn,rainb_start);

    playbtn.on('pointerdown', this.startIntro,this);
    playbtn.on('pointerout', function () { this.setScale(0.85); this.setTint(0xFFFFFF);},playbtn);
    playbtn.on('pointerover', function () { this.setScale(0.92); this.setTint(0xbababa);},playbtn);

  }
  startIntro() {
    if(playbtn.work == true) {
      playbtn.work = false;
      sfx.play('click');
      TitleV.on('complete', this.TitleEnd,this);
      TitleV.play();
      sfx.play('slide');
      this.tweens.add({targets: playbtn,scaleX: 0.01,scaleY:0.01,duration: 100,ease: 'Linear',delay: 0, onComplete() { this.targets[0].destroy();} });
      rainb_start.setScale(0.5,1);
      this.tweens.add({targets: rainb_start,angle: 0,scaleX:1,duration: 300,ease: 'Sine.EasyOut',easeParams: [ 1 ],delay: 0 });
    }
  }
  TitleEnd() {
    TitleV.off('complete');
    IntroV.on('complete', this.IntroEnd,this);
    IntroV.play();
  }
  IntroEnd() {
    IntroV.off('complete');
    this.tweens.add({targets: gamename,y: -120,duration: 100,ease: 'Linear',delay: 0, onComplete() { this.targets[0].destroy(); this.parent.scene.toGame();} });
    this.tweens.add({targets: rainb_start,alpha: 0,duration: 100,ease: 'Linear',delay: 0, onComplete() { this.targets[0].destroy();} });

  }
  drw() {
    if(WaitMove) {
      graphics.clear();

      path.getPoint(follower.t, follower.vec);
      for (let i = 0; i < kids.length; i++) {
        if(kids[i].move == true) kids[i].setPosition(follower.vec.x,follower.vec.y);
      }
    }
  }
  drw2() {
    if(!WaitMove) {
      graphics.clear();
      for (let i = 0; i < kids.length; i++) {
        if(kids[i].move == true) {
          path2.getPoint(kids[i].flwr.t, kids[i].flwr.vec);kids[i].setPosition(kids[i].flwr.vec.x,kids[i].flwr.vec.y);
        }

      }
    }
  }
  toGame() {
    rainbowColor = 1;
    levs = [];
    answers = [];

    graphics = this.add.graphics().setDepth(1);

    follower = { t: 0.6, vec: new PMath.Vector2() };

    path = new Curves.Path();
    path.add(new Curves.Ellipse(515, 390, 280,300));
    path2 = new Curves.Path();
    path2.add(new Curves.Ellipse(515-440, 450, 450,300));

    if(particles == null) {
      particles = this.add.particles('mainatlas').setDepth(0.7);
      emitter = particles.createEmitter({
        x: 512,
        y: 190,
        frame: 'gui/sparkles',
        angle: { min: 210, max: 330 },
        lifespan: { min: 1000, max: 2000 },
        speed: 200,
        quantity: 1,
        frequency: 5,
        gravityY: 300,
        scale: { start: 1, end: 0 },
        alpha: {start:1, end:0}
      });
      emitter.stop();
      emitterWin = particles.createEmitter({
        x: 512,
        y: -70,
        frame: 'gui/sparkles',
        angle: { min: 0, max: 180 },
        lifespan: { min: 1500, max: 3000 },
        speed: 300,
        quantity: 1,
        frequency: 5,
        gravityY: 70,
        scale: { start: 1, end: 0 },
        alpha: {start:1, end:0}
      });
      emitterWin.stop();
    }

    this.drw();

    for (let i = 0; i < 7; i++) {
      var kd = this.add.sprite(50+45*i, 435-10*i, 'mainatlas').setDepth(0.3-0.01*i).setScale(0.9).setInteractive();
      this.anims.create({key: 'wait'+(i+1),frames: this.anims.generateFrameNames('mainatlas', {prefix: 'kids/kid'+(i+1),start: 1,end: 1,zeroPad: 4})});
      this.anims.create({key: 'slide'+(i+1),frames: this.anims.generateFrameNames('mainatlas', {prefix: 'kids/kid'+(i+1),start: 3,end: 3,zeroPad: 4})});
      this.anims.create({key: 'happy'+(i+1),frames: this.anims.generateFrameNames('mainatlas', {prefix: 'kids/kid'+(i+1),start: 2,end: 2,zeroPad: 4})});
      kd.input.hitArea.setTo(8, 0, 90, 180);
      kd.play('wait'+(i+1));
      if((i+1)%2 == 0) {kd.y += 60;kd.setDepth(0.31);}
      kd.id = i+1;
      kd.twn = null;
      kd.work = false;
      kd.move = false;
      kd.flwr = { t: 0.7, vec: new PMath.Vector2(), kspr:kd};
      kd.sc_save = 0.85;

      kids.push(kd);

      kd.on('pointerdown', this.clickKid,kd);
      kd.on('pointerout', function () { if(this.work == true) {this.setScale(this.sc_save);this.twn.resume();}},kd);
      kd.on('pointerover', function () { if(this.work == true) {this.twn.pause(); this.sc_save = this.scaleX;this.setScale(1.05);}},kd);

    }

    rainbow = this.add.sprite(512, 420, 'mainatlas').setDepth(0.001);
    for (let i = 0; i < 8; i++) {
      this.anims.create({key: 'rainbow'+(i),frames: this.anims.generateFrameNames('mainatlas', {prefix: 'rainbow/rainbow',start: (i+1),end: (i+1),zeroPad: 4})});
    }
    rainbow.play('rainbow0');

    tasks = [1,2,3,4,5,6,7,8,9,10,11,12];

    bg3 = this.add.image(635, 542, 'mainatlas','gui/bg2').setDepth(0.01).setScale(-1.35,1);
    bg2.setPosition(357,614);
    bg2.setScale(1.34,1.17);

    questbtn = this.add.image(71, 55, 'mainatlas','gui/questbtn').setDepth(0.1).setScale(0.85).setInteractive();
    questbtn.on('pointerdown', this.questClick,this);
    questbtn.on('pointerout', function () { this.setScale(0.85);},questbtn);
    questbtn.on('pointerover', function () { this.setScale(0.95);},questbtn);

    clock = this.add.image(512, 330, 'mainatlas','gui/clock').setDepth(0.2);
    clock_hint = this.add.image(512, 330, 'mainatlas','gui/clock0002').setDepth(0.2);
    minute_hand = this.add.image(514, 330, 'mainatlas','gui/arrow_minute').setDepth(0.2).setScale(0.6);
    hour_hand = this.add.image(514, 330, 'mainatlas','gui/arrow_hour').setDepth(0.2).setScale(0.6);
    clock_point = this.add.image(514, 330, 'mainatlas','gui/clock2').setDepth(0.2);

    for (let i = 0; i < 4; i++) {
      var answ = this.add.image(202+210*i, 540, 'mainatlas','gui/answbtn').setDepth(0.5).setInteractive();
      answ.work = true;
      answ.on('pointerdown', this.clickAnsw,answ);
      answ.on('pointerout', function () { if(this.work == true) this.cont.setVisible(false);},answ);
      answ.on('pointerover', function () { if(this.work == true) this.cont.setVisible(true);},answ);

      answ.txt = this.add.text(answ.x-2, answ.y-8, '2:3'+i, {font: '62px Digital-7', fill: '#52DE96', align: 'center'}).setOrigin(0.5).setDepth(0.51);

      answ.cont = this.add.image(202+210*i-1, 540-1, 'mainatlas','gui/answbtn_cont').setDepth(0.5).setVisible(false);
      answers.push(answ);
      levs.push(answ,answ.txt,answ.cont);
    }
    levs.push(rainbow, questbtn, clock, clock_hint, minute_hand, hour_hand, clock_point);

    this.stopVoice();
    firstquestV.play();

    this.newLevel();

  }
  newLevel() {
    var rd = this.getRandomInt(0,tasks.length-1);
    TaskHour = tasks[rd];
    tasks.splice(rd,1);
    TaskMinute = this.getRandomInt(1,11);
    while (TaskHour == TaskMinute) TaskMinute = this.getRandomInt(1,11);
    TaskMinute = TaskMinute*5;
    TaskHourS = TaskHour+'';
    TaskMinuteS = TaskMinute+'';


    var distr_minute = TaskHour*5;
    var distr_hour = TaskMinute/5;
    if(distr_minute > 60) distr_minute -= 60;
    if(distr_hour == 0) distr_hour = 12;

    var distr_minute2 = distr_minute;

    if(this.getRandomInt(1,4) > 2) {
      distr_minute2 += 5;
    } else {
      distr_minute2 -= 5;
    }
    if(distr_minute2 >= 60) distr_minute2 = 50;
    if(distr_minute2 < 0) distr_minute2 = 5;

    if(TaskMinute < 10) TaskMinuteS = '0'+TaskMinute;
    if(distr_minute < 10) distr_minute = '0'+distr_minute;
    if(distr_minute2 < 10) distr_minute2 = '0'+distr_minute2;

    var available_answ = [];
    available_answ.push(TaskHourS+':'+TaskMinuteS);
    available_answ.push(distr_hour+':'+distr_minute);
    available_answ.push(TaskHourS+':00');
    available_answ.push(distr_hour+':'+distr_minute2);

    for (let i = 0; i < answers.length; i++) {
      rd = this.getRandomInt(0,available_answ.length-1);
      answers[i].txt.text = available_answ[rd];
      available_answ.splice(rd,1);
      answers[i].setVisible(true);
      answers[i].cont.setVisible(false);
      answers[i].txt.setVisible(true);
      answers[i].feedback = null;
      answers[i].work = true;

      if(answers[i].txt.text == (TaskHourS+':'+TaskMinuteS)) answers[i].correct = true;
      else answers[i].correct = false;

      if(answers[i].txt.text == (distr_hour+':'+distr_minute)) answers[i].feedback = WrongAnsw1V;
      if(answers[i].txt.text == (TaskHourS+':00')) answers[i].feedback = WrongAnsw2V;
      if(answers[i].txt.text == (distr_hour+':'+distr_minute2)) answers[i].feedback = WrongAnsw3V;
    }

    hour_hand.angle = TaskHour*30+TaskMinute/2;
    minute_hand.angle = TaskMinute*6;
    clock_hint.setVisible(false);
  }
  clickAnsw() {
    if(this.work == true) {
      this.scene.stopVoice();
      this.work = false;
      sfx.play("click");
      if(this.correct == true) {
        this.cont.setVisible(true);
        sfx.play('ding');
        emitter.start();
        this.scene.time.addEvent({delay: 150,
          callback: ()=>{
            emitter.stop();
          }
        });

        this.scene.hideIncorrect();
        this.scene.pulseKids();

        WaitKidClick = true;

        if(rainbowColor == 1) {
          clickkidV.play();
        } else {
          if(feedbacks.length == 0) this.scene.refreshFeedback();
          var chs = this.scene.getRandomInt(0,feedbacks.length-1);
          switch (feedbacks[chs]) {
          case 1: { RightAnsw1V.play(); break;}
          case 2: { RightAnsw2V.play(); break;}
          case 3: { RightAnsw3V.play(); break;}
          case 4: { RightAnsw4V.play(); break;}
          }
          feedbacks.splice(chs);
        }

      } else {
        clock_hint.setVisible(true);
        sfx.play('incorrect');
        this.setVisible(false);
        this.cont.setVisible(false);
        this.txt.setVisible(false);

        if(this.feedback != null) this.feedback.play();
      }
    }
  }
  refreshFeedback() {
    feedbacks = [1,2,3,4];
  }
  clickKid() {
    if(WaitKidClick == true) {
      WaitKidClick = false;
      sfx.play('click');
      this.setScale(0.9);
      this.move = true;
      kid_move = this;
      kid_move.removeInteractive();
      this.setDepth(0.35+rainbowColor/100);

      for (let i = 0; i < kids.length; i++) {
        kids[i].twn.stop();
        kids[i].work = false;
      }
      this.scene.tweens.add({
        targets: this,
        x: 285,y:218,angle:-30,
        ease: 'Linear',
        duration: 150,
        onComplete() { this.parent.scene.slideRainbow();}
      });

    }
  }
  slideRainbow() {
    WaitMove = true;
    sfx.play('slide');
    for (let i = 0; i < kids.length; i++) {
      if(kids[i].move) {kids[i].play('slide'+(kids[i].id));}
    }
    follower.t = 0.6;
    this.tweens.add({
      targets: follower,
      t: 0.95,
      ease: 'Sine.easeInOut',
      duration: 1400,
      onComplete() { this.parent.scene.moveToPlace();}
    });
    this.tweens.add({targets: kid_move,angle:30,duration: 1400,ease: 'Linear',delay: 0 });

  }
  moveToPlace() {
    rainbow.play('rainbow'+rainbowColor);
    var toX = 930, toY = 385;
    switch(rainbowColor) {
    case 1: { toX = 950; toY = 380; break;}
    case 2: { toX = 970; toY = 470; break;}
    case 3: { toX = 870; toY = 365; break;}
    case 4: { toX = 900; toY = 445; break;}
    case 5: { toX = 770; toY = 360; break;}
    case 6: { toX = 820; toY = 440; break;}
    case 7: { toX = 740; toY = 430; break;}
    }
    WaitMove = false;
    kid_move.play('happy'+(kid_move.id));
    this.tweens.add({targets: kid_move,x: toX,y:toY,angle:0,duration: 200,ease: 'Linear',delay: 0,onComplete() { this.parent.scene.nextLevel();} });
    kid_move.move = false;
  }
  nextLevel() {
    kid_move.setAngle(0);
    rainbowColor++;
    if(rainbowColor < 8) {
      this.newLevel();
    } else {
      this.time.addEvent({delay: 500,
        callback: ()=>{
          this.levelDelete();
          this.showWin();
        }
      });

    }

  }
  clickKidWin() {
    if(this.dragB == false && this.work == true) {
      sfx.play('back');
      sfx.play('slide');
      this.flwr.t = 0.73;
      this.work = false;
      this.scaleY = 0.9;
      this.twn2 = this.scene.tweens.add({targets: this,scaleX: 0.01,ease: 'Sine.easeOut',duration: 100,onComplete: this.scene.tobigRainbow});
    }
  }
  tobigRainbow() {
    var kdmove = this.targets[0];
    kdmove.play('slide'+(kdmove.id));
    kdmove.move = true;
    kdmove.twn2 = this.parent.scene.tweens.add({targets: kdmove.flwr,t: 0.98,ease: 'Sine.easeOut',duration: 1100,onComplete:this.parent.scene.moveToStartPlace});
    this.parent.scene.tweens.add({targets: kdmove,scaleX:0.9,duration: 100,ease: 'Linear',delay: 0 });
  }
  showWin() {
    this.stopVoice();
    rainbow = this.add.sprite(-5, 350, 'mainatlas','rainbow/rainbow_win').setDepth(0.001).setOrigin(0,0.5);
    for (let i = 0; i < kids.length; i++) {
      var kd = kids[i];
      kd.off('pointerdown');
      kd.off('pointerout');
      kd.off('pointerover');
      kd.work = true;

      kd.removeInteractive();
      kd.flwr.t = 0.7;
      switch (kd.id) {
      case 1: { kd.setPosition(54, 580); break;}
      case 2: { kd.setPosition(122, 480); break;}
      case 3: { kd.setPosition(209, 580); break;}
      case 4: { kd.setPosition(280, 480); break;}
      case 5: { kd.setPosition(352, 580); break;}
      case 6: { kd.setPosition(410, 480); break;}
      case 7: { kd.setPosition(492, 580); break;}
      }
      kd.startX = kd.x;kd.startY = kd.y;
      kd.setInteractive();
      this.input.setDraggable(kd);
      kd.on('pointerup', this.clickKidWin,kd);
      kd.on('pointerout', function () { if(this.work == true) {this.setScale(this.sc_save);this.twn.resume();}},kd);
      kd.on('pointerover', function () { if(this.work == true) {this.twn.pause(); this.sc_save = this.scaleX;this.setScale(1.05);}},kd);
    }
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    this.input.on('dragstart', function (pointer, gameObject) {
      gameObject.dragB = true;
      gameObject.setDepth(0.41);
    });
    this.input.on('dragend', function (pointer, gameObject) {
      sfx.play('back');
      if(gameObject.x > 600) {
        this.scene.tweens.add({targets: gameObject,x: gameObject.startX,y: gameObject.startY,ease: 'Sine.easeOut',duration: 100,onComplete() {this.targets[0].dragB = false;}});
      } else {
        gameObject.work = false;
        gameObject.flwr.t = 0.73;
        gameObject.scaleY = 0.9;
        gameObject.scene.tweens.add({targets: gameObject,scaleX: 0.01,ease: 'Sine.easeOut',duration: 100,onComplete: this.scene.tobigRainbow});

      }
    });

    this.pulseKids();
    replaybtn = this.add.sprite(850, 720, 'mainatlas','gui/replaybtn').setDepth(0.5).setScale(0.9).setInteractive();
    replaybtn.on('pointerdown', this.fromWinToMenu,this);
    replaybtn.on('pointerout', function () { this.setScale(0.9);},replaybtn);
    replaybtn.on('pointerover', function () { this.setScale(1);},replaybtn);

    completedV.play();
    emitterWin.start();
    this.time.addEvent({delay: 300,
      callback: ()=>{
        sfx.play('win_ding');
      }
    });
    this.time.addEvent({delay: 500,
      callback: ()=>{
        emitterWin.stop();
      }
    });
    this.time.addEvent({delay: 15000,
      callback: ()=>{
        this.tweens.add({targets: replaybtn,y:515,duration: 300,ease: 'Linear',delay: 0 });
      }
    });
    this.drw2();
  }
  moveToStartPlace () {
    if(kids.length > 0) {
      if (this.targets[0] != null) {
        if (this.targets[0].kspr != null) {
          var kdmove = this.targets[0].kspr;

          if(kdmove != null) {
            kdmove.move = false;
            kdmove.setPosition(kdmove.startX, kdmove.startY);
            kdmove.setScale(0.9);
            kdmove.setDepth(0.4);
            kdmove.play('wait' + (kdmove.id));
            kdmove.work = true;
          }
        }
      }
    }
  }
  fromWinToMenu () {
    sfx.play('click');
    replaybtn.destroy();replaybtn = null;
    rainbow.destroy();
    bg3.destroy();
    for (let i = 0; i < kids.length; i++) {
      if(kids[i].twn2 != null) {kids[i].twn2.stop();kids[i].twn2 = null;}
      kids[i].flwr = null;
      kids[i].destroy();
      kids[i] = null;
    }
    kids = [];
    this.menuadd();
  }
  pulseKids() {
    for (let i = 0; i < kids.length; i++) {
      kids[i].setScale(0.9);
      if(kids[i].x < 512) kids[i].work = true;
      else kids[i].work = false;
      if(kids[i].work) kids[i].twn = this.tweens.add({targets: kids[i],scaleY: 0.95,duration: 500,ease: 'Linear',yoyo:true,repeat:-1,delay: 0 });
    }
  }
  hideIncorrect() {
    for (let i = 0; i < answers.length; i++) {
      if(answers[i]!=null) {
        if(answers[i].correct != true) {
          answers[i].setVisible(false);
          answers[i].cont.setVisible(false);
          answers[i].txt.setVisible(false);
        }
      }

    }
  }
  questClick() {
    this.stopVoice();
    sfx.play('click');
    firstquestV.play();
  }
  stopVoice() {
    clickkidV.stop();
    completedV.stop();
    firstquestV.stop();
    gamedirV.stop();
    RightAnsw1V.stop();
    RightAnsw2V.stop();
    RightAnsw3V.stop();
    RightAnsw4V.stop();
    IntroV.stop();
    TitleV.stop();
    WrongAnsw1V.stop();
    WrongAnsw2V.stop();
    WrongAnsw3V.stop();

  }

  levelDelete() {
    this.tweens.killAll();

    for(var i = 0; i < levs.length; i++){
      if(levs[i] != null)
        levs[i].destroy();
    }
    levs = [];
  }
  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  update() {
    if(follower != null) this.drw();
    if(replaybtn != null) this.drw2();
  }
}
