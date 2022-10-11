const constrain = (min: number, max: number, val: number) => {
  val = val < min ? min : val;
  val = val > max ? max : val;
  return val;
};

export default constrain;
