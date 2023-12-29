const input = Bun.file("./src/day-2/input.txt");
const content = await input.text();
const contentByLine = content.trim().split("\n");

const limits = {
  red: 12,
  green: 13,
  blue: 14,
};

const games = [
  null,
  ...contentByLine.map((game) => {
    const pulls = game
      .split(":")[1]
      .split(";")
      .map((pull) => {
        return pull.split(",").reduce<Record<string, number>>((prev, curr) => {
          const [value, color] = curr.trim().split(" ");
          prev[color] = Number(value);
          return prev;
        }, {});
      });

    return pulls;
  }),
];

const validGames = games.map((game) => {
  if (!game) return null;

  const isInvalid = game.some(({ red, green, blue }) => {
    if (red > limits.red) {
      return true;
    }

    if (green > limits.green) {
      return true;
    }

    if (blue > limits.blue) {
      return true;
    }
  });

  if (isInvalid) {
    return null;
  }

  return game;
});

const sum = validGames.reduce((acc, curr, index) => {
  if (curr === null) {
    return acc;
  }

  return acc + index;
}, 0);

console.log("sum", sum);
