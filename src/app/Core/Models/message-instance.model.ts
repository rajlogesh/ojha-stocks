export interface MessageInstance {
  partition?: string;
  correlationId?: string;
  parentReferenceId?: string;
  clientTrackingId?: string;
  label: string;
  messageType: string;
  messageTypeVersion?: string;
  source?: string;
  status?: string;
  statusTime?: string;
  direction?: string;
  sender?: string;
  contentType?: string;
  contentUrl?: string;
  messageSize?: string;
  externalReferenceId?: string;
  messageReferenceId?: string;
  ackValue?: string;
  tenantId?: string;
  id?: string;
  createdTime?: string;
  updatedTime?: string;
}
