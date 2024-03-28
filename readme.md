*todo*

Heavy inspiration from https://github.com/idealo/cloudwatch-alarm-to-ms-teams


## Publish to SAR

* `sam package . --resolve-s3 --output-template-file packaged.yaml`
* `sam publish --template packaged.yaml --region eu-west-1`
