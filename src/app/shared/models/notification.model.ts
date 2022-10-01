
import { IUser } from './user.model';

export interface INotification {
  id?: string;
  title?: string;
  content?: string;
  note?: string;

  buildingIds?: string;
  floorIds?: string;
  organizationIds?: string;
  fileIds?: string;
  eventFiles?: any;
  notificationAt?: any;
  expectedFinishAt?: any;
  expectedNotificationAt?: any;
  lastModifiedAt?: any;
  status?: string;
  eventLevel?: string;
  senderUsername?: string;
  issuedUserName?: string;
  issuedUserId?: string;
  checked?: boolean;
  disabled?: boolean;
  userIds?: IUser[];
  types?: string[];
  isRead?: boolean;
  isSend?: boolean;
  sendAt?: any;
  sendTo?: string;
}

export class Notification implements INotification {
  constructor(
    public id?: string,
    public title?: string,
    public content?: string,
    public note?: string,
    public buildingIds?: string,
    public floorIds?: string,
    public organizationIds?: string,
    public fileIds?: string,
    public eventFiles?: string,
    public notificationAt?: any,
    public expectedNotificationAt?: any,
    public expectedFinishAt?: any,
    public lastModifiedAt?: any,
    public status?: string,
    public eventLevel?: string,
    public senderUsername?: string,
    public issuedUserName?: string,
    public issuedUserId?: string,
    public checked?: boolean,
    public disabled?: boolean,
    public userIds?: IUser[],
    public types?: string[],
    public isRead?: boolean,
    public isSend?: boolean,
    public sendAt?: any,
    public sendTo?: string,
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.buildingIds = buildingIds;
    this.floorIds = floorIds;
    this.organizationIds = organizationIds;
    this.fileIds = fileIds;
    this.eventFiles = eventFiles;
    this.expectedNotificationAt = expectedNotificationAt;
    this.expectedFinishAt = expectedFinishAt;
    this.notificationAt = notificationAt;
    this.lastModifiedAt = lastModifiedAt;
    this.status = status;
    this.eventLevel = eventLevel;
    this.senderUsername = senderUsername;
    this.issuedUserName = issuedUserName;
    this.issuedUserId = issuedUserId;
    this.checked = checked;
    this.disabled = disabled;
    this.userIds = userIds;
    this.types = types;
    this.isRead = isRead;
    this.isSend = isSend;
    this.sendAt = sendAt;
    this.sendTo = sendTo;

  }
}
