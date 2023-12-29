const input = Bun.file("./src/day-1/input.txt");
const content = await input.text();
const contentByLine = content.trim().split("\n");

const numbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const getNumber = (value: string | undefined) => {
  if (value === undefined) {
    return undefined;
  }

  const firstChar = value[0];

  if (isNumber(firstChar)) {
    return Number(firstChar);
  }

  const speltNumber =
    numbers.findIndex((number) => value.startsWith(number)) + 1;

  if (speltNumber === 0) {
    return undefined;
  }

  return speltNumber;
};

const isNumber = (value?: string | number) => {
  return !isNaN(Number(value));
};

const calibrationValues = contentByLine.map((calibrationValue) => {
  let lo = 0;
  let hi = calibrationValue.length - 1;

  while (lo <= hi) {
    const loValue = getNumber(calibrationValue.substring(lo));
    if (!isNumber(loValue)) {
      lo++;
    }

    const hiValue = getNumber(calibrationValue.substring(hi));
    if (!isNumber(hiValue)) {
      hi--;
    }

    if (isNumber(loValue) && isNumber(hiValue)) {
      return Number(`${loValue}${hiValue}`);
    }
  }

  return 0;
});

const result = calibrationValues.reduce((prev, curr) => {
  return prev + curr;
}, 0);

console.log("result", result);
