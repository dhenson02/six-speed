# six-speed

ES6 polyfill vs. feature performance tests.

Report is located at http://kpdecker.github.io/six-speed/

## Usage

```
gulp test:sauce
```

Test against all registered Sauce Labs browsers.

```
gulp test:node
```

Tests against the current node version.

```
gulp profile:node --testName=$name --type=$type --count=$iterationCount
```

Profiles a given test within the current Node environment.

```
gulp server
```

Starts a server instance for manual browser testing. Tests may be accessed via `http://machineName:9999/` and the `#` component may be used to filter the tests to be executed, i.e. `http://machineName:9999/#promise`

Profiling of specific tests may be done through `http://machineName:9999/profile.html?testName=$testName&type=$type&count=$number`, i.e. `http://localhost:9999/profile.html?testName=generator&type=babel&count=1000000`.

Firefox browsers need to use `/moz/index.html` and `/moz/profile.html` respectively to enable all supported ES6 features.

```
gulp report
```

Generates the data report.


## Testing methodology

For each of the ES6 features in question, a ES5 implementation of that functionality was written along with a ES6 version. It should be noted that the functionality is frequently the same, but in some cases the "common" vs. "correct" version was written, i.e. using `x[key] = value` vs. `defineProperty` which is faster but can be hit but a particular nasty edge case for those who deem it fun to extend `Object.prototype`.

Babel, in both loose+runtime and runtime mode, and Traceur were then used to compile the ES6 version to a ES5 compliant version, utilizing the runtime over polyfill to maintain test isolation and avoid native implementations where possible.

All of these test instances were then benchmarked in the given JavaScript engine using [Benchmark.js](http://benchmarkjs.com/) and then the operations per second compared to the ES5 implementation. Cross browser and cross execution comparisions are avoided as much as possible to isolate environmental issues when executing on VMs in the cloud.

## Test Steps

1. `./bin/test-all.sh`
2. `gulp test:edge`
3. Open page in Edge instance
  1. Ensure ES6 feature enabled in `about:flags` (See [#10](https://github.com/kpdecker/six-speed/issues/10))
4. `gulp report`
5. Checkin changes to site sub-repository.

## Links

- [V8 Harmony Features](https://code.google.com/p/v8/issues/list?q=label:Harmony)
- [Firefox ES6 Meta Bug](https://bugzilla.mozilla.org/show_bug.cgi?id=694100)
- [WebKit ES6 Meta Bug](https://bugs.webkit.org/show_bug.cgi?id=80559)


## Thanks

Thanks to [BrowserStack](browserstack.com) and [Sauce Labs](https://saucelabs.com/) for providing open source accounts which the majority of this testing was performed on.