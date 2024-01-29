export interface AlarmType {
  alarmID: number;
  alarmContent: string;
  alarmPic: string;
  isChecked: boolean;
  createdAt: Date;
  frqEmail: string | null;
  dogamId: number | null;
}
