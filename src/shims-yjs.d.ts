import { OptionalKeys } from "ts-essentials";
import { Options as PeerOpts } from "simple-peer";

declare module "y-webrtc" {
  export interface WebrtcProviderOptions {
    signaling: Array<string>;
    password: string | null;
    awareness: awarenessProtocol.Awareness;
    maxConns: number;
    filterBcConns: boolean;
    peerOpts: PeerOpts;
  }

  export interface WebrtcProvider {
    constructor(
      roomName: string,
      doc: Y.Doc,
      options?: Partial<Options>,
    );
  }
}
