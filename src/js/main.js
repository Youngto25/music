import './icons.js'

/*
function $(selector){
  return document.querySelector(selector);
}
*/

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

//ES6
class Player{
  constructor(node){
    this.root = typeof node === 'string' ? $(node) : node;
    this.songList = [];
    this.currentIndex = 0;
    this.audio = new Audio();
    this.start();
    
    
    this.bind();
  }
  start() {
    fetch('https://jirengu.github.io/data-mock/huawei-music/music-list.json')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.songList = data;
        this.audio.src = this.songList[this.currentIndex].url;
        console.log(this.audio.src)
      })
  }

  bind(){
    let self = this;
    console.log(this.root.querySelector('.btn-play-pause').classList)
    this.root.querySelector('.btn-play-pause').addEventListener('click',function(){
      if(this.classList.contains('playing')){
        self.audio.pause();
        this.classList.remove('playing');
        this.classList.add('pause');
        this.querySelector('use').setAttribute('xlink:href','#icon-play');
      }else if(this.classList.contains('pause')){
        self.audio.play();
        this.classList.remove('pause');
        this.classList.add('playing');
        this.querySelector('use').setAttribute('xlink:href','#icon-pause');
      }
    })
    
    this.root.querySelector('.btn-pre').addEventListener('click',() =>{
      this.playPrevSong()
    })
    this.root.querySelector('.btn-next').addEventListener('click',() =>{
      this.playNextSong()
    })
  }

  playPrevSong(){
    this.currentIndex = (this.songList.length + this.currentIndex - 1) % this.songList.length;
    this.audio.src = this.songList[this.currentIndex].url;
    this.audio.oncanplaythrough = ()=> this.audio.play();
  }
  playNextSong(){
    this.currentIndex = (this.songList.length + this.currentIndex + 1) % this.songList.length;
    this.audio.src = this.songList[this.currentIndex].url;
    this.audio.oncanplaythrough = ()=> this.audio.play();
  }
}

new Player($('#player'))
