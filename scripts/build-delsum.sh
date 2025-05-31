#!/bin/sh
set -eu
cd "$(dirname -- "$0")/.."
tmpdir="$(mktemp -d)"
build="$tmpdir/build"
gf2xdir="$tmpdir/gf2x"
delsumdir="$1"
mkdir "$build"

# gf2x
git clone https://gitlab.inria.fr/gf2x/gf2x "$gf2xdir"
cd "$gf2xdir"
git checkout 1c4974a44bc69a5a5111b44871d96c0cc16c0144
autoreconf --install
export CC="$WASI_SDK_PATH/bin/clang"
export CFLAGS="--sysroot=$WASI_SDK_PATH/share/wasi-sysroot -flto"
./configure --host=wasm32 --prefix="$build"
make
make install
cd -

# delsum wasm
cd "$delsumdir/delsum-web"
export GF2POLY_STATIC_LIB=1
export GF2POLY_LIBRARY_PATH="$build/lib/"
export CARGO_TARGET_DIR="$build"
cargo build --profile=dist --target=wasm32-wasip2
cargo about generate ../licenses.hbs > "$build/licenses.txt"
cd -

# vite build
cd "$delsumdir/delsum-site"
npm install
./node_modules/.bin/jco transpile "$build/wasm32-wasip2/dist/delsum_web.wasm" \
		--optimize --no-nodejs-compat --tla-compat -o src/lib/wasm 
sed -i 's/delsum_web\.core\.wasm/&?no-inline/' src/lib/wasm/delsum_web.js
npm run build
cd -

# jekyll
rm -r assets/apps/delsum
cp -r "$delsumdir/delsum-site/dist" assets/apps/delsum
cp "$build/licenses.txt" assets/apps/delsum/
cleanup
bundle exec jekyll serve
