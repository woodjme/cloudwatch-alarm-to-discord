export interface CloudwatchAlarmNotification {
    AlarmName: string;
    AlarmDescription: string;
    AWSAccountId: string;
    NewStateValue: CloudwatchAlarmState;
    NewStateReason: string;
    StateChangeTime: string;
    Region: string;
    AlarmArn: string;
    OldStateValue: CloudwatchAlarmState;
    Trigger: Trigger;
}

export enum CloudwatchAlarmState {
    OK = 'OK',
    ALARM = 'ALARM',
    INSUFFICIENT_DATA = 'INSUFFICIENT_DATA',
}

export function isCloudwatchAlarmNotification(x: any): x is CloudwatchAlarmNotification {
    return x != null && x.AlarmName != null;
}

export interface Trigger {
    MetricName: string;
    Namespace: string;
    Statistic: string;
    Unit: string;
    Dimensions: Dimension[];
    Period: number;
    EvaluationPeriods: number;
    ComparisonOperator: ComparisonOperator;
    Threshold: number;
    TreatMissingData: string;
    EvaluateLowSampleCountPercentile: string;
}
export interface Dimension {
    name: string;
    value: string;
}

export enum ComparisonOperator {
    GREATER_THAN_THRESHOLD = 'GreaterThanOrEqualToThreshold',
    GREATER_THAN_OR_EQUAL_TO_THRESHOLD = 'GreaterThanThreshold',
    LESS_THAN_THRESHOLD = 'LessThanThreshold',
    LESS_THAN_OR_EQUAL_TO_THRESHOLD = 'LessThanOrEqualToThreshold',
    LESS_THAN_LOWER_OR_GREATER_THAN_UPPER_THRESHOLD = 'LessThanLowerOrGreaterThanUpperThreshold',
    LESS_THAN_OR_EQUAL_TO_LOWER_THRESHOLD = 'LessThanOrEqualToLowerThreshold',
    GREATER_THAN_OR_EQUAL_TO_UPPER_THRESHOLD = 'GreaterThanOrEqualToUpperThreshold',
    GREATER_THAN_UPPER_THRESHOLD = 'GreaterThanUpperThreshold',
    GREATER_THAN_OR_EQUAL_TO_LOWER_THRESHOLD = 'GreaterThanOrEqualToLowerThreshold',
    LESS_THAN_OR_EQUAL_TO_UPPER_THRESHOLD = 'LessThanOrEqualToUpperThreshold',
    ABSOLUTE_VALUE = 'AbsoluteValue',
}
