import { ComponentPermission } from './component-permission.model';

export interface Invitee {
  inviteeId: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  invitationExpiry: string;
  invitationCode: string;
  invitationLink: string;
  componentPermissions: Array<ComponentPermission>;
}
