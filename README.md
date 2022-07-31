# my-first-substrate-project-series-III-part-1  
  
## The Local Node  
  
### Install Rust-based Implementation of A Substrate Node For Local Development  
  
### NOTE: Review all this prior to doing any of it, to save yourself some time.  
```  
git clone --branch polkadot-v0.9.26 --depth 1 https://github.com/substrate-developer-hub/substrate-node-template
```
  
```
cd substrate-node-template
```
  
```
cargo build --package node-template --release
```

#### First Error I encountered:  
```
 running: "cmake" "/home/IamDeveloper/.cargo/registry/src/github.com-1ecc6299db9ec823/prost-build-0.10.4/third-party/protobuf/cmake" "-Dprotobuf_BUILD_TESTS=OFF" "-DCMAKE_INSTALL_PREFIX=/home/IamDeveloper/MySoftwareProjects/blockchain/rust/rust-substrate-blockchain-projects/substrate-node-template/target/release/build/prost-build-777da325b1d53de7/out" "-DCMAKE_C_FLAGS= -ffunction-sections -fdata-sections -fPIC -m64" "-DCMAKE_C_COMPILER=/usr/bin/cc" "-DCMAKE_CXX_FLAGS= -ffunction-sections -fdata-sections -fPIC -m64" "-DCMAKE_CXX_COMPILER=/usr/bin/c++" "-DCMAKE_ASM_FLAGS= -ffunction-sections -fdata-sections -fPIC -m64" "-DCMAKE_ASM_COMPILER=/usr/bin/cc" "-DCMAKE_BUILD_TYPE=Debug"

  --- stderr
  thread 'main' panicked at '
  failed to execute command: No such file or directory (os error 2)
  is `cmake` not installed?

  build script failed, must exit now', /home/IamDeveloper/.cargo/registry/src/github.com-1ecc6299db9ec823/cmake-0.1.48/src/lib.rs:975:5
  note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
warning: build failed, waiting for other jobs to finish...
```

So I tried:  
```
$ cmake

Command 'cmake' not found, but can be installed with:

sudo apt install -y cmake
```
  
Again re-ran the above ```cargo build .. blah blah```  

#### Next Error:  
  
```
error: failed to run custom build command for `librocksdb-sys v0.6.1+6.28.2`

Caused by:
  process didn't exit successfully: `/home/IamDeveloper/MySoftwareProjects/blockchain/rust/rust-substrate-blockchain-projects/substrate-node-template/target/release/build/librocksdb-sys-ac2fe66720d44a9f/build-script-build` (exit status: 101)
  --- stderr
  thread 'main' panicked at 'Unable to find libclang: "couldn't find any valid shared libraries matching: ['libclang.so', 'libclang-*.so', 'libclang.so.*', 'libclang-*.so.*'], set the `LIBCLANG_PATH` environment variable to a path where one of these files can be found (invalid: [])"',
```
  
So I tried:  
```
$ clang

Command 'clang' not found, but can be installed with:

sudo apt install clang
```
   
#### The Next Error:  
  
```
error: failed to run custom build command for `node-template-runtime v4.0.0-dev (/home/IamDeveloper/MySoftwareProjects/blockchain/rust/rust-substrate-blockchain-projects/substrate-node-template/runtime)`

Caused by:
  process didn't exit successfully: `/home/IamDeveloper/MySoftwareProjects/blockchain/rust/rust-substrate-blockchain-projects/substrate-node-template/target/release/build/node-template-runtime-09c8dcaca5b69721/build-script-build` (exit status: 1)
  --- stderr
  Rust nightly not installed, please install it!
warning: build failed, waiting for other jobs to finish...
```
  
I did NOT want set my rust environment as ```nightly```, so instead, I did:  
```
cargo +nightly build --package node-template --release
```
  
#### But then another error:  
  
```
$ cargo +nightly build --package node-template --release
error: toolchain 'nightly-x86_64-unknown-linux-gnu' is not installed
```
  
So, then do:  
```
rustup install nightly-x86_64-unknown-linux-gnu
```
```
$ rustup update
```
  
And try to build again:
```
cargo +nightly build --package node-template --release
```
  
#### The Next Error:  
  
```
Caused by:
  process didn't exit successfully: `/home/IamDeveloper/MySoftwareProjects/blockchain/rust/rust-substrate-blockchain-projects/substrate-node-template/target/release/build/node-template-runtime-6c171c388ccdfbca/build-script-build` (exit status: 1)
  --- stderr
  Rust WASM toolchain not installed, please install it!

    Compiling wasm-test v1.0.0 (/tmp/.tmp6yr81Z)
  error[E0463]: can't find crate for `std`
    |
    = note: the `wasm32-unknown-unknown` target may not be installed
    = help: consider downloading the target with `rustup target add wasm32-unknown-unknown`
    = help: consider building the standard library from source with `cargo build -Zbuild-std`
```
  
This did NOT work:  
```
rustup target add wasm32-unknown-unknown #<--not work
```
  
This DID work:  
```
rustup target add wasm32-unknown-unknown --toolchain nightly
```
  
After doing all the above, I realize that we no longer need to add the ```+nightly```.  
```
cargo +nightly build --package node-template --release #<--not required
```
  
Instead, we can do this:  
```
cargo  build --package node-template --release
```
  
#### If you got this far, try firing up your new substate node.  
  
Enter the path to get to: ```./target/release/node-template``` and do:  
```
./target/release/node-template --help
```
  
Also try:  
```
$ ./target/release/node-template key inspect //Alice
Secret Key URI `//Alice` is account:
  Network ID:        substrate
 Secret seed:       0xe5be9a5092b81bca64be81d212e7f2f9eba183bb7a90954f7b76361f6edb5c0a
  Public key (hex):  0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d
  Account ID:        0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d
  Public key (SS58): 5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY
  SS58 Address:      5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY
```
  
You are ready to start up the node:  

```
$ ./target/release/node-template --dev
2022-07-23 23:23:39 〽️ Prometheus exporter started at 127.0.0.1:9615
2022-07-23 23:23:42 🙌 Starting consensus session on top of parent 0x44bedeac307d43d9c0cb1ca87ddcc573f22edb6a14789171ba6fc156458e0713
2022-07-23 23:23:42 🎁 Prepared block for proposing at 1 (1 ms) [hash: 0xde2420b7e3d5d15336bb009d8385158e858f44e4871c272a9e301c4904ee3b06; parent_hash: 0x44be…0713; extrinsics (1): [0xdb18…a3d7]]
2022-07-23 23:23:42 🔖 Pre-sealed block for proposal at 1. Hash now 0xce236471ea39ce6a62a1d90187fdb4cd7d44527957cb7421a7206c5e36385b0b, previously 0xde2420b7e3d5d15336bb009d8385158e858f44e4871c272a9e301c4904ee3b06.
2022-07-23 23:23:42 ✨ Imported #1 (0xce23…5b0b)
2022-07-23 23:23:44 💤 Idle (0 peers), best: #1 (0xce23…5b0b), finalized #0 (0x44be…0713), ⬇ 0 ⬆ 0
2022-07-23 23:23:48 🙌 Starting consensus session on top of parent 0xce236471ea39ce6a62a1d90187fdb4cd7d44527957cb7421a7206c5e36385b0b
2022-07-23 23:23:48 🎁 Prepared block for proposing at 2 (0 ms) [hash: 0x9ecbc62fa10bab632bf852e094c4d6440b03a96d05d404c24e6969f2e8ae92fa; parent_hash: 0xce23…5b0b; extrinsics (1): [0x7768…5572]]
2022-07-23 23:23:48 🔖 Pre-sealed block for proposal at 2. Hash now 0xd8ab745e897a1b51326a9c34364cfc9f586cf390874616a7004966729ff1894a, previously 0x9ecbc62fa10bab632bf852e094c4d6440b03a96d05d404c24e6969f2e8ae92fa.
```

The above will just keep on going.  We are now ready to try to connect to it via a simple Node.js Javascript client.  
  
# The Client  
#### We are ready to use our Javascript client (see this project's file(s)).  
  
We need a Javascript library to make our lives easier, so we search for ```@polkadot```.  

```
npm search @polkadot
NAME                      | DESCRIPTION          | AUTHOR          | DATE       | VERSION  | KEYWORDS
@polkadot/types-known     | Known type…          | =polkadotjs…    | 2022-07-23 | 8.14.1   |
@polkadot/primitives-buil | Builder for…         | =polkadotjs…    | 2018-06-26 | 0.25.1   | Polkadot
der                       |                      |                 |            |          |
@polkadot/primitives-code | Encoding for…        | =polkadotjs…    | 2018-06-27 | 0.25.3   | Polkadot
c                         |                      |                 |            |          |
@polkadot/util-triehash   | Creation of…         | =polkadotjs…    | 2018-06-26 | 0.24.9   | Polkadot
@polkadot/rx-api          | An RxJs wrapper…     | =polkadotjs…    | 2018-05-06 | 0.6.1    | Polkadot RxJs
@polkadot/util            | A collection of…     | =polkadotjs…    | 2022-07-21 | 10.1.1   |
@polkadot/api             | Promise and RxJS…    | =polkadotjs…    | 2022-07-23 | 8.14.1   |
@polkadot/primitives-json | Conversion…          | =polkadotjs…    | 2018-06-26 | 0.25.1   | Polkadot
@polkadot/util-crypto     | A collection of…     | =polkadotjs…    | 2022-07-21 | 10.1.1   |
@polkadot/client-state    | Global shared state… | =polkadotjs…    | 2018-02-28 | 0.8.6    | Polkadot
@polkadot/util-triedb     | Creation of…         | =polkadotjs…    | 2018-07-03 | 0.26.11  | Polkadot
@polkadot/client-wasm-run | Basic execution…     | =polkadotjs…    | 2018-02-20 | 0.8.3    | Polkadot wasm
time                      |                      |                 |            |          |
@polkadot/client-polkadot | Polkadot-specific…   | =polkadotjs…    | 2018-03-19 | 0.8.13   | Polkadot
@polkadot/primitives      | Type defintions for… | =polkadotjs…    | 2018-09-28 | 0.30.3   | Polkadot
@polkadot/util-keyring    | Keyring management   | =polkadotjs…    | 2018-09-28 | 0.30.7   | Polkadot Keyring ed25519
@polkadot/apps-config     | General config for…  | =polkadotjs…    | 2022-07-19 | 0.118.1  |
@polkadot/params          | Type defintions for… | =polkadotjs…    | 2018-09-28 | 0.30.3   | Polkadot
@polkadot/keyring         | Keyring management   | =polkadotjs…    | 2022-07-21 | 10.1.1   |
@polkadot/api-provider    | Transport providers… | =polkadotjs…    | 2018-10-10 | 0.30.45  | Polkadot JsonRPC
@polkadot/types           | Implementation of…   | =polkadotjs…    | 2022-07-23 | 8.14.1   |
```
  
In the above table, it is the ```@polkadot/api```.  
  
I installed it globally.  
```
npm install -g @polkadot/api
```
  
That is why if you look at this project's directory structure, you'll see a link to ```node_modules```.  
  
Finally, run the client with ```node client.js```.  
  
