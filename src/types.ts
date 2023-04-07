import Peer, { DataConnection } from 'peerjs';
import { Ref } from 'vue';

export type MessagePing = { kind: 'ping' };
export type MessageClose = { kind: 'close' };
export type DataMessage = MessageClose | MessagePing;
export type RefDataConnection = Ref<DataConnection | null>;
export type RefPeer = Ref<Peer>;
