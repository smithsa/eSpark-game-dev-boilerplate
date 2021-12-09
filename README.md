# eSpark Game Development Boilerplate

Boilerplate for eSpark game creation. Can be used as a template for your development environment and creating production builds of games. 

## Getting Started
To use the boilerplate follow these simple example steps.

### Requirements

The boilerplate will need the following to run:

- [Node](https://nodejs.org/en/download/) v16.0.0
- [npm](https://www.npmjs.com/) (*included in node*)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
- [FFmpeg](http://ffmpeg.org/download.html) (*optional, used for audio compression*)

### Installation
After all requirements are met follow the instructions below:

1. Clone the repository

   `git clone https://github.com/smithsa/eSpark-game-dev-boilerplate.git`

2. Navigate to the project directory

   `cd eSpark-game-dev-boilerplate`

3. Run yarn install

   `yarn install`

## Usage

### Development

#### Running the development server

To use the project in development, load your source files in the `/src` directory and run:

`yarn watch`

A node development server will be started at [http://localhost:8000](http://localhost:8000). The server runs at the `/dist` directory. 
Hot loading is enabled, so you will not need to refresh the page to see the changes on the server.

N.B. The projects includes Phaser as a dependency, feel free to remove if the game is not a Phaser game and add the library of your choice.
`yarn remove phaser`

#### Compressing Audio

If you want to compress the audio files you can run the following command:

`yarn compress-audio`

It will compress audio files in the `/dist` folder. It runs the "compress-audio.sh" bash file and utilizes FFmpeg.

#### Generating Audio Sprites

If you want to generate audio sprites for the game you can run:

`yarn generate-audios-sprites`

Audio sprites are created with a gulp task which can be found in gulpfile.js.

#### Linting your code

The project includes ESLint which statically analyzes your code to quickly find problems. To use it you can run the following command:
`eslint [insert path to code you want to lint here]`

### Production

#### Production Build

To get a production build of the project you can run the following:

`yarn build`

The build will bundle your javascript files using the webpack production file configurations, minify files, and do gzip compression of files. 
Additionally, it will run multiple gulp tasks that handle creating audio sprites and image compression.

#### Production build with audio compression

To get a production build of the project with additional audio compression you can run the following:

`yarn build-with-audio-compression`

Similar to the build, it will bundle your javascript files, create audio sprite, handle image compression, minify files, 
and handle gzip compression of files. But will add audio compression as well.

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.
