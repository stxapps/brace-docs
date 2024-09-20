#!/bin/bash

aws s3 sync out/_next s3://brace-docs/_next --size-only --delete --cache-control max-age=31536000

aws s3 sync out/nextImageExportOptimizer s3://brace-docs/nextImageExportOptimizer --size-only --delete --cache-control max-age=31536000

aws s3 sync out s3://brace-docs --exclude "_next/*" --exclude "nextImageExportOptimizer/*" --exclude "images/next-image-export-optimizer-hashes.json" --size-only --delete --cache-control max-age=86400

# Use CloudFront Function instead to map url path to html file
#(cd out &&
#  find . -type f -name '*.html' | while read HTMLFILE; do
#    HTMLFILESHORT=${HTMLFILE:2}
#    HTMLFILE_WITHOUT_EXT=${HTMLFILESHORT::${#HTMLFILESHORT}-5}
#
#    aws s3 cp ${HTMLFILE} s3://brace-docs/$HTMLFILE_WITHOUT_EXT --content-type "text/html" --cache-control max-age=86400
#  done)

# Must invalidation index.html and index.txt
#aws cloudfront create-invalidation --distribution-id [!!!] --paths "/*"
#aws cloudfront create-invalidation --distribution-id [!!!] --paths /index.html
