import * as cp from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export const BUNDLE_PATH_SRC_DIFF = 'src-diffs';
export function generateDifferencePatch(intendedOldFile: string, intendedNewFile: string, destination: string): string {
  let oldFile = intendedOldFile;
  if (!fs.existsSync(oldFile)) {
    oldFile = '/dev/null';
  }

  let newFile = intendedNewFile;
  if (!fs.existsSync(newFile)) {
    newFile = '/dev/null';
  }

  // todo clean up in the future to use a stream
  let rawDiff = cp.execSync([
    'git',
    'diff',
    '--binary',
    oldFile,
    newFile,
    '| cat',
  ].join(' '), { maxBuffer: 999_990_999_999 }).toString();

  if (rawDiff.length) {
    rawDiff = rawDiff.replace(/^(.*)$/m, `diff --git a/${destination} b/${destination}`);
    rawDiff = rawDiff.replace(`--- a/${oldFile}`, `--- a/${destination}`);
    rawDiff = rawDiff.replace(`+++ b/${newFile}`, `+++ b/${destination}`);
  }
  return rawDiff;
}

export function writeDifferencePatch(bundle: string, identifier: string, filePath: string, patch: string): void {
  const diffPath = path.join(bundle, BUNDLE_PATH_SRC_DIFF, identifier, filePath);
  fs.mkdirSync(path.dirname(diffPath), { recursive: true });
  fs.writeFileSync(diffPath, patch);
}