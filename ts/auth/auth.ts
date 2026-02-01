function shuffledArrayParameter() {

  let arr = [0,1,2,3,4,5,6,7,8,9];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  const rtnNum = arr[ arr.length -1 ];
  const rtnArr = [ arr.slice(0,3) , arr.slice(3, 6) , arr.slice(6, 9)];

  return { shuffledArray : rtnArr , finalNum : rtnNum };
}

const passCodeParameter = shuffledArrayParameter();
const shuffledArray = () => { return passCodeParameter["shuffledArray"] }
const finalNum = () => { return passCodeParameter["finalNum"] }

export default {
    shuffledArray ,
    finalNum
}