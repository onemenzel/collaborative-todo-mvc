import { Doc } from "yjs";
import { WebrtcProvider, WebrtcProviderOptions } from "y-webrtc";
import { IndexeddbPersistence } from "y-indexeddb";
import { generateRandomString } from "@/util";

export const doc = new Doc();
doc.gc = true;

function init() {
  let [room, password] = window.location.hash.substr(1).split("-");

  if (!room || !password) {
    room = generateRandomString(10);
    password = generateRandomString();
    window.location.hash = `#${room}-${password}`;
  }

  // I know that this is not the most secure way to store credentials...
  // but it surely is comfy :)
  const rooms = new Set<string>(JSON.parse(localStorage.getItem("rooms") || "[]"));
  rooms.add(room);
  localStorage.setItem("rooms", JSON.stringify(Array.from(rooms)));
  localStorage.setItem(room, password);

  // TODO: load rooms from localstorage and give them a nice name

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const webrtcProvider = new WebrtcProvider("superduper-todo-test-" + room, doc, {
    password,
    peerOpts: {},
  } as WebrtcProviderOptions);

  const indexeddbProvider = new IndexeddbPersistence(room, doc);
}

window.addEventListener("hashchange", init);
window.addEventListener("load", init);
