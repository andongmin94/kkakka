export interface AlarmType {
  alarmId: number;
  alarmContent: string;
  alarmPic: string;
  isChecked: boolean;
  createdAt: Date;
  frqEmail: string | null;
  relatedContentId: number | null;
}
