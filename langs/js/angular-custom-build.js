const { ngPackagr } = require('ng-packagr');
const { switchMap } = require('rxjs/operators');
const symlinkDir = require('symlink-dir');
const fs = require('fs-extra');

const isWatchMode = !!process.env.WATCH_MODE;

async function addDir(dirName, fromDir, toDir) {
    if (isWatchMode) {
        const result = await symlinkDir(fromDir, toDir);
        if (!result.reused) {
            console.log(`* Link ${dirName} from '${fromDir}' to '${toDir}' *`);
        }
        return result;
    }

    console.log(`* Copy ${dirName} from '${fromDir}' to '${toDir}' *`);
    return await fs.copy(fromDir, toDir);
}

async function addAssets() {
    return await addDir('assets', './projects/ui-kit/src/assets', './dist/ui-kit/assets');
}

async function addStyles() {
    return await addDir('scss', './projects/ui-kit/src/lib/styles', './dist/ui-kit/styles');
}

ngPackagr()
    .forProject('projects/ui-kit/ng-package.json')
    .withTsConfig('projects/ui-kit/tsconfig.lib.json')
    .withOptions({ watch: isWatchMode })
    .buildAsObservable()
    .pipe(
        switchMap(addAssets),
        switchMap(addStyles),
    )
    .subscribe();