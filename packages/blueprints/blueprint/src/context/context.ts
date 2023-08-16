import { TraversalOptions } from './traverse';
import { ContextFile } from '../resynthesis/context-file';

export interface NpmConfiguration {
  readonly registry?: string;
  readonly token?: string;
}

export interface PackageConfiguration {
  readonly name?: string;
  readonly version?: string;
}
/**
 * context about the existing project bundle (if it exists)
 */
export interface Project {
  readonly name?: string;
  bundlepath?: string;

  /**
   * The options used on the previous run of this blueprint.
   */
  options?: any;
  src: {
    /**
     * traverses through the files under the bundlepath/src (if it exists).
     * @param options options that allow you to narrow the files which you step through - defaults to ALL_FILES
     * @returns ContextFile
     */
    findAll: (options?: TraversalOptions) => ContextFile[];
  };
}

export interface Context {
  readonly spaceName?: string;
  readonly environmentId?: string;

  /**
   * Requested BranchName. Typically used for overriding the branch names for resynthesis updates.
   */
  readonly branchName?: string;

  readonly rootDir: string;
  readonly npmConfiguration: NpmConfiguration;
  readonly package: PackageConfiguration;
  readonly project: Project;
}
