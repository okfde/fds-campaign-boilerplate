# FragDenStaat Campaign Boilerplate

This is a front-end boilerplate that can be used to build campaign sites for [FragDenStaat](https://fragdenstaat.de). It works with [Gulp](https://gulpjs.com/).

## Instructions

Clone or fork this repository. Then do:

1. Install `gulp-cli` globally with `yarn global add gulp-cli`
2. Install dependencies:
`yarn`

### Development
- `yarn dev` will start a local server at `http://localhost:8000` with LiveReload-support.

### Production
- `yarn build` will start the build task and exit when done

## Directories and files
### src
- `src`: The root directory for the source files
- `src/img`: Place all images here
- `src/js`: JavaScript files go here
- `src/scss`: Place SCSS styles here
- `src/index.html`: The main html page

### dist
The build process bundles all files in a `dist`-folder.
Scripts, styles and images are placed inside `js`-, `css`- and `img`-subfolders.
