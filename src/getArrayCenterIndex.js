
let s = new Date().getTime();
let  randomArray = (num)=>{
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(Math.ceil(Math.random()*1000));
    // arr.push(i);
  }
  return arr;
};
// let newA = randomArray(1000000);
// let val = searchLastLessEqualK([1,3,5,6,7,9,11,12,13,23],50000);
// console.log(val);
let hash = new HashMap();
hash.put("table","你好");
hash.put(520,"你好啊");
hash.put("tbael","你好___table");
hash.put("tbael","你好___table");
hash.put("tbael","你好___table");
hash.put("tbael","你好___table");
hash.put("tbael","你好___table");
hash.put("tbael","你好___table");
hash.put("tbael","你好___table");
hash.put("tbael","你好___");
hash.put("table","hello world");
hash.put("table tatalis","hello world");
hash.remove("table");
hash.forEach((key,val)=>{
  console.log(`\t${key}:${val},\r`);
})
let e = new Date().getTime();
console.log(e - s);