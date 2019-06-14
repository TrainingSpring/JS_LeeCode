/**
 *
 * @param 倒转字符串
 * @returns {string}
 */

export function sum(s) {
  let b = [];
  s.split(" ").map((item,index)=>{
        if(item){
            b.unshift(item.split('').reverse().join(''));
        }
    });
  return b.join(" ");
}

/**
 * 找数组中间值
 *
 * @param nums
 * @returns {number}
 */
export function pivoIndex(nums) {
    let len =  nums.length;
    let half = 0;
    let a = 0;
    let b = 0;
    while(1){
        for(let i = 0;i<half;i++){
            a += nums[i];
        }
        for(let i = half+1;i<len;i++){
            b += nums[i];
        }
        console.log(a,b,half);
        if( a!=b && half<len){
            half++;
            a = 0;
            b = 0;
        }else if(half>=len){
            return -1;
        }else{
            console.log(half);
            return half;
        }
    }
}
/**
* @title: 至少是其他数字两倍的最大数  
 *@type: Array
* 在一个给定的数组nums中，总是存在一个最大元素 。
*
* 查找数组中的最大元素是否至少是数组中每个其他数字的两倍。
*
* 如果是，则返回最大元素的索引，否则返回-1。
*
*/
export function dominantIndex(nums) {
    let i ; //保存最大值
    let i_index = 0;
    let m ; //保存较小值
    nums.forEach((item,index)=>{
        if(index == 0){
            i = item;
            m = 0;
        }else{
            if(i<item){
                m = i;
                i = item;
                i_index = index;
            }else if(i>item){
                m = item>m?item:m;
            }
        }
    })
    return i>=2*m?i_index:-1;
}

/**
 * @title 加一
 * @param digits
 * @desc 给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。
 *          最高位数字存放在数组的首位， 数组中每个元素只存储一个数字。
 *          你可以假设除了整数 0 之外，这个整数不会以零开头。
 * @returns {*}
 */
export var plusOne = function(digits) {
    const NUMLEN = 15;
    let ds = digits.join('');
    let len = digits.length;
    let nums;
    if (len<=NUMLEN){
        nums = (parseInt(ds)+1+'').split('');
    } else {
        let b = Math.ceil(len/NUMLEN);
        let a = [];
        for(let i = 0;i<b;i++){
            a.push(ds.slice(i*NUMLEN,(i+1)*NUMLEN))
        }
        let alen = a.length;
        let aNum = parseInt(a[alen-1])+1;
        if (aNum.toString().length>NUMLEN){

        }else{
            a[alen-1] = aNum;
        }
        nums = a.join('').split('');
    }
    console.log('0'*15);
    return nums;
};
