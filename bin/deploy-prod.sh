#!/bin/bash

aws s3 sync out/_next s3://brace-docs/_next --size-only --delete --cache-control max-age=31536000

aws s3 sync out/nextImageExportOptimizer s3://brace-docs/nextImageExportOptimizer --size-only --delete --cache-control max-age=31536000

aws s3 sync out s3://brace-docs --exclude "_next/*" --exclude "nextImageExportOptimizer/*" --exclude "images/next-image-export-optimizer-hashes.json" --size-only --delete --cache-control max-age=86400

#aws cloudfront create-invalidation --distribution-id [!!!] --paths /index.html
