var Tt = Array.isArray, fr = Array.prototype.indexOf, Qt = Array.from, vr = Object.defineProperty, Me = Object.getOwnPropertyDescriptor, cr = Object.getOwnPropertyDescriptors, kn = Object.prototype, dr = Array.prototype, $t = Object.getPrototypeOf, cn = Object.isExtensible;
function nt(e) {
  return typeof e == "function";
}
const Vt = () => {
};
function _r(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
const pe = 2, En = 4, Mt = 8, en = 16, Ce = 32, Ze = 64, bt = 128, le = 256, yt = 512, ee = 1024, Ne = 2048, Xe = 4096, xe = 8192, Lt = 16384, pr = 32768, ut = 65536, hr = 1 << 19, Dn = 1 << 20, jt = 1 << 21, qe = Symbol("$state"), Cn = Symbol("legacy props"), mr = Symbol("");
function In(e) {
  return e === this.v;
}
function gr(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function tn(e) {
  return !gr(e, this.v);
}
function wr(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function br() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function yr(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function xr() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function kr(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function Er() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Dr() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Cr() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
const nn = 1, rn = 2, Sn = 4, Ir = 8, Sr = 16, Rr = 1, Ar = 4, Tr = 8, Mr = 16, Lr = 1, Nr = 2, Y = Symbol(), Or = "http://www.w3.org/1999/xhtml", Pr = [];
function Z(e, t = !1) {
  return ht(e, /* @__PURE__ */ new Map(), "", Pr);
}
function ht(e, t, n, r, l = null) {
  if (typeof e == "object" && e !== null) {
    var a = t.get(e);
    if (a !== void 0) return a;
    if (e instanceof Map) return (
      /** @type {Snapshot<T>} */
      new Map(e)
    );
    if (e instanceof Set) return (
      /** @type {Snapshot<T>} */
      new Set(e)
    );
    if (Tt(e)) {
      var i = (
        /** @type {Snapshot<any>} */
        Array(e.length)
      );
      t.set(e, i), l !== null && t.set(l, i);
      for (var v = 0; v < e.length; v += 1) {
        var s = e[v];
        v in e && (i[v] = ht(s, t, n, r));
      }
      return i;
    }
    if ($t(e) === kn) {
      i = {}, t.set(e, i), l !== null && t.set(l, i);
      for (var o in e)
        i[o] = ht(e[o], t, n, r);
      return i;
    }
    if (e instanceof Date)
      return (
        /** @type {Snapshot<T>} */
        structuredClone(e)
      );
    if (typeof /** @type {T & { toJSON?: any } } */
    e.toJSON == "function")
      return ht(
        /** @type {T & { toJSON(): any } } */
        e.toJSON(),
        t,
        n,
        r,
        // Associate the instance with the toJSON clone
        e
      );
  }
  if (e instanceof EventTarget)
    return (
      /** @type {Snapshot<T>} */
      e
    );
  try {
    return (
      /** @type {Snapshot<T>} */
      structuredClone(e)
    );
  } catch {
    return (
      /** @type {Snapshot<T>} */
      e
    );
  }
}
let Q = null;
function dn(e) {
  Q = e;
}
function ae(e, t = !1, n) {
  var r = Q = {
    p: Q,
    c: null,
    d: !1,
    e: null,
    m: !1,
    s: e,
    x: null,
    l: null
  };
  Pt(() => {
    r.d = !0;
  });
}
function ie(e) {
  const t = Q;
  if (t !== null) {
    const i = t.e;
    if (i !== null) {
      var n = N, r = A;
      t.e = null;
      try {
        for (var l = 0; l < i.length; l++) {
          var a = i[l];
          Le(a.effect), he(a.reaction), an(a.fn);
        }
      } finally {
        Le(n), he(r);
      }
    }
    Q = t.p, t.m = !0;
  }
  return (
    /** @type {T} */
    {}
  );
}
function Rn() {
  return !0;
}
function K(e, t) {
  if (typeof e != "object" || e === null || qe in e)
    return e;
  const n = $t(e);
  if (n !== kn && n !== dr)
    return e;
  var r = /* @__PURE__ */ new Map(), l = Tt(e), a = F(0), i = A, v = (s) => {
    var o = A;
    he(i);
    var f;
    return f = s(), he(o), f;
  };
  return l && r.set("length", F(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(s, o, f) {
        (!("value" in f) || f.configurable === !1 || f.enumerable === !1 || f.writable === !1) && Er();
        var _ = r.get(o);
        return _ === void 0 ? (_ = v(() => F(f.value)), r.set(o, _)) : R(
          _,
          v(() => K(f.value))
        ), !0;
      },
      deleteProperty(s, o) {
        var f = r.get(o);
        if (f === void 0)
          o in s && r.set(
            o,
            v(() => F(Y))
          );
        else {
          if (l && typeof o == "string") {
            var _ = (
              /** @type {Source<number>} */
              r.get("length")
            ), u = Number(o);
            Number.isInteger(u) && u < _.v && R(_, u);
          }
          R(f, Y), _n(a);
        }
        return !0;
      },
      get(s, o, f) {
        if (o === qe)
          return e;
        var _ = r.get(o), u = o in s;
        if (_ === void 0 && (!u || Me(s, o)?.writable) && (_ = v(() => F(K(u ? s[o] : Y))), r.set(o, _)), _ !== void 0) {
          var p = d(_);
          return p === Y ? void 0 : p;
        }
        return Reflect.get(s, o, f);
      },
      getOwnPropertyDescriptor(s, o) {
        var f = Reflect.getOwnPropertyDescriptor(s, o);
        if (f && "value" in f) {
          var _ = r.get(o);
          _ && (f.value = d(_));
        } else if (f === void 0) {
          var u = r.get(o), p = u?.v;
          if (u !== void 0 && p !== Y)
            return {
              enumerable: !0,
              configurable: !0,
              value: p,
              writable: !0
            };
        }
        return f;
      },
      has(s, o) {
        if (o === qe)
          return !0;
        var f = r.get(o), _ = f !== void 0 && f.v !== Y || Reflect.has(s, o);
        if (f !== void 0 || N !== null && (!_ || Me(s, o)?.writable)) {
          f === void 0 && (f = v(() => F(_ ? K(s[o]) : Y)), r.set(o, f));
          var u = d(f);
          if (u === Y)
            return !1;
        }
        return _;
      },
      set(s, o, f, _) {
        var u = r.get(o), p = o in s;
        if (l && o === "length")
          for (var c = f; c < /** @type {Source<number>} */
          u.v; c += 1) {
            var b = r.get(c + "");
            b !== void 0 ? R(b, Y) : c in s && (b = v(() => F(Y)), r.set(c + "", b));
          }
        u === void 0 ? (!p || Me(s, o)?.writable) && (u = v(() => F(void 0)), R(
          u,
          v(() => K(f))
        ), r.set(o, u)) : (p = u.v !== Y, R(
          u,
          v(() => K(f))
        ));
        var m = Reflect.getOwnPropertyDescriptor(s, o);
        if (m?.set && m.set.call(_, f), !p) {
          if (l && typeof o == "string") {
            var h = (
              /** @type {Source<number>} */
              r.get("length")
            ), g = Number(o);
            Number.isInteger(g) && g >= h.v && R(h, g + 1);
          }
          _n(a);
        }
        return !0;
      },
      ownKeys(s) {
        d(a);
        var o = Reflect.ownKeys(s).filter((u) => {
          var p = r.get(u);
          return p === void 0 || p.v !== Y;
        });
        for (var [f, _] of r)
          _.v !== Y && !(f in s) && o.push(f);
        return o;
      },
      setPrototypeOf() {
        Dr();
      }
    }
  );
}
function _n(e, t = 1) {
  R(e, e.v + t);
}
function pn(e) {
  try {
    if (e !== null && typeof e == "object" && qe in e)
      return e[qe];
  } catch {
  }
  return e;
}
function An(e, t) {
  return Object.is(pn(e), pn(t));
}
const it = /* @__PURE__ */ new Map();
function xt(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: In,
    rv: 0,
    wv: 0
  };
  return n;
}
function F(e, t) {
  const n = xt(e);
  return Vn(n), n;
}
// @__NO_SIDE_EFFECTS__
function Tn(e, t = !1) {
  const n = xt(e);
  return t || (n.equals = tn), n;
}
function R(e, t, n = !1) {
  A !== null && !_e && Rn() && (A.f & (pe | en)) !== 0 && !ke?.includes(e) && Cr();
  let r = n ? K(t) : t;
  return Wt(e, r);
}
function Wt(e, t) {
  if (!e.equals(t)) {
    var n = e.v;
    vt ? it.set(e, t) : it.set(e, n), e.v = t, e.wv = Wn(), Mn(e, Ne), N !== null && (N.f & ee) !== 0 && (N.f & (Ce | Ze)) === 0 && (re === null ? Zr([e]) : re.push(e));
  }
  return t;
}
function Mn(e, t) {
  var n = e.reactions;
  if (n !== null)
    for (var r = n.length, l = 0; l < r; l++) {
      var a = n[l], i = a.f;
      (i & Ne) === 0 && (me(a, t), (i & (ee | le)) !== 0 && ((i & pe) !== 0 ? Mn(
        /** @type {Derived} */
        a,
        Xe
      ) : qt(
        /** @type {Effect} */
        a
      )));
    }
}
let Fr = !1;
var hn, Ln, Nn, On;
function qr() {
  if (hn === void 0) {
    hn = window, Ln = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    Nn = Me(t, "firstChild").get, On = Me(t, "nextSibling").get, cn(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), cn(n) && (n.__t = void 0);
  }
}
function ln(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function kt(e) {
  return Nn.call(e);
}
// @__NO_SIDE_EFFECTS__
function Nt(e) {
  return On.call(e);
}
function y(e, t) {
  return /* @__PURE__ */ kt(e);
}
function mt(e, t) {
  {
    var n = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ kt(
        /** @type {Node} */
        e
      )
    );
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Nt(n) : n;
  }
}
function E(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Nt(r);
  return r;
}
function zr(e) {
  e.textContent = "";
}
// @__NO_SIDE_EFFECTS__
function Ot(e) {
  var t = pe | Ne, n = A !== null && (A.f & pe) !== 0 ? (
    /** @type {Derived} */
    A
  ) : null;
  return N === null || n !== null && (n.f & le) !== 0 ? t |= le : N.f |= Dn, {
    ctx: Q,
    deps: null,
    effects: null,
    equals: In,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      null
    ),
    wv: 0,
    parent: n ?? N
  };
}
function oe(e) {
  const t = /* @__PURE__ */ Ot(e);
  return Vn(t), t;
}
// @__NO_SIDE_EFFECTS__
function Ur(e) {
  const t = /* @__PURE__ */ Ot(e);
  return t.equals = tn, t;
}
function Pn(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      De(
        /** @type {Effect} */
        t[n]
      );
  }
}
function Br(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & pe) === 0)
      return (
        /** @type {Effect} */
        t
      );
    t = t.parent;
  }
  return null;
}
function Hr(e) {
  var t, n = N;
  Le(Br(e));
  try {
    Pn(e), t = Kn(e);
  } finally {
    Le(n);
  }
  return t;
}
function Fn(e) {
  var t = Hr(e), n = (Te || (e.f & le) !== 0) && e.deps !== null ? Xe : ee;
  me(e, n), e.equals(t) || (e.v = t, e.wv = Wn());
}
function Vr(e) {
  N === null && A === null && yr(), A !== null && (A.f & le) !== 0 && N === null && br(), vt && wr();
}
function jr(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Qe(e, t, n, r = !0) {
  var l = N, a = {
    ctx: Q,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: e | Ne,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: l,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0
  };
  if (n)
    try {
      un(a), a.f |= pr;
    } catch (s) {
      throw De(a), s;
    }
  else t !== null && qt(a);
  var i = n && a.deps === null && a.first === null && a.nodes_start === null && a.teardown === null && (a.f & (Dn | bt)) === 0;
  if (!i && r && (l !== null && jr(a, l), A !== null && (A.f & pe) !== 0)) {
    var v = (
      /** @type {Derived} */
      A
    );
    (v.effects ??= []).push(a);
  }
  return a;
}
function Pt(e) {
  const t = Qe(Mt, null, !1);
  return me(t, ee), t.teardown = e, t;
}
function Wr(e) {
  Vr();
  var t = N !== null && (N.f & Ce) !== 0 && Q !== null && !Q.m;
  if (t) {
    var n = (
      /** @type {ComponentContext} */
      Q
    );
    (n.e ??= []).push({
      fn: e,
      effect: N,
      reaction: A
    });
  } else {
    var r = an(e);
    return r;
  }
}
function Yr(e) {
  const t = Qe(Ze, e, !0);
  return (n = {}) => new Promise((r) => {
    n.outro ? ot(t, () => {
      De(t), r(void 0);
    }) : (De(t), r(void 0));
  });
}
function an(e) {
  return Qe(En, e, !1);
}
function on(e) {
  return Qe(Mt, e, !0);
}
function U(e, t = [], n = Ot) {
  const r = t.map(n);
  return ft(() => e(...r.map(d)));
}
function ft(e, t = 0) {
  return Qe(Mt | en | t, e, !0);
}
function Ue(e, t = !0) {
  return Qe(Mt | Ce, e, !0, t);
}
function qn(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = vt, r = A;
    mn(!0), he(null);
    try {
      t.call(null);
    } finally {
      mn(n), he(r);
    }
  }
}
function zn(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    var r = n.next;
    (n.f & Ze) !== 0 ? n.parent = null : De(n, t), n = r;
  }
}
function Kr(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & Ce) === 0 && De(t), t = n;
  }
}
function De(e, t = !0) {
  var n = !1;
  if ((t || (e.f & hr) !== 0) && e.nodes_start !== null) {
    for (var r = e.nodes_start, l = e.nodes_end; r !== null; ) {
      var a = r === l ? null : (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Nt(r)
      );
      r.remove(), r = a;
    }
    n = !0;
  }
  zn(e, t && !n), Rt(e, 0), me(e, Lt);
  var i = e.transitions;
  if (i !== null)
    for (const s of i)
      s.stop();
  qn(e);
  var v = e.parent;
  v !== null && v.first !== null && Un(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes_start = e.nodes_end = null;
}
function Un(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function ot(e, t) {
  var n = [];
  sn(e, n, !0), Bn(n, () => {
    De(e), t && t();
  });
}
function Bn(e, t) {
  var n = e.length;
  if (n > 0) {
    var r = () => --n || t();
    for (var l of e)
      l.out(r);
  } else
    t();
}
function sn(e, t, n) {
  if ((e.f & xe) === 0) {
    if (e.f ^= xe, e.transitions !== null)
      for (const i of e.transitions)
        (i.is_global || n) && t.push(i);
    for (var r = e.first; r !== null; ) {
      var l = r.next, a = (r.f & ut) !== 0 || (r.f & Ce) !== 0;
      sn(r, t, a ? n : !1), r = l;
    }
  }
}
function Et(e) {
  Hn(e, !0);
}
function Hn(e, t) {
  if ((e.f & xe) !== 0) {
    e.f ^= xe, (e.f & ee) === 0 && (e.f ^= ee), ct(e) && (me(e, Ne), qt(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, l = (n.f & ut) !== 0 || (n.f & Ce) !== 0;
      Hn(n, l ? t : !1), n = r;
    }
    if (e.transitions !== null)
      for (const a of e.transitions)
        (a.is_global || t) && a.in();
  }
}
let Dt = [];
function Gr() {
  var e = Dt;
  Dt = [], _r(e);
}
function Ct(e) {
  Dt.length === 0 && queueMicrotask(Gr), Dt.push(e);
}
let gt = !1, Yt = !1, It = null, ze = !1, vt = !1;
function mn(e) {
  vt = e;
}
let wt = [];
let A = null, _e = !1;
function he(e) {
  A = e;
}
let N = null;
function Le(e) {
  N = e;
}
let ke = null;
function Jr(e) {
  ke = e;
}
function Vn(e) {
  A !== null && A.f & jt && (ke === null ? Jr([e]) : ke.push(e));
}
let j = null, X = 0, re = null;
function Zr(e) {
  re = e;
}
let jn = 1, St = 0, Te = !1;
function Wn() {
  return ++jn;
}
function ct(e) {
  var t = e.f;
  if ((t & Ne) !== 0)
    return !0;
  if ((t & Xe) !== 0) {
    var n = e.deps, r = (t & le) !== 0;
    if (n !== null) {
      var l, a, i = (t & yt) !== 0, v = r && N !== null && !Te, s = n.length;
      if (i || v) {
        var o = (
          /** @type {Derived} */
          e
        ), f = o.parent;
        for (l = 0; l < s; l++)
          a = n[l], (i || !a?.reactions?.includes(o)) && (a.reactions ??= []).push(o);
        i && (o.f ^= yt), v && f !== null && (f.f & le) === 0 && (o.f ^= le);
      }
      for (l = 0; l < s; l++)
        if (a = n[l], ct(
          /** @type {Derived} */
          a
        ) && Fn(
          /** @type {Derived} */
          a
        ), a.wv > e.wv)
          return !0;
    }
    (!r || N !== null && !Te) && me(e, ee);
  }
  return !1;
}
function Xr(e, t) {
  for (var n = t; n !== null; ) {
    if ((n.f & bt) !== 0)
      try {
        n.fn(e);
        return;
      } catch {
        n.f ^= bt;
      }
    n = n.parent;
  }
  throw gt = !1, e;
}
function Qr(e) {
  return (e.f & Lt) === 0 && (e.parent === null || (e.parent.f & bt) === 0);
}
function Ft(e, t, n, r) {
  if (gt) {
    if (n === null && (gt = !1), Qr(t))
      throw e;
    return;
  }
  n !== null && (gt = !0);
  {
    Xr(e, t);
    return;
  }
}
function Yn(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null)
    for (var l = 0; l < r.length; l++) {
      var a = r[l];
      ke?.includes(e) || ((a.f & pe) !== 0 ? Yn(
        /** @type {Derived} */
        a,
        t,
        !1
      ) : t === a && (n ? me(a, Ne) : (a.f & ee) !== 0 && me(a, Xe), qt(
        /** @type {Effect} */
        a
      )));
    }
}
function Kn(e) {
  var t = j, n = X, r = re, l = A, a = Te, i = ke, v = Q, s = _e, o = e.f;
  j = /** @type {null | Value[]} */
  null, X = 0, re = null, Te = (o & le) !== 0 && (_e || !ze || A === null), A = (o & (Ce | Ze)) === 0 ? e : null, ke = null, dn(e.ctx), _e = !1, St++, e.f |= jt;
  try {
    var f = (
      /** @type {Function} */
      (0, e.fn)()
    ), _ = e.deps;
    if (j !== null) {
      var u;
      if (Rt(e, X), _ !== null && X > 0)
        for (_.length = X + j.length, u = 0; u < j.length; u++)
          _[X + u] = j[u];
      else
        e.deps = _ = j;
      if (!Te)
        for (u = X; u < _.length; u++)
          (_[u].reactions ??= []).push(e);
    } else _ !== null && X < _.length && (Rt(e, X), _.length = X);
    if (Rn() && re !== null && !_e && _ !== null && (e.f & (pe | Xe | Ne)) === 0)
      for (u = 0; u < /** @type {Source[]} */
      re.length; u++)
        Yn(
          re[u],
          /** @type {Effect} */
          e
        );
    return l !== e && (St++, re !== null && (r === null ? r = re : r.push(.../** @type {Source[]} */
    re))), f;
  } finally {
    j = t, X = n, re = r, A = l, Te = a, ke = i, dn(v), _e = s, e.f ^= jt;
  }
}
function $r(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = fr.call(n, e);
    if (r !== -1) {
      var l = n.length - 1;
      l === 0 ? n = t.reactions = null : (n[r] = n[l], n.pop());
    }
  }
  n === null && (t.f & pe) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (j === null || !j.includes(t)) && (me(t, Xe), (t.f & (le | yt)) === 0 && (t.f ^= yt), Pn(
    /** @type {Derived} **/
    t
  ), Rt(
    /** @type {Derived} **/
    t,
    0
  ));
}
function Rt(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      $r(e, n[r]);
}
function un(e) {
  var t = e.f;
  if ((t & Lt) === 0) {
    me(e, ee);
    var n = N, r = Q, l = ze;
    N = e, ze = !0;
    try {
      (t & en) !== 0 ? Kr(e) : zn(e), qn(e);
      var a = Kn(e);
      e.teardown = typeof a == "function" ? a : null, e.wv = jn;
      var i = e.deps, v;
    } catch (s) {
      Ft(s, e, n, r || e.ctx);
    } finally {
      ze = l, N = n;
    }
  }
}
function el() {
  try {
    xr();
  } catch (e) {
    if (It !== null)
      Ft(e, It, null);
    else
      throw e;
  }
}
function tl() {
  var e = ze;
  try {
    var t = 0;
    for (ze = !0; wt.length > 0; ) {
      t++ > 1e3 && el();
      var n = wt, r = n.length;
      wt = [];
      for (var l = 0; l < r; l++) {
        var a = rl(n[l]);
        nl(a);
      }
      it.clear();
    }
  } finally {
    Yt = !1, ze = e, It = null;
  }
}
function nl(e) {
  var t = e.length;
  if (t !== 0)
    for (var n = 0; n < t; n++) {
      var r = e[n];
      if ((r.f & (Lt | xe)) === 0)
        try {
          ct(r) && (un(r), r.deps === null && r.first === null && r.nodes_start === null && (r.teardown === null ? Un(r) : r.fn = null));
        } catch (l) {
          Ft(l, r, null, r.ctx);
        }
    }
}
function qt(e) {
  Yt || (Yt = !0, queueMicrotask(tl));
  for (var t = It = e; t.parent !== null; ) {
    t = t.parent;
    var n = t.f;
    if ((n & (Ze | Ce)) !== 0) {
      if ((n & ee) === 0) return;
      t.f ^= ee;
    }
  }
  wt.push(t);
}
function rl(e) {
  for (var t = [], n = e; n !== null; ) {
    var r = n.f, l = (r & (Ce | Ze)) !== 0, a = l && (r & ee) !== 0;
    if (!a && (r & xe) === 0) {
      if ((r & En) !== 0)
        t.push(n);
      else if (l)
        n.f ^= ee;
      else {
        var i = A;
        try {
          A = n, ct(n) && un(n);
        } catch (o) {
          Ft(o, n, null, n.ctx);
        } finally {
          A = i;
        }
      }
      var v = n.first;
      if (v !== null) {
        n = v;
        continue;
      }
    }
    var s = n.parent;
    for (n = n.next; n === null && s !== null; )
      n = s.next, s = s.parent;
  }
  return t;
}
function d(e) {
  var t = e.f, n = (t & pe) !== 0;
  if (A !== null && !_e) {
    if (!ke?.includes(e)) {
      var r = A.deps;
      e.rv < St && (e.rv = St, j === null && r !== null && r[X] === e ? X++ : j === null ? j = [e] : (!Te || !j.includes(e)) && j.push(e));
    }
  } else if (n && /** @type {Derived} */
  e.deps === null && /** @type {Derived} */
  e.effects === null) {
    var l = (
      /** @type {Derived} */
      e
    ), a = l.parent;
    a !== null && (a.f & le) === 0 && (l.f ^= le);
  }
  return n && (l = /** @type {Derived} */
  e, ct(l) && Fn(l)), vt && it.has(e) ? it.get(e) : e.v;
}
function At(e) {
  var t = _e;
  try {
    return _e = !0, e();
  } finally {
    _e = t;
  }
}
const ll = -7169;
function me(e, t) {
  e.f = e.f & ll | t;
}
const al = ["touchstart", "touchmove"];
function il(e) {
  return al.includes(e);
}
let gn = !1;
function ol() {
  gn || (gn = !0, document.addEventListener(
    "reset",
    (e) => {
      Promise.resolve().then(() => {
        if (!e.defaultPrevented)
          for (
            const t of
            /**@type {HTMLFormElement} */
            e.target.elements
          )
            t.__on_r?.();
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possiblity of stopPropagation)
    { capture: !0 }
  ));
}
function Gn(e) {
  var t = A, n = N;
  he(null), Le(null);
  try {
    return e();
  } finally {
    he(t), Le(n);
  }
}
function Jn(e, t, n, r = n) {
  e.addEventListener(t, () => Gn(n));
  const l = e.__on_r;
  l ? e.__on_r = () => {
    l(), r(!0);
  } : e.__on_r = () => r(!0), ol();
}
const Zn = /* @__PURE__ */ new Set(), Kt = /* @__PURE__ */ new Set();
function sl(e, t, n, r = {}) {
  function l(a) {
    if (r.capture || rt.call(t, a), !a.cancelBubble)
      return Gn(() => n?.call(this, a));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Ct(() => {
    t.addEventListener(e, l, r);
  }) : t.addEventListener(e, l, r), l;
}
function lt(e, t, n, r, l) {
  var a = { capture: r, passive: l }, i = sl(e, t, n, a);
  (t === document.body || t === window || t === document) && Pt(() => {
    t.removeEventListener(e, i, a);
  });
}
function Be(e) {
  for (var t = 0; t < e.length; t++)
    Zn.add(e[t]);
  for (var n of Kt)
    n(e);
}
function rt(e) {
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, l = e.composedPath?.() || [], a = (
    /** @type {null | Element} */
    l[0] || e.target
  ), i = 0, v = e.__root;
  if (v) {
    var s = l.indexOf(v);
    if (s !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e.__root = t;
      return;
    }
    var o = l.indexOf(t);
    if (o === -1)
      return;
    s <= o && (i = s);
  }
  if (a = /** @type {Element} */
  l[i] || e.target, a !== t) {
    vr(e, "currentTarget", {
      configurable: !0,
      get() {
        return a || n;
      }
    });
    var f = A, _ = N;
    he(null), Le(null);
    try {
      for (var u, p = []; a !== null; ) {
        var c = a.assignedSlot || a.parentNode || /** @type {any} */
        a.host || null;
        try {
          var b = a["__" + r];
          if (b != null && (!/** @type {any} */
          a.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === a))
            if (Tt(b)) {
              var [m, ...h] = b;
              m.apply(a, [e, ...h]);
            } else
              b.call(a, e);
        } catch (g) {
          u ? p.push(g) : u = g;
        }
        if (e.cancelBubble || c === t || c === null)
          break;
        a = c;
      }
      if (u) {
        for (let g of p)
          queueMicrotask(() => {
            throw g;
          });
        throw u;
      }
    } finally {
      e.__root = t, delete e.currentTarget, he(f), Le(_);
    }
  }
}
function ul(e) {
  var t = document.createElement("template");
  return t.innerHTML = e, t.content;
}
function Gt(e, t) {
  var n = (
    /** @type {Effect} */
    N
  );
  n.nodes_start === null && (n.nodes_start = e, n.nodes_end = t);
}
// @__NO_SIDE_EFFECTS__
function I(e, t) {
  var n = (t & Lr) !== 0, r = (t & Nr) !== 0, l, a = !e.startsWith("<!>");
  return () => {
    l === void 0 && (l = ul(a ? e : "<!>" + e), n || (l = /** @type {Node} */
    /* @__PURE__ */ kt(l)));
    var i = (
      /** @type {TemplateNode} */
      r || Ln ? document.importNode(l, !0) : l.cloneNode(!0)
    );
    if (n) {
      var v = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ kt(i)
      ), s = (
        /** @type {TemplateNode} */
        i.lastChild
      );
      Gt(v, s);
    } else
      Gt(i, i);
    return i;
  };
}
function fl() {
  var e = document.createDocumentFragment(), t = document.createComment(""), n = ln();
  return e.append(t, n), Gt(t, n), e;
}
function C(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function $(e, t) {
  var n = t == null ? "" : typeof t == "object" ? t + "" : t;
  n !== (e.__t ??= e.nodeValue) && (e.__t = n, e.nodeValue = n + "");
}
function vl(e, t) {
  return cl(e, t);
}
const Ke = /* @__PURE__ */ new Map();
function cl(e, { target: t, anchor: n, props: r = {}, events: l, context: a, intro: i = !0 }) {
  qr();
  var v = /* @__PURE__ */ new Set(), s = (_) => {
    for (var u = 0; u < _.length; u++) {
      var p = _[u];
      if (!v.has(p)) {
        v.add(p);
        var c = il(p);
        t.addEventListener(p, rt, { passive: c });
        var b = Ke.get(p);
        b === void 0 ? (document.addEventListener(p, rt, { passive: c }), Ke.set(p, 1)) : Ke.set(p, b + 1);
      }
    }
  };
  s(Qt(Zn)), Kt.add(s);
  var o = void 0, f = Yr(() => {
    var _ = n ?? t.appendChild(ln());
    return Ue(() => {
      if (a) {
        ae({});
        var u = (
          /** @type {ComponentContext} */
          Q
        );
        u.c = a;
      }
      l && (r.$$events = l), o = e(_, r) || {}, a && ie();
    }), () => {
      for (var u of v) {
        t.removeEventListener(u, rt);
        var p = (
          /** @type {number} */
          Ke.get(u)
        );
        --p === 0 ? (document.removeEventListener(u, rt), Ke.delete(u)) : Ke.set(u, p);
      }
      Kt.delete(s), _ !== n && _.parentNode?.removeChild(_);
    };
  });
  return dl.set(o, f), o;
}
let dl = /* @__PURE__ */ new WeakMap();
function z(e, t, [n, r] = [0, 0]) {
  var l = e, a = null, i = null, v = Y, s = n > 0 ? ut : 0, o = !1;
  const f = (u, p = !0) => {
    o = !0, _(p, u);
  }, _ = (u, p) => {
    v !== (v = u) && (v ? (a ? Et(a) : p && (a = Ue(() => p(l))), i && ot(i, () => {
      i = null;
    })) : (i ? Et(i) : p && (i = Ue(() => p(l, [n + 1, r]))), a && ot(a, () => {
      a = null;
    })));
  };
  ft(() => {
    o = !1, t(f), o || _(null, null);
  }, s);
}
function Je(e, t) {
  return t;
}
function _l(e, t, n, r) {
  for (var l = [], a = t.length, i = 0; i < a; i++)
    sn(t[i].e, l, !0);
  var v = a > 0 && l.length === 0 && n !== null;
  if (v) {
    var s = (
      /** @type {Element} */
      /** @type {Element} */
      n.parentNode
    );
    zr(s), s.append(
      /** @type {Element} */
      n
    ), r.clear(), Ae(e, t[0].prev, t[a - 1].next);
  }
  Bn(l, () => {
    for (var o = 0; o < a; o++) {
      var f = t[o];
      v || (r.delete(f.k), Ae(e, f.prev, f.next)), De(f.e, !v);
    }
  });
}
function Ee(e, t, n, r, l, a = null) {
  var i = e, v = { flags: t, items: /* @__PURE__ */ new Map(), first: null }, s = (t & Sn) !== 0;
  if (s) {
    var o = (
      /** @type {Element} */
      e
    );
    i = o.appendChild(ln());
  }
  var f = null, _ = !1, u = /* @__PURE__ */ Ur(() => {
    var p = n();
    return Tt(p) ? p : p == null ? [] : Qt(p);
  });
  ft(() => {
    var p = d(u), c = p.length;
    _ && c === 0 || (_ = c === 0, pl(p, v, i, l, t, r, n), a !== null && (c === 0 ? f ? Et(f) : f = Ue(() => a(i)) : f !== null && ot(f, () => {
      f = null;
    })), d(u));
  });
}
function pl(e, t, n, r, l, a, i) {
  var v = (l & Ir) !== 0, s = (l & (nn | rn)) !== 0, o = e.length, f = t.items, _ = t.first, u = _, p, c = null, b, m = [], h = [], g, x, w, k;
  if (v)
    for (k = 0; k < o; k += 1)
      g = e[k], x = a(g, k), w = f.get(x), w !== void 0 && (w.a?.measure(), (b ??= /* @__PURE__ */ new Set()).add(w));
  for (k = 0; k < o; k += 1) {
    if (g = e[k], x = a(g, k), w = f.get(x), w === void 0) {
      var S = u ? (
        /** @type {TemplateNode} */
        u.e.nodes_start
      ) : n;
      c = ml(
        S,
        t,
        c,
        c === null ? t.first : c.next,
        g,
        x,
        k,
        r,
        l,
        i
      ), f.set(x, c), m = [], h = [], u = c.next;
      continue;
    }
    if (s && hl(w, g, k, l), (w.e.f & xe) !== 0 && (Et(w.e), v && (w.a?.unfix(), (b ??= /* @__PURE__ */ new Set()).delete(w))), w !== u) {
      if (p !== void 0 && p.has(w)) {
        if (m.length < h.length) {
          var T = h[0], P;
          c = T.prev;
          var H = m[0], B = m[m.length - 1];
          for (P = 0; P < m.length; P += 1)
            wn(m[P], T, n);
          for (P = 0; P < h.length; P += 1)
            p.delete(h[P]);
          Ae(t, H.prev, B.next), Ae(t, c, H), Ae(t, B, T), u = T, c = B, k -= 1, m = [], h = [];
        } else
          p.delete(w), wn(w, u, n), Ae(t, w.prev, w.next), Ae(t, w, c === null ? t.first : c.next), Ae(t, c, w), c = w;
        continue;
      }
      for (m = [], h = []; u !== null && u.k !== x; )
        (u.e.f & xe) === 0 && (p ??= /* @__PURE__ */ new Set()).add(u), h.push(u), u = u.next;
      if (u === null)
        continue;
      w = u;
    }
    m.push(w), c = w, u = w.next;
  }
  if (u !== null || p !== void 0) {
    for (var L = p === void 0 ? [] : Qt(p); u !== null; )
      (u.e.f & xe) === 0 && L.push(u), u = u.next;
    var se = L.length;
    if (se > 0) {
      var ue = (l & Sn) !== 0 && o === 0 ? n : null;
      if (v) {
        for (k = 0; k < se; k += 1)
          L[k].a?.measure();
        for (k = 0; k < se; k += 1)
          L[k].a?.fix();
      }
      _l(t, L, ue, f);
    }
  }
  v && Ct(() => {
    if (b !== void 0)
      for (w of b)
        w.a?.apply();
  }), N.first = t.first && t.first.e, N.last = c && c.e;
}
function hl(e, t, n, r) {
  (r & nn) !== 0 && Wt(e.v, t), (r & rn) !== 0 ? Wt(
    /** @type {Value<number>} */
    e.i,
    n
  ) : e.i = n;
}
function ml(e, t, n, r, l, a, i, v, s, o) {
  var f = (s & nn) !== 0, _ = (s & Sr) === 0, u = f ? _ ? /* @__PURE__ */ Tn(l) : xt(l) : l, p = (s & rn) === 0 ? i : xt(i), c = {
    i: p,
    v: u,
    k: a,
    a: null,
    // @ts-expect-error
    e: null,
    prev: n,
    next: r
  };
  try {
    return c.e = Ue(() => v(e, u, p, o), Fr), c.e.prev = n && n.e, c.e.next = r && r.e, n === null ? t.first = c : (n.next = c, n.e.next = c.e), r !== null && (r.prev = c, r.e.prev = c.e), c;
  } finally {
  }
}
function wn(e, t, n) {
  for (var r = e.next ? (
    /** @type {TemplateNode} */
    e.next.e.nodes_start
  ) : n, l = t ? (
    /** @type {TemplateNode} */
    t.e.nodes_start
  ) : n, a = (
    /** @type {TemplateNode} */
    e.e.nodes_start
  ); a !== r; ) {
    var i = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Nt(a)
    );
    l.before(a), a = i;
  }
}
function Ae(e, t, n) {
  t === null ? e.first = n : (t.next = n, t.e.next = n && n.e), n !== null && (n.prev = t, n.e.prev = t && t.e);
}
function gl(e, t, ...n) {
  var r = e, l = Vt, a;
  ft(() => {
    l !== (l = t()) && (a && (De(a), a = null), a = Ue(() => (
      /** @type {SnippetFn} */
      l(r, ...n)
    )));
  }, ut);
}
function wl(e, t, n) {
  var r = e, l, a;
  ft(() => {
    l !== (l = t()) && (a && (ot(a), a = null), l && (a = Ue(() => n(r, l))));
  }, ut);
}
function bl(e, t, n) {
  var r = e == null ? "" : "" + e;
  return r = r ? r + " " + t : t, r === "" ? null : r;
}
function yl(e, t, n, r, l, a) {
  var i = e.__className;
  if (i !== n || i === void 0) {
    var v = bl(n, r);
    v == null ? e.removeAttribute("class") : e.className = v, e.__className = n;
  }
  return a;
}
const xl = Symbol("is custom element"), kl = Symbol("is html");
function at(e, t) {
  var n = Xn(e);
  n.value === (n.value = // treat null and undefined the same for the initial value
  t ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  e.value === t && (t !== 0 || e.nodeName !== "PROGRESS") || (e.value = t ?? "");
}
function st(e, t, n, r) {
  var l = Xn(e);
  l[t] !== (l[t] = n) && (t === "loading" && (e[mr] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && El(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Xn(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ??= {
      [xl]: e.nodeName.includes("-"),
      [kl]: e.namespaceURI === Or
    }
  );
}
var bn = /* @__PURE__ */ new Map();
function El(e) {
  var t = bn.get(e.nodeName);
  if (t) return t;
  bn.set(e.nodeName, t = []);
  for (var n, r = e, l = Element.prototype; l !== r; ) {
    n = cr(r);
    for (var a in n)
      n[a].set && t.push(a);
    r = $t(r);
  }
  return t;
}
const Bt = /* @__PURE__ */ new Set();
function Dl(e, t, n, r, l = r) {
  var a = n.getAttribute("type") === "checkbox", i = e;
  if (t !== null)
    for (var v of t)
      i = i[v] ??= [];
  i.push(n), Jn(
    n,
    "change",
    () => {
      var s = n.__value;
      a && (s = Cl(i, s, n.checked)), l(s);
    },
    // TODO better default value handling
    () => l(a ? [] : null)
  ), on(() => {
    var s = r();
    a ? (s = s || [], n.checked = s.includes(n.__value)) : n.checked = An(n.__value, s);
  }), Pt(() => {
    var s = i.indexOf(n);
    s !== -1 && i.splice(s, 1);
  }), Bt.has(i) || (Bt.add(i), Ct(() => {
    i.sort((s, o) => s.compareDocumentPosition(o) === 4 ? -1 : 1), Bt.delete(i);
  })), Ct(() => {
  });
}
function Ht(e, t, n = t) {
  Jn(e, "change", (r) => {
    var l = r ? e.defaultChecked : e.checked;
    n(l);
  }), // If we are hydrating and the value has since changed,
  // then use the update value from the input instead.
  // If defaultChecked is set, then checked == defaultChecked
  At(t) == null && n(e.checked), on(() => {
    var r = t();
    e.checked = !!r;
  });
}
function Cl(e, t, n) {
  for (var r = /* @__PURE__ */ new Set(), l = 0; l < e.length; l += 1)
    e[l].checked && r.add(e[l].__value);
  return n || r.delete(t), Array.from(r);
}
function Ge(e, t, n) {
  if (e.multiple)
    return Il(e, t);
  for (var r of e.options) {
    var l = Qn(r);
    if (An(l, t)) {
      r.selected = !0;
      return;
    }
  }
  (!n || t !== void 0) && (e.selectedIndex = -1);
}
function _t(e, t) {
  let n = !0;
  an(() => {
    t && Ge(e, At(t), n), n = !1;
    var r = new MutationObserver(() => {
      var l = e.__value;
      Ge(e, l);
    });
    return r.observe(e, {
      // Listen to option element changes
      childList: !0,
      subtree: !0,
      // because of <optgroup>
      // Listen to option element value attribute changes
      // (doesn't get notified of select value changes,
      // because that property is not reflected as an attribute)
      attributes: !0,
      attributeFilter: ["value"]
    }), () => {
      r.disconnect();
    };
  });
}
function Il(e, t) {
  for (var n of e.options)
    n.selected = ~t.indexOf(Qn(n));
}
function Qn(e) {
  return "__value" in e ? e.__value : e.value;
}
function Sl(e, t, n, r, l) {
  var a = () => {
    r(n[e]);
  };
  n.addEventListener(t, a), l ? on(() => {
    n[e] = l();
  }) : a(), (n === document.body || n === window || n === document) && Pt(() => {
    n.removeEventListener(t, a);
  });
}
let pt = !1;
function Rl(e) {
  var t = pt;
  try {
    return pt = !1, [e(), pt];
  } finally {
    pt = t;
  }
}
const Al = {
  get(e, t) {
    if (!e.exclude.includes(t))
      return e.props[t];
  },
  set(e, t) {
    return !1;
  },
  getOwnPropertyDescriptor(e, t) {
    if (!e.exclude.includes(t) && t in e.props)
      return {
        enumerable: !0,
        configurable: !0,
        value: e.props[t]
      };
  },
  has(e, t) {
    return e.exclude.includes(t) ? !1 : t in e.props;
  },
  ownKeys(e) {
    return Reflect.ownKeys(e.props).filter((t) => !e.exclude.includes(t));
  }
};
// @__NO_SIDE_EFFECTS__
function Tl(e, t, n) {
  return new Proxy(
    { props: e, exclude: t },
    Al
  );
}
const Ml = {
  get(e, t) {
    let n = e.props.length;
    for (; n--; ) {
      let r = e.props[n];
      if (nt(r) && (r = r()), typeof r == "object" && r !== null && t in r) return r[t];
    }
  },
  set(e, t, n) {
    let r = e.props.length;
    for (; r--; ) {
      let l = e.props[r];
      nt(l) && (l = l());
      const a = Me(l, t);
      if (a && a.set)
        return a.set(n), !0;
    }
    return !1;
  },
  getOwnPropertyDescriptor(e, t) {
    let n = e.props.length;
    for (; n--; ) {
      let r = e.props[n];
      if (nt(r) && (r = r()), typeof r == "object" && r !== null && t in r) {
        const l = Me(r, t);
        return l && !l.configurable && (l.configurable = !0), l;
      }
    }
  },
  has(e, t) {
    if (t === qe || t === Cn) return !1;
    for (let n of e.props)
      if (nt(n) && (n = n()), n != null && t in n) return !0;
    return !1;
  },
  ownKeys(e) {
    const t = [];
    for (let n of e.props) {
      nt(n) && (n = n());
      for (const r in n)
        t.includes(r) || t.push(r);
    }
    return t;
  }
};
function Ll(...e) {
  return new Proxy({ props: e }, Ml);
}
function yn(e) {
  return e.ctx?.d ?? !1;
}
function O(e, t, n, r) {
  var l = (n & Rr) !== 0, a = !0, i = (n & Tr) !== 0, v = (n & Mr) !== 0, s = !1, o;
  i ? [o, s] = Rl(() => (
    /** @type {V} */
    e[t]
  )) : o = /** @type {V} */
  e[t];
  var f = qe in e || Cn in e, _ = i && (Me(e, t)?.set ?? (f && t in e && ((k) => e[t] = k))) || void 0, u = (
    /** @type {V} */
    r
  ), p = !0, c = !1, b = () => (c = !0, p && (p = !1, v ? u = At(
    /** @type {() => V} */
    r
  ) : u = /** @type {V} */
  r), u);
  o === void 0 && r !== void 0 && (_ && a && kr(), o = b(), _ && _(o));
  var m;
  if (m = () => {
    var k = (
      /** @type {V} */
      e[t]
    );
    return k === void 0 ? b() : (p = !0, c = !1, k);
  }, (n & Ar) === 0)
    return m;
  if (_) {
    var h = e.$$legacy;
    return function(k, S) {
      return arguments.length > 0 ? ((!S || h || s) && _(S ? m() : k), k) : m();
    };
  }
  var g = !1, x = /* @__PURE__ */ Tn(o), w = /* @__PURE__ */ Ot(() => {
    var k = m(), S = d(x);
    return g ? (g = !1, S) : x.v = k;
  });
  return i && d(w), l || (w.equals = tn), function(k, S) {
    if (arguments.length > 0) {
      const T = S ? d(w) : i ? K(k) : k;
      if (!w.equals(T)) {
        if (g = !0, R(x, T), c && u !== void 0 && (u = T), yn(w))
          return k;
        At(() => d(w));
      }
      return k;
    }
    return yn(w) ? w.v : d(w);
  };
}
const Nl = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(Nl);
var Ol = (e, t) => {
  t()();
}, Pl = /* @__PURE__ */ I('<button class="close-button svelte-1yyu9sr" title="Delete">✖</button>');
function fn(e, t) {
  ae(t, !0);
  let n = O(t, "onDelete", 3, () => {
  });
  var r = Pl();
  r.__click = [Ol, n], C(e, r), ie();
}
Be(["click"]);
var Fl = /* @__PURE__ */ I('<div class="columns svelte-m9yof8"><div class="rows full-flex svelte-m9yof8"><div class="columns full-flex svelte-m9yof8"><!></div> <span class="error"> </span></div> <!></div>');
function $n(e, t) {
  let n = O(t, "onDelete", 3, () => {
  }), r = O(t, "error", 3, "");
  var l = Fl(), a = y(l), i = y(a), v = y(i);
  gl(v, () => t.children);
  var s = E(i, 2), o = y(s), f = E(a, 2);
  fn(f, {
    get onDelete() {
      return n();
    }
  }), U(() => $(o, r())), C(e, l);
}
function ql(e, t, n) {
  const l = e.target.value;
  t()({ ...n.value, checksum: l });
}
var zl = /* @__PURE__ */ I('<div class="checksum-input svelte-93k28s"><label class="svelte-93k28s"><span class="svelte-93k28s">Checksum</span> <input type="text" class="checksum-text"></label></div>'), Ul = /* @__PURE__ */ I('<div class="content-input svelte-93k28s"><!></div> <!>', 1);
function xn(e, t) {
  ae(t, !0);
  let n = O(t, "error", 3, ""), r = O(t, "hideChecksum", 3, !1), l = O(t, "onInput", 3, (s) => {
  }), a = O(t, "onDelete", 3, (s) => {
  }), i = /* @__PURE__ */ Tl(t, [
    "$$slots",
    "$$events",
    "$$legacy",
    "File",
    "value",
    "error",
    "hideChecksum",
    "onInput",
    "onDelete"
  ]);
  function v(s) {
    l()({ ...t.value, file: s });
  }
  $n(e, {
    get error() {
      return n();
    },
    onDelete: () => a()(t.value.id),
    children: (s, o) => {
      var f = Ul(), _ = mt(f), u = y(_);
      wl(u, () => t.File, (b, m) => {
        m(b, Ll(
          {
            onInput: v,
            get value() {
              return t.value.file;
            }
          },
          () => i
        ));
      });
      var p = E(_, 2);
      {
        var c = (b) => {
          var m = zl(), h = y(m), g = E(y(h), 2);
          st(g, "size", 16), g.__input = [ql, l, t], U(() => at(g, t.value.checksum)), C(b, m);
        };
        z(p, (b) => {
          r() || b(c);
        });
      }
      C(s, f);
    },
    $$slots: { default: !0 }
  }), ie();
}
Be(["input"]);
var Bl = /* @__PURE__ */ I('<label class="svelte-oa9r7s"><span class="svelte-oa9r7s">File Content</span> <textarea wrap="hard" class="hex-input svelte-oa9r7s" spellcheck="false"></textarea></label>');
function Hl(e, t) {
  ae(t, !0);
  let n = O(t, "onInput", 3, (h) => {
  }), r = O(t, "rowLength", 3, 16), l = O(t, "value", 15, "");
  function a(h) {
    return h.replace(/[^0-9a-fA-F]/g, "");
  }
  function i(h) {
    return h.replace(/(.{2})/g, "$1 ").trimEnd();
  }
  function v(h) {
    return h.selectionDirection === "backward" ? h.selectionStart : h.selectionEnd;
  }
  function s(h) {
    return h * 3 >> 1;
  }
  const o = oe(() => new RegExp(`.{1,${Math.floor(r() * 2)}}`, "g")), f = oe(() => s(Math.floor(r() * 2)));
  function _(h) {
    return (h.match(d(o)) ?? [h]).map(i).join(`
`);
  }
  const u = oe(() => _(l()));
  function p(h, g) {
    const x = g ?? h.length, w = a(h.substring(0, x)), k = a(h.substring(x, h.length));
    return l(w + k), n()(l()), s(w.length);
  }
  function c(h) {
    const g = h.target, x = v(g), w = p(g.value, x);
    g.value = d(u), g.setSelectionRange(w, w);
  }
  var b = Bl(), m = E(y(b), 2);
  m.__input = c, U(
    (h) => {
      at(m, d(u)), st(m, "cols", d(f)), st(m, "rows", h);
    },
    [
      () => Math.min(Math.max(Math.ceil(d(u).length / d(f)), 1), 16)
    ]
  ), C(e, b), ie();
}
Be(["input"]);
function Vl(e, t, n) {
  const l = e.target.files?.[0];
  l && (t(l), n()(l));
}
var jl = /* @__PURE__ */ I('<label class="svelte-hfsx3m">File <div class="button svelte-hfsx3m"> </div> <input type="file" class="svelte-hfsx3m"></label>');
function Wl(e, t) {
  ae(t, !0);
  let n = O(t, "onInput", 3, (s) => {
  }), r = O(t, "value", 7);
  var l = jl(), a = E(y(l)), i = y(a), v = E(a, 2);
  v.__input = [Vl, r, n], U(() => $(i, r().name)), C(e, l), ie();
}
Be(["input"]);
function Yl(e) {
  return typeof e.file == "string";
}
function Kl(e) {
  return typeof e.file == "object";
}
function Jt(e, t) {
  return t.map((n) => n.id == e.id ? e : n);
}
function Zt(e, t) {
  return t.filter((n) => n.id != e);
}
var Gl = (e, t, n, r) => {
  let l = {
    id: d(t),
    checksum: "",
    file: ""
  };
  n()([...r.values, l]);
}, Jl = (e, t, n, r) => {
  const l = e.target;
  l.files && t()(n(l.files, r.values));
}, Zl = /* @__PURE__ */ I("<li><!></li>"), Xl = /* @__PURE__ */ I('<div class="file-row-list svelte-lc05o2" role="region"><div class="file-row-buttons svelte-lc05o2"><button title="Add a hex field for inputting bytes manually" class="svelte-lc05o2">+Hex</button> <label class="button svelte-lc05o2" title="Add some files from disk">+Files<input multiple type="file" class="button svelte-lc05o2"></label> <!></div> <ul></ul></div>');
function Ql(e, t) {
  ae(t, !0);
  let n = O(t, "onUpdate", 3, (m) => {
  }), r = O(t, "errors", 19, () => ({})), l = O(t, "hideChecksum", 3, !1), a = oe(() => (t.values[t.values.length - 1]?.id ?? -1) + 1);
  function i(m, h) {
    let g = d(a);
    const x = Array.from(m).map((w) => ({ id: g++, file: w, checksum: "" }));
    return [...h, ...x];
  }
  function v(m) {
    m.preventDefault();
    const h = m.dataTransfer?.files;
    h && n()(i(h, t.values));
  }
  function s(m) {
    m.preventDefault();
  }
  var o = Xl(), f = y(o), _ = y(f);
  _.__click = [Gl, a, n, t];
  var u = E(_, 2), p = E(y(u));
  p.__input = [Jl, n, i, t];
  var c = E(u, 2);
  fn(c, { onDelete: () => n()([]) });
  var b = E(f, 2);
  Ee(b, 21, () => t.values, (m) => m.id, (m, h) => {
    var g = Zl(), x = y(g);
    {
      var w = (S) => {
        const T = oe(() => r()[d(h).id] ?? "");
        xn(S, {
          File: Hl,
          get value() {
            return d(h);
          },
          get error() {
            return d(T);
          },
          get hideChecksum() {
            return l();
          },
          onInput: (P) => {
            n()(Jt(P, t.values));
          },
          onDelete: (P) => {
            n()(Zt(P, t.values));
          },
          rowCount: 16
        });
      }, k = (S, T) => {
        {
          var P = (H) => {
            const B = oe(() => r()[d(h).id] ?? "");
            xn(H, {
              File: Wl,
              get value() {
                return d(h);
              },
              get error() {
                return d(B);
              },
              get hideChecksum() {
                return l();
              },
              onInput: (L) => {
                n()(Jt(L, t.values));
              },
              onDelete: (L) => {
                n()(Zt(L, t.values));
              }
            });
          };
          z(
            S,
            (H) => {
              Kl(d(h)) && H(P);
            },
            T
          );
        }
      };
      z(x, (S) => {
        Yl(d(h)) ? S(w) : S(k, !1);
      });
    }
    C(m, g);
  }), lt("drop", o, v), lt("dragover", o, s), C(e, o), ie();
}
Be(["click", "input"]);
var Re = /* @__PURE__ */ ((e) => (e[e.Decimal = 0] = "Decimal", e[e.Hexadecimal = 1] = "Hexadecimal", e[e.String = 2] = "String", e[e.Endian = 3] = "Endian", e[e.Wordsize = 4] = "Wordsize", e[e.Boolean = 5] = "Boolean", e[e.Signedness = 6] = "Signedness", e))(Re || {});
const zt = [
  {
    name: "in_endian",
    type: 3
    /* Endian */
  },
  {
    name: "out_endian",
    type: 3
    /* Endian */
  },
  {
    name: "wordsize",
    type: 4
    /* Wordsize */
  }
], Ut = {
  name: "width",
  type: 0
  /* Decimal */
}, $l = {
  name: "modsum",
  rows: [
    Ut,
    {
      name: "modulus",
      type: 1
      /* Hexadecimal */
    },
    {
      name: "init",
      type: 1
      /* Hexadecimal */
    },
    {
      name: "negated",
      type: 5
      /* Boolean */
    },
    {
      name: "signedness",
      type: 6
      /* Signedness */
    },
    ...zt
  ]
}, ea = {
  name: "fletcher",
  rows: [
    Ut,
    {
      name: "modulus",
      type: 1
      /* Hexadecimal */
    },
    {
      name: "init",
      type: 1
      /* Hexadecimal */
    },
    {
      name: "addout",
      type: 1
      /* Hexadecimal */
    },
    {
      name: "swap",
      type: 5
      /* Boolean */
    },
    {
      name: "signedness",
      type: 6
      /* Signedness */
    },
    ...zt
  ]
}, ta = {
  name: "crc",
  rows: [
    Ut,
    {
      name: "poly",
      type: 1
      /* Hexadecimal */
    },
    {
      name: "init",
      type: 1
      /* Hexadecimal */
    },
    {
      name: "xorout",
      type: 1
      /* Hexadecimal */
    },
    {
      name: "refin",
      type: 5
      /* Boolean */
    },
    {
      name: "refout",
      type: 5
      /* Boolean */
    },
    ...zt
  ]
}, na = {
  name: "polyhash",
  rows: [
    Ut,
    {
      name: "factor",
      type: 1
      /* Hexadecimal */
    },
    {
      name: "init",
      type: 1
      /* Hexadecimal */
    },
    {
      name: "addout",
      type: 1
      /* Hexadecimal */
    },
    {
      name: "signedness",
      type: 6
      /* Signedness */
    },
    ...zt
  ]
}, Xt = {
  crc: ta,
  fletcher: ea,
  modsum: $l,
  polyhash: na
};
function ra(e, t) {
  return e.rows.reduce((n, r) => {
    let l = t[r.name];
    return l != null && l != null && l != "" ? (r.type === 2 && (l = `"${l}"`), `${n} ${r.name}=${l}`) : n;
  }, e.name);
}
function er(e) {
  const t = e.trim().split(" "), n = t[0];
  if (!Xt[n])
    throw new Error(`Invalid model algorithm: ${e}`);
  const r = Xt[t[0]], l = {};
  for (let a = 1; a < t.length; a++) {
    const i = t[a];
    if (!i)
      continue;
    const [v, s] = i.split("=");
    if (!v || !s)
      throw new Error(`Invalid model string: ${e}`);
    l[v] = s;
  }
  return [r, l];
}
function Fe(e, t) {
  const r = e.target.value;
  t()(r);
}
var la = /* @__PURE__ */ I('<input type="text" class="model-input svelte-177bwv7">'), aa = /* @__PURE__ */ I('<input type="text" class="model-input svelte-177bwv7" pattern="0|[1-9]+\\d*">'), ia = /* @__PURE__ */ I('<input type="text" class="model-input svelte-177bwv7" pattern="[0-9a-fA-F]*">'), oa = /* @__PURE__ */ I('<select class="model-input svelte-177bwv7"><option></option><option>true</option><option>false</option></select>'), sa = /* @__PURE__ */ I('<select class="model-input svelte-177bwv7"><option></option><option>Big</option><option>Little</option></select>'), ua = /* @__PURE__ */ I('<select class="model-input svelte-177bwv7"><option></option><option>8</option><option>16</option><option>24</option><option>32</option><option>40</option><option>48</option><option>56</option><option>64</option></select>'), fa = /* @__PURE__ */ I('<select class="model-input svelte-177bwv7"><option></option><option>Signed</option><option>Unsigned</option></select>'), va = /* @__PURE__ */ I('<div class="model-row svelte-177bwv7"><label class="svelte-177bwv7"> <!></label></div>');
function ca(e, t) {
  ae(t, !0);
  let n = O(t, "value", 3, ""), r = O(t, "onInput", 3, (f) => {
  });
  var l = va(), a = y(l), i = y(a), v = E(i);
  {
    var s = (f) => {
      var _ = la();
      _.__input = [Fe, r], U(() => at(_, n())), C(f, _);
    }, o = (f, _) => {
      {
        var u = (c) => {
          var b = aa();
          b.__input = [Fe, r], U(() => at(b, n())), C(c, b);
        }, p = (c, b) => {
          {
            var m = (g) => {
              var x = ia();
              x.__input = [Fe, r], U(() => at(x, n())), C(g, x);
            }, h = (g, x) => {
              {
                var w = (S) => {
                  var T = oa();
                  _t(T, n);
                  var P;
                  T.__input = [Fe, r];
                  var H = y(T);
                  H.value = ((H.__value = "") == null, "");
                  var B = E(H);
                  B.value = (B.__value = "true") == null ? "" : "true";
                  var L = E(B);
                  L.value = (L.__value = "false") == null ? "" : "false", U(() => {
                    P !== (P = n()) && (T.value = (T.__value = n()) == null ? "" : n(), Ge(T, n()));
                  }), C(S, T);
                }, k = (S, T) => {
                  {
                    var P = (B) => {
                      var L = sa();
                      _t(L, n);
                      var se;
                      L.__input = [Fe, r];
                      var ue = y(L);
                      ue.value = ((ue.__value = "") == null, "");
                      var G = E(ue);
                      G.value = (G.__value = "big") == null ? "" : "big";
                      var V = E(G);
                      V.value = (V.__value = "little") == null ? "" : "little", U(() => {
                        se !== (se = n()) && (L.value = (L.__value = n()) == null ? "" : n(), Ge(L, n()));
                      }), C(B, L);
                    }, H = (B, L) => {
                      {
                        var se = (G) => {
                          var V = ua();
                          _t(V, n);
                          var He;
                          V.__input = [Fe, r];
                          var ge = y(V);
                          ge.value = ((ge.__value = "") == null, "");
                          var J = E(ge);
                          J.value = (J.__value = "8") == null ? "" : "8";
                          var Ie = E(J);
                          Ie.value = (Ie.__value = "16") == null ? "" : "16";
                          var fe = E(Ie);
                          fe.value = (fe.__value = "24") == null ? "" : "24";
                          var ve = E(fe);
                          ve.value = (ve.__value = "32") == null ? "" : "32";
                          var we = E(ve);
                          we.value = (we.__value = "40") == null ? "" : "40";
                          var Ve = E(we);
                          Ve.value = (Ve.__value = "48") == null ? "" : "48";
                          var $e = E(Ve);
                          $e.value = ($e.__value = "56") == null ? "" : "56";
                          var et = E($e);
                          et.value = (et.__value = "64") == null ? "" : "64", U(() => {
                            He !== (He = n()) && (V.value = (V.__value = n()) == null ? "" : n(), Ge(V, n()));
                          }), C(G, V);
                        }, ue = (G, V) => {
                          {
                            var He = (ge) => {
                              var J = fa();
                              _t(J, n);
                              var Ie;
                              J.__input = [Fe, r];
                              var fe = y(J);
                              fe.value = ((fe.__value = "") == null, "");
                              var ve = E(fe);
                              ve.value = (ve.__value = "signed") == null ? "" : "signed";
                              var we = E(ve);
                              we.value = (we.__value = "unsigned") == null ? "" : "unsigned", U(() => {
                                Ie !== (Ie = n()) && (J.value = (J.__value = n()) == null ? "" : n(), Ge(J, n()));
                              }), C(ge, J);
                            };
                            z(
                              G,
                              (ge) => {
                                t.definition.type === Re.Signedness && ge(He);
                              },
                              V
                            );
                          }
                        };
                        z(
                          B,
                          (G) => {
                            t.definition.type === Re.Wordsize ? G(se) : G(ue, !1);
                          },
                          L
                        );
                      }
                    };
                    z(
                      S,
                      (B) => {
                        t.definition.type === Re.Endian ? B(P) : B(H, !1);
                      },
                      T
                    );
                  }
                };
                z(
                  g,
                  (S) => {
                    t.definition.type === Re.Boolean ? S(w) : S(k, !1);
                  },
                  x
                );
              }
            };
            z(
              c,
              (g) => {
                t.definition.type === Re.Hexadecimal ? g(m) : g(h, !1);
              },
              b
            );
          }
        };
        z(
          f,
          (c) => {
            t.definition.type === Re.Decimal ? c(u) : c(p, !1);
          },
          _
        );
      }
    };
    z(v, (f) => {
      t.definition.type === Re.String ? f(s) : f(o, !1);
    });
  }
  U(() => $(i, `${t.definition.name ?? ""} `)), C(e, l), ie();
}
Be(["input"]);
var da = /* @__PURE__ */ I('<details><summary>Model <div class="model-string"> </div></summary> <div class="model-list svelte-1a2y3us"></div></details>');
function _a(e, t) {
  ae(t, !0);
  let n = O(t, "value", 19, () => ({})), r = O(t, "onInput", 3, (v) => {
  }), l = O(t, "onDelete", 3, () => {
  }), a = O(t, "open", 3, !1), i = O(t, "error", 3, "");
  $n(e, {
    get onDelete() {
      return l();
    },
    get error() {
      return i();
    },
    children: (v, s) => {
      var o = da(), f = y(o), _ = E(y(f)), u = y(_), p = E(f, 2);
      Ee(p, 21, () => t.model.rows, (c) => c.name, (c, b) => {
        const m = oe(() => n()[d(b).name] ?? "");
        ca(c, {
          get definition() {
            return d(b);
          },
          get value() {
            return d(m);
          },
          onInput: (h) => {
            r()({ ...n(), [d(b).name]: h });
          }
        });
      }), U(
        (c) => {
          o.open = a(), $(u, c);
        },
        [
          () => ra(t.model, n())
        ]
      ), C(v, o);
    },
    $$slots: { default: !0 }
  }), ie();
}
var pa = (e, t) => {
  t("crc");
}, ha = (e, t) => {
  t("modsum");
}, ma = (e, t) => {
  t("fletcher");
}, ga = (e, t) => {
  t("polyhash");
}, wa = /* @__PURE__ */ I("<li><!></li>"), ba = /* @__PURE__ */ I('<div class="model-list svelte-4mzwka" role="region"><div class="model-buttons svelte-4mzwka"><button title="Add a new CRC model" class="svelte-4mzwka">+CRC</button> <button title="Add a new modsum model" class="svelte-4mzwka">+modsum</button> <button title="Add a new fletcher model" class="svelte-4mzwka">+fletcher</button> <button title="Add a new polyhash model" class="svelte-4mzwka">+polyhash</button> <!></div> <ul></ul></div>');
function ya(e, t) {
  ae(t, !0);
  let n = O(t, "onUpdate", 3, (g) => {
  }), r = O(t, "errors", 19, () => ({})), l = oe(() => (t.values[t.values.length - 1]?.id ?? -1) + 1);
  function a(g) {
    let x = {
      id: d(l),
      model: Xt[g],
      value: {}
    };
    n()([...t.values, x]);
  }
  function i(g) {
    let x = d(l);
    const w = g.split(`
`);
    let k = [];
    for (const S of w)
      try {
        const [T, P] = er(S);
        k.push({ id: x++, model: T, value: P });
      } catch {
        continue;
      }
    n()([...t.values, ...k]);
  }
  function v(g) {
    g.preventDefault();
    const x = g;
    if (!x.clipboardData || !x.clipboardData.types.includes("text/plain"))
      return;
    const w = x.clipboardData.getData("text/plain");
    i(w);
  }
  async function s(g) {
    g.preventDefault();
    const x = g.dataTransfer?.files;
    if (x && x && x.length > 0)
      for (let w = 0; w < x.length; w++) {
        const S = await x[w].text();
        i(S);
      }
  }
  function o(g) {
    g.preventDefault();
  }
  var f = ba(), _ = y(f), u = y(_);
  u.__click = [pa, a];
  var p = E(u, 2);
  p.__click = [ha, a];
  var c = E(p, 2);
  c.__click = [ma, a];
  var b = E(c, 2);
  b.__click = [ga, a];
  var m = E(b, 2);
  fn(m, { onDelete: () => n()([]) });
  var h = E(_, 2);
  Ee(h, 21, () => t.values, (g) => g.id, (g, x) => {
    var w = wa(), k = y(w);
    const S = oe(() => r()[d(x).id] ?? "");
    _a(k, {
      get model() {
        return d(x).model;
      },
      get value() {
        return d(x).value;
      },
      open: !0,
      onInput: (T) => n()(Jt({ ...d(x), value: T }, t.values)),
      onDelete: () => n()(Zt(d(x).id, t.values)),
      get error() {
        return d(S);
      }
    }), C(g, w);
  }), lt("paste", f, v), lt("drop", f, s), lt("dragover", f, o), C(e, f), ie();
}
Be(["click"]);
var xa = /* @__PURE__ */ I("<li><span> </span></li>"), ka = /* @__PURE__ */ I("<ul></ul>"), Ea = /* @__PURE__ */ I('<details><summary><span class="model-string"> </span> <div class="model-text"> </div></summary> <!></details>');
function Da(e, t) {
  ae(t, !0);
  let n = F(!1);
  function r(c) {
    const b = c.start.join(",​"), m = c.end.join(",​");
    return b + ":​" + m;
  }
  function l(c) {
    let b = [], m = 0;
    for (let h = 0; h < c.start.length; h++) {
      let g = c.start[h];
      for (; m < c.end.length && c.end[m] < g && c.end[m] >= 0; )
        m++;
      if (m >= c.end.length)
        break;
      for (let x = m; x < c.end.length; x++) {
        let w = c.end[x];
        b.push([g, w]);
      }
    }
    return b;
  }
  const a = oe(() => r(t.value.range));
  var i = Ea(), v = y(i), s = y(v), o = y(s), f = E(s, 2), _ = y(f), u = E(v, 2);
  {
    var p = (c) => {
      var b = ka();
      Ee(b, 21, () => l(t.value.range), Je, (m, h) => {
        let g = () => d(h)[0], x = () => d(h)[1];
        var w = xa(), k = y(w), S = y(k);
        U(() => $(S, `${g() ?? ""}:${x() ?? ""}`)), C(m, w);
      }), C(c, b);
    };
    z(u, (c) => {
      d(n) && c(p);
    });
  }
  U(() => {
    $(o, t.value.model), $(_, d(a));
  }), Sl("open", "toggle", i, (c) => R(n, c), () => d(n)), C(e, i), ie();
}
var Ca = /* @__PURE__ */ I('<th class="svelte-1hwri1k"> </th>'), Ia = /* @__PURE__ */ I('<td class="checksum svelte-1hwri1k"> </td>'), Sa = /* @__PURE__ */ I('<tr class="svelte-1hwri1k"><td><span class="model-string"> </span></td><!></tr>'), Ra = /* @__PURE__ */ I('<table class="svelte-1hwri1k"><thead class="svelte-1hwri1k"><tr class="svelte-1hwri1k"><th class="svelte-1hwri1k">File</th><!></tr></thead><tbody class="svelte-1hwri1k"></tbody></table>');
function Aa(e, t) {
  ae(t, !0);
  var n = Ra(), r = y(n), l = y(r), a = E(y(l));
  Ee(a, 17, () => t.checksums.fileLabels, Je, (v, s) => {
    var o = Ca(), f = y(o);
    U(() => $(f, d(s))), C(v, o);
  });
  var i = E(r);
  Ee(i, 21, () => t.checksums.modelLabels, Je, (v, s, o) => {
    var f = Sa(), _ = y(f), u = y(_), p = y(u), c = E(_);
    Ee(c, 17, () => t.checksums.checksums[o], Je, (b, m) => {
      var h = Ia(), g = y(h);
      U(() => $(g, d(m))), C(b, h);
    }), U(() => $(p, d(s))), C(v, f);
  }), C(e, n), ie();
}
var Ta = /* @__PURE__ */ I('<label><input type="radio" class="svelte-q1to7z"> </label>'), Ma = /* @__PURE__ */ I('<div><label class="checkbox" title="Instead of explicitely giving a checksum, the last bytes of the input file are used as the input checksum"><input type="checkbox"> Input files end with checksum</label></div>'), La = /* @__PURE__ */ I('<div><label class="checkbox" title="For cases where files have different sizes, instead of trying the first min(sizes) words for the range ends, try the last min(sizes) and output the offset as a negative number relative to the file end"><input type="checkbox"> Range ends are relative to file ends</label></div>'), Na = /* @__PURE__ */ I('<div><label class="checkbox" title="Try all possible parameter combinations, using more time and resulting in more false positives"><input type="checkbox"> Extended search</label></div>'), Oa = /* @__PURE__ */ I('<li class="output-item"><div class="model-string"> </div></li>'), Pa = /* @__PURE__ */ I("<p>No matches found.</p>"), Fa = /* @__PURE__ */ I('<ul class="output-list svelte-q1to7z"></ul> <!>', 1), qa = /* @__PURE__ */ I('<li class="output-item"><!></li>'), za = /* @__PURE__ */ I("<p>No matches found.</p>"), Ua = /* @__PURE__ */ I('<ul class="output-list svelte-q1to7z"></ul> <!>', 1), Ba = /* @__PURE__ */ I('<p class="error"> </p>'), Ha = /* @__PURE__ */ I("<p>Calculating...</p>"), Va = /* @__PURE__ */ I('<main class="content svelte-q1to7z"><div class="inputs svelte-q1to7z"><div class="box input-box svelte-q1to7z"><h2>Files</h2> <!></div> <div class="box input-box svelte-q1to7z"><h2>Models</h2> <!></div></div> <div class="box svelte-q1to7z"><h2>Options</h2> <div class="choosers svelte-q1to7z"><!> <!> <!></div> <!> <!> <!></div> <div class="box svelte-q1to7z"><h2>Output</h2> <!></div></main>');
function ja(e, t) {
  ae(t, !0);
  const n = [];
  let r, l = "ready", a = 0, i = F(K([
    {
      id: 0,
      file: "5813759a9972",
      checksum: "c4b28aa0"
    },
    {
      id: 1,
      file: "398798abca",
      checksum: "dfdf04ac"
    },
    {
      id: 2,
      file: "5979a979a797",
      checksum: "8aef53bb"
    }
  ]));
  const v = er("crc width=32");
  let s = F(K([
    {
      id: 0,
      model: v[0],
      value: v[1]
    }
  ])), o = F(!1), f = F(!1), _ = F(!1), u = F(!0), p;
  function c(D) {
    D === "ready" ? (clearTimeout(p), R(u, !1)) : l === "ready" && (clearTimeout(p), p = setTimeout(
      () => {
        R(u, !0);
      },
      100
    )), l = D;
  }
  let b = F("reverse"), m = F(null), h = F(K([])), g = F(K([])), x = F(K({
    checksums: [],
    fileLabels: [],
    modelLabels: []
  })), w = F(""), k = F(K({})), S = F(K({}));
  function T() {
    let D;
    switch (d(b)) {
      case "part":
        D = {
          tag: Z(d(b)),
          files: Z(d(i)),
          models: Z(d(s)),
          trailingCheck: Z(d(o)),
          endRelative: Z(d(f))
        };
        break;
      case "reverse":
        D = {
          tag: Z(d(b)),
          files: Z(d(i)),
          models: Z(d(s)),
          trailingCheck: Z(d(o)),
          extendedSearch: Z(d(_))
        };
        break;
      case "checksum":
        D = {
          tag: Z(d(b)),
          files: Z(d(i)),
          models: Z(d(s))
        };
        break;
    }
    return D;
  }
  function P(D, q = r) {
    const M = { id: ++a, payload: D };
    q.postMessage(M);
  }
  function H() {
    let D = new Worker(new URL(
      /* @vite-ignore */
      "" + new URL("assets/worker-kyhMpfbI.js", import.meta.url).href,
      import.meta.url
    ), { type: "module" });
    return D.onmessage = (q) => {
      const M = q.data;
      if (M.id == a) {
        switch (M.tag) {
          case "part":
            R(g, M.ranges, !0), R(m, "part"), R(k, M.inputErrors.inputFileErrors, !0), R(S, M.inputErrors.inputModelErrors, !0);
            break;
          case "reverse":
            R(h, M.models, !0), R(m, "reverse"), R(k, M.inputErrors.inputFileErrors, !0), R(S, M.inputErrors.inputModelErrors, !0);
            break;
          case "checksum":
            R(x, M.checks, !0), R(m, "checksum"), R(k, M.inputErrors.inputFileErrors, !0), R(S, M.inputErrors.inputModelErrors, !0);
            break;
          case "error":
            R(w, M.error, !0), R(m, "error");
        }
        c("ready");
      }
    }, D;
  }
  r = H();
  function B(D) {
    switch (l) {
      case "processing":
        r.terminate(), r = H();
        break;
      case "ready":
        P(D), c("processing");
        break;
    }
  }
  let L = null;
  function se(D) {
    let q = 0;
    L !== null && (clearTimeout(L), q = 1e3), L = setTimeout(
      () => {
        B(D);
      },
      q
    );
  }
  Wr(() => {
    const D = T();
    se(D);
  });
  var ue = Va(), G = y(ue), V = y(G), He = E(y(V), 2);
  const ge = oe(() => d(b) === "checksum" || d(o));
  Ql(He, {
    get values() {
      return d(i);
    },
    onUpdate: (D) => R(i, D, !0),
    get errors() {
      return d(k);
    },
    get hideChecksum() {
      return d(ge);
    }
  });
  var J = E(V, 2), Ie = E(y(J), 2);
  ya(Ie, {
    get values() {
      return d(s);
    },
    onUpdate: (D) => R(s, D, !0),
    get errors() {
      return d(S);
    }
  });
  var fe = E(G, 2), ve = E(y(fe), 2);
  {
    const D = (q, M = Vt, be = Vt) => {
      var te = Ta(), ne = y(te), Oe, je = E(ne);
      U(
        (Pe, ce, W) => {
          yl(te, 1, `edgy button ${Pe ?? ""}`, "svelte-q1to7z"), st(te, "title", be()), st(ne, "name", ce), Oe !== (Oe = W) && (ne.value = (ne.__value = W) == null ? "" : W), $(je, ` ${M() ?? ""}`);
        },
        [
          () => M().toLowerCase() === d(b) ? "chosen-one" : "",
          () => M().toLowerCase(),
          () => M().toLowerCase()
        ]
      ), Dl(
        n,
        [],
        ne,
        () => (M().toLowerCase(), d(b)),
        (Pe) => R(b, Pe)
      ), C(q, te);
    };
    var we = y(ve);
    D(we, () => "Reverse", () => "Output all possible models where all files have matching checksums for any of the model prototypes given");
    var Ve = E(we, 2);
    D(Ve, () => "Part", () => "For each model, give all possible ranges such that each range has the given checksum in every file");
    var $e = E(Ve, 2);
    D($e, () => "Checksum", () => "For each file and each model, returns the checksum of the whole file");
  }
  var et = E(ve, 2);
  {
    var tr = (D) => {
      var q = Ma(), M = y(q), be = y(M);
      Ht(be, () => d(o), (te) => R(o, te)), C(D, q);
    };
    z(et, (D) => {
      d(b) !== "checksum" && D(tr);
    });
  }
  var vn = E(et, 2);
  {
    var nr = (D) => {
      var q = La(), M = y(q), be = y(M);
      Ht(be, () => d(f), (te) => R(f, te)), C(D, q);
    };
    z(vn, (D) => {
      d(b) === "part" && D(nr);
    });
  }
  var rr = E(vn, 2);
  {
    var lr = (D) => {
      var q = Na(), M = y(q), be = y(M);
      Ht(be, () => d(_), (te) => R(_, te)), C(D, q);
    };
    z(rr, (D) => {
      d(b) === "reverse" && D(lr);
    });
  }
  var ar = E(fe, 2), ir = E(y(ar), 2);
  {
    var or = (D) => {
      var q = fl(), M = mt(q);
      {
        var be = (ne) => {
          var Oe = Fa(), je = mt(Oe);
          Ee(je, 21, () => d(h), Je, (W, Se) => {
            var We = Oa(), de = y(We), ye = y(de);
            U(() => $(ye, d(Se))), C(W, We);
          });
          var Pe = E(je, 2);
          {
            var ce = (W) => {
              var Se = Pa();
              C(W, Se);
            };
            z(Pe, (W) => {
              d(h).length === 0 && W(ce);
            });
          }
          C(ne, Oe);
        }, te = (ne, Oe) => {
          {
            var je = (ce) => {
              var W = Ua(), Se = mt(W);
              Ee(Se, 21, () => d(g), Je, (ye, tt) => {
                var Ye = qa(), dt = y(Ye);
                Da(dt, {
                  get value() {
                    return d(tt);
                  }
                }), C(ye, Ye);
              });
              var We = E(Se, 2);
              {
                var de = (ye) => {
                  var tt = za();
                  C(ye, tt);
                };
                z(We, (ye) => {
                  d(g).length === 0 && ye(de);
                });
              }
              C(ce, W);
            }, Pe = (ce, W) => {
              {
                var Se = (de) => {
                  Aa(de, {
                    get checksums() {
                      return d(x);
                    }
                  });
                }, We = (de, ye) => {
                  {
                    var tt = (Ye) => {
                      var dt = Ba(), ur = y(dt);
                      U(() => $(ur, d(w))), C(Ye, dt);
                    };
                    z(
                      de,
                      (Ye) => {
                        d(m) === "error" && Ye(tt);
                      },
                      ye
                    );
                  }
                };
                z(
                  ce,
                  (de) => {
                    d(m) === "checksum" ? de(Se) : de(We, !1);
                  },
                  W
                );
              }
            };
            z(
              ne,
              (ce) => {
                d(m) === "part" ? ce(je) : ce(Pe, !1);
              },
              Oe
            );
          }
        };
        z(M, (ne) => {
          d(m) === "reverse" ? ne(be) : ne(te, !1);
        });
      }
      C(D, q);
    }, sr = (D) => {
      var q = Ha();
      C(D, q);
    };
    z(ir, (D) => {
      d(u) ? D(sr, !1) : D(or);
    });
  }
  C(e, ue), ie();
}
const Wa = vl(ja, {
  target: document.getElementById("app")
});
export {
  Wa as default
};
