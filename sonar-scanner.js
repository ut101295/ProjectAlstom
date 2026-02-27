const { execSync } = require('child_process');
const fs = require('fs');

console.log('Generating SonarQube Report...\n');

// Check if coverage exists
if (!fs.existsSync('./coverage/lcov.info')) {
  console.error('Coverage report not found. Run tests first with: npm run test:coverage');
  process.exit(1);
}

console.log('Coverage report found');
console.log('Coverage location: ./coverage/lcov.info');
console.log('SonarQube config: ./sonar-project.properties');
console.log('\nTo upload to SonarQube server, run:');
console.log('   sonar-scanner');
console.log('\nMake sure you have sonar-scanner installed globally:');
console.log('   npm install -g sonar-scanner');
console.log('\nReports are ready for SonarQube analysis!');
