var Aw = Object.defineProperty;
var fh = (e) => {
  throw TypeError(e);
};
var Cw = (e, t, r) => t in e ? Aw(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var to = (e, t, r) => Cw(e, typeof t != "symbol" ? t + "" : t, r), dh = (e, t, r) => t.has(e) || fh("Cannot " + r);
var Ae = (e, t, r) => (dh(e, t, "read from private field"), r ? r.call(e) : t.get(e)), ro = (e, t, r) => t.has(e) ? fh("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), no = (e, t, r, n) => (dh(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r);
import Dr, { ipcMain as br, dialog as hh, shell as Rw, app as Cn, BrowserWindow as ph } from "electron";
import jy from "events";
import ra from "crypto";
import Ly from "tty";
import Hs from "util";
import Gs from "os";
import mn from "fs";
import na from "stream";
import ji from "url";
import Iw from "string_decoder";
import kw from "constants";
import My from "assert";
import me from "path";
import ia, { spawn as Rl } from "child_process";
import Uy from "zlib";
import Dw from "http";
import { fileURLToPath as Fw } from "node:url";
import oe from "node:path";
import Ve from "node:process";
import { promisify as at, isDeepStrictEqual as jw } from "node:util";
import ue from "node:fs";
import io from "node:crypto";
import Lw from "node:assert";
import Bs from "node:os";
var Zt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function zs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Mc = {}, Ke = {}, fn = {};
Object.defineProperty(fn, "__esModule", { value: !0 });
fn.CancellationError = fn.CancellationToken = void 0;
const Mw = jy;
class Uw extends Mw.EventEmitter {
  get cancelled() {
    return this._cancelled || this._parent != null && this._parent.cancelled;
  }
  set parent(t) {
    this.removeParentCancelHandler(), this._parent = t, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
  }
  // babel cannot compile ... correctly for super calls
  constructor(t) {
    super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, t != null && (this.parent = t);
  }
  cancel() {
    this._cancelled = !0, this.emit("cancel");
  }
  onCancel(t) {
    this.cancelled ? t() : this.once("cancel", t);
  }
  createPromise(t) {
    if (this.cancelled)
      return Promise.reject(new Il());
    const r = () => {
      if (n != null)
        try {
          this.removeListener("cancel", n), n = null;
        } catch {
        }
    };
    let n = null;
    return new Promise((i, o) => {
      let a = null;
      if (n = () => {
        try {
          a != null && (a(), a = null);
        } finally {
          o(new Il());
        }
      }, this.cancelled) {
        n();
        return;
      }
      this.onCancel(n), t(i, o, (s) => {
        a = s;
      });
    }).then((i) => (r(), i)).catch((i) => {
      throw r(), i;
    });
  }
  removeParentCancelHandler() {
    const t = this._parent;
    t != null && this.parentCancelHandler != null && (t.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
  }
  dispose() {
    try {
      this.removeParentCancelHandler();
    } finally {
      this.removeAllListeners(), this._parent = null;
    }
  }
}
fn.CancellationToken = Uw;
class Il extends Error {
  constructor() {
    super("cancelled");
  }
}
fn.CancellationError = Il;
var $t = {}, kl = { exports: {} }, Ra = { exports: {} }, Uc, mh;
function xw() {
  if (mh) return Uc;
  mh = 1;
  var e = 1e3, t = e * 60, r = t * 60, n = r * 24, i = n * 7, o = n * 365.25;
  Uc = function(l, u) {
    u = u || {};
    var p = typeof l;
    if (p === "string" && l.length > 0)
      return a(l);
    if (p === "number" && isFinite(l))
      return u.long ? c(l) : s(l);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(l)
    );
  };
  function a(l) {
    if (l = String(l), !(l.length > 100)) {
      var u = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        l
      );
      if (u) {
        var p = parseFloat(u[1]), h = (u[2] || "ms").toLowerCase();
        switch (h) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return p * o;
          case "weeks":
          case "week":
          case "w":
            return p * i;
          case "days":
          case "day":
          case "d":
            return p * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return p * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return p * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return p * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return p;
          default:
            return;
        }
      }
    }
  }
  function s(l) {
    var u = Math.abs(l);
    return u >= n ? Math.round(l / n) + "d" : u >= r ? Math.round(l / r) + "h" : u >= t ? Math.round(l / t) + "m" : u >= e ? Math.round(l / e) + "s" : l + "ms";
  }
  function c(l) {
    var u = Math.abs(l);
    return u >= n ? f(l, u, n, "day") : u >= r ? f(l, u, r, "hour") : u >= t ? f(l, u, t, "minute") : u >= e ? f(l, u, e, "second") : l + " ms";
  }
  function f(l, u, p, h) {
    var v = u >= p * 1.5;
    return Math.round(l / p) + " " + h + (v ? "s" : "");
  }
  return Uc;
}
var xc, yh;
function xy() {
  if (yh) return xc;
  yh = 1;
  function e(t) {
    n.debug = n, n.default = n, n.coerce = f, n.disable = s, n.enable = o, n.enabled = c, n.humanize = xw(), n.destroy = l, Object.keys(t).forEach((u) => {
      n[u] = t[u];
    }), n.names = [], n.skips = [], n.formatters = {};
    function r(u) {
      let p = 0;
      for (let h = 0; h < u.length; h++)
        p = (p << 5) - p + u.charCodeAt(h), p |= 0;
      return n.colors[Math.abs(p) % n.colors.length];
    }
    n.selectColor = r;
    function n(u) {
      let p, h = null, v, _;
      function g(...m) {
        if (!g.enabled)
          return;
        const E = g, N = Number(/* @__PURE__ */ new Date()), R = N - (p || N);
        E.diff = R, E.prev = p, E.curr = N, p = N, m[0] = n.coerce(m[0]), typeof m[0] != "string" && m.unshift("%O");
        let F = 0;
        m[0] = m[0].replace(/%([a-zA-Z%])/g, (L, V) => {
          if (L === "%%")
            return "%";
          F++;
          const P = n.formatters[V];
          if (typeof P == "function") {
            const K = m[F];
            L = P.call(E, K), m.splice(F, 1), F--;
          }
          return L;
        }), n.formatArgs.call(E, m), (E.log || n.log).apply(E, m);
      }
      return g.namespace = u, g.useColors = n.useColors(), g.color = n.selectColor(u), g.extend = i, g.destroy = n.destroy, Object.defineProperty(g, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => h !== null ? h : (v !== n.namespaces && (v = n.namespaces, _ = n.enabled(u)), _),
        set: (m) => {
          h = m;
        }
      }), typeof n.init == "function" && n.init(g), g;
    }
    function i(u, p) {
      const h = n(this.namespace + (typeof p > "u" ? ":" : p) + u);
      return h.log = this.log, h;
    }
    function o(u) {
      n.save(u), n.namespaces = u, n.names = [], n.skips = [];
      const p = (typeof u == "string" ? u : "").trim().replace(" ", ",").split(",").filter(Boolean);
      for (const h of p)
        h[0] === "-" ? n.skips.push(h.slice(1)) : n.names.push(h);
    }
    function a(u, p) {
      let h = 0, v = 0, _ = -1, g = 0;
      for (; h < u.length; )
        if (v < p.length && (p[v] === u[h] || p[v] === "*"))
          p[v] === "*" ? (_ = v, g = h, v++) : (h++, v++);
        else if (_ !== -1)
          v = _ + 1, g++, h = g;
        else
          return !1;
      for (; v < p.length && p[v] === "*"; )
        v++;
      return v === p.length;
    }
    function s() {
      const u = [
        ...n.names,
        ...n.skips.map((p) => "-" + p)
      ].join(",");
      return n.enable(""), u;
    }
    function c(u) {
      for (const p of n.skips)
        if (a(u, p))
          return !1;
      for (const p of n.names)
        if (a(u, p))
          return !0;
      return !1;
    }
    function f(u) {
      return u instanceof Error ? u.stack || u.message : u;
    }
    function l() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return n.enable(n.load()), n;
  }
  return xc = e, xc;
}
var gh;
function qw() {
  return gh || (gh = 1, function(e, t) {
    t.formatArgs = n, t.save = i, t.load = o, t.useColors = r, t.storage = a(), t.destroy = /* @__PURE__ */ (() => {
      let c = !1;
      return () => {
        c || (c = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function r() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let c;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (c = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(c[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function n(c) {
      if (c[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + c[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const f = "color: " + this.color;
      c.splice(1, 0, f, "color: inherit");
      let l = 0, u = 0;
      c[0].replace(/%[a-zA-Z%]/g, (p) => {
        p !== "%%" && (l++, p === "%c" && (u = l));
      }), c.splice(u, 0, f);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(c) {
      try {
        c ? t.storage.setItem("debug", c) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function o() {
      let c;
      try {
        c = t.storage.getItem("debug");
      } catch {
      }
      return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c;
    }
    function a() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = xy()(t);
    const { formatters: s } = e.exports;
    s.j = function(c) {
      try {
        return JSON.stringify(c);
      } catch (f) {
        return "[UnexpectedJSONParseError]: " + f.message;
      }
    };
  }(Ra, Ra.exports)), Ra.exports;
}
var Ia = { exports: {} }, qc, $h;
function Vw() {
  return $h || ($h = 1, qc = (e, t = process.argv) => {
    const r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = t.indexOf(r + e), i = t.indexOf("--");
    return n !== -1 && (i === -1 || n < i);
  }), qc;
}
var Vc, vh;
function Hw() {
  if (vh) return Vc;
  vh = 1;
  const e = Gs, t = Ly, r = Vw(), { env: n } = process;
  let i;
  r("no-color") || r("no-colors") || r("color=false") || r("color=never") ? i = 0 : (r("color") || r("colors") || r("color=true") || r("color=always")) && (i = 1), "FORCE_COLOR" in n && (n.FORCE_COLOR === "true" ? i = 1 : n.FORCE_COLOR === "false" ? i = 0 : i = n.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(n.FORCE_COLOR, 10), 3));
  function o(c) {
    return c === 0 ? !1 : {
      level: c,
      hasBasic: !0,
      has256: c >= 2,
      has16m: c >= 3
    };
  }
  function a(c, f) {
    if (i === 0)
      return 0;
    if (r("color=16m") || r("color=full") || r("color=truecolor"))
      return 3;
    if (r("color=256"))
      return 2;
    if (c && !f && i === void 0)
      return 0;
    const l = i || 0;
    if (n.TERM === "dumb")
      return l;
    if (process.platform === "win32") {
      const u = e.release().split(".");
      return Number(u[0]) >= 10 && Number(u[2]) >= 10586 ? Number(u[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((u) => u in n) || n.CI_NAME === "codeship" ? 1 : l;
    if ("TEAMCITY_VERSION" in n)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(n.TEAMCITY_VERSION) ? 1 : 0;
    if (n.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in n) {
      const u = parseInt((n.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (n.TERM_PROGRAM) {
        case "iTerm.app":
          return u >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : l;
  }
  function s(c) {
    const f = a(c, c && c.isTTY);
    return o(f);
  }
  return Vc = {
    supportsColor: s,
    stdout: o(a(!0, t.isatty(1))),
    stderr: o(a(!0, t.isatty(2)))
  }, Vc;
}
var _h;
function Gw() {
  return _h || (_h = 1, function(e, t) {
    const r = Ly, n = Hs;
    t.init = l, t.log = s, t.formatArgs = o, t.save = c, t.load = f, t.useColors = i, t.destroy = n.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const p = Hw();
      p && (p.stderr || p).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((p) => /^debug_/i.test(p)).reduce((p, h) => {
      const v = h.substring(6).toLowerCase().replace(/_([a-z])/g, (g, m) => m.toUpperCase());
      let _ = process.env[h];
      return /^(yes|on|true|enabled)$/i.test(_) ? _ = !0 : /^(no|off|false|disabled)$/i.test(_) ? _ = !1 : _ === "null" ? _ = null : _ = Number(_), p[v] = _, p;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : r.isatty(process.stderr.fd);
    }
    function o(p) {
      const { namespace: h, useColors: v } = this;
      if (v) {
        const _ = this.color, g = "\x1B[3" + (_ < 8 ? _ : "8;5;" + _), m = `  ${g};1m${h} \x1B[0m`;
        p[0] = m + p[0].split(`
`).join(`
` + m), p.push(g + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        p[0] = a() + h + " " + p[0];
    }
    function a() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function s(...p) {
      return process.stderr.write(n.formatWithOptions(t.inspectOpts, ...p) + `
`);
    }
    function c(p) {
      p ? process.env.DEBUG = p : delete process.env.DEBUG;
    }
    function f() {
      return process.env.DEBUG;
    }
    function l(p) {
      p.inspectOpts = {};
      const h = Object.keys(t.inspectOpts);
      for (let v = 0; v < h.length; v++)
        p.inspectOpts[h[v]] = t.inspectOpts[h[v]];
    }
    e.exports = xy()(t);
    const { formatters: u } = e.exports;
    u.o = function(p) {
      return this.inspectOpts.colors = this.useColors, n.inspect(p, this.inspectOpts).split(`
`).map((h) => h.trim()).join(" ");
    }, u.O = function(p) {
      return this.inspectOpts.colors = this.useColors, n.inspect(p, this.inspectOpts);
    };
  }(Ia, Ia.exports)), Ia.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? kl.exports = qw() : kl.exports = Gw();
var Bw = kl.exports, Li = {};
Object.defineProperty(Li, "__esModule", { value: !0 });
Li.newError = zw;
function zw(e, t) {
  const r = new Error(e);
  return r.code = t, r;
}
var oa = {};
Object.defineProperty(oa, "__esModule", { value: !0 });
oa.ProgressCallbackTransform = void 0;
const Kw = na;
class Ww extends Kw.Transform {
  constructor(t, r, n) {
    super(), this.total = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.total * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.total,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, t(null);
  }
}
oa.ProgressCallbackTransform = Ww;
Object.defineProperty($t, "__esModule", { value: !0 });
$t.DigestTransform = $t.HttpExecutor = $t.HttpError = void 0;
$t.createHttpError = Dl;
$t.parseJson = rE;
$t.configureRequestOptionsFromUrl = Vy;
$t.configureRequestUrl = gu;
$t.safeGetHeader = _i;
$t.configureRequestOptions = _s;
$t.safeStringifyJson = ws;
const Yw = ra, Jw = Bw, Xw = mn, Qw = na, qy = ji, Zw = fn, wh = Li, eE = oa, oo = (0, Jw.default)("electron-builder");
function Dl(e, t = null) {
  return new yu(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + ws(e.headers), t);
}
const tE = /* @__PURE__ */ new Map([
  [429, "Too many requests"],
  [400, "Bad request"],
  [403, "Forbidden"],
  [404, "Not found"],
  [405, "Method not allowed"],
  [406, "Not acceptable"],
  [408, "Request timeout"],
  [413, "Request entity too large"],
  [500, "Internal server error"],
  [502, "Bad gateway"],
  [503, "Service unavailable"],
  [504, "Gateway timeout"],
  [505, "HTTP version not supported"]
]);
class yu extends Error {
  constructor(t, r = `HTTP error: ${tE.get(t) || t}`, n = null) {
    super(r), this.statusCode = t, this.description = n, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
$t.HttpError = yu;
function rE(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class vs {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, r = new Zw.CancellationToken(), n) {
    _s(t);
    const i = n == null ? void 0 : JSON.stringify(n), o = i ? Buffer.from(i) : void 0;
    if (o != null) {
      oo(i);
      const { headers: a, ...s } = t;
      t = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": o.length,
          ...a
        },
        ...s
      };
    }
    return this.doApiRequest(t, r, (a) => a.end(o));
  }
  doApiRequest(t, r, n, i = 0) {
    return oo.enabled && oo(`Request: ${ws(t)}`), r.createPromise((o, a, s) => {
      const c = this.createRequest(t, (f) => {
        try {
          this.handleResponse(f, t, r, o, a, i, n);
        } catch (l) {
          a(l);
        }
      });
      this.addErrorAndTimeoutHandlers(c, a, t.timeout), this.addRedirectHandlers(c, t, a, i, (f) => {
        this.doApiRequest(f, r, n, i).then(o).catch(a);
      }), n(c, a), s(() => c.abort());
    });
  }
  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line
  addRedirectHandlers(t, r, n, i, o) {
  }
  addErrorAndTimeoutHandlers(t, r, n = 60 * 1e3) {
    this.addTimeOutHandler(t, r, n), t.on("error", r), t.on("aborted", () => {
      r(new Error("Request has been aborted by the server"));
    });
  }
  handleResponse(t, r, n, i, o, a, s) {
    var c;
    if (oo.enabled && oo(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${ws(r)}`), t.statusCode === 404) {
      o(Dl(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const f = (c = t.statusCode) !== null && c !== void 0 ? c : 0, l = f >= 300 && f < 400, u = _i(t, "location");
    if (l && u != null) {
      if (a > this.maxRedirects) {
        o(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(vs.prepareRedirectUrlOptions(u, r), n, s, a).then(i).catch(o);
      return;
    }
    t.setEncoding("utf8");
    let p = "";
    t.on("error", o), t.on("data", (h) => p += h), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const h = _i(t, "content-type"), v = h != null && (Array.isArray(h) ? h.find((_) => _.includes("json")) != null : h.includes("json"));
          o(Dl(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

          Data:
          ${v ? JSON.stringify(JSON.parse(p)) : p}
          `));
        } else
          i(p.length === 0 ? null : p);
      } catch (h) {
        o(h);
      }
    });
  }
  async downloadToBuffer(t, r) {
    return await r.cancellationToken.createPromise((n, i, o) => {
      const a = [], s = {
        headers: r.headers || void 0,
        // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
        redirect: "manual"
      };
      gu(t, s), _s(s), this.doDownload(s, {
        destination: null,
        options: r,
        onCancel: o,
        callback: (c) => {
          c == null ? n(Buffer.concat(a)) : i(c);
        },
        responseHandler: (c, f) => {
          let l = 0;
          c.on("data", (u) => {
            if (l += u.length, l > 524288e3) {
              f(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            a.push(u);
          }), c.on("end", () => {
            f(null);
          });
        }
      }, 0);
    });
  }
  doDownload(t, r, n) {
    const i = this.createRequest(t, (o) => {
      if (o.statusCode >= 400) {
        r.callback(new Error(`Cannot download "${t.protocol || "https:"}//${t.hostname}${t.path}", status ${o.statusCode}: ${o.statusMessage}`));
        return;
      }
      o.on("error", r.callback);
      const a = _i(o, "location");
      if (a != null) {
        n < this.maxRedirects ? this.doDownload(vs.prepareRedirectUrlOptions(a, t), r, n++) : r.callback(this.createMaxRedirectError());
        return;
      }
      r.responseHandler == null ? iE(r, o) : r.responseHandler(o, r.callback);
    });
    this.addErrorAndTimeoutHandlers(i, r.callback, t.timeout), this.addRedirectHandlers(i, t, r.callback, n, (o) => {
      this.doDownload(o, r, n++);
    }), i.end();
  }
  createMaxRedirectError() {
    return new Error(`Too many redirects (> ${this.maxRedirects})`);
  }
  addTimeOutHandler(t, r, n) {
    t.on("socket", (i) => {
      i.setTimeout(n, () => {
        t.abort(), r(new Error("Request timed out"));
      });
    });
  }
  static prepareRedirectUrlOptions(t, r) {
    const n = Vy(t, { ...r }), i = n.headers;
    if (i != null && i.authorization) {
      const o = new qy.URL(t);
      (o.hostname.endsWith(".amazonaws.com") || o.searchParams.has("X-Amz-Credential")) && delete i.authorization;
    }
    return n;
  }
  static retryOnServerError(t, r = 3) {
    for (let n = 0; ; n++)
      try {
        return t();
      } catch (i) {
        if (n < r && (i instanceof yu && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
$t.HttpExecutor = vs;
function Vy(e, t) {
  const r = _s(t);
  return gu(new qy.URL(e), r), r;
}
function gu(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class Fl extends Qw.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, r = "sha512", n = "base64") {
    super(), this.expected = t, this.algorithm = r, this.encoding = n, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, Yw.createHash)(r);
  }
  // noinspection JSUnusedGlobalSymbols
  _transform(t, r, n) {
    this.digester.update(t), n(null, t);
  }
  // noinspection JSUnusedGlobalSymbols
  _flush(t) {
    if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
      try {
        this.validate();
      } catch (r) {
        t(r);
        return;
      }
    t(null);
  }
  validate() {
    if (this._actual == null)
      throw (0, wh.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, wh.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
$t.DigestTransform = Fl;
function nE(e, t, r) {
  return e != null && t != null && e !== t ? (r(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function _i(e, t) {
  const r = e.headers[t];
  return r == null ? null : Array.isArray(r) ? r.length === 0 ? null : r[r.length - 1] : r;
}
function iE(e, t) {
  if (!nE(_i(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const r = [];
  if (e.options.onProgress != null) {
    const a = _i(t, "content-length");
    a != null && r.push(new eE.ProgressCallbackTransform(parseInt(a, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const n = e.options.sha512;
  n != null ? r.push(new Fl(n, "sha512", n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && r.push(new Fl(e.options.sha2, "sha256", "hex"));
  const i = (0, Xw.createWriteStream)(e.destination);
  r.push(i);
  let o = t;
  for (const a of r)
    a.on("error", (s) => {
      i.close(), e.options.cancellationToken.cancelled || e.callback(s);
    }), o = o.pipe(a);
  i.on("finish", () => {
    i.close(e.callback);
  });
}
function _s(e, t, r) {
  r != null && (e.method = r), e.headers = { ...e.headers };
  const n = e.headers;
  return t != null && (n.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), n["User-Agent"] == null && (n["User-Agent"] = "electron-builder"), (r == null || r === "GET" || n["Cache-Control"] == null) && (n["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function ws(e, t) {
  return JSON.stringify(e, (r, n) => r.endsWith("Authorization") || r.endsWith("authorization") || r.endsWith("Password") || r.endsWith("PASSWORD") || r.endsWith("Token") || r.includes("password") || r.includes("token") || t != null && t.has(r) ? "<stripped sensitive data>" : n, 2);
}
var Ks = {};
Object.defineProperty(Ks, "__esModule", { value: !0 });
Ks.githubUrl = oE;
Ks.getS3LikeProviderBaseUrl = aE;
function oE(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function aE(e) {
  const t = e.provider;
  if (t === "s3")
    return sE(e);
  if (t === "spaces")
    return cE(e);
  throw new Error(`Not supported provider: ${t}`);
}
function sE(e) {
  let t;
  if (e.accelerate == !0)
    t = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
  else if (e.endpoint != null)
    t = `${e.endpoint}/${e.bucket}`;
  else if (e.bucket.includes(".")) {
    if (e.region == null)
      throw new Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
    e.region === "us-east-1" ? t = `https://s3.amazonaws.com/${e.bucket}` : t = `https://s3-${e.region}.amazonaws.com/${e.bucket}`;
  } else e.region === "cn-north-1" ? t = `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn` : t = `https://${e.bucket}.s3.amazonaws.com`;
  return Hy(t, e.path);
}
function Hy(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function cE(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return Hy(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var $u = {};
Object.defineProperty($u, "__esModule", { value: !0 });
$u.parseDn = lE;
function lE(e) {
  let t = !1, r = null, n = "", i = 0;
  e = e.trim();
  const o = /* @__PURE__ */ new Map();
  for (let a = 0; a <= e.length; a++) {
    if (a === e.length) {
      r !== null && o.set(r, n);
      break;
    }
    const s = e[a];
    if (t) {
      if (s === '"') {
        t = !1;
        continue;
      }
    } else {
      if (s === '"') {
        t = !0;
        continue;
      }
      if (s === "\\") {
        a++;
        const c = parseInt(e.slice(a, a + 2), 16);
        Number.isNaN(c) ? n += e[a] : (a++, n += String.fromCharCode(c));
        continue;
      }
      if (r === null && s === "=") {
        r = n, n = "";
        continue;
      }
      if (s === "," || s === ";" || s === "+") {
        r !== null && o.set(r, n), r = null, n = "";
        continue;
      }
    }
    if (s === " " && !t) {
      if (n.length === 0)
        continue;
      if (a > i) {
        let c = a;
        for (; e[c] === " "; )
          c++;
        i = c;
      }
      if (i >= e.length || e[i] === "," || e[i] === ";" || r === null && e[i] === "=" || r !== null && e[i] === "+") {
        a = i - 1;
        continue;
      }
    }
    n += s;
  }
  return o;
}
var Ni = {};
Object.defineProperty(Ni, "__esModule", { value: !0 });
Ni.nil = Ni.UUID = void 0;
const Gy = ra, By = Li, uE = "options.name must be either a string or a Buffer", Eh = (0, Gy.randomBytes)(16);
Eh[0] = Eh[0] | 1;
const is = {}, ye = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  is[t] = e, ye[e] = t;
}
class Hn {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const r = Hn.check(t);
    if (!r)
      throw new Error("not a UUID");
    this.version = r.version, r.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, r) {
    return fE(t, "sha1", 80, r);
  }
  toString() {
    return this.ascii == null && (this.ascii = dE(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, r = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (is[t[14] + t[15]] & 240) >> 4,
        variant: Sh((is[t[19] + t[20]] & 224) >> 5),
        format: "ascii"
      } : !1;
    if (Buffer.isBuffer(t)) {
      if (t.length < r + 16)
        return !1;
      let n = 0;
      for (; n < 16 && t[r + n] === 0; n++)
        ;
      return n === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
        version: (t[r + 6] & 240) >> 4,
        variant: Sh((t[r + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, By.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const r = Buffer.allocUnsafe(16);
    let n = 0;
    for (let i = 0; i < 16; i++)
      r[i] = is[t[n++] + t[n++]], (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
    return r;
  }
}
Ni.UUID = Hn;
Hn.OID = Hn.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function Sh(e) {
  switch (e) {
    case 0:
    case 1:
    case 3:
      return "ncs";
    case 4:
    case 5:
      return "rfc4122";
    case 6:
      return "microsoft";
    default:
      return "future";
  }
}
var Po;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(Po || (Po = {}));
function fE(e, t, r, n, i = Po.ASCII) {
  const o = (0, Gy.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, By.newError)(uE, "ERR_INVALID_UUID_NAME");
  o.update(n), o.update(e);
  const s = o.digest();
  let c;
  switch (i) {
    case Po.BINARY:
      s[6] = s[6] & 15 | r, s[8] = s[8] & 63 | 128, c = s;
      break;
    case Po.OBJECT:
      s[6] = s[6] & 15 | r, s[8] = s[8] & 63 | 128, c = new Hn(s);
      break;
    default:
      c = ye[s[0]] + ye[s[1]] + ye[s[2]] + ye[s[3]] + "-" + ye[s[4]] + ye[s[5]] + "-" + ye[s[6] & 15 | r] + ye[s[7]] + "-" + ye[s[8] & 63 | 128] + ye[s[9]] + "-" + ye[s[10]] + ye[s[11]] + ye[s[12]] + ye[s[13]] + ye[s[14]] + ye[s[15]];
      break;
  }
  return c;
}
function dE(e) {
  return ye[e[0]] + ye[e[1]] + ye[e[2]] + ye[e[3]] + "-" + ye[e[4]] + ye[e[5]] + "-" + ye[e[6]] + ye[e[7]] + "-" + ye[e[8]] + ye[e[9]] + "-" + ye[e[10]] + ye[e[11]] + ye[e[12]] + ye[e[13]] + ye[e[14]] + ye[e[15]];
}
Ni.nil = new Hn("00000000-0000-0000-0000-000000000000");
var aa = {}, zy = {};
(function(e) {
  (function(t) {
    t.parser = function(w, y) {
      return new n(w, y);
    }, t.SAXParser = n, t.SAXStream = l, t.createStream = f, t.MAX_BUFFER_LENGTH = 64 * 1024;
    var r = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    t.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function n(w, y) {
      if (!(this instanceof n))
        return new n(w, y);
      var j = this;
      o(j), j.q = j.c = "", j.bufferCheckPosition = t.MAX_BUFFER_LENGTH, j.opt = y || {}, j.opt.lowercase = j.opt.lowercase || j.opt.lowercasetags, j.looseCase = j.opt.lowercase ? "toLowerCase" : "toUpperCase", j.tags = [], j.closed = j.closedRoot = j.sawRoot = !1, j.tag = j.error = null, j.strict = !!w, j.noscript = !!(w || j.opt.noscript), j.state = P.BEGIN, j.strictEntities = j.opt.strictEntities, j.ENTITIES = j.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), j.attribList = [], j.opt.xmlns && (j.ns = Object.create(_)), j.opt.unquotedAttributeValues === void 0 && (j.opt.unquotedAttributeValues = !w), j.trackPosition = j.opt.position !== !1, j.trackPosition && (j.position = j.line = j.column = 0), q(j, "onready");
    }
    Object.create || (Object.create = function(w) {
      function y() {
      }
      y.prototype = w;
      var j = new y();
      return j;
    }), Object.keys || (Object.keys = function(w) {
      var y = [];
      for (var j in w) w.hasOwnProperty(j) && y.push(j);
      return y;
    });
    function i(w) {
      for (var y = Math.max(t.MAX_BUFFER_LENGTH, 10), j = 0, C = 0, X = r.length; C < X; C++) {
        var pe = w[r[C]].length;
        if (pe > y)
          switch (r[C]) {
            case "textNode":
              Y(w);
              break;
            case "cdata":
              G(w, "oncdata", w.cdata), w.cdata = "";
              break;
            case "script":
              G(w, "onscript", w.script), w.script = "";
              break;
            default:
              U(w, "Max buffer length exceeded: " + r[C]);
          }
        j = Math.max(j, pe);
      }
      var ve = t.MAX_BUFFER_LENGTH - j;
      w.bufferCheckPosition = ve + w.position;
    }
    function o(w) {
      for (var y = 0, j = r.length; y < j; y++)
        w[r[y]] = "";
    }
    function a(w) {
      Y(w), w.cdata !== "" && (G(w, "oncdata", w.cdata), w.cdata = ""), w.script !== "" && (G(w, "onscript", w.script), w.script = "");
    }
    n.prototype = {
      end: function() {
        H(this);
      },
      write: O,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        a(this);
      }
    };
    var s;
    try {
      s = require("stream").Stream;
    } catch {
      s = function() {
      };
    }
    s || (s = function() {
    });
    var c = t.EVENTS.filter(function(w) {
      return w !== "error" && w !== "end";
    });
    function f(w, y) {
      return new l(w, y);
    }
    function l(w, y) {
      if (!(this instanceof l))
        return new l(w, y);
      s.apply(this), this._parser = new n(w, y), this.writable = !0, this.readable = !0;
      var j = this;
      this._parser.onend = function() {
        j.emit("end");
      }, this._parser.onerror = function(C) {
        j.emit("error", C), j._parser.error = null;
      }, this._decoder = null, c.forEach(function(C) {
        Object.defineProperty(j, "on" + C, {
          get: function() {
            return j._parser["on" + C];
          },
          set: function(X) {
            if (!X)
              return j.removeAllListeners(C), j._parser["on" + C] = X, X;
            j.on(C, X);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    l.prototype = Object.create(s.prototype, {
      constructor: {
        value: l
      }
    }), l.prototype.write = function(w) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(w)) {
        if (!this._decoder) {
          var y = Iw.StringDecoder;
          this._decoder = new y("utf8");
        }
        w = this._decoder.write(w);
      }
      return this._parser.write(w.toString()), this.emit("data", w), !0;
    }, l.prototype.end = function(w) {
      return w && w.length && this.write(w), this._parser.end(), !0;
    }, l.prototype.on = function(w, y) {
      var j = this;
      return !j._parser["on" + w] && c.indexOf(w) !== -1 && (j._parser["on" + w] = function() {
        var C = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        C.splice(0, 0, w), j.emit.apply(j, C);
      }), s.prototype.on.call(j, w, y);
    };
    var u = "[CDATA[", p = "DOCTYPE", h = "http://www.w3.org/XML/1998/namespace", v = "http://www.w3.org/2000/xmlns/", _ = { xml: h, xmlns: v }, g = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, m = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, E = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, N = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function R(w) {
      return w === " " || w === `
` || w === "\r" || w === "	";
    }
    function F(w) {
      return w === '"' || w === "'";
    }
    function k(w) {
      return w === ">" || R(w);
    }
    function L(w, y) {
      return w.test(y);
    }
    function V(w, y) {
      return !L(w, y);
    }
    var P = 0;
    t.STATE = {
      BEGIN: P++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: P++,
      // leading whitespace
      TEXT: P++,
      // general stuff
      TEXT_ENTITY: P++,
      // &amp and such.
      OPEN_WAKA: P++,
      // <
      SGML_DECL: P++,
      // <!BLARG
      SGML_DECL_QUOTED: P++,
      // <!BLARG foo "bar
      DOCTYPE: P++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: P++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: P++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: P++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: P++,
      // <!-
      COMMENT: P++,
      // <!--
      COMMENT_ENDING: P++,
      // <!-- blah -
      COMMENT_ENDED: P++,
      // <!-- blah --
      CDATA: P++,
      // <![CDATA[ something
      CDATA_ENDING: P++,
      // ]
      CDATA_ENDING_2: P++,
      // ]]
      PROC_INST: P++,
      // <?hi
      PROC_INST_BODY: P++,
      // <?hi there
      PROC_INST_ENDING: P++,
      // <?hi "there" ?
      OPEN_TAG: P++,
      // <strong
      OPEN_TAG_SLASH: P++,
      // <strong /
      ATTRIB: P++,
      // <a
      ATTRIB_NAME: P++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: P++,
      // <a foo _
      ATTRIB_VALUE: P++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: P++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: P++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: P++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: P++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: P++,
      // <foo bar=&quot
      CLOSE_TAG: P++,
      // </a
      CLOSE_TAG_SAW_WHITE: P++,
      // </a   >
      SCRIPT: P++,
      // <script> ...
      SCRIPT_ENDING: P++
      // <script> ... <
    }, t.XML_ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }, t.ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'",
      AElig: 198,
      Aacute: 193,
      Acirc: 194,
      Agrave: 192,
      Aring: 197,
      Atilde: 195,
      Auml: 196,
      Ccedil: 199,
      ETH: 208,
      Eacute: 201,
      Ecirc: 202,
      Egrave: 200,
      Euml: 203,
      Iacute: 205,
      Icirc: 206,
      Igrave: 204,
      Iuml: 207,
      Ntilde: 209,
      Oacute: 211,
      Ocirc: 212,
      Ograve: 210,
      Oslash: 216,
      Otilde: 213,
      Ouml: 214,
      THORN: 222,
      Uacute: 218,
      Ucirc: 219,
      Ugrave: 217,
      Uuml: 220,
      Yacute: 221,
      aacute: 225,
      acirc: 226,
      aelig: 230,
      agrave: 224,
      aring: 229,
      atilde: 227,
      auml: 228,
      ccedil: 231,
      eacute: 233,
      ecirc: 234,
      egrave: 232,
      eth: 240,
      euml: 235,
      iacute: 237,
      icirc: 238,
      igrave: 236,
      iuml: 239,
      ntilde: 241,
      oacute: 243,
      ocirc: 244,
      ograve: 242,
      oslash: 248,
      otilde: 245,
      ouml: 246,
      szlig: 223,
      thorn: 254,
      uacute: 250,
      ucirc: 251,
      ugrave: 249,
      uuml: 252,
      yacute: 253,
      yuml: 255,
      copy: 169,
      reg: 174,
      nbsp: 160,
      iexcl: 161,
      cent: 162,
      pound: 163,
      curren: 164,
      yen: 165,
      brvbar: 166,
      sect: 167,
      uml: 168,
      ordf: 170,
      laquo: 171,
      not: 172,
      shy: 173,
      macr: 175,
      deg: 176,
      plusmn: 177,
      sup1: 185,
      sup2: 178,
      sup3: 179,
      acute: 180,
      micro: 181,
      para: 182,
      middot: 183,
      cedil: 184,
      ordm: 186,
      raquo: 187,
      frac14: 188,
      frac12: 189,
      frac34: 190,
      iquest: 191,
      times: 215,
      divide: 247,
      OElig: 338,
      oelig: 339,
      Scaron: 352,
      scaron: 353,
      Yuml: 376,
      fnof: 402,
      circ: 710,
      tilde: 732,
      Alpha: 913,
      Beta: 914,
      Gamma: 915,
      Delta: 916,
      Epsilon: 917,
      Zeta: 918,
      Eta: 919,
      Theta: 920,
      Iota: 921,
      Kappa: 922,
      Lambda: 923,
      Mu: 924,
      Nu: 925,
      Xi: 926,
      Omicron: 927,
      Pi: 928,
      Rho: 929,
      Sigma: 931,
      Tau: 932,
      Upsilon: 933,
      Phi: 934,
      Chi: 935,
      Psi: 936,
      Omega: 937,
      alpha: 945,
      beta: 946,
      gamma: 947,
      delta: 948,
      epsilon: 949,
      zeta: 950,
      eta: 951,
      theta: 952,
      iota: 953,
      kappa: 954,
      lambda: 955,
      mu: 956,
      nu: 957,
      xi: 958,
      omicron: 959,
      pi: 960,
      rho: 961,
      sigmaf: 962,
      sigma: 963,
      tau: 964,
      upsilon: 965,
      phi: 966,
      chi: 967,
      psi: 968,
      omega: 969,
      thetasym: 977,
      upsih: 978,
      piv: 982,
      ensp: 8194,
      emsp: 8195,
      thinsp: 8201,
      zwnj: 8204,
      zwj: 8205,
      lrm: 8206,
      rlm: 8207,
      ndash: 8211,
      mdash: 8212,
      lsquo: 8216,
      rsquo: 8217,
      sbquo: 8218,
      ldquo: 8220,
      rdquo: 8221,
      bdquo: 8222,
      dagger: 8224,
      Dagger: 8225,
      bull: 8226,
      hellip: 8230,
      permil: 8240,
      prime: 8242,
      Prime: 8243,
      lsaquo: 8249,
      rsaquo: 8250,
      oline: 8254,
      frasl: 8260,
      euro: 8364,
      image: 8465,
      weierp: 8472,
      real: 8476,
      trade: 8482,
      alefsym: 8501,
      larr: 8592,
      uarr: 8593,
      rarr: 8594,
      darr: 8595,
      harr: 8596,
      crarr: 8629,
      lArr: 8656,
      uArr: 8657,
      rArr: 8658,
      dArr: 8659,
      hArr: 8660,
      forall: 8704,
      part: 8706,
      exist: 8707,
      empty: 8709,
      nabla: 8711,
      isin: 8712,
      notin: 8713,
      ni: 8715,
      prod: 8719,
      sum: 8721,
      minus: 8722,
      lowast: 8727,
      radic: 8730,
      prop: 8733,
      infin: 8734,
      ang: 8736,
      and: 8743,
      or: 8744,
      cap: 8745,
      cup: 8746,
      int: 8747,
      there4: 8756,
      sim: 8764,
      cong: 8773,
      asymp: 8776,
      ne: 8800,
      equiv: 8801,
      le: 8804,
      ge: 8805,
      sub: 8834,
      sup: 8835,
      nsub: 8836,
      sube: 8838,
      supe: 8839,
      oplus: 8853,
      otimes: 8855,
      perp: 8869,
      sdot: 8901,
      lceil: 8968,
      rceil: 8969,
      lfloor: 8970,
      rfloor: 8971,
      lang: 9001,
      rang: 9002,
      loz: 9674,
      spades: 9824,
      clubs: 9827,
      hearts: 9829,
      diams: 9830
    }, Object.keys(t.ENTITIES).forEach(function(w) {
      var y = t.ENTITIES[w], j = typeof y == "number" ? String.fromCharCode(y) : y;
      t.ENTITIES[w] = j;
    });
    for (var K in t.STATE)
      t.STATE[t.STATE[K]] = K;
    P = t.STATE;
    function q(w, y, j) {
      w[y] && w[y](j);
    }
    function G(w, y, j) {
      w.textNode && Y(w), q(w, y, j);
    }
    function Y(w) {
      w.textNode = M(w.opt, w.textNode), w.textNode && q(w, "ontext", w.textNode), w.textNode = "";
    }
    function M(w, y) {
      return w.trim && (y = y.trim()), w.normalize && (y = y.replace(/\s+/g, " ")), y;
    }
    function U(w, y) {
      return Y(w), w.trackPosition && (y += `
Line: ` + w.line + `
Column: ` + w.column + `
Char: ` + w.c), y = new Error(y), w.error = y, q(w, "onerror", y), w;
    }
    function H(w) {
      return w.sawRoot && !w.closedRoot && x(w, "Unclosed root tag"), w.state !== P.BEGIN && w.state !== P.BEGIN_WHITESPACE && w.state !== P.TEXT && U(w, "Unexpected end"), Y(w), w.c = "", w.closed = !0, q(w, "onend"), n.call(w, w.strict, w.opt), w;
    }
    function x(w, y) {
      if (typeof w != "object" || !(w instanceof n))
        throw new Error("bad call to strictFail");
      w.strict && U(w, y);
    }
    function W(w) {
      w.strict || (w.tagName = w.tagName[w.looseCase]());
      var y = w.tags[w.tags.length - 1] || w, j = w.tag = { name: w.tagName, attributes: {} };
      w.opt.xmlns && (j.ns = y.ns), w.attribList.length = 0, G(w, "onopentagstart", j);
    }
    function z(w, y) {
      var j = w.indexOf(":"), C = j < 0 ? ["", w] : w.split(":"), X = C[0], pe = C[1];
      return y && w === "xmlns" && (X = "xmlns", pe = ""), { prefix: X, local: pe };
    }
    function I(w) {
      if (w.strict || (w.attribName = w.attribName[w.looseCase]()), w.attribList.indexOf(w.attribName) !== -1 || w.tag.attributes.hasOwnProperty(w.attribName)) {
        w.attribName = w.attribValue = "";
        return;
      }
      if (w.opt.xmlns) {
        var y = z(w.attribName, !0), j = y.prefix, C = y.local;
        if (j === "xmlns")
          if (C === "xml" && w.attribValue !== h)
            x(
              w,
              "xml: prefix must be bound to " + h + `
Actual: ` + w.attribValue
            );
          else if (C === "xmlns" && w.attribValue !== v)
            x(
              w,
              "xmlns: prefix must be bound to " + v + `
Actual: ` + w.attribValue
            );
          else {
            var X = w.tag, pe = w.tags[w.tags.length - 1] || w;
            X.ns === pe.ns && (X.ns = Object.create(pe.ns)), X.ns[C] = w.attribValue;
          }
        w.attribList.push([w.attribName, w.attribValue]);
      } else
        w.tag.attributes[w.attribName] = w.attribValue, G(w, "onattribute", {
          name: w.attribName,
          value: w.attribValue
        });
      w.attribName = w.attribValue = "";
    }
    function S(w, y) {
      if (w.opt.xmlns) {
        var j = w.tag, C = z(w.tagName);
        j.prefix = C.prefix, j.local = C.local, j.uri = j.ns[C.prefix] || "", j.prefix && !j.uri && (x(w, "Unbound namespace prefix: " + JSON.stringify(w.tagName)), j.uri = C.prefix);
        var X = w.tags[w.tags.length - 1] || w;
        j.ns && X.ns !== j.ns && Object.keys(j.ns).forEach(function(Lt) {
          G(w, "onopennamespace", {
            prefix: Lt,
            uri: j.ns[Lt]
          });
        });
        for (var pe = 0, ve = w.attribList.length; pe < ve; pe++) {
          var be = w.attribList[pe], Oe = be[0], it = be[1], _e = z(Oe, !0), Me = _e.prefix, Gt = _e.local, jt = Me === "" ? "" : j.ns[Me] || "", Ct = {
            name: Oe,
            value: it,
            prefix: Me,
            local: Gt,
            uri: jt
          };
          Me && Me !== "xmlns" && !jt && (x(w, "Unbound namespace prefix: " + JSON.stringify(Me)), Ct.uri = Me), w.tag.attributes[Oe] = Ct, G(w, "onattribute", Ct);
        }
        w.attribList.length = 0;
      }
      w.tag.isSelfClosing = !!y, w.sawRoot = !0, w.tags.push(w.tag), G(w, "onopentag", w.tag), y || (!w.noscript && w.tagName.toLowerCase() === "script" ? w.state = P.SCRIPT : w.state = P.TEXT, w.tag = null, w.tagName = ""), w.attribName = w.attribValue = "", w.attribList.length = 0;
    }
    function A(w) {
      if (!w.tagName) {
        x(w, "Weird empty close tag."), w.textNode += "</>", w.state = P.TEXT;
        return;
      }
      if (w.script) {
        if (w.tagName !== "script") {
          w.script += "</" + w.tagName + ">", w.tagName = "", w.state = P.SCRIPT;
          return;
        }
        G(w, "onscript", w.script), w.script = "";
      }
      var y = w.tags.length, j = w.tagName;
      w.strict || (j = j[w.looseCase]());
      for (var C = j; y--; ) {
        var X = w.tags[y];
        if (X.name !== C)
          x(w, "Unexpected close tag");
        else
          break;
      }
      if (y < 0) {
        x(w, "Unmatched closing tag: " + w.tagName), w.textNode += "</" + w.tagName + ">", w.state = P.TEXT;
        return;
      }
      w.tagName = j;
      for (var pe = w.tags.length; pe-- > y; ) {
        var ve = w.tag = w.tags.pop();
        w.tagName = w.tag.name, G(w, "onclosetag", w.tagName);
        var be = {};
        for (var Oe in ve.ns)
          be[Oe] = ve.ns[Oe];
        var it = w.tags[w.tags.length - 1] || w;
        w.opt.xmlns && ve.ns !== it.ns && Object.keys(ve.ns).forEach(function(_e) {
          var Me = ve.ns[_e];
          G(w, "onclosenamespace", { prefix: _e, uri: Me });
        });
      }
      y === 0 && (w.closedRoot = !0), w.tagName = w.attribValue = w.attribName = "", w.attribList.length = 0, w.state = P.TEXT;
    }
    function b(w) {
      var y = w.entity, j = y.toLowerCase(), C, X = "";
      return w.ENTITIES[y] ? w.ENTITIES[y] : w.ENTITIES[j] ? w.ENTITIES[j] : (y = j, y.charAt(0) === "#" && (y.charAt(1) === "x" ? (y = y.slice(2), C = parseInt(y, 16), X = C.toString(16)) : (y = y.slice(1), C = parseInt(y, 10), X = C.toString(10))), y = y.replace(/^0+/, ""), isNaN(C) || X.toLowerCase() !== y ? (x(w, "Invalid character entity"), "&" + w.entity + ";") : String.fromCodePoint(C));
    }
    function d(w, y) {
      y === "<" ? (w.state = P.OPEN_WAKA, w.startTagPosition = w.position) : R(y) || (x(w, "Non-whitespace before first tag."), w.textNode = y, w.state = P.TEXT);
    }
    function $(w, y) {
      var j = "";
      return y < w.length && (j = w.charAt(y)), j;
    }
    function O(w) {
      var y = this;
      if (this.error)
        throw this.error;
      if (y.closed)
        return U(
          y,
          "Cannot write after close. Assign an onready handler."
        );
      if (w === null)
        return H(y);
      typeof w == "object" && (w = w.toString());
      for (var j = 0, C = ""; C = $(w, j++), y.c = C, !!C; )
        switch (y.trackPosition && (y.position++, C === `
` ? (y.line++, y.column = 0) : y.column++), y.state) {
          case P.BEGIN:
            if (y.state = P.BEGIN_WHITESPACE, C === "\uFEFF")
              continue;
            d(y, C);
            continue;
          case P.BEGIN_WHITESPACE:
            d(y, C);
            continue;
          case P.TEXT:
            if (y.sawRoot && !y.closedRoot) {
              for (var X = j - 1; C && C !== "<" && C !== "&"; )
                C = $(w, j++), C && y.trackPosition && (y.position++, C === `
` ? (y.line++, y.column = 0) : y.column++);
              y.textNode += w.substring(X, j - 1);
            }
            C === "<" && !(y.sawRoot && y.closedRoot && !y.strict) ? (y.state = P.OPEN_WAKA, y.startTagPosition = y.position) : (!R(C) && (!y.sawRoot || y.closedRoot) && x(y, "Text data outside of root node."), C === "&" ? y.state = P.TEXT_ENTITY : y.textNode += C);
            continue;
          case P.SCRIPT:
            C === "<" ? y.state = P.SCRIPT_ENDING : y.script += C;
            continue;
          case P.SCRIPT_ENDING:
            C === "/" ? y.state = P.CLOSE_TAG : (y.script += "<" + C, y.state = P.SCRIPT);
            continue;
          case P.OPEN_WAKA:
            if (C === "!")
              y.state = P.SGML_DECL, y.sgmlDecl = "";
            else if (!R(C)) if (L(g, C))
              y.state = P.OPEN_TAG, y.tagName = C;
            else if (C === "/")
              y.state = P.CLOSE_TAG, y.tagName = "";
            else if (C === "?")
              y.state = P.PROC_INST, y.procInstName = y.procInstBody = "";
            else {
              if (x(y, "Unencoded <"), y.startTagPosition + 1 < y.position) {
                var pe = y.position - y.startTagPosition;
                C = new Array(pe).join(" ") + C;
              }
              y.textNode += "<" + C, y.state = P.TEXT;
            }
            continue;
          case P.SGML_DECL:
            if (y.sgmlDecl + C === "--") {
              y.state = P.COMMENT, y.comment = "", y.sgmlDecl = "";
              continue;
            }
            y.doctype && y.doctype !== !0 && y.sgmlDecl ? (y.state = P.DOCTYPE_DTD, y.doctype += "<!" + y.sgmlDecl + C, y.sgmlDecl = "") : (y.sgmlDecl + C).toUpperCase() === u ? (G(y, "onopencdata"), y.state = P.CDATA, y.sgmlDecl = "", y.cdata = "") : (y.sgmlDecl + C).toUpperCase() === p ? (y.state = P.DOCTYPE, (y.doctype || y.sawRoot) && x(
              y,
              "Inappropriately located doctype declaration"
            ), y.doctype = "", y.sgmlDecl = "") : C === ">" ? (G(y, "onsgmldeclaration", y.sgmlDecl), y.sgmlDecl = "", y.state = P.TEXT) : (F(C) && (y.state = P.SGML_DECL_QUOTED), y.sgmlDecl += C);
            continue;
          case P.SGML_DECL_QUOTED:
            C === y.q && (y.state = P.SGML_DECL, y.q = ""), y.sgmlDecl += C;
            continue;
          case P.DOCTYPE:
            C === ">" ? (y.state = P.TEXT, G(y, "ondoctype", y.doctype), y.doctype = !0) : (y.doctype += C, C === "[" ? y.state = P.DOCTYPE_DTD : F(C) && (y.state = P.DOCTYPE_QUOTED, y.q = C));
            continue;
          case P.DOCTYPE_QUOTED:
            y.doctype += C, C === y.q && (y.q = "", y.state = P.DOCTYPE);
            continue;
          case P.DOCTYPE_DTD:
            C === "]" ? (y.doctype += C, y.state = P.DOCTYPE) : C === "<" ? (y.state = P.OPEN_WAKA, y.startTagPosition = y.position) : F(C) ? (y.doctype += C, y.state = P.DOCTYPE_DTD_QUOTED, y.q = C) : y.doctype += C;
            continue;
          case P.DOCTYPE_DTD_QUOTED:
            y.doctype += C, C === y.q && (y.state = P.DOCTYPE_DTD, y.q = "");
            continue;
          case P.COMMENT:
            C === "-" ? y.state = P.COMMENT_ENDING : y.comment += C;
            continue;
          case P.COMMENT_ENDING:
            C === "-" ? (y.state = P.COMMENT_ENDED, y.comment = M(y.opt, y.comment), y.comment && G(y, "oncomment", y.comment), y.comment = "") : (y.comment += "-" + C, y.state = P.COMMENT);
            continue;
          case P.COMMENT_ENDED:
            C !== ">" ? (x(y, "Malformed comment"), y.comment += "--" + C, y.state = P.COMMENT) : y.doctype && y.doctype !== !0 ? y.state = P.DOCTYPE_DTD : y.state = P.TEXT;
            continue;
          case P.CDATA:
            C === "]" ? y.state = P.CDATA_ENDING : y.cdata += C;
            continue;
          case P.CDATA_ENDING:
            C === "]" ? y.state = P.CDATA_ENDING_2 : (y.cdata += "]" + C, y.state = P.CDATA);
            continue;
          case P.CDATA_ENDING_2:
            C === ">" ? (y.cdata && G(y, "oncdata", y.cdata), G(y, "onclosecdata"), y.cdata = "", y.state = P.TEXT) : C === "]" ? y.cdata += "]" : (y.cdata += "]]" + C, y.state = P.CDATA);
            continue;
          case P.PROC_INST:
            C === "?" ? y.state = P.PROC_INST_ENDING : R(C) ? y.state = P.PROC_INST_BODY : y.procInstName += C;
            continue;
          case P.PROC_INST_BODY:
            if (!y.procInstBody && R(C))
              continue;
            C === "?" ? y.state = P.PROC_INST_ENDING : y.procInstBody += C;
            continue;
          case P.PROC_INST_ENDING:
            C === ">" ? (G(y, "onprocessinginstruction", {
              name: y.procInstName,
              body: y.procInstBody
            }), y.procInstName = y.procInstBody = "", y.state = P.TEXT) : (y.procInstBody += "?" + C, y.state = P.PROC_INST_BODY);
            continue;
          case P.OPEN_TAG:
            L(m, C) ? y.tagName += C : (W(y), C === ">" ? S(y) : C === "/" ? y.state = P.OPEN_TAG_SLASH : (R(C) || x(y, "Invalid character in tag name"), y.state = P.ATTRIB));
            continue;
          case P.OPEN_TAG_SLASH:
            C === ">" ? (S(y, !0), A(y)) : (x(y, "Forward-slash in opening tag not followed by >"), y.state = P.ATTRIB);
            continue;
          case P.ATTRIB:
            if (R(C))
              continue;
            C === ">" ? S(y) : C === "/" ? y.state = P.OPEN_TAG_SLASH : L(g, C) ? (y.attribName = C, y.attribValue = "", y.state = P.ATTRIB_NAME) : x(y, "Invalid attribute name");
            continue;
          case P.ATTRIB_NAME:
            C === "=" ? y.state = P.ATTRIB_VALUE : C === ">" ? (x(y, "Attribute without value"), y.attribValue = y.attribName, I(y), S(y)) : R(C) ? y.state = P.ATTRIB_NAME_SAW_WHITE : L(m, C) ? y.attribName += C : x(y, "Invalid attribute name");
            continue;
          case P.ATTRIB_NAME_SAW_WHITE:
            if (C === "=")
              y.state = P.ATTRIB_VALUE;
            else {
              if (R(C))
                continue;
              x(y, "Attribute without value"), y.tag.attributes[y.attribName] = "", y.attribValue = "", G(y, "onattribute", {
                name: y.attribName,
                value: ""
              }), y.attribName = "", C === ">" ? S(y) : L(g, C) ? (y.attribName = C, y.state = P.ATTRIB_NAME) : (x(y, "Invalid attribute name"), y.state = P.ATTRIB);
            }
            continue;
          case P.ATTRIB_VALUE:
            if (R(C))
              continue;
            F(C) ? (y.q = C, y.state = P.ATTRIB_VALUE_QUOTED) : (y.opt.unquotedAttributeValues || U(y, "Unquoted attribute value"), y.state = P.ATTRIB_VALUE_UNQUOTED, y.attribValue = C);
            continue;
          case P.ATTRIB_VALUE_QUOTED:
            if (C !== y.q) {
              C === "&" ? y.state = P.ATTRIB_VALUE_ENTITY_Q : y.attribValue += C;
              continue;
            }
            I(y), y.q = "", y.state = P.ATTRIB_VALUE_CLOSED;
            continue;
          case P.ATTRIB_VALUE_CLOSED:
            R(C) ? y.state = P.ATTRIB : C === ">" ? S(y) : C === "/" ? y.state = P.OPEN_TAG_SLASH : L(g, C) ? (x(y, "No whitespace between attributes"), y.attribName = C, y.attribValue = "", y.state = P.ATTRIB_NAME) : x(y, "Invalid attribute name");
            continue;
          case P.ATTRIB_VALUE_UNQUOTED:
            if (!k(C)) {
              C === "&" ? y.state = P.ATTRIB_VALUE_ENTITY_U : y.attribValue += C;
              continue;
            }
            I(y), C === ">" ? S(y) : y.state = P.ATTRIB;
            continue;
          case P.CLOSE_TAG:
            if (y.tagName)
              C === ">" ? A(y) : L(m, C) ? y.tagName += C : y.script ? (y.script += "</" + y.tagName, y.tagName = "", y.state = P.SCRIPT) : (R(C) || x(y, "Invalid tagname in closing tag"), y.state = P.CLOSE_TAG_SAW_WHITE);
            else {
              if (R(C))
                continue;
              V(g, C) ? y.script ? (y.script += "</" + C, y.state = P.SCRIPT) : x(y, "Invalid tagname in closing tag.") : y.tagName = C;
            }
            continue;
          case P.CLOSE_TAG_SAW_WHITE:
            if (R(C))
              continue;
            C === ">" ? A(y) : x(y, "Invalid characters in closing tag");
            continue;
          case P.TEXT_ENTITY:
          case P.ATTRIB_VALUE_ENTITY_Q:
          case P.ATTRIB_VALUE_ENTITY_U:
            var ve, be;
            switch (y.state) {
              case P.TEXT_ENTITY:
                ve = P.TEXT, be = "textNode";
                break;
              case P.ATTRIB_VALUE_ENTITY_Q:
                ve = P.ATTRIB_VALUE_QUOTED, be = "attribValue";
                break;
              case P.ATTRIB_VALUE_ENTITY_U:
                ve = P.ATTRIB_VALUE_UNQUOTED, be = "attribValue";
                break;
            }
            if (C === ";") {
              var Oe = b(y);
              y.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(Oe) ? (y.entity = "", y.state = ve, y.write(Oe)) : (y[be] += Oe, y.entity = "", y.state = ve);
            } else L(y.entity.length ? N : E, C) ? y.entity += C : (x(y, "Invalid character in entity name"), y[be] += "&" + y.entity + C, y.entity = "", y.state = ve);
            continue;
          default:
            throw new Error(y, "Unknown state: " + y.state);
        }
      return y.position >= y.bufferCheckPosition && i(y), y;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var w = String.fromCharCode, y = Math.floor, j = function() {
        var C = 16384, X = [], pe, ve, be = -1, Oe = arguments.length;
        if (!Oe)
          return "";
        for (var it = ""; ++be < Oe; ) {
          var _e = Number(arguments[be]);
          if (!isFinite(_e) || // `NaN`, `+Infinity`, or `-Infinity`
          _e < 0 || // not a valid Unicode code point
          _e > 1114111 || // not a valid Unicode code point
          y(_e) !== _e)
            throw RangeError("Invalid code point: " + _e);
          _e <= 65535 ? X.push(_e) : (_e -= 65536, pe = (_e >> 10) + 55296, ve = _e % 1024 + 56320, X.push(pe, ve)), (be + 1 === Oe || X.length > C) && (it += w.apply(null, X), X.length = 0);
        }
        return it;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: j,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = j;
    }();
  })(e);
})(zy);
Object.defineProperty(aa, "__esModule", { value: !0 });
aa.XElement = void 0;
aa.parseXml = yE;
const hE = zy, ka = Li;
class Ky {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, ka.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!mE(t))
      throw (0, ka.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const r = this.attributes === null ? null : this.attributes[t];
    if (r == null)
      throw (0, ka.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return r;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, r = !1, n = null) {
    const i = this.elementOrNull(t, r);
    if (i === null)
      throw (0, ka.newError)(n || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, r = !1) {
    if (this.elements === null)
      return null;
    for (const n of this.elements)
      if (bh(n, t, r))
        return n;
    return null;
  }
  getElements(t, r = !1) {
    return this.elements === null ? [] : this.elements.filter((n) => bh(n, t, r));
  }
  elementValueOrEmpty(t, r = !1) {
    const n = this.elementOrNull(t, r);
    return n === null ? "" : n.value;
  }
}
aa.XElement = Ky;
const pE = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function mE(e) {
  return pE.test(e);
}
function bh(e, t, r) {
  const n = e.name;
  return n === t || r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase();
}
function yE(e) {
  let t = null;
  const r = hE.parser(!0, {}), n = [];
  return r.onopentag = (i) => {
    const o = new Ky(i.name);
    if (o.attributes = i.attributes, t === null)
      t = o;
    else {
      const a = n[n.length - 1];
      a.elements == null && (a.elements = []), a.elements.push(o);
    }
    n.push(o);
  }, r.onclosetag = () => {
    n.pop();
  }, r.ontext = (i) => {
    n.length > 0 && (n[n.length - 1].value = i);
  }, r.oncdata = (i) => {
    const o = n[n.length - 1];
    o.value = i, o.isCData = !0;
  }, r.onerror = (i) => {
    throw i;
  }, r.write(e), t;
}
var Ws = {};
Object.defineProperty(Ws, "__esModule", { value: !0 });
Ws.MemoLazy = void 0;
class gE {
  constructor(t, r) {
    this.selector = t, this.creator = r, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && Wy(this.selected, t))
      return this._value;
    this.selected = t;
    const r = this.creator(t);
    return this.value = r, r;
  }
  set value(t) {
    this._value = t;
  }
}
Ws.MemoLazy = gE;
function Wy(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), o = Object.keys(t);
    return i.length === o.length && i.every((a) => Wy(e[a], t[a]));
  }
  return e === t;
}
var vu = {};
Object.defineProperty(vu, "__esModule", { value: !0 });
vu.retry = Yy;
const $E = fn;
async function Yy(e, t, r, n = 0, i = 0, o) {
  var a;
  const s = new $E.CancellationToken();
  try {
    return await e();
  } catch (c) {
    if ((!((a = o == null ? void 0 : o(c)) !== null && a !== void 0) || a) && t > 0 && !s.cancelled)
      return await new Promise((f) => setTimeout(f, r + n * i)), await Yy(e, t - 1, r, n, i + 1, o);
    throw c;
  }
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.retry = e.MemoLazy = e.newError = e.XElement = e.parseXml = e.ProgressCallbackTransform = e.UUID = e.parseDn = e.githubUrl = e.getS3LikeProviderBaseUrl = e.configureRequestUrl = e.parseJson = e.safeStringifyJson = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.safeGetHeader = e.DigestTransform = e.HttpExecutor = e.createHttpError = e.HttpError = e.CancellationError = e.CancellationToken = void 0, e.asArray = u;
  var t = fn;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } });
  var r = $t;
  Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
    return r.HttpError;
  } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
    return r.createHttpError;
  } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
    return r.HttpExecutor;
  } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
    return r.DigestTransform;
  } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
    return r.safeGetHeader;
  } }), Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
    return r.configureRequestOptions;
  } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
    return r.configureRequestOptionsFromUrl;
  } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
    return r.safeStringifyJson;
  } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
    return r.parseJson;
  } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
    return r.configureRequestUrl;
  } });
  var n = Ks;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return n.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return n.githubUrl;
  } });
  var i = $u;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return i.parseDn;
  } });
  var o = Ni;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return o.UUID;
  } });
  var a = oa;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return a.ProgressCallbackTransform;
  } });
  var s = aa;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return s.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return s.XElement;
  } });
  var c = Li;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return c.newError;
  } });
  var f = Ws;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return f.MemoLazy;
  } });
  var l = vu;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return l.retry;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function u(p) {
    return p == null ? [] : Array.isArray(p) ? p : [p];
  }
})(Ke);
var Wn = {}, $e = {};
$e.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((r, n) => {
        t.push((i, o) => i != null ? n(i) : r(o)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
$e.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const r = t[t.length - 1];
    if (typeof r != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((n) => r(null, n), r);
  }, "name", { value: e.name });
};
var Vr = kw, vE = process.cwd, os = null, _E = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return os || (os = vE.call(process)), os;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var Ph = process.chdir;
  process.chdir = function(e) {
    os = null, Ph.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Ph);
}
var wE = EE;
function EE(e) {
  Vr.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || r(e), e.chown = o(e.chown), e.fchown = o(e.fchown), e.lchown = o(e.lchown), e.chmod = n(e.chmod), e.fchmod = n(e.fchmod), e.lchmod = n(e.lchmod), e.chownSync = a(e.chownSync), e.fchownSync = a(e.fchownSync), e.lchownSync = a(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = s(e.stat), e.fstat = s(e.fstat), e.lstat = s(e.lstat), e.statSync = c(e.statSync), e.fstatSync = c(e.fstatSync), e.lstatSync = c(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(l, u, p) {
    p && process.nextTick(p);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(l, u, p, h) {
    h && process.nextTick(h);
  }, e.lchownSync = function() {
  }), _E === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(l) {
    function u(p, h, v) {
      var _ = Date.now(), g = 0;
      l(p, h, function m(E) {
        if (E && (E.code === "EACCES" || E.code === "EPERM" || E.code === "EBUSY") && Date.now() - _ < 6e4) {
          setTimeout(function() {
            e.stat(h, function(N, R) {
              N && N.code === "ENOENT" ? l(p, h, m) : v(E);
            });
          }, g), g < 100 && (g += 10);
          return;
        }
        v && v(E);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, l), u;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(l) {
    function u(p, h, v, _, g, m) {
      var E;
      if (m && typeof m == "function") {
        var N = 0;
        E = function(R, F, k) {
          if (R && R.code === "EAGAIN" && N < 10)
            return N++, l.call(e, p, h, v, _, g, E);
          m.apply(this, arguments);
        };
      }
      return l.call(e, p, h, v, _, g, E);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, l), u;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(l) {
    return function(u, p, h, v, _) {
      for (var g = 0; ; )
        try {
          return l.call(e, u, p, h, v, _);
        } catch (m) {
          if (m.code === "EAGAIN" && g < 10) {
            g++;
            continue;
          }
          throw m;
        }
    };
  }(e.readSync);
  function t(l) {
    l.lchmod = function(u, p, h) {
      l.open(
        u,
        Vr.O_WRONLY | Vr.O_SYMLINK,
        p,
        function(v, _) {
          if (v) {
            h && h(v);
            return;
          }
          l.fchmod(_, p, function(g) {
            l.close(_, function(m) {
              h && h(g || m);
            });
          });
        }
      );
    }, l.lchmodSync = function(u, p) {
      var h = l.openSync(u, Vr.O_WRONLY | Vr.O_SYMLINK, p), v = !0, _;
      try {
        _ = l.fchmodSync(h, p), v = !1;
      } finally {
        if (v)
          try {
            l.closeSync(h);
          } catch {
          }
        else
          l.closeSync(h);
      }
      return _;
    };
  }
  function r(l) {
    Vr.hasOwnProperty("O_SYMLINK") && l.futimes ? (l.lutimes = function(u, p, h, v) {
      l.open(u, Vr.O_SYMLINK, function(_, g) {
        if (_) {
          v && v(_);
          return;
        }
        l.futimes(g, p, h, function(m) {
          l.close(g, function(E) {
            v && v(m || E);
          });
        });
      });
    }, l.lutimesSync = function(u, p, h) {
      var v = l.openSync(u, Vr.O_SYMLINK), _, g = !0;
      try {
        _ = l.futimesSync(v, p, h), g = !1;
      } finally {
        if (g)
          try {
            l.closeSync(v);
          } catch {
          }
        else
          l.closeSync(v);
      }
      return _;
    }) : l.futimes && (l.lutimes = function(u, p, h, v) {
      v && process.nextTick(v);
    }, l.lutimesSync = function() {
    });
  }
  function n(l) {
    return l && function(u, p, h) {
      return l.call(e, u, p, function(v) {
        f(v) && (v = null), h && h.apply(this, arguments);
      });
    };
  }
  function i(l) {
    return l && function(u, p) {
      try {
        return l.call(e, u, p);
      } catch (h) {
        if (!f(h)) throw h;
      }
    };
  }
  function o(l) {
    return l && function(u, p, h, v) {
      return l.call(e, u, p, h, function(_) {
        f(_) && (_ = null), v && v.apply(this, arguments);
      });
    };
  }
  function a(l) {
    return l && function(u, p, h) {
      try {
        return l.call(e, u, p, h);
      } catch (v) {
        if (!f(v)) throw v;
      }
    };
  }
  function s(l) {
    return l && function(u, p, h) {
      typeof p == "function" && (h = p, p = null);
      function v(_, g) {
        g && (g.uid < 0 && (g.uid += 4294967296), g.gid < 0 && (g.gid += 4294967296)), h && h.apply(this, arguments);
      }
      return p ? l.call(e, u, p, v) : l.call(e, u, v);
    };
  }
  function c(l) {
    return l && function(u, p) {
      var h = p ? l.call(e, u, p) : l.call(e, u);
      return h && (h.uid < 0 && (h.uid += 4294967296), h.gid < 0 && (h.gid += 4294967296)), h;
    };
  }
  function f(l) {
    if (!l || l.code === "ENOSYS")
      return !0;
    var u = !process.getuid || process.getuid() !== 0;
    return !!(u && (l.code === "EINVAL" || l.code === "EPERM"));
  }
}
var Th = na.Stream, SE = bE;
function bE(e) {
  return {
    ReadStream: t,
    WriteStream: r
  };
  function t(n, i) {
    if (!(this instanceof t)) return new t(n, i);
    Th.call(this);
    var o = this;
    this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var a = Object.keys(i), s = 0, c = a.length; s < c; s++) {
      var f = a[s];
      this[f] = i[f];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        o._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(l, u) {
      if (l) {
        o.emit("error", l), o.readable = !1;
        return;
      }
      o.fd = u, o.emit("open", u), o._read();
    });
  }
  function r(n, i) {
    if (!(this instanceof r)) return new r(n, i);
    Th.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var o = Object.keys(i), a = 0, s = o.length; a < s; a++) {
      var c = o[a];
      this[c] = i[c];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var PE = NE, TE = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function NE(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: TE(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(r) {
    Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
  }), t;
}
var Ie = mn, OE = wE, AE = SE, CE = PE, Da = Hs, rt, Es;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (rt = Symbol.for("graceful-fs.queue"), Es = Symbol.for("graceful-fs.previous")) : (rt = "___graceful-fs.queue", Es = "___graceful-fs.previous");
function RE() {
}
function Jy(e, t) {
  Object.defineProperty(e, rt, {
    get: function() {
      return t;
    }
  });
}
var qn = RE;
Da.debuglog ? qn = Da.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (qn = function() {
  var e = Da.format.apply(Da, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!Ie[rt]) {
  var IE = Zt[rt] || [];
  Jy(Ie, IE), Ie.close = function(e) {
    function t(r, n) {
      return e.call(Ie, r, function(i) {
        i || Nh(), typeof n == "function" && n.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, Es, {
      value: e
    }), t;
  }(Ie.close), Ie.closeSync = function(e) {
    function t(r) {
      e.apply(Ie, arguments), Nh();
    }
    return Object.defineProperty(t, Es, {
      value: e
    }), t;
  }(Ie.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    qn(Ie[rt]), My.equal(Ie[rt].length, 0);
  });
}
Zt[rt] || Jy(Zt, Ie[rt]);
var He = _u(CE(Ie));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !Ie.__patched && (He = _u(Ie), Ie.__patched = !0);
function _u(e) {
  OE(e), e.gracefulify = _u, e.createReadStream = F, e.createWriteStream = k;
  var t = e.readFile;
  e.readFile = r;
  function r(P, K, q) {
    return typeof K == "function" && (q = K, K = null), G(P, K, q);
    function G(Y, M, U, H) {
      return t(Y, M, function(x) {
        x && (x.code === "EMFILE" || x.code === "ENFILE") ? Zn([G, [Y, M, U], x, H || Date.now(), Date.now()]) : typeof U == "function" && U.apply(this, arguments);
      });
    }
  }
  var n = e.writeFile;
  e.writeFile = i;
  function i(P, K, q, G) {
    return typeof q == "function" && (G = q, q = null), Y(P, K, q, G);
    function Y(M, U, H, x, W) {
      return n(M, U, H, function(z) {
        z && (z.code === "EMFILE" || z.code === "ENFILE") ? Zn([Y, [M, U, H, x], z, W || Date.now(), Date.now()]) : typeof x == "function" && x.apply(this, arguments);
      });
    }
  }
  var o = e.appendFile;
  o && (e.appendFile = a);
  function a(P, K, q, G) {
    return typeof q == "function" && (G = q, q = null), Y(P, K, q, G);
    function Y(M, U, H, x, W) {
      return o(M, U, H, function(z) {
        z && (z.code === "EMFILE" || z.code === "ENFILE") ? Zn([Y, [M, U, H, x], z, W || Date.now(), Date.now()]) : typeof x == "function" && x.apply(this, arguments);
      });
    }
  }
  var s = e.copyFile;
  s && (e.copyFile = c);
  function c(P, K, q, G) {
    return typeof q == "function" && (G = q, q = 0), Y(P, K, q, G);
    function Y(M, U, H, x, W) {
      return s(M, U, H, function(z) {
        z && (z.code === "EMFILE" || z.code === "ENFILE") ? Zn([Y, [M, U, H, x], z, W || Date.now(), Date.now()]) : typeof x == "function" && x.apply(this, arguments);
      });
    }
  }
  var f = e.readdir;
  e.readdir = u;
  var l = /^v[0-5]\./;
  function u(P, K, q) {
    typeof K == "function" && (q = K, K = null);
    var G = l.test(process.version) ? function(U, H, x, W) {
      return f(U, Y(
        U,
        H,
        x,
        W
      ));
    } : function(U, H, x, W) {
      return f(U, H, Y(
        U,
        H,
        x,
        W
      ));
    };
    return G(P, K, q);
    function Y(M, U, H, x) {
      return function(W, z) {
        W && (W.code === "EMFILE" || W.code === "ENFILE") ? Zn([
          G,
          [M, U, H],
          W,
          x || Date.now(),
          Date.now()
        ]) : (z && z.sort && z.sort(), typeof H == "function" && H.call(this, W, z));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var p = AE(e);
    m = p.ReadStream, N = p.WriteStream;
  }
  var h = e.ReadStream;
  h && (m.prototype = Object.create(h.prototype), m.prototype.open = E);
  var v = e.WriteStream;
  v && (N.prototype = Object.create(v.prototype), N.prototype.open = R), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return m;
    },
    set: function(P) {
      m = P;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return N;
    },
    set: function(P) {
      N = P;
    },
    enumerable: !0,
    configurable: !0
  });
  var _ = m;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return _;
    },
    set: function(P) {
      _ = P;
    },
    enumerable: !0,
    configurable: !0
  });
  var g = N;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return g;
    },
    set: function(P) {
      g = P;
    },
    enumerable: !0,
    configurable: !0
  });
  function m(P, K) {
    return this instanceof m ? (h.apply(this, arguments), this) : m.apply(Object.create(m.prototype), arguments);
  }
  function E() {
    var P = this;
    V(P.path, P.flags, P.mode, function(K, q) {
      K ? (P.autoClose && P.destroy(), P.emit("error", K)) : (P.fd = q, P.emit("open", q), P.read());
    });
  }
  function N(P, K) {
    return this instanceof N ? (v.apply(this, arguments), this) : N.apply(Object.create(N.prototype), arguments);
  }
  function R() {
    var P = this;
    V(P.path, P.flags, P.mode, function(K, q) {
      K ? (P.destroy(), P.emit("error", K)) : (P.fd = q, P.emit("open", q));
    });
  }
  function F(P, K) {
    return new e.ReadStream(P, K);
  }
  function k(P, K) {
    return new e.WriteStream(P, K);
  }
  var L = e.open;
  e.open = V;
  function V(P, K, q, G) {
    return typeof q == "function" && (G = q, q = null), Y(P, K, q, G);
    function Y(M, U, H, x, W) {
      return L(M, U, H, function(z, I) {
        z && (z.code === "EMFILE" || z.code === "ENFILE") ? Zn([Y, [M, U, H, x], z, W || Date.now(), Date.now()]) : typeof x == "function" && x.apply(this, arguments);
      });
    }
  }
  return e;
}
function Zn(e) {
  qn("ENQUEUE", e[0].name, e[1]), Ie[rt].push(e), wu();
}
var Fa;
function Nh() {
  for (var e = Date.now(), t = 0; t < Ie[rt].length; ++t)
    Ie[rt][t].length > 2 && (Ie[rt][t][3] = e, Ie[rt][t][4] = e);
  wu();
}
function wu() {
  if (clearTimeout(Fa), Fa = void 0, Ie[rt].length !== 0) {
    var e = Ie[rt].shift(), t = e[0], r = e[1], n = e[2], i = e[3], o = e[4];
    if (i === void 0)
      qn("RETRY", t.name, r), t.apply(null, r);
    else if (Date.now() - i >= 6e4) {
      qn("TIMEOUT", t.name, r);
      var a = r.pop();
      typeof a == "function" && a.call(null, n);
    } else {
      var s = Date.now() - o, c = Math.max(o - i, 1), f = Math.min(c * 1.2, 100);
      s >= f ? (qn("RETRY", t.name, r), t.apply(null, r.concat([i]))) : Ie[rt].push(e);
    }
    Fa === void 0 && (Fa = setTimeout(wu, 0));
  }
}
(function(e) {
  const t = $e.fromCallback, r = He, n = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof r[i] == "function");
  Object.assign(e, r), n.forEach((i) => {
    e[i] = t(r[i]);
  }), e.exists = function(i, o) {
    return typeof o == "function" ? r.exists(i, o) : new Promise((a) => r.exists(i, a));
  }, e.read = function(i, o, a, s, c, f) {
    return typeof f == "function" ? r.read(i, o, a, s, c, f) : new Promise((l, u) => {
      r.read(i, o, a, s, c, (p, h, v) => {
        if (p) return u(p);
        l({ bytesRead: h, buffer: v });
      });
    });
  }, e.write = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.write(i, o, ...a) : new Promise((s, c) => {
      r.write(i, o, ...a, (f, l, u) => {
        if (f) return c(f);
        s({ bytesWritten: l, buffer: u });
      });
    });
  }, typeof r.writev == "function" && (e.writev = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.writev(i, o, ...a) : new Promise((s, c) => {
      r.writev(i, o, ...a, (f, l, u) => {
        if (f) return c(f);
        s({ bytesWritten: l, buffers: u });
      });
    });
  }), typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(Wn);
var Eu = {}, Xy = {};
const kE = me;
Xy.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(kE.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const Qy = Wn, { checkPath: Zy } = Xy, eg = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
Eu.makeDir = async (e, t) => (Zy(e), Qy.mkdir(e, {
  mode: eg(t),
  recursive: !0
}));
Eu.makeDirSync = (e, t) => (Zy(e), Qy.mkdirSync(e, {
  mode: eg(t),
  recursive: !0
}));
const DE = $e.fromPromise, { makeDir: FE, makeDirSync: Hc } = Eu, Gc = DE(FE);
var mr = {
  mkdirs: Gc,
  mkdirsSync: Hc,
  // alias
  mkdirp: Gc,
  mkdirpSync: Hc,
  ensureDir: Gc,
  ensureDirSync: Hc
};
const jE = $e.fromPromise, tg = Wn;
function LE(e) {
  return tg.access(e).then(() => !0).catch(() => !1);
}
var Yn = {
  pathExists: jE(LE),
  pathExistsSync: tg.existsSync
};
const wi = He;
function ME(e, t, r, n) {
  wi.open(e, "r+", (i, o) => {
    if (i) return n(i);
    wi.futimes(o, t, r, (a) => {
      wi.close(o, (s) => {
        n && n(a || s);
      });
    });
  });
}
function UE(e, t, r) {
  const n = wi.openSync(e, "r+");
  return wi.futimesSync(n, t, r), wi.closeSync(n);
}
var rg = {
  utimesMillis: ME,
  utimesMillisSync: UE
};
const Oi = Wn, Be = me, xE = Hs;
function qE(e, t, r) {
  const n = r.dereference ? (i) => Oi.stat(i, { bigint: !0 }) : (i) => Oi.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
}
function VE(e, t, r) {
  let n;
  const i = r.dereference ? (a) => Oi.statSync(a, { bigint: !0 }) : (a) => Oi.lstatSync(a, { bigint: !0 }), o = i(e);
  try {
    n = i(t);
  } catch (a) {
    if (a.code === "ENOENT") return { srcStat: o, destStat: null };
    throw a;
  }
  return { srcStat: o, destStat: n };
}
function HE(e, t, r, n, i) {
  xE.callbackify(qE)(e, t, n, (o, a) => {
    if (o) return i(o);
    const { srcStat: s, destStat: c } = a;
    if (c) {
      if (sa(s, c)) {
        const f = Be.basename(e), l = Be.basename(t);
        return r === "move" && f !== l && f.toLowerCase() === l.toLowerCase() ? i(null, { srcStat: s, destStat: c, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (s.isDirectory() && !c.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!s.isDirectory() && c.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return s.isDirectory() && Su(e, t) ? i(new Error(Ys(e, t, r))) : i(null, { srcStat: s, destStat: c });
  });
}
function GE(e, t, r, n) {
  const { srcStat: i, destStat: o } = VE(e, t, n);
  if (o) {
    if (sa(i, o)) {
      const a = Be.basename(e), s = Be.basename(t);
      if (r === "move" && a !== s && a.toLowerCase() === s.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && Su(e, t))
    throw new Error(Ys(e, t, r));
  return { srcStat: i, destStat: o };
}
function ng(e, t, r, n, i) {
  const o = Be.resolve(Be.dirname(e)), a = Be.resolve(Be.dirname(r));
  if (a === o || a === Be.parse(a).root) return i();
  Oi.stat(a, { bigint: !0 }, (s, c) => s ? s.code === "ENOENT" ? i() : i(s) : sa(t, c) ? i(new Error(Ys(e, r, n))) : ng(e, t, a, n, i));
}
function ig(e, t, r, n) {
  const i = Be.resolve(Be.dirname(e)), o = Be.resolve(Be.dirname(r));
  if (o === i || o === Be.parse(o).root) return;
  let a;
  try {
    a = Oi.statSync(o, { bigint: !0 });
  } catch (s) {
    if (s.code === "ENOENT") return;
    throw s;
  }
  if (sa(t, a))
    throw new Error(Ys(e, r, n));
  return ig(e, t, o, n);
}
function sa(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function Su(e, t) {
  const r = Be.resolve(e).split(Be.sep).filter((i) => i), n = Be.resolve(t).split(Be.sep).filter((i) => i);
  return r.reduce((i, o, a) => i && n[a] === o, !0);
}
function Ys(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Mi = {
  checkPaths: HE,
  checkPathsSync: GE,
  checkParentPaths: ng,
  checkParentPathsSync: ig,
  isSrcSubdir: Su,
  areIdentical: sa
};
const Ot = He, xo = me, BE = mr.mkdirs, zE = Yn.pathExists, KE = rg.utimesMillis, qo = Mi;
function WE(e, t, r, n) {
  typeof r == "function" && !n ? (n = r, r = {}) : typeof r == "function" && (r = { filter: r }), n = n || function() {
  }, r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), qo.checkPaths(e, t, "copy", r, (i, o) => {
    if (i) return n(i);
    const { srcStat: a, destStat: s } = o;
    qo.checkParentPaths(e, a, t, "copy", (c) => c ? n(c) : r.filter ? og(Oh, s, e, t, r, n) : Oh(s, e, t, r, n));
  });
}
function Oh(e, t, r, n, i) {
  const o = xo.dirname(r);
  zE(o, (a, s) => {
    if (a) return i(a);
    if (s) return Ss(e, t, r, n, i);
    BE(o, (c) => c ? i(c) : Ss(e, t, r, n, i));
  });
}
function og(e, t, r, n, i, o) {
  Promise.resolve(i.filter(r, n)).then((a) => a ? e(t, r, n, i, o) : o(), (a) => o(a));
}
function YE(e, t, r, n, i) {
  return n.filter ? og(Ss, e, t, r, n, i) : Ss(e, t, r, n, i);
}
function Ss(e, t, r, n, i) {
  (n.dereference ? Ot.stat : Ot.lstat)(t, (a, s) => a ? i(a) : s.isDirectory() ? rS(s, e, t, r, n, i) : s.isFile() || s.isCharacterDevice() || s.isBlockDevice() ? JE(s, e, t, r, n, i) : s.isSymbolicLink() ? oS(e, t, r, n, i) : s.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : s.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function JE(e, t, r, n, i, o) {
  return t ? XE(e, r, n, i, o) : ag(e, r, n, i, o);
}
function XE(e, t, r, n, i) {
  if (n.overwrite)
    Ot.unlink(r, (o) => o ? i(o) : ag(e, t, r, n, i));
  else return n.errorOnExist ? i(new Error(`'${r}' already exists`)) : i();
}
function ag(e, t, r, n, i) {
  Ot.copyFile(t, r, (o) => o ? i(o) : n.preserveTimestamps ? QE(e.mode, t, r, i) : Js(r, e.mode, i));
}
function QE(e, t, r, n) {
  return ZE(e) ? eS(r, e, (i) => i ? n(i) : Ah(e, t, r, n)) : Ah(e, t, r, n);
}
function ZE(e) {
  return (e & 128) === 0;
}
function eS(e, t, r) {
  return Js(e, t | 128, r);
}
function Ah(e, t, r, n) {
  tS(t, r, (i) => i ? n(i) : Js(r, e, n));
}
function Js(e, t, r) {
  return Ot.chmod(e, t, r);
}
function tS(e, t, r) {
  Ot.stat(e, (n, i) => n ? r(n) : KE(t, i.atime, i.mtime, r));
}
function rS(e, t, r, n, i, o) {
  return t ? sg(r, n, i, o) : nS(e.mode, r, n, i, o);
}
function nS(e, t, r, n, i) {
  Ot.mkdir(r, (o) => {
    if (o) return i(o);
    sg(t, r, n, (a) => a ? i(a) : Js(r, e, i));
  });
}
function sg(e, t, r, n) {
  Ot.readdir(e, (i, o) => i ? n(i) : cg(o, e, t, r, n));
}
function cg(e, t, r, n, i) {
  const o = e.pop();
  return o ? iS(e, o, t, r, n, i) : i();
}
function iS(e, t, r, n, i, o) {
  const a = xo.join(r, t), s = xo.join(n, t);
  qo.checkPaths(a, s, "copy", i, (c, f) => {
    if (c) return o(c);
    const { destStat: l } = f;
    YE(l, a, s, i, (u) => u ? o(u) : cg(e, r, n, i, o));
  });
}
function oS(e, t, r, n, i) {
  Ot.readlink(t, (o, a) => {
    if (o) return i(o);
    if (n.dereference && (a = xo.resolve(process.cwd(), a)), e)
      Ot.readlink(r, (s, c) => s ? s.code === "EINVAL" || s.code === "UNKNOWN" ? Ot.symlink(a, r, i) : i(s) : (n.dereference && (c = xo.resolve(process.cwd(), c)), qo.isSrcSubdir(a, c) ? i(new Error(`Cannot copy '${a}' to a subdirectory of itself, '${c}'.`)) : e.isDirectory() && qo.isSrcSubdir(c, a) ? i(new Error(`Cannot overwrite '${c}' with '${a}'.`)) : aS(a, r, i)));
    else
      return Ot.symlink(a, r, i);
  });
}
function aS(e, t, r) {
  Ot.unlink(t, (n) => n ? r(n) : Ot.symlink(e, t, r));
}
var sS = WE;
const dt = He, Vo = me, cS = mr.mkdirsSync, lS = rg.utimesMillisSync, Ho = Mi;
function uS(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = Ho.checkPathsSync(e, t, "copy", r);
  return Ho.checkParentPathsSync(e, n, t, "copy"), fS(i, e, t, r);
}
function fS(e, t, r, n) {
  if (n.filter && !n.filter(t, r)) return;
  const i = Vo.dirname(r);
  return dt.existsSync(i) || cS(i), lg(e, t, r, n);
}
function dS(e, t, r, n) {
  if (!(n.filter && !n.filter(t, r)))
    return lg(e, t, r, n);
}
function lg(e, t, r, n) {
  const o = (n.dereference ? dt.statSync : dt.lstatSync)(t);
  if (o.isDirectory()) return vS(o, e, t, r, n);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return hS(o, e, t, r, n);
  if (o.isSymbolicLink()) return ES(e, t, r, n);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function hS(e, t, r, n, i) {
  return t ? pS(e, r, n, i) : ug(e, r, n, i);
}
function pS(e, t, r, n) {
  if (n.overwrite)
    return dt.unlinkSync(r), ug(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function ug(e, t, r, n) {
  return dt.copyFileSync(t, r), n.preserveTimestamps && mS(e.mode, t, r), bu(r, e.mode);
}
function mS(e, t, r) {
  return yS(e) && gS(r, e), $S(t, r);
}
function yS(e) {
  return (e & 128) === 0;
}
function gS(e, t) {
  return bu(e, t | 128);
}
function bu(e, t) {
  return dt.chmodSync(e, t);
}
function $S(e, t) {
  const r = dt.statSync(e);
  return lS(t, r.atime, r.mtime);
}
function vS(e, t, r, n, i) {
  return t ? fg(r, n, i) : _S(e.mode, r, n, i);
}
function _S(e, t, r, n) {
  return dt.mkdirSync(r), fg(t, r, n), bu(r, e);
}
function fg(e, t, r) {
  dt.readdirSync(e).forEach((n) => wS(n, e, t, r));
}
function wS(e, t, r, n) {
  const i = Vo.join(t, e), o = Vo.join(r, e), { destStat: a } = Ho.checkPathsSync(i, o, "copy", n);
  return dS(a, i, o, n);
}
function ES(e, t, r, n) {
  let i = dt.readlinkSync(t);
  if (n.dereference && (i = Vo.resolve(process.cwd(), i)), e) {
    let o;
    try {
      o = dt.readlinkSync(r);
    } catch (a) {
      if (a.code === "EINVAL" || a.code === "UNKNOWN") return dt.symlinkSync(i, r);
      throw a;
    }
    if (n.dereference && (o = Vo.resolve(process.cwd(), o)), Ho.isSrcSubdir(i, o))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
    if (dt.statSync(r).isDirectory() && Ho.isSrcSubdir(o, i))
      throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
    return SS(i, r);
  } else
    return dt.symlinkSync(i, r);
}
function SS(e, t) {
  return dt.unlinkSync(t), dt.symlinkSync(e, t);
}
var bS = uS;
const PS = $e.fromCallback;
var Pu = {
  copy: PS(sS),
  copySync: bS
};
const Ch = He, dg = me, Se = My, Go = process.platform === "win32";
function hg(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((r) => {
    e[r] = e[r] || Ch[r], r = r + "Sync", e[r] = e[r] || Ch[r];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function Tu(e, t, r) {
  let n = 0;
  typeof t == "function" && (r = t, t = {}), Se(e, "rimraf: missing path"), Se.strictEqual(typeof e, "string", "rimraf: path should be a string"), Se.strictEqual(typeof r, "function", "rimraf: callback function required"), Se(t, "rimraf: invalid options argument provided"), Se.strictEqual(typeof t, "object", "rimraf: options should be object"), hg(t), Rh(e, t, function i(o) {
    if (o) {
      if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && n < t.maxBusyTries) {
        n++;
        const a = n * 100;
        return setTimeout(() => Rh(e, t, i), a);
      }
      o.code === "ENOENT" && (o = null);
    }
    r(o);
  });
}
function Rh(e, t, r) {
  Se(e), Se(t), Se(typeof r == "function"), t.lstat(e, (n, i) => {
    if (n && n.code === "ENOENT")
      return r(null);
    if (n && n.code === "EPERM" && Go)
      return Ih(e, t, n, r);
    if (i && i.isDirectory())
      return as(e, t, n, r);
    t.unlink(e, (o) => {
      if (o) {
        if (o.code === "ENOENT")
          return r(null);
        if (o.code === "EPERM")
          return Go ? Ih(e, t, o, r) : as(e, t, o, r);
        if (o.code === "EISDIR")
          return as(e, t, o, r);
      }
      return r(o);
    });
  });
}
function Ih(e, t, r, n) {
  Se(e), Se(t), Se(typeof n == "function"), t.chmod(e, 438, (i) => {
    i ? n(i.code === "ENOENT" ? null : r) : t.stat(e, (o, a) => {
      o ? n(o.code === "ENOENT" ? null : r) : a.isDirectory() ? as(e, t, r, n) : t.unlink(e, n);
    });
  });
}
function kh(e, t, r) {
  let n;
  Se(e), Se(t);
  try {
    t.chmodSync(e, 438);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  try {
    n = t.statSync(e);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  n.isDirectory() ? ss(e, t, r) : t.unlinkSync(e);
}
function as(e, t, r, n) {
  Se(e), Se(t), Se(typeof n == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? TS(e, t, n) : i && i.code === "ENOTDIR" ? n(r) : n(i);
  });
}
function TS(e, t, r) {
  Se(e), Se(t), Se(typeof r == "function"), t.readdir(e, (n, i) => {
    if (n) return r(n);
    let o = i.length, a;
    if (o === 0) return t.rmdir(e, r);
    i.forEach((s) => {
      Tu(dg.join(e, s), t, (c) => {
        if (!a) {
          if (c) return r(a = c);
          --o === 0 && t.rmdir(e, r);
        }
      });
    });
  });
}
function pg(e, t) {
  let r;
  t = t || {}, hg(t), Se(e, "rimraf: missing path"), Se.strictEqual(typeof e, "string", "rimraf: path should be a string"), Se(t, "rimraf: missing options"), Se.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    r = t.lstatSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    n.code === "EPERM" && Go && kh(e, t, n);
  }
  try {
    r && r.isDirectory() ? ss(e, t, null) : t.unlinkSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    if (n.code === "EPERM")
      return Go ? kh(e, t, n) : ss(e, t, n);
    if (n.code !== "EISDIR")
      throw n;
    ss(e, t, n);
  }
}
function ss(e, t, r) {
  Se(e), Se(t);
  try {
    t.rmdirSync(e);
  } catch (n) {
    if (n.code === "ENOTDIR")
      throw r;
    if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM")
      NS(e, t);
    else if (n.code !== "ENOENT")
      throw n;
  }
}
function NS(e, t) {
  if (Se(e), Se(t), t.readdirSync(e).forEach((r) => pg(dg.join(e, r), t)), Go) {
    const r = Date.now();
    do
      try {
        return t.rmdirSync(e, t);
      } catch {
      }
    while (Date.now() - r < 500);
  } else
    return t.rmdirSync(e, t);
}
var OS = Tu;
Tu.sync = pg;
const bs = He, AS = $e.fromCallback, mg = OS;
function CS(e, t) {
  if (bs.rm) return bs.rm(e, { recursive: !0, force: !0 }, t);
  mg(e, t);
}
function RS(e) {
  if (bs.rmSync) return bs.rmSync(e, { recursive: !0, force: !0 });
  mg.sync(e);
}
var Xs = {
  remove: AS(CS),
  removeSync: RS
};
const IS = $e.fromPromise, yg = Wn, gg = me, $g = mr, vg = Xs, Dh = IS(async function(t) {
  let r;
  try {
    r = await yg.readdir(t);
  } catch {
    return $g.mkdirs(t);
  }
  return Promise.all(r.map((n) => vg.remove(gg.join(t, n))));
});
function Fh(e) {
  let t;
  try {
    t = yg.readdirSync(e);
  } catch {
    return $g.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = gg.join(e, r), vg.removeSync(r);
  });
}
var kS = {
  emptyDirSync: Fh,
  emptydirSync: Fh,
  emptyDir: Dh,
  emptydir: Dh
};
const DS = $e.fromCallback, _g = me, rn = He, wg = mr;
function FS(e, t) {
  function r() {
    rn.writeFile(e, "", (n) => {
      if (n) return t(n);
      t();
    });
  }
  rn.stat(e, (n, i) => {
    if (!n && i.isFile()) return t();
    const o = _g.dirname(e);
    rn.stat(o, (a, s) => {
      if (a)
        return a.code === "ENOENT" ? wg.mkdirs(o, (c) => {
          if (c) return t(c);
          r();
        }) : t(a);
      s.isDirectory() ? r() : rn.readdir(o, (c) => {
        if (c) return t(c);
      });
    });
  });
}
function jS(e) {
  let t;
  try {
    t = rn.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = _g.dirname(e);
  try {
    rn.statSync(r).isDirectory() || rn.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") wg.mkdirsSync(r);
    else throw n;
  }
  rn.writeFileSync(e, "");
}
var LS = {
  createFile: DS(FS),
  createFileSync: jS
};
const MS = $e.fromCallback, Eg = me, Qr = He, Sg = mr, US = Yn.pathExists, { areIdentical: bg } = Mi;
function xS(e, t, r) {
  function n(i, o) {
    Qr.link(i, o, (a) => {
      if (a) return r(a);
      r(null);
    });
  }
  Qr.lstat(t, (i, o) => {
    Qr.lstat(e, (a, s) => {
      if (a)
        return a.message = a.message.replace("lstat", "ensureLink"), r(a);
      if (o && bg(s, o)) return r(null);
      const c = Eg.dirname(t);
      US(c, (f, l) => {
        if (f) return r(f);
        if (l) return n(e, t);
        Sg.mkdirs(c, (u) => {
          if (u) return r(u);
          n(e, t);
        });
      });
    });
  });
}
function qS(e, t) {
  let r;
  try {
    r = Qr.lstatSync(t);
  } catch {
  }
  try {
    const o = Qr.lstatSync(e);
    if (r && bg(o, r)) return;
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  const n = Eg.dirname(t);
  return Qr.existsSync(n) || Sg.mkdirsSync(n), Qr.linkSync(e, t);
}
var VS = {
  createLink: MS(xS),
  createLinkSync: qS
};
const nn = me, To = He, HS = Yn.pathExists;
function GS(e, t, r) {
  if (nn.isAbsolute(e))
    return To.lstat(e, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), r(n)) : r(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const n = nn.dirname(t), i = nn.join(n, e);
    return HS(i, (o, a) => o ? r(o) : a ? r(null, {
      toCwd: i,
      toDst: e
    }) : To.lstat(e, (s) => s ? (s.message = s.message.replace("lstat", "ensureSymlink"), r(s)) : r(null, {
      toCwd: e,
      toDst: nn.relative(n, e)
    })));
  }
}
function BS(e, t) {
  let r;
  if (nn.isAbsolute(e)) {
    if (r = To.existsSync(e), !r) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const n = nn.dirname(t), i = nn.join(n, e);
    if (r = To.existsSync(i), r)
      return {
        toCwd: i,
        toDst: e
      };
    if (r = To.existsSync(e), !r) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: nn.relative(n, e)
    };
  }
}
var zS = {
  symlinkPaths: GS,
  symlinkPathsSync: BS
};
const Pg = He;
function KS(e, t, r) {
  if (r = typeof t == "function" ? t : r, t = typeof t == "function" ? !1 : t, t) return r(null, t);
  Pg.lstat(e, (n, i) => {
    if (n) return r(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", r(null, t);
  });
}
function WS(e, t) {
  let r;
  if (t) return t;
  try {
    r = Pg.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var YS = {
  symlinkType: KS,
  symlinkTypeSync: WS
};
const JS = $e.fromCallback, Tg = me, Jt = Wn, Ng = mr, XS = Ng.mkdirs, QS = Ng.mkdirsSync, Og = zS, ZS = Og.symlinkPaths, e1 = Og.symlinkPathsSync, Ag = YS, t1 = Ag.symlinkType, r1 = Ag.symlinkTypeSync, n1 = Yn.pathExists, { areIdentical: Cg } = Mi;
function i1(e, t, r, n) {
  n = typeof r == "function" ? r : n, r = typeof r == "function" ? !1 : r, Jt.lstat(t, (i, o) => {
    !i && o.isSymbolicLink() ? Promise.all([
      Jt.stat(e),
      Jt.stat(t)
    ]).then(([a, s]) => {
      if (Cg(a, s)) return n(null);
      jh(e, t, r, n);
    }) : jh(e, t, r, n);
  });
}
function jh(e, t, r, n) {
  ZS(e, t, (i, o) => {
    if (i) return n(i);
    e = o.toDst, t1(o.toCwd, r, (a, s) => {
      if (a) return n(a);
      const c = Tg.dirname(t);
      n1(c, (f, l) => {
        if (f) return n(f);
        if (l) return Jt.symlink(e, t, s, n);
        XS(c, (u) => {
          if (u) return n(u);
          Jt.symlink(e, t, s, n);
        });
      });
    });
  });
}
function o1(e, t, r) {
  let n;
  try {
    n = Jt.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const s = Jt.statSync(e), c = Jt.statSync(t);
    if (Cg(s, c)) return;
  }
  const i = e1(e, t);
  e = i.toDst, r = r1(i.toCwd, r);
  const o = Tg.dirname(t);
  return Jt.existsSync(o) || QS(o), Jt.symlinkSync(e, t, r);
}
var a1 = {
  createSymlink: JS(i1),
  createSymlinkSync: o1
};
const { createFile: Lh, createFileSync: Mh } = LS, { createLink: Uh, createLinkSync: xh } = VS, { createSymlink: qh, createSymlinkSync: Vh } = a1;
var s1 = {
  // file
  createFile: Lh,
  createFileSync: Mh,
  ensureFile: Lh,
  ensureFileSync: Mh,
  // link
  createLink: Uh,
  createLinkSync: xh,
  ensureLink: Uh,
  ensureLinkSync: xh,
  // symlink
  createSymlink: qh,
  createSymlinkSync: Vh,
  ensureSymlink: qh,
  ensureSymlinkSync: Vh
};
function c1(e, { EOL: t = `
`, finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
  const o = r ? t : "";
  return JSON.stringify(e, n, i).replace(/\n/g, t) + o;
}
function l1(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var ca = { stringify: c1, stripBom: l1 };
let Ai;
try {
  Ai = He;
} catch {
  Ai = mn;
}
const Qs = $e, { stringify: Rg, stripBom: Ig } = ca;
async function u1(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Ai, n = "throws" in t ? t.throws : !0;
  let i = await Qs.fromCallback(r.readFile)(e, t);
  i = Ig(i);
  let o;
  try {
    o = JSON.parse(i, t ? t.reviver : null);
  } catch (a) {
    if (n)
      throw a.message = `${e}: ${a.message}`, a;
    return null;
  }
  return o;
}
const f1 = Qs.fromPromise(u1);
function d1(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Ai, n = "throws" in t ? t.throws : !0;
  try {
    let i = r.readFileSync(e, t);
    return i = Ig(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (n)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function h1(e, t, r = {}) {
  const n = r.fs || Ai, i = Rg(t, r);
  await Qs.fromCallback(n.writeFile)(e, i, r);
}
const p1 = Qs.fromPromise(h1);
function m1(e, t, r = {}) {
  const n = r.fs || Ai, i = Rg(t, r);
  return n.writeFileSync(e, i, r);
}
const y1 = {
  readFile: f1,
  readFileSync: d1,
  writeFile: p1,
  writeFileSync: m1
};
var kg = y1;
const ja = kg;
var g1 = {
  // jsonfile exports
  readJson: ja.readFile,
  readJsonSync: ja.readFileSync,
  writeJson: ja.writeFile,
  writeJsonSync: ja.writeFileSync
};
const $1 = $e.fromCallback, No = He, Dg = me, Fg = mr, v1 = Yn.pathExists;
function _1(e, t, r, n) {
  typeof r == "function" && (n = r, r = "utf8");
  const i = Dg.dirname(e);
  v1(i, (o, a) => {
    if (o) return n(o);
    if (a) return No.writeFile(e, t, r, n);
    Fg.mkdirs(i, (s) => {
      if (s) return n(s);
      No.writeFile(e, t, r, n);
    });
  });
}
function w1(e, ...t) {
  const r = Dg.dirname(e);
  if (No.existsSync(r))
    return No.writeFileSync(e, ...t);
  Fg.mkdirsSync(r), No.writeFileSync(e, ...t);
}
var Nu = {
  outputFile: $1(_1),
  outputFileSync: w1
};
const { stringify: E1 } = ca, { outputFile: S1 } = Nu;
async function b1(e, t, r = {}) {
  const n = E1(t, r);
  await S1(e, n, r);
}
var P1 = b1;
const { stringify: T1 } = ca, { outputFileSync: N1 } = Nu;
function O1(e, t, r) {
  const n = T1(t, r);
  N1(e, n, r);
}
var A1 = O1;
const C1 = $e.fromPromise, vt = g1;
vt.outputJson = C1(P1);
vt.outputJsonSync = A1;
vt.outputJSON = vt.outputJson;
vt.outputJSONSync = vt.outputJsonSync;
vt.writeJSON = vt.writeJson;
vt.writeJSONSync = vt.writeJsonSync;
vt.readJSON = vt.readJson;
vt.readJSONSync = vt.readJsonSync;
var R1 = vt;
const I1 = He, jl = me, k1 = Pu.copy, jg = Xs.remove, D1 = mr.mkdirp, F1 = Yn.pathExists, Hh = Mi;
function j1(e, t, r, n) {
  typeof r == "function" && (n = r, r = {}), r = r || {};
  const i = r.overwrite || r.clobber || !1;
  Hh.checkPaths(e, t, "move", r, (o, a) => {
    if (o) return n(o);
    const { srcStat: s, isChangingCase: c = !1 } = a;
    Hh.checkParentPaths(e, s, t, "move", (f) => {
      if (f) return n(f);
      if (L1(t)) return Gh(e, t, i, c, n);
      D1(jl.dirname(t), (l) => l ? n(l) : Gh(e, t, i, c, n));
    });
  });
}
function L1(e) {
  const t = jl.dirname(e);
  return jl.parse(t).root === t;
}
function Gh(e, t, r, n, i) {
  if (n) return Bc(e, t, r, i);
  if (r)
    return jg(t, (o) => o ? i(o) : Bc(e, t, r, i));
  F1(t, (o, a) => o ? i(o) : a ? i(new Error("dest already exists.")) : Bc(e, t, r, i));
}
function Bc(e, t, r, n) {
  I1.rename(e, t, (i) => i ? i.code !== "EXDEV" ? n(i) : M1(e, t, r, n) : n());
}
function M1(e, t, r, n) {
  k1(e, t, {
    overwrite: r,
    errorOnExist: !0
  }, (o) => o ? n(o) : jg(e, n));
}
var U1 = j1;
const Lg = He, Ll = me, x1 = Pu.copySync, Mg = Xs.removeSync, q1 = mr.mkdirpSync, Bh = Mi;
function V1(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = Bh.checkPathsSync(e, t, "move", r);
  return Bh.checkParentPathsSync(e, i, t, "move"), H1(t) || q1(Ll.dirname(t)), G1(e, t, n, o);
}
function H1(e) {
  const t = Ll.dirname(e);
  return Ll.parse(t).root === t;
}
function G1(e, t, r, n) {
  if (n) return zc(e, t, r);
  if (r)
    return Mg(t), zc(e, t, r);
  if (Lg.existsSync(t)) throw new Error("dest already exists.");
  return zc(e, t, r);
}
function zc(e, t, r) {
  try {
    Lg.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return B1(e, t, r);
  }
}
function B1(e, t, r) {
  return x1(e, t, {
    overwrite: r,
    errorOnExist: !0
  }), Mg(e);
}
var z1 = V1;
const K1 = $e.fromCallback;
var W1 = {
  move: K1(U1),
  moveSync: z1
}, yn = {
  // Export promiseified graceful-fs:
  ...Wn,
  // Export extra methods:
  ...Pu,
  ...kS,
  ...s1,
  ...R1,
  ...mr,
  ...W1,
  ...Nu,
  ...Yn,
  ...Xs
}, ao = {}, Nn = {}, nt = {}, Ou = {}, rr = {};
function Ug(e) {
  return typeof e > "u" || e === null;
}
function Y1(e) {
  return typeof e == "object" && e !== null;
}
function J1(e) {
  return Array.isArray(e) ? e : Ug(e) ? [] : [e];
}
function X1(e, t) {
  var r, n, i, o;
  if (t)
    for (o = Object.keys(t), r = 0, n = o.length; r < n; r += 1)
      i = o[r], e[i] = t[i];
  return e;
}
function Q1(e, t) {
  var r = "", n;
  for (n = 0; n < t; n += 1)
    r += e;
  return r;
}
function Z1(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
rr.isNothing = Ug;
rr.isObject = Y1;
rr.toArray = J1;
rr.repeat = Q1;
rr.isNegativeZero = Z1;
rr.extend = X1;
function xg(e, t) {
  var r = "", n = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (r += `

` + e.mark.snippet), n + " " + r) : n;
}
function Bo(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = xg(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Bo.prototype = Object.create(Error.prototype);
Bo.prototype.constructor = Bo;
Bo.prototype.toString = function(t) {
  return this.name + ": " + xg(this, t);
};
var la = Bo, _o = rr;
function Kc(e, t, r, n, i) {
  var o = "", a = "", s = Math.floor(i / 2) - 1;
  return n - t > s && (o = " ... ", t = n - s + o.length), r - n > s && (a = " ...", r = n + s - a.length), {
    str: o + e.slice(t, r).replace(/\t/g, "→") + a,
    pos: n - t + o.length
    // relative position
  };
}
function Wc(e, t) {
  return _o.repeat(" ", t - e.length) + e;
}
function eb(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, n = [0], i = [], o, a = -1; o = r.exec(e.buffer); )
    i.push(o.index), n.push(o.index + o[0].length), e.position <= o.index && a < 0 && (a = n.length - 2);
  a < 0 && (a = n.length - 1);
  var s = "", c, f, l = Math.min(e.line + t.linesAfter, i.length).toString().length, u = t.maxLength - (t.indent + l + 3);
  for (c = 1; c <= t.linesBefore && !(a - c < 0); c++)
    f = Kc(
      e.buffer,
      n[a - c],
      i[a - c],
      e.position - (n[a] - n[a - c]),
      u
    ), s = _o.repeat(" ", t.indent) + Wc((e.line - c + 1).toString(), l) + " | " + f.str + `
` + s;
  for (f = Kc(e.buffer, n[a], i[a], e.position, u), s += _o.repeat(" ", t.indent) + Wc((e.line + 1).toString(), l) + " | " + f.str + `
`, s += _o.repeat("-", t.indent + l + 3 + f.pos) + `^
`, c = 1; c <= t.linesAfter && !(a + c >= i.length); c++)
    f = Kc(
      e.buffer,
      n[a + c],
      i[a + c],
      e.position - (n[a] - n[a + c]),
      u
    ), s += _o.repeat(" ", t.indent) + Wc((e.line + c + 1).toString(), l) + " | " + f.str + `
`;
  return s.replace(/\n$/, "");
}
var tb = eb, zh = la, rb = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], nb = [
  "scalar",
  "sequence",
  "mapping"
];
function ib(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(n) {
      t[String(n)] = r;
    });
  }), t;
}
function ob(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(r) {
    if (rb.indexOf(r) === -1)
      throw new zh('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(r) {
    return r;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = ib(t.styleAliases || null), nb.indexOf(this.kind) === -1)
    throw new zh('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var wt = ob, so = la, Yc = wt;
function Kh(e, t) {
  var r = [];
  return e[t].forEach(function(n) {
    var i = r.length;
    r.forEach(function(o, a) {
      o.tag === n.tag && o.kind === n.kind && o.multi === n.multi && (i = a);
    }), r[i] = n;
  }), r;
}
function ab() {
  var e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, t, r;
  function n(i) {
    i.multi ? (e.multi[i.kind].push(i), e.multi.fallback.push(i)) : e[i.kind][i.tag] = e.fallback[i.tag] = i;
  }
  for (t = 0, r = arguments.length; t < r; t += 1)
    arguments[t].forEach(n);
  return e;
}
function Ml(e) {
  return this.extend(e);
}
Ml.prototype.extend = function(t) {
  var r = [], n = [];
  if (t instanceof Yc)
    n.push(t);
  else if (Array.isArray(t))
    n = n.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
  else
    throw new so("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(o) {
    if (!(o instanceof Yc))
      throw new so("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new so("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new so("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), n.forEach(function(o) {
    if (!(o instanceof Yc))
      throw new so("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(Ml.prototype);
  return i.implicit = (this.implicit || []).concat(r), i.explicit = (this.explicit || []).concat(n), i.compiledImplicit = Kh(i, "implicit"), i.compiledExplicit = Kh(i, "explicit"), i.compiledTypeMap = ab(i.compiledImplicit, i.compiledExplicit), i;
};
var qg = Ml, sb = wt, Vg = new sb("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), cb = wt, Hg = new cb("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), lb = wt, Gg = new lb("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), ub = qg, Bg = new ub({
  explicit: [
    Vg,
    Hg,
    Gg
  ]
}), fb = wt;
function db(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function hb() {
  return null;
}
function pb(e) {
  return e === null;
}
var zg = new fb("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: db,
  construct: hb,
  predicate: pb,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
}), mb = wt;
function yb(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function gb(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function $b(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var Kg = new mb("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: yb,
  construct: gb,
  predicate: $b,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
}), vb = rr, _b = wt;
function wb(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function Eb(e) {
  return 48 <= e && e <= 55;
}
function Sb(e) {
  return 48 <= e && e <= 57;
}
function bb(e) {
  if (e === null) return !1;
  var t = e.length, r = 0, n = !1, i;
  if (!t) return !1;
  if (i = e[r], (i === "-" || i === "+") && (i = e[++r]), i === "0") {
    if (r + 1 === t) return !0;
    if (i = e[++r], i === "b") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (i !== "0" && i !== "1") return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "x") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!wb(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "o") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!Eb(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; r < t; r++)
    if (i = e[r], i !== "_") {
      if (!Sb(e.charCodeAt(r)))
        return !1;
      n = !0;
    }
  return !(!n || i === "_");
}
function Pb(e) {
  var t = e, r = 1, n;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), n = t[0], (n === "-" || n === "+") && (n === "-" && (r = -1), t = t.slice(1), n = t[0]), t === "0") return 0;
  if (n === "0") {
    if (t[1] === "b") return r * parseInt(t.slice(2), 2);
    if (t[1] === "x") return r * parseInt(t.slice(2), 16);
    if (t[1] === "o") return r * parseInt(t.slice(2), 8);
  }
  return r * parseInt(t, 10);
}
function Tb(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !vb.isNegativeZero(e);
}
var Wg = new _b("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: bb,
  construct: Pb,
  predicate: Tb,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), Yg = rr, Nb = wt, Ob = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Ab(e) {
  return !(e === null || !Ob.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function Cb(e) {
  var t, r;
  return t = e.replace(/_/g, "").toLowerCase(), r = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : r * parseFloat(t, 10);
}
var Rb = /^[-+]?[0-9]+e/;
function Ib(e, t) {
  var r;
  if (isNaN(e))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (Yg.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), Rb.test(r) ? r.replace("e", ".e") : r;
}
function kb(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || Yg.isNegativeZero(e));
}
var Jg = new Nb("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Ab,
  construct: Cb,
  predicate: kb,
  represent: Ib,
  defaultStyle: "lowercase"
}), Xg = Bg.extend({
  implicit: [
    zg,
    Kg,
    Wg,
    Jg
  ]
}), Qg = Xg, Db = wt, Zg = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), e0 = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function Fb(e) {
  return e === null ? !1 : Zg.exec(e) !== null || e0.exec(e) !== null;
}
function jb(e) {
  var t, r, n, i, o, a, s, c = 0, f = null, l, u, p;
  if (t = Zg.exec(e), t === null && (t = e0.exec(e)), t === null) throw new Error("Date resolve error");
  if (r = +t[1], n = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(r, n, i));
  if (o = +t[4], a = +t[5], s = +t[6], t[7]) {
    for (c = t[7].slice(0, 3); c.length < 3; )
      c += "0";
    c = +c;
  }
  return t[9] && (l = +t[10], u = +(t[11] || 0), f = (l * 60 + u) * 6e4, t[9] === "-" && (f = -f)), p = new Date(Date.UTC(r, n, i, o, a, s, c)), f && p.setTime(p.getTime() - f), p;
}
function Lb(e) {
  return e.toISOString();
}
var t0 = new Db("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: Fb,
  construct: jb,
  instanceOf: Date,
  represent: Lb
}), Mb = wt;
function Ub(e) {
  return e === "<<" || e === null;
}
var r0 = new Mb("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: Ub
}), xb = wt, Au = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function qb(e) {
  if (e === null) return !1;
  var t, r, n = 0, i = e.length, o = Au;
  for (r = 0; r < i; r++)
    if (t = o.indexOf(e.charAt(r)), !(t > 64)) {
      if (t < 0) return !1;
      n += 6;
    }
  return n % 8 === 0;
}
function Vb(e) {
  var t, r, n = e.replace(/[\r\n=]/g, ""), i = n.length, o = Au, a = 0, s = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)), a = a << 6 | o.indexOf(n.charAt(t));
  return r = i % 4 * 6, r === 0 ? (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)) : r === 18 ? (s.push(a >> 10 & 255), s.push(a >> 2 & 255)) : r === 12 && s.push(a >> 4 & 255), new Uint8Array(s);
}
function Hb(e) {
  var t = "", r = 0, n, i, o = e.length, a = Au;
  for (n = 0; n < o; n++)
    n % 3 === 0 && n && (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]), r = (r << 8) + e[n];
  return i = o % 3, i === 0 ? (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]) : i === 2 ? (t += a[r >> 10 & 63], t += a[r >> 4 & 63], t += a[r << 2 & 63], t += a[64]) : i === 1 && (t += a[r >> 2 & 63], t += a[r << 4 & 63], t += a[64], t += a[64]), t;
}
function Gb(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var n0 = new xb("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: qb,
  construct: Vb,
  predicate: Gb,
  represent: Hb
}), Bb = wt, zb = Object.prototype.hasOwnProperty, Kb = Object.prototype.toString;
function Wb(e) {
  if (e === null) return !0;
  var t = [], r, n, i, o, a, s = e;
  for (r = 0, n = s.length; r < n; r += 1) {
    if (i = s[r], a = !1, Kb.call(i) !== "[object Object]") return !1;
    for (o in i)
      if (zb.call(i, o))
        if (!a) a = !0;
        else return !1;
    if (!a) return !1;
    if (t.indexOf(o) === -1) t.push(o);
    else return !1;
  }
  return !0;
}
function Yb(e) {
  return e !== null ? e : [];
}
var i0 = new Bb("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: Wb,
  construct: Yb
}), Jb = wt, Xb = Object.prototype.toString;
function Qb(e) {
  if (e === null) return !0;
  var t, r, n, i, o, a = e;
  for (o = new Array(a.length), t = 0, r = a.length; t < r; t += 1) {
    if (n = a[t], Xb.call(n) !== "[object Object]" || (i = Object.keys(n), i.length !== 1)) return !1;
    o[t] = [i[0], n[i[0]]];
  }
  return !0;
}
function Zb(e) {
  if (e === null) return [];
  var t, r, n, i, o, a = e;
  for (o = new Array(a.length), t = 0, r = a.length; t < r; t += 1)
    n = a[t], i = Object.keys(n), o[t] = [i[0], n[i[0]]];
  return o;
}
var o0 = new Jb("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: Qb,
  construct: Zb
}), eP = wt, tP = Object.prototype.hasOwnProperty;
function rP(e) {
  if (e === null) return !0;
  var t, r = e;
  for (t in r)
    if (tP.call(r, t) && r[t] !== null)
      return !1;
  return !0;
}
function nP(e) {
  return e !== null ? e : {};
}
var a0 = new eP("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: rP,
  construct: nP
}), Cu = Qg.extend({
  implicit: [
    t0,
    r0
  ],
  explicit: [
    n0,
    i0,
    o0,
    a0
  ]
}), In = rr, s0 = la, iP = tb, oP = Cu, dn = Object.prototype.hasOwnProperty, Ps = 1, c0 = 2, l0 = 3, Ts = 4, Jc = 1, aP = 2, Wh = 3, sP = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, cP = /[\x85\u2028\u2029]/, lP = /[,\[\]\{\}]/, u0 = /^(?:!|!!|![a-z\-]+!)$/i, f0 = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function Yh(e) {
  return Object.prototype.toString.call(e);
}
function hr(e) {
  return e === 10 || e === 13;
}
function Vn(e) {
  return e === 9 || e === 32;
}
function At(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function hi(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function uP(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function fP(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function dP(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function Jh(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function hP(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var d0 = new Array(256), h0 = new Array(256);
for (var ei = 0; ei < 256; ei++)
  d0[ei] = Jh(ei) ? 1 : 0, h0[ei] = Jh(ei);
function pP(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || oP, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function p0(e, t) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = iP(r), new s0(t, r);
}
function re(e, t) {
  throw p0(e, t);
}
function Ns(e, t) {
  e.onWarning && e.onWarning.call(null, p0(e, t));
}
var Xh = {
  YAML: function(t, r, n) {
    var i, o, a;
    t.version !== null && re(t, "duplication of %YAML directive"), n.length !== 1 && re(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(n[0]), i === null && re(t, "ill-formed argument of the YAML directive"), o = parseInt(i[1], 10), a = parseInt(i[2], 10), o !== 1 && re(t, "unacceptable YAML version of the document"), t.version = n[0], t.checkLineBreaks = a < 2, a !== 1 && a !== 2 && Ns(t, "unsupported YAML version of the document");
  },
  TAG: function(t, r, n) {
    var i, o;
    n.length !== 2 && re(t, "TAG directive accepts exactly two arguments"), i = n[0], o = n[1], u0.test(i) || re(t, "ill-formed tag handle (first argument) of the TAG directive"), dn.call(t.tagMap, i) && re(t, 'there is a previously declared suffix for "' + i + '" tag handle'), f0.test(o) || re(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      o = decodeURIComponent(o);
    } catch {
      re(t, "tag prefix is malformed: " + o);
    }
    t.tagMap[i] = o;
  }
};
function cn(e, t, r, n) {
  var i, o, a, s;
  if (t < r) {
    if (s = e.input.slice(t, r), n)
      for (i = 0, o = s.length; i < o; i += 1)
        a = s.charCodeAt(i), a === 9 || 32 <= a && a <= 1114111 || re(e, "expected valid JSON character");
    else sP.test(s) && re(e, "the stream contains non-printable characters");
    e.result += s;
  }
}
function Qh(e, t, r, n) {
  var i, o, a, s;
  for (In.isObject(r) || re(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(r), a = 0, s = i.length; a < s; a += 1)
    o = i[a], dn.call(t, o) || (t[o] = r[o], n[o] = !0);
}
function pi(e, t, r, n, i, o, a, s, c) {
  var f, l;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), f = 0, l = i.length; f < l; f += 1)
      Array.isArray(i[f]) && re(e, "nested arrays are not supported inside keys"), typeof i == "object" && Yh(i[f]) === "[object Object]" && (i[f] = "[object Object]");
  if (typeof i == "object" && Yh(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), n === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (f = 0, l = o.length; f < l; f += 1)
        Qh(e, t, o[f], r);
    else
      Qh(e, t, o, r);
  else
    !e.json && !dn.call(r, i) && dn.call(t, i) && (e.line = a || e.line, e.lineStart = s || e.lineStart, e.position = c || e.position, re(e, "duplicated mapping key")), i === "__proto__" ? Object.defineProperty(t, i, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: o
    }) : t[i] = o, delete r[i];
  return t;
}
function Ru(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : re(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function Le(e, t, r) {
  for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; Vn(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (hr(i))
      for (Ru(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && n !== 0 && e.lineIndent < r && Ns(e, "deficient indentation"), n;
}
function Zs(e) {
  var t = e.position, r;
  return r = e.input.charCodeAt(t), !!((r === 45 || r === 46) && r === e.input.charCodeAt(t + 1) && r === e.input.charCodeAt(t + 2) && (t += 3, r = e.input.charCodeAt(t), r === 0 || At(r)));
}
function Iu(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += In.repeat(`
`, t - 1));
}
function mP(e, t, r) {
  var n, i, o, a, s, c, f, l, u = e.kind, p = e.result, h;
  if (h = e.input.charCodeAt(e.position), At(h) || hi(h) || h === 35 || h === 38 || h === 42 || h === 33 || h === 124 || h === 62 || h === 39 || h === 34 || h === 37 || h === 64 || h === 96 || (h === 63 || h === 45) && (i = e.input.charCodeAt(e.position + 1), At(i) || r && hi(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", o = a = e.position, s = !1; h !== 0; ) {
    if (h === 58) {
      if (i = e.input.charCodeAt(e.position + 1), At(i) || r && hi(i))
        break;
    } else if (h === 35) {
      if (n = e.input.charCodeAt(e.position - 1), At(n))
        break;
    } else {
      if (e.position === e.lineStart && Zs(e) || r && hi(h))
        break;
      if (hr(h))
        if (c = e.line, f = e.lineStart, l = e.lineIndent, Le(e, !1, -1), e.lineIndent >= t) {
          s = !0, h = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = a, e.line = c, e.lineStart = f, e.lineIndent = l;
          break;
        }
    }
    s && (cn(e, o, a, !1), Iu(e, e.line - c), o = a = e.position, s = !1), Vn(h) || (a = e.position + 1), h = e.input.charCodeAt(++e.position);
  }
  return cn(e, o, a, !1), e.result ? !0 : (e.kind = u, e.result = p, !1);
}
function yP(e, t) {
  var r, n, i;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (cn(e, n, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        n = e.position, e.position++, i = e.position;
      else
        return !0;
    else hr(r) ? (cn(e, n, i, !0), Iu(e, Le(e, !1, t)), n = i = e.position) : e.position === e.lineStart && Zs(e) ? re(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  re(e, "unexpected end of the stream within a single quoted scalar");
}
function gP(e, t) {
  var r, n, i, o, a, s;
  if (s = e.input.charCodeAt(e.position), s !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (s = e.input.charCodeAt(e.position)) !== 0; ) {
    if (s === 34)
      return cn(e, r, e.position, !0), e.position++, !0;
    if (s === 92) {
      if (cn(e, r, e.position, !0), s = e.input.charCodeAt(++e.position), hr(s))
        Le(e, !1, t);
      else if (s < 256 && d0[s])
        e.result += h0[s], e.position++;
      else if ((a = fP(s)) > 0) {
        for (i = a, o = 0; i > 0; i--)
          s = e.input.charCodeAt(++e.position), (a = uP(s)) >= 0 ? o = (o << 4) + a : re(e, "expected hexadecimal character");
        e.result += hP(o), e.position++;
      } else
        re(e, "unknown escape sequence");
      r = n = e.position;
    } else hr(s) ? (cn(e, r, n, !0), Iu(e, Le(e, !1, t)), r = n = e.position) : e.position === e.lineStart && Zs(e) ? re(e, "unexpected end of the document within a double quoted scalar") : (e.position++, n = e.position);
  }
  re(e, "unexpected end of the stream within a double quoted scalar");
}
function $P(e, t) {
  var r = !0, n, i, o, a = e.tag, s, c = e.anchor, f, l, u, p, h, v = /* @__PURE__ */ Object.create(null), _, g, m, E;
  if (E = e.input.charCodeAt(e.position), E === 91)
    l = 93, h = !1, s = [];
  else if (E === 123)
    l = 125, h = !0, s = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), E = e.input.charCodeAt(++e.position); E !== 0; ) {
    if (Le(e, !0, t), E = e.input.charCodeAt(e.position), E === l)
      return e.position++, e.tag = a, e.anchor = c, e.kind = h ? "mapping" : "sequence", e.result = s, !0;
    r ? E === 44 && re(e, "expected the node content, but found ','") : re(e, "missed comma between flow collection entries"), g = _ = m = null, u = p = !1, E === 63 && (f = e.input.charCodeAt(e.position + 1), At(f) && (u = p = !0, e.position++, Le(e, !0, t))), n = e.line, i = e.lineStart, o = e.position, Ci(e, t, Ps, !1, !0), g = e.tag, _ = e.result, Le(e, !0, t), E = e.input.charCodeAt(e.position), (p || e.line === n) && E === 58 && (u = !0, E = e.input.charCodeAt(++e.position), Le(e, !0, t), Ci(e, t, Ps, !1, !0), m = e.result), h ? pi(e, s, v, g, _, m, n, i, o) : u ? s.push(pi(e, null, v, g, _, m, n, i, o)) : s.push(_), Le(e, !0, t), E = e.input.charCodeAt(e.position), E === 44 ? (r = !0, E = e.input.charCodeAt(++e.position)) : r = !1;
  }
  re(e, "unexpected end of the stream within a flow collection");
}
function vP(e, t) {
  var r, n, i = Jc, o = !1, a = !1, s = t, c = 0, f = !1, l, u;
  if (u = e.input.charCodeAt(e.position), u === 124)
    n = !1;
  else if (u === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; u !== 0; )
    if (u = e.input.charCodeAt(++e.position), u === 43 || u === 45)
      Jc === i ? i = u === 43 ? Wh : aP : re(e, "repeat of a chomping mode identifier");
    else if ((l = dP(u)) >= 0)
      l === 0 ? re(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : a ? re(e, "repeat of an indentation width identifier") : (s = t + l - 1, a = !0);
    else
      break;
  if (Vn(u)) {
    do
      u = e.input.charCodeAt(++e.position);
    while (Vn(u));
    if (u === 35)
      do
        u = e.input.charCodeAt(++e.position);
      while (!hr(u) && u !== 0);
  }
  for (; u !== 0; ) {
    for (Ru(e), e.lineIndent = 0, u = e.input.charCodeAt(e.position); (!a || e.lineIndent < s) && u === 32; )
      e.lineIndent++, u = e.input.charCodeAt(++e.position);
    if (!a && e.lineIndent > s && (s = e.lineIndent), hr(u)) {
      c++;
      continue;
    }
    if (e.lineIndent < s) {
      i === Wh ? e.result += In.repeat(`
`, o ? 1 + c : c) : i === Jc && o && (e.result += `
`);
      break;
    }
    for (n ? Vn(u) ? (f = !0, e.result += In.repeat(`
`, o ? 1 + c : c)) : f ? (f = !1, e.result += In.repeat(`
`, c + 1)) : c === 0 ? o && (e.result += " ") : e.result += In.repeat(`
`, c) : e.result += In.repeat(`
`, o ? 1 + c : c), o = !0, a = !0, c = 0, r = e.position; !hr(u) && u !== 0; )
      u = e.input.charCodeAt(++e.position);
    cn(e, r, e.position, !1);
  }
  return !0;
}
function Zh(e, t) {
  var r, n = e.tag, i = e.anchor, o = [], a, s = !1, c;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = o), c = e.input.charCodeAt(e.position); c !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, re(e, "tab characters must not be used in indentation")), !(c !== 45 || (a = e.input.charCodeAt(e.position + 1), !At(a)))); ) {
    if (s = !0, e.position++, Le(e, !0, -1) && e.lineIndent <= t) {
      o.push(null), c = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, Ci(e, t, l0, !1, !0), o.push(e.result), Le(e, !0, -1), c = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > t) && c !== 0)
      re(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return s ? (e.tag = n, e.anchor = i, e.kind = "sequence", e.result = o, !0) : !1;
}
function _P(e, t, r) {
  var n, i, o, a, s, c, f = e.tag, l = e.anchor, u = {}, p = /* @__PURE__ */ Object.create(null), h = null, v = null, _ = null, g = !1, m = !1, E;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = u), E = e.input.charCodeAt(e.position); E !== 0; ) {
    if (!g && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, re(e, "tab characters must not be used in indentation")), n = e.input.charCodeAt(e.position + 1), o = e.line, (E === 63 || E === 58) && At(n))
      E === 63 ? (g && (pi(e, u, p, h, v, null, a, s, c), h = v = _ = null), m = !0, g = !0, i = !0) : g ? (g = !1, i = !0) : re(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, E = n;
    else {
      if (a = e.line, s = e.lineStart, c = e.position, !Ci(e, r, c0, !1, !0))
        break;
      if (e.line === o) {
        for (E = e.input.charCodeAt(e.position); Vn(E); )
          E = e.input.charCodeAt(++e.position);
        if (E === 58)
          E = e.input.charCodeAt(++e.position), At(E) || re(e, "a whitespace character is expected after the key-value separator within a block mapping"), g && (pi(e, u, p, h, v, null, a, s, c), h = v = _ = null), m = !0, g = !1, i = !1, h = e.tag, v = e.result;
        else if (m)
          re(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = f, e.anchor = l, !0;
      } else if (m)
        re(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = f, e.anchor = l, !0;
    }
    if ((e.line === o || e.lineIndent > t) && (g && (a = e.line, s = e.lineStart, c = e.position), Ci(e, t, Ts, !0, i) && (g ? v = e.result : _ = e.result), g || (pi(e, u, p, h, v, _, a, s, c), h = v = _ = null), Le(e, !0, -1), E = e.input.charCodeAt(e.position)), (e.line === o || e.lineIndent > t) && E !== 0)
      re(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return g && pi(e, u, p, h, v, null, a, s, c), m && (e.tag = f, e.anchor = l, e.kind = "mapping", e.result = u), m;
}
function wP(e) {
  var t, r = !1, n = !1, i, o, a;
  if (a = e.input.charCodeAt(e.position), a !== 33) return !1;
  if (e.tag !== null && re(e, "duplication of a tag property"), a = e.input.charCodeAt(++e.position), a === 60 ? (r = !0, a = e.input.charCodeAt(++e.position)) : a === 33 ? (n = !0, i = "!!", a = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, r) {
    do
      a = e.input.charCodeAt(++e.position);
    while (a !== 0 && a !== 62);
    e.position < e.length ? (o = e.input.slice(t, e.position), a = e.input.charCodeAt(++e.position)) : re(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; a !== 0 && !At(a); )
      a === 33 && (n ? re(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), u0.test(i) || re(e, "named tag handle cannot contain such characters"), n = !0, t = e.position + 1)), a = e.input.charCodeAt(++e.position);
    o = e.input.slice(t, e.position), lP.test(o) && re(e, "tag suffix cannot contain flow indicator characters");
  }
  o && !f0.test(o) && re(e, "tag name cannot contain such characters: " + o);
  try {
    o = decodeURIComponent(o);
  } catch {
    re(e, "tag name is malformed: " + o);
  }
  return r ? e.tag = o : dn.call(e.tagMap, i) ? e.tag = e.tagMap[i] + o : i === "!" ? e.tag = "!" + o : i === "!!" ? e.tag = "tag:yaml.org,2002:" + o : re(e, 'undeclared tag handle "' + i + '"'), !0;
}
function EP(e) {
  var t, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && re(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !At(r) && !hi(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && re(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function SP(e) {
  var t, r, n;
  if (n = e.input.charCodeAt(e.position), n !== 42) return !1;
  for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !At(n) && !hi(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && re(e, "name of an alias node must contain at least one character"), r = e.input.slice(t, e.position), dn.call(e.anchorMap, r) || re(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], Le(e, !0, -1), !0;
}
function Ci(e, t, r, n, i) {
  var o, a, s, c = 1, f = !1, l = !1, u, p, h, v, _, g;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, o = a = s = Ts === r || l0 === r, n && Le(e, !0, -1) && (f = !0, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)), c === 1)
    for (; wP(e) || EP(e); )
      Le(e, !0, -1) ? (f = !0, s = o, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)) : s = !1;
  if (s && (s = f || i), (c === 1 || Ts === r) && (Ps === r || c0 === r ? _ = t : _ = t + 1, g = e.position - e.lineStart, c === 1 ? s && (Zh(e, g) || _P(e, g, _)) || $P(e, _) ? l = !0 : (a && vP(e, _) || yP(e, _) || gP(e, _) ? l = !0 : SP(e) ? (l = !0, (e.tag !== null || e.anchor !== null) && re(e, "alias node should not have any properties")) : mP(e, _, Ps === r) && (l = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : c === 0 && (l = s && Zh(e, g))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && re(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), u = 0, p = e.implicitTypes.length; u < p; u += 1)
      if (v = e.implicitTypes[u], v.resolve(e.result)) {
        e.result = v.construct(e.result), e.tag = v.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (dn.call(e.typeMap[e.kind || "fallback"], e.tag))
      v = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (v = null, h = e.typeMap.multi[e.kind || "fallback"], u = 0, p = h.length; u < p; u += 1)
        if (e.tag.slice(0, h[u].tag.length) === h[u].tag) {
          v = h[u];
          break;
        }
    v || re(e, "unknown tag !<" + e.tag + ">"), e.result !== null && v.kind !== e.kind && re(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + v.kind + '", not "' + e.kind + '"'), v.resolve(e.result, e.tag) ? (e.result = v.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : re(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || l;
}
function bP(e) {
  var t = e.position, r, n, i, o = !1, a;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (a = e.input.charCodeAt(e.position)) !== 0 && (Le(e, !0, -1), a = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || a !== 37)); ) {
    for (o = !0, a = e.input.charCodeAt(++e.position), r = e.position; a !== 0 && !At(a); )
      a = e.input.charCodeAt(++e.position);
    for (n = e.input.slice(r, e.position), i = [], n.length < 1 && re(e, "directive name must not be less than one character in length"); a !== 0; ) {
      for (; Vn(a); )
        a = e.input.charCodeAt(++e.position);
      if (a === 35) {
        do
          a = e.input.charCodeAt(++e.position);
        while (a !== 0 && !hr(a));
        break;
      }
      if (hr(a)) break;
      for (r = e.position; a !== 0 && !At(a); )
        a = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(r, e.position));
    }
    a !== 0 && Ru(e), dn.call(Xh, n) ? Xh[n](e, n, i) : Ns(e, 'unknown document directive "' + n + '"');
  }
  if (Le(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, Le(e, !0, -1)) : o && re(e, "directives end mark is expected"), Ci(e, e.lineIndent - 1, Ts, !1, !0), Le(e, !0, -1), e.checkLineBreaks && cP.test(e.input.slice(t, e.position)) && Ns(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Zs(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, Le(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    re(e, "end of the stream or a document separator is expected");
  else
    return;
}
function m0(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new pP(e, t), n = e.indexOf("\0");
  for (n !== -1 && (r.position = n, re(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    bP(r);
  return r.documents;
}
function PP(e, t, r) {
  t !== null && typeof t == "object" && typeof r > "u" && (r = t, t = null);
  var n = m0(e, r);
  if (typeof t != "function")
    return n;
  for (var i = 0, o = n.length; i < o; i += 1)
    t(n[i]);
}
function TP(e, t) {
  var r = m0(e, t);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new s0("expected a single document in the stream, but found more");
  }
}
Ou.loadAll = PP;
Ou.load = TP;
var y0 = {}, ec = rr, ua = la, NP = Cu, g0 = Object.prototype.toString, $0 = Object.prototype.hasOwnProperty, ku = 65279, OP = 9, zo = 10, AP = 13, CP = 32, RP = 33, IP = 34, Ul = 35, kP = 37, DP = 38, FP = 39, jP = 42, v0 = 44, LP = 45, Os = 58, MP = 61, UP = 62, xP = 63, qP = 64, _0 = 91, w0 = 93, VP = 96, E0 = 123, HP = 124, S0 = 125, ht = {};
ht[0] = "\\0";
ht[7] = "\\a";
ht[8] = "\\b";
ht[9] = "\\t";
ht[10] = "\\n";
ht[11] = "\\v";
ht[12] = "\\f";
ht[13] = "\\r";
ht[27] = "\\e";
ht[34] = '\\"';
ht[92] = "\\\\";
ht[133] = "\\N";
ht[160] = "\\_";
ht[8232] = "\\L";
ht[8233] = "\\P";
var GP = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], BP = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function zP(e, t) {
  var r, n, i, o, a, s, c;
  if (t === null) return {};
  for (r = {}, n = Object.keys(t), i = 0, o = n.length; i < o; i += 1)
    a = n[i], s = String(t[a]), a.slice(0, 2) === "!!" && (a = "tag:yaml.org,2002:" + a.slice(2)), c = e.compiledTypeMap.fallback[a], c && $0.call(c.styleAliases, s) && (s = c.styleAliases[s]), r[a] = s;
  return r;
}
function KP(e) {
  var t, r, n;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    r = "x", n = 2;
  else if (e <= 65535)
    r = "u", n = 4;
  else if (e <= 4294967295)
    r = "U", n = 8;
  else
    throw new ua("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + ec.repeat("0", n - t.length) + t;
}
var WP = 1, Ko = 2;
function YP(e) {
  this.schema = e.schema || NP, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = ec.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = zP(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Ko : WP, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function ep(e, t) {
  for (var r = ec.repeat(" ", t), n = 0, i = -1, o = "", a, s = e.length; n < s; )
    i = e.indexOf(`
`, n), i === -1 ? (a = e.slice(n), n = s) : (a = e.slice(n, i + 1), n = i + 1), a.length && a !== `
` && (o += r), o += a;
  return o;
}
function xl(e, t) {
  return `
` + ec.repeat(" ", e.indent * t);
}
function JP(e, t) {
  var r, n, i;
  for (r = 0, n = e.implicitTypes.length; r < n; r += 1)
    if (i = e.implicitTypes[r], i.resolve(t))
      return !0;
  return !1;
}
function As(e) {
  return e === CP || e === OP;
}
function Wo(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== ku || 65536 <= e && e <= 1114111;
}
function tp(e) {
  return Wo(e) && e !== ku && e !== AP && e !== zo;
}
function rp(e, t, r) {
  var n = tp(e), i = n && !As(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      n
    ) : n && e !== v0 && e !== _0 && e !== w0 && e !== E0 && e !== S0) && e !== Ul && !(t === Os && !i) || tp(t) && !As(t) && e === Ul || t === Os && i
  );
}
function XP(e) {
  return Wo(e) && e !== ku && !As(e) && e !== LP && e !== xP && e !== Os && e !== v0 && e !== _0 && e !== w0 && e !== E0 && e !== S0 && e !== Ul && e !== DP && e !== jP && e !== RP && e !== HP && e !== MP && e !== UP && e !== FP && e !== IP && e !== kP && e !== qP && e !== VP;
}
function QP(e) {
  return !As(e) && e !== Os;
}
function wo(e, t) {
  var r = e.charCodeAt(t), n;
  return r >= 55296 && r <= 56319 && t + 1 < e.length && (n = e.charCodeAt(t + 1), n >= 56320 && n <= 57343) ? (r - 55296) * 1024 + n - 56320 + 65536 : r;
}
function b0(e) {
  var t = /^\n* /;
  return t.test(e);
}
var P0 = 1, ql = 2, T0 = 3, N0 = 4, ui = 5;
function ZP(e, t, r, n, i, o, a, s) {
  var c, f = 0, l = null, u = !1, p = !1, h = n !== -1, v = -1, _ = XP(wo(e, 0)) && QP(wo(e, e.length - 1));
  if (t || a)
    for (c = 0; c < e.length; f >= 65536 ? c += 2 : c++) {
      if (f = wo(e, c), !Wo(f))
        return ui;
      _ = _ && rp(f, l, s), l = f;
    }
  else {
    for (c = 0; c < e.length; f >= 65536 ? c += 2 : c++) {
      if (f = wo(e, c), f === zo)
        u = !0, h && (p = p || // Foldable line = too long, and not more-indented.
        c - v - 1 > n && e[v + 1] !== " ", v = c);
      else if (!Wo(f))
        return ui;
      _ = _ && rp(f, l, s), l = f;
    }
    p = p || h && c - v - 1 > n && e[v + 1] !== " ";
  }
  return !u && !p ? _ && !a && !i(e) ? P0 : o === Ko ? ui : ql : r > 9 && b0(e) ? ui : a ? o === Ko ? ui : ql : p ? N0 : T0;
}
function eT(e, t, r, n, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === Ko ? '""' : "''";
    if (!e.noCompatMode && (GP.indexOf(t) !== -1 || BP.test(t)))
      return e.quotingType === Ko ? '"' + t + '"' : "'" + t + "'";
    var o = e.indent * Math.max(1, r), a = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o), s = n || e.flowLevel > -1 && r >= e.flowLevel;
    function c(f) {
      return JP(e, f);
    }
    switch (ZP(
      t,
      s,
      e.indent,
      a,
      c,
      e.quotingType,
      e.forceQuotes && !n,
      i
    )) {
      case P0:
        return t;
      case ql:
        return "'" + t.replace(/'/g, "''") + "'";
      case T0:
        return "|" + np(t, e.indent) + ip(ep(t, o));
      case N0:
        return ">" + np(t, e.indent) + ip(ep(tT(t, a), o));
      case ui:
        return '"' + rT(t) + '"';
      default:
        throw new ua("impossible error: invalid scalar style");
    }
  }();
}
function np(e, t) {
  var r = b0(e) ? String(t) : "", n = e[e.length - 1] === `
`, i = n && (e[e.length - 2] === `
` || e === `
`), o = i ? "+" : n ? "" : "-";
  return r + o + `
`;
}
function ip(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function tT(e, t) {
  for (var r = /(\n+)([^\n]*)/g, n = function() {
    var f = e.indexOf(`
`);
    return f = f !== -1 ? f : e.length, r.lastIndex = f, op(e.slice(0, f), t);
  }(), i = e[0] === `
` || e[0] === " ", o, a; a = r.exec(e); ) {
    var s = a[1], c = a[2];
    o = c[0] === " ", n += s + (!i && !o && c !== "" ? `
` : "") + op(c, t), i = o;
  }
  return n;
}
function op(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, n, i = 0, o, a = 0, s = 0, c = ""; n = r.exec(e); )
    s = n.index, s - i > t && (o = a > i ? a : s, c += `
` + e.slice(i, o), i = o + 1), a = s;
  return c += `
`, e.length - i > t && a > i ? c += e.slice(i, a) + `
` + e.slice(a + 1) : c += e.slice(i), c.slice(1);
}
function rT(e) {
  for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? i += 2 : i++)
    r = wo(e, i), n = ht[r], !n && Wo(r) ? (t += e[i], r >= 65536 && (t += e[i + 1])) : t += n || KP(r);
  return t;
}
function nT(e, t, r) {
  var n = "", i = e.tag, o, a, s;
  for (o = 0, a = r.length; o < a; o += 1)
    s = r[o], e.replacer && (s = e.replacer.call(r, String(o), s)), (Fr(e, t, s, !1, !1) || typeof s > "u" && Fr(e, t, null, !1, !1)) && (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), n += e.dump);
  e.tag = i, e.dump = "[" + n + "]";
}
function ap(e, t, r, n) {
  var i = "", o = e.tag, a, s, c;
  for (a = 0, s = r.length; a < s; a += 1)
    c = r[a], e.replacer && (c = e.replacer.call(r, String(a), c)), (Fr(e, t + 1, c, !0, !0, !1, !0) || typeof c > "u" && Fr(e, t + 1, null, !0, !0, !1, !0)) && ((!n || i !== "") && (i += xl(e, t)), e.dump && zo === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = o, e.dump = i || "[]";
}
function iT(e, t, r) {
  var n = "", i = e.tag, o = Object.keys(r), a, s, c, f, l;
  for (a = 0, s = o.length; a < s; a += 1)
    l = "", n !== "" && (l += ", "), e.condenseFlow && (l += '"'), c = o[a], f = r[c], e.replacer && (f = e.replacer.call(r, c, f)), Fr(e, t, c, !1, !1) && (e.dump.length > 1024 && (l += "? "), l += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), Fr(e, t, f, !1, !1) && (l += e.dump, n += l));
  e.tag = i, e.dump = "{" + n + "}";
}
function oT(e, t, r, n) {
  var i = "", o = e.tag, a = Object.keys(r), s, c, f, l, u, p;
  if (e.sortKeys === !0)
    a.sort();
  else if (typeof e.sortKeys == "function")
    a.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new ua("sortKeys must be a boolean or a function");
  for (s = 0, c = a.length; s < c; s += 1)
    p = "", (!n || i !== "") && (p += xl(e, t)), f = a[s], l = r[f], e.replacer && (l = e.replacer.call(r, f, l)), Fr(e, t + 1, f, !0, !0, !0) && (u = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, u && (e.dump && zo === e.dump.charCodeAt(0) ? p += "?" : p += "? "), p += e.dump, u && (p += xl(e, t)), Fr(e, t + 1, l, !0, u) && (e.dump && zo === e.dump.charCodeAt(0) ? p += ":" : p += ": ", p += e.dump, i += p));
  e.tag = o, e.dump = i || "{}";
}
function sp(e, t, r) {
  var n, i, o, a, s, c;
  for (i = r ? e.explicitTypes : e.implicitTypes, o = 0, a = i.length; o < a; o += 1)
    if (s = i[o], (s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (r ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        if (c = e.styleMap[s.tag] || s.defaultStyle, g0.call(s.represent) === "[object Function]")
          n = s.represent(t, c);
        else if ($0.call(s.represent, c))
          n = s.represent[c](t, c);
        else
          throw new ua("!<" + s.tag + '> tag resolver accepts not "' + c + '" style');
        e.dump = n;
      }
      return !0;
    }
  return !1;
}
function Fr(e, t, r, n, i, o, a) {
  e.tag = null, e.dump = r, sp(e, r, !1) || sp(e, r, !0);
  var s = g0.call(e.dump), c = n, f;
  n && (n = e.flowLevel < 0 || e.flowLevel > t);
  var l = s === "[object Object]" || s === "[object Array]", u, p;
  if (l && (u = e.duplicates.indexOf(r), p = u !== -1), (e.tag !== null && e.tag !== "?" || p || e.indent !== 2 && t > 0) && (i = !1), p && e.usedDuplicates[u])
    e.dump = "*ref_" + u;
  else {
    if (l && p && !e.usedDuplicates[u] && (e.usedDuplicates[u] = !0), s === "[object Object]")
      n && Object.keys(e.dump).length !== 0 ? (oT(e, t, e.dump, i), p && (e.dump = "&ref_" + u + e.dump)) : (iT(e, t, e.dump), p && (e.dump = "&ref_" + u + " " + e.dump));
    else if (s === "[object Array]")
      n && e.dump.length !== 0 ? (e.noArrayIndent && !a && t > 0 ? ap(e, t - 1, e.dump, i) : ap(e, t, e.dump, i), p && (e.dump = "&ref_" + u + e.dump)) : (nT(e, t, e.dump), p && (e.dump = "&ref_" + u + " " + e.dump));
    else if (s === "[object String]")
      e.tag !== "?" && eT(e, e.dump, t, o, c);
    else {
      if (s === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new ua("unacceptable kind of an object to dump " + s);
    }
    e.tag !== null && e.tag !== "?" && (f = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? f = "!" + f : f.slice(0, 18) === "tag:yaml.org,2002:" ? f = "!!" + f.slice(18) : f = "!<" + f + ">", e.dump = f + " " + e.dump);
  }
  return !0;
}
function aT(e, t) {
  var r = [], n = [], i, o;
  for (Vl(e, r, n), i = 0, o = n.length; i < o; i += 1)
    t.duplicates.push(r[n[i]]);
  t.usedDuplicates = new Array(o);
}
function Vl(e, t, r) {
  var n, i, o;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      r.indexOf(i) === -1 && r.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, o = e.length; i < o; i += 1)
        Vl(e[i], t, r);
    else
      for (n = Object.keys(e), i = 0, o = n.length; i < o; i += 1)
        Vl(e[n[i]], t, r);
}
function sT(e, t) {
  t = t || {};
  var r = new YP(t);
  r.noRefs || aT(e, r);
  var n = e;
  return r.replacer && (n = r.replacer.call({ "": n }, "", n)), Fr(r, 0, n, !0, !0) ? r.dump + `
` : "";
}
y0.dump = sT;
var O0 = Ou, cT = y0;
function Du(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
nt.Type = wt;
nt.Schema = qg;
nt.FAILSAFE_SCHEMA = Bg;
nt.JSON_SCHEMA = Xg;
nt.CORE_SCHEMA = Qg;
nt.DEFAULT_SCHEMA = Cu;
nt.load = O0.load;
nt.loadAll = O0.loadAll;
nt.dump = cT.dump;
nt.YAMLException = la;
nt.types = {
  binary: n0,
  float: Jg,
  map: Gg,
  null: zg,
  pairs: o0,
  set: a0,
  timestamp: t0,
  bool: Kg,
  int: Wg,
  merge: r0,
  omap: i0,
  seq: Hg,
  str: Vg
};
nt.safeLoad = Du("safeLoad", "load");
nt.safeLoadAll = Du("safeLoadAll", "loadAll");
nt.safeDump = Du("safeDump", "dump");
var tc = {};
Object.defineProperty(tc, "__esModule", { value: !0 });
tc.Lazy = void 0;
class lT {
  constructor(t) {
    this._value = null, this.creator = t;
  }
  get hasValue() {
    return this.creator == null;
  }
  get value() {
    if (this.creator == null)
      return this._value;
    const t = this.creator();
    return this.value = t, t;
  }
  set value(t) {
    this._value = t, this.creator = null;
  }
}
tc.Lazy = lT;
var Hl = { exports: {} };
const uT = "2.0.0", A0 = 256, fT = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, dT = 16, hT = A0 - 6, pT = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var rc = {
  MAX_LENGTH: A0,
  MAX_SAFE_COMPONENT_LENGTH: dT,
  MAX_SAFE_BUILD_LENGTH: hT,
  MAX_SAFE_INTEGER: fT,
  RELEASE_TYPES: pT,
  SEMVER_SPEC_VERSION: uT,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const mT = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var nc = mT;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: i
  } = rc, o = nc;
  t = e.exports = {};
  const a = t.re = [], s = t.safeRe = [], c = t.src = [], f = t.safeSrc = [], l = t.t = {};
  let u = 0;
  const p = "[a-zA-Z0-9-]", h = [
    ["\\s", 1],
    ["\\d", i],
    [p, n]
  ], v = (g) => {
    for (const [m, E] of h)
      g = g.split(`${m}*`).join(`${m}{0,${E}}`).split(`${m}+`).join(`${m}{1,${E}}`);
    return g;
  }, _ = (g, m, E) => {
    const N = v(m), R = u++;
    o(g, R, m), l[g] = R, c[R] = m, f[R] = N, a[R] = new RegExp(m, E ? "g" : void 0), s[R] = new RegExp(N, E ? "g" : void 0);
  };
  _("NUMERICIDENTIFIER", "0|[1-9]\\d*"), _("NUMERICIDENTIFIERLOOSE", "\\d+"), _("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${p}*`), _("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), _("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), _("PRERELEASEIDENTIFIER", `(?:${c[l.NUMERICIDENTIFIER]}|${c[l.NONNUMERICIDENTIFIER]})`), _("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NUMERICIDENTIFIERLOOSE]}|${c[l.NONNUMERICIDENTIFIER]})`), _("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), _("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), _("BUILDIDENTIFIER", `${p}+`), _("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), _("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), _("FULL", `^${c[l.FULLPLAIN]}$`), _("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), _("LOOSE", `^${c[l.LOOSEPLAIN]}$`), _("GTLT", "((?:<|>)?=?)"), _("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), _("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), _("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), _("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), _("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), _("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), _("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), _("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), _("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), _("COERCERTL", c[l.COERCE], !0), _("COERCERTLFULL", c[l.COERCEFULL], !0), _("LONETILDE", "(?:~>?)"), _("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", _("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), _("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), _("LONECARET", "(?:\\^)"), _("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", _("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), _("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), _("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), _("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), _("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", _("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), _("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), _("STAR", "(<|>)?=?\\s*\\*"), _("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), _("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Hl, Hl.exports);
var fa = Hl.exports;
const yT = Object.freeze({ loose: !0 }), gT = Object.freeze({}), $T = (e) => e ? typeof e != "object" ? yT : e : gT;
var Fu = $T;
const cp = /^[0-9]+$/, C0 = (e, t) => {
  const r = cp.test(e), n = cp.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, vT = (e, t) => C0(t, e);
var R0 = {
  compareIdentifiers: C0,
  rcompareIdentifiers: vT
};
const La = nc, { MAX_LENGTH: lp, MAX_SAFE_INTEGER: Ma } = rc, { safeRe: up, safeSrc: fp, t: Ua } = fa, _T = Fu, { compareIdentifiers: ti } = R0;
let wT = class or {
  constructor(t, r) {
    if (r = _T(r), t instanceof or) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > lp)
      throw new TypeError(
        `version is longer than ${lp} characters`
      );
    La("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? up[Ua.LOOSE] : up[Ua.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > Ma || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Ma || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Ma || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const o = +i;
        if (o >= 0 && o < Ma)
          return o;
      }
      return i;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (La("SemVer.compare", this.version, this.options, t), !(t instanceof or)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new or(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof or || (t = new or(t, this.options)), ti(this.major, t.major) || ti(this.minor, t.minor) || ti(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof or || (t = new or(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], i = t.prerelease[r];
      if (La("prerelease compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return ti(n, i);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof or || (t = new or(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], i = t.build[r];
      if (La("build compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return ti(n, i);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const i = new RegExp(`^${this.options.loose ? fp[Ua.PRERELEASELOOSE] : fp[Ua.PRERELEASE]}$`), o = `-${r}`.match(i);
        if (!o || o[1] !== r)
          throw new Error(`invalid identifier: ${r}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const i = Number(n) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let o = this.prerelease.length;
          for (; --o >= 0; )
            typeof this.prerelease[o] == "number" && (this.prerelease[o]++, o = -2);
          if (o === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (r) {
          let o = [r, i];
          n === !1 && (o = [r]), ti(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = o) : this.prerelease = o;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Et = wT;
const dp = Et, ET = (e, t, r = !1) => {
  if (e instanceof dp)
    return e;
  try {
    return new dp(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Ui = ET;
const ST = Ui, bT = (e, t) => {
  const r = ST(e, t);
  return r ? r.version : null;
};
var PT = bT;
const TT = Ui, NT = (e, t) => {
  const r = TT(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var OT = NT;
const hp = Et, AT = (e, t, r, n, i) => {
  typeof r == "string" && (i = n, n = r, r = void 0);
  try {
    return new hp(
      e instanceof hp ? e.version : e,
      r
    ).inc(t, n, i).version;
  } catch {
    return null;
  }
};
var CT = AT;
const pp = Ui, RT = (e, t) => {
  const r = pp(e, null, !0), n = pp(t, null, !0), i = r.compare(n);
  if (i === 0)
    return null;
  const o = i > 0, a = o ? r : n, s = o ? n : r, c = !!a.prerelease.length;
  if (!!s.prerelease.length && !c) {
    if (!s.patch && !s.minor)
      return "major";
    if (s.compareMain(a) === 0)
      return s.minor && !s.patch ? "minor" : "patch";
  }
  const l = c ? "pre" : "";
  return r.major !== n.major ? l + "major" : r.minor !== n.minor ? l + "minor" : r.patch !== n.patch ? l + "patch" : "prerelease";
};
var IT = RT;
const kT = Et, DT = (e, t) => new kT(e, t).major;
var FT = DT;
const jT = Et, LT = (e, t) => new jT(e, t).minor;
var MT = LT;
const UT = Et, xT = (e, t) => new UT(e, t).patch;
var qT = xT;
const VT = Ui, HT = (e, t) => {
  const r = VT(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var GT = HT;
const mp = Et, BT = (e, t, r) => new mp(e, r).compare(new mp(t, r));
var nr = BT;
const zT = nr, KT = (e, t, r) => zT(t, e, r);
var WT = KT;
const YT = nr, JT = (e, t) => YT(e, t, !0);
var XT = JT;
const yp = Et, QT = (e, t, r) => {
  const n = new yp(e, r), i = new yp(t, r);
  return n.compare(i) || n.compareBuild(i);
};
var ju = QT;
const ZT = ju, eN = (e, t) => e.sort((r, n) => ZT(r, n, t));
var tN = eN;
const rN = ju, nN = (e, t) => e.sort((r, n) => rN(n, r, t));
var iN = nN;
const oN = nr, aN = (e, t, r) => oN(e, t, r) > 0;
var ic = aN;
const sN = nr, cN = (e, t, r) => sN(e, t, r) < 0;
var Lu = cN;
const lN = nr, uN = (e, t, r) => lN(e, t, r) === 0;
var I0 = uN;
const fN = nr, dN = (e, t, r) => fN(e, t, r) !== 0;
var k0 = dN;
const hN = nr, pN = (e, t, r) => hN(e, t, r) >= 0;
var Mu = pN;
const mN = nr, yN = (e, t, r) => mN(e, t, r) <= 0;
var Uu = yN;
const gN = I0, $N = k0, vN = ic, _N = Mu, wN = Lu, EN = Uu, SN = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return gN(e, r, n);
    case "!=":
      return $N(e, r, n);
    case ">":
      return vN(e, r, n);
    case ">=":
      return _N(e, r, n);
    case "<":
      return wN(e, r, n);
    case "<=":
      return EN(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var D0 = SN;
const bN = Et, PN = Ui, { safeRe: xa, t: qa } = fa, TN = (e, t) => {
  if (e instanceof bN)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? xa[qa.COERCEFULL] : xa[qa.COERCE]);
  else {
    const c = t.includePrerelease ? xa[qa.COERCERTLFULL] : xa[qa.COERCERTL];
    let f;
    for (; (f = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || f.index + f[0].length !== r.index + r[0].length) && (r = f), c.lastIndex = f.index + f[1].length + f[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], i = r[3] || "0", o = r[4] || "0", a = t.includePrerelease && r[5] ? `-${r[5]}` : "", s = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return PN(`${n}.${i}.${o}${a}${s}`, t);
};
var NN = TN;
class ON {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var AN = ON, Xc, gp;
function ir() {
  if (gp) return Xc;
  gp = 1;
  const e = /\s+/g;
  class t {
    constructor(U, H) {
      if (H = i(H), U instanceof t)
        return U.loose === !!H.loose && U.includePrerelease === !!H.includePrerelease ? U : new t(U.raw, H);
      if (U instanceof o)
        return this.raw = U.value, this.set = [[U]], this.formatted = void 0, this;
      if (this.options = H, this.loose = !!H.loose, this.includePrerelease = !!H.includePrerelease, this.raw = U.trim().replace(e, " "), this.set = this.raw.split("||").map((x) => this.parseRange(x.trim())).filter((x) => x.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const x = this.set[0];
        if (this.set = this.set.filter((W) => !_(W[0])), this.set.length === 0)
          this.set = [x];
        else if (this.set.length > 1) {
          for (const W of this.set)
            if (W.length === 1 && g(W[0])) {
              this.set = [W];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let U = 0; U < this.set.length; U++) {
          U > 0 && (this.formatted += "||");
          const H = this.set[U];
          for (let x = 0; x < H.length; x++)
            x > 0 && (this.formatted += " "), this.formatted += H[x].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(U) {
      const x = ((this.options.includePrerelease && h) | (this.options.loose && v)) + ":" + U, W = n.get(x);
      if (W)
        return W;
      const z = this.options.loose, I = z ? c[f.HYPHENRANGELOOSE] : c[f.HYPHENRANGE];
      U = U.replace(I, G(this.options.includePrerelease)), a("hyphen replace", U), U = U.replace(c[f.COMPARATORTRIM], l), a("comparator trim", U), U = U.replace(c[f.TILDETRIM], u), a("tilde trim", U), U = U.replace(c[f.CARETTRIM], p), a("caret trim", U);
      let S = U.split(" ").map(($) => E($, this.options)).join(" ").split(/\s+/).map(($) => q($, this.options));
      z && (S = S.filter(($) => (a("loose invalid filter", $, this.options), !!$.match(c[f.COMPARATORLOOSE])))), a("range list", S);
      const A = /* @__PURE__ */ new Map(), b = S.map(($) => new o($, this.options));
      for (const $ of b) {
        if (_($))
          return [$];
        A.set($.value, $);
      }
      A.size > 1 && A.has("") && A.delete("");
      const d = [...A.values()];
      return n.set(x, d), d;
    }
    intersects(U, H) {
      if (!(U instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((x) => m(x, H) && U.set.some((W) => m(W, H) && x.every((z) => W.every((I) => z.intersects(I, H)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(U) {
      if (!U)
        return !1;
      if (typeof U == "string")
        try {
          U = new s(U, this.options);
        } catch {
          return !1;
        }
      for (let H = 0; H < this.set.length; H++)
        if (Y(this.set[H], U, this.options))
          return !0;
      return !1;
    }
  }
  Xc = t;
  const r = AN, n = new r(), i = Fu, o = oc(), a = nc, s = Et, {
    safeRe: c,
    t: f,
    comparatorTrimReplace: l,
    tildeTrimReplace: u,
    caretTrimReplace: p
  } = fa, { FLAG_INCLUDE_PRERELEASE: h, FLAG_LOOSE: v } = rc, _ = (M) => M.value === "<0.0.0-0", g = (M) => M.value === "", m = (M, U) => {
    let H = !0;
    const x = M.slice();
    let W = x.pop();
    for (; H && x.length; )
      H = x.every((z) => W.intersects(z, U)), W = x.pop();
    return H;
  }, E = (M, U) => (a("comp", M, U), M = k(M, U), a("caret", M), M = R(M, U), a("tildes", M), M = V(M, U), a("xrange", M), M = K(M, U), a("stars", M), M), N = (M) => !M || M.toLowerCase() === "x" || M === "*", R = (M, U) => M.trim().split(/\s+/).map((H) => F(H, U)).join(" "), F = (M, U) => {
    const H = U.loose ? c[f.TILDELOOSE] : c[f.TILDE];
    return M.replace(H, (x, W, z, I, S) => {
      a("tilde", M, x, W, z, I, S);
      let A;
      return N(W) ? A = "" : N(z) ? A = `>=${W}.0.0 <${+W + 1}.0.0-0` : N(I) ? A = `>=${W}.${z}.0 <${W}.${+z + 1}.0-0` : S ? (a("replaceTilde pr", S), A = `>=${W}.${z}.${I}-${S} <${W}.${+z + 1}.0-0`) : A = `>=${W}.${z}.${I} <${W}.${+z + 1}.0-0`, a("tilde return", A), A;
    });
  }, k = (M, U) => M.trim().split(/\s+/).map((H) => L(H, U)).join(" "), L = (M, U) => {
    a("caret", M, U);
    const H = U.loose ? c[f.CARETLOOSE] : c[f.CARET], x = U.includePrerelease ? "-0" : "";
    return M.replace(H, (W, z, I, S, A) => {
      a("caret", M, W, z, I, S, A);
      let b;
      return N(z) ? b = "" : N(I) ? b = `>=${z}.0.0${x} <${+z + 1}.0.0-0` : N(S) ? z === "0" ? b = `>=${z}.${I}.0${x} <${z}.${+I + 1}.0-0` : b = `>=${z}.${I}.0${x} <${+z + 1}.0.0-0` : A ? (a("replaceCaret pr", A), z === "0" ? I === "0" ? b = `>=${z}.${I}.${S}-${A} <${z}.${I}.${+S + 1}-0` : b = `>=${z}.${I}.${S}-${A} <${z}.${+I + 1}.0-0` : b = `>=${z}.${I}.${S}-${A} <${+z + 1}.0.0-0`) : (a("no pr"), z === "0" ? I === "0" ? b = `>=${z}.${I}.${S}${x} <${z}.${I}.${+S + 1}-0` : b = `>=${z}.${I}.${S}${x} <${z}.${+I + 1}.0-0` : b = `>=${z}.${I}.${S} <${+z + 1}.0.0-0`), a("caret return", b), b;
    });
  }, V = (M, U) => (a("replaceXRanges", M, U), M.split(/\s+/).map((H) => P(H, U)).join(" ")), P = (M, U) => {
    M = M.trim();
    const H = U.loose ? c[f.XRANGELOOSE] : c[f.XRANGE];
    return M.replace(H, (x, W, z, I, S, A) => {
      a("xRange", M, x, W, z, I, S, A);
      const b = N(z), d = b || N(I), $ = d || N(S), O = $;
      return W === "=" && O && (W = ""), A = U.includePrerelease ? "-0" : "", b ? W === ">" || W === "<" ? x = "<0.0.0-0" : x = "*" : W && O ? (d && (I = 0), S = 0, W === ">" ? (W = ">=", d ? (z = +z + 1, I = 0, S = 0) : (I = +I + 1, S = 0)) : W === "<=" && (W = "<", d ? z = +z + 1 : I = +I + 1), W === "<" && (A = "-0"), x = `${W + z}.${I}.${S}${A}`) : d ? x = `>=${z}.0.0${A} <${+z + 1}.0.0-0` : $ && (x = `>=${z}.${I}.0${A} <${z}.${+I + 1}.0-0`), a("xRange return", x), x;
    });
  }, K = (M, U) => (a("replaceStars", M, U), M.trim().replace(c[f.STAR], "")), q = (M, U) => (a("replaceGTE0", M, U), M.trim().replace(c[U.includePrerelease ? f.GTE0PRE : f.GTE0], "")), G = (M) => (U, H, x, W, z, I, S, A, b, d, $, O) => (N(x) ? H = "" : N(W) ? H = `>=${x}.0.0${M ? "-0" : ""}` : N(z) ? H = `>=${x}.${W}.0${M ? "-0" : ""}` : I ? H = `>=${H}` : H = `>=${H}${M ? "-0" : ""}`, N(b) ? A = "" : N(d) ? A = `<${+b + 1}.0.0-0` : N($) ? A = `<${b}.${+d + 1}.0-0` : O ? A = `<=${b}.${d}.${$}-${O}` : M ? A = `<${b}.${d}.${+$ + 1}-0` : A = `<=${A}`, `${H} ${A}`.trim()), Y = (M, U, H) => {
    for (let x = 0; x < M.length; x++)
      if (!M[x].test(U))
        return !1;
    if (U.prerelease.length && !H.includePrerelease) {
      for (let x = 0; x < M.length; x++)
        if (a(M[x].semver), M[x].semver !== o.ANY && M[x].semver.prerelease.length > 0) {
          const W = M[x].semver;
          if (W.major === U.major && W.minor === U.minor && W.patch === U.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Xc;
}
var Qc, $p;
function oc() {
  if ($p) return Qc;
  $p = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(l, u) {
      if (u = r(u), l instanceof t) {
        if (l.loose === !!u.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), a("comparator", l, u), this.options = u, this.loose = !!u.loose, this.parse(l), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(l) {
      const u = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], p = l.match(u);
      if (!p)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = p[1] !== void 0 ? p[1] : "", this.operator === "=" && (this.operator = ""), p[2] ? this.semver = new s(p[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (a("Comparator.test", l, this.options.loose), this.semver === e || l === e)
        return !0;
      if (typeof l == "string")
        try {
          l = new s(l, this.options);
        } catch {
          return !1;
        }
      return o(l, this.operator, this.semver, this.options);
    }
    intersects(l, u) {
      if (!(l instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(l.value, u).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new c(this.value, u).test(l.semver) : (u = r(u), u.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !u.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || o(this.semver, "<", l.semver, u) && this.operator.startsWith(">") && l.operator.startsWith("<") || o(this.semver, ">", l.semver, u) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  Qc = t;
  const r = Fu, { safeRe: n, t: i } = fa, o = D0, a = nc, s = Et, c = ir();
  return Qc;
}
const CN = ir(), RN = (e, t, r) => {
  try {
    t = new CN(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var ac = RN;
const IN = ir(), kN = (e, t) => new IN(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var DN = kN;
const FN = Et, jN = ir(), LN = (e, t, r) => {
  let n = null, i = null, o = null;
  try {
    o = new jN(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || i.compare(a) === -1) && (n = a, i = new FN(n, r));
  }), n;
};
var MN = LN;
const UN = Et, xN = ir(), qN = (e, t, r) => {
  let n = null, i = null, o = null;
  try {
    o = new xN(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || i.compare(a) === 1) && (n = a, i = new UN(n, r));
  }), n;
};
var VN = qN;
const Zc = Et, HN = ir(), vp = ic, GN = (e, t) => {
  e = new HN(e, t);
  let r = new Zc("0.0.0");
  if (e.test(r) || (r = new Zc("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const i = e.set[n];
    let o = null;
    i.forEach((a) => {
      const s = new Zc(a.semver.version);
      switch (a.operator) {
        case ">":
          s.prerelease.length === 0 ? s.patch++ : s.prerelease.push(0), s.raw = s.format();
        case "":
        case ">=":
          (!o || vp(s, o)) && (o = s);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${a.operator}`);
      }
    }), o && (!r || vp(r, o)) && (r = o);
  }
  return r && e.test(r) ? r : null;
};
var BN = GN;
const zN = ir(), KN = (e, t) => {
  try {
    return new zN(e, t).range || "*";
  } catch {
    return null;
  }
};
var WN = KN;
const YN = Et, F0 = oc(), { ANY: JN } = F0, XN = ir(), QN = ac, _p = ic, wp = Lu, ZN = Uu, eO = Mu, tO = (e, t, r, n) => {
  e = new YN(e, n), t = new XN(t, n);
  let i, o, a, s, c;
  switch (r) {
    case ">":
      i = _p, o = ZN, a = wp, s = ">", c = ">=";
      break;
    case "<":
      i = wp, o = eO, a = _p, s = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (QN(e, t, n))
    return !1;
  for (let f = 0; f < t.set.length; ++f) {
    const l = t.set[f];
    let u = null, p = null;
    if (l.forEach((h) => {
      h.semver === JN && (h = new F0(">=0.0.0")), u = u || h, p = p || h, i(h.semver, u.semver, n) ? u = h : a(h.semver, p.semver, n) && (p = h);
    }), u.operator === s || u.operator === c || (!p.operator || p.operator === s) && o(e, p.semver))
      return !1;
    if (p.operator === c && a(e, p.semver))
      return !1;
  }
  return !0;
};
var xu = tO;
const rO = xu, nO = (e, t, r) => rO(e, t, ">", r);
var iO = nO;
const oO = xu, aO = (e, t, r) => oO(e, t, "<", r);
var sO = aO;
const Ep = ir(), cO = (e, t, r) => (e = new Ep(e, r), t = new Ep(t, r), e.intersects(t, r));
var lO = cO;
const uO = ac, fO = nr;
var dO = (e, t, r) => {
  const n = [];
  let i = null, o = null;
  const a = e.sort((l, u) => fO(l, u, r));
  for (const l of a)
    uO(l, t, r) ? (o = l, i || (i = l)) : (o && n.push([i, o]), o = null, i = null);
  i && n.push([i, null]);
  const s = [];
  for (const [l, u] of n)
    l === u ? s.push(l) : !u && l === a[0] ? s.push("*") : u ? l === a[0] ? s.push(`<=${u}`) : s.push(`${l} - ${u}`) : s.push(`>=${l}`);
  const c = s.join(" || "), f = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < f.length ? c : t;
};
const Sp = ir(), qu = oc(), { ANY: el } = qu, co = ac, Vu = nr, hO = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new Sp(e, r), t = new Sp(t, r);
  let n = !1;
  e: for (const i of e.set) {
    for (const o of t.set) {
      const a = mO(i, o, r);
      if (n = n || a !== null, a)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, pO = [new qu(">=0.0.0-0")], bp = [new qu(">=0.0.0")], mO = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === el) {
    if (t.length === 1 && t[0].semver === el)
      return !0;
    r.includePrerelease ? e = pO : e = bp;
  }
  if (t.length === 1 && t[0].semver === el) {
    if (r.includePrerelease)
      return !0;
    t = bp;
  }
  const n = /* @__PURE__ */ new Set();
  let i, o;
  for (const h of e)
    h.operator === ">" || h.operator === ">=" ? i = Pp(i, h, r) : h.operator === "<" || h.operator === "<=" ? o = Tp(o, h, r) : n.add(h.semver);
  if (n.size > 1)
    return null;
  let a;
  if (i && o) {
    if (a = Vu(i.semver, o.semver, r), a > 0)
      return null;
    if (a === 0 && (i.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const h of n) {
    if (i && !co(h, String(i), r) || o && !co(h, String(o), r))
      return null;
    for (const v of t)
      if (!co(h, String(v), r))
        return !1;
    return !0;
  }
  let s, c, f, l, u = o && !r.includePrerelease && o.semver.prerelease.length ? o.semver : !1, p = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  u && u.prerelease.length === 1 && o.operator === "<" && u.prerelease[0] === 0 && (u = !1);
  for (const h of t) {
    if (l = l || h.operator === ">" || h.operator === ">=", f = f || h.operator === "<" || h.operator === "<=", i) {
      if (p && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === p.major && h.semver.minor === p.minor && h.semver.patch === p.patch && (p = !1), h.operator === ">" || h.operator === ">=") {
        if (s = Pp(i, h, r), s === h && s !== i)
          return !1;
      } else if (i.operator === ">=" && !co(i.semver, String(h), r))
        return !1;
    }
    if (o) {
      if (u && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === u.major && h.semver.minor === u.minor && h.semver.patch === u.patch && (u = !1), h.operator === "<" || h.operator === "<=") {
        if (c = Tp(o, h, r), c === h && c !== o)
          return !1;
      } else if (o.operator === "<=" && !co(o.semver, String(h), r))
        return !1;
    }
    if (!h.operator && (o || i) && a !== 0)
      return !1;
  }
  return !(i && f && !o && a !== 0 || o && l && !i && a !== 0 || p || u);
}, Pp = (e, t, r) => {
  if (!e)
    return t;
  const n = Vu(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Tp = (e, t, r) => {
  if (!e)
    return t;
  const n = Vu(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var yO = hO;
const tl = fa, Np = rc, gO = Et, Op = R0, $O = Ui, vO = PT, _O = OT, wO = CT, EO = IT, SO = FT, bO = MT, PO = qT, TO = GT, NO = nr, OO = WT, AO = XT, CO = ju, RO = tN, IO = iN, kO = ic, DO = Lu, FO = I0, jO = k0, LO = Mu, MO = Uu, UO = D0, xO = NN, qO = oc(), VO = ir(), HO = ac, GO = DN, BO = MN, zO = VN, KO = BN, WO = WN, YO = xu, JO = iO, XO = sO, QO = lO, ZO = dO, eA = yO;
var Hu = {
  parse: $O,
  valid: vO,
  clean: _O,
  inc: wO,
  diff: EO,
  major: SO,
  minor: bO,
  patch: PO,
  prerelease: TO,
  compare: NO,
  rcompare: OO,
  compareLoose: AO,
  compareBuild: CO,
  sort: RO,
  rsort: IO,
  gt: kO,
  lt: DO,
  eq: FO,
  neq: jO,
  gte: LO,
  lte: MO,
  cmp: UO,
  coerce: xO,
  Comparator: qO,
  Range: VO,
  satisfies: HO,
  toComparators: GO,
  maxSatisfying: BO,
  minSatisfying: zO,
  minVersion: KO,
  validRange: WO,
  outside: YO,
  gtr: JO,
  ltr: XO,
  intersects: QO,
  simplifyRange: ZO,
  subset: eA,
  SemVer: gO,
  re: tl.re,
  src: tl.src,
  tokens: tl.t,
  SEMVER_SPEC_VERSION: Np.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Np.RELEASE_TYPES,
  compareIdentifiers: Op.compareIdentifiers,
  rcompareIdentifiers: Op.rcompareIdentifiers
};
const ri = /* @__PURE__ */ zs(Hu);
var da = {}, Cs = { exports: {} };
Cs.exports;
(function(e, t) {
  var r = 200, n = "__lodash_hash_undefined__", i = 1, o = 2, a = 9007199254740991, s = "[object Arguments]", c = "[object Array]", f = "[object AsyncFunction]", l = "[object Boolean]", u = "[object Date]", p = "[object Error]", h = "[object Function]", v = "[object GeneratorFunction]", _ = "[object Map]", g = "[object Number]", m = "[object Null]", E = "[object Object]", N = "[object Promise]", R = "[object Proxy]", F = "[object RegExp]", k = "[object Set]", L = "[object String]", V = "[object Symbol]", P = "[object Undefined]", K = "[object WeakMap]", q = "[object ArrayBuffer]", G = "[object DataView]", Y = "[object Float32Array]", M = "[object Float64Array]", U = "[object Int8Array]", H = "[object Int16Array]", x = "[object Int32Array]", W = "[object Uint8Array]", z = "[object Uint8ClampedArray]", I = "[object Uint16Array]", S = "[object Uint32Array]", A = /[\\^$.*+?()[\]{}|]/g, b = /^\[object .+?Constructor\]$/, d = /^(?:0|[1-9]\d*)$/, $ = {};
  $[Y] = $[M] = $[U] = $[H] = $[x] = $[W] = $[z] = $[I] = $[S] = !0, $[s] = $[c] = $[q] = $[l] = $[G] = $[u] = $[p] = $[h] = $[_] = $[g] = $[E] = $[F] = $[k] = $[L] = $[K] = !1;
  var O = typeof Zt == "object" && Zt && Zt.Object === Object && Zt, w = typeof self == "object" && self && self.Object === Object && self, y = O || w || Function("return this")(), j = t && !t.nodeType && t, C = j && !0 && e && !e.nodeType && e, X = C && C.exports === j, pe = X && O.process, ve = function() {
    try {
      return pe && pe.binding && pe.binding("util");
    } catch {
    }
  }(), be = ve && ve.isTypedArray;
  function Oe(T, D) {
    for (var B = -1, Z = T == null ? 0 : T.length, Pe = 0, se = []; ++B < Z; ) {
      var ke = T[B];
      D(ke, B, T) && (se[Pe++] = ke);
    }
    return se;
  }
  function it(T, D) {
    for (var B = -1, Z = D.length, Pe = T.length; ++B < Z; )
      T[Pe + B] = D[B];
    return T;
  }
  function _e(T, D) {
    for (var B = -1, Z = T == null ? 0 : T.length; ++B < Z; )
      if (D(T[B], B, T))
        return !0;
    return !1;
  }
  function Me(T, D) {
    for (var B = -1, Z = Array(T); ++B < T; )
      Z[B] = D(B);
    return Z;
  }
  function Gt(T) {
    return function(D) {
      return T(D);
    };
  }
  function jt(T, D) {
    return T.has(D);
  }
  function Ct(T, D) {
    return T == null ? void 0 : T[D];
  }
  function Lt(T) {
    var D = -1, B = Array(T.size);
    return T.forEach(function(Z, Pe) {
      B[++D] = [Pe, Z];
    }), B;
  }
  function $r(T, D) {
    return function(B) {
      return T(D(B));
    };
  }
  function vr(T) {
    var D = -1, B = Array(T.size);
    return T.forEach(function(Z) {
      B[++D] = Z;
    }), B;
  }
  var _r = Array.prototype, Rt = Function.prototype, Mt = Object.prototype, wr = y["__core-js_shared__"], Mr = Rt.toString, bt = Mt.hasOwnProperty, Wd = function() {
    var T = /[^.]+$/.exec(wr && wr.keys && wr.keys.IE_PROTO || "");
    return T ? "Symbol(src)_1." + T : "";
  }(), Yd = Mt.toString, R_ = RegExp(
    "^" + Mr.call(bt).replace(A, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Jd = X ? y.Buffer : void 0, ba = y.Symbol, Xd = y.Uint8Array, Qd = Mt.propertyIsEnumerable, I_ = _r.splice, En = ba ? ba.toStringTag : void 0, Zd = Object.getOwnPropertySymbols, k_ = Jd ? Jd.isBuffer : void 0, D_ = $r(Object.keys, Object), Ic = Qn(y, "DataView"), Xi = Qn(y, "Map"), kc = Qn(y, "Promise"), Dc = Qn(y, "Set"), Fc = Qn(y, "WeakMap"), Qi = Qn(Object, "create"), F_ = Pn(Ic), j_ = Pn(Xi), L_ = Pn(kc), M_ = Pn(Dc), U_ = Pn(Fc), eh = ba ? ba.prototype : void 0, jc = eh ? eh.valueOf : void 0;
  function Sn(T) {
    var D = -1, B = T == null ? 0 : T.length;
    for (this.clear(); ++D < B; ) {
      var Z = T[D];
      this.set(Z[0], Z[1]);
    }
  }
  function x_() {
    this.__data__ = Qi ? Qi(null) : {}, this.size = 0;
  }
  function q_(T) {
    var D = this.has(T) && delete this.__data__[T];
    return this.size -= D ? 1 : 0, D;
  }
  function V_(T) {
    var D = this.__data__;
    if (Qi) {
      var B = D[T];
      return B === n ? void 0 : B;
    }
    return bt.call(D, T) ? D[T] : void 0;
  }
  function H_(T) {
    var D = this.__data__;
    return Qi ? D[T] !== void 0 : bt.call(D, T);
  }
  function G_(T, D) {
    var B = this.__data__;
    return this.size += this.has(T) ? 0 : 1, B[T] = Qi && D === void 0 ? n : D, this;
  }
  Sn.prototype.clear = x_, Sn.prototype.delete = q_, Sn.prototype.get = V_, Sn.prototype.has = H_, Sn.prototype.set = G_;
  function Er(T) {
    var D = -1, B = T == null ? 0 : T.length;
    for (this.clear(); ++D < B; ) {
      var Z = T[D];
      this.set(Z[0], Z[1]);
    }
  }
  function B_() {
    this.__data__ = [], this.size = 0;
  }
  function z_(T) {
    var D = this.__data__, B = Ta(D, T);
    if (B < 0)
      return !1;
    var Z = D.length - 1;
    return B == Z ? D.pop() : I_.call(D, B, 1), --this.size, !0;
  }
  function K_(T) {
    var D = this.__data__, B = Ta(D, T);
    return B < 0 ? void 0 : D[B][1];
  }
  function W_(T) {
    return Ta(this.__data__, T) > -1;
  }
  function Y_(T, D) {
    var B = this.__data__, Z = Ta(B, T);
    return Z < 0 ? (++this.size, B.push([T, D])) : B[Z][1] = D, this;
  }
  Er.prototype.clear = B_, Er.prototype.delete = z_, Er.prototype.get = K_, Er.prototype.has = W_, Er.prototype.set = Y_;
  function bn(T) {
    var D = -1, B = T == null ? 0 : T.length;
    for (this.clear(); ++D < B; ) {
      var Z = T[D];
      this.set(Z[0], Z[1]);
    }
  }
  function J_() {
    this.size = 0, this.__data__ = {
      hash: new Sn(),
      map: new (Xi || Er)(),
      string: new Sn()
    };
  }
  function X_(T) {
    var D = Na(this, T).delete(T);
    return this.size -= D ? 1 : 0, D;
  }
  function Q_(T) {
    return Na(this, T).get(T);
  }
  function Z_(T) {
    return Na(this, T).has(T);
  }
  function ew(T, D) {
    var B = Na(this, T), Z = B.size;
    return B.set(T, D), this.size += B.size == Z ? 0 : 1, this;
  }
  bn.prototype.clear = J_, bn.prototype.delete = X_, bn.prototype.get = Q_, bn.prototype.has = Z_, bn.prototype.set = ew;
  function Pa(T) {
    var D = -1, B = T == null ? 0 : T.length;
    for (this.__data__ = new bn(); ++D < B; )
      this.add(T[D]);
  }
  function tw(T) {
    return this.__data__.set(T, n), this;
  }
  function rw(T) {
    return this.__data__.has(T);
  }
  Pa.prototype.add = Pa.prototype.push = tw, Pa.prototype.has = rw;
  function Ur(T) {
    var D = this.__data__ = new Er(T);
    this.size = D.size;
  }
  function nw() {
    this.__data__ = new Er(), this.size = 0;
  }
  function iw(T) {
    var D = this.__data__, B = D.delete(T);
    return this.size = D.size, B;
  }
  function ow(T) {
    return this.__data__.get(T);
  }
  function aw(T) {
    return this.__data__.has(T);
  }
  function sw(T, D) {
    var B = this.__data__;
    if (B instanceof Er) {
      var Z = B.__data__;
      if (!Xi || Z.length < r - 1)
        return Z.push([T, D]), this.size = ++B.size, this;
      B = this.__data__ = new bn(Z);
    }
    return B.set(T, D), this.size = B.size, this;
  }
  Ur.prototype.clear = nw, Ur.prototype.delete = iw, Ur.prototype.get = ow, Ur.prototype.has = aw, Ur.prototype.set = sw;
  function cw(T, D) {
    var B = Oa(T), Z = !B && Sw(T), Pe = !B && !Z && Lc(T), se = !B && !Z && !Pe && lh(T), ke = B || Z || Pe || se, Ge = ke ? Me(T.length, String) : [], Ye = Ge.length;
    for (var Re in T)
      bt.call(T, Re) && !(ke && // Safari 9 has enumerable `arguments.length` in strict mode.
      (Re == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      Pe && (Re == "offset" || Re == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      se && (Re == "buffer" || Re == "byteLength" || Re == "byteOffset") || // Skip index properties.
      $w(Re, Ye))) && Ge.push(Re);
    return Ge;
  }
  function Ta(T, D) {
    for (var B = T.length; B--; )
      if (oh(T[B][0], D))
        return B;
    return -1;
  }
  function lw(T, D, B) {
    var Z = D(T);
    return Oa(T) ? Z : it(Z, B(T));
  }
  function Zi(T) {
    return T == null ? T === void 0 ? P : m : En && En in Object(T) ? yw(T) : Ew(T);
  }
  function th(T) {
    return eo(T) && Zi(T) == s;
  }
  function rh(T, D, B, Z, Pe) {
    return T === D ? !0 : T == null || D == null || !eo(T) && !eo(D) ? T !== T && D !== D : uw(T, D, B, Z, rh, Pe);
  }
  function uw(T, D, B, Z, Pe, se) {
    var ke = Oa(T), Ge = Oa(D), Ye = ke ? c : xr(T), Re = Ge ? c : xr(D);
    Ye = Ye == s ? E : Ye, Re = Re == s ? E : Re;
    var It = Ye == E, Bt = Re == E, ot = Ye == Re;
    if (ot && Lc(T)) {
      if (!Lc(D))
        return !1;
      ke = !0, It = !1;
    }
    if (ot && !It)
      return se || (se = new Ur()), ke || lh(T) ? nh(T, D, B, Z, Pe, se) : pw(T, D, Ye, B, Z, Pe, se);
    if (!(B & i)) {
      var Ut = It && bt.call(T, "__wrapped__"), xt = Bt && bt.call(D, "__wrapped__");
      if (Ut || xt) {
        var qr = Ut ? T.value() : T, Sr = xt ? D.value() : D;
        return se || (se = new Ur()), Pe(qr, Sr, B, Z, se);
      }
    }
    return ot ? (se || (se = new Ur()), mw(T, D, B, Z, Pe, se)) : !1;
  }
  function fw(T) {
    if (!ch(T) || _w(T))
      return !1;
    var D = ah(T) ? R_ : b;
    return D.test(Pn(T));
  }
  function dw(T) {
    return eo(T) && sh(T.length) && !!$[Zi(T)];
  }
  function hw(T) {
    if (!ww(T))
      return D_(T);
    var D = [];
    for (var B in Object(T))
      bt.call(T, B) && B != "constructor" && D.push(B);
    return D;
  }
  function nh(T, D, B, Z, Pe, se) {
    var ke = B & i, Ge = T.length, Ye = D.length;
    if (Ge != Ye && !(ke && Ye > Ge))
      return !1;
    var Re = se.get(T);
    if (Re && se.get(D))
      return Re == D;
    var It = -1, Bt = !0, ot = B & o ? new Pa() : void 0;
    for (se.set(T, D), se.set(D, T); ++It < Ge; ) {
      var Ut = T[It], xt = D[It];
      if (Z)
        var qr = ke ? Z(xt, Ut, It, D, T, se) : Z(Ut, xt, It, T, D, se);
      if (qr !== void 0) {
        if (qr)
          continue;
        Bt = !1;
        break;
      }
      if (ot) {
        if (!_e(D, function(Sr, Tn) {
          if (!jt(ot, Tn) && (Ut === Sr || Pe(Ut, Sr, B, Z, se)))
            return ot.push(Tn);
        })) {
          Bt = !1;
          break;
        }
      } else if (!(Ut === xt || Pe(Ut, xt, B, Z, se))) {
        Bt = !1;
        break;
      }
    }
    return se.delete(T), se.delete(D), Bt;
  }
  function pw(T, D, B, Z, Pe, se, ke) {
    switch (B) {
      case G:
        if (T.byteLength != D.byteLength || T.byteOffset != D.byteOffset)
          return !1;
        T = T.buffer, D = D.buffer;
      case q:
        return !(T.byteLength != D.byteLength || !se(new Xd(T), new Xd(D)));
      case l:
      case u:
      case g:
        return oh(+T, +D);
      case p:
        return T.name == D.name && T.message == D.message;
      case F:
      case L:
        return T == D + "";
      case _:
        var Ge = Lt;
      case k:
        var Ye = Z & i;
        if (Ge || (Ge = vr), T.size != D.size && !Ye)
          return !1;
        var Re = ke.get(T);
        if (Re)
          return Re == D;
        Z |= o, ke.set(T, D);
        var It = nh(Ge(T), Ge(D), Z, Pe, se, ke);
        return ke.delete(T), It;
      case V:
        if (jc)
          return jc.call(T) == jc.call(D);
    }
    return !1;
  }
  function mw(T, D, B, Z, Pe, se) {
    var ke = B & i, Ge = ih(T), Ye = Ge.length, Re = ih(D), It = Re.length;
    if (Ye != It && !ke)
      return !1;
    for (var Bt = Ye; Bt--; ) {
      var ot = Ge[Bt];
      if (!(ke ? ot in D : bt.call(D, ot)))
        return !1;
    }
    var Ut = se.get(T);
    if (Ut && se.get(D))
      return Ut == D;
    var xt = !0;
    se.set(T, D), se.set(D, T);
    for (var qr = ke; ++Bt < Ye; ) {
      ot = Ge[Bt];
      var Sr = T[ot], Tn = D[ot];
      if (Z)
        var uh = ke ? Z(Tn, Sr, ot, D, T, se) : Z(Sr, Tn, ot, T, D, se);
      if (!(uh === void 0 ? Sr === Tn || Pe(Sr, Tn, B, Z, se) : uh)) {
        xt = !1;
        break;
      }
      qr || (qr = ot == "constructor");
    }
    if (xt && !qr) {
      var Aa = T.constructor, Ca = D.constructor;
      Aa != Ca && "constructor" in T && "constructor" in D && !(typeof Aa == "function" && Aa instanceof Aa && typeof Ca == "function" && Ca instanceof Ca) && (xt = !1);
    }
    return se.delete(T), se.delete(D), xt;
  }
  function ih(T) {
    return lw(T, Tw, gw);
  }
  function Na(T, D) {
    var B = T.__data__;
    return vw(D) ? B[typeof D == "string" ? "string" : "hash"] : B.map;
  }
  function Qn(T, D) {
    var B = Ct(T, D);
    return fw(B) ? B : void 0;
  }
  function yw(T) {
    var D = bt.call(T, En), B = T[En];
    try {
      T[En] = void 0;
      var Z = !0;
    } catch {
    }
    var Pe = Yd.call(T);
    return Z && (D ? T[En] = B : delete T[En]), Pe;
  }
  var gw = Zd ? function(T) {
    return T == null ? [] : (T = Object(T), Oe(Zd(T), function(D) {
      return Qd.call(T, D);
    }));
  } : Nw, xr = Zi;
  (Ic && xr(new Ic(new ArrayBuffer(1))) != G || Xi && xr(new Xi()) != _ || kc && xr(kc.resolve()) != N || Dc && xr(new Dc()) != k || Fc && xr(new Fc()) != K) && (xr = function(T) {
    var D = Zi(T), B = D == E ? T.constructor : void 0, Z = B ? Pn(B) : "";
    if (Z)
      switch (Z) {
        case F_:
          return G;
        case j_:
          return _;
        case L_:
          return N;
        case M_:
          return k;
        case U_:
          return K;
      }
    return D;
  });
  function $w(T, D) {
    return D = D ?? a, !!D && (typeof T == "number" || d.test(T)) && T > -1 && T % 1 == 0 && T < D;
  }
  function vw(T) {
    var D = typeof T;
    return D == "string" || D == "number" || D == "symbol" || D == "boolean" ? T !== "__proto__" : T === null;
  }
  function _w(T) {
    return !!Wd && Wd in T;
  }
  function ww(T) {
    var D = T && T.constructor, B = typeof D == "function" && D.prototype || Mt;
    return T === B;
  }
  function Ew(T) {
    return Yd.call(T);
  }
  function Pn(T) {
    if (T != null) {
      try {
        return Mr.call(T);
      } catch {
      }
      try {
        return T + "";
      } catch {
      }
    }
    return "";
  }
  function oh(T, D) {
    return T === D || T !== T && D !== D;
  }
  var Sw = th(/* @__PURE__ */ function() {
    return arguments;
  }()) ? th : function(T) {
    return eo(T) && bt.call(T, "callee") && !Qd.call(T, "callee");
  }, Oa = Array.isArray;
  function bw(T) {
    return T != null && sh(T.length) && !ah(T);
  }
  var Lc = k_ || Ow;
  function Pw(T, D) {
    return rh(T, D);
  }
  function ah(T) {
    if (!ch(T))
      return !1;
    var D = Zi(T);
    return D == h || D == v || D == f || D == R;
  }
  function sh(T) {
    return typeof T == "number" && T > -1 && T % 1 == 0 && T <= a;
  }
  function ch(T) {
    var D = typeof T;
    return T != null && (D == "object" || D == "function");
  }
  function eo(T) {
    return T != null && typeof T == "object";
  }
  var lh = be ? Gt(be) : dw;
  function Tw(T) {
    return bw(T) ? cw(T) : hw(T);
  }
  function Nw() {
    return [];
  }
  function Ow() {
    return !1;
  }
  e.exports = Pw;
})(Cs, Cs.exports);
var tA = Cs.exports;
Object.defineProperty(da, "__esModule", { value: !0 });
da.DownloadedUpdateHelper = void 0;
da.createTempUpdateFile = aA;
const rA = ra, nA = mn, Ap = tA, Rn = yn, Oo = me;
class iA {
  constructor(t) {
    this.cacheDir = t, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
  }
  get downloadedFileInfo() {
    return this._downloadedFileInfo;
  }
  get file() {
    return this._file;
  }
  get packageFile() {
    return this._packageFile;
  }
  get cacheDirForPendingUpdate() {
    return Oo.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, r, n, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return Ap(this.versionInfo, r) && Ap(this.fileInfo.info, n.info) && await (0, Rn.pathExists)(t) ? t : null;
    const o = await this.getValidCachedUpdateFile(n, i);
    return o === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = o, o);
  }
  async setDownloadedFile(t, r, n, i, o, a) {
    this._file = t, this._packageFile = r, this.versionInfo = n, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: o,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, a && await (0, Rn.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, Rn.emptyDir)(this.cacheDirForPendingUpdate);
    } catch {
    }
  }
  /**
   * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
   * @param fileInfo
   * @param logger
   */
  async getValidCachedUpdateFile(t, r) {
    const n = this.getUpdateInfoFile();
    if (!await (0, Rn.pathExists)(n))
      return null;
    let o;
    try {
      o = await (0, Rn.readJson)(n);
    } catch (f) {
      let l = "No cached update info available";
      return f.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), l += ` (error on read: ${f.message})`), r.info(l), null;
    }
    if (!((o == null ? void 0 : o.fileName) !== null))
      return r.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== o.sha512)
      return r.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${o.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const s = Oo.join(this.cacheDirForPendingUpdate, o.fileName);
    if (!await (0, Rn.pathExists)(s))
      return r.info("Cached update file doesn't exist"), null;
    const c = await oA(s);
    return t.info.sha512 !== c ? (r.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${c}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = o, s);
  }
  getUpdateInfoFile() {
    return Oo.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
da.DownloadedUpdateHelper = iA;
function oA(e, t = "sha512", r = "base64", n) {
  return new Promise((i, o) => {
    const a = (0, rA.createHash)(t);
    a.on("error", o).setEncoding(r), (0, nA.createReadStream)(e, {
      ...n,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", o).on("end", () => {
      a.end(), i(a.read());
    }).pipe(a, { end: !1 });
  });
}
async function aA(e, t, r) {
  let n = 0, i = Oo.join(t, e);
  for (let o = 0; o < 3; o++)
    try {
      return await (0, Rn.unlink)(i), i;
    } catch (a) {
      if (a.code === "ENOENT")
        return i;
      r.warn(`Error on remove temp update file: ${a}`), i = Oo.join(t, `${n++}-${e}`);
    }
  return i;
}
var sc = {}, Gu = {};
Object.defineProperty(Gu, "__esModule", { value: !0 });
Gu.getAppCacheDir = cA;
const rl = me, sA = Gs;
function cA() {
  const e = (0, sA.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || rl.join(e, "AppData", "Local") : process.platform === "darwin" ? t = rl.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || rl.join(e, ".cache"), t;
}
Object.defineProperty(sc, "__esModule", { value: !0 });
sc.ElectronAppAdapter = void 0;
const Cp = me, lA = Gu;
class uA {
  constructor(t = Dr.app) {
    this.app = t;
  }
  whenReady() {
    return this.app.whenReady();
  }
  get version() {
    return this.app.getVersion();
  }
  get name() {
    return this.app.getName();
  }
  get isPackaged() {
    return this.app.isPackaged === !0;
  }
  get appUpdateConfigPath() {
    return this.isPackaged ? Cp.join(process.resourcesPath, "app-update.yml") : Cp.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, lA.getAppCacheDir)();
  }
  quit() {
    this.app.quit();
  }
  relaunch() {
    this.app.relaunch();
  }
  onQuit(t) {
    this.app.once("quit", (r, n) => t(n));
  }
}
sc.ElectronAppAdapter = uA;
var j0 = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = r;
  const t = Ke;
  e.NET_SESSION_NAME = "electron-updater";
  function r() {
    return Dr.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class n extends t.HttpExecutor {
    constructor(o) {
      super(), this.proxyLoginCallback = o, this.cachedSession = null;
    }
    async download(o, a, s) {
      return await s.cancellationToken.createPromise((c, f, l) => {
        const u = {
          headers: s.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(o, u), (0, t.configureRequestOptions)(u), this.doDownload(u, {
          destination: a,
          options: s,
          onCancel: l,
          callback: (p) => {
            p == null ? c(a) : f(p);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(o, a) {
      o.headers && o.headers.Host && (o.host = o.headers.Host, delete o.headers.Host), this.cachedSession == null && (this.cachedSession = r());
      const s = Dr.net.request({
        ...o,
        session: this.cachedSession
      });
      return s.on("response", a), this.proxyLoginCallback != null && s.on("login", this.proxyLoginCallback), s;
    }
    addRedirectHandlers(o, a, s, c, f) {
      o.on("redirect", (l, u, p) => {
        o.abort(), c > this.maxRedirects ? s(this.createMaxRedirectError()) : f(t.HttpExecutor.prepareRedirectUrlOptions(p, a));
      });
    }
  }
  e.ElectronHttpExecutor = n;
})(j0);
var ha = {}, Ht = {}, fA = "[object Symbol]", L0 = /[\\^$.*+?()[\]{}|]/g, dA = RegExp(L0.source), hA = typeof Zt == "object" && Zt && Zt.Object === Object && Zt, pA = typeof self == "object" && self && self.Object === Object && self, mA = hA || pA || Function("return this")(), yA = Object.prototype, gA = yA.toString, Rp = mA.Symbol, Ip = Rp ? Rp.prototype : void 0, kp = Ip ? Ip.toString : void 0;
function $A(e) {
  if (typeof e == "string")
    return e;
  if (_A(e))
    return kp ? kp.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function vA(e) {
  return !!e && typeof e == "object";
}
function _A(e) {
  return typeof e == "symbol" || vA(e) && gA.call(e) == fA;
}
function wA(e) {
  return e == null ? "" : $A(e);
}
function EA(e) {
  return e = wA(e), e && dA.test(e) ? e.replace(L0, "\\$&") : e;
}
var SA = EA;
Object.defineProperty(Ht, "__esModule", { value: !0 });
Ht.newBaseUrl = PA;
Ht.newUrlFromBase = Gl;
Ht.getChannelFilename = TA;
Ht.blockmapFiles = NA;
const M0 = ji, bA = SA;
function PA(e) {
  const t = new M0.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function Gl(e, t, r = !1) {
  const n = new M0.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? n.search = i : r && (n.search = `noCache=${Date.now().toString(32)}`), n;
}
function TA(e) {
  return `${e}.yml`;
}
function NA(e, t, r) {
  const n = Gl(`${e.pathname}.blockmap`, e);
  return [Gl(`${e.pathname.replace(new RegExp(bA(r), "g"), t)}.blockmap`, e), n];
}
var We = {};
Object.defineProperty(We, "__esModule", { value: !0 });
We.Provider = void 0;
We.findFile = CA;
We.parseUpdateInfo = RA;
We.getFileList = U0;
We.resolveFiles = IA;
const hn = Ke, OA = nt, Dp = Ht;
class AA {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  get isUseMultipleRangeRequest() {
    return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
  }
  getChannelFilePrefix() {
    if (this.runtimeOptions.platform === "linux") {
      const t = process.env.TEST_UPDATER_ARCH || process.arch;
      return "-linux" + (t === "x64" ? "" : `-${t}`);
    } else
      return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
  }
  // due to historical reasons for windows we use channel name without platform specifier
  getDefaultChannelName() {
    return this.getCustomChannelName("latest");
  }
  getCustomChannelName(t) {
    return `${t}${this.getChannelFilePrefix()}`;
  }
  get fileExtraDownloadHeaders() {
    return null;
  }
  setRequestHeaders(t) {
    this.requestHeaders = t;
  }
  /**
   * Method to perform API request only to resolve update info, but not to download update.
   */
  httpRequest(t, r, n) {
    return this.executor.request(this.createRequestOptions(t, r), n);
  }
  createRequestOptions(t, r) {
    const n = {};
    return this.requestHeaders == null ? r != null && (n.headers = r) : n.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }, (0, hn.configureRequestUrl)(t, n), n;
  }
}
We.Provider = AA;
function CA(e, t, r) {
  if (e.length === 0)
    throw (0, hn.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const n = e.find((i) => i.url.pathname.toLowerCase().endsWith(`.${t}`));
  return n ?? (r == null ? e[0] : e.find((i) => !r.some((o) => i.url.pathname.toLowerCase().endsWith(`.${o}`))));
}
function RA(e, t, r) {
  if (e == null)
    throw (0, hn.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let n;
  try {
    n = (0, OA.load)(e);
  } catch (i) {
    throw (0, hn.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return n;
}
function U0(e) {
  const t = e.files;
  if (t != null && t.length > 0)
    return t;
  if (e.path != null)
    return [
      {
        url: e.path,
        sha2: e.sha2,
        sha512: e.sha512
      }
    ];
  throw (0, hn.newError)(`No files provided: ${(0, hn.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function IA(e, t, r = (n) => n) {
  const i = U0(e).map((s) => {
    if (s.sha2 == null && s.sha512 == null)
      throw (0, hn.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, hn.safeStringifyJson)(s)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, Dp.newUrlFromBase)(r(s.url), t),
      info: s
    };
  }), o = e.packages, a = o == null ? null : o[process.arch] || o.ia32;
  return a != null && (i[0].packageInfo = {
    ...a,
    path: (0, Dp.newUrlFromBase)(r(a.path), t).href
  }), i;
}
Object.defineProperty(ha, "__esModule", { value: !0 });
ha.GenericProvider = void 0;
const Fp = Ke, nl = Ht, il = We;
class kA extends il.Provider {
  constructor(t, r, n) {
    super(n), this.configuration = t, this.updater = r, this.baseUrl = (0, nl.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, nl.getChannelFilename)(this.channel), r = (0, nl.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let n = 0; ; n++)
      try {
        return (0, il.parseUpdateInfo)(await this.httpRequest(r), t, r);
      } catch (i) {
        if (i instanceof Fp.HttpError && i.statusCode === 404)
          throw (0, Fp.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && n < 3) {
          await new Promise((o, a) => {
            try {
              setTimeout(o, 1e3 * n);
            } catch (s) {
              a(s);
            }
          });
          continue;
        }
        throw i;
      }
  }
  resolveFiles(t) {
    return (0, il.resolveFiles)(t, this.baseUrl);
  }
}
ha.GenericProvider = kA;
var cc = {}, lc = {};
Object.defineProperty(lc, "__esModule", { value: !0 });
lc.BitbucketProvider = void 0;
const jp = Ke, ol = Ht, al = We;
class DA extends al.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r;
    const { owner: i, slug: o } = t;
    this.baseUrl = (0, ol.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${o}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new jp.CancellationToken(), r = (0, ol.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, ol.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, void 0, t);
      return (0, al.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, jp.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, al.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: r } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${r}, channel: ${this.channel})`;
  }
}
lc.BitbucketProvider = DA;
var pn = {};
Object.defineProperty(pn, "__esModule", { value: !0 });
pn.GitHubProvider = pn.BaseGitHubProvider = void 0;
pn.computeReleaseNotes = q0;
const Tr = Ke, mi = Hu, FA = ji, yi = Ht, Bl = We, sl = /\/tag\/([^/]+)$/;
class x0 extends Bl.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, yi.newBaseUrl)((0, Tr.githubUrl)(t, r));
    const i = r === "github.com" ? "api.github.com" : r;
    this.baseApiUrl = (0, yi.newBaseUrl)((0, Tr.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const r = this.options.host;
    return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${t}` : t;
  }
}
pn.BaseGitHubProvider = x0;
class jA extends x0 {
  constructor(t, r, n) {
    super(t, "github.com", n), this.options = t, this.updater = r;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, r, n, i, o;
    const a = new Tr.CancellationToken(), s = await this.httpRequest((0, yi.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, a), c = (0, Tr.parseXml)(s);
    let f = c.element("entry", !1, "No published versions on GitHub"), l = null;
    try {
      if (this.updater.allowPrerelease) {
        const g = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((r = mi.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
        if (g === null)
          l = sl.exec(f.element("link").attribute("href"))[1];
        else
          for (const m of c.getElements("entry")) {
            const E = sl.exec(m.element("link").attribute("href"));
            if (E === null)
              continue;
            const N = E[1], R = ((n = mi.prerelease(N)) === null || n === void 0 ? void 0 : n[0]) || null, F = !g || ["alpha", "beta"].includes(g), k = R !== null && !["alpha", "beta"].includes(String(R));
            if (F && !k && !(g === "beta" && R === "alpha")) {
              l = N;
              break;
            }
            if (R && R === g) {
              l = N;
              break;
            }
          }
      } else {
        l = await this.getLatestTagName(a);
        for (const g of c.getElements("entry"))
          if (sl.exec(g.element("link").attribute("href"))[1] === l) {
            f = g;
            break;
          }
      }
    } catch (g) {
      throw (0, Tr.newError)(`Cannot parse releases feed: ${g.stack || g.message},
XML:
${s}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (l == null)
      throw (0, Tr.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let u, p = "", h = "";
    const v = async (g) => {
      p = (0, yi.getChannelFilename)(g), h = (0, yi.newUrlFromBase)(this.getBaseDownloadPath(String(l), p), this.baseUrl);
      const m = this.createRequestOptions(h);
      try {
        return await this.executor.request(m, a);
      } catch (E) {
        throw E instanceof Tr.HttpError && E.statusCode === 404 ? (0, Tr.newError)(`Cannot find ${p} in the latest release artifacts (${h}): ${E.stack || E.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : E;
      }
    };
    try {
      let g = this.channel;
      this.updater.allowPrerelease && (!((i = mi.prerelease(l)) === null || i === void 0) && i[0]) && (g = this.getCustomChannelName(String((o = mi.prerelease(l)) === null || o === void 0 ? void 0 : o[0]))), u = await v(g);
    } catch (g) {
      if (this.updater.allowPrerelease)
        u = await v(this.getDefaultChannelName());
      else
        throw g;
    }
    const _ = (0, Bl.parseUpdateInfo)(u, p, h);
    return _.releaseName == null && (_.releaseName = f.elementValueOrEmpty("title")), _.releaseNotes == null && (_.releaseNotes = q0(this.updater.currentVersion, this.updater.fullChangelog, c, f)), {
      tag: l,
      ..._
    };
  }
  async getLatestTagName(t) {
    const r = this.options, n = r.host == null || r.host === "github.com" ? (0, yi.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new FA.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(n, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, Tr.newError)(`Unable to find latest version on GitHub (${n}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, Bl.resolveFiles)(t, this.baseUrl, (r) => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, r) {
    return `${this.basePath}/download/${t}/${r}`;
  }
}
pn.GitHubProvider = jA;
function Lp(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function q0(e, t, r, n) {
  if (!t)
    return Lp(n);
  const i = [];
  for (const o of r.getElements("entry")) {
    const a = /\/tag\/v?([^/]+)$/.exec(o.element("link").attribute("href"))[1];
    mi.lt(e, a) && i.push({
      version: a,
      note: Lp(o)
    });
  }
  return i.sort((o, a) => mi.rcompare(o.version, a.version));
}
var uc = {};
Object.defineProperty(uc, "__esModule", { value: !0 });
uc.KeygenProvider = void 0;
const Mp = Ke, cl = Ht, ll = We;
class LA extends ll.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r, this.baseUrl = (0, cl.newBaseUrl)(`https://api.keygen.sh/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new Mp.CancellationToken(), r = (0, cl.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, cl.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, ll.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, Mp.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, ll.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: r, platform: n } = this.configuration;
    return `Keygen (account: ${t}, product: ${r}, platform: ${n}, channel: ${this.channel})`;
  }
}
uc.KeygenProvider = LA;
var fc = {};
Object.defineProperty(fc, "__esModule", { value: !0 });
fc.PrivateGitHubProvider = void 0;
const ni = Ke, MA = nt, UA = me, Up = ji, xp = Ht, xA = pn, qA = We;
class VA extends xA.BaseGitHubProvider {
  constructor(t, r, n, i) {
    super(t, "api.github.com", i), this.updater = r, this.token = n;
  }
  createRequestOptions(t, r) {
    const n = super.createRequestOptions(t, r);
    return n.redirect = "manual", n;
  }
  async getLatestVersion() {
    const t = new ni.CancellationToken(), r = (0, xp.getChannelFilename)(this.getDefaultChannelName()), n = await this.getLatestVersionInfo(t), i = n.assets.find((s) => s.name === r);
    if (i == null)
      throw (0, ni.newError)(`Cannot find ${r} in the release ${n.html_url || n.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const o = new Up.URL(i.url);
    let a;
    try {
      a = (0, MA.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
    } catch (s) {
      throw s instanceof ni.HttpError && s.statusCode === 404 ? (0, ni.newError)(`Cannot find ${r} in the latest release artifacts (${o}): ${s.stack || s.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : s;
    }
    return a.assets = n.assets, a;
  }
  get fileExtraDownloadHeaders() {
    return this.configureHeaders("application/octet-stream");
  }
  configureHeaders(t) {
    return {
      accept: t,
      authorization: `token ${this.token}`
    };
  }
  async getLatestVersionInfo(t) {
    const r = this.updater.allowPrerelease;
    let n = this.basePath;
    r || (n = `${n}/latest`);
    const i = (0, xp.newUrlFromBase)(n, this.baseUrl);
    try {
      const o = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return r ? o.find((a) => a.prerelease) || o[0] : o;
    } catch (o) {
      throw (0, ni.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${o.stack || o.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, qA.getFileList)(t).map((r) => {
      const n = UA.posix.basename(r.url).replace(/ /g, "-"), i = t.assets.find((o) => o != null && o.name === n);
      if (i == null)
        throw (0, ni.newError)(`Cannot find asset "${n}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Up.URL(i.url),
        info: r
      };
    });
  }
}
fc.PrivateGitHubProvider = VA;
Object.defineProperty(cc, "__esModule", { value: !0 });
cc.isUrlProbablySupportMultiRangeRequests = V0;
cc.createClient = KA;
const Va = Ke, HA = lc, qp = ha, GA = pn, BA = uc, zA = fc;
function V0(e) {
  return !e.includes("s3.amazonaws.com");
}
function KA(e, t, r) {
  if (typeof e == "string")
    throw (0, Va.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const n = e.provider;
  switch (n) {
    case "github": {
      const i = e, o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return o == null ? new GA.GitHubProvider(i, t, r) : new zA.PrivateGitHubProvider(i, t, o, r);
    }
    case "bitbucket":
      return new HA.BitbucketProvider(e, t, r);
    case "keygen":
      return new BA.KeygenProvider(e, t, r);
    case "s3":
    case "spaces":
      return new qp.GenericProvider({
        provider: "generic",
        url: (0, Va.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...r,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new qp.GenericProvider(i, t, {
        ...r,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && V0(i.url)
      });
    }
    case "custom": {
      const i = e, o = i.updateProvider;
      if (!o)
        throw (0, Va.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new o(i, t, r);
    }
    default:
      throw (0, Va.newError)(`Unsupported provider: ${n}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var dc = {}, pa = {}, xi = {}, Jn = {};
Object.defineProperty(Jn, "__esModule", { value: !0 });
Jn.OperationKind = void 0;
Jn.computeOperations = WA;
var xn;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(xn || (Jn.OperationKind = xn = {}));
function WA(e, t, r) {
  const n = Hp(e.files), i = Hp(t.files);
  let o = null;
  const a = t.files[0], s = [], c = a.name, f = n.get(c);
  if (f == null)
    throw new Error(`no file ${c} in old blockmap`);
  const l = i.get(c);
  let u = 0;
  const { checksumToOffset: p, checksumToOldSize: h } = JA(n.get(c), f.offset, r);
  let v = a.offset;
  for (let _ = 0; _ < l.checksums.length; v += l.sizes[_], _++) {
    const g = l.sizes[_], m = l.checksums[_];
    let E = p.get(m);
    E != null && h.get(m) !== g && (r.warn(`Checksum ("${m}") matches, but size differs (old: ${h.get(m)}, new: ${g})`), E = void 0), E === void 0 ? (u++, o != null && o.kind === xn.DOWNLOAD && o.end === v ? o.end += g : (o = {
      kind: xn.DOWNLOAD,
      start: v,
      end: v + g
      // oldBlocks: null,
    }, Vp(o, s, m, _))) : o != null && o.kind === xn.COPY && o.end === E ? o.end += g : (o = {
      kind: xn.COPY,
      start: E,
      end: E + g
      // oldBlocks: [checksum]
    }, Vp(o, s, m, _));
  }
  return u > 0 && r.info(`File${a.name === "file" ? "" : " " + a.name} has ${u} changed blocks`), s;
}
const YA = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function Vp(e, t, r, n) {
  if (YA && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const o = [i.start, i.end, e.start, e.end].reduce((a, s) => a < s ? a : s);
      throw new Error(`operation (block index: ${n}, checksum: ${r}, kind: ${xn[e.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - o} until ${i.end - o} and ${e.start - o} until ${e.end - o}`);
    }
  }
  t.push(e);
}
function JA(e, t, r) {
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let o = t;
  for (let a = 0; a < e.checksums.length; a++) {
    const s = e.checksums[a], c = e.sizes[a], f = i.get(s);
    if (f === void 0)
      n.set(s, o), i.set(s, c);
    else if (r.debug != null) {
      const l = f === c ? "(same size)" : `(size: ${f}, this size: ${c})`;
      r.debug(`${s} duplicated in blockmap ${l}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    o += c;
  }
  return { checksumToOffset: n, checksumToOldSize: i };
}
function Hp(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    t.set(r.name, r);
  return t;
}
Object.defineProperty(xi, "__esModule", { value: !0 });
xi.DataSplitter = void 0;
xi.copyData = H0;
const Ha = Ke, XA = mn, QA = na, ZA = Jn, Gp = Buffer.from(`\r
\r
`);
var Xr;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(Xr || (Xr = {}));
function H0(e, t, r, n, i) {
  const o = (0, XA.createReadStream)("", {
    fd: r,
    autoClose: !1,
    start: e.start,
    // end is inclusive
    end: e.end - 1
  });
  o.on("error", n), o.once("end", i), o.pipe(t, {
    end: !1
  });
}
class eC extends QA.Writable {
  constructor(t, r, n, i, o, a) {
    super(), this.out = t, this.options = r, this.partIndexToTaskIndex = n, this.partIndexToLength = o, this.finishHandler = a, this.partIndex = -1, this.headerListBuffer = null, this.readState = Xr.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
  }
  get isFinished() {
    return this.partIndex === this.partIndexToLength.length;
  }
  // noinspection JSUnusedGlobalSymbols
  _write(t, r, n) {
    if (this.isFinished) {
      console.error(`Trailing ignored data: ${t.length} bytes`);
      return;
    }
    this.handleData(t).then(n).catch(n);
  }
  async handleData(t) {
    let r = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
      throw (0, Ha.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const n = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= n, r = n;
    } else if (this.remainingPartDataCount > 0) {
      const n = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= n, await this.processPartData(t, 0, n), r = n;
    }
    if (r !== t.length) {
      if (this.readState === Xr.HEADER) {
        const n = this.searchHeaderListEnd(t, r);
        if (n === -1)
          return;
        r = n, this.readState = Xr.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === Xr.BODY)
          this.readState = Xr.INIT;
        else {
          this.partIndex++;
          let a = this.partIndexToTaskIndex.get(this.partIndex);
          if (a == null)
            if (this.isFinished)
              a = this.options.end;
            else
              throw (0, Ha.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const s = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (s < a)
            await this.copyExistingData(s, a);
          else if (s > a)
            throw (0, Ha.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (r = this.searchHeaderListEnd(t, r), r === -1) {
            this.readState = Xr.HEADER;
            return;
          }
        }
        const n = this.partIndexToLength[this.partIndex], i = r + n, o = Math.min(i, t.length);
        if (await this.processPartStarted(t, r, o), this.remainingPartDataCount = n - (o - r), this.remainingPartDataCount > 0)
          return;
        if (r = i + this.boundaryLength, r >= t.length) {
          this.ignoreByteCount = this.boundaryLength - (t.length - i);
          return;
        }
      }
    }
  }
  copyExistingData(t, r) {
    return new Promise((n, i) => {
      const o = () => {
        if (t === r) {
          n();
          return;
        }
        const a = this.options.tasks[t];
        if (a.kind !== ZA.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        H0(a, this.out, this.options.oldFileFd, i, () => {
          t++, o();
        });
      };
      o();
    });
  }
  searchHeaderListEnd(t, r) {
    const n = t.indexOf(Gp, r);
    if (n !== -1)
      return n + Gp.length;
    const i = r === 0 ? t : t.slice(r);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, Ha.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(t, r, n) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, r, n);
  }
  processPartData(t, r, n) {
    this.actualPartLength += n - r;
    const i = this.out;
    return i.write(r === 0 && t.length === n ? t : t.slice(r, n)) ? Promise.resolve() : new Promise((o, a) => {
      i.on("error", a), i.once("drain", () => {
        i.removeListener("error", a), o();
      });
    });
  }
}
xi.DataSplitter = eC;
var hc = {};
Object.defineProperty(hc, "__esModule", { value: !0 });
hc.executeTasksUsingMultipleRangeRequests = tC;
hc.checkIsRangesSupported = Kl;
const zl = Ke, Bp = xi, zp = Jn;
function tC(e, t, r, n, i) {
  const o = (a) => {
    if (a >= t.length) {
      e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
      return;
    }
    const s = a + 1e3;
    rC(e, {
      tasks: t,
      start: a,
      end: Math.min(t.length, s),
      oldFileFd: n
    }, r, () => o(s), i);
  };
  return o;
}
function rC(e, t, r, n, i) {
  let o = "bytes=", a = 0;
  const s = /* @__PURE__ */ new Map(), c = [];
  for (let u = t.start; u < t.end; u++) {
    const p = t.tasks[u];
    p.kind === zp.OperationKind.DOWNLOAD && (o += `${p.start}-${p.end - 1}, `, s.set(a, u), a++, c.push(p.end - p.start));
  }
  if (a <= 1) {
    const u = (p) => {
      if (p >= t.end) {
        n();
        return;
      }
      const h = t.tasks[p++];
      if (h.kind === zp.OperationKind.COPY)
        (0, Bp.copyData)(h, r, t.oldFileFd, i, () => u(p));
      else {
        const v = e.createRequestOptions();
        v.headers.Range = `bytes=${h.start}-${h.end - 1}`;
        const _ = e.httpExecutor.createRequest(v, (g) => {
          Kl(g, i) && (g.pipe(r, {
            end: !1
          }), g.once("end", () => u(p)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(_, i), _.end();
      }
    };
    u(t.start);
    return;
  }
  const f = e.createRequestOptions();
  f.headers.Range = o.substring(0, o.length - 2);
  const l = e.httpExecutor.createRequest(f, (u) => {
    if (!Kl(u, i))
      return;
    const p = (0, zl.safeGetHeader)(u, "content-type"), h = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(p);
    if (h == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${p}"`));
      return;
    }
    const v = new Bp.DataSplitter(r, t, s, h[1] || h[2], c, n);
    v.on("error", i), u.pipe(v), u.on("end", () => {
      setTimeout(() => {
        l.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(l, i), l.end();
}
function Kl(e, t) {
  if (e.statusCode >= 400)
    return t((0, zl.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const r = (0, zl.safeGetHeader)(e, "accept-ranges");
    if (r == null || r === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var pc = {};
Object.defineProperty(pc, "__esModule", { value: !0 });
pc.ProgressDifferentialDownloadCallbackTransform = void 0;
const nC = na;
var gi;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(gi || (gi = {}));
class iC extends nC.Transform {
  constructor(t, r, n) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = gi.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == gi.COPY) {
      n(null, t);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  beginFileCopy() {
    this.operationType = gi.COPY;
  }
  beginRangeDownload() {
    this.operationType = gi.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
  }
  endRangeDownload() {
    this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    });
  }
  // Called when we are 100% done with the connection/download
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, this.transferred = 0, t(null);
  }
}
pc.ProgressDifferentialDownloadCallbackTransform = iC;
Object.defineProperty(pa, "__esModule", { value: !0 });
pa.DifferentialDownloader = void 0;
const lo = Ke, ul = yn, oC = mn, aC = xi, sC = ji, Ga = Jn, Kp = hc, cC = pc;
class lC {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(t, r, n) {
    this.blockAwareFileInfo = t, this.httpExecutor = r, this.options = n, this.fileMetadataBuffer = null, this.logger = n.logger;
  }
  createRequestOptions() {
    const t = {
      headers: {
        ...this.options.requestHeaders,
        accept: "*/*"
      }
    };
    return (0, lo.configureRequestUrl)(this.options.newUrl, t), (0, lo.configureRequestOptions)(t), t;
  }
  doDownload(t, r) {
    if (t.version !== r.version)
      throw new Error(`version is different (${t.version} - ${r.version}), full download is required`);
    const n = this.logger, i = (0, Ga.computeOperations)(t, r, n);
    n.debug != null && n.debug(JSON.stringify(i, null, 2));
    let o = 0, a = 0;
    for (const c of i) {
      const f = c.end - c.start;
      c.kind === Ga.OperationKind.DOWNLOAD ? o += f : a += f;
    }
    const s = this.blockAwareFileInfo.size;
    if (o + a + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== s)
      throw new Error(`Internal error, size mismatch: downloadSize: ${o}, copySize: ${a}, newSize: ${s}`);
    return n.info(`Full: ${Wp(s)}, To download: ${Wp(o)} (${Math.round(o / (s / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const r = [], n = () => Promise.all(r.map((i) => (0, ul.close)(i.descriptor).catch((o) => {
      this.logger.error(`cannot close file "${i.path}": ${o}`);
    })));
    return this.doDownloadFile(t, r).then(n).catch((i) => n().catch((o) => {
      try {
        this.logger.error(`cannot close files: ${o}`);
      } catch (a) {
        try {
          console.error(a);
        } catch {
        }
      }
      throw i;
    }).then(() => {
      throw i;
    }));
  }
  async doDownloadFile(t, r) {
    const n = await (0, ul.open)(this.options.oldFile, "r");
    r.push({ descriptor: n, path: this.options.oldFile });
    const i = await (0, ul.open)(this.options.newFile, "w");
    r.push({ descriptor: i, path: this.options.newFile });
    const o = (0, oC.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((a, s) => {
      const c = [];
      let f;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const m = [];
        let E = 0;
        for (const R of t)
          R.kind === Ga.OperationKind.DOWNLOAD && (m.push(R.end - R.start), E += R.end - R.start);
        const N = {
          expectedByteCounts: m,
          grandTotal: E
        };
        f = new cC.ProgressDifferentialDownloadCallbackTransform(N, this.options.cancellationToken, this.options.onProgress), c.push(f);
      }
      const l = new lo.DigestTransform(this.blockAwareFileInfo.sha512);
      l.isValidateOnEnd = !1, c.push(l), o.on("finish", () => {
        o.close(() => {
          r.splice(1, 1);
          try {
            l.validate();
          } catch (m) {
            s(m);
            return;
          }
          a(void 0);
        });
      }), c.push(o);
      let u = null;
      for (const m of c)
        m.on("error", s), u == null ? u = m : u = u.pipe(m);
      const p = c[0];
      let h;
      if (this.options.isUseMultipleRangeRequest) {
        h = (0, Kp.executeTasksUsingMultipleRangeRequests)(this, t, p, n, s), h(0);
        return;
      }
      let v = 0, _ = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const g = this.createRequestOptions();
      g.redirect = "manual", h = (m) => {
        var E, N;
        if (m >= t.length) {
          this.fileMetadataBuffer != null && p.write(this.fileMetadataBuffer), p.end();
          return;
        }
        const R = t[m++];
        if (R.kind === Ga.OperationKind.COPY) {
          f && f.beginFileCopy(), (0, aC.copyData)(R, p, n, s, () => h(m));
          return;
        }
        const F = `bytes=${R.start}-${R.end - 1}`;
        g.headers.range = F, (N = (E = this.logger) === null || E === void 0 ? void 0 : E.debug) === null || N === void 0 || N.call(E, `download range: ${F}`), f && f.beginRangeDownload();
        const k = this.httpExecutor.createRequest(g, (L) => {
          L.on("error", s), L.on("aborted", () => {
            s(new Error("response has been aborted by the server"));
          }), L.statusCode >= 400 && s((0, lo.createHttpError)(L)), L.pipe(p, {
            end: !1
          }), L.once("end", () => {
            f && f.endRangeDownload(), ++v === 100 ? (v = 0, setTimeout(() => h(m), 1e3)) : h(m);
          });
        });
        k.on("redirect", (L, V, P) => {
          this.logger.info(`Redirect to ${uC(P)}`), _ = P, (0, lo.configureRequestUrl)(new sC.URL(_), g), k.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(k, s), k.end();
      }, h(0);
    });
  }
  async readRemoteBytes(t, r) {
    const n = Buffer.allocUnsafe(r + 1 - t), i = this.createRequestOptions();
    i.headers.range = `bytes=${t}-${r}`;
    let o = 0;
    if (await this.request(i, (a) => {
      a.copy(n, o), o += a.length;
    }), o !== n.length)
      throw new Error(`Received data length ${o} is not equal to expected ${n.length}`);
    return n;
  }
  request(t, r) {
    return new Promise((n, i) => {
      const o = this.httpExecutor.createRequest(t, (a) => {
        (0, Kp.checkIsRangesSupported)(a, i) && (a.on("error", i), a.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), a.on("data", r), a.on("end", () => n()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
    });
  }
}
pa.DifferentialDownloader = lC;
function Wp(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function uC(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(dc, "__esModule", { value: !0 });
dc.GenericDifferentialDownloader = void 0;
const fC = pa;
class dC extends fC.DifferentialDownloader {
  download(t, r) {
    return this.doDownload(t, r);
  }
}
dc.GenericDifferentialDownloader = dC;
var Yp;
function Bu() {
  if (Yp) return Nn;
  Yp = 1, Object.defineProperty(Nn, "__esModule", { value: !0 }), Nn.NoOpLogger = Nn.AppUpdater = void 0;
  const e = Ke, t = ra, r = Gs, n = jy, i = yn, o = nt, a = tc, s = me, c = Hu, f = da, l = sc, u = j0, p = ha, h = qi(), v = cc, _ = Uy, g = Ht, m = dc;
  let E = class G0 extends n.EventEmitter {
    /**
     * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
     */
    get channel() {
      return this._channel;
    }
    /**
     * Set the update channel. Overrides `channel` in the update configuration.
     *
     * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
     */
    set channel(k) {
      if (this._channel != null) {
        if (typeof k != "string")
          throw (0, e.newError)(`Channel must be a string, but got: ${k}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (k.length === 0)
          throw (0, e.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
      }
      this._channel = k, this.allowDowngrade = !0;
    }
    /**
     *  Shortcut for explicitly adding auth tokens to request headers
     */
    addAuthHeader(k) {
      this.requestHeaders = Object.assign({}, this.requestHeaders, {
        authorization: k
      });
    }
    // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    get netSession() {
      return (0, u.getNetSession)();
    }
    /**
     * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
     * Set it to `null` if you would like to disable a logging feature.
     */
    get logger() {
      return this._logger;
    }
    set logger(k) {
      this._logger = k ?? new R();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(k) {
      this.clientPromise = null, this._appUpdateConfigPath = k, this.configOnDisk = new a.Lazy(() => this.loadUpdateConfig());
    }
    constructor(k, L) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new h.UpdaterSignal(this), this._appUpdateConfigPath = null, this.clientPromise = null, this.stagingUserIdPromise = new a.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new a.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (K) => {
        this._logger.error(`Error: ${K.stack || K.message}`);
      }), L == null ? (this.app = new l.ElectronAppAdapter(), this.httpExecutor = new u.ElectronHttpExecutor((K, q) => this.emit("login", K, q))) : (this.app = L, this.httpExecutor = null);
      const V = this.app.version, P = (0, c.parse)(V);
      if (P == null)
        throw (0, e.newError)(`App version is not a valid semver version: "${V}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = P, this.allowPrerelease = N(P), k != null && (this.setFeedURL(k), typeof k != "string" && k.requestHeaders && (this.requestHeaders = k.requestHeaders));
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
      return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(k) {
      const L = this.createProviderRuntimeOptions();
      let V;
      typeof k == "string" ? V = new p.GenericProvider({ provider: "generic", url: k }, this, {
        ...L,
        isUseMultipleRangeRequest: (0, v.isUrlProbablySupportMultiRangeRequests)(k)
      }) : V = (0, v.createClient)(k, this, L), this.clientPromise = Promise.resolve(V);
    }
    /**
     * Asks the server whether there is an update.
     */
    checkForUpdates() {
      if (!this.isUpdaterActive())
        return Promise.resolve(null);
      let k = this.checkForUpdatesPromise;
      if (k != null)
        return this._logger.info("Checking for update (already in progress)"), k;
      const L = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), k = this.doCheckForUpdates().then((V) => (L(), V)).catch((V) => {
        throw L(), this.emit("error", V, `Cannot check for updates: ${(V.stack || V).toString()}`), V;
      }), this.checkForUpdatesPromise = k, k;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(k) {
      return this.checkForUpdates().then((L) => L != null && L.downloadPromise ? (L.downloadPromise.then(() => {
        const V = G0.formatDownloadNotification(L.updateInfo.version, this.app.name, k);
        new Dr.Notification(V).show();
      }), L) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), L));
    }
    static formatDownloadNotification(k, L, V) {
      return V == null && (V = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), V = {
        title: V.title.replace("{appName}", L).replace("{version}", k),
        body: V.body.replace("{appName}", L).replace("{version}", k)
      }, V;
    }
    async isStagingMatch(k) {
      const L = k.stagingPercentage;
      let V = L;
      if (V == null)
        return !0;
      if (V = parseInt(V, 10), isNaN(V))
        return this._logger.warn(`Staging percentage is NaN: ${L}`), !0;
      V = V / 100;
      const P = await this.stagingUserIdPromise.value, q = e.UUID.parse(P).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${V}, percentage: ${q}, user id: ${P}`), q < V;
    }
    computeFinalHeaders(k) {
      return this.requestHeaders != null && Object.assign(k, this.requestHeaders), k;
    }
    async isUpdateAvailable(k) {
      const L = (0, c.parse)(k.version);
      if (L == null)
        throw (0, e.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${k.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const V = this.currentVersion;
      if ((0, c.eq)(L, V))
        return !1;
      const P = k == null ? void 0 : k.minimumSystemVersion, K = (0, r.release)();
      if (P)
        try {
          if ((0, c.lt)(K, P))
            return this._logger.info(`Current OS version ${K} is less than the minimum OS version required ${P} for version ${K}`), !1;
        } catch (M) {
          this._logger.warn(`Failed to compare current OS version(${K}) with minimum OS version(${P}): ${(M.message || M).toString()}`);
        }
      if (!await this.isStagingMatch(k))
        return !1;
      const G = (0, c.gt)(L, V), Y = (0, c.lt)(L, V);
      return G ? !0 : this.allowDowngrade && Y;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((V) => (0, v.createClient)(V, this, this.createProviderRuntimeOptions())));
      const k = await this.clientPromise, L = await this.stagingUserIdPromise.value;
      return k.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": L })), {
        info: await k.getLatestVersion(),
        provider: k
      };
    }
    createProviderRuntimeOptions() {
      return {
        isUseMultipleRangeRequest: !0,
        platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
        executor: this.httpExecutor
      };
    }
    async doCheckForUpdates() {
      this.emit("checking-for-update");
      const k = await this.getUpdateInfoAndProvider(), L = k.info;
      if (!await this.isUpdateAvailable(L))
        return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${L.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", L), {
          versionInfo: L,
          updateInfo: L
        };
      this.updateInfoAndProvider = k, this.onUpdateAvailable(L);
      const V = new e.CancellationToken();
      return {
        versionInfo: L,
        updateInfo: L,
        cancellationToken: V,
        downloadPromise: this.autoDownload ? this.downloadUpdate(V) : null
      };
    }
    onUpdateAvailable(k) {
      this._logger.info(`Found version ${k.version} (url: ${(0, e.asArray)(k.files).map((L) => L.url).join(", ")})`), this.emit("update-available", k);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(k = new e.CancellationToken()) {
      const L = this.updateInfoAndProvider;
      if (L == null) {
        const P = new Error("Please check update first");
        return this.dispatchError(P), Promise.reject(P);
      }
      if (this.downloadPromise != null)
        return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
      this._logger.info(`Downloading update from ${(0, e.asArray)(L.info.files).map((P) => P.url).join(", ")}`);
      const V = (P) => {
        if (!(P instanceof e.CancellationError))
          try {
            this.dispatchError(P);
          } catch (K) {
            this._logger.warn(`Cannot dispatch error event: ${K.stack || K}`);
          }
        return P;
      };
      return this.downloadPromise = this.doDownloadUpdate({
        updateInfoAndProvider: L,
        requestHeaders: this.computeRequestHeaders(L.provider),
        cancellationToken: k,
        disableWebInstaller: this.disableWebInstaller,
        disableDifferentialDownload: this.disableDifferentialDownload
      }).catch((P) => {
        throw V(P);
      }).finally(() => {
        this.downloadPromise = null;
      }), this.downloadPromise;
    }
    dispatchError(k) {
      this.emit("error", k, (k.stack || k).toString());
    }
    dispatchUpdateDownloaded(k) {
      this.emit(h.UPDATE_DOWNLOADED, k);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, o.load)(await (0, i.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(k) {
      const L = k.fileExtraDownloadHeaders;
      if (L != null) {
        const V = this.requestHeaders;
        return V == null ? L : {
          ...L,
          ...V
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const k = s.join(this.app.userDataPath, ".updaterId");
      try {
        const V = await (0, i.readFile)(k, "utf-8");
        if (e.UUID.check(V))
          return V;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${V}`);
      } catch (V) {
        V.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${V}`);
      }
      const L = e.UUID.v5((0, t.randomBytes)(4096), e.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${L}`);
      try {
        await (0, i.outputFile)(k, L);
      } catch (V) {
        this._logger.warn(`Couldn't write out staging user ID: ${V}`);
      }
      return L;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const k = this.requestHeaders;
      if (k == null)
        return !0;
      for (const L of Object.keys(k)) {
        const V = L.toLowerCase();
        if (V === "authorization" || V === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let k = this.downloadedUpdateHelper;
      if (k == null) {
        const L = (await this.configOnDisk.value).updaterCacheDirName, V = this._logger;
        L == null && V.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const P = s.join(this.app.baseCachePath, L || this.app.name);
        V.debug != null && V.debug(`updater cache dir: ${P}`), k = new f.DownloadedUpdateHelper(P), this.downloadedUpdateHelper = k;
      }
      return k;
    }
    async executeDownload(k) {
      const L = k.fileInfo, V = {
        headers: k.downloadUpdateOptions.requestHeaders,
        cancellationToken: k.downloadUpdateOptions.cancellationToken,
        sha2: L.info.sha2,
        sha512: L.info.sha512
      };
      this.listenerCount(h.DOWNLOAD_PROGRESS) > 0 && (V.onProgress = (b) => this.emit(h.DOWNLOAD_PROGRESS, b));
      const P = k.downloadUpdateOptions.updateInfoAndProvider.info, K = P.version, q = L.packageInfo;
      function G() {
        const b = decodeURIComponent(k.fileInfo.url.pathname);
        return b.endsWith(`.${k.fileExtension}`) ? s.basename(b) : k.fileInfo.info.url;
      }
      const Y = await this.getOrCreateDownloadHelper(), M = Y.cacheDirForPendingUpdate;
      await (0, i.mkdir)(M, { recursive: !0 });
      const U = G();
      let H = s.join(M, U);
      const x = q == null ? null : s.join(M, `package-${K}${s.extname(q.path) || ".7z"}`), W = async (b) => (await Y.setDownloadedFile(H, x, P, L, U, b), await k.done({
        ...P,
        downloadedFile: H
      }), x == null ? [H] : [H, x]), z = this._logger, I = await Y.validateDownloadedPath(H, P, L, z);
      if (I != null)
        return H = I, await W(!1);
      const S = async () => (await Y.clear().catch(() => {
      }), await (0, i.unlink)(H).catch(() => {
      })), A = await (0, f.createTempUpdateFile)(`temp-${U}`, M, z);
      try {
        await k.task(A, V, x, S), await (0, e.retry)(() => (0, i.rename)(A, H), 60, 500, 0, 0, (b) => b instanceof Error && /^EBUSY:/.test(b.message));
      } catch (b) {
        throw await S(), b instanceof e.CancellationError && (z.info("cancelled"), this.emit("update-cancelled", P)), b;
      }
      return z.info(`New version ${K} has been downloaded to ${H}`), await W(!0);
    }
    async differentialDownloadInstaller(k, L, V, P, K) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const q = (0, g.blockmapFiles)(k.url, this.app.version, L.updateInfoAndProvider.info.version);
        this._logger.info(`Download block maps (old: "${q[0]}", new: ${q[1]})`);
        const G = async (U) => {
          const H = await this.httpExecutor.downloadToBuffer(U, {
            headers: L.requestHeaders,
            cancellationToken: L.cancellationToken
          });
          if (H == null || H.length === 0)
            throw new Error(`Blockmap "${U.href}" is empty`);
          try {
            return JSON.parse((0, _.gunzipSync)(H).toString());
          } catch (x) {
            throw new Error(`Cannot parse blockmap "${U.href}", error: ${x}`);
          }
        }, Y = {
          newUrl: k.url,
          oldFile: s.join(this.downloadedUpdateHelper.cacheDir, K),
          logger: this._logger,
          newFile: V,
          isUseMultipleRangeRequest: P.isUseMultipleRangeRequest,
          requestHeaders: L.requestHeaders,
          cancellationToken: L.cancellationToken
        };
        this.listenerCount(h.DOWNLOAD_PROGRESS) > 0 && (Y.onProgress = (U) => this.emit(h.DOWNLOAD_PROGRESS, U));
        const M = await Promise.all(q.map((U) => G(U)));
        return await new m.GenericDifferentialDownloader(k.info, this.httpExecutor, Y).download(M[0], M[1]), !1;
      } catch (q) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${q.stack || q}`), this._testOnlyOptions != null)
          throw q;
        return !0;
      }
    }
  };
  Nn.AppUpdater = E;
  function N(F) {
    const k = (0, c.prerelease)(F);
    return k != null && k.length > 0;
  }
  class R {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(k) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(k) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(k) {
    }
  }
  return Nn.NoOpLogger = R, Nn;
}
var Jp;
function ma() {
  if (Jp) return ao;
  Jp = 1, Object.defineProperty(ao, "__esModule", { value: !0 }), ao.BaseUpdater = void 0;
  const e = ia, t = Bu();
  let r = class extends t.AppUpdater {
    constructor(i, o) {
      super(i, o), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(i = !1, o = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(i, i ? o : this.autoRunAppAfterInstall) ? setImmediate(() => {
        Dr.autoUpdater.emit("before-quit-for-update"), this.app.quit();
      }) : this.quitAndInstallCalled = !1;
    }
    executeDownload(i) {
      return super.executeDownload({
        ...i,
        done: (o) => (this.dispatchUpdateDownloaded(o), this.addQuitHandler(), Promise.resolve())
      });
    }
    // must be sync (because quit even handler is not async)
    install(i = !1, o = !1) {
      if (this.quitAndInstallCalled)
        return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
      const a = this.downloadedUpdateHelper, s = a && a.file ? process.platform === "linux" ? a.file.replace(/ /g, "\\ ") : a.file : null, c = a == null ? null : a.downloadedFileInfo;
      if (s == null || c == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${i}, isForceRunAfter: ${o}`), this.doInstall({
          installerPath: s,
          isSilent: i,
          isForceRunAfter: o,
          isAdminRightsRequired: c.isAdminRightsRequired
        });
      } catch (f) {
        return this.dispatchError(f), !1;
      }
    }
    addQuitHandler() {
      this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((i) => {
        if (this.quitAndInstallCalled) {
          this._logger.info("Update installer has already been triggered. Quitting application.");
          return;
        }
        if (!this.autoInstallOnAppQuit) {
          this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
          return;
        }
        if (i !== 0) {
          this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${i}`);
          return;
        }
        this._logger.info("Auto install update on quit"), this.install(!0, !1);
      }));
    }
    wrapSudo() {
      const { name: i } = this.app, o = `"${i} would like to update"`, a = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"), s = [a];
      return /kdesudo/i.test(a) ? (s.push("--comment", o), s.push("-c")) : /gksudo/i.test(a) ? s.push("--message", o) : /pkexec/i.test(a) && s.push("--disable-internal-agent"), s.join(" ");
    }
    spawnSyncLog(i, o = [], a = {}) {
      return this._logger.info(`Executing: ${i} with args: ${o}`), (0, e.spawnSync)(i, o, {
        env: { ...process.env, ...a },
        encoding: "utf-8",
        shell: !0
      }).stdout.trim();
    }
    /**
     * This handles both node 8 and node 10 way of emitting error when spawning a process
     *   - node 8: Throws the error
     *   - node 10: Emit the error(Need to listen with on)
     */
    // https://github.com/electron-userland/electron-builder/issues/1129
    // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
    async spawnLog(i, o = [], a = void 0, s = "ignore") {
      return this._logger.info(`Executing: ${i} with args: ${o}`), new Promise((c, f) => {
        try {
          const l = { stdio: s, env: a, detached: !0 }, u = (0, e.spawn)(i, o, l);
          u.on("error", (p) => {
            f(p);
          }), u.unref(), u.pid !== void 0 && c(!0);
        } catch (l) {
          f(l);
        }
      });
    }
  };
  return ao.BaseUpdater = r, ao;
}
var uo = {}, ya = {};
Object.defineProperty(ya, "__esModule", { value: !0 });
ya.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const ii = yn, hC = pa, pC = Uy;
class mC extends hC.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, r = t.size, n = r - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
    const i = B0(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await yC(this.options.oldFile), i);
  }
}
ya.FileWithEmbeddedBlockMapDifferentialDownloader = mC;
function B0(e) {
  return JSON.parse((0, pC.inflateRawSync)(e).toString());
}
async function yC(e) {
  const t = await (0, ii.open)(e, "r");
  try {
    const r = (await (0, ii.fstat)(t)).size, n = Buffer.allocUnsafe(4);
    await (0, ii.read)(t, n, 0, n.length, r - n.length);
    const i = Buffer.allocUnsafe(n.readUInt32BE(0));
    return await (0, ii.read)(t, i, 0, i.length, r - n.length - i.length), await (0, ii.close)(t), B0(i);
  } catch (r) {
    throw await (0, ii.close)(t), r;
  }
}
var Xp;
function Qp() {
  if (Xp) return uo;
  Xp = 1, Object.defineProperty(uo, "__esModule", { value: !0 }), uo.AppImageUpdater = void 0;
  const e = Ke, t = ia, r = yn, n = mn, i = me, o = ma(), a = ya, s = qi(), c = We;
  let f = class extends o.BaseUpdater {
    constructor(u, p) {
      super(u, p);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(u) {
      const p = u.updateInfoAndProvider.provider, h = (0, c.findFile)(p.resolveFiles(u.updateInfoAndProvider.info), "AppImage", ["rpm", "deb"]);
      return this.executeDownload({
        fileExtension: "AppImage",
        fileInfo: h,
        downloadUpdateOptions: u,
        task: async (v, _) => {
          const g = process.env.APPIMAGE;
          if (g == null)
            throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          let m = !1;
          try {
            const E = {
              newUrl: h.url,
              oldFile: g,
              logger: this._logger,
              newFile: v,
              isUseMultipleRangeRequest: p.isUseMultipleRangeRequest,
              requestHeaders: u.requestHeaders,
              cancellationToken: u.cancellationToken
            };
            this.listenerCount(s.DOWNLOAD_PROGRESS) > 0 && (E.onProgress = (N) => this.emit(s.DOWNLOAD_PROGRESS, N)), await new a.FileWithEmbeddedBlockMapDifferentialDownloader(h.info, this.httpExecutor, E).download();
          } catch (E) {
            this._logger.error(`Cannot download differentially, fallback to full download: ${E.stack || E}`), m = process.platform === "linux";
          }
          m && await this.httpExecutor.download(h.url, v, _), await (0, r.chmod)(v, 493);
        }
      });
    }
    doInstall(u) {
      const p = process.env.APPIMAGE;
      if (p == null)
        throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, n.unlinkSync)(p);
      let h;
      const v = i.basename(p);
      i.basename(u.installerPath) === v || !/\d+\.\d+\.\d+/.test(v) ? h = p : h = i.join(i.dirname(p), i.basename(u.installerPath)), (0, t.execFileSync)("mv", ["-f", u.installerPath, h]), h !== p && this.emit("appimage-filename-updated", h);
      const _ = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return u.isForceRunAfter ? this.spawnLog(h, [], _) : (_.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, t.execFileSync)(h, [], { env: _ })), !0;
    }
  };
  return uo.AppImageUpdater = f, uo;
}
var fo = {}, Zp;
function em() {
  if (Zp) return fo;
  Zp = 1, Object.defineProperty(fo, "__esModule", { value: !0 }), fo.DebUpdater = void 0;
  const e = ma(), t = qi(), r = We;
  let n = class extends e.BaseUpdater {
    constructor(o, a) {
      super(o, a);
    }
    /*** @private */
    doDownloadUpdate(o) {
      const a = o.updateInfoAndProvider.provider, s = (0, r.findFile)(a.resolveFiles(o.updateInfoAndProvider.info), "deb", ["AppImage", "rpm"]);
      return this.executeDownload({
        fileExtension: "deb",
        fileInfo: s,
        downloadUpdateOptions: o,
        task: async (c, f) => {
          this.listenerCount(t.DOWNLOAD_PROGRESS) > 0 && (f.onProgress = (l) => this.emit(t.DOWNLOAD_PROGRESS, l)), await this.httpExecutor.download(s.url, c, f);
        }
      });
    }
    doInstall(o) {
      const a = this.wrapSudo(), s = /pkexec/i.test(a) ? "" : '"', c = ["dpkg", "-i", o.installerPath, "||", "apt-get", "install", "-f", "-y"];
      return this.spawnSyncLog(a, [`${s}/bin/bash`, "-c", `'${c.join(" ")}'${s}`]), o.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return fo.DebUpdater = n, fo;
}
var ho = {}, tm;
function rm() {
  if (tm) return ho;
  tm = 1, Object.defineProperty(ho, "__esModule", { value: !0 }), ho.RpmUpdater = void 0;
  const e = ma(), t = qi(), r = We;
  let n = class extends e.BaseUpdater {
    constructor(o, a) {
      super(o, a);
    }
    /*** @private */
    doDownloadUpdate(o) {
      const a = o.updateInfoAndProvider.provider, s = (0, r.findFile)(a.resolveFiles(o.updateInfoAndProvider.info), "rpm", ["AppImage", "deb"]);
      return this.executeDownload({
        fileExtension: "rpm",
        fileInfo: s,
        downloadUpdateOptions: o,
        task: async (c, f) => {
          this.listenerCount(t.DOWNLOAD_PROGRESS) > 0 && (f.onProgress = (l) => this.emit(t.DOWNLOAD_PROGRESS, l)), await this.httpExecutor.download(s.url, c, f);
        }
      });
    }
    doInstall(o) {
      const a = o.installerPath, s = this.wrapSudo(), c = /pkexec/i.test(s) ? "" : '"', f = this.spawnSyncLog("which zypper");
      let l;
      return f ? l = [f, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", a] : l = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", a], this.spawnSyncLog(s, [`${c}/bin/bash`, "-c", `'${l.join(" ")}'${c}`]), o.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return ho.RpmUpdater = n, ho;
}
var po = {}, nm;
function im() {
  if (nm) return po;
  nm = 1, Object.defineProperty(po, "__esModule", { value: !0 }), po.MacUpdater = void 0;
  const e = Ke, t = yn, r = mn, n = me, i = Dw, o = Bu(), a = We, s = ia, c = ra;
  let f = class extends o.AppUpdater {
    constructor(u, p) {
      super(u, p), this.nativeUpdater = Dr.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (h) => {
        this._logger.warn(h), this.emit("error", h);
      }), this.nativeUpdater.on("update-downloaded", () => {
        this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
      });
    }
    debug(u) {
      this._logger.debug != null && this._logger.debug(u);
    }
    closeServerIfExists() {
      this.server && (this.debug("Closing proxy server"), this.server.close((u) => {
        u && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
      }));
    }
    async doDownloadUpdate(u) {
      let p = u.updateInfoAndProvider.provider.resolveFiles(u.updateInfoAndProvider.info);
      const h = this._logger, v = "sysctl.proc_translated";
      let _ = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), _ = (0, s.execFileSync)("sysctl", [v], { encoding: "utf8" }).includes(`${v}: 1`), h.info(`Checked for macOS Rosetta environment (isRosetta=${_})`);
      } catch (F) {
        h.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${F}`);
      }
      let g = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const k = (0, s.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        h.info(`Checked 'uname -a': arm64=${k}`), g = g || k;
      } catch (F) {
        h.warn(`uname shell command to check for arm64 failed: ${F}`);
      }
      g = g || process.arch === "arm64" || _;
      const m = (F) => {
        var k;
        return F.url.pathname.includes("arm64") || ((k = F.info.url) === null || k === void 0 ? void 0 : k.includes("arm64"));
      };
      g && p.some(m) ? p = p.filter((F) => g === m(F)) : p = p.filter((F) => !m(F));
      const E = (0, a.findFile)(p, "zip", ["pkg", "dmg"]);
      if (E == null)
        throw (0, e.newError)(`ZIP file not provided: ${(0, e.safeStringifyJson)(p)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const N = u.updateInfoAndProvider.provider, R = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: E,
        downloadUpdateOptions: u,
        task: async (F, k) => {
          const L = n.join(this.downloadedUpdateHelper.cacheDir, R), V = () => (0, t.pathExistsSync)(L) ? !u.disableDifferentialDownload : (h.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let P = !0;
          V() && (P = await this.differentialDownloadInstaller(E, u, F, N, R)), P && await this.httpExecutor.download(E.url, F, k);
        },
        done: (F) => {
          if (!u.disableDifferentialDownload)
            try {
              const k = n.join(this.downloadedUpdateHelper.cacheDir, R);
              (0, r.copyFileSync)(F.downloadedFile, k);
            } catch (k) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${k.message}`);
            }
          return this.updateDownloaded(E, F);
        }
      });
    }
    async updateDownloaded(u, p) {
      var h;
      const v = p.downloadedFile, _ = (h = u.info.size) !== null && h !== void 0 ? h : (await (0, t.stat)(v)).size, g = this._logger, m = `fileToProxy=${u.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${m})`), this.server = (0, i.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${m})`), this.server.on("close", () => {
        g.info(`Proxy server for native Squirrel.Mac is closed (${m})`);
      });
      const E = (N) => {
        const R = N.address();
        return typeof R == "string" ? R : `http://127.0.0.1:${R == null ? void 0 : R.port}`;
      };
      return await new Promise((N, R) => {
        const F = (0, c.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), k = Buffer.from(`autoupdater:${F}`, "ascii"), L = `/${(0, c.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (V, P) => {
          const K = V.url;
          if (g.info(`${K} requested`), K === "/") {
            if (!V.headers.authorization || V.headers.authorization.indexOf("Basic ") === -1) {
              P.statusCode = 401, P.statusMessage = "Invalid Authentication Credentials", P.end(), g.warn("No authenthication info");
              return;
            }
            const Y = V.headers.authorization.split(" ")[1], M = Buffer.from(Y, "base64").toString("ascii"), [U, H] = M.split(":");
            if (U !== "autoupdater" || H !== F) {
              P.statusCode = 401, P.statusMessage = "Invalid Authentication Credentials", P.end(), g.warn("Invalid authenthication credentials");
              return;
            }
            const x = Buffer.from(`{ "url": "${E(this.server)}${L}" }`);
            P.writeHead(200, { "Content-Type": "application/json", "Content-Length": x.length }), P.end(x);
            return;
          }
          if (!K.startsWith(L)) {
            g.warn(`${K} requested, but not supported`), P.writeHead(404), P.end();
            return;
          }
          g.info(`${L} requested by Squirrel.Mac, pipe ${v}`);
          let q = !1;
          P.on("finish", () => {
            q || (this.nativeUpdater.removeListener("error", R), N([]));
          });
          const G = (0, r.createReadStream)(v);
          G.on("error", (Y) => {
            try {
              P.end();
            } catch (M) {
              g.warn(`cannot end response: ${M}`);
            }
            q = !0, this.nativeUpdater.removeListener("error", R), R(new Error(`Cannot pipe "${v}": ${Y}`));
          }), P.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": _
          }), G.pipe(P);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${m})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${E(this.server)}, ${m})`), this.nativeUpdater.setFeedURL({
            url: E(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${k.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(p), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", R), this.nativeUpdater.checkForUpdates()) : N([]);
        });
      });
    }
    quitAndInstall() {
      this.squirrelDownloadedUpdate ? (this.nativeUpdater.quitAndInstall(), this.closeServerIfExists()) : (this.nativeUpdater.on("update-downloaded", () => {
        this.nativeUpdater.quitAndInstall(), this.closeServerIfExists();
      }), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
    }
  };
  return po.MacUpdater = f, po;
}
var mo = {}, zu = {};
Object.defineProperty(zu, "__esModule", { value: !0 });
zu.verifySignature = $C;
const om = Ke, z0 = ia, gC = Gs, am = me;
function $C(e, t, r) {
  return new Promise((n, i) => {
    const o = t.replace(/'/g, "''");
    r.info(`Verifying signature ${o}`), (0, z0.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${o}' | ConvertTo-Json -Compress"`], {
      shell: !0,
      timeout: 20 * 1e3
    }, (a, s, c) => {
      var f;
      try {
        if (a != null || c) {
          fl(r, a, c, i), n(null);
          return;
        }
        const l = vC(s);
        if (l.Status === 0) {
          try {
            const v = am.normalize(l.Path), _ = am.normalize(t);
            if (r.info(`LiteralPath: ${v}. Update Path: ${_}`), v !== _) {
              fl(r, new Error(`LiteralPath of ${v} is different than ${_}`), c, i), n(null);
              return;
            }
          } catch (v) {
            r.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(f = v.message) !== null && f !== void 0 ? f : v.stack}`);
          }
          const p = (0, om.parseDn)(l.SignerCertificate.Subject);
          let h = !1;
          for (const v of e) {
            const _ = (0, om.parseDn)(v);
            if (_.size ? h = Array.from(_.keys()).every((m) => _.get(m) === p.get(m)) : v === p.get("CN") && (r.warn(`Signature validated using only CN ${v}. Please add your full Distinguished Name (DN) to publisherNames configuration`), h = !0), h) {
              n(null);
              return;
            }
          }
        }
        const u = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(l, (p, h) => p === "RawData" ? void 0 : h, 2);
        r.warn(`Sign verification failed, installer signed with incorrect certificate: ${u}`), n(u);
      } catch (l) {
        fl(r, l, null, i), n(null);
        return;
      }
    });
  });
}
function vC(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const r = t.SignerCertificate;
  return r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName), t;
}
function fl(e, t, r, n) {
  if (_C()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || r}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, z0.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && n(t), r && n(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${r}. Failing signature validation due to unknown stderr.`));
}
function _C() {
  const e = gC.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
var sm;
function cm() {
  if (sm) return mo;
  sm = 1, Object.defineProperty(mo, "__esModule", { value: !0 }), mo.NsisUpdater = void 0;
  const e = Ke, t = me, r = ma(), n = ya, i = qi(), o = We, a = yn, s = zu, c = ji;
  let f = class extends r.BaseUpdater {
    constructor(u, p) {
      super(u, p), this._verifyUpdateCodeSignature = (h, v) => (0, s.verifySignature)(h, v, this._logger);
    }
    /**
     * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
     * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
     */
    get verifyUpdateCodeSignature() {
      return this._verifyUpdateCodeSignature;
    }
    set verifyUpdateCodeSignature(u) {
      u && (this._verifyUpdateCodeSignature = u);
    }
    /*** @private */
    doDownloadUpdate(u) {
      const p = u.updateInfoAndProvider.provider, h = (0, o.findFile)(p.resolveFiles(u.updateInfoAndProvider.info), "exe");
      return this.executeDownload({
        fileExtension: "exe",
        downloadUpdateOptions: u,
        fileInfo: h,
        task: async (v, _, g, m) => {
          const E = h.packageInfo, N = E != null && g != null;
          if (N && u.disableWebInstaller)
            throw (0, e.newError)(`Unable to download new version ${u.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !N && !u.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (N || u.disableDifferentialDownload || await this.differentialDownloadInstaller(h, u, v, p, e.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(h.url, v, _);
          const R = await this.verifySignature(v);
          if (R != null)
            throw await m(), (0, e.newError)(`New version ${u.updateInfoAndProvider.info.version} is not signed by the application owner: ${R}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (N && await this.differentialDownloadWebPackage(u, E, g, p))
            try {
              await this.httpExecutor.download(new c.URL(E.path), g, {
                headers: u.requestHeaders,
                cancellationToken: u.cancellationToken,
                sha512: E.sha512
              });
            } catch (F) {
              try {
                await (0, a.unlink)(g);
              } catch {
              }
              throw F;
            }
        }
      });
    }
    // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
    // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
    // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
    async verifySignature(u) {
      let p;
      try {
        if (p = (await this.configOnDisk.value).publisherName, p == null)
          return null;
      } catch (h) {
        if (h.code === "ENOENT")
          return null;
        throw h;
      }
      return await this._verifyUpdateCodeSignature(Array.isArray(p) ? p : [p], u);
    }
    doInstall(u) {
      const p = ["--updated"];
      u.isSilent && p.push("/S"), u.isForceRunAfter && p.push("--force-run"), this.installDirectory && p.push(`/D=${this.installDirectory}`);
      const h = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
      h != null && p.push(`--package-file=${h}`);
      const v = () => {
        this.spawnLog(t.join(process.resourcesPath, "elevate.exe"), [u.installerPath].concat(p)).catch((_) => this.dispatchError(_));
      };
      return u.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), v(), !0) : (this.spawnLog(u.installerPath, p).catch((_) => {
        const g = _.code;
        this._logger.info(`Cannot run installer: error code: ${g}, error message: "${_.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), g === "UNKNOWN" || g === "EACCES" ? v() : g === "ENOENT" ? Dr.shell.openPath(u.installerPath).catch((m) => this.dispatchError(m)) : this.dispatchError(_);
      }), !0);
    }
    async differentialDownloadWebPackage(u, p, h, v) {
      if (p.blockMapSize == null)
        return !0;
      try {
        const _ = {
          newUrl: new c.URL(p.path),
          oldFile: t.join(this.downloadedUpdateHelper.cacheDir, e.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: h,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: v.isUseMultipleRangeRequest,
          cancellationToken: u.cancellationToken
        };
        this.listenerCount(i.DOWNLOAD_PROGRESS) > 0 && (_.onProgress = (g) => this.emit(i.DOWNLOAD_PROGRESS, g)), await new n.FileWithEmbeddedBlockMapDifferentialDownloader(p, this.httpExecutor, _).download();
      } catch (_) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${_.stack || _}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return mo.NsisUpdater = f, mo;
}
var lm;
function qi() {
  return lm || (lm = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.CancellationToken = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
    const t = Ke;
    Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
      return t.CancellationToken;
    } });
    const r = yn, n = me;
    var i = ma();
    Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
      return i.BaseUpdater;
    } });
    var o = Bu();
    Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
      return o.AppUpdater;
    } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
      return o.NoOpLogger;
    } });
    var a = We;
    Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
      return a.Provider;
    } });
    var s = Qp();
    Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
      return s.AppImageUpdater;
    } });
    var c = em();
    Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
      return c.DebUpdater;
    } });
    var f = rm();
    Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
      return f.RpmUpdater;
    } });
    var l = im();
    Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
      return l.MacUpdater;
    } });
    var u = cm();
    Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
      return u.NsisUpdater;
    } });
    let p;
    function h() {
      if (process.platform === "win32")
        p = new (cm()).NsisUpdater();
      else if (process.platform === "darwin")
        p = new (im()).MacUpdater();
      else {
        p = new (Qp()).AppImageUpdater();
        try {
          const g = n.join(process.resourcesPath, "package-type");
          if (!(0, r.existsSync)(g))
            return p;
          console.info("Checking for beta autoupdate feature for deb/rpm distributions");
          const m = (0, r.readFileSync)(g).toString().trim();
          switch (console.info("Found package-type:", m), m) {
            case "deb":
              p = new (em()).DebUpdater();
              break;
            case "rpm":
              p = new (rm()).RpmUpdater();
              break;
            default:
              break;
          }
        } catch (g) {
          console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", g.message);
        }
      }
      return p;
    }
    Object.defineProperty(e, "autoUpdater", {
      enumerable: !0,
      get: () => p || h()
    }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
    class v {
      constructor(m) {
        this.emitter = m;
      }
      /**
       * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
       */
      login(m) {
        _(this.emitter, "login", m);
      }
      progress(m) {
        _(this.emitter, e.DOWNLOAD_PROGRESS, m);
      }
      updateDownloaded(m) {
        _(this.emitter, e.UPDATE_DOWNLOADED, m);
      }
      updateCancelled(m) {
        _(this.emitter, "update-cancelled", m);
      }
    }
    e.UpdaterSignal = v;
    function _(g, m, E) {
      g.on(m, E);
    }
  }(Mc)), Mc;
}
var pr = qi(), St = {};
(function(e) {
  const t = $e.fromCallback, r = He, n = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "cp",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "glob",
    "lchmod",
    "lchown",
    "lutimes",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "statfs",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof r[i] == "function");
  Object.assign(e, r), n.forEach((i) => {
    e[i] = t(r[i]);
  }), e.exists = function(i, o) {
    return typeof o == "function" ? r.exists(i, o) : new Promise((a) => r.exists(i, a));
  }, e.read = function(i, o, a, s, c, f) {
    return typeof f == "function" ? r.read(i, o, a, s, c, f) : new Promise((l, u) => {
      r.read(i, o, a, s, c, (p, h, v) => {
        if (p) return u(p);
        l({ bytesRead: h, buffer: v });
      });
    });
  }, e.write = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.write(i, o, ...a) : new Promise((s, c) => {
      r.write(i, o, ...a, (f, l, u) => {
        if (f) return c(f);
        s({ bytesWritten: l, buffer: u });
      });
    });
  }, e.readv = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.readv(i, o, ...a) : new Promise((s, c) => {
      r.readv(i, o, ...a, (f, l, u) => {
        if (f) return c(f);
        s({ bytesRead: l, buffers: u });
      });
    });
  }, e.writev = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.writev(i, o, ...a) : new Promise((s, c) => {
      r.writev(i, o, ...a, (f, l, u) => {
        if (f) return c(f);
        s({ bytesWritten: l, buffers: u });
      });
    });
  }, typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(St);
var Ku = {}, K0 = {};
const wC = me;
K0.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(wC.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const W0 = St, { checkPath: Y0 } = K0, J0 = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
Ku.makeDir = async (e, t) => (Y0(e), W0.mkdir(e, {
  mode: J0(t),
  recursive: !0
}));
Ku.makeDirSync = (e, t) => (Y0(e), W0.mkdirSync(e, {
  mode: J0(t),
  recursive: !0
}));
const EC = $e.fromPromise, { makeDir: SC, makeDirSync: dl } = Ku, hl = EC(SC);
var yr = {
  mkdirs: hl,
  mkdirsSync: dl,
  // alias
  mkdirp: hl,
  mkdirpSync: dl,
  ensureDir: hl,
  ensureDirSync: dl
};
const bC = $e.fromPromise, X0 = St;
function PC(e) {
  return X0.access(e).then(() => !0).catch(() => !1);
}
var Xn = {
  pathExists: bC(PC),
  pathExistsSync: X0.existsSync
};
const Ei = St, TC = $e.fromPromise;
async function NC(e, t, r) {
  const n = await Ei.open(e, "r+");
  let i = null;
  try {
    await Ei.futimes(n, t, r);
  } finally {
    try {
      await Ei.close(n);
    } catch (o) {
      i = o;
    }
  }
  if (i)
    throw i;
}
function OC(e, t, r) {
  const n = Ei.openSync(e, "r+");
  return Ei.futimesSync(n, t, r), Ei.closeSync(n);
}
var Q0 = {
  utimesMillis: TC(NC),
  utimesMillisSync: OC
};
const Ri = St, ze = me, um = $e.fromPromise;
function AC(e, t, r) {
  const n = r.dereference ? (i) => Ri.stat(i, { bigint: !0 }) : (i) => Ri.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
}
function CC(e, t, r) {
  let n;
  const i = r.dereference ? (a) => Ri.statSync(a, { bigint: !0 }) : (a) => Ri.lstatSync(a, { bigint: !0 }), o = i(e);
  try {
    n = i(t);
  } catch (a) {
    if (a.code === "ENOENT") return { srcStat: o, destStat: null };
    throw a;
  }
  return { srcStat: o, destStat: n };
}
async function RC(e, t, r, n) {
  const { srcStat: i, destStat: o } = await AC(e, t, n);
  if (o) {
    if (ga(i, o)) {
      const a = ze.basename(e), s = ze.basename(t);
      if (r === "move" && a !== s && a.toLowerCase() === s.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && Wu(e, t))
    throw new Error(mc(e, t, r));
  return { srcStat: i, destStat: o };
}
function IC(e, t, r, n) {
  const { srcStat: i, destStat: o } = CC(e, t, n);
  if (o) {
    if (ga(i, o)) {
      const a = ze.basename(e), s = ze.basename(t);
      if (r === "move" && a !== s && a.toLowerCase() === s.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && Wu(e, t))
    throw new Error(mc(e, t, r));
  return { srcStat: i, destStat: o };
}
async function Z0(e, t, r, n) {
  const i = ze.resolve(ze.dirname(e)), o = ze.resolve(ze.dirname(r));
  if (o === i || o === ze.parse(o).root) return;
  let a;
  try {
    a = await Ri.stat(o, { bigint: !0 });
  } catch (s) {
    if (s.code === "ENOENT") return;
    throw s;
  }
  if (ga(t, a))
    throw new Error(mc(e, r, n));
  return Z0(e, t, o, n);
}
function e$(e, t, r, n) {
  const i = ze.resolve(ze.dirname(e)), o = ze.resolve(ze.dirname(r));
  if (o === i || o === ze.parse(o).root) return;
  let a;
  try {
    a = Ri.statSync(o, { bigint: !0 });
  } catch (s) {
    if (s.code === "ENOENT") return;
    throw s;
  }
  if (ga(t, a))
    throw new Error(mc(e, r, n));
  return e$(e, t, o, n);
}
function ga(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function Wu(e, t) {
  const r = ze.resolve(e).split(ze.sep).filter((i) => i), n = ze.resolve(t).split(ze.sep).filter((i) => i);
  return r.every((i, o) => n[o] === i);
}
function mc(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Vi = {
  // checkPaths
  checkPaths: um(RC),
  checkPathsSync: IC,
  // checkParent
  checkParentPaths: um(Z0),
  checkParentPathsSync: e$,
  // Misc
  isSrcSubdir: Wu,
  areIdentical: ga
};
const ft = St, Yo = me, { mkdirs: kC } = yr, { pathExists: DC } = Xn, { utimesMillis: FC } = Q0, Jo = Vi;
async function jC(e, t, r = {}) {
  typeof r == "function" && (r = { filter: r }), r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  );
  const { srcStat: n, destStat: i } = await Jo.checkPaths(e, t, "copy", r);
  if (await Jo.checkParentPaths(e, n, t, "copy"), !await t$(e, t, r)) return;
  const a = Yo.dirname(t);
  await DC(a) || await kC(a), await r$(i, e, t, r);
}
async function t$(e, t, r) {
  return r.filter ? r.filter(e, t) : !0;
}
async function r$(e, t, r, n) {
  const o = await (n.dereference ? ft.stat : ft.lstat)(t);
  if (o.isDirectory()) return xC(o, e, t, r, n);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return LC(o, e, t, r, n);
  if (o.isSymbolicLink()) return qC(e, t, r, n);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
async function LC(e, t, r, n, i) {
  if (!t) return fm(e, r, n, i);
  if (i.overwrite)
    return await ft.unlink(n), fm(e, r, n, i);
  if (i.errorOnExist)
    throw new Error(`'${n}' already exists`);
}
async function fm(e, t, r, n) {
  if (await ft.copyFile(t, r), n.preserveTimestamps) {
    MC(e.mode) && await UC(r, e.mode);
    const i = await ft.stat(t);
    await FC(r, i.atime, i.mtime);
  }
  return ft.chmod(r, e.mode);
}
function MC(e) {
  return (e & 128) === 0;
}
function UC(e, t) {
  return ft.chmod(e, t | 128);
}
async function xC(e, t, r, n, i) {
  t || await ft.mkdir(n);
  const o = [];
  for await (const a of await ft.opendir(r)) {
    const s = Yo.join(r, a.name), c = Yo.join(n, a.name);
    o.push(
      t$(s, c, i).then((f) => {
        if (f)
          return Jo.checkPaths(s, c, "copy", i).then(({ destStat: l }) => r$(l, s, c, i));
      })
    );
  }
  await Promise.all(o), t || await ft.chmod(n, e.mode);
}
async function qC(e, t, r, n) {
  let i = await ft.readlink(t);
  if (n.dereference && (i = Yo.resolve(process.cwd(), i)), !e)
    return ft.symlink(i, r);
  let o = null;
  try {
    o = await ft.readlink(r);
  } catch (a) {
    if (a.code === "EINVAL" || a.code === "UNKNOWN") return ft.symlink(i, r);
    throw a;
  }
  if (n.dereference && (o = Yo.resolve(process.cwd(), o)), Jo.isSrcSubdir(i, o))
    throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
  if (Jo.isSrcSubdir(o, i))
    throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
  return await ft.unlink(r), ft.symlink(i, r);
}
var VC = jC;
const gt = He, Xo = me, HC = yr.mkdirsSync, GC = Q0.utimesMillisSync, Qo = Vi;
function BC(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = Qo.checkPathsSync(e, t, "copy", r);
  if (Qo.checkParentPathsSync(e, n, t, "copy"), r.filter && !r.filter(e, t)) return;
  const o = Xo.dirname(t);
  return gt.existsSync(o) || HC(o), n$(i, e, t, r);
}
function n$(e, t, r, n) {
  const o = (n.dereference ? gt.statSync : gt.lstatSync)(t);
  if (o.isDirectory()) return QC(o, e, t, r, n);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return zC(o, e, t, r, n);
  if (o.isSymbolicLink()) return tR(e, t, r, n);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function zC(e, t, r, n, i) {
  return t ? KC(e, r, n, i) : i$(e, r, n, i);
}
function KC(e, t, r, n) {
  if (n.overwrite)
    return gt.unlinkSync(r), i$(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function i$(e, t, r, n) {
  return gt.copyFileSync(t, r), n.preserveTimestamps && WC(e.mode, t, r), Yu(r, e.mode);
}
function WC(e, t, r) {
  return YC(e) && JC(r, e), XC(t, r);
}
function YC(e) {
  return (e & 128) === 0;
}
function JC(e, t) {
  return Yu(e, t | 128);
}
function Yu(e, t) {
  return gt.chmodSync(e, t);
}
function XC(e, t) {
  const r = gt.statSync(e);
  return GC(t, r.atime, r.mtime);
}
function QC(e, t, r, n, i) {
  return t ? o$(r, n, i) : ZC(e.mode, r, n, i);
}
function ZC(e, t, r, n) {
  return gt.mkdirSync(r), o$(t, r, n), Yu(r, e);
}
function o$(e, t, r) {
  const n = gt.opendirSync(e);
  try {
    let i;
    for (; (i = n.readSync()) !== null; )
      eR(i.name, e, t, r);
  } finally {
    n.closeSync();
  }
}
function eR(e, t, r, n) {
  const i = Xo.join(t, e), o = Xo.join(r, e);
  if (n.filter && !n.filter(i, o)) return;
  const { destStat: a } = Qo.checkPathsSync(i, o, "copy", n);
  return n$(a, i, o, n);
}
function tR(e, t, r, n) {
  let i = gt.readlinkSync(t);
  if (n.dereference && (i = Xo.resolve(process.cwd(), i)), e) {
    let o;
    try {
      o = gt.readlinkSync(r);
    } catch (a) {
      if (a.code === "EINVAL" || a.code === "UNKNOWN") return gt.symlinkSync(i, r);
      throw a;
    }
    if (n.dereference && (o = Xo.resolve(process.cwd(), o)), Qo.isSrcSubdir(i, o))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
    if (Qo.isSrcSubdir(o, i))
      throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
    return rR(i, r);
  } else
    return gt.symlinkSync(i, r);
}
function rR(e, t) {
  return gt.unlinkSync(t), gt.symlinkSync(e, t);
}
var nR = BC;
const iR = $e.fromPromise;
var Ju = {
  copy: iR(VC),
  copySync: nR
};
const a$ = He, oR = $e.fromCallback;
function aR(e, t) {
  a$.rm(e, { recursive: !0, force: !0 }, t);
}
function sR(e) {
  a$.rmSync(e, { recursive: !0, force: !0 });
}
var yc = {
  remove: oR(aR),
  removeSync: sR
};
const cR = $e.fromPromise, s$ = St, c$ = me, l$ = yr, u$ = yc, dm = cR(async function(t) {
  let r;
  try {
    r = await s$.readdir(t);
  } catch {
    return l$.mkdirs(t);
  }
  return Promise.all(r.map((n) => u$.remove(c$.join(t, n))));
});
function hm(e) {
  let t;
  try {
    t = s$.readdirSync(e);
  } catch {
    return l$.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = c$.join(e, r), u$.removeSync(r);
  });
}
var lR = {
  emptyDirSync: hm,
  emptydirSync: hm,
  emptyDir: dm,
  emptydir: dm
};
const uR = $e.fromPromise, f$ = me, Ar = St, d$ = yr;
async function fR(e) {
  let t;
  try {
    t = await Ar.stat(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = f$.dirname(e);
  let n = null;
  try {
    n = await Ar.stat(r);
  } catch (i) {
    if (i.code === "ENOENT") {
      await d$.mkdirs(r), await Ar.writeFile(e, "");
      return;
    } else
      throw i;
  }
  n.isDirectory() ? await Ar.writeFile(e, "") : await Ar.readdir(r);
}
function dR(e) {
  let t;
  try {
    t = Ar.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = f$.dirname(e);
  try {
    Ar.statSync(r).isDirectory() || Ar.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") d$.mkdirsSync(r);
    else throw n;
  }
  Ar.writeFileSync(e, "");
}
var hR = {
  createFile: uR(fR),
  createFileSync: dR
};
const pR = $e.fromPromise, h$ = me, Zr = St, p$ = yr, { pathExists: mR } = Xn, { areIdentical: m$ } = Vi;
async function yR(e, t) {
  let r;
  try {
    r = await Zr.lstat(t);
  } catch {
  }
  let n;
  try {
    n = await Zr.lstat(e);
  } catch (a) {
    throw a.message = a.message.replace("lstat", "ensureLink"), a;
  }
  if (r && m$(n, r)) return;
  const i = h$.dirname(t);
  await mR(i) || await p$.mkdirs(i), await Zr.link(e, t);
}
function gR(e, t) {
  let r;
  try {
    r = Zr.lstatSync(t);
  } catch {
  }
  try {
    const o = Zr.lstatSync(e);
    if (r && m$(o, r)) return;
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  const n = h$.dirname(t);
  return Zr.existsSync(n) || p$.mkdirsSync(n), Zr.linkSync(e, t);
}
var $R = {
  createLink: pR(yR),
  createLinkSync: gR
};
const on = me, Ao = St, { pathExists: vR } = Xn, _R = $e.fromPromise;
async function wR(e, t) {
  if (on.isAbsolute(e)) {
    try {
      await Ao.lstat(e);
    } catch (o) {
      throw o.message = o.message.replace("lstat", "ensureSymlink"), o;
    }
    return {
      toCwd: e,
      toDst: e
    };
  }
  const r = on.dirname(t), n = on.join(r, e);
  if (await vR(n))
    return {
      toCwd: n,
      toDst: e
    };
  try {
    await Ao.lstat(e);
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureSymlink"), o;
  }
  return {
    toCwd: e,
    toDst: on.relative(r, e)
  };
}
function ER(e, t) {
  if (on.isAbsolute(e)) {
    if (!Ao.existsSync(e)) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  }
  const r = on.dirname(t), n = on.join(r, e);
  if (Ao.existsSync(n))
    return {
      toCwd: n,
      toDst: e
    };
  if (!Ao.existsSync(e)) throw new Error("relative srcpath does not exist");
  return {
    toCwd: e,
    toDst: on.relative(r, e)
  };
}
var SR = {
  symlinkPaths: _R(wR),
  symlinkPathsSync: ER
};
const y$ = St, bR = $e.fromPromise;
async function PR(e, t) {
  if (t) return t;
  let r;
  try {
    r = await y$.lstat(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
function TR(e, t) {
  if (t) return t;
  let r;
  try {
    r = y$.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var NR = {
  symlinkType: bR(PR),
  symlinkTypeSync: TR
};
const OR = $e.fromPromise, g$ = me, ar = St, { mkdirs: AR, mkdirsSync: CR } = yr, { symlinkPaths: RR, symlinkPathsSync: IR } = SR, { symlinkType: kR, symlinkTypeSync: DR } = NR, { pathExists: FR } = Xn, { areIdentical: $$ } = Vi;
async function jR(e, t, r) {
  let n;
  try {
    n = await ar.lstat(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const [s, c] = await Promise.all([
      ar.stat(e),
      ar.stat(t)
    ]);
    if ($$(s, c)) return;
  }
  const i = await RR(e, t);
  e = i.toDst;
  const o = await kR(i.toCwd, r), a = g$.dirname(t);
  return await FR(a) || await AR(a), ar.symlink(e, t, o);
}
function LR(e, t, r) {
  let n;
  try {
    n = ar.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const s = ar.statSync(e), c = ar.statSync(t);
    if ($$(s, c)) return;
  }
  const i = IR(e, t);
  e = i.toDst, r = DR(i.toCwd, r);
  const o = g$.dirname(t);
  return ar.existsSync(o) || CR(o), ar.symlinkSync(e, t, r);
}
var MR = {
  createSymlink: OR(jR),
  createSymlinkSync: LR
};
const { createFile: pm, createFileSync: mm } = hR, { createLink: ym, createLinkSync: gm } = $R, { createSymlink: $m, createSymlinkSync: vm } = MR;
var UR = {
  // file
  createFile: pm,
  createFileSync: mm,
  ensureFile: pm,
  ensureFileSync: mm,
  // link
  createLink: ym,
  createLinkSync: gm,
  ensureLink: ym,
  ensureLinkSync: gm,
  // symlink
  createSymlink: $m,
  createSymlinkSync: vm,
  ensureSymlink: $m,
  ensureSymlinkSync: vm
};
const Ba = kg;
var xR = {
  // jsonfile exports
  readJson: Ba.readFile,
  readJsonSync: Ba.readFileSync,
  writeJson: Ba.writeFile,
  writeJsonSync: Ba.writeFileSync
};
const qR = $e.fromPromise, Wl = St, v$ = me, _$ = yr, VR = Xn.pathExists;
async function HR(e, t, r = "utf-8") {
  const n = v$.dirname(e);
  return await VR(n) || await _$.mkdirs(n), Wl.writeFile(e, t, r);
}
function GR(e, ...t) {
  const r = v$.dirname(e);
  Wl.existsSync(r) || _$.mkdirsSync(r), Wl.writeFileSync(e, ...t);
}
var Xu = {
  outputFile: qR(HR),
  outputFileSync: GR
};
const { stringify: BR } = ca, { outputFile: zR } = Xu;
async function KR(e, t, r = {}) {
  const n = BR(t, r);
  await zR(e, n, r);
}
var WR = KR;
const { stringify: YR } = ca, { outputFileSync: JR } = Xu;
function XR(e, t, r) {
  const n = YR(t, r);
  JR(e, n, r);
}
var QR = XR;
const ZR = $e.fromPromise, _t = xR;
_t.outputJson = ZR(WR);
_t.outputJsonSync = QR;
_t.outputJSON = _t.outputJson;
_t.outputJSONSync = _t.outputJsonSync;
_t.writeJSON = _t.writeJson;
_t.writeJSONSync = _t.writeJsonSync;
_t.readJSON = _t.readJson;
_t.readJSONSync = _t.readJsonSync;
var eI = _t;
const tI = St, _m = me, { copy: rI } = Ju, { remove: w$ } = yc, { mkdirp: nI } = yr, { pathExists: iI } = Xn, wm = Vi;
async function oI(e, t, r = {}) {
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = await wm.checkPaths(e, t, "move", r);
  await wm.checkParentPaths(e, i, t, "move");
  const a = _m.dirname(t);
  return _m.parse(a).root !== a && await nI(a), aI(e, t, n, o);
}
async function aI(e, t, r, n) {
  if (!n) {
    if (r)
      await w$(t);
    else if (await iI(t))
      throw new Error("dest already exists.");
  }
  try {
    await tI.rename(e, t);
  } catch (i) {
    if (i.code !== "EXDEV")
      throw i;
    await sI(e, t, r);
  }
}
async function sI(e, t, r) {
  return await rI(e, t, {
    overwrite: r,
    errorOnExist: !0,
    preserveTimestamps: !0
  }), w$(e);
}
var cI = oI;
const E$ = He, Yl = me, lI = Ju.copySync, S$ = yc.removeSync, uI = yr.mkdirpSync, Em = Vi;
function fI(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = Em.checkPathsSync(e, t, "move", r);
  return Em.checkParentPathsSync(e, i, t, "move"), dI(t) || uI(Yl.dirname(t)), hI(e, t, n, o);
}
function dI(e) {
  const t = Yl.dirname(e);
  return Yl.parse(t).root === t;
}
function hI(e, t, r, n) {
  if (n) return pl(e, t, r);
  if (r)
    return S$(t), pl(e, t, r);
  if (E$.existsSync(t)) throw new Error("dest already exists.");
  return pl(e, t, r);
}
function pl(e, t, r) {
  try {
    E$.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return pI(e, t, r);
  }
}
function pI(e, t, r) {
  return lI(e, t, {
    overwrite: r,
    errorOnExist: !0,
    preserveTimestamps: !0
  }), S$(e);
}
var mI = fI;
const yI = $e.fromPromise;
var gI = {
  move: yI(cI),
  moveSync: mI
}, $I = {
  // Export promiseified graceful-fs:
  ...St,
  // Export extra methods:
  ...Ju,
  ...lR,
  ...UR,
  ...eI,
  ...yr,
  ...gI,
  ...Xu,
  ...Xn,
  ...yc
};
const Ze = /* @__PURE__ */ zs($I), Gn = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
}, ml = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), vI = new Set("0123456789");
function gc(e) {
  const t = [];
  let r = "", n = "start", i = !1;
  for (const o of e)
    switch (o) {
      case "\\": {
        if (n === "index")
          throw new Error("Invalid character in an index");
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
        i && (r += o), n = "property", i = !i;
        break;
      }
      case ".": {
        if (n === "index")
          throw new Error("Invalid character in an index");
        if (n === "indexEnd") {
          n = "property";
          break;
        }
        if (i) {
          i = !1, r += o;
          break;
        }
        if (ml.has(r))
          return [];
        t.push(r), r = "", n = "property";
        break;
      }
      case "[": {
        if (n === "index")
          throw new Error("Invalid character in an index");
        if (n === "indexEnd") {
          n = "index";
          break;
        }
        if (i) {
          i = !1, r += o;
          break;
        }
        if (n === "property") {
          if (ml.has(r))
            return [];
          t.push(r), r = "";
        }
        n = "index";
        break;
      }
      case "]": {
        if (n === "index") {
          t.push(Number.parseInt(r, 10)), r = "", n = "indexEnd";
          break;
        }
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
      }
      default: {
        if (n === "index" && !vI.has(o))
          throw new Error("Invalid character in an index");
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
        n === "start" && (n = "property"), i && (i = !1, r += "\\"), r += o;
      }
    }
  switch (i && (r += "\\"), n) {
    case "property": {
      if (ml.has(r))
        return [];
      t.push(r);
      break;
    }
    case "index":
      throw new Error("Index was not closed");
    case "start": {
      t.push("");
      break;
    }
  }
  return t;
}
function Qu(e, t) {
  if (typeof t != "number" && Array.isArray(e)) {
    const r = Number.parseInt(t, 10);
    return Number.isInteger(r) && e[r] === e[t];
  }
  return !1;
}
function b$(e, t) {
  if (Qu(e, t))
    throw new Error("Cannot use string index");
}
function _I(e, t, r) {
  if (!Gn(e) || typeof t != "string")
    return r === void 0 ? e : r;
  const n = gc(t);
  if (n.length === 0)
    return r;
  for (let i = 0; i < n.length; i++) {
    const o = n[i];
    if (Qu(e, o) ? e = i === n.length - 1 ? void 0 : null : e = e[o], e == null) {
      if (i !== n.length - 1)
        return r;
      break;
    }
  }
  return e === void 0 ? r : e;
}
function Sm(e, t, r) {
  if (!Gn(e) || typeof t != "string")
    return e;
  const n = e, i = gc(t);
  for (let o = 0; o < i.length; o++) {
    const a = i[o];
    b$(e, a), o === i.length - 1 ? e[a] = r : Gn(e[a]) || (e[a] = typeof i[o + 1] == "number" ? [] : {}), e = e[a];
  }
  return n;
}
function wI(e, t) {
  if (!Gn(e) || typeof t != "string")
    return !1;
  const r = gc(t);
  for (let n = 0; n < r.length; n++) {
    const i = r[n];
    if (b$(e, i), n === r.length - 1)
      return delete e[i], !0;
    if (e = e[i], !Gn(e))
      return !1;
  }
}
function EI(e, t) {
  if (!Gn(e) || typeof t != "string")
    return !1;
  const r = gc(t);
  if (r.length === 0)
    return !1;
  for (const n of r) {
    if (!Gn(e) || !(n in e) || Qu(e, n))
      return !1;
    e = e[n];
  }
  return !0;
}
const en = Bs.homedir(), Zu = Bs.tmpdir(), { env: $i } = Ve, SI = (e) => {
  const t = oe.join(en, "Library");
  return {
    data: oe.join(t, "Application Support", e),
    config: oe.join(t, "Preferences", e),
    cache: oe.join(t, "Caches", e),
    log: oe.join(t, "Logs", e),
    temp: oe.join(Zu, e)
  };
}, bI = (e) => {
  const t = $i.APPDATA || oe.join(en, "AppData", "Roaming"), r = $i.LOCALAPPDATA || oe.join(en, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: oe.join(r, e, "Data"),
    config: oe.join(t, e, "Config"),
    cache: oe.join(r, e, "Cache"),
    log: oe.join(r, e, "Log"),
    temp: oe.join(Zu, e)
  };
}, PI = (e) => {
  const t = oe.basename(en);
  return {
    data: oe.join($i.XDG_DATA_HOME || oe.join(en, ".local", "share"), e),
    config: oe.join($i.XDG_CONFIG_HOME || oe.join(en, ".config"), e),
    cache: oe.join($i.XDG_CACHE_HOME || oe.join(en, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: oe.join($i.XDG_STATE_HOME || oe.join(en, ".local", "state"), e),
    temp: oe.join(Zu, t, e)
  };
};
function TI(e, { suffix: t = "nodejs" } = {}) {
  if (typeof e != "string")
    throw new TypeError(`Expected a string, got ${typeof e}`);
  return t && (e += `-${t}`), Ve.platform === "darwin" ? SI(e) : Ve.platform === "win32" ? bI(e) : PI(e);
}
const Hr = (e, t) => function(...n) {
  return e.apply(void 0, n).catch(t);
}, Pr = (e, t) => function(...n) {
  try {
    return e.apply(void 0, n);
  } catch (i) {
    return t(i);
  }
}, NI = Ve.getuid ? !Ve.getuid() : !1, OI = 1e4, kt = () => {
}, Ce = {
  /* API */
  isChangeErrorOk: (e) => {
    if (!Ce.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "ENOSYS" || !NI && (t === "EINVAL" || t === "EPERM");
  },
  isNodeError: (e) => e instanceof Error,
  isRetriableError: (e) => {
    if (!Ce.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCES" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!Ce.isNodeError(e))
      throw e;
    if (!Ce.isChangeErrorOk(e))
      throw e;
  }
};
class AI {
  constructor() {
    this.interval = 25, this.intervalId = void 0, this.limit = OI, this.queueActive = /* @__PURE__ */ new Set(), this.queueWaiting = /* @__PURE__ */ new Set(), this.init = () => {
      this.intervalId || (this.intervalId = setInterval(this.tick, this.interval));
    }, this.reset = () => {
      this.intervalId && (clearInterval(this.intervalId), delete this.intervalId);
    }, this.add = (t) => {
      this.queueWaiting.add(t), this.queueActive.size < this.limit / 2 ? this.tick() : this.init();
    }, this.remove = (t) => {
      this.queueWaiting.delete(t), this.queueActive.delete(t);
    }, this.schedule = () => new Promise((t) => {
      const r = () => this.remove(n), n = () => t(r);
      this.add(n);
    }), this.tick = () => {
      if (!(this.queueActive.size >= this.limit)) {
        if (!this.queueWaiting.size)
          return this.reset();
        for (const t of this.queueWaiting) {
          if (this.queueActive.size >= this.limit)
            break;
          this.queueWaiting.delete(t), this.queueActive.add(t), t();
        }
      }
    };
  }
}
const CI = new AI(), Gr = (e, t) => function(n) {
  return function i(...o) {
    return CI.schedule().then((a) => {
      const s = (f) => (a(), f), c = (f) => {
        if (a(), Date.now() >= n)
          throw f;
        if (t(f)) {
          const l = Math.round(100 * Math.random());
          return new Promise((p) => setTimeout(p, l)).then(() => i.apply(void 0, o));
        }
        throw f;
      };
      return e.apply(void 0, o).then(s, c);
    });
  };
}, Br = (e, t) => function(n) {
  return function i(...o) {
    try {
      return e.apply(void 0, o);
    } catch (a) {
      if (Date.now() > n)
        throw a;
      if (t(a))
        return i.apply(void 0, o);
      throw a;
    }
  };
}, lt = {
  attempt: {
    /* ASYNC */
    chmod: Hr(at(ue.chmod), Ce.onChangeError),
    chown: Hr(at(ue.chown), Ce.onChangeError),
    close: Hr(at(ue.close), kt),
    fsync: Hr(at(ue.fsync), kt),
    mkdir: Hr(at(ue.mkdir), kt),
    realpath: Hr(at(ue.realpath), kt),
    stat: Hr(at(ue.stat), kt),
    unlink: Hr(at(ue.unlink), kt),
    /* SYNC */
    chmodSync: Pr(ue.chmodSync, Ce.onChangeError),
    chownSync: Pr(ue.chownSync, Ce.onChangeError),
    closeSync: Pr(ue.closeSync, kt),
    existsSync: Pr(ue.existsSync, kt),
    fsyncSync: Pr(ue.fsync, kt),
    mkdirSync: Pr(ue.mkdirSync, kt),
    realpathSync: Pr(ue.realpathSync, kt),
    statSync: Pr(ue.statSync, kt),
    unlinkSync: Pr(ue.unlinkSync, kt)
  },
  retry: {
    /* ASYNC */
    close: Gr(at(ue.close), Ce.isRetriableError),
    fsync: Gr(at(ue.fsync), Ce.isRetriableError),
    open: Gr(at(ue.open), Ce.isRetriableError),
    readFile: Gr(at(ue.readFile), Ce.isRetriableError),
    rename: Gr(at(ue.rename), Ce.isRetriableError),
    stat: Gr(at(ue.stat), Ce.isRetriableError),
    write: Gr(at(ue.write), Ce.isRetriableError),
    writeFile: Gr(at(ue.writeFile), Ce.isRetriableError),
    /* SYNC */
    closeSync: Br(ue.closeSync, Ce.isRetriableError),
    fsyncSync: Br(ue.fsyncSync, Ce.isRetriableError),
    openSync: Br(ue.openSync, Ce.isRetriableError),
    readFileSync: Br(ue.readFileSync, Ce.isRetriableError),
    renameSync: Br(ue.renameSync, Ce.isRetriableError),
    statSync: Br(ue.statSync, Ce.isRetriableError),
    writeSync: Br(ue.writeSync, Ce.isRetriableError),
    writeFileSync: Br(ue.writeFileSync, Ce.isRetriableError)
  }
}, RI = "utf8", bm = 438, II = 511, kI = {}, DI = Bs.userInfo().uid, FI = Bs.userInfo().gid, jI = 1e3, LI = !!Ve.getuid;
Ve.getuid && Ve.getuid();
const Pm = 128, MI = (e) => e instanceof Error && "code" in e, Tm = (e) => typeof e == "string", yl = (e) => e === void 0, UI = Ve.platform === "linux", P$ = Ve.platform === "win32", ef = ["SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM"];
P$ || ef.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
UI && ef.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
class xI {
  /* CONSTRUCTOR */
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set(), this.exited = !1, this.exit = (t) => {
      if (!this.exited) {
        this.exited = !0;
        for (const r of this.callbacks)
          r();
        t && (P$ && t !== "SIGINT" && t !== "SIGTERM" && t !== "SIGKILL" ? Ve.kill(Ve.pid, "SIGTERM") : Ve.kill(Ve.pid, t));
      }
    }, this.hook = () => {
      Ve.once("exit", () => this.exit());
      for (const t of ef)
        try {
          Ve.once(t, () => this.exit(t));
        } catch {
        }
    }, this.register = (t) => (this.callbacks.add(t), () => {
      this.callbacks.delete(t);
    }), this.hook();
  }
}
const qI = new xI(), VI = qI.register, ut = {
  /* VARIABLES */
  store: {},
  /* API */
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), i = `.tmp-${Date.now().toString().slice(-10)}${t}`;
    return `${e}${i}`;
  },
  get: (e, t, r = !0) => {
    const n = ut.truncate(t(e));
    return n in ut.store ? ut.get(e, t, r) : (ut.store[n] = r, [n, () => delete ut.store[n]]);
  },
  purge: (e) => {
    ut.store[e] && (delete ut.store[e], lt.attempt.unlink(e));
  },
  purgeSync: (e) => {
    ut.store[e] && (delete ut.store[e], lt.attempt.unlinkSync(e));
  },
  purgeSyncAll: () => {
    for (const e in ut.store)
      ut.purgeSync(e);
  },
  truncate: (e) => {
    const t = oe.basename(e);
    if (t.length <= Pm)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - Pm;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
VI(ut.purgeSyncAll);
function T$(e, t, r = kI) {
  if (Tm(r))
    return T$(e, t, { encoding: r });
  const n = Date.now() + ((r.timeout ?? jI) || -1);
  let i = null, o = null, a = null;
  try {
    const s = lt.attempt.realpathSync(e), c = !!s;
    e = s || e, [o, i] = ut.get(e, r.tmpCreate || ut.create, r.tmpPurge !== !1);
    const f = LI && yl(r.chown), l = yl(r.mode);
    if (c && (f || l)) {
      const u = lt.attempt.statSync(e);
      u && (r = { ...r }, f && (r.chown = { uid: u.uid, gid: u.gid }), l && (r.mode = u.mode));
    }
    if (!c) {
      const u = oe.dirname(e);
      lt.attempt.mkdirSync(u, {
        mode: II,
        recursive: !0
      });
    }
    a = lt.retry.openSync(n)(o, "w", r.mode || bm), r.tmpCreated && r.tmpCreated(o), Tm(t) ? lt.retry.writeSync(n)(a, t, 0, r.encoding || RI) : yl(t) || lt.retry.writeSync(n)(a, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? lt.retry.fsyncSync(n)(a) : lt.attempt.fsync(a)), lt.retry.closeSync(n)(a), a = null, r.chown && (r.chown.uid !== DI || r.chown.gid !== FI) && lt.attempt.chownSync(o, r.chown.uid, r.chown.gid), r.mode && r.mode !== bm && lt.attempt.chmodSync(o, r.mode);
    try {
      lt.retry.renameSync(n)(o, e);
    } catch (u) {
      if (!MI(u) || u.code !== "ENAMETOOLONG")
        throw u;
      lt.retry.renameSync(n)(o, ut.truncate(e));
    }
    i(), o = null;
  } finally {
    a && lt.attempt.closeSync(a), o && ut.purge(o);
  }
}
var Jl = { exports: {} }, N$ = {}, er = {}, Ii = {}, $a = {}, ae = {}, Zo = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(E) {
      if (super(), !e.IDENTIFIER.test(E))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = r;
  class n extends t {
    constructor(E) {
      super(), this._items = typeof E == "string" ? [E] : E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const E = this._items[0];
      return E === "" || E === '""';
    }
    get str() {
      var E;
      return (E = this._str) !== null && E !== void 0 ? E : this._str = this._items.reduce((N, R) => `${N}${R}`, "");
    }
    get names() {
      var E;
      return (E = this._names) !== null && E !== void 0 ? E : this._names = this._items.reduce((N, R) => (R instanceof r && (N[R.str] = (N[R.str] || 0) + 1), N), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function i(m, ...E) {
    const N = [m[0]];
    let R = 0;
    for (; R < E.length; )
      s(N, E[R]), N.push(m[++R]);
    return new n(N);
  }
  e._ = i;
  const o = new n("+");
  function a(m, ...E) {
    const N = [h(m[0])];
    let R = 0;
    for (; R < E.length; )
      N.push(o), s(N, E[R]), N.push(o, h(m[++R]));
    return c(N), new n(N);
  }
  e.str = a;
  function s(m, E) {
    E instanceof n ? m.push(...E._items) : E instanceof r ? m.push(E) : m.push(u(E));
  }
  e.addCodeArg = s;
  function c(m) {
    let E = 1;
    for (; E < m.length - 1; ) {
      if (m[E] === o) {
        const N = f(m[E - 1], m[E + 1]);
        if (N !== void 0) {
          m.splice(E - 1, 3, N);
          continue;
        }
        m[E++] = "+";
      }
      E++;
    }
  }
  function f(m, E) {
    if (E === '""')
      return m;
    if (m === '""')
      return E;
    if (typeof m == "string")
      return E instanceof r || m[m.length - 1] !== '"' ? void 0 : typeof E != "string" ? `${m.slice(0, -1)}${E}"` : E[0] === '"' ? m.slice(0, -1) + E.slice(1) : void 0;
    if (typeof E == "string" && E[0] === '"' && !(m instanceof r))
      return `"${m}${E.slice(1)}`;
  }
  function l(m, E) {
    return E.emptyStr() ? m : m.emptyStr() ? E : a`${m}${E}`;
  }
  e.strConcat = l;
  function u(m) {
    return typeof m == "number" || typeof m == "boolean" || m === null ? m : h(Array.isArray(m) ? m.join(",") : m);
  }
  function p(m) {
    return new n(h(m));
  }
  e.stringify = p;
  function h(m) {
    return JSON.stringify(m).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = h;
  function v(m) {
    return typeof m == "string" && e.IDENTIFIER.test(m) ? new n(`.${m}`) : i`[${m}]`;
  }
  e.getProperty = v;
  function _(m) {
    if (typeof m == "string" && e.IDENTIFIER.test(m))
      return new n(`${m}`);
    throw new Error(`CodeGen: invalid export name: ${m}, use explicit $id name mapping`);
  }
  e.getEsmExportName = _;
  function g(m) {
    return new n(m.toString());
  }
  e.regexpCode = g;
})(Zo);
var Xl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Zo;
  class r extends Error {
    constructor(f) {
      super(`CodeGen: "code" for ${f} not defined`), this.value = f.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class i {
    constructor({ prefixes: f, parent: l } = {}) {
      this._names = {}, this._prefixes = f, this._parent = l;
    }
    toName(f) {
      return f instanceof t.Name ? f : this.name(f);
    }
    name(f) {
      return new t.Name(this._newName(f));
    }
    _newName(f) {
      const l = this._names[f] || this._nameGroup(f);
      return `${f}${l.index++}`;
    }
    _nameGroup(f) {
      var l, u;
      if (!((u = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || u === void 0) && u.has(f) || this._prefixes && !this._prefixes.has(f))
        throw new Error(`CodeGen: prefix "${f}" is not allowed in this scope`);
      return this._names[f] = { prefix: f, index: 0 };
    }
  }
  e.Scope = i;
  class o extends t.Name {
    constructor(f, l) {
      super(l), this.prefix = f;
    }
    setValue(f, { property: l, itemIndex: u }) {
      this.value = f, this.scopePath = (0, t._)`.${new t.Name(l)}[${u}]`;
    }
  }
  e.ValueScopeName = o;
  const a = (0, t._)`\n`;
  class s extends i {
    constructor(f) {
      super(f), this._values = {}, this._scope = f.scope, this.opts = { ...f, _n: f.lines ? a : t.nil };
    }
    get() {
      return this._scope;
    }
    name(f) {
      return new o(f, this._newName(f));
    }
    value(f, l) {
      var u;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const p = this.toName(f), { prefix: h } = p, v = (u = l.key) !== null && u !== void 0 ? u : l.ref;
      let _ = this._values[h];
      if (_) {
        const E = _.get(v);
        if (E)
          return E;
      } else
        _ = this._values[h] = /* @__PURE__ */ new Map();
      _.set(v, p);
      const g = this._scope[h] || (this._scope[h] = []), m = g.length;
      return g[m] = l.ref, p.setValue(l, { property: h, itemIndex: m }), p;
    }
    getValue(f, l) {
      const u = this._values[f];
      if (u)
        return u.get(l);
    }
    scopeRefs(f, l = this._values) {
      return this._reduceValues(l, (u) => {
        if (u.scopePath === void 0)
          throw new Error(`CodeGen: name "${u}" has no value`);
        return (0, t._)`${f}${u.scopePath}`;
      });
    }
    scopeCode(f = this._values, l, u) {
      return this._reduceValues(f, (p) => {
        if (p.value === void 0)
          throw new Error(`CodeGen: name "${p}" has no value`);
        return p.value.code;
      }, l, u);
    }
    _reduceValues(f, l, u = {}, p) {
      let h = t.nil;
      for (const v in f) {
        const _ = f[v];
        if (!_)
          continue;
        const g = u[v] = u[v] || /* @__PURE__ */ new Map();
        _.forEach((m) => {
          if (g.has(m))
            return;
          g.set(m, n.Started);
          let E = l(m);
          if (E) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            h = (0, t._)`${h}${N} ${m} = ${E};${this.opts._n}`;
          } else if (E = p == null ? void 0 : p(m))
            h = (0, t._)`${h}${E}${this.opts._n}`;
          else
            throw new r(m);
          g.set(m, n.Completed);
        });
      }
      return h;
    }
  }
  e.ValueScope = s;
})(Xl);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Zo, r = Xl;
  var n = Zo;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var i = Xl;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return i.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return i.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return i.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return i.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class o {
    optimizeNodes() {
      return this;
    }
    optimizeNames(d, $) {
      return this;
    }
  }
  class a extends o {
    constructor(d, $, O) {
      super(), this.varKind = d, this.name = $, this.rhs = O;
    }
    render({ es5: d, _n: $ }) {
      const O = d ? r.varKinds.var : this.varKind, w = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${O} ${this.name}${w};` + $;
    }
    optimizeNames(d, $) {
      if (d[this.name.str])
        return this.rhs && (this.rhs = M(this.rhs, d, $)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class s extends o {
    constructor(d, $, O) {
      super(), this.lhs = d, this.rhs = $, this.sideEffects = O;
    }
    render({ _n: d }) {
      return `${this.lhs} = ${this.rhs};` + d;
    }
    optimizeNames(d, $) {
      if (!(this.lhs instanceof t.Name && !d[this.lhs.str] && !this.sideEffects))
        return this.rhs = M(this.rhs, d, $), this;
    }
    get names() {
      const d = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return Y(d, this.rhs);
    }
  }
  class c extends s {
    constructor(d, $, O, w) {
      super(d, O, w), this.op = $;
    }
    render({ _n: d }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + d;
    }
  }
  class f extends o {
    constructor(d) {
      super(), this.label = d, this.names = {};
    }
    render({ _n: d }) {
      return `${this.label}:` + d;
    }
  }
  class l extends o {
    constructor(d) {
      super(), this.label = d, this.names = {};
    }
    render({ _n: d }) {
      return `break${this.label ? ` ${this.label}` : ""};` + d;
    }
  }
  class u extends o {
    constructor(d) {
      super(), this.error = d;
    }
    render({ _n: d }) {
      return `throw ${this.error};` + d;
    }
    get names() {
      return this.error.names;
    }
  }
  class p extends o {
    constructor(d) {
      super(), this.code = d;
    }
    render({ _n: d }) {
      return `${this.code};` + d;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(d, $) {
      return this.code = M(this.code, d, $), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class h extends o {
    constructor(d = []) {
      super(), this.nodes = d;
    }
    render(d) {
      return this.nodes.reduce(($, O) => $ + O.render(d), "");
    }
    optimizeNodes() {
      const { nodes: d } = this;
      let $ = d.length;
      for (; $--; ) {
        const O = d[$].optimizeNodes();
        Array.isArray(O) ? d.splice($, 1, ...O) : O ? d[$] = O : d.splice($, 1);
      }
      return d.length > 0 ? this : void 0;
    }
    optimizeNames(d, $) {
      const { nodes: O } = this;
      let w = O.length;
      for (; w--; ) {
        const y = O[w];
        y.optimizeNames(d, $) || (U(d, y.names), O.splice(w, 1));
      }
      return O.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((d, $) => G(d, $.names), {});
    }
  }
  class v extends h {
    render(d) {
      return "{" + d._n + super.render(d) + "}" + d._n;
    }
  }
  class _ extends h {
  }
  class g extends v {
  }
  g.kind = "else";
  class m extends v {
    constructor(d, $) {
      super($), this.condition = d;
    }
    render(d) {
      let $ = `if(${this.condition})` + super.render(d);
      return this.else && ($ += "else " + this.else.render(d)), $;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const d = this.condition;
      if (d === !0)
        return this.nodes;
      let $ = this.else;
      if ($) {
        const O = $.optimizeNodes();
        $ = this.else = Array.isArray(O) ? new g(O) : O;
      }
      if ($)
        return d === !1 ? $ instanceof m ? $ : $.nodes : this.nodes.length ? this : new m(H(d), $ instanceof m ? [$] : $.nodes);
      if (!(d === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(d, $) {
      var O;
      if (this.else = (O = this.else) === null || O === void 0 ? void 0 : O.optimizeNames(d, $), !!(super.optimizeNames(d, $) || this.else))
        return this.condition = M(this.condition, d, $), this;
    }
    get names() {
      const d = super.names;
      return Y(d, this.condition), this.else && G(d, this.else.names), d;
    }
  }
  m.kind = "if";
  class E extends v {
  }
  E.kind = "for";
  class N extends E {
    constructor(d) {
      super(), this.iteration = d;
    }
    render(d) {
      return `for(${this.iteration})` + super.render(d);
    }
    optimizeNames(d, $) {
      if (super.optimizeNames(d, $))
        return this.iteration = M(this.iteration, d, $), this;
    }
    get names() {
      return G(super.names, this.iteration.names);
    }
  }
  class R extends E {
    constructor(d, $, O, w) {
      super(), this.varKind = d, this.name = $, this.from = O, this.to = w;
    }
    render(d) {
      const $ = d.es5 ? r.varKinds.var : this.varKind, { name: O, from: w, to: y } = this;
      return `for(${$} ${O}=${w}; ${O}<${y}; ${O}++)` + super.render(d);
    }
    get names() {
      const d = Y(super.names, this.from);
      return Y(d, this.to);
    }
  }
  class F extends E {
    constructor(d, $, O, w) {
      super(), this.loop = d, this.varKind = $, this.name = O, this.iterable = w;
    }
    render(d) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(d);
    }
    optimizeNames(d, $) {
      if (super.optimizeNames(d, $))
        return this.iterable = M(this.iterable, d, $), this;
    }
    get names() {
      return G(super.names, this.iterable.names);
    }
  }
  class k extends v {
    constructor(d, $, O) {
      super(), this.name = d, this.args = $, this.async = O;
    }
    render(d) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(d);
    }
  }
  k.kind = "func";
  class L extends h {
    render(d) {
      return "return " + super.render(d);
    }
  }
  L.kind = "return";
  class V extends v {
    render(d) {
      let $ = "try" + super.render(d);
      return this.catch && ($ += this.catch.render(d)), this.finally && ($ += this.finally.render(d)), $;
    }
    optimizeNodes() {
      var d, $;
      return super.optimizeNodes(), (d = this.catch) === null || d === void 0 || d.optimizeNodes(), ($ = this.finally) === null || $ === void 0 || $.optimizeNodes(), this;
    }
    optimizeNames(d, $) {
      var O, w;
      return super.optimizeNames(d, $), (O = this.catch) === null || O === void 0 || O.optimizeNames(d, $), (w = this.finally) === null || w === void 0 || w.optimizeNames(d, $), this;
    }
    get names() {
      const d = super.names;
      return this.catch && G(d, this.catch.names), this.finally && G(d, this.finally.names), d;
    }
  }
  class P extends v {
    constructor(d) {
      super(), this.error = d;
    }
    render(d) {
      return `catch(${this.error})` + super.render(d);
    }
  }
  P.kind = "catch";
  class K extends v {
    render(d) {
      return "finally" + super.render(d);
    }
  }
  K.kind = "finally";
  class q {
    constructor(d, $ = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...$, _n: $.lines ? `
` : "" }, this._extScope = d, this._scope = new r.Scope({ parent: d }), this._nodes = [new _()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(d) {
      return this._scope.name(d);
    }
    // reserves unique name in the external scope
    scopeName(d) {
      return this._extScope.name(d);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(d, $) {
      const O = this._extScope.value(d, $);
      return (this._values[O.prefix] || (this._values[O.prefix] = /* @__PURE__ */ new Set())).add(O), O;
    }
    getScopeValue(d, $) {
      return this._extScope.getValue(d, $);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(d) {
      return this._extScope.scopeRefs(d, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(d, $, O, w) {
      const y = this._scope.toName($);
      return O !== void 0 && w && (this._constants[y.str] = O), this._leafNode(new a(d, y, O)), y;
    }
    // `const` declaration (`var` in es5 mode)
    const(d, $, O) {
      return this._def(r.varKinds.const, d, $, O);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(d, $, O) {
      return this._def(r.varKinds.let, d, $, O);
    }
    // `var` declaration with optional assignment
    var(d, $, O) {
      return this._def(r.varKinds.var, d, $, O);
    }
    // assignment code
    assign(d, $, O) {
      return this._leafNode(new s(d, $, O));
    }
    // `+=` code
    add(d, $) {
      return this._leafNode(new c(d, e.operators.ADD, $));
    }
    // appends passed SafeExpr to code or executes Block
    code(d) {
      return typeof d == "function" ? d() : d !== t.nil && this._leafNode(new p(d)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...d) {
      const $ = ["{"];
      for (const [O, w] of d)
        $.length > 1 && $.push(","), $.push(O), (O !== w || this.opts.es5) && ($.push(":"), (0, t.addCodeArg)($, w));
      return $.push("}"), new t._Code($);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(d, $, O) {
      if (this._blockNode(new m(d)), $ && O)
        this.code($).else().code(O).endIf();
      else if ($)
        this.code($).endIf();
      else if (O)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(d) {
      return this._elseNode(new m(d));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new g());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(m, g);
    }
    _for(d, $) {
      return this._blockNode(d), $ && this.code($).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(d, $) {
      return this._for(new N(d), $);
    }
    // `for` statement for a range of values
    forRange(d, $, O, w, y = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const j = this._scope.toName(d);
      return this._for(new R(y, j, $, O), () => w(j));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(d, $, O, w = r.varKinds.const) {
      const y = this._scope.toName(d);
      if (this.opts.es5) {
        const j = $ instanceof t.Name ? $ : this.var("_arr", $);
        return this.forRange("_i", 0, (0, t._)`${j}.length`, (C) => {
          this.var(y, (0, t._)`${j}[${C}]`), O(y);
        });
      }
      return this._for(new F("of", w, y, $), () => O(y));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(d, $, O, w = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(d, (0, t._)`Object.keys(${$})`, O);
      const y = this._scope.toName(d);
      return this._for(new F("in", w, y, $), () => O(y));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(E);
    }
    // `label` statement
    label(d) {
      return this._leafNode(new f(d));
    }
    // `break` statement
    break(d) {
      return this._leafNode(new l(d));
    }
    // `return` statement
    return(d) {
      const $ = new L();
      if (this._blockNode($), this.code(d), $.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(L);
    }
    // `try` statement
    try(d, $, O) {
      if (!$ && !O)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const w = new V();
      if (this._blockNode(w), this.code(d), $) {
        const y = this.name("e");
        this._currNode = w.catch = new P(y), $(y);
      }
      return O && (this._currNode = w.finally = new K(), this.code(O)), this._endBlockNode(P, K);
    }
    // `throw` statement
    throw(d) {
      return this._leafNode(new u(d));
    }
    // start self-balancing block
    block(d, $) {
      return this._blockStarts.push(this._nodes.length), d && this.code(d).endBlock($), this;
    }
    // end the current self-balancing block
    endBlock(d) {
      const $ = this._blockStarts.pop();
      if ($ === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const O = this._nodes.length - $;
      if (O < 0 || d !== void 0 && O !== d)
        throw new Error(`CodeGen: wrong number of nodes: ${O} vs ${d} expected`);
      return this._nodes.length = $, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(d, $ = t.nil, O, w) {
      return this._blockNode(new k(d, $, O)), w && this.code(w).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(k);
    }
    optimize(d = 1) {
      for (; d-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(d) {
      return this._currNode.nodes.push(d), this;
    }
    _blockNode(d) {
      this._currNode.nodes.push(d), this._nodes.push(d);
    }
    _endBlockNode(d, $) {
      const O = this._currNode;
      if (O instanceof d || $ && O instanceof $)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${$ ? `${d.kind}/${$.kind}` : d.kind}"`);
    }
    _elseNode(d) {
      const $ = this._currNode;
      if (!($ instanceof m))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = $.else = d, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const d = this._nodes;
      return d[d.length - 1];
    }
    set _currNode(d) {
      const $ = this._nodes;
      $[$.length - 1] = d;
    }
  }
  e.CodeGen = q;
  function G(b, d) {
    for (const $ in d)
      b[$] = (b[$] || 0) + (d[$] || 0);
    return b;
  }
  function Y(b, d) {
    return d instanceof t._CodeOrName ? G(b, d.names) : b;
  }
  function M(b, d, $) {
    if (b instanceof t.Name)
      return O(b);
    if (!w(b))
      return b;
    return new t._Code(b._items.reduce((y, j) => (j instanceof t.Name && (j = O(j)), j instanceof t._Code ? y.push(...j._items) : y.push(j), y), []));
    function O(y) {
      const j = $[y.str];
      return j === void 0 || d[y.str] !== 1 ? y : (delete d[y.str], j);
    }
    function w(y) {
      return y instanceof t._Code && y._items.some((j) => j instanceof t.Name && d[j.str] === 1 && $[j.str] !== void 0);
    }
  }
  function U(b, d) {
    for (const $ in d)
      b[$] = (b[$] || 0) - (d[$] || 0);
  }
  function H(b) {
    return typeof b == "boolean" || typeof b == "number" || b === null ? !b : (0, t._)`!${A(b)}`;
  }
  e.not = H;
  const x = S(e.operators.AND);
  function W(...b) {
    return b.reduce(x);
  }
  e.and = W;
  const z = S(e.operators.OR);
  function I(...b) {
    return b.reduce(z);
  }
  e.or = I;
  function S(b) {
    return (d, $) => d === t.nil ? $ : $ === t.nil ? d : (0, t._)`${A(d)} ${b} ${A($)}`;
  }
  function A(b) {
    return b instanceof t.Name ? b : (0, t._)`(${b})`;
  }
})(ae);
var J = {};
Object.defineProperty(J, "__esModule", { value: !0 });
J.checkStrictMode = J.getErrorPath = J.Type = J.useFunc = J.setEvaluated = J.evaluatedPropsToName = J.mergeEvaluated = J.eachItem = J.unescapeJsonPointer = J.escapeJsonPointer = J.escapeFragment = J.unescapeFragment = J.schemaRefOrVal = J.schemaHasRulesButRef = J.schemaHasRules = J.checkUnknownRules = J.alwaysValidSchema = J.toHash = void 0;
const we = ae, HI = Zo;
function GI(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
J.toHash = GI;
function BI(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (O$(e, t), !A$(t, e.self.RULES.all));
}
J.alwaysValidSchema = BI;
function O$(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const i = n.RULES.keywords;
  for (const o in t)
    i[o] || I$(e, `unknown keyword: "${o}"`);
}
J.checkUnknownRules = O$;
function A$(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
J.schemaHasRules = A$;
function zI(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
J.schemaHasRulesButRef = zI;
function KI({ topSchemaRef: e, schemaPath: t }, r, n, i) {
  if (!i) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, we._)`${r}`;
  }
  return (0, we._)`${e}${t}${(0, we.getProperty)(n)}`;
}
J.schemaRefOrVal = KI;
function WI(e) {
  return C$(decodeURIComponent(e));
}
J.unescapeFragment = WI;
function YI(e) {
  return encodeURIComponent(tf(e));
}
J.escapeFragment = YI;
function tf(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
J.escapeJsonPointer = tf;
function C$(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
J.unescapeJsonPointer = C$;
function JI(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
J.eachItem = JI;
function Nm({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (i, o, a, s) => {
    const c = a === void 0 ? o : a instanceof we.Name ? (o instanceof we.Name ? e(i, o, a) : t(i, o, a), a) : o instanceof we.Name ? (t(i, a, o), o) : r(o, a);
    return s === we.Name && !(c instanceof we.Name) ? n(i, c) : c;
  };
}
J.mergeEvaluated = {
  props: Nm({
    mergeNames: (e, t, r) => e.if((0, we._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, we._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, we._)`${r} || {}`).code((0, we._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, we._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, we._)`${r} || {}`), rf(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: R$
  }),
  items: Nm({
    mergeNames: (e, t, r) => e.if((0, we._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, we._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, we._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, we._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function R$(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, we._)`{}`);
  return t !== void 0 && rf(e, r, t), r;
}
J.evaluatedPropsToName = R$;
function rf(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, we._)`${t}${(0, we.getProperty)(n)}`, !0));
}
J.setEvaluated = rf;
const Om = {};
function XI(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Om[t.code] || (Om[t.code] = new HI._Code(t.code))
  });
}
J.useFunc = XI;
var Ql;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Ql || (J.Type = Ql = {}));
function QI(e, t, r) {
  if (e instanceof we.Name) {
    const n = t === Ql.Num;
    return r ? n ? (0, we._)`"[" + ${e} + "]"` : (0, we._)`"['" + ${e} + "']"` : n ? (0, we._)`"/" + ${e}` : (0, we._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, we.getProperty)(e).toString() : "/" + tf(e);
}
J.getErrorPath = QI;
function I$(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
J.checkStrictMode = I$;
var Ft = {};
Object.defineProperty(Ft, "__esModule", { value: !0 });
const st = ae, ZI = {
  // validation function arguments
  data: new st.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new st.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new st.Name("instancePath"),
  parentData: new st.Name("parentData"),
  parentDataProperty: new st.Name("parentDataProperty"),
  rootData: new st.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new st.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new st.Name("vErrors"),
  // null or array of validation errors
  errors: new st.Name("errors"),
  // counter of validation errors
  this: new st.Name("this"),
  // "globals"
  self: new st.Name("self"),
  scope: new st.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new st.Name("json"),
  jsonPos: new st.Name("jsonPos"),
  jsonLen: new st.Name("jsonLen"),
  jsonPart: new st.Name("jsonPart")
};
Ft.default = ZI;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = ae, r = J, n = Ft;
  e.keywordError = {
    message: ({ keyword: g }) => (0, t.str)`must pass "${g}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: g, schemaType: m }) => m ? (0, t.str)`"${g}" keyword must be ${m} ($data)` : (0, t.str)`"${g}" keyword is invalid ($data)`
  };
  function i(g, m = e.keywordError, E, N) {
    const { it: R } = g, { gen: F, compositeRule: k, allErrors: L } = R, V = u(g, m, E);
    N ?? (k || L) ? c(F, V) : f(R, (0, t._)`[${V}]`);
  }
  e.reportError = i;
  function o(g, m = e.keywordError, E) {
    const { it: N } = g, { gen: R, compositeRule: F, allErrors: k } = N, L = u(g, m, E);
    c(R, L), F || k || f(N, n.default.vErrors);
  }
  e.reportExtraError = o;
  function a(g, m) {
    g.assign(n.default.errors, m), g.if((0, t._)`${n.default.vErrors} !== null`, () => g.if(m, () => g.assign((0, t._)`${n.default.vErrors}.length`, m), () => g.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = a;
  function s({ gen: g, keyword: m, schemaValue: E, data: N, errsCount: R, it: F }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const k = g.name("err");
    g.forRange("i", R, n.default.errors, (L) => {
      g.const(k, (0, t._)`${n.default.vErrors}[${L}]`), g.if((0, t._)`${k}.instancePath === undefined`, () => g.assign((0, t._)`${k}.instancePath`, (0, t.strConcat)(n.default.instancePath, F.errorPath))), g.assign((0, t._)`${k}.schemaPath`, (0, t.str)`${F.errSchemaPath}/${m}`), F.opts.verbose && (g.assign((0, t._)`${k}.schema`, E), g.assign((0, t._)`${k}.data`, N));
    });
  }
  e.extendErrors = s;
  function c(g, m) {
    const E = g.const("err", m);
    g.if((0, t._)`${n.default.vErrors} === null`, () => g.assign(n.default.vErrors, (0, t._)`[${E}]`), (0, t._)`${n.default.vErrors}.push(${E})`), g.code((0, t._)`${n.default.errors}++`);
  }
  function f(g, m) {
    const { gen: E, validateName: N, schemaEnv: R } = g;
    R.$async ? E.throw((0, t._)`new ${g.ValidationError}(${m})`) : (E.assign((0, t._)`${N}.errors`, m), E.return(!1));
  }
  const l = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function u(g, m, E) {
    const { createErrors: N } = g.it;
    return N === !1 ? (0, t._)`{}` : p(g, m, E);
  }
  function p(g, m, E = {}) {
    const { gen: N, it: R } = g, F = [
      h(R, E),
      v(g, E)
    ];
    return _(g, m, F), N.object(...F);
  }
  function h({ errorPath: g }, { instancePath: m }) {
    const E = m ? (0, t.str)`${g}${(0, r.getErrorPath)(m, r.Type.Str)}` : g;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, E)];
  }
  function v({ keyword: g, it: { errSchemaPath: m } }, { schemaPath: E, parentSchema: N }) {
    let R = N ? m : (0, t.str)`${m}/${g}`;
    return E && (R = (0, t.str)`${R}${(0, r.getErrorPath)(E, r.Type.Str)}`), [l.schemaPath, R];
  }
  function _(g, { params: m, message: E }, N) {
    const { keyword: R, data: F, schemaValue: k, it: L } = g, { opts: V, propertyName: P, topSchemaRef: K, schemaPath: q } = L;
    N.push([l.keyword, R], [l.params, typeof m == "function" ? m(g) : m || (0, t._)`{}`]), V.messages && N.push([l.message, typeof E == "function" ? E(g) : E]), V.verbose && N.push([l.schema, k], [l.parentSchema, (0, t._)`${K}${q}`], [n.default.data, F]), P && N.push([l.propertyName, P]);
  }
})($a);
Object.defineProperty(Ii, "__esModule", { value: !0 });
Ii.boolOrEmptySchema = Ii.topBoolOrEmptySchema = void 0;
const ek = $a, tk = ae, rk = Ft, nk = {
  message: "boolean schema is false"
};
function ik(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? k$(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(rk.default.data) : (t.assign((0, tk._)`${n}.errors`, null), t.return(!0));
}
Ii.topBoolOrEmptySchema = ik;
function ok(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), k$(e)) : r.var(t, !0);
}
Ii.boolOrEmptySchema = ok;
function k$(e, t) {
  const { gen: r, data: n } = e, i = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, ek.reportError)(i, nk, void 0, t);
}
var xe = {}, Bn = {};
Object.defineProperty(Bn, "__esModule", { value: !0 });
Bn.getRules = Bn.isJSONType = void 0;
const ak = ["string", "number", "integer", "boolean", "null", "object", "array"], sk = new Set(ak);
function ck(e) {
  return typeof e == "string" && sk.has(e);
}
Bn.isJSONType = ck;
function lk() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
Bn.getRules = lk;
var Cr = {};
Object.defineProperty(Cr, "__esModule", { value: !0 });
Cr.shouldUseRule = Cr.shouldUseGroup = Cr.schemaHasRulesForType = void 0;
function uk({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && D$(e, n);
}
Cr.schemaHasRulesForType = uk;
function D$(e, t) {
  return t.rules.some((r) => F$(e, r));
}
Cr.shouldUseGroup = D$;
function F$(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
Cr.shouldUseRule = F$;
Object.defineProperty(xe, "__esModule", { value: !0 });
xe.reportTypeError = xe.checkDataTypes = xe.checkDataType = xe.coerceAndCheckDataType = xe.getJSONTypes = xe.getSchemaTypes = xe.DataType = void 0;
const fk = Bn, dk = Cr, hk = $a, ce = ae, j$ = J;
var Si;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(Si || (xe.DataType = Si = {}));
function pk(e) {
  const t = L$(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
xe.getSchemaTypes = pk;
function L$(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(fk.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
xe.getJSONTypes = L$;
function mk(e, t) {
  const { gen: r, data: n, opts: i } = e, o = yk(t, i.coerceTypes), a = t.length > 0 && !(o.length === 0 && t.length === 1 && (0, dk.schemaHasRulesForType)(e, t[0]));
  if (a) {
    const s = nf(t, n, i.strictNumbers, Si.Wrong);
    r.if(s, () => {
      o.length ? gk(e, t, o) : of(e);
    });
  }
  return a;
}
xe.coerceAndCheckDataType = mk;
const M$ = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function yk(e, t) {
  return t ? e.filter((r) => M$.has(r) || t === "array" && r === "array") : [];
}
function gk(e, t, r) {
  const { gen: n, data: i, opts: o } = e, a = n.let("dataType", (0, ce._)`typeof ${i}`), s = n.let("coerced", (0, ce._)`undefined`);
  o.coerceTypes === "array" && n.if((0, ce._)`${a} == 'object' && Array.isArray(${i}) && ${i}.length == 1`, () => n.assign(i, (0, ce._)`${i}[0]`).assign(a, (0, ce._)`typeof ${i}`).if(nf(t, i, o.strictNumbers), () => n.assign(s, i))), n.if((0, ce._)`${s} !== undefined`);
  for (const f of r)
    (M$.has(f) || f === "array" && o.coerceTypes === "array") && c(f);
  n.else(), of(e), n.endIf(), n.if((0, ce._)`${s} !== undefined`, () => {
    n.assign(i, s), $k(e, s);
  });
  function c(f) {
    switch (f) {
      case "string":
        n.elseIf((0, ce._)`${a} == "number" || ${a} == "boolean"`).assign(s, (0, ce._)`"" + ${i}`).elseIf((0, ce._)`${i} === null`).assign(s, (0, ce._)`""`);
        return;
      case "number":
        n.elseIf((0, ce._)`${a} == "boolean" || ${i} === null
              || (${a} == "string" && ${i} && ${i} == +${i})`).assign(s, (0, ce._)`+${i}`);
        return;
      case "integer":
        n.elseIf((0, ce._)`${a} === "boolean" || ${i} === null
              || (${a} === "string" && ${i} && ${i} == +${i} && !(${i} % 1))`).assign(s, (0, ce._)`+${i}`);
        return;
      case "boolean":
        n.elseIf((0, ce._)`${i} === "false" || ${i} === 0 || ${i} === null`).assign(s, !1).elseIf((0, ce._)`${i} === "true" || ${i} === 1`).assign(s, !0);
        return;
      case "null":
        n.elseIf((0, ce._)`${i} === "" || ${i} === 0 || ${i} === false`), n.assign(s, null);
        return;
      case "array":
        n.elseIf((0, ce._)`${a} === "string" || ${a} === "number"
              || ${a} === "boolean" || ${i} === null`).assign(s, (0, ce._)`[${i}]`);
    }
  }
}
function $k({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, ce._)`${t} !== undefined`, () => e.assign((0, ce._)`${t}[${r}]`, n));
}
function Zl(e, t, r, n = Si.Correct) {
  const i = n === Si.Correct ? ce.operators.EQ : ce.operators.NEQ;
  let o;
  switch (e) {
    case "null":
      return (0, ce._)`${t} ${i} null`;
    case "array":
      o = (0, ce._)`Array.isArray(${t})`;
      break;
    case "object":
      o = (0, ce._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      o = a((0, ce._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      o = a();
      break;
    default:
      return (0, ce._)`typeof ${t} ${i} ${e}`;
  }
  return n === Si.Correct ? o : (0, ce.not)(o);
  function a(s = ce.nil) {
    return (0, ce.and)((0, ce._)`typeof ${t} == "number"`, s, r ? (0, ce._)`isFinite(${t})` : ce.nil);
  }
}
xe.checkDataType = Zl;
function nf(e, t, r, n) {
  if (e.length === 1)
    return Zl(e[0], t, r, n);
  let i;
  const o = (0, j$.toHash)(e);
  if (o.array && o.object) {
    const a = (0, ce._)`typeof ${t} != "object"`;
    i = o.null ? a : (0, ce._)`!${t} || ${a}`, delete o.null, delete o.array, delete o.object;
  } else
    i = ce.nil;
  o.number && delete o.integer;
  for (const a in o)
    i = (0, ce.and)(i, Zl(a, t, r, n));
  return i;
}
xe.checkDataTypes = nf;
const vk = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, ce._)`{type: ${e}}` : (0, ce._)`{type: ${t}}`
};
function of(e) {
  const t = _k(e);
  (0, hk.reportError)(t, vk);
}
xe.reportTypeError = of;
function _k(e) {
  const { gen: t, data: r, schema: n } = e, i = (0, j$.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: i,
    schemaValue: i,
    parentSchema: n,
    params: {},
    it: e
  };
}
var $c = {};
Object.defineProperty($c, "__esModule", { value: !0 });
$c.assignDefaults = void 0;
const oi = ae, wk = J;
function Ek(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const i in r)
      Am(e, i, r[i].default);
  else t === "array" && Array.isArray(n) && n.forEach((i, o) => Am(e, o, i.default));
}
$c.assignDefaults = Ek;
function Am(e, t, r) {
  const { gen: n, compositeRule: i, data: o, opts: a } = e;
  if (r === void 0)
    return;
  const s = (0, oi._)`${o}${(0, oi.getProperty)(t)}`;
  if (i) {
    (0, wk.checkStrictMode)(e, `default is ignored for: ${s}`);
    return;
  }
  let c = (0, oi._)`${s} === undefined`;
  a.useDefaults === "empty" && (c = (0, oi._)`${c} || ${s} === null || ${s} === ""`), n.if(c, (0, oi._)`${s} = ${(0, oi.stringify)(r)}`);
}
var lr = {}, de = {};
Object.defineProperty(de, "__esModule", { value: !0 });
de.validateUnion = de.validateArray = de.usePattern = de.callValidateCode = de.schemaProperties = de.allSchemaProperties = de.noPropertyInData = de.propertyInData = de.isOwnProperty = de.hasPropFunc = de.reportMissingProp = de.checkMissingProp = de.checkReportMissingProp = void 0;
const Te = ae, af = J, zr = Ft, Sk = J;
function bk(e, t) {
  const { gen: r, data: n, it: i } = e;
  r.if(cf(r, n, t, i.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, Te._)`${t}` }, !0), e.error();
  });
}
de.checkReportMissingProp = bk;
function Pk({ gen: e, data: t, it: { opts: r } }, n, i) {
  return (0, Te.or)(...n.map((o) => (0, Te.and)(cf(e, t, o, r.ownProperties), (0, Te._)`${i} = ${o}`)));
}
de.checkMissingProp = Pk;
function Tk(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
de.reportMissingProp = Tk;
function U$(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, Te._)`Object.prototype.hasOwnProperty`
  });
}
de.hasPropFunc = U$;
function sf(e, t, r) {
  return (0, Te._)`${U$(e)}.call(${t}, ${r})`;
}
de.isOwnProperty = sf;
function Nk(e, t, r, n) {
  const i = (0, Te._)`${t}${(0, Te.getProperty)(r)} !== undefined`;
  return n ? (0, Te._)`${i} && ${sf(e, t, r)}` : i;
}
de.propertyInData = Nk;
function cf(e, t, r, n) {
  const i = (0, Te._)`${t}${(0, Te.getProperty)(r)} === undefined`;
  return n ? (0, Te.or)(i, (0, Te.not)(sf(e, t, r))) : i;
}
de.noPropertyInData = cf;
function x$(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
de.allSchemaProperties = x$;
function Ok(e, t) {
  return x$(t).filter((r) => !(0, af.alwaysValidSchema)(e, t[r]));
}
de.schemaProperties = Ok;
function Ak({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: i, errorPath: o }, it: a }, s, c, f) {
  const l = f ? (0, Te._)`${e}, ${t}, ${n}${i}` : t, u = [
    [zr.default.instancePath, (0, Te.strConcat)(zr.default.instancePath, o)],
    [zr.default.parentData, a.parentData],
    [zr.default.parentDataProperty, a.parentDataProperty],
    [zr.default.rootData, zr.default.rootData]
  ];
  a.opts.dynamicRef && u.push([zr.default.dynamicAnchors, zr.default.dynamicAnchors]);
  const p = (0, Te._)`${l}, ${r.object(...u)}`;
  return c !== Te.nil ? (0, Te._)`${s}.call(${c}, ${p})` : (0, Te._)`${s}(${p})`;
}
de.callValidateCode = Ak;
const Ck = (0, Te._)`new RegExp`;
function Rk({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: i } = t.code, o = i(r, n);
  return e.scopeValue("pattern", {
    key: o.toString(),
    ref: o,
    code: (0, Te._)`${i.code === "new RegExp" ? Ck : (0, Sk.useFunc)(e, i)}(${r}, ${n})`
  });
}
de.usePattern = Rk;
function Ik(e) {
  const { gen: t, data: r, keyword: n, it: i } = e, o = t.name("valid");
  if (i.allErrors) {
    const s = t.let("valid", !0);
    return a(() => t.assign(s, !1)), s;
  }
  return t.var(o, !0), a(() => t.break()), o;
  function a(s) {
    const c = t.const("len", (0, Te._)`${r}.length`);
    t.forRange("i", 0, c, (f) => {
      e.subschema({
        keyword: n,
        dataProp: f,
        dataPropType: af.Type.Num
      }, o), t.if((0, Te.not)(o), s);
    });
  }
}
de.validateArray = Ik;
function kk(e) {
  const { gen: t, schema: r, keyword: n, it: i } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, af.alwaysValidSchema)(i, c)) && !i.opts.unevaluated)
    return;
  const a = t.let("valid", !1), s = t.name("_valid");
  t.block(() => r.forEach((c, f) => {
    const l = e.subschema({
      keyword: n,
      schemaProp: f,
      compositeRule: !0
    }, s);
    t.assign(a, (0, Te._)`${a} || ${s}`), e.mergeValidEvaluated(l, s) || t.if((0, Te.not)(a));
  })), e.result(a, () => e.reset(), () => e.error(!0));
}
de.validateUnion = kk;
Object.defineProperty(lr, "__esModule", { value: !0 });
lr.validateKeywordUsage = lr.validSchemaType = lr.funcKeywordCode = lr.macroKeywordCode = void 0;
const pt = ae, kn = Ft, Dk = de, Fk = $a;
function jk(e, t) {
  const { gen: r, keyword: n, schema: i, parentSchema: o, it: a } = e, s = t.macro.call(a.self, i, o, a), c = q$(r, n, s);
  a.opts.validateSchema !== !1 && a.self.validateSchema(s, !0);
  const f = r.name("valid");
  e.subschema({
    schema: s,
    schemaPath: pt.nil,
    errSchemaPath: `${a.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, f), e.pass(f, () => e.error(!0));
}
lr.macroKeywordCode = jk;
function Lk(e, t) {
  var r;
  const { gen: n, keyword: i, schema: o, parentSchema: a, $data: s, it: c } = e;
  Uk(c, t);
  const f = !s && t.compile ? t.compile.call(c.self, o, a, c) : t.validate, l = q$(n, i, f), u = n.let("valid");
  e.block$data(u, p), e.ok((r = t.valid) !== null && r !== void 0 ? r : u);
  function p() {
    if (t.errors === !1)
      _(), t.modifying && Cm(e), g(() => e.error());
    else {
      const m = t.async ? h() : v();
      t.modifying && Cm(e), g(() => Mk(e, m));
    }
  }
  function h() {
    const m = n.let("ruleErrs", null);
    return n.try(() => _((0, pt._)`await `), (E) => n.assign(u, !1).if((0, pt._)`${E} instanceof ${c.ValidationError}`, () => n.assign(m, (0, pt._)`${E}.errors`), () => n.throw(E))), m;
  }
  function v() {
    const m = (0, pt._)`${l}.errors`;
    return n.assign(m, null), _(pt.nil), m;
  }
  function _(m = t.async ? (0, pt._)`await ` : pt.nil) {
    const E = c.opts.passContext ? kn.default.this : kn.default.self, N = !("compile" in t && !s || t.schema === !1);
    n.assign(u, (0, pt._)`${m}${(0, Dk.callValidateCode)(e, l, E, N)}`, t.modifying);
  }
  function g(m) {
    var E;
    n.if((0, pt.not)((E = t.valid) !== null && E !== void 0 ? E : u), m);
  }
}
lr.funcKeywordCode = Lk;
function Cm(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, pt._)`${n.parentData}[${n.parentDataProperty}]`));
}
function Mk(e, t) {
  const { gen: r } = e;
  r.if((0, pt._)`Array.isArray(${t})`, () => {
    r.assign(kn.default.vErrors, (0, pt._)`${kn.default.vErrors} === null ? ${t} : ${kn.default.vErrors}.concat(${t})`).assign(kn.default.errors, (0, pt._)`${kn.default.vErrors}.length`), (0, Fk.extendErrors)(e);
  }, () => e.error());
}
function Uk({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function q$(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, pt.stringify)(r) });
}
function xk(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
lr.validSchemaType = xk;
function qk({ schema: e, opts: t, self: r, errSchemaPath: n }, i, o) {
  if (Array.isArray(i.keyword) ? !i.keyword.includes(o) : i.keyword !== o)
    throw new Error("ajv implementation error");
  const a = i.dependencies;
  if (a != null && a.some((s) => !Object.prototype.hasOwnProperty.call(e, s)))
    throw new Error(`parent schema must have dependencies of ${o}: ${a.join(",")}`);
  if (i.validateSchema && !i.validateSchema(e[o])) {
    const c = `keyword "${o}" value is invalid at path "${n}": ` + r.errorsText(i.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
lr.validateKeywordUsage = qk;
var ln = {};
Object.defineProperty(ln, "__esModule", { value: !0 });
ln.extendSubschemaMode = ln.extendSubschemaData = ln.getSubschema = void 0;
const sr = ae, V$ = J;
function Vk(e, { keyword: t, schemaProp: r, schema: n, schemaPath: i, errSchemaPath: o, topSchemaRef: a }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const s = e.schema[t];
    return r === void 0 ? {
      schema: s,
      schemaPath: (0, sr._)`${e.schemaPath}${(0, sr.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: s[r],
      schemaPath: (0, sr._)`${e.schemaPath}${(0, sr.getProperty)(t)}${(0, sr.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, V$.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (i === void 0 || o === void 0 || a === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: i,
      topSchemaRef: a,
      errSchemaPath: o
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
ln.getSubschema = Vk;
function Hk(e, t, { dataProp: r, dataPropType: n, data: i, dataTypes: o, propertyName: a }) {
  if (i !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: s } = t;
  if (r !== void 0) {
    const { errorPath: f, dataPathArr: l, opts: u } = t, p = s.let("data", (0, sr._)`${t.data}${(0, sr.getProperty)(r)}`, !0);
    c(p), e.errorPath = (0, sr.str)`${f}${(0, V$.getErrorPath)(r, n, u.jsPropertySyntax)}`, e.parentDataProperty = (0, sr._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (i !== void 0) {
    const f = i instanceof sr.Name ? i : s.let("data", i, !0);
    c(f), a !== void 0 && (e.propertyName = a);
  }
  o && (e.dataTypes = o);
  function c(f) {
    e.data = f, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, f];
  }
}
ln.extendSubschemaData = Hk;
function Gk(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: i, allErrors: o }) {
  n !== void 0 && (e.compositeRule = n), i !== void 0 && (e.createErrors = i), o !== void 0 && (e.allErrors = o), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
ln.extendSubschemaMode = Gk;
var et = {}, vc = function e(t, r) {
  if (t === r) return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor) return !1;
    var n, i, o;
    if (Array.isArray(t)) {
      if (n = t.length, n != r.length) return !1;
      for (i = n; i-- !== 0; )
        if (!e(t[i], r[i])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
    if (o = Object.keys(t), n = o.length, n !== Object.keys(r).length) return !1;
    for (i = n; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, o[i])) return !1;
    for (i = n; i-- !== 0; ) {
      var a = o[i];
      if (!e(t[a], r[a])) return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}, H$ = { exports: {} }, an = H$.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, i = r.post || function() {
  };
  cs(t, n, i, e, "", e);
};
an.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
an.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
an.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
an.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function cs(e, t, r, n, i, o, a, s, c, f) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, i, o, a, s, c, f);
    for (var l in n) {
      var u = n[l];
      if (Array.isArray(u)) {
        if (l in an.arrayKeywords)
          for (var p = 0; p < u.length; p++)
            cs(e, t, r, u[p], i + "/" + l + "/" + p, o, i, l, n, p);
      } else if (l in an.propsKeywords) {
        if (u && typeof u == "object")
          for (var h in u)
            cs(e, t, r, u[h], i + "/" + l + "/" + Bk(h), o, i, l, n, h);
      } else (l in an.keywords || e.allKeys && !(l in an.skipKeywords)) && cs(e, t, r, u, i + "/" + l, o, i, l, n);
    }
    r(n, i, o, a, s, c, f);
  }
}
function Bk(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var zk = H$.exports;
Object.defineProperty(et, "__esModule", { value: !0 });
et.getSchemaRefs = et.resolveUrl = et.normalizeId = et._getFullPath = et.getFullPath = et.inlineRef = void 0;
const Kk = J, Wk = vc, Yk = zk, Jk = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function Xk(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !eu(e) : t ? G$(e) <= t : !1;
}
et.inlineRef = Xk;
const Qk = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function eu(e) {
  for (const t in e) {
    if (Qk.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(eu) || typeof r == "object" && eu(r))
      return !0;
  }
  return !1;
}
function G$(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !Jk.has(r) && (typeof e[r] == "object" && (0, Kk.eachItem)(e[r], (n) => t += G$(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function B$(e, t = "", r) {
  r !== !1 && (t = bi(t));
  const n = e.parse(t);
  return z$(e, n);
}
et.getFullPath = B$;
function z$(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
et._getFullPath = z$;
const Zk = /#\/?$/;
function bi(e) {
  return e ? e.replace(Zk, "") : "";
}
et.normalizeId = bi;
function eD(e, t, r) {
  return r = bi(r), e.resolve(t, r);
}
et.resolveUrl = eD;
const tD = /^[a-z_][-a-z0-9._]*$/i;
function rD(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, i = bi(e[r] || t), o = { "": i }, a = B$(n, i, !1), s = {}, c = /* @__PURE__ */ new Set();
  return Yk(e, { allKeys: !0 }, (u, p, h, v) => {
    if (v === void 0)
      return;
    const _ = a + p;
    let g = o[v];
    typeof u[r] == "string" && (g = m.call(this, u[r])), E.call(this, u.$anchor), E.call(this, u.$dynamicAnchor), o[p] = g;
    function m(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = bi(g ? R(g, N) : N), c.has(N))
        throw l(N);
      c.add(N);
      let F = this.refs[N];
      return typeof F == "string" && (F = this.refs[F]), typeof F == "object" ? f(u, F.schema, N) : N !== bi(_) && (N[0] === "#" ? (f(u, s[N], N), s[N] = u) : this.refs[N] = _), N;
    }
    function E(N) {
      if (typeof N == "string") {
        if (!tD.test(N))
          throw new Error(`invalid anchor "${N}"`);
        m.call(this, `#${N}`);
      }
    }
  }), s;
  function f(u, p, h) {
    if (p !== void 0 && !Wk(u, p))
      throw l(h);
  }
  function l(u) {
    return new Error(`reference "${u}" resolves to more than one schema`);
  }
}
et.getSchemaRefs = rD;
Object.defineProperty(er, "__esModule", { value: !0 });
er.getData = er.KeywordCxt = er.validateFunctionCode = void 0;
const K$ = Ii, Rm = xe, lf = Cr, Rs = xe, nD = $c, Co = lr, gl = ln, ee = ae, ne = Ft, iD = et, Rr = J, yo = $a;
function oD(e) {
  if (J$(e) && (X$(e), Y$(e))) {
    cD(e);
    return;
  }
  W$(e, () => (0, K$.topBoolOrEmptySchema)(e));
}
er.validateFunctionCode = oD;
function W$({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: i }, o) {
  i.code.es5 ? e.func(t, (0, ee._)`${ne.default.data}, ${ne.default.valCxt}`, n.$async, () => {
    e.code((0, ee._)`"use strict"; ${Im(r, i)}`), sD(e, i), e.code(o);
  }) : e.func(t, (0, ee._)`${ne.default.data}, ${aD(i)}`, n.$async, () => e.code(Im(r, i)).code(o));
}
function aD(e) {
  return (0, ee._)`{${ne.default.instancePath}="", ${ne.default.parentData}, ${ne.default.parentDataProperty}, ${ne.default.rootData}=${ne.default.data}${e.dynamicRef ? (0, ee._)`, ${ne.default.dynamicAnchors}={}` : ee.nil}}={}`;
}
function sD(e, t) {
  e.if(ne.default.valCxt, () => {
    e.var(ne.default.instancePath, (0, ee._)`${ne.default.valCxt}.${ne.default.instancePath}`), e.var(ne.default.parentData, (0, ee._)`${ne.default.valCxt}.${ne.default.parentData}`), e.var(ne.default.parentDataProperty, (0, ee._)`${ne.default.valCxt}.${ne.default.parentDataProperty}`), e.var(ne.default.rootData, (0, ee._)`${ne.default.valCxt}.${ne.default.rootData}`), t.dynamicRef && e.var(ne.default.dynamicAnchors, (0, ee._)`${ne.default.valCxt}.${ne.default.dynamicAnchors}`);
  }, () => {
    e.var(ne.default.instancePath, (0, ee._)`""`), e.var(ne.default.parentData, (0, ee._)`undefined`), e.var(ne.default.parentDataProperty, (0, ee._)`undefined`), e.var(ne.default.rootData, ne.default.data), t.dynamicRef && e.var(ne.default.dynamicAnchors, (0, ee._)`{}`);
  });
}
function cD(e) {
  const { schema: t, opts: r, gen: n } = e;
  W$(e, () => {
    r.$comment && t.$comment && Z$(e), hD(e), n.let(ne.default.vErrors, null), n.let(ne.default.errors, 0), r.unevaluated && lD(e), Q$(e), yD(e);
  });
}
function lD(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, ee._)`${r}.evaluated`), t.if((0, ee._)`${e.evaluated}.dynamicProps`, () => t.assign((0, ee._)`${e.evaluated}.props`, (0, ee._)`undefined`)), t.if((0, ee._)`${e.evaluated}.dynamicItems`, () => t.assign((0, ee._)`${e.evaluated}.items`, (0, ee._)`undefined`));
}
function Im(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, ee._)`/*# sourceURL=${r} */` : ee.nil;
}
function uD(e, t) {
  if (J$(e) && (X$(e), Y$(e))) {
    fD(e, t);
    return;
  }
  (0, K$.boolOrEmptySchema)(e, t);
}
function Y$({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function J$(e) {
  return typeof e.schema != "boolean";
}
function fD(e, t) {
  const { schema: r, gen: n, opts: i } = e;
  i.$comment && r.$comment && Z$(e), pD(e), mD(e);
  const o = n.const("_errs", ne.default.errors);
  Q$(e, o), n.var(t, (0, ee._)`${o} === ${ne.default.errors}`);
}
function X$(e) {
  (0, Rr.checkUnknownRules)(e), dD(e);
}
function Q$(e, t) {
  if (e.opts.jtd)
    return km(e, [], !1, t);
  const r = (0, Rm.getSchemaTypes)(e.schema), n = (0, Rm.coerceAndCheckDataType)(e, r);
  km(e, r, !n, t);
}
function dD(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: i } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, Rr.schemaHasRulesButRef)(t, i.RULES) && i.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function hD(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, Rr.checkStrictMode)(e, "default is ignored in the schema root");
}
function pD(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, iD.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function mD(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Z$({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: i }) {
  const o = r.$comment;
  if (i.$comment === !0)
    e.code((0, ee._)`${ne.default.self}.logger.log(${o})`);
  else if (typeof i.$comment == "function") {
    const a = (0, ee.str)`${n}/$comment`, s = e.scopeValue("root", { ref: t.root });
    e.code((0, ee._)`${ne.default.self}.opts.$comment(${o}, ${a}, ${s}.schema)`);
  }
}
function yD(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: i, opts: o } = e;
  r.$async ? t.if((0, ee._)`${ne.default.errors} === 0`, () => t.return(ne.default.data), () => t.throw((0, ee._)`new ${i}(${ne.default.vErrors})`)) : (t.assign((0, ee._)`${n}.errors`, ne.default.vErrors), o.unevaluated && gD(e), t.return((0, ee._)`${ne.default.errors} === 0`));
}
function gD({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof ee.Name && e.assign((0, ee._)`${t}.props`, r), n instanceof ee.Name && e.assign((0, ee._)`${t}.items`, n);
}
function km(e, t, r, n) {
  const { gen: i, schema: o, data: a, allErrors: s, opts: c, self: f } = e, { RULES: l } = f;
  if (o.$ref && (c.ignoreKeywordsWithRef || !(0, Rr.schemaHasRulesButRef)(o, l))) {
    i.block(() => rv(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || $D(e, t), i.block(() => {
    for (const p of l.rules)
      u(p);
    u(l.post);
  });
  function u(p) {
    (0, lf.shouldUseGroup)(o, p) && (p.type ? (i.if((0, Rs.checkDataType)(p.type, a, c.strictNumbers)), Dm(e, p), t.length === 1 && t[0] === p.type && r && (i.else(), (0, Rs.reportTypeError)(e)), i.endIf()) : Dm(e, p), s || i.if((0, ee._)`${ne.default.errors} === ${n || 0}`));
  }
}
function Dm(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: i } } = e;
  i && (0, nD.assignDefaults)(e, t.type), r.block(() => {
    for (const o of t.rules)
      (0, lf.shouldUseRule)(n, o) && rv(e, o.keyword, o.definition, t.type);
  });
}
function $D(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (vD(e, t), e.opts.allowUnionTypes || _D(e, t), wD(e, e.dataTypes));
}
function vD(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      ev(e.dataTypes, r) || uf(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), SD(e, t);
  }
}
function _D(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && uf(e, "use allowUnionTypes to allow union type keyword");
}
function wD(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const i = r[n];
    if (typeof i == "object" && (0, lf.shouldUseRule)(e.schema, i)) {
      const { type: o } = i.definition;
      o.length && !o.some((a) => ED(t, a)) && uf(e, `missing type "${o.join(",")}" for keyword "${n}"`);
    }
  }
}
function ED(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function ev(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function SD(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    ev(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function uf(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, Rr.checkStrictMode)(e, t, e.opts.strictTypes);
}
let tv = class {
  constructor(t, r, n) {
    if ((0, Co.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, Rr.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", nv(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Co.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", ne.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, ee.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, ee.not)(t), void 0, r);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: r } = this;
    this.fail((0, ee._)`${r} !== undefined && (${(0, ee.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? yo.reportExtraError : yo.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, yo.reportError)(this, this.def.$dataError || yo.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, yo.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = ee.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = ee.nil, r = ee.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: i, schemaType: o, def: a } = this;
    n.if((0, ee.or)((0, ee._)`${i} === undefined`, r)), t !== ee.nil && n.assign(t, !0), (o.length || a.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== ee.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: i, it: o } = this;
    return (0, ee.or)(a(), s());
    function a() {
      if (n.length) {
        if (!(r instanceof ee.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, ee._)`${(0, Rs.checkDataTypes)(c, r, o.opts.strictNumbers, Rs.DataType.Wrong)}`;
      }
      return ee.nil;
    }
    function s() {
      if (i.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: i.validateSchema });
        return (0, ee._)`!${c}(${r})`;
      }
      return ee.nil;
    }
  }
  subschema(t, r) {
    const n = (0, gl.getSubschema)(this.it, t);
    (0, gl.extendSubschemaData)(n, this.it, t), (0, gl.extendSubschemaMode)(n, t);
    const i = { ...this.it, ...n, items: void 0, props: void 0 };
    return uD(i, r), i;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: i } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = Rr.mergeEvaluated.props(i, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = Rr.mergeEvaluated.items(i, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: i } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return i.if(r, () => this.mergeEvaluated(t, ee.Name)), !0;
  }
};
er.KeywordCxt = tv;
function rv(e, t, r, n) {
  const i = new tv(e, r, t);
  "code" in r ? r.code(i, n) : i.$data && r.validate ? (0, Co.funcKeywordCode)(i, r) : "macro" in r ? (0, Co.macroKeywordCode)(i, r) : (r.compile || r.validate) && (0, Co.funcKeywordCode)(i, r);
}
const bD = /^\/(?:[^~]|~0|~1)*$/, PD = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function nv(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let i, o;
  if (e === "")
    return ne.default.rootData;
  if (e[0] === "/") {
    if (!bD.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    i = e, o = ne.default.rootData;
  } else {
    const f = PD.exec(e);
    if (!f)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const l = +f[1];
    if (i = f[2], i === "#") {
      if (l >= t)
        throw new Error(c("property/index", l));
      return n[t - l];
    }
    if (l > t)
      throw new Error(c("data", l));
    if (o = r[t - l], !i)
      return o;
  }
  let a = o;
  const s = i.split("/");
  for (const f of s)
    f && (o = (0, ee._)`${o}${(0, ee.getProperty)((0, Rr.unescapeJsonPointer)(f))}`, a = (0, ee._)`${a} && ${o}`);
  return a;
  function c(f, l) {
    return `Cannot access ${f} ${l} levels up, current level is ${t}`;
  }
}
er.getData = nv;
var va = {};
Object.defineProperty(va, "__esModule", { value: !0 });
let TD = class extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
};
va.default = TD;
var Hi = {};
Object.defineProperty(Hi, "__esModule", { value: !0 });
const $l = et;
let ND = class extends Error {
  constructor(t, r, n, i) {
    super(i || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, $l.resolveUrl)(t, r, n), this.missingSchema = (0, $l.normalizeId)((0, $l.getFullPath)(t, this.missingRef));
  }
};
Hi.default = ND;
var yt = {};
Object.defineProperty(yt, "__esModule", { value: !0 });
yt.resolveSchema = yt.getCompilingSchema = yt.resolveRef = yt.compileSchema = yt.SchemaEnv = void 0;
const zt = ae, OD = va, On = Ft, Xt = et, Fm = J, AD = er;
let _c = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Xt.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
yt.SchemaEnv = _c;
function ff(e) {
  const t = iv.call(this, e);
  if (t)
    return t;
  const r = (0, Xt.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: i } = this.opts.code, { ownProperties: o } = this.opts, a = new zt.CodeGen(this.scope, { es5: n, lines: i, ownProperties: o });
  let s;
  e.$async && (s = a.scopeValue("Error", {
    ref: OD.default,
    code: (0, zt._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = a.scopeName("validate");
  e.validateName = c;
  const f = {
    gen: a,
    allErrors: this.opts.allErrors,
    data: On.default.data,
    parentData: On.default.parentData,
    parentDataProperty: On.default.parentDataProperty,
    dataNames: [On.default.data],
    dataPathArr: [zt.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: a.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, zt.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: s,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: zt.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, zt._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(e), (0, AD.validateFunctionCode)(f), a.optimize(this.opts.code.optimize);
    const u = a.toString();
    l = `${a.scopeRefs(On.default.scope)}return ${u}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const h = new Function(`${On.default.self}`, `${On.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: h }), h.errors = null, h.schema = e.schema, h.schemaEnv = e, e.$async && (h.$async = !0), this.opts.code.source === !0 && (h.source = { validateName: c, validateCode: u, scopeValues: a._values }), this.opts.unevaluated) {
      const { props: v, items: _ } = f;
      h.evaluated = {
        props: v instanceof zt.Name ? void 0 : v,
        items: _ instanceof zt.Name ? void 0 : _,
        dynamicProps: v instanceof zt.Name,
        dynamicItems: _ instanceof zt.Name
      }, h.source && (h.source.evaluated = (0, zt.stringify)(h.evaluated));
    }
    return e.validate = h, e;
  } catch (u) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), u;
  } finally {
    this._compilations.delete(e);
  }
}
yt.compileSchema = ff;
function CD(e, t, r) {
  var n;
  r = (0, Xt.resolveUrl)(this.opts.uriResolver, t, r);
  const i = e.refs[r];
  if (i)
    return i;
  let o = kD.call(this, e, r);
  if (o === void 0) {
    const a = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: s } = this.opts;
    a && (o = new _c({ schema: a, schemaId: s, root: e, baseId: t }));
  }
  if (o !== void 0)
    return e.refs[r] = RD.call(this, o);
}
yt.resolveRef = CD;
function RD(e) {
  return (0, Xt.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : ff.call(this, e);
}
function iv(e) {
  for (const t of this._compilations)
    if (ID(t, e))
      return t;
}
yt.getCompilingSchema = iv;
function ID(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function kD(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || wc.call(this, e, t);
}
function wc(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Xt._getFullPath)(this.opts.uriResolver, r);
  let i = (0, Xt.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === i)
    return vl.call(this, r, e);
  const o = (0, Xt.normalizeId)(n), a = this.refs[o] || this.schemas[o];
  if (typeof a == "string") {
    const s = wc.call(this, e, a);
    return typeof (s == null ? void 0 : s.schema) != "object" ? void 0 : vl.call(this, r, s);
  }
  if (typeof (a == null ? void 0 : a.schema) == "object") {
    if (a.validate || ff.call(this, a), o === (0, Xt.normalizeId)(t)) {
      const { schema: s } = a, { schemaId: c } = this.opts, f = s[c];
      return f && (i = (0, Xt.resolveUrl)(this.opts.uriResolver, i, f)), new _c({ schema: s, schemaId: c, root: e, baseId: i });
    }
    return vl.call(this, r, a);
  }
}
yt.resolveSchema = wc;
const DD = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function vl(e, { baseId: t, schema: r, root: n }) {
  var i;
  if (((i = e.fragment) === null || i === void 0 ? void 0 : i[0]) !== "/")
    return;
  for (const s of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, Fm.unescapeFragment)(s)];
    if (c === void 0)
      return;
    r = c;
    const f = typeof r == "object" && r[this.opts.schemaId];
    !DD.has(s) && f && (t = (0, Xt.resolveUrl)(this.opts.uriResolver, t, f));
  }
  let o;
  if (typeof r != "boolean" && r.$ref && !(0, Fm.schemaHasRulesButRef)(r, this.RULES)) {
    const s = (0, Xt.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    o = wc.call(this, n, s);
  }
  const { schemaId: a } = this.opts;
  if (o = o || new _c({ schema: r, schemaId: a, root: n, baseId: t }), o.schema !== o.root.schema)
    return o;
}
const FD = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", jD = "Meta-schema for $data reference (JSON AnySchema extension proposal)", LD = "object", MD = [
  "$data"
], UD = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, xD = !1, qD = {
  $id: FD,
  description: jD,
  type: LD,
  required: MD,
  properties: UD,
  additionalProperties: xD
};
var df = {}, Ec = { exports: {} };
const VD = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  A: 10,
  b: 11,
  B: 11,
  c: 12,
  C: 12,
  d: 13,
  D: 13,
  e: 14,
  E: 14,
  f: 15,
  F: 15
};
var HD = {
  HEX: VD
};
const { HEX: GD } = HD, BD = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u;
function ov(e) {
  if (sv(e, ".") < 3)
    return { host: e, isIPV4: !1 };
  const t = e.match(BD) || [], [r] = t;
  return r ? { host: KD(r, "."), isIPV4: !0 } : { host: e, isIPV4: !1 };
}
function jm(e, t = !1) {
  let r = "", n = !0;
  for (const i of e) {
    if (GD[i] === void 0) return;
    i !== "0" && n === !0 && (n = !1), n || (r += i);
  }
  return t && r.length === 0 && (r = "0"), r;
}
function zD(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], i = [];
  let o = !1, a = !1, s = !1;
  function c() {
    if (i.length) {
      if (o === !1) {
        const f = jm(i);
        if (f !== void 0)
          n.push(f);
        else
          return r.error = !0, !1;
      }
      i.length = 0;
    }
    return !0;
  }
  for (let f = 0; f < e.length; f++) {
    const l = e[f];
    if (!(l === "[" || l === "]"))
      if (l === ":") {
        if (a === !0 && (s = !0), !c())
          break;
        if (t++, n.push(":"), t > 7) {
          r.error = !0;
          break;
        }
        f - 1 >= 0 && e[f - 1] === ":" && (a = !0);
        continue;
      } else if (l === "%") {
        if (!c())
          break;
        o = !0;
      } else {
        i.push(l);
        continue;
      }
  }
  return i.length && (o ? r.zone = i.join("") : s ? n.push(i.join("")) : n.push(jm(i))), r.address = n.join(""), r;
}
function av(e) {
  if (sv(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = zD(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, escapedHost: n, isIPV6: !0 };
  }
}
function KD(e, t) {
  let r = "", n = !0;
  const i = e.length;
  for (let o = 0; o < i; o++) {
    const a = e[o];
    a === "0" && n ? (o + 1 <= i && e[o + 1] === t || o + 1 === i) && (r += a, n = !1) : (a === t ? n = !0 : n = !1, r += a);
  }
  return r;
}
function sv(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
const Lm = /^\.\.?\//u, Mm = /^\/\.(?:\/|$)/u, Um = /^\/\.\.(?:\/|$)/u, WD = /^\/?(?:.|\n)*?(?=\/|$)/u;
function YD(e) {
  const t = [];
  for (; e.length; )
    if (e.match(Lm))
      e = e.replace(Lm, "");
    else if (e.match(Mm))
      e = e.replace(Mm, "/");
    else if (e.match(Um))
      e = e.replace(Um, "/"), t.pop();
    else if (e === "." || e === "..")
      e = "";
    else {
      const r = e.match(WD);
      if (r) {
        const n = r[0];
        e = e.slice(n.length), t.push(n);
      } else
        throw new Error("Unexpected dot segment condition");
    }
  return t.join("");
}
function JD(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function XD(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    const n = ov(r);
    if (n.isIPV4)
      r = n.host;
    else {
      const i = av(n.host);
      i.isIPV6 === !0 ? r = `[${i.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var QD = {
  recomposeAuthority: XD,
  normalizeComponentEncoding: JD,
  removeDotSegments: YD,
  normalizeIPv4: ov,
  normalizeIPv6: av
};
const ZD = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu, eF = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function cv(e) {
  return typeof e.secure == "boolean" ? e.secure : String(e.scheme).toLowerCase() === "wss";
}
function lv(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function uv(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function tF(e) {
  return e.secure = cv(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function rF(e) {
  if ((e.port === (cv(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function nF(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(eF);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const i = `${n}:${t.nid || e.nid}`, o = hf[i];
    e.path = void 0, o && (e = o.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function iF(e, t) {
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), i = `${r}:${t.nid || n}`, o = hf[i];
  o && (e = o.serialize(e, t));
  const a = e, s = e.nss;
  return a.path = `${n || t.nid}:${s}`, t.skipEscape = !0, a;
}
function oF(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !ZD.test(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function aF(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const fv = {
  scheme: "http",
  domainHost: !0,
  parse: lv,
  serialize: uv
}, sF = {
  scheme: "https",
  domainHost: fv.domainHost,
  parse: lv,
  serialize: uv
}, ls = {
  scheme: "ws",
  domainHost: !0,
  parse: tF,
  serialize: rF
}, cF = {
  scheme: "wss",
  domainHost: ls.domainHost,
  parse: ls.parse,
  serialize: ls.serialize
}, lF = {
  scheme: "urn",
  parse: nF,
  serialize: iF,
  skipNormalize: !0
}, uF = {
  scheme: "urn:uuid",
  parse: oF,
  serialize: aF,
  skipNormalize: !0
}, hf = {
  http: fv,
  https: sF,
  ws: ls,
  wss: cF,
  urn: lF,
  "urn:uuid": uF
};
var fF = hf;
const { normalizeIPv6: dF, normalizeIPv4: hF, removeDotSegments: Eo, recomposeAuthority: pF, normalizeComponentEncoding: za } = QD, pf = fF;
function mF(e, t) {
  return typeof e == "string" ? e = ur(jr(e, t), t) : typeof e == "object" && (e = jr(ur(e, t), t)), e;
}
function yF(e, t, r) {
  const n = Object.assign({ scheme: "null" }, r), i = dv(jr(e, n), jr(t, n), n, !0);
  return ur(i, { ...n, skipEscape: !0 });
}
function dv(e, t, r, n) {
  const i = {};
  return n || (e = jr(ur(e, r), r), t = jr(ur(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (i.scheme = t.scheme, i.userinfo = t.userinfo, i.host = t.host, i.port = t.port, i.path = Eo(t.path || ""), i.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (i.userinfo = t.userinfo, i.host = t.host, i.port = t.port, i.path = Eo(t.path || ""), i.query = t.query) : (t.path ? (t.path.charAt(0) === "/" ? i.path = Eo(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? i.path = "/" + t.path : e.path ? i.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : i.path = t.path, i.path = Eo(i.path)), i.query = t.query) : (i.path = e.path, t.query !== void 0 ? i.query = t.query : i.query = e.query), i.userinfo = e.userinfo, i.host = e.host, i.port = e.port), i.scheme = e.scheme), i.fragment = t.fragment, i;
}
function gF(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = ur(za(jr(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = ur(za(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = ur(za(jr(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = ur(za(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function ur(e, t) {
  const r = {
    host: e.host,
    scheme: e.scheme,
    userinfo: e.userinfo,
    port: e.port,
    path: e.path,
    query: e.query,
    nid: e.nid,
    nss: e.nss,
    uuid: e.uuid,
    fragment: e.fragment,
    reference: e.reference,
    resourceName: e.resourceName,
    secure: e.secure,
    error: ""
  }, n = Object.assign({}, t), i = [], o = pf[(n.scheme || r.scheme || "").toLowerCase()];
  o && o.serialize && o.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && i.push(r.scheme, ":");
  const a = pF(r);
  if (a !== void 0 && (n.reference !== "suffix" && i.push("//"), i.push(a), r.path && r.path.charAt(0) !== "/" && i.push("/")), r.path !== void 0) {
    let s = r.path;
    !n.absolutePath && (!o || !o.absolutePath) && (s = Eo(s)), a === void 0 && (s = s.replace(/^\/\//u, "/%2F")), i.push(s);
  }
  return r.query !== void 0 && i.push("?", r.query), r.fragment !== void 0 && i.push("#", r.fragment), i.join("");
}
const $F = Array.from({ length: 127 }, (e, t) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(t)));
function vF(e) {
  let t = 0;
  for (let r = 0, n = e.length; r < n; ++r)
    if (t = e.charCodeAt(r), t > 126 || $F[t])
      return !0;
  return !1;
}
const _F = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function jr(e, t) {
  const r = Object.assign({}, t), n = {
    scheme: void 0,
    userinfo: void 0,
    host: "",
    port: void 0,
    path: "",
    query: void 0,
    fragment: void 0
  }, i = e.indexOf("%") !== -1;
  let o = !1;
  r.reference === "suffix" && (e = (r.scheme ? r.scheme + ":" : "") + "//" + e);
  const a = e.match(_F);
  if (a) {
    if (n.scheme = a[1], n.userinfo = a[3], n.host = a[4], n.port = parseInt(a[5], 10), n.path = a[6] || "", n.query = a[7], n.fragment = a[8], isNaN(n.port) && (n.port = a[5]), n.host) {
      const c = hF(n.host);
      if (c.isIPV4 === !1) {
        const f = dF(c.host);
        n.host = f.host.toLowerCase(), o = f.isIPV6;
      } else
        n.host = c.host, o = !0;
    }
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const s = pf[(r.scheme || n.scheme || "").toLowerCase()];
    if (!r.unicodeSupport && (!s || !s.unicodeSupport) && n.host && (r.domainHost || s && s.domainHost) && o === !1 && vF(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (c) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + c;
      }
    (!s || s && !s.skipNormalize) && (i && n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), i && n.host !== void 0 && (n.host = unescape(n.host)), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), s && s.parse && s.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const mf = {
  SCHEMES: pf,
  normalize: mF,
  resolve: yF,
  resolveComponents: dv,
  equal: gF,
  serialize: ur,
  parse: jr
};
Ec.exports = mf;
Ec.exports.default = mf;
Ec.exports.fastUri = mf;
var hv = Ec.exports;
Object.defineProperty(df, "__esModule", { value: !0 });
const pv = hv;
pv.code = 'require("ajv/dist/runtime/uri").default';
df.default = pv;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = er;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = ae;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = va, i = Hi, o = Bn, a = yt, s = ae, c = et, f = xe, l = J, u = qD, p = df, h = (I, S) => new RegExp(I, S);
  h.code = "new RegExp";
  const v = ["removeAdditional", "useDefaults", "coerceTypes"], _ = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), g = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, m = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, E = 200;
  function N(I) {
    var S, A, b, d, $, O, w, y, j, C, X, pe, ve, be, Oe, it, _e, Me, Gt, jt, Ct, Lt, $r, vr, _r;
    const Rt = I.strict, Mt = (S = I.code) === null || S === void 0 ? void 0 : S.optimize, wr = Mt === !0 || Mt === void 0 ? 1 : Mt || 0, Mr = (b = (A = I.code) === null || A === void 0 ? void 0 : A.regExp) !== null && b !== void 0 ? b : h, bt = (d = I.uriResolver) !== null && d !== void 0 ? d : p.default;
    return {
      strictSchema: (O = ($ = I.strictSchema) !== null && $ !== void 0 ? $ : Rt) !== null && O !== void 0 ? O : !0,
      strictNumbers: (y = (w = I.strictNumbers) !== null && w !== void 0 ? w : Rt) !== null && y !== void 0 ? y : !0,
      strictTypes: (C = (j = I.strictTypes) !== null && j !== void 0 ? j : Rt) !== null && C !== void 0 ? C : "log",
      strictTuples: (pe = (X = I.strictTuples) !== null && X !== void 0 ? X : Rt) !== null && pe !== void 0 ? pe : "log",
      strictRequired: (be = (ve = I.strictRequired) !== null && ve !== void 0 ? ve : Rt) !== null && be !== void 0 ? be : !1,
      code: I.code ? { ...I.code, optimize: wr, regExp: Mr } : { optimize: wr, regExp: Mr },
      loopRequired: (Oe = I.loopRequired) !== null && Oe !== void 0 ? Oe : E,
      loopEnum: (it = I.loopEnum) !== null && it !== void 0 ? it : E,
      meta: (_e = I.meta) !== null && _e !== void 0 ? _e : !0,
      messages: (Me = I.messages) !== null && Me !== void 0 ? Me : !0,
      inlineRefs: (Gt = I.inlineRefs) !== null && Gt !== void 0 ? Gt : !0,
      schemaId: (jt = I.schemaId) !== null && jt !== void 0 ? jt : "$id",
      addUsedSchema: (Ct = I.addUsedSchema) !== null && Ct !== void 0 ? Ct : !0,
      validateSchema: (Lt = I.validateSchema) !== null && Lt !== void 0 ? Lt : !0,
      validateFormats: ($r = I.validateFormats) !== null && $r !== void 0 ? $r : !0,
      unicodeRegExp: (vr = I.unicodeRegExp) !== null && vr !== void 0 ? vr : !0,
      int32range: (_r = I.int32range) !== null && _r !== void 0 ? _r : !0,
      uriResolver: bt
    };
  }
  class R {
    constructor(S = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), S = this.opts = { ...S, ...N(S) };
      const { es5: A, lines: b } = this.opts.code;
      this.scope = new s.ValueScope({ scope: {}, prefixes: _, es5: A, lines: b }), this.logger = G(S.logger);
      const d = S.validateFormats;
      S.validateFormats = !1, this.RULES = (0, o.getRules)(), F.call(this, g, S, "NOT SUPPORTED"), F.call(this, m, S, "DEPRECATED", "warn"), this._metaOpts = K.call(this), S.formats && V.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), S.keywords && P.call(this, S.keywords), typeof S.meta == "object" && this.addMetaSchema(S.meta), L.call(this), S.validateFormats = d;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: S, meta: A, schemaId: b } = this.opts;
      let d = u;
      b === "id" && (d = { ...u }, d.id = d.$id, delete d.$id), A && S && this.addMetaSchema(d, d[b], !1);
    }
    defaultMeta() {
      const { meta: S, schemaId: A } = this.opts;
      return this.opts.defaultMeta = typeof S == "object" ? S[A] || S : void 0;
    }
    validate(S, A) {
      let b;
      if (typeof S == "string") {
        if (b = this.getSchema(S), !b)
          throw new Error(`no schema with key or ref "${S}"`);
      } else
        b = this.compile(S);
      const d = b(A);
      return "$async" in b || (this.errors = b.errors), d;
    }
    compile(S, A) {
      const b = this._addSchema(S, A);
      return b.validate || this._compileSchemaEnv(b);
    }
    compileAsync(S, A) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: b } = this.opts;
      return d.call(this, S, A);
      async function d(C, X) {
        await $.call(this, C.$schema);
        const pe = this._addSchema(C, X);
        return pe.validate || O.call(this, pe);
      }
      async function $(C) {
        C && !this.getSchema(C) && await d.call(this, { $ref: C }, !0);
      }
      async function O(C) {
        try {
          return this._compileSchemaEnv(C);
        } catch (X) {
          if (!(X instanceof i.default))
            throw X;
          return w.call(this, X), await y.call(this, X.missingSchema), O.call(this, C);
        }
      }
      function w({ missingSchema: C, missingRef: X }) {
        if (this.refs[C])
          throw new Error(`AnySchema ${C} is loaded but ${X} cannot be resolved`);
      }
      async function y(C) {
        const X = await j.call(this, C);
        this.refs[C] || await $.call(this, X.$schema), this.refs[C] || this.addSchema(X, C, A);
      }
      async function j(C) {
        const X = this._loading[C];
        if (X)
          return X;
        try {
          return await (this._loading[C] = b(C));
        } finally {
          delete this._loading[C];
        }
      }
    }
    // Adds schema to the instance
    addSchema(S, A, b, d = this.opts.validateSchema) {
      if (Array.isArray(S)) {
        for (const O of S)
          this.addSchema(O, void 0, b, d);
        return this;
      }
      let $;
      if (typeof S == "object") {
        const { schemaId: O } = this.opts;
        if ($ = S[O], $ !== void 0 && typeof $ != "string")
          throw new Error(`schema ${O} must be string`);
      }
      return A = (0, c.normalizeId)(A || $), this._checkUnique(A), this.schemas[A] = this._addSchema(S, b, A, d, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(S, A, b = this.opts.validateSchema) {
      return this.addSchema(S, A, !0, b), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(S, A) {
      if (typeof S == "boolean")
        return !0;
      let b;
      if (b = S.$schema, b !== void 0 && typeof b != "string")
        throw new Error("$schema must be a string");
      if (b = b || this.opts.defaultMeta || this.defaultMeta(), !b)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const d = this.validate(b, S);
      if (!d && A) {
        const $ = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error($);
        else
          throw new Error($);
      }
      return d;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(S) {
      let A;
      for (; typeof (A = k.call(this, S)) == "string"; )
        S = A;
      if (A === void 0) {
        const { schemaId: b } = this.opts, d = new a.SchemaEnv({ schema: {}, schemaId: b });
        if (A = a.resolveSchema.call(this, d, S), !A)
          return;
        this.refs[S] = A;
      }
      return A.validate || this._compileSchemaEnv(A);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(S) {
      if (S instanceof RegExp)
        return this._removeAllSchemas(this.schemas, S), this._removeAllSchemas(this.refs, S), this;
      switch (typeof S) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const A = k.call(this, S);
          return typeof A == "object" && this._cache.delete(A.schema), delete this.schemas[S], delete this.refs[S], this;
        }
        case "object": {
          const A = S;
          this._cache.delete(A);
          let b = S[this.opts.schemaId];
          return b && (b = (0, c.normalizeId)(b), delete this.schemas[b], delete this.refs[b]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(S) {
      for (const A of S)
        this.addKeyword(A);
      return this;
    }
    addKeyword(S, A) {
      let b;
      if (typeof S == "string")
        b = S, typeof A == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), A.keyword = b);
      else if (typeof S == "object" && A === void 0) {
        if (A = S, b = A.keyword, Array.isArray(b) && !b.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (M.call(this, b, A), !A)
        return (0, l.eachItem)(b, ($) => U.call(this, $)), this;
      x.call(this, A);
      const d = {
        ...A,
        type: (0, f.getJSONTypes)(A.type),
        schemaType: (0, f.getJSONTypes)(A.schemaType)
      };
      return (0, l.eachItem)(b, d.type.length === 0 ? ($) => U.call(this, $, d) : ($) => d.type.forEach((O) => U.call(this, $, d, O))), this;
    }
    getKeyword(S) {
      const A = this.RULES.all[S];
      return typeof A == "object" ? A.definition : !!A;
    }
    // Remove keyword
    removeKeyword(S) {
      const { RULES: A } = this;
      delete A.keywords[S], delete A.all[S];
      for (const b of A.rules) {
        const d = b.rules.findIndex(($) => $.keyword === S);
        d >= 0 && b.rules.splice(d, 1);
      }
      return this;
    }
    // Add format
    addFormat(S, A) {
      return typeof A == "string" && (A = new RegExp(A)), this.formats[S] = A, this;
    }
    errorsText(S = this.errors, { separator: A = ", ", dataVar: b = "data" } = {}) {
      return !S || S.length === 0 ? "No errors" : S.map((d) => `${b}${d.instancePath} ${d.message}`).reduce((d, $) => d + A + $);
    }
    $dataMetaSchema(S, A) {
      const b = this.RULES.all;
      S = JSON.parse(JSON.stringify(S));
      for (const d of A) {
        const $ = d.split("/").slice(1);
        let O = S;
        for (const w of $)
          O = O[w];
        for (const w in b) {
          const y = b[w];
          if (typeof y != "object")
            continue;
          const { $data: j } = y.definition, C = O[w];
          j && C && (O[w] = z(C));
        }
      }
      return S;
    }
    _removeAllSchemas(S, A) {
      for (const b in S) {
        const d = S[b];
        (!A || A.test(b)) && (typeof d == "string" ? delete S[b] : d && !d.meta && (this._cache.delete(d.schema), delete S[b]));
      }
    }
    _addSchema(S, A, b, d = this.opts.validateSchema, $ = this.opts.addUsedSchema) {
      let O;
      const { schemaId: w } = this.opts;
      if (typeof S == "object")
        O = S[w];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof S != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let y = this._cache.get(S);
      if (y !== void 0)
        return y;
      b = (0, c.normalizeId)(O || b);
      const j = c.getSchemaRefs.call(this, S, b);
      return y = new a.SchemaEnv({ schema: S, schemaId: w, meta: A, baseId: b, localRefs: j }), this._cache.set(y.schema, y), $ && !b.startsWith("#") && (b && this._checkUnique(b), this.refs[b] = y), d && this.validateSchema(S, !0), y;
    }
    _checkUnique(S) {
      if (this.schemas[S] || this.refs[S])
        throw new Error(`schema with key or id "${S}" already exists`);
    }
    _compileSchemaEnv(S) {
      if (S.meta ? this._compileMetaSchema(S) : a.compileSchema.call(this, S), !S.validate)
        throw new Error("ajv implementation error");
      return S.validate;
    }
    _compileMetaSchema(S) {
      const A = this.opts;
      this.opts = this._metaOpts;
      try {
        a.compileSchema.call(this, S);
      } finally {
        this.opts = A;
      }
    }
  }
  R.ValidationError = n.default, R.MissingRefError = i.default, e.default = R;
  function F(I, S, A, b = "error") {
    for (const d in I) {
      const $ = d;
      $ in S && this.logger[b](`${A}: option ${d}. ${I[$]}`);
    }
  }
  function k(I) {
    return I = (0, c.normalizeId)(I), this.schemas[I] || this.refs[I];
  }
  function L() {
    const I = this.opts.schemas;
    if (I)
      if (Array.isArray(I))
        this.addSchema(I);
      else
        for (const S in I)
          this.addSchema(I[S], S);
  }
  function V() {
    for (const I in this.opts.formats) {
      const S = this.opts.formats[I];
      S && this.addFormat(I, S);
    }
  }
  function P(I) {
    if (Array.isArray(I)) {
      this.addVocabulary(I);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const S in I) {
      const A = I[S];
      A.keyword || (A.keyword = S), this.addKeyword(A);
    }
  }
  function K() {
    const I = { ...this.opts };
    for (const S of v)
      delete I[S];
    return I;
  }
  const q = { log() {
  }, warn() {
  }, error() {
  } };
  function G(I) {
    if (I === !1)
      return q;
    if (I === void 0)
      return console;
    if (I.log && I.warn && I.error)
      return I;
    throw new Error("logger must implement log, warn and error methods");
  }
  const Y = /^[a-z_$][a-z0-9_$:-]*$/i;
  function M(I, S) {
    const { RULES: A } = this;
    if ((0, l.eachItem)(I, (b) => {
      if (A.keywords[b])
        throw new Error(`Keyword ${b} is already defined`);
      if (!Y.test(b))
        throw new Error(`Keyword ${b} has invalid name`);
    }), !!S && S.$data && !("code" in S || "validate" in S))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function U(I, S, A) {
    var b;
    const d = S == null ? void 0 : S.post;
    if (A && d)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: $ } = this;
    let O = d ? $.post : $.rules.find(({ type: y }) => y === A);
    if (O || (O = { type: A, rules: [] }, $.rules.push(O)), $.keywords[I] = !0, !S)
      return;
    const w = {
      keyword: I,
      definition: {
        ...S,
        type: (0, f.getJSONTypes)(S.type),
        schemaType: (0, f.getJSONTypes)(S.schemaType)
      }
    };
    S.before ? H.call(this, O, w, S.before) : O.rules.push(w), $.all[I] = w, (b = S.implements) === null || b === void 0 || b.forEach((y) => this.addKeyword(y));
  }
  function H(I, S, A) {
    const b = I.rules.findIndex((d) => d.keyword === A);
    b >= 0 ? I.rules.splice(b, 0, S) : (I.rules.push(S), this.logger.warn(`rule ${A} is not defined`));
  }
  function x(I) {
    let { metaSchema: S } = I;
    S !== void 0 && (I.$data && this.opts.$data && (S = z(S)), I.validateSchema = this.compile(S, !0));
  }
  const W = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function z(I) {
    return { anyOf: [I, W] };
  }
})(N$);
var yf = {}, gf = {}, $f = {};
Object.defineProperty($f, "__esModule", { value: !0 });
const wF = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
$f.default = wF;
var Lr = {};
Object.defineProperty(Lr, "__esModule", { value: !0 });
Lr.callRef = Lr.getValidate = void 0;
const EF = Hi, xm = de, Pt = ae, ai = Ft, qm = yt, Ka = J, SF = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: i, schemaEnv: o, validateName: a, opts: s, self: c } = n, { root: f } = o;
    if ((r === "#" || r === "#/") && i === f.baseId)
      return u();
    const l = qm.resolveRef.call(c, f, i, r);
    if (l === void 0)
      throw new EF.default(n.opts.uriResolver, i, r);
    if (l instanceof qm.SchemaEnv)
      return p(l);
    return h(l);
    function u() {
      if (o === f)
        return us(e, a, o, o.$async);
      const v = t.scopeValue("root", { ref: f });
      return us(e, (0, Pt._)`${v}.validate`, f, f.$async);
    }
    function p(v) {
      const _ = mv(e, v);
      us(e, _, v, v.$async);
    }
    function h(v) {
      const _ = t.scopeValue("schema", s.code.source === !0 ? { ref: v, code: (0, Pt.stringify)(v) } : { ref: v }), g = t.name("valid"), m = e.subschema({
        schema: v,
        dataTypes: [],
        schemaPath: Pt.nil,
        topSchemaRef: _,
        errSchemaPath: r
      }, g);
      e.mergeEvaluated(m), e.ok(g);
    }
  }
};
function mv(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Pt._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
Lr.getValidate = mv;
function us(e, t, r, n) {
  const { gen: i, it: o } = e, { allErrors: a, schemaEnv: s, opts: c } = o, f = c.passContext ? ai.default.this : Pt.nil;
  n ? l() : u();
  function l() {
    if (!s.$async)
      throw new Error("async schema referenced by sync schema");
    const v = i.let("valid");
    i.try(() => {
      i.code((0, Pt._)`await ${(0, xm.callValidateCode)(e, t, f)}`), h(t), a || i.assign(v, !0);
    }, (_) => {
      i.if((0, Pt._)`!(${_} instanceof ${o.ValidationError})`, () => i.throw(_)), p(_), a || i.assign(v, !1);
    }), e.ok(v);
  }
  function u() {
    e.result((0, xm.callValidateCode)(e, t, f), () => h(t), () => p(t));
  }
  function p(v) {
    const _ = (0, Pt._)`${v}.errors`;
    i.assign(ai.default.vErrors, (0, Pt._)`${ai.default.vErrors} === null ? ${_} : ${ai.default.vErrors}.concat(${_})`), i.assign(ai.default.errors, (0, Pt._)`${ai.default.vErrors}.length`);
  }
  function h(v) {
    var _;
    if (!o.opts.unevaluated)
      return;
    const g = (_ = r == null ? void 0 : r.validate) === null || _ === void 0 ? void 0 : _.evaluated;
    if (o.props !== !0)
      if (g && !g.dynamicProps)
        g.props !== void 0 && (o.props = Ka.mergeEvaluated.props(i, g.props, o.props));
      else {
        const m = i.var("props", (0, Pt._)`${v}.evaluated.props`);
        o.props = Ka.mergeEvaluated.props(i, m, o.props, Pt.Name);
      }
    if (o.items !== !0)
      if (g && !g.dynamicItems)
        g.items !== void 0 && (o.items = Ka.mergeEvaluated.items(i, g.items, o.items));
      else {
        const m = i.var("items", (0, Pt._)`${v}.evaluated.items`);
        o.items = Ka.mergeEvaluated.items(i, m, o.items, Pt.Name);
      }
  }
}
Lr.callRef = us;
Lr.default = SF;
Object.defineProperty(gf, "__esModule", { value: !0 });
const bF = $f, PF = Lr, TF = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  bF.default,
  PF.default
];
gf.default = TF;
var vf = {}, _f = {};
Object.defineProperty(_f, "__esModule", { value: !0 });
const Is = ae, Kr = Is.operators, ks = {
  maximum: { okStr: "<=", ok: Kr.LTE, fail: Kr.GT },
  minimum: { okStr: ">=", ok: Kr.GTE, fail: Kr.LT },
  exclusiveMaximum: { okStr: "<", ok: Kr.LT, fail: Kr.GTE },
  exclusiveMinimum: { okStr: ">", ok: Kr.GT, fail: Kr.LTE }
}, NF = {
  message: ({ keyword: e, schemaCode: t }) => (0, Is.str)`must be ${ks[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Is._)`{comparison: ${ks[e].okStr}, limit: ${t}}`
}, OF = {
  keyword: Object.keys(ks),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: NF,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Is._)`${r} ${ks[t].fail} ${n} || isNaN(${r})`);
  }
};
_f.default = OF;
var wf = {};
Object.defineProperty(wf, "__esModule", { value: !0 });
const Ro = ae, AF = {
  message: ({ schemaCode: e }) => (0, Ro.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Ro._)`{multipleOf: ${e}}`
}, CF = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: AF,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: i } = e, o = i.opts.multipleOfPrecision, a = t.let("res"), s = o ? (0, Ro._)`Math.abs(Math.round(${a}) - ${a}) > 1e-${o}` : (0, Ro._)`${a} !== parseInt(${a})`;
    e.fail$data((0, Ro._)`(${n} === 0 || (${a} = ${r}/${n}, ${s}))`);
  }
};
wf.default = CF;
var Ef = {}, Sf = {};
Object.defineProperty(Sf, "__esModule", { value: !0 });
function yv(e) {
  const t = e.length;
  let r = 0, n = 0, i;
  for (; n < t; )
    r++, i = e.charCodeAt(n++), i >= 55296 && i <= 56319 && n < t && (i = e.charCodeAt(n), (i & 64512) === 56320 && n++);
  return r;
}
Sf.default = yv;
yv.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Ef, "__esModule", { value: !0 });
const Dn = ae, RF = J, IF = Sf, kF = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Dn.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Dn._)`{limit: ${e}}`
}, DF = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: kF,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: i } = e, o = t === "maxLength" ? Dn.operators.GT : Dn.operators.LT, a = i.opts.unicode === !1 ? (0, Dn._)`${r}.length` : (0, Dn._)`${(0, RF.useFunc)(e.gen, IF.default)}(${r})`;
    e.fail$data((0, Dn._)`${a} ${o} ${n}`);
  }
};
Ef.default = DF;
var bf = {};
Object.defineProperty(bf, "__esModule", { value: !0 });
const FF = de, Ds = ae, jF = {
  message: ({ schemaCode: e }) => (0, Ds.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Ds._)`{pattern: ${e}}`
}, LF = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: jF,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: i, it: o } = e, a = o.opts.unicodeRegExp ? "u" : "", s = r ? (0, Ds._)`(new RegExp(${i}, ${a}))` : (0, FF.usePattern)(e, n);
    e.fail$data((0, Ds._)`!${s}.test(${t})`);
  }
};
bf.default = LF;
var Pf = {};
Object.defineProperty(Pf, "__esModule", { value: !0 });
const Io = ae, MF = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Io.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Io._)`{limit: ${e}}`
}, UF = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: MF,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxProperties" ? Io.operators.GT : Io.operators.LT;
    e.fail$data((0, Io._)`Object.keys(${r}).length ${i} ${n}`);
  }
};
Pf.default = UF;
var Tf = {};
Object.defineProperty(Tf, "__esModule", { value: !0 });
const go = de, ko = ae, xF = J, qF = {
  message: ({ params: { missingProperty: e } }) => (0, ko.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, ko._)`{missingProperty: ${e}}`
}, VF = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: qF,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: i, $data: o, it: a } = e, { opts: s } = a;
    if (!o && r.length === 0)
      return;
    const c = r.length >= s.loopRequired;
    if (a.allErrors ? f() : l(), s.strictRequired) {
      const h = e.parentSchema.properties, { definedProperties: v } = e.it;
      for (const _ of r)
        if ((h == null ? void 0 : h[_]) === void 0 && !v.has(_)) {
          const g = a.schemaEnv.baseId + a.errSchemaPath, m = `required property "${_}" is not defined at "${g}" (strictRequired)`;
          (0, xF.checkStrictMode)(a, m, a.opts.strictRequired);
        }
    }
    function f() {
      if (c || o)
        e.block$data(ko.nil, u);
      else
        for (const h of r)
          (0, go.checkReportMissingProp)(e, h);
    }
    function l() {
      const h = t.let("missing");
      if (c || o) {
        const v = t.let("valid", !0);
        e.block$data(v, () => p(h, v)), e.ok(v);
      } else
        t.if((0, go.checkMissingProp)(e, r, h)), (0, go.reportMissingProp)(e, h), t.else();
    }
    function u() {
      t.forOf("prop", n, (h) => {
        e.setParams({ missingProperty: h }), t.if((0, go.noPropertyInData)(t, i, h, s.ownProperties), () => e.error());
      });
    }
    function p(h, v) {
      e.setParams({ missingProperty: h }), t.forOf(h, n, () => {
        t.assign(v, (0, go.propertyInData)(t, i, h, s.ownProperties)), t.if((0, ko.not)(v), () => {
          e.error(), t.break();
        });
      }, ko.nil);
    }
  }
};
Tf.default = VF;
var Nf = {};
Object.defineProperty(Nf, "__esModule", { value: !0 });
const Do = ae, HF = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Do.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Do._)`{limit: ${e}}`
}, GF = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: HF,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxItems" ? Do.operators.GT : Do.operators.LT;
    e.fail$data((0, Do._)`${r}.length ${i} ${n}`);
  }
};
Nf.default = GF;
var Of = {}, _a = {};
Object.defineProperty(_a, "__esModule", { value: !0 });
const gv = vc;
gv.code = 'require("ajv/dist/runtime/equal").default';
_a.default = gv;
Object.defineProperty(Of, "__esModule", { value: !0 });
const _l = xe, Je = ae, BF = J, zF = _a, KF = {
  message: ({ params: { i: e, j: t } }) => (0, Je.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Je._)`{i: ${e}, j: ${t}}`
}, WF = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: KF,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, parentSchema: o, schemaCode: a, it: s } = e;
    if (!n && !i)
      return;
    const c = t.let("valid"), f = o.items ? (0, _l.getSchemaTypes)(o.items) : [];
    e.block$data(c, l, (0, Je._)`${a} === false`), e.ok(c);
    function l() {
      const v = t.let("i", (0, Je._)`${r}.length`), _ = t.let("j");
      e.setParams({ i: v, j: _ }), t.assign(c, !0), t.if((0, Je._)`${v} > 1`, () => (u() ? p : h)(v, _));
    }
    function u() {
      return f.length > 0 && !f.some((v) => v === "object" || v === "array");
    }
    function p(v, _) {
      const g = t.name("item"), m = (0, _l.checkDataTypes)(f, g, s.opts.strictNumbers, _l.DataType.Wrong), E = t.const("indices", (0, Je._)`{}`);
      t.for((0, Je._)`;${v}--;`, () => {
        t.let(g, (0, Je._)`${r}[${v}]`), t.if(m, (0, Je._)`continue`), f.length > 1 && t.if((0, Je._)`typeof ${g} == "string"`, (0, Je._)`${g} += "_"`), t.if((0, Je._)`typeof ${E}[${g}] == "number"`, () => {
          t.assign(_, (0, Je._)`${E}[${g}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Je._)`${E}[${g}] = ${v}`);
      });
    }
    function h(v, _) {
      const g = (0, BF.useFunc)(t, zF.default), m = t.name("outer");
      t.label(m).for((0, Je._)`;${v}--;`, () => t.for((0, Je._)`${_} = ${v}; ${_}--;`, () => t.if((0, Je._)`${g}(${r}[${v}], ${r}[${_}])`, () => {
        e.error(), t.assign(c, !1).break(m);
      })));
    }
  }
};
Of.default = WF;
var Af = {};
Object.defineProperty(Af, "__esModule", { value: !0 });
const tu = ae, YF = J, JF = _a, XF = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, tu._)`{allowedValue: ${e}}`
}, QF = {
  keyword: "const",
  $data: !0,
  error: XF,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: i, schema: o } = e;
    n || o && typeof o == "object" ? e.fail$data((0, tu._)`!${(0, YF.useFunc)(t, JF.default)}(${r}, ${i})`) : e.fail((0, tu._)`${o} !== ${r}`);
  }
};
Af.default = QF;
var Cf = {};
Object.defineProperty(Cf, "__esModule", { value: !0 });
const So = ae, ZF = J, ej = _a, tj = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, So._)`{allowedValues: ${e}}`
}, rj = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: tj,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, schemaCode: o, it: a } = e;
    if (!n && i.length === 0)
      throw new Error("enum must have non-empty array");
    const s = i.length >= a.opts.loopEnum;
    let c;
    const f = () => c ?? (c = (0, ZF.useFunc)(t, ej.default));
    let l;
    if (s || n)
      l = t.let("valid"), e.block$data(l, u);
    else {
      if (!Array.isArray(i))
        throw new Error("ajv implementation error");
      const h = t.const("vSchema", o);
      l = (0, So.or)(...i.map((v, _) => p(h, _)));
    }
    e.pass(l);
    function u() {
      t.assign(l, !1), t.forOf("v", o, (h) => t.if((0, So._)`${f()}(${r}, ${h})`, () => t.assign(l, !0).break()));
    }
    function p(h, v) {
      const _ = i[v];
      return typeof _ == "object" && _ !== null ? (0, So._)`${f()}(${r}, ${h}[${v}])` : (0, So._)`${r} === ${_}`;
    }
  }
};
Cf.default = rj;
Object.defineProperty(vf, "__esModule", { value: !0 });
const nj = _f, ij = wf, oj = Ef, aj = bf, sj = Pf, cj = Tf, lj = Nf, uj = Of, fj = Af, dj = Cf, hj = [
  // number
  nj.default,
  ij.default,
  // string
  oj.default,
  aj.default,
  // object
  sj.default,
  cj.default,
  // array
  lj.default,
  uj.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  fj.default,
  dj.default
];
vf.default = hj;
var Rf = {}, Gi = {};
Object.defineProperty(Gi, "__esModule", { value: !0 });
Gi.validateAdditionalItems = void 0;
const Fn = ae, ru = J, pj = {
  message: ({ params: { len: e } }) => (0, Fn.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Fn._)`{limit: ${e}}`
}, mj = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: pj,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, ru.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    $v(e, n);
  }
};
function $v(e, t) {
  const { gen: r, schema: n, data: i, keyword: o, it: a } = e;
  a.items = !0;
  const s = r.const("len", (0, Fn._)`${i}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Fn._)`${s} <= ${t.length}`);
  else if (typeof n == "object" && !(0, ru.alwaysValidSchema)(a, n)) {
    const f = r.var("valid", (0, Fn._)`${s} <= ${t.length}`);
    r.if((0, Fn.not)(f), () => c(f)), e.ok(f);
  }
  function c(f) {
    r.forRange("i", t.length, s, (l) => {
      e.subschema({ keyword: o, dataProp: l, dataPropType: ru.Type.Num }, f), a.allErrors || r.if((0, Fn.not)(f), () => r.break());
    });
  }
}
Gi.validateAdditionalItems = $v;
Gi.default = mj;
var If = {}, Bi = {};
Object.defineProperty(Bi, "__esModule", { value: !0 });
Bi.validateTuple = void 0;
const Vm = ae, fs = J, yj = de, gj = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return vv(e, "additionalItems", t);
    r.items = !0, !(0, fs.alwaysValidSchema)(r, t) && e.ok((0, yj.validateArray)(e));
  }
};
function vv(e, t, r = e.schema) {
  const { gen: n, parentSchema: i, data: o, keyword: a, it: s } = e;
  l(i), s.opts.unevaluated && r.length && s.items !== !0 && (s.items = fs.mergeEvaluated.items(n, r.length, s.items));
  const c = n.name("valid"), f = n.const("len", (0, Vm._)`${o}.length`);
  r.forEach((u, p) => {
    (0, fs.alwaysValidSchema)(s, u) || (n.if((0, Vm._)`${f} > ${p}`, () => e.subschema({
      keyword: a,
      schemaProp: p,
      dataProp: p
    }, c)), e.ok(c));
  });
  function l(u) {
    const { opts: p, errSchemaPath: h } = s, v = r.length, _ = v === u.minItems && (v === u.maxItems || u[t] === !1);
    if (p.strictTuples && !_) {
      const g = `"${a}" is ${v}-tuple, but minItems or maxItems/${t} are not specified or different at path "${h}"`;
      (0, fs.checkStrictMode)(s, g, p.strictTuples);
    }
  }
}
Bi.validateTuple = vv;
Bi.default = gj;
Object.defineProperty(If, "__esModule", { value: !0 });
const $j = Bi, vj = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, $j.validateTuple)(e, "items")
};
If.default = vj;
var kf = {};
Object.defineProperty(kf, "__esModule", { value: !0 });
const Hm = ae, _j = J, wj = de, Ej = Gi, Sj = {
  message: ({ params: { len: e } }) => (0, Hm.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Hm._)`{limit: ${e}}`
}, bj = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: Sj,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: i } = r;
    n.items = !0, !(0, _j.alwaysValidSchema)(n, t) && (i ? (0, Ej.validateAdditionalItems)(e, i) : e.ok((0, wj.validateArray)(e)));
  }
};
kf.default = bj;
var Df = {};
Object.defineProperty(Df, "__esModule", { value: !0 });
const qt = ae, Wa = J, Pj = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, qt.str)`must contain at least ${e} valid item(s)` : (0, qt.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, qt._)`{minContains: ${e}}` : (0, qt._)`{minContains: ${e}, maxContains: ${t}}`
}, Tj = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: Pj,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: o } = e;
    let a, s;
    const { minContains: c, maxContains: f } = n;
    o.opts.next ? (a = c === void 0 ? 1 : c, s = f) : a = 1;
    const l = t.const("len", (0, qt._)`${i}.length`);
    if (e.setParams({ min: a, max: s }), s === void 0 && a === 0) {
      (0, Wa.checkStrictMode)(o, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (s !== void 0 && a > s) {
      (0, Wa.checkStrictMode)(o, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, Wa.alwaysValidSchema)(o, r)) {
      let _ = (0, qt._)`${l} >= ${a}`;
      s !== void 0 && (_ = (0, qt._)`${_} && ${l} <= ${s}`), e.pass(_);
      return;
    }
    o.items = !0;
    const u = t.name("valid");
    s === void 0 && a === 1 ? h(u, () => t.if(u, () => t.break())) : a === 0 ? (t.let(u, !0), s !== void 0 && t.if((0, qt._)`${i}.length > 0`, p)) : (t.let(u, !1), p()), e.result(u, () => e.reset());
    function p() {
      const _ = t.name("_valid"), g = t.let("count", 0);
      h(_, () => t.if(_, () => v(g)));
    }
    function h(_, g) {
      t.forRange("i", 0, l, (m) => {
        e.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: Wa.Type.Num,
          compositeRule: !0
        }, _), g();
      });
    }
    function v(_) {
      t.code((0, qt._)`${_}++`), s === void 0 ? t.if((0, qt._)`${_} >= ${a}`, () => t.assign(u, !0).break()) : (t.if((0, qt._)`${_} > ${s}`, () => t.assign(u, !1).break()), a === 1 ? t.assign(u, !0) : t.if((0, qt._)`${_} >= ${a}`, () => t.assign(u, !0)));
    }
  }
};
Df.default = Tj;
var Sc = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = ae, r = J, n = de;
  e.error = {
    message: ({ params: { property: c, depsCount: f, deps: l } }) => {
      const u = f === 1 ? "property" : "properties";
      return (0, t.str)`must have ${u} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: f, deps: l, missingProperty: u } }) => (0, t._)`{property: ${c},
    missingProperty: ${u},
    depsCount: ${f},
    deps: ${l}}`
    // TODO change to reference
  };
  const i = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [f, l] = o(c);
      a(c, f), s(c, l);
    }
  };
  function o({ schema: c }) {
    const f = {}, l = {};
    for (const u in c) {
      if (u === "__proto__")
        continue;
      const p = Array.isArray(c[u]) ? f : l;
      p[u] = c[u];
    }
    return [f, l];
  }
  function a(c, f = c.schema) {
    const { gen: l, data: u, it: p } = c;
    if (Object.keys(f).length === 0)
      return;
    const h = l.let("missing");
    for (const v in f) {
      const _ = f[v];
      if (_.length === 0)
        continue;
      const g = (0, n.propertyInData)(l, u, v, p.opts.ownProperties);
      c.setParams({
        property: v,
        depsCount: _.length,
        deps: _.join(", ")
      }), p.allErrors ? l.if(g, () => {
        for (const m of _)
          (0, n.checkReportMissingProp)(c, m);
      }) : (l.if((0, t._)`${g} && (${(0, n.checkMissingProp)(c, _, h)})`), (0, n.reportMissingProp)(c, h), l.else());
    }
  }
  e.validatePropertyDeps = a;
  function s(c, f = c.schema) {
    const { gen: l, data: u, keyword: p, it: h } = c, v = l.name("valid");
    for (const _ in f)
      (0, r.alwaysValidSchema)(h, f[_]) || (l.if(
        (0, n.propertyInData)(l, u, _, h.opts.ownProperties),
        () => {
          const g = c.subschema({ keyword: p, schemaProp: _ }, v);
          c.mergeValidEvaluated(g, v);
        },
        () => l.var(v, !0)
        // TODO var
      ), c.ok(v));
  }
  e.validateSchemaDeps = s, e.default = i;
})(Sc);
var Ff = {};
Object.defineProperty(Ff, "__esModule", { value: !0 });
const _v = ae, Nj = J, Oj = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, _v._)`{propertyName: ${e.propertyName}}`
}, Aj = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: Oj,
  code(e) {
    const { gen: t, schema: r, data: n, it: i } = e;
    if ((0, Nj.alwaysValidSchema)(i, r))
      return;
    const o = t.name("valid");
    t.forIn("key", n, (a) => {
      e.setParams({ propertyName: a }), e.subschema({
        keyword: "propertyNames",
        data: a,
        dataTypes: ["string"],
        propertyName: a,
        compositeRule: !0
      }, o), t.if((0, _v.not)(o), () => {
        e.error(!0), i.allErrors || t.break();
      });
    }), e.ok(o);
  }
};
Ff.default = Aj;
var bc = {};
Object.defineProperty(bc, "__esModule", { value: !0 });
const Ya = de, Wt = ae, Cj = Ft, Ja = J, Rj = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Wt._)`{additionalProperty: ${e.additionalProperty}}`
}, Ij = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Rj,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, errsCount: o, it: a } = e;
    if (!o)
      throw new Error("ajv implementation error");
    const { allErrors: s, opts: c } = a;
    if (a.props = !0, c.removeAdditional !== "all" && (0, Ja.alwaysValidSchema)(a, r))
      return;
    const f = (0, Ya.allSchemaProperties)(n.properties), l = (0, Ya.allSchemaProperties)(n.patternProperties);
    u(), e.ok((0, Wt._)`${o} === ${Cj.default.errors}`);
    function u() {
      t.forIn("key", i, (g) => {
        !f.length && !l.length ? v(g) : t.if(p(g), () => v(g));
      });
    }
    function p(g) {
      let m;
      if (f.length > 8) {
        const E = (0, Ja.schemaRefOrVal)(a, n.properties, "properties");
        m = (0, Ya.isOwnProperty)(t, E, g);
      } else f.length ? m = (0, Wt.or)(...f.map((E) => (0, Wt._)`${g} === ${E}`)) : m = Wt.nil;
      return l.length && (m = (0, Wt.or)(m, ...l.map((E) => (0, Wt._)`${(0, Ya.usePattern)(e, E)}.test(${g})`))), (0, Wt.not)(m);
    }
    function h(g) {
      t.code((0, Wt._)`delete ${i}[${g}]`);
    }
    function v(g) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        h(g);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: g }), e.error(), s || t.break();
        return;
      }
      if (typeof r == "object" && !(0, Ja.alwaysValidSchema)(a, r)) {
        const m = t.name("valid");
        c.removeAdditional === "failing" ? (_(g, m, !1), t.if((0, Wt.not)(m), () => {
          e.reset(), h(g);
        })) : (_(g, m), s || t.if((0, Wt.not)(m), () => t.break()));
      }
    }
    function _(g, m, E) {
      const N = {
        keyword: "additionalProperties",
        dataProp: g,
        dataPropType: Ja.Type.Str
      };
      E === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, m);
    }
  }
};
bc.default = Ij;
var jf = {};
Object.defineProperty(jf, "__esModule", { value: !0 });
const kj = er, Gm = de, wl = J, Bm = bc, Dj = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: o } = e;
    o.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Bm.default.code(new kj.KeywordCxt(o, Bm.default, "additionalProperties"));
    const a = (0, Gm.allSchemaProperties)(r);
    for (const u of a)
      o.definedProperties.add(u);
    o.opts.unevaluated && a.length && o.props !== !0 && (o.props = wl.mergeEvaluated.props(t, (0, wl.toHash)(a), o.props));
    const s = a.filter((u) => !(0, wl.alwaysValidSchema)(o, r[u]));
    if (s.length === 0)
      return;
    const c = t.name("valid");
    for (const u of s)
      f(u) ? l(u) : (t.if((0, Gm.propertyInData)(t, i, u, o.opts.ownProperties)), l(u), o.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(u), e.ok(c);
    function f(u) {
      return o.opts.useDefaults && !o.compositeRule && r[u].default !== void 0;
    }
    function l(u) {
      e.subschema({
        keyword: "properties",
        schemaProp: u,
        dataProp: u
      }, c);
    }
  }
};
jf.default = Dj;
var Lf = {};
Object.defineProperty(Lf, "__esModule", { value: !0 });
const zm = de, Xa = ae, Km = J, Wm = J, Fj = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: i, it: o } = e, { opts: a } = o, s = (0, zm.allSchemaProperties)(r), c = s.filter((_) => (0, Km.alwaysValidSchema)(o, r[_]));
    if (s.length === 0 || c.length === s.length && (!o.opts.unevaluated || o.props === !0))
      return;
    const f = a.strictSchema && !a.allowMatchingProperties && i.properties, l = t.name("valid");
    o.props !== !0 && !(o.props instanceof Xa.Name) && (o.props = (0, Wm.evaluatedPropsToName)(t, o.props));
    const { props: u } = o;
    p();
    function p() {
      for (const _ of s)
        f && h(_), o.allErrors ? v(_) : (t.var(l, !0), v(_), t.if(l));
    }
    function h(_) {
      for (const g in f)
        new RegExp(_).test(g) && (0, Km.checkStrictMode)(o, `property ${g} matches pattern ${_} (use allowMatchingProperties)`);
    }
    function v(_) {
      t.forIn("key", n, (g) => {
        t.if((0, Xa._)`${(0, zm.usePattern)(e, _)}.test(${g})`, () => {
          const m = c.includes(_);
          m || e.subschema({
            keyword: "patternProperties",
            schemaProp: _,
            dataProp: g,
            dataPropType: Wm.Type.Str
          }, l), o.opts.unevaluated && u !== !0 ? t.assign((0, Xa._)`${u}[${g}]`, !0) : !m && !o.allErrors && t.if((0, Xa.not)(l), () => t.break());
        });
      });
    }
  }
};
Lf.default = Fj;
var Mf = {};
Object.defineProperty(Mf, "__esModule", { value: !0 });
const jj = J, Lj = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, jj.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const i = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, i), e.failResult(i, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
Mf.default = Lj;
var Uf = {};
Object.defineProperty(Uf, "__esModule", { value: !0 });
const Mj = de, Uj = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Mj.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Uf.default = Uj;
var xf = {};
Object.defineProperty(xf, "__esModule", { value: !0 });
const ds = ae, xj = J, qj = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, ds._)`{passingSchemas: ${e.passing}}`
}, Vj = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: qj,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: i } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (i.opts.discriminator && n.discriminator)
      return;
    const o = r, a = t.let("valid", !1), s = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: s }), t.block(f), e.result(a, () => e.reset(), () => e.error(!0));
    function f() {
      o.forEach((l, u) => {
        let p;
        (0, xj.alwaysValidSchema)(i, l) ? t.var(c, !0) : p = e.subschema({
          keyword: "oneOf",
          schemaProp: u,
          compositeRule: !0
        }, c), u > 0 && t.if((0, ds._)`${c} && ${a}`).assign(a, !1).assign(s, (0, ds._)`[${s}, ${u}]`).else(), t.if(c, () => {
          t.assign(a, !0), t.assign(s, u), p && e.mergeEvaluated(p, ds.Name);
        });
      });
    }
  }
};
xf.default = Vj;
var qf = {};
Object.defineProperty(qf, "__esModule", { value: !0 });
const Hj = J, Gj = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const i = t.name("valid");
    r.forEach((o, a) => {
      if ((0, Hj.alwaysValidSchema)(n, o))
        return;
      const s = e.subschema({ keyword: "allOf", schemaProp: a }, i);
      e.ok(i), e.mergeEvaluated(s);
    });
  }
};
qf.default = Gj;
var Vf = {};
Object.defineProperty(Vf, "__esModule", { value: !0 });
const Fs = ae, wv = J, Bj = {
  message: ({ params: e }) => (0, Fs.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Fs._)`{failingKeyword: ${e.ifClause}}`
}, zj = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Bj,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, wv.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const i = Ym(n, "then"), o = Ym(n, "else");
    if (!i && !o)
      return;
    const a = t.let("valid", !0), s = t.name("_valid");
    if (c(), e.reset(), i && o) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(s, f("then", l), f("else", l));
    } else i ? t.if(s, f("then")) : t.if((0, Fs.not)(s), f("else"));
    e.pass(a, () => e.error(!0));
    function c() {
      const l = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, s);
      e.mergeEvaluated(l);
    }
    function f(l, u) {
      return () => {
        const p = e.subschema({ keyword: l }, s);
        t.assign(a, s), e.mergeValidEvaluated(p, a), u ? t.assign(u, (0, Fs._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function Ym(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, wv.alwaysValidSchema)(e, r);
}
Vf.default = zj;
var Hf = {};
Object.defineProperty(Hf, "__esModule", { value: !0 });
const Kj = J, Wj = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, Kj.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Hf.default = Wj;
Object.defineProperty(Rf, "__esModule", { value: !0 });
const Yj = Gi, Jj = If, Xj = Bi, Qj = kf, Zj = Df, eL = Sc, tL = Ff, rL = bc, nL = jf, iL = Lf, oL = Mf, aL = Uf, sL = xf, cL = qf, lL = Vf, uL = Hf;
function fL(e = !1) {
  const t = [
    // any
    oL.default,
    aL.default,
    sL.default,
    cL.default,
    lL.default,
    uL.default,
    // object
    tL.default,
    rL.default,
    eL.default,
    nL.default,
    iL.default
  ];
  return e ? t.push(Jj.default, Qj.default) : t.push(Yj.default, Xj.default), t.push(Zj.default), t;
}
Rf.default = fL;
var Gf = {}, zi = {};
Object.defineProperty(zi, "__esModule", { value: !0 });
zi.dynamicAnchor = void 0;
const El = ae, dL = Ft, Jm = yt, hL = Lr, pL = {
  keyword: "$dynamicAnchor",
  schemaType: "string",
  code: (e) => Ev(e, e.schema)
};
function Ev(e, t) {
  const { gen: r, it: n } = e;
  n.schemaEnv.root.dynamicAnchors[t] = !0;
  const i = (0, El._)`${dL.default.dynamicAnchors}${(0, El.getProperty)(t)}`, o = n.errSchemaPath === "#" ? n.validateName : mL(e);
  r.if((0, El._)`!${i}`, () => r.assign(i, o));
}
zi.dynamicAnchor = Ev;
function mL(e) {
  const { schemaEnv: t, schema: r, self: n } = e.it, { root: i, baseId: o, localRefs: a, meta: s } = t.root, { schemaId: c } = n.opts, f = new Jm.SchemaEnv({ schema: r, schemaId: c, root: i, baseId: o, localRefs: a, meta: s });
  return Jm.compileSchema.call(n, f), (0, hL.getValidate)(e, f);
}
zi.default = pL;
var Ki = {};
Object.defineProperty(Ki, "__esModule", { value: !0 });
Ki.dynamicRef = void 0;
const Xm = ae, yL = Ft, Qm = Lr, gL = {
  keyword: "$dynamicRef",
  schemaType: "string",
  code: (e) => Sv(e, e.schema)
};
function Sv(e, t) {
  const { gen: r, keyword: n, it: i } = e;
  if (t[0] !== "#")
    throw new Error(`"${n}" only supports hash fragment reference`);
  const o = t.slice(1);
  if (i.allErrors)
    a();
  else {
    const c = r.let("valid", !1);
    a(c), e.ok(c);
  }
  function a(c) {
    if (i.schemaEnv.root.dynamicAnchors[o]) {
      const f = r.let("_v", (0, Xm._)`${yL.default.dynamicAnchors}${(0, Xm.getProperty)(o)}`);
      r.if(f, s(f, c), s(i.validateName, c));
    } else
      s(i.validateName, c)();
  }
  function s(c, f) {
    return f ? () => r.block(() => {
      (0, Qm.callRef)(e, c), r.let(f, !0);
    }) : () => (0, Qm.callRef)(e, c);
  }
}
Ki.dynamicRef = Sv;
Ki.default = gL;
var Bf = {};
Object.defineProperty(Bf, "__esModule", { value: !0 });
const $L = zi, vL = J, _L = {
  keyword: "$recursiveAnchor",
  schemaType: "boolean",
  code(e) {
    e.schema ? (0, $L.dynamicAnchor)(e, "") : (0, vL.checkStrictMode)(e.it, "$recursiveAnchor: false is ignored");
  }
};
Bf.default = _L;
var zf = {};
Object.defineProperty(zf, "__esModule", { value: !0 });
const wL = Ki, EL = {
  keyword: "$recursiveRef",
  schemaType: "string",
  code: (e) => (0, wL.dynamicRef)(e, e.schema)
};
zf.default = EL;
Object.defineProperty(Gf, "__esModule", { value: !0 });
const SL = zi, bL = Ki, PL = Bf, TL = zf, NL = [SL.default, bL.default, PL.default, TL.default];
Gf.default = NL;
var Kf = {}, Wf = {};
Object.defineProperty(Wf, "__esModule", { value: !0 });
const Zm = Sc, OL = {
  keyword: "dependentRequired",
  type: "object",
  schemaType: "object",
  error: Zm.error,
  code: (e) => (0, Zm.validatePropertyDeps)(e)
};
Wf.default = OL;
var Yf = {};
Object.defineProperty(Yf, "__esModule", { value: !0 });
const AL = Sc, CL = {
  keyword: "dependentSchemas",
  type: "object",
  schemaType: "object",
  code: (e) => (0, AL.validateSchemaDeps)(e)
};
Yf.default = CL;
var Jf = {};
Object.defineProperty(Jf, "__esModule", { value: !0 });
const RL = J, IL = {
  keyword: ["maxContains", "minContains"],
  type: "array",
  schemaType: "number",
  code({ keyword: e, parentSchema: t, it: r }) {
    t.contains === void 0 && (0, RL.checkStrictMode)(r, `"${e}" without "contains" is ignored`);
  }
};
Jf.default = IL;
Object.defineProperty(Kf, "__esModule", { value: !0 });
const kL = Wf, DL = Yf, FL = Jf, jL = [kL.default, DL.default, FL.default];
Kf.default = jL;
var Xf = {}, Qf = {};
Object.defineProperty(Qf, "__esModule", { value: !0 });
const Jr = ae, ey = J, LL = Ft, ML = {
  message: "must NOT have unevaluated properties",
  params: ({ params: e }) => (0, Jr._)`{unevaluatedProperty: ${e.unevaluatedProperty}}`
}, UL = {
  keyword: "unevaluatedProperties",
  type: "object",
  schemaType: ["boolean", "object"],
  trackErrors: !0,
  error: ML,
  code(e) {
    const { gen: t, schema: r, data: n, errsCount: i, it: o } = e;
    if (!i)
      throw new Error("ajv implementation error");
    const { allErrors: a, props: s } = o;
    s instanceof Jr.Name ? t.if((0, Jr._)`${s} !== true`, () => t.forIn("key", n, (u) => t.if(f(s, u), () => c(u)))) : s !== !0 && t.forIn("key", n, (u) => s === void 0 ? c(u) : t.if(l(s, u), () => c(u))), o.props = !0, e.ok((0, Jr._)`${i} === ${LL.default.errors}`);
    function c(u) {
      if (r === !1) {
        e.setParams({ unevaluatedProperty: u }), e.error(), a || t.break();
        return;
      }
      if (!(0, ey.alwaysValidSchema)(o, r)) {
        const p = t.name("valid");
        e.subschema({
          keyword: "unevaluatedProperties",
          dataProp: u,
          dataPropType: ey.Type.Str
        }, p), a || t.if((0, Jr.not)(p), () => t.break());
      }
    }
    function f(u, p) {
      return (0, Jr._)`!${u} || !${u}[${p}]`;
    }
    function l(u, p) {
      const h = [];
      for (const v in u)
        u[v] === !0 && h.push((0, Jr._)`${p} !== ${v}`);
      return (0, Jr.and)(...h);
    }
  }
};
Qf.default = UL;
var Zf = {};
Object.defineProperty(Zf, "__esModule", { value: !0 });
const jn = ae, ty = J, xL = {
  message: ({ params: { len: e } }) => (0, jn.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, jn._)`{limit: ${e}}`
}, qL = {
  keyword: "unevaluatedItems",
  type: "array",
  schemaType: ["boolean", "object"],
  error: xL,
  code(e) {
    const { gen: t, schema: r, data: n, it: i } = e, o = i.items || 0;
    if (o === !0)
      return;
    const a = t.const("len", (0, jn._)`${n}.length`);
    if (r === !1)
      e.setParams({ len: o }), e.fail((0, jn._)`${a} > ${o}`);
    else if (typeof r == "object" && !(0, ty.alwaysValidSchema)(i, r)) {
      const c = t.var("valid", (0, jn._)`${a} <= ${o}`);
      t.if((0, jn.not)(c), () => s(c, o)), e.ok(c);
    }
    i.items = !0;
    function s(c, f) {
      t.forRange("i", f, a, (l) => {
        e.subschema({ keyword: "unevaluatedItems", dataProp: l, dataPropType: ty.Type.Num }, c), i.allErrors || t.if((0, jn.not)(c), () => t.break());
      });
    }
  }
};
Zf.default = qL;
Object.defineProperty(Xf, "__esModule", { value: !0 });
const VL = Qf, HL = Zf, GL = [VL.default, HL.default];
Xf.default = GL;
var ed = {}, td = {};
Object.defineProperty(td, "__esModule", { value: !0 });
const Fe = ae, BL = {
  message: ({ schemaCode: e }) => (0, Fe.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, Fe._)`{format: ${e}}`
}, zL = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: BL,
  code(e, t) {
    const { gen: r, data: n, $data: i, schema: o, schemaCode: a, it: s } = e, { opts: c, errSchemaPath: f, schemaEnv: l, self: u } = s;
    if (!c.validateFormats)
      return;
    i ? p() : h();
    function p() {
      const v = r.scopeValue("formats", {
        ref: u.formats,
        code: c.code.formats
      }), _ = r.const("fDef", (0, Fe._)`${v}[${a}]`), g = r.let("fType"), m = r.let("format");
      r.if((0, Fe._)`typeof ${_} == "object" && !(${_} instanceof RegExp)`, () => r.assign(g, (0, Fe._)`${_}.type || "string"`).assign(m, (0, Fe._)`${_}.validate`), () => r.assign(g, (0, Fe._)`"string"`).assign(m, _)), e.fail$data((0, Fe.or)(E(), N()));
      function E() {
        return c.strictSchema === !1 ? Fe.nil : (0, Fe._)`${a} && !${m}`;
      }
      function N() {
        const R = l.$async ? (0, Fe._)`(${_}.async ? await ${m}(${n}) : ${m}(${n}))` : (0, Fe._)`${m}(${n})`, F = (0, Fe._)`(typeof ${m} == "function" ? ${R} : ${m}.test(${n}))`;
        return (0, Fe._)`${m} && ${m} !== true && ${g} === ${t} && !${F}`;
      }
    }
    function h() {
      const v = u.formats[o];
      if (!v) {
        E();
        return;
      }
      if (v === !0)
        return;
      const [_, g, m] = N(v);
      _ === t && e.pass(R());
      function E() {
        if (c.strictSchema === !1) {
          u.logger.warn(F());
          return;
        }
        throw new Error(F());
        function F() {
          return `unknown format "${o}" ignored in schema at path "${f}"`;
        }
      }
      function N(F) {
        const k = F instanceof RegExp ? (0, Fe.regexpCode)(F) : c.code.formats ? (0, Fe._)`${c.code.formats}${(0, Fe.getProperty)(o)}` : void 0, L = r.scopeValue("formats", { key: o, ref: F, code: k });
        return typeof F == "object" && !(F instanceof RegExp) ? [F.type || "string", F.validate, (0, Fe._)`${L}.validate`] : ["string", F, L];
      }
      function R() {
        if (typeof v == "object" && !(v instanceof RegExp) && v.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, Fe._)`await ${m}(${n})`;
        }
        return typeof g == "function" ? (0, Fe._)`${m}(${n})` : (0, Fe._)`${m}.test(${n})`;
      }
    }
  }
};
td.default = zL;
Object.defineProperty(ed, "__esModule", { value: !0 });
const KL = td, WL = [KL.default];
ed.default = WL;
var ki = {};
Object.defineProperty(ki, "__esModule", { value: !0 });
ki.contentVocabulary = ki.metadataVocabulary = void 0;
ki.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
ki.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(yf, "__esModule", { value: !0 });
const YL = gf, JL = vf, XL = Rf, QL = Gf, ZL = Kf, e2 = Xf, t2 = ed, ry = ki, r2 = [
  QL.default,
  YL.default,
  JL.default,
  (0, XL.default)(!0),
  t2.default,
  ry.metadataVocabulary,
  ry.contentVocabulary,
  ZL.default,
  e2.default
];
yf.default = r2;
var rd = {}, Pc = {};
Object.defineProperty(Pc, "__esModule", { value: !0 });
Pc.DiscrError = void 0;
var ny;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(ny || (Pc.DiscrError = ny = {}));
Object.defineProperty(rd, "__esModule", { value: !0 });
const fi = ae, nu = Pc, iy = yt, n2 = Hi, i2 = J, o2 = {
  message: ({ params: { discrError: e, tagName: t } }) => e === nu.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, fi._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, a2 = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: o2,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: i, it: o } = e, { oneOf: a } = i;
    if (!o.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const s = n.propertyName;
    if (typeof s != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!a)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), f = t.const("tag", (0, fi._)`${r}${(0, fi.getProperty)(s)}`);
    t.if((0, fi._)`typeof ${f} == "string"`, () => l(), () => e.error(!1, { discrError: nu.DiscrError.Tag, tag: f, tagName: s })), e.ok(c);
    function l() {
      const h = p();
      t.if(!1);
      for (const v in h)
        t.elseIf((0, fi._)`${f} === ${v}`), t.assign(c, u(h[v]));
      t.else(), e.error(!1, { discrError: nu.DiscrError.Mapping, tag: f, tagName: s }), t.endIf();
    }
    function u(h) {
      const v = t.name("valid"), _ = e.subschema({ keyword: "oneOf", schemaProp: h }, v);
      return e.mergeEvaluated(_, fi.Name), v;
    }
    function p() {
      var h;
      const v = {}, _ = m(i);
      let g = !0;
      for (let R = 0; R < a.length; R++) {
        let F = a[R];
        if (F != null && F.$ref && !(0, i2.schemaHasRulesButRef)(F, o.self.RULES)) {
          const L = F.$ref;
          if (F = iy.resolveRef.call(o.self, o.schemaEnv.root, o.baseId, L), F instanceof iy.SchemaEnv && (F = F.schema), F === void 0)
            throw new n2.default(o.opts.uriResolver, o.baseId, L);
        }
        const k = (h = F == null ? void 0 : F.properties) === null || h === void 0 ? void 0 : h[s];
        if (typeof k != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${s}"`);
        g = g && (_ || m(F)), E(k, R);
      }
      if (!g)
        throw new Error(`discriminator: "${s}" must be required`);
      return v;
      function m({ required: R }) {
        return Array.isArray(R) && R.includes(s);
      }
      function E(R, F) {
        if (R.const)
          N(R.const, F);
        else if (R.enum)
          for (const k of R.enum)
            N(k, F);
        else
          throw new Error(`discriminator: "properties/${s}" must have "const" or "enum"`);
      }
      function N(R, F) {
        if (typeof R != "string" || R in v)
          throw new Error(`discriminator: "${s}" values must be unique strings`);
        v[R] = F;
      }
    }
  }
};
rd.default = a2;
var nd = {};
const s2 = "https://json-schema.org/draft/2020-12/schema", c2 = "https://json-schema.org/draft/2020-12/schema", l2 = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0,
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0,
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0,
  "https://json-schema.org/draft/2020-12/vocab/validation": !0,
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0,
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0,
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, u2 = "meta", f2 = "Core and Validation specifications meta-schema", d2 = [
  {
    $ref: "meta/core"
  },
  {
    $ref: "meta/applicator"
  },
  {
    $ref: "meta/unevaluated"
  },
  {
    $ref: "meta/validation"
  },
  {
    $ref: "meta/meta-data"
  },
  {
    $ref: "meta/format-annotation"
  },
  {
    $ref: "meta/content"
  }
], h2 = [
  "object",
  "boolean"
], p2 = "This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.", m2 = {
  definitions: {
    $comment: '"definitions" has been replaced by "$defs".',
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    deprecated: !0,
    default: {}
  },
  dependencies: {
    $comment: '"dependencies" has been split and replaced by "dependentSchemas" and "dependentRequired" in order to serve their differing semantics.',
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $dynamicRef: "#meta"
        },
        {
          $ref: "meta/validation#/$defs/stringArray"
        }
      ]
    },
    deprecated: !0,
    default: {}
  },
  $recursiveAnchor: {
    $comment: '"$recursiveAnchor" has been replaced by "$dynamicAnchor".',
    $ref: "meta/core#/$defs/anchorString",
    deprecated: !0
  },
  $recursiveRef: {
    $comment: '"$recursiveRef" has been replaced by "$dynamicRef".',
    $ref: "meta/core#/$defs/uriReferenceString",
    deprecated: !0
  }
}, y2 = {
  $schema: s2,
  $id: c2,
  $vocabulary: l2,
  $dynamicAnchor: u2,
  title: f2,
  allOf: d2,
  type: h2,
  $comment: p2,
  properties: m2
}, g2 = "https://json-schema.org/draft/2020-12/schema", $2 = "https://json-schema.org/draft/2020-12/meta/applicator", v2 = {
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0
}, _2 = "meta", w2 = "Applicator vocabulary meta-schema", E2 = [
  "object",
  "boolean"
], S2 = {
  prefixItems: {
    $ref: "#/$defs/schemaArray"
  },
  items: {
    $dynamicRef: "#meta"
  },
  contains: {
    $dynamicRef: "#meta"
  },
  additionalProperties: {
    $dynamicRef: "#meta"
  },
  properties: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependentSchemas: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    default: {}
  },
  propertyNames: {
    $dynamicRef: "#meta"
  },
  if: {
    $dynamicRef: "#meta"
  },
  then: {
    $dynamicRef: "#meta"
  },
  else: {
    $dynamicRef: "#meta"
  },
  allOf: {
    $ref: "#/$defs/schemaArray"
  },
  anyOf: {
    $ref: "#/$defs/schemaArray"
  },
  oneOf: {
    $ref: "#/$defs/schemaArray"
  },
  not: {
    $dynamicRef: "#meta"
  }
}, b2 = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $dynamicRef: "#meta"
    }
  }
}, P2 = {
  $schema: g2,
  $id: $2,
  $vocabulary: v2,
  $dynamicAnchor: _2,
  title: w2,
  type: E2,
  properties: S2,
  $defs: b2
}, T2 = "https://json-schema.org/draft/2020-12/schema", N2 = "https://json-schema.org/draft/2020-12/meta/unevaluated", O2 = {
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0
}, A2 = "meta", C2 = "Unevaluated applicator vocabulary meta-schema", R2 = [
  "object",
  "boolean"
], I2 = {
  unevaluatedItems: {
    $dynamicRef: "#meta"
  },
  unevaluatedProperties: {
    $dynamicRef: "#meta"
  }
}, k2 = {
  $schema: T2,
  $id: N2,
  $vocabulary: O2,
  $dynamicAnchor: A2,
  title: C2,
  type: R2,
  properties: I2
}, D2 = "https://json-schema.org/draft/2020-12/schema", F2 = "https://json-schema.org/draft/2020-12/meta/content", j2 = {
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, L2 = "meta", M2 = "Content vocabulary meta-schema", U2 = [
  "object",
  "boolean"
], x2 = {
  contentEncoding: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentSchema: {
    $dynamicRef: "#meta"
  }
}, q2 = {
  $schema: D2,
  $id: F2,
  $vocabulary: j2,
  $dynamicAnchor: L2,
  title: M2,
  type: U2,
  properties: x2
}, V2 = "https://json-schema.org/draft/2020-12/schema", H2 = "https://json-schema.org/draft/2020-12/meta/core", G2 = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0
}, B2 = "meta", z2 = "Core vocabulary meta-schema", K2 = [
  "object",
  "boolean"
], W2 = {
  $id: {
    $ref: "#/$defs/uriReferenceString",
    $comment: "Non-empty fragments not allowed.",
    pattern: "^[^#]*#?$"
  },
  $schema: {
    $ref: "#/$defs/uriString"
  },
  $ref: {
    $ref: "#/$defs/uriReferenceString"
  },
  $anchor: {
    $ref: "#/$defs/anchorString"
  },
  $dynamicRef: {
    $ref: "#/$defs/uriReferenceString"
  },
  $dynamicAnchor: {
    $ref: "#/$defs/anchorString"
  },
  $vocabulary: {
    type: "object",
    propertyNames: {
      $ref: "#/$defs/uriString"
    },
    additionalProperties: {
      type: "boolean"
    }
  },
  $comment: {
    type: "string"
  },
  $defs: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    }
  }
}, Y2 = {
  anchorString: {
    type: "string",
    pattern: "^[A-Za-z_][-A-Za-z0-9._]*$"
  },
  uriString: {
    type: "string",
    format: "uri"
  },
  uriReferenceString: {
    type: "string",
    format: "uri-reference"
  }
}, J2 = {
  $schema: V2,
  $id: H2,
  $vocabulary: G2,
  $dynamicAnchor: B2,
  title: z2,
  type: K2,
  properties: W2,
  $defs: Y2
}, X2 = "https://json-schema.org/draft/2020-12/schema", Q2 = "https://json-schema.org/draft/2020-12/meta/format-annotation", Z2 = {
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0
}, eM = "meta", tM = "Format vocabulary meta-schema for annotation results", rM = [
  "object",
  "boolean"
], nM = {
  format: {
    type: "string"
  }
}, iM = {
  $schema: X2,
  $id: Q2,
  $vocabulary: Z2,
  $dynamicAnchor: eM,
  title: tM,
  type: rM,
  properties: nM
}, oM = "https://json-schema.org/draft/2020-12/schema", aM = "https://json-schema.org/draft/2020-12/meta/meta-data", sM = {
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0
}, cM = "meta", lM = "Meta-data vocabulary meta-schema", uM = [
  "object",
  "boolean"
], fM = {
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  deprecated: {
    type: "boolean",
    default: !1
  },
  readOnly: {
    type: "boolean",
    default: !1
  },
  writeOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  }
}, dM = {
  $schema: oM,
  $id: aM,
  $vocabulary: sM,
  $dynamicAnchor: cM,
  title: lM,
  type: uM,
  properties: fM
}, hM = "https://json-schema.org/draft/2020-12/schema", pM = "https://json-schema.org/draft/2020-12/meta/validation", mM = {
  "https://json-schema.org/draft/2020-12/vocab/validation": !0
}, yM = "meta", gM = "Validation vocabulary meta-schema", $M = [
  "object",
  "boolean"
], vM = {
  type: {
    anyOf: [
      {
        $ref: "#/$defs/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/$defs/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  const: !0,
  enum: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  maxItems: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  maxContains: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minContains: {
    $ref: "#/$defs/nonNegativeInteger",
    default: 1
  },
  maxProperties: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/$defs/stringArray"
  },
  dependentRequired: {
    type: "object",
    additionalProperties: {
      $ref: "#/$defs/stringArray"
    }
  }
}, _M = {
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    $ref: "#/$defs/nonNegativeInteger",
    default: 0
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, wM = {
  $schema: hM,
  $id: pM,
  $vocabulary: mM,
  $dynamicAnchor: yM,
  title: gM,
  type: $M,
  properties: vM,
  $defs: _M
};
Object.defineProperty(nd, "__esModule", { value: !0 });
const EM = y2, SM = P2, bM = k2, PM = q2, TM = J2, NM = iM, OM = dM, AM = wM, CM = ["/properties"];
function RM(e) {
  return [
    EM,
    SM,
    bM,
    PM,
    TM,
    t(this, NM),
    OM,
    t(this, AM)
  ].forEach((r) => this.addMetaSchema(r, void 0, !1)), this;
  function t(r, n) {
    return e ? r.$dataMetaSchema(n, CM) : n;
  }
}
nd.default = RM;
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv2020 = void 0;
  const r = N$, n = yf, i = rd, o = nd, a = "https://json-schema.org/draft/2020-12/schema";
  class s extends r.default {
    constructor(h = {}) {
      super({
        ...h,
        dynamicRef: !0,
        next: !0,
        unevaluated: !0
      });
    }
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((h) => this.addVocabulary(h)), this.opts.discriminator && this.addKeyword(i.default);
    }
    _addDefaultMetaSchema() {
      super._addDefaultMetaSchema();
      const { $data: h, meta: v } = this.opts;
      v && (o.default.call(this, h), this.refs["http://json-schema.org/schema"] = a);
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(a) ? a : void 0);
    }
  }
  t.Ajv2020 = s, e.exports = t = s, e.exports.Ajv2020 = s, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = s;
  var c = er;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return c.KeywordCxt;
  } });
  var f = ae;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return f._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return f.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return f.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return f.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return f.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return f.CodeGen;
  } });
  var l = va;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return l.default;
  } });
  var u = Hi;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return u.default;
  } });
})(Jl, Jl.exports);
var IM = Jl.exports, iu = { exports: {} }, bv = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(q, G) {
    return { validate: q, compare: G };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(o, a),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(c(!0), f),
    "date-time": t(p(!0), h),
    "iso-time": t(c(), l),
    "iso-date-time": t(p(), v),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: m,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    // uri-template: https://tools.ietf.org/html/rfc6570
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex: K,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
    // byte: https://github.com/miguelmota/is-base64
    byte: N,
    // signed 32 bit integer
    int32: { type: "number", validate: k },
    // signed 64 bit integer
    int64: { type: "number", validate: L },
    // C-type float
    float: { type: "number", validate: V },
    // C-type double
    double: { type: "number", validate: V },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, a),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, f),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, h),
    "iso-time": t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, l),
    "iso-date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, v),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function r(q) {
    return q % 4 === 0 && (q % 100 !== 0 || q % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, i = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function o(q) {
    const G = n.exec(q);
    if (!G)
      return !1;
    const Y = +G[1], M = +G[2], U = +G[3];
    return M >= 1 && M <= 12 && U >= 1 && U <= (M === 2 && r(Y) ? 29 : i[M]);
  }
  function a(q, G) {
    if (q && G)
      return q > G ? 1 : q < G ? -1 : 0;
  }
  const s = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
  function c(q) {
    return function(Y) {
      const M = s.exec(Y);
      if (!M)
        return !1;
      const U = +M[1], H = +M[2], x = +M[3], W = M[4], z = M[5] === "-" ? -1 : 1, I = +(M[6] || 0), S = +(M[7] || 0);
      if (I > 23 || S > 59 || q && !W)
        return !1;
      if (U <= 23 && H <= 59 && x < 60)
        return !0;
      const A = H - S * z, b = U - I * z - (A < 0 ? 1 : 0);
      return (b === 23 || b === -1) && (A === 59 || A === -1) && x < 61;
    };
  }
  function f(q, G) {
    if (!(q && G))
      return;
    const Y = (/* @__PURE__ */ new Date("2020-01-01T" + q)).valueOf(), M = (/* @__PURE__ */ new Date("2020-01-01T" + G)).valueOf();
    if (Y && M)
      return Y - M;
  }
  function l(q, G) {
    if (!(q && G))
      return;
    const Y = s.exec(q), M = s.exec(G);
    if (Y && M)
      return q = Y[1] + Y[2] + Y[3], G = M[1] + M[2] + M[3], q > G ? 1 : q < G ? -1 : 0;
  }
  const u = /t|\s/i;
  function p(q) {
    const G = c(q);
    return function(M) {
      const U = M.split(u);
      return U.length === 2 && o(U[0]) && G(U[1]);
    };
  }
  function h(q, G) {
    if (!(q && G))
      return;
    const Y = new Date(q).valueOf(), M = new Date(G).valueOf();
    if (Y && M)
      return Y - M;
  }
  function v(q, G) {
    if (!(q && G))
      return;
    const [Y, M] = q.split(u), [U, H] = G.split(u), x = a(Y, U);
    if (x !== void 0)
      return x || f(M, H);
  }
  const _ = /\/|:/, g = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function m(q) {
    return _.test(q) && g.test(q);
  }
  const E = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function N(q) {
    return E.lastIndex = 0, E.test(q);
  }
  const R = -2147483648, F = 2 ** 31 - 1;
  function k(q) {
    return Number.isInteger(q) && q <= F && q >= R;
  }
  function L(q) {
    return Number.isInteger(q);
  }
  function V() {
    return !0;
  }
  const P = /[^\\]\\Z/;
  function K(q) {
    if (P.test(q))
      return !1;
    try {
      return new RegExp(q), !0;
    } catch {
      return !1;
    }
  }
})(bv);
var Pv = {}, ou = { exports: {} }, Tv = {}, tr = {}, Di = {}, wa = {}, fe = {}, ea = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(E) {
      if (super(), !e.IDENTIFIER.test(E))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = r;
  class n extends t {
    constructor(E) {
      super(), this._items = typeof E == "string" ? [E] : E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const E = this._items[0];
      return E === "" || E === '""';
    }
    get str() {
      var E;
      return (E = this._str) !== null && E !== void 0 ? E : this._str = this._items.reduce((N, R) => `${N}${R}`, "");
    }
    get names() {
      var E;
      return (E = this._names) !== null && E !== void 0 ? E : this._names = this._items.reduce((N, R) => (R instanceof r && (N[R.str] = (N[R.str] || 0) + 1), N), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function i(m, ...E) {
    const N = [m[0]];
    let R = 0;
    for (; R < E.length; )
      s(N, E[R]), N.push(m[++R]);
    return new n(N);
  }
  e._ = i;
  const o = new n("+");
  function a(m, ...E) {
    const N = [h(m[0])];
    let R = 0;
    for (; R < E.length; )
      N.push(o), s(N, E[R]), N.push(o, h(m[++R]));
    return c(N), new n(N);
  }
  e.str = a;
  function s(m, E) {
    E instanceof n ? m.push(...E._items) : E instanceof r ? m.push(E) : m.push(u(E));
  }
  e.addCodeArg = s;
  function c(m) {
    let E = 1;
    for (; E < m.length - 1; ) {
      if (m[E] === o) {
        const N = f(m[E - 1], m[E + 1]);
        if (N !== void 0) {
          m.splice(E - 1, 3, N);
          continue;
        }
        m[E++] = "+";
      }
      E++;
    }
  }
  function f(m, E) {
    if (E === '""')
      return m;
    if (m === '""')
      return E;
    if (typeof m == "string")
      return E instanceof r || m[m.length - 1] !== '"' ? void 0 : typeof E != "string" ? `${m.slice(0, -1)}${E}"` : E[0] === '"' ? m.slice(0, -1) + E.slice(1) : void 0;
    if (typeof E == "string" && E[0] === '"' && !(m instanceof r))
      return `"${m}${E.slice(1)}`;
  }
  function l(m, E) {
    return E.emptyStr() ? m : m.emptyStr() ? E : a`${m}${E}`;
  }
  e.strConcat = l;
  function u(m) {
    return typeof m == "number" || typeof m == "boolean" || m === null ? m : h(Array.isArray(m) ? m.join(",") : m);
  }
  function p(m) {
    return new n(h(m));
  }
  e.stringify = p;
  function h(m) {
    return JSON.stringify(m).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = h;
  function v(m) {
    return typeof m == "string" && e.IDENTIFIER.test(m) ? new n(`.${m}`) : i`[${m}]`;
  }
  e.getProperty = v;
  function _(m) {
    if (typeof m == "string" && e.IDENTIFIER.test(m))
      return new n(`${m}`);
    throw new Error(`CodeGen: invalid export name: ${m}, use explicit $id name mapping`);
  }
  e.getEsmExportName = _;
  function g(m) {
    return new n(m.toString());
  }
  e.regexpCode = g;
})(ea);
var au = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = ea;
  class r extends Error {
    constructor(f) {
      super(`CodeGen: "code" for ${f} not defined`), this.value = f.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class i {
    constructor({ prefixes: f, parent: l } = {}) {
      this._names = {}, this._prefixes = f, this._parent = l;
    }
    toName(f) {
      return f instanceof t.Name ? f : this.name(f);
    }
    name(f) {
      return new t.Name(this._newName(f));
    }
    _newName(f) {
      const l = this._names[f] || this._nameGroup(f);
      return `${f}${l.index++}`;
    }
    _nameGroup(f) {
      var l, u;
      if (!((u = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || u === void 0) && u.has(f) || this._prefixes && !this._prefixes.has(f))
        throw new Error(`CodeGen: prefix "${f}" is not allowed in this scope`);
      return this._names[f] = { prefix: f, index: 0 };
    }
  }
  e.Scope = i;
  class o extends t.Name {
    constructor(f, l) {
      super(l), this.prefix = f;
    }
    setValue(f, { property: l, itemIndex: u }) {
      this.value = f, this.scopePath = (0, t._)`.${new t.Name(l)}[${u}]`;
    }
  }
  e.ValueScopeName = o;
  const a = (0, t._)`\n`;
  class s extends i {
    constructor(f) {
      super(f), this._values = {}, this._scope = f.scope, this.opts = { ...f, _n: f.lines ? a : t.nil };
    }
    get() {
      return this._scope;
    }
    name(f) {
      return new o(f, this._newName(f));
    }
    value(f, l) {
      var u;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const p = this.toName(f), { prefix: h } = p, v = (u = l.key) !== null && u !== void 0 ? u : l.ref;
      let _ = this._values[h];
      if (_) {
        const E = _.get(v);
        if (E)
          return E;
      } else
        _ = this._values[h] = /* @__PURE__ */ new Map();
      _.set(v, p);
      const g = this._scope[h] || (this._scope[h] = []), m = g.length;
      return g[m] = l.ref, p.setValue(l, { property: h, itemIndex: m }), p;
    }
    getValue(f, l) {
      const u = this._values[f];
      if (u)
        return u.get(l);
    }
    scopeRefs(f, l = this._values) {
      return this._reduceValues(l, (u) => {
        if (u.scopePath === void 0)
          throw new Error(`CodeGen: name "${u}" has no value`);
        return (0, t._)`${f}${u.scopePath}`;
      });
    }
    scopeCode(f = this._values, l, u) {
      return this._reduceValues(f, (p) => {
        if (p.value === void 0)
          throw new Error(`CodeGen: name "${p}" has no value`);
        return p.value.code;
      }, l, u);
    }
    _reduceValues(f, l, u = {}, p) {
      let h = t.nil;
      for (const v in f) {
        const _ = f[v];
        if (!_)
          continue;
        const g = u[v] = u[v] || /* @__PURE__ */ new Map();
        _.forEach((m) => {
          if (g.has(m))
            return;
          g.set(m, n.Started);
          let E = l(m);
          if (E) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            h = (0, t._)`${h}${N} ${m} = ${E};${this.opts._n}`;
          } else if (E = p == null ? void 0 : p(m))
            h = (0, t._)`${h}${E}${this.opts._n}`;
          else
            throw new r(m);
          g.set(m, n.Completed);
        });
      }
      return h;
    }
  }
  e.ValueScope = s;
})(au);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = ea, r = au;
  var n = ea;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var i = au;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return i.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return i.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return i.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return i.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class o {
    optimizeNodes() {
      return this;
    }
    optimizeNames(d, $) {
      return this;
    }
  }
  class a extends o {
    constructor(d, $, O) {
      super(), this.varKind = d, this.name = $, this.rhs = O;
    }
    render({ es5: d, _n: $ }) {
      const O = d ? r.varKinds.var : this.varKind, w = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${O} ${this.name}${w};` + $;
    }
    optimizeNames(d, $) {
      if (d[this.name.str])
        return this.rhs && (this.rhs = M(this.rhs, d, $)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class s extends o {
    constructor(d, $, O) {
      super(), this.lhs = d, this.rhs = $, this.sideEffects = O;
    }
    render({ _n: d }) {
      return `${this.lhs} = ${this.rhs};` + d;
    }
    optimizeNames(d, $) {
      if (!(this.lhs instanceof t.Name && !d[this.lhs.str] && !this.sideEffects))
        return this.rhs = M(this.rhs, d, $), this;
    }
    get names() {
      const d = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return Y(d, this.rhs);
    }
  }
  class c extends s {
    constructor(d, $, O, w) {
      super(d, O, w), this.op = $;
    }
    render({ _n: d }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + d;
    }
  }
  class f extends o {
    constructor(d) {
      super(), this.label = d, this.names = {};
    }
    render({ _n: d }) {
      return `${this.label}:` + d;
    }
  }
  class l extends o {
    constructor(d) {
      super(), this.label = d, this.names = {};
    }
    render({ _n: d }) {
      return `break${this.label ? ` ${this.label}` : ""};` + d;
    }
  }
  class u extends o {
    constructor(d) {
      super(), this.error = d;
    }
    render({ _n: d }) {
      return `throw ${this.error};` + d;
    }
    get names() {
      return this.error.names;
    }
  }
  class p extends o {
    constructor(d) {
      super(), this.code = d;
    }
    render({ _n: d }) {
      return `${this.code};` + d;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(d, $) {
      return this.code = M(this.code, d, $), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class h extends o {
    constructor(d = []) {
      super(), this.nodes = d;
    }
    render(d) {
      return this.nodes.reduce(($, O) => $ + O.render(d), "");
    }
    optimizeNodes() {
      const { nodes: d } = this;
      let $ = d.length;
      for (; $--; ) {
        const O = d[$].optimizeNodes();
        Array.isArray(O) ? d.splice($, 1, ...O) : O ? d[$] = O : d.splice($, 1);
      }
      return d.length > 0 ? this : void 0;
    }
    optimizeNames(d, $) {
      const { nodes: O } = this;
      let w = O.length;
      for (; w--; ) {
        const y = O[w];
        y.optimizeNames(d, $) || (U(d, y.names), O.splice(w, 1));
      }
      return O.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((d, $) => G(d, $.names), {});
    }
  }
  class v extends h {
    render(d) {
      return "{" + d._n + super.render(d) + "}" + d._n;
    }
  }
  class _ extends h {
  }
  class g extends v {
  }
  g.kind = "else";
  class m extends v {
    constructor(d, $) {
      super($), this.condition = d;
    }
    render(d) {
      let $ = `if(${this.condition})` + super.render(d);
      return this.else && ($ += "else " + this.else.render(d)), $;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const d = this.condition;
      if (d === !0)
        return this.nodes;
      let $ = this.else;
      if ($) {
        const O = $.optimizeNodes();
        $ = this.else = Array.isArray(O) ? new g(O) : O;
      }
      if ($)
        return d === !1 ? $ instanceof m ? $ : $.nodes : this.nodes.length ? this : new m(H(d), $ instanceof m ? [$] : $.nodes);
      if (!(d === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(d, $) {
      var O;
      if (this.else = (O = this.else) === null || O === void 0 ? void 0 : O.optimizeNames(d, $), !!(super.optimizeNames(d, $) || this.else))
        return this.condition = M(this.condition, d, $), this;
    }
    get names() {
      const d = super.names;
      return Y(d, this.condition), this.else && G(d, this.else.names), d;
    }
  }
  m.kind = "if";
  class E extends v {
  }
  E.kind = "for";
  class N extends E {
    constructor(d) {
      super(), this.iteration = d;
    }
    render(d) {
      return `for(${this.iteration})` + super.render(d);
    }
    optimizeNames(d, $) {
      if (super.optimizeNames(d, $))
        return this.iteration = M(this.iteration, d, $), this;
    }
    get names() {
      return G(super.names, this.iteration.names);
    }
  }
  class R extends E {
    constructor(d, $, O, w) {
      super(), this.varKind = d, this.name = $, this.from = O, this.to = w;
    }
    render(d) {
      const $ = d.es5 ? r.varKinds.var : this.varKind, { name: O, from: w, to: y } = this;
      return `for(${$} ${O}=${w}; ${O}<${y}; ${O}++)` + super.render(d);
    }
    get names() {
      const d = Y(super.names, this.from);
      return Y(d, this.to);
    }
  }
  class F extends E {
    constructor(d, $, O, w) {
      super(), this.loop = d, this.varKind = $, this.name = O, this.iterable = w;
    }
    render(d) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(d);
    }
    optimizeNames(d, $) {
      if (super.optimizeNames(d, $))
        return this.iterable = M(this.iterable, d, $), this;
    }
    get names() {
      return G(super.names, this.iterable.names);
    }
  }
  class k extends v {
    constructor(d, $, O) {
      super(), this.name = d, this.args = $, this.async = O;
    }
    render(d) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(d);
    }
  }
  k.kind = "func";
  class L extends h {
    render(d) {
      return "return " + super.render(d);
    }
  }
  L.kind = "return";
  class V extends v {
    render(d) {
      let $ = "try" + super.render(d);
      return this.catch && ($ += this.catch.render(d)), this.finally && ($ += this.finally.render(d)), $;
    }
    optimizeNodes() {
      var d, $;
      return super.optimizeNodes(), (d = this.catch) === null || d === void 0 || d.optimizeNodes(), ($ = this.finally) === null || $ === void 0 || $.optimizeNodes(), this;
    }
    optimizeNames(d, $) {
      var O, w;
      return super.optimizeNames(d, $), (O = this.catch) === null || O === void 0 || O.optimizeNames(d, $), (w = this.finally) === null || w === void 0 || w.optimizeNames(d, $), this;
    }
    get names() {
      const d = super.names;
      return this.catch && G(d, this.catch.names), this.finally && G(d, this.finally.names), d;
    }
  }
  class P extends v {
    constructor(d) {
      super(), this.error = d;
    }
    render(d) {
      return `catch(${this.error})` + super.render(d);
    }
  }
  P.kind = "catch";
  class K extends v {
    render(d) {
      return "finally" + super.render(d);
    }
  }
  K.kind = "finally";
  class q {
    constructor(d, $ = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...$, _n: $.lines ? `
` : "" }, this._extScope = d, this._scope = new r.Scope({ parent: d }), this._nodes = [new _()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(d) {
      return this._scope.name(d);
    }
    // reserves unique name in the external scope
    scopeName(d) {
      return this._extScope.name(d);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(d, $) {
      const O = this._extScope.value(d, $);
      return (this._values[O.prefix] || (this._values[O.prefix] = /* @__PURE__ */ new Set())).add(O), O;
    }
    getScopeValue(d, $) {
      return this._extScope.getValue(d, $);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(d) {
      return this._extScope.scopeRefs(d, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(d, $, O, w) {
      const y = this._scope.toName($);
      return O !== void 0 && w && (this._constants[y.str] = O), this._leafNode(new a(d, y, O)), y;
    }
    // `const` declaration (`var` in es5 mode)
    const(d, $, O) {
      return this._def(r.varKinds.const, d, $, O);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(d, $, O) {
      return this._def(r.varKinds.let, d, $, O);
    }
    // `var` declaration with optional assignment
    var(d, $, O) {
      return this._def(r.varKinds.var, d, $, O);
    }
    // assignment code
    assign(d, $, O) {
      return this._leafNode(new s(d, $, O));
    }
    // `+=` code
    add(d, $) {
      return this._leafNode(new c(d, e.operators.ADD, $));
    }
    // appends passed SafeExpr to code or executes Block
    code(d) {
      return typeof d == "function" ? d() : d !== t.nil && this._leafNode(new p(d)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...d) {
      const $ = ["{"];
      for (const [O, w] of d)
        $.length > 1 && $.push(","), $.push(O), (O !== w || this.opts.es5) && ($.push(":"), (0, t.addCodeArg)($, w));
      return $.push("}"), new t._Code($);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(d, $, O) {
      if (this._blockNode(new m(d)), $ && O)
        this.code($).else().code(O).endIf();
      else if ($)
        this.code($).endIf();
      else if (O)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(d) {
      return this._elseNode(new m(d));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new g());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(m, g);
    }
    _for(d, $) {
      return this._blockNode(d), $ && this.code($).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(d, $) {
      return this._for(new N(d), $);
    }
    // `for` statement for a range of values
    forRange(d, $, O, w, y = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const j = this._scope.toName(d);
      return this._for(new R(y, j, $, O), () => w(j));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(d, $, O, w = r.varKinds.const) {
      const y = this._scope.toName(d);
      if (this.opts.es5) {
        const j = $ instanceof t.Name ? $ : this.var("_arr", $);
        return this.forRange("_i", 0, (0, t._)`${j}.length`, (C) => {
          this.var(y, (0, t._)`${j}[${C}]`), O(y);
        });
      }
      return this._for(new F("of", w, y, $), () => O(y));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(d, $, O, w = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(d, (0, t._)`Object.keys(${$})`, O);
      const y = this._scope.toName(d);
      return this._for(new F("in", w, y, $), () => O(y));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(E);
    }
    // `label` statement
    label(d) {
      return this._leafNode(new f(d));
    }
    // `break` statement
    break(d) {
      return this._leafNode(new l(d));
    }
    // `return` statement
    return(d) {
      const $ = new L();
      if (this._blockNode($), this.code(d), $.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(L);
    }
    // `try` statement
    try(d, $, O) {
      if (!$ && !O)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const w = new V();
      if (this._blockNode(w), this.code(d), $) {
        const y = this.name("e");
        this._currNode = w.catch = new P(y), $(y);
      }
      return O && (this._currNode = w.finally = new K(), this.code(O)), this._endBlockNode(P, K);
    }
    // `throw` statement
    throw(d) {
      return this._leafNode(new u(d));
    }
    // start self-balancing block
    block(d, $) {
      return this._blockStarts.push(this._nodes.length), d && this.code(d).endBlock($), this;
    }
    // end the current self-balancing block
    endBlock(d) {
      const $ = this._blockStarts.pop();
      if ($ === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const O = this._nodes.length - $;
      if (O < 0 || d !== void 0 && O !== d)
        throw new Error(`CodeGen: wrong number of nodes: ${O} vs ${d} expected`);
      return this._nodes.length = $, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(d, $ = t.nil, O, w) {
      return this._blockNode(new k(d, $, O)), w && this.code(w).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(k);
    }
    optimize(d = 1) {
      for (; d-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(d) {
      return this._currNode.nodes.push(d), this;
    }
    _blockNode(d) {
      this._currNode.nodes.push(d), this._nodes.push(d);
    }
    _endBlockNode(d, $) {
      const O = this._currNode;
      if (O instanceof d || $ && O instanceof $)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${$ ? `${d.kind}/${$.kind}` : d.kind}"`);
    }
    _elseNode(d) {
      const $ = this._currNode;
      if (!($ instanceof m))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = $.else = d, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const d = this._nodes;
      return d[d.length - 1];
    }
    set _currNode(d) {
      const $ = this._nodes;
      $[$.length - 1] = d;
    }
  }
  e.CodeGen = q;
  function G(b, d) {
    for (const $ in d)
      b[$] = (b[$] || 0) + (d[$] || 0);
    return b;
  }
  function Y(b, d) {
    return d instanceof t._CodeOrName ? G(b, d.names) : b;
  }
  function M(b, d, $) {
    if (b instanceof t.Name)
      return O(b);
    if (!w(b))
      return b;
    return new t._Code(b._items.reduce((y, j) => (j instanceof t.Name && (j = O(j)), j instanceof t._Code ? y.push(...j._items) : y.push(j), y), []));
    function O(y) {
      const j = $[y.str];
      return j === void 0 || d[y.str] !== 1 ? y : (delete d[y.str], j);
    }
    function w(y) {
      return y instanceof t._Code && y._items.some((j) => j instanceof t.Name && d[j.str] === 1 && $[j.str] !== void 0);
    }
  }
  function U(b, d) {
    for (const $ in d)
      b[$] = (b[$] || 0) - (d[$] || 0);
  }
  function H(b) {
    return typeof b == "boolean" || typeof b == "number" || b === null ? !b : (0, t._)`!${A(b)}`;
  }
  e.not = H;
  const x = S(e.operators.AND);
  function W(...b) {
    return b.reduce(x);
  }
  e.and = W;
  const z = S(e.operators.OR);
  function I(...b) {
    return b.reduce(z);
  }
  e.or = I;
  function S(b) {
    return (d, $) => d === t.nil ? $ : $ === t.nil ? d : (0, t._)`${A(d)} ${b} ${A($)}`;
  }
  function A(b) {
    return b instanceof t.Name ? b : (0, t._)`(${b})`;
  }
})(fe);
var Q = {};
Object.defineProperty(Q, "__esModule", { value: !0 });
Q.checkStrictMode = Q.getErrorPath = Q.Type = Q.useFunc = Q.setEvaluated = Q.evaluatedPropsToName = Q.mergeEvaluated = Q.eachItem = Q.unescapeJsonPointer = Q.escapeJsonPointer = Q.escapeFragment = Q.unescapeFragment = Q.schemaRefOrVal = Q.schemaHasRulesButRef = Q.schemaHasRules = Q.checkUnknownRules = Q.alwaysValidSchema = Q.toHash = void 0;
const Ee = fe, kM = ea;
function DM(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
Q.toHash = DM;
function FM(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Nv(e, t), !Ov(t, e.self.RULES.all));
}
Q.alwaysValidSchema = FM;
function Nv(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const i = n.RULES.keywords;
  for (const o in t)
    i[o] || Rv(e, `unknown keyword: "${o}"`);
}
Q.checkUnknownRules = Nv;
function Ov(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
Q.schemaHasRules = Ov;
function jM(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
Q.schemaHasRulesButRef = jM;
function LM({ topSchemaRef: e, schemaPath: t }, r, n, i) {
  if (!i) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, Ee._)`${r}`;
  }
  return (0, Ee._)`${e}${t}${(0, Ee.getProperty)(n)}`;
}
Q.schemaRefOrVal = LM;
function MM(e) {
  return Av(decodeURIComponent(e));
}
Q.unescapeFragment = MM;
function UM(e) {
  return encodeURIComponent(id(e));
}
Q.escapeFragment = UM;
function id(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
Q.escapeJsonPointer = id;
function Av(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
Q.unescapeJsonPointer = Av;
function xM(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
Q.eachItem = xM;
function oy({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (i, o, a, s) => {
    const c = a === void 0 ? o : a instanceof Ee.Name ? (o instanceof Ee.Name ? e(i, o, a) : t(i, o, a), a) : o instanceof Ee.Name ? (t(i, a, o), o) : r(o, a);
    return s === Ee.Name && !(c instanceof Ee.Name) ? n(i, c) : c;
  };
}
Q.mergeEvaluated = {
  props: oy({
    mergeNames: (e, t, r) => e.if((0, Ee._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, Ee._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, Ee._)`${r} || {}`).code((0, Ee._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, Ee._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, Ee._)`${r} || {}`), od(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Cv
  }),
  items: oy({
    mergeNames: (e, t, r) => e.if((0, Ee._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, Ee._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, Ee._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, Ee._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Cv(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, Ee._)`{}`);
  return t !== void 0 && od(e, r, t), r;
}
Q.evaluatedPropsToName = Cv;
function od(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, Ee._)`${t}${(0, Ee.getProperty)(n)}`, !0));
}
Q.setEvaluated = od;
const ay = {};
function qM(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: ay[t.code] || (ay[t.code] = new kM._Code(t.code))
  });
}
Q.useFunc = qM;
var su;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(su || (Q.Type = su = {}));
function VM(e, t, r) {
  if (e instanceof Ee.Name) {
    const n = t === su.Num;
    return r ? n ? (0, Ee._)`"[" + ${e} + "]"` : (0, Ee._)`"['" + ${e} + "']"` : n ? (0, Ee._)`"/" + ${e}` : (0, Ee._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, Ee.getProperty)(e).toString() : "/" + id(e);
}
Q.getErrorPath = VM;
function Rv(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
Q.checkStrictMode = Rv;
var gr = {};
Object.defineProperty(gr, "__esModule", { value: !0 });
const ct = fe, HM = {
  // validation function arguments
  data: new ct.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new ct.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new ct.Name("instancePath"),
  parentData: new ct.Name("parentData"),
  parentDataProperty: new ct.Name("parentDataProperty"),
  rootData: new ct.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new ct.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new ct.Name("vErrors"),
  // null or array of validation errors
  errors: new ct.Name("errors"),
  // counter of validation errors
  this: new ct.Name("this"),
  // "globals"
  self: new ct.Name("self"),
  scope: new ct.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new ct.Name("json"),
  jsonPos: new ct.Name("jsonPos"),
  jsonLen: new ct.Name("jsonLen"),
  jsonPart: new ct.Name("jsonPart")
};
gr.default = HM;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = fe, r = Q, n = gr;
  e.keywordError = {
    message: ({ keyword: g }) => (0, t.str)`must pass "${g}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: g, schemaType: m }) => m ? (0, t.str)`"${g}" keyword must be ${m} ($data)` : (0, t.str)`"${g}" keyword is invalid ($data)`
  };
  function i(g, m = e.keywordError, E, N) {
    const { it: R } = g, { gen: F, compositeRule: k, allErrors: L } = R, V = u(g, m, E);
    N ?? (k || L) ? c(F, V) : f(R, (0, t._)`[${V}]`);
  }
  e.reportError = i;
  function o(g, m = e.keywordError, E) {
    const { it: N } = g, { gen: R, compositeRule: F, allErrors: k } = N, L = u(g, m, E);
    c(R, L), F || k || f(N, n.default.vErrors);
  }
  e.reportExtraError = o;
  function a(g, m) {
    g.assign(n.default.errors, m), g.if((0, t._)`${n.default.vErrors} !== null`, () => g.if(m, () => g.assign((0, t._)`${n.default.vErrors}.length`, m), () => g.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = a;
  function s({ gen: g, keyword: m, schemaValue: E, data: N, errsCount: R, it: F }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const k = g.name("err");
    g.forRange("i", R, n.default.errors, (L) => {
      g.const(k, (0, t._)`${n.default.vErrors}[${L}]`), g.if((0, t._)`${k}.instancePath === undefined`, () => g.assign((0, t._)`${k}.instancePath`, (0, t.strConcat)(n.default.instancePath, F.errorPath))), g.assign((0, t._)`${k}.schemaPath`, (0, t.str)`${F.errSchemaPath}/${m}`), F.opts.verbose && (g.assign((0, t._)`${k}.schema`, E), g.assign((0, t._)`${k}.data`, N));
    });
  }
  e.extendErrors = s;
  function c(g, m) {
    const E = g.const("err", m);
    g.if((0, t._)`${n.default.vErrors} === null`, () => g.assign(n.default.vErrors, (0, t._)`[${E}]`), (0, t._)`${n.default.vErrors}.push(${E})`), g.code((0, t._)`${n.default.errors}++`);
  }
  function f(g, m) {
    const { gen: E, validateName: N, schemaEnv: R } = g;
    R.$async ? E.throw((0, t._)`new ${g.ValidationError}(${m})`) : (E.assign((0, t._)`${N}.errors`, m), E.return(!1));
  }
  const l = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function u(g, m, E) {
    const { createErrors: N } = g.it;
    return N === !1 ? (0, t._)`{}` : p(g, m, E);
  }
  function p(g, m, E = {}) {
    const { gen: N, it: R } = g, F = [
      h(R, E),
      v(g, E)
    ];
    return _(g, m, F), N.object(...F);
  }
  function h({ errorPath: g }, { instancePath: m }) {
    const E = m ? (0, t.str)`${g}${(0, r.getErrorPath)(m, r.Type.Str)}` : g;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, E)];
  }
  function v({ keyword: g, it: { errSchemaPath: m } }, { schemaPath: E, parentSchema: N }) {
    let R = N ? m : (0, t.str)`${m}/${g}`;
    return E && (R = (0, t.str)`${R}${(0, r.getErrorPath)(E, r.Type.Str)}`), [l.schemaPath, R];
  }
  function _(g, { params: m, message: E }, N) {
    const { keyword: R, data: F, schemaValue: k, it: L } = g, { opts: V, propertyName: P, topSchemaRef: K, schemaPath: q } = L;
    N.push([l.keyword, R], [l.params, typeof m == "function" ? m(g) : m || (0, t._)`{}`]), V.messages && N.push([l.message, typeof E == "function" ? E(g) : E]), V.verbose && N.push([l.schema, k], [l.parentSchema, (0, t._)`${K}${q}`], [n.default.data, F]), P && N.push([l.propertyName, P]);
  }
})(wa);
Object.defineProperty(Di, "__esModule", { value: !0 });
Di.boolOrEmptySchema = Di.topBoolOrEmptySchema = void 0;
const GM = wa, BM = fe, zM = gr, KM = {
  message: "boolean schema is false"
};
function WM(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? Iv(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(zM.default.data) : (t.assign((0, BM._)`${n}.errors`, null), t.return(!0));
}
Di.topBoolOrEmptySchema = WM;
function YM(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), Iv(e)) : r.var(t, !0);
}
Di.boolOrEmptySchema = YM;
function Iv(e, t) {
  const { gen: r, data: n } = e, i = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, GM.reportError)(i, KM, void 0, t);
}
var qe = {}, zn = {};
Object.defineProperty(zn, "__esModule", { value: !0 });
zn.getRules = zn.isJSONType = void 0;
const JM = ["string", "number", "integer", "boolean", "null", "object", "array"], XM = new Set(JM);
function QM(e) {
  return typeof e == "string" && XM.has(e);
}
zn.isJSONType = QM;
function ZM() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
zn.getRules = ZM;
var Ir = {};
Object.defineProperty(Ir, "__esModule", { value: !0 });
Ir.shouldUseRule = Ir.shouldUseGroup = Ir.schemaHasRulesForType = void 0;
function eU({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && kv(e, n);
}
Ir.schemaHasRulesForType = eU;
function kv(e, t) {
  return t.rules.some((r) => Dv(e, r));
}
Ir.shouldUseGroup = kv;
function Dv(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
Ir.shouldUseRule = Dv;
Object.defineProperty(qe, "__esModule", { value: !0 });
qe.reportTypeError = qe.checkDataTypes = qe.checkDataType = qe.coerceAndCheckDataType = qe.getJSONTypes = qe.getSchemaTypes = qe.DataType = void 0;
const tU = zn, rU = Ir, nU = wa, le = fe, Fv = Q;
var Pi;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(Pi || (qe.DataType = Pi = {}));
function iU(e) {
  const t = jv(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
qe.getSchemaTypes = iU;
function jv(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(tU.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
qe.getJSONTypes = jv;
function oU(e, t) {
  const { gen: r, data: n, opts: i } = e, o = aU(t, i.coerceTypes), a = t.length > 0 && !(o.length === 0 && t.length === 1 && (0, rU.schemaHasRulesForType)(e, t[0]));
  if (a) {
    const s = ad(t, n, i.strictNumbers, Pi.Wrong);
    r.if(s, () => {
      o.length ? sU(e, t, o) : sd(e);
    });
  }
  return a;
}
qe.coerceAndCheckDataType = oU;
const Lv = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function aU(e, t) {
  return t ? e.filter((r) => Lv.has(r) || t === "array" && r === "array") : [];
}
function sU(e, t, r) {
  const { gen: n, data: i, opts: o } = e, a = n.let("dataType", (0, le._)`typeof ${i}`), s = n.let("coerced", (0, le._)`undefined`);
  o.coerceTypes === "array" && n.if((0, le._)`${a} == 'object' && Array.isArray(${i}) && ${i}.length == 1`, () => n.assign(i, (0, le._)`${i}[0]`).assign(a, (0, le._)`typeof ${i}`).if(ad(t, i, o.strictNumbers), () => n.assign(s, i))), n.if((0, le._)`${s} !== undefined`);
  for (const f of r)
    (Lv.has(f) || f === "array" && o.coerceTypes === "array") && c(f);
  n.else(), sd(e), n.endIf(), n.if((0, le._)`${s} !== undefined`, () => {
    n.assign(i, s), cU(e, s);
  });
  function c(f) {
    switch (f) {
      case "string":
        n.elseIf((0, le._)`${a} == "number" || ${a} == "boolean"`).assign(s, (0, le._)`"" + ${i}`).elseIf((0, le._)`${i} === null`).assign(s, (0, le._)`""`);
        return;
      case "number":
        n.elseIf((0, le._)`${a} == "boolean" || ${i} === null
              || (${a} == "string" && ${i} && ${i} == +${i})`).assign(s, (0, le._)`+${i}`);
        return;
      case "integer":
        n.elseIf((0, le._)`${a} === "boolean" || ${i} === null
              || (${a} === "string" && ${i} && ${i} == +${i} && !(${i} % 1))`).assign(s, (0, le._)`+${i}`);
        return;
      case "boolean":
        n.elseIf((0, le._)`${i} === "false" || ${i} === 0 || ${i} === null`).assign(s, !1).elseIf((0, le._)`${i} === "true" || ${i} === 1`).assign(s, !0);
        return;
      case "null":
        n.elseIf((0, le._)`${i} === "" || ${i} === 0 || ${i} === false`), n.assign(s, null);
        return;
      case "array":
        n.elseIf((0, le._)`${a} === "string" || ${a} === "number"
              || ${a} === "boolean" || ${i} === null`).assign(s, (0, le._)`[${i}]`);
    }
  }
}
function cU({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, le._)`${t} !== undefined`, () => e.assign((0, le._)`${t}[${r}]`, n));
}
function cu(e, t, r, n = Pi.Correct) {
  const i = n === Pi.Correct ? le.operators.EQ : le.operators.NEQ;
  let o;
  switch (e) {
    case "null":
      return (0, le._)`${t} ${i} null`;
    case "array":
      o = (0, le._)`Array.isArray(${t})`;
      break;
    case "object":
      o = (0, le._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      o = a((0, le._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      o = a();
      break;
    default:
      return (0, le._)`typeof ${t} ${i} ${e}`;
  }
  return n === Pi.Correct ? o : (0, le.not)(o);
  function a(s = le.nil) {
    return (0, le.and)((0, le._)`typeof ${t} == "number"`, s, r ? (0, le._)`isFinite(${t})` : le.nil);
  }
}
qe.checkDataType = cu;
function ad(e, t, r, n) {
  if (e.length === 1)
    return cu(e[0], t, r, n);
  let i;
  const o = (0, Fv.toHash)(e);
  if (o.array && o.object) {
    const a = (0, le._)`typeof ${t} != "object"`;
    i = o.null ? a : (0, le._)`!${t} || ${a}`, delete o.null, delete o.array, delete o.object;
  } else
    i = le.nil;
  o.number && delete o.integer;
  for (const a in o)
    i = (0, le.and)(i, cu(a, t, r, n));
  return i;
}
qe.checkDataTypes = ad;
const lU = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, le._)`{type: ${e}}` : (0, le._)`{type: ${t}}`
};
function sd(e) {
  const t = uU(e);
  (0, nU.reportError)(t, lU);
}
qe.reportTypeError = sd;
function uU(e) {
  const { gen: t, data: r, schema: n } = e, i = (0, Fv.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: i,
    schemaValue: i,
    parentSchema: n,
    params: {},
    it: e
  };
}
var Tc = {};
Object.defineProperty(Tc, "__esModule", { value: !0 });
Tc.assignDefaults = void 0;
const si = fe, fU = Q;
function dU(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const i in r)
      sy(e, i, r[i].default);
  else t === "array" && Array.isArray(n) && n.forEach((i, o) => sy(e, o, i.default));
}
Tc.assignDefaults = dU;
function sy(e, t, r) {
  const { gen: n, compositeRule: i, data: o, opts: a } = e;
  if (r === void 0)
    return;
  const s = (0, si._)`${o}${(0, si.getProperty)(t)}`;
  if (i) {
    (0, fU.checkStrictMode)(e, `default is ignored for: ${s}`);
    return;
  }
  let c = (0, si._)`${s} === undefined`;
  a.useDefaults === "empty" && (c = (0, si._)`${c} || ${s} === null || ${s} === ""`), n.if(c, (0, si._)`${s} = ${(0, si.stringify)(r)}`);
}
var fr = {}, he = {};
Object.defineProperty(he, "__esModule", { value: !0 });
he.validateUnion = he.validateArray = he.usePattern = he.callValidateCode = he.schemaProperties = he.allSchemaProperties = he.noPropertyInData = he.propertyInData = he.isOwnProperty = he.hasPropFunc = he.reportMissingProp = he.checkMissingProp = he.checkReportMissingProp = void 0;
const Ne = fe, cd = Q, Wr = gr, hU = Q;
function pU(e, t) {
  const { gen: r, data: n, it: i } = e;
  r.if(ud(r, n, t, i.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, Ne._)`${t}` }, !0), e.error();
  });
}
he.checkReportMissingProp = pU;
function mU({ gen: e, data: t, it: { opts: r } }, n, i) {
  return (0, Ne.or)(...n.map((o) => (0, Ne.and)(ud(e, t, o, r.ownProperties), (0, Ne._)`${i} = ${o}`)));
}
he.checkMissingProp = mU;
function yU(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
he.reportMissingProp = yU;
function Mv(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, Ne._)`Object.prototype.hasOwnProperty`
  });
}
he.hasPropFunc = Mv;
function ld(e, t, r) {
  return (0, Ne._)`${Mv(e)}.call(${t}, ${r})`;
}
he.isOwnProperty = ld;
function gU(e, t, r, n) {
  const i = (0, Ne._)`${t}${(0, Ne.getProperty)(r)} !== undefined`;
  return n ? (0, Ne._)`${i} && ${ld(e, t, r)}` : i;
}
he.propertyInData = gU;
function ud(e, t, r, n) {
  const i = (0, Ne._)`${t}${(0, Ne.getProperty)(r)} === undefined`;
  return n ? (0, Ne.or)(i, (0, Ne.not)(ld(e, t, r))) : i;
}
he.noPropertyInData = ud;
function Uv(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
he.allSchemaProperties = Uv;
function $U(e, t) {
  return Uv(t).filter((r) => !(0, cd.alwaysValidSchema)(e, t[r]));
}
he.schemaProperties = $U;
function vU({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: i, errorPath: o }, it: a }, s, c, f) {
  const l = f ? (0, Ne._)`${e}, ${t}, ${n}${i}` : t, u = [
    [Wr.default.instancePath, (0, Ne.strConcat)(Wr.default.instancePath, o)],
    [Wr.default.parentData, a.parentData],
    [Wr.default.parentDataProperty, a.parentDataProperty],
    [Wr.default.rootData, Wr.default.rootData]
  ];
  a.opts.dynamicRef && u.push([Wr.default.dynamicAnchors, Wr.default.dynamicAnchors]);
  const p = (0, Ne._)`${l}, ${r.object(...u)}`;
  return c !== Ne.nil ? (0, Ne._)`${s}.call(${c}, ${p})` : (0, Ne._)`${s}(${p})`;
}
he.callValidateCode = vU;
const _U = (0, Ne._)`new RegExp`;
function wU({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: i } = t.code, o = i(r, n);
  return e.scopeValue("pattern", {
    key: o.toString(),
    ref: o,
    code: (0, Ne._)`${i.code === "new RegExp" ? _U : (0, hU.useFunc)(e, i)}(${r}, ${n})`
  });
}
he.usePattern = wU;
function EU(e) {
  const { gen: t, data: r, keyword: n, it: i } = e, o = t.name("valid");
  if (i.allErrors) {
    const s = t.let("valid", !0);
    return a(() => t.assign(s, !1)), s;
  }
  return t.var(o, !0), a(() => t.break()), o;
  function a(s) {
    const c = t.const("len", (0, Ne._)`${r}.length`);
    t.forRange("i", 0, c, (f) => {
      e.subschema({
        keyword: n,
        dataProp: f,
        dataPropType: cd.Type.Num
      }, o), t.if((0, Ne.not)(o), s);
    });
  }
}
he.validateArray = EU;
function SU(e) {
  const { gen: t, schema: r, keyword: n, it: i } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, cd.alwaysValidSchema)(i, c)) && !i.opts.unevaluated)
    return;
  const a = t.let("valid", !1), s = t.name("_valid");
  t.block(() => r.forEach((c, f) => {
    const l = e.subschema({
      keyword: n,
      schemaProp: f,
      compositeRule: !0
    }, s);
    t.assign(a, (0, Ne._)`${a} || ${s}`), e.mergeValidEvaluated(l, s) || t.if((0, Ne.not)(a));
  })), e.result(a, () => e.reset(), () => e.error(!0));
}
he.validateUnion = SU;
Object.defineProperty(fr, "__esModule", { value: !0 });
fr.validateKeywordUsage = fr.validSchemaType = fr.funcKeywordCode = fr.macroKeywordCode = void 0;
const mt = fe, Ln = gr, bU = he, PU = wa;
function TU(e, t) {
  const { gen: r, keyword: n, schema: i, parentSchema: o, it: a } = e, s = t.macro.call(a.self, i, o, a), c = xv(r, n, s);
  a.opts.validateSchema !== !1 && a.self.validateSchema(s, !0);
  const f = r.name("valid");
  e.subschema({
    schema: s,
    schemaPath: mt.nil,
    errSchemaPath: `${a.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, f), e.pass(f, () => e.error(!0));
}
fr.macroKeywordCode = TU;
function NU(e, t) {
  var r;
  const { gen: n, keyword: i, schema: o, parentSchema: a, $data: s, it: c } = e;
  AU(c, t);
  const f = !s && t.compile ? t.compile.call(c.self, o, a, c) : t.validate, l = xv(n, i, f), u = n.let("valid");
  e.block$data(u, p), e.ok((r = t.valid) !== null && r !== void 0 ? r : u);
  function p() {
    if (t.errors === !1)
      _(), t.modifying && cy(e), g(() => e.error());
    else {
      const m = t.async ? h() : v();
      t.modifying && cy(e), g(() => OU(e, m));
    }
  }
  function h() {
    const m = n.let("ruleErrs", null);
    return n.try(() => _((0, mt._)`await `), (E) => n.assign(u, !1).if((0, mt._)`${E} instanceof ${c.ValidationError}`, () => n.assign(m, (0, mt._)`${E}.errors`), () => n.throw(E))), m;
  }
  function v() {
    const m = (0, mt._)`${l}.errors`;
    return n.assign(m, null), _(mt.nil), m;
  }
  function _(m = t.async ? (0, mt._)`await ` : mt.nil) {
    const E = c.opts.passContext ? Ln.default.this : Ln.default.self, N = !("compile" in t && !s || t.schema === !1);
    n.assign(u, (0, mt._)`${m}${(0, bU.callValidateCode)(e, l, E, N)}`, t.modifying);
  }
  function g(m) {
    var E;
    n.if((0, mt.not)((E = t.valid) !== null && E !== void 0 ? E : u), m);
  }
}
fr.funcKeywordCode = NU;
function cy(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, mt._)`${n.parentData}[${n.parentDataProperty}]`));
}
function OU(e, t) {
  const { gen: r } = e;
  r.if((0, mt._)`Array.isArray(${t})`, () => {
    r.assign(Ln.default.vErrors, (0, mt._)`${Ln.default.vErrors} === null ? ${t} : ${Ln.default.vErrors}.concat(${t})`).assign(Ln.default.errors, (0, mt._)`${Ln.default.vErrors}.length`), (0, PU.extendErrors)(e);
  }, () => e.error());
}
function AU({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function xv(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, mt.stringify)(r) });
}
function CU(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
fr.validSchemaType = CU;
function RU({ schema: e, opts: t, self: r, errSchemaPath: n }, i, o) {
  if (Array.isArray(i.keyword) ? !i.keyword.includes(o) : i.keyword !== o)
    throw new Error("ajv implementation error");
  const a = i.dependencies;
  if (a != null && a.some((s) => !Object.prototype.hasOwnProperty.call(e, s)))
    throw new Error(`parent schema must have dependencies of ${o}: ${a.join(",")}`);
  if (i.validateSchema && !i.validateSchema(e[o])) {
    const c = `keyword "${o}" value is invalid at path "${n}": ` + r.errorsText(i.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
fr.validateKeywordUsage = RU;
var un = {};
Object.defineProperty(un, "__esModule", { value: !0 });
un.extendSubschemaMode = un.extendSubschemaData = un.getSubschema = void 0;
const cr = fe, qv = Q;
function IU(e, { keyword: t, schemaProp: r, schema: n, schemaPath: i, errSchemaPath: o, topSchemaRef: a }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const s = e.schema[t];
    return r === void 0 ? {
      schema: s,
      schemaPath: (0, cr._)`${e.schemaPath}${(0, cr.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: s[r],
      schemaPath: (0, cr._)`${e.schemaPath}${(0, cr.getProperty)(t)}${(0, cr.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, qv.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (i === void 0 || o === void 0 || a === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: i,
      topSchemaRef: a,
      errSchemaPath: o
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
un.getSubschema = IU;
function kU(e, t, { dataProp: r, dataPropType: n, data: i, dataTypes: o, propertyName: a }) {
  if (i !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: s } = t;
  if (r !== void 0) {
    const { errorPath: f, dataPathArr: l, opts: u } = t, p = s.let("data", (0, cr._)`${t.data}${(0, cr.getProperty)(r)}`, !0);
    c(p), e.errorPath = (0, cr.str)`${f}${(0, qv.getErrorPath)(r, n, u.jsPropertySyntax)}`, e.parentDataProperty = (0, cr._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (i !== void 0) {
    const f = i instanceof cr.Name ? i : s.let("data", i, !0);
    c(f), a !== void 0 && (e.propertyName = a);
  }
  o && (e.dataTypes = o);
  function c(f) {
    e.data = f, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, f];
  }
}
un.extendSubschemaData = kU;
function DU(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: i, allErrors: o }) {
  n !== void 0 && (e.compositeRule = n), i !== void 0 && (e.createErrors = i), o !== void 0 && (e.allErrors = o), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
un.extendSubschemaMode = DU;
var tt = {}, Vv = { exports: {} }, sn = Vv.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, i = r.post || function() {
  };
  hs(t, n, i, e, "", e);
};
sn.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
sn.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
sn.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
sn.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function hs(e, t, r, n, i, o, a, s, c, f) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, i, o, a, s, c, f);
    for (var l in n) {
      var u = n[l];
      if (Array.isArray(u)) {
        if (l in sn.arrayKeywords)
          for (var p = 0; p < u.length; p++)
            hs(e, t, r, u[p], i + "/" + l + "/" + p, o, i, l, n, p);
      } else if (l in sn.propsKeywords) {
        if (u && typeof u == "object")
          for (var h in u)
            hs(e, t, r, u[h], i + "/" + l + "/" + FU(h), o, i, l, n, h);
      } else (l in sn.keywords || e.allKeys && !(l in sn.skipKeywords)) && hs(e, t, r, u, i + "/" + l, o, i, l, n);
    }
    r(n, i, o, a, s, c, f);
  }
}
function FU(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var jU = Vv.exports;
Object.defineProperty(tt, "__esModule", { value: !0 });
tt.getSchemaRefs = tt.resolveUrl = tt.normalizeId = tt._getFullPath = tt.getFullPath = tt.inlineRef = void 0;
const LU = Q, MU = vc, UU = jU, xU = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function qU(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !lu(e) : t ? Hv(e) <= t : !1;
}
tt.inlineRef = qU;
const VU = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function lu(e) {
  for (const t in e) {
    if (VU.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(lu) || typeof r == "object" && lu(r))
      return !0;
  }
  return !1;
}
function Hv(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !xU.has(r) && (typeof e[r] == "object" && (0, LU.eachItem)(e[r], (n) => t += Hv(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function Gv(e, t = "", r) {
  r !== !1 && (t = Ti(t));
  const n = e.parse(t);
  return Bv(e, n);
}
tt.getFullPath = Gv;
function Bv(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
tt._getFullPath = Bv;
const HU = /#\/?$/;
function Ti(e) {
  return e ? e.replace(HU, "") : "";
}
tt.normalizeId = Ti;
function GU(e, t, r) {
  return r = Ti(r), e.resolve(t, r);
}
tt.resolveUrl = GU;
const BU = /^[a-z_][-a-z0-9._]*$/i;
function zU(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, i = Ti(e[r] || t), o = { "": i }, a = Gv(n, i, !1), s = {}, c = /* @__PURE__ */ new Set();
  return UU(e, { allKeys: !0 }, (u, p, h, v) => {
    if (v === void 0)
      return;
    const _ = a + p;
    let g = o[v];
    typeof u[r] == "string" && (g = m.call(this, u[r])), E.call(this, u.$anchor), E.call(this, u.$dynamicAnchor), o[p] = g;
    function m(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = Ti(g ? R(g, N) : N), c.has(N))
        throw l(N);
      c.add(N);
      let F = this.refs[N];
      return typeof F == "string" && (F = this.refs[F]), typeof F == "object" ? f(u, F.schema, N) : N !== Ti(_) && (N[0] === "#" ? (f(u, s[N], N), s[N] = u) : this.refs[N] = _), N;
    }
    function E(N) {
      if (typeof N == "string") {
        if (!BU.test(N))
          throw new Error(`invalid anchor "${N}"`);
        m.call(this, `#${N}`);
      }
    }
  }), s;
  function f(u, p, h) {
    if (p !== void 0 && !MU(u, p))
      throw l(h);
  }
  function l(u) {
    return new Error(`reference "${u}" resolves to more than one schema`);
  }
}
tt.getSchemaRefs = zU;
Object.defineProperty(tr, "__esModule", { value: !0 });
tr.getData = tr.KeywordCxt = tr.validateFunctionCode = void 0;
const zv = Di, ly = qe, fd = Ir, js = qe, KU = Tc, Fo = fr, Sl = un, te = fe, ie = gr, WU = tt, kr = Q, $o = wa;
function YU(e) {
  if (Yv(e) && (Jv(e), Wv(e))) {
    QU(e);
    return;
  }
  Kv(e, () => (0, zv.topBoolOrEmptySchema)(e));
}
tr.validateFunctionCode = YU;
function Kv({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: i }, o) {
  i.code.es5 ? e.func(t, (0, te._)`${ie.default.data}, ${ie.default.valCxt}`, n.$async, () => {
    e.code((0, te._)`"use strict"; ${uy(r, i)}`), XU(e, i), e.code(o);
  }) : e.func(t, (0, te._)`${ie.default.data}, ${JU(i)}`, n.$async, () => e.code(uy(r, i)).code(o));
}
function JU(e) {
  return (0, te._)`{${ie.default.instancePath}="", ${ie.default.parentData}, ${ie.default.parentDataProperty}, ${ie.default.rootData}=${ie.default.data}${e.dynamicRef ? (0, te._)`, ${ie.default.dynamicAnchors}={}` : te.nil}}={}`;
}
function XU(e, t) {
  e.if(ie.default.valCxt, () => {
    e.var(ie.default.instancePath, (0, te._)`${ie.default.valCxt}.${ie.default.instancePath}`), e.var(ie.default.parentData, (0, te._)`${ie.default.valCxt}.${ie.default.parentData}`), e.var(ie.default.parentDataProperty, (0, te._)`${ie.default.valCxt}.${ie.default.parentDataProperty}`), e.var(ie.default.rootData, (0, te._)`${ie.default.valCxt}.${ie.default.rootData}`), t.dynamicRef && e.var(ie.default.dynamicAnchors, (0, te._)`${ie.default.valCxt}.${ie.default.dynamicAnchors}`);
  }, () => {
    e.var(ie.default.instancePath, (0, te._)`""`), e.var(ie.default.parentData, (0, te._)`undefined`), e.var(ie.default.parentDataProperty, (0, te._)`undefined`), e.var(ie.default.rootData, ie.default.data), t.dynamicRef && e.var(ie.default.dynamicAnchors, (0, te._)`{}`);
  });
}
function QU(e) {
  const { schema: t, opts: r, gen: n } = e;
  Kv(e, () => {
    r.$comment && t.$comment && Qv(e), nx(e), n.let(ie.default.vErrors, null), n.let(ie.default.errors, 0), r.unevaluated && ZU(e), Xv(e), ax(e);
  });
}
function ZU(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, te._)`${r}.evaluated`), t.if((0, te._)`${e.evaluated}.dynamicProps`, () => t.assign((0, te._)`${e.evaluated}.props`, (0, te._)`undefined`)), t.if((0, te._)`${e.evaluated}.dynamicItems`, () => t.assign((0, te._)`${e.evaluated}.items`, (0, te._)`undefined`));
}
function uy(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, te._)`/*# sourceURL=${r} */` : te.nil;
}
function ex(e, t) {
  if (Yv(e) && (Jv(e), Wv(e))) {
    tx(e, t);
    return;
  }
  (0, zv.boolOrEmptySchema)(e, t);
}
function Wv({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function Yv(e) {
  return typeof e.schema != "boolean";
}
function tx(e, t) {
  const { schema: r, gen: n, opts: i } = e;
  i.$comment && r.$comment && Qv(e), ix(e), ox(e);
  const o = n.const("_errs", ie.default.errors);
  Xv(e, o), n.var(t, (0, te._)`${o} === ${ie.default.errors}`);
}
function Jv(e) {
  (0, kr.checkUnknownRules)(e), rx(e);
}
function Xv(e, t) {
  if (e.opts.jtd)
    return fy(e, [], !1, t);
  const r = (0, ly.getSchemaTypes)(e.schema), n = (0, ly.coerceAndCheckDataType)(e, r);
  fy(e, r, !n, t);
}
function rx(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: i } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, kr.schemaHasRulesButRef)(t, i.RULES) && i.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function nx(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, kr.checkStrictMode)(e, "default is ignored in the schema root");
}
function ix(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, WU.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function ox(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Qv({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: i }) {
  const o = r.$comment;
  if (i.$comment === !0)
    e.code((0, te._)`${ie.default.self}.logger.log(${o})`);
  else if (typeof i.$comment == "function") {
    const a = (0, te.str)`${n}/$comment`, s = e.scopeValue("root", { ref: t.root });
    e.code((0, te._)`${ie.default.self}.opts.$comment(${o}, ${a}, ${s}.schema)`);
  }
}
function ax(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: i, opts: o } = e;
  r.$async ? t.if((0, te._)`${ie.default.errors} === 0`, () => t.return(ie.default.data), () => t.throw((0, te._)`new ${i}(${ie.default.vErrors})`)) : (t.assign((0, te._)`${n}.errors`, ie.default.vErrors), o.unevaluated && sx(e), t.return((0, te._)`${ie.default.errors} === 0`));
}
function sx({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof te.Name && e.assign((0, te._)`${t}.props`, r), n instanceof te.Name && e.assign((0, te._)`${t}.items`, n);
}
function fy(e, t, r, n) {
  const { gen: i, schema: o, data: a, allErrors: s, opts: c, self: f } = e, { RULES: l } = f;
  if (o.$ref && (c.ignoreKeywordsWithRef || !(0, kr.schemaHasRulesButRef)(o, l))) {
    i.block(() => t_(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || cx(e, t), i.block(() => {
    for (const p of l.rules)
      u(p);
    u(l.post);
  });
  function u(p) {
    (0, fd.shouldUseGroup)(o, p) && (p.type ? (i.if((0, js.checkDataType)(p.type, a, c.strictNumbers)), dy(e, p), t.length === 1 && t[0] === p.type && r && (i.else(), (0, js.reportTypeError)(e)), i.endIf()) : dy(e, p), s || i.if((0, te._)`${ie.default.errors} === ${n || 0}`));
  }
}
function dy(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: i } } = e;
  i && (0, KU.assignDefaults)(e, t.type), r.block(() => {
    for (const o of t.rules)
      (0, fd.shouldUseRule)(n, o) && t_(e, o.keyword, o.definition, t.type);
  });
}
function cx(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (lx(e, t), e.opts.allowUnionTypes || ux(e, t), fx(e, e.dataTypes));
}
function lx(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      Zv(e.dataTypes, r) || dd(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), hx(e, t);
  }
}
function ux(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && dd(e, "use allowUnionTypes to allow union type keyword");
}
function fx(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const i = r[n];
    if (typeof i == "object" && (0, fd.shouldUseRule)(e.schema, i)) {
      const { type: o } = i.definition;
      o.length && !o.some((a) => dx(t, a)) && dd(e, `missing type "${o.join(",")}" for keyword "${n}"`);
    }
  }
}
function dx(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function Zv(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function hx(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    Zv(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function dd(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, kr.checkStrictMode)(e, t, e.opts.strictTypes);
}
class e_ {
  constructor(t, r, n) {
    if ((0, Fo.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, kr.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", r_(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Fo.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", ie.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, te.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, te.not)(t), void 0, r);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: r } = this;
    this.fail((0, te._)`${r} !== undefined && (${(0, te.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? $o.reportExtraError : $o.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, $o.reportError)(this, this.def.$dataError || $o.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, $o.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = te.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = te.nil, r = te.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: i, schemaType: o, def: a } = this;
    n.if((0, te.or)((0, te._)`${i} === undefined`, r)), t !== te.nil && n.assign(t, !0), (o.length || a.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== te.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: i, it: o } = this;
    return (0, te.or)(a(), s());
    function a() {
      if (n.length) {
        if (!(r instanceof te.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, te._)`${(0, js.checkDataTypes)(c, r, o.opts.strictNumbers, js.DataType.Wrong)}`;
      }
      return te.nil;
    }
    function s() {
      if (i.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: i.validateSchema });
        return (0, te._)`!${c}(${r})`;
      }
      return te.nil;
    }
  }
  subschema(t, r) {
    const n = (0, Sl.getSubschema)(this.it, t);
    (0, Sl.extendSubschemaData)(n, this.it, t), (0, Sl.extendSubschemaMode)(n, t);
    const i = { ...this.it, ...n, items: void 0, props: void 0 };
    return ex(i, r), i;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: i } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = kr.mergeEvaluated.props(i, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = kr.mergeEvaluated.items(i, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: i } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return i.if(r, () => this.mergeEvaluated(t, te.Name)), !0;
  }
}
tr.KeywordCxt = e_;
function t_(e, t, r, n) {
  const i = new e_(e, r, t);
  "code" in r ? r.code(i, n) : i.$data && r.validate ? (0, Fo.funcKeywordCode)(i, r) : "macro" in r ? (0, Fo.macroKeywordCode)(i, r) : (r.compile || r.validate) && (0, Fo.funcKeywordCode)(i, r);
}
const px = /^\/(?:[^~]|~0|~1)*$/, mx = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function r_(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let i, o;
  if (e === "")
    return ie.default.rootData;
  if (e[0] === "/") {
    if (!px.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    i = e, o = ie.default.rootData;
  } else {
    const f = mx.exec(e);
    if (!f)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const l = +f[1];
    if (i = f[2], i === "#") {
      if (l >= t)
        throw new Error(c("property/index", l));
      return n[t - l];
    }
    if (l > t)
      throw new Error(c("data", l));
    if (o = r[t - l], !i)
      return o;
  }
  let a = o;
  const s = i.split("/");
  for (const f of s)
    f && (o = (0, te._)`${o}${(0, te.getProperty)((0, kr.unescapeJsonPointer)(f))}`, a = (0, te._)`${a} && ${o}`);
  return a;
  function c(f, l) {
    return `Cannot access ${f} ${l} levels up, current level is ${t}`;
  }
}
tr.getData = r_;
var Ea = {};
Object.defineProperty(Ea, "__esModule", { value: !0 });
class yx extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
Ea.default = yx;
var Wi = {};
Object.defineProperty(Wi, "__esModule", { value: !0 });
const bl = tt;
class gx extends Error {
  constructor(t, r, n, i) {
    super(i || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, bl.resolveUrl)(t, r, n), this.missingSchema = (0, bl.normalizeId)((0, bl.getFullPath)(t, this.missingRef));
  }
}
Wi.default = gx;
var Nt = {};
Object.defineProperty(Nt, "__esModule", { value: !0 });
Nt.resolveSchema = Nt.getCompilingSchema = Nt.resolveRef = Nt.compileSchema = Nt.SchemaEnv = void 0;
const Kt = fe, $x = Ea, An = gr, Qt = tt, hy = Q, vx = tr;
class Nc {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Qt.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Nt.SchemaEnv = Nc;
function hd(e) {
  const t = n_.call(this, e);
  if (t)
    return t;
  const r = (0, Qt.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: i } = this.opts.code, { ownProperties: o } = this.opts, a = new Kt.CodeGen(this.scope, { es5: n, lines: i, ownProperties: o });
  let s;
  e.$async && (s = a.scopeValue("Error", {
    ref: $x.default,
    code: (0, Kt._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = a.scopeName("validate");
  e.validateName = c;
  const f = {
    gen: a,
    allErrors: this.opts.allErrors,
    data: An.default.data,
    parentData: An.default.parentData,
    parentDataProperty: An.default.parentDataProperty,
    dataNames: [An.default.data],
    dataPathArr: [Kt.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: a.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Kt.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: s,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Kt.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Kt._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(e), (0, vx.validateFunctionCode)(f), a.optimize(this.opts.code.optimize);
    const u = a.toString();
    l = `${a.scopeRefs(An.default.scope)}return ${u}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const h = new Function(`${An.default.self}`, `${An.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: h }), h.errors = null, h.schema = e.schema, h.schemaEnv = e, e.$async && (h.$async = !0), this.opts.code.source === !0 && (h.source = { validateName: c, validateCode: u, scopeValues: a._values }), this.opts.unevaluated) {
      const { props: v, items: _ } = f;
      h.evaluated = {
        props: v instanceof Kt.Name ? void 0 : v,
        items: _ instanceof Kt.Name ? void 0 : _,
        dynamicProps: v instanceof Kt.Name,
        dynamicItems: _ instanceof Kt.Name
      }, h.source && (h.source.evaluated = (0, Kt.stringify)(h.evaluated));
    }
    return e.validate = h, e;
  } catch (u) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), u;
  } finally {
    this._compilations.delete(e);
  }
}
Nt.compileSchema = hd;
function _x(e, t, r) {
  var n;
  r = (0, Qt.resolveUrl)(this.opts.uriResolver, t, r);
  const i = e.refs[r];
  if (i)
    return i;
  let o = Sx.call(this, e, r);
  if (o === void 0) {
    const a = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: s } = this.opts;
    a && (o = new Nc({ schema: a, schemaId: s, root: e, baseId: t }));
  }
  if (o !== void 0)
    return e.refs[r] = wx.call(this, o);
}
Nt.resolveRef = _x;
function wx(e) {
  return (0, Qt.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : hd.call(this, e);
}
function n_(e) {
  for (const t of this._compilations)
    if (Ex(t, e))
      return t;
}
Nt.getCompilingSchema = n_;
function Ex(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function Sx(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || Oc.call(this, e, t);
}
function Oc(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Qt._getFullPath)(this.opts.uriResolver, r);
  let i = (0, Qt.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === i)
    return Pl.call(this, r, e);
  const o = (0, Qt.normalizeId)(n), a = this.refs[o] || this.schemas[o];
  if (typeof a == "string") {
    const s = Oc.call(this, e, a);
    return typeof (s == null ? void 0 : s.schema) != "object" ? void 0 : Pl.call(this, r, s);
  }
  if (typeof (a == null ? void 0 : a.schema) == "object") {
    if (a.validate || hd.call(this, a), o === (0, Qt.normalizeId)(t)) {
      const { schema: s } = a, { schemaId: c } = this.opts, f = s[c];
      return f && (i = (0, Qt.resolveUrl)(this.opts.uriResolver, i, f)), new Nc({ schema: s, schemaId: c, root: e, baseId: i });
    }
    return Pl.call(this, r, a);
  }
}
Nt.resolveSchema = Oc;
const bx = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Pl(e, { baseId: t, schema: r, root: n }) {
  var i;
  if (((i = e.fragment) === null || i === void 0 ? void 0 : i[0]) !== "/")
    return;
  for (const s of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, hy.unescapeFragment)(s)];
    if (c === void 0)
      return;
    r = c;
    const f = typeof r == "object" && r[this.opts.schemaId];
    !bx.has(s) && f && (t = (0, Qt.resolveUrl)(this.opts.uriResolver, t, f));
  }
  let o;
  if (typeof r != "boolean" && r.$ref && !(0, hy.schemaHasRulesButRef)(r, this.RULES)) {
    const s = (0, Qt.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    o = Oc.call(this, n, s);
  }
  const { schemaId: a } = this.opts;
  if (o = o || new Nc({ schema: r, schemaId: a, root: n, baseId: t }), o.schema !== o.root.schema)
    return o;
}
const Px = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Tx = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Nx = "object", Ox = [
  "$data"
], Ax = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, Cx = !1, Rx = {
  $id: Px,
  description: Tx,
  type: Nx,
  required: Ox,
  properties: Ax,
  additionalProperties: Cx
};
var pd = {};
Object.defineProperty(pd, "__esModule", { value: !0 });
const i_ = hv;
i_.code = 'require("ajv/dist/runtime/uri").default';
pd.default = i_;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = tr;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = fe;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = Ea, i = Wi, o = zn, a = Nt, s = fe, c = tt, f = qe, l = Q, u = Rx, p = pd, h = (I, S) => new RegExp(I, S);
  h.code = "new RegExp";
  const v = ["removeAdditional", "useDefaults", "coerceTypes"], _ = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), g = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, m = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, E = 200;
  function N(I) {
    var S, A, b, d, $, O, w, y, j, C, X, pe, ve, be, Oe, it, _e, Me, Gt, jt, Ct, Lt, $r, vr, _r;
    const Rt = I.strict, Mt = (S = I.code) === null || S === void 0 ? void 0 : S.optimize, wr = Mt === !0 || Mt === void 0 ? 1 : Mt || 0, Mr = (b = (A = I.code) === null || A === void 0 ? void 0 : A.regExp) !== null && b !== void 0 ? b : h, bt = (d = I.uriResolver) !== null && d !== void 0 ? d : p.default;
    return {
      strictSchema: (O = ($ = I.strictSchema) !== null && $ !== void 0 ? $ : Rt) !== null && O !== void 0 ? O : !0,
      strictNumbers: (y = (w = I.strictNumbers) !== null && w !== void 0 ? w : Rt) !== null && y !== void 0 ? y : !0,
      strictTypes: (C = (j = I.strictTypes) !== null && j !== void 0 ? j : Rt) !== null && C !== void 0 ? C : "log",
      strictTuples: (pe = (X = I.strictTuples) !== null && X !== void 0 ? X : Rt) !== null && pe !== void 0 ? pe : "log",
      strictRequired: (be = (ve = I.strictRequired) !== null && ve !== void 0 ? ve : Rt) !== null && be !== void 0 ? be : !1,
      code: I.code ? { ...I.code, optimize: wr, regExp: Mr } : { optimize: wr, regExp: Mr },
      loopRequired: (Oe = I.loopRequired) !== null && Oe !== void 0 ? Oe : E,
      loopEnum: (it = I.loopEnum) !== null && it !== void 0 ? it : E,
      meta: (_e = I.meta) !== null && _e !== void 0 ? _e : !0,
      messages: (Me = I.messages) !== null && Me !== void 0 ? Me : !0,
      inlineRefs: (Gt = I.inlineRefs) !== null && Gt !== void 0 ? Gt : !0,
      schemaId: (jt = I.schemaId) !== null && jt !== void 0 ? jt : "$id",
      addUsedSchema: (Ct = I.addUsedSchema) !== null && Ct !== void 0 ? Ct : !0,
      validateSchema: (Lt = I.validateSchema) !== null && Lt !== void 0 ? Lt : !0,
      validateFormats: ($r = I.validateFormats) !== null && $r !== void 0 ? $r : !0,
      unicodeRegExp: (vr = I.unicodeRegExp) !== null && vr !== void 0 ? vr : !0,
      int32range: (_r = I.int32range) !== null && _r !== void 0 ? _r : !0,
      uriResolver: bt
    };
  }
  class R {
    constructor(S = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), S = this.opts = { ...S, ...N(S) };
      const { es5: A, lines: b } = this.opts.code;
      this.scope = new s.ValueScope({ scope: {}, prefixes: _, es5: A, lines: b }), this.logger = G(S.logger);
      const d = S.validateFormats;
      S.validateFormats = !1, this.RULES = (0, o.getRules)(), F.call(this, g, S, "NOT SUPPORTED"), F.call(this, m, S, "DEPRECATED", "warn"), this._metaOpts = K.call(this), S.formats && V.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), S.keywords && P.call(this, S.keywords), typeof S.meta == "object" && this.addMetaSchema(S.meta), L.call(this), S.validateFormats = d;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: S, meta: A, schemaId: b } = this.opts;
      let d = u;
      b === "id" && (d = { ...u }, d.id = d.$id, delete d.$id), A && S && this.addMetaSchema(d, d[b], !1);
    }
    defaultMeta() {
      const { meta: S, schemaId: A } = this.opts;
      return this.opts.defaultMeta = typeof S == "object" ? S[A] || S : void 0;
    }
    validate(S, A) {
      let b;
      if (typeof S == "string") {
        if (b = this.getSchema(S), !b)
          throw new Error(`no schema with key or ref "${S}"`);
      } else
        b = this.compile(S);
      const d = b(A);
      return "$async" in b || (this.errors = b.errors), d;
    }
    compile(S, A) {
      const b = this._addSchema(S, A);
      return b.validate || this._compileSchemaEnv(b);
    }
    compileAsync(S, A) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: b } = this.opts;
      return d.call(this, S, A);
      async function d(C, X) {
        await $.call(this, C.$schema);
        const pe = this._addSchema(C, X);
        return pe.validate || O.call(this, pe);
      }
      async function $(C) {
        C && !this.getSchema(C) && await d.call(this, { $ref: C }, !0);
      }
      async function O(C) {
        try {
          return this._compileSchemaEnv(C);
        } catch (X) {
          if (!(X instanceof i.default))
            throw X;
          return w.call(this, X), await y.call(this, X.missingSchema), O.call(this, C);
        }
      }
      function w({ missingSchema: C, missingRef: X }) {
        if (this.refs[C])
          throw new Error(`AnySchema ${C} is loaded but ${X} cannot be resolved`);
      }
      async function y(C) {
        const X = await j.call(this, C);
        this.refs[C] || await $.call(this, X.$schema), this.refs[C] || this.addSchema(X, C, A);
      }
      async function j(C) {
        const X = this._loading[C];
        if (X)
          return X;
        try {
          return await (this._loading[C] = b(C));
        } finally {
          delete this._loading[C];
        }
      }
    }
    // Adds schema to the instance
    addSchema(S, A, b, d = this.opts.validateSchema) {
      if (Array.isArray(S)) {
        for (const O of S)
          this.addSchema(O, void 0, b, d);
        return this;
      }
      let $;
      if (typeof S == "object") {
        const { schemaId: O } = this.opts;
        if ($ = S[O], $ !== void 0 && typeof $ != "string")
          throw new Error(`schema ${O} must be string`);
      }
      return A = (0, c.normalizeId)(A || $), this._checkUnique(A), this.schemas[A] = this._addSchema(S, b, A, d, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(S, A, b = this.opts.validateSchema) {
      return this.addSchema(S, A, !0, b), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(S, A) {
      if (typeof S == "boolean")
        return !0;
      let b;
      if (b = S.$schema, b !== void 0 && typeof b != "string")
        throw new Error("$schema must be a string");
      if (b = b || this.opts.defaultMeta || this.defaultMeta(), !b)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const d = this.validate(b, S);
      if (!d && A) {
        const $ = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error($);
        else
          throw new Error($);
      }
      return d;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(S) {
      let A;
      for (; typeof (A = k.call(this, S)) == "string"; )
        S = A;
      if (A === void 0) {
        const { schemaId: b } = this.opts, d = new a.SchemaEnv({ schema: {}, schemaId: b });
        if (A = a.resolveSchema.call(this, d, S), !A)
          return;
        this.refs[S] = A;
      }
      return A.validate || this._compileSchemaEnv(A);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(S) {
      if (S instanceof RegExp)
        return this._removeAllSchemas(this.schemas, S), this._removeAllSchemas(this.refs, S), this;
      switch (typeof S) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const A = k.call(this, S);
          return typeof A == "object" && this._cache.delete(A.schema), delete this.schemas[S], delete this.refs[S], this;
        }
        case "object": {
          const A = S;
          this._cache.delete(A);
          let b = S[this.opts.schemaId];
          return b && (b = (0, c.normalizeId)(b), delete this.schemas[b], delete this.refs[b]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(S) {
      for (const A of S)
        this.addKeyword(A);
      return this;
    }
    addKeyword(S, A) {
      let b;
      if (typeof S == "string")
        b = S, typeof A == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), A.keyword = b);
      else if (typeof S == "object" && A === void 0) {
        if (A = S, b = A.keyword, Array.isArray(b) && !b.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (M.call(this, b, A), !A)
        return (0, l.eachItem)(b, ($) => U.call(this, $)), this;
      x.call(this, A);
      const d = {
        ...A,
        type: (0, f.getJSONTypes)(A.type),
        schemaType: (0, f.getJSONTypes)(A.schemaType)
      };
      return (0, l.eachItem)(b, d.type.length === 0 ? ($) => U.call(this, $, d) : ($) => d.type.forEach((O) => U.call(this, $, d, O))), this;
    }
    getKeyword(S) {
      const A = this.RULES.all[S];
      return typeof A == "object" ? A.definition : !!A;
    }
    // Remove keyword
    removeKeyword(S) {
      const { RULES: A } = this;
      delete A.keywords[S], delete A.all[S];
      for (const b of A.rules) {
        const d = b.rules.findIndex(($) => $.keyword === S);
        d >= 0 && b.rules.splice(d, 1);
      }
      return this;
    }
    // Add format
    addFormat(S, A) {
      return typeof A == "string" && (A = new RegExp(A)), this.formats[S] = A, this;
    }
    errorsText(S = this.errors, { separator: A = ", ", dataVar: b = "data" } = {}) {
      return !S || S.length === 0 ? "No errors" : S.map((d) => `${b}${d.instancePath} ${d.message}`).reduce((d, $) => d + A + $);
    }
    $dataMetaSchema(S, A) {
      const b = this.RULES.all;
      S = JSON.parse(JSON.stringify(S));
      for (const d of A) {
        const $ = d.split("/").slice(1);
        let O = S;
        for (const w of $)
          O = O[w];
        for (const w in b) {
          const y = b[w];
          if (typeof y != "object")
            continue;
          const { $data: j } = y.definition, C = O[w];
          j && C && (O[w] = z(C));
        }
      }
      return S;
    }
    _removeAllSchemas(S, A) {
      for (const b in S) {
        const d = S[b];
        (!A || A.test(b)) && (typeof d == "string" ? delete S[b] : d && !d.meta && (this._cache.delete(d.schema), delete S[b]));
      }
    }
    _addSchema(S, A, b, d = this.opts.validateSchema, $ = this.opts.addUsedSchema) {
      let O;
      const { schemaId: w } = this.opts;
      if (typeof S == "object")
        O = S[w];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof S != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let y = this._cache.get(S);
      if (y !== void 0)
        return y;
      b = (0, c.normalizeId)(O || b);
      const j = c.getSchemaRefs.call(this, S, b);
      return y = new a.SchemaEnv({ schema: S, schemaId: w, meta: A, baseId: b, localRefs: j }), this._cache.set(y.schema, y), $ && !b.startsWith("#") && (b && this._checkUnique(b), this.refs[b] = y), d && this.validateSchema(S, !0), y;
    }
    _checkUnique(S) {
      if (this.schemas[S] || this.refs[S])
        throw new Error(`schema with key or id "${S}" already exists`);
    }
    _compileSchemaEnv(S) {
      if (S.meta ? this._compileMetaSchema(S) : a.compileSchema.call(this, S), !S.validate)
        throw new Error("ajv implementation error");
      return S.validate;
    }
    _compileMetaSchema(S) {
      const A = this.opts;
      this.opts = this._metaOpts;
      try {
        a.compileSchema.call(this, S);
      } finally {
        this.opts = A;
      }
    }
  }
  R.ValidationError = n.default, R.MissingRefError = i.default, e.default = R;
  function F(I, S, A, b = "error") {
    for (const d in I) {
      const $ = d;
      $ in S && this.logger[b](`${A}: option ${d}. ${I[$]}`);
    }
  }
  function k(I) {
    return I = (0, c.normalizeId)(I), this.schemas[I] || this.refs[I];
  }
  function L() {
    const I = this.opts.schemas;
    if (I)
      if (Array.isArray(I))
        this.addSchema(I);
      else
        for (const S in I)
          this.addSchema(I[S], S);
  }
  function V() {
    for (const I in this.opts.formats) {
      const S = this.opts.formats[I];
      S && this.addFormat(I, S);
    }
  }
  function P(I) {
    if (Array.isArray(I)) {
      this.addVocabulary(I);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const S in I) {
      const A = I[S];
      A.keyword || (A.keyword = S), this.addKeyword(A);
    }
  }
  function K() {
    const I = { ...this.opts };
    for (const S of v)
      delete I[S];
    return I;
  }
  const q = { log() {
  }, warn() {
  }, error() {
  } };
  function G(I) {
    if (I === !1)
      return q;
    if (I === void 0)
      return console;
    if (I.log && I.warn && I.error)
      return I;
    throw new Error("logger must implement log, warn and error methods");
  }
  const Y = /^[a-z_$][a-z0-9_$:-]*$/i;
  function M(I, S) {
    const { RULES: A } = this;
    if ((0, l.eachItem)(I, (b) => {
      if (A.keywords[b])
        throw new Error(`Keyword ${b} is already defined`);
      if (!Y.test(b))
        throw new Error(`Keyword ${b} has invalid name`);
    }), !!S && S.$data && !("code" in S || "validate" in S))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function U(I, S, A) {
    var b;
    const d = S == null ? void 0 : S.post;
    if (A && d)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: $ } = this;
    let O = d ? $.post : $.rules.find(({ type: y }) => y === A);
    if (O || (O = { type: A, rules: [] }, $.rules.push(O)), $.keywords[I] = !0, !S)
      return;
    const w = {
      keyword: I,
      definition: {
        ...S,
        type: (0, f.getJSONTypes)(S.type),
        schemaType: (0, f.getJSONTypes)(S.schemaType)
      }
    };
    S.before ? H.call(this, O, w, S.before) : O.rules.push(w), $.all[I] = w, (b = S.implements) === null || b === void 0 || b.forEach((y) => this.addKeyword(y));
  }
  function H(I, S, A) {
    const b = I.rules.findIndex((d) => d.keyword === A);
    b >= 0 ? I.rules.splice(b, 0, S) : (I.rules.push(S), this.logger.warn(`rule ${A} is not defined`));
  }
  function x(I) {
    let { metaSchema: S } = I;
    S !== void 0 && (I.$data && this.opts.$data && (S = z(S)), I.validateSchema = this.compile(S, !0));
  }
  const W = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function z(I) {
    return { anyOf: [I, W] };
  }
})(Tv);
var md = {}, yd = {}, gd = {};
Object.defineProperty(gd, "__esModule", { value: !0 });
const Ix = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
gd.default = Ix;
var Kn = {};
Object.defineProperty(Kn, "__esModule", { value: !0 });
Kn.callRef = Kn.getValidate = void 0;
const kx = Wi, py = he, Tt = fe, ci = gr, my = Nt, Qa = Q, Dx = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: i, schemaEnv: o, validateName: a, opts: s, self: c } = n, { root: f } = o;
    if ((r === "#" || r === "#/") && i === f.baseId)
      return u();
    const l = my.resolveRef.call(c, f, i, r);
    if (l === void 0)
      throw new kx.default(n.opts.uriResolver, i, r);
    if (l instanceof my.SchemaEnv)
      return p(l);
    return h(l);
    function u() {
      if (o === f)
        return ps(e, a, o, o.$async);
      const v = t.scopeValue("root", { ref: f });
      return ps(e, (0, Tt._)`${v}.validate`, f, f.$async);
    }
    function p(v) {
      const _ = o_(e, v);
      ps(e, _, v, v.$async);
    }
    function h(v) {
      const _ = t.scopeValue("schema", s.code.source === !0 ? { ref: v, code: (0, Tt.stringify)(v) } : { ref: v }), g = t.name("valid"), m = e.subschema({
        schema: v,
        dataTypes: [],
        schemaPath: Tt.nil,
        topSchemaRef: _,
        errSchemaPath: r
      }, g);
      e.mergeEvaluated(m), e.ok(g);
    }
  }
};
function o_(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Tt._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
Kn.getValidate = o_;
function ps(e, t, r, n) {
  const { gen: i, it: o } = e, { allErrors: a, schemaEnv: s, opts: c } = o, f = c.passContext ? ci.default.this : Tt.nil;
  n ? l() : u();
  function l() {
    if (!s.$async)
      throw new Error("async schema referenced by sync schema");
    const v = i.let("valid");
    i.try(() => {
      i.code((0, Tt._)`await ${(0, py.callValidateCode)(e, t, f)}`), h(t), a || i.assign(v, !0);
    }, (_) => {
      i.if((0, Tt._)`!(${_} instanceof ${o.ValidationError})`, () => i.throw(_)), p(_), a || i.assign(v, !1);
    }), e.ok(v);
  }
  function u() {
    e.result((0, py.callValidateCode)(e, t, f), () => h(t), () => p(t));
  }
  function p(v) {
    const _ = (0, Tt._)`${v}.errors`;
    i.assign(ci.default.vErrors, (0, Tt._)`${ci.default.vErrors} === null ? ${_} : ${ci.default.vErrors}.concat(${_})`), i.assign(ci.default.errors, (0, Tt._)`${ci.default.vErrors}.length`);
  }
  function h(v) {
    var _;
    if (!o.opts.unevaluated)
      return;
    const g = (_ = r == null ? void 0 : r.validate) === null || _ === void 0 ? void 0 : _.evaluated;
    if (o.props !== !0)
      if (g && !g.dynamicProps)
        g.props !== void 0 && (o.props = Qa.mergeEvaluated.props(i, g.props, o.props));
      else {
        const m = i.var("props", (0, Tt._)`${v}.evaluated.props`);
        o.props = Qa.mergeEvaluated.props(i, m, o.props, Tt.Name);
      }
    if (o.items !== !0)
      if (g && !g.dynamicItems)
        g.items !== void 0 && (o.items = Qa.mergeEvaluated.items(i, g.items, o.items));
      else {
        const m = i.var("items", (0, Tt._)`${v}.evaluated.items`);
        o.items = Qa.mergeEvaluated.items(i, m, o.items, Tt.Name);
      }
  }
}
Kn.callRef = ps;
Kn.default = Dx;
Object.defineProperty(yd, "__esModule", { value: !0 });
const Fx = gd, jx = Kn, Lx = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  Fx.default,
  jx.default
];
yd.default = Lx;
var $d = {}, vd = {};
Object.defineProperty(vd, "__esModule", { value: !0 });
const Ls = fe, Yr = Ls.operators, Ms = {
  maximum: { okStr: "<=", ok: Yr.LTE, fail: Yr.GT },
  minimum: { okStr: ">=", ok: Yr.GTE, fail: Yr.LT },
  exclusiveMaximum: { okStr: "<", ok: Yr.LT, fail: Yr.GTE },
  exclusiveMinimum: { okStr: ">", ok: Yr.GT, fail: Yr.LTE }
}, Mx = {
  message: ({ keyword: e, schemaCode: t }) => (0, Ls.str)`must be ${Ms[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Ls._)`{comparison: ${Ms[e].okStr}, limit: ${t}}`
}, Ux = {
  keyword: Object.keys(Ms),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Mx,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Ls._)`${r} ${Ms[t].fail} ${n} || isNaN(${r})`);
  }
};
vd.default = Ux;
var _d = {};
Object.defineProperty(_d, "__esModule", { value: !0 });
const jo = fe, xx = {
  message: ({ schemaCode: e }) => (0, jo.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, jo._)`{multipleOf: ${e}}`
}, qx = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: xx,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: i } = e, o = i.opts.multipleOfPrecision, a = t.let("res"), s = o ? (0, jo._)`Math.abs(Math.round(${a}) - ${a}) > 1e-${o}` : (0, jo._)`${a} !== parseInt(${a})`;
    e.fail$data((0, jo._)`(${n} === 0 || (${a} = ${r}/${n}, ${s}))`);
  }
};
_d.default = qx;
var wd = {}, Ed = {};
Object.defineProperty(Ed, "__esModule", { value: !0 });
function a_(e) {
  const t = e.length;
  let r = 0, n = 0, i;
  for (; n < t; )
    r++, i = e.charCodeAt(n++), i >= 55296 && i <= 56319 && n < t && (i = e.charCodeAt(n), (i & 64512) === 56320 && n++);
  return r;
}
Ed.default = a_;
a_.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(wd, "__esModule", { value: !0 });
const Mn = fe, Vx = Q, Hx = Ed, Gx = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Mn.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Mn._)`{limit: ${e}}`
}, Bx = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: Gx,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: i } = e, o = t === "maxLength" ? Mn.operators.GT : Mn.operators.LT, a = i.opts.unicode === !1 ? (0, Mn._)`${r}.length` : (0, Mn._)`${(0, Vx.useFunc)(e.gen, Hx.default)}(${r})`;
    e.fail$data((0, Mn._)`${a} ${o} ${n}`);
  }
};
wd.default = Bx;
var Sd = {};
Object.defineProperty(Sd, "__esModule", { value: !0 });
const zx = he, Us = fe, Kx = {
  message: ({ schemaCode: e }) => (0, Us.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Us._)`{pattern: ${e}}`
}, Wx = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: Kx,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: i, it: o } = e, a = o.opts.unicodeRegExp ? "u" : "", s = r ? (0, Us._)`(new RegExp(${i}, ${a}))` : (0, zx.usePattern)(e, n);
    e.fail$data((0, Us._)`!${s}.test(${t})`);
  }
};
Sd.default = Wx;
var bd = {};
Object.defineProperty(bd, "__esModule", { value: !0 });
const Lo = fe, Yx = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Lo.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Lo._)`{limit: ${e}}`
}, Jx = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: Yx,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxProperties" ? Lo.operators.GT : Lo.operators.LT;
    e.fail$data((0, Lo._)`Object.keys(${r}).length ${i} ${n}`);
  }
};
bd.default = Jx;
var Pd = {};
Object.defineProperty(Pd, "__esModule", { value: !0 });
const vo = he, Mo = fe, Xx = Q, Qx = {
  message: ({ params: { missingProperty: e } }) => (0, Mo.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Mo._)`{missingProperty: ${e}}`
}, Zx = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: Qx,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: i, $data: o, it: a } = e, { opts: s } = a;
    if (!o && r.length === 0)
      return;
    const c = r.length >= s.loopRequired;
    if (a.allErrors ? f() : l(), s.strictRequired) {
      const h = e.parentSchema.properties, { definedProperties: v } = e.it;
      for (const _ of r)
        if ((h == null ? void 0 : h[_]) === void 0 && !v.has(_)) {
          const g = a.schemaEnv.baseId + a.errSchemaPath, m = `required property "${_}" is not defined at "${g}" (strictRequired)`;
          (0, Xx.checkStrictMode)(a, m, a.opts.strictRequired);
        }
    }
    function f() {
      if (c || o)
        e.block$data(Mo.nil, u);
      else
        for (const h of r)
          (0, vo.checkReportMissingProp)(e, h);
    }
    function l() {
      const h = t.let("missing");
      if (c || o) {
        const v = t.let("valid", !0);
        e.block$data(v, () => p(h, v)), e.ok(v);
      } else
        t.if((0, vo.checkMissingProp)(e, r, h)), (0, vo.reportMissingProp)(e, h), t.else();
    }
    function u() {
      t.forOf("prop", n, (h) => {
        e.setParams({ missingProperty: h }), t.if((0, vo.noPropertyInData)(t, i, h, s.ownProperties), () => e.error());
      });
    }
    function p(h, v) {
      e.setParams({ missingProperty: h }), t.forOf(h, n, () => {
        t.assign(v, (0, vo.propertyInData)(t, i, h, s.ownProperties)), t.if((0, Mo.not)(v), () => {
          e.error(), t.break();
        });
      }, Mo.nil);
    }
  }
};
Pd.default = Zx;
var Td = {};
Object.defineProperty(Td, "__esModule", { value: !0 });
const Uo = fe, e3 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Uo.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Uo._)`{limit: ${e}}`
}, t3 = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: e3,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxItems" ? Uo.operators.GT : Uo.operators.LT;
    e.fail$data((0, Uo._)`${r}.length ${i} ${n}`);
  }
};
Td.default = t3;
var Nd = {}, Sa = {};
Object.defineProperty(Sa, "__esModule", { value: !0 });
const s_ = vc;
s_.code = 'require("ajv/dist/runtime/equal").default';
Sa.default = s_;
Object.defineProperty(Nd, "__esModule", { value: !0 });
const Tl = qe, Xe = fe, r3 = Q, n3 = Sa, i3 = {
  message: ({ params: { i: e, j: t } }) => (0, Xe.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Xe._)`{i: ${e}, j: ${t}}`
}, o3 = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: i3,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, parentSchema: o, schemaCode: a, it: s } = e;
    if (!n && !i)
      return;
    const c = t.let("valid"), f = o.items ? (0, Tl.getSchemaTypes)(o.items) : [];
    e.block$data(c, l, (0, Xe._)`${a} === false`), e.ok(c);
    function l() {
      const v = t.let("i", (0, Xe._)`${r}.length`), _ = t.let("j");
      e.setParams({ i: v, j: _ }), t.assign(c, !0), t.if((0, Xe._)`${v} > 1`, () => (u() ? p : h)(v, _));
    }
    function u() {
      return f.length > 0 && !f.some((v) => v === "object" || v === "array");
    }
    function p(v, _) {
      const g = t.name("item"), m = (0, Tl.checkDataTypes)(f, g, s.opts.strictNumbers, Tl.DataType.Wrong), E = t.const("indices", (0, Xe._)`{}`);
      t.for((0, Xe._)`;${v}--;`, () => {
        t.let(g, (0, Xe._)`${r}[${v}]`), t.if(m, (0, Xe._)`continue`), f.length > 1 && t.if((0, Xe._)`typeof ${g} == "string"`, (0, Xe._)`${g} += "_"`), t.if((0, Xe._)`typeof ${E}[${g}] == "number"`, () => {
          t.assign(_, (0, Xe._)`${E}[${g}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Xe._)`${E}[${g}] = ${v}`);
      });
    }
    function h(v, _) {
      const g = (0, r3.useFunc)(t, n3.default), m = t.name("outer");
      t.label(m).for((0, Xe._)`;${v}--;`, () => t.for((0, Xe._)`${_} = ${v}; ${_}--;`, () => t.if((0, Xe._)`${g}(${r}[${v}], ${r}[${_}])`, () => {
        e.error(), t.assign(c, !1).break(m);
      })));
    }
  }
};
Nd.default = o3;
var Od = {};
Object.defineProperty(Od, "__esModule", { value: !0 });
const uu = fe, a3 = Q, s3 = Sa, c3 = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, uu._)`{allowedValue: ${e}}`
}, l3 = {
  keyword: "const",
  $data: !0,
  error: c3,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: i, schema: o } = e;
    n || o && typeof o == "object" ? e.fail$data((0, uu._)`!${(0, a3.useFunc)(t, s3.default)}(${r}, ${i})`) : e.fail((0, uu._)`${o} !== ${r}`);
  }
};
Od.default = l3;
var Ad = {};
Object.defineProperty(Ad, "__esModule", { value: !0 });
const bo = fe, u3 = Q, f3 = Sa, d3 = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, bo._)`{allowedValues: ${e}}`
}, h3 = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: d3,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, schemaCode: o, it: a } = e;
    if (!n && i.length === 0)
      throw new Error("enum must have non-empty array");
    const s = i.length >= a.opts.loopEnum;
    let c;
    const f = () => c ?? (c = (0, u3.useFunc)(t, f3.default));
    let l;
    if (s || n)
      l = t.let("valid"), e.block$data(l, u);
    else {
      if (!Array.isArray(i))
        throw new Error("ajv implementation error");
      const h = t.const("vSchema", o);
      l = (0, bo.or)(...i.map((v, _) => p(h, _)));
    }
    e.pass(l);
    function u() {
      t.assign(l, !1), t.forOf("v", o, (h) => t.if((0, bo._)`${f()}(${r}, ${h})`, () => t.assign(l, !0).break()));
    }
    function p(h, v) {
      const _ = i[v];
      return typeof _ == "object" && _ !== null ? (0, bo._)`${f()}(${r}, ${h}[${v}])` : (0, bo._)`${r} === ${_}`;
    }
  }
};
Ad.default = h3;
Object.defineProperty($d, "__esModule", { value: !0 });
const p3 = vd, m3 = _d, y3 = wd, g3 = Sd, $3 = bd, v3 = Pd, _3 = Td, w3 = Nd, E3 = Od, S3 = Ad, b3 = [
  // number
  p3.default,
  m3.default,
  // string
  y3.default,
  g3.default,
  // object
  $3.default,
  v3.default,
  // array
  _3.default,
  w3.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  E3.default,
  S3.default
];
$d.default = b3;
var Cd = {}, Yi = {};
Object.defineProperty(Yi, "__esModule", { value: !0 });
Yi.validateAdditionalItems = void 0;
const Un = fe, fu = Q, P3 = {
  message: ({ params: { len: e } }) => (0, Un.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Un._)`{limit: ${e}}`
}, T3 = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: P3,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, fu.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    c_(e, n);
  }
};
function c_(e, t) {
  const { gen: r, schema: n, data: i, keyword: o, it: a } = e;
  a.items = !0;
  const s = r.const("len", (0, Un._)`${i}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Un._)`${s} <= ${t.length}`);
  else if (typeof n == "object" && !(0, fu.alwaysValidSchema)(a, n)) {
    const f = r.var("valid", (0, Un._)`${s} <= ${t.length}`);
    r.if((0, Un.not)(f), () => c(f)), e.ok(f);
  }
  function c(f) {
    r.forRange("i", t.length, s, (l) => {
      e.subschema({ keyword: o, dataProp: l, dataPropType: fu.Type.Num }, f), a.allErrors || r.if((0, Un.not)(f), () => r.break());
    });
  }
}
Yi.validateAdditionalItems = c_;
Yi.default = T3;
var Rd = {}, Ji = {};
Object.defineProperty(Ji, "__esModule", { value: !0 });
Ji.validateTuple = void 0;
const yy = fe, ms = Q, N3 = he, O3 = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return l_(e, "additionalItems", t);
    r.items = !0, !(0, ms.alwaysValidSchema)(r, t) && e.ok((0, N3.validateArray)(e));
  }
};
function l_(e, t, r = e.schema) {
  const { gen: n, parentSchema: i, data: o, keyword: a, it: s } = e;
  l(i), s.opts.unevaluated && r.length && s.items !== !0 && (s.items = ms.mergeEvaluated.items(n, r.length, s.items));
  const c = n.name("valid"), f = n.const("len", (0, yy._)`${o}.length`);
  r.forEach((u, p) => {
    (0, ms.alwaysValidSchema)(s, u) || (n.if((0, yy._)`${f} > ${p}`, () => e.subschema({
      keyword: a,
      schemaProp: p,
      dataProp: p
    }, c)), e.ok(c));
  });
  function l(u) {
    const { opts: p, errSchemaPath: h } = s, v = r.length, _ = v === u.minItems && (v === u.maxItems || u[t] === !1);
    if (p.strictTuples && !_) {
      const g = `"${a}" is ${v}-tuple, but minItems or maxItems/${t} are not specified or different at path "${h}"`;
      (0, ms.checkStrictMode)(s, g, p.strictTuples);
    }
  }
}
Ji.validateTuple = l_;
Ji.default = O3;
Object.defineProperty(Rd, "__esModule", { value: !0 });
const A3 = Ji, C3 = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, A3.validateTuple)(e, "items")
};
Rd.default = C3;
var Id = {};
Object.defineProperty(Id, "__esModule", { value: !0 });
const gy = fe, R3 = Q, I3 = he, k3 = Yi, D3 = {
  message: ({ params: { len: e } }) => (0, gy.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, gy._)`{limit: ${e}}`
}, F3 = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: D3,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: i } = r;
    n.items = !0, !(0, R3.alwaysValidSchema)(n, t) && (i ? (0, k3.validateAdditionalItems)(e, i) : e.ok((0, I3.validateArray)(e)));
  }
};
Id.default = F3;
var kd = {};
Object.defineProperty(kd, "__esModule", { value: !0 });
const Vt = fe, Za = Q, j3 = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Vt.str)`must contain at least ${e} valid item(s)` : (0, Vt.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Vt._)`{minContains: ${e}}` : (0, Vt._)`{minContains: ${e}, maxContains: ${t}}`
}, L3 = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: j3,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: o } = e;
    let a, s;
    const { minContains: c, maxContains: f } = n;
    o.opts.next ? (a = c === void 0 ? 1 : c, s = f) : a = 1;
    const l = t.const("len", (0, Vt._)`${i}.length`);
    if (e.setParams({ min: a, max: s }), s === void 0 && a === 0) {
      (0, Za.checkStrictMode)(o, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (s !== void 0 && a > s) {
      (0, Za.checkStrictMode)(o, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, Za.alwaysValidSchema)(o, r)) {
      let _ = (0, Vt._)`${l} >= ${a}`;
      s !== void 0 && (_ = (0, Vt._)`${_} && ${l} <= ${s}`), e.pass(_);
      return;
    }
    o.items = !0;
    const u = t.name("valid");
    s === void 0 && a === 1 ? h(u, () => t.if(u, () => t.break())) : a === 0 ? (t.let(u, !0), s !== void 0 && t.if((0, Vt._)`${i}.length > 0`, p)) : (t.let(u, !1), p()), e.result(u, () => e.reset());
    function p() {
      const _ = t.name("_valid"), g = t.let("count", 0);
      h(_, () => t.if(_, () => v(g)));
    }
    function h(_, g) {
      t.forRange("i", 0, l, (m) => {
        e.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: Za.Type.Num,
          compositeRule: !0
        }, _), g();
      });
    }
    function v(_) {
      t.code((0, Vt._)`${_}++`), s === void 0 ? t.if((0, Vt._)`${_} >= ${a}`, () => t.assign(u, !0).break()) : (t.if((0, Vt._)`${_} > ${s}`, () => t.assign(u, !1).break()), a === 1 ? t.assign(u, !0) : t.if((0, Vt._)`${_} >= ${a}`, () => t.assign(u, !0)));
    }
  }
};
kd.default = L3;
var u_ = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = fe, r = Q, n = he;
  e.error = {
    message: ({ params: { property: c, depsCount: f, deps: l } }) => {
      const u = f === 1 ? "property" : "properties";
      return (0, t.str)`must have ${u} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: f, deps: l, missingProperty: u } }) => (0, t._)`{property: ${c},
    missingProperty: ${u},
    depsCount: ${f},
    deps: ${l}}`
    // TODO change to reference
  };
  const i = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [f, l] = o(c);
      a(c, f), s(c, l);
    }
  };
  function o({ schema: c }) {
    const f = {}, l = {};
    for (const u in c) {
      if (u === "__proto__")
        continue;
      const p = Array.isArray(c[u]) ? f : l;
      p[u] = c[u];
    }
    return [f, l];
  }
  function a(c, f = c.schema) {
    const { gen: l, data: u, it: p } = c;
    if (Object.keys(f).length === 0)
      return;
    const h = l.let("missing");
    for (const v in f) {
      const _ = f[v];
      if (_.length === 0)
        continue;
      const g = (0, n.propertyInData)(l, u, v, p.opts.ownProperties);
      c.setParams({
        property: v,
        depsCount: _.length,
        deps: _.join(", ")
      }), p.allErrors ? l.if(g, () => {
        for (const m of _)
          (0, n.checkReportMissingProp)(c, m);
      }) : (l.if((0, t._)`${g} && (${(0, n.checkMissingProp)(c, _, h)})`), (0, n.reportMissingProp)(c, h), l.else());
    }
  }
  e.validatePropertyDeps = a;
  function s(c, f = c.schema) {
    const { gen: l, data: u, keyword: p, it: h } = c, v = l.name("valid");
    for (const _ in f)
      (0, r.alwaysValidSchema)(h, f[_]) || (l.if(
        (0, n.propertyInData)(l, u, _, h.opts.ownProperties),
        () => {
          const g = c.subschema({ keyword: p, schemaProp: _ }, v);
          c.mergeValidEvaluated(g, v);
        },
        () => l.var(v, !0)
        // TODO var
      ), c.ok(v));
  }
  e.validateSchemaDeps = s, e.default = i;
})(u_);
var Dd = {};
Object.defineProperty(Dd, "__esModule", { value: !0 });
const f_ = fe, M3 = Q, U3 = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, f_._)`{propertyName: ${e.propertyName}}`
}, x3 = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: U3,
  code(e) {
    const { gen: t, schema: r, data: n, it: i } = e;
    if ((0, M3.alwaysValidSchema)(i, r))
      return;
    const o = t.name("valid");
    t.forIn("key", n, (a) => {
      e.setParams({ propertyName: a }), e.subschema({
        keyword: "propertyNames",
        data: a,
        dataTypes: ["string"],
        propertyName: a,
        compositeRule: !0
      }, o), t.if((0, f_.not)(o), () => {
        e.error(!0), i.allErrors || t.break();
      });
    }), e.ok(o);
  }
};
Dd.default = x3;
var Ac = {};
Object.defineProperty(Ac, "__esModule", { value: !0 });
const es = he, Yt = fe, q3 = gr, ts = Q, V3 = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Yt._)`{additionalProperty: ${e.additionalProperty}}`
}, H3 = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: V3,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, errsCount: o, it: a } = e;
    if (!o)
      throw new Error("ajv implementation error");
    const { allErrors: s, opts: c } = a;
    if (a.props = !0, c.removeAdditional !== "all" && (0, ts.alwaysValidSchema)(a, r))
      return;
    const f = (0, es.allSchemaProperties)(n.properties), l = (0, es.allSchemaProperties)(n.patternProperties);
    u(), e.ok((0, Yt._)`${o} === ${q3.default.errors}`);
    function u() {
      t.forIn("key", i, (g) => {
        !f.length && !l.length ? v(g) : t.if(p(g), () => v(g));
      });
    }
    function p(g) {
      let m;
      if (f.length > 8) {
        const E = (0, ts.schemaRefOrVal)(a, n.properties, "properties");
        m = (0, es.isOwnProperty)(t, E, g);
      } else f.length ? m = (0, Yt.or)(...f.map((E) => (0, Yt._)`${g} === ${E}`)) : m = Yt.nil;
      return l.length && (m = (0, Yt.or)(m, ...l.map((E) => (0, Yt._)`${(0, es.usePattern)(e, E)}.test(${g})`))), (0, Yt.not)(m);
    }
    function h(g) {
      t.code((0, Yt._)`delete ${i}[${g}]`);
    }
    function v(g) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        h(g);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: g }), e.error(), s || t.break();
        return;
      }
      if (typeof r == "object" && !(0, ts.alwaysValidSchema)(a, r)) {
        const m = t.name("valid");
        c.removeAdditional === "failing" ? (_(g, m, !1), t.if((0, Yt.not)(m), () => {
          e.reset(), h(g);
        })) : (_(g, m), s || t.if((0, Yt.not)(m), () => t.break()));
      }
    }
    function _(g, m, E) {
      const N = {
        keyword: "additionalProperties",
        dataProp: g,
        dataPropType: ts.Type.Str
      };
      E === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, m);
    }
  }
};
Ac.default = H3;
var Fd = {};
Object.defineProperty(Fd, "__esModule", { value: !0 });
const G3 = tr, $y = he, Nl = Q, vy = Ac, B3 = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: o } = e;
    o.opts.removeAdditional === "all" && n.additionalProperties === void 0 && vy.default.code(new G3.KeywordCxt(o, vy.default, "additionalProperties"));
    const a = (0, $y.allSchemaProperties)(r);
    for (const u of a)
      o.definedProperties.add(u);
    o.opts.unevaluated && a.length && o.props !== !0 && (o.props = Nl.mergeEvaluated.props(t, (0, Nl.toHash)(a), o.props));
    const s = a.filter((u) => !(0, Nl.alwaysValidSchema)(o, r[u]));
    if (s.length === 0)
      return;
    const c = t.name("valid");
    for (const u of s)
      f(u) ? l(u) : (t.if((0, $y.propertyInData)(t, i, u, o.opts.ownProperties)), l(u), o.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(u), e.ok(c);
    function f(u) {
      return o.opts.useDefaults && !o.compositeRule && r[u].default !== void 0;
    }
    function l(u) {
      e.subschema({
        keyword: "properties",
        schemaProp: u,
        dataProp: u
      }, c);
    }
  }
};
Fd.default = B3;
var jd = {};
Object.defineProperty(jd, "__esModule", { value: !0 });
const _y = he, rs = fe, wy = Q, Ey = Q, z3 = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: i, it: o } = e, { opts: a } = o, s = (0, _y.allSchemaProperties)(r), c = s.filter((_) => (0, wy.alwaysValidSchema)(o, r[_]));
    if (s.length === 0 || c.length === s.length && (!o.opts.unevaluated || o.props === !0))
      return;
    const f = a.strictSchema && !a.allowMatchingProperties && i.properties, l = t.name("valid");
    o.props !== !0 && !(o.props instanceof rs.Name) && (o.props = (0, Ey.evaluatedPropsToName)(t, o.props));
    const { props: u } = o;
    p();
    function p() {
      for (const _ of s)
        f && h(_), o.allErrors ? v(_) : (t.var(l, !0), v(_), t.if(l));
    }
    function h(_) {
      for (const g in f)
        new RegExp(_).test(g) && (0, wy.checkStrictMode)(o, `property ${g} matches pattern ${_} (use allowMatchingProperties)`);
    }
    function v(_) {
      t.forIn("key", n, (g) => {
        t.if((0, rs._)`${(0, _y.usePattern)(e, _)}.test(${g})`, () => {
          const m = c.includes(_);
          m || e.subschema({
            keyword: "patternProperties",
            schemaProp: _,
            dataProp: g,
            dataPropType: Ey.Type.Str
          }, l), o.opts.unevaluated && u !== !0 ? t.assign((0, rs._)`${u}[${g}]`, !0) : !m && !o.allErrors && t.if((0, rs.not)(l), () => t.break());
        });
      });
    }
  }
};
jd.default = z3;
var Ld = {};
Object.defineProperty(Ld, "__esModule", { value: !0 });
const K3 = Q, W3 = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, K3.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const i = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, i), e.failResult(i, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
Ld.default = W3;
var Md = {};
Object.defineProperty(Md, "__esModule", { value: !0 });
const Y3 = he, J3 = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Y3.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Md.default = J3;
var Ud = {};
Object.defineProperty(Ud, "__esModule", { value: !0 });
const ys = fe, X3 = Q, Q3 = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, ys._)`{passingSchemas: ${e.passing}}`
}, Z3 = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Q3,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: i } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (i.opts.discriminator && n.discriminator)
      return;
    const o = r, a = t.let("valid", !1), s = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: s }), t.block(f), e.result(a, () => e.reset(), () => e.error(!0));
    function f() {
      o.forEach((l, u) => {
        let p;
        (0, X3.alwaysValidSchema)(i, l) ? t.var(c, !0) : p = e.subschema({
          keyword: "oneOf",
          schemaProp: u,
          compositeRule: !0
        }, c), u > 0 && t.if((0, ys._)`${c} && ${a}`).assign(a, !1).assign(s, (0, ys._)`[${s}, ${u}]`).else(), t.if(c, () => {
          t.assign(a, !0), t.assign(s, u), p && e.mergeEvaluated(p, ys.Name);
        });
      });
    }
  }
};
Ud.default = Z3;
var xd = {};
Object.defineProperty(xd, "__esModule", { value: !0 });
const e9 = Q, t9 = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const i = t.name("valid");
    r.forEach((o, a) => {
      if ((0, e9.alwaysValidSchema)(n, o))
        return;
      const s = e.subschema({ keyword: "allOf", schemaProp: a }, i);
      e.ok(i), e.mergeEvaluated(s);
    });
  }
};
xd.default = t9;
var qd = {};
Object.defineProperty(qd, "__esModule", { value: !0 });
const xs = fe, d_ = Q, r9 = {
  message: ({ params: e }) => (0, xs.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, xs._)`{failingKeyword: ${e.ifClause}}`
}, n9 = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: r9,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, d_.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const i = Sy(n, "then"), o = Sy(n, "else");
    if (!i && !o)
      return;
    const a = t.let("valid", !0), s = t.name("_valid");
    if (c(), e.reset(), i && o) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(s, f("then", l), f("else", l));
    } else i ? t.if(s, f("then")) : t.if((0, xs.not)(s), f("else"));
    e.pass(a, () => e.error(!0));
    function c() {
      const l = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, s);
      e.mergeEvaluated(l);
    }
    function f(l, u) {
      return () => {
        const p = e.subschema({ keyword: l }, s);
        t.assign(a, s), e.mergeValidEvaluated(p, a), u ? t.assign(u, (0, xs._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function Sy(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, d_.alwaysValidSchema)(e, r);
}
qd.default = n9;
var Vd = {};
Object.defineProperty(Vd, "__esModule", { value: !0 });
const i9 = Q, o9 = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, i9.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Vd.default = o9;
Object.defineProperty(Cd, "__esModule", { value: !0 });
const a9 = Yi, s9 = Rd, c9 = Ji, l9 = Id, u9 = kd, f9 = u_, d9 = Dd, h9 = Ac, p9 = Fd, m9 = jd, y9 = Ld, g9 = Md, $9 = Ud, v9 = xd, _9 = qd, w9 = Vd;
function E9(e = !1) {
  const t = [
    // any
    y9.default,
    g9.default,
    $9.default,
    v9.default,
    _9.default,
    w9.default,
    // object
    d9.default,
    h9.default,
    f9.default,
    p9.default,
    m9.default
  ];
  return e ? t.push(s9.default, l9.default) : t.push(a9.default, c9.default), t.push(u9.default), t;
}
Cd.default = E9;
var Hd = {}, Gd = {};
Object.defineProperty(Gd, "__esModule", { value: !0 });
const je = fe, S9 = {
  message: ({ schemaCode: e }) => (0, je.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, je._)`{format: ${e}}`
}, b9 = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: S9,
  code(e, t) {
    const { gen: r, data: n, $data: i, schema: o, schemaCode: a, it: s } = e, { opts: c, errSchemaPath: f, schemaEnv: l, self: u } = s;
    if (!c.validateFormats)
      return;
    i ? p() : h();
    function p() {
      const v = r.scopeValue("formats", {
        ref: u.formats,
        code: c.code.formats
      }), _ = r.const("fDef", (0, je._)`${v}[${a}]`), g = r.let("fType"), m = r.let("format");
      r.if((0, je._)`typeof ${_} == "object" && !(${_} instanceof RegExp)`, () => r.assign(g, (0, je._)`${_}.type || "string"`).assign(m, (0, je._)`${_}.validate`), () => r.assign(g, (0, je._)`"string"`).assign(m, _)), e.fail$data((0, je.or)(E(), N()));
      function E() {
        return c.strictSchema === !1 ? je.nil : (0, je._)`${a} && !${m}`;
      }
      function N() {
        const R = l.$async ? (0, je._)`(${_}.async ? await ${m}(${n}) : ${m}(${n}))` : (0, je._)`${m}(${n})`, F = (0, je._)`(typeof ${m} == "function" ? ${R} : ${m}.test(${n}))`;
        return (0, je._)`${m} && ${m} !== true && ${g} === ${t} && !${F}`;
      }
    }
    function h() {
      const v = u.formats[o];
      if (!v) {
        E();
        return;
      }
      if (v === !0)
        return;
      const [_, g, m] = N(v);
      _ === t && e.pass(R());
      function E() {
        if (c.strictSchema === !1) {
          u.logger.warn(F());
          return;
        }
        throw new Error(F());
        function F() {
          return `unknown format "${o}" ignored in schema at path "${f}"`;
        }
      }
      function N(F) {
        const k = F instanceof RegExp ? (0, je.regexpCode)(F) : c.code.formats ? (0, je._)`${c.code.formats}${(0, je.getProperty)(o)}` : void 0, L = r.scopeValue("formats", { key: o, ref: F, code: k });
        return typeof F == "object" && !(F instanceof RegExp) ? [F.type || "string", F.validate, (0, je._)`${L}.validate`] : ["string", F, L];
      }
      function R() {
        if (typeof v == "object" && !(v instanceof RegExp) && v.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, je._)`await ${m}(${n})`;
        }
        return typeof g == "function" ? (0, je._)`${m}(${n})` : (0, je._)`${m}.test(${n})`;
      }
    }
  }
};
Gd.default = b9;
Object.defineProperty(Hd, "__esModule", { value: !0 });
const P9 = Gd, T9 = [P9.default];
Hd.default = T9;
var Fi = {};
Object.defineProperty(Fi, "__esModule", { value: !0 });
Fi.contentVocabulary = Fi.metadataVocabulary = void 0;
Fi.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Fi.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(md, "__esModule", { value: !0 });
const N9 = yd, O9 = $d, A9 = Cd, C9 = Hd, by = Fi, R9 = [
  N9.default,
  O9.default,
  (0, A9.default)(),
  C9.default,
  by.metadataVocabulary,
  by.contentVocabulary
];
md.default = R9;
var Bd = {}, Cc = {};
Object.defineProperty(Cc, "__esModule", { value: !0 });
Cc.DiscrError = void 0;
var Py;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Py || (Cc.DiscrError = Py = {}));
Object.defineProperty(Bd, "__esModule", { value: !0 });
const di = fe, du = Cc, Ty = Nt, I9 = Wi, k9 = Q, D9 = {
  message: ({ params: { discrError: e, tagName: t } }) => e === du.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, di._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, F9 = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: D9,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: i, it: o } = e, { oneOf: a } = i;
    if (!o.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const s = n.propertyName;
    if (typeof s != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!a)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), f = t.const("tag", (0, di._)`${r}${(0, di.getProperty)(s)}`);
    t.if((0, di._)`typeof ${f} == "string"`, () => l(), () => e.error(!1, { discrError: du.DiscrError.Tag, tag: f, tagName: s })), e.ok(c);
    function l() {
      const h = p();
      t.if(!1);
      for (const v in h)
        t.elseIf((0, di._)`${f} === ${v}`), t.assign(c, u(h[v]));
      t.else(), e.error(!1, { discrError: du.DiscrError.Mapping, tag: f, tagName: s }), t.endIf();
    }
    function u(h) {
      const v = t.name("valid"), _ = e.subschema({ keyword: "oneOf", schemaProp: h }, v);
      return e.mergeEvaluated(_, di.Name), v;
    }
    function p() {
      var h;
      const v = {}, _ = m(i);
      let g = !0;
      for (let R = 0; R < a.length; R++) {
        let F = a[R];
        if (F != null && F.$ref && !(0, k9.schemaHasRulesButRef)(F, o.self.RULES)) {
          const L = F.$ref;
          if (F = Ty.resolveRef.call(o.self, o.schemaEnv.root, o.baseId, L), F instanceof Ty.SchemaEnv && (F = F.schema), F === void 0)
            throw new I9.default(o.opts.uriResolver, o.baseId, L);
        }
        const k = (h = F == null ? void 0 : F.properties) === null || h === void 0 ? void 0 : h[s];
        if (typeof k != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${s}"`);
        g = g && (_ || m(F)), E(k, R);
      }
      if (!g)
        throw new Error(`discriminator: "${s}" must be required`);
      return v;
      function m({ required: R }) {
        return Array.isArray(R) && R.includes(s);
      }
      function E(R, F) {
        if (R.const)
          N(R.const, F);
        else if (R.enum)
          for (const k of R.enum)
            N(k, F);
        else
          throw new Error(`discriminator: "properties/${s}" must have "const" or "enum"`);
      }
      function N(R, F) {
        if (typeof R != "string" || R in v)
          throw new Error(`discriminator: "${s}" values must be unique strings`);
        v[R] = F;
      }
    }
  }
};
Bd.default = F9;
const j9 = "http://json-schema.org/draft-07/schema#", L9 = "http://json-schema.org/draft-07/schema#", M9 = "Core schema meta-schema", U9 = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, x9 = [
  "object",
  "boolean"
], q9 = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, V9 = {
  $schema: j9,
  $id: L9,
  title: M9,
  definitions: U9,
  type: x9,
  properties: q9,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Tv, n = md, i = Bd, o = V9, a = ["/properties"], s = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((v) => this.addVocabulary(v)), this.opts.discriminator && this.addKeyword(i.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const v = this.opts.$data ? this.$dataMetaSchema(o, a) : o;
      this.addMetaSchema(v, s, !1), this.refs["http://json-schema.org/schema"] = s;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(s) ? s : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var f = tr;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return f.KeywordCxt;
  } });
  var l = fe;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return l._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return l.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return l.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return l.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return l.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return l.CodeGen;
  } });
  var u = Ea;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return u.default;
  } });
  var p = Wi;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return p.default;
  } });
})(ou, ou.exports);
var H9 = ou.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = H9, r = fe, n = r.operators, i = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, o = {
    message: ({ keyword: s, schemaCode: c }) => (0, r.str)`should be ${i[s].okStr} ${c}`,
    params: ({ keyword: s, schemaCode: c }) => (0, r._)`{comparison: ${i[s].okStr}, limit: ${c}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(i),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: o,
    code(s) {
      const { gen: c, data: f, schemaCode: l, keyword: u, it: p } = s, { opts: h, self: v } = p;
      if (!h.validateFormats)
        return;
      const _ = new t.KeywordCxt(p, v.RULES.all.format.definition, "format");
      _.$data ? g() : m();
      function g() {
        const N = c.scopeValue("formats", {
          ref: v.formats,
          code: h.code.formats
        }), R = c.const("fmt", (0, r._)`${N}[${_.schemaCode}]`);
        s.fail$data((0, r.or)((0, r._)`typeof ${R} != "object"`, (0, r._)`${R} instanceof RegExp`, (0, r._)`typeof ${R}.compare != "function"`, E(R)));
      }
      function m() {
        const N = _.schema, R = v.formats[N];
        if (!R || R === !0)
          return;
        if (typeof R != "object" || R instanceof RegExp || typeof R.compare != "function")
          throw new Error(`"${u}": format "${N}" does not define "compare" function`);
        const F = c.scopeValue("formats", {
          key: N,
          ref: R,
          code: h.code.formats ? (0, r._)`${h.code.formats}${(0, r.getProperty)(N)}` : void 0
        });
        s.fail$data(E(F));
      }
      function E(N) {
        return (0, r._)`${N}.compare(${f}, ${l}) ${i[u].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const a = (s) => (s.addKeyword(e.formatLimitDefinition), s);
  e.default = a;
})(Pv);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = bv, n = Pv, i = fe, o = new i.Name("fullFormats"), a = new i.Name("fastFormats"), s = (f, l = { keywords: !0 }) => {
    if (Array.isArray(l))
      return c(f, l, r.fullFormats, o), f;
    const [u, p] = l.mode === "fast" ? [r.fastFormats, a] : [r.fullFormats, o], h = l.formats || r.formatNames;
    return c(f, h, u, p), l.keywords && (0, n.default)(f), f;
  };
  s.get = (f, l = "full") => {
    const p = (l === "fast" ? r.fastFormats : r.fullFormats)[f];
    if (!p)
      throw new Error(`Unknown format "${f}"`);
    return p;
  };
  function c(f, l, u, p) {
    var h, v;
    (h = (v = f.opts.code).formats) !== null && h !== void 0 || (v.formats = (0, i._)`require("ajv-formats/dist/formats").${p}`);
    for (const _ of l)
      f.addFormat(_, u[_]);
  }
  e.exports = t = s, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = s;
})(iu, iu.exports);
var G9 = iu.exports;
const B9 = /* @__PURE__ */ zs(G9), z9 = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const i = Object.getOwnPropertyDescriptor(e, r), o = Object.getOwnPropertyDescriptor(t, r);
  !K9(i, o) && n || Object.defineProperty(e, r, o);
}, K9 = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, W9 = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, Y9 = (e, t) => `/* Wrapped ${e}*/
${t}`, J9 = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), X9 = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), Q9 = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, i = Y9.bind(null, n, t.toString());
  Object.defineProperty(i, "name", X9);
  const { writable: o, enumerable: a, configurable: s } = J9;
  Object.defineProperty(e, "toString", { value: i, writable: o, enumerable: a, configurable: s });
};
function Z9(e, t, { ignoreNonConfigurable: r = !1 } = {}) {
  const { name: n } = e;
  for (const i of Reflect.ownKeys(t))
    z9(e, t, i, r);
  return W9(e, t), Q9(e, t, n), e;
}
const Ny = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: r = 0,
    maxWait: n = Number.POSITIVE_INFINITY,
    before: i = !1,
    after: o = !0
  } = t;
  if (r < 0 || n < 0)
    throw new RangeError("`wait` and `maxWait` must not be negative.");
  if (!i && !o)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let a, s, c;
  const f = function(...l) {
    const u = this, p = () => {
      a = void 0, s && (clearTimeout(s), s = void 0), o && (c = e.apply(u, l));
    }, h = () => {
      s = void 0, a && (clearTimeout(a), a = void 0), o && (c = e.apply(u, l));
    }, v = i && !a;
    return clearTimeout(a), a = setTimeout(p, r), n > 0 && n !== Number.POSITIVE_INFINITY && !s && (s = setTimeout(h, n)), v && (c = e.apply(u, l)), c;
  };
  return Z9(f, e), f.cancel = () => {
    a && (clearTimeout(a), a = void 0), s && (clearTimeout(s), s = void 0);
  }, f;
}, eq = Object.prototype.toString, tq = "[object Uint8Array]", rq = "[object ArrayBuffer]";
function h_(e, t, r) {
  return e ? e.constructor === t ? !0 : eq.call(e) === r : !1;
}
function p_(e) {
  return h_(e, Uint8Array, tq);
}
function nq(e) {
  return h_(e, ArrayBuffer, rq);
}
function iq(e) {
  return p_(e) || nq(e);
}
function oq(e) {
  if (!p_(e))
    throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof e}\``);
}
function aq(e) {
  if (!iq(e))
    throw new TypeError(`Expected \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof e}\``);
}
function Oy(e, t) {
  if (e.length === 0)
    return new Uint8Array(0);
  t ?? (t = e.reduce((i, o) => i + o.length, 0));
  const r = new Uint8Array(t);
  let n = 0;
  for (const i of e)
    oq(i), r.set(i, n), n += i.length;
  return r;
}
const ns = {
  utf8: new globalThis.TextDecoder("utf8")
};
function Ay(e, t = "utf8") {
  return aq(e), ns[t] ?? (ns[t] = new globalThis.TextDecoder(t)), ns[t].decode(e);
}
function sq(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected \`string\`, got \`${typeof e}\``);
}
const cq = new globalThis.TextEncoder();
function Ol(e) {
  return sq(e), cq.encode(e);
}
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
const lq = B9.default, Cy = "aes-256-cbc", li = () => /* @__PURE__ */ Object.create(null), uq = (e) => e != null, fq = (e, t) => {
  const r = /* @__PURE__ */ new Set([
    "undefined",
    "symbol",
    "function"
  ]), n = typeof t;
  if (r.has(n))
    throw new TypeError(`Setting a value of type \`${n}\` for key \`${e}\` is not allowed as it's not supported by JSON`);
}, gs = "__internal__", Al = `${gs}.migrations.version`;
var tn, Nr, Dt, Or;
class dq {
  constructor(t = {}) {
    to(this, "path");
    to(this, "events");
    ro(this, tn);
    ro(this, Nr);
    ro(this, Dt);
    ro(this, Or, {});
    to(this, "_deserialize", (t) => JSON.parse(t));
    to(this, "_serialize", (t) => JSON.stringify(t, void 0, "	"));
    const r = {
      configName: "config",
      fileExtension: "json",
      projectSuffix: "nodejs",
      clearInvalidConfig: !1,
      accessPropertiesByDotNotation: !0,
      configFileMode: 438,
      ...t
    };
    if (!r.cwd) {
      if (!r.projectName)
        throw new Error("Please specify the `projectName` option.");
      r.cwd = TI(r.projectName, { suffix: r.projectSuffix }).config;
    }
    if (no(this, Dt, r), r.schema ?? r.ajvOptions ?? r.rootSchema) {
      if (r.schema && typeof r.schema != "object")
        throw new TypeError("The `schema` option must be an object.");
      const a = new IM.Ajv2020({
        allErrors: !0,
        useDefaults: !0,
        ...r.ajvOptions
      });
      lq(a);
      const s = {
        ...r.rootSchema,
        type: "object",
        properties: r.schema
      };
      no(this, tn, a.compile(s));
      for (const [c, f] of Object.entries(r.schema ?? {}))
        f != null && f.default && (Ae(this, Or)[c] = f.default);
    }
    r.defaults && no(this, Or, {
      ...Ae(this, Or),
      ...r.defaults
    }), r.serialize && (this._serialize = r.serialize), r.deserialize && (this._deserialize = r.deserialize), this.events = new EventTarget(), no(this, Nr, r.encryptionKey);
    const n = r.fileExtension ? `.${r.fileExtension}` : "";
    this.path = oe.resolve(r.cwd, `${r.configName ?? "config"}${n}`);
    const i = this.store, o = Object.assign(li(), r.defaults, i);
    if (r.migrations) {
      if (!r.projectVersion)
        throw new Error("Please specify the `projectVersion` option.");
      this._migrate(r.migrations, r.projectVersion, r.beforeEachMigration);
    }
    this._validate(o);
    try {
      Lw.deepEqual(i, o);
    } catch {
      this.store = o;
    }
    r.watch && this._watch();
  }
  get(t, r) {
    if (Ae(this, Dt).accessPropertiesByDotNotation)
      return this._get(t, r);
    const { store: n } = this;
    return t in n ? n[t] : r;
  }
  set(t, r) {
    if (typeof t != "string" && typeof t != "object")
      throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof t}`);
    if (typeof t != "object" && r === void 0)
      throw new TypeError("Use `delete()` to clear values");
    if (this._containsReservedKey(t))
      throw new TypeError(`Please don't use the ${gs} key, as it's used to manage this module internal operations.`);
    const { store: n } = this, i = (o, a) => {
      fq(o, a), Ae(this, Dt).accessPropertiesByDotNotation ? Sm(n, o, a) : n[o] = a;
    };
    if (typeof t == "object") {
      const o = t;
      for (const [a, s] of Object.entries(o))
        i(a, s);
    } else
      i(t, r);
    this.store = n;
  }
  /**
      Check if an item exists.
  
      @param key - The key of the item to check.
      */
  has(t) {
    return Ae(this, Dt).accessPropertiesByDotNotation ? EI(this.store, t) : t in this.store;
  }
  /**
      Reset items to their default values, as defined by the `defaults` or `schema` option.
  
      @see `clear()` to reset all items.
  
      @param keys - The keys of the items to reset.
      */
  reset(...t) {
    for (const r of t)
      uq(Ae(this, Or)[r]) && this.set(r, Ae(this, Or)[r]);
  }
  delete(t) {
    const { store: r } = this;
    Ae(this, Dt).accessPropertiesByDotNotation ? wI(r, t) : delete r[t], this.store = r;
  }
  /**
      Delete all items.
  
      This resets known items to their default values, if defined by the `defaults` or `schema` option.
      */
  clear() {
    this.store = li();
    for (const t of Object.keys(Ae(this, Or)))
      this.reset(t);
  }
  /**
      Watches the given `key`, calling `callback` on any changes.
  
      @param key - The key to watch.
      @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      @returns A function, that when called, will unsubscribe.
      */
  onDidChange(t, r) {
    if (typeof t != "string")
      throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof t}`);
    if (typeof r != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof r}`);
    return this._handleChange(() => this.get(t), r);
  }
  /**
      Watches the whole config object, calling `callback` on any changes.
  
      @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      @returns A function, that when called, will unsubscribe.
      */
  onDidAnyChange(t) {
    if (typeof t != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof t}`);
    return this._handleChange(() => this.store, t);
  }
  get size() {
    return Object.keys(this.store).length;
  }
  get store() {
    try {
      const t = ue.readFileSync(this.path, Ae(this, Nr) ? null : "utf8"), r = this._encryptData(t), n = this._deserialize(r);
      return this._validate(n), Object.assign(li(), n);
    } catch (t) {
      if ((t == null ? void 0 : t.code) === "ENOENT")
        return this._ensureDirectory(), li();
      if (Ae(this, Dt).clearInvalidConfig && t.name === "SyntaxError")
        return li();
      throw t;
    }
  }
  set store(t) {
    this._ensureDirectory(), this._validate(t), this._write(t), this.events.dispatchEvent(new Event("change"));
  }
  *[Symbol.iterator]() {
    for (const [t, r] of Object.entries(this.store))
      yield [t, r];
  }
  _encryptData(t) {
    if (!Ae(this, Nr))
      return typeof t == "string" ? t : Ay(t);
    try {
      const r = t.slice(0, 16), n = io.pbkdf2Sync(Ae(this, Nr), r.toString(), 1e4, 32, "sha512"), i = io.createDecipheriv(Cy, n, r), o = t.slice(17), a = typeof o == "string" ? Ol(o) : o;
      return Ay(Oy([i.update(a), i.final()]));
    } catch {
    }
    return t.toString();
  }
  _handleChange(t, r) {
    let n = t();
    const i = () => {
      const o = n, a = t();
      jw(a, o) || (n = a, r.call(this, a, o));
    };
    return this.events.addEventListener("change", i), () => {
      this.events.removeEventListener("change", i);
    };
  }
  _validate(t) {
    if (!Ae(this, tn) || Ae(this, tn).call(this, t) || !Ae(this, tn).errors)
      return;
    const n = Ae(this, tn).errors.map(({ instancePath: i, message: o = "" }) => `\`${i.slice(1)}\` ${o}`);
    throw new Error("Config schema violation: " + n.join("; "));
  }
  _ensureDirectory() {
    ue.mkdirSync(oe.dirname(this.path), { recursive: !0 });
  }
  _write(t) {
    let r = this._serialize(t);
    if (Ae(this, Nr)) {
      const n = io.randomBytes(16), i = io.pbkdf2Sync(Ae(this, Nr), n.toString(), 1e4, 32, "sha512"), o = io.createCipheriv(Cy, i, n);
      r = Oy([n, Ol(":"), o.update(Ol(r)), o.final()]);
    }
    if (Ve.env.SNAP)
      ue.writeFileSync(this.path, r, { mode: Ae(this, Dt).configFileMode });
    else
      try {
        T$(this.path, r, { mode: Ae(this, Dt).configFileMode });
      } catch (n) {
        if ((n == null ? void 0 : n.code) === "EXDEV") {
          ue.writeFileSync(this.path, r, { mode: Ae(this, Dt).configFileMode });
          return;
        }
        throw n;
      }
  }
  _watch() {
    this._ensureDirectory(), ue.existsSync(this.path) || this._write(li()), Ve.platform === "win32" ? ue.watch(this.path, { persistent: !1 }, Ny(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 100 })) : ue.watchFile(this.path, { persistent: !1 }, Ny(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 5e3 }));
  }
  _migrate(t, r, n) {
    let i = this._get(Al, "0.0.0");
    const o = Object.keys(t).filter((s) => this._shouldPerformMigration(s, i, r));
    let a = { ...this.store };
    for (const s of o)
      try {
        n && n(this, {
          fromVersion: i,
          toVersion: s,
          finalVersion: r,
          versions: o
        });
        const c = t[s];
        c == null || c(this), this._set(Al, s), i = s, a = { ...this.store };
      } catch (c) {
        throw this.store = a, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${c}`);
      }
    (this._isVersionInRangeFormat(i) || !ri.eq(i, r)) && this._set(Al, r);
  }
  _containsReservedKey(t) {
    return typeof t == "object" && Object.keys(t)[0] === gs ? !0 : typeof t != "string" ? !1 : Ae(this, Dt).accessPropertiesByDotNotation ? !!t.startsWith(`${gs}.`) : !1;
  }
  _isVersionInRangeFormat(t) {
    return ri.clean(t) === null;
  }
  _shouldPerformMigration(t, r, n) {
    return this._isVersionInRangeFormat(t) ? r !== "0.0.0" && ri.satisfies(r, t) ? !1 : ri.satisfies(n, t) : !(ri.lte(t, r) || ri.gt(t, n));
  }
  _get(t, r) {
    return _I(this.store, t, r);
  }
  _set(t, r) {
    const { store: n } = this;
    Sm(n, t, r), this.store = n;
  }
}
tn = new WeakMap(), Nr = new WeakMap(), Dt = new WeakMap(), Or = new WeakMap();
const { app: $s, ipcMain: hu, shell: hq } = Dr;
let Ry = !1;
const Iy = () => {
  if (!hu || !$s)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: $s.getPath("userData"),
    appVersion: $s.getVersion()
  };
  return Ry || (hu.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), Ry = !0), e;
};
class Rc extends dq {
  constructor(t) {
    let r, n;
    if (Ve.type === "renderer") {
      const i = Dr.ipcRenderer.sendSync("electron-store-get-data");
      if (!i)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = i);
    } else hu && $s && ({ defaultCwd: r, appVersion: n } = Iy());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = oe.isAbsolute(t.cwd) ? t.cwd : oe.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    Iy();
  }
  async openInEditor() {
    const t = await hq.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var zd = Hs, pq = me, gn = ia.spawn, Kd = "HKLM", m_ = "HKCU", y_ = "HKCR", g_ = "HKU", $_ = "HKCC", v_ = [Kd, m_, y_, g_, $_], __ = "REG_SZ", w_ = "REG_MULTI_SZ", E_ = "REG_EXPAND_SZ", S_ = "REG_DWORD", b_ = "REG_QWORD", P_ = "REG_BINARY", T_ = "REG_NONE", N_ = [__, w_, E_, S_, b_, P_, T_], mq = "", yq = /(\\[a-zA-Z0-9_\s]+)*/, gq = /^(HKEY_LOCAL_MACHINE|HKEY_CURRENT_USER|HKEY_CLASSES_ROOT|HKEY_USERS|HKEY_CURRENT_CONFIG)(.*)$/, O_ = /^(.*)\s(REG_SZ|REG_MULTI_SZ|REG_EXPAND_SZ|REG_DWORD|REG_QWORD|REG_BINARY|REG_NONE)\s+([^\s].*)$/;
function vi(e, t) {
  if (!(this instanceof vi))
    return new vi(e, t);
  Error.captureStackTrace(this, vi), this.__defineGetter__("name", function() {
    return vi.name;
  }), this.__defineGetter__("message", function() {
    return e;
  }), this.__defineGetter__("code", function() {
    return t;
  });
}
zd.inherits(vi, Error);
function $n(e) {
  var t = { stdout: "", stderr: "" };
  return e.stdout.on("data", function(r) {
    t.stdout += r.toString();
  }), e.stderr.on("data", function(r) {
    t.stderr += r.toString();
  }), t;
}
function vn(e, t, r) {
  var n = r.stdout.trim(), i = r.stderr.trim(), o = zd.format(`%s command exited with code %d:
%s
%s`, e, t, n, i);
  return new vi(o, t);
}
function $q(e) {
  if (e == "x64")
    return "64";
  if (e == "x86")
    return "32";
  throw new Error("illegal architecture: " + e + " (use x86 or x64)");
}
function _n(e, t) {
  t && e.push("/reg:" + $q(t));
}
function wn() {
  return process.platform === "win32" ? pq.join(process.env.windir, "system32", "reg.exe") : "REG";
}
function ta(e, t, r, n, i, o, a) {
  if (!(this instanceof ta))
    return new ta(e, t, r, n, i, o, a);
  var s = e, c = t, f = r, l = n, u = i, p = o, h = a;
  this.__defineGetter__("host", function() {
    return s;
  }), this.__defineGetter__("hive", function() {
    return c;
  }), this.__defineGetter__("key", function() {
    return f;
  }), this.__defineGetter__("name", function() {
    return l;
  }), this.__defineGetter__("type", function() {
    return u;
  }), this.__defineGetter__("value", function() {
    return p;
  }), this.__defineGetter__("arch", function() {
    return h;
  });
}
zd.inherits(ta, Object);
function ge(e) {
  if (!(this instanceof ge))
    return new ge(e);
  var t = e || {}, r = "" + (t.host || ""), n = "" + (t.hive || Kd), i = "" + (t.key || ""), o = t.arch || null;
  if (this.__defineGetter__("host", function() {
    return r;
  }), this.__defineGetter__("hive", function() {
    return n;
  }), this.__defineGetter__("key", function() {
    return i;
  }), this.__defineGetter__("path", function() {
    return '"' + (r.length == 0 ? "" : "\\\\" + r + "\\") + n + i + '"';
  }), this.__defineGetter__("arch", function() {
    return o;
  }), this.__defineGetter__("parent", function() {
    var a = i.lastIndexOf("\\");
    return new ge({
      host: this.host,
      hive: this.hive,
      key: a == -1 ? "" : i.substring(0, a),
      arch: this.arch
    });
  }), v_.indexOf(n) == -1)
    throw new Error("illegal hive specified.");
  if (!yq.test(i))
    throw new Error("illegal key specified.");
  if (o && o != "x64" && o != "x86")
    throw new Error("illegal architecture specified (use x86 or x64)");
}
ge.HKLM = Kd;
ge.HKCU = m_;
ge.HKCR = y_;
ge.HKU = g_;
ge.HKCC = $_;
ge.HIVES = v_;
ge.REG_SZ = __;
ge.REG_MULTI_SZ = w_;
ge.REG_EXPAND_SZ = E_;
ge.REG_DWORD = S_;
ge.REG_QWORD = b_;
ge.REG_BINARY = P_;
ge.REG_NONE = T_;
ge.REG_TYPES = N_;
ge.DEFAULT_VALUE = mq;
ge.prototype.values = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["QUERY", this.path];
  _n(r, this.arch);
  var n = gn(wn(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = "", o = this, a = null, s = $n(n);
  return n.on("close", function(c) {
    if (!a)
      if (c !== 0)
        t(vn("QUERY", c, s), null);
      else {
        for (var f = [], l = [], u = i.split(`
`), p = 0, h = 0, v = u.length; h < v; h++) {
          var _ = u[h].trim();
          _.length > 0 && (p != 0 && f.push(_), ++p);
        }
        for (var h = 0, v = f.length; h < v; h++) {
          var g = O_.exec(f[h]), m, E, N;
          g && (m = g[1].trim(), E = g[2].trim(), N = g[3], l.push(new ta(o.host, o.hive, o.key, m, E, N, o.arch)));
        }
        t(null, l);
      }
  }), n.stdout.on("data", function(c) {
    i += c.toString();
  }), n.on("error", function(c) {
    a = c, t(c);
  }), this;
};
ge.prototype.keys = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["QUERY", this.path];
  _n(r, this.arch);
  var n = gn(wn(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = "", o = this, a = null, s = $n(n);
  return n.on("close", function(c) {
    a || c !== 0 && t(vn("QUERY", c, s), null);
  }), n.stdout.on("data", function(c) {
    i += c.toString();
  }), n.stdout.on("end", function() {
    for (var c = [], f = [], l = i.split(`
`), u = 0, p = l.length; u < p; u++) {
      var h = l[u].trim();
      h.length > 0 && c.push(h);
    }
    for (var u = 0, p = c.length; u < p; u++) {
      var v = gq.exec(c[u]), _;
      v && (v[1], _ = v[2], _ && _ !== o.key && f.push(new ge({
        host: o.host,
        hive: o.hive,
        key: _,
        arch: o.arch
      })));
    }
    t(null, f);
  }), n.on("error", function(c) {
    a = c, t(c);
  }), this;
};
ge.prototype.get = function(t, r) {
  if (typeof r != "function")
    throw new TypeError("must specify a callback");
  var n = ["QUERY", this.path];
  t == "" ? n.push("/ve") : n = n.concat(["/v", t]), _n(n, this.arch);
  var i = gn(wn(), n, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), o = "", a = this, s = null, c = $n(i);
  return i.on("close", function(f) {
    if (!s)
      if (f !== 0)
        r(vn("QUERY", f, c), null);
      else {
        for (var l = [], u = null, p = o.split(`
`), h = 0, v = 0, _ = p.length; v < _; v++) {
          var g = p[v].trim();
          g.length > 0 && (h != 0 && l.push(g), ++h);
        }
        var m = l[l.length - 1] || "", E = O_.exec(m), N, R, F;
        E && (N = E[1].trim(), R = E[2].trim(), F = E[3], u = new ta(a.host, a.hive, a.key, N, R, F, a.arch)), r(null, u);
      }
  }), i.stdout.on("data", function(f) {
    o += f.toString();
  }), i.on("error", function(f) {
    s = f, r(f);
  }), this;
};
ge.prototype.set = function(t, r, n, i) {
  if (typeof i != "function")
    throw new TypeError("must specify a callback");
  if (N_.indexOf(r) == -1)
    throw Error("illegal type specified.");
  var o = ["ADD", this.path];
  t == "" ? o.push("/ve") : o = o.concat(["/v", t]), o = o.concat(["/t", r, "/d", n, "/f"]), _n(o, this.arch);
  var a = gn(wn(), o, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), s = null, c = $n(a);
  return a.on("close", function(f) {
    s || i(f !== 0 ? vn("ADD", f, c) : null);
  }), a.stdout.on("data", function(f) {
  }), a.on("error", function(f) {
    s = f, i(f);
  }), this;
};
ge.prototype.remove = function(t, r) {
  if (typeof r != "function")
    throw new TypeError("must specify a callback");
  var n = t ? ["DELETE", this.path, "/f", "/v", t] : ["DELETE", this.path, "/f", "/ve"];
  _n(n, this.arch);
  var i = gn(wn(), n, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), o = null, a = $n(i);
  return i.on("close", function(s) {
    o || (s !== 0 ? r(vn("DELETE", s, a), null) : r(null));
  }), i.stdout.on("data", function(s) {
  }), i.on("error", function(s) {
    o = s, r(s);
  }), this;
};
ge.prototype.clear = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["DELETE", this.path, "/f", "/va"];
  _n(r, this.arch);
  var n = gn(wn(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = null, o = $n(n);
  return n.on("close", function(a) {
    i || (a !== 0 ? t(vn("DELETE", a, o), null) : t(null));
  }), n.stdout.on("data", function(a) {
  }), n.on("error", function(a) {
    i = a, t(a);
  }), this;
};
ge.prototype.erase = ge.prototype.clear;
ge.prototype.destroy = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["DELETE", this.path, "/f"];
  _n(r, this.arch);
  var n = gn(wn(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = null, o = $n(n);
  return n.on("close", function(a) {
    i || (a !== 0 ? t(vn("DELETE", a, o), null) : t(null));
  }), n.stdout.on("data", function(a) {
  }), n.on("error", function(a) {
    i = a, t(a);
  }), this;
};
ge.prototype.create = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["ADD", this.path, "/f"];
  _n(r, this.arch);
  var n = gn(wn(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = null, o = $n(n);
  return n.on("close", function(a) {
    i || (a !== 0 ? t(vn("ADD", a, o), null) : t(null));
  }), n.stdout.on("data", function(a) {
  }), n.on("error", function(a) {
    i = a, t(a);
  }), this;
};
ge.prototype.keyExists = function(t) {
  return this.values(function(r, n) {
    if (r)
      return r.code == 1 ? t(null, !1) : t(r);
    t(null, !0);
  }), this;
};
ge.prototype.valueExists = function(t, r) {
  return this.get(t, function(n, i) {
    if (n)
      return n.code == 1 ? r(null, !1) : r(n);
    r(null, !0);
  }), this;
};
var vq = ge;
const qs = /* @__PURE__ */ zs(vq), ky = "2.1.10", dr = {
  version: ky,
  maintenance: !1,
  discord: "https://discord.gg/MonSuperServeur",
  //Peut etre vide
  teamspeak: "ts3server://ts.arma3.fr",
  //Peut etre vide
  website: "https://www.google.com",
  //Peut etre vide
  twitch: "",
  //Peut etre vide
  youtube: "",
  //Peut etre vide
  serverName: "Custom Server",
  title: `Custom Server - ${ky}`,
  urlMods: "http://82.29.170.30/modsList",
  urlRessources: "http://82.29.170.30/other_ressources",
  mdNews: "http://82.29.170.30/news/news.md",
  serverIp: "127.0.0.1",
  serverPort: 2302,
  serverPassword: "password",
  folderModsName: "@MonSuperMods"
}, Qe = new Rc({
  name: "userData",
  cwd: "arma3-data",
  fileExtension: "json"
}), Vs = new Rc({
  name: "modsListClient",
  cwd: "arma3-data",
  defaults: {
    modsList: []
  },
  fileExtension: "json"
}), pu = new Rc({
  name: "modsListServer",
  cwd: "arma3-data",
  fileExtension: "json"
}), Dy = new Rc({
  name: "news",
  cwd: "arma3-data",
  fileExtension: "md"
});
async function _q() {
  return new Promise((e) => {
    new qs({
      hive: qs.HKLM,
      key: "\\SOFTWARE\\WOW6432Node\\Bohemia Interactive\\Arma 3"
    }).get("main", (r, n) => {
      e(r || !n ? null : n.value);
    });
  });
}
function wq(e) {
  return Ze.existsSync(`${e}\\${dr.folderModsName}`);
}
async function Eq(e) {
  return await Ze.pathExists(`${e}\\arma3.exe`);
}
async function Fy(e) {
  return await Ze.pathExists(`${e}\\package_inst.exe`);
}
function Ue(e, t, r, n, i, o, a) {
  e == null || e.webContents.send("main-process-message", {
    message: t,
    success: r,
    error: n,
    data: i,
    fileProgress: o,
    timeRemaining: a
  });
}
function Sq(e) {
  e.webContents.on("did-finish-load", async () => {
    let r = Qe.get("arma3Path");
    const n = Qe.get("firstLaunch"), o = await (await fetch(dr.mdNews)).text();
    if (Dy.set("lastNews", o), (!r || r === "null") && (r = await _q(), r && Qe.set("arma3Path", r)), r && r !== "null") {
      const a = wq(r);
      Ue(
        e,
        a ? "arma3Path-mod-loaded" : "arma3Path-mod-not-loaded",
        void 0,
        a ? void 0 : `Mod ${dr.folderModsName} non installé`
      ), n && (Ue(
        e,
        "firstLaunch-done",
        "Nous vous avons trouvé Arma 3 automatiquement"
      ), Qe.set("firstLaunch", !1));
    } else
      Qe.set("arma3Path", null), Ue(e, "arma3Path-not-loaded");
    bq(e);
  }), br.on("locate-arma3", async () => {
    try {
      const r = await hh.showOpenDialog({
        properties: ["openDirectory"],
        title: "Sélectionner le dossier d'installation d'Arma 3",
        defaultPath: "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Arma 3"
      });
      if (!r.canceled && r.filePaths.length > 0) {
        const n = r.filePaths[0];
        await Eq(n) ? (Qe.set("arma3Path", n), Ue(e, "arma3Path-ready", "Arma 3 trouvé")) : Ue(
          e,
          "arma3Path-invalid",
          void 0,
          "Le dossier sélectionné ne contient pas Arma 3"
        );
      }
    } catch (r) {
      console.error("Erreur lors de la sélection du dossier Arma 3:", r), Ue(
        e,
        "arma3Path-error",
        void 0,
        r instanceof Error ? r.message : "Erreur inconnue"
      );
    }
  });
  let t = !1;
  br.on("download-mods", async () => {
    var n;
    const r = Qe.get("arma3Path");
    if (!r) {
      Ue(e, "download-error", void 0, "Chemin Arma 3 non trouvé");
      return;
    }
    Pq(), Ue(e, "download-start"), t && (t = !1);
    try {
      const i = `${r}\\${dr.folderModsName}\\addons`;
      await Ze.ensureDir(i);
      const o = pu.get("modsList") || [], a = Vs.get("modsList") || [];
      if (!Array.isArray(o))
        throw new Error("La liste des mods serveur est invalide");
      let s = 0, c = 0;
      const f = Date.now();
      let l = 0;
      for (const u of a) {
        if (!(u != null && u.name)) continue;
        if (!o.find(
          (h) => (h == null ? void 0 : h.name) === u.name
        )) {
          const h = `${i}\\${u.name}`;
          await Ze.pathExists(h) && await Ze.remove(h);
        }
      }
      for (const u of o) {
        if (!(u != null && u.name) || !(u != null && u.hash)) continue;
        const p = a.find(
          (h) => (h == null ? void 0 : h.name) === u.name
        );
        (!p || p.hash !== u.hash) && (s += u.size);
      }
      for (const u of o) {
        if (!(u != null && u.name) || !(u != null && u.hash)) continue;
        const p = a.find(
          (h) => (h == null ? void 0 : h.name) === u.name
        );
        if (!p || p.hash !== u.hash)
          try {
            const h = await fetch(`${dr.urlMods}/${u.name}`);
            if (!h.ok)
              throw new Error(`Erreur HTTP: ${h.status}`);
            const v = parseInt(
              h.headers.get("content-length") || "0"
            );
            let _ = 0;
            const g = (n = h.body) == null ? void 0 : n.getReader(), m = [];
            for (; ; ) {
              if (t)
                return;
              const { done: N, value: R } = await (g == null ? void 0 : g.read()) || {
                done: !0,
                value: void 0
              };
              if (N) break;
              m.push(R), _ += (R == null ? void 0 : R.length) || 0, c += (R == null ? void 0 : R.length) || 0;
              const F = Math.round(
                _ / v * 100
              ), k = (Date.now() - f) / 1e3, L = c / k, V = s - c, P = Math.round(
                V / L
              ), K = Math.floor(P / 60), q = Math.round(P % 60), G = `${K}m ${q}s`, Y = Math.round(
                c / s * 100
              );
              Date.now() - l > 1e3 && (Ue(
                e,
                "download-progress",
                Y.toString(),
                void 0,
                u.name,
                F.toString(),
                G
              ), l = Date.now());
            }
            const E = Buffer.concat(m);
            await Ze.writeFile(`${i}\\${u.name}`, E), a.push(u), Vs.set("modsList", a);
          } catch (h) {
            console.error(
              `Erreur lors du téléchargement de ${u.name}:`,
              h
            );
            continue;
          }
      }
      Ue(e, "download-complete", "Mods mis à jour avec succès"), Ue(e, "arma3Path-mod-loaded", "Jeu prêt à être lancé");
    } catch (i) {
      console.error("Erreur lors du téléchargement des mods:", i), Ue(
        e,
        "download-error",
        void 0,
        i instanceof Error ? i.message : "Erreur inconnue"
      );
    }
  }), br.on("stop-download-mods", () => {
    t = !0, Ue(e, "download-stop", "Téléchargement arrêté");
  }), br.handle("get-arma3-path", async () => {
    const r = Qe.get("arma3Path");
    return r || null;
  }), br.handle("locate-ts3", async () => {
    let r = Qe.get("ts3Path");
    if (!r || r === "null") {
      try {
        const i = new qs({
          hive: qs.HKLM,
          key: "\\SOFTWARE\\WOW6432Node\\TeamSpeak 3 Client"
        }), o = await new Promise((a) => {
          i.get("Install_Dir", (s, c) => {
            a(s || !c ? null : c.value);
          });
        });
        if (o && await Fy(o))
          return r = o, Qe.set("ts3Path", o), Ue(e, "ts3Path-ready", "TeamSpeak 3 trouvé"), await Cl(), r;
      } catch (i) {
        console.error("Erreur lors de la lecture du registre:", i);
      }
      const n = await hh.showOpenDialog({
        properties: ["openDirectory"],
        title: "Sélectionner le dossier d'installation de TeamSpeak 3",
        defaultPath: "C:\\Program Files\\TeamSpeak 3 Client"
      });
      if (!n.canceled && n.filePaths.length > 0) {
        const i = n.filePaths[0];
        await Fy(i) ? (r = i, Qe.set("ts3Path", r), Ue(e, "ts3Path-ready", "TeamSpeak 3 trouvé"), await Cl()) : Ue(
          e,
          "ts3Path-invalid",
          void 0,
          "Chemin TeamSpeak 3 invalide"
        );
      }
    } else
      Ue(e, "ts3Path-ready", "TeamSpeak 3 trouvé"), await Cl();
    return r;
  }), br.handle("save-params-launch", async (r, n) => {
    console.log(n);
  }), br.handle("launch-game", async () => {
    const r = Qe.get("arma3Path"), n = Qe.get("paramsLaunch");
    if (!r) return;
    const i = oe.join(r, "arma3.exe");
    n ? Rl(i, [n]) : Rl(i), Ue(e, "launch-game-success", "Jeu lancé avec succès"), setTimeout(() => {
      e.close();
    }, 5e3);
  }), br.handle("get-last-news", async () => {
    const r = Dy.get("lastNews");
    return r || null;
  }), br.handle("open-url", async (r, n) => {
    Rw.openExternal(n);
  });
}
async function Cl() {
  const e = Qe.get("ts3Path"), t = Qe.get("arma3Path"), r = oe.join(
    t || "",
    dr.folderModsName,
    "task_force_radio.ts3_plugin"
  );
  if (!e || !t) return;
  const n = oe.join(e, "package_inst.exe");
  Rl(n, [r]);
}
async function bq(e) {
  const t = Qe.get("arma3Path");
  if (!t) return !1;
  const r = `${t}\\${dr.folderModsName}`;
  try {
    await Ze.existsSync(r) || await Ze.mkdir(r);
    const i = await (await fetch(`${dr.urlMods}/modsList.json`)).json();
    pu.clear(), pu.set("modsList", i);
    const o = Vs.get("modsList") || [], a = [], s = [];
    for (const c of i) {
      const f = o.find((l) => l.name === c.name);
      (!f || f.hash !== c.hash) && a.push(c);
    }
    for (const c of o)
      i.find(
        (l) => l.name === c.name
      ) || s.push(c);
    for (const c of s) {
      const f = oe.join(r, c.name);
      Ze.existsSync(f) && Ze.unlinkSync(f);
      const l = o.findIndex(
        (u) => u.name === c.name
      );
      l > -1 && o.splice(l, 1);
    }
    return Vs.set("modsList", o), a.length > 0 && Ue(
      e,
      "updateMod-needed",
      `Mise à jour nécessaire, ${a.length} mods à mettre à jour`
    ), !0;
  } catch (n) {
    return console.error("Erreur lors de la création du dossier mod:", n), !1;
  }
}
async function Pq() {
  const e = `${dr.urlRessources}`, t = Qe.get("arma3Path");
  if (!t) return !1;
  const r = `${t}\\${dr.folderModsName}`;
  try {
    const n = await fetch(e);
    if (!n.ok)
      return console.error(
        "Erreur lors de la récupération des ressources:",
        n.statusText
      ), !1;
    let i;
    try {
      i = (await n.text()).split(`
`).map((c) => {
        const f = c.match(/href="([^"]+)"/);
        return f ? { name: f[1], hash: "" } : null;
      }).filter(
        (c) => c && (c.name.endsWith(".dll") || c.name.endsWith(".cpp") || c.name.endsWith(".paa"))
      ).filter(
        (c) => c !== null
      );
    } catch (a) {
      return console.error("Erreur lors du parsing JSON:", a), !1;
    }
    if (!Array.isArray(i))
      return console.error("La réponse n'est pas un tableau valide"), !1;
    for (const a of i) {
      const s = oe.join(r, a.name);
      if (!Ze.existsSync(s) || Ze.existsSync(s) && // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("crypto").createHash("sha256").update(Ze.readFileSync(s)).digest("hex") !== a.hash) {
        const c = await fetch(`${e}/${a.name}`);
        if (!c.ok) {
          console.error(`Erreur lors du téléchargement de ${a.name}`);
          continue;
        }
        const f = await c.arrayBuffer().then((l) => Buffer.from(l));
        Ze.writeFileSync(s, f);
      }
    }
    const o = Ze.readdirSync(r);
    for (const a of o)
      i.find(
        (s) => s.name === a
      ) || Ze.unlinkSync(oe.join(r, a));
    return !0;
  } catch {
    return !1;
  }
}
const A_ = oe.dirname(Fw(import.meta.url));
process.env.APP_ROOT = oe.join(A_, "..");
const mu = process.env.VITE_DEV_SERVER_URL, cV = oe.join(process.env.APP_ROOT, "dist-electron"), C_ = oe.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = mu ? oe.join(process.env.APP_ROOT, "public") : C_;
let De;
pr.autoUpdater.autoDownload = !0;
pr.autoUpdater.autoInstallOnAppQuit = !0;
pr.autoUpdater.on("update-available", () => {
  De && De.webContents.send("update-available");
});
pr.autoUpdater.on("update-downloaded", () => {
  De && (De.webContents.send("update-ready"), setTimeout(() => {
    pr.autoUpdater.quitAndInstall(!1, !0);
  }, 5e3));
});
pr.autoUpdater.on("error", (e) => {
  De && De.webContents.send("update-error", e.message);
});
pr.autoUpdater.on("checking-for-update", () => {
  De && De.webContents.send("checking-update");
});
pr.autoUpdater.on("update-not-available", () => {
  De && De.webContents.send("update-not-available");
});
pr.autoUpdater.on("download-progress", (e) => {
  De && De.webContents.send("update-progress", {
    percent: e.percent,
    transferred: e.transferred,
    total: e.total,
    bytesPerSecond: e.bytesPerSecond
  });
});
const Tq = Cn.requestSingleInstanceLock();
if (!Tq)
  Cn.quit();
else {
  let e = function() {
    De = new ph({
      icon: oe.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
      autoHideMenuBar: !0,
      height: 512,
      width: 800,
      frame: !1,
      maximizable: !1,
      minimizable: !1,
      resizable: !1,
      center: !0,
      webPreferences: {
        preload: oe.join(A_, "preload.mjs")
      }
    }), Sq(De), pr.autoUpdater.checkForUpdates().catch(console.error), mu ? (De.loadURL(mu), De.webContents.openDevTools({
      mode: "detach"
    })) : De.loadFile(oe.join(C_, "index.html"));
  };
  Cn.on("second-instance", () => {
    De && (De.isMinimized() && De.restore(), De.focus());
  }), Cn.on("window-all-closed", () => {
    process.platform !== "darwin" && (Cn.quit(), De = null);
  }), Cn.on("activate", () => {
    ph.getAllWindows().length === 0 && e();
  }), Cn.whenReady().then(() => {
    e();
  });
}
export {
  cV as MAIN_DIST,
  C_ as RENDERER_DIST,
  mu as VITE_DEV_SERVER_URL
};
