function UseDelayCalc<T>(name:string,action:()=>T) {
  console.clear()
  console.time(name)
  const act = action()
  console.timeEnd(name)
  return act;
}

export default UseDelayCalc;
