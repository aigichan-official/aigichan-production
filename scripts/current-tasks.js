// Reads the "Current tasks" section of the repo README and returns
// the task lines, in order. Used by the GH08 demo test: the test
// asserts the README still lists the series' real production tasks.
const fs = require('node:fs');

function currentTasks(readmePath) {
  const text = fs.readFileSync(readmePath, 'utf8');
  const lines = text.split('\n');
  const start = lines.findIndex((l) => l.trim() === '## Current tasks');
  if (start === -1) return [];
  const tasks = [];
  for (const line of lines.slice(start + 1)) {
    const m = line.match(/^-\s+(.+?)\s*$/);
    if (m) tasks.push(m[1]);
    else if (line.trim() !== '' && tasks.length > 0) break;
  }
  return tasks;
}

module.exports = { currentTasks };
