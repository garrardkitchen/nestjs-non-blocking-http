## Important

You must set the ENV VAR of `NODE_CLUSTER_SCHED_POLICY="none"` so the scheduling of a request to a process is deferred to OS and avoids using RR.

Set up two linux terminal sessions, in one run:

```
curl http://localhost:3000/long
```

and the other, run this:

```bash
$ for i in `seq 1 12`; do curl http://localhost:3000 & done
```

Important to run 👆 at the same time.

Example stdout:
```
[Nest] 28142   - 09/09/2020, 4:09:42 AM   0
[Nest] 28142   - 09/09/2020, 4:09:43 AM   10000
[Nest] 28142   - 09/09/2020, 4:09:43 AM   20000
[Nest] 28142   - 09/09/2020, 4:09:43 AM   30000
[Nest] 28079   - 09/09/2020, 4:09:43 AM   / HIT
[Nest] 28087   - 09/09/2020, 4:09:43 AM   / HIT
[Nest] 28102   - 09/09/2020, 4:09:43 AM   / HIT
[Nest] 28072   - 09/09/2020, 4:09:43 AM   / HIT
[Nest] 28111   - 09/09/2020, 4:09:43 AM   / HIT
[Nest] 28102   - 09/09/2020, 4:09:43 AM   / HIT
[Nest] 28135   - 09/09/2020, 4:09:43 AM   / HIT
[Nest] 28126   - 09/09/2020, 4:09:43 AM   / HIT
[Nest] 28102   - 09/09/2020, 4:09:43 AM   / HIT
[Nest] 28111   - 09/09/2020, 4:09:43 AM   / HIT
[Nest] 28126   - 09/09/2020, 4:09:43 AM   / HIT
[Nest] 28079   - 09/09/2020, 4:09:43 AM   / HIT
[Nest] 28142   - 09/09/2020, 4:09:44 AM   40000
[Nest] 28142   - 09/09/2020, 4:09:44 AM   50000
[Nest] 28142   - 09/09/2020, 4:09:44 AM   60000
[Nest] 28142   - 09/09/2020, 4:09:44 AM   70000
[Nest] 28142   - 09/09/2020, 4:09:45 AM   80000
[Nest] 28142   - 09/09/2020, 4:09:45 AM   90000

```
You will see all the `/HIT` complete before `/long` does.  If however, you `NODE_CLUSTER_SCHED_POLICY="rr"` for Round Robin, you'll see the last `/ HIT` complete after `/long` completes

Example stdout:

```
[Nest] 28304   - 09/09/2020, 4:13:46 AM   0
[Nest] 28304   - 09/09/2020, 4:13:46 AM   10000
[Nest] 28304   - 09/09/2020, 4:13:47 AM   20000
[Nest] 28351   - 09/09/2020, 4:13:47 AM   / HIT
[Nest] 28327   - 09/09/2020, 4:13:47 AM   / HIT
[Nest] 28311   - 09/09/2020, 4:13:47 AM   / HIT
[Nest] 28385   - 09/09/2020, 4:13:47 AM   / HIT
[Nest] 28364   - 09/09/2020, 4:13:47 AM   / HIT
[Nest] 28335   - 09/09/2020, 4:13:47 AM   / HIT
[Nest] 28320   - 09/09/2020, 4:13:47 AM   / HIT
[Nest] 28367   - 09/09/2020, 4:13:47 AM   / HIT
[Nest] 28310   - 09/09/2020, 4:13:47 AM   / HIT
[Nest] 28342   - 09/09/2020, 4:13:47 AM   / HIT
[Nest] 28375   - 09/09/2020, 4:13:47 AM   / HIT
[Nest] 28304   - 09/09/2020, 4:13:47 AM   30000
[Nest] 28304   - 09/09/2020, 4:13:47 AM   40000
[Nest] 28304   - 09/09/2020, 4:13:48 AM   50000
[Nest] 28304   - 09/09/2020, 4:13:48 AM   60000
[Nest] 28304   - 09/09/2020, 4:13:48 AM   70000
[Nest] 28304   - 09/09/2020, 4:13:48 AM   80000
[Nest] 28304   - 09/09/2020, 4:13:49 AM   90000
[Nest] 28304   - 09/09/2020, 4:13:49 AM   / HIT

```

## Internal Queue

You must have redis running. You can do this simply by using docker and:

```bash
$ docker run -it -p 6379:6379 redis
```

You can supply the redis configuration in the imports array of the module (app.module.ts) file, but if you're using the defaults, you can edit this.

### Edge-cases

Below are instructions on how you can observe how the internal Queue abstraction deals with two edge-cases; resilience and durability.

The endpoint to use, to place messages on the internal Queue is:

```bash
$ for i in `seq 1 10000`; do curl http://localhost:3000/long/queued & done
```

#### Scenario: Your service fails

Run your implementation `npm run start:debug`, then SIGTERM.  Now restart, and you will see - from the stdout - that it picks up the from where it left off.


#### Scenario: Redis fails 

Run your implementation `npm run start:debug`.  Now stop the the redis container.  Wait a few moments, then restart it.  You will see - from the stdout - that it picks up the from where it left off.

----

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
