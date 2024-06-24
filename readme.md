# cloudwatch-alarm-to-discord

A lambda function that takes a Discord Webhook and an SNS topic, publishes Cloudwatch Alarms to Discord.



## Getting Started

1. In Discord, go to **Server settings** -> **Webhooks** -> **Create Webhook**
2. Setup name, avatar and the channel, where it will be posted. Copy *Webhook URL*.
3. Click **`Save`** and then the **`Done`** button
4. Install this application from the [Serverless Application Repository](https://serverlessrepo.aws.amazon.com/applications/eu-west-1/861083437437/cloudwatch-alarm-to-discord).
5. Fill out the parameters in the installation form:
   1. *AlarmTopicArn* - ARN of the SNS topic which receives the CloudWatch Alarms that you want to post in Discord.
   2. *DiscordWebhookUrl* - The URL of the incoming webhook that you copied from the channel connector in step 1.
6. Deploy the application.


## Development

### Publish to SAR

* `npm i`
* `npm run build`
* `sam package . --resolve-s3 --output-template-file packaged.yaml`
* `sam publish --template packaged.yaml --region eu-west-1`

*Heavy inspiration from <https://github.com/idealo/cloudwatch-alarm-to-ms-teams>*
