/***********************************************************数组类***********************************************************************/
//  基础方法
/**
 * @Author: Training
 * @desc 反转数组的指定范围
 * @params arr,start,end
 */
let reverse = (arr, start, end) => {
  let tem;
  while (start < end) {
    tem = arr[start];
    arr[start] = arr[end];
    arr[end] = tem;
    start++;
    end--;
  }
};

/**
 * @Author: Training
 * @desc 字符串分割
 * @params
 */
function slice(arr, start, end = arr.length) {
  let tem = "";
  while (start < end) {
    tem += arr[start];
    start++;
  }
  return tem;
}

/**
 * @Author: Training
 * @desc 数组拼接成字符串
 * @params
 */
function join(arr, flag = ",") {
  let tem = "";
  for (let i = 0, len = arr.length; i < len; i++) {
    if (i !== len - 1) {
      tem += arr[i] + flag;
    } else {
      tem += arr[i];
    }
  }
  return tem;
}

/**
 * @Author: Training
 * @desc 字符串分割成数组
 * @params
 */
function split(s, flag) {
  let len = s.length, i = 0, temp = [], str = "";
  if (flag !== "") {
    while (i < len) {
      if (s[i] === flag) {
        temp.push(str);
        str = "";
      } else str += s[i];
      i++;
    }
    temp.push(str);
  } else {
    while (i < len) {
      temp.push(s[i]);
      i++;
    }
  }
  return temp;
}

/**
 * @Author: Training
 * @desc removeRepet
 *    去重
 * @params
 */
function removeRepet(s, flag) {
  let i = 0, len = s.length, str = "";
  while (i < len) {
    if (s[i] === flag && s[i - 1] === flag) {
    } else str += s[i];
    i++;
  }
  return str;
}

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
  let temp = [[1], [1, 1]];
  switch (numRows) {
    case 0:
      return [];
    case 1:
      return [[1]];
    case 2:
      return temp;
    default:
      for (let i = 2; i < numRows; i++) {
        temp[i] = new Array();
        temp[i][0] = 1;
        temp[i][i] = 1;
        let k = 1;
        for (let j = 0, len = temp[i - 1].length - 1; j < len; j++) {
          temp[i][k] = temp[i - 1][j] + temp[i - 1][j + 1];
          k++;
        }
      }
      return temp;
  }
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
    let _a = a[a_len - 1] ? parseInt(a[a_len - 1]) : 0,
      _b = b[b_len - 1] ? parseInt(b[b_len - 1]) : 0,
      sum = _a + _b + jin,
      mo = (sum) % 2;
    jin = Math.floor((sum) / 2);
    temp = `${mo}` + temp;
    if (a_len > b_len && b_len < 0 && jin === 0) {
      temp = a.slice(0, a_len - 1) + temp;
      a_len = -1
    } else if (a_len < b_len && a_len < 0 && jin === 0) {
      temp = b.slice(0, b_len - 1) + temp;
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
export let strStr = function (haystack, needle) {
  if (needle.length <= 0) return 0;
  let p = 0,
    len = needle.length;
  let loopStr = (str) => {
    if (str.length < needle.length) return -1;
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
 * @desc  最长公共前缀
 *    编写一个函数来查找字符串数组中的最长公共前缀。
 *    如果不存在公共前缀，返回空字符串 ""。
 *
 *    示例 1:
 *      输入: ["flower","flow","flight"]
 *      输出: "fl"
 * @think
 *    试试贪婪算法?
 */
export let longestCommonPrefix = function (strs) {
  if (strs.length < 1) return "";
  else if (strs.length === 1) return strs[0];
  let temp = strs[0];
  let tem = temp;
  for (let i = 1, len = strs.length; i < len; i++) {
    let min = 0;
    let max = temp.length;
    if (temp[0] !== strs[i][0]) return "";
    if (strs[i].slice(0, temp.length) !== temp) {
      let isComm = temp.slice(0, Math.ceil(max / 2));
      let strsLen = strs[i].length;
      while (true) {
        if (temp.length > strsLen) {
          if (temp.slice(0, strsLen) === strs[i]) {
            temp = strs[i];
            break;
          } else {
            temp = temp.slice(0, strsLen);
            max = strs[i].length;
            isComm = temp.slice(0, Math.ceil(max / 2));
          }
        } else {
          if (temp === strs[i].slice(0, temp.length)) {
            break;
          } else if (isComm === strs[i].slice(0, isComm.length)) {
            min = isComm.length;
            max = Math.ceil(max * 0.75);
            if (min >= max) {
              if (tem.length > 0 && tem.slice(0, max + 1) === strs[i].slice(0, max + 1)) {
                temp = tem.slice(0, max + 1);
              } else {
                temp = isComm;
                isComm = temp.slice(0, max + 1)
              }
              tem = temp;
              break;
            } else {
              max = Math.ceil(isComm.length);
            }
          } else {
            max = Math.ceil(isComm.length);
            isComm = temp.slice(0, Math.ceil(max / 2));
            console.log(min, max, temp, tem, isComm);
          }
        }
      }
    }
  }
  return temp;
};
/**
 * @Author: Training
 * @desc 数组拆分 I
 *    给定长度为 2n 的数组,
 *    你的任务是将这些数分成 n 对,
 *    例如 (a1, b1), (a2, b2), ..., (an, bn) ，
 *    使得从1 到 n 的 min(ai, bi) 总和最大。
 *    题意:  最开始没看懂
 *        意思就是,给定一个数组,长度为2n,也就是偶数!
 *        然后将数分组,
 *        首先每两个一组
 *        每组最小的相加
 *        看怎样分组得出的和最大,
 *        得出的最大的值是对少
 * @think
 *    为了使得得出的值最大,
 *    则较小的值不要比较大的值小太多,
 *    保证每组较小与较大的值接近,
 *    才能保证最终的值最大
 *    可以使用排序法,来保证每组数之间的差值最小
 */
export let arrayPairSum = function (nums) {
  nums = nums.sort((a, b) => a - b);
  let i = 0;
  let j = nums.length - 1;
  // let group = [];
  let count = 0;
  while (j > i) {
    // group[i/2] = [nums[i],nums[i+1]];
    // group[((j-1)/2)] = [nums[j-1],nums[j]];
    count += nums[i] + nums[j - 1];
    if (j - 1 === i) {
      count -= nums[j - 1];
    }
    i += 2;
    j -= 2;
  }
  return count;
};
/**
 * @Author: Training
 * @desc
 *    给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。
 *    函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。
 *    说明:
 *      返回的下标值（index1 和 index2）不是从零开始的。
 *      你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。
 *    示例:
 *      输入: numbers = [2, 7, 11, 15], target = 9
 *      输出: [1,2]
 *      解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
 * @params
 */
export let twoSum = function (numbers, target) {
  let len = numbers.length;
  if (numbers[0] > target) return [];
  for (let i = 0; i < len; i++) {
    for (let j = len - 1; j > i; j--) {
      if (numbers[i] + numbers[j] === target) {
        return [i + 1, j + 1]
      } else if (numbers[j] < target - numbers[i]) {
        break;
      }
    }
  }
  return [];
};
/**
 * @Author: Training
 * @desc 移除元素
 *    给定一个数组 nums 和一个值 val，你需要原地移除所有数值等于 val 的元素，返回移除后数组的新长度。
 *    不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。
 *    元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
 *    示例:
 *      给定 nums = [3,2,2,3], val = 3,
 *      函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。
 *      你不需要考虑数组中超出新长度后面的元素。
 * @think
 *    方法一:
 *        使用单指针,使用js数组内置函数splice删除元素
 *        如果当前指向的元素的值和val相同,则用splice去掉;
 *    方法二:
 *        双指针 ,通过for循环数组内所有的元素,如果当前指向的元素不和val元素相同
 *        慢指针指向的值就是被赋值为当前指针指向的值,然后慢指针+1:
 *        如:  慢指针i == 0;当前指针j == 0; val值是3  当前值:nums[j] = 2;  当前值不等于val,则nums[i] = nums[j](nums[0] = nums[0]);  i++;(for中的j++)
 *            慢指针i == 1; 当前指针j == 1;val 值是3;; 当前值nums[j] = 3; 当前值等于val,则不作任何操作,j正常+1
 *            慢指针i == 1;当前指针j == 2;val值是3;  当前值是nums[j] = 1;当前值不等于val,则 则nums[i] = nums[j](nums[1] = nums[2]);i++  for中j++;
 *       按照此方法来,与val相同的值会被替换,因为不需要考虑数组中超出新长度后面的元素。所以后面的值不管,返回心得长度i就好了;
 *   方法三:
 *      双指针: 因为元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
 *      快指针指向元素当前位置,慢指针指向元素最后位置
 *      所以,当前指针如果等于val的话,与最后的值交换位置即可,因为最后一个值一定是假值,所以慢指针-1;就不用再管最后一个值了,
 *      如果不同时,当前指针才向后指(因为不能保证最后一位一定不与val不同,所以交换后,
 *      还得和最后一位进行比较,此时的最后一位(慢指针指向的位置)已经向前移动了一位,所以可以继续做判断)
 *
 *
 *
 *   看不懂解释的时候看代码  |^v^|
 */
export let removeElement = function (nums, val) {
  let i = 0,
    len = nums.length;
  //方法一:
  while (1) {
    if (nums[i] === val) nums.splice(i, 1);
    else i++;
    if (i >= nums.length) break;
  }
  return nums.length;
  //方法二:
  for (let j = 0; j < len; j++) {
    if (nums[j] !== val) {
      nums[i] = nums[j];
      i++
    }
  }
  return i;
  //方法三:
  while (i < len) {
    if (nums[i] === val) {
      nums[i] = nums[len - 1];
      len--;
    } else {
      i++
    }
  }
  return len;
};
/**
 * @Author: Training
 * @desc
 *    找到二进制数组nums中连续1出现的最多的个数
 * @param nums
 * @returns {number}
 */
export let findMaxConsecutiveOnes = function (nums) {
  //方法一:
  let newNums = nums.join('').split("0");
  let maxLen = 0;
  for (let i = 0, len = newNums.length; i < len; i++) {
    if (newNums[i].length > maxLen) maxLen = newNums[i].length;
  }
  return maxLen;
};
/**
 * @Author: Training
 * @desc  给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。(引用类型,直接改变nums)
 *      示例 1:
 *        输入: [1,2,3,4,5,6,7] 和 k = 3
 *        输出: [5,6,7,1,2,3,4]
 *      解释:
 *        向右旋转 1 步: [7,1,2,3,4,5,6]
 *        向右旋转 2 步: [6,7,1,2,3,4,5]
 *        向右旋转 3 步: [5,6,7,1,2,3,4]
 *
 *      来源：力扣（LeetCode）
 *      链接：https://leetcode-cn.com/problems/rotate-array
 * @params
 */
export let rotate = function (nums, k) {
  /**方法一: 移动最后一位到前面来+
   *  空间复杂度: O(1)
   *  时间复杂度: O(k*n)
   * **/
  // let len = nums.length;
  // if (k === 0 || len === 1) return nums;
  // let temp ;
  // for (let j = 0; j < k; j++) {
  //   for (let i = len - 1; i >= 0; i--) {
  //     if (i === len-1){
  //       temp = nums[i];
  //       nums[i] = nums[i-1];
  //     }else if(i === 0){
  //       nums[0] = temp;
  //     }else{
  //       nums[i] = nums[i-1];
  //     }
  //   }
  // }
  /**方法二: 反转
   * 时间复杂度: O(3n)   == O(n)
   * 空间复杂度: O(1)
   *    思路: 看数据:
   *        如: nums = [0,1,2,3,4,5,6,7,8,9,10] k = 5
   *            p = 5%nums.length == 5;  需求结果: [6,7,8,9,10,1,2,3,4,5]
   *            反转全部数据 nums = [10,9,8,7,6,5,4,3,2,1]
   *            反转指定位置数据 nums =[6,7,8,9,10,5,4,3,2,1]
   *            反转剩余位置数据  nums = [6,7,8,9,10,1,2,3,4,5]
   * **/
  let len = nums.length,
    p = k % len;
  reverse(nums, 0, len - 1);
  reverse(nums, 0, p - 1);
  reverse(nums, p, len - 1);

};
/**
 * @Author: Training
 * @desc
 * @params
 */
export let reverseWords = function (s) {
  // 方法一: 使用js内置函数和正则表达式
  s = s.replace(/\s+/g, " ").replace(/^\s/, "").replace(/\s$/, "");
  // let tem = s.split(" ").reverse();
  //方法二  自己实现split,rever,join
  let tem = split(s, " ");
  reverse(tem, 0, tem.length - 1);
  return (join(tem, " "));
};
/**
 * @Author: Training
 * @desc 反转字符串中的单词 III
 *   给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。
 *   在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。
 *    示例:
 *      输入: "Let's take LeetCode contest"
 *      输出: "s'teL ekat edoCteeL tsetnoc"
 * @params
 */
export let reverseWords_3 = function (s) {
  s = s.replace(/\s+/g, " ").replace(/^\s/, "").replace(/\s$/, "");
  /* let temp = split(s," ");
   for (let i = 0, len = temp.length; i < len; i++) {
     temp[i] = temp[i].split("");
     reverse(temp[i],0,temp[i].length-1);
     temp[i] = join(temp[i],"");
   }
   return join(temp," ")*/
  let temp = "";
  let str = "";
  for (let i = 0, len = s.length; i < len; i++) {
    if (s[i] === " " && s[i - 1] && s[i - 1] !== " ") {
      temp = temp + " " + str;
      str = "";
    } else if (s[i] !== " ") {
      str = s[i] + str;
    }
  }
  temp += (" " + str)
  return temp;
};
/**
 * @Author: Training
 * @desc 数组排序
 *    给定一个整数数组 nums，将该数组升序排列。
 *    示例 1：
 *    输入：[5,2,3,1]
 *    输出：[1,2,3,5]
 * @think
 *  1. 冒泡排序:  从左到右遍历,每两个比较,大的后移
 *  2. 选择排序:  从左到右遍历,如果有比当前元素小的,交换位置
 */
export let sortArray = function (nums) {
  // 冒泡排序
  /*let len = nums.length, i = len - 1, modify = false;
  for (i; i >= 0; i--) {                          // O(n)
    modify = false;
    for (let p = 0; p < i; p++) {                 //O(n)
      if (nums[p] > nums[p + 1]) {
        let tem = nums[p];
        nums[p] = nums[p+1];
        nums[p+1] = tem;
        modify = true;
      }
    }
    if (modify === false) i = -1;
  }*/
  // 选择排序
  let len = nums.length,p = 0;
  for (let i = 0; i < len-1; i++) {
    p = i;
    for (let j = i + 1; j < len; j++)
      if (nums[j] < nums[p]) p = j;
    if (p !== i) {
      let tem = nums[i];
      nums[i] = nums[p];
      nums[p] = tem;
    }
  }
  return nums;
};
/**
 * @Author: Training
 * @desc 最大间距
 *    给定一个无序的数组，找出数组在排序之后，相邻元素之间最大的差值。
 *    如果数组元素个数小于 2，则返回 0。
 *    示例 1:
 *      输入: [3,6,9,1]
 *      输出: 3
 *      解释: 排序后的数组是 [1,3,6,9], 其中相邻元素 (3,6) 和 (6,9) 之间都存在最大差值 3。
 *
 *      来源：力扣（LeetCode）
 *      链接：https://leetcode-cn.com/problems/maximum-gap
 * @think
 *    首先得排序
 *    在排序过程中计算当前元素与前一个元素的差值,找到最大的差值
 */
export let maximumGap = function(nums) {
  let len = nums.length,p = 0,max = 0;
  if (len < 2) return 0;
  for (let i = 0; i < len; i++) {
    p = i;
    for (let j = i + 1; j < len; j++)
      if (nums[j] < nums[p]) p = j;
    if (p !== i) {
      let tem = nums[i];
      nums[i] = nums[p];
      nums[p] = tem;
    }
    if (i > 0) {
      let c = nums[i] - nums[i-1];
      max = max<c?c:max;
    }
  }
  // 使用js自带排序
  // let len = nums.length,max = 0;
  // if (len < 2) return 0;
  // nums.sort((a, b) => a - b)
  // for(let i = 1;i<len;i++){
  //   max = max<nums[i]-nums[i-1]?nums[i]-nums[i-1]:max;
  // }
  return max;
};
/**
 * @Author: Training
 * @desc 按奇偶排序数组 II
 *    给定一个非负整数数组 A， A 中一半整数是奇数，一半整数是偶数。
 *    对数组进行排序，以便当 A[i] 为奇数时，i 也是奇数；当 A[i] 为偶数时， i 也是偶数。
 *    你可以返回任何满足上述条件的数组作为答案。
 *    示例：
 *      输入：[4,2,5,7]
 *      输出：[4,5,2,7]
 *      解释：[4,7,2,5]，[2,5,4,7]，[2,7,4,5] 也会被接受。
 * @params
 */
export let sortArrayByParityII = function(A) {
  let len = A.length,tem = new Array(len),e = 0, o = 1;
  for (let i = 0; i < len; i++) {
    if (A[i] % 2 === 0) {
      tem[e] = A[i]
      e+=2;
    }else{
      tem[o] = A[i]
      o+=2;
    }
  }
  return tem;
};
/**
 * @Author: Training
 * @desc  数组中的第K个最大元素
 *    在未排序的数组中找到第 k 个最大的元素。
 *    请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 *    示例:
 *      输入: [3,2,1,5,6,4] 和 k = 2
 *      输出: 5
 *      解释: 排序后[1,2,3,4,5,6]  第一个最大元素: 6   第二个最大元素: 5
 * @params
 */
export let findKthLargest = function(nums, k) {
  let len = nums.length,tem,p;
  for (let i = len-1; i >= 0; i--) {
    p = i;
    k--;
    for (let j = i; j >= 0; j--) {
      if (nums[j] > nums[p]) p = j;
    }
    if (i !== p) {
      tem = nums[i];
      nums[i] = nums[p];
      nums[p] = tem;
    }
    if (k === 0) return nums[i];
  }
};
/**
 * @Author: Training
 * @desc 缺失的第一个正数
 *    给定一个未排序的整数数组，找出其中没有出现的最小的正整数。
 *    示例 1:
 *      输入: [1,2,0]
 *      输出: 3
 *    示例 2:
 *      输入: [3,4,-1,1]
 *      输出: 2
 * @think
 *      方法一: 借鉴的LeetCode上的思路,时间复杂度O(n) 空间复杂度O(1)
 *      首先,缺失的第一个正数一定不可能是小于0的数,
 *           然后,也不可能是大于数组长度的数
 *           所以就排除了这两个!
 *           然后用hash表的方式来进行映射(以下标映射值)
 *
 *           注: 分析数据test = [-1,0,1,2,3]
 *
 *      方法二:   时间复杂度O(n2) 空间复杂度O(1)
 *          先过滤掉小于1的数据
 *          然后从小到大排序
 *          判断排序后的第一个元素是否为1  如果不是 直接返回1
 *          如果是 则遍历每一个元素,判断后一个元素与当前元素的差值是否大于1
 *          如果是 则返回当前元素的值+1
 *          如果一直遍历完都没有返回数据,说明前面数据都是连续的,
 *          直接返回最后一个数据值加1
 */
export let firstMissingPositive = function(nums) {
  let len = nums.length,p = 0,tem = [0];  // 变量定义
  // p这个变量保存等于1的数的个数!
  // 第一步 :  遍历出数组中所以等于1的数,并将小于1的数赋值为1
  // 经过此次循环 test = [1,1,1,2,3]
  for (let i = 0;i<len;i++){
    if (nums[i] === 1) p++;   // 判断当前下标值是是否等于1   如果是: 则p+1
    else if(nums[i]<1) nums[i] = 1;// 若 当前值小于1  则将当前值赋值为1  但是p不变(p计算的是原值,并非更改值)
  }
  // 如果p的值依旧等于1  表示数组中没有等于1的数,则直接返回1 (1是最小的正整数)
  if (p === 0)return 1;
  // 如果数组长度等于1 而且执行到这里,说明这个唯一的值就是1 所以返回2
  if (len === 1) return 2;
  // 当len>1 并且数组中有1的情况下 则会向下执行至此
  // 第二步: 循环遍历,将大于0且小于等于数组长度的值放进新数组对应的位置
  // 如: 当前值为1,则放入下标1中  形成hash对照表
  // 此表以数组tem形式表示: 因为不可能有数据0  所以tem的第0个数据初始化放置一个0
  // 用test分析  tem = [0,1,2,3]
  for (let i = 0; i < len; i++) {
    if (nums[i] > 0 && nums[i] <= len) {
      tem[nums[i]] = nums[i];
    }
  }
  // 第三步: 判断tem中的数据是否出现在对应的位置
  // 此时tem = [0,1,2,3]  首先进行的四次判断肯定是成立的,但是test值并非只有四个,一共有五个值,所以当进行到最后一个的时候,
  // tem[4] === empty  而不等于4  所以会返回当前下标i  所以最终答案是4;
  for (let i = 0; i < len; i++) {
    if (tem[i]!==i) {
      return i;
    }
  }
  // 如果执行到了这里,说明上面的情况都不符合,比如[1,2,3,4,5,6] or [1,2,3,4,5,7]
  // 经过第一步不会发生任何变化,经过第二步,tem的值是[0,1,2,3,4,5,6] or [0,1,2,3,4,5]
  // 而第三步的检测只会检测到5,然后执行最后一种可能,将hash值的最后一位+1 就变成了: 7 or 6(这就是最终值)
    return tem[tem.length-1]+1;
};
/**
 * @Author: Training
 * @desc 复原IP地址
 *    给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。
 *    示例:
 *
 *      输入: "25525511135"
 *      输出: ["255.255.11.135", "255.255.111.35"]
 * @think 借鉴的别人的方法进行了稍微的修改(递归)
 *  1.首先判断字符串长度,如果大于12,那肯定不是一个ip地址应有的长度
 *  2. 判断ip地址的每一位的有效性
 *  - ip地址不能是0开头
 *  - IP地址可以为0
 *  - IP地址的值不能大于255
 *  - 每一段ip地址最多只能有3位数字
 *  3.开始做递归
 *  -首先是递归的边界,当当前获得的数组长度是4并且数组转字符串与原字符串相同的时候,则表示匹配到了正确的值了
 *  -如果没到边界,进行循环,将当前的值前三位进行一个一个的匹配,如前三个是: 123 则匹配1,12,123,当满足有效性的条件时,再对接下来的数据进行递归遍历
 */
export let restoreIpAddresses = (s)=> {
  if (s.length > 12) return [];
  let r = [];
  let valid = (str)=>{
    if (str.length > 3) return false;
    return str.substring(0,1) !== "0"?str<256:str.length === 1;
  }
  let setDot = (cur,sub)=>{
    if (cur.length === 4 && cur.join("") == s) {
      r.push(cur.join("."));
    }else{
      for (let i = 0, len = Math.min(3, sub.length), tem; i < len; i++){
        tem = sub.substring(0,i+1);
        if (valid(tem)) {

          setDot(cur.concat(tem),sub.substring(i+1))
        }
      }
    }
  };
  setDot([],s);
  return r;
};
/**
 * @Author: Training
 * @desc 串联所有单词的子串
 *    给定一个字符串 s 和一些长度相同的单词 words。
 *    找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。
 *    注意子串要与 words 中的单词完全匹配，
 *    中间不能有其他字符，但不需要考虑 words 中单词串联的顺序。
 *    来源：力扣（LeetCode）
 *    链接：https://leetcode-cn.com/problems/substring-with-concatenation-of-all-words
 *    示例:
 *      输入：
 *      s = "barfoothefoobarman",
 *      words = ["foo","bar"]
 *      输出：[0,9]
 *      解释：
 *      从索引 0 和 9 开始的子串分别是 "barfoor" 和 "foobar" 。
 *      顺序不重要, [9,0] 也是有效答案。
 *
 * @think
 *    利用hash表的方式解决,时间复杂度O(n^2)
 *    通过移动窗口将每一种可能遍历出来
 *
 */
export let findSubstring = function(s, words) {
  let len = s.length,  // 字符串长度
    wordLen =  words.length;  // 子串的个数
  if(!len||!wordLen||wordLen>len){console.log([]);return [];}
  let subLen = words[0].length, // 单个子串的长度 题目说明子串长度相同
    wLen = wordLen*subLen, // 子串总长度: 因为子串是相同长度的,所以可以这么用
    position = [];

  for (let i = len,tem,j,isT,k,hash_tem; i >=wLen; i--) { // 向下计数的方式把符合长度的全部获取到
    isT = true;                                           // 默认此此计算为真
    // if (wLen > i) break;
    tem = s.slice(i - wLen,i);                            // 截取字符串
    hash_tem = [];                                        // hash表的方式保存数据
    for(j = 0;j<wLen;j+=subLen){                          // 获取对应子串长度的字符串,由于子串长度相同,不会出现分开排列的方式,所以将当前的字符串分成n个对应子串长度的字符串
      hash_tem[tem.slice(j,subLen+j)] = hash_tem[tem.slice(j,subLen+j)]?hash_tem[tem.slice(j,subLen+j)]+1:1; // 将当前的字符串作为key保存到json中,值使用数字1 ,若有重复的,则当前值+1
    }
    for( k = 0;k<wordLen;k++){                            // 遍历每一个子串,看看是否在hash表中存在,每次对比,对应的key的值就会-1  如果为0了,但是words中还存在该子串,说明该子串在hash表中不存在了
      if (!hash_tem[words[k]]) {                          // 每一个子串是一个独立的元素,有重复的也是独立的,当子串作为的key为undefined 或者0的时候,说明此子串在"截取字符串"中不存在或者已经被匹配完了
        isT = false;                                      // 子串不存在,那么此次计算则为假
        break;                                            // 直接跳出循环,优化算法
      }
      hash_tem[words[k]]--;                               // 如果为真,那么当前匹配子串的数量值-1,因为当前的子串已经被匹配过了,下一次如果有相同的子串,再来匹配
    }                                                     // (可以这么想,虽然子串是一样的,但是却是两个不同的对象,就像双胞胎一样,虽然长得一样,当实实在在的就是两个人)
    if (isT) position.push(i-wLen);                       // 如果此次计算为真的话,将此字符串的首下标值加入到数据position中
  }
  console.log(position,"position");
};
/******************************************************数据结构 队列 和 栈 *******************************************************************/
/**
 * @Author: Training
 * @desc 棒球比赛
 *    你现在是棒球比赛记录员。
 *    给定一个字符串列表，每个字符串可以是以下四种类型之一：
 *    1.整数（一轮的得分）：直接表示您在本轮中获得的积分数。
 *    2. "+"（一轮的得分）：表示本轮获得的得分是前两轮有效 回合得分的总和。
 *    3. "D"（一轮的得分）：表示本轮获得的得分是前一轮有效 回合得分的两倍。
 *    4. "C"（一个操作，这不是一个回合的分数）：表示您获得的最后一个有效 回合的分数是无效的，应该被移除。
 *
 *    每一轮的操作都是永久性的，可能会对前一轮和后一轮产生影响。
 *    你需要返回你在所有回合中得分的总和。
 *
 *    来源：力扣（LeetCode）
 *    链接：https://leetcode-cn.com/problems/baseball-game
 * @think  以数据结构栈的方式进行运算
 */
export let calPoints = function(ops) {
  let count = 0,tem = [],prev1,prev2;
  for(let i = 0,len = ops.length;i<len;i++){
    switch(ops[i]){
      case "C":
        tem.pop(); //出栈
        break;
      case "D":
        prev1 = tem.pop();// 出栈
        tem.push(prev1,prev1*2);// 入栈
        break;
      case "+":
        prev1 = parseInt(tem.pop());// 出栈
        prev2 = parseInt(tem.pop());// 出栈
        tem.push(prev2,prev1,prev1+prev2);// 入栈
        break;
      default:
        tem.push(parseInt(ops[i]));// 入栈
    }
  }
  return tem.reduce((t,n)=>t+n);//计算最终结果
};
/**
 * @Author: Training
 * @desc 最大矩形
 *  给定一个仅包含 0 和 1 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。
 *    示例:
 *
 *    输入:
 *    [
 *    ["1","0","1","0","0"],
 *    ["1","0","1","1","1"],
 *    ["1","1","1","1","1"],
 *    ["1","0","0","1","0"]
 *    ]
 *    输出: 6
 *
 *    来源：力扣（LeetCode）
 *    链接：https://leetcode-cn.com/problems/maximal-rectangle
 * @think   首先将数组转换成柱状图的形式
 *    如示例:
 *     [
 *       [ 1, 0, 1, 0, 0 ],
 *       [ 2, 0, 2, 1, 1 ],
 *       [ 3, 1, 3, 2, 2 ],
 *       [ 4, 0, 0, 3, 0 ]
 *     ]
 *     每一行都是一个柱状图,然后按柱状图的解法来
 *     自己的图解:  ./images/柱状图中的最大矩形.png
 *     或者参考LeetCode 第 84 题
 *
 */
Array.prototype.peek = function () {    // 给Array新增一个方法:  查询数组中的最后一个元素的值( pop 是弹出最后一个元素,会改变数组,这个函数只是查看最后一个元素,不会对数组做出改变)
  let len = this.length;
  return this[len-1];
};
export let maximalRectangle = function(matrix) {
  let stack = [],maxarea = 0;  // 定义栈和最大面积的变量
  for (let i = 0, len = matrix.length; i < len; i++) {        // 将数组变成柱形图
    for (let j = 0, jlen = matrix[i].length; j < jlen; j++) {
      if (i === 0 || matrix[i][j] === "0") {
        matrix[i][j] = parseInt(matrix[i][j]);
      }else if (matrix[i][j] === "1") {
        matrix[i][j] = matrix[i-1][j]+1
      }
    }
  }
  /** 下面这个解法 可用于LeetCode 84题   : 柱状图中最大的矩形*/
  matrix.forEach(item=>{ // 对柱形图数组进行遍历  下面的代码看图 ...
    stack = [-1];
    let  len = item.length;
    for (let i = 0; i < len; i++) {
      while (stack.peek() !== -1 && item[i]<item[stack.peek()]){
        maxarea = Math.max(maxarea,item[stack.pop()]*(i - stack.peek() - 1));
      }
      stack.push(i);
    }
    while (stack.peek() !== -1){
      maxarea = Math.max(maxarea,item[stack.pop()]*((len) - stack.peek() - 1));
    }
  });
  return maxarea;
};
/**
 * @Author: Training
 * @desc 设计循环队列
 *    设计你的循环队列实现。
 *    循环队列是一种线性数据结构，其操作表现基于 FIFO（先进先出）原则并且队尾被连接在队首之后以形成一个循环。
 *    它也被称为“环形缓冲器”。
 *    循环队列的一个好处是我们可以利用这个队列之前用过的空间。
 *    在一个普通队列里，一旦一个队列满了，我们就不能插入下一个元素，即使在队列前面仍有空间。
 *    但是使用循环队列，我们能使用这些空间去存储新的值。
 *    你的实现应该支持如下操作：
 *
 *    MyCircularQueue(k): 构造器，设置队列长度为 k 。
 *    Front: 从队首获取元素。如果队列为空，返回 -1 。
 *    Rear: 获取队尾元素。如果队列为空，返回 -1 。
 *    enQueue(value): 向循环队列插入一个元素。如果成功插入则返回真
 *     deQueue(): 从循环队列中删除一个元素。如果成功删除则返回真。
 *     isEmpty(): 检查循环队列是否为空。
 *     isFull(): 检查循环队列是否已满。
 * @params
 */
/** 构造器 设置队列长度为k */
let MyCircularQueue = function (k) {
  this.len = k;
  this.empty = true;
  this.useLen = 0;
  this.queue = new Array(k);
  this.head = -1;
  this.end = -1;
};
/**
 * @desc Front: 从队首获取元素。如果队列为空，返回 -1 。
 * @return {number}
 */
MyCircularQueue.prototype.Front = function () {
  if (this.empty) return -1;
  else return this.queue[this.head];
};
/**
 * @desc  Rear: 获取队尾元素。如果队列为空，返回 -1 。
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function () {
  if (this.empty) return -1;
  else return this.queue[this.end];
};
/**
 * @desc 向循环队列插入一个元素。如果成功插入则返回真
 * @param value
 * @returns {boolean}
 */
MyCircularQueue.prototype.enQueue = function (value) {
  if (value === undefined) return false;
  if (this.len > this.useLen) {
    this.useLen++;
    this.end ++;
    if (this.head === -1){
      this.head ++;
    }else if (this.head > 0 && this.end === this.len) {
      this.end = 0;
    }
    this.queue[this.end] = value;
    if (this.empty)this.empty = false;
    return true;
  }else{
    return false;
  }
};
/**
 * @desc 从循环队列中删除一个元素。如果成功删除则返回真。
 * @returns {boolean}
 */
MyCircularQueue.prototype.deQueue = function () {
  if (this.useLen > 0) {
    this.queue[this.head] = "";
    this.head ++;
    this.useLen --;
    if (this.head === this.len && this.useLen) {
      this.head = 0;
    }
    if (this.useLen === 0) this.empty = true;
    return true;
  }else {
    return false;
  }
};
/**
 * @desc  队列是否为空
 * @returns {boolean}
 */
MyCircularQueue.prototype.isEmpty = function(){
  return this.empty
};
/**
 * @desc 队列是否已满
 * @returns {boolean}
 */
MyCircularQueue.prototype.isFull = function(){
  if (this.useLen === this.len) return true;
  return false;
}
/**
 * @Author: Training
 * @desc 任务调度器
 *
 *    给定一个用字符数组表示的 CPU 需要执行的任务列表。
 *    其中包含使用大写的 A - Z 字母表示的26 种不同种类的任务。
 *    任务可以以任意顺序执行，并且每个任务都可以在 1 个单位时间内执行完。
 *    CPU 在任何一个单位时间内都可以执行一个任务，或者在待命状态。
 *
 *    然而，两个相同种类的任务之间必须有长度为 n 的冷却时间，
 *    因此至少有连续 n 个单位时间内 CPU 在执行不同的任务，或者在待命状态。
 *
 *    你需要计算完成所有任务所需要的最短时间。
 *
 *    来源：力扣（LeetCode）
 *    链接：https://leetcode-cn.com/problems/task-scheduler
 *
 *    示例1:
 *    输入: tasks = ["A","A","A","B","B","B"], n = 2
 *    输出: 8
 *    执行顺序: A -> B -> (待命) -> A -> B -> (待命) -> A -> B.
 *
 *    示例 2
 *    输入: tasks = ["A","A","A","B","B","C","D"],n = 3
 *    输出: 9
 *    执行顺序: A->B->C->D->A->B->(待命)->(待命)->A
 *
 *    示例 3
 *    输入: tasks = ["A","A","A","B","B","B","C","C","D","D"],n = 3
 *    输出: 10
 *    执行顺序: A->B->C->D->A->B->C->D->A->B
 *
 *    示例 4
 *    输入: tasks = ["A","A","A","A","B","B","C","D","D","D"],n = 3
 *    输出: 13
 *    执行顺序: A->B->C->D->A->B->(等待)->D->A->(等待)->(等待)->D->A

 * @think
 *    使用规律:  最终执行时间和同种类任务最多的有关,比如示例3
 *      有四个A任务,那么它的执行时间  至少是(4-1)*(n+1)
 *      因为最后一个后面A任务后面可能没有任何任务,那么等待也就是没意义的 所以是4-1!
 *      每一个的间隔是3  那么是: ABCD  那么加上自身,每一段就是四个任务 所以是n+1
 *      直到最后,将最多的那个任务减去的1加上(如果最多的任务有多个,那么得加上最多任务的数量)
 *      如 例1: 经过前两轮的任务执行,A和B的数量都是最多的,那么最终留下的依旧会有A和B 所以得+2
 *      也就是加同类最多任务数的个数!
 *      最终公式: (max - 1)*(n+1)+(max_count);
 *                (最大同类任务数量- 1) * (间隔时间+1) + 最多任务的数量
 */
export let leastInterval = function(tasks, n) {
  let len = tasks.length;
  if (n === 0) return len;
  let max_count = 0,max = 0,tem = {};
  tasks.forEach(item=>{
    if (tem[item]) tem[item]++;
    else tem[item] = 1;
  })
  for (let key in tem) {
    if (max < tem[key]) {
      max = tem[key];
      max_count =  1;
    }else if ( max === tem[key] ){
      max_count ++;
    }
  }

  return Math.max((max-1)*(n+1)+max_count,len)
};
/**
 * @Author: Training
 * @desc 实现一个链表(单向链表)
 * @think 根据链表的特性实现一个链表
 */
/**
 * @desc 链表的元素的结构对象
 * @think 链表中有当前元素  和下一个指向元素
 *    在C中有指针可以指向下一个元素地址
 *    在js中 next元素就是下一个元素的引用地址
 */
let Node = function (val) {
  this.value = val;
  this.next = null;
}
/**
 * Initialize your data structure here.
 */
export let MyLinkedList = function() {
  this.head = null;
  this.length = 0;
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
 * @desc foreach the  Linked List item
 */
MyLinkedList.prototype.forEachList = function(callback){
  let link = this.head;
  for (let i = 0; i < this.length; i++) {
    callback(link,i);
    link = link.next;
  }
}
/**
 * @Author: Training
 * @desc 环形链表  环形链表II  相交链表
 * 题解代码在LeetCode上
 * @think
 * 1. 环形链表  判断链表中是否存在环形链表
 *      类似跑道奔跑比赛 ,两个人,一个跑得快,一个跑的慢
 *        如果是直线跑道,最终都会到达终点
 *        如果是环形跑道呢: 跑的快的人最终会在第二圈追到跑得慢的人!
 *        两人相遇,那么代表是环形跑道
 *      环形链表也是如此:
 *        设定一个快指针,一个慢指针,快指针每次跑1,慢指针每次跑2,
 *        当快指针追到了慢指针,也就是 快指针===慢指针的时候,说明是环形链表
 *        返回true;
 *        若是快指针达到了边界 也就是null的时候,说明就是普通链表
 *        返回false
 * 2. 环形链表II  找到环形链表的起始位置,
 *        环形链表可能是完全环形链表,末尾指针指向了头指针
 *        或者半环形链表,末尾指针指向了中间的某个地址
 *      拿生活中的例子举例, 比如马路上的圆盘,不考虑出去的情况
 *        当司机直线行驶到了圆盘,进入圆盘后,由于不考虑出去的情况,则会一直在圆盘循环
 *        计算的值就是进入圆盘的位置
 *      首先  判断链表是否是环形链表,若不是直接返回null,下面的步骤就省了
 *      若是环形链表,再加一个指针,记录相遇时候的值,然后,头指针和相遇指针一步一步的走,
 *      若是两指针相遇了,那么返回该对象,这里就是进入口!
 *      因为: k(快指针),m(慢指针)  k的速度是m的两倍,在一个相同长度的圆环内,若m刚好跑了一圈,
 *            那么k一定在此时刚好跑了两圈,并且相遇,
 *            若环形前有一段直线入口当m进入环形入口,k已经比m多跑了一倍的路程,就是2m,此时的m刚刚好与
 *            直线路程一样,所以k比m多跑了那一段直线的路程!当两者再次相遇,k奔跑的总路程是m的总路程的一倍,
 *            但是k在环形里奔跑的距离,出了速度上的一倍差距外,始终比m多一段直线的距离
 *            此时m距离出口的位置就是 那段直线的距离! --可以找示例证明
 *   3.   相交链表  判断两个链表相交的位置
 *      设: a链表和b链表
 *      算了: 不知道怎么表达了,看LeetCode解题吧!
 */
/**
 * @Author: Training
 * @desc 反转链表
 * @think  遍历链表
 *  获取上一个位置的值
 *  将当前位置的值的next指向上一个
 */
export let reverseList = function(head) {
  let prev = null,curr = head;
  // 以链表 1->2->3->4->5为例
  while(curr){               // 第一次循环                                 第二次循环:                  第三次:           ......
    let next = curr.next; // 保存当前链表的下一个  next = 2->3->4->5              next = 3->4->5        next = 4->5
    curr.next = prev;      // 当前值的下一个改为上一个的值 curr === (1->null)      curr = 2->1->null     curr = 3->2->1->null
    prev = curr;            // 上一个的值被赋值为当前链表 prev = (1->null)         prev = 2->1->null     prev = 3->2->1->null
    curr = next;            // 当前值更改为原链表自身下一个  curr = 2->3->4->5     curr = 3->4->5        curr = 4->5
  }
  console.log(prev);
  return prev;//最终prev的值就是原链表的反值
};
/**
 * @Author: Training
 * @desc 奇偶链表
 *    给定一个单链表，把所有的奇数节点和偶数节点分别排在一起。
 *    请注意，这里的奇数节点和偶数节点指的是节点编号的奇偶性，而不是节点的值的奇偶性。
 *
 *    请尝试使用原地算法完成。你的算法的空间复杂度应为 O(1)，时间复杂度应为 O(nodes)，nodes 为节点总数。
 *
 *    示例 1:
 *      输入: 1->2->3->4->5->NULL
 *      输出: 1->3->5->2->4->NULL
 *    示例 2:
 *      输入: 2->1->3->5->6->4->7->NULL
 *      输出: 2->3->6->7->1->5->4->NULL
 * @params
 */
export let oddEvenList = function(Node) {
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

  //我的解题

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
/**
 * @Author: Training
 * @desc 冒泡排序
 * @think  从左到右进行排序,两两比较,将最大的移动到最右侧 
 */
export let bubsort=(arr)=>{
  let len = arr.length,temp,flag = false;
  for (let i = len;i>0;i--){
    flag = false;
    for (let j = 0;j<i;j++ ){
      if (arr[j] < arr[j - 1]) {
        temp = arr[j];
        arr[j] = arr[j-1];
        arr[j-1] = temp;
        flag = true;
      }
    }
    if (!flag) break;
  }
  return arr;
};
/**
 * @Author: Training
 * @desc 插入排序
 * @think  未排序的元素与已排序的元素一一对比,然后插入  https://visualgo.net/zh/sorting  看原理
 */
export let insSort = (arr)=>{
  let len = arr.length,temp;
  for (let i = 1; i < len; i++) {
    if (arr[i] < arr[i - 1])
      for (let j = i-1; j >= 0; j--) {
        if (arr[i]>=arr[j]){
          temp = arr[i];
          arr.splice(i,1);
          arr.splice(j+1,0,temp);
          break;
        }else if (j === 0){
          temp = arr[i];
          arr.splice(i,1);
          arr.unshift(temp);
        }
      }
  }
  return arr;
};
/**
 * @Author: Training
 * @desc 选择排序
 */
export let selsort = (nums)=>{
  let len = nums.length,p = 0;
  for (let i = 0; i < len-1; i++) {
    p = i;
    for (let j = i + 1; j < len; j++)
      if (nums[j] < nums[p]) p = j;
    if (p !== i) {
      let tem = nums[i];
      nums[i] = nums[p];
      nums[p] = tem;
    }
  }
  return nums;
}
/*******************************************************************************************
 * @Author: Training                                                                       *
 * @desc 归并排序                   演示地址: https://visualgo.net/zh                      *
 * @think 从中间分离,分别排序左侧与右侧数据 然后将左侧与右侧数据合并                       *
 *******************************************************************************************/
/**
 * @Author: Training
 * @desc 归并排序递归处理函数
 */
let sort = (arr,p,n)=>{
  let q = Math.floor((n+p)/2); // 找到中间位置
  if (p >= n) return;             // 当只有一个数的时候返回
  sort(arr,p,q);                   // 排序前半段
  sort(arr,q+1,n);             // 排序后半段
  merage(arr,p,q+1,n);       // 对已经排好的两段数据进行排序[操作原数组] ( 最终会到只有两个数据的时候进行排序 )
  // 递归很难理解   多刷题哟
}
/**
 * @Author: Training
 * @desc 对两端有序的数据进行分析
 * @think  就是一半一半的对比
 *
 *   排序方式:
 *   例1: arr = [1,0];
 *    获取左右两端的值进行对比:
 *      0     1
 *      ↓    ↓
 *      1     0
 *    arr[3,1,2,0]
 *    3,1    2,0
 *     ↓     ↓
 *    1,3    0,2
 *     ↓     ↓
 *      0,1,2,3
 *  例3:
 *      3,1,2
 *       3,1     2
 *        ↓    ↓
 *       1,3    2
 *        ↓    ↓
 *         1,2,3
 */
let merage = (arr,left,mid,right)=>{
  let leftArray = arr.slice(left,mid), // 找到前半段
    rightArray = arr.slice(mid,right+1),// 找到后半段
    i = 0,j = 0,l = left;
  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i] <= rightArray[j]){
      arr[l] = leftArray[i];
      i++;
    }else{
      arr[l] = rightArray[j];
      j++;
    }
    l++;
  }
  while (l <= left + right) {
    if (i < leftArray.length) {
      arr[l] = leftArray[i];
      i++;
    }else if (j < right.length) {
      arr[l] = rightArray[j];
      j++;
    }
    l++;
  }
};
/**
 * @Author: Training
 * @desc 归并排序入口函数
 */
export let merageSort = (nums)=>{
  let len = nums.length;
  sort(nums,0,len-1);
};
/******************************************************
 *                   归并排序结束                     *
 ******************************************************/
/**************************************************************************************************************
 * @Author: Training                                                                                          *
 * @desc                   快速排序        演示地址: https://visualgo.net/zh                                  *
 * @think 找到一个节点,然后做对比,小的排节点左侧,大的排右侧,依次排列,类似于归并,但却有差距                    *
 * 快速排序最大的鸡肋是:  对一组无序数据,排序非常快 时间复杂度: O(nlogn) 但是对有序数据... 那简直太慢了,      *
 * 和冒泡排序有的一拼,时间复杂度:O(n^2)                                                                       *
 **************************************************************************************************************/
export let sqSort = (nums)=>{
  sort_sq(nums,0,nums.length-1);
  return nums;
};
let sort_sq = (arr,start,end)=>{
  if (start >= end) return;
  let pivot = partition(arr,start,end);
  sort_sq(arr,start,pivot-1);
  sort_sq(arr,pivot+1,end);
};
/**
 * @Author: Training
 * @desc 通过调换位置,找到中间节点的位置 
 * @think
 *    
 */
let partition = (arr,start,end)=>{
  let pivot = arr[start];
  let i = end,temp;
  for (let j = end; j >=start; j--) {
    if (arr[j] > pivot) {
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
        i--;
    }
  }
  temp = arr[start];
  arr[start] = arr[i];
  arr[i] = temp;
  return i;
};
/**
 * @Author: Training
 * @desc 计数排序
 * @think  类似于hash  用hash的方式储存现有数据的个数,然后从小到大进行依次放置  时间复杂度: O(n)
 */
let cousort = (nums)=>{
  let len = nums.length,temp = [],min = 0;
  for (let i = 0; i < len; i++)
    if (nums[i] < min) min = nums[i];
  for (let i = 0; i < len; i++) {
    nums[i] = nums[i]+(-min);
    if (temp[nums[i]]) temp[nums[i]]++;
    else temp[nums[i]] = 1;
  }
  let j = 0;
  for (let i in temp){
    while (temp[i]) {
      nums[j] = parseInt(i)+min;
      temp[i]--;
      j++;
    }
  }
  return nums;
};
/**
 * @Author: Training
 * @desc 有序数组中,查找第一个值等于给定值的元素
 * @think   二分查找法
 */
export let searchFirstK = (nums,k)=>{
  let len = nums.length,min = 0,max = len-1,mid;
  while(max >= min){
    mid = min+((max-min)>>1);
    if (nums[mid] > k) {
      max = mid-1;
    }else if(nums[mid]<k){
      min = mid +1;
    }else{
      if (mid === 0 ||  nums[mid - 1] !== k) return mid;
      else max = mid -1;
    }
  }
};
/**
 * @Author: Training
 * @desc 有序数组中,查找最后一个值等于给定值的元素
 * @think 同样利用二分查找法,根据上面代码变形即可
 */
export let searchLastK = (nums,k)=>{
  let len = nums.length,min = 0,max = len-1,mid;
  while(max >= min){
    mid = min+((max-min)>>1);
    if (nums[mid] > k) max = mid-1;
    else if(nums[mid]<k) min = mid +1;
    else{
      if (mid === len-1 ||  nums[mid + 1] !== k) return mid;
      else min = mid +1;
    }
  }
};
/**
 * @Author: Training
 * @desc 有序数组中,查找第一个大于等于给定值的元素
 * @think 二分
 */
export let searchFirstGreaterEqualK = (nums,k)=>{
  let len = nums.length,min = 0,max = len-1,mid;
  while (max >= min) {
    mid = min + ((max-min)>>1);
    if (nums[mid] < k) {
      min = mid+1;
    }else{
      if (nums[mid - 1] < k || mid === 0) return mid;
      else max = mid-1;
    }
  }
};
/**
 * @Author: Training
 * @desc 有序数组中,查找最后一个小于等于给定值的元素
 * @think 二分
 */
export let searchLastLessEqualK = (nums,k)=>{
  let len = nums.length,max = len-1,min = 0,mid;
  while (max >= min) {
    mid = min+((max-min)>>1);
    if (nums[mid] > k) {
      max = mid-1;
    }else{
      if (mid === len - 1 || nums[mid + 1] > k) return mid;
      else min = mid +1;
    }
  }
};
/********************************************************************************************
 * @Author: Training                                                                        *
 * @desc hash表(散列表)                                                                     *
 * @think                                                                                   *
 *    hash表  通过key值快速查找到对应的内容,使用链表解决hash碰撞(在同一个空间内相同的key值) *
 *    hash表是使用的数组的方式实现,数组的随机访问快,在同一个位置或许会有多个不同的数据      *
 *      所以,使用链表的方式连接,链表中以后key,val,next,prev  双向链表  具体看注释           *
 *******************************************************************************************/
/**
 * @Author: Training
 * @desc 双向链表的结构体
 * @params key: key值 ,val:value数据
 */
function LinkNode(key,val) {
  this.key = key;
  this.val = val;
  this.next = null;
  this.prev = null;
}
/**
 * @Author: Training
 * @desc hash表对象函数
 * @params none
 */
export let HashMap = ()=>{
  this.table = new Array(100); // 以数组作为容器,储存数据
  this.linked = function (key, val) {       // 工厂模式:  实例化双向链表
    return new LinkNode(key,val);
  };
};
/**
 * @Author: Training
 * @desc 根据特定的算法来找到key所对应的table的储存空间位置(下标)
 * @params key
 */
HashMap.prototype.getPosition = function(key){
  // 类型判定  不允许出了number和string类型以外的数据类型
  if (typeof key !== "string" && typeof key !== "number") throw new Error("key 类型错误");
  // 变量定义
  let t = 0,len = key.length,size = this.table.length;
  // 当类型为string的时候 执行以下函数
  if (typeof key === "string")
    for (let i = 0; i < len; i++) {
      t += key.charCodeAt(i); // 将key的每一位转换成 Unicode 然后再加上t再赋值给t
    }
  else t = key; // 如果是number类型,直接赋值给t就好了  不用做多余工作
  // 具体要放在数组的哪儿呢 ,因为数组的长度是固定的,这里默认是100
  // 所以t值需要和100取模,来确定这个数据一定在100以内,然后就找到了对应位置 将位置返回
  return t % size;
};
/**
 * @Author: Training
 * @desc 查找对应链表中的key值,因为数据结构的缘故,key值是唯一的
 * @params node : 链表对象  key:要查找的key值
 */
HashMap.prototype.findLinked = function(Node,key){
  // 边界判断,key和链表对象都不能为假
  if (!key || !Node) return -1;
  // curr代理链表
  let curr = Node;
  // 查找链表中对应值,然后返回,不多做解释
  while(curr){
    if (curr.key === key) return curr;
    curr = curr.next;
  }
  return -1;
};
/**
 * @Author: Training
 * @desc 添加新的数据
 * @params key: key  val:value
 */
HashMap.prototype.put = function(key,val){
  // 首先确定位置,然后找到位置上现存的数据,现存数据中是否已经有了key
  let p = this.getPosition(key),item ,link = this.table[p],curr = this.findLinked(link,key);
  // 如果已经存在当前key,只需要更新当前key的val就好了
  if (curr !== -1) {
    curr.val = val;
  }else{
    // 如果不存在,在链表头插入当前key的数据
    item = this.linked(key,val); // 创建一个链表
    item.next = link;           // 这个链表的下一个元素指向的原来的元素
    if (link) link.prev = item; // 如果对应的数组中的位置中不为空的时候才将prev的值更改
    this.table[p] = item;
  }
};
/**
 * @Author: Training
 * @desc 获取hash表中对应的数据值
 * @params key  数据的key值
 */
HashMap.prototype.get = function(key){
  let p = this.getPosition(key); // 获取到key对应的位置信息
  return this.findLinked(this.table[p],key).val;// 返回查找到的数据的val
};
/**
 * @Author Training
 * @desc 遍历所有数据
 * @param callback  回调函数  包含(key,val)参数
 */
HashMap.prototype.forEach = function(callback){
  let size = this.table.length-1;
  for (let i = 0; i < size; i++) {
    let link = this.table[i];
    // 当hash数组中当前下标的值不为空的时候 才遍历
    while (link){
      callback(link.key,link.val);
      link = link.next;
    }
  }
};
/**
 * @Author: Training
 * @desc 移除指定数据
 * @params key
 */
HashMap.prototype.remove = function(key){
  // 找到对应key对应的位置,并且找到该位置中指定的数据
  let p = this.getPosition(key),item = this.findLinked(this.table[p],key);
  // 如果查找到了对应的值(item!==-1)
  if (item !== -1) {
    // 上一个数据
    let prev = item.prev;
    // 如果上一个数据为真(也就是不为null)
    // 这里是做边界处理  如果上一个不为null  也就不是当前链表中第一个数据
    if (prev) {
      prev.next = item.next;
      if (item.next) item.next.prev = prev;
    }else{
      // 如果上一个为null了 那么链表的头变为head的下一个数据
      let next = item.next;
      this.table[p] = item.next;
      // 边界处理 如果next同时不为null的时候 执行以下数据(也就是说这整个链表的数据数量大于1的时候 才执行)
      // 如果链表的数据量等于1  那就不需要执行了  删掉第一个  那么此链表就是空  也就是null
      if(next) this.table[p].prev = null;
    }
  }
};
/***************************************************************************************************************************
 * @Author: Training                                                                                                       *
 * @desc 二叉查找树                                                                                                        *
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
function SearchTree(){
  this.root = null;
  this.createTree = function (val) {
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

/****************************************************************************************************************
 * @Author:                                            Training                                                 *
 * @desc                实现一个堆    具体堆排序怎么做呢? 从堆中依次拉去堆顶值                                  *
 ***************************************************************************************************************/
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
/**
 * @Author: Training
 * @desc 寻找岛屿
 *  给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
 *  岛屿总是被水包围，并且每座岛屿只能由水平方向或竖直方向上相邻的陆地连接形成。
 *  此外，你可以假设该网格的四条边均被水包围。
 *  链接：https://leetcode-cn.com/problems/number-of-islands
 *  @think ① 广度优先搜索:
 *    若不改变原有网格 , 则新建一个标记网格, 标记是否已经搜索过;
 *    用一个队列来储存与其有关系的网格
 *    循环出队列, 将有关系的加入队列, 并将对应标记改为true
 *    当队列为空时 说明一个岛屿查找完成
 *    ② 如上 , 只是不新建标记网格, 将搜索过的直接赋值为1
 *    ③ 递归: 将有上下左右关系的所有数据都改为0
 *        每次递归完成 岛屿数量加一;
 * */
export var findLand = function(grid) {
  let glen = grid.length; // 网格的纵向长度
  // 特判
  if(glen === 0) return 0;
  let clen = grid[0].length; // 网格的横向长度；
  let verticle = [[-1,0],[0,1],[1,0],[0,-1]]; // 方向  上右下左
  /*
  // 方法①
  let markeds = grid.map((item,index)=>{
    let c = [];
    for(let i = 0;i<clen;i++){
      c[i] = false;
    }
    return c;
  }); // 添加标记*/
  let land = 0;
  // let queue = []; // 辅助队列方法1,2
  // 方法③: 递归
  let finds = function (g, x,y,row,col) {
    if (x < 0 || x >= row || y < 0 || y >= col || g[x][y] === "0")return;
    g[x][y] = "0";
    finds(g,x-1,y,row,col);
    finds(g,x,y+1,row,col);
    finds(g,x+1,y,row,col);
    finds(g,x,y-1,row,col)
  };
  for(let i = 0;i<glen;i++){
    for(let j = 0;j<clen ;j++){
      /*
      //方法① 广度优先搜索
      f(!markeds[i][j]){
        let con = [i,j]; // 网格中的内容
        if(grid[i][j] == "1"){queue.push(con);land++} // 若为1 则添加进队列
        while(queue.length>0){
          let one = queue.shift();
          let _t = [one[0]+verticle[0][0],one[1]+verticle[0][1]],
              _r = [one[0]+verticle[1][0],one[1]+verticle[1][1]],
              _d = [one[0]+verticle[2][0],one[1]+verticle[2][1]],
              _l = [one[0]+verticle[3][0],one[1]+verticle[3][1]];
          let t = _t[0] >= 0  ? grid[_t[0]][_t[1]] : false,
              r = _r[1] < clen ? grid[_r[0]][_r[1]] : false,
              d = _d[0] < glen ? grid[_d[0]][_d[1]] : false,
              l = _l[1] >= 0 ? grid[_l[0]][_l[1]] : false;
          if( t && t != "0"){
            if(!markeds[_t[0]][_t[1]]){
              queue.push(_t);
              markeds[_t[0]][_t[1]] = true;
            }
          }
          if(r && r != "0"){
            if(!markeds[_r[0]][_r[1]]){
              queue.push(_r);
              markeds[_r[0]][_r[1]] = true;
            }
          }
          if(d && d != "0"){
            if(!markeds[_d[0]][_d[1]]){
              queue.push(_d);
              markeds[_d[0]][_d[1]] = true;
            }
          }
          if(l && l != "0"){
            if(!markeds[_l[0]][_l[1]]){
              queue.push(_l);
              markeds[_l[0]][_l[1]] = true;
            }
          }
          markeds[one[0]][one[1]] = true;
        }
      }*/
        // let con = [i,j]; // 网格的内容标记下标 方法1 2
        if(grid[i][j] == "1"){
          // queue.push(con); 方法1 2
          land++;
          finds(grid,i,j,glen,clen)
          /*
          // 方法② 优化版广度优先搜索
          while(queue.length>0){
            let one = queue.shift();
            let _t = [one[0]+verticle[0][0],one[1]+verticle[0][1]],
                _r = [one[0]+verticle[1][0],one[1]+verticle[1][1]],
                _d = [one[0]+verticle[2][0],one[1]+verticle[2][1]],
                _l = [one[0]+verticle[3][0],one[1]+verticle[3][1]];
            let t = _t[0] >= 0  ? grid[_t[0]][_t[1]] : false,
                r = _r[1] < clen ? grid[_r[0]][_r[1]] : false,
                d = _d[0] < glen ? grid[_d[0]][_d[1]] : false,
                l = _l[1] >= 0 ? grid[_l[0]][_l[1]] : false;
            if( t && t != "0"){
              queue.push(_t);
              grid[_t[0]][_t[1]] = "0";
            }
            if(r && r != "0"){
                queue.push(_r);
              grid[_r[0]][_r[1]] = "0";

            }
            if(d && d != "0"){
                queue.push(_d);
              grid[_d[0]][_d[1]] = "0";
            }
            if(l && l != "0"){
                queue.push(_l);
              grid[_l[0]][_l[1]] = "0";
            }
            grid[one[0]][one[1]] = "0";
          }*/
        } // 若为1 则添加进队列
    }
  }
  return land;
};