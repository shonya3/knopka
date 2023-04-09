import Peer, { DataConnection } from 'peerjs';
import { Ref } from 'vue';

export type MessageRedButton = { kind: 'red-button' };
export type MessageClose = { kind: 'close' };
export type MessageAlive = { kind: 'alive' };
export type DataMessage = MessageClose | MessageRedButton | MessageAlive;
export type RefDataConnection = Ref<DataConnection | null>;
export type RefPeer = Ref<Peer>;
