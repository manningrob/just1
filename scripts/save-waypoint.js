import { execSync } from 'child_process';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const waypointDir = join(process.cwd(), 'waypoints');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

// Create waypoints directory if it doesn't exist
if (!existsSync(waypointDir)) {
  mkdirSync(waypointDir);
}

// Create a new waypoint directory with timestamp
const currentWaypointDir = join(waypointDir, `waypoint-${timestamp}`);
mkdirSync(currentWaypointDir);

// Save package.json
const packageJson = JSON.parse(execSync('cat package.json').toString());
writeFileSync(
  join(currentWaypointDir, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);

// Copy source files
execSync(`cp -r src ${currentWaypointDir}/`);

// Save git status if git is being used
try {
  const gitStatus = execSync('git status').toString();
  writeFileSync(join(currentWaypointDir, 'git-status.txt'), gitStatus);
} catch (error) {
  // Git not initialized, skip
}

console.log(`Waypoint saved to: ${currentWaypointDir}`);