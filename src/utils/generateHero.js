
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const data = {
  heroes: [
    {
      id: uuidv4(),
      name: "Первый герой",
      description: "Первый герой в рейтинге!",
      element: "fire"
    },
    {
      id: uuidv4(),
      name: "Неизвестный герой",
      description: "Скрывающийся в тени",
      element: "wind"
    },
    {
      id: uuidv4(),
      name: "Морской герой",
      description: "Как аквамен, но не из DC",
      element: "water"
    }
  ],
  filters: [
    "all",
    "fire",
    "water",
    "wind",
    "earth"
  ]
};

fs.writeFileSync('heroes.json', JSON.stringify(data, null, 2), 'utf-8');
console.log('heroes.json обновлён с UUID!');