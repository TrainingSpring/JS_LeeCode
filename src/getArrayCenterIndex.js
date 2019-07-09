let Node = function (val) {
  this.value = val;
  this.next = null;
}
/**
 * Initialize your data structure here.
 */
var MyLinkedList = function() {
  this.head = arguments[0] || null;
  this.length = arguments[1] || 0;
};
/**
 * @Author: Training
 * @desc Get the Node of the index-th in the linked list, if the index is invalid ,return -1;
 * @return {Node|number}
 */
MyLinkedList.prototype.find = function(index){
  if (index <= 0) return this.head;
  else if (index < 0 || index >= this.length) return -1;
  let current = this.head;
  while (index > 0) {
    current = current.next;
    index --;
  }
  return current;
}
/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1.
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
  let current = this.find(index);
  return (current!==-1 && current !== null)?current.value:-1;
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
  let head = this.head;
  let current = new Node(val);
  current.next = head;
  this.head = current;
  this.length ++;
};

/**
 * Append a node of value val to the last element of the linked list.
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
  if( this.length === 0) this.addAtHead(val);
  else{
    let last = this.find(this.length-1);
    last.next = new Node(val);
    this.length ++;
  }

};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted.
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
  if (index === 0) this.addAtHead(val);
  else if (index === this.length) this.addAtTail(val);
  else if (index > this.length) return;
  else{
    let next = this.find(index);
    let prev = this.find(index - 1);
    let target = new Node(val);
    prev.next = target;
    target.next = next;
    this.length ++;
  }
};

/**
 * Delete the index-th node in the linked list, if the index is valid.
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
  if (index >= this.length || index < 0) return ;
  if (index === 0) {
    this.head = this.head.next;
  }else{
    let prev = this.find(index-1);
    prev.next = this.find(index).next;
  }
  this.length --;
};
/**
 * @Author: Training
 * @desc reverse the linked list , return the new Linked list after reversed  ;
 * @params
 */
MyLinkedList.prototype.reverseList = function(){
  let prev = null,curr = this.head,next;
  while (curr) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  console.log(prev);
  return new MyLinkedList(prev,this.length);
};
/**
 * @Author: Training
 * @desc foreach the  Linked List item
 */
MyLinkedList.prototype.forEachList = function(callback){
  let link = this.head,i = 0;
  while (link) {
    callback(link,i);
    link = link.next;
    i++;
  }
}



let oddEvenList = function(Node) {
  let head = Node.head;
  if (!head || !head.next) return Node.head;
  // 官方解题...
  let odd = head,even = head.next,evenHead = even; // 定义三个指针,一个偶数指针,一个奇数指针,一个指向偶数头
  while (even && even.next) {   // 判断偶数个是否为真 和下一个偶数个是否为真
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }
  odd.next = evenHead;
  Node.head = head;
  // let odd = {value:head.value,next:null},
  //   even = {value:head.next.value,next:null},
  //   p = 1,
  //   op = odd,
  //   ep = even;
  //   while(head){
  //     if(p>2){
  //       if (p % 2 !== 0) {
  //         op.next = {
  //           value:head.value,
  //           next:null
  //         };
  //         op = op.next;
  //       }else{
  //         ep.next = {
  //           value:head.value,
  //           next:null
  //         };
  //         ep = ep.next;
  //       }
  //     }
  //     head = head.next;
  //     p++;
  //   }
  //   op.next = even;
  // Node.head = odd;
}


let obj = new MyLinkedList();
obj.addAtHead(1);
obj.addAtTail(2);
obj.addAtTail(3);
obj.addAtTail(4);
obj.addAtTail(5);
obj.addAtTail(6);
obj.forEachList((item,index)=>{
  console.log(item.value)
});
oddEvenList(obj);
console.log("--------------------------------------------------------------------")
obj.forEachList((item,index)=>{
  console.log(item.value)
});
