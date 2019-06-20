/***********************************************************数组类***********************************************************************/
/**
 * @Author: Training
 * @desc
 *    给定一个字符串 s，计算具有相同数量0和1的非空(连续)子字符串的数量，并且这些子字符串中的所有0和所有1都是组合在一起的。
 *    重复出现的子串要计算它们出现的次数。
 *    示例 1 :
 *     输入: "00110011"
 *     输出: 6
 *     解释: 有6个子串具有相同数量的连续1和0：“0011”，“01”，“1100”，“10”，“0011” 和 “01”。
 *
 *     请注意，一些重复出现的子串要计算它们出现的次数。
 *
 *     另外，“00110011”不是有效的子串，因为所有的0（和1）没有组合在一起。
 * @return  count :number  返回组合可以组成的有效子串的数量
 * @think:
 *    以00110011为例
 *    (0011)0011
 *    0(01)10011
 *    00(1100)11
 *    001(10)011
 *    0011(0011)
 *    00110(01)1
 *    00110011   ___最后两位是11  不成立
 *    首先 : 仅剩一位数的时候,无法组合,所以直接舍弃该次循环! 循环次数为: 7
 *    规律 : 每次循环的检测位置都是向后移动一位
 */
function getChild(s) {
  /**这个算法用时太长,可以忽略****/
  /* let first = s[0];// 第一个值
   let countSame = 1;// 与first相同值的数量
   for (let i  = 1;i<s.length;i++){
     if (s[i] === first) countSame++;
       else{
         let str = s.slice(0,i);
         let end = s.slice(i,i+countSame);
         if (str.length === end.length) {
           for (let j = 0; j < end.length-1; j++) if (end[j] !== end[j + 1]) return false;
         }else return false;
         return str+end;
       }
   }*/
  /*************此算法主要使用正则表达式******************/
    // if (s.length <= 1) return false; // 如果字符串的长度小于等于1的时候 直接返回false  (因为循环的时候减少了一位,所以此处不需要)

    // 根据第一个字符判断应该使用的正则表达式
  let match = s[0] === "0" ? s.match(/0+1+/) || "" : s.match(/1+0+/) || "";
  // 根据正则表达式,将0组(多个0组成的字符串),或者1组(多个1组成的字符串)分割开来
  let fg = match.toString().match(/0+|1+/g);
  //如果0组的字符长度小于等于1组的字符长度,则返回所需数据(因为题目的原因,这里可以直接返回true) 这么写的原因是想看看处理后的数据
  if (fg && fg[0].toString().length <= fg[1].toString().length) return fg[0] + fg[1].slice(0, fg[0].length);


  return false;
}

export function countBinarySubstrings(s) {
  let count = 0;
  let result = [];
  for (let i = 0; i < s.length - 1; i++) {   // 循环体   因为最后一位只有一位数的缘故 不需要做任何操作 ,所以循环次数是length-1;
    let res = getChild(s.slice(i));          // 将数据交给子函数处理   数据每次会向后移一位,所以直接取当前位置到末尾的值!
    if (res) {
      count++;                              // 根据子函数的返回值,若不为假的话,计数器+1;
      result.push(res);                     // 同时将子函数处理回来的数据 添加到数组 result中 (这个可以根据心情来)
    }
  }
  console.log(result);
  console.log(count);
  return count;                             // 因为最终需要的仅仅只是计数器的值,所以返回count;
  /****简化后的代码****/
  // let count = 0;
  // for (let i = 0; i < s.length - 1; i++)
  //   if ( getChild(s.slice(i)))count++;
  // return count;
}

/**
 * @Author: Training
 * @desc
 *      给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
 *      给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 *      图片地址: https://assets.leetcode-cn.com/aliyun-lc-upload/original_images/17_telephone_keypad.png
 *      示例:
 *        输入："23"
 *        输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
 * @think 数学中的与组合排列类似!
 *      思路 : 每两项,两项的来进行组合:
 *      例子:
 *        输入 : 234
 *        首先,23的映射值进行组合   (abc,def);
 *        组合后的值:[ad,ae,af,bd,be,bf,cd,ce,cf]
 *        将组合后的值保存起来,作为23的映射,然后以组合后的值再和4(ghi)进行组合
 *        [adg,aeg,afg,bdg,beg,bfg......]
 *        [adh,aeh,afh,bdh,beh,bfh......]
 *        [adi,aei,afi,bdi,bei,bfi......]
 */
export function letterCombinations(str) {
  let map = ["", 1, "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];  // 映射电话号码
  // 将字符串转化为数组
  let s = str.split("");
  // 用来保存对应字符串应该有的map数据
  let code = [];
  // 遍历出code
  s.forEach((item) => {
    if (map[item]) code.push(map[item]);
  });
  // 用来作组合   递归
  let comb = (arr) => {
    if (arr.length === 1) return arr[0].split(""); //当arr的长度为1的时候 直接发挥字符串的转化为的数组
    let combMap = [];
    for (let i = 0, ilen = arr[0].length; i < ilen; i++)
      for (let j = 0, jlen = arr[1].length; j < jlen; j++)
        combMap.push(`${arr[0][i]}${arr[1][j]}`);   //每两个进行组合 并将其保存如临时数据combMap中

    // 组合完成后 将前两个下标的数据替换为 临时数据
    arr.splice(0, 2, combMap);
    // 如果arr数据的长度小于1的时候,直接返回临时数据,否则递归(自己执行自己)
    if (arr.length < 1) return combMap; else comb(arr);
    // 因为递归的关系,返回的数据可能是深层函数的数据,所以需要返回arr[0]的值
    return arr[0];
  };
  // 若数据的值大于0的时候,返回comb函数的数据,否则返回空!
  if (code.length > 0) return comb(code); else return [];
}

/**
 * @Author: Training
 * @desc LeeCode 题码:  914
 *     给定一副牌，每张牌上都写着一个整数。
 *     此时，你需要选定一个数字 X，使我们可以将整副牌按下述规则分成 1 组或更多组：
 *
 *     每组都有 X 张牌。
 *     组内所有的牌上都写着相同的整数。
 *     仅当你可选的 X >= 2 时返回 true。
 *     示例 1：
 *     输入：[1,2,3,4,4,3,2,1]
 *     输出：true
 *     解释：可行的分组是 [1,1]，[2,2]，[3,3]，[4,4]
 *     来源：力扣（LeetCode）
 *     链接：https://leetcode-cn.com/problems/x-of-a-kind-in-a-deck-of-cards
 * @params  deck:Array
 * @think
 *    根据题意,
 *    首先进行排序(这里就不使用排序算法了,直接使用js自带的sort进行排序)
 *    然后进行分析
 *    方法是获取最大公约数
 *    获取最大公约数使用递归
 */
export let hasGroupsSizeX = function (deck) {
  if (deck.length <= 1) return false;  // 如果deck的数据长度小于等于1的时候,直接返回false;
  deck.sort((a, b) => a - b);// 排序
  let code = []; // 数据分组后,每个数据的长度,储存于此
  for (let i = 0, tem = []; i < deck.length; i++) {  // 将数据分组
    tem.push(deck[i]);
    for (let j = i + 1; j < deck.length + 1; j++) {
      if (deck[i] === deck[j]) tem.push(deck[j]);
      else {
        if (tem.length < 2) return false;    //如果这组数据的长度小于2的时候,直接返回false
        // code.push(Object.assign([], tem));   // 这里的代码是将数组里的数分组
        code.push(tem.length);            // 这个代码是将数组里的分组后的长度获取到
        tem.length = 0;
        i = j - 1;
        break;
      }
    }
  }
  // 获取两个数值之间的最大公约数
  let getCommon = (a, b) => {
    if (b === 0) return a;
    return getCommon(b, a % b)
  };
  // 获取数组内所有数据的最大公约数
  let getCodeNumber = (arr) => {
    if (arr.length < 2) return arr[0];
    let res = getCommon(arr[0], arr[1]);
    arr.splice(0, 2, res);
    return getCodeNumber(arr);
  };
  return !(getCodeNumber(code) === 1);
};
/**
 * @Author: Training
 * @desc 种花问题
 *    假设你有一个很长的花坛，一部分地块种植了花，另一部分却没有。
 *    可是，花卉不能种植在相邻的地块上，它们会争夺水源，两者都会死去。
 *
 *    给定一个花坛（表示为一个数组包含0和1，其中0表示没种植花，1表示种植了花），
 *    和一个数 n 。能否在不打破种植规则的情况下种入 n 朵花？
 *    能则返回True，不能则返回False。
 *
 *    来源：力扣（LeetCode）
 *    链接：https://leetcode-cn.com/problems/can-place-flowers
 * @think
 *    思路:
 *    首先,在数组前后各加一个0,这样就不用考虑边界的问题了
 *    判断当前值和前一位,后一位以及自身的值是否为0  如果为0的话,说明可以种花
 *
 */
export var canPlaceFlowers = function (flowerbed, n) {
  if (flowerbed.length < 2 && n > 0)  // 做一些基础的判断,节省执行时间
  {
    if (flowerbed[0] === 0) return true;
    else return false;
  }
  flowerbed = [0, ...flowerbed, 0]; // 重构数组,在前后各加一项0;
  let max = 0;                   // 最大可种数量
  for (let i = 1, len = flowerbed.length; i < len; i++) { // 遍历
    if (flowerbed[i - 1] === 0 && flowerbed[i] === 0 && flowerbed[i + 1] === 0) {
      max++;
      i++;// 成功后,下一位一定是失败,所以直接不执行下一位,直接执行下下一位的判断!
    }
  }
  return max >= n;
};
/**
 * @Author: Training
 * @desc 格雷编码
 * @think
 *    格雷编码是一个二进制数字系统，在该系统中，两个连续的数值仅有一个位数的差异。
 *    给定一个代表编码总位数的非负整数 n，打印其格雷编码序列。格雷编码序列必须以 0 开头。
 *
 *    示例 1:
 *    输入: 2
 *    输出: [0,1,3,2]
 *    解释:
 *    00 - 0
 *    01 - 1
 *    11 - 3
 *    10 - 2
 *    来源：力扣（LeetCode）
 *    链接：https://leetcode-cn.com/problems/gray-code
 *
 *
 *
 *    再来回顾一下二进制,二进制的取反,与,或,非就不说了,二进制左移
 *      二进制左移n位,此时的二进制数相当于此数十进制的乘以2的n次方
 *          a*2^n
 *      如: 10<<5   将二进制10转化为10进制的2,将2*2^5=64;
 *      若是十进制左移,则直接使用公式带入
 *    分析:
 *      输入: 1(2^1)
 *      输出:
 *          0         0^0>>1       1
 *          1          1^1>>1      0
 *
 *      输入:2(2^2)
 *      输出:
 *          00        00
 *          01        01
 *          11        11
 *          10        10
 *      输入: 3  (2^3)
 *      输出:
 *          000   --- 0
 *          001   --- 1
 *          011   --- 3
 *          010   --- 2
 *          110   --- 6
 *          111   --- 7
 *          101   --- 5
 *          100   --- 4
 */
export let grayCode = function (n) {
  /** 算法1  利用规律   对于大数值  循环次数较少 执行时间相对较少   --------大数值推荐使用
   *
   *  一个格雷编码组是由2的n次方个二进制数据组成
   *  其中,头一半是n-1的格雷编码组在前面+0组成
   *  后一半是又 n-1的格雷编码组在前面+1组成,且互相对称!
   *
   * */
  /*let getCode = (num)=>{
    if (num === 1) return ['0','1'];
    let g = getCode(num-1);
    let res = [];
    for (let i = 0, len = 1 << num; i < len/2; i++) {
      res[i] =  `0${g[i]}`;
      res[len-i-1] = `1${g[i]}`;
    }
    return res;
  };
  let result = getCode(n);
  return result.map(item=>{
    return parseInt(item,2)
  });*/
  /**算法2  利用位运算    代码量少,简介易读,对于大数值,循环体较大,执行时间较上略长(由于位操作的特殊原因,过大的数据不被正确计算) ---------  小数值推荐使用*/
  let res = [];//定义一个空数组
  for (let i = 0, len = 1 << n; i < len; i++) {// 循环
    res [i] = i ^ i >> 1;
  }
  return res
};
/**************************************************************************正则类*****************************************************************************/
/**
 * @Author: Training
 * @desc 重复的子字符串
 * @params
 *      给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。
 *      给定的字符串只含有小写英文字母，并且长度不超过10000。
 *
 *      示例 1:
 *      输入: "abab"
 *      输出: True
 *      解释: 可由子字符串 "ab" 重复两次构成。
 *      来源:LeetCode
 *      https://leetcode-cn.com/problems/repeated-substring-pattern/
 */
export let repeatedSubstringPattern = function (s) {
  return /^(\w+)\1+$/.test(s);
};
/**
 * @Author: Training
 * @desc 正则表达式匹配
 *    给你一个字符串 s 和一个字符规律 p，
 *    请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
 *
 *    '.' 匹配任意单个字符
 *    '*' 匹配零个或多个前面的那一个元素
 *
 *    输入:
 *    s = "aa"
 *    p = "a"
 *    输出: false
 *    解释: "a" 无法匹配 "aa" 整个字符串。
 *    @think
 *    使用递归,一个字符一个字符的匹配
 *    ---- 这是借鉴了他人的想法  (我的递归思想还得加强啊...)
 */
export let isMatch = function (text, pattern) {
  if (pattern === ".*") return true;
  else if (!pattern) return !text;
  // 首先,字符串text必须为真,判定pattern(正则)是否与字符串text的第一个字符匹配(或者与"."匹配)
  let first_match = (text) && (pattern[0] === text[0] || pattern[0] === '.');
  // 如果当前的pattern(正则)的长度大于等于2的时候,判断此正则的第二个字符是否为星号("*");
  console.log(pattern);
  if (pattern.length >= 2 && pattern[1] === '*') {
    // 如果为星号("*"),则需要判断两个问题,
    // 1. *前的匹配字符为空
    // 2. *前的内容不为空
    // 解决方法:
    // 1. 使用递归判断*前的内容是否为空,将正则匹配值向后移两位,
    //    text不变,如果后一个正则匹配符与当前字符匹配,
    //    说明此正则匹配了一个空的字符串,一直递归下去,若后面递归的内容都匹配,则会返回true
    // 2. 当前的字符匹配为真(first_match === true)
    //    递归判断与当前的字符匹配的数量
    //    每一次递归都将text的第一位去除,然后在与当前的正则匹配
    return isMatch(text, pattern.slice(2)) || (first_match && isMatch(text.slice(1), pattern))
  }
  return first_match && isMatch(text.slice(1), pattern.slice(1));
  /*let tem = [];*/
  /*let str_tem = "";
  for (let i = 0, len = p.length; i < len; i++) {
    let next = p[i+1];
    let _this = p[i];
    if (next === '*'){
      if (str_tem !== "") tem.push(str_tem);
      str_tem = "";
      tem.push(`${p[i]}${next}`);
      i++;
    }else {
      str_tem += _this;
    }
  }
  if (str_tem !== "") tem.push(str_tem);*/
};
/**
 * @Author: Training
 * @desc 对角线递归(中等难度)
 *    给定一个含有 M x N 个元素的矩阵（M 行，N 列），
 *    请以对角线遍历的顺序返回这个矩阵中的所有元素，
 *    对角线遍历如下图所示。
 *    图片地址:https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/diagonal_traverse.png
 *    示例:
 *    输入:
 *    [
 *      [ 1, 2, 3 ],
 *      [ 4, 5, 6 ],
 *      [ 7, 8, 9 ]
 *    ]
 *    输出:  [1,2,4,7,5,3,6,8,9]
 *    解释:  看图或LeetCode
 *    地址: https://leetcode-cn.com/explore/learn/card/array-and-string/199/introduction-to-2d-array/774/
 * @think
 *    首先找规律
 *    1. 方向  首先是向上,当碰到边界时更改方向
 *    2. 边界  (这里的x轴代表的是外层数组(有多个子数组)的下标,y轴代表内层数组(子数组的数据)的下标)
 *          y轴边界: 当y轴小于0,或者大于等于最内层数组的长度的时候,证明触碰到Y轴边界
 *          x轴边界: 当x轴小于0.或者大于等于最外层数组的长度的时候,证明触碰到x轴边界
 *    3. 操作:
 *          向上: (x--,y++)
 *            当碰到了X轴边界,却未碰到Y轴边界,坐标X轴 +1,然后更改方向
 *            当碰到了Y轴边界,却未碰到X轴边界,坐标Y轴 -1,然后更改方向
 *            当同时碰到双边界,x+1,y-1,然后更改方向
 *          向下: (x++,y--)
 *            当碰到Y轴边界,却未碰到X轴边界,坐标Y轴 +1,然后更改方向
 *            当碰到X轴边界,却未碰到Y轴边界,坐标X轴 -1,然后更改方向
 *            当同时碰到双边界,x-1,y+1,然后更改方向
 */
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
export let findDiagonalOrder = function (matrix) {
  if (matrix.length === 0) return [];
  let temp = [matrix[0][0]];
  let len = matrix.join(',').split(',').length;
  let x = 0;
  let y = 0;
  let direction = true;
  /*for(let i = 0;i<len-1 ;i++){
    if (direction) {
      x--;
      y++;
      if(x<0){
        x++;
        direction = false;
        if (y >= matrix[x].length){x++;y--;}
      }else if(y>=matrix[x].length){
        y--;
        direction = false;
        if (y === matrix[x].length-1){x+=2;}
      }
    }else{
      x++;
      y--;
       if(x>=matrix.length){
        x--;
        y+=2;
        direction = true;
        // if (y < 0) y++;
      }else if(y<0){
        y++;
        direction = true;
        if (x >= matrix.length) x--;
      }
    }

    temp.push(matrix[x][y]);
  }*/
  while (len - 1 > 0) {
    if (direction) {
      x--;
      y++;
      if (x < 0) {
        x++;
        direction = false;
        if (y >= matrix[x].length) {
          x++;
          y--;
        }
      } else if (y >= matrix[x].length) {
        y--;
        direction = false;
        if (y === matrix[x].length - 1) {
          x += 2;
        }
      }
    } else {
      x++;
      y--;
      if (x >= matrix.length) {
        x--;
        y += 2;
        direction = true;
        // if (y < 0) y++;
      } else if (y < 0) {
        y++;
        direction = true;
        if (x >= matrix.length) x--;
      }
    }
    temp.push(matrix[x][y]);
    len--;
  }
  return temp;
};
/**
 * @Author: Training
 * @desc 螺旋矩阵
 *    给定一个包含 m x n 个元素的矩阵（m 行, n 列），
 *    请按照顺时针螺旋顺序，返回矩阵中的所有元素。
 *    示例 1:
 *    输入:
 *    [
 *    [ 1, 2, 3 ],
 *    [ 4, 5, 6 ],
 *    [ 7, 8, 9 ]
 *    ]
 *    输出: [1,2,3,6,9,8,7,4,5]
 *    链接: https://leetcode-cn.com/explore/learn/card/array-and-string/199/introduction-to-2d-array/775/
 * @think
 *   根据各个方向判断应该值,并将该值提取后从原数组删除
 */
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
export let spiralOrder = function (matrix) {
  if (matrix.length === 0) return [];
  let temp = [];
  let len = matrix.length * matrix[0].length;
  let dir = 0;    // 方向  0: 右 1:下  2:左 3:上
  let col = 0;    // 行数
  while (len - 1 >= 0) {
    switch (dir) {
      case 0:
        temp.push(matrix[col][0]);
        matrix[col].splice(0, 1);
        if (matrix[col].length === 0) {
          dir = 1;
          matrix.splice(col, 1);
        }
        break;
      case 1:
        let l = matrix[col].length - 1; // 最后一位的位置
        temp.push(matrix[col][l]);
        matrix[col].splice(l, 1);
        if ((col + 1) >= matrix.length) dir = 2; else col++;
        break;
      case 2:
        let last = matrix[col].length - 1;
        temp.push(matrix[col][last]);
        matrix[col].splice(last, 1);
        if (matrix[col].length === 0) {
          dir = 3;
          matrix.splice(col, 1);
          col--;
        }
        break;
      case 3:
        temp.push(matrix[col][0]);
        matrix[col].splice(0, 1);
        if (col - 1 < 0) dir = 0; else col--;
        break;
    }
    len--;
  }
};
/**
 * @Author: Training
 * @desc 杨辉三角
 *    给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。
 *    在杨辉三角中，每个数是它左上方和右上方的数的和。
 *    图片演示地址: https://upload.wikimedia.org/wikipedia/commons/0/0d/PascalTriangleAnimated2.gif
 *    示例:输入: 5
 *    输出:[
 *          [1],
 *         [1,1],
 *        [1,2,1],
 *       [1,3,3,1],
 *      [1,4,6,4,1]
 *    ]
 * @think
 *
 */
export let generate = function (numRows) {
  if (numRows === 1) return [[1]];
  else if (numRows === 0) return [];
  let temp = [[1], [1, 1]];
  if (numRows === 2) return temp;
  for (let i = 2; i < numRows; i++) {
    temp[i] = [];
    temp[i][0] = 1;
    temp[i][i] = 1;
    let k = 1;
    for (let j = 0, len = temp[i - 1].length - 1; j < len; j++) {
      temp[i][k] = temp[i - 1][j] + temp[i - 1][j + 1];
      k++;
    }
  }
  return temp;
};
/**
 * @Author: Training
 * @desc 二进制求和
 *    给定两个二进制字符串，返回他们的和（用二进制表示）。
 *    输入为非空字符串且只包含数字 1 和 0。
 *    示例 1:
 *      输入: a = "11", b = "1"
 *      输出: "100"
 * @think
 *
 *  注意: 不能使用js的进制转换来获取结果
 *    太大的二进制转为十进制后会溢出
 *    导致结果不正确
 */
export let addBinary = function (a, b) {
  let a_len = a.length,
    b_len = b.length,
    jin = 0,
    temp = "";
  while (a_len - 1 >= 0 || b_len - 1 >= 0) {
    let _a = a[a_len-1]?parseInt(a[a_len-1]):0,
      _b = b[b_len-1]?parseInt(b[b_len-1]):0,
      sum = _a + _b + jin,
      mo = (sum) % 2;
    jin = Math.floor((sum) / 2);
    temp = `${mo}` + temp;
    if (a_len>b_len && b_len < 0 && jin === 0){
      temp = a.slice(0,a_len-1)+temp;
      a_len = -1
    }else if(a_len<b_len && a_len < 0&& jin === 0){
      temp = b.slice(0,b_len-1)+temp;
      b_len = -1
    }
    a_len--;
    b_len--;
  }
  if (jin === 1) temp = jin + temp;
  return temp;
};
/**
 * @Author: Training
 * @desc 实现strStr()
 *    给定一个 haystack 字符串和一个 needle 字符串，
 *    在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。
 *    如果不存在，则返回  -1。
 *
 *    与indexOf 功能一样
 * @think
 *    使用递归
 *
 */
export let strStr = function(haystack, needle) {
  if(needle.length<=0)return 0;
  let p = 0,
    len = needle.length;
  let loopStr = (str)=>{
    if(str.length<needle.length )return -1;
    if (str.slice(0, len) === needle) return p;
    else {
      p++;
      return loopStr(str.slice(1));
    }
  };
  return loopStr(haystack);
};
/**
 * @Author: Training
 * @desc 
 * @params 
 */