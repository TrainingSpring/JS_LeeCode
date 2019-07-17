/**
 * @Author: Training
 * @desc 给数组添加了一个方法,调换数组某两个元素的位置
 * @params a,b   两个位置的下标
 */
Array.prototype.swap = function(a,b){
  let temp = this[a];
  this[a] = this[b];
  this[b] = temp;
}
/**
 * @author Training
 * @desc 堆的实现,
 *    堆,总是一个完全二叉树
 *    任意节点小于（或大于）它的所有后裔，最小元（或最大元）在堆的根上（堆序性）。
 * @param type  堆的类型:最大堆 1  最小堆 0
 * @constructor
 */
function Heap(type = 1){
  this.type = type;
  this.root = new Array(1000);
  this.root[0] = 0;
}
Heap.prototype.insert = function(val){
  this.root[0] ++;
  this.root[this.root[0]] = val;
  if (this.root[0] !== 1) this.formatHeap();
};
/**
 * @Author: Training
 * @desc 格式化插入数据
 *    具体思路如下,每当插入一个数据,则插入到堆的最底部
 *    然后依次与父节点进行对比,如果符合当前规则(最大堆或者最小堆)
 *    则不作任何操作,若不符合规则,调换位置,再继续之前步骤
 */
Heap.prototype.formatHeap = function(){
  let size = this.root[0],
    pp = Math.floor(size/2),
    type = this.type;
  if (type) {

    while (this.root[size] > this.root[pp]) {
      this.root.swap(size,pp);
      size = pp;
      pp = Math.floor(size/2) || 1;
    }
  }else{
    while (this.root[size] < this.root[pp]) {
      this.root.swap(size,pp);
      size = pp;
      pp = Math.floor(size/2) || 1;
    }
  }
};
/**
 * @Author: Training
 * @desc 删除数据  堆的删除只能删除堆顶,然后再进行堆化  具体思路如下:
 *    为了保持堆依旧是一个完全二叉树(每层的数据是满的,叶子数据必须靠左,具体请google)
 *    所以,使用堆底最后一个数据,替换堆顶数据,然后对堆进行堆化,使其满足最大堆、最小堆的特性；
 *    以最小堆为例： 每一层的数据一定小于子层所有的数据，先和第二次左边的一次次比较，将换上来的数据
 *    放入到正确的位置，然后再将当前堆顶（这里必定是原第二层的左侧位置的数据）和第二次右侧的位置数据进行比较，
 *    若右侧小于当前位置，则更换位置;
 */
Heap.prototype.remove = function(){
  let size = this.root[0],
  p = 1,
  pc = p*2;
  if (size <= 0) return;
  this.root[1] = this.root[size];
  this.root[size] = null;
  this.root[0]--;
  if (this.type) {
    while (true){
      let max = this.root[pc]>=this.root[pc+1]?pc:pc+1;
      if (this.root[p] < this.root[max]) {
        this.root.swap(p,max);
        p = max;
        pc *=2;
      }else {
        break;
      }
    }
  }else{
    while (true){
      let max = this.root[pc]<=this.root[pc+1]?pc:pc+1;
      if (this.root[p] > this.root[max]) {
        this.root.swap(p,max);
        p = max;
        pc *=2;
      }else {
        break;
      }
    }
  }

};
/**
 * @Author: Training
 * @desc  批量插入数据
 * @params array  数据组
 */
Heap.prototype.insertMore = function(array){
  if (typeof array !== "object") throw new Error("数据类型错误: 请输入正确的数组");
  for (let i = 0, len = array.length; i < len; i++) {
    this.insert(array[i])
  }
};


let s = new Date().getTime();
let  randomArray = (num)=>{
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(Math.ceil(Math.random()*1000));
    // arr.push(i);
  }
  return arr;
};
let heap = new Heap(0);
heap.insertMore([1]);
heap.remove();
console.log(heap.root);
let e = new Date().getTime();
console.log("time=" + (e - s));