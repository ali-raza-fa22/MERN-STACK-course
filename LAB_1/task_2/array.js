let jsonString = {
  name: "Ali Raza",
  age: 20,
  skills: ["HTML", "CSS", "JavaScript"],
};

// console.log(jsonString);
// console.log(jsonString.skills);

const parsed = JSON.stringify(jsonString);
console.log(parsed);
