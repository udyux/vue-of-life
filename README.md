# vue-of-life

A toroidal array implementation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) built in Vue 3.

Online version is deployed on Netlify [here](https://vue-of-life.netlify.app/).

## Usage

Click Start to start iterating generations. Click Pause to stop and Resume to continue.

Before starting or while paused, you can click Import to set a saved initial grid state or Export to copy the current grid state.

You can also click on Edit to change the current grid state before starting or resuming iterations.

Click on Select Shape to choose the shape to place on the grid. You can use the following keys to modify the shape:

- `X` to flip horizontally
- `Y` to flip vertically
- `R` to rotate 90 degrees

Click on Save to commit the edits to the grid or Cancel to discard them. Note that, at this time, it is only possible to add live cells. You cannot "kill" cells that are already alive in the grid.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

If you regularly work in Vue 2 workspaces, disable the Volar extension globally. Then, in this workspace, right-click on the Vetur extension in the sidebar and select `Disable (Workspace)`. Then right-click on the Volar extension and select `Enable (Workspace)`.

You will also need to enable TypeScript [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) by doing the following:

- Run `Extensions: Show Built-in Extensions` from VSCode's command palette
- Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
- Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
