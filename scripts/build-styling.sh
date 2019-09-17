#!/usr/bin/env bash

set -e

sassfiles=(`find src -name "*.scss"`)
echo ${sassfiles}

for sassfile in ${sassfiles[@]}; do
  # skip partials
  if [[ `basename ${sassfile}` =~ ^_ ]]; then
    echo 'coninie'
    continue
  fi
  cssts=`echo ${sassfile} | sed -e 's/.scss/-css.ts/'`
  echo ${cssts}
  lastdir=`basename $(dirname ${cssts})`
  echo ${lastdir}
  echo "Generating ${cssts}"
  node scripts/sass-render/bin/sass-render.js -t scripts/sass-template.tmpl -s ${sassfile} -o ${cssts}
done