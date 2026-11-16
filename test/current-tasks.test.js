// GH08 demo test: the README of this repo lists the series' real
// production tasks under "## Current tasks". This test reads that
// section (via scripts/current-tasks.js) and asserts it still lists
// the four tasks the repo actually tracks. If a task is dropped or
// the section is renamed, the test fails — it tests the repo's real
// content, not a tautology.
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { currentTasks } = require('../scripts/current-tasks');

const README = path.join(__dirname, '..', 'README.md');

describe('README current tasks', () => {
  it('lists the four production tasks, in order', () => {
    assert.deepEqual(currentTasks(README), [
      'GH04: publish candidate 07 in the 2026-11-15 12:00 JST slot',
      'GH05: finish candidate 03 QA and present for approval',
      'Study 084: planner judgement on the Route B rehearsal',
      'GH06: perform the demo takes (S03–S05, S08) on this repository',
    ]);
  });

  it('every task names a real series item', () => {
    for (const task of currentTasks(README)) {
      assert.match(task, /^(GH0[1-9]|Study 084)/);
    }
  });
});
