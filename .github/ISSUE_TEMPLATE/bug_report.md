---
name: Bug report
about: Something breaks while generating or using generated code

---

<!-- 🚨🚨🚨 READ THIS FIRST 🚨🚨🚨 -->
<!--
   In order to help address issues quickly, we need you to make a best effort to complete the information below. Any incomplete bug reports will be closed.
-->


### Please paste the output of `ember -v` here
<!-- example

  ember-cli: 3.1.4
  node: 10.5.0
  os: darwin x64

-->

### Please paste the output of `./node_modules/.bin/tsc -v` here
<!-- example

  Version 2.9.2

-->

### Please paste your `tconfig.json` and `tslint.json` or `eslint.json` (if applicable) below


<details><summary><b>My tsconfig.json</b></summary><pre>

  <!-- Paste your tsconfig.json here -->
  
</pre></details>

<details><summary><b>My tslint.json or eslint.json</b></summary><pre>

  <!-- Paste your tslint.json here -->

</pre></details>

### What are instructions we can follow to reproduce the issue?
```sh
ember new sample; cd ./sample # Create a new ember app
ember install ember-cli-typescript # Set up typescript support

>> Your Instructions Go Here <<

```
<!-- example: "Create a new route, add an action to it as shown in the following code sample" -->


### Now about that bug. What did you expect to see?
<!-- example: "I expected to be able to invoke my function foo() -->

### What happened instead?
<!-- example: "TypeScript seems to think that there is no function foo()" -->
