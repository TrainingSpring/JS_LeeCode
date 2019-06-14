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
function getChild(s){
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
  let match = s[0] === "0"?s.match(/0+1+/)||"":s.match(/1+0+/)||"";
  // 根据正则表达式,将0组(多个0组成的字符串),或者1组(多个1组成的字符串)分割开来
  let fg = match.toString().match(/0+|1+/g);
  //如果0组的字符长度小于等于1组的字符长度,则返回所需数据(因为题目的原因,这里可以直接返回true) 这么写的原因是想看看处理后的数据
  if (fg && fg[0].toString().length<=fg[1].toString().length) return fg[0]+fg[1].slice(0,fg[0].length);


  return false;
}
export function countBinarySubstrings(s) {
  let count = 0;
  let result = [];
  for (let i = 0; i < s.length - 1; i++) {   // 循环体   因为最后一位只有一位数的缘故 不需要做任何操作 ,所以循环次数是length-1;
    let res = getChild(s.slice(i));          // 将数据交给子函数处理   数据每次会向后移一位,所以直接取当前位置到末尾的值!
    if (res){
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
  let map = ["",1,"abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"];  // 映射电话号码
  // 将字符串转化为数组
  let s = str.split("");
  // 用来保存对应字符串应该有的map数据
  let code = [];
  // 遍历出code
  s.forEach((item)=>{
    if (map[item])  code.push(map[item]);
  });
  // 用来作组合   递归
  let comb = (arr)=>{
    if (arr.length === 1)return arr[0].split(""); //当arr的长度为1的时候 直接发挥字符串的转化为的数组
    let combMap = [];
    for (let i = 0, ilen = arr[0].length; i < ilen; i++)
      for (let j = 0,jlen = arr[1].length;j<jlen;j++)
        combMap.push(`${arr[0][i]}${arr[1][j]}`);   //每两个进行组合 并将其保存如临时数据combMap中

    // 组合完成后 将前两个下标的数据替换为 临时数据
    arr.splice(0,2,combMap);
    // 如果arr数据的长度小于1的时候,直接返回临时数据,否则递归(自己执行自己)
    if (arr.length < 1)  return combMap; else comb(arr);
    // 因为递归的关系,返回的数据可能是深层函数的数据,所以需要返回arr[0]的值
    return arr[0];
  };
  // 若数据的值大于0的时候,返回comb函数的数据,否则返回空!
  if (code.length > 0) return  comb(code); else return [];
}