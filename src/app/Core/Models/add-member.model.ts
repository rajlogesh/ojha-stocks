import { MemberPermission } from './member-permission.model';

export interface AddMember {
    inviteeId:	string;
    email:	string;
    firstName:	string;
    lastName:	string;
    permissions: Array<MemberPermission>;
}
