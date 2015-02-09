Rocket May's Baby Sleep Log
===

A D3 driven baby sleep log to track a baby's sleep.


#### Installing Dependencies

Make sure you have Node.js along with Bower installed.

```sh
if [[ `which node` && `which bower` ]]; then echo "bower `bower -v` and node `node -v`"; fi
```

Install the server, asset pipeline, and client-dependencies:
```sh
npm install && bower install
```

#### Running Server

Running the application in development is very straight-forward. It's also the only option.

Run the server and watch files for changes.
```sh
grunt watch
```

At this point the application is available at http://localhost:3000/
