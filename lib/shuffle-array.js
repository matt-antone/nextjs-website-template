export default function shuffle(arr){
  let start = arr.length - 1

  for(let i = start; i > 0; i--){
    const j = Math.floor(Math.random() * i)
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  return arr
}