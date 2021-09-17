import { Group } from './group.model';

export interface MemberList {
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: true;
    groups: Array<Group>;
    tenantId: string;
    id: string;
    createdTime: Date;
    updatedTime: Date;
}
