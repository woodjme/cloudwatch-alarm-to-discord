import { SNSHandler } from 'aws-lambda';
import { CloudwatchAlarmState, isCloudwatchAlarmNotification } from './sns-message';
import * as log from 'lambda-log';
import { Webhook, MessageBuilder } from 'discord-webhook-node';
import * as arnParser from '@aws-sdk/util-arn-parser';
import { ARN } from '@aws-sdk/util-arn-parser';

export const handler: SNSHandler = async (event) => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error('Discord webhook URL is not set');
  }
  const hook = new Webhook(webhookUrl);

  for (const record of event.Records) {
    const message = JSON.parse(record.Sns.Message);
    if (!isCloudwatchAlarmNotification(message)) {
      log.warn('Ignoring non-alarm message', message);
      continue;
    }

    const embed = new MessageBuilder()
      .setAuthor('AWS Cloudwatch', 'https://user-images.githubusercontent.com/2697570/46758481-30917080-cccd-11e8-966b-9a2813ff1e8a.png')
      .setTitle(`${message.AlarmName}`)
      .setDescription(message.AlarmDescription)
      .setURL(getAlarmLink(message.AlarmArn))
      .addField('Current State', `${getEmoji(message.NewStateValue)} ${message.NewStateValue}: ${message.AlarmName}`)
      .setColor(getColour(message.NewStateValue))
      .setFooter(`${message.Trigger.Statistic} ${message.Trigger.MetricName} ${message.Trigger.ComparisonOperator} ${message.Trigger.Threshold} for ${message.Trigger.EvaluationPeriods} period(s) of ${message.Trigger.Period} seconds.`)
      .setTimestamp();

    try {
      await hook.send(embed);
      console.log('Successfully sent webhook!');
    } catch (e) {
      console.log(e.message);
    }
  }

  log.info(JSON.stringify(event));
}

function getAlarmLink(alarmArn: string) {
  const arn = arnParser.parse(alarmArn);
  return `https://${arn.region}.console.aws.amazon.com/cloudwatch/home?region=${arn.region}#alarmsV2:alarm/${encodeAlarmName(arn)}`;
}

function encodeAlarmName(arn: ARN): string {
  return encodeURIComponent(arn.resource.split(':')[1]);
}

function getEmoji(state: CloudwatchAlarmState): string {
  switch (state) {
    case CloudwatchAlarmState.OK:
      return '✅';
    case CloudwatchAlarmState.ALARM:
      return '🚨';
    case CloudwatchAlarmState.INSUFFICIENT_DATA:
      return '⚠️';
    default:
      return '';
  }
}

function getColour(state: CloudwatchAlarmState): string {
  switch (state) {
    case CloudwatchAlarmState.OK:
      return '#00cc00';
    case CloudwatchAlarmState.ALARM:
      return '#cc0000';
    case CloudwatchAlarmState.INSUFFICIENT_DATA:
      return '#6e7f80';
    default:
      return '#000000';
  }
}
