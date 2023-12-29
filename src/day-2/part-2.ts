const input = Bun.file("./src/day-2/input.txt");
const content = await input.text();
const contentByLine = content.trim().split("\n");

const games = contentByLine.map((game) => {
  const pulls = game
    .split(":")[1]
    .split(";")
    .map((pull) => {
      return pull.split(",").reduce<Record<string, number>>(
        (prev, curr) => {
          const [value, color] = curr.trim().split(" ");
          prev[color] = Number(value);
          return prev;
        },
        {
          red: 0,
          green: 0,
          blue: 0,
        }
      );
    });

  return pulls;
});

const requiredColorsPerGame = games.map((game) => {
  const minRequiredColors = game.reduce(
    (prev, curr) => {
      return {
        red: Math.max(prev.red, curr.red),
        green: Math.max(prev.green, curr.green),
        blue: Math.max(prev.blue, curr.blue),
      };
    },
    {
      red: 0,
      green: 0,
      blue: 0,
    }
  );

  return minRequiredColors;
});

const power = requiredColorsPerGame.reduce((prev, curr) => {
  return prev + curr.red * curr.green * curr.blue;
}, 0);

console.log("power", power);
