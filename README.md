# Guitar Meister     
A "Guitar Hero" like game for the web        
[![Build Status](https://travis-ci.com/dibenso/guitar-meister.svg?branch=main)](https://travis-ci.com/dibenso/guitar-meister) 
[![Coverage Status](https://coveralls.io/repos/github/dibenso/guitar-meister/badge.svg?branch=main)](https://coveralls.io/github/dibenso/guitar-meister?branch=main)                       
## Building and running
First clone the repo and `cd` into the app:     
```sh
git clone git@github.com:dibenso/guitar-meister.git
cd guitar-meister
```
### If you want to build with [Docker](https://www.docker.com/):
```sh
docker build -t dibenso/guitar-meister:latest .
docker run -p 3000:3000 -d dibenso/guitar-meister
```
### Normal build with [Yarn](https://yarnpkg.com/):
```sh
yarn install
yarn build
yarn run
```
Once the app is running go to [http://localhost:3000](http://localhost:3000)
## Development
Running the tests:
```sh
yarn test
```
Starting the dev server:
```sh
yarn dev
```
## Contributing
1. Fork it :fork_and_knife:
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :smiley:

For more, check out [CONTRIBUTING.md](https://github.com/dibenso/guitar-meister/blob/main/CONTRIBUTING.md)
