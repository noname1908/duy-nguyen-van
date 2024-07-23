# Problem 5: A Crude Server

ExpressJS Typescript

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/): Ensure that Node.js, preferably version 16 or higher, is installed on your system, as this project utilizes the latest versions of TypeScript and Nodemon.
- [npm](https://www.npmjs.com/): npm is the package manager for Node.js and comes with the Node.js installation.
- [yarn](https://yarnpkg.com): Yarn is a package manager

## Installation

Clone this repository to your local machine:

```
git clone origin https://github.com/noname1908/duy-nguyen-van.git
```

Navigate to the project directory:

```
cd problem5/
```

Install the project dependencies including TypeScript and Nodemon:

```
yarn
```

## Usage

For development purposes, you can run the application using Nodemon to automatically restart the server when changes are detected. Execute the following command:

```
yarn dev
```

This will start the server at `http://localhost:3000` by default. Open api document at `http://localhost:3000/docs` to interact with all api's.

For production, you can build the TypeScript files and then start the server. Run the following commands:

```
npm run build
npm start
```

## Project Structure

The project structure is organized as follows:

- `src`: Contains TypeScript source files
  - `index.ts`: Configures and starts the Express application
- `dist`: Output directory created during build for compiled TypeScript files
- `package.json`: Project configuration and dependencies
- `tsconfig.json`: TypeScript configuration

You can customize the project configuration in the `tsconfig.json` file and adjust the server settings in the `src/server.ts` file.
