import {sum,pivoIndex,dominantIndex,plusOne} from "../src/sum.js";
import {
  countBinarySubstrings,
  hasGroupsSizeX,
  letterCombinations,
  canPlaceFlowers,
  grayCode,
  repeatedSubstringPattern,
  isMatch,
  findDiagonalOrder,
  spiralOrder,
  generate,
  addBinary,
  strStr,
  longestCommonPrefix,
  arrayPairSum,
  twoSum,
  findMaxConsecutiveOnes,
  reverseWords,
  reverseWords_3,
  sortArray,
  maximumGap,
  sortArrayByParityII,
  findKthLargest, firstMissingPositive, restoreIpAddresses, findSubstring, maximalRectangle
} from "../src";

// test('for循环数据',()=>{
//     expect(sum("hello world"));
// })
// test('找中间值',()=>{
//     expect(pivoIndex([-1,-1,-1,0,1,1]))
// })
// test('找最大值是其他值的两倍',()=>{
//     expect(dominantIndex([0,0,0,1]))
// })
/*test('卡牌分组',()=>{
    expect(hasGroupsSizeX([1,2,3,4,4,3,2,1])).toBe(true)
})*/
/*test('种花问题',()=>{
  expect(canPlaceFlowers([0,1,0,1,0,1],2)).toBe(false)
})*/
/*test('卡牌分组[1]',()=>{
  expect(hasGroupsSizeX([1])).toBe(false)
})
test('卡牌分组[1]',()=>{
  expect(hasGroupsSizeX([1,2,2,3,4,3,4,5,5])).toBe(false)
})*/
/*test('格雷编码:',()=>{
  expect(grayCode(10))
})*/
/*test('重复的字符串:',()=>{
  expect(repeatedSubstringPattern("abcabc")).toBe(true);
})*/
/*test('正则表达式:',()=>{
  expect(isMatch("aaaabbcdefiigg","a*b*.*ig*z*")).toBe(true)
})*/
/*test('数组对角线遍历:',()=>{
  expect(findDiagonalOrder([[1,2,3],[4,5,6],[7,8,9],[10,11,12],[13,14,15]]))
})*/
/*test('数组螺旋遍历:',()=>{
  expect(spiralOrder([
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [10,11,12],
    [13,14,15]])) // [[1,2,3],[4,5,6],[7,8,9],[10,11,12],[13,14,15]]
})*/
/*test('二进制求和:',()=>{
  expect(addBinary("1010100010010011","110100101"))
})*/

/*test('实现indexOf方法:',()=>{
  expect(strStr("success","ce"))
})*/
/*
test('找到最长的公共字符串:',()=>{
  expect(longestCommonPrefix(["abcc","abcc","abcb"]))
})*/
/*test('数组拆分:',()=> {
  expect(arrayPairSum([1, 3, 5, 2, 4, 6]))
})*/
/*test('两数之和2:',()=> {
  expect(twoSum([12,13,23,28,43,44,59,60,61,68,70,86,88,92,124,125,136,168,173,173,180,199,212,221,227,230,277,282,306,314,316,321,325,328,336,337,363,365,368,370,370,371,375,384,387,394,400,404,414,422,422,427,430,435,457,493,506,527,531,538,541,546,568,583,585,587,650,652,677,691,730,737,740,751,755,764,778,783,785,789,794,803,809,815,847,858,863,863,874,887,896,916,920,926,927,930,933,957,981,997]
    ,542))
})*/
/*test('最大连续1的个数:',()=> {
  expect(findMaxConsecutiveOnes([1,1,1,1,0,1,1,1]))
})*//*
test('反转单词:',()=> {
  expect(reverseWords(" hello      world "))
})*//*
test('反转单词3:',()=> {
  expect(reverseWords_3(" hello      world "))
})*//*
test('数组排序:',()=> {
  expect(sortArray([5,2,3,1,5,81,6,1,64,4654,6,65,468,7,41,65,749,4,654,98,4]))
  // 2,3,1,4,8,8,56
})*/
/*test('最大差值:',()=> {
  expect(maximumGap([5,2,3,1,5,81,6,1,64,4654,6,65,468,7,41,65,749,4,654,98,4]))
  // 2,3,1,4,8,8,56
})*/
/*test('奇偶排序II:',()=> {
  expect(sortArrayByParityII([2,4,6,8,10,1,3,5,7,9]))
  // 2,3,1,4,8,8,56
})*/
/*test('数组中的第K个最大元素:',()=> {
  expect(findKthLargest([3,2,3,1,2,4,5,5,6]  ,4))
  // 2,3,1,4,8,8,56
})*/
/*test('缺失的第一个正数:',()=> {
  expect(firstMissingPositive( [0,1,2,3,4,5,7])).toBe(6)
  // 2,3,1,4,8,8,56
})*/
/*
test('复原ip地址:',()=> {
  expect(restoreIpAddresses("25525511135",1))
  // 2,3,1,4,8,8,56
})*/
/*test('串联所有单词的子串:',()=> {
  expect(findSubstring("ffffffffff",["fff","fff"]))
  // 2,3,1,4,8,8,56
})*/

test('最大矩形:',()=> {
  expect(maximalRectangle([
    ["1","0","1","0","0"],
    ["1","0","1","1","1"],
    ["1","1","1","1","1"],
    ["1","1","1","1","1"],
    ["1","0","0","1","0"]
  ])).toBe(10);
})
