function Be(r, e) {
  return r.rows.reduce((A, o) => {
    let a = e[o.name];
    return a != null && a != null && a != "" ? (o.type === 2 && (a = `"${a}"`), `${A} ${o.name}=${a}`) : A;
  }, r.name);
}
let xe = 0;
const ze = Symbol.dispose || Symbol.for("dispose"), cA = class {
  constructor(e) {
    this.msg = e;
  }
  toDebugString() {
    return this.msg;
  }
};
let iA = class {
  /**
   * @param {InputStreamHandler} handler
   */
  constructor(e) {
    e || console.trace("no handler"), this.id = ++xe, this.handler = e;
  }
  read(e) {
    return this.handler.read ? this.handler.read(e) : this.handler.blockingRead.call(this, e);
  }
  blockingRead(e) {
    return this.handler.blockingRead.call(this, e);
  }
  skip(e) {
    if (this.handler.skip)
      return this.handler.skip.call(this, e);
    if (this.handler.read) {
      const A = this.handler.read.call(this, e);
      return BigInt(A.byteLength);
    }
    return this.blockingSkip.call(this, e);
  }
  blockingSkip(e) {
    if (this.handler.blockingSkip)
      return this.handler.blockingSkip.call(this, e);
    const A = this.handler.blockingRead.call(this, e);
    return BigInt(A.byteLength);
  }
  subscribe() {
    console.log(`[streams] Subscribe to input stream ${this.id}`);
  }
  [ze]() {
    this.handler.drop && this.handler.drop.call(this);
  }
}, lA = class {
  /**
   * @param {OutputStreamHandler} handler
   */
  constructor(e) {
    e || console.trace("no handler"), this.id = ++xe, this.open = !0, this.handler = e;
  }
  checkWrite(e) {
    return this.open ? this.handler.checkWrite ? this.handler.checkWrite.call(this, e) : 1000000n : 0n;
  }
  write(e) {
    this.handler.write.call(this, e);
  }
  blockingWriteAndFlush(e) {
    this.handler.write.call(this, e);
  }
  flush() {
    this.handler.flush && this.handler.flush.call(this);
  }
  blockingFlush() {
    this.open = !0;
  }
  writeZeroes(e) {
    this.write.call(this, new Uint8Array(Number(e)));
  }
  blockingWriteZeroes(e) {
    this.blockingWrite.call(this, new Uint8Array(Number(e)));
  }
  blockingWriteZeroesAndFlush(e) {
    this.blockingWriteAndFlush.call(this, new Uint8Array(Number(e)));
  }
  splice(e, A) {
    const o = Math.min(A, this.checkWrite.call(this)), a = e.read(o);
    return this.write.call(this, a), a.byteLength;
  }
  blockingSplice(e, A) {
    console.log(`[streams] Blocking splice ${this.id}`);
  }
  forward(e) {
    console.log(`[streams] Forward ${this.id}`);
  }
  subscribe() {
    console.log(`[streams] Subscribe to output stream ${this.id}`);
  }
  [ze]() {
  }
};
const gA = { Error: cA }, Se = { InputStream: iA, OutputStream: lA }, { InputStream: uA, OutputStream: EA } = Se;
let IA = "/", QA = { dir: {} };
const te = {
  seconds: BigInt(0),
  nanoseconds: 0
};
function ve(r, e, A) {
  e === "." && He && BA(He[0]) === r && (e = IA, e.startsWith("/") && e !== "/" && (e = e.slice(1)));
  let o = r, a;
  do {
    if (!o || !o.dir) throw "not-directory";
    a = e.indexOf("/");
    const i = a === -1 ? e : e.slice(0, a);
    if (i === "..") throw "no-entry";
    i === "." || i === "" || (!o.dir[i] && A.create ? o = o.dir[i] = A.directory ? { dir: {} } : { source: new Uint8Array([]) } : o = o.dir[i]), e = e.slice(a + 1);
  } while (a !== -1);
  if (!o) throw "no-entry";
  return o;
}
function Ee(r) {
  return typeof r.source == "string" && (r.source = new TextEncoder().encode(r.source)), r.source;
}
class dA {
  constructor(e) {
    this.idx = 0, this.entries = e;
  }
  readDirectoryEntry() {
    if (this.idx === this.entries.length)
      return null;
    const [e, A] = this.entries[this.idx];
    return this.idx += 1, {
      name: e,
      type: A.dir ? "directory" : "regular-file"
    };
  }
}
let Ce = class Ke {
  #A;
  #e;
  #r = 0;
  _getEntry(e) {
    return e.#e;
  }
  constructor(e, A) {
    A ? this.#A = e : this.#e = e;
  }
  readViaStream(e) {
    const A = Ee(this.#e);
    let o = Number(e);
    return new uA({
      blockingRead(a) {
        if (o === A.byteLength)
          throw { tag: "closed" };
        const i = A.slice(o, o + Number(a));
        return o += i.byteLength, i;
      }
    });
  }
  writeViaStream(e) {
    const A = this.#e;
    let o = Number(e);
    return new EA({
      write(a) {
        const i = new Uint8Array(a.byteLength + A.source.byteLength);
        return i.set(A.source, 0), i.set(a, o), o += a.byteLength, A.source = i, a.byteLength;
      }
    });
  }
  appendViaStream() {
    console.log("[filesystem] APPEND STREAM");
  }
  advise(e, A, o, a) {
    console.log("[filesystem] ADVISE", e, A, o, a);
  }
  syncData() {
    console.log("[filesystem] SYNC DATA");
  }
  getFlags() {
    console.log("[filesystem] FLAGS FOR");
  }
  getType() {
    return this.#A ? "fifo" : this.#e.dir ? "directory" : this.#e.source ? "regular-file" : "unknown";
  }
  setSize(e) {
    console.log("[filesystem] SET SIZE", e);
  }
  setTimes(e, A) {
    console.log("[filesystem] SET TIMES", e, A);
  }
  read(e, A) {
    const o = Ee(this.#e);
    return [o.slice(A, A + e), A + e >= o.byteLength];
  }
  write(e, A) {
    if (A !== 0) throw "invalid-seek";
    return this.#e.source = e, e.byteLength;
  }
  readDirectory() {
    if (!this.#e?.dir)
      throw "bad-descriptor";
    return new dA(Object.entries(this.#e.dir).sort(([e], [A]) => e > A ? 1 : -1));
  }
  sync() {
    console.log("[filesystem] SYNC");
  }
  createDirectoryAt(e) {
    if (ve(this.#e, e, { create: !0, directory: !0 }).source) throw "exist";
  }
  stat() {
    let e = "unknown", A = BigInt(0);
    if (this.#e.source) {
      e = "regular-file";
      const o = Ee(this.#e);
      A = BigInt(o.byteLength);
    } else this.#e.dir && (e = "directory");
    return {
      type: e,
      linkCount: BigInt(0),
      size: A,
      dataAccessTimestamp: te,
      dataModificationTimestamp: te,
      statusChangeTimestamp: te
    };
  }
  statAt(e, A) {
    const o = ve(this.#e, A, { create: !1, directory: !1 });
    let a = "unknown", i = BigInt(0);
    if (o.source) {
      a = "regular-file";
      const l = Ee(o);
      i = BigInt(l.byteLength);
    } else o.dir && (a = "directory");
    return {
      type: a,
      linkCount: BigInt(0),
      size: i,
      dataAccessTimestamp: te,
      dataModificationTimestamp: te,
      statusChangeTimestamp: te
    };
  }
  setTimesAt() {
    console.log("[filesystem] SET TIMES AT");
  }
  linkAt() {
    console.log("[filesystem] LINK AT");
  }
  openAt(e, A, o, a, i) {
    const l = ve(this.#e, A, o);
    return new Ke(l);
  }
  readlinkAt() {
    console.log("[filesystem] READLINK AT");
  }
  removeDirectoryAt() {
    console.log("[filesystem] REMOVE DIR AT");
  }
  renameAt() {
    console.log("[filesystem] RENAME AT");
  }
  symlinkAt() {
    console.log("[filesystem] SYMLINK AT");
  }
  unlinkFileAt() {
    console.log("[filesystem] UNLINK FILE AT");
  }
  isSameObject(e) {
    return e === this;
  }
  metadataHash() {
    let e = BigInt(0);
    return e += BigInt(this.#r), { upper: e, lower: BigInt(0) };
  }
  metadataHashAt(e, A) {
    let o = BigInt(0);
    return o += BigInt(this.#r), { upper: o, lower: BigInt(0) };
  }
};
const BA = Ce.prototype._getEntry;
delete Ce.prototype._getEntry;
let qe = [[new Ce(QA), "/"]], He = qe[0];
const CA = {
  getDirectories() {
    return qe;
  }
}, fA = {
  Descriptor: Ce
}, { InputStream: wA, OutputStream: Pe } = Se, Fe = Symbol.dispose ?? Symbol.for("dispose");
let bA = [];
const kA = {
  getEnvironment() {
    return bA;
  }
};
class pA extends Error {
  constructor(e) {
    super(`Component exited ${e === 0 ? "successfully" : "with error"}`), this.exitError = !0, this.code = e;
  }
}
const yA = {
  exit(r) {
    throw new pA(r.tag === "err" ? 1 : 0);
  }
}, hA = new wA({
  blockingRead(r) {
  },
  subscribe() {
  },
  [Fe]() {
  }
});
let _e = new TextDecoder();
const mA = new Pe({
  write(r) {
    r[r.length - 1] == 10 && (r = r.subarray(0, r.length - 1)), console.log(_e.decode(r));
  },
  blockingFlush() {
  },
  [Fe]() {
  }
}), vA = new Pe({
  write(r) {
    r[r.length - 1] == 10 && (r = r.subarray(0, r.length - 1)), console.error(_e.decode(r));
  },
  blockingFlush() {
  },
  [Fe]() {
  }
}), DA = {
  getStdin() {
    return hA;
  }
}, LA = {
  getStdout() {
    return mA;
  }
}, NA = {
  getStderr() {
    return vA;
  }
};
let $e = class {
}, Ge = class {
};
const MA = new Ge(), RA = new Ge(), JA = new $e(), SA = {
  TerminalInput: $e
}, FA = {
  TerminalOutput: Ge
}, GA = {
  getTerminalStderr() {
    return RA;
  }
}, UA = {
  getTerminalStdin() {
    return JA;
  }
}, TA = {
  getTerminalStdout() {
    return MA;
  }
}, De = 65536, YA = {
  getRandomBytes(r) {
    const e = new Uint8Array(Number(r));
    if (r > De)
      for (var A = 0; A < r; A += De)
        crypto.getRandomValues(e.subarray(A, A + De));
    else
      crypto.getRandomValues(e);
    return e;
  }
}, { getEnvironment: jA } = kA, { exit: XA } = yA, { getStderr: OA } = NA, { getStdin: HA } = DA, { getStdout: ZA } = LA, { TerminalInput: Re } = SA, { TerminalOutput: Qe } = FA, { getTerminalStderr: VA } = GA, { getTerminalStdin: WA } = UA, { getTerminalStdout: xA } = TA, { getDirectories: zA } = CA, {
  Descriptor: W,
  filesystemErrorCode: KA
} = fA, { Error: P } = gA, {
  InputStream: ie,
  OutputStream: S
} = Se, { getRandomBytes: qA } = YA, Ze = (r) => WebAssembly.compile(Uint8Array.from(atob(r), (e) => e.charCodeAt(0)));
class Ue extends Error {
  constructor(e) {
    const A = typeof e != "string";
    super(A ? `${String(e)} (see error.payload)` : e), Object.defineProperty(this, "payload", { value: e, enumerable: A });
  }
}
let B = [], Le = new DataView(new ArrayBuffer());
const c = (r) => Le.buffer === r.buffer ? Le : Le = new DataView(r.buffer), Ve = (r) => fetch(r).then(WebAssembly.compileStreaming);
function H(r) {
  if (r && PA.call(r, "payload")) return r.payload;
  if (r instanceof Error) throw r;
  return r;
}
const PA = Object.prototype.hasOwnProperty, Ie = WebAssembly.instantiate, y = 1 << 30;
function R(r, e) {
  const A = r[0] & -1073741825;
  return A === 0 ? (r.push(0), r.push(e | y), (r.length >> 1) - 1) : (r[0] = r[A << 1], r[A << 1] = 0, r[(A << 1) + 1] = e | y, A);
}
function N(r, e) {
  const A = r[e << 1], o = r[(e << 1) + 1], a = (o & y) !== 0, i = o & -1073741825;
  if (o === 0 || (A & y) !== 0) throw new TypeError("Invalid handle");
  return r[e << 1] = r[0] | y, r[0] = e | y, { rep: i, scope: A, own: a };
}
const h = Symbol.for("cabiDispose"), Q = Symbol("handle"), k = Symbol.for("cabiRep"), m = Symbol.dispose || Symbol.for("dispose");
function Te() {
  throw new TypeError("Wasm uninitialized use `await $init` first");
}
const ae = (r) => BigInt.asUintN(64, BigInt(r));
function Ne(r) {
  return r >>> 0;
}
const V = new TextDecoder(), _A = new TextEncoder();
let x = 0;
function se(r, e, A) {
  if (typeof r != "string") throw new TypeError("expected a string");
  if (r.length === 0)
    return x = 0, 1;
  let o = _A.encode(r), a = e(0, 0, 1, o.length);
  return new Uint8Array(A.buffer).set(o, a), x = o.length, a;
}
let f, G;
const Y = [y, 0], F = /* @__PURE__ */ new Map();
let fe = 0;
function $A() {
  const r = OA();
  if (!(r instanceof S))
    throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
  var e = r[Q];
  if (!e) {
    const A = r[k] || ++fe;
    F.set(A, r), e = R(Y, A);
  }
  return e;
}
const Ye = [y, 0], le = /* @__PURE__ */ new Map();
let er = 0;
function Ar() {
  const r = HA();
  if (!(r instanceof ie))
    throw new TypeError('Resource error: Not a valid "InputStream" resource.');
  var e = r[Q];
  if (!e) {
    const A = r[k] || ++er;
    le.set(A, r), e = R(Ye, A);
  }
  return e;
}
function rr() {
  const r = ZA();
  if (!(r instanceof S))
    throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
  var e = r[Q];
  if (!e) {
    const A = r[k] || ++fe;
    F.set(A, r), e = R(Y, A);
  }
  return e;
}
function tr(r) {
  let e;
  switch (r) {
    case 0: {
      e = {
        tag: "ok",
        val: void 0
      };
      break;
    }
    case 1: {
      e = {
        tag: "err",
        val: void 0
      };
      break;
    }
    default:
      throw new TypeError("invalid variant discriminant for expected");
  }
  XA(e);
}
let U, n, q;
function ar(r) {
  var A = jA(), o = A.length, a = q(0, 0, 4, o * 16);
  for (let u = 0; u < A.length; u++) {
    const b = A[u], d = a + u * 16;
    var [i, l] = b, E = se(i, q, n), g = x;
    c(n).setInt32(d + 4, g, !0), c(n).setInt32(d + 0, E, !0);
    var t = se(l, q, n), s = x;
    c(n).setInt32(d + 12, s, !0), c(n).setInt32(d + 8, t, !0);
  }
  c(n).setInt32(r + 4, o, !0), c(n).setInt32(r + 0, a, !0);
}
const $ = [y, 0], z = /* @__PURE__ */ new Map();
let sr = 0;
function or(r, e) {
  var A = r, o = $[(A << 1) + 1] & -1073741825, a = z.get(o);
  a || (a = Object.create(W.prototype), Object.defineProperty(a, Q, { writable: !0, value: A }), Object.defineProperty(a, k, { writable: !0, value: o })), B.push(a);
  let i;
  try {
    i = { tag: "ok", val: a.getFlags() };
  } catch (g) {
    i = { tag: "err", val: H(g) };
  }
  for (const g of B)
    g[Q] = void 0;
  B = [];
  var l = i;
  switch (l.tag) {
    case "ok": {
      const g = l.val;
      c(n).setInt8(e + 0, 0, !0);
      let t = 0;
      if (typeof g == "object" && g !== null)
        t = !!g.read << 0 | !!g.write << 1 | !!g.fileIntegritySync << 2 | !!g.dataIntegritySync << 3 | !!g.requestedWriteSync << 4 | !!g.mutateDirectory << 5;
      else if (g != null)
        throw new TypeError("only an object, undefined or null can be converted to flags");
      c(n).setInt8(e + 1, t, !0);
      break;
    }
    case "err": {
      const g = l.val;
      c(n).setInt8(e + 0, 1, !0);
      var E = g;
      let t;
      switch (E) {
        case "access": {
          t = 0;
          break;
        }
        case "would-block": {
          t = 1;
          break;
        }
        case "already": {
          t = 2;
          break;
        }
        case "bad-descriptor": {
          t = 3;
          break;
        }
        case "busy": {
          t = 4;
          break;
        }
        case "deadlock": {
          t = 5;
          break;
        }
        case "quota": {
          t = 6;
          break;
        }
        case "exist": {
          t = 7;
          break;
        }
        case "file-too-large": {
          t = 8;
          break;
        }
        case "illegal-byte-sequence": {
          t = 9;
          break;
        }
        case "in-progress": {
          t = 10;
          break;
        }
        case "interrupted": {
          t = 11;
          break;
        }
        case "invalid": {
          t = 12;
          break;
        }
        case "io": {
          t = 13;
          break;
        }
        case "is-directory": {
          t = 14;
          break;
        }
        case "loop": {
          t = 15;
          break;
        }
        case "too-many-links": {
          t = 16;
          break;
        }
        case "message-size": {
          t = 17;
          break;
        }
        case "name-too-long": {
          t = 18;
          break;
        }
        case "no-device": {
          t = 19;
          break;
        }
        case "no-entry": {
          t = 20;
          break;
        }
        case "no-lock": {
          t = 21;
          break;
        }
        case "insufficient-memory": {
          t = 22;
          break;
        }
        case "insufficient-space": {
          t = 23;
          break;
        }
        case "not-directory": {
          t = 24;
          break;
        }
        case "not-empty": {
          t = 25;
          break;
        }
        case "not-recoverable": {
          t = 26;
          break;
        }
        case "unsupported": {
          t = 27;
          break;
        }
        case "no-tty": {
          t = 28;
          break;
        }
        case "no-such-device": {
          t = 29;
          break;
        }
        case "overflow": {
          t = 30;
          break;
        }
        case "not-permitted": {
          t = 31;
          break;
        }
        case "pipe": {
          t = 32;
          break;
        }
        case "read-only": {
          t = 33;
          break;
        }
        case "invalid-seek": {
          t = 34;
          break;
        }
        case "text-file-busy": {
          t = 35;
          break;
        }
        case "cross-device": {
          t = 36;
          break;
        }
        default:
          throw g instanceof Error && console.error(g), new TypeError(`"${E}" is not one of the cases of error-code`);
      }
      c(n).setInt8(e + 1, t, !0);
      break;
    }
    default:
      throw new TypeError("invalid variant specified for result");
  }
}
const oe = [y, 0], _ = /* @__PURE__ */ new Map();
let we = 0;
function nr(r, e) {
  var A = r, o = oe[(A << 1) + 1] & -1073741825, a = _.get(o);
  a || (a = Object.create(P.prototype), Object.defineProperty(a, Q, { writable: !0, value: A }), Object.defineProperty(a, k, { writable: !0, value: o })), B.push(a);
  const i = KA(a);
  for (const g of B)
    g[Q] = void 0;
  B = [];
  var l = i;
  if (l == null)
    c(n).setInt8(e + 0, 0, !0);
  else {
    const g = l;
    c(n).setInt8(e + 0, 1, !0);
    var E = g;
    let t;
    switch (E) {
      case "access": {
        t = 0;
        break;
      }
      case "would-block": {
        t = 1;
        break;
      }
      case "already": {
        t = 2;
        break;
      }
      case "bad-descriptor": {
        t = 3;
        break;
      }
      case "busy": {
        t = 4;
        break;
      }
      case "deadlock": {
        t = 5;
        break;
      }
      case "quota": {
        t = 6;
        break;
      }
      case "exist": {
        t = 7;
        break;
      }
      case "file-too-large": {
        t = 8;
        break;
      }
      case "illegal-byte-sequence": {
        t = 9;
        break;
      }
      case "in-progress": {
        t = 10;
        break;
      }
      case "interrupted": {
        t = 11;
        break;
      }
      case "invalid": {
        t = 12;
        break;
      }
      case "io": {
        t = 13;
        break;
      }
      case "is-directory": {
        t = 14;
        break;
      }
      case "loop": {
        t = 15;
        break;
      }
      case "too-many-links": {
        t = 16;
        break;
      }
      case "message-size": {
        t = 17;
        break;
      }
      case "name-too-long": {
        t = 18;
        break;
      }
      case "no-device": {
        t = 19;
        break;
      }
      case "no-entry": {
        t = 20;
        break;
      }
      case "no-lock": {
        t = 21;
        break;
      }
      case "insufficient-memory": {
        t = 22;
        break;
      }
      case "insufficient-space": {
        t = 23;
        break;
      }
      case "not-directory": {
        t = 24;
        break;
      }
      case "not-empty": {
        t = 25;
        break;
      }
      case "not-recoverable": {
        t = 26;
        break;
      }
      case "unsupported": {
        t = 27;
        break;
      }
      case "no-tty": {
        t = 28;
        break;
      }
      case "no-such-device": {
        t = 29;
        break;
      }
      case "overflow": {
        t = 30;
        break;
      }
      case "not-permitted": {
        t = 31;
        break;
      }
      case "pipe": {
        t = 32;
        break;
      }
      case "read-only": {
        t = 33;
        break;
      }
      case "invalid-seek": {
        t = 34;
        break;
      }
      case "text-file-busy": {
        t = 35;
        break;
      }
      case "cross-device": {
        t = 36;
        break;
      }
      default:
        throw g instanceof Error && console.error(g), new TypeError(`"${E}" is not one of the cases of error-code`);
    }
    c(n).setInt8(e + 1, t, !0);
  }
}
function cr(r, e, A) {
  var o = r, a = $[(o << 1) + 1] & -1073741825, i = z.get(a);
  i || (i = Object.create(W.prototype), Object.defineProperty(i, Q, { writable: !0, value: o }), Object.defineProperty(i, k, { writable: !0, value: a })), B.push(i);
  let l;
  try {
    l = { tag: "ok", val: i.writeViaStream(BigInt.asUintN(64, e)) };
  } catch (s) {
    l = { tag: "err", val: H(s) };
  }
  for (const s of B)
    s[Q] = void 0;
  B = [];
  var E = l;
  switch (E.tag) {
    case "ok": {
      const s = E.val;
      if (c(n).setInt8(A + 0, 0, !0), !(s instanceof S))
        throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
      var g = s[Q];
      if (!g) {
        const u = s[k] || ++fe;
        F.set(u, s), g = R(Y, u);
      }
      c(n).setInt32(A + 4, g, !0);
      break;
    }
    case "err": {
      const s = E.val;
      c(n).setInt8(A + 0, 1, !0);
      var t = s;
      let u;
      switch (t) {
        case "access": {
          u = 0;
          break;
        }
        case "would-block": {
          u = 1;
          break;
        }
        case "already": {
          u = 2;
          break;
        }
        case "bad-descriptor": {
          u = 3;
          break;
        }
        case "busy": {
          u = 4;
          break;
        }
        case "deadlock": {
          u = 5;
          break;
        }
        case "quota": {
          u = 6;
          break;
        }
        case "exist": {
          u = 7;
          break;
        }
        case "file-too-large": {
          u = 8;
          break;
        }
        case "illegal-byte-sequence": {
          u = 9;
          break;
        }
        case "in-progress": {
          u = 10;
          break;
        }
        case "interrupted": {
          u = 11;
          break;
        }
        case "invalid": {
          u = 12;
          break;
        }
        case "io": {
          u = 13;
          break;
        }
        case "is-directory": {
          u = 14;
          break;
        }
        case "loop": {
          u = 15;
          break;
        }
        case "too-many-links": {
          u = 16;
          break;
        }
        case "message-size": {
          u = 17;
          break;
        }
        case "name-too-long": {
          u = 18;
          break;
        }
        case "no-device": {
          u = 19;
          break;
        }
        case "no-entry": {
          u = 20;
          break;
        }
        case "no-lock": {
          u = 21;
          break;
        }
        case "insufficient-memory": {
          u = 22;
          break;
        }
        case "insufficient-space": {
          u = 23;
          break;
        }
        case "not-directory": {
          u = 24;
          break;
        }
        case "not-empty": {
          u = 25;
          break;
        }
        case "not-recoverable": {
          u = 26;
          break;
        }
        case "unsupported": {
          u = 27;
          break;
        }
        case "no-tty": {
          u = 28;
          break;
        }
        case "no-such-device": {
          u = 29;
          break;
        }
        case "overflow": {
          u = 30;
          break;
        }
        case "not-permitted": {
          u = 31;
          break;
        }
        case "pipe": {
          u = 32;
          break;
        }
        case "read-only": {
          u = 33;
          break;
        }
        case "invalid-seek": {
          u = 34;
          break;
        }
        case "text-file-busy": {
          u = 35;
          break;
        }
        case "cross-device": {
          u = 36;
          break;
        }
        default:
          throw s instanceof Error && console.error(s), new TypeError(`"${t}" is not one of the cases of error-code`);
      }
      c(n).setInt8(A + 4, u, !0);
      break;
    }
    default:
      throw new TypeError("invalid variant specified for result");
  }
}
function ir(r, e) {
  var A = r, o = $[(A << 1) + 1] & -1073741825, a = z.get(o);
  a || (a = Object.create(W.prototype), Object.defineProperty(a, Q, { writable: !0, value: A }), Object.defineProperty(a, k, { writable: !0, value: o })), B.push(a);
  let i;
  try {
    i = { tag: "ok", val: a.appendViaStream() };
  } catch (t) {
    i = { tag: "err", val: H(t) };
  }
  for (const t of B)
    t[Q] = void 0;
  B = [];
  var l = i;
  switch (l.tag) {
    case "ok": {
      const t = l.val;
      if (c(n).setInt8(e + 0, 0, !0), !(t instanceof S))
        throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
      var E = t[Q];
      if (!E) {
        const s = t[k] || ++fe;
        F.set(s, t), E = R(Y, s);
      }
      c(n).setInt32(e + 4, E, !0);
      break;
    }
    case "err": {
      const t = l.val;
      c(n).setInt8(e + 0, 1, !0);
      var g = t;
      let s;
      switch (g) {
        case "access": {
          s = 0;
          break;
        }
        case "would-block": {
          s = 1;
          break;
        }
        case "already": {
          s = 2;
          break;
        }
        case "bad-descriptor": {
          s = 3;
          break;
        }
        case "busy": {
          s = 4;
          break;
        }
        case "deadlock": {
          s = 5;
          break;
        }
        case "quota": {
          s = 6;
          break;
        }
        case "exist": {
          s = 7;
          break;
        }
        case "file-too-large": {
          s = 8;
          break;
        }
        case "illegal-byte-sequence": {
          s = 9;
          break;
        }
        case "in-progress": {
          s = 10;
          break;
        }
        case "interrupted": {
          s = 11;
          break;
        }
        case "invalid": {
          s = 12;
          break;
        }
        case "io": {
          s = 13;
          break;
        }
        case "is-directory": {
          s = 14;
          break;
        }
        case "loop": {
          s = 15;
          break;
        }
        case "too-many-links": {
          s = 16;
          break;
        }
        case "message-size": {
          s = 17;
          break;
        }
        case "name-too-long": {
          s = 18;
          break;
        }
        case "no-device": {
          s = 19;
          break;
        }
        case "no-entry": {
          s = 20;
          break;
        }
        case "no-lock": {
          s = 21;
          break;
        }
        case "insufficient-memory": {
          s = 22;
          break;
        }
        case "insufficient-space": {
          s = 23;
          break;
        }
        case "not-directory": {
          s = 24;
          break;
        }
        case "not-empty": {
          s = 25;
          break;
        }
        case "not-recoverable": {
          s = 26;
          break;
        }
        case "unsupported": {
          s = 27;
          break;
        }
        case "no-tty": {
          s = 28;
          break;
        }
        case "no-such-device": {
          s = 29;
          break;
        }
        case "overflow": {
          s = 30;
          break;
        }
        case "not-permitted": {
          s = 31;
          break;
        }
        case "pipe": {
          s = 32;
          break;
        }
        case "read-only": {
          s = 33;
          break;
        }
        case "invalid-seek": {
          s = 34;
          break;
        }
        case "text-file-busy": {
          s = 35;
          break;
        }
        case "cross-device": {
          s = 36;
          break;
        }
        default:
          throw t instanceof Error && console.error(t), new TypeError(`"${g}" is not one of the cases of error-code`);
      }
      c(n).setInt8(e + 4, s, !0);
      break;
    }
    default:
      throw new TypeError("invalid variant specified for result");
  }
}
function lr(r, e) {
  var A = r, o = $[(A << 1) + 1] & -1073741825, a = z.get(o);
  a || (a = Object.create(W.prototype), Object.defineProperty(a, Q, { writable: !0, value: A }), Object.defineProperty(a, k, { writable: !0, value: o })), B.push(a);
  let i;
  try {
    i = { tag: "ok", val: a.getType() };
  } catch (t) {
    i = { tag: "err", val: H(t) };
  }
  for (const t of B)
    t[Q] = void 0;
  B = [];
  var l = i;
  switch (l.tag) {
    case "ok": {
      const t = l.val;
      c(n).setInt8(e + 0, 0, !0);
      var E = t;
      let s;
      switch (E) {
        case "unknown": {
          s = 0;
          break;
        }
        case "block-device": {
          s = 1;
          break;
        }
        case "character-device": {
          s = 2;
          break;
        }
        case "directory": {
          s = 3;
          break;
        }
        case "fifo": {
          s = 4;
          break;
        }
        case "symbolic-link": {
          s = 5;
          break;
        }
        case "regular-file": {
          s = 6;
          break;
        }
        case "socket": {
          s = 7;
          break;
        }
        default:
          throw t instanceof Error && console.error(t), new TypeError(`"${E}" is not one of the cases of descriptor-type`);
      }
      c(n).setInt8(e + 1, s, !0);
      break;
    }
    case "err": {
      const t = l.val;
      c(n).setInt8(e + 0, 1, !0);
      var g = t;
      let s;
      switch (g) {
        case "access": {
          s = 0;
          break;
        }
        case "would-block": {
          s = 1;
          break;
        }
        case "already": {
          s = 2;
          break;
        }
        case "bad-descriptor": {
          s = 3;
          break;
        }
        case "busy": {
          s = 4;
          break;
        }
        case "deadlock": {
          s = 5;
          break;
        }
        case "quota": {
          s = 6;
          break;
        }
        case "exist": {
          s = 7;
          break;
        }
        case "file-too-large": {
          s = 8;
          break;
        }
        case "illegal-byte-sequence": {
          s = 9;
          break;
        }
        case "in-progress": {
          s = 10;
          break;
        }
        case "interrupted": {
          s = 11;
          break;
        }
        case "invalid": {
          s = 12;
          break;
        }
        case "io": {
          s = 13;
          break;
        }
        case "is-directory": {
          s = 14;
          break;
        }
        case "loop": {
          s = 15;
          break;
        }
        case "too-many-links": {
          s = 16;
          break;
        }
        case "message-size": {
          s = 17;
          break;
        }
        case "name-too-long": {
          s = 18;
          break;
        }
        case "no-device": {
          s = 19;
          break;
        }
        case "no-entry": {
          s = 20;
          break;
        }
        case "no-lock": {
          s = 21;
          break;
        }
        case "insufficient-memory": {
          s = 22;
          break;
        }
        case "insufficient-space": {
          s = 23;
          break;
        }
        case "not-directory": {
          s = 24;
          break;
        }
        case "not-empty": {
          s = 25;
          break;
        }
        case "not-recoverable": {
          s = 26;
          break;
        }
        case "unsupported": {
          s = 27;
          break;
        }
        case "no-tty": {
          s = 28;
          break;
        }
        case "no-such-device": {
          s = 29;
          break;
        }
        case "overflow": {
          s = 30;
          break;
        }
        case "not-permitted": {
          s = 31;
          break;
        }
        case "pipe": {
          s = 32;
          break;
        }
        case "read-only": {
          s = 33;
          break;
        }
        case "invalid-seek": {
          s = 34;
          break;
        }
        case "text-file-busy": {
          s = 35;
          break;
        }
        case "cross-device": {
          s = 36;
          break;
        }
        default:
          throw t instanceof Error && console.error(t), new TypeError(`"${g}" is not one of the cases of error-code`);
      }
      c(n).setInt8(e + 1, s, !0);
      break;
    }
    default:
      throw new TypeError("invalid variant specified for result");
  }
}
function gr(r, e) {
  var A = r, o = $[(A << 1) + 1] & -1073741825, a = z.get(o);
  a || (a = Object.create(W.prototype), Object.defineProperty(a, Q, { writable: !0, value: A }), Object.defineProperty(a, k, { writable: !0, value: o })), B.push(a);
  let i;
  try {
    i = { tag: "ok", val: a.stat() };
  } catch (D) {
    i = { tag: "err", val: H(D) };
  }
  for (const D of B)
    D[Q] = void 0;
  B = [];
  var l = i;
  switch (l.tag) {
    case "ok": {
      const D = l.val;
      c(n).setInt8(e + 0, 0, !0);
      var { type: E, linkCount: g, size: t, dataAccessTimestamp: s, dataModificationTimestamp: u, statusChangeTimestamp: b } = D, d = E;
      let I;
      switch (d) {
        case "unknown": {
          I = 0;
          break;
        }
        case "block-device": {
          I = 1;
          break;
        }
        case "character-device": {
          I = 2;
          break;
        }
        case "directory": {
          I = 3;
          break;
        }
        case "fifo": {
          I = 4;
          break;
        }
        case "symbolic-link": {
          I = 5;
          break;
        }
        case "regular-file": {
          I = 6;
          break;
        }
        case "socket": {
          I = 7;
          break;
        }
        default:
          throw E instanceof Error && console.error(E), new TypeError(`"${d}" is not one of the cases of descriptor-type`);
      }
      c(n).setInt8(e + 8, I, !0), c(n).setBigInt64(e + 16, ae(g), !0), c(n).setBigInt64(e + 24, ae(t), !0);
      var C = s;
      if (C == null)
        c(n).setInt8(e + 32, 0, !0);
      else {
        const X = C;
        c(n).setInt8(e + 32, 1, !0);
        var { seconds: p, nanoseconds: M } = X;
        c(n).setBigInt64(e + 40, ae(p), !0), c(n).setInt32(e + 48, Ne(M), !0);
      }
      var j = u;
      if (j == null)
        c(n).setInt8(e + 56, 0, !0);
      else {
        const X = j;
        c(n).setInt8(e + 56, 1, !0);
        var { seconds: K, nanoseconds: w } = X;
        c(n).setBigInt64(e + 64, ae(K), !0), c(n).setInt32(e + 72, Ne(w), !0);
      }
      var v = b;
      if (v == null)
        c(n).setInt8(e + 80, 0, !0);
      else {
        const X = v;
        c(n).setInt8(e + 80, 1, !0);
        var { seconds: ne, nanoseconds: ce } = X;
        c(n).setBigInt64(e + 88, ae(ne), !0), c(n).setInt32(e + 96, Ne(ce), !0);
      }
      break;
    }
    case "err": {
      const D = l.val;
      c(n).setInt8(e + 0, 1, !0);
      var Z = D;
      let I;
      switch (Z) {
        case "access": {
          I = 0;
          break;
        }
        case "would-block": {
          I = 1;
          break;
        }
        case "already": {
          I = 2;
          break;
        }
        case "bad-descriptor": {
          I = 3;
          break;
        }
        case "busy": {
          I = 4;
          break;
        }
        case "deadlock": {
          I = 5;
          break;
        }
        case "quota": {
          I = 6;
          break;
        }
        case "exist": {
          I = 7;
          break;
        }
        case "file-too-large": {
          I = 8;
          break;
        }
        case "illegal-byte-sequence": {
          I = 9;
          break;
        }
        case "in-progress": {
          I = 10;
          break;
        }
        case "interrupted": {
          I = 11;
          break;
        }
        case "invalid": {
          I = 12;
          break;
        }
        case "io": {
          I = 13;
          break;
        }
        case "is-directory": {
          I = 14;
          break;
        }
        case "loop": {
          I = 15;
          break;
        }
        case "too-many-links": {
          I = 16;
          break;
        }
        case "message-size": {
          I = 17;
          break;
        }
        case "name-too-long": {
          I = 18;
          break;
        }
        case "no-device": {
          I = 19;
          break;
        }
        case "no-entry": {
          I = 20;
          break;
        }
        case "no-lock": {
          I = 21;
          break;
        }
        case "insufficient-memory": {
          I = 22;
          break;
        }
        case "insufficient-space": {
          I = 23;
          break;
        }
        case "not-directory": {
          I = 24;
          break;
        }
        case "not-empty": {
          I = 25;
          break;
        }
        case "not-recoverable": {
          I = 26;
          break;
        }
        case "unsupported": {
          I = 27;
          break;
        }
        case "no-tty": {
          I = 28;
          break;
        }
        case "no-such-device": {
          I = 29;
          break;
        }
        case "overflow": {
          I = 30;
          break;
        }
        case "not-permitted": {
          I = 31;
          break;
        }
        case "pipe": {
          I = 32;
          break;
        }
        case "read-only": {
          I = 33;
          break;
        }
        case "invalid-seek": {
          I = 34;
          break;
        }
        case "text-file-busy": {
          I = 35;
          break;
        }
        case "cross-device": {
          I = 36;
          break;
        }
        default:
          throw D instanceof Error && console.error(D), new TypeError(`"${Z}" is not one of the cases of error-code`);
      }
      c(n).setInt8(e + 8, I, !0);
      break;
    }
    default:
      throw new TypeError("invalid variant specified for result");
  }
}
function ur(r, e) {
  var A = r, o = Y[(A << 1) + 1] & -1073741825, a = F.get(o);
  a || (a = Object.create(S.prototype), Object.defineProperty(a, Q, { writable: !0, value: A }), Object.defineProperty(a, k, { writable: !0, value: o })), B.push(a);
  let i;
  try {
    i = { tag: "ok", val: a.checkWrite() };
  } catch (t) {
    i = { tag: "err", val: H(t) };
  }
  for (const t of B)
    t[Q] = void 0;
  B = [];
  var l = i;
  switch (l.tag) {
    case "ok": {
      const t = l.val;
      c(n).setInt8(e + 0, 0, !0), c(n).setBigInt64(e + 8, ae(t), !0);
      break;
    }
    case "err": {
      const t = l.val;
      c(n).setInt8(e + 0, 1, !0);
      var E = t;
      switch (E.tag) {
        case "last-operation-failed": {
          const s = E.val;
          if (c(n).setInt8(e + 8, 0, !0), !(s instanceof P))
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          var g = s[Q];
          if (!g) {
            const u = s[k] || ++we;
            _.set(u, s), g = R(oe, u);
          }
          c(n).setInt32(e + 12, g, !0);
          break;
        }
        case "closed": {
          c(n).setInt8(e + 8, 1, !0);
          break;
        }
        default:
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(E.tag)}\` (received \`${E}\`) specified for \`StreamError\``);
      }
      break;
    }
    default:
      throw new TypeError("invalid variant specified for result");
  }
}
function Er(r, e, A, o) {
  var a = r, i = Y[(a << 1) + 1] & -1073741825, l = F.get(i);
  l || (l = Object.create(S.prototype), Object.defineProperty(l, Q, { writable: !0, value: a }), Object.defineProperty(l, k, { writable: !0, value: i })), B.push(l);
  var E = e, g = A, t = new Uint8Array(n.buffer.slice(E, E + g * 1));
  let s;
  try {
    s = { tag: "ok", val: l.write(t) };
  } catch (C) {
    s = { tag: "err", val: H(C) };
  }
  for (const C of B)
    C[Q] = void 0;
  B = [];
  var u = s;
  switch (u.tag) {
    case "ok": {
      u.val, c(n).setInt8(o + 0, 0, !0);
      break;
    }
    case "err": {
      const C = u.val;
      c(n).setInt8(o + 0, 1, !0);
      var b = C;
      switch (b.tag) {
        case "last-operation-failed": {
          const p = b.val;
          if (c(n).setInt8(o + 4, 0, !0), !(p instanceof P))
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          var d = p[Q];
          if (!d) {
            const M = p[k] || ++we;
            _.set(M, p), d = R(oe, M);
          }
          c(n).setInt32(o + 8, d, !0);
          break;
        }
        case "closed": {
          c(n).setInt8(o + 4, 1, !0);
          break;
        }
        default:
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(b.tag)}\` (received \`${b}\`) specified for \`StreamError\``);
      }
      break;
    }
    default:
      throw new TypeError("invalid variant specified for result");
  }
}
function Ir(r, e) {
  var A = r, o = Y[(A << 1) + 1] & -1073741825, a = F.get(o);
  a || (a = Object.create(S.prototype), Object.defineProperty(a, Q, { writable: !0, value: A }), Object.defineProperty(a, k, { writable: !0, value: o })), B.push(a);
  let i;
  try {
    i = { tag: "ok", val: a.blockingFlush() };
  } catch (t) {
    i = { tag: "err", val: H(t) };
  }
  for (const t of B)
    t[Q] = void 0;
  B = [];
  var l = i;
  switch (l.tag) {
    case "ok": {
      l.val, c(n).setInt8(e + 0, 0, !0);
      break;
    }
    case "err": {
      const t = l.val;
      c(n).setInt8(e + 0, 1, !0);
      var E = t;
      switch (E.tag) {
        case "last-operation-failed": {
          const s = E.val;
          if (c(n).setInt8(e + 4, 0, !0), !(s instanceof P))
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          var g = s[Q];
          if (!g) {
            const u = s[k] || ++we;
            _.set(u, s), g = R(oe, u);
          }
          c(n).setInt32(e + 8, g, !0);
          break;
        }
        case "closed": {
          c(n).setInt8(e + 4, 1, !0);
          break;
        }
        default:
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(E.tag)}\` (received \`${E}\`) specified for \`StreamError\``);
      }
      break;
    }
    default:
      throw new TypeError("invalid variant specified for result");
  }
}
function Qr(r, e, A, o) {
  var a = r, i = Y[(a << 1) + 1] & -1073741825, l = F.get(i);
  l || (l = Object.create(S.prototype), Object.defineProperty(l, Q, { writable: !0, value: a }), Object.defineProperty(l, k, { writable: !0, value: i })), B.push(l);
  var E = e, g = A, t = new Uint8Array(n.buffer.slice(E, E + g * 1));
  let s;
  try {
    s = { tag: "ok", val: l.blockingWriteAndFlush(t) };
  } catch (C) {
    s = { tag: "err", val: H(C) };
  }
  for (const C of B)
    C[Q] = void 0;
  B = [];
  var u = s;
  switch (u.tag) {
    case "ok": {
      u.val, c(n).setInt8(o + 0, 0, !0);
      break;
    }
    case "err": {
      const C = u.val;
      c(n).setInt8(o + 0, 1, !0);
      var b = C;
      switch (b.tag) {
        case "last-operation-failed": {
          const p = b.val;
          if (c(n).setInt8(o + 4, 0, !0), !(p instanceof P))
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          var d = p[Q];
          if (!d) {
            const M = p[k] || ++we;
            _.set(M, p), d = R(oe, M);
          }
          c(n).setInt32(o + 8, d, !0);
          break;
        }
        case "closed": {
          c(n).setInt8(o + 4, 1, !0);
          break;
        }
        default:
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(b.tag)}\` (received \`${b}\`) specified for \`StreamError\``);
      }
      break;
    }
    default:
      throw new TypeError("invalid variant specified for result");
  }
}
function dr(r, e) {
  var o = qA(BigInt.asUintN(64, r)), a = o.byteLength, i = q(0, 0, 1, a * 1), l = new Uint8Array(o.buffer || o, o.byteOffset, a * 1);
  new Uint8Array(n.buffer, i, a * 1).set(l), c(n).setInt32(e + 4, a, !0), c(n).setInt32(e + 0, i, !0);
}
function Br(r) {
  var A = zA(), o = A.length, a = q(0, 0, 4, o * 12);
  for (let s = 0; s < A.length; s++) {
    const u = A[s], b = a + s * 12;
    var [i, l] = u;
    if (!(i instanceof W))
      throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
    var E = i[Q];
    if (!E) {
      const d = i[k] || ++sr;
      z.set(d, i), E = R($, d);
    }
    c(n).setInt32(b + 0, E, !0);
    var g = se(l, q, n), t = x;
    c(n).setInt32(b + 8, t, !0), c(n).setInt32(b + 4, g, !0);
  }
  c(n).setInt32(r + 4, o, !0), c(n).setInt32(r + 0, a, !0);
}
const eA = [y, 0], Je = /* @__PURE__ */ new Map();
let Cr = 0;
function fr(r) {
  var A = WA();
  if (A == null)
    c(n).setInt8(r + 0, 0, !0);
  else {
    const a = A;
    if (c(n).setInt8(r + 0, 1, !0), !(a instanceof Re))
      throw new TypeError('Resource error: Not a valid "TerminalInput" resource.');
    var o = a[Q];
    if (!o) {
      const i = a[k] || ++Cr;
      Je.set(i, a), o = R(eA, i);
    }
    c(n).setInt32(r + 4, o, !0);
  }
}
const je = [y, 0], de = /* @__PURE__ */ new Map();
let AA = 0;
function wr(r) {
  var A = xA();
  if (A == null)
    c(n).setInt8(r + 0, 0, !0);
  else {
    const a = A;
    if (c(n).setInt8(r + 0, 1, !0), !(a instanceof Qe))
      throw new TypeError('Resource error: Not a valid "TerminalOutput" resource.');
    var o = a[Q];
    if (!o) {
      const i = a[k] || ++AA;
      de.set(i, a), o = R(je, i);
    }
    c(n).setInt32(r + 4, o, !0);
  }
}
function br(r) {
  var A = VA();
  if (A == null)
    c(n).setInt8(r + 0, 0, !0);
  else {
    const a = A;
    if (c(n).setInt8(r + 0, 1, !0), !(a instanceof Qe))
      throw new TypeError('Resource error: Not a valid "TerminalOutput" resource.');
    var o = a[Q];
    if (!o) {
      const i = a[k] || ++AA;
      de.set(i, a), o = R(je, i);
    }
    c(n).setInt32(r + 4, o, !0);
  }
}
let kr, T, rA, tA, aA;
const pr = [y, 0];
function yr(r) {
  if (N(pr, r).own)
    throw new TypeError("unreachable resource trampoline");
}
function hr(r) {
  const e = N(Ye, r);
  if (e.own) {
    const A = le.get(e.rep);
    A ? (A[m] && A[m](), le.delete(e.rep)) : ie[h] && ie[h](e.rep);
  }
}
function mr(r) {
  const e = N(Y, r);
  if (e.own) {
    const A = F.get(e.rep);
    A ? (A[m] && A[m](), F.delete(e.rep)) : S[h] && S[h](e.rep);
  }
}
const vr = [y, 0];
function Dr(r) {
  if (N(vr, r).own)
    throw new TypeError("unreachable resource trampoline");
}
const Lr = [y, 0];
function Nr(r) {
  if (N(Lr, r).own)
    throw new TypeError("unreachable resource trampoline");
}
const Mr = [y, 0];
function Rr(r) {
  if (N(Mr, r).own)
    throw new TypeError("unreachable resource trampoline");
}
const Jr = [y, 0];
function Sr(r) {
  if (N(Jr, r).own)
    throw new TypeError("unreachable resource trampoline");
}
const Fr = [y, 0];
function Gr(r) {
  if (N(Fr, r).own)
    throw new TypeError("unreachable resource trampoline");
}
function Ur(r) {
  const e = N($, r);
  if (e.own) {
    const A = z.get(e.rep);
    A ? (A[m] && A[m](), z.delete(e.rep)) : W[h] && W[h](e.rep);
  }
}
function Tr(r) {
  const e = N(Y, r);
  if (e.own) {
    const A = F.get(e.rep);
    A ? (A[m] && A[m](), F.delete(e.rep)) : S[h] && S[h](e.rep);
  }
}
function Yr(r) {
  const e = N(oe, r);
  if (e.own) {
    const A = _.get(e.rep);
    A ? (A[m] && A[m](), _.delete(e.rep)) : P[h] && P[h](e.rep);
  }
}
function jr(r) {
  const e = N(Ye, r);
  if (e.own) {
    const A = le.get(e.rep);
    A ? (A[m] && A[m](), le.delete(e.rep)) : ie[h] && ie[h](e.rep);
  }
}
function Xr(r) {
  const e = N(eA, r);
  if (e.own) {
    const A = Je.get(e.rep);
    A ? (A[m] && A[m](), Je.delete(e.rep)) : Re[h] && Re[h](e.rep);
  }
}
function Or(r) {
  const e = N(je, r);
  if (e.own) {
    const A = de.get(e.rep);
    A ? (A[m] && A[m](), de.delete(e.rep)) : Qe[h] && Qe[h](e.rep);
  }
}
let sA;
function Hr(r, e, A, o) {
  be || Te();
  var a = r, i = a.length, l = T(0, 0, 4, i * 16);
  for (let L = 0; L < a.length; L++) {
    const Ae = a[L], O = l + L * 16;
    var { file: E, checksum: g } = Ae, t = E, s = t.byteLength, u = T(0, 0, 1, s * 1), b = new Uint8Array(t.buffer || t, t.byteOffset, s * 1);
    new Uint8Array(n.buffer, u, s * 1).set(b), c(n).setInt32(O + 4, s, !0), c(n).setInt32(O + 0, u, !0);
    var d = g, C = d.byteLength, p = T(0, 0, 1, C * 1), M = new Uint8Array(d.buffer || d, d.byteOffset, C * 1);
    new Uint8Array(n.buffer, p, C * 1).set(M), c(n).setInt32(O + 12, C, !0), c(n).setInt32(O + 8, p, !0);
  }
  var j = se(e, T, n), K = x;
  const w = sA(l, i, j, K, A ? 1 : 0, o ? 1 : 0);
  let v;
  switch (c(n).getUint8(w + 0, !0)) {
    case 0: {
      var ne = c(n).getInt32(w + 8, !0), ce = c(n).getInt32(w + 4, !0), Z = [];
      for (let L = 0; L < ne; L++) {
        const Ae = ce + L * 8;
        var D = c(n).getInt32(Ae + 0, !0), I = c(n).getInt32(Ae + 4, !0), X = V.decode(new Uint8Array(n.buffer, D, I));
        Z.push(X);
      }
      v = {
        tag: "ok",
        val: Z
      };
      break;
    }
    case 1: {
      let L;
      switch (c(n).getUint8(w + 4, !0)) {
        case 0: {
          var ge = c(n).getInt32(w + 8, !0), ke = c(n).getInt32(w + 12, !0), pe = V.decode(new Uint8Array(n.buffer, ge, ke));
          L = {
            tag: "model",
            val: pe
          };
          break;
        }
        case 1: {
          var ye = c(n).getInt32(w + 8, !0), he = c(n).getInt32(w + 12, !0), me = V.decode(new Uint8Array(n.buffer, ye, he));
          L = {
            tag: "other",
            val: me
          };
          break;
        }
        default:
          throw new TypeError("invalid variant discriminant for ChecksumError");
      }
      v = {
        tag: "err",
        val: L
      };
      break;
    }
    default:
      throw new TypeError("invalid variant discriminant for expected");
  }
  const ee = v;
  if (rA(w), typeof ee == "object" && ee.tag === "err")
    throw new Ue(ee.val);
  return ee.val;
}
let oA;
function Zr(r, e, A, o) {
  be || Te();
  var a = r, i = a.length, l = T(0, 0, 4, i * 16);
  for (let J = 0; J < a.length; J++) {
    const re = a[J], ue = l + J * 16;
    var { file: E, checksum: g } = re, t = E, s = t.byteLength, u = T(0, 0, 1, s * 1), b = new Uint8Array(t.buffer || t, t.byteOffset, s * 1);
    new Uint8Array(n.buffer, u, s * 1).set(b), c(n).setInt32(ue + 4, s, !0), c(n).setInt32(ue + 0, u, !0);
    var d = g, C = d.byteLength, p = T(0, 0, 1, C * 1), M = new Uint8Array(d.buffer || d, d.byteOffset, C * 1);
    new Uint8Array(n.buffer, p, C * 1).set(M), c(n).setInt32(ue + 12, C, !0), c(n).setInt32(ue + 8, p, !0);
  }
  var j = se(e, T, n), K = x;
  const w = oA(l, i, j, K, A ? 1 : 0, o ? 1 : 0);
  let v;
  switch (c(n).getUint8(w + 0, !0)) {
    case 0: {
      var ne = c(n).getInt32(w + 8, !0), ce = c(n).getInt32(w + 4, !0), Z = [];
      for (let J = 0; J < ne; J++) {
        const re = ce + J * 16;
        var D = c(n).getInt32(re + 0, !0), I = c(n).getInt32(re + 4, !0), X = new Int32Array(n.buffer.slice(D, D + I * 4)), ge = c(n).getInt32(re + 8, !0), ke = c(n).getInt32(re + 12, !0), pe = new Int32Array(n.buffer.slice(ge, ge + ke * 4));
        Z.push({
          start: X,
          end: pe
        });
      }
      v = {
        tag: "ok",
        val: Z
      };
      break;
    }
    case 1: {
      let J;
      switch (c(n).getUint8(w + 4, !0)) {
        case 0: {
          var ye = c(n).getInt32(w + 8, !0), he = c(n).getInt32(w + 12, !0), me = V.decode(new Uint8Array(n.buffer, ye, he));
          J = {
            tag: "model",
            val: me
          };
          break;
        }
        case 1: {
          var ee = c(n).getInt32(w + 8, !0), L = c(n).getInt32(w + 12, !0), Ae = V.decode(new Uint8Array(n.buffer, ee, L));
          J = {
            tag: "other",
            val: Ae
          };
          break;
        }
        default:
          throw new TypeError("invalid variant discriminant for ChecksumError");
      }
      v = {
        tag: "err",
        val: J
      };
      break;
    }
    default:
      throw new TypeError("invalid variant discriminant for expected");
  }
  const O = v;
  if (tA(w), typeof O == "object" && O.tag === "err")
    throw new Ue(O.val);
  return O.val;
}
let nA;
function Vr(r, e) {
  be || Te();
  var A = r, o = A.byteLength, a = T(0, 0, 1, o * 1), i = new Uint8Array(A.buffer || A, A.byteOffset, o * 1);
  new Uint8Array(n.buffer, a, o * 1).set(i);
  var l = se(e, T, n), E = x;
  const g = nA(a, o, l, E);
  let t;
  switch (c(n).getUint8(g + 0, !0)) {
    case 0: {
      var s = c(n).getInt32(g + 4, !0), u = c(n).getInt32(g + 8, !0), b = V.decode(new Uint8Array(n.buffer, s, u));
      t = {
        tag: "ok",
        val: b
      };
      break;
    }
    case 1: {
      let v;
      switch (c(n).getUint8(g + 4, !0)) {
        case 0: {
          var d = c(n).getInt32(g + 8, !0), C = c(n).getInt32(g + 12, !0), p = V.decode(new Uint8Array(n.buffer, d, C));
          v = {
            tag: "model",
            val: p
          };
          break;
        }
        case 1: {
          var M = c(n).getInt32(g + 8, !0), j = c(n).getInt32(g + 12, !0), K = V.decode(new Uint8Array(n.buffer, M, j));
          v = {
            tag: "other",
            val: K
          };
          break;
        }
        default:
          throw new TypeError("invalid variant discriminant for ChecksumError");
      }
      t = {
        tag: "err",
        val: v
      };
      break;
    }
    default:
      throw new TypeError("invalid variant discriminant for expected");
  }
  const w = t;
  if (aA(g), typeof w == "object" && w.tag === "err")
    throw new Ue(w.val);
  return w.val;
}
let be = !1;
const Wr = (() => {
  let r = function* () {
    const E = Ve(new URL("" + new URL("delsum_web.core-BrmzRyWg.wasm", import.meta.url).href, import.meta.url)), g = Ve(new URL("data:application/wasm;base64,AGFzbQEAAAABUw5gAX8AYAJ/fwBgBH9/f38AYAABf2ABfwF/YAJ/fwF/YAR/f39/AX9gA39/fwF/YAJ+fwBgA39+fwBgA39/fwBgBH9+f38Bf2AFf39/f38AYAAAArsLHRp3YXNpOmNsaS9lbnZpcm9ubWVudEAwLjIuMw9nZXQtZW52aXJvbm1lbnQAABt3YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjMlW3Jlc291cmNlLWRyb3BdZGlyZWN0b3J5LWVudHJ5LXN0cmVhbQAAG3dhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMxxbbWV0aG9kXWRlc2NyaXB0b3IuZ2V0LWZsYWdzAAEbd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4zGVtyZXNvdXJjZS1kcm9wXWRlc2NyaXB0b3IAABV3YXNpOmlvL3N0cmVhbXNAMC4yLjMcW3Jlc291cmNlLWRyb3Bdb3V0cHV0LXN0cmVhbQAAG3dhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMxVmaWxlc3lzdGVtLWVycm9yLWNvZGUAARN3YXNpOmlvL2Vycm9yQDAuMi4zFFtyZXNvdXJjZS1kcm9wXWVycm9yAAAVd2FzaTppby9zdHJlYW1zQDAuMi4zG1tyZXNvdXJjZS1kcm9wXWlucHV0LXN0cmVhbQAAGHdhc2k6cmFuZG9tL3JhbmRvbUAwLjIuMxBnZXQtcmFuZG9tLWJ5dGVzAAgVd2FzaTppby9zdHJlYW1zQDAuMi4zIVttZXRob2Rdb3V0cHV0LXN0cmVhbS5jaGVjay13cml0ZQABFXdhc2k6aW8vc3RyZWFtc0AwLjIuMxtbbWV0aG9kXW91dHB1dC1zdHJlYW0ud3JpdGUAAhV3YXNpOmlvL3N0cmVhbXNAMC4yLjMkW21ldGhvZF1vdXRwdXQtc3RyZWFtLmJsb2NraW5nLWZsdXNoAAEPX19tYWluX21vZHVsZV9fDGNhYmlfcmVhbGxvYwAGHndhc2k6ZmlsZXN5c3RlbS9wcmVvcGVuc0AwLjIuMg9nZXQtZGlyZWN0b3JpZXMAABV3YXNpOmNsaS9zdGRlcnJAMC4yLjMKZ2V0LXN0ZGVycgADFXdhc2k6aW8vc3RyZWFtc0AwLjIuMy5bbWV0aG9kXW91dHB1dC1zdHJlYW0uYmxvY2tpbmctd3JpdGUtYW5kLWZsdXNoAAIbd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4zI1ttZXRob2RdZGVzY3JpcHRvci53cml0ZS12aWEtc3RyZWFtAAkdd2FzaTpjbGkvdGVybWluYWwtc3RkaW5AMC4yLjMSZ2V0LXRlcm1pbmFsLXN0ZGluAAAdd2FzaTpjbGkvdGVybWluYWwtaW5wdXRAMC4yLjMdW3Jlc291cmNlLWRyb3BddGVybWluYWwtaW5wdXQAAB53YXNpOmNsaS90ZXJtaW5hbC1zdGRvdXRAMC4yLjMTZ2V0LXRlcm1pbmFsLXN0ZG91dAAAHndhc2k6Y2xpL3Rlcm1pbmFsLW91dHB1dEAwLjIuMx5bcmVzb3VyY2UtZHJvcF10ZXJtaW5hbC1vdXRwdXQAAB53YXNpOmNsaS90ZXJtaW5hbC1zdGRlcnJAMC4yLjMTZ2V0LXRlcm1pbmFsLXN0ZGVycgAAFHdhc2k6Y2xpL3N0ZGluQDAuMi4zCWdldC1zdGRpbgADFXdhc2k6Y2xpL3N0ZG91dEAwLjIuMwpnZXQtc3Rkb3V0AAMTd2FzaTpjbGkvZXhpdEAwLjIuMwRleGl0AAAbd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4zJFttZXRob2RdZGVzY3JpcHRvci5hcHBlbmQtdmlhLXN0cmVhbQABG3dhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMxtbbWV0aG9kXWRlc2NyaXB0b3IuZ2V0LXR5cGUAARt3YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjMXW21ldGhvZF1kZXNjcmlwdG9yLnN0YXQAAQNlbnYGbWVtb3J5AgAAAyAfAwEABAoGBwABAAUFAQQEBQEBAgQACwYMAAUBAAcNAgYQA38BQQALfwFBAAt/AUEACweYAQoKcmFuZG9tX2dldAA1E2FkYXB0ZXJfY2xvc2VfYmFkZmQAHwhmZF93cml0ZQAyE2NhYmlfaW1wb3J0X3JlYWxsb2MAIQhmZF9jbG9zZQAqB2ZkX3NlZWsAMQtlbnZpcm9uX2dldAAmEWVudmlyb25fc2l6ZXNfZ2V0ACcNZmRfZmRzdGF0X2dldAArCXByb2NfZXhpdAA0CpE7H4ACAQV/IwEiAEUEQAJ/IwJBAkYEQEEDJAJB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", import.meta.url)), t = Ze("AGFzbQEAAAABNwlgAn9/AGABfwBgAn9/AX9gAX8Bf2AEf39/fwBgBH9/f38Bf2AEf35/fwF/YAN/fn8AYAJ+fwADGhkCBQICAwIGAQMBAAAHAAAAAAQABAgBAQEBBAUBcAEZGQd/GgEwAAABMQABATIAAgEzAAMBNAAEATUABQE2AAYBNwAHATgACAE5AAkCMTAACgIxMQALAjEyAAwCMTMADQIxNAAOAjE1AA8CMTYAEAIxNwARAjE4ABICMTkAEwIyMAAUAjIxABUCMjIAFgIyMwAXAjI0ABgIJGltcG9ydHMBAAqvAhkLACAAIAFBABECAAsPACAAIAEgAiADQQERBQALCwAgACABQQIRAgALCwAgACABQQMRAgALCQAgAEEEEQMACwsAIAAgAUEFEQIACw8AIAAgASACIANBBhEGAAsJACAAQQcRAQALCQAgAEEIEQMACwkAIABBCREBAAsLACAAIAFBChEAAAsLACAAIAFBCxEAAAsNACAAIAEgAkEMEQcACwsAIAAgAUENEQAACwsAIAAgAUEOEQAACwsAIAAgAUEPEQAACwsAIAAgAUEQEQAACw8AIAAgASACIANBEREEAAsLACAAIAFBEhEAAAsPACAAIAEgAiADQRMRBAALCwAgACABQRQRCAALCQAgAEEVEQEACwkAIABBFhEBAAsJACAAQRcRAQALCQAgAEEYEQEACwAvCXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AQ13aXQtY29tcG9uZW50BzAuMjIzLjA"), s = Ze("AGFzbQEAAAABNwlgAn9/AGABfwBgAn9/AX9gAX8Bf2AEf39/fwBgBH9/f38Bf2AEf35/fwF/YAN/fn8AYAJ+fwACnAEaAAEwAAIAATEABQABMgACAAEzAAIAATQAAwABNQACAAE2AAYAATcAAQABOAADAAE5AAEAAjEwAAAAAjExAAAAAjEyAAcAAjEzAAAAAjE0AAAAAjE1AAAAAjE2AAAAAjE3AAQAAjE4AAAAAjE5AAQAAjIwAAgAAjIxAAEAAjIyAAEAAjIzAAEAAjI0AAEACCRpbXBvcnRzAXABGRkJHwEAQQALGQABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgALwlwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAcwLjIyMy4w");
    ({ exports: f } = yield Ie(yield t)), { exports: G } = yield Ie(yield E, {
      "wasi:io/poll@0.2.0": {
        "[resource-drop]pollable": yr
      },
      "wasi:io/streams@0.2.0": {
        "[resource-drop]input-stream": hr,
        "[resource-drop]output-stream": mr
      },
      "wasi:sockets/tcp@0.2.0": {
        "[resource-drop]tcp-socket": Sr
      },
      "wasi:sockets/udp@0.2.0": {
        "[resource-drop]incoming-datagram-stream": Nr,
        "[resource-drop]outgoing-datagram-stream": Rr,
        "[resource-drop]udp-socket": Dr
      },
      wasi_snapshot_preview1: {
        adapter_close_badfd: f[8],
        environ_get: f[2],
        environ_sizes_get: f[3],
        fd_close: f[4],
        fd_fdstat_get: f[5],
        fd_seek: f[6],
        fd_write: f[1],
        proc_exit: f[7],
        random_get: f[0]
      }
    }), { exports: U } = yield Ie(yield g, {
      __main_module__: {
        cabi_realloc: G.cabi_realloc
      },
      env: {
        memory: G.memory
      },
      "wasi:cli/environment@0.2.3": {
        "get-environment": f[9]
      },
      "wasi:cli/exit@0.2.3": {
        exit: tr
      },
      "wasi:cli/stderr@0.2.3": {
        "get-stderr": $A
      },
      "wasi:cli/stdin@0.2.3": {
        "get-stdin": Ar
      },
      "wasi:cli/stdout@0.2.3": {
        "get-stdout": rr
      },
      "wasi:cli/terminal-input@0.2.3": {
        "[resource-drop]terminal-input": Xr
      },
      "wasi:cli/terminal-output@0.2.3": {
        "[resource-drop]terminal-output": Or
      },
      "wasi:cli/terminal-stderr@0.2.3": {
        "get-terminal-stderr": f[24]
      },
      "wasi:cli/terminal-stdin@0.2.3": {
        "get-terminal-stdin": f[22]
      },
      "wasi:cli/terminal-stdout@0.2.3": {
        "get-terminal-stdout": f[23]
      },
      "wasi:filesystem/preopens@0.2.2": {
        "get-directories": f[21]
      },
      "wasi:filesystem/types@0.2.3": {
        "[method]descriptor.append-via-stream": f[13],
        "[method]descriptor.get-flags": f[10],
        "[method]descriptor.get-type": f[14],
        "[method]descriptor.stat": f[15],
        "[method]descriptor.write-via-stream": f[12],
        "[resource-drop]descriptor": Ur,
        "[resource-drop]directory-entry-stream": Gr,
        "filesystem-error-code": f[11]
      },
      "wasi:io/error@0.2.3": {
        "[resource-drop]error": Yr
      },
      "wasi:io/streams@0.2.3": {
        "[method]output-stream.blocking-flush": f[18],
        "[method]output-stream.blocking-write-and-flush": f[19],
        "[method]output-stream.check-write": f[16],
        "[method]output-stream.write": f[17],
        "[resource-drop]input-stream": jr,
        "[resource-drop]output-stream": Tr
      },
      "wasi:random/random@0.2.3": {
        "get-random-bytes": f[20]
      }
    }), n = G.memory, q = U.cabi_import_realloc, { exports: kr } = yield Ie(yield s, {
      "": {
        $imports: f.$imports,
        0: U.random_get,
        1: U.fd_write,
        10: or,
        11: nr,
        12: cr,
        13: ir,
        14: lr,
        15: gr,
        16: ur,
        17: Er,
        18: Ir,
        19: Qr,
        2: U.environ_get,
        20: dr,
        21: Br,
        22: fr,
        23: wr,
        24: br,
        3: U.environ_sizes_get,
        4: U.fd_close,
        5: U.fd_fdstat_get,
        6: U.fd_seek,
        7: U.proc_exit,
        8: U.adapter_close_badfd,
        9: ar
      }
    }), T = G.cabi_realloc, rA = G["cabi_post_delsum:web/checksums#reverse"], tA = G["cabi_post_delsum:web/checksums#part"], aA = G["cabi_post_delsum:web/checksums#check"], be = !0, sA = G["delsum:web/checksums#reverse"], oA = G["delsum:web/checksums#part"], nA = G["delsum:web/checksums#check"];
  }(), e, A, o;
  function a(l) {
    try {
      let E;
      do
        ({ value: l, done: E } = r.next(l));
      while (!(l instanceof Promise) && !E);
      if (E)
        if (A) A(l);
        else return l;
      e || (e = new Promise((g, t) => (A = g, o = t))), l.then(a, o);
    } catch (E) {
      if (o) o(E);
      else throw E;
    }
  }
  const i = a(null);
  return e || i;
})(), Xe = {
  check: Vr,
  part: Zr,
  reverse: Hr
};
function We(r) {
  if (r.length === 0)
    throw new Error("cannot be empty");
  if (r.length % 2 !== 0)
    throw new Error("must have an even number of digits");
  const e = new Uint8Array(r.length / 2);
  for (let A = 0; A < r.length; A += 2)
    e[A / 2] = parseInt(r.substring(A, A + 2), 16);
  return e;
}
async function xr(r) {
  let e, A;
  if (typeof r.file == "string")
    try {
      e = We(r.file);
    } catch (o) {
      const a = o;
      throw new Error(`file hex ${a.message}`);
    }
  else
    e = new Uint8Array(await r.file.arrayBuffer());
  try {
    A = We(r.checksum);
  } catch (o) {
    const a = o;
    throw new Error(`checksum ${a.message}`);
  }
  return {
    file: e,
    checksum: A
  };
}
function zr(r, e, A, o) {
  const a = Be(e.model, e.value);
  return Xe.reverse(
    r,
    a,
    A,
    o
  );
}
async function Oe(r) {
  let e = [], A = {};
  for (const o of r)
    try {
      const a = await xr(o);
      e !== null && e.push(a);
    } catch (a) {
      const i = a;
      e = null, A[o.id] = i.message;
    }
  return { checksummedFiles: e, fileErrors: A };
}
async function Kr(r, e, A, o) {
  const { checksummedFiles: a, fileErrors: i } = await Oe(r), l = {};
  if (a === null)
    return {
      models: [],
      inputErrors: {
        inputModelErrors: [],
        inputFileErrors: i
      }
    };
  let E = [];
  for (const g of e)
    try {
      const t = zr(a, g, A, o);
      E = E.concat(t);
    } catch (t) {
      const s = t;
      switch (s.payload.tag) {
        case "model":
          l[g.id] = s.payload.val;
          break;
        case "other":
          throw new Error(s.payload.val);
      }
    }
  return {
    models: E,
    inputErrors: {
      inputModelErrors: l,
      inputFileErrors: i
    }
  };
}
function qr(r, e, A, o) {
  const a = Be(e.model, e.value);
  return Xe.part(
    r,
    a,
    A,
    o
  ).map((l) => ({
    range: l,
    model: a
  }));
}
async function Pr(r, e, A, o) {
  const { checksummedFiles: a, fileErrors: i } = await Oe(r), l = {};
  let E = [];
  if (a === null)
    return {
      ranges: [],
      inputErrors: {
        inputModelErrors: [],
        inputFileErrors: i
      }
    };
  for (const g of e)
    try {
      const t = qr(a, g, A, o);
      E = E.concat(t);
    } catch (t) {
      const { payload: s } = t;
      switch (s.tag) {
        case "model":
          l[g.id] = s.val;
          break;
        case "other":
          throw new Error(s.val);
      }
    }
  return {
    ranges: E,
    inputErrors: {
      inputModelErrors: l,
      inputFileErrors: i
    }
  };
}
function _r(r, e) {
  const A = Be(e.model, e.value);
  let o = [];
  for (const a of r)
    o.push(Xe.check(
      a.file,
      A
    ));
  return o;
}
function $r(r) {
  return typeof r.file == "string" ? r.file.length > 10 ? r.file.substring(0, 10) + "..." : r.file : r.file.name;
}
async function et(r, e) {
  const { checksummedFiles: A, fileErrors: o } = await Oe(r), a = r.map($r), i = [], l = {};
  let E = [];
  if (A === null)
    return {
      checks: {
        checksums: [],
        fileLabels: [],
        modelLabels: []
      },
      inputErrors: {
        inputModelErrors: [],
        inputFileErrors: o
      }
    };
  for (const g of e)
    try {
      const t = _r(A, g);
      E.push(t), g.value.name ? i.push(g.value.name) : i.push(Be(g.model, g.value));
    } catch (t) {
      const s = t;
      switch (s.payload.tag) {
        case "model":
          l[g.id] = s.payload.val;
          break;
        case "other":
          throw new Error(s.payload.val);
      }
    }
  return {
    checks: {
      checksums: E,
      fileLabels: a,
      modelLabels: i
    },
    inputErrors: {
      inputModelErrors: l,
      inputFileErrors: o
    }
  };
}
let Me = !1;
onmessage = async (r) => {
  const e = r.data;
  console.log("A");
  const A = e.payload;
  Me || (Me = !0, await Wr);
  let o;
  try {
    switch (A.tag) {
      case "part":
        const a = await Pr(A.files, A.models, A.trailingCheck, A.endRelative);
        o = {
          id: e.id,
          tag: "part",
          ...a
        };
        break;
      case "reverse":
        const i = await Kr(A.files, A.models, A.trailingCheck, A.extendedSearch);
        o = {
          id: e.id,
          tag: "reverse",
          ...i
        };
        break;
      case "checksum":
        const l = await et(A.files, A.models);
        o = {
          id: e.id,
          tag: "checksum",
          ...l
        };
        break;
    }
  } catch (a) {
    o = {
      id: e.id,
      tag: "error",
      error: String(a)
    };
  }
  console.log(Me), postMessage(o);
};
