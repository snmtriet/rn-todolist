import {TimestampType} from '../types';

const timestampToDate = (
  timestamp: TimestampType | Date | undefined,
): Date | undefined => {
  if (timestamp instanceof Date) {
    return timestamp;
  }

  if (timestamp) {
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6;
    return new Date(milliseconds);
  }

  return undefined;
};

export default timestampToDate;
