
  
let availableTamNamesList = [
  "Heuristic",
  "Parse",
  "Compile",
  "Recursion",
  "Optimizer",
  "Cipher",
  "Vector",
  "Fragment",
  "Circuit",
  "Fiber",
  "Bandwidth",
  "Firewall",
  "Cache",
  "Drone",
  "Quantum",
  "Protocol",
  "Disrupt",
  "Augment",
  "Binary",
  "Control",
  "Function",
  "Infinity",
  "Syntax",
  "Logics",
  "Bits",
  "Cloud",
  "Docker",
  "Render",
  "Interpret",
  "Virtual",
  "Mesh",
  "Stack",
  "Loop",
  "Commit",
  "Repo",
  "Duplex",
  "Agile",
  "Proxy",
  "Abstract",
  "Sort",
  "Const",
  "Pixel",
  "Lifo",
  "Debug",
  "Numpy",
  "Grid",
  "Scroll",
  "Justify",
  "Dart",
  "Icons",
  "Upscale",
  "Flask",
  "Bool",
  "Auth",
  "Script",
  "Shell",
  "Domain",
  "Token",
  "Query",
  "Crons"
];
  
  let assignedTeamNamesList = [];
  
  
  const getTeamName = () => {
    if (availableTamNamesList.length === 0) {
    //   console.error("No more unique team names available.");
      let num = Math.floor(Math.random() * 10000);
      return `guest${num}`;
    }
  
    let randomIndex = Math.floor(Math.random() * availableTamNamesList.length);
    let selectedTeamName = availableTamNamesList[randomIndex];
  
  
    // Remove the selected name from the list to avoid duplication
    availableTamNamesList.splice(randomIndex, 1);
    assignedTeamNamesList.push(selectedTeamName);
  
    return selectedTeamName;
  }
  
let lst = [] 
for (let i = 0; i < 100; i++) {
    let team = getTeamName();
    // if (team.startsWith('guest')) {
    //     continue;
    // }
    lst.push(team)
    console.log(team);
}

console.log(lst.length)

// unique names
let unique = [...new Set(lst)];
console.log(unique.length)

// duplicate finder
let duplicate = lst.filter((item, index) => lst.indexOf(item) != index)
console.log(duplicate)