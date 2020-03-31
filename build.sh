#!/bin/bash

rm -rf .daml daml-ts node_modules sandbox.log yarn.lock ui/node_modules ui/build

daml build
daml codegen ts .daml/dist/virtual-vending-0.1.0.dar -o daml-ts

yarn install
yarn workspaces run build