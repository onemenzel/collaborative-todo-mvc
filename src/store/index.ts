import { Doc } from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { IndexeddbPersistence } from "y-indexeddb";

export const doc = new Doc();
doc.gc = true;

/* eslint-disable @typescript-eslint/no-unused-vars */
const webrtcProvider = new WebrtcProvider("superduper-todo-test-f9iw8h4fi", doc, {
  password: "nliyser34lehufv874",
});
const indexeddbProvider = new IndexeddbPersistence("superduper-todo-test", doc);
