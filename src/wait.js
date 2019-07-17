/**
 * @Author: Training
 * @desc 给定一个含有 n 个正整数的数组和一个正整数 s ，
 *    找出该数组中满足其和 ≥ s 的长度最小的连续子数组。
 *    如果不存在符合条件的连续子数组，返回 0。
 *    示例:
 *      输入: s = 7, nums = [2,3,1,2,4,3]
 *      输出: 2
 *      解释: 子数组 [4,3] 是该条件下的长度最小的连续子数组。
 * @think
 */
export let minSubArrayLen = function(s, nums) {
  //...等后面再补吧
};
/**
 * @Author: Training
 * @desc  删除排序数组中的重复项
 * @params 给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
 * 不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。
 *  示例 1:
 *    给定数组 nums = [1,1,2],
 *    函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。
 *    你不需要考虑数组中超出新长度后面的元素。
 */
export let removeDuplicates = function(nums) {

};
/***************************************************************************************************************************
 * @Author: Training                                                                                                       *
 * @desc 二叉查找树        删除操作待实现...                                                                               *
 * @params                                                                                                                 *
 ***************************************************************************************************************************/
/**
 * @Author: Training
 * @desc 二叉树的节点对象
 * @params val
 */
function TreeNode (val){
  this.val = val;
  this.left = this.right = this.parent = null;
}
/**
 * @Author: Training
 * @desc 二叉树对象函数
 */
function SearchTree(){
  this.root = null;
  this.createTree = function (val) {  // 使用工厂模式创建树节点
    return new TreeNode(val);
  }
}

/**
 * @author Training
 * @desc 查找指定值的位置
 * @param val    需要查找的值
 * @param callback  回调函数: 参数: state  状态(-1为应该插入到right,0位left)   root: 当前节点
 * @returns {boolean}  true为查找到了  false未找到
 */
SearchTree.prototype.query = function(val,callback){
  if (val === null || this.root === null) throw new Error("错误: 请检查输入的值是否正确切不为null,否则请检查二叉树中是否存在数据!!!");
  let search = function (root, val) {
    if (root.right === null && root.val<val ) {  // 右侧节点为空,并且当前节点的值要小于所查节点
      callback(-1,root);  // 此时回调当前节点的状态 以及当前节点   -1代表节点的右侧为空并且搜索值大于当前节点(在插入操作中,代表应该直接插入到右侧)
      return false; // 返回查找状态
    }else if(root.left === null && root.val>val){ // 与上面相反
      callback(0,root);
      return false;
    }
    if (root.val > val) search(root.left,val);// 递归函数,如果以上条件不满足,递归找寻左侧节点
    else if(root.val<val) search(root.right,val);// 递归函数,如果以上条件不满足,递归找寻右侧节点
    else {
      callback(true,root); // 当val 和当前节点的值相当的时候 调取回调函数
      return true;
    }
  };
  return search(this.root,val);
};
/**
 * @author Training
 * @desc 插入数据到二叉树
 * @param val 需要插入进去的值
 */
SearchTree.prototype.insert = function(val){
  if (!this.root) {
    this.root = this.createTree(val);
  }else{
    this.query(val,(state,root)=>{
      // console.log(root,val,state);
      if (state === 0) {
        root.left = this.createTree(val);
        root.left.parent = root;
      }else if (state === -1){
        root.right = this.createTree(val);
        root.right.parent = root;
      }else{
        let right = root.right;
        root.right = this.createTree(val);
        if (right !== null) root.right.right = right;
        console.log(root,val)
      }
    });
  }
};
/**
 * @Author: Training
 * @desc 中序遍历二叉查找树 (遍历后就是已排序数据)
 * @return {array} 返回遍历后的数组数据
 */
SearchTree.prototype.forEach = function(){
  let each = function (root) {
    if (root === null) return [] ;
    return [...each(root.left),root.val,...each(root.right)];
  };
  return (each(this.root));
};
/**
 * @Author: Training
 * @desc 查找数据
 * @params val
 */
SearchTree.prototype.get = function(val){
  let  p;
  this.query(val,(state,root)=>{
    if (state === true) p =  root;
  });
  return p?p:false;
};
/**
 * @Author: Training
 * @desc 删除节点 (待实现...)
 * @params val
 */
SearchTree.prototype.remove = function(val){

};
