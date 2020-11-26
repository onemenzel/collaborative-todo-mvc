# Collaborative Todo MVC

This is a simple Todo MVC app with a twist: it's fully collaborative without the need for
a server. This is realised using [Yjs](https://yjs.dev/), an implementation of the CRDT
data type concept.

As I see much potential in this technology, I wanted to have a try. Also, I wanted to play
with the new Vue 3 release. So I made wrapper functions to integrate Yjs with Vue's new
composition API. It works like a charm. I'd consider this the heart of this application.
Go have a look at [the utils file](https://github.com/onemenzel/collaborative-todo-mvc/blob/master/src/util.ts).

I also made some types for a nicer TypeScript integration of Yjs.

## Commands
```sh
# setup
yarn install

# Compiles and hot-reloads for development
yarn serve

# same but in the local network
yarn servenet

# Compiles and minifies for production
yarn build

# Lints and fixes files
yarn lint
```

