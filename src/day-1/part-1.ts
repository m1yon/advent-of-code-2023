const input = Bun.file("./src/day-1/input.txt");
const content = await input.text();
const contentByLine = content.trim().split("\n");

const isNumber = (value: string) => {
  return !isNaN(Number(value));
};

const calibrationValues = contentByLine.map((calibrationValue) => {
  let lo = 0;
  let hi = calibrationValue.length - 1;

  while (lo <= hi) {
    if (!isNumber(calibrationValue[lo])) {
      lo++;
    }

    if (!isNumber(calibrationValue[hi])) {
      hi--;
    }

    if (isNumber(calibrationValue[hi]) && isNumber(calibrationValue[lo])) {
      return Number(`${calibrationValue[hi]}${calibrationValue[lo]}`);
    }
  }

  return 0;
});

const result = calibrationValues.reduce((prev, curr) => {
  return prev + curr;
}, 0);

console.log("result", result);
