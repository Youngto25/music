import './icons.js'

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

//ES6
class Player{
  constructor(node){
    this.root = typeof node === 'string' ? $(node) : node;
  }

  bind(){

  }
}

/*ES5写法
function Player(){

}
Player.prototyep.bind = function(){

}

*/