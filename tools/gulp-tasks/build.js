/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

module.exports = {
  // build everything and generate bundles
  'all': (gulp) => (done) => execBuild(done),
  // same as all without the bundling part - faster / lower memory usage
  'no-bundle': (gulp) => (done) => execBuild(done, '--bundle=false'),
};

function execBuild(done, args = '') {
  const path = require('path');
  const childProcess = require('child_process');
  // increase maxbuffer to address out of memory exception when running certain tasks
  const scriptPath = path.resolve(__dirname, '../../build.sh');
  const baseDir = path.resolve(__dirname, '../..');
  if (!scriptPath.startsWith(baseDir + path.sep)) {
    throw new Error('Invalid path');
  }
  childProcess.execFile(scriptPath, args ? args.trim().split(/\s+/).filter(Boolean) : [], {maxBuffer: 300 * 1024}, done);
}