let calPoints = function(ops) {
  let count = 0,tem = [],prev1,prev2;
  for(let i = 0,len = ops.length;i<len;i++){
    switch(ops[i]){
      case "C":
        tem.pop();
        break;
      case "D":
        prev1 = tem.pop();
        tem.push(prev1,prev1*2);
        break;
      case "+":
        prev1 = parseInt(tem.pop());
        prev2 = parseInt(tem.pop());
        tem.push(prev2,prev1,prev1+prev2);
        break;
      default:
        tem.push(parseInt(ops[i]));
    }
  }
  return tem.reduce((t,n)=>t+n);
};
console.log(calPoints(["5","-2","4","C","D","9","+","+"]));;