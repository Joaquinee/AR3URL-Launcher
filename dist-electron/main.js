var H$ = Object.defineProperty;
var Nf = (e) => {
  throw TypeError(e);
};
var q$ = (e, t, r) => t in e ? H$(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Ci = (e, t, r) => q$(e, typeof t != "symbol" ? t + "" : t, r), Rf = (e, t, r) => t.has(e) || Nf("Cannot " + r);
var $e = (e, t, r) => (Rf(e, t, "read from private field"), r ? r.call(e) : t.get(e)), Oi = (e, t, r) => t.has(e) ? Nf("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), Ii = (e, t, r, n) => (Rf(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r);
import lr, { ipcMain as jt, dialog as Df, shell as G$, app as an, BrowserWindow as kf } from "electron";
import Xp from "events";
import * as V$ from "crypto";
import Ao from "crypto";
import Jp from "tty";
import Za from "util";
import es from "os";
import qr from "fs";
import To from "stream";
import li from "url";
import z$ from "string_decoder";
import W$ from "constants";
import Qp from "assert";
import ce from "path";
import Po, { spawn as Ml } from "child_process";
import Zp from "zlib";
import Y$ from "http";
import { fileURLToPath as K$ } from "node:url";
import re from "node:path";
import xe from "node:process";
import { promisify as Xe, isDeepStrictEqual as X$ } from "node:util";
import se from "node:fs";
import Ni from "node:crypto";
import J$ from "node:assert";
import ts from "node:os";
var Ft = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function rs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ys = {}, Be = {}, Ur = {};
Object.defineProperty(Ur, "__esModule", { value: !0 });
Ur.CancellationError = Ur.CancellationToken = void 0;
const Q$ = Xp;
class Z$ extends Q$.EventEmitter {
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
      return Promise.reject(new jl());
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
          o(new jl());
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
Ur.CancellationToken = Z$;
class jl extends Error {
  constructor() {
    super("cancelled");
  }
}
Ur.CancellationError = jl;
var ct = {}, Bl = { exports: {} }, Xo = { exports: {} }, Ks, xf;
function e_() {
  if (xf) return Ks;
  xf = 1;
  var e = 1e3, t = e * 60, r = t * 60, n = r * 24, i = n * 7, o = n * 365.25;
  Ks = function(u, c) {
    c = c || {};
    var d = typeof u;
    if (d === "string" && u.length > 0)
      return a(u);
    if (d === "number" && isFinite(u))
      return c.long ? l(u) : s(u);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(u)
    );
  };
  function a(u) {
    if (u = String(u), !(u.length > 100)) {
      var c = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        u
      );
      if (c) {
        var d = parseFloat(c[1]), h = (c[2] || "ms").toLowerCase();
        switch (h) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return d * o;
          case "weeks":
          case "week":
          case "w":
            return d * i;
          case "days":
          case "day":
          case "d":
            return d * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return d * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return d * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return d * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return d;
          default:
            return;
        }
      }
    }
  }
  function s(u) {
    var c = Math.abs(u);
    return c >= n ? Math.round(u / n) + "d" : c >= r ? Math.round(u / r) + "h" : c >= t ? Math.round(u / t) + "m" : c >= e ? Math.round(u / e) + "s" : u + "ms";
  }
  function l(u) {
    var c = Math.abs(u);
    return c >= n ? f(u, c, n, "day") : c >= r ? f(u, c, r, "hour") : c >= t ? f(u, c, t, "minute") : c >= e ? f(u, c, e, "second") : u + " ms";
  }
  function f(u, c, d, h) {
    var m = c >= d * 1.5;
    return Math.round(u / d) + " " + h + (m ? "s" : "");
  }
  return Ks;
}
var Xs, Ff;
function em() {
  if (Ff) return Xs;
  Ff = 1;
  function e(t) {
    n.debug = n, n.default = n, n.coerce = f, n.disable = s, n.enable = o, n.enabled = l, n.humanize = e_(), n.destroy = u, Object.keys(t).forEach((c) => {
      n[c] = t[c];
    }), n.names = [], n.skips = [], n.formatters = {};
    function r(c) {
      let d = 0;
      for (let h = 0; h < c.length; h++)
        d = (d << 5) - d + c.charCodeAt(h), d |= 0;
      return n.colors[Math.abs(d) % n.colors.length];
    }
    n.selectColor = r;
    function n(c) {
      let d, h = null, m, y;
      function g(...$) {
        if (!g.enabled)
          return;
        const w = g, O = Number(/* @__PURE__ */ new Date()), N = O - (d || O);
        w.diff = N, w.prev = d, w.curr = O, d = O, $[0] = n.coerce($[0]), typeof $[0] != "string" && $.unshift("%O");
        let j = 0;
        $[0] = $[0].replace(/%([a-zA-Z%])/g, (F, q) => {
          if (F === "%%")
            return "%";
          j++;
          const E = n.formatters[q];
          if (typeof E == "function") {
            const Y = $[j];
            F = E.call(w, Y), $.splice(j, 1), j--;
          }
          return F;
        }), n.formatArgs.call(w, $), (w.log || n.log).apply(w, $);
      }
      return g.namespace = c, g.useColors = n.useColors(), g.color = n.selectColor(c), g.extend = i, g.destroy = n.destroy, Object.defineProperty(g, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => h !== null ? h : (m !== n.namespaces && (m = n.namespaces, y = n.enabled(c)), y),
        set: ($) => {
          h = $;
        }
      }), typeof n.init == "function" && n.init(g), g;
    }
    function i(c, d) {
      const h = n(this.namespace + (typeof d > "u" ? ":" : d) + c);
      return h.log = this.log, h;
    }
    function o(c) {
      n.save(c), n.namespaces = c, n.names = [], n.skips = [];
      const d = (typeof c == "string" ? c : "").trim().replace(" ", ",").split(",").filter(Boolean);
      for (const h of d)
        h[0] === "-" ? n.skips.push(h.slice(1)) : n.names.push(h);
    }
    function a(c, d) {
      let h = 0, m = 0, y = -1, g = 0;
      for (; h < c.length; )
        if (m < d.length && (d[m] === c[h] || d[m] === "*"))
          d[m] === "*" ? (y = m, g = h, m++) : (h++, m++);
        else if (y !== -1)
          m = y + 1, g++, h = g;
        else
          return !1;
      for (; m < d.length && d[m] === "*"; )
        m++;
      return m === d.length;
    }
    function s() {
      const c = [
        ...n.names,
        ...n.skips.map((d) => "-" + d)
      ].join(",");
      return n.enable(""), c;
    }
    function l(c) {
      for (const d of n.skips)
        if (a(c, d))
          return !1;
      for (const d of n.names)
        if (a(c, d))
          return !0;
      return !1;
    }
    function f(c) {
      return c instanceof Error ? c.stack || c.message : c;
    }
    function u() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return n.enable(n.load()), n;
  }
  return Xs = e, Xs;
}
var Lf;
function t_() {
  return Lf || (Lf = 1, function(e, t) {
    t.formatArgs = n, t.save = i, t.load = o, t.useColors = r, t.storage = a(), t.destroy = /* @__PURE__ */ (() => {
      let l = !1;
      return () => {
        l || (l = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
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
      let l;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (l = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(l[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function n(l) {
      if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const f = "color: " + this.color;
      l.splice(1, 0, f, "color: inherit");
      let u = 0, c = 0;
      l[0].replace(/%[a-zA-Z%]/g, (d) => {
        d !== "%%" && (u++, d === "%c" && (c = u));
      }), l.splice(c, 0, f);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(l) {
      try {
        l ? t.storage.setItem("debug", l) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function o() {
      let l;
      try {
        l = t.storage.getItem("debug");
      } catch {
      }
      return !l && typeof process < "u" && "env" in process && (l = process.env.DEBUG), l;
    }
    function a() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = em()(t);
    const { formatters: s } = e.exports;
    s.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (f) {
        return "[UnexpectedJSONParseError]: " + f.message;
      }
    };
  }(Xo, Xo.exports)), Xo.exports;
}
var Jo = { exports: {} }, Js, Uf;
function r_() {
  return Uf || (Uf = 1, Js = (e, t = process.argv) => {
    const r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = t.indexOf(r + e), i = t.indexOf("--");
    return n !== -1 && (i === -1 || n < i);
  }), Js;
}
var Qs, Mf;
function n_() {
  if (Mf) return Qs;
  Mf = 1;
  const e = es, t = Jp, r = r_(), { env: n } = process;
  let i;
  r("no-color") || r("no-colors") || r("color=false") || r("color=never") ? i = 0 : (r("color") || r("colors") || r("color=true") || r("color=always")) && (i = 1), "FORCE_COLOR" in n && (n.FORCE_COLOR === "true" ? i = 1 : n.FORCE_COLOR === "false" ? i = 0 : i = n.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(n.FORCE_COLOR, 10), 3));
  function o(l) {
    return l === 0 ? !1 : {
      level: l,
      hasBasic: !0,
      has256: l >= 2,
      has16m: l >= 3
    };
  }
  function a(l, f) {
    if (i === 0)
      return 0;
    if (r("color=16m") || r("color=full") || r("color=truecolor"))
      return 3;
    if (r("color=256"))
      return 2;
    if (l && !f && i === void 0)
      return 0;
    const u = i || 0;
    if (n.TERM === "dumb")
      return u;
    if (process.platform === "win32") {
      const c = e.release().split(".");
      return Number(c[0]) >= 10 && Number(c[2]) >= 10586 ? Number(c[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((c) => c in n) || n.CI_NAME === "codeship" ? 1 : u;
    if ("TEAMCITY_VERSION" in n)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(n.TEAMCITY_VERSION) ? 1 : 0;
    if (n.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in n) {
      const c = parseInt((n.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (n.TERM_PROGRAM) {
        case "iTerm.app":
          return c >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : u;
  }
  function s(l) {
    const f = a(l, l && l.isTTY);
    return o(f);
  }
  return Qs = {
    supportsColor: s,
    stdout: o(a(!0, t.isatty(1))),
    stderr: o(a(!0, t.isatty(2)))
  }, Qs;
}
var jf;
function i_() {
  return jf || (jf = 1, function(e, t) {
    const r = Jp, n = Za;
    t.init = u, t.log = s, t.formatArgs = o, t.save = l, t.load = f, t.useColors = i, t.destroy = n.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const d = n_();
      d && (d.stderr || d).level >= 2 && (t.colors = [
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
    t.inspectOpts = Object.keys(process.env).filter((d) => /^debug_/i.test(d)).reduce((d, h) => {
      const m = h.substring(6).toLowerCase().replace(/_([a-z])/g, (g, $) => $.toUpperCase());
      let y = process.env[h];
      return /^(yes|on|true|enabled)$/i.test(y) ? y = !0 : /^(no|off|false|disabled)$/i.test(y) ? y = !1 : y === "null" ? y = null : y = Number(y), d[m] = y, d;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : r.isatty(process.stderr.fd);
    }
    function o(d) {
      const { namespace: h, useColors: m } = this;
      if (m) {
        const y = this.color, g = "\x1B[3" + (y < 8 ? y : "8;5;" + y), $ = `  ${g};1m${h} \x1B[0m`;
        d[0] = $ + d[0].split(`
`).join(`
` + $), d.push(g + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        d[0] = a() + h + " " + d[0];
    }
    function a() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function s(...d) {
      return process.stderr.write(n.formatWithOptions(t.inspectOpts, ...d) + `
`);
    }
    function l(d) {
      d ? process.env.DEBUG = d : delete process.env.DEBUG;
    }
    function f() {
      return process.env.DEBUG;
    }
    function u(d) {
      d.inspectOpts = {};
      const h = Object.keys(t.inspectOpts);
      for (let m = 0; m < h.length; m++)
        d.inspectOpts[h[m]] = t.inspectOpts[h[m]];
    }
    e.exports = em()(t);
    const { formatters: c } = e.exports;
    c.o = function(d) {
      return this.inspectOpts.colors = this.useColors, n.inspect(d, this.inspectOpts).split(`
`).map((h) => h.trim()).join(" ");
    }, c.O = function(d) {
      return this.inspectOpts.colors = this.useColors, n.inspect(d, this.inspectOpts);
    };
  }(Jo, Jo.exports)), Jo.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Bl.exports = t_() : Bl.exports = i_();
var o_ = Bl.exports, ci = {};
Object.defineProperty(ci, "__esModule", { value: !0 });
ci.newError = a_;
function a_(e, t) {
  const r = new Error(e);
  return r.code = t, r;
}
var Co = {};
Object.defineProperty(Co, "__esModule", { value: !0 });
Co.ProgressCallbackTransform = void 0;
const s_ = To;
class l_ extends s_.Transform {
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
Co.ProgressCallbackTransform = l_;
Object.defineProperty(ct, "__esModule", { value: !0 });
ct.DigestTransform = ct.HttpExecutor = ct.HttpError = void 0;
ct.createHttpError = Hl;
ct.parseJson = y_;
ct.configureRequestOptionsFromUrl = rm;
ct.configureRequestUrl = Ec;
ct.safeGetHeader = Xn;
ct.configureRequestOptions = Ia;
ct.safeStringifyJson = Na;
const c_ = Ao, u_ = o_, f_ = qr, d_ = To, tm = li, h_ = Ur, Bf = ci, p_ = Co, Ri = (0, u_.default)("electron-builder");
function Hl(e, t = null) {
  return new wc(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + Na(e.headers), t);
}
const m_ = /* @__PURE__ */ new Map([
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
class wc extends Error {
  constructor(t, r = `HTTP error: ${m_.get(t) || t}`, n = null) {
    super(r), this.statusCode = t, this.description = n, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
ct.HttpError = wc;
function y_(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class Oa {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, r = new h_.CancellationToken(), n) {
    Ia(t);
    const i = n == null ? void 0 : JSON.stringify(n), o = i ? Buffer.from(i) : void 0;
    if (o != null) {
      Ri(i);
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
    return Ri.enabled && Ri(`Request: ${Na(t)}`), r.createPromise((o, a, s) => {
      const l = this.createRequest(t, (f) => {
        try {
          this.handleResponse(f, t, r, o, a, i, n);
        } catch (u) {
          a(u);
        }
      });
      this.addErrorAndTimeoutHandlers(l, a, t.timeout), this.addRedirectHandlers(l, t, a, i, (f) => {
        this.doApiRequest(f, r, n, i).then(o).catch(a);
      }), n(l, a), s(() => l.abort());
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
    var l;
    if (Ri.enabled && Ri(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${Na(r)}`), t.statusCode === 404) {
      o(Hl(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const f = (l = t.statusCode) !== null && l !== void 0 ? l : 0, u = f >= 300 && f < 400, c = Xn(t, "location");
    if (u && c != null) {
      if (a > this.maxRedirects) {
        o(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(Oa.prepareRedirectUrlOptions(c, r), n, s, a).then(i).catch(o);
      return;
    }
    t.setEncoding("utf8");
    let d = "";
    t.on("error", o), t.on("data", (h) => d += h), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const h = Xn(t, "content-type"), m = h != null && (Array.isArray(h) ? h.find((y) => y.includes("json")) != null : h.includes("json"));
          o(Hl(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

          Data:
          ${m ? JSON.stringify(JSON.parse(d)) : d}
          `));
        } else
          i(d.length === 0 ? null : d);
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
      Ec(t, s), Ia(s), this.doDownload(s, {
        destination: null,
        options: r,
        onCancel: o,
        callback: (l) => {
          l == null ? n(Buffer.concat(a)) : i(l);
        },
        responseHandler: (l, f) => {
          let u = 0;
          l.on("data", (c) => {
            if (u += c.length, u > 524288e3) {
              f(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            a.push(c);
          }), l.on("end", () => {
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
      const a = Xn(o, "location");
      if (a != null) {
        n < this.maxRedirects ? this.doDownload(Oa.prepareRedirectUrlOptions(a, t), r, n++) : r.callback(this.createMaxRedirectError());
        return;
      }
      r.responseHandler == null ? v_(r, o) : r.responseHandler(o, r.callback);
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
    const n = rm(t, { ...r }), i = n.headers;
    if (i != null && i.authorization) {
      const o = new tm.URL(t);
      (o.hostname.endsWith(".amazonaws.com") || o.searchParams.has("X-Amz-Credential")) && delete i.authorization;
    }
    return n;
  }
  static retryOnServerError(t, r = 3) {
    for (let n = 0; ; n++)
      try {
        return t();
      } catch (i) {
        if (n < r && (i instanceof wc && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
ct.HttpExecutor = Oa;
function rm(e, t) {
  const r = Ia(t);
  return Ec(new tm.URL(e), r), r;
}
function Ec(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class ql extends d_.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, r = "sha512", n = "base64") {
    super(), this.expected = t, this.algorithm = r, this.encoding = n, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, c_.createHash)(r);
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
      throw (0, Bf.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, Bf.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
ct.DigestTransform = ql;
function g_(e, t, r) {
  return e != null && t != null && e !== t ? (r(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function Xn(e, t) {
  const r = e.headers[t];
  return r == null ? null : Array.isArray(r) ? r.length === 0 ? null : r[r.length - 1] : r;
}
function v_(e, t) {
  if (!g_(Xn(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const r = [];
  if (e.options.onProgress != null) {
    const a = Xn(t, "content-length");
    a != null && r.push(new p_.ProgressCallbackTransform(parseInt(a, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const n = e.options.sha512;
  n != null ? r.push(new ql(n, "sha512", n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && r.push(new ql(e.options.sha2, "sha256", "hex"));
  const i = (0, f_.createWriteStream)(e.destination);
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
function Ia(e, t, r) {
  r != null && (e.method = r), e.headers = { ...e.headers };
  const n = e.headers;
  return t != null && (n.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), n["User-Agent"] == null && (n["User-Agent"] = "electron-builder"), (r == null || r === "GET" || n["Cache-Control"] == null) && (n["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function Na(e, t) {
  return JSON.stringify(e, (r, n) => r.endsWith("Authorization") || r.endsWith("authorization") || r.endsWith("Password") || r.endsWith("PASSWORD") || r.endsWith("Token") || r.includes("password") || r.includes("token") || t != null && t.has(r) ? "<stripped sensitive data>" : n, 2);
}
var ns = {};
Object.defineProperty(ns, "__esModule", { value: !0 });
ns.githubUrl = $_;
ns.getS3LikeProviderBaseUrl = __;
function $_(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function __(e) {
  const t = e.provider;
  if (t === "s3")
    return w_(e);
  if (t === "spaces")
    return E_(e);
  throw new Error(`Not supported provider: ${t}`);
}
function w_(e) {
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
  return nm(t, e.path);
}
function nm(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function E_(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return nm(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var Sc = {};
Object.defineProperty(Sc, "__esModule", { value: !0 });
Sc.parseDn = S_;
function S_(e) {
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
        const l = parseInt(e.slice(a, a + 2), 16);
        Number.isNaN(l) ? n += e[a] : (a++, n += String.fromCharCode(l));
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
        let l = a;
        for (; e[l] === " "; )
          l++;
        i = l;
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
var ti = {};
Object.defineProperty(ti, "__esModule", { value: !0 });
ti.nil = ti.UUID = void 0;
const im = Ao, om = ci, b_ = "options.name must be either a string or a Buffer", Hf = (0, im.randomBytes)(16);
Hf[0] = Hf[0] | 1;
const va = {}, ue = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  va[t] = e, ue[e] = t;
}
class gn {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const r = gn.check(t);
    if (!r)
      throw new Error("not a UUID");
    this.version = r.version, r.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, r) {
    return A_(t, "sha1", 80, r);
  }
  toString() {
    return this.ascii == null && (this.ascii = T_(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, r = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (va[t[14] + t[15]] & 240) >> 4,
        variant: qf((va[t[19] + t[20]] & 224) >> 5),
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
        variant: qf((t[r + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, om.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const r = Buffer.allocUnsafe(16);
    let n = 0;
    for (let i = 0; i < 16; i++)
      r[i] = va[t[n++] + t[n++]], (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
    return r;
  }
}
ti.UUID = gn;
gn.OID = gn.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function qf(e) {
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
var Ki;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(Ki || (Ki = {}));
function A_(e, t, r, n, i = Ki.ASCII) {
  const o = (0, im.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, om.newError)(b_, "ERR_INVALID_UUID_NAME");
  o.update(n), o.update(e);
  const s = o.digest();
  let l;
  switch (i) {
    case Ki.BINARY:
      s[6] = s[6] & 15 | r, s[8] = s[8] & 63 | 128, l = s;
      break;
    case Ki.OBJECT:
      s[6] = s[6] & 15 | r, s[8] = s[8] & 63 | 128, l = new gn(s);
      break;
    default:
      l = ue[s[0]] + ue[s[1]] + ue[s[2]] + ue[s[3]] + "-" + ue[s[4]] + ue[s[5]] + "-" + ue[s[6] & 15 | r] + ue[s[7]] + "-" + ue[s[8] & 63 | 128] + ue[s[9]] + "-" + ue[s[10]] + ue[s[11]] + ue[s[12]] + ue[s[13]] + ue[s[14]] + ue[s[15]];
      break;
  }
  return l;
}
function T_(e) {
  return ue[e[0]] + ue[e[1]] + ue[e[2]] + ue[e[3]] + "-" + ue[e[4]] + ue[e[5]] + "-" + ue[e[6]] + ue[e[7]] + "-" + ue[e[8]] + ue[e[9]] + "-" + ue[e[10]] + ue[e[11]] + ue[e[12]] + ue[e[13]] + ue[e[14]] + ue[e[15]];
}
ti.nil = new gn("00000000-0000-0000-0000-000000000000");
var Oo = {}, am = {};
(function(e) {
  (function(t) {
    t.parser = function(v, p) {
      return new n(v, p);
    }, t.SAXParser = n, t.SAXStream = u, t.createStream = f, t.MAX_BUFFER_LENGTH = 64 * 1024;
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
    function n(v, p) {
      if (!(this instanceof n))
        return new n(v, p);
      var D = this;
      o(D), D.q = D.c = "", D.bufferCheckPosition = t.MAX_BUFFER_LENGTH, D.opt = p || {}, D.opt.lowercase = D.opt.lowercase || D.opt.lowercasetags, D.looseCase = D.opt.lowercase ? "toLowerCase" : "toUpperCase", D.tags = [], D.closed = D.closedRoot = D.sawRoot = !1, D.tag = D.error = null, D.strict = !!v, D.noscript = !!(v || D.opt.noscript), D.state = E.BEGIN, D.strictEntities = D.opt.strictEntities, D.ENTITIES = D.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), D.attribList = [], D.opt.xmlns && (D.ns = Object.create(y)), D.opt.unquotedAttributeValues === void 0 && (D.opt.unquotedAttributeValues = !v), D.trackPosition = D.opt.position !== !1, D.trackPosition && (D.position = D.line = D.column = 0), B(D, "onready");
    }
    Object.create || (Object.create = function(v) {
      function p() {
      }
      p.prototype = v;
      var D = new p();
      return D;
    }), Object.keys || (Object.keys = function(v) {
      var p = [];
      for (var D in v) v.hasOwnProperty(D) && p.push(D);
      return p;
    });
    function i(v) {
      for (var p = Math.max(t.MAX_BUFFER_LENGTH, 10), D = 0, A = 0, te = r.length; A < te; A++) {
        var he = v[r[A]].length;
        if (he > p)
          switch (r[A]) {
            case "textNode":
              X(v);
              break;
            case "cdata":
              z(v, "oncdata", v.cdata), v.cdata = "";
              break;
            case "script":
              z(v, "onscript", v.script), v.script = "";
              break;
            default:
              x(v, "Max buffer length exceeded: " + r[A]);
          }
        D = Math.max(D, he);
      }
      var ye = t.MAX_BUFFER_LENGTH - D;
      v.bufferCheckPosition = ye + v.position;
    }
    function o(v) {
      for (var p = 0, D = r.length; p < D; p++)
        v[r[p]] = "";
    }
    function a(v) {
      X(v), v.cdata !== "" && (z(v, "oncdata", v.cdata), v.cdata = ""), v.script !== "" && (z(v, "onscript", v.script), v.script = "");
    }
    n.prototype = {
      end: function() {
        G(this);
      },
      write: M,
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
    var l = t.EVENTS.filter(function(v) {
      return v !== "error" && v !== "end";
    });
    function f(v, p) {
      return new u(v, p);
    }
    function u(v, p) {
      if (!(this instanceof u))
        return new u(v, p);
      s.apply(this), this._parser = new n(v, p), this.writable = !0, this.readable = !0;
      var D = this;
      this._parser.onend = function() {
        D.emit("end");
      }, this._parser.onerror = function(A) {
        D.emit("error", A), D._parser.error = null;
      }, this._decoder = null, l.forEach(function(A) {
        Object.defineProperty(D, "on" + A, {
          get: function() {
            return D._parser["on" + A];
          },
          set: function(te) {
            if (!te)
              return D.removeAllListeners(A), D._parser["on" + A] = te, te;
            D.on(A, te);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    u.prototype = Object.create(s.prototype, {
      constructor: {
        value: u
      }
    }), u.prototype.write = function(v) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(v)) {
        if (!this._decoder) {
          var p = z$.StringDecoder;
          this._decoder = new p("utf8");
        }
        v = this._decoder.write(v);
      }
      return this._parser.write(v.toString()), this.emit("data", v), !0;
    }, u.prototype.end = function(v) {
      return v && v.length && this.write(v), this._parser.end(), !0;
    }, u.prototype.on = function(v, p) {
      var D = this;
      return !D._parser["on" + v] && l.indexOf(v) !== -1 && (D._parser["on" + v] = function() {
        var A = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        A.splice(0, 0, v), D.emit.apply(D, A);
      }), s.prototype.on.call(D, v, p);
    };
    var c = "[CDATA[", d = "DOCTYPE", h = "http://www.w3.org/XML/1998/namespace", m = "http://www.w3.org/2000/xmlns/", y = { xml: h, xmlns: m }, g = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, $ = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, w = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, O = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function N(v) {
      return v === " " || v === `
` || v === "\r" || v === "	";
    }
    function j(v) {
      return v === '"' || v === "'";
    }
    function I(v) {
      return v === ">" || N(v);
    }
    function F(v, p) {
      return v.test(p);
    }
    function q(v, p) {
      return !F(v, p);
    }
    var E = 0;
    t.STATE = {
      BEGIN: E++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: E++,
      // leading whitespace
      TEXT: E++,
      // general stuff
      TEXT_ENTITY: E++,
      // &amp and such.
      OPEN_WAKA: E++,
      // <
      SGML_DECL: E++,
      // <!BLARG
      SGML_DECL_QUOTED: E++,
      // <!BLARG foo "bar
      DOCTYPE: E++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: E++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: E++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: E++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: E++,
      // <!-
      COMMENT: E++,
      // <!--
      COMMENT_ENDING: E++,
      // <!-- blah -
      COMMENT_ENDED: E++,
      // <!-- blah --
      CDATA: E++,
      // <![CDATA[ something
      CDATA_ENDING: E++,
      // ]
      CDATA_ENDING_2: E++,
      // ]]
      PROC_INST: E++,
      // <?hi
      PROC_INST_BODY: E++,
      // <?hi there
      PROC_INST_ENDING: E++,
      // <?hi "there" ?
      OPEN_TAG: E++,
      // <strong
      OPEN_TAG_SLASH: E++,
      // <strong /
      ATTRIB: E++,
      // <a
      ATTRIB_NAME: E++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: E++,
      // <a foo _
      ATTRIB_VALUE: E++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: E++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: E++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: E++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: E++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: E++,
      // <foo bar=&quot
      CLOSE_TAG: E++,
      // </a
      CLOSE_TAG_SAW_WHITE: E++,
      // </a   >
      SCRIPT: E++,
      // <script> ...
      SCRIPT_ENDING: E++
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
    }, Object.keys(t.ENTITIES).forEach(function(v) {
      var p = t.ENTITIES[v], D = typeof p == "number" ? String.fromCharCode(p) : p;
      t.ENTITIES[v] = D;
    });
    for (var Y in t.STATE)
      t.STATE[t.STATE[Y]] = Y;
    E = t.STATE;
    function B(v, p, D) {
      v[p] && v[p](D);
    }
    function z(v, p, D) {
      v.textNode && X(v), B(v, p, D);
    }
    function X(v) {
      v.textNode = k(v.opt, v.textNode), v.textNode && B(v, "ontext", v.textNode), v.textNode = "";
    }
    function k(v, p) {
      return v.trim && (p = p.trim()), v.normalize && (p = p.replace(/\s+/g, " ")), p;
    }
    function x(v, p) {
      return X(v), v.trackPosition && (p += `
Line: ` + v.line + `
Column: ` + v.column + `
Char: ` + v.c), p = new Error(p), v.error = p, B(v, "onerror", p), v;
    }
    function G(v) {
      return v.sawRoot && !v.closedRoot && L(v, "Unclosed root tag"), v.state !== E.BEGIN && v.state !== E.BEGIN_WHITESPACE && v.state !== E.TEXT && x(v, "Unexpected end"), X(v), v.c = "", v.closed = !0, B(v, "onend"), n.call(v, v.strict, v.opt), v;
    }
    function L(v, p) {
      if (typeof v != "object" || !(v instanceof n))
        throw new Error("bad call to strictFail");
      v.strict && x(v, p);
    }
    function W(v) {
      v.strict || (v.tagName = v.tagName[v.looseCase]());
      var p = v.tags[v.tags.length - 1] || v, D = v.tag = { name: v.tagName, attributes: {} };
      v.opt.xmlns && (D.ns = p.ns), v.attribList.length = 0, z(v, "onopentagstart", D);
    }
    function V(v, p) {
      var D = v.indexOf(":"), A = D < 0 ? ["", v] : v.split(":"), te = A[0], he = A[1];
      return p && v === "xmlns" && (te = "xmlns", he = ""), { prefix: te, local: he };
    }
    function U(v) {
      if (v.strict || (v.attribName = v.attribName[v.looseCase]()), v.attribList.indexOf(v.attribName) !== -1 || v.tag.attributes.hasOwnProperty(v.attribName)) {
        v.attribName = v.attribValue = "";
        return;
      }
      if (v.opt.xmlns) {
        var p = V(v.attribName, !0), D = p.prefix, A = p.local;
        if (D === "xmlns")
          if (A === "xml" && v.attribValue !== h)
            L(
              v,
              "xml: prefix must be bound to " + h + `
Actual: ` + v.attribValue
            );
          else if (A === "xmlns" && v.attribValue !== m)
            L(
              v,
              "xmlns: prefix must be bound to " + m + `
Actual: ` + v.attribValue
            );
          else {
            var te = v.tag, he = v.tags[v.tags.length - 1] || v;
            te.ns === he.ns && (te.ns = Object.create(he.ns)), te.ns[A] = v.attribValue;
          }
        v.attribList.push([v.attribName, v.attribValue]);
      } else
        v.tag.attributes[v.attribName] = v.attribValue, z(v, "onattribute", {
          name: v.attribName,
          value: v.attribValue
        });
      v.attribName = v.attribValue = "";
    }
    function T(v, p) {
      if (v.opt.xmlns) {
        var D = v.tag, A = V(v.tagName);
        D.prefix = A.prefix, D.local = A.local, D.uri = D.ns[A.prefix] || "", D.prefix && !D.uri && (L(v, "Unbound namespace prefix: " + JSON.stringify(v.tagName)), D.uri = A.prefix);
        var te = v.tags[v.tags.length - 1] || v;
        D.ns && te.ns !== D.ns && Object.keys(D.ns).forEach(function(pr) {
          z(v, "onopennamespace", {
            prefix: pr,
            uri: D.ns[pr]
          });
        });
        for (var he = 0, ye = v.attribList.length; he < ye; he++) {
          var Ce = v.attribList[he], Ie = Ce[0], bt = Ce[1], we = V(Ie, !0), it = we.prefix, Xr = we.local, hr = it === "" ? "" : D.ns[it] || "", Jt = {
            name: Ie,
            value: bt,
            prefix: it,
            local: Xr,
            uri: hr
          };
          it && it !== "xmlns" && !hr && (L(v, "Unbound namespace prefix: " + JSON.stringify(it)), Jt.uri = it), v.tag.attributes[Ie] = Jt, z(v, "onattribute", Jt);
        }
        v.attribList.length = 0;
      }
      v.tag.isSelfClosing = !!p, v.sawRoot = !0, v.tags.push(v.tag), z(v, "onopentag", v.tag), p || (!v.noscript && v.tagName.toLowerCase() === "script" ? v.state = E.SCRIPT : v.state = E.TEXT, v.tag = null, v.tagName = ""), v.attribName = v.attribValue = "", v.attribList.length = 0;
    }
    function R(v) {
      if (!v.tagName) {
        L(v, "Weird empty close tag."), v.textNode += "</>", v.state = E.TEXT;
        return;
      }
      if (v.script) {
        if (v.tagName !== "script") {
          v.script += "</" + v.tagName + ">", v.tagName = "", v.state = E.SCRIPT;
          return;
        }
        z(v, "onscript", v.script), v.script = "";
      }
      var p = v.tags.length, D = v.tagName;
      v.strict || (D = D[v.looseCase]());
      for (var A = D; p--; ) {
        var te = v.tags[p];
        if (te.name !== A)
          L(v, "Unexpected close tag");
        else
          break;
      }
      if (p < 0) {
        L(v, "Unmatched closing tag: " + v.tagName), v.textNode += "</" + v.tagName + ">", v.state = E.TEXT;
        return;
      }
      v.tagName = D;
      for (var he = v.tags.length; he-- > p; ) {
        var ye = v.tag = v.tags.pop();
        v.tagName = v.tag.name, z(v, "onclosetag", v.tagName);
        var Ce = {};
        for (var Ie in ye.ns)
          Ce[Ie] = ye.ns[Ie];
        var bt = v.tags[v.tags.length - 1] || v;
        v.opt.xmlns && ye.ns !== bt.ns && Object.keys(ye.ns).forEach(function(we) {
          var it = ye.ns[we];
          z(v, "onclosenamespace", { prefix: we, uri: it });
        });
      }
      p === 0 && (v.closedRoot = !0), v.tagName = v.attribValue = v.attribName = "", v.attribList.length = 0, v.state = E.TEXT;
    }
    function P(v) {
      var p = v.entity, D = p.toLowerCase(), A, te = "";
      return v.ENTITIES[p] ? v.ENTITIES[p] : v.ENTITIES[D] ? v.ENTITIES[D] : (p = D, p.charAt(0) === "#" && (p.charAt(1) === "x" ? (p = p.slice(2), A = parseInt(p, 16), te = A.toString(16)) : (p = p.slice(1), A = parseInt(p, 10), te = A.toString(10))), p = p.replace(/^0+/, ""), isNaN(A) || te.toLowerCase() !== p ? (L(v, "Invalid character entity"), "&" + v.entity + ";") : String.fromCodePoint(A));
    }
    function _(v, p) {
      p === "<" ? (v.state = E.OPEN_WAKA, v.startTagPosition = v.position) : N(p) || (L(v, "Non-whitespace before first tag."), v.textNode = p, v.state = E.TEXT);
    }
    function b(v, p) {
      var D = "";
      return p < v.length && (D = v.charAt(p)), D;
    }
    function M(v) {
      var p = this;
      if (this.error)
        throw this.error;
      if (p.closed)
        return x(
          p,
          "Cannot write after close. Assign an onready handler."
        );
      if (v === null)
        return G(p);
      typeof v == "object" && (v = v.toString());
      for (var D = 0, A = ""; A = b(v, D++), p.c = A, !!A; )
        switch (p.trackPosition && (p.position++, A === `
` ? (p.line++, p.column = 0) : p.column++), p.state) {
          case E.BEGIN:
            if (p.state = E.BEGIN_WHITESPACE, A === "\uFEFF")
              continue;
            _(p, A);
            continue;
          case E.BEGIN_WHITESPACE:
            _(p, A);
            continue;
          case E.TEXT:
            if (p.sawRoot && !p.closedRoot) {
              for (var te = D - 1; A && A !== "<" && A !== "&"; )
                A = b(v, D++), A && p.trackPosition && (p.position++, A === `
` ? (p.line++, p.column = 0) : p.column++);
              p.textNode += v.substring(te, D - 1);
            }
            A === "<" && !(p.sawRoot && p.closedRoot && !p.strict) ? (p.state = E.OPEN_WAKA, p.startTagPosition = p.position) : (!N(A) && (!p.sawRoot || p.closedRoot) && L(p, "Text data outside of root node."), A === "&" ? p.state = E.TEXT_ENTITY : p.textNode += A);
            continue;
          case E.SCRIPT:
            A === "<" ? p.state = E.SCRIPT_ENDING : p.script += A;
            continue;
          case E.SCRIPT_ENDING:
            A === "/" ? p.state = E.CLOSE_TAG : (p.script += "<" + A, p.state = E.SCRIPT);
            continue;
          case E.OPEN_WAKA:
            if (A === "!")
              p.state = E.SGML_DECL, p.sgmlDecl = "";
            else if (!N(A)) if (F(g, A))
              p.state = E.OPEN_TAG, p.tagName = A;
            else if (A === "/")
              p.state = E.CLOSE_TAG, p.tagName = "";
            else if (A === "?")
              p.state = E.PROC_INST, p.procInstName = p.procInstBody = "";
            else {
              if (L(p, "Unencoded <"), p.startTagPosition + 1 < p.position) {
                var he = p.position - p.startTagPosition;
                A = new Array(he).join(" ") + A;
              }
              p.textNode += "<" + A, p.state = E.TEXT;
            }
            continue;
          case E.SGML_DECL:
            if (p.sgmlDecl + A === "--") {
              p.state = E.COMMENT, p.comment = "", p.sgmlDecl = "";
              continue;
            }
            p.doctype && p.doctype !== !0 && p.sgmlDecl ? (p.state = E.DOCTYPE_DTD, p.doctype += "<!" + p.sgmlDecl + A, p.sgmlDecl = "") : (p.sgmlDecl + A).toUpperCase() === c ? (z(p, "onopencdata"), p.state = E.CDATA, p.sgmlDecl = "", p.cdata = "") : (p.sgmlDecl + A).toUpperCase() === d ? (p.state = E.DOCTYPE, (p.doctype || p.sawRoot) && L(
              p,
              "Inappropriately located doctype declaration"
            ), p.doctype = "", p.sgmlDecl = "") : A === ">" ? (z(p, "onsgmldeclaration", p.sgmlDecl), p.sgmlDecl = "", p.state = E.TEXT) : (j(A) && (p.state = E.SGML_DECL_QUOTED), p.sgmlDecl += A);
            continue;
          case E.SGML_DECL_QUOTED:
            A === p.q && (p.state = E.SGML_DECL, p.q = ""), p.sgmlDecl += A;
            continue;
          case E.DOCTYPE:
            A === ">" ? (p.state = E.TEXT, z(p, "ondoctype", p.doctype), p.doctype = !0) : (p.doctype += A, A === "[" ? p.state = E.DOCTYPE_DTD : j(A) && (p.state = E.DOCTYPE_QUOTED, p.q = A));
            continue;
          case E.DOCTYPE_QUOTED:
            p.doctype += A, A === p.q && (p.q = "", p.state = E.DOCTYPE);
            continue;
          case E.DOCTYPE_DTD:
            A === "]" ? (p.doctype += A, p.state = E.DOCTYPE) : A === "<" ? (p.state = E.OPEN_WAKA, p.startTagPosition = p.position) : j(A) ? (p.doctype += A, p.state = E.DOCTYPE_DTD_QUOTED, p.q = A) : p.doctype += A;
            continue;
          case E.DOCTYPE_DTD_QUOTED:
            p.doctype += A, A === p.q && (p.state = E.DOCTYPE_DTD, p.q = "");
            continue;
          case E.COMMENT:
            A === "-" ? p.state = E.COMMENT_ENDING : p.comment += A;
            continue;
          case E.COMMENT_ENDING:
            A === "-" ? (p.state = E.COMMENT_ENDED, p.comment = k(p.opt, p.comment), p.comment && z(p, "oncomment", p.comment), p.comment = "") : (p.comment += "-" + A, p.state = E.COMMENT);
            continue;
          case E.COMMENT_ENDED:
            A !== ">" ? (L(p, "Malformed comment"), p.comment += "--" + A, p.state = E.COMMENT) : p.doctype && p.doctype !== !0 ? p.state = E.DOCTYPE_DTD : p.state = E.TEXT;
            continue;
          case E.CDATA:
            A === "]" ? p.state = E.CDATA_ENDING : p.cdata += A;
            continue;
          case E.CDATA_ENDING:
            A === "]" ? p.state = E.CDATA_ENDING_2 : (p.cdata += "]" + A, p.state = E.CDATA);
            continue;
          case E.CDATA_ENDING_2:
            A === ">" ? (p.cdata && z(p, "oncdata", p.cdata), z(p, "onclosecdata"), p.cdata = "", p.state = E.TEXT) : A === "]" ? p.cdata += "]" : (p.cdata += "]]" + A, p.state = E.CDATA);
            continue;
          case E.PROC_INST:
            A === "?" ? p.state = E.PROC_INST_ENDING : N(A) ? p.state = E.PROC_INST_BODY : p.procInstName += A;
            continue;
          case E.PROC_INST_BODY:
            if (!p.procInstBody && N(A))
              continue;
            A === "?" ? p.state = E.PROC_INST_ENDING : p.procInstBody += A;
            continue;
          case E.PROC_INST_ENDING:
            A === ">" ? (z(p, "onprocessinginstruction", {
              name: p.procInstName,
              body: p.procInstBody
            }), p.procInstName = p.procInstBody = "", p.state = E.TEXT) : (p.procInstBody += "?" + A, p.state = E.PROC_INST_BODY);
            continue;
          case E.OPEN_TAG:
            F($, A) ? p.tagName += A : (W(p), A === ">" ? T(p) : A === "/" ? p.state = E.OPEN_TAG_SLASH : (N(A) || L(p, "Invalid character in tag name"), p.state = E.ATTRIB));
            continue;
          case E.OPEN_TAG_SLASH:
            A === ">" ? (T(p, !0), R(p)) : (L(p, "Forward-slash in opening tag not followed by >"), p.state = E.ATTRIB);
            continue;
          case E.ATTRIB:
            if (N(A))
              continue;
            A === ">" ? T(p) : A === "/" ? p.state = E.OPEN_TAG_SLASH : F(g, A) ? (p.attribName = A, p.attribValue = "", p.state = E.ATTRIB_NAME) : L(p, "Invalid attribute name");
            continue;
          case E.ATTRIB_NAME:
            A === "=" ? p.state = E.ATTRIB_VALUE : A === ">" ? (L(p, "Attribute without value"), p.attribValue = p.attribName, U(p), T(p)) : N(A) ? p.state = E.ATTRIB_NAME_SAW_WHITE : F($, A) ? p.attribName += A : L(p, "Invalid attribute name");
            continue;
          case E.ATTRIB_NAME_SAW_WHITE:
            if (A === "=")
              p.state = E.ATTRIB_VALUE;
            else {
              if (N(A))
                continue;
              L(p, "Attribute without value"), p.tag.attributes[p.attribName] = "", p.attribValue = "", z(p, "onattribute", {
                name: p.attribName,
                value: ""
              }), p.attribName = "", A === ">" ? T(p) : F(g, A) ? (p.attribName = A, p.state = E.ATTRIB_NAME) : (L(p, "Invalid attribute name"), p.state = E.ATTRIB);
            }
            continue;
          case E.ATTRIB_VALUE:
            if (N(A))
              continue;
            j(A) ? (p.q = A, p.state = E.ATTRIB_VALUE_QUOTED) : (p.opt.unquotedAttributeValues || x(p, "Unquoted attribute value"), p.state = E.ATTRIB_VALUE_UNQUOTED, p.attribValue = A);
            continue;
          case E.ATTRIB_VALUE_QUOTED:
            if (A !== p.q) {
              A === "&" ? p.state = E.ATTRIB_VALUE_ENTITY_Q : p.attribValue += A;
              continue;
            }
            U(p), p.q = "", p.state = E.ATTRIB_VALUE_CLOSED;
            continue;
          case E.ATTRIB_VALUE_CLOSED:
            N(A) ? p.state = E.ATTRIB : A === ">" ? T(p) : A === "/" ? p.state = E.OPEN_TAG_SLASH : F(g, A) ? (L(p, "No whitespace between attributes"), p.attribName = A, p.attribValue = "", p.state = E.ATTRIB_NAME) : L(p, "Invalid attribute name");
            continue;
          case E.ATTRIB_VALUE_UNQUOTED:
            if (!I(A)) {
              A === "&" ? p.state = E.ATTRIB_VALUE_ENTITY_U : p.attribValue += A;
              continue;
            }
            U(p), A === ">" ? T(p) : p.state = E.ATTRIB;
            continue;
          case E.CLOSE_TAG:
            if (p.tagName)
              A === ">" ? R(p) : F($, A) ? p.tagName += A : p.script ? (p.script += "</" + p.tagName, p.tagName = "", p.state = E.SCRIPT) : (N(A) || L(p, "Invalid tagname in closing tag"), p.state = E.CLOSE_TAG_SAW_WHITE);
            else {
              if (N(A))
                continue;
              q(g, A) ? p.script ? (p.script += "</" + A, p.state = E.SCRIPT) : L(p, "Invalid tagname in closing tag.") : p.tagName = A;
            }
            continue;
          case E.CLOSE_TAG_SAW_WHITE:
            if (N(A))
              continue;
            A === ">" ? R(p) : L(p, "Invalid characters in closing tag");
            continue;
          case E.TEXT_ENTITY:
          case E.ATTRIB_VALUE_ENTITY_Q:
          case E.ATTRIB_VALUE_ENTITY_U:
            var ye, Ce;
            switch (p.state) {
              case E.TEXT_ENTITY:
                ye = E.TEXT, Ce = "textNode";
                break;
              case E.ATTRIB_VALUE_ENTITY_Q:
                ye = E.ATTRIB_VALUE_QUOTED, Ce = "attribValue";
                break;
              case E.ATTRIB_VALUE_ENTITY_U:
                ye = E.ATTRIB_VALUE_UNQUOTED, Ce = "attribValue";
                break;
            }
            if (A === ";") {
              var Ie = P(p);
              p.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(Ie) ? (p.entity = "", p.state = ye, p.write(Ie)) : (p[Ce] += Ie, p.entity = "", p.state = ye);
            } else F(p.entity.length ? O : w, A) ? p.entity += A : (L(p, "Invalid character in entity name"), p[Ce] += "&" + p.entity + A, p.entity = "", p.state = ye);
            continue;
          default:
            throw new Error(p, "Unknown state: " + p.state);
        }
      return p.position >= p.bufferCheckPosition && i(p), p;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var v = String.fromCharCode, p = Math.floor, D = function() {
        var A = 16384, te = [], he, ye, Ce = -1, Ie = arguments.length;
        if (!Ie)
          return "";
        for (var bt = ""; ++Ce < Ie; ) {
          var we = Number(arguments[Ce]);
          if (!isFinite(we) || // `NaN`, `+Infinity`, or `-Infinity`
          we < 0 || // not a valid Unicode code point
          we > 1114111 || // not a valid Unicode code point
          p(we) !== we)
            throw RangeError("Invalid code point: " + we);
          we <= 65535 ? te.push(we) : (we -= 65536, he = (we >> 10) + 55296, ye = we % 1024 + 56320, te.push(he, ye)), (Ce + 1 === Ie || te.length > A) && (bt += v.apply(null, te), te.length = 0);
        }
        return bt;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: D,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = D;
    }();
  })(e);
})(am);
Object.defineProperty(Oo, "__esModule", { value: !0 });
Oo.XElement = void 0;
Oo.parseXml = I_;
const P_ = am, Qo = ci;
class sm {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, Qo.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!O_(t))
      throw (0, Qo.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const r = this.attributes === null ? null : this.attributes[t];
    if (r == null)
      throw (0, Qo.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return r;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, r = !1, n = null) {
    const i = this.elementOrNull(t, r);
    if (i === null)
      throw (0, Qo.newError)(n || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, r = !1) {
    if (this.elements === null)
      return null;
    for (const n of this.elements)
      if (Gf(n, t, r))
        return n;
    return null;
  }
  getElements(t, r = !1) {
    return this.elements === null ? [] : this.elements.filter((n) => Gf(n, t, r));
  }
  elementValueOrEmpty(t, r = !1) {
    const n = this.elementOrNull(t, r);
    return n === null ? "" : n.value;
  }
}
Oo.XElement = sm;
const C_ = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function O_(e) {
  return C_.test(e);
}
function Gf(e, t, r) {
  const n = e.name;
  return n === t || r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase();
}
function I_(e) {
  let t = null;
  const r = P_.parser(!0, {}), n = [];
  return r.onopentag = (i) => {
    const o = new sm(i.name);
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
var is = {};
Object.defineProperty(is, "__esModule", { value: !0 });
is.MemoLazy = void 0;
class N_ {
  constructor(t, r) {
    this.selector = t, this.creator = r, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && lm(this.selected, t))
      return this._value;
    this.selected = t;
    const r = this.creator(t);
    return this.value = r, r;
  }
  set value(t) {
    this._value = t;
  }
}
is.MemoLazy = N_;
function lm(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), o = Object.keys(t);
    return i.length === o.length && i.every((a) => lm(e[a], t[a]));
  }
  return e === t;
}
var bc = {};
Object.defineProperty(bc, "__esModule", { value: !0 });
bc.retry = cm;
const R_ = Ur;
async function cm(e, t, r, n = 0, i = 0, o) {
  var a;
  const s = new R_.CancellationToken();
  try {
    return await e();
  } catch (l) {
    if ((!((a = o == null ? void 0 : o(l)) !== null && a !== void 0) || a) && t > 0 && !s.cancelled)
      return await new Promise((f) => setTimeout(f, r + n * i)), await cm(e, t - 1, r, n, i + 1, o);
    throw l;
  }
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.retry = e.MemoLazy = e.newError = e.XElement = e.parseXml = e.ProgressCallbackTransform = e.UUID = e.parseDn = e.githubUrl = e.getS3LikeProviderBaseUrl = e.configureRequestUrl = e.parseJson = e.safeStringifyJson = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.safeGetHeader = e.DigestTransform = e.HttpExecutor = e.createHttpError = e.HttpError = e.CancellationError = e.CancellationToken = void 0, e.asArray = c;
  var t = Ur;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } });
  var r = ct;
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
  var n = ns;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return n.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return n.githubUrl;
  } });
  var i = Sc;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return i.parseDn;
  } });
  var o = ti;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return o.UUID;
  } });
  var a = Co;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return a.ProgressCallbackTransform;
  } });
  var s = Oo;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return s.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return s.XElement;
  } });
  var l = ci;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return l.newError;
  } });
  var f = is;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return f.MemoLazy;
  } });
  var u = bc;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return u.retry;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function c(d) {
    return d == null ? [] : Array.isArray(d) ? d : [d];
  }
})(Be);
var wn = {}, de = {};
de.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((r, n) => {
        t.push((i, o) => i != null ? n(i) : r(o)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
de.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const r = t[t.length - 1];
    if (typeof r != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((n) => r(null, n), r);
  }, "name", { value: e.name });
};
var $r = W$, D_ = process.cwd, $a = null, k_ = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return $a || ($a = D_.call(process)), $a;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var Vf = process.chdir;
  process.chdir = function(e) {
    $a = null, Vf.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Vf);
}
var x_ = F_;
function F_(e) {
  $r.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || r(e), e.chown = o(e.chown), e.fchown = o(e.fchown), e.lchown = o(e.lchown), e.chmod = n(e.chmod), e.fchmod = n(e.fchmod), e.lchmod = n(e.lchmod), e.chownSync = a(e.chownSync), e.fchownSync = a(e.fchownSync), e.lchownSync = a(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = s(e.stat), e.fstat = s(e.fstat), e.lstat = s(e.lstat), e.statSync = l(e.statSync), e.fstatSync = l(e.fstatSync), e.lstatSync = l(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(u, c, d) {
    d && process.nextTick(d);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(u, c, d, h) {
    h && process.nextTick(h);
  }, e.lchownSync = function() {
  }), k_ === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(u) {
    function c(d, h, m) {
      var y = Date.now(), g = 0;
      u(d, h, function $(w) {
        if (w && (w.code === "EACCES" || w.code === "EPERM" || w.code === "EBUSY") && Date.now() - y < 6e4) {
          setTimeout(function() {
            e.stat(h, function(O, N) {
              O && O.code === "ENOENT" ? u(d, h, $) : m(w);
            });
          }, g), g < 100 && (g += 10);
          return;
        }
        m && m(w);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(c, u), c;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(u) {
    function c(d, h, m, y, g, $) {
      var w;
      if ($ && typeof $ == "function") {
        var O = 0;
        w = function(N, j, I) {
          if (N && N.code === "EAGAIN" && O < 10)
            return O++, u.call(e, d, h, m, y, g, w);
          $.apply(this, arguments);
        };
      }
      return u.call(e, d, h, m, y, g, w);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(c, u), c;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(u) {
    return function(c, d, h, m, y) {
      for (var g = 0; ; )
        try {
          return u.call(e, c, d, h, m, y);
        } catch ($) {
          if ($.code === "EAGAIN" && g < 10) {
            g++;
            continue;
          }
          throw $;
        }
    };
  }(e.readSync);
  function t(u) {
    u.lchmod = function(c, d, h) {
      u.open(
        c,
        $r.O_WRONLY | $r.O_SYMLINK,
        d,
        function(m, y) {
          if (m) {
            h && h(m);
            return;
          }
          u.fchmod(y, d, function(g) {
            u.close(y, function($) {
              h && h(g || $);
            });
          });
        }
      );
    }, u.lchmodSync = function(c, d) {
      var h = u.openSync(c, $r.O_WRONLY | $r.O_SYMLINK, d), m = !0, y;
      try {
        y = u.fchmodSync(h, d), m = !1;
      } finally {
        if (m)
          try {
            u.closeSync(h);
          } catch {
          }
        else
          u.closeSync(h);
      }
      return y;
    };
  }
  function r(u) {
    $r.hasOwnProperty("O_SYMLINK") && u.futimes ? (u.lutimes = function(c, d, h, m) {
      u.open(c, $r.O_SYMLINK, function(y, g) {
        if (y) {
          m && m(y);
          return;
        }
        u.futimes(g, d, h, function($) {
          u.close(g, function(w) {
            m && m($ || w);
          });
        });
      });
    }, u.lutimesSync = function(c, d, h) {
      var m = u.openSync(c, $r.O_SYMLINK), y, g = !0;
      try {
        y = u.futimesSync(m, d, h), g = !1;
      } finally {
        if (g)
          try {
            u.closeSync(m);
          } catch {
          }
        else
          u.closeSync(m);
      }
      return y;
    }) : u.futimes && (u.lutimes = function(c, d, h, m) {
      m && process.nextTick(m);
    }, u.lutimesSync = function() {
    });
  }
  function n(u) {
    return u && function(c, d, h) {
      return u.call(e, c, d, function(m) {
        f(m) && (m = null), h && h.apply(this, arguments);
      });
    };
  }
  function i(u) {
    return u && function(c, d) {
      try {
        return u.call(e, c, d);
      } catch (h) {
        if (!f(h)) throw h;
      }
    };
  }
  function o(u) {
    return u && function(c, d, h, m) {
      return u.call(e, c, d, h, function(y) {
        f(y) && (y = null), m && m.apply(this, arguments);
      });
    };
  }
  function a(u) {
    return u && function(c, d, h) {
      try {
        return u.call(e, c, d, h);
      } catch (m) {
        if (!f(m)) throw m;
      }
    };
  }
  function s(u) {
    return u && function(c, d, h) {
      typeof d == "function" && (h = d, d = null);
      function m(y, g) {
        g && (g.uid < 0 && (g.uid += 4294967296), g.gid < 0 && (g.gid += 4294967296)), h && h.apply(this, arguments);
      }
      return d ? u.call(e, c, d, m) : u.call(e, c, m);
    };
  }
  function l(u) {
    return u && function(c, d) {
      var h = d ? u.call(e, c, d) : u.call(e, c);
      return h && (h.uid < 0 && (h.uid += 4294967296), h.gid < 0 && (h.gid += 4294967296)), h;
    };
  }
  function f(u) {
    if (!u || u.code === "ENOSYS")
      return !0;
    var c = !process.getuid || process.getuid() !== 0;
    return !!(c && (u.code === "EINVAL" || u.code === "EPERM"));
  }
}
var zf = To.Stream, L_ = U_;
function U_(e) {
  return {
    ReadStream: t,
    WriteStream: r
  };
  function t(n, i) {
    if (!(this instanceof t)) return new t(n, i);
    zf.call(this);
    var o = this;
    this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var a = Object.keys(i), s = 0, l = a.length; s < l; s++) {
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
    e.open(this.path, this.flags, this.mode, function(u, c) {
      if (u) {
        o.emit("error", u), o.readable = !1;
        return;
      }
      o.fd = c, o.emit("open", c), o._read();
    });
  }
  function r(n, i) {
    if (!(this instanceof r)) return new r(n, i);
    zf.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var o = Object.keys(i), a = 0, s = o.length; a < s; a++) {
      var l = o[a];
      this[l] = i[l];
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
var M_ = B_, j_ = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function B_(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: j_(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(r) {
    Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
  }), t;
}
var be = qr, H_ = x_, q_ = L_, G_ = M_, Zo = Za, ze, Ra;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (ze = Symbol.for("graceful-fs.queue"), Ra = Symbol.for("graceful-fs.previous")) : (ze = "___graceful-fs.queue", Ra = "___graceful-fs.previous");
function V_() {
}
function um(e, t) {
  Object.defineProperty(e, ze, {
    get: function() {
      return t;
    }
  });
}
var pn = V_;
Zo.debuglog ? pn = Zo.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (pn = function() {
  var e = Zo.format.apply(Zo, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!be[ze]) {
  var z_ = Ft[ze] || [];
  um(be, z_), be.close = function(e) {
    function t(r, n) {
      return e.call(be, r, function(i) {
        i || Wf(), typeof n == "function" && n.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, Ra, {
      value: e
    }), t;
  }(be.close), be.closeSync = function(e) {
    function t(r) {
      e.apply(be, arguments), Wf();
    }
    return Object.defineProperty(t, Ra, {
      value: e
    }), t;
  }(be.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    pn(be[ze]), Qp.equal(be[ze].length, 0);
  });
}
Ft[ze] || um(Ft, be[ze]);
var Le = Ac(G_(be));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !be.__patched && (Le = Ac(be), be.__patched = !0);
function Ac(e) {
  H_(e), e.gracefulify = Ac, e.createReadStream = j, e.createWriteStream = I;
  var t = e.readFile;
  e.readFile = r;
  function r(E, Y, B) {
    return typeof Y == "function" && (B = Y, Y = null), z(E, Y, B);
    function z(X, k, x, G) {
      return t(X, k, function(L) {
        L && (L.code === "EMFILE" || L.code === "ENFILE") ? Cn([z, [X, k, x], L, G || Date.now(), Date.now()]) : typeof x == "function" && x.apply(this, arguments);
      });
    }
  }
  var n = e.writeFile;
  e.writeFile = i;
  function i(E, Y, B, z) {
    return typeof B == "function" && (z = B, B = null), X(E, Y, B, z);
    function X(k, x, G, L, W) {
      return n(k, x, G, function(V) {
        V && (V.code === "EMFILE" || V.code === "ENFILE") ? Cn([X, [k, x, G, L], V, W || Date.now(), Date.now()]) : typeof L == "function" && L.apply(this, arguments);
      });
    }
  }
  var o = e.appendFile;
  o && (e.appendFile = a);
  function a(E, Y, B, z) {
    return typeof B == "function" && (z = B, B = null), X(E, Y, B, z);
    function X(k, x, G, L, W) {
      return o(k, x, G, function(V) {
        V && (V.code === "EMFILE" || V.code === "ENFILE") ? Cn([X, [k, x, G, L], V, W || Date.now(), Date.now()]) : typeof L == "function" && L.apply(this, arguments);
      });
    }
  }
  var s = e.copyFile;
  s && (e.copyFile = l);
  function l(E, Y, B, z) {
    return typeof B == "function" && (z = B, B = 0), X(E, Y, B, z);
    function X(k, x, G, L, W) {
      return s(k, x, G, function(V) {
        V && (V.code === "EMFILE" || V.code === "ENFILE") ? Cn([X, [k, x, G, L], V, W || Date.now(), Date.now()]) : typeof L == "function" && L.apply(this, arguments);
      });
    }
  }
  var f = e.readdir;
  e.readdir = c;
  var u = /^v[0-5]\./;
  function c(E, Y, B) {
    typeof Y == "function" && (B = Y, Y = null);
    var z = u.test(process.version) ? function(x, G, L, W) {
      return f(x, X(
        x,
        G,
        L,
        W
      ));
    } : function(x, G, L, W) {
      return f(x, G, X(
        x,
        G,
        L,
        W
      ));
    };
    return z(E, Y, B);
    function X(k, x, G, L) {
      return function(W, V) {
        W && (W.code === "EMFILE" || W.code === "ENFILE") ? Cn([
          z,
          [k, x, G],
          W,
          L || Date.now(),
          Date.now()
        ]) : (V && V.sort && V.sort(), typeof G == "function" && G.call(this, W, V));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var d = q_(e);
    $ = d.ReadStream, O = d.WriteStream;
  }
  var h = e.ReadStream;
  h && ($.prototype = Object.create(h.prototype), $.prototype.open = w);
  var m = e.WriteStream;
  m && (O.prototype = Object.create(m.prototype), O.prototype.open = N), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return $;
    },
    set: function(E) {
      $ = E;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return O;
    },
    set: function(E) {
      O = E;
    },
    enumerable: !0,
    configurable: !0
  });
  var y = $;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return y;
    },
    set: function(E) {
      y = E;
    },
    enumerable: !0,
    configurable: !0
  });
  var g = O;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return g;
    },
    set: function(E) {
      g = E;
    },
    enumerable: !0,
    configurable: !0
  });
  function $(E, Y) {
    return this instanceof $ ? (h.apply(this, arguments), this) : $.apply(Object.create($.prototype), arguments);
  }
  function w() {
    var E = this;
    q(E.path, E.flags, E.mode, function(Y, B) {
      Y ? (E.autoClose && E.destroy(), E.emit("error", Y)) : (E.fd = B, E.emit("open", B), E.read());
    });
  }
  function O(E, Y) {
    return this instanceof O ? (m.apply(this, arguments), this) : O.apply(Object.create(O.prototype), arguments);
  }
  function N() {
    var E = this;
    q(E.path, E.flags, E.mode, function(Y, B) {
      Y ? (E.destroy(), E.emit("error", Y)) : (E.fd = B, E.emit("open", B));
    });
  }
  function j(E, Y) {
    return new e.ReadStream(E, Y);
  }
  function I(E, Y) {
    return new e.WriteStream(E, Y);
  }
  var F = e.open;
  e.open = q;
  function q(E, Y, B, z) {
    return typeof B == "function" && (z = B, B = null), X(E, Y, B, z);
    function X(k, x, G, L, W) {
      return F(k, x, G, function(V, U) {
        V && (V.code === "EMFILE" || V.code === "ENFILE") ? Cn([X, [k, x, G, L], V, W || Date.now(), Date.now()]) : typeof L == "function" && L.apply(this, arguments);
      });
    }
  }
  return e;
}
function Cn(e) {
  pn("ENQUEUE", e[0].name, e[1]), be[ze].push(e), Tc();
}
var ea;
function Wf() {
  for (var e = Date.now(), t = 0; t < be[ze].length; ++t)
    be[ze][t].length > 2 && (be[ze][t][3] = e, be[ze][t][4] = e);
  Tc();
}
function Tc() {
  if (clearTimeout(ea), ea = void 0, be[ze].length !== 0) {
    var e = be[ze].shift(), t = e[0], r = e[1], n = e[2], i = e[3], o = e[4];
    if (i === void 0)
      pn("RETRY", t.name, r), t.apply(null, r);
    else if (Date.now() - i >= 6e4) {
      pn("TIMEOUT", t.name, r);
      var a = r.pop();
      typeof a == "function" && a.call(null, n);
    } else {
      var s = Date.now() - o, l = Math.max(o - i, 1), f = Math.min(l * 1.2, 100);
      s >= f ? (pn("RETRY", t.name, r), t.apply(null, r.concat([i]))) : be[ze].push(e);
    }
    ea === void 0 && (ea = setTimeout(Tc, 0));
  }
}
(function(e) {
  const t = de.fromCallback, r = Le, n = [
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
  }, e.read = function(i, o, a, s, l, f) {
    return typeof f == "function" ? r.read(i, o, a, s, l, f) : new Promise((u, c) => {
      r.read(i, o, a, s, l, (d, h, m) => {
        if (d) return c(d);
        u({ bytesRead: h, buffer: m });
      });
    });
  }, e.write = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.write(i, o, ...a) : new Promise((s, l) => {
      r.write(i, o, ...a, (f, u, c) => {
        if (f) return l(f);
        s({ bytesWritten: u, buffer: c });
      });
    });
  }, typeof r.writev == "function" && (e.writev = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.writev(i, o, ...a) : new Promise((s, l) => {
      r.writev(i, o, ...a, (f, u, c) => {
        if (f) return l(f);
        s({ bytesWritten: u, buffers: c });
      });
    });
  }), typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(wn);
var Pc = {}, fm = {};
const W_ = ce;
fm.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(W_.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const dm = wn, { checkPath: hm } = fm, pm = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
Pc.makeDir = async (e, t) => (hm(e), dm.mkdir(e, {
  mode: pm(t),
  recursive: !0
}));
Pc.makeDirSync = (e, t) => (hm(e), dm.mkdirSync(e, {
  mode: pm(t),
  recursive: !0
}));
const Y_ = de.fromPromise, { makeDir: K_, makeDirSync: Zs } = Pc, el = Y_(K_);
var Kt = {
  mkdirs: el,
  mkdirsSync: Zs,
  // alias
  mkdirp: el,
  mkdirpSync: Zs,
  ensureDir: el,
  ensureDirSync: Zs
};
const X_ = de.fromPromise, mm = wn;
function J_(e) {
  return mm.access(e).then(() => !0).catch(() => !1);
}
var En = {
  pathExists: X_(J_),
  pathExistsSync: mm.existsSync
};
const Jn = Le;
function Q_(e, t, r, n) {
  Jn.open(e, "r+", (i, o) => {
    if (i) return n(i);
    Jn.futimes(o, t, r, (a) => {
      Jn.close(o, (s) => {
        n && n(a || s);
      });
    });
  });
}
function Z_(e, t, r) {
  const n = Jn.openSync(e, "r+");
  return Jn.futimesSync(n, t, r), Jn.closeSync(n);
}
var ym = {
  utimesMillis: Q_,
  utimesMillisSync: Z_
};
const ri = wn, Me = ce, ew = Za;
function tw(e, t, r) {
  const n = r.dereference ? (i) => ri.stat(i, { bigint: !0 }) : (i) => ri.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
}
function rw(e, t, r) {
  let n;
  const i = r.dereference ? (a) => ri.statSync(a, { bigint: !0 }) : (a) => ri.lstatSync(a, { bigint: !0 }), o = i(e);
  try {
    n = i(t);
  } catch (a) {
    if (a.code === "ENOENT") return { srcStat: o, destStat: null };
    throw a;
  }
  return { srcStat: o, destStat: n };
}
function nw(e, t, r, n, i) {
  ew.callbackify(tw)(e, t, n, (o, a) => {
    if (o) return i(o);
    const { srcStat: s, destStat: l } = a;
    if (l) {
      if (Io(s, l)) {
        const f = Me.basename(e), u = Me.basename(t);
        return r === "move" && f !== u && f.toLowerCase() === u.toLowerCase() ? i(null, { srcStat: s, destStat: l, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (s.isDirectory() && !l.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!s.isDirectory() && l.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return s.isDirectory() && Cc(e, t) ? i(new Error(os(e, t, r))) : i(null, { srcStat: s, destStat: l });
  });
}
function iw(e, t, r, n) {
  const { srcStat: i, destStat: o } = rw(e, t, n);
  if (o) {
    if (Io(i, o)) {
      const a = Me.basename(e), s = Me.basename(t);
      if (r === "move" && a !== s && a.toLowerCase() === s.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && Cc(e, t))
    throw new Error(os(e, t, r));
  return { srcStat: i, destStat: o };
}
function gm(e, t, r, n, i) {
  const o = Me.resolve(Me.dirname(e)), a = Me.resolve(Me.dirname(r));
  if (a === o || a === Me.parse(a).root) return i();
  ri.stat(a, { bigint: !0 }, (s, l) => s ? s.code === "ENOENT" ? i() : i(s) : Io(t, l) ? i(new Error(os(e, r, n))) : gm(e, t, a, n, i));
}
function vm(e, t, r, n) {
  const i = Me.resolve(Me.dirname(e)), o = Me.resolve(Me.dirname(r));
  if (o === i || o === Me.parse(o).root) return;
  let a;
  try {
    a = ri.statSync(o, { bigint: !0 });
  } catch (s) {
    if (s.code === "ENOENT") return;
    throw s;
  }
  if (Io(t, a))
    throw new Error(os(e, r, n));
  return vm(e, t, o, n);
}
function Io(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function Cc(e, t) {
  const r = Me.resolve(e).split(Me.sep).filter((i) => i), n = Me.resolve(t).split(Me.sep).filter((i) => i);
  return r.reduce((i, o, a) => i && n[a] === o, !0);
}
function os(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var ui = {
  checkPaths: nw,
  checkPathsSync: iw,
  checkParentPaths: gm,
  checkParentPathsSync: vm,
  isSrcSubdir: Cc,
  areIdentical: Io
};
const yt = Le, oo = ce, ow = Kt.mkdirs, aw = En.pathExists, sw = ym.utimesMillis, ao = ui;
function lw(e, t, r, n) {
  typeof r == "function" && !n ? (n = r, r = {}) : typeof r == "function" && (r = { filter: r }), n = n || function() {
  }, r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), ao.checkPaths(e, t, "copy", r, (i, o) => {
    if (i) return n(i);
    const { srcStat: a, destStat: s } = o;
    ao.checkParentPaths(e, a, t, "copy", (l) => l ? n(l) : r.filter ? $m(Yf, s, e, t, r, n) : Yf(s, e, t, r, n));
  });
}
function Yf(e, t, r, n, i) {
  const o = oo.dirname(r);
  aw(o, (a, s) => {
    if (a) return i(a);
    if (s) return Da(e, t, r, n, i);
    ow(o, (l) => l ? i(l) : Da(e, t, r, n, i));
  });
}
function $m(e, t, r, n, i, o) {
  Promise.resolve(i.filter(r, n)).then((a) => a ? e(t, r, n, i, o) : o(), (a) => o(a));
}
function cw(e, t, r, n, i) {
  return n.filter ? $m(Da, e, t, r, n, i) : Da(e, t, r, n, i);
}
function Da(e, t, r, n, i) {
  (n.dereference ? yt.stat : yt.lstat)(t, (a, s) => a ? i(a) : s.isDirectory() ? yw(s, e, t, r, n, i) : s.isFile() || s.isCharacterDevice() || s.isBlockDevice() ? uw(s, e, t, r, n, i) : s.isSymbolicLink() ? $w(e, t, r, n, i) : s.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : s.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function uw(e, t, r, n, i, o) {
  return t ? fw(e, r, n, i, o) : _m(e, r, n, i, o);
}
function fw(e, t, r, n, i) {
  if (n.overwrite)
    yt.unlink(r, (o) => o ? i(o) : _m(e, t, r, n, i));
  else return n.errorOnExist ? i(new Error(`'${r}' already exists`)) : i();
}
function _m(e, t, r, n, i) {
  yt.copyFile(t, r, (o) => o ? i(o) : n.preserveTimestamps ? dw(e.mode, t, r, i) : as(r, e.mode, i));
}
function dw(e, t, r, n) {
  return hw(e) ? pw(r, e, (i) => i ? n(i) : Kf(e, t, r, n)) : Kf(e, t, r, n);
}
function hw(e) {
  return (e & 128) === 0;
}
function pw(e, t, r) {
  return as(e, t | 128, r);
}
function Kf(e, t, r, n) {
  mw(t, r, (i) => i ? n(i) : as(r, e, n));
}
function as(e, t, r) {
  return yt.chmod(e, t, r);
}
function mw(e, t, r) {
  yt.stat(e, (n, i) => n ? r(n) : sw(t, i.atime, i.mtime, r));
}
function yw(e, t, r, n, i, o) {
  return t ? wm(r, n, i, o) : gw(e.mode, r, n, i, o);
}
function gw(e, t, r, n, i) {
  yt.mkdir(r, (o) => {
    if (o) return i(o);
    wm(t, r, n, (a) => a ? i(a) : as(r, e, i));
  });
}
function wm(e, t, r, n) {
  yt.readdir(e, (i, o) => i ? n(i) : Em(o, e, t, r, n));
}
function Em(e, t, r, n, i) {
  const o = e.pop();
  return o ? vw(e, o, t, r, n, i) : i();
}
function vw(e, t, r, n, i, o) {
  const a = oo.join(r, t), s = oo.join(n, t);
  ao.checkPaths(a, s, "copy", i, (l, f) => {
    if (l) return o(l);
    const { destStat: u } = f;
    cw(u, a, s, i, (c) => c ? o(c) : Em(e, r, n, i, o));
  });
}
function $w(e, t, r, n, i) {
  yt.readlink(t, (o, a) => {
    if (o) return i(o);
    if (n.dereference && (a = oo.resolve(process.cwd(), a)), e)
      yt.readlink(r, (s, l) => s ? s.code === "EINVAL" || s.code === "UNKNOWN" ? yt.symlink(a, r, i) : i(s) : (n.dereference && (l = oo.resolve(process.cwd(), l)), ao.isSrcSubdir(a, l) ? i(new Error(`Cannot copy '${a}' to a subdirectory of itself, '${l}'.`)) : e.isDirectory() && ao.isSrcSubdir(l, a) ? i(new Error(`Cannot overwrite '${l}' with '${a}'.`)) : _w(a, r, i)));
    else
      return yt.symlink(a, r, i);
  });
}
function _w(e, t, r) {
  yt.unlink(t, (n) => n ? r(n) : yt.symlink(e, t, r));
}
var ww = lw;
const tt = Le, so = ce, Ew = Kt.mkdirsSync, Sw = ym.utimesMillisSync, lo = ui;
function bw(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = lo.checkPathsSync(e, t, "copy", r);
  return lo.checkParentPathsSync(e, n, t, "copy"), Aw(i, e, t, r);
}
function Aw(e, t, r, n) {
  if (n.filter && !n.filter(t, r)) return;
  const i = so.dirname(r);
  return tt.existsSync(i) || Ew(i), Sm(e, t, r, n);
}
function Tw(e, t, r, n) {
  if (!(n.filter && !n.filter(t, r)))
    return Sm(e, t, r, n);
}
function Sm(e, t, r, n) {
  const o = (n.dereference ? tt.statSync : tt.lstatSync)(t);
  if (o.isDirectory()) return Dw(o, e, t, r, n);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return Pw(o, e, t, r, n);
  if (o.isSymbolicLink()) return Fw(e, t, r, n);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function Pw(e, t, r, n, i) {
  return t ? Cw(e, r, n, i) : bm(e, r, n, i);
}
function Cw(e, t, r, n) {
  if (n.overwrite)
    return tt.unlinkSync(r), bm(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function bm(e, t, r, n) {
  return tt.copyFileSync(t, r), n.preserveTimestamps && Ow(e.mode, t, r), Oc(r, e.mode);
}
function Ow(e, t, r) {
  return Iw(e) && Nw(r, e), Rw(t, r);
}
function Iw(e) {
  return (e & 128) === 0;
}
function Nw(e, t) {
  return Oc(e, t | 128);
}
function Oc(e, t) {
  return tt.chmodSync(e, t);
}
function Rw(e, t) {
  const r = tt.statSync(e);
  return Sw(t, r.atime, r.mtime);
}
function Dw(e, t, r, n, i) {
  return t ? Am(r, n, i) : kw(e.mode, r, n, i);
}
function kw(e, t, r, n) {
  return tt.mkdirSync(r), Am(t, r, n), Oc(r, e);
}
function Am(e, t, r) {
  tt.readdirSync(e).forEach((n) => xw(n, e, t, r));
}
function xw(e, t, r, n) {
  const i = so.join(t, e), o = so.join(r, e), { destStat: a } = lo.checkPathsSync(i, o, "copy", n);
  return Tw(a, i, o, n);
}
function Fw(e, t, r, n) {
  let i = tt.readlinkSync(t);
  if (n.dereference && (i = so.resolve(process.cwd(), i)), e) {
    let o;
    try {
      o = tt.readlinkSync(r);
    } catch (a) {
      if (a.code === "EINVAL" || a.code === "UNKNOWN") return tt.symlinkSync(i, r);
      throw a;
    }
    if (n.dereference && (o = so.resolve(process.cwd(), o)), lo.isSrcSubdir(i, o))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
    if (tt.statSync(r).isDirectory() && lo.isSrcSubdir(o, i))
      throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
    return Lw(i, r);
  } else
    return tt.symlinkSync(i, r);
}
function Lw(e, t) {
  return tt.unlinkSync(t), tt.symlinkSync(e, t);
}
var Uw = bw;
const Mw = de.fromCallback;
var Ic = {
  copy: Mw(ww),
  copySync: Uw
};
const Xf = Le, Tm = ce, me = Qp, co = process.platform === "win32";
function Pm(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((r) => {
    e[r] = e[r] || Xf[r], r = r + "Sync", e[r] = e[r] || Xf[r];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function Nc(e, t, r) {
  let n = 0;
  typeof t == "function" && (r = t, t = {}), me(e, "rimraf: missing path"), me.strictEqual(typeof e, "string", "rimraf: path should be a string"), me.strictEqual(typeof r, "function", "rimraf: callback function required"), me(t, "rimraf: invalid options argument provided"), me.strictEqual(typeof t, "object", "rimraf: options should be object"), Pm(t), Jf(e, t, function i(o) {
    if (o) {
      if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && n < t.maxBusyTries) {
        n++;
        const a = n * 100;
        return setTimeout(() => Jf(e, t, i), a);
      }
      o.code === "ENOENT" && (o = null);
    }
    r(o);
  });
}
function Jf(e, t, r) {
  me(e), me(t), me(typeof r == "function"), t.lstat(e, (n, i) => {
    if (n && n.code === "ENOENT")
      return r(null);
    if (n && n.code === "EPERM" && co)
      return Qf(e, t, n, r);
    if (i && i.isDirectory())
      return _a(e, t, n, r);
    t.unlink(e, (o) => {
      if (o) {
        if (o.code === "ENOENT")
          return r(null);
        if (o.code === "EPERM")
          return co ? Qf(e, t, o, r) : _a(e, t, o, r);
        if (o.code === "EISDIR")
          return _a(e, t, o, r);
      }
      return r(o);
    });
  });
}
function Qf(e, t, r, n) {
  me(e), me(t), me(typeof n == "function"), t.chmod(e, 438, (i) => {
    i ? n(i.code === "ENOENT" ? null : r) : t.stat(e, (o, a) => {
      o ? n(o.code === "ENOENT" ? null : r) : a.isDirectory() ? _a(e, t, r, n) : t.unlink(e, n);
    });
  });
}
function Zf(e, t, r) {
  let n;
  me(e), me(t);
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
  n.isDirectory() ? wa(e, t, r) : t.unlinkSync(e);
}
function _a(e, t, r, n) {
  me(e), me(t), me(typeof n == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? jw(e, t, n) : i && i.code === "ENOTDIR" ? n(r) : n(i);
  });
}
function jw(e, t, r) {
  me(e), me(t), me(typeof r == "function"), t.readdir(e, (n, i) => {
    if (n) return r(n);
    let o = i.length, a;
    if (o === 0) return t.rmdir(e, r);
    i.forEach((s) => {
      Nc(Tm.join(e, s), t, (l) => {
        if (!a) {
          if (l) return r(a = l);
          --o === 0 && t.rmdir(e, r);
        }
      });
    });
  });
}
function Cm(e, t) {
  let r;
  t = t || {}, Pm(t), me(e, "rimraf: missing path"), me.strictEqual(typeof e, "string", "rimraf: path should be a string"), me(t, "rimraf: missing options"), me.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    r = t.lstatSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    n.code === "EPERM" && co && Zf(e, t, n);
  }
  try {
    r && r.isDirectory() ? wa(e, t, null) : t.unlinkSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    if (n.code === "EPERM")
      return co ? Zf(e, t, n) : wa(e, t, n);
    if (n.code !== "EISDIR")
      throw n;
    wa(e, t, n);
  }
}
function wa(e, t, r) {
  me(e), me(t);
  try {
    t.rmdirSync(e);
  } catch (n) {
    if (n.code === "ENOTDIR")
      throw r;
    if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM")
      Bw(e, t);
    else if (n.code !== "ENOENT")
      throw n;
  }
}
function Bw(e, t) {
  if (me(e), me(t), t.readdirSync(e).forEach((r) => Cm(Tm.join(e, r), t)), co) {
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
var Hw = Nc;
Nc.sync = Cm;
const ka = Le, qw = de.fromCallback, Om = Hw;
function Gw(e, t) {
  if (ka.rm) return ka.rm(e, { recursive: !0, force: !0 }, t);
  Om(e, t);
}
function Vw(e) {
  if (ka.rmSync) return ka.rmSync(e, { recursive: !0, force: !0 });
  Om.sync(e);
}
var ss = {
  remove: qw(Gw),
  removeSync: Vw
};
const zw = de.fromPromise, Im = wn, Nm = ce, Rm = Kt, Dm = ss, ed = zw(async function(t) {
  let r;
  try {
    r = await Im.readdir(t);
  } catch {
    return Rm.mkdirs(t);
  }
  return Promise.all(r.map((n) => Dm.remove(Nm.join(t, n))));
});
function td(e) {
  let t;
  try {
    t = Im.readdirSync(e);
  } catch {
    return Rm.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = Nm.join(e, r), Dm.removeSync(r);
  });
}
var Ww = {
  emptyDirSync: td,
  emptydirSync: td,
  emptyDir: ed,
  emptydir: ed
};
const Yw = de.fromCallback, km = ce, Nr = Le, xm = Kt;
function Kw(e, t) {
  function r() {
    Nr.writeFile(e, "", (n) => {
      if (n) return t(n);
      t();
    });
  }
  Nr.stat(e, (n, i) => {
    if (!n && i.isFile()) return t();
    const o = km.dirname(e);
    Nr.stat(o, (a, s) => {
      if (a)
        return a.code === "ENOENT" ? xm.mkdirs(o, (l) => {
          if (l) return t(l);
          r();
        }) : t(a);
      s.isDirectory() ? r() : Nr.readdir(o, (l) => {
        if (l) return t(l);
      });
    });
  });
}
function Xw(e) {
  let t;
  try {
    t = Nr.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = km.dirname(e);
  try {
    Nr.statSync(r).isDirectory() || Nr.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") xm.mkdirsSync(r);
    else throw n;
  }
  Nr.writeFileSync(e, "");
}
var Jw = {
  createFile: Yw(Kw),
  createFileSync: Xw
};
const Qw = de.fromCallback, Fm = ce, Pr = Le, Lm = Kt, Zw = En.pathExists, { areIdentical: Um } = ui;
function eE(e, t, r) {
  function n(i, o) {
    Pr.link(i, o, (a) => {
      if (a) return r(a);
      r(null);
    });
  }
  Pr.lstat(t, (i, o) => {
    Pr.lstat(e, (a, s) => {
      if (a)
        return a.message = a.message.replace("lstat", "ensureLink"), r(a);
      if (o && Um(s, o)) return r(null);
      const l = Fm.dirname(t);
      Zw(l, (f, u) => {
        if (f) return r(f);
        if (u) return n(e, t);
        Lm.mkdirs(l, (c) => {
          if (c) return r(c);
          n(e, t);
        });
      });
    });
  });
}
function tE(e, t) {
  let r;
  try {
    r = Pr.lstatSync(t);
  } catch {
  }
  try {
    const o = Pr.lstatSync(e);
    if (r && Um(o, r)) return;
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  const n = Fm.dirname(t);
  return Pr.existsSync(n) || Lm.mkdirsSync(n), Pr.linkSync(e, t);
}
var rE = {
  createLink: Qw(eE),
  createLinkSync: tE
};
const Rr = ce, Xi = Le, nE = En.pathExists;
function iE(e, t, r) {
  if (Rr.isAbsolute(e))
    return Xi.lstat(e, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), r(n)) : r(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const n = Rr.dirname(t), i = Rr.join(n, e);
    return nE(i, (o, a) => o ? r(o) : a ? r(null, {
      toCwd: i,
      toDst: e
    }) : Xi.lstat(e, (s) => s ? (s.message = s.message.replace("lstat", "ensureSymlink"), r(s)) : r(null, {
      toCwd: e,
      toDst: Rr.relative(n, e)
    })));
  }
}
function oE(e, t) {
  let r;
  if (Rr.isAbsolute(e)) {
    if (r = Xi.existsSync(e), !r) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const n = Rr.dirname(t), i = Rr.join(n, e);
    if (r = Xi.existsSync(i), r)
      return {
        toCwd: i,
        toDst: e
      };
    if (r = Xi.existsSync(e), !r) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: Rr.relative(n, e)
    };
  }
}
var aE = {
  symlinkPaths: iE,
  symlinkPathsSync: oE
};
const Mm = Le;
function sE(e, t, r) {
  if (r = typeof t == "function" ? t : r, t = typeof t == "function" ? !1 : t, t) return r(null, t);
  Mm.lstat(e, (n, i) => {
    if (n) return r(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", r(null, t);
  });
}
function lE(e, t) {
  let r;
  if (t) return t;
  try {
    r = Mm.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var cE = {
  symlinkType: sE,
  symlinkTypeSync: lE
};
const uE = de.fromCallback, jm = ce, kt = wn, Bm = Kt, fE = Bm.mkdirs, dE = Bm.mkdirsSync, Hm = aE, hE = Hm.symlinkPaths, pE = Hm.symlinkPathsSync, qm = cE, mE = qm.symlinkType, yE = qm.symlinkTypeSync, gE = En.pathExists, { areIdentical: Gm } = ui;
function vE(e, t, r, n) {
  n = typeof r == "function" ? r : n, r = typeof r == "function" ? !1 : r, kt.lstat(t, (i, o) => {
    !i && o.isSymbolicLink() ? Promise.all([
      kt.stat(e),
      kt.stat(t)
    ]).then(([a, s]) => {
      if (Gm(a, s)) return n(null);
      rd(e, t, r, n);
    }) : rd(e, t, r, n);
  });
}
function rd(e, t, r, n) {
  hE(e, t, (i, o) => {
    if (i) return n(i);
    e = o.toDst, mE(o.toCwd, r, (a, s) => {
      if (a) return n(a);
      const l = jm.dirname(t);
      gE(l, (f, u) => {
        if (f) return n(f);
        if (u) return kt.symlink(e, t, s, n);
        fE(l, (c) => {
          if (c) return n(c);
          kt.symlink(e, t, s, n);
        });
      });
    });
  });
}
function $E(e, t, r) {
  let n;
  try {
    n = kt.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const s = kt.statSync(e), l = kt.statSync(t);
    if (Gm(s, l)) return;
  }
  const i = pE(e, t);
  e = i.toDst, r = yE(i.toCwd, r);
  const o = jm.dirname(t);
  return kt.existsSync(o) || dE(o), kt.symlinkSync(e, t, r);
}
var _E = {
  createSymlink: uE(vE),
  createSymlinkSync: $E
};
const { createFile: nd, createFileSync: id } = Jw, { createLink: od, createLinkSync: ad } = rE, { createSymlink: sd, createSymlinkSync: ld } = _E;
var wE = {
  // file
  createFile: nd,
  createFileSync: id,
  ensureFile: nd,
  ensureFileSync: id,
  // link
  createLink: od,
  createLinkSync: ad,
  ensureLink: od,
  ensureLinkSync: ad,
  // symlink
  createSymlink: sd,
  createSymlinkSync: ld,
  ensureSymlink: sd,
  ensureSymlinkSync: ld
};
function EE(e, { EOL: t = `
`, finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
  const o = r ? t : "";
  return JSON.stringify(e, n, i).replace(/\n/g, t) + o;
}
function SE(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var No = { stringify: EE, stripBom: SE };
let ni;
try {
  ni = Le;
} catch {
  ni = qr;
}
const ls = de, { stringify: Vm, stripBom: zm } = No;
async function bE(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || ni, n = "throws" in t ? t.throws : !0;
  let i = await ls.fromCallback(r.readFile)(e, t);
  i = zm(i);
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
const AE = ls.fromPromise(bE);
function TE(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || ni, n = "throws" in t ? t.throws : !0;
  try {
    let i = r.readFileSync(e, t);
    return i = zm(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (n)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function PE(e, t, r = {}) {
  const n = r.fs || ni, i = Vm(t, r);
  await ls.fromCallback(n.writeFile)(e, i, r);
}
const CE = ls.fromPromise(PE);
function OE(e, t, r = {}) {
  const n = r.fs || ni, i = Vm(t, r);
  return n.writeFileSync(e, i, r);
}
const IE = {
  readFile: AE,
  readFileSync: TE,
  writeFile: CE,
  writeFileSync: OE
};
var Wm = IE;
const ta = Wm;
var NE = {
  // jsonfile exports
  readJson: ta.readFile,
  readJsonSync: ta.readFileSync,
  writeJson: ta.writeFile,
  writeJsonSync: ta.writeFileSync
};
const RE = de.fromCallback, Ji = Le, Ym = ce, Km = Kt, DE = En.pathExists;
function kE(e, t, r, n) {
  typeof r == "function" && (n = r, r = "utf8");
  const i = Ym.dirname(e);
  DE(i, (o, a) => {
    if (o) return n(o);
    if (a) return Ji.writeFile(e, t, r, n);
    Km.mkdirs(i, (s) => {
      if (s) return n(s);
      Ji.writeFile(e, t, r, n);
    });
  });
}
function xE(e, ...t) {
  const r = Ym.dirname(e);
  if (Ji.existsSync(r))
    return Ji.writeFileSync(e, ...t);
  Km.mkdirsSync(r), Ji.writeFileSync(e, ...t);
}
var Rc = {
  outputFile: RE(kE),
  outputFileSync: xE
};
const { stringify: FE } = No, { outputFile: LE } = Rc;
async function UE(e, t, r = {}) {
  const n = FE(t, r);
  await LE(e, n, r);
}
var ME = UE;
const { stringify: jE } = No, { outputFileSync: BE } = Rc;
function HE(e, t, r) {
  const n = jE(t, r);
  BE(e, n, r);
}
var qE = HE;
const GE = de.fromPromise, ut = NE;
ut.outputJson = GE(ME);
ut.outputJsonSync = qE;
ut.outputJSON = ut.outputJson;
ut.outputJSONSync = ut.outputJsonSync;
ut.writeJSON = ut.writeJson;
ut.writeJSONSync = ut.writeJsonSync;
ut.readJSON = ut.readJson;
ut.readJSONSync = ut.readJsonSync;
var VE = ut;
const zE = Le, Gl = ce, WE = Ic.copy, Xm = ss.remove, YE = Kt.mkdirp, KE = En.pathExists, cd = ui;
function XE(e, t, r, n) {
  typeof r == "function" && (n = r, r = {}), r = r || {};
  const i = r.overwrite || r.clobber || !1;
  cd.checkPaths(e, t, "move", r, (o, a) => {
    if (o) return n(o);
    const { srcStat: s, isChangingCase: l = !1 } = a;
    cd.checkParentPaths(e, s, t, "move", (f) => {
      if (f) return n(f);
      if (JE(t)) return ud(e, t, i, l, n);
      YE(Gl.dirname(t), (u) => u ? n(u) : ud(e, t, i, l, n));
    });
  });
}
function JE(e) {
  const t = Gl.dirname(e);
  return Gl.parse(t).root === t;
}
function ud(e, t, r, n, i) {
  if (n) return tl(e, t, r, i);
  if (r)
    return Xm(t, (o) => o ? i(o) : tl(e, t, r, i));
  KE(t, (o, a) => o ? i(o) : a ? i(new Error("dest already exists.")) : tl(e, t, r, i));
}
function tl(e, t, r, n) {
  zE.rename(e, t, (i) => i ? i.code !== "EXDEV" ? n(i) : QE(e, t, r, n) : n());
}
function QE(e, t, r, n) {
  WE(e, t, {
    overwrite: r,
    errorOnExist: !0
  }, (o) => o ? n(o) : Xm(e, n));
}
var ZE = XE;
const Jm = Le, Vl = ce, e1 = Ic.copySync, Qm = ss.removeSync, t1 = Kt.mkdirpSync, fd = ui;
function r1(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = fd.checkPathsSync(e, t, "move", r);
  return fd.checkParentPathsSync(e, i, t, "move"), n1(t) || t1(Vl.dirname(t)), i1(e, t, n, o);
}
function n1(e) {
  const t = Vl.dirname(e);
  return Vl.parse(t).root === t;
}
function i1(e, t, r, n) {
  if (n) return rl(e, t, r);
  if (r)
    return Qm(t), rl(e, t, r);
  if (Jm.existsSync(t)) throw new Error("dest already exists.");
  return rl(e, t, r);
}
function rl(e, t, r) {
  try {
    Jm.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return o1(e, t, r);
  }
}
function o1(e, t, r) {
  return e1(e, t, {
    overwrite: r,
    errorOnExist: !0
  }), Qm(e);
}
var a1 = r1;
const s1 = de.fromCallback;
var l1 = {
  move: s1(ZE),
  moveSync: a1
}, Gr = {
  // Export promiseified graceful-fs:
  ...wn,
  // Export extra methods:
  ...Ic,
  ...Ww,
  ...wE,
  ...VE,
  ...Kt,
  ...l1,
  ...Rc,
  ...En,
  ...ss
}, Di = {}, nn = {}, Ye = {}, Dc = {}, Lt = {};
function Zm(e) {
  return typeof e > "u" || e === null;
}
function c1(e) {
  return typeof e == "object" && e !== null;
}
function u1(e) {
  return Array.isArray(e) ? e : Zm(e) ? [] : [e];
}
function f1(e, t) {
  var r, n, i, o;
  if (t)
    for (o = Object.keys(t), r = 0, n = o.length; r < n; r += 1)
      i = o[r], e[i] = t[i];
  return e;
}
function d1(e, t) {
  var r = "", n;
  for (n = 0; n < t; n += 1)
    r += e;
  return r;
}
function h1(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
Lt.isNothing = Zm;
Lt.isObject = c1;
Lt.toArray = u1;
Lt.repeat = d1;
Lt.isNegativeZero = h1;
Lt.extend = f1;
function e0(e, t) {
  var r = "", n = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (r += `

` + e.mark.snippet), n + " " + r) : n;
}
function uo(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = e0(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
uo.prototype = Object.create(Error.prototype);
uo.prototype.constructor = uo;
uo.prototype.toString = function(t) {
  return this.name + ": " + e0(this, t);
};
var Ro = uo, Gi = Lt;
function nl(e, t, r, n, i) {
  var o = "", a = "", s = Math.floor(i / 2) - 1;
  return n - t > s && (o = " ... ", t = n - s + o.length), r - n > s && (a = " ...", r = n + s - a.length), {
    str: o + e.slice(t, r).replace(/\t/g, "→") + a,
    pos: n - t + o.length
    // relative position
  };
}
function il(e, t) {
  return Gi.repeat(" ", t - e.length) + e;
}
function p1(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, n = [0], i = [], o, a = -1; o = r.exec(e.buffer); )
    i.push(o.index), n.push(o.index + o[0].length), e.position <= o.index && a < 0 && (a = n.length - 2);
  a < 0 && (a = n.length - 1);
  var s = "", l, f, u = Math.min(e.line + t.linesAfter, i.length).toString().length, c = t.maxLength - (t.indent + u + 3);
  for (l = 1; l <= t.linesBefore && !(a - l < 0); l++)
    f = nl(
      e.buffer,
      n[a - l],
      i[a - l],
      e.position - (n[a] - n[a - l]),
      c
    ), s = Gi.repeat(" ", t.indent) + il((e.line - l + 1).toString(), u) + " | " + f.str + `
` + s;
  for (f = nl(e.buffer, n[a], i[a], e.position, c), s += Gi.repeat(" ", t.indent) + il((e.line + 1).toString(), u) + " | " + f.str + `
`, s += Gi.repeat("-", t.indent + u + 3 + f.pos) + `^
`, l = 1; l <= t.linesAfter && !(a + l >= i.length); l++)
    f = nl(
      e.buffer,
      n[a + l],
      i[a + l],
      e.position - (n[a] - n[a + l]),
      c
    ), s += Gi.repeat(" ", t.indent) + il((e.line + l + 1).toString(), u) + " | " + f.str + `
`;
  return s.replace(/\n$/, "");
}
var m1 = p1, dd = Ro, y1 = [
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
], g1 = [
  "scalar",
  "sequence",
  "mapping"
];
function v1(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(n) {
      t[String(n)] = r;
    });
  }), t;
}
function $1(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(r) {
    if (y1.indexOf(r) === -1)
      throw new dd('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(r) {
    return r;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = v1(t.styleAliases || null), g1.indexOf(this.kind) === -1)
    throw new dd('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var dt = $1, ki = Ro, ol = dt;
function hd(e, t) {
  var r = [];
  return e[t].forEach(function(n) {
    var i = r.length;
    r.forEach(function(o, a) {
      o.tag === n.tag && o.kind === n.kind && o.multi === n.multi && (i = a);
    }), r[i] = n;
  }), r;
}
function _1() {
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
function zl(e) {
  return this.extend(e);
}
zl.prototype.extend = function(t) {
  var r = [], n = [];
  if (t instanceof ol)
    n.push(t);
  else if (Array.isArray(t))
    n = n.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
  else
    throw new ki("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(o) {
    if (!(o instanceof ol))
      throw new ki("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new ki("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new ki("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), n.forEach(function(o) {
    if (!(o instanceof ol))
      throw new ki("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(zl.prototype);
  return i.implicit = (this.implicit || []).concat(r), i.explicit = (this.explicit || []).concat(n), i.compiledImplicit = hd(i, "implicit"), i.compiledExplicit = hd(i, "explicit"), i.compiledTypeMap = _1(i.compiledImplicit, i.compiledExplicit), i;
};
var t0 = zl, w1 = dt, r0 = new w1("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), E1 = dt, n0 = new E1("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), S1 = dt, i0 = new S1("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), b1 = t0, o0 = new b1({
  explicit: [
    r0,
    n0,
    i0
  ]
}), A1 = dt;
function T1(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function P1() {
  return null;
}
function C1(e) {
  return e === null;
}
var a0 = new A1("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: T1,
  construct: P1,
  predicate: C1,
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
}), O1 = dt;
function I1(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function N1(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function R1(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var s0 = new O1("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: I1,
  construct: N1,
  predicate: R1,
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
}), D1 = Lt, k1 = dt;
function x1(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function F1(e) {
  return 48 <= e && e <= 55;
}
function L1(e) {
  return 48 <= e && e <= 57;
}
function U1(e) {
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
          if (!x1(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "o") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!F1(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; r < t; r++)
    if (i = e[r], i !== "_") {
      if (!L1(e.charCodeAt(r)))
        return !1;
      n = !0;
    }
  return !(!n || i === "_");
}
function M1(e) {
  var t = e, r = 1, n;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), n = t[0], (n === "-" || n === "+") && (n === "-" && (r = -1), t = t.slice(1), n = t[0]), t === "0") return 0;
  if (n === "0") {
    if (t[1] === "b") return r * parseInt(t.slice(2), 2);
    if (t[1] === "x") return r * parseInt(t.slice(2), 16);
    if (t[1] === "o") return r * parseInt(t.slice(2), 8);
  }
  return r * parseInt(t, 10);
}
function j1(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !D1.isNegativeZero(e);
}
var l0 = new k1("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: U1,
  construct: M1,
  predicate: j1,
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
}), c0 = Lt, B1 = dt, H1 = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function q1(e) {
  return !(e === null || !H1.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function G1(e) {
  var t, r;
  return t = e.replace(/_/g, "").toLowerCase(), r = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : r * parseFloat(t, 10);
}
var V1 = /^[-+]?[0-9]+e/;
function z1(e, t) {
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
  else if (c0.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), V1.test(r) ? r.replace("e", ".e") : r;
}
function W1(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || c0.isNegativeZero(e));
}
var u0 = new B1("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: q1,
  construct: G1,
  predicate: W1,
  represent: z1,
  defaultStyle: "lowercase"
}), f0 = o0.extend({
  implicit: [
    a0,
    s0,
    l0,
    u0
  ]
}), d0 = f0, Y1 = dt, h0 = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), p0 = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function K1(e) {
  return e === null ? !1 : h0.exec(e) !== null || p0.exec(e) !== null;
}
function X1(e) {
  var t, r, n, i, o, a, s, l = 0, f = null, u, c, d;
  if (t = h0.exec(e), t === null && (t = p0.exec(e)), t === null) throw new Error("Date resolve error");
  if (r = +t[1], n = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(r, n, i));
  if (o = +t[4], a = +t[5], s = +t[6], t[7]) {
    for (l = t[7].slice(0, 3); l.length < 3; )
      l += "0";
    l = +l;
  }
  return t[9] && (u = +t[10], c = +(t[11] || 0), f = (u * 60 + c) * 6e4, t[9] === "-" && (f = -f)), d = new Date(Date.UTC(r, n, i, o, a, s, l)), f && d.setTime(d.getTime() - f), d;
}
function J1(e) {
  return e.toISOString();
}
var m0 = new Y1("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: K1,
  construct: X1,
  instanceOf: Date,
  represent: J1
}), Q1 = dt;
function Z1(e) {
  return e === "<<" || e === null;
}
var y0 = new Q1("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: Z1
}), eS = dt, kc = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function tS(e) {
  if (e === null) return !1;
  var t, r, n = 0, i = e.length, o = kc;
  for (r = 0; r < i; r++)
    if (t = o.indexOf(e.charAt(r)), !(t > 64)) {
      if (t < 0) return !1;
      n += 6;
    }
  return n % 8 === 0;
}
function rS(e) {
  var t, r, n = e.replace(/[\r\n=]/g, ""), i = n.length, o = kc, a = 0, s = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)), a = a << 6 | o.indexOf(n.charAt(t));
  return r = i % 4 * 6, r === 0 ? (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)) : r === 18 ? (s.push(a >> 10 & 255), s.push(a >> 2 & 255)) : r === 12 && s.push(a >> 4 & 255), new Uint8Array(s);
}
function nS(e) {
  var t = "", r = 0, n, i, o = e.length, a = kc;
  for (n = 0; n < o; n++)
    n % 3 === 0 && n && (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]), r = (r << 8) + e[n];
  return i = o % 3, i === 0 ? (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]) : i === 2 ? (t += a[r >> 10 & 63], t += a[r >> 4 & 63], t += a[r << 2 & 63], t += a[64]) : i === 1 && (t += a[r >> 2 & 63], t += a[r << 4 & 63], t += a[64], t += a[64]), t;
}
function iS(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var g0 = new eS("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: tS,
  construct: rS,
  predicate: iS,
  represent: nS
}), oS = dt, aS = Object.prototype.hasOwnProperty, sS = Object.prototype.toString;
function lS(e) {
  if (e === null) return !0;
  var t = [], r, n, i, o, a, s = e;
  for (r = 0, n = s.length; r < n; r += 1) {
    if (i = s[r], a = !1, sS.call(i) !== "[object Object]") return !1;
    for (o in i)
      if (aS.call(i, o))
        if (!a) a = !0;
        else return !1;
    if (!a) return !1;
    if (t.indexOf(o) === -1) t.push(o);
    else return !1;
  }
  return !0;
}
function cS(e) {
  return e !== null ? e : [];
}
var v0 = new oS("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: lS,
  construct: cS
}), uS = dt, fS = Object.prototype.toString;
function dS(e) {
  if (e === null) return !0;
  var t, r, n, i, o, a = e;
  for (o = new Array(a.length), t = 0, r = a.length; t < r; t += 1) {
    if (n = a[t], fS.call(n) !== "[object Object]" || (i = Object.keys(n), i.length !== 1)) return !1;
    o[t] = [i[0], n[i[0]]];
  }
  return !0;
}
function hS(e) {
  if (e === null) return [];
  var t, r, n, i, o, a = e;
  for (o = new Array(a.length), t = 0, r = a.length; t < r; t += 1)
    n = a[t], i = Object.keys(n), o[t] = [i[0], n[i[0]]];
  return o;
}
var $0 = new uS("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: dS,
  construct: hS
}), pS = dt, mS = Object.prototype.hasOwnProperty;
function yS(e) {
  if (e === null) return !0;
  var t, r = e;
  for (t in r)
    if (mS.call(r, t) && r[t] !== null)
      return !1;
  return !0;
}
function gS(e) {
  return e !== null ? e : {};
}
var _0 = new pS("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: yS,
  construct: gS
}), xc = d0.extend({
  implicit: [
    m0,
    y0
  ],
  explicit: [
    g0,
    v0,
    $0,
    _0
  ]
}), ln = Lt, w0 = Ro, vS = m1, $S = xc, Mr = Object.prototype.hasOwnProperty, xa = 1, E0 = 2, S0 = 3, Fa = 4, al = 1, _S = 2, pd = 3, wS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, ES = /[\x85\u2028\u2029]/, SS = /[,\[\]\{\}]/, b0 = /^(?:!|!!|![a-z\-]+!)$/i, A0 = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function md(e) {
  return Object.prototype.toString.call(e);
}
function zt(e) {
  return e === 10 || e === 13;
}
function mn(e) {
  return e === 9 || e === 32;
}
function gt(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function Bn(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function bS(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function AS(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function TS(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function yd(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function PS(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var T0 = new Array(256), P0 = new Array(256);
for (var On = 0; On < 256; On++)
  T0[On] = yd(On) ? 1 : 0, P0[On] = yd(On);
function CS(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || $S, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function C0(e, t) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = vS(r), new w0(t, r);
}
function Z(e, t) {
  throw C0(e, t);
}
function La(e, t) {
  e.onWarning && e.onWarning.call(null, C0(e, t));
}
var gd = {
  YAML: function(t, r, n) {
    var i, o, a;
    t.version !== null && Z(t, "duplication of %YAML directive"), n.length !== 1 && Z(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(n[0]), i === null && Z(t, "ill-formed argument of the YAML directive"), o = parseInt(i[1], 10), a = parseInt(i[2], 10), o !== 1 && Z(t, "unacceptable YAML version of the document"), t.version = n[0], t.checkLineBreaks = a < 2, a !== 1 && a !== 2 && La(t, "unsupported YAML version of the document");
  },
  TAG: function(t, r, n) {
    var i, o;
    n.length !== 2 && Z(t, "TAG directive accepts exactly two arguments"), i = n[0], o = n[1], b0.test(i) || Z(t, "ill-formed tag handle (first argument) of the TAG directive"), Mr.call(t.tagMap, i) && Z(t, 'there is a previously declared suffix for "' + i + '" tag handle'), A0.test(o) || Z(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      o = decodeURIComponent(o);
    } catch {
      Z(t, "tag prefix is malformed: " + o);
    }
    t.tagMap[i] = o;
  }
};
function xr(e, t, r, n) {
  var i, o, a, s;
  if (t < r) {
    if (s = e.input.slice(t, r), n)
      for (i = 0, o = s.length; i < o; i += 1)
        a = s.charCodeAt(i), a === 9 || 32 <= a && a <= 1114111 || Z(e, "expected valid JSON character");
    else wS.test(s) && Z(e, "the stream contains non-printable characters");
    e.result += s;
  }
}
function vd(e, t, r, n) {
  var i, o, a, s;
  for (ln.isObject(r) || Z(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(r), a = 0, s = i.length; a < s; a += 1)
    o = i[a], Mr.call(t, o) || (t[o] = r[o], n[o] = !0);
}
function Hn(e, t, r, n, i, o, a, s, l) {
  var f, u;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), f = 0, u = i.length; f < u; f += 1)
      Array.isArray(i[f]) && Z(e, "nested arrays are not supported inside keys"), typeof i == "object" && md(i[f]) === "[object Object]" && (i[f] = "[object Object]");
  if (typeof i == "object" && md(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), n === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (f = 0, u = o.length; f < u; f += 1)
        vd(e, t, o[f], r);
    else
      vd(e, t, o, r);
  else
    !e.json && !Mr.call(r, i) && Mr.call(t, i) && (e.line = a || e.line, e.lineStart = s || e.lineStart, e.position = l || e.position, Z(e, "duplicated mapping key")), i === "__proto__" ? Object.defineProperty(t, i, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: o
    }) : t[i] = o, delete r[i];
  return t;
}
function Fc(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : Z(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function Re(e, t, r) {
  for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; mn(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (zt(i))
      for (Fc(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && n !== 0 && e.lineIndent < r && La(e, "deficient indentation"), n;
}
function cs(e) {
  var t = e.position, r;
  return r = e.input.charCodeAt(t), !!((r === 45 || r === 46) && r === e.input.charCodeAt(t + 1) && r === e.input.charCodeAt(t + 2) && (t += 3, r = e.input.charCodeAt(t), r === 0 || gt(r)));
}
function Lc(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += ln.repeat(`
`, t - 1));
}
function OS(e, t, r) {
  var n, i, o, a, s, l, f, u, c = e.kind, d = e.result, h;
  if (h = e.input.charCodeAt(e.position), gt(h) || Bn(h) || h === 35 || h === 38 || h === 42 || h === 33 || h === 124 || h === 62 || h === 39 || h === 34 || h === 37 || h === 64 || h === 96 || (h === 63 || h === 45) && (i = e.input.charCodeAt(e.position + 1), gt(i) || r && Bn(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", o = a = e.position, s = !1; h !== 0; ) {
    if (h === 58) {
      if (i = e.input.charCodeAt(e.position + 1), gt(i) || r && Bn(i))
        break;
    } else if (h === 35) {
      if (n = e.input.charCodeAt(e.position - 1), gt(n))
        break;
    } else {
      if (e.position === e.lineStart && cs(e) || r && Bn(h))
        break;
      if (zt(h))
        if (l = e.line, f = e.lineStart, u = e.lineIndent, Re(e, !1, -1), e.lineIndent >= t) {
          s = !0, h = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = a, e.line = l, e.lineStart = f, e.lineIndent = u;
          break;
        }
    }
    s && (xr(e, o, a, !1), Lc(e, e.line - l), o = a = e.position, s = !1), mn(h) || (a = e.position + 1), h = e.input.charCodeAt(++e.position);
  }
  return xr(e, o, a, !1), e.result ? !0 : (e.kind = c, e.result = d, !1);
}
function IS(e, t) {
  var r, n, i;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (xr(e, n, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        n = e.position, e.position++, i = e.position;
      else
        return !0;
    else zt(r) ? (xr(e, n, i, !0), Lc(e, Re(e, !1, t)), n = i = e.position) : e.position === e.lineStart && cs(e) ? Z(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  Z(e, "unexpected end of the stream within a single quoted scalar");
}
function NS(e, t) {
  var r, n, i, o, a, s;
  if (s = e.input.charCodeAt(e.position), s !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (s = e.input.charCodeAt(e.position)) !== 0; ) {
    if (s === 34)
      return xr(e, r, e.position, !0), e.position++, !0;
    if (s === 92) {
      if (xr(e, r, e.position, !0), s = e.input.charCodeAt(++e.position), zt(s))
        Re(e, !1, t);
      else if (s < 256 && T0[s])
        e.result += P0[s], e.position++;
      else if ((a = AS(s)) > 0) {
        for (i = a, o = 0; i > 0; i--)
          s = e.input.charCodeAt(++e.position), (a = bS(s)) >= 0 ? o = (o << 4) + a : Z(e, "expected hexadecimal character");
        e.result += PS(o), e.position++;
      } else
        Z(e, "unknown escape sequence");
      r = n = e.position;
    } else zt(s) ? (xr(e, r, n, !0), Lc(e, Re(e, !1, t)), r = n = e.position) : e.position === e.lineStart && cs(e) ? Z(e, "unexpected end of the document within a double quoted scalar") : (e.position++, n = e.position);
  }
  Z(e, "unexpected end of the stream within a double quoted scalar");
}
function RS(e, t) {
  var r = !0, n, i, o, a = e.tag, s, l = e.anchor, f, u, c, d, h, m = /* @__PURE__ */ Object.create(null), y, g, $, w;
  if (w = e.input.charCodeAt(e.position), w === 91)
    u = 93, h = !1, s = [];
  else if (w === 123)
    u = 125, h = !0, s = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), w = e.input.charCodeAt(++e.position); w !== 0; ) {
    if (Re(e, !0, t), w = e.input.charCodeAt(e.position), w === u)
      return e.position++, e.tag = a, e.anchor = l, e.kind = h ? "mapping" : "sequence", e.result = s, !0;
    r ? w === 44 && Z(e, "expected the node content, but found ','") : Z(e, "missed comma between flow collection entries"), g = y = $ = null, c = d = !1, w === 63 && (f = e.input.charCodeAt(e.position + 1), gt(f) && (c = d = !0, e.position++, Re(e, !0, t))), n = e.line, i = e.lineStart, o = e.position, ii(e, t, xa, !1, !0), g = e.tag, y = e.result, Re(e, !0, t), w = e.input.charCodeAt(e.position), (d || e.line === n) && w === 58 && (c = !0, w = e.input.charCodeAt(++e.position), Re(e, !0, t), ii(e, t, xa, !1, !0), $ = e.result), h ? Hn(e, s, m, g, y, $, n, i, o) : c ? s.push(Hn(e, null, m, g, y, $, n, i, o)) : s.push(y), Re(e, !0, t), w = e.input.charCodeAt(e.position), w === 44 ? (r = !0, w = e.input.charCodeAt(++e.position)) : r = !1;
  }
  Z(e, "unexpected end of the stream within a flow collection");
}
function DS(e, t) {
  var r, n, i = al, o = !1, a = !1, s = t, l = 0, f = !1, u, c;
  if (c = e.input.charCodeAt(e.position), c === 124)
    n = !1;
  else if (c === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; c !== 0; )
    if (c = e.input.charCodeAt(++e.position), c === 43 || c === 45)
      al === i ? i = c === 43 ? pd : _S : Z(e, "repeat of a chomping mode identifier");
    else if ((u = TS(c)) >= 0)
      u === 0 ? Z(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : a ? Z(e, "repeat of an indentation width identifier") : (s = t + u - 1, a = !0);
    else
      break;
  if (mn(c)) {
    do
      c = e.input.charCodeAt(++e.position);
    while (mn(c));
    if (c === 35)
      do
        c = e.input.charCodeAt(++e.position);
      while (!zt(c) && c !== 0);
  }
  for (; c !== 0; ) {
    for (Fc(e), e.lineIndent = 0, c = e.input.charCodeAt(e.position); (!a || e.lineIndent < s) && c === 32; )
      e.lineIndent++, c = e.input.charCodeAt(++e.position);
    if (!a && e.lineIndent > s && (s = e.lineIndent), zt(c)) {
      l++;
      continue;
    }
    if (e.lineIndent < s) {
      i === pd ? e.result += ln.repeat(`
`, o ? 1 + l : l) : i === al && o && (e.result += `
`);
      break;
    }
    for (n ? mn(c) ? (f = !0, e.result += ln.repeat(`
`, o ? 1 + l : l)) : f ? (f = !1, e.result += ln.repeat(`
`, l + 1)) : l === 0 ? o && (e.result += " ") : e.result += ln.repeat(`
`, l) : e.result += ln.repeat(`
`, o ? 1 + l : l), o = !0, a = !0, l = 0, r = e.position; !zt(c) && c !== 0; )
      c = e.input.charCodeAt(++e.position);
    xr(e, r, e.position, !1);
  }
  return !0;
}
function $d(e, t) {
  var r, n = e.tag, i = e.anchor, o = [], a, s = !1, l;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = o), l = e.input.charCodeAt(e.position); l !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, Z(e, "tab characters must not be used in indentation")), !(l !== 45 || (a = e.input.charCodeAt(e.position + 1), !gt(a)))); ) {
    if (s = !0, e.position++, Re(e, !0, -1) && e.lineIndent <= t) {
      o.push(null), l = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, ii(e, t, S0, !1, !0), o.push(e.result), Re(e, !0, -1), l = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > t) && l !== 0)
      Z(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return s ? (e.tag = n, e.anchor = i, e.kind = "sequence", e.result = o, !0) : !1;
}
function kS(e, t, r) {
  var n, i, o, a, s, l, f = e.tag, u = e.anchor, c = {}, d = /* @__PURE__ */ Object.create(null), h = null, m = null, y = null, g = !1, $ = !1, w;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = c), w = e.input.charCodeAt(e.position); w !== 0; ) {
    if (!g && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, Z(e, "tab characters must not be used in indentation")), n = e.input.charCodeAt(e.position + 1), o = e.line, (w === 63 || w === 58) && gt(n))
      w === 63 ? (g && (Hn(e, c, d, h, m, null, a, s, l), h = m = y = null), $ = !0, g = !0, i = !0) : g ? (g = !1, i = !0) : Z(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, w = n;
    else {
      if (a = e.line, s = e.lineStart, l = e.position, !ii(e, r, E0, !1, !0))
        break;
      if (e.line === o) {
        for (w = e.input.charCodeAt(e.position); mn(w); )
          w = e.input.charCodeAt(++e.position);
        if (w === 58)
          w = e.input.charCodeAt(++e.position), gt(w) || Z(e, "a whitespace character is expected after the key-value separator within a block mapping"), g && (Hn(e, c, d, h, m, null, a, s, l), h = m = y = null), $ = !0, g = !1, i = !1, h = e.tag, m = e.result;
        else if ($)
          Z(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = f, e.anchor = u, !0;
      } else if ($)
        Z(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = f, e.anchor = u, !0;
    }
    if ((e.line === o || e.lineIndent > t) && (g && (a = e.line, s = e.lineStart, l = e.position), ii(e, t, Fa, !0, i) && (g ? m = e.result : y = e.result), g || (Hn(e, c, d, h, m, y, a, s, l), h = m = y = null), Re(e, !0, -1), w = e.input.charCodeAt(e.position)), (e.line === o || e.lineIndent > t) && w !== 0)
      Z(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return g && Hn(e, c, d, h, m, null, a, s, l), $ && (e.tag = f, e.anchor = u, e.kind = "mapping", e.result = c), $;
}
function xS(e) {
  var t, r = !1, n = !1, i, o, a;
  if (a = e.input.charCodeAt(e.position), a !== 33) return !1;
  if (e.tag !== null && Z(e, "duplication of a tag property"), a = e.input.charCodeAt(++e.position), a === 60 ? (r = !0, a = e.input.charCodeAt(++e.position)) : a === 33 ? (n = !0, i = "!!", a = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, r) {
    do
      a = e.input.charCodeAt(++e.position);
    while (a !== 0 && a !== 62);
    e.position < e.length ? (o = e.input.slice(t, e.position), a = e.input.charCodeAt(++e.position)) : Z(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; a !== 0 && !gt(a); )
      a === 33 && (n ? Z(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), b0.test(i) || Z(e, "named tag handle cannot contain such characters"), n = !0, t = e.position + 1)), a = e.input.charCodeAt(++e.position);
    o = e.input.slice(t, e.position), SS.test(o) && Z(e, "tag suffix cannot contain flow indicator characters");
  }
  o && !A0.test(o) && Z(e, "tag name cannot contain such characters: " + o);
  try {
    o = decodeURIComponent(o);
  } catch {
    Z(e, "tag name is malformed: " + o);
  }
  return r ? e.tag = o : Mr.call(e.tagMap, i) ? e.tag = e.tagMap[i] + o : i === "!" ? e.tag = "!" + o : i === "!!" ? e.tag = "tag:yaml.org,2002:" + o : Z(e, 'undeclared tag handle "' + i + '"'), !0;
}
function FS(e) {
  var t, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && Z(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !gt(r) && !Bn(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && Z(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function LS(e) {
  var t, r, n;
  if (n = e.input.charCodeAt(e.position), n !== 42) return !1;
  for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !gt(n) && !Bn(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && Z(e, "name of an alias node must contain at least one character"), r = e.input.slice(t, e.position), Mr.call(e.anchorMap, r) || Z(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], Re(e, !0, -1), !0;
}
function ii(e, t, r, n, i) {
  var o, a, s, l = 1, f = !1, u = !1, c, d, h, m, y, g;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, o = a = s = Fa === r || S0 === r, n && Re(e, !0, -1) && (f = !0, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)), l === 1)
    for (; xS(e) || FS(e); )
      Re(e, !0, -1) ? (f = !0, s = o, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)) : s = !1;
  if (s && (s = f || i), (l === 1 || Fa === r) && (xa === r || E0 === r ? y = t : y = t + 1, g = e.position - e.lineStart, l === 1 ? s && ($d(e, g) || kS(e, g, y)) || RS(e, y) ? u = !0 : (a && DS(e, y) || IS(e, y) || NS(e, y) ? u = !0 : LS(e) ? (u = !0, (e.tag !== null || e.anchor !== null) && Z(e, "alias node should not have any properties")) : OS(e, y, xa === r) && (u = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : l === 0 && (u = s && $d(e, g))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && Z(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), c = 0, d = e.implicitTypes.length; c < d; c += 1)
      if (m = e.implicitTypes[c], m.resolve(e.result)) {
        e.result = m.construct(e.result), e.tag = m.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (Mr.call(e.typeMap[e.kind || "fallback"], e.tag))
      m = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (m = null, h = e.typeMap.multi[e.kind || "fallback"], c = 0, d = h.length; c < d; c += 1)
        if (e.tag.slice(0, h[c].tag.length) === h[c].tag) {
          m = h[c];
          break;
        }
    m || Z(e, "unknown tag !<" + e.tag + ">"), e.result !== null && m.kind !== e.kind && Z(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + m.kind + '", not "' + e.kind + '"'), m.resolve(e.result, e.tag) ? (e.result = m.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : Z(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || u;
}
function US(e) {
  var t = e.position, r, n, i, o = !1, a;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (a = e.input.charCodeAt(e.position)) !== 0 && (Re(e, !0, -1), a = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || a !== 37)); ) {
    for (o = !0, a = e.input.charCodeAt(++e.position), r = e.position; a !== 0 && !gt(a); )
      a = e.input.charCodeAt(++e.position);
    for (n = e.input.slice(r, e.position), i = [], n.length < 1 && Z(e, "directive name must not be less than one character in length"); a !== 0; ) {
      for (; mn(a); )
        a = e.input.charCodeAt(++e.position);
      if (a === 35) {
        do
          a = e.input.charCodeAt(++e.position);
        while (a !== 0 && !zt(a));
        break;
      }
      if (zt(a)) break;
      for (r = e.position; a !== 0 && !gt(a); )
        a = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(r, e.position));
    }
    a !== 0 && Fc(e), Mr.call(gd, n) ? gd[n](e, n, i) : La(e, 'unknown document directive "' + n + '"');
  }
  if (Re(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, Re(e, !0, -1)) : o && Z(e, "directives end mark is expected"), ii(e, e.lineIndent - 1, Fa, !1, !0), Re(e, !0, -1), e.checkLineBreaks && ES.test(e.input.slice(t, e.position)) && La(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && cs(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, Re(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    Z(e, "end of the stream or a document separator is expected");
  else
    return;
}
function O0(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new CS(e, t), n = e.indexOf("\0");
  for (n !== -1 && (r.position = n, Z(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    US(r);
  return r.documents;
}
function MS(e, t, r) {
  t !== null && typeof t == "object" && typeof r > "u" && (r = t, t = null);
  var n = O0(e, r);
  if (typeof t != "function")
    return n;
  for (var i = 0, o = n.length; i < o; i += 1)
    t(n[i]);
}
function jS(e, t) {
  var r = O0(e, t);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new w0("expected a single document in the stream, but found more");
  }
}
Dc.loadAll = MS;
Dc.load = jS;
var I0 = {}, us = Lt, Do = Ro, BS = xc, N0 = Object.prototype.toString, R0 = Object.prototype.hasOwnProperty, Uc = 65279, HS = 9, fo = 10, qS = 13, GS = 32, VS = 33, zS = 34, Wl = 35, WS = 37, YS = 38, KS = 39, XS = 42, D0 = 44, JS = 45, Ua = 58, QS = 61, ZS = 62, eb = 63, tb = 64, k0 = 91, x0 = 93, rb = 96, F0 = 123, nb = 124, L0 = 125, rt = {};
rt[0] = "\\0";
rt[7] = "\\a";
rt[8] = "\\b";
rt[9] = "\\t";
rt[10] = "\\n";
rt[11] = "\\v";
rt[12] = "\\f";
rt[13] = "\\r";
rt[27] = "\\e";
rt[34] = '\\"';
rt[92] = "\\\\";
rt[133] = "\\N";
rt[160] = "\\_";
rt[8232] = "\\L";
rt[8233] = "\\P";
var ib = [
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
], ob = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function ab(e, t) {
  var r, n, i, o, a, s, l;
  if (t === null) return {};
  for (r = {}, n = Object.keys(t), i = 0, o = n.length; i < o; i += 1)
    a = n[i], s = String(t[a]), a.slice(0, 2) === "!!" && (a = "tag:yaml.org,2002:" + a.slice(2)), l = e.compiledTypeMap.fallback[a], l && R0.call(l.styleAliases, s) && (s = l.styleAliases[s]), r[a] = s;
  return r;
}
function sb(e) {
  var t, r, n;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    r = "x", n = 2;
  else if (e <= 65535)
    r = "u", n = 4;
  else if (e <= 4294967295)
    r = "U", n = 8;
  else
    throw new Do("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + us.repeat("0", n - t.length) + t;
}
var lb = 1, ho = 2;
function cb(e) {
  this.schema = e.schema || BS, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = us.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = ab(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? ho : lb, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function _d(e, t) {
  for (var r = us.repeat(" ", t), n = 0, i = -1, o = "", a, s = e.length; n < s; )
    i = e.indexOf(`
`, n), i === -1 ? (a = e.slice(n), n = s) : (a = e.slice(n, i + 1), n = i + 1), a.length && a !== `
` && (o += r), o += a;
  return o;
}
function Yl(e, t) {
  return `
` + us.repeat(" ", e.indent * t);
}
function ub(e, t) {
  var r, n, i;
  for (r = 0, n = e.implicitTypes.length; r < n; r += 1)
    if (i = e.implicitTypes[r], i.resolve(t))
      return !0;
  return !1;
}
function Ma(e) {
  return e === GS || e === HS;
}
function po(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== Uc || 65536 <= e && e <= 1114111;
}
function wd(e) {
  return po(e) && e !== Uc && e !== qS && e !== fo;
}
function Ed(e, t, r) {
  var n = wd(e), i = n && !Ma(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      n
    ) : n && e !== D0 && e !== k0 && e !== x0 && e !== F0 && e !== L0) && e !== Wl && !(t === Ua && !i) || wd(t) && !Ma(t) && e === Wl || t === Ua && i
  );
}
function fb(e) {
  return po(e) && e !== Uc && !Ma(e) && e !== JS && e !== eb && e !== Ua && e !== D0 && e !== k0 && e !== x0 && e !== F0 && e !== L0 && e !== Wl && e !== YS && e !== XS && e !== VS && e !== nb && e !== QS && e !== ZS && e !== KS && e !== zS && e !== WS && e !== tb && e !== rb;
}
function db(e) {
  return !Ma(e) && e !== Ua;
}
function Vi(e, t) {
  var r = e.charCodeAt(t), n;
  return r >= 55296 && r <= 56319 && t + 1 < e.length && (n = e.charCodeAt(t + 1), n >= 56320 && n <= 57343) ? (r - 55296) * 1024 + n - 56320 + 65536 : r;
}
function U0(e) {
  var t = /^\n* /;
  return t.test(e);
}
var M0 = 1, Kl = 2, j0 = 3, B0 = 4, Un = 5;
function hb(e, t, r, n, i, o, a, s) {
  var l, f = 0, u = null, c = !1, d = !1, h = n !== -1, m = -1, y = fb(Vi(e, 0)) && db(Vi(e, e.length - 1));
  if (t || a)
    for (l = 0; l < e.length; f >= 65536 ? l += 2 : l++) {
      if (f = Vi(e, l), !po(f))
        return Un;
      y = y && Ed(f, u, s), u = f;
    }
  else {
    for (l = 0; l < e.length; f >= 65536 ? l += 2 : l++) {
      if (f = Vi(e, l), f === fo)
        c = !0, h && (d = d || // Foldable line = too long, and not more-indented.
        l - m - 1 > n && e[m + 1] !== " ", m = l);
      else if (!po(f))
        return Un;
      y = y && Ed(f, u, s), u = f;
    }
    d = d || h && l - m - 1 > n && e[m + 1] !== " ";
  }
  return !c && !d ? y && !a && !i(e) ? M0 : o === ho ? Un : Kl : r > 9 && U0(e) ? Un : a ? o === ho ? Un : Kl : d ? B0 : j0;
}
function pb(e, t, r, n, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === ho ? '""' : "''";
    if (!e.noCompatMode && (ib.indexOf(t) !== -1 || ob.test(t)))
      return e.quotingType === ho ? '"' + t + '"' : "'" + t + "'";
    var o = e.indent * Math.max(1, r), a = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o), s = n || e.flowLevel > -1 && r >= e.flowLevel;
    function l(f) {
      return ub(e, f);
    }
    switch (hb(
      t,
      s,
      e.indent,
      a,
      l,
      e.quotingType,
      e.forceQuotes && !n,
      i
    )) {
      case M0:
        return t;
      case Kl:
        return "'" + t.replace(/'/g, "''") + "'";
      case j0:
        return "|" + Sd(t, e.indent) + bd(_d(t, o));
      case B0:
        return ">" + Sd(t, e.indent) + bd(_d(mb(t, a), o));
      case Un:
        return '"' + yb(t) + '"';
      default:
        throw new Do("impossible error: invalid scalar style");
    }
  }();
}
function Sd(e, t) {
  var r = U0(e) ? String(t) : "", n = e[e.length - 1] === `
`, i = n && (e[e.length - 2] === `
` || e === `
`), o = i ? "+" : n ? "" : "-";
  return r + o + `
`;
}
function bd(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function mb(e, t) {
  for (var r = /(\n+)([^\n]*)/g, n = function() {
    var f = e.indexOf(`
`);
    return f = f !== -1 ? f : e.length, r.lastIndex = f, Ad(e.slice(0, f), t);
  }(), i = e[0] === `
` || e[0] === " ", o, a; a = r.exec(e); ) {
    var s = a[1], l = a[2];
    o = l[0] === " ", n += s + (!i && !o && l !== "" ? `
` : "") + Ad(l, t), i = o;
  }
  return n;
}
function Ad(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, n, i = 0, o, a = 0, s = 0, l = ""; n = r.exec(e); )
    s = n.index, s - i > t && (o = a > i ? a : s, l += `
` + e.slice(i, o), i = o + 1), a = s;
  return l += `
`, e.length - i > t && a > i ? l += e.slice(i, a) + `
` + e.slice(a + 1) : l += e.slice(i), l.slice(1);
}
function yb(e) {
  for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? i += 2 : i++)
    r = Vi(e, i), n = rt[r], !n && po(r) ? (t += e[i], r >= 65536 && (t += e[i + 1])) : t += n || sb(r);
  return t;
}
function gb(e, t, r) {
  var n = "", i = e.tag, o, a, s;
  for (o = 0, a = r.length; o < a; o += 1)
    s = r[o], e.replacer && (s = e.replacer.call(r, String(o), s)), (cr(e, t, s, !1, !1) || typeof s > "u" && cr(e, t, null, !1, !1)) && (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), n += e.dump);
  e.tag = i, e.dump = "[" + n + "]";
}
function Td(e, t, r, n) {
  var i = "", o = e.tag, a, s, l;
  for (a = 0, s = r.length; a < s; a += 1)
    l = r[a], e.replacer && (l = e.replacer.call(r, String(a), l)), (cr(e, t + 1, l, !0, !0, !1, !0) || typeof l > "u" && cr(e, t + 1, null, !0, !0, !1, !0)) && ((!n || i !== "") && (i += Yl(e, t)), e.dump && fo === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = o, e.dump = i || "[]";
}
function vb(e, t, r) {
  var n = "", i = e.tag, o = Object.keys(r), a, s, l, f, u;
  for (a = 0, s = o.length; a < s; a += 1)
    u = "", n !== "" && (u += ", "), e.condenseFlow && (u += '"'), l = o[a], f = r[l], e.replacer && (f = e.replacer.call(r, l, f)), cr(e, t, l, !1, !1) && (e.dump.length > 1024 && (u += "? "), u += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), cr(e, t, f, !1, !1) && (u += e.dump, n += u));
  e.tag = i, e.dump = "{" + n + "}";
}
function $b(e, t, r, n) {
  var i = "", o = e.tag, a = Object.keys(r), s, l, f, u, c, d;
  if (e.sortKeys === !0)
    a.sort();
  else if (typeof e.sortKeys == "function")
    a.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new Do("sortKeys must be a boolean or a function");
  for (s = 0, l = a.length; s < l; s += 1)
    d = "", (!n || i !== "") && (d += Yl(e, t)), f = a[s], u = r[f], e.replacer && (u = e.replacer.call(r, f, u)), cr(e, t + 1, f, !0, !0, !0) && (c = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, c && (e.dump && fo === e.dump.charCodeAt(0) ? d += "?" : d += "? "), d += e.dump, c && (d += Yl(e, t)), cr(e, t + 1, u, !0, c) && (e.dump && fo === e.dump.charCodeAt(0) ? d += ":" : d += ": ", d += e.dump, i += d));
  e.tag = o, e.dump = i || "{}";
}
function Pd(e, t, r) {
  var n, i, o, a, s, l;
  for (i = r ? e.explicitTypes : e.implicitTypes, o = 0, a = i.length; o < a; o += 1)
    if (s = i[o], (s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (r ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        if (l = e.styleMap[s.tag] || s.defaultStyle, N0.call(s.represent) === "[object Function]")
          n = s.represent(t, l);
        else if (R0.call(s.represent, l))
          n = s.represent[l](t, l);
        else
          throw new Do("!<" + s.tag + '> tag resolver accepts not "' + l + '" style');
        e.dump = n;
      }
      return !0;
    }
  return !1;
}
function cr(e, t, r, n, i, o, a) {
  e.tag = null, e.dump = r, Pd(e, r, !1) || Pd(e, r, !0);
  var s = N0.call(e.dump), l = n, f;
  n && (n = e.flowLevel < 0 || e.flowLevel > t);
  var u = s === "[object Object]" || s === "[object Array]", c, d;
  if (u && (c = e.duplicates.indexOf(r), d = c !== -1), (e.tag !== null && e.tag !== "?" || d || e.indent !== 2 && t > 0) && (i = !1), d && e.usedDuplicates[c])
    e.dump = "*ref_" + c;
  else {
    if (u && d && !e.usedDuplicates[c] && (e.usedDuplicates[c] = !0), s === "[object Object]")
      n && Object.keys(e.dump).length !== 0 ? ($b(e, t, e.dump, i), d && (e.dump = "&ref_" + c + e.dump)) : (vb(e, t, e.dump), d && (e.dump = "&ref_" + c + " " + e.dump));
    else if (s === "[object Array]")
      n && e.dump.length !== 0 ? (e.noArrayIndent && !a && t > 0 ? Td(e, t - 1, e.dump, i) : Td(e, t, e.dump, i), d && (e.dump = "&ref_" + c + e.dump)) : (gb(e, t, e.dump), d && (e.dump = "&ref_" + c + " " + e.dump));
    else if (s === "[object String]")
      e.tag !== "?" && pb(e, e.dump, t, o, l);
    else {
      if (s === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new Do("unacceptable kind of an object to dump " + s);
    }
    e.tag !== null && e.tag !== "?" && (f = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? f = "!" + f : f.slice(0, 18) === "tag:yaml.org,2002:" ? f = "!!" + f.slice(18) : f = "!<" + f + ">", e.dump = f + " " + e.dump);
  }
  return !0;
}
function _b(e, t) {
  var r = [], n = [], i, o;
  for (Xl(e, r, n), i = 0, o = n.length; i < o; i += 1)
    t.duplicates.push(r[n[i]]);
  t.usedDuplicates = new Array(o);
}
function Xl(e, t, r) {
  var n, i, o;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      r.indexOf(i) === -1 && r.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, o = e.length; i < o; i += 1)
        Xl(e[i], t, r);
    else
      for (n = Object.keys(e), i = 0, o = n.length; i < o; i += 1)
        Xl(e[n[i]], t, r);
}
function wb(e, t) {
  t = t || {};
  var r = new cb(t);
  r.noRefs || _b(e, r);
  var n = e;
  return r.replacer && (n = r.replacer.call({ "": n }, "", n)), cr(r, 0, n, !0, !0) ? r.dump + `
` : "";
}
I0.dump = wb;
var H0 = Dc, Eb = I0;
function Mc(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
Ye.Type = dt;
Ye.Schema = t0;
Ye.FAILSAFE_SCHEMA = o0;
Ye.JSON_SCHEMA = f0;
Ye.CORE_SCHEMA = d0;
Ye.DEFAULT_SCHEMA = xc;
Ye.load = H0.load;
Ye.loadAll = H0.loadAll;
Ye.dump = Eb.dump;
Ye.YAMLException = Ro;
Ye.types = {
  binary: g0,
  float: u0,
  map: i0,
  null: a0,
  pairs: $0,
  set: _0,
  timestamp: m0,
  bool: s0,
  int: l0,
  merge: y0,
  omap: v0,
  seq: n0,
  str: r0
};
Ye.safeLoad = Mc("safeLoad", "load");
Ye.safeLoadAll = Mc("safeLoadAll", "loadAll");
Ye.safeDump = Mc("safeDump", "dump");
var fs = {};
Object.defineProperty(fs, "__esModule", { value: !0 });
fs.Lazy = void 0;
class Sb {
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
fs.Lazy = Sb;
var Jl = { exports: {} };
const bb = "2.0.0", q0 = 256, Ab = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, Tb = 16, Pb = q0 - 6, Cb = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var ds = {
  MAX_LENGTH: q0,
  MAX_SAFE_COMPONENT_LENGTH: Tb,
  MAX_SAFE_BUILD_LENGTH: Pb,
  MAX_SAFE_INTEGER: Ab,
  RELEASE_TYPES: Cb,
  SEMVER_SPEC_VERSION: bb,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const Ob = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var hs = Ob;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: i
  } = ds, o = hs;
  t = e.exports = {};
  const a = t.re = [], s = t.safeRe = [], l = t.src = [], f = t.safeSrc = [], u = t.t = {};
  let c = 0;
  const d = "[a-zA-Z0-9-]", h = [
    ["\\s", 1],
    ["\\d", i],
    [d, n]
  ], m = (g) => {
    for (const [$, w] of h)
      g = g.split(`${$}*`).join(`${$}{0,${w}}`).split(`${$}+`).join(`${$}{1,${w}}`);
    return g;
  }, y = (g, $, w) => {
    const O = m($), N = c++;
    o(g, N, $), u[g] = N, l[N] = $, f[N] = O, a[N] = new RegExp($, w ? "g" : void 0), s[N] = new RegExp(O, w ? "g" : void 0);
  };
  y("NUMERICIDENTIFIER", "0|[1-9]\\d*"), y("NUMERICIDENTIFIERLOOSE", "\\d+"), y("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${d}*`), y("MAINVERSION", `(${l[u.NUMERICIDENTIFIER]})\\.(${l[u.NUMERICIDENTIFIER]})\\.(${l[u.NUMERICIDENTIFIER]})`), y("MAINVERSIONLOOSE", `(${l[u.NUMERICIDENTIFIERLOOSE]})\\.(${l[u.NUMERICIDENTIFIERLOOSE]})\\.(${l[u.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASEIDENTIFIER", `(?:${l[u.NUMERICIDENTIFIER]}|${l[u.NONNUMERICIDENTIFIER]})`), y("PRERELEASEIDENTIFIERLOOSE", `(?:${l[u.NUMERICIDENTIFIERLOOSE]}|${l[u.NONNUMERICIDENTIFIER]})`), y("PRERELEASE", `(?:-(${l[u.PRERELEASEIDENTIFIER]}(?:\\.${l[u.PRERELEASEIDENTIFIER]})*))`), y("PRERELEASELOOSE", `(?:-?(${l[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[u.PRERELEASEIDENTIFIERLOOSE]})*))`), y("BUILDIDENTIFIER", `${d}+`), y("BUILD", `(?:\\+(${l[u.BUILDIDENTIFIER]}(?:\\.${l[u.BUILDIDENTIFIER]})*))`), y("FULLPLAIN", `v?${l[u.MAINVERSION]}${l[u.PRERELEASE]}?${l[u.BUILD]}?`), y("FULL", `^${l[u.FULLPLAIN]}$`), y("LOOSEPLAIN", `[v=\\s]*${l[u.MAINVERSIONLOOSE]}${l[u.PRERELEASELOOSE]}?${l[u.BUILD]}?`), y("LOOSE", `^${l[u.LOOSEPLAIN]}$`), y("GTLT", "((?:<|>)?=?)"), y("XRANGEIDENTIFIERLOOSE", `${l[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), y("XRANGEIDENTIFIER", `${l[u.NUMERICIDENTIFIER]}|x|X|\\*`), y("XRANGEPLAIN", `[v=\\s]*(${l[u.XRANGEIDENTIFIER]})(?:\\.(${l[u.XRANGEIDENTIFIER]})(?:\\.(${l[u.XRANGEIDENTIFIER]})(?:${l[u.PRERELEASE]})?${l[u.BUILD]}?)?)?`), y("XRANGEPLAINLOOSE", `[v=\\s]*(${l[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[u.XRANGEIDENTIFIERLOOSE]})(?:${l[u.PRERELEASELOOSE]})?${l[u.BUILD]}?)?)?`), y("XRANGE", `^${l[u.GTLT]}\\s*${l[u.XRANGEPLAIN]}$`), y("XRANGELOOSE", `^${l[u.GTLT]}\\s*${l[u.XRANGEPLAINLOOSE]}$`), y("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), y("COERCE", `${l[u.COERCEPLAIN]}(?:$|[^\\d])`), y("COERCEFULL", l[u.COERCEPLAIN] + `(?:${l[u.PRERELEASE]})?(?:${l[u.BUILD]})?(?:$|[^\\d])`), y("COERCERTL", l[u.COERCE], !0), y("COERCERTLFULL", l[u.COERCEFULL], !0), y("LONETILDE", "(?:~>?)"), y("TILDETRIM", `(\\s*)${l[u.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", y("TILDE", `^${l[u.LONETILDE]}${l[u.XRANGEPLAIN]}$`), y("TILDELOOSE", `^${l[u.LONETILDE]}${l[u.XRANGEPLAINLOOSE]}$`), y("LONECARET", "(?:\\^)"), y("CARETTRIM", `(\\s*)${l[u.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", y("CARET", `^${l[u.LONECARET]}${l[u.XRANGEPLAIN]}$`), y("CARETLOOSE", `^${l[u.LONECARET]}${l[u.XRANGEPLAINLOOSE]}$`), y("COMPARATORLOOSE", `^${l[u.GTLT]}\\s*(${l[u.LOOSEPLAIN]})$|^$`), y("COMPARATOR", `^${l[u.GTLT]}\\s*(${l[u.FULLPLAIN]})$|^$`), y("COMPARATORTRIM", `(\\s*)${l[u.GTLT]}\\s*(${l[u.LOOSEPLAIN]}|${l[u.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", y("HYPHENRANGE", `^\\s*(${l[u.XRANGEPLAIN]})\\s+-\\s+(${l[u.XRANGEPLAIN]})\\s*$`), y("HYPHENRANGELOOSE", `^\\s*(${l[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[u.XRANGEPLAINLOOSE]})\\s*$`), y("STAR", "(<|>)?=?\\s*\\*"), y("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), y("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Jl, Jl.exports);
var ko = Jl.exports;
const Ib = Object.freeze({ loose: !0 }), Nb = Object.freeze({}), Rb = (e) => e ? typeof e != "object" ? Ib : e : Nb;
var jc = Rb;
const Cd = /^[0-9]+$/, G0 = (e, t) => {
  const r = Cd.test(e), n = Cd.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, Db = (e, t) => G0(t, e);
var V0 = {
  compareIdentifiers: G0,
  rcompareIdentifiers: Db
};
const ra = hs, { MAX_LENGTH: Od, MAX_SAFE_INTEGER: na } = ds, { safeRe: Id, safeSrc: Nd, t: ia } = ko, kb = jc, { compareIdentifiers: In } = V0;
let xb = class Bt {
  constructor(t, r) {
    if (r = kb(r), t instanceof Bt) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Od)
      throw new TypeError(
        `version is longer than ${Od} characters`
      );
    ra("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? Id[ia.LOOSE] : Id[ia.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > na || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > na || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > na || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const o = +i;
        if (o >= 0 && o < na)
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
    if (ra("SemVer.compare", this.version, this.options, t), !(t instanceof Bt)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new Bt(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof Bt || (t = new Bt(t, this.options)), In(this.major, t.major) || In(this.minor, t.minor) || In(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof Bt || (t = new Bt(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], i = t.prerelease[r];
      if (ra("prerelease compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return In(n, i);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof Bt || (t = new Bt(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], i = t.build[r];
      if (ra("build compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return In(n, i);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const i = new RegExp(`^${this.options.loose ? Nd[ia.PRERELEASELOOSE] : Nd[ia.PRERELEASE]}$`), o = `-${r}`.match(i);
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
          n === !1 && (o = [r]), In(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = o) : this.prerelease = o;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var ht = xb;
const Rd = ht, Fb = (e, t, r = !1) => {
  if (e instanceof Rd)
    return e;
  try {
    return new Rd(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var fi = Fb;
const Lb = fi, Ub = (e, t) => {
  const r = Lb(e, t);
  return r ? r.version : null;
};
var Mb = Ub;
const jb = fi, Bb = (e, t) => {
  const r = jb(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var Hb = Bb;
const Dd = ht, qb = (e, t, r, n, i) => {
  typeof r == "string" && (i = n, n = r, r = void 0);
  try {
    return new Dd(
      e instanceof Dd ? e.version : e,
      r
    ).inc(t, n, i).version;
  } catch {
    return null;
  }
};
var Gb = qb;
const kd = fi, Vb = (e, t) => {
  const r = kd(e, null, !0), n = kd(t, null, !0), i = r.compare(n);
  if (i === 0)
    return null;
  const o = i > 0, a = o ? r : n, s = o ? n : r, l = !!a.prerelease.length;
  if (!!s.prerelease.length && !l) {
    if (!s.patch && !s.minor)
      return "major";
    if (s.compareMain(a) === 0)
      return s.minor && !s.patch ? "minor" : "patch";
  }
  const u = l ? "pre" : "";
  return r.major !== n.major ? u + "major" : r.minor !== n.minor ? u + "minor" : r.patch !== n.patch ? u + "patch" : "prerelease";
};
var zb = Vb;
const Wb = ht, Yb = (e, t) => new Wb(e, t).major;
var Kb = Yb;
const Xb = ht, Jb = (e, t) => new Xb(e, t).minor;
var Qb = Jb;
const Zb = ht, eA = (e, t) => new Zb(e, t).patch;
var tA = eA;
const rA = fi, nA = (e, t) => {
  const r = rA(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var iA = nA;
const xd = ht, oA = (e, t, r) => new xd(e, r).compare(new xd(t, r));
var Ut = oA;
const aA = Ut, sA = (e, t, r) => aA(t, e, r);
var lA = sA;
const cA = Ut, uA = (e, t) => cA(e, t, !0);
var fA = uA;
const Fd = ht, dA = (e, t, r) => {
  const n = new Fd(e, r), i = new Fd(t, r);
  return n.compare(i) || n.compareBuild(i);
};
var Bc = dA;
const hA = Bc, pA = (e, t) => e.sort((r, n) => hA(r, n, t));
var mA = pA;
const yA = Bc, gA = (e, t) => e.sort((r, n) => yA(n, r, t));
var vA = gA;
const $A = Ut, _A = (e, t, r) => $A(e, t, r) > 0;
var ps = _A;
const wA = Ut, EA = (e, t, r) => wA(e, t, r) < 0;
var Hc = EA;
const SA = Ut, bA = (e, t, r) => SA(e, t, r) === 0;
var z0 = bA;
const AA = Ut, TA = (e, t, r) => AA(e, t, r) !== 0;
var W0 = TA;
const PA = Ut, CA = (e, t, r) => PA(e, t, r) >= 0;
var qc = CA;
const OA = Ut, IA = (e, t, r) => OA(e, t, r) <= 0;
var Gc = IA;
const NA = z0, RA = W0, DA = ps, kA = qc, xA = Hc, FA = Gc, LA = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return NA(e, r, n);
    case "!=":
      return RA(e, r, n);
    case ">":
      return DA(e, r, n);
    case ">=":
      return kA(e, r, n);
    case "<":
      return xA(e, r, n);
    case "<=":
      return FA(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Y0 = LA;
const UA = ht, MA = fi, { safeRe: oa, t: aa } = ko, jA = (e, t) => {
  if (e instanceof UA)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? oa[aa.COERCEFULL] : oa[aa.COERCE]);
  else {
    const l = t.includePrerelease ? oa[aa.COERCERTLFULL] : oa[aa.COERCERTL];
    let f;
    for (; (f = l.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || f.index + f[0].length !== r.index + r[0].length) && (r = f), l.lastIndex = f.index + f[1].length + f[2].length;
    l.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], i = r[3] || "0", o = r[4] || "0", a = t.includePrerelease && r[5] ? `-${r[5]}` : "", s = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return MA(`${n}.${i}.${o}${a}${s}`, t);
};
var BA = jA;
class HA {
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
var qA = HA, sl, Ld;
function Mt() {
  if (Ld) return sl;
  Ld = 1;
  const e = /\s+/g;
  class t {
    constructor(x, G) {
      if (G = i(G), x instanceof t)
        return x.loose === !!G.loose && x.includePrerelease === !!G.includePrerelease ? x : new t(x.raw, G);
      if (x instanceof o)
        return this.raw = x.value, this.set = [[x]], this.formatted = void 0, this;
      if (this.options = G, this.loose = !!G.loose, this.includePrerelease = !!G.includePrerelease, this.raw = x.trim().replace(e, " "), this.set = this.raw.split("||").map((L) => this.parseRange(L.trim())).filter((L) => L.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const L = this.set[0];
        if (this.set = this.set.filter((W) => !y(W[0])), this.set.length === 0)
          this.set = [L];
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
        for (let x = 0; x < this.set.length; x++) {
          x > 0 && (this.formatted += "||");
          const G = this.set[x];
          for (let L = 0; L < G.length; L++)
            L > 0 && (this.formatted += " "), this.formatted += G[L].toString().trim();
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
    parseRange(x) {
      const L = ((this.options.includePrerelease && h) | (this.options.loose && m)) + ":" + x, W = n.get(L);
      if (W)
        return W;
      const V = this.options.loose, U = V ? l[f.HYPHENRANGELOOSE] : l[f.HYPHENRANGE];
      x = x.replace(U, z(this.options.includePrerelease)), a("hyphen replace", x), x = x.replace(l[f.COMPARATORTRIM], u), a("comparator trim", x), x = x.replace(l[f.TILDETRIM], c), a("tilde trim", x), x = x.replace(l[f.CARETTRIM], d), a("caret trim", x);
      let T = x.split(" ").map((b) => w(b, this.options)).join(" ").split(/\s+/).map((b) => B(b, this.options));
      V && (T = T.filter((b) => (a("loose invalid filter", b, this.options), !!b.match(l[f.COMPARATORLOOSE])))), a("range list", T);
      const R = /* @__PURE__ */ new Map(), P = T.map((b) => new o(b, this.options));
      for (const b of P) {
        if (y(b))
          return [b];
        R.set(b.value, b);
      }
      R.size > 1 && R.has("") && R.delete("");
      const _ = [...R.values()];
      return n.set(L, _), _;
    }
    intersects(x, G) {
      if (!(x instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((L) => $(L, G) && x.set.some((W) => $(W, G) && L.every((V) => W.every((U) => V.intersects(U, G)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(x) {
      if (!x)
        return !1;
      if (typeof x == "string")
        try {
          x = new s(x, this.options);
        } catch {
          return !1;
        }
      for (let G = 0; G < this.set.length; G++)
        if (X(this.set[G], x, this.options))
          return !0;
      return !1;
    }
  }
  sl = t;
  const r = qA, n = new r(), i = jc, o = ms(), a = hs, s = ht, {
    safeRe: l,
    t: f,
    comparatorTrimReplace: u,
    tildeTrimReplace: c,
    caretTrimReplace: d
  } = ko, { FLAG_INCLUDE_PRERELEASE: h, FLAG_LOOSE: m } = ds, y = (k) => k.value === "<0.0.0-0", g = (k) => k.value === "", $ = (k, x) => {
    let G = !0;
    const L = k.slice();
    let W = L.pop();
    for (; G && L.length; )
      G = L.every((V) => W.intersects(V, x)), W = L.pop();
    return G;
  }, w = (k, x) => (a("comp", k, x), k = I(k, x), a("caret", k), k = N(k, x), a("tildes", k), k = q(k, x), a("xrange", k), k = Y(k, x), a("stars", k), k), O = (k) => !k || k.toLowerCase() === "x" || k === "*", N = (k, x) => k.trim().split(/\s+/).map((G) => j(G, x)).join(" "), j = (k, x) => {
    const G = x.loose ? l[f.TILDELOOSE] : l[f.TILDE];
    return k.replace(G, (L, W, V, U, T) => {
      a("tilde", k, L, W, V, U, T);
      let R;
      return O(W) ? R = "" : O(V) ? R = `>=${W}.0.0 <${+W + 1}.0.0-0` : O(U) ? R = `>=${W}.${V}.0 <${W}.${+V + 1}.0-0` : T ? (a("replaceTilde pr", T), R = `>=${W}.${V}.${U}-${T} <${W}.${+V + 1}.0-0`) : R = `>=${W}.${V}.${U} <${W}.${+V + 1}.0-0`, a("tilde return", R), R;
    });
  }, I = (k, x) => k.trim().split(/\s+/).map((G) => F(G, x)).join(" "), F = (k, x) => {
    a("caret", k, x);
    const G = x.loose ? l[f.CARETLOOSE] : l[f.CARET], L = x.includePrerelease ? "-0" : "";
    return k.replace(G, (W, V, U, T, R) => {
      a("caret", k, W, V, U, T, R);
      let P;
      return O(V) ? P = "" : O(U) ? P = `>=${V}.0.0${L} <${+V + 1}.0.0-0` : O(T) ? V === "0" ? P = `>=${V}.${U}.0${L} <${V}.${+U + 1}.0-0` : P = `>=${V}.${U}.0${L} <${+V + 1}.0.0-0` : R ? (a("replaceCaret pr", R), V === "0" ? U === "0" ? P = `>=${V}.${U}.${T}-${R} <${V}.${U}.${+T + 1}-0` : P = `>=${V}.${U}.${T}-${R} <${V}.${+U + 1}.0-0` : P = `>=${V}.${U}.${T}-${R} <${+V + 1}.0.0-0`) : (a("no pr"), V === "0" ? U === "0" ? P = `>=${V}.${U}.${T}${L} <${V}.${U}.${+T + 1}-0` : P = `>=${V}.${U}.${T}${L} <${V}.${+U + 1}.0-0` : P = `>=${V}.${U}.${T} <${+V + 1}.0.0-0`), a("caret return", P), P;
    });
  }, q = (k, x) => (a("replaceXRanges", k, x), k.split(/\s+/).map((G) => E(G, x)).join(" ")), E = (k, x) => {
    k = k.trim();
    const G = x.loose ? l[f.XRANGELOOSE] : l[f.XRANGE];
    return k.replace(G, (L, W, V, U, T, R) => {
      a("xRange", k, L, W, V, U, T, R);
      const P = O(V), _ = P || O(U), b = _ || O(T), M = b;
      return W === "=" && M && (W = ""), R = x.includePrerelease ? "-0" : "", P ? W === ">" || W === "<" ? L = "<0.0.0-0" : L = "*" : W && M ? (_ && (U = 0), T = 0, W === ">" ? (W = ">=", _ ? (V = +V + 1, U = 0, T = 0) : (U = +U + 1, T = 0)) : W === "<=" && (W = "<", _ ? V = +V + 1 : U = +U + 1), W === "<" && (R = "-0"), L = `${W + V}.${U}.${T}${R}`) : _ ? L = `>=${V}.0.0${R} <${+V + 1}.0.0-0` : b && (L = `>=${V}.${U}.0${R} <${V}.${+U + 1}.0-0`), a("xRange return", L), L;
    });
  }, Y = (k, x) => (a("replaceStars", k, x), k.trim().replace(l[f.STAR], "")), B = (k, x) => (a("replaceGTE0", k, x), k.trim().replace(l[x.includePrerelease ? f.GTE0PRE : f.GTE0], "")), z = (k) => (x, G, L, W, V, U, T, R, P, _, b, M) => (O(L) ? G = "" : O(W) ? G = `>=${L}.0.0${k ? "-0" : ""}` : O(V) ? G = `>=${L}.${W}.0${k ? "-0" : ""}` : U ? G = `>=${G}` : G = `>=${G}${k ? "-0" : ""}`, O(P) ? R = "" : O(_) ? R = `<${+P + 1}.0.0-0` : O(b) ? R = `<${P}.${+_ + 1}.0-0` : M ? R = `<=${P}.${_}.${b}-${M}` : k ? R = `<${P}.${_}.${+b + 1}-0` : R = `<=${R}`, `${G} ${R}`.trim()), X = (k, x, G) => {
    for (let L = 0; L < k.length; L++)
      if (!k[L].test(x))
        return !1;
    if (x.prerelease.length && !G.includePrerelease) {
      for (let L = 0; L < k.length; L++)
        if (a(k[L].semver), k[L].semver !== o.ANY && k[L].semver.prerelease.length > 0) {
          const W = k[L].semver;
          if (W.major === x.major && W.minor === x.minor && W.patch === x.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return sl;
}
var ll, Ud;
function ms() {
  if (Ud) return ll;
  Ud = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(u, c) {
      if (c = r(c), u instanceof t) {
        if (u.loose === !!c.loose)
          return u;
        u = u.value;
      }
      u = u.trim().split(/\s+/).join(" "), a("comparator", u, c), this.options = c, this.loose = !!c.loose, this.parse(u), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(u) {
      const c = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], d = u.match(c);
      if (!d)
        throw new TypeError(`Invalid comparator: ${u}`);
      this.operator = d[1] !== void 0 ? d[1] : "", this.operator === "=" && (this.operator = ""), d[2] ? this.semver = new s(d[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(u) {
      if (a("Comparator.test", u, this.options.loose), this.semver === e || u === e)
        return !0;
      if (typeof u == "string")
        try {
          u = new s(u, this.options);
        } catch {
          return !1;
        }
      return o(u, this.operator, this.semver, this.options);
    }
    intersects(u, c) {
      if (!(u instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new l(u.value, c).test(this.value) : u.operator === "" ? u.value === "" ? !0 : new l(this.value, c).test(u.semver) : (c = r(c), c.includePrerelease && (this.value === "<0.0.0-0" || u.value === "<0.0.0-0") || !c.includePrerelease && (this.value.startsWith("<0.0.0") || u.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && u.operator.startsWith(">") || this.operator.startsWith("<") && u.operator.startsWith("<") || this.semver.version === u.semver.version && this.operator.includes("=") && u.operator.includes("=") || o(this.semver, "<", u.semver, c) && this.operator.startsWith(">") && u.operator.startsWith("<") || o(this.semver, ">", u.semver, c) && this.operator.startsWith("<") && u.operator.startsWith(">")));
    }
  }
  ll = t;
  const r = jc, { safeRe: n, t: i } = ko, o = Y0, a = hs, s = ht, l = Mt();
  return ll;
}
const GA = Mt(), VA = (e, t, r) => {
  try {
    t = new GA(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var ys = VA;
const zA = Mt(), WA = (e, t) => new zA(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var YA = WA;
const KA = ht, XA = Mt(), JA = (e, t, r) => {
  let n = null, i = null, o = null;
  try {
    o = new XA(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || i.compare(a) === -1) && (n = a, i = new KA(n, r));
  }), n;
};
var QA = JA;
const ZA = ht, eT = Mt(), tT = (e, t, r) => {
  let n = null, i = null, o = null;
  try {
    o = new eT(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || i.compare(a) === 1) && (n = a, i = new ZA(n, r));
  }), n;
};
var rT = tT;
const cl = ht, nT = Mt(), Md = ps, iT = (e, t) => {
  e = new nT(e, t);
  let r = new cl("0.0.0");
  if (e.test(r) || (r = new cl("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const i = e.set[n];
    let o = null;
    i.forEach((a) => {
      const s = new cl(a.semver.version);
      switch (a.operator) {
        case ">":
          s.prerelease.length === 0 ? s.patch++ : s.prerelease.push(0), s.raw = s.format();
        case "":
        case ">=":
          (!o || Md(s, o)) && (o = s);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${a.operator}`);
      }
    }), o && (!r || Md(r, o)) && (r = o);
  }
  return r && e.test(r) ? r : null;
};
var oT = iT;
const aT = Mt(), sT = (e, t) => {
  try {
    return new aT(e, t).range || "*";
  } catch {
    return null;
  }
};
var lT = sT;
const cT = ht, K0 = ms(), { ANY: uT } = K0, fT = Mt(), dT = ys, jd = ps, Bd = Hc, hT = Gc, pT = qc, mT = (e, t, r, n) => {
  e = new cT(e, n), t = new fT(t, n);
  let i, o, a, s, l;
  switch (r) {
    case ">":
      i = jd, o = hT, a = Bd, s = ">", l = ">=";
      break;
    case "<":
      i = Bd, o = pT, a = jd, s = "<", l = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (dT(e, t, n))
    return !1;
  for (let f = 0; f < t.set.length; ++f) {
    const u = t.set[f];
    let c = null, d = null;
    if (u.forEach((h) => {
      h.semver === uT && (h = new K0(">=0.0.0")), c = c || h, d = d || h, i(h.semver, c.semver, n) ? c = h : a(h.semver, d.semver, n) && (d = h);
    }), c.operator === s || c.operator === l || (!d.operator || d.operator === s) && o(e, d.semver))
      return !1;
    if (d.operator === l && a(e, d.semver))
      return !1;
  }
  return !0;
};
var Vc = mT;
const yT = Vc, gT = (e, t, r) => yT(e, t, ">", r);
var vT = gT;
const $T = Vc, _T = (e, t, r) => $T(e, t, "<", r);
var wT = _T;
const Hd = Mt(), ET = (e, t, r) => (e = new Hd(e, r), t = new Hd(t, r), e.intersects(t, r));
var ST = ET;
const bT = ys, AT = Ut;
var TT = (e, t, r) => {
  const n = [];
  let i = null, o = null;
  const a = e.sort((u, c) => AT(u, c, r));
  for (const u of a)
    bT(u, t, r) ? (o = u, i || (i = u)) : (o && n.push([i, o]), o = null, i = null);
  i && n.push([i, null]);
  const s = [];
  for (const [u, c] of n)
    u === c ? s.push(u) : !c && u === a[0] ? s.push("*") : c ? u === a[0] ? s.push(`<=${c}`) : s.push(`${u} - ${c}`) : s.push(`>=${u}`);
  const l = s.join(" || "), f = typeof t.raw == "string" ? t.raw : String(t);
  return l.length < f.length ? l : t;
};
const qd = Mt(), zc = ms(), { ANY: ul } = zc, xi = ys, Wc = Ut, PT = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new qd(e, r), t = new qd(t, r);
  let n = !1;
  e: for (const i of e.set) {
    for (const o of t.set) {
      const a = OT(i, o, r);
      if (n = n || a !== null, a)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, CT = [new zc(">=0.0.0-0")], Gd = [new zc(">=0.0.0")], OT = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === ul) {
    if (t.length === 1 && t[0].semver === ul)
      return !0;
    r.includePrerelease ? e = CT : e = Gd;
  }
  if (t.length === 1 && t[0].semver === ul) {
    if (r.includePrerelease)
      return !0;
    t = Gd;
  }
  const n = /* @__PURE__ */ new Set();
  let i, o;
  for (const h of e)
    h.operator === ">" || h.operator === ">=" ? i = Vd(i, h, r) : h.operator === "<" || h.operator === "<=" ? o = zd(o, h, r) : n.add(h.semver);
  if (n.size > 1)
    return null;
  let a;
  if (i && o) {
    if (a = Wc(i.semver, o.semver, r), a > 0)
      return null;
    if (a === 0 && (i.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const h of n) {
    if (i && !xi(h, String(i), r) || o && !xi(h, String(o), r))
      return null;
    for (const m of t)
      if (!xi(h, String(m), r))
        return !1;
    return !0;
  }
  let s, l, f, u, c = o && !r.includePrerelease && o.semver.prerelease.length ? o.semver : !1, d = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  c && c.prerelease.length === 1 && o.operator === "<" && c.prerelease[0] === 0 && (c = !1);
  for (const h of t) {
    if (u = u || h.operator === ">" || h.operator === ">=", f = f || h.operator === "<" || h.operator === "<=", i) {
      if (d && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === d.major && h.semver.minor === d.minor && h.semver.patch === d.patch && (d = !1), h.operator === ">" || h.operator === ">=") {
        if (s = Vd(i, h, r), s === h && s !== i)
          return !1;
      } else if (i.operator === ">=" && !xi(i.semver, String(h), r))
        return !1;
    }
    if (o) {
      if (c && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === c.major && h.semver.minor === c.minor && h.semver.patch === c.patch && (c = !1), h.operator === "<" || h.operator === "<=") {
        if (l = zd(o, h, r), l === h && l !== o)
          return !1;
      } else if (o.operator === "<=" && !xi(o.semver, String(h), r))
        return !1;
    }
    if (!h.operator && (o || i) && a !== 0)
      return !1;
  }
  return !(i && f && !o && a !== 0 || o && u && !i && a !== 0 || d || c);
}, Vd = (e, t, r) => {
  if (!e)
    return t;
  const n = Wc(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, zd = (e, t, r) => {
  if (!e)
    return t;
  const n = Wc(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var IT = PT;
const fl = ko, Wd = ds, NT = ht, Yd = V0, RT = fi, DT = Mb, kT = Hb, xT = Gb, FT = zb, LT = Kb, UT = Qb, MT = tA, jT = iA, BT = Ut, HT = lA, qT = fA, GT = Bc, VT = mA, zT = vA, WT = ps, YT = Hc, KT = z0, XT = W0, JT = qc, QT = Gc, ZT = Y0, eP = BA, tP = ms(), rP = Mt(), nP = ys, iP = YA, oP = QA, aP = rT, sP = oT, lP = lT, cP = Vc, uP = vT, fP = wT, dP = ST, hP = TT, pP = IT;
var Yc = {
  parse: RT,
  valid: DT,
  clean: kT,
  inc: xT,
  diff: FT,
  major: LT,
  minor: UT,
  patch: MT,
  prerelease: jT,
  compare: BT,
  rcompare: HT,
  compareLoose: qT,
  compareBuild: GT,
  sort: VT,
  rsort: zT,
  gt: WT,
  lt: YT,
  eq: KT,
  neq: XT,
  gte: JT,
  lte: QT,
  cmp: ZT,
  coerce: eP,
  Comparator: tP,
  Range: rP,
  satisfies: nP,
  toComparators: iP,
  maxSatisfying: oP,
  minSatisfying: aP,
  minVersion: sP,
  validRange: lP,
  outside: cP,
  gtr: uP,
  ltr: fP,
  intersects: dP,
  simplifyRange: hP,
  subset: pP,
  SemVer: NT,
  re: fl.re,
  src: fl.src,
  tokens: fl.t,
  SEMVER_SPEC_VERSION: Wd.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Wd.RELEASE_TYPES,
  compareIdentifiers: Yd.compareIdentifiers,
  rcompareIdentifiers: Yd.rcompareIdentifiers
};
const Nn = /* @__PURE__ */ rs(Yc);
var xo = {}, ja = { exports: {} };
ja.exports;
(function(e, t) {
  var r = 200, n = "__lodash_hash_undefined__", i = 1, o = 2, a = 9007199254740991, s = "[object Arguments]", l = "[object Array]", f = "[object AsyncFunction]", u = "[object Boolean]", c = "[object Date]", d = "[object Error]", h = "[object Function]", m = "[object GeneratorFunction]", y = "[object Map]", g = "[object Number]", $ = "[object Null]", w = "[object Object]", O = "[object Promise]", N = "[object Proxy]", j = "[object RegExp]", I = "[object Set]", F = "[object String]", q = "[object Symbol]", E = "[object Undefined]", Y = "[object WeakMap]", B = "[object ArrayBuffer]", z = "[object DataView]", X = "[object Float32Array]", k = "[object Float64Array]", x = "[object Int8Array]", G = "[object Int16Array]", L = "[object Int32Array]", W = "[object Uint8Array]", V = "[object Uint8ClampedArray]", U = "[object Uint16Array]", T = "[object Uint32Array]", R = /[\\^$.*+?()[\]{}|]/g, P = /^\[object .+?Constructor\]$/, _ = /^(?:0|[1-9]\d*)$/, b = {};
  b[X] = b[k] = b[x] = b[G] = b[L] = b[W] = b[V] = b[U] = b[T] = !0, b[s] = b[l] = b[B] = b[u] = b[z] = b[c] = b[d] = b[h] = b[y] = b[g] = b[w] = b[j] = b[I] = b[F] = b[Y] = !1;
  var M = typeof Ft == "object" && Ft && Ft.Object === Object && Ft, v = typeof self == "object" && self && self.Object === Object && self, p = M || v || Function("return this")(), D = t && !t.nodeType && t, A = D && !0 && e && !e.nodeType && e, te = A && A.exports === D, he = te && M.process, ye = function() {
    try {
      return he && he.binding && he.binding("util");
    } catch {
    }
  }(), Ce = ye && ye.isTypedArray;
  function Ie(S, C) {
    for (var H = -1, J = S == null ? 0 : S.length, ge = 0, oe = []; ++H < J; ) {
      var Ae = S[H];
      C(Ae, H, S) && (oe[ge++] = Ae);
    }
    return oe;
  }
  function bt(S, C) {
    for (var H = -1, J = C.length, ge = S.length; ++H < J; )
      S[ge + H] = C[H];
    return S;
  }
  function we(S, C) {
    for (var H = -1, J = S == null ? 0 : S.length; ++H < J; )
      if (C(S[H], H, S))
        return !0;
    return !1;
  }
  function it(S, C) {
    for (var H = -1, J = Array(S); ++H < S; )
      J[H] = C(H);
    return J;
  }
  function Xr(S) {
    return function(C) {
      return S(C);
    };
  }
  function hr(S, C) {
    return S.has(C);
  }
  function Jt(S, C) {
    return S == null ? void 0 : S[C];
  }
  function pr(S) {
    var C = -1, H = Array(S.size);
    return S.forEach(function(J, ge) {
      H[++C] = [ge, J];
    }), H;
  }
  function _i(S, C) {
    return function(H) {
      return S(C(H));
    };
  }
  function wi(S) {
    var C = -1, H = Array(S.size);
    return S.forEach(function(J) {
      H[++C] = J;
    }), H;
  }
  var Ei = Array.prototype, Jr = Function.prototype, mr = Object.prototype, Tn = p["__core-js_shared__"], Si = Jr.toString, At = mr.hasOwnProperty, pf = function() {
    var S = /[^.]+$/.exec(Tn && Tn.keys && Tn.keys.IE_PROTO || "");
    return S ? "Symbol(src)_1." + S : "";
  }(), mf = mr.toString, Gv = RegExp(
    "^" + Si.call(At).replace(R, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), yf = te ? p.Buffer : void 0, qo = p.Symbol, gf = p.Uint8Array, vf = mr.propertyIsEnumerable, Vv = Ei.splice, Qr = qo ? qo.toStringTag : void 0, $f = Object.getOwnPropertySymbols, zv = yf ? yf.isBuffer : void 0, Wv = _i(Object.keys, Object), Hs = Pn(p, "DataView"), bi = Pn(p, "Map"), qs = Pn(p, "Promise"), Gs = Pn(p, "Set"), Vs = Pn(p, "WeakMap"), Ai = Pn(Object, "create"), Yv = tn(Hs), Kv = tn(bi), Xv = tn(qs), Jv = tn(Gs), Qv = tn(Vs), _f = qo ? qo.prototype : void 0, zs = _f ? _f.valueOf : void 0;
  function Zr(S) {
    var C = -1, H = S == null ? 0 : S.length;
    for (this.clear(); ++C < H; ) {
      var J = S[C];
      this.set(J[0], J[1]);
    }
  }
  function Zv() {
    this.__data__ = Ai ? Ai(null) : {}, this.size = 0;
  }
  function e$(S) {
    var C = this.has(S) && delete this.__data__[S];
    return this.size -= C ? 1 : 0, C;
  }
  function t$(S) {
    var C = this.__data__;
    if (Ai) {
      var H = C[S];
      return H === n ? void 0 : H;
    }
    return At.call(C, S) ? C[S] : void 0;
  }
  function r$(S) {
    var C = this.__data__;
    return Ai ? C[S] !== void 0 : At.call(C, S);
  }
  function n$(S, C) {
    var H = this.__data__;
    return this.size += this.has(S) ? 0 : 1, H[S] = Ai && C === void 0 ? n : C, this;
  }
  Zr.prototype.clear = Zv, Zr.prototype.delete = e$, Zr.prototype.get = t$, Zr.prototype.has = r$, Zr.prototype.set = n$;
  function Qt(S) {
    var C = -1, H = S == null ? 0 : S.length;
    for (this.clear(); ++C < H; ) {
      var J = S[C];
      this.set(J[0], J[1]);
    }
  }
  function i$() {
    this.__data__ = [], this.size = 0;
  }
  function o$(S) {
    var C = this.__data__, H = Vo(C, S);
    if (H < 0)
      return !1;
    var J = C.length - 1;
    return H == J ? C.pop() : Vv.call(C, H, 1), --this.size, !0;
  }
  function a$(S) {
    var C = this.__data__, H = Vo(C, S);
    return H < 0 ? void 0 : C[H][1];
  }
  function s$(S) {
    return Vo(this.__data__, S) > -1;
  }
  function l$(S, C) {
    var H = this.__data__, J = Vo(H, S);
    return J < 0 ? (++this.size, H.push([S, C])) : H[J][1] = C, this;
  }
  Qt.prototype.clear = i$, Qt.prototype.delete = o$, Qt.prototype.get = a$, Qt.prototype.has = s$, Qt.prototype.set = l$;
  function en(S) {
    var C = -1, H = S == null ? 0 : S.length;
    for (this.clear(); ++C < H; ) {
      var J = S[C];
      this.set(J[0], J[1]);
    }
  }
  function c$() {
    this.size = 0, this.__data__ = {
      hash: new Zr(),
      map: new (bi || Qt)(),
      string: new Zr()
    };
  }
  function u$(S) {
    var C = zo(this, S).delete(S);
    return this.size -= C ? 1 : 0, C;
  }
  function f$(S) {
    return zo(this, S).get(S);
  }
  function d$(S) {
    return zo(this, S).has(S);
  }
  function h$(S, C) {
    var H = zo(this, S), J = H.size;
    return H.set(S, C), this.size += H.size == J ? 0 : 1, this;
  }
  en.prototype.clear = c$, en.prototype.delete = u$, en.prototype.get = f$, en.prototype.has = d$, en.prototype.set = h$;
  function Go(S) {
    var C = -1, H = S == null ? 0 : S.length;
    for (this.__data__ = new en(); ++C < H; )
      this.add(S[C]);
  }
  function p$(S) {
    return this.__data__.set(S, n), this;
  }
  function m$(S) {
    return this.__data__.has(S);
  }
  Go.prototype.add = Go.prototype.push = p$, Go.prototype.has = m$;
  function yr(S) {
    var C = this.__data__ = new Qt(S);
    this.size = C.size;
  }
  function y$() {
    this.__data__ = new Qt(), this.size = 0;
  }
  function g$(S) {
    var C = this.__data__, H = C.delete(S);
    return this.size = C.size, H;
  }
  function v$(S) {
    return this.__data__.get(S);
  }
  function $$(S) {
    return this.__data__.has(S);
  }
  function _$(S, C) {
    var H = this.__data__;
    if (H instanceof Qt) {
      var J = H.__data__;
      if (!bi || J.length < r - 1)
        return J.push([S, C]), this.size = ++H.size, this;
      H = this.__data__ = new en(J);
    }
    return H.set(S, C), this.size = H.size, this;
  }
  yr.prototype.clear = y$, yr.prototype.delete = g$, yr.prototype.get = v$, yr.prototype.has = $$, yr.prototype.set = _$;
  function w$(S, C) {
    var H = Wo(S), J = !H && F$(S), ge = !H && !J && Ws(S), oe = !H && !J && !ge && Of(S), Ae = H || J || ge || oe, Ue = Ae ? it(S.length, String) : [], qe = Ue.length;
    for (var Ee in S)
      At.call(S, Ee) && !(Ae && // Safari 9 has enumerable `arguments.length` in strict mode.
      (Ee == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      ge && (Ee == "offset" || Ee == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      oe && (Ee == "buffer" || Ee == "byteLength" || Ee == "byteOffset") || // Skip index properties.
      N$(Ee, qe))) && Ue.push(Ee);
    return Ue;
  }
  function Vo(S, C) {
    for (var H = S.length; H--; )
      if (Af(S[H][0], C))
        return H;
    return -1;
  }
  function E$(S, C, H) {
    var J = C(S);
    return Wo(S) ? J : bt(J, H(S));
  }
  function Ti(S) {
    return S == null ? S === void 0 ? E : $ : Qr && Qr in Object(S) ? O$(S) : x$(S);
  }
  function wf(S) {
    return Pi(S) && Ti(S) == s;
  }
  function Ef(S, C, H, J, ge) {
    return S === C ? !0 : S == null || C == null || !Pi(S) && !Pi(C) ? S !== S && C !== C : S$(S, C, H, J, Ef, ge);
  }
  function S$(S, C, H, J, ge, oe) {
    var Ae = Wo(S), Ue = Wo(C), qe = Ae ? l : gr(S), Ee = Ue ? l : gr(C);
    qe = qe == s ? w : qe, Ee = Ee == s ? w : Ee;
    var $t = qe == w, Nt = Ee == w, Ke = qe == Ee;
    if (Ke && Ws(S)) {
      if (!Ws(C))
        return !1;
      Ae = !0, $t = !1;
    }
    if (Ke && !$t)
      return oe || (oe = new yr()), Ae || Of(S) ? Sf(S, C, H, J, ge, oe) : P$(S, C, qe, H, J, ge, oe);
    if (!(H & i)) {
      var Tt = $t && At.call(S, "__wrapped__"), Pt = Nt && At.call(C, "__wrapped__");
      if (Tt || Pt) {
        var vr = Tt ? S.value() : S, Zt = Pt ? C.value() : C;
        return oe || (oe = new yr()), ge(vr, Zt, H, J, oe);
      }
    }
    return Ke ? (oe || (oe = new yr()), C$(S, C, H, J, ge, oe)) : !1;
  }
  function b$(S) {
    if (!Cf(S) || D$(S))
      return !1;
    var C = Tf(S) ? Gv : P;
    return C.test(tn(S));
  }
  function A$(S) {
    return Pi(S) && Pf(S.length) && !!b[Ti(S)];
  }
  function T$(S) {
    if (!k$(S))
      return Wv(S);
    var C = [];
    for (var H in Object(S))
      At.call(S, H) && H != "constructor" && C.push(H);
    return C;
  }
  function Sf(S, C, H, J, ge, oe) {
    var Ae = H & i, Ue = S.length, qe = C.length;
    if (Ue != qe && !(Ae && qe > Ue))
      return !1;
    var Ee = oe.get(S);
    if (Ee && oe.get(C))
      return Ee == C;
    var $t = -1, Nt = !0, Ke = H & o ? new Go() : void 0;
    for (oe.set(S, C), oe.set(C, S); ++$t < Ue; ) {
      var Tt = S[$t], Pt = C[$t];
      if (J)
        var vr = Ae ? J(Pt, Tt, $t, C, S, oe) : J(Tt, Pt, $t, S, C, oe);
      if (vr !== void 0) {
        if (vr)
          continue;
        Nt = !1;
        break;
      }
      if (Ke) {
        if (!we(C, function(Zt, rn) {
          if (!hr(Ke, rn) && (Tt === Zt || ge(Tt, Zt, H, J, oe)))
            return Ke.push(rn);
        })) {
          Nt = !1;
          break;
        }
      } else if (!(Tt === Pt || ge(Tt, Pt, H, J, oe))) {
        Nt = !1;
        break;
      }
    }
    return oe.delete(S), oe.delete(C), Nt;
  }
  function P$(S, C, H, J, ge, oe, Ae) {
    switch (H) {
      case z:
        if (S.byteLength != C.byteLength || S.byteOffset != C.byteOffset)
          return !1;
        S = S.buffer, C = C.buffer;
      case B:
        return !(S.byteLength != C.byteLength || !oe(new gf(S), new gf(C)));
      case u:
      case c:
      case g:
        return Af(+S, +C);
      case d:
        return S.name == C.name && S.message == C.message;
      case j:
      case F:
        return S == C + "";
      case y:
        var Ue = pr;
      case I:
        var qe = J & i;
        if (Ue || (Ue = wi), S.size != C.size && !qe)
          return !1;
        var Ee = Ae.get(S);
        if (Ee)
          return Ee == C;
        J |= o, Ae.set(S, C);
        var $t = Sf(Ue(S), Ue(C), J, ge, oe, Ae);
        return Ae.delete(S), $t;
      case q:
        if (zs)
          return zs.call(S) == zs.call(C);
    }
    return !1;
  }
  function C$(S, C, H, J, ge, oe) {
    var Ae = H & i, Ue = bf(S), qe = Ue.length, Ee = bf(C), $t = Ee.length;
    if (qe != $t && !Ae)
      return !1;
    for (var Nt = qe; Nt--; ) {
      var Ke = Ue[Nt];
      if (!(Ae ? Ke in C : At.call(C, Ke)))
        return !1;
    }
    var Tt = oe.get(S);
    if (Tt && oe.get(C))
      return Tt == C;
    var Pt = !0;
    oe.set(S, C), oe.set(C, S);
    for (var vr = Ae; ++Nt < qe; ) {
      Ke = Ue[Nt];
      var Zt = S[Ke], rn = C[Ke];
      if (J)
        var If = Ae ? J(rn, Zt, Ke, C, S, oe) : J(Zt, rn, Ke, S, C, oe);
      if (!(If === void 0 ? Zt === rn || ge(Zt, rn, H, J, oe) : If)) {
        Pt = !1;
        break;
      }
      vr || (vr = Ke == "constructor");
    }
    if (Pt && !vr) {
      var Yo = S.constructor, Ko = C.constructor;
      Yo != Ko && "constructor" in S && "constructor" in C && !(typeof Yo == "function" && Yo instanceof Yo && typeof Ko == "function" && Ko instanceof Ko) && (Pt = !1);
    }
    return oe.delete(S), oe.delete(C), Pt;
  }
  function bf(S) {
    return E$(S, M$, I$);
  }
  function zo(S, C) {
    var H = S.__data__;
    return R$(C) ? H[typeof C == "string" ? "string" : "hash"] : H.map;
  }
  function Pn(S, C) {
    var H = Jt(S, C);
    return b$(H) ? H : void 0;
  }
  function O$(S) {
    var C = At.call(S, Qr), H = S[Qr];
    try {
      S[Qr] = void 0;
      var J = !0;
    } catch {
    }
    var ge = mf.call(S);
    return J && (C ? S[Qr] = H : delete S[Qr]), ge;
  }
  var I$ = $f ? function(S) {
    return S == null ? [] : (S = Object(S), Ie($f(S), function(C) {
      return vf.call(S, C);
    }));
  } : j$, gr = Ti;
  (Hs && gr(new Hs(new ArrayBuffer(1))) != z || bi && gr(new bi()) != y || qs && gr(qs.resolve()) != O || Gs && gr(new Gs()) != I || Vs && gr(new Vs()) != Y) && (gr = function(S) {
    var C = Ti(S), H = C == w ? S.constructor : void 0, J = H ? tn(H) : "";
    if (J)
      switch (J) {
        case Yv:
          return z;
        case Kv:
          return y;
        case Xv:
          return O;
        case Jv:
          return I;
        case Qv:
          return Y;
      }
    return C;
  });
  function N$(S, C) {
    return C = C ?? a, !!C && (typeof S == "number" || _.test(S)) && S > -1 && S % 1 == 0 && S < C;
  }
  function R$(S) {
    var C = typeof S;
    return C == "string" || C == "number" || C == "symbol" || C == "boolean" ? S !== "__proto__" : S === null;
  }
  function D$(S) {
    return !!pf && pf in S;
  }
  function k$(S) {
    var C = S && S.constructor, H = typeof C == "function" && C.prototype || mr;
    return S === H;
  }
  function x$(S) {
    return mf.call(S);
  }
  function tn(S) {
    if (S != null) {
      try {
        return Si.call(S);
      } catch {
      }
      try {
        return S + "";
      } catch {
      }
    }
    return "";
  }
  function Af(S, C) {
    return S === C || S !== S && C !== C;
  }
  var F$ = wf(/* @__PURE__ */ function() {
    return arguments;
  }()) ? wf : function(S) {
    return Pi(S) && At.call(S, "callee") && !vf.call(S, "callee");
  }, Wo = Array.isArray;
  function L$(S) {
    return S != null && Pf(S.length) && !Tf(S);
  }
  var Ws = zv || B$;
  function U$(S, C) {
    return Ef(S, C);
  }
  function Tf(S) {
    if (!Cf(S))
      return !1;
    var C = Ti(S);
    return C == h || C == m || C == f || C == N;
  }
  function Pf(S) {
    return typeof S == "number" && S > -1 && S % 1 == 0 && S <= a;
  }
  function Cf(S) {
    var C = typeof S;
    return S != null && (C == "object" || C == "function");
  }
  function Pi(S) {
    return S != null && typeof S == "object";
  }
  var Of = Ce ? Xr(Ce) : A$;
  function M$(S) {
    return L$(S) ? w$(S) : T$(S);
  }
  function j$() {
    return [];
  }
  function B$() {
    return !1;
  }
  e.exports = U$;
})(ja, ja.exports);
var mP = ja.exports;
Object.defineProperty(xo, "__esModule", { value: !0 });
xo.DownloadedUpdateHelper = void 0;
xo.createTempUpdateFile = _P;
const yP = Ao, gP = qr, Kd = mP, sn = Gr, Qi = ce;
class vP {
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
    return Qi.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, r, n, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return Kd(this.versionInfo, r) && Kd(this.fileInfo.info, n.info) && await (0, sn.pathExists)(t) ? t : null;
    const o = await this.getValidCachedUpdateFile(n, i);
    return o === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = o, o);
  }
  async setDownloadedFile(t, r, n, i, o, a) {
    this._file = t, this._packageFile = r, this.versionInfo = n, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: o,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, a && await (0, sn.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, sn.emptyDir)(this.cacheDirForPendingUpdate);
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
    if (!await (0, sn.pathExists)(n))
      return null;
    let o;
    try {
      o = await (0, sn.readJson)(n);
    } catch (f) {
      let u = "No cached update info available";
      return f.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), u += ` (error on read: ${f.message})`), r.info(u), null;
    }
    if (!((o == null ? void 0 : o.fileName) !== null))
      return r.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== o.sha512)
      return r.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${o.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const s = Qi.join(this.cacheDirForPendingUpdate, o.fileName);
    if (!await (0, sn.pathExists)(s))
      return r.info("Cached update file doesn't exist"), null;
    const l = await $P(s);
    return t.info.sha512 !== l ? (r.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${l}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = o, s);
  }
  getUpdateInfoFile() {
    return Qi.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
xo.DownloadedUpdateHelper = vP;
function $P(e, t = "sha512", r = "base64", n) {
  return new Promise((i, o) => {
    const a = (0, yP.createHash)(t);
    a.on("error", o).setEncoding(r), (0, gP.createReadStream)(e, {
      ...n,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", o).on("end", () => {
      a.end(), i(a.read());
    }).pipe(a, { end: !1 });
  });
}
async function _P(e, t, r) {
  let n = 0, i = Qi.join(t, e);
  for (let o = 0; o < 3; o++)
    try {
      return await (0, sn.unlink)(i), i;
    } catch (a) {
      if (a.code === "ENOENT")
        return i;
      r.warn(`Error on remove temp update file: ${a}`), i = Qi.join(t, `${n++}-${e}`);
    }
  return i;
}
var gs = {}, Kc = {};
Object.defineProperty(Kc, "__esModule", { value: !0 });
Kc.getAppCacheDir = EP;
const dl = ce, wP = es;
function EP() {
  const e = (0, wP.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || dl.join(e, "AppData", "Local") : process.platform === "darwin" ? t = dl.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || dl.join(e, ".cache"), t;
}
Object.defineProperty(gs, "__esModule", { value: !0 });
gs.ElectronAppAdapter = void 0;
const Xd = ce, SP = Kc;
class bP {
  constructor(t = lr.app) {
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
    return this.isPackaged ? Xd.join(process.resourcesPath, "app-update.yml") : Xd.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, SP.getAppCacheDir)();
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
gs.ElectronAppAdapter = bP;
var X0 = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = r;
  const t = Be;
  e.NET_SESSION_NAME = "electron-updater";
  function r() {
    return lr.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class n extends t.HttpExecutor {
    constructor(o) {
      super(), this.proxyLoginCallback = o, this.cachedSession = null;
    }
    async download(o, a, s) {
      return await s.cancellationToken.createPromise((l, f, u) => {
        const c = {
          headers: s.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(o, c), (0, t.configureRequestOptions)(c), this.doDownload(c, {
          destination: a,
          options: s,
          onCancel: u,
          callback: (d) => {
            d == null ? l(a) : f(d);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(o, a) {
      o.headers && o.headers.Host && (o.host = o.headers.Host, delete o.headers.Host), this.cachedSession == null && (this.cachedSession = r());
      const s = lr.net.request({
        ...o,
        session: this.cachedSession
      });
      return s.on("response", a), this.proxyLoginCallback != null && s.on("login", this.proxyLoginCallback), s;
    }
    addRedirectHandlers(o, a, s, l, f) {
      o.on("redirect", (u, c, d) => {
        o.abort(), l > this.maxRedirects ? s(this.createMaxRedirectError()) : f(t.HttpExecutor.prepareRedirectUrlOptions(d, a));
      });
    }
  }
  e.ElectronHttpExecutor = n;
})(X0);
var Fo = {}, It = {}, AP = "[object Symbol]", J0 = /[\\^$.*+?()[\]{}|]/g, TP = RegExp(J0.source), PP = typeof Ft == "object" && Ft && Ft.Object === Object && Ft, CP = typeof self == "object" && self && self.Object === Object && self, OP = PP || CP || Function("return this")(), IP = Object.prototype, NP = IP.toString, Jd = OP.Symbol, Qd = Jd ? Jd.prototype : void 0, Zd = Qd ? Qd.toString : void 0;
function RP(e) {
  if (typeof e == "string")
    return e;
  if (kP(e))
    return Zd ? Zd.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function DP(e) {
  return !!e && typeof e == "object";
}
function kP(e) {
  return typeof e == "symbol" || DP(e) && NP.call(e) == AP;
}
function xP(e) {
  return e == null ? "" : RP(e);
}
function FP(e) {
  return e = xP(e), e && TP.test(e) ? e.replace(J0, "\\$&") : e;
}
var LP = FP;
Object.defineProperty(It, "__esModule", { value: !0 });
It.newBaseUrl = MP;
It.newUrlFromBase = Ql;
It.getChannelFilename = jP;
It.blockmapFiles = BP;
const Q0 = li, UP = LP;
function MP(e) {
  const t = new Q0.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function Ql(e, t, r = !1) {
  const n = new Q0.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? n.search = i : r && (n.search = `noCache=${Date.now().toString(32)}`), n;
}
function jP(e) {
  return `${e}.yml`;
}
function BP(e, t, r) {
  const n = Ql(`${e.pathname}.blockmap`, e);
  return [Ql(`${e.pathname.replace(new RegExp(UP(r), "g"), t)}.blockmap`, e), n];
}
var He = {};
Object.defineProperty(He, "__esModule", { value: !0 });
He.Provider = void 0;
He.findFile = GP;
He.parseUpdateInfo = VP;
He.getFileList = Z0;
He.resolveFiles = zP;
const jr = Be, HP = Ye, eh = It;
class qP {
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
    return this.requestHeaders == null ? r != null && (n.headers = r) : n.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }, (0, jr.configureRequestUrl)(t, n), n;
  }
}
He.Provider = qP;
function GP(e, t, r) {
  if (e.length === 0)
    throw (0, jr.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const n = e.find((i) => i.url.pathname.toLowerCase().endsWith(`.${t}`));
  return n ?? (r == null ? e[0] : e.find((i) => !r.some((o) => i.url.pathname.toLowerCase().endsWith(`.${o}`))));
}
function VP(e, t, r) {
  if (e == null)
    throw (0, jr.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let n;
  try {
    n = (0, HP.load)(e);
  } catch (i) {
    throw (0, jr.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return n;
}
function Z0(e) {
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
  throw (0, jr.newError)(`No files provided: ${(0, jr.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function zP(e, t, r = (n) => n) {
  const i = Z0(e).map((s) => {
    if (s.sha2 == null && s.sha512 == null)
      throw (0, jr.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, jr.safeStringifyJson)(s)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, eh.newUrlFromBase)(r(s.url), t),
      info: s
    };
  }), o = e.packages, a = o == null ? null : o[process.arch] || o.ia32;
  return a != null && (i[0].packageInfo = {
    ...a,
    path: (0, eh.newUrlFromBase)(r(a.path), t).href
  }), i;
}
Object.defineProperty(Fo, "__esModule", { value: !0 });
Fo.GenericProvider = void 0;
const th = Be, hl = It, pl = He;
class WP extends pl.Provider {
  constructor(t, r, n) {
    super(n), this.configuration = t, this.updater = r, this.baseUrl = (0, hl.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, hl.getChannelFilename)(this.channel), r = (0, hl.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let n = 0; ; n++)
      try {
        return (0, pl.parseUpdateInfo)(await this.httpRequest(r), t, r);
      } catch (i) {
        if (i instanceof th.HttpError && i.statusCode === 404)
          throw (0, th.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
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
    return (0, pl.resolveFiles)(t, this.baseUrl);
  }
}
Fo.GenericProvider = WP;
var vs = {}, $s = {};
Object.defineProperty($s, "__esModule", { value: !0 });
$s.BitbucketProvider = void 0;
const rh = Be, ml = It, yl = He;
class YP extends yl.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r;
    const { owner: i, slug: o } = t;
    this.baseUrl = (0, ml.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${o}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new rh.CancellationToken(), r = (0, ml.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, ml.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, void 0, t);
      return (0, yl.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, rh.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, yl.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: r } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${r}, channel: ${this.channel})`;
  }
}
$s.BitbucketProvider = YP;
var Br = {};
Object.defineProperty(Br, "__esModule", { value: !0 });
Br.GitHubProvider = Br.BaseGitHubProvider = void 0;
Br.computeReleaseNotes = ty;
const tr = Be, qn = Yc, KP = li, Gn = It, Zl = He, gl = /\/tag\/([^/]+)$/;
class ey extends Zl.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, Gn.newBaseUrl)((0, tr.githubUrl)(t, r));
    const i = r === "github.com" ? "api.github.com" : r;
    this.baseApiUrl = (0, Gn.newBaseUrl)((0, tr.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const r = this.options.host;
    return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${t}` : t;
  }
}
Br.BaseGitHubProvider = ey;
class XP extends ey {
  constructor(t, r, n) {
    super(t, "github.com", n), this.options = t, this.updater = r;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, r, n, i, o;
    const a = new tr.CancellationToken(), s = await this.httpRequest((0, Gn.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, a), l = (0, tr.parseXml)(s);
    let f = l.element("entry", !1, "No published versions on GitHub"), u = null;
    try {
      if (this.updater.allowPrerelease) {
        const g = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((r = qn.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
        if (g === null)
          u = gl.exec(f.element("link").attribute("href"))[1];
        else
          for (const $ of l.getElements("entry")) {
            const w = gl.exec($.element("link").attribute("href"));
            if (w === null)
              continue;
            const O = w[1], N = ((n = qn.prerelease(O)) === null || n === void 0 ? void 0 : n[0]) || null, j = !g || ["alpha", "beta"].includes(g), I = N !== null && !["alpha", "beta"].includes(String(N));
            if (j && !I && !(g === "beta" && N === "alpha")) {
              u = O;
              break;
            }
            if (N && N === g) {
              u = O;
              break;
            }
          }
      } else {
        u = await this.getLatestTagName(a);
        for (const g of l.getElements("entry"))
          if (gl.exec(g.element("link").attribute("href"))[1] === u) {
            f = g;
            break;
          }
      }
    } catch (g) {
      throw (0, tr.newError)(`Cannot parse releases feed: ${g.stack || g.message},
XML:
${s}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (u == null)
      throw (0, tr.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let c, d = "", h = "";
    const m = async (g) => {
      d = (0, Gn.getChannelFilename)(g), h = (0, Gn.newUrlFromBase)(this.getBaseDownloadPath(String(u), d), this.baseUrl);
      const $ = this.createRequestOptions(h);
      try {
        return await this.executor.request($, a);
      } catch (w) {
        throw w instanceof tr.HttpError && w.statusCode === 404 ? (0, tr.newError)(`Cannot find ${d} in the latest release artifacts (${h}): ${w.stack || w.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : w;
      }
    };
    try {
      let g = this.channel;
      this.updater.allowPrerelease && (!((i = qn.prerelease(u)) === null || i === void 0) && i[0]) && (g = this.getCustomChannelName(String((o = qn.prerelease(u)) === null || o === void 0 ? void 0 : o[0]))), c = await m(g);
    } catch (g) {
      if (this.updater.allowPrerelease)
        c = await m(this.getDefaultChannelName());
      else
        throw g;
    }
    const y = (0, Zl.parseUpdateInfo)(c, d, h);
    return y.releaseName == null && (y.releaseName = f.elementValueOrEmpty("title")), y.releaseNotes == null && (y.releaseNotes = ty(this.updater.currentVersion, this.updater.fullChangelog, l, f)), {
      tag: u,
      ...y
    };
  }
  async getLatestTagName(t) {
    const r = this.options, n = r.host == null || r.host === "github.com" ? (0, Gn.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new KP.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(n, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, tr.newError)(`Unable to find latest version on GitHub (${n}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, Zl.resolveFiles)(t, this.baseUrl, (r) => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, r) {
    return `${this.basePath}/download/${t}/${r}`;
  }
}
Br.GitHubProvider = XP;
function nh(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function ty(e, t, r, n) {
  if (!t)
    return nh(n);
  const i = [];
  for (const o of r.getElements("entry")) {
    const a = /\/tag\/v?([^/]+)$/.exec(o.element("link").attribute("href"))[1];
    qn.lt(e, a) && i.push({
      version: a,
      note: nh(o)
    });
  }
  return i.sort((o, a) => qn.rcompare(o.version, a.version));
}
var _s = {};
Object.defineProperty(_s, "__esModule", { value: !0 });
_s.KeygenProvider = void 0;
const ih = Be, vl = It, $l = He;
class JP extends $l.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r, this.baseUrl = (0, vl.newBaseUrl)(`https://api.keygen.sh/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new ih.CancellationToken(), r = (0, vl.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, vl.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, $l.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, ih.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, $l.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: r, platform: n } = this.configuration;
    return `Keygen (account: ${t}, product: ${r}, platform: ${n}, channel: ${this.channel})`;
  }
}
_s.KeygenProvider = JP;
var ws = {};
Object.defineProperty(ws, "__esModule", { value: !0 });
ws.PrivateGitHubProvider = void 0;
const Rn = Be, QP = Ye, ZP = ce, oh = li, ah = It, eC = Br, tC = He;
class rC extends eC.BaseGitHubProvider {
  constructor(t, r, n, i) {
    super(t, "api.github.com", i), this.updater = r, this.token = n;
  }
  createRequestOptions(t, r) {
    const n = super.createRequestOptions(t, r);
    return n.redirect = "manual", n;
  }
  async getLatestVersion() {
    const t = new Rn.CancellationToken(), r = (0, ah.getChannelFilename)(this.getDefaultChannelName()), n = await this.getLatestVersionInfo(t), i = n.assets.find((s) => s.name === r);
    if (i == null)
      throw (0, Rn.newError)(`Cannot find ${r} in the release ${n.html_url || n.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const o = new oh.URL(i.url);
    let a;
    try {
      a = (0, QP.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
    } catch (s) {
      throw s instanceof Rn.HttpError && s.statusCode === 404 ? (0, Rn.newError)(`Cannot find ${r} in the latest release artifacts (${o}): ${s.stack || s.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : s;
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
    const i = (0, ah.newUrlFromBase)(n, this.baseUrl);
    try {
      const o = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return r ? o.find((a) => a.prerelease) || o[0] : o;
    } catch (o) {
      throw (0, Rn.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${o.stack || o.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, tC.getFileList)(t).map((r) => {
      const n = ZP.posix.basename(r.url).replace(/ /g, "-"), i = t.assets.find((o) => o != null && o.name === n);
      if (i == null)
        throw (0, Rn.newError)(`Cannot find asset "${n}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new oh.URL(i.url),
        info: r
      };
    });
  }
}
ws.PrivateGitHubProvider = rC;
Object.defineProperty(vs, "__esModule", { value: !0 });
vs.isUrlProbablySupportMultiRangeRequests = ry;
vs.createClient = sC;
const sa = Be, nC = $s, sh = Fo, iC = Br, oC = _s, aC = ws;
function ry(e) {
  return !e.includes("s3.amazonaws.com");
}
function sC(e, t, r) {
  if (typeof e == "string")
    throw (0, sa.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const n = e.provider;
  switch (n) {
    case "github": {
      const i = e, o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return o == null ? new iC.GitHubProvider(i, t, r) : new aC.PrivateGitHubProvider(i, t, o, r);
    }
    case "bitbucket":
      return new nC.BitbucketProvider(e, t, r);
    case "keygen":
      return new oC.KeygenProvider(e, t, r);
    case "s3":
    case "spaces":
      return new sh.GenericProvider({
        provider: "generic",
        url: (0, sa.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...r,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new sh.GenericProvider(i, t, {
        ...r,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && ry(i.url)
      });
    }
    case "custom": {
      const i = e, o = i.updateProvider;
      if (!o)
        throw (0, sa.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new o(i, t, r);
    }
    default:
      throw (0, sa.newError)(`Unsupported provider: ${n}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var Es = {}, Lo = {}, di = {}, Sn = {};
Object.defineProperty(Sn, "__esModule", { value: !0 });
Sn.OperationKind = void 0;
Sn.computeOperations = lC;
var hn;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(hn || (Sn.OperationKind = hn = {}));
function lC(e, t, r) {
  const n = ch(e.files), i = ch(t.files);
  let o = null;
  const a = t.files[0], s = [], l = a.name, f = n.get(l);
  if (f == null)
    throw new Error(`no file ${l} in old blockmap`);
  const u = i.get(l);
  let c = 0;
  const { checksumToOffset: d, checksumToOldSize: h } = uC(n.get(l), f.offset, r);
  let m = a.offset;
  for (let y = 0; y < u.checksums.length; m += u.sizes[y], y++) {
    const g = u.sizes[y], $ = u.checksums[y];
    let w = d.get($);
    w != null && h.get($) !== g && (r.warn(`Checksum ("${$}") matches, but size differs (old: ${h.get($)}, new: ${g})`), w = void 0), w === void 0 ? (c++, o != null && o.kind === hn.DOWNLOAD && o.end === m ? o.end += g : (o = {
      kind: hn.DOWNLOAD,
      start: m,
      end: m + g
      // oldBlocks: null,
    }, lh(o, s, $, y))) : o != null && o.kind === hn.COPY && o.end === w ? o.end += g : (o = {
      kind: hn.COPY,
      start: w,
      end: w + g
      // oldBlocks: [checksum]
    }, lh(o, s, $, y));
  }
  return c > 0 && r.info(`File${a.name === "file" ? "" : " " + a.name} has ${c} changed blocks`), s;
}
const cC = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function lh(e, t, r, n) {
  if (cC && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const o = [i.start, i.end, e.start, e.end].reduce((a, s) => a < s ? a : s);
      throw new Error(`operation (block index: ${n}, checksum: ${r}, kind: ${hn[e.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - o} until ${i.end - o} and ${e.start - o} until ${e.end - o}`);
    }
  }
  t.push(e);
}
function uC(e, t, r) {
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let o = t;
  for (let a = 0; a < e.checksums.length; a++) {
    const s = e.checksums[a], l = e.sizes[a], f = i.get(s);
    if (f === void 0)
      n.set(s, o), i.set(s, l);
    else if (r.debug != null) {
      const u = f === l ? "(same size)" : `(size: ${f}, this size: ${l})`;
      r.debug(`${s} duplicated in blockmap ${u}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    o += l;
  }
  return { checksumToOffset: n, checksumToOldSize: i };
}
function ch(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    t.set(r.name, r);
  return t;
}
Object.defineProperty(di, "__esModule", { value: !0 });
di.DataSplitter = void 0;
di.copyData = ny;
const la = Be, fC = qr, dC = To, hC = Sn, uh = Buffer.from(`\r
\r
`);
var Tr;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(Tr || (Tr = {}));
function ny(e, t, r, n, i) {
  const o = (0, fC.createReadStream)("", {
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
class pC extends dC.Writable {
  constructor(t, r, n, i, o, a) {
    super(), this.out = t, this.options = r, this.partIndexToTaskIndex = n, this.partIndexToLength = o, this.finishHandler = a, this.partIndex = -1, this.headerListBuffer = null, this.readState = Tr.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
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
      throw (0, la.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const n = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= n, r = n;
    } else if (this.remainingPartDataCount > 0) {
      const n = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= n, await this.processPartData(t, 0, n), r = n;
    }
    if (r !== t.length) {
      if (this.readState === Tr.HEADER) {
        const n = this.searchHeaderListEnd(t, r);
        if (n === -1)
          return;
        r = n, this.readState = Tr.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === Tr.BODY)
          this.readState = Tr.INIT;
        else {
          this.partIndex++;
          let a = this.partIndexToTaskIndex.get(this.partIndex);
          if (a == null)
            if (this.isFinished)
              a = this.options.end;
            else
              throw (0, la.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const s = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (s < a)
            await this.copyExistingData(s, a);
          else if (s > a)
            throw (0, la.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (r = this.searchHeaderListEnd(t, r), r === -1) {
            this.readState = Tr.HEADER;
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
        if (a.kind !== hC.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        ny(a, this.out, this.options.oldFileFd, i, () => {
          t++, o();
        });
      };
      o();
    });
  }
  searchHeaderListEnd(t, r) {
    const n = t.indexOf(uh, r);
    if (n !== -1)
      return n + uh.length;
    const i = r === 0 ? t : t.slice(r);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, la.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
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
di.DataSplitter = pC;
var Ss = {};
Object.defineProperty(Ss, "__esModule", { value: !0 });
Ss.executeTasksUsingMultipleRangeRequests = mC;
Ss.checkIsRangesSupported = tc;
const ec = Be, fh = di, dh = Sn;
function mC(e, t, r, n, i) {
  const o = (a) => {
    if (a >= t.length) {
      e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
      return;
    }
    const s = a + 1e3;
    yC(e, {
      tasks: t,
      start: a,
      end: Math.min(t.length, s),
      oldFileFd: n
    }, r, () => o(s), i);
  };
  return o;
}
function yC(e, t, r, n, i) {
  let o = "bytes=", a = 0;
  const s = /* @__PURE__ */ new Map(), l = [];
  for (let c = t.start; c < t.end; c++) {
    const d = t.tasks[c];
    d.kind === dh.OperationKind.DOWNLOAD && (o += `${d.start}-${d.end - 1}, `, s.set(a, c), a++, l.push(d.end - d.start));
  }
  if (a <= 1) {
    const c = (d) => {
      if (d >= t.end) {
        n();
        return;
      }
      const h = t.tasks[d++];
      if (h.kind === dh.OperationKind.COPY)
        (0, fh.copyData)(h, r, t.oldFileFd, i, () => c(d));
      else {
        const m = e.createRequestOptions();
        m.headers.Range = `bytes=${h.start}-${h.end - 1}`;
        const y = e.httpExecutor.createRequest(m, (g) => {
          tc(g, i) && (g.pipe(r, {
            end: !1
          }), g.once("end", () => c(d)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(y, i), y.end();
      }
    };
    c(t.start);
    return;
  }
  const f = e.createRequestOptions();
  f.headers.Range = o.substring(0, o.length - 2);
  const u = e.httpExecutor.createRequest(f, (c) => {
    if (!tc(c, i))
      return;
    const d = (0, ec.safeGetHeader)(c, "content-type"), h = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(d);
    if (h == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${d}"`));
      return;
    }
    const m = new fh.DataSplitter(r, t, s, h[1] || h[2], l, n);
    m.on("error", i), c.pipe(m), c.on("end", () => {
      setTimeout(() => {
        u.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(u, i), u.end();
}
function tc(e, t) {
  if (e.statusCode >= 400)
    return t((0, ec.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const r = (0, ec.safeGetHeader)(e, "accept-ranges");
    if (r == null || r === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var bs = {};
Object.defineProperty(bs, "__esModule", { value: !0 });
bs.ProgressDifferentialDownloadCallbackTransform = void 0;
const gC = To;
var Vn;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Vn || (Vn = {}));
class vC extends gC.Transform {
  constructor(t, r, n) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = Vn.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == Vn.COPY) {
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
    this.operationType = Vn.COPY;
  }
  beginRangeDownload() {
    this.operationType = Vn.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
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
bs.ProgressDifferentialDownloadCallbackTransform = vC;
Object.defineProperty(Lo, "__esModule", { value: !0 });
Lo.DifferentialDownloader = void 0;
const Fi = Be, _l = Gr, $C = qr, _C = di, wC = li, ca = Sn, hh = Ss, EC = bs;
class SC {
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
    return (0, Fi.configureRequestUrl)(this.options.newUrl, t), (0, Fi.configureRequestOptions)(t), t;
  }
  doDownload(t, r) {
    if (t.version !== r.version)
      throw new Error(`version is different (${t.version} - ${r.version}), full download is required`);
    const n = this.logger, i = (0, ca.computeOperations)(t, r, n);
    n.debug != null && n.debug(JSON.stringify(i, null, 2));
    let o = 0, a = 0;
    for (const l of i) {
      const f = l.end - l.start;
      l.kind === ca.OperationKind.DOWNLOAD ? o += f : a += f;
    }
    const s = this.blockAwareFileInfo.size;
    if (o + a + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== s)
      throw new Error(`Internal error, size mismatch: downloadSize: ${o}, copySize: ${a}, newSize: ${s}`);
    return n.info(`Full: ${ph(s)}, To download: ${ph(o)} (${Math.round(o / (s / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const r = [], n = () => Promise.all(r.map((i) => (0, _l.close)(i.descriptor).catch((o) => {
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
    const n = await (0, _l.open)(this.options.oldFile, "r");
    r.push({ descriptor: n, path: this.options.oldFile });
    const i = await (0, _l.open)(this.options.newFile, "w");
    r.push({ descriptor: i, path: this.options.newFile });
    const o = (0, $C.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((a, s) => {
      const l = [];
      let f;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const $ = [];
        let w = 0;
        for (const N of t)
          N.kind === ca.OperationKind.DOWNLOAD && ($.push(N.end - N.start), w += N.end - N.start);
        const O = {
          expectedByteCounts: $,
          grandTotal: w
        };
        f = new EC.ProgressDifferentialDownloadCallbackTransform(O, this.options.cancellationToken, this.options.onProgress), l.push(f);
      }
      const u = new Fi.DigestTransform(this.blockAwareFileInfo.sha512);
      u.isValidateOnEnd = !1, l.push(u), o.on("finish", () => {
        o.close(() => {
          r.splice(1, 1);
          try {
            u.validate();
          } catch ($) {
            s($);
            return;
          }
          a(void 0);
        });
      }), l.push(o);
      let c = null;
      for (const $ of l)
        $.on("error", s), c == null ? c = $ : c = c.pipe($);
      const d = l[0];
      let h;
      if (this.options.isUseMultipleRangeRequest) {
        h = (0, hh.executeTasksUsingMultipleRangeRequests)(this, t, d, n, s), h(0);
        return;
      }
      let m = 0, y = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const g = this.createRequestOptions();
      g.redirect = "manual", h = ($) => {
        var w, O;
        if ($ >= t.length) {
          this.fileMetadataBuffer != null && d.write(this.fileMetadataBuffer), d.end();
          return;
        }
        const N = t[$++];
        if (N.kind === ca.OperationKind.COPY) {
          f && f.beginFileCopy(), (0, _C.copyData)(N, d, n, s, () => h($));
          return;
        }
        const j = `bytes=${N.start}-${N.end - 1}`;
        g.headers.range = j, (O = (w = this.logger) === null || w === void 0 ? void 0 : w.debug) === null || O === void 0 || O.call(w, `download range: ${j}`), f && f.beginRangeDownload();
        const I = this.httpExecutor.createRequest(g, (F) => {
          F.on("error", s), F.on("aborted", () => {
            s(new Error("response has been aborted by the server"));
          }), F.statusCode >= 400 && s((0, Fi.createHttpError)(F)), F.pipe(d, {
            end: !1
          }), F.once("end", () => {
            f && f.endRangeDownload(), ++m === 100 ? (m = 0, setTimeout(() => h($), 1e3)) : h($);
          });
        });
        I.on("redirect", (F, q, E) => {
          this.logger.info(`Redirect to ${bC(E)}`), y = E, (0, Fi.configureRequestUrl)(new wC.URL(y), g), I.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(I, s), I.end();
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
        (0, hh.checkIsRangesSupported)(a, i) && (a.on("error", i), a.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), a.on("data", r), a.on("end", () => n()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
    });
  }
}
Lo.DifferentialDownloader = SC;
function ph(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function bC(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(Es, "__esModule", { value: !0 });
Es.GenericDifferentialDownloader = void 0;
const AC = Lo;
class TC extends AC.DifferentialDownloader {
  download(t, r) {
    return this.doDownload(t, r);
  }
}
Es.GenericDifferentialDownloader = TC;
var mh;
function Xc() {
  if (mh) return nn;
  mh = 1, Object.defineProperty(nn, "__esModule", { value: !0 }), nn.NoOpLogger = nn.AppUpdater = void 0;
  const e = Be, t = Ao, r = es, n = Xp, i = Gr, o = Ye, a = fs, s = ce, l = Yc, f = xo, u = gs, c = X0, d = Fo, h = hi(), m = vs, y = Zp, g = It, $ = Es;
  let w = class iy extends n.EventEmitter {
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
    set channel(I) {
      if (this._channel != null) {
        if (typeof I != "string")
          throw (0, e.newError)(`Channel must be a string, but got: ${I}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (I.length === 0)
          throw (0, e.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
      }
      this._channel = I, this.allowDowngrade = !0;
    }
    /**
     *  Shortcut for explicitly adding auth tokens to request headers
     */
    addAuthHeader(I) {
      this.requestHeaders = Object.assign({}, this.requestHeaders, {
        authorization: I
      });
    }
    // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    get netSession() {
      return (0, c.getNetSession)();
    }
    /**
     * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
     * Set it to `null` if you would like to disable a logging feature.
     */
    get logger() {
      return this._logger;
    }
    set logger(I) {
      this._logger = I ?? new N();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(I) {
      this.clientPromise = null, this._appUpdateConfigPath = I, this.configOnDisk = new a.Lazy(() => this.loadUpdateConfig());
    }
    constructor(I, F) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new h.UpdaterSignal(this), this._appUpdateConfigPath = null, this.clientPromise = null, this.stagingUserIdPromise = new a.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new a.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (Y) => {
        this._logger.error(`Error: ${Y.stack || Y.message}`);
      }), F == null ? (this.app = new u.ElectronAppAdapter(), this.httpExecutor = new c.ElectronHttpExecutor((Y, B) => this.emit("login", Y, B))) : (this.app = F, this.httpExecutor = null);
      const q = this.app.version, E = (0, l.parse)(q);
      if (E == null)
        throw (0, e.newError)(`App version is not a valid semver version: "${q}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = E, this.allowPrerelease = O(E), I != null && (this.setFeedURL(I), typeof I != "string" && I.requestHeaders && (this.requestHeaders = I.requestHeaders));
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
      return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(I) {
      const F = this.createProviderRuntimeOptions();
      let q;
      typeof I == "string" ? q = new d.GenericProvider({ provider: "generic", url: I }, this, {
        ...F,
        isUseMultipleRangeRequest: (0, m.isUrlProbablySupportMultiRangeRequests)(I)
      }) : q = (0, m.createClient)(I, this, F), this.clientPromise = Promise.resolve(q);
    }
    /**
     * Asks the server whether there is an update.
     */
    checkForUpdates() {
      if (!this.isUpdaterActive())
        return Promise.resolve(null);
      let I = this.checkForUpdatesPromise;
      if (I != null)
        return this._logger.info("Checking for update (already in progress)"), I;
      const F = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), I = this.doCheckForUpdates().then((q) => (F(), q)).catch((q) => {
        throw F(), this.emit("error", q, `Cannot check for updates: ${(q.stack || q).toString()}`), q;
      }), this.checkForUpdatesPromise = I, I;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(I) {
      return this.checkForUpdates().then((F) => F != null && F.downloadPromise ? (F.downloadPromise.then(() => {
        const q = iy.formatDownloadNotification(F.updateInfo.version, this.app.name, I);
        new lr.Notification(q).show();
      }), F) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), F));
    }
    static formatDownloadNotification(I, F, q) {
      return q == null && (q = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), q = {
        title: q.title.replace("{appName}", F).replace("{version}", I),
        body: q.body.replace("{appName}", F).replace("{version}", I)
      }, q;
    }
    async isStagingMatch(I) {
      const F = I.stagingPercentage;
      let q = F;
      if (q == null)
        return !0;
      if (q = parseInt(q, 10), isNaN(q))
        return this._logger.warn(`Staging percentage is NaN: ${F}`), !0;
      q = q / 100;
      const E = await this.stagingUserIdPromise.value, B = e.UUID.parse(E).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${q}, percentage: ${B}, user id: ${E}`), B < q;
    }
    computeFinalHeaders(I) {
      return this.requestHeaders != null && Object.assign(I, this.requestHeaders), I;
    }
    async isUpdateAvailable(I) {
      const F = (0, l.parse)(I.version);
      if (F == null)
        throw (0, e.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${I.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const q = this.currentVersion;
      if ((0, l.eq)(F, q))
        return !1;
      const E = I == null ? void 0 : I.minimumSystemVersion, Y = (0, r.release)();
      if (E)
        try {
          if ((0, l.lt)(Y, E))
            return this._logger.info(`Current OS version ${Y} is less than the minimum OS version required ${E} for version ${Y}`), !1;
        } catch (k) {
          this._logger.warn(`Failed to compare current OS version(${Y}) with minimum OS version(${E}): ${(k.message || k).toString()}`);
        }
      if (!await this.isStagingMatch(I))
        return !1;
      const z = (0, l.gt)(F, q), X = (0, l.lt)(F, q);
      return z ? !0 : this.allowDowngrade && X;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((q) => (0, m.createClient)(q, this, this.createProviderRuntimeOptions())));
      const I = await this.clientPromise, F = await this.stagingUserIdPromise.value;
      return I.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": F })), {
        info: await I.getLatestVersion(),
        provider: I
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
      const I = await this.getUpdateInfoAndProvider(), F = I.info;
      if (!await this.isUpdateAvailable(F))
        return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${F.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", F), {
          versionInfo: F,
          updateInfo: F
        };
      this.updateInfoAndProvider = I, this.onUpdateAvailable(F);
      const q = new e.CancellationToken();
      return {
        versionInfo: F,
        updateInfo: F,
        cancellationToken: q,
        downloadPromise: this.autoDownload ? this.downloadUpdate(q) : null
      };
    }
    onUpdateAvailable(I) {
      this._logger.info(`Found version ${I.version} (url: ${(0, e.asArray)(I.files).map((F) => F.url).join(", ")})`), this.emit("update-available", I);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(I = new e.CancellationToken()) {
      const F = this.updateInfoAndProvider;
      if (F == null) {
        const E = new Error("Please check update first");
        return this.dispatchError(E), Promise.reject(E);
      }
      if (this.downloadPromise != null)
        return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
      this._logger.info(`Downloading update from ${(0, e.asArray)(F.info.files).map((E) => E.url).join(", ")}`);
      const q = (E) => {
        if (!(E instanceof e.CancellationError))
          try {
            this.dispatchError(E);
          } catch (Y) {
            this._logger.warn(`Cannot dispatch error event: ${Y.stack || Y}`);
          }
        return E;
      };
      return this.downloadPromise = this.doDownloadUpdate({
        updateInfoAndProvider: F,
        requestHeaders: this.computeRequestHeaders(F.provider),
        cancellationToken: I,
        disableWebInstaller: this.disableWebInstaller,
        disableDifferentialDownload: this.disableDifferentialDownload
      }).catch((E) => {
        throw q(E);
      }).finally(() => {
        this.downloadPromise = null;
      }), this.downloadPromise;
    }
    dispatchError(I) {
      this.emit("error", I, (I.stack || I).toString());
    }
    dispatchUpdateDownloaded(I) {
      this.emit(h.UPDATE_DOWNLOADED, I);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, o.load)(await (0, i.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(I) {
      const F = I.fileExtraDownloadHeaders;
      if (F != null) {
        const q = this.requestHeaders;
        return q == null ? F : {
          ...F,
          ...q
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const I = s.join(this.app.userDataPath, ".updaterId");
      try {
        const q = await (0, i.readFile)(I, "utf-8");
        if (e.UUID.check(q))
          return q;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${q}`);
      } catch (q) {
        q.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${q}`);
      }
      const F = e.UUID.v5((0, t.randomBytes)(4096), e.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${F}`);
      try {
        await (0, i.outputFile)(I, F);
      } catch (q) {
        this._logger.warn(`Couldn't write out staging user ID: ${q}`);
      }
      return F;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const I = this.requestHeaders;
      if (I == null)
        return !0;
      for (const F of Object.keys(I)) {
        const q = F.toLowerCase();
        if (q === "authorization" || q === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let I = this.downloadedUpdateHelper;
      if (I == null) {
        const F = (await this.configOnDisk.value).updaterCacheDirName, q = this._logger;
        F == null && q.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const E = s.join(this.app.baseCachePath, F || this.app.name);
        q.debug != null && q.debug(`updater cache dir: ${E}`), I = new f.DownloadedUpdateHelper(E), this.downloadedUpdateHelper = I;
      }
      return I;
    }
    async executeDownload(I) {
      const F = I.fileInfo, q = {
        headers: I.downloadUpdateOptions.requestHeaders,
        cancellationToken: I.downloadUpdateOptions.cancellationToken,
        sha2: F.info.sha2,
        sha512: F.info.sha512
      };
      this.listenerCount(h.DOWNLOAD_PROGRESS) > 0 && (q.onProgress = (P) => this.emit(h.DOWNLOAD_PROGRESS, P));
      const E = I.downloadUpdateOptions.updateInfoAndProvider.info, Y = E.version, B = F.packageInfo;
      function z() {
        const P = decodeURIComponent(I.fileInfo.url.pathname);
        return P.endsWith(`.${I.fileExtension}`) ? s.basename(P) : I.fileInfo.info.url;
      }
      const X = await this.getOrCreateDownloadHelper(), k = X.cacheDirForPendingUpdate;
      await (0, i.mkdir)(k, { recursive: !0 });
      const x = z();
      let G = s.join(k, x);
      const L = B == null ? null : s.join(k, `package-${Y}${s.extname(B.path) || ".7z"}`), W = async (P) => (await X.setDownloadedFile(G, L, E, F, x, P), await I.done({
        ...E,
        downloadedFile: G
      }), L == null ? [G] : [G, L]), V = this._logger, U = await X.validateDownloadedPath(G, E, F, V);
      if (U != null)
        return G = U, await W(!1);
      const T = async () => (await X.clear().catch(() => {
      }), await (0, i.unlink)(G).catch(() => {
      })), R = await (0, f.createTempUpdateFile)(`temp-${x}`, k, V);
      try {
        await I.task(R, q, L, T), await (0, e.retry)(() => (0, i.rename)(R, G), 60, 500, 0, 0, (P) => P instanceof Error && /^EBUSY:/.test(P.message));
      } catch (P) {
        throw await T(), P instanceof e.CancellationError && (V.info("cancelled"), this.emit("update-cancelled", E)), P;
      }
      return V.info(`New version ${Y} has been downloaded to ${G}`), await W(!0);
    }
    async differentialDownloadInstaller(I, F, q, E, Y) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const B = (0, g.blockmapFiles)(I.url, this.app.version, F.updateInfoAndProvider.info.version);
        this._logger.info(`Download block maps (old: "${B[0]}", new: ${B[1]})`);
        const z = async (x) => {
          const G = await this.httpExecutor.downloadToBuffer(x, {
            headers: F.requestHeaders,
            cancellationToken: F.cancellationToken
          });
          if (G == null || G.length === 0)
            throw new Error(`Blockmap "${x.href}" is empty`);
          try {
            return JSON.parse((0, y.gunzipSync)(G).toString());
          } catch (L) {
            throw new Error(`Cannot parse blockmap "${x.href}", error: ${L}`);
          }
        }, X = {
          newUrl: I.url,
          oldFile: s.join(this.downloadedUpdateHelper.cacheDir, Y),
          logger: this._logger,
          newFile: q,
          isUseMultipleRangeRequest: E.isUseMultipleRangeRequest,
          requestHeaders: F.requestHeaders,
          cancellationToken: F.cancellationToken
        };
        this.listenerCount(h.DOWNLOAD_PROGRESS) > 0 && (X.onProgress = (x) => this.emit(h.DOWNLOAD_PROGRESS, x));
        const k = await Promise.all(B.map((x) => z(x)));
        return await new $.GenericDifferentialDownloader(I.info, this.httpExecutor, X).download(k[0], k[1]), !1;
      } catch (B) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${B.stack || B}`), this._testOnlyOptions != null)
          throw B;
        return !0;
      }
    }
  };
  nn.AppUpdater = w;
  function O(j) {
    const I = (0, l.prerelease)(j);
    return I != null && I.length > 0;
  }
  class N {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(I) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(I) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(I) {
    }
  }
  return nn.NoOpLogger = N, nn;
}
var yh;
function Uo() {
  if (yh) return Di;
  yh = 1, Object.defineProperty(Di, "__esModule", { value: !0 }), Di.BaseUpdater = void 0;
  const e = Po, t = Xc();
  let r = class extends t.AppUpdater {
    constructor(i, o) {
      super(i, o), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(i = !1, o = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(i, i ? o : this.autoRunAppAfterInstall) ? setImmediate(() => {
        lr.autoUpdater.emit("before-quit-for-update"), this.app.quit();
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
      const a = this.downloadedUpdateHelper, s = a && a.file ? process.platform === "linux" ? a.file.replace(/ /g, "\\ ") : a.file : null, l = a == null ? null : a.downloadedFileInfo;
      if (s == null || l == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${i}, isForceRunAfter: ${o}`), this.doInstall({
          installerPath: s,
          isSilent: i,
          isForceRunAfter: o,
          isAdminRightsRequired: l.isAdminRightsRequired
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
      return this._logger.info(`Executing: ${i} with args: ${o}`), new Promise((l, f) => {
        try {
          const u = { stdio: s, env: a, detached: !0 }, c = (0, e.spawn)(i, o, u);
          c.on("error", (d) => {
            f(d);
          }), c.unref(), c.pid !== void 0 && l(!0);
        } catch (u) {
          f(u);
        }
      });
    }
  };
  return Di.BaseUpdater = r, Di;
}
var Li = {}, Mo = {};
Object.defineProperty(Mo, "__esModule", { value: !0 });
Mo.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const Dn = Gr, PC = Lo, CC = Zp;
class OC extends PC.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, r = t.size, n = r - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
    const i = oy(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await IC(this.options.oldFile), i);
  }
}
Mo.FileWithEmbeddedBlockMapDifferentialDownloader = OC;
function oy(e) {
  return JSON.parse((0, CC.inflateRawSync)(e).toString());
}
async function IC(e) {
  const t = await (0, Dn.open)(e, "r");
  try {
    const r = (await (0, Dn.fstat)(t)).size, n = Buffer.allocUnsafe(4);
    await (0, Dn.read)(t, n, 0, n.length, r - n.length);
    const i = Buffer.allocUnsafe(n.readUInt32BE(0));
    return await (0, Dn.read)(t, i, 0, i.length, r - n.length - i.length), await (0, Dn.close)(t), oy(i);
  } catch (r) {
    throw await (0, Dn.close)(t), r;
  }
}
var gh;
function vh() {
  if (gh) return Li;
  gh = 1, Object.defineProperty(Li, "__esModule", { value: !0 }), Li.AppImageUpdater = void 0;
  const e = Be, t = Po, r = Gr, n = qr, i = ce, o = Uo(), a = Mo, s = hi(), l = He;
  let f = class extends o.BaseUpdater {
    constructor(c, d) {
      super(c, d);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(c) {
      const d = c.updateInfoAndProvider.provider, h = (0, l.findFile)(d.resolveFiles(c.updateInfoAndProvider.info), "AppImage", ["rpm", "deb"]);
      return this.executeDownload({
        fileExtension: "AppImage",
        fileInfo: h,
        downloadUpdateOptions: c,
        task: async (m, y) => {
          const g = process.env.APPIMAGE;
          if (g == null)
            throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          let $ = !1;
          try {
            const w = {
              newUrl: h.url,
              oldFile: g,
              logger: this._logger,
              newFile: m,
              isUseMultipleRangeRequest: d.isUseMultipleRangeRequest,
              requestHeaders: c.requestHeaders,
              cancellationToken: c.cancellationToken
            };
            this.listenerCount(s.DOWNLOAD_PROGRESS) > 0 && (w.onProgress = (O) => this.emit(s.DOWNLOAD_PROGRESS, O)), await new a.FileWithEmbeddedBlockMapDifferentialDownloader(h.info, this.httpExecutor, w).download();
          } catch (w) {
            this._logger.error(`Cannot download differentially, fallback to full download: ${w.stack || w}`), $ = process.platform === "linux";
          }
          $ && await this.httpExecutor.download(h.url, m, y), await (0, r.chmod)(m, 493);
        }
      });
    }
    doInstall(c) {
      const d = process.env.APPIMAGE;
      if (d == null)
        throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, n.unlinkSync)(d);
      let h;
      const m = i.basename(d);
      i.basename(c.installerPath) === m || !/\d+\.\d+\.\d+/.test(m) ? h = d : h = i.join(i.dirname(d), i.basename(c.installerPath)), (0, t.execFileSync)("mv", ["-f", c.installerPath, h]), h !== d && this.emit("appimage-filename-updated", h);
      const y = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return c.isForceRunAfter ? this.spawnLog(h, [], y) : (y.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, t.execFileSync)(h, [], { env: y })), !0;
    }
  };
  return Li.AppImageUpdater = f, Li;
}
var Ui = {}, $h;
function _h() {
  if ($h) return Ui;
  $h = 1, Object.defineProperty(Ui, "__esModule", { value: !0 }), Ui.DebUpdater = void 0;
  const e = Uo(), t = hi(), r = He;
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
        task: async (l, f) => {
          this.listenerCount(t.DOWNLOAD_PROGRESS) > 0 && (f.onProgress = (u) => this.emit(t.DOWNLOAD_PROGRESS, u)), await this.httpExecutor.download(s.url, l, f);
        }
      });
    }
    doInstall(o) {
      const a = this.wrapSudo(), s = /pkexec/i.test(a) ? "" : '"', l = ["dpkg", "-i", o.installerPath, "||", "apt-get", "install", "-f", "-y"];
      return this.spawnSyncLog(a, [`${s}/bin/bash`, "-c", `'${l.join(" ")}'${s}`]), o.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return Ui.DebUpdater = n, Ui;
}
var Mi = {}, wh;
function Eh() {
  if (wh) return Mi;
  wh = 1, Object.defineProperty(Mi, "__esModule", { value: !0 }), Mi.RpmUpdater = void 0;
  const e = Uo(), t = hi(), r = He;
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
        task: async (l, f) => {
          this.listenerCount(t.DOWNLOAD_PROGRESS) > 0 && (f.onProgress = (u) => this.emit(t.DOWNLOAD_PROGRESS, u)), await this.httpExecutor.download(s.url, l, f);
        }
      });
    }
    doInstall(o) {
      const a = o.installerPath, s = this.wrapSudo(), l = /pkexec/i.test(s) ? "" : '"', f = this.spawnSyncLog("which zypper");
      let u;
      return f ? u = [f, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", a] : u = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", a], this.spawnSyncLog(s, [`${l}/bin/bash`, "-c", `'${u.join(" ")}'${l}`]), o.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return Mi.RpmUpdater = n, Mi;
}
var ji = {}, Sh;
function bh() {
  if (Sh) return ji;
  Sh = 1, Object.defineProperty(ji, "__esModule", { value: !0 }), ji.MacUpdater = void 0;
  const e = Be, t = Gr, r = qr, n = ce, i = Y$, o = Xc(), a = He, s = Po, l = Ao;
  let f = class extends o.AppUpdater {
    constructor(c, d) {
      super(c, d), this.nativeUpdater = lr.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (h) => {
        this._logger.warn(h), this.emit("error", h);
      }), this.nativeUpdater.on("update-downloaded", () => {
        this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
      });
    }
    debug(c) {
      this._logger.debug != null && this._logger.debug(c);
    }
    closeServerIfExists() {
      this.server && (this.debug("Closing proxy server"), this.server.close((c) => {
        c && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
      }));
    }
    async doDownloadUpdate(c) {
      let d = c.updateInfoAndProvider.provider.resolveFiles(c.updateInfoAndProvider.info);
      const h = this._logger, m = "sysctl.proc_translated";
      let y = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), y = (0, s.execFileSync)("sysctl", [m], { encoding: "utf8" }).includes(`${m}: 1`), h.info(`Checked for macOS Rosetta environment (isRosetta=${y})`);
      } catch (j) {
        h.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${j}`);
      }
      let g = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const I = (0, s.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        h.info(`Checked 'uname -a': arm64=${I}`), g = g || I;
      } catch (j) {
        h.warn(`uname shell command to check for arm64 failed: ${j}`);
      }
      g = g || process.arch === "arm64" || y;
      const $ = (j) => {
        var I;
        return j.url.pathname.includes("arm64") || ((I = j.info.url) === null || I === void 0 ? void 0 : I.includes("arm64"));
      };
      g && d.some($) ? d = d.filter((j) => g === $(j)) : d = d.filter((j) => !$(j));
      const w = (0, a.findFile)(d, "zip", ["pkg", "dmg"]);
      if (w == null)
        throw (0, e.newError)(`ZIP file not provided: ${(0, e.safeStringifyJson)(d)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const O = c.updateInfoAndProvider.provider, N = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: w,
        downloadUpdateOptions: c,
        task: async (j, I) => {
          const F = n.join(this.downloadedUpdateHelper.cacheDir, N), q = () => (0, t.pathExistsSync)(F) ? !c.disableDifferentialDownload : (h.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let E = !0;
          q() && (E = await this.differentialDownloadInstaller(w, c, j, O, N)), E && await this.httpExecutor.download(w.url, j, I);
        },
        done: (j) => {
          if (!c.disableDifferentialDownload)
            try {
              const I = n.join(this.downloadedUpdateHelper.cacheDir, N);
              (0, r.copyFileSync)(j.downloadedFile, I);
            } catch (I) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${I.message}`);
            }
          return this.updateDownloaded(w, j);
        }
      });
    }
    async updateDownloaded(c, d) {
      var h;
      const m = d.downloadedFile, y = (h = c.info.size) !== null && h !== void 0 ? h : (await (0, t.stat)(m)).size, g = this._logger, $ = `fileToProxy=${c.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${$})`), this.server = (0, i.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${$})`), this.server.on("close", () => {
        g.info(`Proxy server for native Squirrel.Mac is closed (${$})`);
      });
      const w = (O) => {
        const N = O.address();
        return typeof N == "string" ? N : `http://127.0.0.1:${N == null ? void 0 : N.port}`;
      };
      return await new Promise((O, N) => {
        const j = (0, l.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), I = Buffer.from(`autoupdater:${j}`, "ascii"), F = `/${(0, l.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (q, E) => {
          const Y = q.url;
          if (g.info(`${Y} requested`), Y === "/") {
            if (!q.headers.authorization || q.headers.authorization.indexOf("Basic ") === -1) {
              E.statusCode = 401, E.statusMessage = "Invalid Authentication Credentials", E.end(), g.warn("No authenthication info");
              return;
            }
            const X = q.headers.authorization.split(" ")[1], k = Buffer.from(X, "base64").toString("ascii"), [x, G] = k.split(":");
            if (x !== "autoupdater" || G !== j) {
              E.statusCode = 401, E.statusMessage = "Invalid Authentication Credentials", E.end(), g.warn("Invalid authenthication credentials");
              return;
            }
            const L = Buffer.from(`{ "url": "${w(this.server)}${F}" }`);
            E.writeHead(200, { "Content-Type": "application/json", "Content-Length": L.length }), E.end(L);
            return;
          }
          if (!Y.startsWith(F)) {
            g.warn(`${Y} requested, but not supported`), E.writeHead(404), E.end();
            return;
          }
          g.info(`${F} requested by Squirrel.Mac, pipe ${m}`);
          let B = !1;
          E.on("finish", () => {
            B || (this.nativeUpdater.removeListener("error", N), O([]));
          });
          const z = (0, r.createReadStream)(m);
          z.on("error", (X) => {
            try {
              E.end();
            } catch (k) {
              g.warn(`cannot end response: ${k}`);
            }
            B = !0, this.nativeUpdater.removeListener("error", N), N(new Error(`Cannot pipe "${m}": ${X}`));
          }), E.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": y
          }), z.pipe(E);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${$})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${w(this.server)}, ${$})`), this.nativeUpdater.setFeedURL({
            url: w(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${I.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(d), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", N), this.nativeUpdater.checkForUpdates()) : O([]);
        });
      });
    }
    quitAndInstall() {
      this.squirrelDownloadedUpdate ? (this.nativeUpdater.quitAndInstall(), this.closeServerIfExists()) : (this.nativeUpdater.on("update-downloaded", () => {
        this.nativeUpdater.quitAndInstall(), this.closeServerIfExists();
      }), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
    }
  };
  return ji.MacUpdater = f, ji;
}
var Bi = {}, Jc = {};
Object.defineProperty(Jc, "__esModule", { value: !0 });
Jc.verifySignature = RC;
const Ah = Be, ay = Po, NC = es, Th = ce;
function RC(e, t, r) {
  return new Promise((n, i) => {
    const o = t.replace(/'/g, "''");
    r.info(`Verifying signature ${o}`), (0, ay.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${o}' | ConvertTo-Json -Compress"`], {
      shell: !0,
      timeout: 20 * 1e3
    }, (a, s, l) => {
      var f;
      try {
        if (a != null || l) {
          wl(r, a, l, i), n(null);
          return;
        }
        const u = DC(s);
        if (u.Status === 0) {
          try {
            const m = Th.normalize(u.Path), y = Th.normalize(t);
            if (r.info(`LiteralPath: ${m}. Update Path: ${y}`), m !== y) {
              wl(r, new Error(`LiteralPath of ${m} is different than ${y}`), l, i), n(null);
              return;
            }
          } catch (m) {
            r.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(f = m.message) !== null && f !== void 0 ? f : m.stack}`);
          }
          const d = (0, Ah.parseDn)(u.SignerCertificate.Subject);
          let h = !1;
          for (const m of e) {
            const y = (0, Ah.parseDn)(m);
            if (y.size ? h = Array.from(y.keys()).every(($) => y.get($) === d.get($)) : m === d.get("CN") && (r.warn(`Signature validated using only CN ${m}. Please add your full Distinguished Name (DN) to publisherNames configuration`), h = !0), h) {
              n(null);
              return;
            }
          }
        }
        const c = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(u, (d, h) => d === "RawData" ? void 0 : h, 2);
        r.warn(`Sign verification failed, installer signed with incorrect certificate: ${c}`), n(c);
      } catch (u) {
        wl(r, u, null, i), n(null);
        return;
      }
    });
  });
}
function DC(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const r = t.SignerCertificate;
  return r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName), t;
}
function wl(e, t, r, n) {
  if (kC()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || r}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, ay.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && n(t), r && n(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${r}. Failing signature validation due to unknown stderr.`));
}
function kC() {
  const e = NC.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
var Ph;
function Ch() {
  if (Ph) return Bi;
  Ph = 1, Object.defineProperty(Bi, "__esModule", { value: !0 }), Bi.NsisUpdater = void 0;
  const e = Be, t = ce, r = Uo(), n = Mo, i = hi(), o = He, a = Gr, s = Jc, l = li;
  let f = class extends r.BaseUpdater {
    constructor(c, d) {
      super(c, d), this._verifyUpdateCodeSignature = (h, m) => (0, s.verifySignature)(h, m, this._logger);
    }
    /**
     * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
     * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
     */
    get verifyUpdateCodeSignature() {
      return this._verifyUpdateCodeSignature;
    }
    set verifyUpdateCodeSignature(c) {
      c && (this._verifyUpdateCodeSignature = c);
    }
    /*** @private */
    doDownloadUpdate(c) {
      const d = c.updateInfoAndProvider.provider, h = (0, o.findFile)(d.resolveFiles(c.updateInfoAndProvider.info), "exe");
      return this.executeDownload({
        fileExtension: "exe",
        downloadUpdateOptions: c,
        fileInfo: h,
        task: async (m, y, g, $) => {
          const w = h.packageInfo, O = w != null && g != null;
          if (O && c.disableWebInstaller)
            throw (0, e.newError)(`Unable to download new version ${c.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !O && !c.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (O || c.disableDifferentialDownload || await this.differentialDownloadInstaller(h, c, m, d, e.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(h.url, m, y);
          const N = await this.verifySignature(m);
          if (N != null)
            throw await $(), (0, e.newError)(`New version ${c.updateInfoAndProvider.info.version} is not signed by the application owner: ${N}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (O && await this.differentialDownloadWebPackage(c, w, g, d))
            try {
              await this.httpExecutor.download(new l.URL(w.path), g, {
                headers: c.requestHeaders,
                cancellationToken: c.cancellationToken,
                sha512: w.sha512
              });
            } catch (j) {
              try {
                await (0, a.unlink)(g);
              } catch {
              }
              throw j;
            }
        }
      });
    }
    // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
    // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
    // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
    async verifySignature(c) {
      let d;
      try {
        if (d = (await this.configOnDisk.value).publisherName, d == null)
          return null;
      } catch (h) {
        if (h.code === "ENOENT")
          return null;
        throw h;
      }
      return await this._verifyUpdateCodeSignature(Array.isArray(d) ? d : [d], c);
    }
    doInstall(c) {
      const d = ["--updated"];
      c.isSilent && d.push("/S"), c.isForceRunAfter && d.push("--force-run"), this.installDirectory && d.push(`/D=${this.installDirectory}`);
      const h = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
      h != null && d.push(`--package-file=${h}`);
      const m = () => {
        this.spawnLog(t.join(process.resourcesPath, "elevate.exe"), [c.installerPath].concat(d)).catch((y) => this.dispatchError(y));
      };
      return c.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), m(), !0) : (this.spawnLog(c.installerPath, d).catch((y) => {
        const g = y.code;
        this._logger.info(`Cannot run installer: error code: ${g}, error message: "${y.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), g === "UNKNOWN" || g === "EACCES" ? m() : g === "ENOENT" ? lr.shell.openPath(c.installerPath).catch(($) => this.dispatchError($)) : this.dispatchError(y);
      }), !0);
    }
    async differentialDownloadWebPackage(c, d, h, m) {
      if (d.blockMapSize == null)
        return !0;
      try {
        const y = {
          newUrl: new l.URL(d.path),
          oldFile: t.join(this.downloadedUpdateHelper.cacheDir, e.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: h,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: m.isUseMultipleRangeRequest,
          cancellationToken: c.cancellationToken
        };
        this.listenerCount(i.DOWNLOAD_PROGRESS) > 0 && (y.onProgress = (g) => this.emit(i.DOWNLOAD_PROGRESS, g)), await new n.FileWithEmbeddedBlockMapDifferentialDownloader(d, this.httpExecutor, y).download();
      } catch (y) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${y.stack || y}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return Bi.NsisUpdater = f, Bi;
}
var Oh;
function hi() {
  return Oh || (Oh = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.CancellationToken = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
    const t = Be;
    Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
      return t.CancellationToken;
    } });
    const r = Gr, n = ce;
    var i = Uo();
    Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
      return i.BaseUpdater;
    } });
    var o = Xc();
    Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
      return o.AppUpdater;
    } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
      return o.NoOpLogger;
    } });
    var a = He;
    Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
      return a.Provider;
    } });
    var s = vh();
    Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
      return s.AppImageUpdater;
    } });
    var l = _h();
    Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
      return l.DebUpdater;
    } });
    var f = Eh();
    Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
      return f.RpmUpdater;
    } });
    var u = bh();
    Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
      return u.MacUpdater;
    } });
    var c = Ch();
    Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
      return c.NsisUpdater;
    } });
    let d;
    function h() {
      if (process.platform === "win32")
        d = new (Ch()).NsisUpdater();
      else if (process.platform === "darwin")
        d = new (bh()).MacUpdater();
      else {
        d = new (vh()).AppImageUpdater();
        try {
          const g = n.join(process.resourcesPath, "package-type");
          if (!(0, r.existsSync)(g))
            return d;
          console.info("Checking for beta autoupdate feature for deb/rpm distributions");
          const $ = (0, r.readFileSync)(g).toString().trim();
          switch (console.info("Found package-type:", $), $) {
            case "deb":
              d = new (_h()).DebUpdater();
              break;
            case "rpm":
              d = new (Eh()).RpmUpdater();
              break;
            default:
              break;
          }
        } catch (g) {
          console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", g.message);
        }
      }
      return d;
    }
    Object.defineProperty(e, "autoUpdater", {
      enumerable: !0,
      get: () => d || h()
    }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
    class m {
      constructor($) {
        this.emitter = $;
      }
      /**
       * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
       */
      login($) {
        y(this.emitter, "login", $);
      }
      progress($) {
        y(this.emitter, e.DOWNLOAD_PROGRESS, $);
      }
      updateDownloaded($) {
        y(this.emitter, e.UPDATE_DOWNLOADED, $);
      }
      updateCancelled($) {
        y(this.emitter, "update-cancelled", $);
      }
    }
    e.UpdaterSignal = m;
    function y(g, $, w) {
      g.on($, w);
    }
  }(Ys)), Ys;
}
var Yt = hi(), pt = {};
(function(e) {
  const t = de.fromCallback, r = Le, n = [
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
  }, e.read = function(i, o, a, s, l, f) {
    return typeof f == "function" ? r.read(i, o, a, s, l, f) : new Promise((u, c) => {
      r.read(i, o, a, s, l, (d, h, m) => {
        if (d) return c(d);
        u({ bytesRead: h, buffer: m });
      });
    });
  }, e.write = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.write(i, o, ...a) : new Promise((s, l) => {
      r.write(i, o, ...a, (f, u, c) => {
        if (f) return l(f);
        s({ bytesWritten: u, buffer: c });
      });
    });
  }, e.readv = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.readv(i, o, ...a) : new Promise((s, l) => {
      r.readv(i, o, ...a, (f, u, c) => {
        if (f) return l(f);
        s({ bytesRead: u, buffers: c });
      });
    });
  }, e.writev = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.writev(i, o, ...a) : new Promise((s, l) => {
      r.writev(i, o, ...a, (f, u, c) => {
        if (f) return l(f);
        s({ bytesWritten: u, buffers: c });
      });
    });
  }, typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(pt);
var Qc = {}, sy = {};
const xC = ce;
sy.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(xC.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const ly = pt, { checkPath: cy } = sy, uy = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
Qc.makeDir = async (e, t) => (cy(e), ly.mkdir(e, {
  mode: uy(t),
  recursive: !0
}));
Qc.makeDirSync = (e, t) => (cy(e), ly.mkdirSync(e, {
  mode: uy(t),
  recursive: !0
}));
const FC = de.fromPromise, { makeDir: LC, makeDirSync: El } = Qc, Sl = FC(LC);
var Xt = {
  mkdirs: Sl,
  mkdirsSync: El,
  // alias
  mkdirp: Sl,
  mkdirpSync: El,
  ensureDir: Sl,
  ensureDirSync: El
};
const UC = de.fromPromise, fy = pt;
function MC(e) {
  return fy.access(e).then(() => !0).catch(() => !1);
}
var bn = {
  pathExists: UC(MC),
  pathExistsSync: fy.existsSync
};
const Qn = pt, jC = de.fromPromise;
async function BC(e, t, r) {
  const n = await Qn.open(e, "r+");
  let i = null;
  try {
    await Qn.futimes(n, t, r);
  } finally {
    try {
      await Qn.close(n);
    } catch (o) {
      i = o;
    }
  }
  if (i)
    throw i;
}
function HC(e, t, r) {
  const n = Qn.openSync(e, "r+");
  return Qn.futimesSync(n, t, r), Qn.closeSync(n);
}
var dy = {
  utimesMillis: jC(BC),
  utimesMillisSync: HC
};
const oi = pt, je = ce, Ih = de.fromPromise;
function qC(e, t, r) {
  const n = r.dereference ? (i) => oi.stat(i, { bigint: !0 }) : (i) => oi.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
}
function GC(e, t, r) {
  let n;
  const i = r.dereference ? (a) => oi.statSync(a, { bigint: !0 }) : (a) => oi.lstatSync(a, { bigint: !0 }), o = i(e);
  try {
    n = i(t);
  } catch (a) {
    if (a.code === "ENOENT") return { srcStat: o, destStat: null };
    throw a;
  }
  return { srcStat: o, destStat: n };
}
async function VC(e, t, r, n) {
  const { srcStat: i, destStat: o } = await qC(e, t, n);
  if (o) {
    if (jo(i, o)) {
      const a = je.basename(e), s = je.basename(t);
      if (r === "move" && a !== s && a.toLowerCase() === s.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && Zc(e, t))
    throw new Error(As(e, t, r));
  return { srcStat: i, destStat: o };
}
function zC(e, t, r, n) {
  const { srcStat: i, destStat: o } = GC(e, t, n);
  if (o) {
    if (jo(i, o)) {
      const a = je.basename(e), s = je.basename(t);
      if (r === "move" && a !== s && a.toLowerCase() === s.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && Zc(e, t))
    throw new Error(As(e, t, r));
  return { srcStat: i, destStat: o };
}
async function hy(e, t, r, n) {
  const i = je.resolve(je.dirname(e)), o = je.resolve(je.dirname(r));
  if (o === i || o === je.parse(o).root) return;
  let a;
  try {
    a = await oi.stat(o, { bigint: !0 });
  } catch (s) {
    if (s.code === "ENOENT") return;
    throw s;
  }
  if (jo(t, a))
    throw new Error(As(e, r, n));
  return hy(e, t, o, n);
}
function py(e, t, r, n) {
  const i = je.resolve(je.dirname(e)), o = je.resolve(je.dirname(r));
  if (o === i || o === je.parse(o).root) return;
  let a;
  try {
    a = oi.statSync(o, { bigint: !0 });
  } catch (s) {
    if (s.code === "ENOENT") return;
    throw s;
  }
  if (jo(t, a))
    throw new Error(As(e, r, n));
  return py(e, t, o, n);
}
function jo(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function Zc(e, t) {
  const r = je.resolve(e).split(je.sep).filter((i) => i), n = je.resolve(t).split(je.sep).filter((i) => i);
  return r.every((i, o) => n[o] === i);
}
function As(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var pi = {
  // checkPaths
  checkPaths: Ih(VC),
  checkPathsSync: zC,
  // checkParent
  checkParentPaths: Ih(hy),
  checkParentPathsSync: py,
  // Misc
  isSrcSubdir: Zc,
  areIdentical: jo
};
const et = pt, mo = ce, { mkdirs: WC } = Xt, { pathExists: YC } = bn, { utimesMillis: KC } = dy, yo = pi;
async function XC(e, t, r = {}) {
  typeof r == "function" && (r = { filter: r }), r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  );
  const { srcStat: n, destStat: i } = await yo.checkPaths(e, t, "copy", r);
  if (await yo.checkParentPaths(e, n, t, "copy"), !await my(e, t, r)) return;
  const a = mo.dirname(t);
  await YC(a) || await WC(a), await yy(i, e, t, r);
}
async function my(e, t, r) {
  return r.filter ? r.filter(e, t) : !0;
}
async function yy(e, t, r, n) {
  const o = await (n.dereference ? et.stat : et.lstat)(t);
  if (o.isDirectory()) return eO(o, e, t, r, n);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return JC(o, e, t, r, n);
  if (o.isSymbolicLink()) return tO(e, t, r, n);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
async function JC(e, t, r, n, i) {
  if (!t) return Nh(e, r, n, i);
  if (i.overwrite)
    return await et.unlink(n), Nh(e, r, n, i);
  if (i.errorOnExist)
    throw new Error(`'${n}' already exists`);
}
async function Nh(e, t, r, n) {
  if (await et.copyFile(t, r), n.preserveTimestamps) {
    QC(e.mode) && await ZC(r, e.mode);
    const i = await et.stat(t);
    await KC(r, i.atime, i.mtime);
  }
  return et.chmod(r, e.mode);
}
function QC(e) {
  return (e & 128) === 0;
}
function ZC(e, t) {
  return et.chmod(e, t | 128);
}
async function eO(e, t, r, n, i) {
  t || await et.mkdir(n);
  const o = [];
  for await (const a of await et.opendir(r)) {
    const s = mo.join(r, a.name), l = mo.join(n, a.name);
    o.push(
      my(s, l, i).then((f) => {
        if (f)
          return yo.checkPaths(s, l, "copy", i).then(({ destStat: u }) => yy(u, s, l, i));
      })
    );
  }
  await Promise.all(o), t || await et.chmod(n, e.mode);
}
async function tO(e, t, r, n) {
  let i = await et.readlink(t);
  if (n.dereference && (i = mo.resolve(process.cwd(), i)), !e)
    return et.symlink(i, r);
  let o = null;
  try {
    o = await et.readlink(r);
  } catch (a) {
    if (a.code === "EINVAL" || a.code === "UNKNOWN") return et.symlink(i, r);
    throw a;
  }
  if (n.dereference && (o = mo.resolve(process.cwd(), o)), yo.isSrcSubdir(i, o))
    throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
  if (yo.isSrcSubdir(o, i))
    throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
  return await et.unlink(r), et.symlink(i, r);
}
var rO = XC;
const lt = Le, go = ce, nO = Xt.mkdirsSync, iO = dy.utimesMillisSync, vo = pi;
function oO(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = vo.checkPathsSync(e, t, "copy", r);
  if (vo.checkParentPathsSync(e, n, t, "copy"), r.filter && !r.filter(e, t)) return;
  const o = go.dirname(t);
  return lt.existsSync(o) || nO(o), gy(i, e, t, r);
}
function gy(e, t, r, n) {
  const o = (n.dereference ? lt.statSync : lt.lstatSync)(t);
  if (o.isDirectory()) return dO(o, e, t, r, n);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return aO(o, e, t, r, n);
  if (o.isSymbolicLink()) return mO(e, t, r, n);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function aO(e, t, r, n, i) {
  return t ? sO(e, r, n, i) : vy(e, r, n, i);
}
function sO(e, t, r, n) {
  if (n.overwrite)
    return lt.unlinkSync(r), vy(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function vy(e, t, r, n) {
  return lt.copyFileSync(t, r), n.preserveTimestamps && lO(e.mode, t, r), eu(r, e.mode);
}
function lO(e, t, r) {
  return cO(e) && uO(r, e), fO(t, r);
}
function cO(e) {
  return (e & 128) === 0;
}
function uO(e, t) {
  return eu(e, t | 128);
}
function eu(e, t) {
  return lt.chmodSync(e, t);
}
function fO(e, t) {
  const r = lt.statSync(e);
  return iO(t, r.atime, r.mtime);
}
function dO(e, t, r, n, i) {
  return t ? $y(r, n, i) : hO(e.mode, r, n, i);
}
function hO(e, t, r, n) {
  return lt.mkdirSync(r), $y(t, r, n), eu(r, e);
}
function $y(e, t, r) {
  const n = lt.opendirSync(e);
  try {
    let i;
    for (; (i = n.readSync()) !== null; )
      pO(i.name, e, t, r);
  } finally {
    n.closeSync();
  }
}
function pO(e, t, r, n) {
  const i = go.join(t, e), o = go.join(r, e);
  if (n.filter && !n.filter(i, o)) return;
  const { destStat: a } = vo.checkPathsSync(i, o, "copy", n);
  return gy(a, i, o, n);
}
function mO(e, t, r, n) {
  let i = lt.readlinkSync(t);
  if (n.dereference && (i = go.resolve(process.cwd(), i)), e) {
    let o;
    try {
      o = lt.readlinkSync(r);
    } catch (a) {
      if (a.code === "EINVAL" || a.code === "UNKNOWN") return lt.symlinkSync(i, r);
      throw a;
    }
    if (n.dereference && (o = go.resolve(process.cwd(), o)), vo.isSrcSubdir(i, o))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
    if (vo.isSrcSubdir(o, i))
      throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
    return yO(i, r);
  } else
    return lt.symlinkSync(i, r);
}
function yO(e, t) {
  return lt.unlinkSync(t), lt.symlinkSync(e, t);
}
var gO = oO;
const vO = de.fromPromise;
var tu = {
  copy: vO(rO),
  copySync: gO
};
const _y = Le, $O = de.fromCallback;
function _O(e, t) {
  _y.rm(e, { recursive: !0, force: !0 }, t);
}
function wO(e) {
  _y.rmSync(e, { recursive: !0, force: !0 });
}
var Ts = {
  remove: $O(_O),
  removeSync: wO
};
const EO = de.fromPromise, wy = pt, Ey = ce, Sy = Xt, by = Ts, Rh = EO(async function(t) {
  let r;
  try {
    r = await wy.readdir(t);
  } catch {
    return Sy.mkdirs(t);
  }
  return Promise.all(r.map((n) => by.remove(Ey.join(t, n))));
});
function Dh(e) {
  let t;
  try {
    t = wy.readdirSync(e);
  } catch {
    return Sy.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = Ey.join(e, r), by.removeSync(r);
  });
}
var SO = {
  emptyDirSync: Dh,
  emptydirSync: Dh,
  emptyDir: Rh,
  emptydir: Rh
};
const bO = de.fromPromise, Ay = ce, ir = pt, Ty = Xt;
async function AO(e) {
  let t;
  try {
    t = await ir.stat(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = Ay.dirname(e);
  let n = null;
  try {
    n = await ir.stat(r);
  } catch (i) {
    if (i.code === "ENOENT") {
      await Ty.mkdirs(r), await ir.writeFile(e, "");
      return;
    } else
      throw i;
  }
  n.isDirectory() ? await ir.writeFile(e, "") : await ir.readdir(r);
}
function TO(e) {
  let t;
  try {
    t = ir.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = Ay.dirname(e);
  try {
    ir.statSync(r).isDirectory() || ir.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") Ty.mkdirsSync(r);
    else throw n;
  }
  ir.writeFileSync(e, "");
}
var PO = {
  createFile: bO(AO),
  createFileSync: TO
};
const CO = de.fromPromise, Py = ce, Cr = pt, Cy = Xt, { pathExists: OO } = bn, { areIdentical: Oy } = pi;
async function IO(e, t) {
  let r;
  try {
    r = await Cr.lstat(t);
  } catch {
  }
  let n;
  try {
    n = await Cr.lstat(e);
  } catch (a) {
    throw a.message = a.message.replace("lstat", "ensureLink"), a;
  }
  if (r && Oy(n, r)) return;
  const i = Py.dirname(t);
  await OO(i) || await Cy.mkdirs(i), await Cr.link(e, t);
}
function NO(e, t) {
  let r;
  try {
    r = Cr.lstatSync(t);
  } catch {
  }
  try {
    const o = Cr.lstatSync(e);
    if (r && Oy(o, r)) return;
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  const n = Py.dirname(t);
  return Cr.existsSync(n) || Cy.mkdirsSync(n), Cr.linkSync(e, t);
}
var RO = {
  createLink: CO(IO),
  createLinkSync: NO
};
const Dr = ce, Zi = pt, { pathExists: DO } = bn, kO = de.fromPromise;
async function xO(e, t) {
  if (Dr.isAbsolute(e)) {
    try {
      await Zi.lstat(e);
    } catch (o) {
      throw o.message = o.message.replace("lstat", "ensureSymlink"), o;
    }
    return {
      toCwd: e,
      toDst: e
    };
  }
  const r = Dr.dirname(t), n = Dr.join(r, e);
  if (await DO(n))
    return {
      toCwd: n,
      toDst: e
    };
  try {
    await Zi.lstat(e);
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureSymlink"), o;
  }
  return {
    toCwd: e,
    toDst: Dr.relative(r, e)
  };
}
function FO(e, t) {
  if (Dr.isAbsolute(e)) {
    if (!Zi.existsSync(e)) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  }
  const r = Dr.dirname(t), n = Dr.join(r, e);
  if (Zi.existsSync(n))
    return {
      toCwd: n,
      toDst: e
    };
  if (!Zi.existsSync(e)) throw new Error("relative srcpath does not exist");
  return {
    toCwd: e,
    toDst: Dr.relative(r, e)
  };
}
var LO = {
  symlinkPaths: kO(xO),
  symlinkPathsSync: FO
};
const Iy = pt, UO = de.fromPromise;
async function MO(e, t) {
  if (t) return t;
  let r;
  try {
    r = await Iy.lstat(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
function jO(e, t) {
  if (t) return t;
  let r;
  try {
    r = Iy.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var BO = {
  symlinkType: UO(MO),
  symlinkTypeSync: jO
};
const HO = de.fromPromise, Ny = ce, Ht = pt, { mkdirs: qO, mkdirsSync: GO } = Xt, { symlinkPaths: VO, symlinkPathsSync: zO } = LO, { symlinkType: WO, symlinkTypeSync: YO } = BO, { pathExists: KO } = bn, { areIdentical: Ry } = pi;
async function XO(e, t, r) {
  let n;
  try {
    n = await Ht.lstat(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const [s, l] = await Promise.all([
      Ht.stat(e),
      Ht.stat(t)
    ]);
    if (Ry(s, l)) return;
  }
  const i = await VO(e, t);
  e = i.toDst;
  const o = await WO(i.toCwd, r), a = Ny.dirname(t);
  return await KO(a) || await qO(a), Ht.symlink(e, t, o);
}
function JO(e, t, r) {
  let n;
  try {
    n = Ht.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const s = Ht.statSync(e), l = Ht.statSync(t);
    if (Ry(s, l)) return;
  }
  const i = zO(e, t);
  e = i.toDst, r = YO(i.toCwd, r);
  const o = Ny.dirname(t);
  return Ht.existsSync(o) || GO(o), Ht.symlinkSync(e, t, r);
}
var QO = {
  createSymlink: HO(XO),
  createSymlinkSync: JO
};
const { createFile: kh, createFileSync: xh } = PO, { createLink: Fh, createLinkSync: Lh } = RO, { createSymlink: Uh, createSymlinkSync: Mh } = QO;
var ZO = {
  // file
  createFile: kh,
  createFileSync: xh,
  ensureFile: kh,
  ensureFileSync: xh,
  // link
  createLink: Fh,
  createLinkSync: Lh,
  ensureLink: Fh,
  ensureLinkSync: Lh,
  // symlink
  createSymlink: Uh,
  createSymlinkSync: Mh,
  ensureSymlink: Uh,
  ensureSymlinkSync: Mh
};
const ua = Wm;
var eI = {
  // jsonfile exports
  readJson: ua.readFile,
  readJsonSync: ua.readFileSync,
  writeJson: ua.writeFile,
  writeJsonSync: ua.writeFileSync
};
const tI = de.fromPromise, rc = pt, Dy = ce, ky = Xt, rI = bn.pathExists;
async function nI(e, t, r = "utf-8") {
  const n = Dy.dirname(e);
  return await rI(n) || await ky.mkdirs(n), rc.writeFile(e, t, r);
}
function iI(e, ...t) {
  const r = Dy.dirname(e);
  rc.existsSync(r) || ky.mkdirsSync(r), rc.writeFileSync(e, ...t);
}
var ru = {
  outputFile: tI(nI),
  outputFileSync: iI
};
const { stringify: oI } = No, { outputFile: aI } = ru;
async function sI(e, t, r = {}) {
  const n = oI(t, r);
  await aI(e, n, r);
}
var lI = sI;
const { stringify: cI } = No, { outputFileSync: uI } = ru;
function fI(e, t, r) {
  const n = cI(t, r);
  uI(e, n, r);
}
var dI = fI;
const hI = de.fromPromise, ft = eI;
ft.outputJson = hI(lI);
ft.outputJsonSync = dI;
ft.outputJSON = ft.outputJson;
ft.outputJSONSync = ft.outputJsonSync;
ft.writeJSON = ft.writeJson;
ft.writeJSONSync = ft.writeJsonSync;
ft.readJSON = ft.readJson;
ft.readJSONSync = ft.readJsonSync;
var pI = ft;
const mI = pt, jh = ce, { copy: yI } = tu, { remove: xy } = Ts, { mkdirp: gI } = Xt, { pathExists: vI } = bn, Bh = pi;
async function $I(e, t, r = {}) {
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = await Bh.checkPaths(e, t, "move", r);
  await Bh.checkParentPaths(e, i, t, "move");
  const a = jh.dirname(t);
  return jh.parse(a).root !== a && await gI(a), _I(e, t, n, o);
}
async function _I(e, t, r, n) {
  if (!n) {
    if (r)
      await xy(t);
    else if (await vI(t))
      throw new Error("dest already exists.");
  }
  try {
    await mI.rename(e, t);
  } catch (i) {
    if (i.code !== "EXDEV")
      throw i;
    await wI(e, t, r);
  }
}
async function wI(e, t, r) {
  return await yI(e, t, {
    overwrite: r,
    errorOnExist: !0,
    preserveTimestamps: !0
  }), xy(e);
}
var EI = $I;
const Fy = Le, nc = ce, SI = tu.copySync, Ly = Ts.removeSync, bI = Xt.mkdirpSync, Hh = pi;
function AI(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = Hh.checkPathsSync(e, t, "move", r);
  return Hh.checkParentPathsSync(e, i, t, "move"), TI(t) || bI(nc.dirname(t)), PI(e, t, n, o);
}
function TI(e) {
  const t = nc.dirname(e);
  return nc.parse(t).root === t;
}
function PI(e, t, r, n) {
  if (n) return bl(e, t, r);
  if (r)
    return Ly(t), bl(e, t, r);
  if (Fy.existsSync(t)) throw new Error("dest already exists.");
  return bl(e, t, r);
}
function bl(e, t, r) {
  try {
    Fy.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return CI(e, t, r);
  }
}
function CI(e, t, r) {
  return SI(e, t, {
    overwrite: r,
    errorOnExist: !0,
    preserveTimestamps: !0
  }), Ly(e);
}
var OI = AI;
const II = de.fromPromise;
var NI = {
  move: II(EI),
  moveSync: OI
}, RI = {
  // Export promiseified graceful-fs:
  ...pt,
  // Export extra methods:
  ...tu,
  ...SO,
  ...ZO,
  ...pI,
  ...Xt,
  ...NI,
  ...ru,
  ...bn,
  ...Ts
};
const Pe = /* @__PURE__ */ rs(RI), vn = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
}, Al = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), DI = new Set("0123456789");
function Ps(e) {
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
        if (Al.has(r))
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
          if (Al.has(r))
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
        if (n === "index" && !DI.has(o))
          throw new Error("Invalid character in an index");
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
        n === "start" && (n = "property"), i && (i = !1, r += "\\"), r += o;
      }
    }
  switch (i && (r += "\\"), n) {
    case "property": {
      if (Al.has(r))
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
function nu(e, t) {
  if (typeof t != "number" && Array.isArray(e)) {
    const r = Number.parseInt(t, 10);
    return Number.isInteger(r) && e[r] === e[t];
  }
  return !1;
}
function Uy(e, t) {
  if (nu(e, t))
    throw new Error("Cannot use string index");
}
function kI(e, t, r) {
  if (!vn(e) || typeof t != "string")
    return r === void 0 ? e : r;
  const n = Ps(t);
  if (n.length === 0)
    return r;
  for (let i = 0; i < n.length; i++) {
    const o = n[i];
    if (nu(e, o) ? e = i === n.length - 1 ? void 0 : null : e = e[o], e == null) {
      if (i !== n.length - 1)
        return r;
      break;
    }
  }
  return e === void 0 ? r : e;
}
function qh(e, t, r) {
  if (!vn(e) || typeof t != "string")
    return e;
  const n = e, i = Ps(t);
  for (let o = 0; o < i.length; o++) {
    const a = i[o];
    Uy(e, a), o === i.length - 1 ? e[a] = r : vn(e[a]) || (e[a] = typeof i[o + 1] == "number" ? [] : {}), e = e[a];
  }
  return n;
}
function xI(e, t) {
  if (!vn(e) || typeof t != "string")
    return !1;
  const r = Ps(t);
  for (let n = 0; n < r.length; n++) {
    const i = r[n];
    if (Uy(e, i), n === r.length - 1)
      return delete e[i], !0;
    if (e = e[i], !vn(e))
      return !1;
  }
}
function FI(e, t) {
  if (!vn(e) || typeof t != "string")
    return !1;
  const r = Ps(t);
  if (r.length === 0)
    return !1;
  for (const n of r) {
    if (!vn(e) || !(n in e) || nu(e, n))
      return !1;
    e = e[n];
  }
  return !0;
}
const Or = ts.homedir(), iu = ts.tmpdir(), { env: zn } = xe, LI = (e) => {
  const t = re.join(Or, "Library");
  return {
    data: re.join(t, "Application Support", e),
    config: re.join(t, "Preferences", e),
    cache: re.join(t, "Caches", e),
    log: re.join(t, "Logs", e),
    temp: re.join(iu, e)
  };
}, UI = (e) => {
  const t = zn.APPDATA || re.join(Or, "AppData", "Roaming"), r = zn.LOCALAPPDATA || re.join(Or, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: re.join(r, e, "Data"),
    config: re.join(t, e, "Config"),
    cache: re.join(r, e, "Cache"),
    log: re.join(r, e, "Log"),
    temp: re.join(iu, e)
  };
}, MI = (e) => {
  const t = re.basename(Or);
  return {
    data: re.join(zn.XDG_DATA_HOME || re.join(Or, ".local", "share"), e),
    config: re.join(zn.XDG_CONFIG_HOME || re.join(Or, ".config"), e),
    cache: re.join(zn.XDG_CACHE_HOME || re.join(Or, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: re.join(zn.XDG_STATE_HOME || re.join(Or, ".local", "state"), e),
    temp: re.join(iu, t, e)
  };
};
function jI(e, { suffix: t = "nodejs" } = {}) {
  if (typeof e != "string")
    throw new TypeError(`Expected a string, got ${typeof e}`);
  return t && (e += `-${t}`), xe.platform === "darwin" ? LI(e) : xe.platform === "win32" ? UI(e) : MI(e);
}
const _r = (e, t) => function(...n) {
  return e.apply(void 0, n).catch(t);
}, er = (e, t) => function(...n) {
  try {
    return e.apply(void 0, n);
  } catch (i) {
    return t(i);
  }
}, BI = xe.getuid ? !xe.getuid() : !1, HI = 1e4, _t = () => {
}, _e = {
  /* API */
  isChangeErrorOk: (e) => {
    if (!_e.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "ENOSYS" || !BI && (t === "EINVAL" || t === "EPERM");
  },
  isNodeError: (e) => e instanceof Error,
  isRetriableError: (e) => {
    if (!_e.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCES" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!_e.isNodeError(e))
      throw e;
    if (!_e.isChangeErrorOk(e))
      throw e;
  }
};
class qI {
  constructor() {
    this.interval = 25, this.intervalId = void 0, this.limit = HI, this.queueActive = /* @__PURE__ */ new Set(), this.queueWaiting = /* @__PURE__ */ new Set(), this.init = () => {
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
const GI = new qI(), wr = (e, t) => function(n) {
  return function i(...o) {
    return GI.schedule().then((a) => {
      const s = (f) => (a(), f), l = (f) => {
        if (a(), Date.now() >= n)
          throw f;
        if (t(f)) {
          const u = Math.round(100 * Math.random());
          return new Promise((d) => setTimeout(d, u)).then(() => i.apply(void 0, o));
        }
        throw f;
      };
      return e.apply(void 0, o).then(s, l);
    });
  };
}, Er = (e, t) => function(n) {
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
}, Qe = {
  attempt: {
    /* ASYNC */
    chmod: _r(Xe(se.chmod), _e.onChangeError),
    chown: _r(Xe(se.chown), _e.onChangeError),
    close: _r(Xe(se.close), _t),
    fsync: _r(Xe(se.fsync), _t),
    mkdir: _r(Xe(se.mkdir), _t),
    realpath: _r(Xe(se.realpath), _t),
    stat: _r(Xe(se.stat), _t),
    unlink: _r(Xe(se.unlink), _t),
    /* SYNC */
    chmodSync: er(se.chmodSync, _e.onChangeError),
    chownSync: er(se.chownSync, _e.onChangeError),
    closeSync: er(se.closeSync, _t),
    existsSync: er(se.existsSync, _t),
    fsyncSync: er(se.fsync, _t),
    mkdirSync: er(se.mkdirSync, _t),
    realpathSync: er(se.realpathSync, _t),
    statSync: er(se.statSync, _t),
    unlinkSync: er(se.unlinkSync, _t)
  },
  retry: {
    /* ASYNC */
    close: wr(Xe(se.close), _e.isRetriableError),
    fsync: wr(Xe(se.fsync), _e.isRetriableError),
    open: wr(Xe(se.open), _e.isRetriableError),
    readFile: wr(Xe(se.readFile), _e.isRetriableError),
    rename: wr(Xe(se.rename), _e.isRetriableError),
    stat: wr(Xe(se.stat), _e.isRetriableError),
    write: wr(Xe(se.write), _e.isRetriableError),
    writeFile: wr(Xe(se.writeFile), _e.isRetriableError),
    /* SYNC */
    closeSync: Er(se.closeSync, _e.isRetriableError),
    fsyncSync: Er(se.fsyncSync, _e.isRetriableError),
    openSync: Er(se.openSync, _e.isRetriableError),
    readFileSync: Er(se.readFileSync, _e.isRetriableError),
    renameSync: Er(se.renameSync, _e.isRetriableError),
    statSync: Er(se.statSync, _e.isRetriableError),
    writeSync: Er(se.writeSync, _e.isRetriableError),
    writeFileSync: Er(se.writeFileSync, _e.isRetriableError)
  }
}, VI = "utf8", Gh = 438, zI = 511, WI = {}, YI = ts.userInfo().uid, KI = ts.userInfo().gid, XI = 1e3, JI = !!xe.getuid;
xe.getuid && xe.getuid();
const Vh = 128, QI = (e) => e instanceof Error && "code" in e, zh = (e) => typeof e == "string", Tl = (e) => e === void 0, ZI = xe.platform === "linux", My = xe.platform === "win32", ou = ["SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM"];
My || ou.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
ZI && ou.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
class eN {
  /* CONSTRUCTOR */
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set(), this.exited = !1, this.exit = (t) => {
      if (!this.exited) {
        this.exited = !0;
        for (const r of this.callbacks)
          r();
        t && (My && t !== "SIGINT" && t !== "SIGTERM" && t !== "SIGKILL" ? xe.kill(xe.pid, "SIGTERM") : xe.kill(xe.pid, t));
      }
    }, this.hook = () => {
      xe.once("exit", () => this.exit());
      for (const t of ou)
        try {
          xe.once(t, () => this.exit(t));
        } catch {
        }
    }, this.register = (t) => (this.callbacks.add(t), () => {
      this.callbacks.delete(t);
    }), this.hook();
  }
}
const tN = new eN(), rN = tN.register, Ze = {
  /* VARIABLES */
  store: {},
  /* API */
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), i = `.tmp-${Date.now().toString().slice(-10)}${t}`;
    return `${e}${i}`;
  },
  get: (e, t, r = !0) => {
    const n = Ze.truncate(t(e));
    return n in Ze.store ? Ze.get(e, t, r) : (Ze.store[n] = r, [n, () => delete Ze.store[n]]);
  },
  purge: (e) => {
    Ze.store[e] && (delete Ze.store[e], Qe.attempt.unlink(e));
  },
  purgeSync: (e) => {
    Ze.store[e] && (delete Ze.store[e], Qe.attempt.unlinkSync(e));
  },
  purgeSyncAll: () => {
    for (const e in Ze.store)
      Ze.purgeSync(e);
  },
  truncate: (e) => {
    const t = re.basename(e);
    if (t.length <= Vh)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - Vh;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
rN(Ze.purgeSyncAll);
function jy(e, t, r = WI) {
  if (zh(r))
    return jy(e, t, { encoding: r });
  const n = Date.now() + ((r.timeout ?? XI) || -1);
  let i = null, o = null, a = null;
  try {
    const s = Qe.attempt.realpathSync(e), l = !!s;
    e = s || e, [o, i] = Ze.get(e, r.tmpCreate || Ze.create, r.tmpPurge !== !1);
    const f = JI && Tl(r.chown), u = Tl(r.mode);
    if (l && (f || u)) {
      const c = Qe.attempt.statSync(e);
      c && (r = { ...r }, f && (r.chown = { uid: c.uid, gid: c.gid }), u && (r.mode = c.mode));
    }
    if (!l) {
      const c = re.dirname(e);
      Qe.attempt.mkdirSync(c, {
        mode: zI,
        recursive: !0
      });
    }
    a = Qe.retry.openSync(n)(o, "w", r.mode || Gh), r.tmpCreated && r.tmpCreated(o), zh(t) ? Qe.retry.writeSync(n)(a, t, 0, r.encoding || VI) : Tl(t) || Qe.retry.writeSync(n)(a, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? Qe.retry.fsyncSync(n)(a) : Qe.attempt.fsync(a)), Qe.retry.closeSync(n)(a), a = null, r.chown && (r.chown.uid !== YI || r.chown.gid !== KI) && Qe.attempt.chownSync(o, r.chown.uid, r.chown.gid), r.mode && r.mode !== Gh && Qe.attempt.chmodSync(o, r.mode);
    try {
      Qe.retry.renameSync(n)(o, e);
    } catch (c) {
      if (!QI(c) || c.code !== "ENAMETOOLONG")
        throw c;
      Qe.retry.renameSync(n)(o, Ze.truncate(e));
    }
    i(), o = null;
  } finally {
    a && Qe.attempt.closeSync(a), o && Ze.purge(o);
  }
}
var ic = { exports: {} }, au = {}, Ot = {}, ai = {}, Bo = {}, ie = {}, $o = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(w) {
      if (super(), !e.IDENTIFIER.test(w))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = w;
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
    constructor(w) {
      super(), this._items = typeof w == "string" ? [w] : w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const w = this._items[0];
      return w === "" || w === '""';
    }
    get str() {
      var w;
      return (w = this._str) !== null && w !== void 0 ? w : this._str = this._items.reduce((O, N) => `${O}${N}`, "");
    }
    get names() {
      var w;
      return (w = this._names) !== null && w !== void 0 ? w : this._names = this._items.reduce((O, N) => (N instanceof r && (O[N.str] = (O[N.str] || 0) + 1), O), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function i($, ...w) {
    const O = [$[0]];
    let N = 0;
    for (; N < w.length; )
      s(O, w[N]), O.push($[++N]);
    return new n(O);
  }
  e._ = i;
  const o = new n("+");
  function a($, ...w) {
    const O = [h($[0])];
    let N = 0;
    for (; N < w.length; )
      O.push(o), s(O, w[N]), O.push(o, h($[++N]));
    return l(O), new n(O);
  }
  e.str = a;
  function s($, w) {
    w instanceof n ? $.push(...w._items) : w instanceof r ? $.push(w) : $.push(c(w));
  }
  e.addCodeArg = s;
  function l($) {
    let w = 1;
    for (; w < $.length - 1; ) {
      if ($[w] === o) {
        const O = f($[w - 1], $[w + 1]);
        if (O !== void 0) {
          $.splice(w - 1, 3, O);
          continue;
        }
        $[w++] = "+";
      }
      w++;
    }
  }
  function f($, w) {
    if (w === '""')
      return $;
    if ($ === '""')
      return w;
    if (typeof $ == "string")
      return w instanceof r || $[$.length - 1] !== '"' ? void 0 : typeof w != "string" ? `${$.slice(0, -1)}${w}"` : w[0] === '"' ? $.slice(0, -1) + w.slice(1) : void 0;
    if (typeof w == "string" && w[0] === '"' && !($ instanceof r))
      return `"${$}${w.slice(1)}`;
  }
  function u($, w) {
    return w.emptyStr() ? $ : $.emptyStr() ? w : a`${$}${w}`;
  }
  e.strConcat = u;
  function c($) {
    return typeof $ == "number" || typeof $ == "boolean" || $ === null ? $ : h(Array.isArray($) ? $.join(",") : $);
  }
  function d($) {
    return new n(h($));
  }
  e.stringify = d;
  function h($) {
    return JSON.stringify($).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = h;
  function m($) {
    return typeof $ == "string" && e.IDENTIFIER.test($) ? new n(`.${$}`) : i`[${$}]`;
  }
  e.getProperty = m;
  function y($) {
    if (typeof $ == "string" && e.IDENTIFIER.test($))
      return new n(`${$}`);
    throw new Error(`CodeGen: invalid export name: ${$}, use explicit $id name mapping`);
  }
  e.getEsmExportName = y;
  function g($) {
    return new n($.toString());
  }
  e.regexpCode = g;
})($o);
var oc = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = $o;
  class r extends Error {
    constructor(f) {
      super(`CodeGen: "code" for ${f} not defined`), this.value = f.value;
    }
  }
  var n;
  (function(l) {
    l[l.Started = 0] = "Started", l[l.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class i {
    constructor({ prefixes: f, parent: u } = {}) {
      this._names = {}, this._prefixes = f, this._parent = u;
    }
    toName(f) {
      return f instanceof t.Name ? f : this.name(f);
    }
    name(f) {
      return new t.Name(this._newName(f));
    }
    _newName(f) {
      const u = this._names[f] || this._nameGroup(f);
      return `${f}${u.index++}`;
    }
    _nameGroup(f) {
      var u, c;
      if (!((c = (u = this._parent) === null || u === void 0 ? void 0 : u._prefixes) === null || c === void 0) && c.has(f) || this._prefixes && !this._prefixes.has(f))
        throw new Error(`CodeGen: prefix "${f}" is not allowed in this scope`);
      return this._names[f] = { prefix: f, index: 0 };
    }
  }
  e.Scope = i;
  class o extends t.Name {
    constructor(f, u) {
      super(u), this.prefix = f;
    }
    setValue(f, { property: u, itemIndex: c }) {
      this.value = f, this.scopePath = (0, t._)`.${new t.Name(u)}[${c}]`;
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
    value(f, u) {
      var c;
      if (u.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const d = this.toName(f), { prefix: h } = d, m = (c = u.key) !== null && c !== void 0 ? c : u.ref;
      let y = this._values[h];
      if (y) {
        const w = y.get(m);
        if (w)
          return w;
      } else
        y = this._values[h] = /* @__PURE__ */ new Map();
      y.set(m, d);
      const g = this._scope[h] || (this._scope[h] = []), $ = g.length;
      return g[$] = u.ref, d.setValue(u, { property: h, itemIndex: $ }), d;
    }
    getValue(f, u) {
      const c = this._values[f];
      if (c)
        return c.get(u);
    }
    scopeRefs(f, u = this._values) {
      return this._reduceValues(u, (c) => {
        if (c.scopePath === void 0)
          throw new Error(`CodeGen: name "${c}" has no value`);
        return (0, t._)`${f}${c.scopePath}`;
      });
    }
    scopeCode(f = this._values, u, c) {
      return this._reduceValues(f, (d) => {
        if (d.value === void 0)
          throw new Error(`CodeGen: name "${d}" has no value`);
        return d.value.code;
      }, u, c);
    }
    _reduceValues(f, u, c = {}, d) {
      let h = t.nil;
      for (const m in f) {
        const y = f[m];
        if (!y)
          continue;
        const g = c[m] = c[m] || /* @__PURE__ */ new Map();
        y.forEach(($) => {
          if (g.has($))
            return;
          g.set($, n.Started);
          let w = u($);
          if (w) {
            const O = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            h = (0, t._)`${h}${O} ${$} = ${w};${this.opts._n}`;
          } else if (w = d == null ? void 0 : d($))
            h = (0, t._)`${h}${w}${this.opts._n}`;
          else
            throw new r($);
          g.set($, n.Completed);
        });
      }
      return h;
    }
  }
  e.ValueScope = s;
})(oc);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = $o, r = oc;
  var n = $o;
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
  var i = oc;
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
    optimizeNames(_, b) {
      return this;
    }
  }
  class a extends o {
    constructor(_, b, M) {
      super(), this.varKind = _, this.name = b, this.rhs = M;
    }
    render({ es5: _, _n: b }) {
      const M = _ ? r.varKinds.var : this.varKind, v = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${M} ${this.name}${v};` + b;
    }
    optimizeNames(_, b) {
      if (_[this.name.str])
        return this.rhs && (this.rhs = k(this.rhs, _, b)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class s extends o {
    constructor(_, b, M) {
      super(), this.lhs = _, this.rhs = b, this.sideEffects = M;
    }
    render({ _n: _ }) {
      return `${this.lhs} = ${this.rhs};` + _;
    }
    optimizeNames(_, b) {
      if (!(this.lhs instanceof t.Name && !_[this.lhs.str] && !this.sideEffects))
        return this.rhs = k(this.rhs, _, b), this;
    }
    get names() {
      const _ = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return X(_, this.rhs);
    }
  }
  class l extends s {
    constructor(_, b, M, v) {
      super(_, M, v), this.op = b;
    }
    render({ _n: _ }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + _;
    }
  }
  class f extends o {
    constructor(_) {
      super(), this.label = _, this.names = {};
    }
    render({ _n: _ }) {
      return `${this.label}:` + _;
    }
  }
  class u extends o {
    constructor(_) {
      super(), this.label = _, this.names = {};
    }
    render({ _n: _ }) {
      return `break${this.label ? ` ${this.label}` : ""};` + _;
    }
  }
  class c extends o {
    constructor(_) {
      super(), this.error = _;
    }
    render({ _n: _ }) {
      return `throw ${this.error};` + _;
    }
    get names() {
      return this.error.names;
    }
  }
  class d extends o {
    constructor(_) {
      super(), this.code = _;
    }
    render({ _n: _ }) {
      return `${this.code};` + _;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(_, b) {
      return this.code = k(this.code, _, b), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class h extends o {
    constructor(_ = []) {
      super(), this.nodes = _;
    }
    render(_) {
      return this.nodes.reduce((b, M) => b + M.render(_), "");
    }
    optimizeNodes() {
      const { nodes: _ } = this;
      let b = _.length;
      for (; b--; ) {
        const M = _[b].optimizeNodes();
        Array.isArray(M) ? _.splice(b, 1, ...M) : M ? _[b] = M : _.splice(b, 1);
      }
      return _.length > 0 ? this : void 0;
    }
    optimizeNames(_, b) {
      const { nodes: M } = this;
      let v = M.length;
      for (; v--; ) {
        const p = M[v];
        p.optimizeNames(_, b) || (x(_, p.names), M.splice(v, 1));
      }
      return M.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((_, b) => z(_, b.names), {});
    }
  }
  class m extends h {
    render(_) {
      return "{" + _._n + super.render(_) + "}" + _._n;
    }
  }
  class y extends h {
  }
  class g extends m {
  }
  g.kind = "else";
  class $ extends m {
    constructor(_, b) {
      super(b), this.condition = _;
    }
    render(_) {
      let b = `if(${this.condition})` + super.render(_);
      return this.else && (b += "else " + this.else.render(_)), b;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const _ = this.condition;
      if (_ === !0)
        return this.nodes;
      let b = this.else;
      if (b) {
        const M = b.optimizeNodes();
        b = this.else = Array.isArray(M) ? new g(M) : M;
      }
      if (b)
        return _ === !1 ? b instanceof $ ? b : b.nodes : this.nodes.length ? this : new $(G(_), b instanceof $ ? [b] : b.nodes);
      if (!(_ === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(_, b) {
      var M;
      if (this.else = (M = this.else) === null || M === void 0 ? void 0 : M.optimizeNames(_, b), !!(super.optimizeNames(_, b) || this.else))
        return this.condition = k(this.condition, _, b), this;
    }
    get names() {
      const _ = super.names;
      return X(_, this.condition), this.else && z(_, this.else.names), _;
    }
  }
  $.kind = "if";
  class w extends m {
  }
  w.kind = "for";
  class O extends w {
    constructor(_) {
      super(), this.iteration = _;
    }
    render(_) {
      return `for(${this.iteration})` + super.render(_);
    }
    optimizeNames(_, b) {
      if (super.optimizeNames(_, b))
        return this.iteration = k(this.iteration, _, b), this;
    }
    get names() {
      return z(super.names, this.iteration.names);
    }
  }
  class N extends w {
    constructor(_, b, M, v) {
      super(), this.varKind = _, this.name = b, this.from = M, this.to = v;
    }
    render(_) {
      const b = _.es5 ? r.varKinds.var : this.varKind, { name: M, from: v, to: p } = this;
      return `for(${b} ${M}=${v}; ${M}<${p}; ${M}++)` + super.render(_);
    }
    get names() {
      const _ = X(super.names, this.from);
      return X(_, this.to);
    }
  }
  class j extends w {
    constructor(_, b, M, v) {
      super(), this.loop = _, this.varKind = b, this.name = M, this.iterable = v;
    }
    render(_) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(_);
    }
    optimizeNames(_, b) {
      if (super.optimizeNames(_, b))
        return this.iterable = k(this.iterable, _, b), this;
    }
    get names() {
      return z(super.names, this.iterable.names);
    }
  }
  class I extends m {
    constructor(_, b, M) {
      super(), this.name = _, this.args = b, this.async = M;
    }
    render(_) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(_);
    }
  }
  I.kind = "func";
  class F extends h {
    render(_) {
      return "return " + super.render(_);
    }
  }
  F.kind = "return";
  class q extends m {
    render(_) {
      let b = "try" + super.render(_);
      return this.catch && (b += this.catch.render(_)), this.finally && (b += this.finally.render(_)), b;
    }
    optimizeNodes() {
      var _, b;
      return super.optimizeNodes(), (_ = this.catch) === null || _ === void 0 || _.optimizeNodes(), (b = this.finally) === null || b === void 0 || b.optimizeNodes(), this;
    }
    optimizeNames(_, b) {
      var M, v;
      return super.optimizeNames(_, b), (M = this.catch) === null || M === void 0 || M.optimizeNames(_, b), (v = this.finally) === null || v === void 0 || v.optimizeNames(_, b), this;
    }
    get names() {
      const _ = super.names;
      return this.catch && z(_, this.catch.names), this.finally && z(_, this.finally.names), _;
    }
  }
  class E extends m {
    constructor(_) {
      super(), this.error = _;
    }
    render(_) {
      return `catch(${this.error})` + super.render(_);
    }
  }
  E.kind = "catch";
  class Y extends m {
    render(_) {
      return "finally" + super.render(_);
    }
  }
  Y.kind = "finally";
  class B {
    constructor(_, b = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...b, _n: b.lines ? `
` : "" }, this._extScope = _, this._scope = new r.Scope({ parent: _ }), this._nodes = [new y()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(_) {
      return this._scope.name(_);
    }
    // reserves unique name in the external scope
    scopeName(_) {
      return this._extScope.name(_);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(_, b) {
      const M = this._extScope.value(_, b);
      return (this._values[M.prefix] || (this._values[M.prefix] = /* @__PURE__ */ new Set())).add(M), M;
    }
    getScopeValue(_, b) {
      return this._extScope.getValue(_, b);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(_) {
      return this._extScope.scopeRefs(_, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(_, b, M, v) {
      const p = this._scope.toName(b);
      return M !== void 0 && v && (this._constants[p.str] = M), this._leafNode(new a(_, p, M)), p;
    }
    // `const` declaration (`var` in es5 mode)
    const(_, b, M) {
      return this._def(r.varKinds.const, _, b, M);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(_, b, M) {
      return this._def(r.varKinds.let, _, b, M);
    }
    // `var` declaration with optional assignment
    var(_, b, M) {
      return this._def(r.varKinds.var, _, b, M);
    }
    // assignment code
    assign(_, b, M) {
      return this._leafNode(new s(_, b, M));
    }
    // `+=` code
    add(_, b) {
      return this._leafNode(new l(_, e.operators.ADD, b));
    }
    // appends passed SafeExpr to code or executes Block
    code(_) {
      return typeof _ == "function" ? _() : _ !== t.nil && this._leafNode(new d(_)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(..._) {
      const b = ["{"];
      for (const [M, v] of _)
        b.length > 1 && b.push(","), b.push(M), (M !== v || this.opts.es5) && (b.push(":"), (0, t.addCodeArg)(b, v));
      return b.push("}"), new t._Code(b);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(_, b, M) {
      if (this._blockNode(new $(_)), b && M)
        this.code(b).else().code(M).endIf();
      else if (b)
        this.code(b).endIf();
      else if (M)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(_) {
      return this._elseNode(new $(_));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new g());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode($, g);
    }
    _for(_, b) {
      return this._blockNode(_), b && this.code(b).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(_, b) {
      return this._for(new O(_), b);
    }
    // `for` statement for a range of values
    forRange(_, b, M, v, p = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const D = this._scope.toName(_);
      return this._for(new N(p, D, b, M), () => v(D));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(_, b, M, v = r.varKinds.const) {
      const p = this._scope.toName(_);
      if (this.opts.es5) {
        const D = b instanceof t.Name ? b : this.var("_arr", b);
        return this.forRange("_i", 0, (0, t._)`${D}.length`, (A) => {
          this.var(p, (0, t._)`${D}[${A}]`), M(p);
        });
      }
      return this._for(new j("of", v, p, b), () => M(p));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(_, b, M, v = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(_, (0, t._)`Object.keys(${b})`, M);
      const p = this._scope.toName(_);
      return this._for(new j("in", v, p, b), () => M(p));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(w);
    }
    // `label` statement
    label(_) {
      return this._leafNode(new f(_));
    }
    // `break` statement
    break(_) {
      return this._leafNode(new u(_));
    }
    // `return` statement
    return(_) {
      const b = new F();
      if (this._blockNode(b), this.code(_), b.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(F);
    }
    // `try` statement
    try(_, b, M) {
      if (!b && !M)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const v = new q();
      if (this._blockNode(v), this.code(_), b) {
        const p = this.name("e");
        this._currNode = v.catch = new E(p), b(p);
      }
      return M && (this._currNode = v.finally = new Y(), this.code(M)), this._endBlockNode(E, Y);
    }
    // `throw` statement
    throw(_) {
      return this._leafNode(new c(_));
    }
    // start self-balancing block
    block(_, b) {
      return this._blockStarts.push(this._nodes.length), _ && this.code(_).endBlock(b), this;
    }
    // end the current self-balancing block
    endBlock(_) {
      const b = this._blockStarts.pop();
      if (b === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const M = this._nodes.length - b;
      if (M < 0 || _ !== void 0 && M !== _)
        throw new Error(`CodeGen: wrong number of nodes: ${M} vs ${_} expected`);
      return this._nodes.length = b, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(_, b = t.nil, M, v) {
      return this._blockNode(new I(_, b, M)), v && this.code(v).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(I);
    }
    optimize(_ = 1) {
      for (; _-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(_) {
      return this._currNode.nodes.push(_), this;
    }
    _blockNode(_) {
      this._currNode.nodes.push(_), this._nodes.push(_);
    }
    _endBlockNode(_, b) {
      const M = this._currNode;
      if (M instanceof _ || b && M instanceof b)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${b ? `${_.kind}/${b.kind}` : _.kind}"`);
    }
    _elseNode(_) {
      const b = this._currNode;
      if (!(b instanceof $))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = b.else = _, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const _ = this._nodes;
      return _[_.length - 1];
    }
    set _currNode(_) {
      const b = this._nodes;
      b[b.length - 1] = _;
    }
  }
  e.CodeGen = B;
  function z(P, _) {
    for (const b in _)
      P[b] = (P[b] || 0) + (_[b] || 0);
    return P;
  }
  function X(P, _) {
    return _ instanceof t._CodeOrName ? z(P, _.names) : P;
  }
  function k(P, _, b) {
    if (P instanceof t.Name)
      return M(P);
    if (!v(P))
      return P;
    return new t._Code(P._items.reduce((p, D) => (D instanceof t.Name && (D = M(D)), D instanceof t._Code ? p.push(...D._items) : p.push(D), p), []));
    function M(p) {
      const D = b[p.str];
      return D === void 0 || _[p.str] !== 1 ? p : (delete _[p.str], D);
    }
    function v(p) {
      return p instanceof t._Code && p._items.some((D) => D instanceof t.Name && _[D.str] === 1 && b[D.str] !== void 0);
    }
  }
  function x(P, _) {
    for (const b in _)
      P[b] = (P[b] || 0) - (_[b] || 0);
  }
  function G(P) {
    return typeof P == "boolean" || typeof P == "number" || P === null ? !P : (0, t._)`!${R(P)}`;
  }
  e.not = G;
  const L = T(e.operators.AND);
  function W(...P) {
    return P.reduce(L);
  }
  e.and = W;
  const V = T(e.operators.OR);
  function U(...P) {
    return P.reduce(V);
  }
  e.or = U;
  function T(P) {
    return (_, b) => _ === t.nil ? b : b === t.nil ? _ : (0, t._)`${R(_)} ${P} ${R(b)}`;
  }
  function R(P) {
    return P instanceof t.Name ? P : (0, t._)`(${P})`;
  }
})(ie);
var K = {};
Object.defineProperty(K, "__esModule", { value: !0 });
K.checkStrictMode = K.getErrorPath = K.Type = K.useFunc = K.setEvaluated = K.evaluatedPropsToName = K.mergeEvaluated = K.eachItem = K.unescapeJsonPointer = K.escapeJsonPointer = K.escapeFragment = K.unescapeFragment = K.schemaRefOrVal = K.schemaHasRulesButRef = K.schemaHasRules = K.checkUnknownRules = K.alwaysValidSchema = K.toHash = void 0;
const pe = ie, nN = $o;
function iN(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
K.toHash = iN;
function oN(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (By(e, t), !Hy(t, e.self.RULES.all));
}
K.alwaysValidSchema = oN;
function By(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const i = n.RULES.keywords;
  for (const o in t)
    i[o] || Vy(e, `unknown keyword: "${o}"`);
}
K.checkUnknownRules = By;
function Hy(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
K.schemaHasRules = Hy;
function aN(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
K.schemaHasRulesButRef = aN;
function sN({ topSchemaRef: e, schemaPath: t }, r, n, i) {
  if (!i) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, pe._)`${r}`;
  }
  return (0, pe._)`${e}${t}${(0, pe.getProperty)(n)}`;
}
K.schemaRefOrVal = sN;
function lN(e) {
  return qy(decodeURIComponent(e));
}
K.unescapeFragment = lN;
function cN(e) {
  return encodeURIComponent(su(e));
}
K.escapeFragment = cN;
function su(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
K.escapeJsonPointer = su;
function qy(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
K.unescapeJsonPointer = qy;
function uN(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
K.eachItem = uN;
function Wh({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (i, o, a, s) => {
    const l = a === void 0 ? o : a instanceof pe.Name ? (o instanceof pe.Name ? e(i, o, a) : t(i, o, a), a) : o instanceof pe.Name ? (t(i, a, o), o) : r(o, a);
    return s === pe.Name && !(l instanceof pe.Name) ? n(i, l) : l;
  };
}
K.mergeEvaluated = {
  props: Wh({
    mergeNames: (e, t, r) => e.if((0, pe._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, pe._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, pe._)`${r} || {}`).code((0, pe._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, pe._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, pe._)`${r} || {}`), lu(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Gy
  }),
  items: Wh({
    mergeNames: (e, t, r) => e.if((0, pe._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, pe._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, pe._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, pe._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Gy(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, pe._)`{}`);
  return t !== void 0 && lu(e, r, t), r;
}
K.evaluatedPropsToName = Gy;
function lu(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, pe._)`${t}${(0, pe.getProperty)(n)}`, !0));
}
K.setEvaluated = lu;
const Yh = {};
function fN(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Yh[t.code] || (Yh[t.code] = new nN._Code(t.code))
  });
}
K.useFunc = fN;
var ac;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(ac || (K.Type = ac = {}));
function dN(e, t, r) {
  if (e instanceof pe.Name) {
    const n = t === ac.Num;
    return r ? n ? (0, pe._)`"[" + ${e} + "]"` : (0, pe._)`"['" + ${e} + "']"` : n ? (0, pe._)`"/" + ${e}` : (0, pe._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, pe.getProperty)(e).toString() : "/" + su(e);
}
K.getErrorPath = dN;
function Vy(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
K.checkStrictMode = Vy;
var St = {};
Object.defineProperty(St, "__esModule", { value: !0 });
const Je = ie, hN = {
  // validation function arguments
  data: new Je.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Je.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Je.Name("instancePath"),
  parentData: new Je.Name("parentData"),
  parentDataProperty: new Je.Name("parentDataProperty"),
  rootData: new Je.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Je.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Je.Name("vErrors"),
  // null or array of validation errors
  errors: new Je.Name("errors"),
  // counter of validation errors
  this: new Je.Name("this"),
  // "globals"
  self: new Je.Name("self"),
  scope: new Je.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Je.Name("json"),
  jsonPos: new Je.Name("jsonPos"),
  jsonLen: new Je.Name("jsonLen"),
  jsonPart: new Je.Name("jsonPart")
};
St.default = hN;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = ie, r = K, n = St;
  e.keywordError = {
    message: ({ keyword: g }) => (0, t.str)`must pass "${g}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: g, schemaType: $ }) => $ ? (0, t.str)`"${g}" keyword must be ${$} ($data)` : (0, t.str)`"${g}" keyword is invalid ($data)`
  };
  function i(g, $ = e.keywordError, w, O) {
    const { it: N } = g, { gen: j, compositeRule: I, allErrors: F } = N, q = c(g, $, w);
    O ?? (I || F) ? l(j, q) : f(N, (0, t._)`[${q}]`);
  }
  e.reportError = i;
  function o(g, $ = e.keywordError, w) {
    const { it: O } = g, { gen: N, compositeRule: j, allErrors: I } = O, F = c(g, $, w);
    l(N, F), j || I || f(O, n.default.vErrors);
  }
  e.reportExtraError = o;
  function a(g, $) {
    g.assign(n.default.errors, $), g.if((0, t._)`${n.default.vErrors} !== null`, () => g.if($, () => g.assign((0, t._)`${n.default.vErrors}.length`, $), () => g.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = a;
  function s({ gen: g, keyword: $, schemaValue: w, data: O, errsCount: N, it: j }) {
    if (N === void 0)
      throw new Error("ajv implementation error");
    const I = g.name("err");
    g.forRange("i", N, n.default.errors, (F) => {
      g.const(I, (0, t._)`${n.default.vErrors}[${F}]`), g.if((0, t._)`${I}.instancePath === undefined`, () => g.assign((0, t._)`${I}.instancePath`, (0, t.strConcat)(n.default.instancePath, j.errorPath))), g.assign((0, t._)`${I}.schemaPath`, (0, t.str)`${j.errSchemaPath}/${$}`), j.opts.verbose && (g.assign((0, t._)`${I}.schema`, w), g.assign((0, t._)`${I}.data`, O));
    });
  }
  e.extendErrors = s;
  function l(g, $) {
    const w = g.const("err", $);
    g.if((0, t._)`${n.default.vErrors} === null`, () => g.assign(n.default.vErrors, (0, t._)`[${w}]`), (0, t._)`${n.default.vErrors}.push(${w})`), g.code((0, t._)`${n.default.errors}++`);
  }
  function f(g, $) {
    const { gen: w, validateName: O, schemaEnv: N } = g;
    N.$async ? w.throw((0, t._)`new ${g.ValidationError}(${$})`) : (w.assign((0, t._)`${O}.errors`, $), w.return(!1));
  }
  const u = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function c(g, $, w) {
    const { createErrors: O } = g.it;
    return O === !1 ? (0, t._)`{}` : d(g, $, w);
  }
  function d(g, $, w = {}) {
    const { gen: O, it: N } = g, j = [
      h(N, w),
      m(g, w)
    ];
    return y(g, $, j), O.object(...j);
  }
  function h({ errorPath: g }, { instancePath: $ }) {
    const w = $ ? (0, t.str)`${g}${(0, r.getErrorPath)($, r.Type.Str)}` : g;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, w)];
  }
  function m({ keyword: g, it: { errSchemaPath: $ } }, { schemaPath: w, parentSchema: O }) {
    let N = O ? $ : (0, t.str)`${$}/${g}`;
    return w && (N = (0, t.str)`${N}${(0, r.getErrorPath)(w, r.Type.Str)}`), [u.schemaPath, N];
  }
  function y(g, { params: $, message: w }, O) {
    const { keyword: N, data: j, schemaValue: I, it: F } = g, { opts: q, propertyName: E, topSchemaRef: Y, schemaPath: B } = F;
    O.push([u.keyword, N], [u.params, typeof $ == "function" ? $(g) : $ || (0, t._)`{}`]), q.messages && O.push([u.message, typeof w == "function" ? w(g) : w]), q.verbose && O.push([u.schema, I], [u.parentSchema, (0, t._)`${Y}${B}`], [n.default.data, j]), E && O.push([u.propertyName, E]);
  }
})(Bo);
Object.defineProperty(ai, "__esModule", { value: !0 });
ai.boolOrEmptySchema = ai.topBoolOrEmptySchema = void 0;
const pN = Bo, mN = ie, yN = St, gN = {
  message: "boolean schema is false"
};
function vN(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? zy(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(yN.default.data) : (t.assign((0, mN._)`${n}.errors`, null), t.return(!0));
}
ai.topBoolOrEmptySchema = vN;
function $N(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), zy(e)) : r.var(t, !0);
}
ai.boolOrEmptySchema = $N;
function zy(e, t) {
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
  (0, pN.reportError)(i, gN, void 0, t);
}
var ke = {}, $n = {};
Object.defineProperty($n, "__esModule", { value: !0 });
$n.getRules = $n.isJSONType = void 0;
const _N = ["string", "number", "integer", "boolean", "null", "object", "array"], wN = new Set(_N);
function EN(e) {
  return typeof e == "string" && wN.has(e);
}
$n.isJSONType = EN;
function SN() {
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
$n.getRules = SN;
var or = {};
Object.defineProperty(or, "__esModule", { value: !0 });
or.shouldUseRule = or.shouldUseGroup = or.schemaHasRulesForType = void 0;
function bN({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && Wy(e, n);
}
or.schemaHasRulesForType = bN;
function Wy(e, t) {
  return t.rules.some((r) => Yy(e, r));
}
or.shouldUseGroup = Wy;
function Yy(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
or.shouldUseRule = Yy;
Object.defineProperty(ke, "__esModule", { value: !0 });
ke.reportTypeError = ke.checkDataTypes = ke.checkDataType = ke.coerceAndCheckDataType = ke.getJSONTypes = ke.getSchemaTypes = ke.DataType = void 0;
const AN = $n, TN = or, PN = Bo, ae = ie, Ky = K;
var Zn;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(Zn || (ke.DataType = Zn = {}));
function CN(e) {
  const t = Xy(e.type);
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
ke.getSchemaTypes = CN;
function Xy(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(AN.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
ke.getJSONTypes = Xy;
function ON(e, t) {
  const { gen: r, data: n, opts: i } = e, o = IN(t, i.coerceTypes), a = t.length > 0 && !(o.length === 0 && t.length === 1 && (0, TN.schemaHasRulesForType)(e, t[0]));
  if (a) {
    const s = cu(t, n, i.strictNumbers, Zn.Wrong);
    r.if(s, () => {
      o.length ? NN(e, t, o) : uu(e);
    });
  }
  return a;
}
ke.coerceAndCheckDataType = ON;
const Jy = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function IN(e, t) {
  return t ? e.filter((r) => Jy.has(r) || t === "array" && r === "array") : [];
}
function NN(e, t, r) {
  const { gen: n, data: i, opts: o } = e, a = n.let("dataType", (0, ae._)`typeof ${i}`), s = n.let("coerced", (0, ae._)`undefined`);
  o.coerceTypes === "array" && n.if((0, ae._)`${a} == 'object' && Array.isArray(${i}) && ${i}.length == 1`, () => n.assign(i, (0, ae._)`${i}[0]`).assign(a, (0, ae._)`typeof ${i}`).if(cu(t, i, o.strictNumbers), () => n.assign(s, i))), n.if((0, ae._)`${s} !== undefined`);
  for (const f of r)
    (Jy.has(f) || f === "array" && o.coerceTypes === "array") && l(f);
  n.else(), uu(e), n.endIf(), n.if((0, ae._)`${s} !== undefined`, () => {
    n.assign(i, s), RN(e, s);
  });
  function l(f) {
    switch (f) {
      case "string":
        n.elseIf((0, ae._)`${a} == "number" || ${a} == "boolean"`).assign(s, (0, ae._)`"" + ${i}`).elseIf((0, ae._)`${i} === null`).assign(s, (0, ae._)`""`);
        return;
      case "number":
        n.elseIf((0, ae._)`${a} == "boolean" || ${i} === null
              || (${a} == "string" && ${i} && ${i} == +${i})`).assign(s, (0, ae._)`+${i}`);
        return;
      case "integer":
        n.elseIf((0, ae._)`${a} === "boolean" || ${i} === null
              || (${a} === "string" && ${i} && ${i} == +${i} && !(${i} % 1))`).assign(s, (0, ae._)`+${i}`);
        return;
      case "boolean":
        n.elseIf((0, ae._)`${i} === "false" || ${i} === 0 || ${i} === null`).assign(s, !1).elseIf((0, ae._)`${i} === "true" || ${i} === 1`).assign(s, !0);
        return;
      case "null":
        n.elseIf((0, ae._)`${i} === "" || ${i} === 0 || ${i} === false`), n.assign(s, null);
        return;
      case "array":
        n.elseIf((0, ae._)`${a} === "string" || ${a} === "number"
              || ${a} === "boolean" || ${i} === null`).assign(s, (0, ae._)`[${i}]`);
    }
  }
}
function RN({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, ae._)`${t} !== undefined`, () => e.assign((0, ae._)`${t}[${r}]`, n));
}
function sc(e, t, r, n = Zn.Correct) {
  const i = n === Zn.Correct ? ae.operators.EQ : ae.operators.NEQ;
  let o;
  switch (e) {
    case "null":
      return (0, ae._)`${t} ${i} null`;
    case "array":
      o = (0, ae._)`Array.isArray(${t})`;
      break;
    case "object":
      o = (0, ae._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      o = a((0, ae._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      o = a();
      break;
    default:
      return (0, ae._)`typeof ${t} ${i} ${e}`;
  }
  return n === Zn.Correct ? o : (0, ae.not)(o);
  function a(s = ae.nil) {
    return (0, ae.and)((0, ae._)`typeof ${t} == "number"`, s, r ? (0, ae._)`isFinite(${t})` : ae.nil);
  }
}
ke.checkDataType = sc;
function cu(e, t, r, n) {
  if (e.length === 1)
    return sc(e[0], t, r, n);
  let i;
  const o = (0, Ky.toHash)(e);
  if (o.array && o.object) {
    const a = (0, ae._)`typeof ${t} != "object"`;
    i = o.null ? a : (0, ae._)`!${t} || ${a}`, delete o.null, delete o.array, delete o.object;
  } else
    i = ae.nil;
  o.number && delete o.integer;
  for (const a in o)
    i = (0, ae.and)(i, sc(a, t, r, n));
  return i;
}
ke.checkDataTypes = cu;
const DN = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, ae._)`{type: ${e}}` : (0, ae._)`{type: ${t}}`
};
function uu(e) {
  const t = kN(e);
  (0, PN.reportError)(t, DN);
}
ke.reportTypeError = uu;
function kN(e) {
  const { gen: t, data: r, schema: n } = e, i = (0, Ky.schemaRefOrVal)(e, n, "type");
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
var Cs = {};
Object.defineProperty(Cs, "__esModule", { value: !0 });
Cs.assignDefaults = void 0;
const kn = ie, xN = K;
function FN(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const i in r)
      Kh(e, i, r[i].default);
  else t === "array" && Array.isArray(n) && n.forEach((i, o) => Kh(e, o, i.default));
}
Cs.assignDefaults = FN;
function Kh(e, t, r) {
  const { gen: n, compositeRule: i, data: o, opts: a } = e;
  if (r === void 0)
    return;
  const s = (0, kn._)`${o}${(0, kn.getProperty)(t)}`;
  if (i) {
    (0, xN.checkStrictMode)(e, `default is ignored for: ${s}`);
    return;
  }
  let l = (0, kn._)`${s} === undefined`;
  a.useDefaults === "empty" && (l = (0, kn._)`${l} || ${s} === null || ${s} === ""`), n.if(l, (0, kn._)`${s} = ${(0, kn.stringify)(r)}`);
}
var Gt = {}, le = {};
Object.defineProperty(le, "__esModule", { value: !0 });
le.validateUnion = le.validateArray = le.usePattern = le.callValidateCode = le.schemaProperties = le.allSchemaProperties = le.noPropertyInData = le.propertyInData = le.isOwnProperty = le.hasPropFunc = le.reportMissingProp = le.checkMissingProp = le.checkReportMissingProp = void 0;
const ve = ie, fu = K, Sr = St, LN = K;
function UN(e, t) {
  const { gen: r, data: n, it: i } = e;
  r.if(hu(r, n, t, i.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, ve._)`${t}` }, !0), e.error();
  });
}
le.checkReportMissingProp = UN;
function MN({ gen: e, data: t, it: { opts: r } }, n, i) {
  return (0, ve.or)(...n.map((o) => (0, ve.and)(hu(e, t, o, r.ownProperties), (0, ve._)`${i} = ${o}`)));
}
le.checkMissingProp = MN;
function jN(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
le.reportMissingProp = jN;
function Qy(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, ve._)`Object.prototype.hasOwnProperty`
  });
}
le.hasPropFunc = Qy;
function du(e, t, r) {
  return (0, ve._)`${Qy(e)}.call(${t}, ${r})`;
}
le.isOwnProperty = du;
function BN(e, t, r, n) {
  const i = (0, ve._)`${t}${(0, ve.getProperty)(r)} !== undefined`;
  return n ? (0, ve._)`${i} && ${du(e, t, r)}` : i;
}
le.propertyInData = BN;
function hu(e, t, r, n) {
  const i = (0, ve._)`${t}${(0, ve.getProperty)(r)} === undefined`;
  return n ? (0, ve.or)(i, (0, ve.not)(du(e, t, r))) : i;
}
le.noPropertyInData = hu;
function Zy(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
le.allSchemaProperties = Zy;
function HN(e, t) {
  return Zy(t).filter((r) => !(0, fu.alwaysValidSchema)(e, t[r]));
}
le.schemaProperties = HN;
function qN({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: i, errorPath: o }, it: a }, s, l, f) {
  const u = f ? (0, ve._)`${e}, ${t}, ${n}${i}` : t, c = [
    [Sr.default.instancePath, (0, ve.strConcat)(Sr.default.instancePath, o)],
    [Sr.default.parentData, a.parentData],
    [Sr.default.parentDataProperty, a.parentDataProperty],
    [Sr.default.rootData, Sr.default.rootData]
  ];
  a.opts.dynamicRef && c.push([Sr.default.dynamicAnchors, Sr.default.dynamicAnchors]);
  const d = (0, ve._)`${u}, ${r.object(...c)}`;
  return l !== ve.nil ? (0, ve._)`${s}.call(${l}, ${d})` : (0, ve._)`${s}(${d})`;
}
le.callValidateCode = qN;
const GN = (0, ve._)`new RegExp`;
function VN({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: i } = t.code, o = i(r, n);
  return e.scopeValue("pattern", {
    key: o.toString(),
    ref: o,
    code: (0, ve._)`${i.code === "new RegExp" ? GN : (0, LN.useFunc)(e, i)}(${r}, ${n})`
  });
}
le.usePattern = VN;
function zN(e) {
  const { gen: t, data: r, keyword: n, it: i } = e, o = t.name("valid");
  if (i.allErrors) {
    const s = t.let("valid", !0);
    return a(() => t.assign(s, !1)), s;
  }
  return t.var(o, !0), a(() => t.break()), o;
  function a(s) {
    const l = t.const("len", (0, ve._)`${r}.length`);
    t.forRange("i", 0, l, (f) => {
      e.subschema({
        keyword: n,
        dataProp: f,
        dataPropType: fu.Type.Num
      }, o), t.if((0, ve.not)(o), s);
    });
  }
}
le.validateArray = zN;
function WN(e) {
  const { gen: t, schema: r, keyword: n, it: i } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((l) => (0, fu.alwaysValidSchema)(i, l)) && !i.opts.unevaluated)
    return;
  const a = t.let("valid", !1), s = t.name("_valid");
  t.block(() => r.forEach((l, f) => {
    const u = e.subschema({
      keyword: n,
      schemaProp: f,
      compositeRule: !0
    }, s);
    t.assign(a, (0, ve._)`${a} || ${s}`), e.mergeValidEvaluated(u, s) || t.if((0, ve.not)(a));
  })), e.result(a, () => e.reset(), () => e.error(!0));
}
le.validateUnion = WN;
Object.defineProperty(Gt, "__esModule", { value: !0 });
Gt.validateKeywordUsage = Gt.validSchemaType = Gt.funcKeywordCode = Gt.macroKeywordCode = void 0;
const ot = ie, cn = St, YN = le, KN = Bo;
function XN(e, t) {
  const { gen: r, keyword: n, schema: i, parentSchema: o, it: a } = e, s = t.macro.call(a.self, i, o, a), l = eg(r, n, s);
  a.opts.validateSchema !== !1 && a.self.validateSchema(s, !0);
  const f = r.name("valid");
  e.subschema({
    schema: s,
    schemaPath: ot.nil,
    errSchemaPath: `${a.errSchemaPath}/${n}`,
    topSchemaRef: l,
    compositeRule: !0
  }, f), e.pass(f, () => e.error(!0));
}
Gt.macroKeywordCode = XN;
function JN(e, t) {
  var r;
  const { gen: n, keyword: i, schema: o, parentSchema: a, $data: s, it: l } = e;
  ZN(l, t);
  const f = !s && t.compile ? t.compile.call(l.self, o, a, l) : t.validate, u = eg(n, i, f), c = n.let("valid");
  e.block$data(c, d), e.ok((r = t.valid) !== null && r !== void 0 ? r : c);
  function d() {
    if (t.errors === !1)
      y(), t.modifying && Xh(e), g(() => e.error());
    else {
      const $ = t.async ? h() : m();
      t.modifying && Xh(e), g(() => QN(e, $));
    }
  }
  function h() {
    const $ = n.let("ruleErrs", null);
    return n.try(() => y((0, ot._)`await `), (w) => n.assign(c, !1).if((0, ot._)`${w} instanceof ${l.ValidationError}`, () => n.assign($, (0, ot._)`${w}.errors`), () => n.throw(w))), $;
  }
  function m() {
    const $ = (0, ot._)`${u}.errors`;
    return n.assign($, null), y(ot.nil), $;
  }
  function y($ = t.async ? (0, ot._)`await ` : ot.nil) {
    const w = l.opts.passContext ? cn.default.this : cn.default.self, O = !("compile" in t && !s || t.schema === !1);
    n.assign(c, (0, ot._)`${$}${(0, YN.callValidateCode)(e, u, w, O)}`, t.modifying);
  }
  function g($) {
    var w;
    n.if((0, ot.not)((w = t.valid) !== null && w !== void 0 ? w : c), $);
  }
}
Gt.funcKeywordCode = JN;
function Xh(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, ot._)`${n.parentData}[${n.parentDataProperty}]`));
}
function QN(e, t) {
  const { gen: r } = e;
  r.if((0, ot._)`Array.isArray(${t})`, () => {
    r.assign(cn.default.vErrors, (0, ot._)`${cn.default.vErrors} === null ? ${t} : ${cn.default.vErrors}.concat(${t})`).assign(cn.default.errors, (0, ot._)`${cn.default.vErrors}.length`), (0, KN.extendErrors)(e);
  }, () => e.error());
}
function ZN({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function eg(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, ot.stringify)(r) });
}
function eR(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
Gt.validSchemaType = eR;
function tR({ schema: e, opts: t, self: r, errSchemaPath: n }, i, o) {
  if (Array.isArray(i.keyword) ? !i.keyword.includes(o) : i.keyword !== o)
    throw new Error("ajv implementation error");
  const a = i.dependencies;
  if (a != null && a.some((s) => !Object.prototype.hasOwnProperty.call(e, s)))
    throw new Error(`parent schema must have dependencies of ${o}: ${a.join(",")}`);
  if (i.validateSchema && !i.validateSchema(e[o])) {
    const l = `keyword "${o}" value is invalid at path "${n}": ` + r.errorsText(i.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(l);
    else
      throw new Error(l);
  }
}
Gt.validateKeywordUsage = tR;
var Fr = {};
Object.defineProperty(Fr, "__esModule", { value: !0 });
Fr.extendSubschemaMode = Fr.extendSubschemaData = Fr.getSubschema = void 0;
const qt = ie, tg = K;
function rR(e, { keyword: t, schemaProp: r, schema: n, schemaPath: i, errSchemaPath: o, topSchemaRef: a }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const s = e.schema[t];
    return r === void 0 ? {
      schema: s,
      schemaPath: (0, qt._)`${e.schemaPath}${(0, qt.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: s[r],
      schemaPath: (0, qt._)`${e.schemaPath}${(0, qt.getProperty)(t)}${(0, qt.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, tg.escapeFragment)(r)}`
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
Fr.getSubschema = rR;
function nR(e, t, { dataProp: r, dataPropType: n, data: i, dataTypes: o, propertyName: a }) {
  if (i !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: s } = t;
  if (r !== void 0) {
    const { errorPath: f, dataPathArr: u, opts: c } = t, d = s.let("data", (0, qt._)`${t.data}${(0, qt.getProperty)(r)}`, !0);
    l(d), e.errorPath = (0, qt.str)`${f}${(0, tg.getErrorPath)(r, n, c.jsPropertySyntax)}`, e.parentDataProperty = (0, qt._)`${r}`, e.dataPathArr = [...u, e.parentDataProperty];
  }
  if (i !== void 0) {
    const f = i instanceof qt.Name ? i : s.let("data", i, !0);
    l(f), a !== void 0 && (e.propertyName = a);
  }
  o && (e.dataTypes = o);
  function l(f) {
    e.data = f, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, f];
  }
}
Fr.extendSubschemaData = nR;
function iR(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: i, allErrors: o }) {
  n !== void 0 && (e.compositeRule = n), i !== void 0 && (e.createErrors = i), o !== void 0 && (e.allErrors = o), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Fr.extendSubschemaMode = iR;
var Ve = {}, rg = function e(t, r) {
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
}, ng = { exports: {} }, kr = ng.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, i = r.post || function() {
  };
  Ea(t, n, i, e, "", e);
};
kr.keywords = {
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
kr.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
kr.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
kr.skipKeywords = {
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
function Ea(e, t, r, n, i, o, a, s, l, f) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, i, o, a, s, l, f);
    for (var u in n) {
      var c = n[u];
      if (Array.isArray(c)) {
        if (u in kr.arrayKeywords)
          for (var d = 0; d < c.length; d++)
            Ea(e, t, r, c[d], i + "/" + u + "/" + d, o, i, u, n, d);
      } else if (u in kr.propsKeywords) {
        if (c && typeof c == "object")
          for (var h in c)
            Ea(e, t, r, c[h], i + "/" + u + "/" + oR(h), o, i, u, n, h);
      } else (u in kr.keywords || e.allKeys && !(u in kr.skipKeywords)) && Ea(e, t, r, c, i + "/" + u, o, i, u, n);
    }
    r(n, i, o, a, s, l, f);
  }
}
function oR(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var aR = ng.exports;
Object.defineProperty(Ve, "__esModule", { value: !0 });
Ve.getSchemaRefs = Ve.resolveUrl = Ve.normalizeId = Ve._getFullPath = Ve.getFullPath = Ve.inlineRef = void 0;
const sR = K, lR = rg, cR = aR, uR = /* @__PURE__ */ new Set([
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
function fR(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !lc(e) : t ? ig(e) <= t : !1;
}
Ve.inlineRef = fR;
const dR = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function lc(e) {
  for (const t in e) {
    if (dR.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(lc) || typeof r == "object" && lc(r))
      return !0;
  }
  return !1;
}
function ig(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !uR.has(r) && (typeof e[r] == "object" && (0, sR.eachItem)(e[r], (n) => t += ig(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function og(e, t = "", r) {
  r !== !1 && (t = ei(t));
  const n = e.parse(t);
  return ag(e, n);
}
Ve.getFullPath = og;
function ag(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Ve._getFullPath = ag;
const hR = /#\/?$/;
function ei(e) {
  return e ? e.replace(hR, "") : "";
}
Ve.normalizeId = ei;
function pR(e, t, r) {
  return r = ei(r), e.resolve(t, r);
}
Ve.resolveUrl = pR;
const mR = /^[a-z_][-a-z0-9._]*$/i;
function yR(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, i = ei(e[r] || t), o = { "": i }, a = og(n, i, !1), s = {}, l = /* @__PURE__ */ new Set();
  return cR(e, { allKeys: !0 }, (c, d, h, m) => {
    if (m === void 0)
      return;
    const y = a + d;
    let g = o[m];
    typeof c[r] == "string" && (g = $.call(this, c[r])), w.call(this, c.$anchor), w.call(this, c.$dynamicAnchor), o[d] = g;
    function $(O) {
      const N = this.opts.uriResolver.resolve;
      if (O = ei(g ? N(g, O) : O), l.has(O))
        throw u(O);
      l.add(O);
      let j = this.refs[O];
      return typeof j == "string" && (j = this.refs[j]), typeof j == "object" ? f(c, j.schema, O) : O !== ei(y) && (O[0] === "#" ? (f(c, s[O], O), s[O] = c) : this.refs[O] = y), O;
    }
    function w(O) {
      if (typeof O == "string") {
        if (!mR.test(O))
          throw new Error(`invalid anchor "${O}"`);
        $.call(this, `#${O}`);
      }
    }
  }), s;
  function f(c, d, h) {
    if (d !== void 0 && !lR(c, d))
      throw u(h);
  }
  function u(c) {
    return new Error(`reference "${c}" resolves to more than one schema`);
  }
}
Ve.getSchemaRefs = yR;
Object.defineProperty(Ot, "__esModule", { value: !0 });
Ot.getData = Ot.KeywordCxt = Ot.validateFunctionCode = void 0;
const sg = ai, Jh = ke, pu = or, Ba = ke, gR = Cs, eo = Gt, Pl = Fr, Q = ie, ne = St, vR = Ve, ar = K, Hi = Bo;
function $R(e) {
  if (ug(e) && (fg(e), cg(e))) {
    ER(e);
    return;
  }
  lg(e, () => (0, sg.topBoolOrEmptySchema)(e));
}
Ot.validateFunctionCode = $R;
function lg({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: i }, o) {
  i.code.es5 ? e.func(t, (0, Q._)`${ne.default.data}, ${ne.default.valCxt}`, n.$async, () => {
    e.code((0, Q._)`"use strict"; ${Qh(r, i)}`), wR(e, i), e.code(o);
  }) : e.func(t, (0, Q._)`${ne.default.data}, ${_R(i)}`, n.$async, () => e.code(Qh(r, i)).code(o));
}
function _R(e) {
  return (0, Q._)`{${ne.default.instancePath}="", ${ne.default.parentData}, ${ne.default.parentDataProperty}, ${ne.default.rootData}=${ne.default.data}${e.dynamicRef ? (0, Q._)`, ${ne.default.dynamicAnchors}={}` : Q.nil}}={}`;
}
function wR(e, t) {
  e.if(ne.default.valCxt, () => {
    e.var(ne.default.instancePath, (0, Q._)`${ne.default.valCxt}.${ne.default.instancePath}`), e.var(ne.default.parentData, (0, Q._)`${ne.default.valCxt}.${ne.default.parentData}`), e.var(ne.default.parentDataProperty, (0, Q._)`${ne.default.valCxt}.${ne.default.parentDataProperty}`), e.var(ne.default.rootData, (0, Q._)`${ne.default.valCxt}.${ne.default.rootData}`), t.dynamicRef && e.var(ne.default.dynamicAnchors, (0, Q._)`${ne.default.valCxt}.${ne.default.dynamicAnchors}`);
  }, () => {
    e.var(ne.default.instancePath, (0, Q._)`""`), e.var(ne.default.parentData, (0, Q._)`undefined`), e.var(ne.default.parentDataProperty, (0, Q._)`undefined`), e.var(ne.default.rootData, ne.default.data), t.dynamicRef && e.var(ne.default.dynamicAnchors, (0, Q._)`{}`);
  });
}
function ER(e) {
  const { schema: t, opts: r, gen: n } = e;
  lg(e, () => {
    r.$comment && t.$comment && hg(e), PR(e), n.let(ne.default.vErrors, null), n.let(ne.default.errors, 0), r.unevaluated && SR(e), dg(e), IR(e);
  });
}
function SR(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, Q._)`${r}.evaluated`), t.if((0, Q._)`${e.evaluated}.dynamicProps`, () => t.assign((0, Q._)`${e.evaluated}.props`, (0, Q._)`undefined`)), t.if((0, Q._)`${e.evaluated}.dynamicItems`, () => t.assign((0, Q._)`${e.evaluated}.items`, (0, Q._)`undefined`));
}
function Qh(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, Q._)`/*# sourceURL=${r} */` : Q.nil;
}
function bR(e, t) {
  if (ug(e) && (fg(e), cg(e))) {
    AR(e, t);
    return;
  }
  (0, sg.boolOrEmptySchema)(e, t);
}
function cg({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function ug(e) {
  return typeof e.schema != "boolean";
}
function AR(e, t) {
  const { schema: r, gen: n, opts: i } = e;
  i.$comment && r.$comment && hg(e), CR(e), OR(e);
  const o = n.const("_errs", ne.default.errors);
  dg(e, o), n.var(t, (0, Q._)`${o} === ${ne.default.errors}`);
}
function fg(e) {
  (0, ar.checkUnknownRules)(e), TR(e);
}
function dg(e, t) {
  if (e.opts.jtd)
    return Zh(e, [], !1, t);
  const r = (0, Jh.getSchemaTypes)(e.schema), n = (0, Jh.coerceAndCheckDataType)(e, r);
  Zh(e, r, !n, t);
}
function TR(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: i } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, ar.schemaHasRulesButRef)(t, i.RULES) && i.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function PR(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, ar.checkStrictMode)(e, "default is ignored in the schema root");
}
function CR(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, vR.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function OR(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function hg({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: i }) {
  const o = r.$comment;
  if (i.$comment === !0)
    e.code((0, Q._)`${ne.default.self}.logger.log(${o})`);
  else if (typeof i.$comment == "function") {
    const a = (0, Q.str)`${n}/$comment`, s = e.scopeValue("root", { ref: t.root });
    e.code((0, Q._)`${ne.default.self}.opts.$comment(${o}, ${a}, ${s}.schema)`);
  }
}
function IR(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: i, opts: o } = e;
  r.$async ? t.if((0, Q._)`${ne.default.errors} === 0`, () => t.return(ne.default.data), () => t.throw((0, Q._)`new ${i}(${ne.default.vErrors})`)) : (t.assign((0, Q._)`${n}.errors`, ne.default.vErrors), o.unevaluated && NR(e), t.return((0, Q._)`${ne.default.errors} === 0`));
}
function NR({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof Q.Name && e.assign((0, Q._)`${t}.props`, r), n instanceof Q.Name && e.assign((0, Q._)`${t}.items`, n);
}
function Zh(e, t, r, n) {
  const { gen: i, schema: o, data: a, allErrors: s, opts: l, self: f } = e, { RULES: u } = f;
  if (o.$ref && (l.ignoreKeywordsWithRef || !(0, ar.schemaHasRulesButRef)(o, u))) {
    i.block(() => yg(e, "$ref", u.all.$ref.definition));
    return;
  }
  l.jtd || RR(e, t), i.block(() => {
    for (const d of u.rules)
      c(d);
    c(u.post);
  });
  function c(d) {
    (0, pu.shouldUseGroup)(o, d) && (d.type ? (i.if((0, Ba.checkDataType)(d.type, a, l.strictNumbers)), ep(e, d), t.length === 1 && t[0] === d.type && r && (i.else(), (0, Ba.reportTypeError)(e)), i.endIf()) : ep(e, d), s || i.if((0, Q._)`${ne.default.errors} === ${n || 0}`));
  }
}
function ep(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: i } } = e;
  i && (0, gR.assignDefaults)(e, t.type), r.block(() => {
    for (const o of t.rules)
      (0, pu.shouldUseRule)(n, o) && yg(e, o.keyword, o.definition, t.type);
  });
}
function RR(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (DR(e, t), e.opts.allowUnionTypes || kR(e, t), xR(e, e.dataTypes));
}
function DR(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      pg(e.dataTypes, r) || mu(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), LR(e, t);
  }
}
function kR(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && mu(e, "use allowUnionTypes to allow union type keyword");
}
function xR(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const i = r[n];
    if (typeof i == "object" && (0, pu.shouldUseRule)(e.schema, i)) {
      const { type: o } = i.definition;
      o.length && !o.some((a) => FR(t, a)) && mu(e, `missing type "${o.join(",")}" for keyword "${n}"`);
    }
  }
}
function FR(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function pg(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function LR(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    pg(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function mu(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, ar.checkStrictMode)(e, t, e.opts.strictTypes);
}
class mg {
  constructor(t, r, n) {
    if ((0, eo.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, ar.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", gg(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, eo.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", ne.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, Q.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, Q.not)(t), void 0, r);
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
    this.fail((0, Q._)`${r} !== undefined && (${(0, Q.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? Hi.reportExtraError : Hi.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Hi.reportError)(this, this.def.$dataError || Hi.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Hi.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = Q.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = Q.nil, r = Q.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: i, schemaType: o, def: a } = this;
    n.if((0, Q.or)((0, Q._)`${i} === undefined`, r)), t !== Q.nil && n.assign(t, !0), (o.length || a.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== Q.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: i, it: o } = this;
    return (0, Q.or)(a(), s());
    function a() {
      if (n.length) {
        if (!(r instanceof Q.Name))
          throw new Error("ajv implementation error");
        const l = Array.isArray(n) ? n : [n];
        return (0, Q._)`${(0, Ba.checkDataTypes)(l, r, o.opts.strictNumbers, Ba.DataType.Wrong)}`;
      }
      return Q.nil;
    }
    function s() {
      if (i.validateSchema) {
        const l = t.scopeValue("validate$data", { ref: i.validateSchema });
        return (0, Q._)`!${l}(${r})`;
      }
      return Q.nil;
    }
  }
  subschema(t, r) {
    const n = (0, Pl.getSubschema)(this.it, t);
    (0, Pl.extendSubschemaData)(n, this.it, t), (0, Pl.extendSubschemaMode)(n, t);
    const i = { ...this.it, ...n, items: void 0, props: void 0 };
    return bR(i, r), i;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: i } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = ar.mergeEvaluated.props(i, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = ar.mergeEvaluated.items(i, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: i } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return i.if(r, () => this.mergeEvaluated(t, Q.Name)), !0;
  }
}
Ot.KeywordCxt = mg;
function yg(e, t, r, n) {
  const i = new mg(e, r, t);
  "code" in r ? r.code(i, n) : i.$data && r.validate ? (0, eo.funcKeywordCode)(i, r) : "macro" in r ? (0, eo.macroKeywordCode)(i, r) : (r.compile || r.validate) && (0, eo.funcKeywordCode)(i, r);
}
const UR = /^\/(?:[^~]|~0|~1)*$/, MR = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function gg(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let i, o;
  if (e === "")
    return ne.default.rootData;
  if (e[0] === "/") {
    if (!UR.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    i = e, o = ne.default.rootData;
  } else {
    const f = MR.exec(e);
    if (!f)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const u = +f[1];
    if (i = f[2], i === "#") {
      if (u >= t)
        throw new Error(l("property/index", u));
      return n[t - u];
    }
    if (u > t)
      throw new Error(l("data", u));
    if (o = r[t - u], !i)
      return o;
  }
  let a = o;
  const s = i.split("/");
  for (const f of s)
    f && (o = (0, Q._)`${o}${(0, Q.getProperty)((0, ar.unescapeJsonPointer)(f))}`, a = (0, Q._)`${a} && ${o}`);
  return a;
  function l(f, u) {
    return `Cannot access ${f} ${u} levels up, current level is ${t}`;
  }
}
Ot.getData = gg;
var mi = {};
Object.defineProperty(mi, "__esModule", { value: !0 });
class jR extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
mi.default = jR;
var An = {};
Object.defineProperty(An, "__esModule", { value: !0 });
const Cl = Ve;
class BR extends Error {
  constructor(t, r, n, i) {
    super(i || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, Cl.resolveUrl)(t, r, n), this.missingSchema = (0, Cl.normalizeId)((0, Cl.getFullPath)(t, this.missingRef));
  }
}
An.default = BR;
var at = {};
Object.defineProperty(at, "__esModule", { value: !0 });
at.resolveSchema = at.getCompilingSchema = at.resolveRef = at.compileSchema = at.SchemaEnv = void 0;
const Rt = ie, HR = mi, on = St, xt = Ve, tp = K, qR = Ot;
class Os {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, xt.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
at.SchemaEnv = Os;
function yu(e) {
  const t = vg.call(this, e);
  if (t)
    return t;
  const r = (0, xt.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: i } = this.opts.code, { ownProperties: o } = this.opts, a = new Rt.CodeGen(this.scope, { es5: n, lines: i, ownProperties: o });
  let s;
  e.$async && (s = a.scopeValue("Error", {
    ref: HR.default,
    code: (0, Rt._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const l = a.scopeName("validate");
  e.validateName = l;
  const f = {
    gen: a,
    allErrors: this.opts.allErrors,
    data: on.default.data,
    parentData: on.default.parentData,
    parentDataProperty: on.default.parentDataProperty,
    dataNames: [on.default.data],
    dataPathArr: [Rt.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: a.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Rt.stringify)(e.schema) } : { ref: e.schema }),
    validateName: l,
    ValidationError: s,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Rt.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Rt._)`""`,
    opts: this.opts,
    self: this
  };
  let u;
  try {
    this._compilations.add(e), (0, qR.validateFunctionCode)(f), a.optimize(this.opts.code.optimize);
    const c = a.toString();
    u = `${a.scopeRefs(on.default.scope)}return ${c}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const h = new Function(`${on.default.self}`, `${on.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(l, { ref: h }), h.errors = null, h.schema = e.schema, h.schemaEnv = e, e.$async && (h.$async = !0), this.opts.code.source === !0 && (h.source = { validateName: l, validateCode: c, scopeValues: a._values }), this.opts.unevaluated) {
      const { props: m, items: y } = f;
      h.evaluated = {
        props: m instanceof Rt.Name ? void 0 : m,
        items: y instanceof Rt.Name ? void 0 : y,
        dynamicProps: m instanceof Rt.Name,
        dynamicItems: y instanceof Rt.Name
      }, h.source && (h.source.evaluated = (0, Rt.stringify)(h.evaluated));
    }
    return e.validate = h, e;
  } catch (c) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), c;
  } finally {
    this._compilations.delete(e);
  }
}
at.compileSchema = yu;
function GR(e, t, r) {
  var n;
  r = (0, xt.resolveUrl)(this.opts.uriResolver, t, r);
  const i = e.refs[r];
  if (i)
    return i;
  let o = WR.call(this, e, r);
  if (o === void 0) {
    const a = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: s } = this.opts;
    a && (o = new Os({ schema: a, schemaId: s, root: e, baseId: t }));
  }
  if (o !== void 0)
    return e.refs[r] = VR.call(this, o);
}
at.resolveRef = GR;
function VR(e) {
  return (0, xt.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : yu.call(this, e);
}
function vg(e) {
  for (const t of this._compilations)
    if (zR(t, e))
      return t;
}
at.getCompilingSchema = vg;
function zR(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function WR(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || Is.call(this, e, t);
}
function Is(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, xt._getFullPath)(this.opts.uriResolver, r);
  let i = (0, xt.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === i)
    return Ol.call(this, r, e);
  const o = (0, xt.normalizeId)(n), a = this.refs[o] || this.schemas[o];
  if (typeof a == "string") {
    const s = Is.call(this, e, a);
    return typeof (s == null ? void 0 : s.schema) != "object" ? void 0 : Ol.call(this, r, s);
  }
  if (typeof (a == null ? void 0 : a.schema) == "object") {
    if (a.validate || yu.call(this, a), o === (0, xt.normalizeId)(t)) {
      const { schema: s } = a, { schemaId: l } = this.opts, f = s[l];
      return f && (i = (0, xt.resolveUrl)(this.opts.uriResolver, i, f)), new Os({ schema: s, schemaId: l, root: e, baseId: i });
    }
    return Ol.call(this, r, a);
  }
}
at.resolveSchema = Is;
const YR = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Ol(e, { baseId: t, schema: r, root: n }) {
  var i;
  if (((i = e.fragment) === null || i === void 0 ? void 0 : i[0]) !== "/")
    return;
  for (const s of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const l = r[(0, tp.unescapeFragment)(s)];
    if (l === void 0)
      return;
    r = l;
    const f = typeof r == "object" && r[this.opts.schemaId];
    !YR.has(s) && f && (t = (0, xt.resolveUrl)(this.opts.uriResolver, t, f));
  }
  let o;
  if (typeof r != "boolean" && r.$ref && !(0, tp.schemaHasRulesButRef)(r, this.RULES)) {
    const s = (0, xt.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    o = Is.call(this, n, s);
  }
  const { schemaId: a } = this.opts;
  if (o = o || new Os({ schema: r, schemaId: a, root: n, baseId: t }), o.schema !== o.root.schema)
    return o;
}
const KR = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", XR = "Meta-schema for $data reference (JSON AnySchema extension proposal)", JR = "object", QR = [
  "$data"
], ZR = {
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
}, eD = !1, tD = {
  $id: KR,
  description: XR,
  type: JR,
  required: QR,
  properties: ZR,
  additionalProperties: eD
};
var gu = {}, Ns = { exports: {} };
const rD = {
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
var nD = {
  HEX: rD
};
const { HEX: iD } = nD, oD = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u;
function $g(e) {
  if (wg(e, ".") < 3)
    return { host: e, isIPV4: !1 };
  const t = e.match(oD) || [], [r] = t;
  return r ? { host: sD(r, "."), isIPV4: !0 } : { host: e, isIPV4: !1 };
}
function rp(e, t = !1) {
  let r = "", n = !0;
  for (const i of e) {
    if (iD[i] === void 0) return;
    i !== "0" && n === !0 && (n = !1), n || (r += i);
  }
  return t && r.length === 0 && (r = "0"), r;
}
function aD(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], i = [];
  let o = !1, a = !1, s = !1;
  function l() {
    if (i.length) {
      if (o === !1) {
        const f = rp(i);
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
    const u = e[f];
    if (!(u === "[" || u === "]"))
      if (u === ":") {
        if (a === !0 && (s = !0), !l())
          break;
        if (t++, n.push(":"), t > 7) {
          r.error = !0;
          break;
        }
        f - 1 >= 0 && e[f - 1] === ":" && (a = !0);
        continue;
      } else if (u === "%") {
        if (!l())
          break;
        o = !0;
      } else {
        i.push(u);
        continue;
      }
  }
  return i.length && (o ? r.zone = i.join("") : s ? n.push(i.join("")) : n.push(rp(i))), r.address = n.join(""), r;
}
function _g(e) {
  if (wg(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = aD(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, escapedHost: n, isIPV6: !0 };
  }
}
function sD(e, t) {
  let r = "", n = !0;
  const i = e.length;
  for (let o = 0; o < i; o++) {
    const a = e[o];
    a === "0" && n ? (o + 1 <= i && e[o + 1] === t || o + 1 === i) && (r += a, n = !1) : (a === t ? n = !0 : n = !1, r += a);
  }
  return r;
}
function wg(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
const np = /^\.\.?\//u, ip = /^\/\.(?:\/|$)/u, op = /^\/\.\.(?:\/|$)/u, lD = /^\/?(?:.|\n)*?(?=\/|$)/u;
function cD(e) {
  const t = [];
  for (; e.length; )
    if (e.match(np))
      e = e.replace(np, "");
    else if (e.match(ip))
      e = e.replace(ip, "/");
    else if (e.match(op))
      e = e.replace(op, "/"), t.pop();
    else if (e === "." || e === "..")
      e = "";
    else {
      const r = e.match(lD);
      if (r) {
        const n = r[0];
        e = e.slice(n.length), t.push(n);
      } else
        throw new Error("Unexpected dot segment condition");
    }
  return t.join("");
}
function uD(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function fD(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    const n = $g(r);
    if (n.isIPV4)
      r = n.host;
    else {
      const i = _g(n.host);
      i.isIPV6 === !0 ? r = `[${i.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var dD = {
  recomposeAuthority: fD,
  normalizeComponentEncoding: uD,
  removeDotSegments: cD,
  normalizeIPv4: $g,
  normalizeIPv6: _g
};
const hD = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu, pD = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function Eg(e) {
  return typeof e.secure == "boolean" ? e.secure : String(e.scheme).toLowerCase() === "wss";
}
function Sg(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function bg(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function mD(e) {
  return e.secure = Eg(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function yD(e) {
  if ((e.port === (Eg(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function gD(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(pD);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const i = `${n}:${t.nid || e.nid}`, o = vu[i];
    e.path = void 0, o && (e = o.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function vD(e, t) {
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), i = `${r}:${t.nid || n}`, o = vu[i];
  o && (e = o.serialize(e, t));
  const a = e, s = e.nss;
  return a.path = `${n || t.nid}:${s}`, t.skipEscape = !0, a;
}
function $D(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !hD.test(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function _D(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const Ag = {
  scheme: "http",
  domainHost: !0,
  parse: Sg,
  serialize: bg
}, wD = {
  scheme: "https",
  domainHost: Ag.domainHost,
  parse: Sg,
  serialize: bg
}, Sa = {
  scheme: "ws",
  domainHost: !0,
  parse: mD,
  serialize: yD
}, ED = {
  scheme: "wss",
  domainHost: Sa.domainHost,
  parse: Sa.parse,
  serialize: Sa.serialize
}, SD = {
  scheme: "urn",
  parse: gD,
  serialize: vD,
  skipNormalize: !0
}, bD = {
  scheme: "urn:uuid",
  parse: $D,
  serialize: _D,
  skipNormalize: !0
}, vu = {
  http: Ag,
  https: wD,
  ws: Sa,
  wss: ED,
  urn: SD,
  "urn:uuid": bD
};
var AD = vu;
const { normalizeIPv6: TD, normalizeIPv4: PD, removeDotSegments: zi, recomposeAuthority: CD, normalizeComponentEncoding: fa } = dD, $u = AD;
function OD(e, t) {
  return typeof e == "string" ? e = Vt(ur(e, t), t) : typeof e == "object" && (e = ur(Vt(e, t), t)), e;
}
function ID(e, t, r) {
  const n = Object.assign({ scheme: "null" }, r), i = Tg(ur(e, n), ur(t, n), n, !0);
  return Vt(i, { ...n, skipEscape: !0 });
}
function Tg(e, t, r, n) {
  const i = {};
  return n || (e = ur(Vt(e, r), r), t = ur(Vt(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (i.scheme = t.scheme, i.userinfo = t.userinfo, i.host = t.host, i.port = t.port, i.path = zi(t.path || ""), i.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (i.userinfo = t.userinfo, i.host = t.host, i.port = t.port, i.path = zi(t.path || ""), i.query = t.query) : (t.path ? (t.path.charAt(0) === "/" ? i.path = zi(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? i.path = "/" + t.path : e.path ? i.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : i.path = t.path, i.path = zi(i.path)), i.query = t.query) : (i.path = e.path, t.query !== void 0 ? i.query = t.query : i.query = e.query), i.userinfo = e.userinfo, i.host = e.host, i.port = e.port), i.scheme = e.scheme), i.fragment = t.fragment, i;
}
function ND(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = Vt(fa(ur(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = Vt(fa(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = Vt(fa(ur(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = Vt(fa(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function Vt(e, t) {
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
  }, n = Object.assign({}, t), i = [], o = $u[(n.scheme || r.scheme || "").toLowerCase()];
  o && o.serialize && o.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && i.push(r.scheme, ":");
  const a = CD(r);
  if (a !== void 0 && (n.reference !== "suffix" && i.push("//"), i.push(a), r.path && r.path.charAt(0) !== "/" && i.push("/")), r.path !== void 0) {
    let s = r.path;
    !n.absolutePath && (!o || !o.absolutePath) && (s = zi(s)), a === void 0 && (s = s.replace(/^\/\//u, "/%2F")), i.push(s);
  }
  return r.query !== void 0 && i.push("?", r.query), r.fragment !== void 0 && i.push("#", r.fragment), i.join("");
}
const RD = Array.from({ length: 127 }, (e, t) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(t)));
function DD(e) {
  let t = 0;
  for (let r = 0, n = e.length; r < n; ++r)
    if (t = e.charCodeAt(r), t > 126 || RD[t])
      return !0;
  return !1;
}
const kD = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function ur(e, t) {
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
  const a = e.match(kD);
  if (a) {
    if (n.scheme = a[1], n.userinfo = a[3], n.host = a[4], n.port = parseInt(a[5], 10), n.path = a[6] || "", n.query = a[7], n.fragment = a[8], isNaN(n.port) && (n.port = a[5]), n.host) {
      const l = PD(n.host);
      if (l.isIPV4 === !1) {
        const f = TD(l.host);
        n.host = f.host.toLowerCase(), o = f.isIPV6;
      } else
        n.host = l.host, o = !0;
    }
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const s = $u[(r.scheme || n.scheme || "").toLowerCase()];
    if (!r.unicodeSupport && (!s || !s.unicodeSupport) && n.host && (r.domainHost || s && s.domainHost) && o === !1 && DD(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (l) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + l;
      }
    (!s || s && !s.skipNormalize) && (i && n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), i && n.host !== void 0 && (n.host = unescape(n.host)), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), s && s.parse && s.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const _u = {
  SCHEMES: $u,
  normalize: OD,
  resolve: ID,
  resolveComponents: Tg,
  equal: ND,
  serialize: Vt,
  parse: ur
};
Ns.exports = _u;
Ns.exports.default = _u;
Ns.exports.fastUri = _u;
var xD = Ns.exports;
Object.defineProperty(gu, "__esModule", { value: !0 });
const Pg = xD;
Pg.code = 'require("ajv/dist/runtime/uri").default';
gu.default = Pg;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = Ot;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = ie;
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
  const n = mi, i = An, o = $n, a = at, s = ie, l = Ve, f = ke, u = K, c = tD, d = gu, h = (U, T) => new RegExp(U, T);
  h.code = "new RegExp";
  const m = ["removeAdditional", "useDefaults", "coerceTypes"], y = /* @__PURE__ */ new Set([
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
  }, $ = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, w = 200;
  function O(U) {
    var T, R, P, _, b, M, v, p, D, A, te, he, ye, Ce, Ie, bt, we, it, Xr, hr, Jt, pr, _i, wi, Ei;
    const Jr = U.strict, mr = (T = U.code) === null || T === void 0 ? void 0 : T.optimize, Tn = mr === !0 || mr === void 0 ? 1 : mr || 0, Si = (P = (R = U.code) === null || R === void 0 ? void 0 : R.regExp) !== null && P !== void 0 ? P : h, At = (_ = U.uriResolver) !== null && _ !== void 0 ? _ : d.default;
    return {
      strictSchema: (M = (b = U.strictSchema) !== null && b !== void 0 ? b : Jr) !== null && M !== void 0 ? M : !0,
      strictNumbers: (p = (v = U.strictNumbers) !== null && v !== void 0 ? v : Jr) !== null && p !== void 0 ? p : !0,
      strictTypes: (A = (D = U.strictTypes) !== null && D !== void 0 ? D : Jr) !== null && A !== void 0 ? A : "log",
      strictTuples: (he = (te = U.strictTuples) !== null && te !== void 0 ? te : Jr) !== null && he !== void 0 ? he : "log",
      strictRequired: (Ce = (ye = U.strictRequired) !== null && ye !== void 0 ? ye : Jr) !== null && Ce !== void 0 ? Ce : !1,
      code: U.code ? { ...U.code, optimize: Tn, regExp: Si } : { optimize: Tn, regExp: Si },
      loopRequired: (Ie = U.loopRequired) !== null && Ie !== void 0 ? Ie : w,
      loopEnum: (bt = U.loopEnum) !== null && bt !== void 0 ? bt : w,
      meta: (we = U.meta) !== null && we !== void 0 ? we : !0,
      messages: (it = U.messages) !== null && it !== void 0 ? it : !0,
      inlineRefs: (Xr = U.inlineRefs) !== null && Xr !== void 0 ? Xr : !0,
      schemaId: (hr = U.schemaId) !== null && hr !== void 0 ? hr : "$id",
      addUsedSchema: (Jt = U.addUsedSchema) !== null && Jt !== void 0 ? Jt : !0,
      validateSchema: (pr = U.validateSchema) !== null && pr !== void 0 ? pr : !0,
      validateFormats: (_i = U.validateFormats) !== null && _i !== void 0 ? _i : !0,
      unicodeRegExp: (wi = U.unicodeRegExp) !== null && wi !== void 0 ? wi : !0,
      int32range: (Ei = U.int32range) !== null && Ei !== void 0 ? Ei : !0,
      uriResolver: At
    };
  }
  class N {
    constructor(T = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), T = this.opts = { ...T, ...O(T) };
      const { es5: R, lines: P } = this.opts.code;
      this.scope = new s.ValueScope({ scope: {}, prefixes: y, es5: R, lines: P }), this.logger = z(T.logger);
      const _ = T.validateFormats;
      T.validateFormats = !1, this.RULES = (0, o.getRules)(), j.call(this, g, T, "NOT SUPPORTED"), j.call(this, $, T, "DEPRECATED", "warn"), this._metaOpts = Y.call(this), T.formats && q.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), T.keywords && E.call(this, T.keywords), typeof T.meta == "object" && this.addMetaSchema(T.meta), F.call(this), T.validateFormats = _;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: T, meta: R, schemaId: P } = this.opts;
      let _ = c;
      P === "id" && (_ = { ...c }, _.id = _.$id, delete _.$id), R && T && this.addMetaSchema(_, _[P], !1);
    }
    defaultMeta() {
      const { meta: T, schemaId: R } = this.opts;
      return this.opts.defaultMeta = typeof T == "object" ? T[R] || T : void 0;
    }
    validate(T, R) {
      let P;
      if (typeof T == "string") {
        if (P = this.getSchema(T), !P)
          throw new Error(`no schema with key or ref "${T}"`);
      } else
        P = this.compile(T);
      const _ = P(R);
      return "$async" in P || (this.errors = P.errors), _;
    }
    compile(T, R) {
      const P = this._addSchema(T, R);
      return P.validate || this._compileSchemaEnv(P);
    }
    compileAsync(T, R) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: P } = this.opts;
      return _.call(this, T, R);
      async function _(A, te) {
        await b.call(this, A.$schema);
        const he = this._addSchema(A, te);
        return he.validate || M.call(this, he);
      }
      async function b(A) {
        A && !this.getSchema(A) && await _.call(this, { $ref: A }, !0);
      }
      async function M(A) {
        try {
          return this._compileSchemaEnv(A);
        } catch (te) {
          if (!(te instanceof i.default))
            throw te;
          return v.call(this, te), await p.call(this, te.missingSchema), M.call(this, A);
        }
      }
      function v({ missingSchema: A, missingRef: te }) {
        if (this.refs[A])
          throw new Error(`AnySchema ${A} is loaded but ${te} cannot be resolved`);
      }
      async function p(A) {
        const te = await D.call(this, A);
        this.refs[A] || await b.call(this, te.$schema), this.refs[A] || this.addSchema(te, A, R);
      }
      async function D(A) {
        const te = this._loading[A];
        if (te)
          return te;
        try {
          return await (this._loading[A] = P(A));
        } finally {
          delete this._loading[A];
        }
      }
    }
    // Adds schema to the instance
    addSchema(T, R, P, _ = this.opts.validateSchema) {
      if (Array.isArray(T)) {
        for (const M of T)
          this.addSchema(M, void 0, P, _);
        return this;
      }
      let b;
      if (typeof T == "object") {
        const { schemaId: M } = this.opts;
        if (b = T[M], b !== void 0 && typeof b != "string")
          throw new Error(`schema ${M} must be string`);
      }
      return R = (0, l.normalizeId)(R || b), this._checkUnique(R), this.schemas[R] = this._addSchema(T, P, R, _, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(T, R, P = this.opts.validateSchema) {
      return this.addSchema(T, R, !0, P), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(T, R) {
      if (typeof T == "boolean")
        return !0;
      let P;
      if (P = T.$schema, P !== void 0 && typeof P != "string")
        throw new Error("$schema must be a string");
      if (P = P || this.opts.defaultMeta || this.defaultMeta(), !P)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const _ = this.validate(P, T);
      if (!_ && R) {
        const b = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(b);
        else
          throw new Error(b);
      }
      return _;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(T) {
      let R;
      for (; typeof (R = I.call(this, T)) == "string"; )
        T = R;
      if (R === void 0) {
        const { schemaId: P } = this.opts, _ = new a.SchemaEnv({ schema: {}, schemaId: P });
        if (R = a.resolveSchema.call(this, _, T), !R)
          return;
        this.refs[T] = R;
      }
      return R.validate || this._compileSchemaEnv(R);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(T) {
      if (T instanceof RegExp)
        return this._removeAllSchemas(this.schemas, T), this._removeAllSchemas(this.refs, T), this;
      switch (typeof T) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const R = I.call(this, T);
          return typeof R == "object" && this._cache.delete(R.schema), delete this.schemas[T], delete this.refs[T], this;
        }
        case "object": {
          const R = T;
          this._cache.delete(R);
          let P = T[this.opts.schemaId];
          return P && (P = (0, l.normalizeId)(P), delete this.schemas[P], delete this.refs[P]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(T) {
      for (const R of T)
        this.addKeyword(R);
      return this;
    }
    addKeyword(T, R) {
      let P;
      if (typeof T == "string")
        P = T, typeof R == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), R.keyword = P);
      else if (typeof T == "object" && R === void 0) {
        if (R = T, P = R.keyword, Array.isArray(P) && !P.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (k.call(this, P, R), !R)
        return (0, u.eachItem)(P, (b) => x.call(this, b)), this;
      L.call(this, R);
      const _ = {
        ...R,
        type: (0, f.getJSONTypes)(R.type),
        schemaType: (0, f.getJSONTypes)(R.schemaType)
      };
      return (0, u.eachItem)(P, _.type.length === 0 ? (b) => x.call(this, b, _) : (b) => _.type.forEach((M) => x.call(this, b, _, M))), this;
    }
    getKeyword(T) {
      const R = this.RULES.all[T];
      return typeof R == "object" ? R.definition : !!R;
    }
    // Remove keyword
    removeKeyword(T) {
      const { RULES: R } = this;
      delete R.keywords[T], delete R.all[T];
      for (const P of R.rules) {
        const _ = P.rules.findIndex((b) => b.keyword === T);
        _ >= 0 && P.rules.splice(_, 1);
      }
      return this;
    }
    // Add format
    addFormat(T, R) {
      return typeof R == "string" && (R = new RegExp(R)), this.formats[T] = R, this;
    }
    errorsText(T = this.errors, { separator: R = ", ", dataVar: P = "data" } = {}) {
      return !T || T.length === 0 ? "No errors" : T.map((_) => `${P}${_.instancePath} ${_.message}`).reduce((_, b) => _ + R + b);
    }
    $dataMetaSchema(T, R) {
      const P = this.RULES.all;
      T = JSON.parse(JSON.stringify(T));
      for (const _ of R) {
        const b = _.split("/").slice(1);
        let M = T;
        for (const v of b)
          M = M[v];
        for (const v in P) {
          const p = P[v];
          if (typeof p != "object")
            continue;
          const { $data: D } = p.definition, A = M[v];
          D && A && (M[v] = V(A));
        }
      }
      return T;
    }
    _removeAllSchemas(T, R) {
      for (const P in T) {
        const _ = T[P];
        (!R || R.test(P)) && (typeof _ == "string" ? delete T[P] : _ && !_.meta && (this._cache.delete(_.schema), delete T[P]));
      }
    }
    _addSchema(T, R, P, _ = this.opts.validateSchema, b = this.opts.addUsedSchema) {
      let M;
      const { schemaId: v } = this.opts;
      if (typeof T == "object")
        M = T[v];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof T != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let p = this._cache.get(T);
      if (p !== void 0)
        return p;
      P = (0, l.normalizeId)(M || P);
      const D = l.getSchemaRefs.call(this, T, P);
      return p = new a.SchemaEnv({ schema: T, schemaId: v, meta: R, baseId: P, localRefs: D }), this._cache.set(p.schema, p), b && !P.startsWith("#") && (P && this._checkUnique(P), this.refs[P] = p), _ && this.validateSchema(T, !0), p;
    }
    _checkUnique(T) {
      if (this.schemas[T] || this.refs[T])
        throw new Error(`schema with key or id "${T}" already exists`);
    }
    _compileSchemaEnv(T) {
      if (T.meta ? this._compileMetaSchema(T) : a.compileSchema.call(this, T), !T.validate)
        throw new Error("ajv implementation error");
      return T.validate;
    }
    _compileMetaSchema(T) {
      const R = this.opts;
      this.opts = this._metaOpts;
      try {
        a.compileSchema.call(this, T);
      } finally {
        this.opts = R;
      }
    }
  }
  N.ValidationError = n.default, N.MissingRefError = i.default, e.default = N;
  function j(U, T, R, P = "error") {
    for (const _ in U) {
      const b = _;
      b in T && this.logger[P](`${R}: option ${_}. ${U[b]}`);
    }
  }
  function I(U) {
    return U = (0, l.normalizeId)(U), this.schemas[U] || this.refs[U];
  }
  function F() {
    const U = this.opts.schemas;
    if (U)
      if (Array.isArray(U))
        this.addSchema(U);
      else
        for (const T in U)
          this.addSchema(U[T], T);
  }
  function q() {
    for (const U in this.opts.formats) {
      const T = this.opts.formats[U];
      T && this.addFormat(U, T);
    }
  }
  function E(U) {
    if (Array.isArray(U)) {
      this.addVocabulary(U);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const T in U) {
      const R = U[T];
      R.keyword || (R.keyword = T), this.addKeyword(R);
    }
  }
  function Y() {
    const U = { ...this.opts };
    for (const T of m)
      delete U[T];
    return U;
  }
  const B = { log() {
  }, warn() {
  }, error() {
  } };
  function z(U) {
    if (U === !1)
      return B;
    if (U === void 0)
      return console;
    if (U.log && U.warn && U.error)
      return U;
    throw new Error("logger must implement log, warn and error methods");
  }
  const X = /^[a-z_$][a-z0-9_$:-]*$/i;
  function k(U, T) {
    const { RULES: R } = this;
    if ((0, u.eachItem)(U, (P) => {
      if (R.keywords[P])
        throw new Error(`Keyword ${P} is already defined`);
      if (!X.test(P))
        throw new Error(`Keyword ${P} has invalid name`);
    }), !!T && T.$data && !("code" in T || "validate" in T))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function x(U, T, R) {
    var P;
    const _ = T == null ? void 0 : T.post;
    if (R && _)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: b } = this;
    let M = _ ? b.post : b.rules.find(({ type: p }) => p === R);
    if (M || (M = { type: R, rules: [] }, b.rules.push(M)), b.keywords[U] = !0, !T)
      return;
    const v = {
      keyword: U,
      definition: {
        ...T,
        type: (0, f.getJSONTypes)(T.type),
        schemaType: (0, f.getJSONTypes)(T.schemaType)
      }
    };
    T.before ? G.call(this, M, v, T.before) : M.rules.push(v), b.all[U] = v, (P = T.implements) === null || P === void 0 || P.forEach((p) => this.addKeyword(p));
  }
  function G(U, T, R) {
    const P = U.rules.findIndex((_) => _.keyword === R);
    P >= 0 ? U.rules.splice(P, 0, T) : (U.rules.push(T), this.logger.warn(`rule ${R} is not defined`));
  }
  function L(U) {
    let { metaSchema: T } = U;
    T !== void 0 && (U.$data && this.opts.$data && (T = V(T)), U.validateSchema = this.compile(T, !0));
  }
  const W = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function V(U) {
    return { anyOf: [U, W] };
  }
})(au);
var wu = {}, Rs = {}, Eu = {};
Object.defineProperty(Eu, "__esModule", { value: !0 });
const FD = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
Eu.default = FD;
var fr = {};
Object.defineProperty(fr, "__esModule", { value: !0 });
fr.callRef = fr.getValidate = void 0;
const LD = An, ap = le, mt = ie, xn = St, sp = at, da = K, UD = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: i, schemaEnv: o, validateName: a, opts: s, self: l } = n, { root: f } = o;
    if ((r === "#" || r === "#/") && i === f.baseId)
      return c();
    const u = sp.resolveRef.call(l, f, i, r);
    if (u === void 0)
      throw new LD.default(n.opts.uriResolver, i, r);
    if (u instanceof sp.SchemaEnv)
      return d(u);
    return h(u);
    function c() {
      if (o === f)
        return ba(e, a, o, o.$async);
      const m = t.scopeValue("root", { ref: f });
      return ba(e, (0, mt._)`${m}.validate`, f, f.$async);
    }
    function d(m) {
      const y = Cg(e, m);
      ba(e, y, m, m.$async);
    }
    function h(m) {
      const y = t.scopeValue("schema", s.code.source === !0 ? { ref: m, code: (0, mt.stringify)(m) } : { ref: m }), g = t.name("valid"), $ = e.subschema({
        schema: m,
        dataTypes: [],
        schemaPath: mt.nil,
        topSchemaRef: y,
        errSchemaPath: r
      }, g);
      e.mergeEvaluated($), e.ok(g);
    }
  }
};
function Cg(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, mt._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
fr.getValidate = Cg;
function ba(e, t, r, n) {
  const { gen: i, it: o } = e, { allErrors: a, schemaEnv: s, opts: l } = o, f = l.passContext ? xn.default.this : mt.nil;
  n ? u() : c();
  function u() {
    if (!s.$async)
      throw new Error("async schema referenced by sync schema");
    const m = i.let("valid");
    i.try(() => {
      i.code((0, mt._)`await ${(0, ap.callValidateCode)(e, t, f)}`), h(t), a || i.assign(m, !0);
    }, (y) => {
      i.if((0, mt._)`!(${y} instanceof ${o.ValidationError})`, () => i.throw(y)), d(y), a || i.assign(m, !1);
    }), e.ok(m);
  }
  function c() {
    e.result((0, ap.callValidateCode)(e, t, f), () => h(t), () => d(t));
  }
  function d(m) {
    const y = (0, mt._)`${m}.errors`;
    i.assign(xn.default.vErrors, (0, mt._)`${xn.default.vErrors} === null ? ${y} : ${xn.default.vErrors}.concat(${y})`), i.assign(xn.default.errors, (0, mt._)`${xn.default.vErrors}.length`);
  }
  function h(m) {
    var y;
    if (!o.opts.unevaluated)
      return;
    const g = (y = r == null ? void 0 : r.validate) === null || y === void 0 ? void 0 : y.evaluated;
    if (o.props !== !0)
      if (g && !g.dynamicProps)
        g.props !== void 0 && (o.props = da.mergeEvaluated.props(i, g.props, o.props));
      else {
        const $ = i.var("props", (0, mt._)`${m}.evaluated.props`);
        o.props = da.mergeEvaluated.props(i, $, o.props, mt.Name);
      }
    if (o.items !== !0)
      if (g && !g.dynamicItems)
        g.items !== void 0 && (o.items = da.mergeEvaluated.items(i, g.items, o.items));
      else {
        const $ = i.var("items", (0, mt._)`${m}.evaluated.items`);
        o.items = da.mergeEvaluated.items(i, $, o.items, mt.Name);
      }
  }
}
fr.callRef = ba;
fr.default = UD;
Object.defineProperty(Rs, "__esModule", { value: !0 });
const MD = Eu, jD = fr, BD = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  MD.default,
  jD.default
];
Rs.default = BD;
var Ds = {}, Su = {};
Object.defineProperty(Su, "__esModule", { value: !0 });
const Ha = ie, br = Ha.operators, qa = {
  maximum: { okStr: "<=", ok: br.LTE, fail: br.GT },
  minimum: { okStr: ">=", ok: br.GTE, fail: br.LT },
  exclusiveMaximum: { okStr: "<", ok: br.LT, fail: br.GTE },
  exclusiveMinimum: { okStr: ">", ok: br.GT, fail: br.LTE }
}, HD = {
  message: ({ keyword: e, schemaCode: t }) => (0, Ha.str)`must be ${qa[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Ha._)`{comparison: ${qa[e].okStr}, limit: ${t}}`
}, qD = {
  keyword: Object.keys(qa),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: HD,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Ha._)`${r} ${qa[t].fail} ${n} || isNaN(${r})`);
  }
};
Su.default = qD;
var bu = {};
Object.defineProperty(bu, "__esModule", { value: !0 });
const to = ie, GD = {
  message: ({ schemaCode: e }) => (0, to.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, to._)`{multipleOf: ${e}}`
}, VD = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: GD,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: i } = e, o = i.opts.multipleOfPrecision, a = t.let("res"), s = o ? (0, to._)`Math.abs(Math.round(${a}) - ${a}) > 1e-${o}` : (0, to._)`${a} !== parseInt(${a})`;
    e.fail$data((0, to._)`(${n} === 0 || (${a} = ${r}/${n}, ${s}))`);
  }
};
bu.default = VD;
var Au = {}, Tu = {};
Object.defineProperty(Tu, "__esModule", { value: !0 });
function Og(e) {
  const t = e.length;
  let r = 0, n = 0, i;
  for (; n < t; )
    r++, i = e.charCodeAt(n++), i >= 55296 && i <= 56319 && n < t && (i = e.charCodeAt(n), (i & 64512) === 56320 && n++);
  return r;
}
Tu.default = Og;
Og.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Au, "__esModule", { value: !0 });
const un = ie, zD = K, WD = Tu, YD = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, un.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, un._)`{limit: ${e}}`
}, KD = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: YD,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: i } = e, o = t === "maxLength" ? un.operators.GT : un.operators.LT, a = i.opts.unicode === !1 ? (0, un._)`${r}.length` : (0, un._)`${(0, zD.useFunc)(e.gen, WD.default)}(${r})`;
    e.fail$data((0, un._)`${a} ${o} ${n}`);
  }
};
Au.default = KD;
var Pu = {};
Object.defineProperty(Pu, "__esModule", { value: !0 });
const XD = le, Ga = ie, JD = {
  message: ({ schemaCode: e }) => (0, Ga.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Ga._)`{pattern: ${e}}`
}, QD = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: JD,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: i, it: o } = e, a = o.opts.unicodeRegExp ? "u" : "", s = r ? (0, Ga._)`(new RegExp(${i}, ${a}))` : (0, XD.usePattern)(e, n);
    e.fail$data((0, Ga._)`!${s}.test(${t})`);
  }
};
Pu.default = QD;
var Cu = {};
Object.defineProperty(Cu, "__esModule", { value: !0 });
const ro = ie, ZD = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, ro.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, ro._)`{limit: ${e}}`
}, ek = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: ZD,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxProperties" ? ro.operators.GT : ro.operators.LT;
    e.fail$data((0, ro._)`Object.keys(${r}).length ${i} ${n}`);
  }
};
Cu.default = ek;
var Ou = {};
Object.defineProperty(Ou, "__esModule", { value: !0 });
const qi = le, no = ie, tk = K, rk = {
  message: ({ params: { missingProperty: e } }) => (0, no.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, no._)`{missingProperty: ${e}}`
}, nk = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: rk,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: i, $data: o, it: a } = e, { opts: s } = a;
    if (!o && r.length === 0)
      return;
    const l = r.length >= s.loopRequired;
    if (a.allErrors ? f() : u(), s.strictRequired) {
      const h = e.parentSchema.properties, { definedProperties: m } = e.it;
      for (const y of r)
        if ((h == null ? void 0 : h[y]) === void 0 && !m.has(y)) {
          const g = a.schemaEnv.baseId + a.errSchemaPath, $ = `required property "${y}" is not defined at "${g}" (strictRequired)`;
          (0, tk.checkStrictMode)(a, $, a.opts.strictRequired);
        }
    }
    function f() {
      if (l || o)
        e.block$data(no.nil, c);
      else
        for (const h of r)
          (0, qi.checkReportMissingProp)(e, h);
    }
    function u() {
      const h = t.let("missing");
      if (l || o) {
        const m = t.let("valid", !0);
        e.block$data(m, () => d(h, m)), e.ok(m);
      } else
        t.if((0, qi.checkMissingProp)(e, r, h)), (0, qi.reportMissingProp)(e, h), t.else();
    }
    function c() {
      t.forOf("prop", n, (h) => {
        e.setParams({ missingProperty: h }), t.if((0, qi.noPropertyInData)(t, i, h, s.ownProperties), () => e.error());
      });
    }
    function d(h, m) {
      e.setParams({ missingProperty: h }), t.forOf(h, n, () => {
        t.assign(m, (0, qi.propertyInData)(t, i, h, s.ownProperties)), t.if((0, no.not)(m), () => {
          e.error(), t.break();
        });
      }, no.nil);
    }
  }
};
Ou.default = nk;
var Iu = {};
Object.defineProperty(Iu, "__esModule", { value: !0 });
const io = ie, ik = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, io.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, io._)`{limit: ${e}}`
}, ok = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: ik,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxItems" ? io.operators.GT : io.operators.LT;
    e.fail$data((0, io._)`${r}.length ${i} ${n}`);
  }
};
Iu.default = ok;
var Nu = {}, Ho = {};
Object.defineProperty(Ho, "__esModule", { value: !0 });
const Ig = rg;
Ig.code = 'require("ajv/dist/runtime/equal").default';
Ho.default = Ig;
Object.defineProperty(Nu, "__esModule", { value: !0 });
const Il = ke, Ge = ie, ak = K, sk = Ho, lk = {
  message: ({ params: { i: e, j: t } }) => (0, Ge.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Ge._)`{i: ${e}, j: ${t}}`
}, ck = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: lk,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, parentSchema: o, schemaCode: a, it: s } = e;
    if (!n && !i)
      return;
    const l = t.let("valid"), f = o.items ? (0, Il.getSchemaTypes)(o.items) : [];
    e.block$data(l, u, (0, Ge._)`${a} === false`), e.ok(l);
    function u() {
      const m = t.let("i", (0, Ge._)`${r}.length`), y = t.let("j");
      e.setParams({ i: m, j: y }), t.assign(l, !0), t.if((0, Ge._)`${m} > 1`, () => (c() ? d : h)(m, y));
    }
    function c() {
      return f.length > 0 && !f.some((m) => m === "object" || m === "array");
    }
    function d(m, y) {
      const g = t.name("item"), $ = (0, Il.checkDataTypes)(f, g, s.opts.strictNumbers, Il.DataType.Wrong), w = t.const("indices", (0, Ge._)`{}`);
      t.for((0, Ge._)`;${m}--;`, () => {
        t.let(g, (0, Ge._)`${r}[${m}]`), t.if($, (0, Ge._)`continue`), f.length > 1 && t.if((0, Ge._)`typeof ${g} == "string"`, (0, Ge._)`${g} += "_"`), t.if((0, Ge._)`typeof ${w}[${g}] == "number"`, () => {
          t.assign(y, (0, Ge._)`${w}[${g}]`), e.error(), t.assign(l, !1).break();
        }).code((0, Ge._)`${w}[${g}] = ${m}`);
      });
    }
    function h(m, y) {
      const g = (0, ak.useFunc)(t, sk.default), $ = t.name("outer");
      t.label($).for((0, Ge._)`;${m}--;`, () => t.for((0, Ge._)`${y} = ${m}; ${y}--;`, () => t.if((0, Ge._)`${g}(${r}[${m}], ${r}[${y}])`, () => {
        e.error(), t.assign(l, !1).break($);
      })));
    }
  }
};
Nu.default = ck;
var Ru = {};
Object.defineProperty(Ru, "__esModule", { value: !0 });
const cc = ie, uk = K, fk = Ho, dk = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, cc._)`{allowedValue: ${e}}`
}, hk = {
  keyword: "const",
  $data: !0,
  error: dk,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: i, schema: o } = e;
    n || o && typeof o == "object" ? e.fail$data((0, cc._)`!${(0, uk.useFunc)(t, fk.default)}(${r}, ${i})`) : e.fail((0, cc._)`${o} !== ${r}`);
  }
};
Ru.default = hk;
var Du = {};
Object.defineProperty(Du, "__esModule", { value: !0 });
const Wi = ie, pk = K, mk = Ho, yk = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Wi._)`{allowedValues: ${e}}`
}, gk = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: yk,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, schemaCode: o, it: a } = e;
    if (!n && i.length === 0)
      throw new Error("enum must have non-empty array");
    const s = i.length >= a.opts.loopEnum;
    let l;
    const f = () => l ?? (l = (0, pk.useFunc)(t, mk.default));
    let u;
    if (s || n)
      u = t.let("valid"), e.block$data(u, c);
    else {
      if (!Array.isArray(i))
        throw new Error("ajv implementation error");
      const h = t.const("vSchema", o);
      u = (0, Wi.or)(...i.map((m, y) => d(h, y)));
    }
    e.pass(u);
    function c() {
      t.assign(u, !1), t.forOf("v", o, (h) => t.if((0, Wi._)`${f()}(${r}, ${h})`, () => t.assign(u, !0).break()));
    }
    function d(h, m) {
      const y = i[m];
      return typeof y == "object" && y !== null ? (0, Wi._)`${f()}(${r}, ${h}[${m}])` : (0, Wi._)`${r} === ${y}`;
    }
  }
};
Du.default = gk;
Object.defineProperty(Ds, "__esModule", { value: !0 });
const vk = Su, $k = bu, _k = Au, wk = Pu, Ek = Cu, Sk = Ou, bk = Iu, Ak = Nu, Tk = Ru, Pk = Du, Ck = [
  // number
  vk.default,
  $k.default,
  // string
  _k.default,
  wk.default,
  // object
  Ek.default,
  Sk.default,
  // array
  bk.default,
  Ak.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  Tk.default,
  Pk.default
];
Ds.default = Ck;
var ks = {}, yi = {};
Object.defineProperty(yi, "__esModule", { value: !0 });
yi.validateAdditionalItems = void 0;
const fn = ie, uc = K, Ok = {
  message: ({ params: { len: e } }) => (0, fn.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, fn._)`{limit: ${e}}`
}, Ik = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: Ok,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, uc.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Ng(e, n);
  }
};
function Ng(e, t) {
  const { gen: r, schema: n, data: i, keyword: o, it: a } = e;
  a.items = !0;
  const s = r.const("len", (0, fn._)`${i}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, fn._)`${s} <= ${t.length}`);
  else if (typeof n == "object" && !(0, uc.alwaysValidSchema)(a, n)) {
    const f = r.var("valid", (0, fn._)`${s} <= ${t.length}`);
    r.if((0, fn.not)(f), () => l(f)), e.ok(f);
  }
  function l(f) {
    r.forRange("i", t.length, s, (u) => {
      e.subschema({ keyword: o, dataProp: u, dataPropType: uc.Type.Num }, f), a.allErrors || r.if((0, fn.not)(f), () => r.break());
    });
  }
}
yi.validateAdditionalItems = Ng;
yi.default = Ik;
var ku = {}, gi = {};
Object.defineProperty(gi, "__esModule", { value: !0 });
gi.validateTuple = void 0;
const lp = ie, Aa = K, Nk = le, Rk = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Rg(e, "additionalItems", t);
    r.items = !0, !(0, Aa.alwaysValidSchema)(r, t) && e.ok((0, Nk.validateArray)(e));
  }
};
function Rg(e, t, r = e.schema) {
  const { gen: n, parentSchema: i, data: o, keyword: a, it: s } = e;
  u(i), s.opts.unevaluated && r.length && s.items !== !0 && (s.items = Aa.mergeEvaluated.items(n, r.length, s.items));
  const l = n.name("valid"), f = n.const("len", (0, lp._)`${o}.length`);
  r.forEach((c, d) => {
    (0, Aa.alwaysValidSchema)(s, c) || (n.if((0, lp._)`${f} > ${d}`, () => e.subschema({
      keyword: a,
      schemaProp: d,
      dataProp: d
    }, l)), e.ok(l));
  });
  function u(c) {
    const { opts: d, errSchemaPath: h } = s, m = r.length, y = m === c.minItems && (m === c.maxItems || c[t] === !1);
    if (d.strictTuples && !y) {
      const g = `"${a}" is ${m}-tuple, but minItems or maxItems/${t} are not specified or different at path "${h}"`;
      (0, Aa.checkStrictMode)(s, g, d.strictTuples);
    }
  }
}
gi.validateTuple = Rg;
gi.default = Rk;
Object.defineProperty(ku, "__esModule", { value: !0 });
const Dk = gi, kk = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, Dk.validateTuple)(e, "items")
};
ku.default = kk;
var xu = {};
Object.defineProperty(xu, "__esModule", { value: !0 });
const cp = ie, xk = K, Fk = le, Lk = yi, Uk = {
  message: ({ params: { len: e } }) => (0, cp.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, cp._)`{limit: ${e}}`
}, Mk = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: Uk,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: i } = r;
    n.items = !0, !(0, xk.alwaysValidSchema)(n, t) && (i ? (0, Lk.validateAdditionalItems)(e, i) : e.ok((0, Fk.validateArray)(e)));
  }
};
xu.default = Mk;
var Fu = {};
Object.defineProperty(Fu, "__esModule", { value: !0 });
const Ct = ie, ha = K, jk = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ct.str)`must contain at least ${e} valid item(s)` : (0, Ct.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ct._)`{minContains: ${e}}` : (0, Ct._)`{minContains: ${e}, maxContains: ${t}}`
}, Bk = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: jk,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: o } = e;
    let a, s;
    const { minContains: l, maxContains: f } = n;
    o.opts.next ? (a = l === void 0 ? 1 : l, s = f) : a = 1;
    const u = t.const("len", (0, Ct._)`${i}.length`);
    if (e.setParams({ min: a, max: s }), s === void 0 && a === 0) {
      (0, ha.checkStrictMode)(o, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (s !== void 0 && a > s) {
      (0, ha.checkStrictMode)(o, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, ha.alwaysValidSchema)(o, r)) {
      let y = (0, Ct._)`${u} >= ${a}`;
      s !== void 0 && (y = (0, Ct._)`${y} && ${u} <= ${s}`), e.pass(y);
      return;
    }
    o.items = !0;
    const c = t.name("valid");
    s === void 0 && a === 1 ? h(c, () => t.if(c, () => t.break())) : a === 0 ? (t.let(c, !0), s !== void 0 && t.if((0, Ct._)`${i}.length > 0`, d)) : (t.let(c, !1), d()), e.result(c, () => e.reset());
    function d() {
      const y = t.name("_valid"), g = t.let("count", 0);
      h(y, () => t.if(y, () => m(g)));
    }
    function h(y, g) {
      t.forRange("i", 0, u, ($) => {
        e.subschema({
          keyword: "contains",
          dataProp: $,
          dataPropType: ha.Type.Num,
          compositeRule: !0
        }, y), g();
      });
    }
    function m(y) {
      t.code((0, Ct._)`${y}++`), s === void 0 ? t.if((0, Ct._)`${y} >= ${a}`, () => t.assign(c, !0).break()) : (t.if((0, Ct._)`${y} > ${s}`, () => t.assign(c, !1).break()), a === 1 ? t.assign(c, !0) : t.if((0, Ct._)`${y} >= ${a}`, () => t.assign(c, !0)));
    }
  }
};
Fu.default = Bk;
var xs = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = ie, r = K, n = le;
  e.error = {
    message: ({ params: { property: l, depsCount: f, deps: u } }) => {
      const c = f === 1 ? "property" : "properties";
      return (0, t.str)`must have ${c} ${u} when property ${l} is present`;
    },
    params: ({ params: { property: l, depsCount: f, deps: u, missingProperty: c } }) => (0, t._)`{property: ${l},
    missingProperty: ${c},
    depsCount: ${f},
    deps: ${u}}`
    // TODO change to reference
  };
  const i = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(l) {
      const [f, u] = o(l);
      a(l, f), s(l, u);
    }
  };
  function o({ schema: l }) {
    const f = {}, u = {};
    for (const c in l) {
      if (c === "__proto__")
        continue;
      const d = Array.isArray(l[c]) ? f : u;
      d[c] = l[c];
    }
    return [f, u];
  }
  function a(l, f = l.schema) {
    const { gen: u, data: c, it: d } = l;
    if (Object.keys(f).length === 0)
      return;
    const h = u.let("missing");
    for (const m in f) {
      const y = f[m];
      if (y.length === 0)
        continue;
      const g = (0, n.propertyInData)(u, c, m, d.opts.ownProperties);
      l.setParams({
        property: m,
        depsCount: y.length,
        deps: y.join(", ")
      }), d.allErrors ? u.if(g, () => {
        for (const $ of y)
          (0, n.checkReportMissingProp)(l, $);
      }) : (u.if((0, t._)`${g} && (${(0, n.checkMissingProp)(l, y, h)})`), (0, n.reportMissingProp)(l, h), u.else());
    }
  }
  e.validatePropertyDeps = a;
  function s(l, f = l.schema) {
    const { gen: u, data: c, keyword: d, it: h } = l, m = u.name("valid");
    for (const y in f)
      (0, r.alwaysValidSchema)(h, f[y]) || (u.if(
        (0, n.propertyInData)(u, c, y, h.opts.ownProperties),
        () => {
          const g = l.subschema({ keyword: d, schemaProp: y }, m);
          l.mergeValidEvaluated(g, m);
        },
        () => u.var(m, !0)
        // TODO var
      ), l.ok(m));
  }
  e.validateSchemaDeps = s, e.default = i;
})(xs);
var Lu = {};
Object.defineProperty(Lu, "__esModule", { value: !0 });
const Dg = ie, Hk = K, qk = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Dg._)`{propertyName: ${e.propertyName}}`
}, Gk = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: qk,
  code(e) {
    const { gen: t, schema: r, data: n, it: i } = e;
    if ((0, Hk.alwaysValidSchema)(i, r))
      return;
    const o = t.name("valid");
    t.forIn("key", n, (a) => {
      e.setParams({ propertyName: a }), e.subschema({
        keyword: "propertyNames",
        data: a,
        dataTypes: ["string"],
        propertyName: a,
        compositeRule: !0
      }, o), t.if((0, Dg.not)(o), () => {
        e.error(!0), i.allErrors || t.break();
      });
    }), e.ok(o);
  }
};
Lu.default = Gk;
var Fs = {};
Object.defineProperty(Fs, "__esModule", { value: !0 });
const pa = le, Dt = ie, Vk = St, ma = K, zk = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Dt._)`{additionalProperty: ${e.additionalProperty}}`
}, Wk = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: zk,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, errsCount: o, it: a } = e;
    if (!o)
      throw new Error("ajv implementation error");
    const { allErrors: s, opts: l } = a;
    if (a.props = !0, l.removeAdditional !== "all" && (0, ma.alwaysValidSchema)(a, r))
      return;
    const f = (0, pa.allSchemaProperties)(n.properties), u = (0, pa.allSchemaProperties)(n.patternProperties);
    c(), e.ok((0, Dt._)`${o} === ${Vk.default.errors}`);
    function c() {
      t.forIn("key", i, (g) => {
        !f.length && !u.length ? m(g) : t.if(d(g), () => m(g));
      });
    }
    function d(g) {
      let $;
      if (f.length > 8) {
        const w = (0, ma.schemaRefOrVal)(a, n.properties, "properties");
        $ = (0, pa.isOwnProperty)(t, w, g);
      } else f.length ? $ = (0, Dt.or)(...f.map((w) => (0, Dt._)`${g} === ${w}`)) : $ = Dt.nil;
      return u.length && ($ = (0, Dt.or)($, ...u.map((w) => (0, Dt._)`${(0, pa.usePattern)(e, w)}.test(${g})`))), (0, Dt.not)($);
    }
    function h(g) {
      t.code((0, Dt._)`delete ${i}[${g}]`);
    }
    function m(g) {
      if (l.removeAdditional === "all" || l.removeAdditional && r === !1) {
        h(g);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: g }), e.error(), s || t.break();
        return;
      }
      if (typeof r == "object" && !(0, ma.alwaysValidSchema)(a, r)) {
        const $ = t.name("valid");
        l.removeAdditional === "failing" ? (y(g, $, !1), t.if((0, Dt.not)($), () => {
          e.reset(), h(g);
        })) : (y(g, $), s || t.if((0, Dt.not)($), () => t.break()));
      }
    }
    function y(g, $, w) {
      const O = {
        keyword: "additionalProperties",
        dataProp: g,
        dataPropType: ma.Type.Str
      };
      w === !1 && Object.assign(O, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(O, $);
    }
  }
};
Fs.default = Wk;
var Uu = {};
Object.defineProperty(Uu, "__esModule", { value: !0 });
const Yk = Ot, up = le, Nl = K, fp = Fs, Kk = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: o } = e;
    o.opts.removeAdditional === "all" && n.additionalProperties === void 0 && fp.default.code(new Yk.KeywordCxt(o, fp.default, "additionalProperties"));
    const a = (0, up.allSchemaProperties)(r);
    for (const c of a)
      o.definedProperties.add(c);
    o.opts.unevaluated && a.length && o.props !== !0 && (o.props = Nl.mergeEvaluated.props(t, (0, Nl.toHash)(a), o.props));
    const s = a.filter((c) => !(0, Nl.alwaysValidSchema)(o, r[c]));
    if (s.length === 0)
      return;
    const l = t.name("valid");
    for (const c of s)
      f(c) ? u(c) : (t.if((0, up.propertyInData)(t, i, c, o.opts.ownProperties)), u(c), o.allErrors || t.else().var(l, !0), t.endIf()), e.it.definedProperties.add(c), e.ok(l);
    function f(c) {
      return o.opts.useDefaults && !o.compositeRule && r[c].default !== void 0;
    }
    function u(c) {
      e.subschema({
        keyword: "properties",
        schemaProp: c,
        dataProp: c
      }, l);
    }
  }
};
Uu.default = Kk;
var Mu = {};
Object.defineProperty(Mu, "__esModule", { value: !0 });
const dp = le, ya = ie, hp = K, pp = K, Xk = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: i, it: o } = e, { opts: a } = o, s = (0, dp.allSchemaProperties)(r), l = s.filter((y) => (0, hp.alwaysValidSchema)(o, r[y]));
    if (s.length === 0 || l.length === s.length && (!o.opts.unevaluated || o.props === !0))
      return;
    const f = a.strictSchema && !a.allowMatchingProperties && i.properties, u = t.name("valid");
    o.props !== !0 && !(o.props instanceof ya.Name) && (o.props = (0, pp.evaluatedPropsToName)(t, o.props));
    const { props: c } = o;
    d();
    function d() {
      for (const y of s)
        f && h(y), o.allErrors ? m(y) : (t.var(u, !0), m(y), t.if(u));
    }
    function h(y) {
      for (const g in f)
        new RegExp(y).test(g) && (0, hp.checkStrictMode)(o, `property ${g} matches pattern ${y} (use allowMatchingProperties)`);
    }
    function m(y) {
      t.forIn("key", n, (g) => {
        t.if((0, ya._)`${(0, dp.usePattern)(e, y)}.test(${g})`, () => {
          const $ = l.includes(y);
          $ || e.subschema({
            keyword: "patternProperties",
            schemaProp: y,
            dataProp: g,
            dataPropType: pp.Type.Str
          }, u), o.opts.unevaluated && c !== !0 ? t.assign((0, ya._)`${c}[${g}]`, !0) : !$ && !o.allErrors && t.if((0, ya.not)(u), () => t.break());
        });
      });
    }
  }
};
Mu.default = Xk;
var ju = {};
Object.defineProperty(ju, "__esModule", { value: !0 });
const Jk = K, Qk = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, Jk.alwaysValidSchema)(n, r)) {
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
ju.default = Qk;
var Bu = {};
Object.defineProperty(Bu, "__esModule", { value: !0 });
const Zk = le, ex = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Zk.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Bu.default = ex;
var Hu = {};
Object.defineProperty(Hu, "__esModule", { value: !0 });
const Ta = ie, tx = K, rx = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Ta._)`{passingSchemas: ${e.passing}}`
}, nx = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: rx,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: i } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (i.opts.discriminator && n.discriminator)
      return;
    const o = r, a = t.let("valid", !1), s = t.let("passing", null), l = t.name("_valid");
    e.setParams({ passing: s }), t.block(f), e.result(a, () => e.reset(), () => e.error(!0));
    function f() {
      o.forEach((u, c) => {
        let d;
        (0, tx.alwaysValidSchema)(i, u) ? t.var(l, !0) : d = e.subschema({
          keyword: "oneOf",
          schemaProp: c,
          compositeRule: !0
        }, l), c > 0 && t.if((0, Ta._)`${l} && ${a}`).assign(a, !1).assign(s, (0, Ta._)`[${s}, ${c}]`).else(), t.if(l, () => {
          t.assign(a, !0), t.assign(s, c), d && e.mergeEvaluated(d, Ta.Name);
        });
      });
    }
  }
};
Hu.default = nx;
var qu = {};
Object.defineProperty(qu, "__esModule", { value: !0 });
const ix = K, ox = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const i = t.name("valid");
    r.forEach((o, a) => {
      if ((0, ix.alwaysValidSchema)(n, o))
        return;
      const s = e.subschema({ keyword: "allOf", schemaProp: a }, i);
      e.ok(i), e.mergeEvaluated(s);
    });
  }
};
qu.default = ox;
var Gu = {};
Object.defineProperty(Gu, "__esModule", { value: !0 });
const Va = ie, kg = K, ax = {
  message: ({ params: e }) => (0, Va.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Va._)`{failingKeyword: ${e.ifClause}}`
}, sx = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: ax,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, kg.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const i = mp(n, "then"), o = mp(n, "else");
    if (!i && !o)
      return;
    const a = t.let("valid", !0), s = t.name("_valid");
    if (l(), e.reset(), i && o) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(s, f("then", u), f("else", u));
    } else i ? t.if(s, f("then")) : t.if((0, Va.not)(s), f("else"));
    e.pass(a, () => e.error(!0));
    function l() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, s);
      e.mergeEvaluated(u);
    }
    function f(u, c) {
      return () => {
        const d = e.subschema({ keyword: u }, s);
        t.assign(a, s), e.mergeValidEvaluated(d, a), c ? t.assign(c, (0, Va._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function mp(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, kg.alwaysValidSchema)(e, r);
}
Gu.default = sx;
var Vu = {};
Object.defineProperty(Vu, "__esModule", { value: !0 });
const lx = K, cx = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, lx.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Vu.default = cx;
Object.defineProperty(ks, "__esModule", { value: !0 });
const ux = yi, fx = ku, dx = gi, hx = xu, px = Fu, mx = xs, yx = Lu, gx = Fs, vx = Uu, $x = Mu, _x = ju, wx = Bu, Ex = Hu, Sx = qu, bx = Gu, Ax = Vu;
function Tx(e = !1) {
  const t = [
    // any
    _x.default,
    wx.default,
    Ex.default,
    Sx.default,
    bx.default,
    Ax.default,
    // object
    yx.default,
    gx.default,
    mx.default,
    vx.default,
    $x.default
  ];
  return e ? t.push(fx.default, hx.default) : t.push(ux.default, dx.default), t.push(px.default), t;
}
ks.default = Tx;
var zu = {}, vi = {};
Object.defineProperty(vi, "__esModule", { value: !0 });
vi.dynamicAnchor = void 0;
const Rl = ie, Px = St, yp = at, Cx = fr, Ox = {
  keyword: "$dynamicAnchor",
  schemaType: "string",
  code: (e) => xg(e, e.schema)
};
function xg(e, t) {
  const { gen: r, it: n } = e;
  n.schemaEnv.root.dynamicAnchors[t] = !0;
  const i = (0, Rl._)`${Px.default.dynamicAnchors}${(0, Rl.getProperty)(t)}`, o = n.errSchemaPath === "#" ? n.validateName : Ix(e);
  r.if((0, Rl._)`!${i}`, () => r.assign(i, o));
}
vi.dynamicAnchor = xg;
function Ix(e) {
  const { schemaEnv: t, schema: r, self: n } = e.it, { root: i, baseId: o, localRefs: a, meta: s } = t.root, { schemaId: l } = n.opts, f = new yp.SchemaEnv({ schema: r, schemaId: l, root: i, baseId: o, localRefs: a, meta: s });
  return yp.compileSchema.call(n, f), (0, Cx.getValidate)(e, f);
}
vi.default = Ox;
var $i = {};
Object.defineProperty($i, "__esModule", { value: !0 });
$i.dynamicRef = void 0;
const gp = ie, Nx = St, vp = fr, Rx = {
  keyword: "$dynamicRef",
  schemaType: "string",
  code: (e) => Fg(e, e.schema)
};
function Fg(e, t) {
  const { gen: r, keyword: n, it: i } = e;
  if (t[0] !== "#")
    throw new Error(`"${n}" only supports hash fragment reference`);
  const o = t.slice(1);
  if (i.allErrors)
    a();
  else {
    const l = r.let("valid", !1);
    a(l), e.ok(l);
  }
  function a(l) {
    if (i.schemaEnv.root.dynamicAnchors[o]) {
      const f = r.let("_v", (0, gp._)`${Nx.default.dynamicAnchors}${(0, gp.getProperty)(o)}`);
      r.if(f, s(f, l), s(i.validateName, l));
    } else
      s(i.validateName, l)();
  }
  function s(l, f) {
    return f ? () => r.block(() => {
      (0, vp.callRef)(e, l), r.let(f, !0);
    }) : () => (0, vp.callRef)(e, l);
  }
}
$i.dynamicRef = Fg;
$i.default = Rx;
var Wu = {};
Object.defineProperty(Wu, "__esModule", { value: !0 });
const Dx = vi, kx = K, xx = {
  keyword: "$recursiveAnchor",
  schemaType: "boolean",
  code(e) {
    e.schema ? (0, Dx.dynamicAnchor)(e, "") : (0, kx.checkStrictMode)(e.it, "$recursiveAnchor: false is ignored");
  }
};
Wu.default = xx;
var Yu = {};
Object.defineProperty(Yu, "__esModule", { value: !0 });
const Fx = $i, Lx = {
  keyword: "$recursiveRef",
  schemaType: "string",
  code: (e) => (0, Fx.dynamicRef)(e, e.schema)
};
Yu.default = Lx;
Object.defineProperty(zu, "__esModule", { value: !0 });
const Ux = vi, Mx = $i, jx = Wu, Bx = Yu, Hx = [Ux.default, Mx.default, jx.default, Bx.default];
zu.default = Hx;
var Ku = {}, Xu = {};
Object.defineProperty(Xu, "__esModule", { value: !0 });
const $p = xs, qx = {
  keyword: "dependentRequired",
  type: "object",
  schemaType: "object",
  error: $p.error,
  code: (e) => (0, $p.validatePropertyDeps)(e)
};
Xu.default = qx;
var Ju = {};
Object.defineProperty(Ju, "__esModule", { value: !0 });
const Gx = xs, Vx = {
  keyword: "dependentSchemas",
  type: "object",
  schemaType: "object",
  code: (e) => (0, Gx.validateSchemaDeps)(e)
};
Ju.default = Vx;
var Qu = {};
Object.defineProperty(Qu, "__esModule", { value: !0 });
const zx = K, Wx = {
  keyword: ["maxContains", "minContains"],
  type: "array",
  schemaType: "number",
  code({ keyword: e, parentSchema: t, it: r }) {
    t.contains === void 0 && (0, zx.checkStrictMode)(r, `"${e}" without "contains" is ignored`);
  }
};
Qu.default = Wx;
Object.defineProperty(Ku, "__esModule", { value: !0 });
const Yx = Xu, Kx = Ju, Xx = Qu, Jx = [Yx.default, Kx.default, Xx.default];
Ku.default = Jx;
var Zu = {}, ef = {};
Object.defineProperty(ef, "__esModule", { value: !0 });
const Ar = ie, _p = K, Qx = St, Zx = {
  message: "must NOT have unevaluated properties",
  params: ({ params: e }) => (0, Ar._)`{unevaluatedProperty: ${e.unevaluatedProperty}}`
}, eF = {
  keyword: "unevaluatedProperties",
  type: "object",
  schemaType: ["boolean", "object"],
  trackErrors: !0,
  error: Zx,
  code(e) {
    const { gen: t, schema: r, data: n, errsCount: i, it: o } = e;
    if (!i)
      throw new Error("ajv implementation error");
    const { allErrors: a, props: s } = o;
    s instanceof Ar.Name ? t.if((0, Ar._)`${s} !== true`, () => t.forIn("key", n, (c) => t.if(f(s, c), () => l(c)))) : s !== !0 && t.forIn("key", n, (c) => s === void 0 ? l(c) : t.if(u(s, c), () => l(c))), o.props = !0, e.ok((0, Ar._)`${i} === ${Qx.default.errors}`);
    function l(c) {
      if (r === !1) {
        e.setParams({ unevaluatedProperty: c }), e.error(), a || t.break();
        return;
      }
      if (!(0, _p.alwaysValidSchema)(o, r)) {
        const d = t.name("valid");
        e.subschema({
          keyword: "unevaluatedProperties",
          dataProp: c,
          dataPropType: _p.Type.Str
        }, d), a || t.if((0, Ar.not)(d), () => t.break());
      }
    }
    function f(c, d) {
      return (0, Ar._)`!${c} || !${c}[${d}]`;
    }
    function u(c, d) {
      const h = [];
      for (const m in c)
        c[m] === !0 && h.push((0, Ar._)`${d} !== ${m}`);
      return (0, Ar.and)(...h);
    }
  }
};
ef.default = eF;
var tf = {};
Object.defineProperty(tf, "__esModule", { value: !0 });
const dn = ie, wp = K, tF = {
  message: ({ params: { len: e } }) => (0, dn.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, dn._)`{limit: ${e}}`
}, rF = {
  keyword: "unevaluatedItems",
  type: "array",
  schemaType: ["boolean", "object"],
  error: tF,
  code(e) {
    const { gen: t, schema: r, data: n, it: i } = e, o = i.items || 0;
    if (o === !0)
      return;
    const a = t.const("len", (0, dn._)`${n}.length`);
    if (r === !1)
      e.setParams({ len: o }), e.fail((0, dn._)`${a} > ${o}`);
    else if (typeof r == "object" && !(0, wp.alwaysValidSchema)(i, r)) {
      const l = t.var("valid", (0, dn._)`${a} <= ${o}`);
      t.if((0, dn.not)(l), () => s(l, o)), e.ok(l);
    }
    i.items = !0;
    function s(l, f) {
      t.forRange("i", f, a, (u) => {
        e.subschema({ keyword: "unevaluatedItems", dataProp: u, dataPropType: wp.Type.Num }, l), i.allErrors || t.if((0, dn.not)(l), () => t.break());
      });
    }
  }
};
tf.default = rF;
Object.defineProperty(Zu, "__esModule", { value: !0 });
const nF = ef, iF = tf, oF = [nF.default, iF.default];
Zu.default = oF;
var Ls = {}, rf = {};
Object.defineProperty(rf, "__esModule", { value: !0 });
const Oe = ie, aF = {
  message: ({ schemaCode: e }) => (0, Oe.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, Oe._)`{format: ${e}}`
}, sF = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: aF,
  code(e, t) {
    const { gen: r, data: n, $data: i, schema: o, schemaCode: a, it: s } = e, { opts: l, errSchemaPath: f, schemaEnv: u, self: c } = s;
    if (!l.validateFormats)
      return;
    i ? d() : h();
    function d() {
      const m = r.scopeValue("formats", {
        ref: c.formats,
        code: l.code.formats
      }), y = r.const("fDef", (0, Oe._)`${m}[${a}]`), g = r.let("fType"), $ = r.let("format");
      r.if((0, Oe._)`typeof ${y} == "object" && !(${y} instanceof RegExp)`, () => r.assign(g, (0, Oe._)`${y}.type || "string"`).assign($, (0, Oe._)`${y}.validate`), () => r.assign(g, (0, Oe._)`"string"`).assign($, y)), e.fail$data((0, Oe.or)(w(), O()));
      function w() {
        return l.strictSchema === !1 ? Oe.nil : (0, Oe._)`${a} && !${$}`;
      }
      function O() {
        const N = u.$async ? (0, Oe._)`(${y}.async ? await ${$}(${n}) : ${$}(${n}))` : (0, Oe._)`${$}(${n})`, j = (0, Oe._)`(typeof ${$} == "function" ? ${N} : ${$}.test(${n}))`;
        return (0, Oe._)`${$} && ${$} !== true && ${g} === ${t} && !${j}`;
      }
    }
    function h() {
      const m = c.formats[o];
      if (!m) {
        w();
        return;
      }
      if (m === !0)
        return;
      const [y, g, $] = O(m);
      y === t && e.pass(N());
      function w() {
        if (l.strictSchema === !1) {
          c.logger.warn(j());
          return;
        }
        throw new Error(j());
        function j() {
          return `unknown format "${o}" ignored in schema at path "${f}"`;
        }
      }
      function O(j) {
        const I = j instanceof RegExp ? (0, Oe.regexpCode)(j) : l.code.formats ? (0, Oe._)`${l.code.formats}${(0, Oe.getProperty)(o)}` : void 0, F = r.scopeValue("formats", { key: o, ref: j, code: I });
        return typeof j == "object" && !(j instanceof RegExp) ? [j.type || "string", j.validate, (0, Oe._)`${F}.validate`] : ["string", j, F];
      }
      function N() {
        if (typeof m == "object" && !(m instanceof RegExp) && m.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, Oe._)`await ${$}(${n})`;
        }
        return typeof g == "function" ? (0, Oe._)`${$}(${n})` : (0, Oe._)`${$}.test(${n})`;
      }
    }
  }
};
rf.default = sF;
Object.defineProperty(Ls, "__esModule", { value: !0 });
const lF = rf, cF = [lF.default];
Ls.default = cF;
var _n = {};
Object.defineProperty(_n, "__esModule", { value: !0 });
_n.contentVocabulary = _n.metadataVocabulary = void 0;
_n.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
_n.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(wu, "__esModule", { value: !0 });
const uF = Rs, fF = Ds, dF = ks, hF = zu, pF = Ku, mF = Zu, yF = Ls, Ep = _n, gF = [
  hF.default,
  uF.default,
  fF.default,
  (0, dF.default)(!0),
  yF.default,
  Ep.metadataVocabulary,
  Ep.contentVocabulary,
  pF.default,
  mF.default
];
wu.default = gF;
var Us = {}, Ms = {};
Object.defineProperty(Ms, "__esModule", { value: !0 });
Ms.DiscrError = void 0;
var Sp;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Sp || (Ms.DiscrError = Sp = {}));
Object.defineProperty(Us, "__esModule", { value: !0 });
const Mn = ie, fc = Ms, bp = at, vF = An, $F = K, _F = {
  message: ({ params: { discrError: e, tagName: t } }) => e === fc.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, Mn._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, wF = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: _F,
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
    const l = t.let("valid", !1), f = t.const("tag", (0, Mn._)`${r}${(0, Mn.getProperty)(s)}`);
    t.if((0, Mn._)`typeof ${f} == "string"`, () => u(), () => e.error(!1, { discrError: fc.DiscrError.Tag, tag: f, tagName: s })), e.ok(l);
    function u() {
      const h = d();
      t.if(!1);
      for (const m in h)
        t.elseIf((0, Mn._)`${f} === ${m}`), t.assign(l, c(h[m]));
      t.else(), e.error(!1, { discrError: fc.DiscrError.Mapping, tag: f, tagName: s }), t.endIf();
    }
    function c(h) {
      const m = t.name("valid"), y = e.subschema({ keyword: "oneOf", schemaProp: h }, m);
      return e.mergeEvaluated(y, Mn.Name), m;
    }
    function d() {
      var h;
      const m = {}, y = $(i);
      let g = !0;
      for (let N = 0; N < a.length; N++) {
        let j = a[N];
        if (j != null && j.$ref && !(0, $F.schemaHasRulesButRef)(j, o.self.RULES)) {
          const F = j.$ref;
          if (j = bp.resolveRef.call(o.self, o.schemaEnv.root, o.baseId, F), j instanceof bp.SchemaEnv && (j = j.schema), j === void 0)
            throw new vF.default(o.opts.uriResolver, o.baseId, F);
        }
        const I = (h = j == null ? void 0 : j.properties) === null || h === void 0 ? void 0 : h[s];
        if (typeof I != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${s}"`);
        g = g && (y || $(j)), w(I, N);
      }
      if (!g)
        throw new Error(`discriminator: "${s}" must be required`);
      return m;
      function $({ required: N }) {
        return Array.isArray(N) && N.includes(s);
      }
      function w(N, j) {
        if (N.const)
          O(N.const, j);
        else if (N.enum)
          for (const I of N.enum)
            O(I, j);
        else
          throw new Error(`discriminator: "properties/${s}" must have "const" or "enum"`);
      }
      function O(N, j) {
        if (typeof N != "string" || N in m)
          throw new Error(`discriminator: "${s}" values must be unique strings`);
        m[N] = j;
      }
    }
  }
};
Us.default = wF;
var nf = {};
const EF = "https://json-schema.org/draft/2020-12/schema", SF = "https://json-schema.org/draft/2020-12/schema", bF = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0,
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0,
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0,
  "https://json-schema.org/draft/2020-12/vocab/validation": !0,
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0,
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0,
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, AF = "meta", TF = "Core and Validation specifications meta-schema", PF = [
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
], CF = [
  "object",
  "boolean"
], OF = "This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.", IF = {
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
}, NF = {
  $schema: EF,
  $id: SF,
  $vocabulary: bF,
  $dynamicAnchor: AF,
  title: TF,
  allOf: PF,
  type: CF,
  $comment: OF,
  properties: IF
}, RF = "https://json-schema.org/draft/2020-12/schema", DF = "https://json-schema.org/draft/2020-12/meta/applicator", kF = {
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0
}, xF = "meta", FF = "Applicator vocabulary meta-schema", LF = [
  "object",
  "boolean"
], UF = {
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
}, MF = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $dynamicRef: "#meta"
    }
  }
}, jF = {
  $schema: RF,
  $id: DF,
  $vocabulary: kF,
  $dynamicAnchor: xF,
  title: FF,
  type: LF,
  properties: UF,
  $defs: MF
}, BF = "https://json-schema.org/draft/2020-12/schema", HF = "https://json-schema.org/draft/2020-12/meta/unevaluated", qF = {
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0
}, GF = "meta", VF = "Unevaluated applicator vocabulary meta-schema", zF = [
  "object",
  "boolean"
], WF = {
  unevaluatedItems: {
    $dynamicRef: "#meta"
  },
  unevaluatedProperties: {
    $dynamicRef: "#meta"
  }
}, YF = {
  $schema: BF,
  $id: HF,
  $vocabulary: qF,
  $dynamicAnchor: GF,
  title: VF,
  type: zF,
  properties: WF
}, KF = "https://json-schema.org/draft/2020-12/schema", XF = "https://json-schema.org/draft/2020-12/meta/content", JF = {
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, QF = "meta", ZF = "Content vocabulary meta-schema", e2 = [
  "object",
  "boolean"
], t2 = {
  contentEncoding: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentSchema: {
    $dynamicRef: "#meta"
  }
}, r2 = {
  $schema: KF,
  $id: XF,
  $vocabulary: JF,
  $dynamicAnchor: QF,
  title: ZF,
  type: e2,
  properties: t2
}, n2 = "https://json-schema.org/draft/2020-12/schema", i2 = "https://json-schema.org/draft/2020-12/meta/core", o2 = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0
}, a2 = "meta", s2 = "Core vocabulary meta-schema", l2 = [
  "object",
  "boolean"
], c2 = {
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
}, u2 = {
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
}, f2 = {
  $schema: n2,
  $id: i2,
  $vocabulary: o2,
  $dynamicAnchor: a2,
  title: s2,
  type: l2,
  properties: c2,
  $defs: u2
}, d2 = "https://json-schema.org/draft/2020-12/schema", h2 = "https://json-schema.org/draft/2020-12/meta/format-annotation", p2 = {
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0
}, m2 = "meta", y2 = "Format vocabulary meta-schema for annotation results", g2 = [
  "object",
  "boolean"
], v2 = {
  format: {
    type: "string"
  }
}, $2 = {
  $schema: d2,
  $id: h2,
  $vocabulary: p2,
  $dynamicAnchor: m2,
  title: y2,
  type: g2,
  properties: v2
}, _2 = "https://json-schema.org/draft/2020-12/schema", w2 = "https://json-schema.org/draft/2020-12/meta/meta-data", E2 = {
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0
}, S2 = "meta", b2 = "Meta-data vocabulary meta-schema", A2 = [
  "object",
  "boolean"
], T2 = {
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
}, P2 = {
  $schema: _2,
  $id: w2,
  $vocabulary: E2,
  $dynamicAnchor: S2,
  title: b2,
  type: A2,
  properties: T2
}, C2 = "https://json-schema.org/draft/2020-12/schema", O2 = "https://json-schema.org/draft/2020-12/meta/validation", I2 = {
  "https://json-schema.org/draft/2020-12/vocab/validation": !0
}, N2 = "meta", R2 = "Validation vocabulary meta-schema", D2 = [
  "object",
  "boolean"
], k2 = {
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
}, x2 = {
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
}, F2 = {
  $schema: C2,
  $id: O2,
  $vocabulary: I2,
  $dynamicAnchor: N2,
  title: R2,
  type: D2,
  properties: k2,
  $defs: x2
};
Object.defineProperty(nf, "__esModule", { value: !0 });
const L2 = NF, U2 = jF, M2 = YF, j2 = r2, B2 = f2, H2 = $2, q2 = P2, G2 = F2, V2 = ["/properties"];
function z2(e) {
  return [
    L2,
    U2,
    M2,
    j2,
    B2,
    t(this, H2),
    q2,
    t(this, G2)
  ].forEach((r) => this.addMetaSchema(r, void 0, !1)), this;
  function t(r, n) {
    return e ? r.$dataMetaSchema(n, V2) : n;
  }
}
nf.default = z2;
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv2020 = void 0;
  const r = au, n = wu, i = Us, o = nf, a = "https://json-schema.org/draft/2020-12/schema";
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
      const { $data: h, meta: m } = this.opts;
      m && (o.default.call(this, h), this.refs["http://json-schema.org/schema"] = a);
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(a) ? a : void 0);
    }
  }
  t.Ajv2020 = s, e.exports = t = s, e.exports.Ajv2020 = s, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = s;
  var l = Ot;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return l.KeywordCxt;
  } });
  var f = ie;
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
  var u = mi;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return u.default;
  } });
  var c = An;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return c.default;
  } });
})(ic, ic.exports);
var W2 = ic.exports, dc = { exports: {} }, Lg = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(B, z) {
    return { validate: B, compare: z };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(o, a),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(l(!0), f),
    "date-time": t(d(!0), h),
    "iso-time": t(l(), u),
    "iso-date-time": t(d(), m),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: $,
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
    regex: Y,
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
    byte: O,
    // signed 32 bit integer
    int32: { type: "number", validate: I },
    // signed 64 bit integer
    int64: { type: "number", validate: F },
    // C-type float
    float: { type: "number", validate: q },
    // C-type double
    double: { type: "number", validate: q },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, a),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, f),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, h),
    "iso-time": t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, u),
    "iso-date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, m),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function r(B) {
    return B % 4 === 0 && (B % 100 !== 0 || B % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, i = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function o(B) {
    const z = n.exec(B);
    if (!z)
      return !1;
    const X = +z[1], k = +z[2], x = +z[3];
    return k >= 1 && k <= 12 && x >= 1 && x <= (k === 2 && r(X) ? 29 : i[k]);
  }
  function a(B, z) {
    if (B && z)
      return B > z ? 1 : B < z ? -1 : 0;
  }
  const s = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
  function l(B) {
    return function(X) {
      const k = s.exec(X);
      if (!k)
        return !1;
      const x = +k[1], G = +k[2], L = +k[3], W = k[4], V = k[5] === "-" ? -1 : 1, U = +(k[6] || 0), T = +(k[7] || 0);
      if (U > 23 || T > 59 || B && !W)
        return !1;
      if (x <= 23 && G <= 59 && L < 60)
        return !0;
      const R = G - T * V, P = x - U * V - (R < 0 ? 1 : 0);
      return (P === 23 || P === -1) && (R === 59 || R === -1) && L < 61;
    };
  }
  function f(B, z) {
    if (!(B && z))
      return;
    const X = (/* @__PURE__ */ new Date("2020-01-01T" + B)).valueOf(), k = (/* @__PURE__ */ new Date("2020-01-01T" + z)).valueOf();
    if (X && k)
      return X - k;
  }
  function u(B, z) {
    if (!(B && z))
      return;
    const X = s.exec(B), k = s.exec(z);
    if (X && k)
      return B = X[1] + X[2] + X[3], z = k[1] + k[2] + k[3], B > z ? 1 : B < z ? -1 : 0;
  }
  const c = /t|\s/i;
  function d(B) {
    const z = l(B);
    return function(k) {
      const x = k.split(c);
      return x.length === 2 && o(x[0]) && z(x[1]);
    };
  }
  function h(B, z) {
    if (!(B && z))
      return;
    const X = new Date(B).valueOf(), k = new Date(z).valueOf();
    if (X && k)
      return X - k;
  }
  function m(B, z) {
    if (!(B && z))
      return;
    const [X, k] = B.split(c), [x, G] = z.split(c), L = a(X, x);
    if (L !== void 0)
      return L || f(k, G);
  }
  const y = /\/|:/, g = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function $(B) {
    return y.test(B) && g.test(B);
  }
  const w = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function O(B) {
    return w.lastIndex = 0, w.test(B);
  }
  const N = -2147483648, j = 2 ** 31 - 1;
  function I(B) {
    return Number.isInteger(B) && B <= j && B >= N;
  }
  function F(B) {
    return Number.isInteger(B);
  }
  function q() {
    return !0;
  }
  const E = /[^\\]\\Z/;
  function Y(B) {
    if (E.test(B))
      return !1;
    try {
      return new RegExp(B), !0;
    } catch {
      return !1;
    }
  }
})(Lg);
var Ug = {}, hc = { exports: {} }, of = {};
Object.defineProperty(of, "__esModule", { value: !0 });
const Y2 = Rs, K2 = Ds, X2 = ks, J2 = Ls, Ap = _n, Q2 = [
  Y2.default,
  K2.default,
  (0, X2.default)(),
  J2.default,
  Ap.metadataVocabulary,
  Ap.contentVocabulary
];
of.default = Q2;
const Z2 = "http://json-schema.org/draft-07/schema#", eL = "http://json-schema.org/draft-07/schema#", tL = "Core schema meta-schema", rL = {
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
}, nL = [
  "object",
  "boolean"
], iL = {
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
}, oL = {
  $schema: Z2,
  $id: eL,
  title: tL,
  definitions: rL,
  type: nL,
  properties: iL,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = au, n = of, i = Us, o = oL, a = ["/properties"], s = "http://json-schema.org/draft-07/schema";
  class l extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((m) => this.addVocabulary(m)), this.opts.discriminator && this.addKeyword(i.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const m = this.opts.$data ? this.$dataMetaSchema(o, a) : o;
      this.addMetaSchema(m, s, !1), this.refs["http://json-schema.org/schema"] = s;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(s) ? s : void 0);
    }
  }
  t.Ajv = l, e.exports = t = l, e.exports.Ajv = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
  var f = Ot;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return f.KeywordCxt;
  } });
  var u = ie;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return u._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return u.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return u.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return u.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return u.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return u.CodeGen;
  } });
  var c = mi;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return c.default;
  } });
  var d = An;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return d.default;
  } });
})(hc, hc.exports);
var aL = hc.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = aL, r = ie, n = r.operators, i = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, o = {
    message: ({ keyword: s, schemaCode: l }) => (0, r.str)`should be ${i[s].okStr} ${l}`,
    params: ({ keyword: s, schemaCode: l }) => (0, r._)`{comparison: ${i[s].okStr}, limit: ${l}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(i),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: o,
    code(s) {
      const { gen: l, data: f, schemaCode: u, keyword: c, it: d } = s, { opts: h, self: m } = d;
      if (!h.validateFormats)
        return;
      const y = new t.KeywordCxt(d, m.RULES.all.format.definition, "format");
      y.$data ? g() : $();
      function g() {
        const O = l.scopeValue("formats", {
          ref: m.formats,
          code: h.code.formats
        }), N = l.const("fmt", (0, r._)`${O}[${y.schemaCode}]`);
        s.fail$data((0, r.or)((0, r._)`typeof ${N} != "object"`, (0, r._)`${N} instanceof RegExp`, (0, r._)`typeof ${N}.compare != "function"`, w(N)));
      }
      function $() {
        const O = y.schema, N = m.formats[O];
        if (!N || N === !0)
          return;
        if (typeof N != "object" || N instanceof RegExp || typeof N.compare != "function")
          throw new Error(`"${c}": format "${O}" does not define "compare" function`);
        const j = l.scopeValue("formats", {
          key: O,
          ref: N,
          code: h.code.formats ? (0, r._)`${h.code.formats}${(0, r.getProperty)(O)}` : void 0
        });
        s.fail$data(w(j));
      }
      function w(O) {
        return (0, r._)`${O}.compare(${f}, ${u}) ${i[c].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const a = (s) => (s.addKeyword(e.formatLimitDefinition), s);
  e.default = a;
})(Ug);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = Lg, n = Ug, i = ie, o = new i.Name("fullFormats"), a = new i.Name("fastFormats"), s = (f, u = { keywords: !0 }) => {
    if (Array.isArray(u))
      return l(f, u, r.fullFormats, o), f;
    const [c, d] = u.mode === "fast" ? [r.fastFormats, a] : [r.fullFormats, o], h = u.formats || r.formatNames;
    return l(f, h, c, d), u.keywords && (0, n.default)(f), f;
  };
  s.get = (f, u = "full") => {
    const d = (u === "fast" ? r.fastFormats : r.fullFormats)[f];
    if (!d)
      throw new Error(`Unknown format "${f}"`);
    return d;
  };
  function l(f, u, c, d) {
    var h, m;
    (h = (m = f.opts.code).formats) !== null && h !== void 0 || (m.formats = (0, i._)`require("ajv-formats/dist/formats").${d}`);
    for (const y of u)
      f.addFormat(y, c[y]);
  }
  e.exports = t = s, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = s;
})(dc, dc.exports);
var sL = dc.exports;
const lL = /* @__PURE__ */ rs(sL), cL = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const i = Object.getOwnPropertyDescriptor(e, r), o = Object.getOwnPropertyDescriptor(t, r);
  !uL(i, o) && n || Object.defineProperty(e, r, o);
}, uL = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, fL = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, dL = (e, t) => `/* Wrapped ${e}*/
${t}`, hL = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), pL = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), mL = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, i = dL.bind(null, n, t.toString());
  Object.defineProperty(i, "name", pL);
  const { writable: o, enumerable: a, configurable: s } = hL;
  Object.defineProperty(e, "toString", { value: i, writable: o, enumerable: a, configurable: s });
};
function yL(e, t, { ignoreNonConfigurable: r = !1 } = {}) {
  const { name: n } = e;
  for (const i of Reflect.ownKeys(t))
    cL(e, t, i, r);
  return fL(e, t), mL(e, t, n), e;
}
const Tp = (e, t = {}) => {
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
  let a, s, l;
  const f = function(...u) {
    const c = this, d = () => {
      a = void 0, s && (clearTimeout(s), s = void 0), o && (l = e.apply(c, u));
    }, h = () => {
      s = void 0, a && (clearTimeout(a), a = void 0), o && (l = e.apply(c, u));
    }, m = i && !a;
    return clearTimeout(a), a = setTimeout(d, r), n > 0 && n !== Number.POSITIVE_INFINITY && !s && (s = setTimeout(h, n)), m && (l = e.apply(c, u)), l;
  };
  return yL(f, e), f.cancel = () => {
    a && (clearTimeout(a), a = void 0), s && (clearTimeout(s), s = void 0);
  }, f;
}, gL = Object.prototype.toString, vL = "[object Uint8Array]", $L = "[object ArrayBuffer]";
function Mg(e, t, r) {
  return e ? e.constructor === t ? !0 : gL.call(e) === r : !1;
}
function jg(e) {
  return Mg(e, Uint8Array, vL);
}
function _L(e) {
  return Mg(e, ArrayBuffer, $L);
}
function wL(e) {
  return jg(e) || _L(e);
}
function EL(e) {
  if (!jg(e))
    throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof e}\``);
}
function SL(e) {
  if (!wL(e))
    throw new TypeError(`Expected \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof e}\``);
}
function Pp(e, t) {
  if (e.length === 0)
    return new Uint8Array(0);
  t ?? (t = e.reduce((i, o) => i + o.length, 0));
  const r = new Uint8Array(t);
  let n = 0;
  for (const i of e)
    EL(i), r.set(i, n), n += i.length;
  return r;
}
const ga = {
  utf8: new globalThis.TextDecoder("utf8")
};
function Cp(e, t = "utf8") {
  return SL(e), ga[t] ?? (ga[t] = new globalThis.TextDecoder(t)), ga[t].decode(e);
}
function bL(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected \`string\`, got \`${typeof e}\``);
}
const AL = new globalThis.TextEncoder();
function Dl(e) {
  return bL(e), AL.encode(e);
}
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
const TL = lL.default, Op = "aes-256-cbc", Fn = () => /* @__PURE__ */ Object.create(null), PL = (e) => e != null, CL = (e, t) => {
  const r = /* @__PURE__ */ new Set([
    "undefined",
    "symbol",
    "function"
  ]), n = typeof t;
  if (r.has(n))
    throw new TypeError(`Setting a value of type \`${n}\` for key \`${e}\` is not allowed as it's not supported by JSON`);
}, Pa = "__internal__", kl = `${Pa}.migrations.version`;
var Ir, rr, wt, nr;
class OL {
  constructor(t = {}) {
    Ci(this, "path");
    Ci(this, "events");
    Oi(this, Ir);
    Oi(this, rr);
    Oi(this, wt);
    Oi(this, nr, {});
    Ci(this, "_deserialize", (t) => JSON.parse(t));
    Ci(this, "_serialize", (t) => JSON.stringify(t, void 0, "	"));
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
      r.cwd = jI(r.projectName, { suffix: r.projectSuffix }).config;
    }
    if (Ii(this, wt, r), r.schema ?? r.ajvOptions ?? r.rootSchema) {
      if (r.schema && typeof r.schema != "object")
        throw new TypeError("The `schema` option must be an object.");
      const a = new W2.Ajv2020({
        allErrors: !0,
        useDefaults: !0,
        ...r.ajvOptions
      });
      TL(a);
      const s = {
        ...r.rootSchema,
        type: "object",
        properties: r.schema
      };
      Ii(this, Ir, a.compile(s));
      for (const [l, f] of Object.entries(r.schema ?? {}))
        f != null && f.default && ($e(this, nr)[l] = f.default);
    }
    r.defaults && Ii(this, nr, {
      ...$e(this, nr),
      ...r.defaults
    }), r.serialize && (this._serialize = r.serialize), r.deserialize && (this._deserialize = r.deserialize), this.events = new EventTarget(), Ii(this, rr, r.encryptionKey);
    const n = r.fileExtension ? `.${r.fileExtension}` : "";
    this.path = re.resolve(r.cwd, `${r.configName ?? "config"}${n}`);
    const i = this.store, o = Object.assign(Fn(), r.defaults, i);
    if (r.migrations) {
      if (!r.projectVersion)
        throw new Error("Please specify the `projectVersion` option.");
      this._migrate(r.migrations, r.projectVersion, r.beforeEachMigration);
    }
    this._validate(o);
    try {
      J$.deepEqual(i, o);
    } catch {
      this.store = o;
    }
    r.watch && this._watch();
  }
  get(t, r) {
    if ($e(this, wt).accessPropertiesByDotNotation)
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
      throw new TypeError(`Please don't use the ${Pa} key, as it's used to manage this module internal operations.`);
    const { store: n } = this, i = (o, a) => {
      CL(o, a), $e(this, wt).accessPropertiesByDotNotation ? qh(n, o, a) : n[o] = a;
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
    return $e(this, wt).accessPropertiesByDotNotation ? FI(this.store, t) : t in this.store;
  }
  /**
      Reset items to their default values, as defined by the `defaults` or `schema` option.
  
      @see `clear()` to reset all items.
  
      @param keys - The keys of the items to reset.
      */
  reset(...t) {
    for (const r of t)
      PL($e(this, nr)[r]) && this.set(r, $e(this, nr)[r]);
  }
  delete(t) {
    const { store: r } = this;
    $e(this, wt).accessPropertiesByDotNotation ? xI(r, t) : delete r[t], this.store = r;
  }
  /**
      Delete all items.
  
      This resets known items to their default values, if defined by the `defaults` or `schema` option.
      */
  clear() {
    this.store = Fn();
    for (const t of Object.keys($e(this, nr)))
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
      const t = se.readFileSync(this.path, $e(this, rr) ? null : "utf8"), r = this._encryptData(t), n = this._deserialize(r);
      return this._validate(n), Object.assign(Fn(), n);
    } catch (t) {
      if ((t == null ? void 0 : t.code) === "ENOENT")
        return this._ensureDirectory(), Fn();
      if ($e(this, wt).clearInvalidConfig && t.name === "SyntaxError")
        return Fn();
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
    if (!$e(this, rr))
      return typeof t == "string" ? t : Cp(t);
    try {
      const r = t.slice(0, 16), n = Ni.pbkdf2Sync($e(this, rr), r.toString(), 1e4, 32, "sha512"), i = Ni.createDecipheriv(Op, n, r), o = t.slice(17), a = typeof o == "string" ? Dl(o) : o;
      return Cp(Pp([i.update(a), i.final()]));
    } catch {
    }
    return t.toString();
  }
  _handleChange(t, r) {
    let n = t();
    const i = () => {
      const o = n, a = t();
      X$(a, o) || (n = a, r.call(this, a, o));
    };
    return this.events.addEventListener("change", i), () => {
      this.events.removeEventListener("change", i);
    };
  }
  _validate(t) {
    if (!$e(this, Ir) || $e(this, Ir).call(this, t) || !$e(this, Ir).errors)
      return;
    const n = $e(this, Ir).errors.map(({ instancePath: i, message: o = "" }) => `\`${i.slice(1)}\` ${o}`);
    throw new Error("Config schema violation: " + n.join("; "));
  }
  _ensureDirectory() {
    se.mkdirSync(re.dirname(this.path), { recursive: !0 });
  }
  _write(t) {
    let r = this._serialize(t);
    if ($e(this, rr)) {
      const n = Ni.randomBytes(16), i = Ni.pbkdf2Sync($e(this, rr), n.toString(), 1e4, 32, "sha512"), o = Ni.createCipheriv(Op, i, n);
      r = Pp([n, Dl(":"), o.update(Dl(r)), o.final()]);
    }
    if (xe.env.SNAP)
      se.writeFileSync(this.path, r, { mode: $e(this, wt).configFileMode });
    else
      try {
        jy(this.path, r, { mode: $e(this, wt).configFileMode });
      } catch (n) {
        if ((n == null ? void 0 : n.code) === "EXDEV") {
          se.writeFileSync(this.path, r, { mode: $e(this, wt).configFileMode });
          return;
        }
        throw n;
      }
  }
  _watch() {
    this._ensureDirectory(), se.existsSync(this.path) || this._write(Fn()), xe.platform === "win32" ? se.watch(this.path, { persistent: !1 }, Tp(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 100 })) : se.watchFile(this.path, { persistent: !1 }, Tp(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 5e3 }));
  }
  _migrate(t, r, n) {
    let i = this._get(kl, "0.0.0");
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
        const l = t[s];
        l == null || l(this), this._set(kl, s), i = s, a = { ...this.store };
      } catch (l) {
        throw this.store = a, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${l}`);
      }
    (this._isVersionInRangeFormat(i) || !Nn.eq(i, r)) && this._set(kl, r);
  }
  _containsReservedKey(t) {
    return typeof t == "object" && Object.keys(t)[0] === Pa ? !0 : typeof t != "string" ? !1 : $e(this, wt).accessPropertiesByDotNotation ? !!t.startsWith(`${Pa}.`) : !1;
  }
  _isVersionInRangeFormat(t) {
    return Nn.clean(t) === null;
  }
  _shouldPerformMigration(t, r, n) {
    return this._isVersionInRangeFormat(t) ? r !== "0.0.0" && Nn.satisfies(r, t) ? !1 : Nn.satisfies(n, t) : !(Nn.lte(t, r) || Nn.gt(t, n));
  }
  _get(t, r) {
    return kI(this.store, t, r);
  }
  _set(t, r) {
    const { store: n } = this;
    qh(n, t, r), this.store = n;
  }
}
Ir = new WeakMap(), rr = new WeakMap(), wt = new WeakMap(), nr = new WeakMap();
const { app: Ca, ipcMain: pc, shell: IL } = lr;
let Ip = !1;
const Np = () => {
  if (!pc || !Ca)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: Ca.getPath("userData"),
    appVersion: Ca.getVersion()
  };
  return Ip || (pc.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), Ip = !0), e;
};
class js extends OL {
  constructor(t) {
    let r, n;
    if (xe.type === "renderer") {
      const i = lr.ipcRenderer.sendSync("electron-store-get-data");
      if (!i)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = i);
    } else pc && Ca && ({ defaultCwd: r, appVersion: n } = Np());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = re.isAbsolute(t.cwd) ? t.cwd : re.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    Np();
  }
  async openInEditor() {
    const t = await IL.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var af = Za, NL = ce, Vr = Po.spawn, sf = "HKLM", Bg = "HKCU", Hg = "HKCR", qg = "HKU", Gg = "HKCC", Vg = [sf, Bg, Hg, qg, Gg], zg = "REG_SZ", Wg = "REG_MULTI_SZ", Yg = "REG_EXPAND_SZ", Kg = "REG_DWORD", Xg = "REG_QWORD", Jg = "REG_BINARY", Qg = "REG_NONE", Zg = [zg, Wg, Yg, Kg, Xg, Jg, Qg], RL = "", DL = /(\\[a-zA-Z0-9_\s]+)*/, kL = /^(HKEY_LOCAL_MACHINE|HKEY_CURRENT_USER|HKEY_CLASSES_ROOT|HKEY_USERS|HKEY_CURRENT_CONFIG)(.*)$/, ev = /^(.*)\s(REG_SZ|REG_MULTI_SZ|REG_EXPAND_SZ|REG_DWORD|REG_QWORD|REG_BINARY|REG_NONE)\s+([^\s].*)$/;
function Wn(e, t) {
  if (!(this instanceof Wn))
    return new Wn(e, t);
  Error.captureStackTrace(this, Wn), this.__defineGetter__("name", function() {
    return Wn.name;
  }), this.__defineGetter__("message", function() {
    return e;
  }), this.__defineGetter__("code", function() {
    return t;
  });
}
af.inherits(Wn, Error);
function zr(e) {
  var t = { stdout: "", stderr: "" };
  return e.stdout.on("data", function(r) {
    t.stdout += r.toString();
  }), e.stderr.on("data", function(r) {
    t.stderr += r.toString();
  }), t;
}
function Wr(e, t, r) {
  var n = r.stdout.trim(), i = r.stderr.trim(), o = af.format(`%s command exited with code %d:
%s
%s`, e, t, n, i);
  return new Wn(o, t);
}
function xL(e) {
  if (e == "x64")
    return "64";
  if (e == "x86")
    return "32";
  throw new Error("illegal architecture: " + e + " (use x86 or x64)");
}
function Yr(e, t) {
  t && e.push("/reg:" + xL(t));
}
function Kr() {
  return process.platform === "win32" ? NL.join(process.env.windir, "system32", "reg.exe") : "REG";
}
function _o(e, t, r, n, i, o, a) {
  if (!(this instanceof _o))
    return new _o(e, t, r, n, i, o, a);
  var s = e, l = t, f = r, u = n, c = i, d = o, h = a;
  this.__defineGetter__("host", function() {
    return s;
  }), this.__defineGetter__("hive", function() {
    return l;
  }), this.__defineGetter__("key", function() {
    return f;
  }), this.__defineGetter__("name", function() {
    return u;
  }), this.__defineGetter__("type", function() {
    return c;
  }), this.__defineGetter__("value", function() {
    return d;
  }), this.__defineGetter__("arch", function() {
    return h;
  });
}
af.inherits(_o, Object);
function fe(e) {
  if (!(this instanceof fe))
    return new fe(e);
  var t = e || {}, r = "" + (t.host || ""), n = "" + (t.hive || sf), i = "" + (t.key || ""), o = t.arch || null;
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
    return new fe({
      host: this.host,
      hive: this.hive,
      key: a == -1 ? "" : i.substring(0, a),
      arch: this.arch
    });
  }), Vg.indexOf(n) == -1)
    throw new Error("illegal hive specified.");
  if (!DL.test(i))
    throw new Error("illegal key specified.");
  if (o && o != "x64" && o != "x86")
    throw new Error("illegal architecture specified (use x86 or x64)");
}
fe.HKLM = sf;
fe.HKCU = Bg;
fe.HKCR = Hg;
fe.HKU = qg;
fe.HKCC = Gg;
fe.HIVES = Vg;
fe.REG_SZ = zg;
fe.REG_MULTI_SZ = Wg;
fe.REG_EXPAND_SZ = Yg;
fe.REG_DWORD = Kg;
fe.REG_QWORD = Xg;
fe.REG_BINARY = Jg;
fe.REG_NONE = Qg;
fe.REG_TYPES = Zg;
fe.DEFAULT_VALUE = RL;
fe.prototype.values = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["QUERY", this.path];
  Yr(r, this.arch);
  var n = Vr(Kr(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = "", o = this, a = null, s = zr(n);
  return n.on("close", function(l) {
    if (!a)
      if (l !== 0)
        t(Wr("QUERY", l, s), null);
      else {
        for (var f = [], u = [], c = i.split(`
`), d = 0, h = 0, m = c.length; h < m; h++) {
          var y = c[h].trim();
          y.length > 0 && (d != 0 && f.push(y), ++d);
        }
        for (var h = 0, m = f.length; h < m; h++) {
          var g = ev.exec(f[h]), $, w, O;
          g && ($ = g[1].trim(), w = g[2].trim(), O = g[3], u.push(new _o(o.host, o.hive, o.key, $, w, O, o.arch)));
        }
        t(null, u);
      }
  }), n.stdout.on("data", function(l) {
    i += l.toString();
  }), n.on("error", function(l) {
    a = l, t(l);
  }), this;
};
fe.prototype.keys = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["QUERY", this.path];
  Yr(r, this.arch);
  var n = Vr(Kr(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = "", o = this, a = null, s = zr(n);
  return n.on("close", function(l) {
    a || l !== 0 && t(Wr("QUERY", l, s), null);
  }), n.stdout.on("data", function(l) {
    i += l.toString();
  }), n.stdout.on("end", function() {
    for (var l = [], f = [], u = i.split(`
`), c = 0, d = u.length; c < d; c++) {
      var h = u[c].trim();
      h.length > 0 && l.push(h);
    }
    for (var c = 0, d = l.length; c < d; c++) {
      var m = kL.exec(l[c]), y;
      m && (m[1], y = m[2], y && y !== o.key && f.push(new fe({
        host: o.host,
        hive: o.hive,
        key: y,
        arch: o.arch
      })));
    }
    t(null, f);
  }), n.on("error", function(l) {
    a = l, t(l);
  }), this;
};
fe.prototype.get = function(t, r) {
  if (typeof r != "function")
    throw new TypeError("must specify a callback");
  var n = ["QUERY", this.path];
  t == "" ? n.push("/ve") : n = n.concat(["/v", t]), Yr(n, this.arch);
  var i = Vr(Kr(), n, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), o = "", a = this, s = null, l = zr(i);
  return i.on("close", function(f) {
    if (!s)
      if (f !== 0)
        r(Wr("QUERY", f, l), null);
      else {
        for (var u = [], c = null, d = o.split(`
`), h = 0, m = 0, y = d.length; m < y; m++) {
          var g = d[m].trim();
          g.length > 0 && (h != 0 && u.push(g), ++h);
        }
        var $ = u[u.length - 1] || "", w = ev.exec($), O, N, j;
        w && (O = w[1].trim(), N = w[2].trim(), j = w[3], c = new _o(a.host, a.hive, a.key, O, N, j, a.arch)), r(null, c);
      }
  }), i.stdout.on("data", function(f) {
    o += f.toString();
  }), i.on("error", function(f) {
    s = f, r(f);
  }), this;
};
fe.prototype.set = function(t, r, n, i) {
  if (typeof i != "function")
    throw new TypeError("must specify a callback");
  if (Zg.indexOf(r) == -1)
    throw Error("illegal type specified.");
  var o = ["ADD", this.path];
  t == "" ? o.push("/ve") : o = o.concat(["/v", t]), o = o.concat(["/t", r, "/d", n, "/f"]), Yr(o, this.arch);
  var a = Vr(Kr(), o, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), s = null, l = zr(a);
  return a.on("close", function(f) {
    s || i(f !== 0 ? Wr("ADD", f, l) : null);
  }), a.stdout.on("data", function(f) {
  }), a.on("error", function(f) {
    s = f, i(f);
  }), this;
};
fe.prototype.remove = function(t, r) {
  if (typeof r != "function")
    throw new TypeError("must specify a callback");
  var n = t ? ["DELETE", this.path, "/f", "/v", t] : ["DELETE", this.path, "/f", "/ve"];
  Yr(n, this.arch);
  var i = Vr(Kr(), n, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), o = null, a = zr(i);
  return i.on("close", function(s) {
    o || (s !== 0 ? r(Wr("DELETE", s, a), null) : r(null));
  }), i.stdout.on("data", function(s) {
  }), i.on("error", function(s) {
    o = s, r(s);
  }), this;
};
fe.prototype.clear = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["DELETE", this.path, "/f", "/va"];
  Yr(r, this.arch);
  var n = Vr(Kr(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = null, o = zr(n);
  return n.on("close", function(a) {
    i || (a !== 0 ? t(Wr("DELETE", a, o), null) : t(null));
  }), n.stdout.on("data", function(a) {
  }), n.on("error", function(a) {
    i = a, t(a);
  }), this;
};
fe.prototype.erase = fe.prototype.clear;
fe.prototype.destroy = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["DELETE", this.path, "/f"];
  Yr(r, this.arch);
  var n = Vr(Kr(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = null, o = zr(n);
  return n.on("close", function(a) {
    i || (a !== 0 ? t(Wr("DELETE", a, o), null) : t(null));
  }), n.stdout.on("data", function(a) {
  }), n.on("error", function(a) {
    i = a, t(a);
  }), this;
};
fe.prototype.create = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["ADD", this.path, "/f"];
  Yr(r, this.arch);
  var n = Vr(Kr(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = null, o = zr(n);
  return n.on("close", function(a) {
    i || (a !== 0 ? t(Wr("ADD", a, o), null) : t(null));
  }), n.stdout.on("data", function(a) {
  }), n.on("error", function(a) {
    i = a, t(a);
  }), this;
};
fe.prototype.keyExists = function(t) {
  return this.values(function(r, n) {
    if (r)
      return r.code == 1 ? t(null, !1) : t(r);
    t(null, !0);
  }), this;
};
fe.prototype.valueExists = function(t, r) {
  return this.get(t, function(n, i) {
    if (n)
      return n.code == 1 ? r(null, !1) : r(n);
    r(null, !0);
  }), this;
};
var FL = fe;
const za = /* @__PURE__ */ rs(FL), Rp = "6.0.0", Et = {
  version: Rp,
  maintenance: !1,
  discord: "https://discord.gg/E8eRK4uhPj",
  //Peut etre vide
  teamspeak: "ts3server://ts3.unreallife.fr",
  //Peut etre vide
  website: "https://unreallife.fr/",
  //Peut etre vide
  twitch: "",
  //Peut etre vide
  youtube: "",
  //Peut etre vide
  serverName: "UnrealLife",
  title: `Unreal Life - ${Rp}`,
  urlMods: "http://188.165.200.136/modsList",
  urlRessources: "http://188.165.200.136/other_ressources",
  mdNews: "http://188.165.200.136/news/news.md",
  serverIp: "127.0.0.1",
  serverPort: 2302,
  serverPassword: "password",
  folderModsName: "@A3URL"
};
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function tv(e) {
  return typeof e > "u" || e === null;
}
function LL(e) {
  return typeof e == "object" && e !== null;
}
function UL(e) {
  return Array.isArray(e) ? e : tv(e) ? [] : [e];
}
function ML(e, t) {
  var r, n, i, o;
  if (t)
    for (o = Object.keys(t), r = 0, n = o.length; r < n; r += 1)
      i = o[r], e[i] = t[i];
  return e;
}
function jL(e, t) {
  var r = "", n;
  for (n = 0; n < t; n += 1)
    r += e;
  return r;
}
function BL(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
var HL = tv, qL = LL, GL = UL, VL = jL, zL = BL, WL = ML, Fe = {
  isNothing: HL,
  isObject: qL,
  toArray: GL,
  repeat: VL,
  isNegativeZero: zL,
  extend: WL
};
function rv(e, t) {
  var r = "", n = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (r += `

` + e.mark.snippet), n + " " + r) : n;
}
function wo(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = rv(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
wo.prototype = Object.create(Error.prototype);
wo.prototype.constructor = wo;
wo.prototype.toString = function(t) {
  return this.name + ": " + rv(this, t);
};
var st = wo;
function xl(e, t, r, n, i) {
  var o = "", a = "", s = Math.floor(i / 2) - 1;
  return n - t > s && (o = " ... ", t = n - s + o.length), r - n > s && (a = " ...", r = n + s - a.length), {
    str: o + e.slice(t, r).replace(/\t/g, "→") + a,
    pos: n - t + o.length
    // relative position
  };
}
function Fl(e, t) {
  return Fe.repeat(" ", t - e.length) + e;
}
function YL(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, n = [0], i = [], o, a = -1; o = r.exec(e.buffer); )
    i.push(o.index), n.push(o.index + o[0].length), e.position <= o.index && a < 0 && (a = n.length - 2);
  a < 0 && (a = n.length - 1);
  var s = "", l, f, u = Math.min(e.line + t.linesAfter, i.length).toString().length, c = t.maxLength - (t.indent + u + 3);
  for (l = 1; l <= t.linesBefore && !(a - l < 0); l++)
    f = xl(
      e.buffer,
      n[a - l],
      i[a - l],
      e.position - (n[a] - n[a - l]),
      c
    ), s = Fe.repeat(" ", t.indent) + Fl((e.line - l + 1).toString(), u) + " | " + f.str + `
` + s;
  for (f = xl(e.buffer, n[a], i[a], e.position, c), s += Fe.repeat(" ", t.indent) + Fl((e.line + 1).toString(), u) + " | " + f.str + `
`, s += Fe.repeat("-", t.indent + u + 3 + f.pos) + `^
`, l = 1; l <= t.linesAfter && !(a + l >= i.length); l++)
    f = xl(
      e.buffer,
      n[a + l],
      i[a + l],
      e.position - (n[a] - n[a + l]),
      c
    ), s += Fe.repeat(" ", t.indent) + Fl((e.line + l + 1).toString(), u) + " | " + f.str + `
`;
  return s.replace(/\n$/, "");
}
var KL = YL, XL = [
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
], JL = [
  "scalar",
  "sequence",
  "mapping"
];
function QL(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(n) {
      t[String(n)] = r;
    });
  }), t;
}
function ZL(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(r) {
    if (XL.indexOf(r) === -1)
      throw new st('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(r) {
    return r;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = QL(t.styleAliases || null), JL.indexOf(this.kind) === -1)
    throw new st('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var We = ZL;
function Dp(e, t) {
  var r = [];
  return e[t].forEach(function(n) {
    var i = r.length;
    r.forEach(function(o, a) {
      o.tag === n.tag && o.kind === n.kind && o.multi === n.multi && (i = a);
    }), r[i] = n;
  }), r;
}
function eU() {
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
function mc(e) {
  return this.extend(e);
}
mc.prototype.extend = function(t) {
  var r = [], n = [];
  if (t instanceof We)
    n.push(t);
  else if (Array.isArray(t))
    n = n.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
  else
    throw new st("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(o) {
    if (!(o instanceof We))
      throw new st("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new st("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new st("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), n.forEach(function(o) {
    if (!(o instanceof We))
      throw new st("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(mc.prototype);
  return i.implicit = (this.implicit || []).concat(r), i.explicit = (this.explicit || []).concat(n), i.compiledImplicit = Dp(i, "implicit"), i.compiledExplicit = Dp(i, "explicit"), i.compiledTypeMap = eU(i.compiledImplicit, i.compiledExplicit), i;
};
var nv = mc, iv = new We("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), ov = new We("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), av = new We("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), sv = new nv({
  explicit: [
    iv,
    ov,
    av
  ]
});
function tU(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function rU() {
  return null;
}
function nU(e) {
  return e === null;
}
var lv = new We("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: tU,
  construct: rU,
  predicate: nU,
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
});
function iU(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function oU(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function aU(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var cv = new We("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: iU,
  construct: oU,
  predicate: aU,
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
});
function sU(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function lU(e) {
  return 48 <= e && e <= 55;
}
function cU(e) {
  return 48 <= e && e <= 57;
}
function uU(e) {
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
          if (!sU(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "o") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!lU(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; r < t; r++)
    if (i = e[r], i !== "_") {
      if (!cU(e.charCodeAt(r)))
        return !1;
      n = !0;
    }
  return !(!n || i === "_");
}
function fU(e) {
  var t = e, r = 1, n;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), n = t[0], (n === "-" || n === "+") && (n === "-" && (r = -1), t = t.slice(1), n = t[0]), t === "0") return 0;
  if (n === "0") {
    if (t[1] === "b") return r * parseInt(t.slice(2), 2);
    if (t[1] === "x") return r * parseInt(t.slice(2), 16);
    if (t[1] === "o") return r * parseInt(t.slice(2), 8);
  }
  return r * parseInt(t, 10);
}
function dU(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !Fe.isNegativeZero(e);
}
var uv = new We("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: uU,
  construct: fU,
  predicate: dU,
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
}), hU = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function pU(e) {
  return !(e === null || !hU.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function mU(e) {
  var t, r;
  return t = e.replace(/_/g, "").toLowerCase(), r = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : r * parseFloat(t, 10);
}
var yU = /^[-+]?[0-9]+e/;
function gU(e, t) {
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
  else if (Fe.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), yU.test(r) ? r.replace("e", ".e") : r;
}
function vU(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || Fe.isNegativeZero(e));
}
var fv = new We("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: pU,
  construct: mU,
  predicate: vU,
  represent: gU,
  defaultStyle: "lowercase"
}), dv = sv.extend({
  implicit: [
    lv,
    cv,
    uv,
    fv
  ]
}), hv = dv, pv = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), mv = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function $U(e) {
  return e === null ? !1 : pv.exec(e) !== null || mv.exec(e) !== null;
}
function _U(e) {
  var t, r, n, i, o, a, s, l = 0, f = null, u, c, d;
  if (t = pv.exec(e), t === null && (t = mv.exec(e)), t === null) throw new Error("Date resolve error");
  if (r = +t[1], n = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(r, n, i));
  if (o = +t[4], a = +t[5], s = +t[6], t[7]) {
    for (l = t[7].slice(0, 3); l.length < 3; )
      l += "0";
    l = +l;
  }
  return t[9] && (u = +t[10], c = +(t[11] || 0), f = (u * 60 + c) * 6e4, t[9] === "-" && (f = -f)), d = new Date(Date.UTC(r, n, i, o, a, s, l)), f && d.setTime(d.getTime() - f), d;
}
function wU(e) {
  return e.toISOString();
}
var yv = new We("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: $U,
  construct: _U,
  instanceOf: Date,
  represent: wU
});
function EU(e) {
  return e === "<<" || e === null;
}
var gv = new We("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: EU
}), lf = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function SU(e) {
  if (e === null) return !1;
  var t, r, n = 0, i = e.length, o = lf;
  for (r = 0; r < i; r++)
    if (t = o.indexOf(e.charAt(r)), !(t > 64)) {
      if (t < 0) return !1;
      n += 6;
    }
  return n % 8 === 0;
}
function bU(e) {
  var t, r, n = e.replace(/[\r\n=]/g, ""), i = n.length, o = lf, a = 0, s = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)), a = a << 6 | o.indexOf(n.charAt(t));
  return r = i % 4 * 6, r === 0 ? (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)) : r === 18 ? (s.push(a >> 10 & 255), s.push(a >> 2 & 255)) : r === 12 && s.push(a >> 4 & 255), new Uint8Array(s);
}
function AU(e) {
  var t = "", r = 0, n, i, o = e.length, a = lf;
  for (n = 0; n < o; n++)
    n % 3 === 0 && n && (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]), r = (r << 8) + e[n];
  return i = o % 3, i === 0 ? (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]) : i === 2 ? (t += a[r >> 10 & 63], t += a[r >> 4 & 63], t += a[r << 2 & 63], t += a[64]) : i === 1 && (t += a[r >> 2 & 63], t += a[r << 4 & 63], t += a[64], t += a[64]), t;
}
function TU(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var vv = new We("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: SU,
  construct: bU,
  predicate: TU,
  represent: AU
}), PU = Object.prototype.hasOwnProperty, CU = Object.prototype.toString;
function OU(e) {
  if (e === null) return !0;
  var t = [], r, n, i, o, a, s = e;
  for (r = 0, n = s.length; r < n; r += 1) {
    if (i = s[r], a = !1, CU.call(i) !== "[object Object]") return !1;
    for (o in i)
      if (PU.call(i, o))
        if (!a) a = !0;
        else return !1;
    if (!a) return !1;
    if (t.indexOf(o) === -1) t.push(o);
    else return !1;
  }
  return !0;
}
function IU(e) {
  return e !== null ? e : [];
}
var $v = new We("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: OU,
  construct: IU
}), NU = Object.prototype.toString;
function RU(e) {
  if (e === null) return !0;
  var t, r, n, i, o, a = e;
  for (o = new Array(a.length), t = 0, r = a.length; t < r; t += 1) {
    if (n = a[t], NU.call(n) !== "[object Object]" || (i = Object.keys(n), i.length !== 1)) return !1;
    o[t] = [i[0], n[i[0]]];
  }
  return !0;
}
function DU(e) {
  if (e === null) return [];
  var t, r, n, i, o, a = e;
  for (o = new Array(a.length), t = 0, r = a.length; t < r; t += 1)
    n = a[t], i = Object.keys(n), o[t] = [i[0], n[i[0]]];
  return o;
}
var _v = new We("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: RU,
  construct: DU
}), kU = Object.prototype.hasOwnProperty;
function xU(e) {
  if (e === null) return !0;
  var t, r = e;
  for (t in r)
    if (kU.call(r, t) && r[t] !== null)
      return !1;
  return !0;
}
function FU(e) {
  return e !== null ? e : {};
}
var wv = new We("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: xU,
  construct: FU
}), cf = hv.extend({
  implicit: [
    yv,
    gv
  ],
  explicit: [
    vv,
    $v,
    _v,
    wv
  ]
}), Hr = Object.prototype.hasOwnProperty, Wa = 1, Ev = 2, Sv = 3, Ya = 4, Ll = 1, LU = 2, kp = 3, UU = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, MU = /[\x85\u2028\u2029]/, jU = /[,\[\]\{\}]/, bv = /^(?:!|!!|![a-z\-]+!)$/i, Av = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function xp(e) {
  return Object.prototype.toString.call(e);
}
function Wt(e) {
  return e === 10 || e === 13;
}
function yn(e) {
  return e === 9 || e === 32;
}
function vt(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function Yn(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function BU(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function HU(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function qU(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function Fp(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function GU(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var Tv = new Array(256), Pv = new Array(256);
for (var Ln = 0; Ln < 256; Ln++)
  Tv[Ln] = Fp(Ln) ? 1 : 0, Pv[Ln] = Fp(Ln);
function VU(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || cf, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Cv(e, t) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = KL(r), new st(t, r);
}
function ee(e, t) {
  throw Cv(e, t);
}
function Ka(e, t) {
  e.onWarning && e.onWarning.call(null, Cv(e, t));
}
var Lp = {
  YAML: function(t, r, n) {
    var i, o, a;
    t.version !== null && ee(t, "duplication of %YAML directive"), n.length !== 1 && ee(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(n[0]), i === null && ee(t, "ill-formed argument of the YAML directive"), o = parseInt(i[1], 10), a = parseInt(i[2], 10), o !== 1 && ee(t, "unacceptable YAML version of the document"), t.version = n[0], t.checkLineBreaks = a < 2, a !== 1 && a !== 2 && Ka(t, "unsupported YAML version of the document");
  },
  TAG: function(t, r, n) {
    var i, o;
    n.length !== 2 && ee(t, "TAG directive accepts exactly two arguments"), i = n[0], o = n[1], bv.test(i) || ee(t, "ill-formed tag handle (first argument) of the TAG directive"), Hr.call(t.tagMap, i) && ee(t, 'there is a previously declared suffix for "' + i + '" tag handle'), Av.test(o) || ee(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      o = decodeURIComponent(o);
    } catch {
      ee(t, "tag prefix is malformed: " + o);
    }
    t.tagMap[i] = o;
  }
};
function Lr(e, t, r, n) {
  var i, o, a, s;
  if (t < r) {
    if (s = e.input.slice(t, r), n)
      for (i = 0, o = s.length; i < o; i += 1)
        a = s.charCodeAt(i), a === 9 || 32 <= a && a <= 1114111 || ee(e, "expected valid JSON character");
    else UU.test(s) && ee(e, "the stream contains non-printable characters");
    e.result += s;
  }
}
function Up(e, t, r, n) {
  var i, o, a, s;
  for (Fe.isObject(r) || ee(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(r), a = 0, s = i.length; a < s; a += 1)
    o = i[a], Hr.call(t, o) || (t[o] = r[o], n[o] = !0);
}
function Kn(e, t, r, n, i, o, a, s, l) {
  var f, u;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), f = 0, u = i.length; f < u; f += 1)
      Array.isArray(i[f]) && ee(e, "nested arrays are not supported inside keys"), typeof i == "object" && xp(i[f]) === "[object Object]" && (i[f] = "[object Object]");
  if (typeof i == "object" && xp(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), n === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (f = 0, u = o.length; f < u; f += 1)
        Up(e, t, o[f], r);
    else
      Up(e, t, o, r);
  else
    !e.json && !Hr.call(r, i) && Hr.call(t, i) && (e.line = a || e.line, e.lineStart = s || e.lineStart, e.position = l || e.position, ee(e, "duplicated mapping key")), i === "__proto__" ? Object.defineProperty(t, i, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: o
    }) : t[i] = o, delete r[i];
  return t;
}
function uf(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : ee(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function De(e, t, r) {
  for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; yn(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (Wt(i))
      for (uf(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && n !== 0 && e.lineIndent < r && Ka(e, "deficient indentation"), n;
}
function Bs(e) {
  var t = e.position, r;
  return r = e.input.charCodeAt(t), !!((r === 45 || r === 46) && r === e.input.charCodeAt(t + 1) && r === e.input.charCodeAt(t + 2) && (t += 3, r = e.input.charCodeAt(t), r === 0 || vt(r)));
}
function ff(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += Fe.repeat(`
`, t - 1));
}
function zU(e, t, r) {
  var n, i, o, a, s, l, f, u, c = e.kind, d = e.result, h;
  if (h = e.input.charCodeAt(e.position), vt(h) || Yn(h) || h === 35 || h === 38 || h === 42 || h === 33 || h === 124 || h === 62 || h === 39 || h === 34 || h === 37 || h === 64 || h === 96 || (h === 63 || h === 45) && (i = e.input.charCodeAt(e.position + 1), vt(i) || r && Yn(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", o = a = e.position, s = !1; h !== 0; ) {
    if (h === 58) {
      if (i = e.input.charCodeAt(e.position + 1), vt(i) || r && Yn(i))
        break;
    } else if (h === 35) {
      if (n = e.input.charCodeAt(e.position - 1), vt(n))
        break;
    } else {
      if (e.position === e.lineStart && Bs(e) || r && Yn(h))
        break;
      if (Wt(h))
        if (l = e.line, f = e.lineStart, u = e.lineIndent, De(e, !1, -1), e.lineIndent >= t) {
          s = !0, h = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = a, e.line = l, e.lineStart = f, e.lineIndent = u;
          break;
        }
    }
    s && (Lr(e, o, a, !1), ff(e, e.line - l), o = a = e.position, s = !1), yn(h) || (a = e.position + 1), h = e.input.charCodeAt(++e.position);
  }
  return Lr(e, o, a, !1), e.result ? !0 : (e.kind = c, e.result = d, !1);
}
function WU(e, t) {
  var r, n, i;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (Lr(e, n, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        n = e.position, e.position++, i = e.position;
      else
        return !0;
    else Wt(r) ? (Lr(e, n, i, !0), ff(e, De(e, !1, t)), n = i = e.position) : e.position === e.lineStart && Bs(e) ? ee(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  ee(e, "unexpected end of the stream within a single quoted scalar");
}
function YU(e, t) {
  var r, n, i, o, a, s;
  if (s = e.input.charCodeAt(e.position), s !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (s = e.input.charCodeAt(e.position)) !== 0; ) {
    if (s === 34)
      return Lr(e, r, e.position, !0), e.position++, !0;
    if (s === 92) {
      if (Lr(e, r, e.position, !0), s = e.input.charCodeAt(++e.position), Wt(s))
        De(e, !1, t);
      else if (s < 256 && Tv[s])
        e.result += Pv[s], e.position++;
      else if ((a = HU(s)) > 0) {
        for (i = a, o = 0; i > 0; i--)
          s = e.input.charCodeAt(++e.position), (a = BU(s)) >= 0 ? o = (o << 4) + a : ee(e, "expected hexadecimal character");
        e.result += GU(o), e.position++;
      } else
        ee(e, "unknown escape sequence");
      r = n = e.position;
    } else Wt(s) ? (Lr(e, r, n, !0), ff(e, De(e, !1, t)), r = n = e.position) : e.position === e.lineStart && Bs(e) ? ee(e, "unexpected end of the document within a double quoted scalar") : (e.position++, n = e.position);
  }
  ee(e, "unexpected end of the stream within a double quoted scalar");
}
function KU(e, t) {
  var r = !0, n, i, o, a = e.tag, s, l = e.anchor, f, u, c, d, h, m = /* @__PURE__ */ Object.create(null), y, g, $, w;
  if (w = e.input.charCodeAt(e.position), w === 91)
    u = 93, h = !1, s = [];
  else if (w === 123)
    u = 125, h = !0, s = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), w = e.input.charCodeAt(++e.position); w !== 0; ) {
    if (De(e, !0, t), w = e.input.charCodeAt(e.position), w === u)
      return e.position++, e.tag = a, e.anchor = l, e.kind = h ? "mapping" : "sequence", e.result = s, !0;
    r ? w === 44 && ee(e, "expected the node content, but found ','") : ee(e, "missed comma between flow collection entries"), g = y = $ = null, c = d = !1, w === 63 && (f = e.input.charCodeAt(e.position + 1), vt(f) && (c = d = !0, e.position++, De(e, !0, t))), n = e.line, i = e.lineStart, o = e.position, si(e, t, Wa, !1, !0), g = e.tag, y = e.result, De(e, !0, t), w = e.input.charCodeAt(e.position), (d || e.line === n) && w === 58 && (c = !0, w = e.input.charCodeAt(++e.position), De(e, !0, t), si(e, t, Wa, !1, !0), $ = e.result), h ? Kn(e, s, m, g, y, $, n, i, o) : c ? s.push(Kn(e, null, m, g, y, $, n, i, o)) : s.push(y), De(e, !0, t), w = e.input.charCodeAt(e.position), w === 44 ? (r = !0, w = e.input.charCodeAt(++e.position)) : r = !1;
  }
  ee(e, "unexpected end of the stream within a flow collection");
}
function XU(e, t) {
  var r, n, i = Ll, o = !1, a = !1, s = t, l = 0, f = !1, u, c;
  if (c = e.input.charCodeAt(e.position), c === 124)
    n = !1;
  else if (c === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; c !== 0; )
    if (c = e.input.charCodeAt(++e.position), c === 43 || c === 45)
      Ll === i ? i = c === 43 ? kp : LU : ee(e, "repeat of a chomping mode identifier");
    else if ((u = qU(c)) >= 0)
      u === 0 ? ee(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : a ? ee(e, "repeat of an indentation width identifier") : (s = t + u - 1, a = !0);
    else
      break;
  if (yn(c)) {
    do
      c = e.input.charCodeAt(++e.position);
    while (yn(c));
    if (c === 35)
      do
        c = e.input.charCodeAt(++e.position);
      while (!Wt(c) && c !== 0);
  }
  for (; c !== 0; ) {
    for (uf(e), e.lineIndent = 0, c = e.input.charCodeAt(e.position); (!a || e.lineIndent < s) && c === 32; )
      e.lineIndent++, c = e.input.charCodeAt(++e.position);
    if (!a && e.lineIndent > s && (s = e.lineIndent), Wt(c)) {
      l++;
      continue;
    }
    if (e.lineIndent < s) {
      i === kp ? e.result += Fe.repeat(`
`, o ? 1 + l : l) : i === Ll && o && (e.result += `
`);
      break;
    }
    for (n ? yn(c) ? (f = !0, e.result += Fe.repeat(`
`, o ? 1 + l : l)) : f ? (f = !1, e.result += Fe.repeat(`
`, l + 1)) : l === 0 ? o && (e.result += " ") : e.result += Fe.repeat(`
`, l) : e.result += Fe.repeat(`
`, o ? 1 + l : l), o = !0, a = !0, l = 0, r = e.position; !Wt(c) && c !== 0; )
      c = e.input.charCodeAt(++e.position);
    Lr(e, r, e.position, !1);
  }
  return !0;
}
function Mp(e, t) {
  var r, n = e.tag, i = e.anchor, o = [], a, s = !1, l;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = o), l = e.input.charCodeAt(e.position); l !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, ee(e, "tab characters must not be used in indentation")), !(l !== 45 || (a = e.input.charCodeAt(e.position + 1), !vt(a)))); ) {
    if (s = !0, e.position++, De(e, !0, -1) && e.lineIndent <= t) {
      o.push(null), l = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, si(e, t, Sv, !1, !0), o.push(e.result), De(e, !0, -1), l = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > t) && l !== 0)
      ee(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return s ? (e.tag = n, e.anchor = i, e.kind = "sequence", e.result = o, !0) : !1;
}
function JU(e, t, r) {
  var n, i, o, a, s, l, f = e.tag, u = e.anchor, c = {}, d = /* @__PURE__ */ Object.create(null), h = null, m = null, y = null, g = !1, $ = !1, w;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = c), w = e.input.charCodeAt(e.position); w !== 0; ) {
    if (!g && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, ee(e, "tab characters must not be used in indentation")), n = e.input.charCodeAt(e.position + 1), o = e.line, (w === 63 || w === 58) && vt(n))
      w === 63 ? (g && (Kn(e, c, d, h, m, null, a, s, l), h = m = y = null), $ = !0, g = !0, i = !0) : g ? (g = !1, i = !0) : ee(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, w = n;
    else {
      if (a = e.line, s = e.lineStart, l = e.position, !si(e, r, Ev, !1, !0))
        break;
      if (e.line === o) {
        for (w = e.input.charCodeAt(e.position); yn(w); )
          w = e.input.charCodeAt(++e.position);
        if (w === 58)
          w = e.input.charCodeAt(++e.position), vt(w) || ee(e, "a whitespace character is expected after the key-value separator within a block mapping"), g && (Kn(e, c, d, h, m, null, a, s, l), h = m = y = null), $ = !0, g = !1, i = !1, h = e.tag, m = e.result;
        else if ($)
          ee(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = f, e.anchor = u, !0;
      } else if ($)
        ee(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = f, e.anchor = u, !0;
    }
    if ((e.line === o || e.lineIndent > t) && (g && (a = e.line, s = e.lineStart, l = e.position), si(e, t, Ya, !0, i) && (g ? m = e.result : y = e.result), g || (Kn(e, c, d, h, m, y, a, s, l), h = m = y = null), De(e, !0, -1), w = e.input.charCodeAt(e.position)), (e.line === o || e.lineIndent > t) && w !== 0)
      ee(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return g && Kn(e, c, d, h, m, null, a, s, l), $ && (e.tag = f, e.anchor = u, e.kind = "mapping", e.result = c), $;
}
function QU(e) {
  var t, r = !1, n = !1, i, o, a;
  if (a = e.input.charCodeAt(e.position), a !== 33) return !1;
  if (e.tag !== null && ee(e, "duplication of a tag property"), a = e.input.charCodeAt(++e.position), a === 60 ? (r = !0, a = e.input.charCodeAt(++e.position)) : a === 33 ? (n = !0, i = "!!", a = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, r) {
    do
      a = e.input.charCodeAt(++e.position);
    while (a !== 0 && a !== 62);
    e.position < e.length ? (o = e.input.slice(t, e.position), a = e.input.charCodeAt(++e.position)) : ee(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; a !== 0 && !vt(a); )
      a === 33 && (n ? ee(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), bv.test(i) || ee(e, "named tag handle cannot contain such characters"), n = !0, t = e.position + 1)), a = e.input.charCodeAt(++e.position);
    o = e.input.slice(t, e.position), jU.test(o) && ee(e, "tag suffix cannot contain flow indicator characters");
  }
  o && !Av.test(o) && ee(e, "tag name cannot contain such characters: " + o);
  try {
    o = decodeURIComponent(o);
  } catch {
    ee(e, "tag name is malformed: " + o);
  }
  return r ? e.tag = o : Hr.call(e.tagMap, i) ? e.tag = e.tagMap[i] + o : i === "!" ? e.tag = "!" + o : i === "!!" ? e.tag = "tag:yaml.org,2002:" + o : ee(e, 'undeclared tag handle "' + i + '"'), !0;
}
function ZU(e) {
  var t, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && ee(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !vt(r) && !Yn(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && ee(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function eM(e) {
  var t, r, n;
  if (n = e.input.charCodeAt(e.position), n !== 42) return !1;
  for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !vt(n) && !Yn(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && ee(e, "name of an alias node must contain at least one character"), r = e.input.slice(t, e.position), Hr.call(e.anchorMap, r) || ee(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], De(e, !0, -1), !0;
}
function si(e, t, r, n, i) {
  var o, a, s, l = 1, f = !1, u = !1, c, d, h, m, y, g;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, o = a = s = Ya === r || Sv === r, n && De(e, !0, -1) && (f = !0, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)), l === 1)
    for (; QU(e) || ZU(e); )
      De(e, !0, -1) ? (f = !0, s = o, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)) : s = !1;
  if (s && (s = f || i), (l === 1 || Ya === r) && (Wa === r || Ev === r ? y = t : y = t + 1, g = e.position - e.lineStart, l === 1 ? s && (Mp(e, g) || JU(e, g, y)) || KU(e, y) ? u = !0 : (a && XU(e, y) || WU(e, y) || YU(e, y) ? u = !0 : eM(e) ? (u = !0, (e.tag !== null || e.anchor !== null) && ee(e, "alias node should not have any properties")) : zU(e, y, Wa === r) && (u = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : l === 0 && (u = s && Mp(e, g))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && ee(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), c = 0, d = e.implicitTypes.length; c < d; c += 1)
      if (m = e.implicitTypes[c], m.resolve(e.result)) {
        e.result = m.construct(e.result), e.tag = m.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (Hr.call(e.typeMap[e.kind || "fallback"], e.tag))
      m = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (m = null, h = e.typeMap.multi[e.kind || "fallback"], c = 0, d = h.length; c < d; c += 1)
        if (e.tag.slice(0, h[c].tag.length) === h[c].tag) {
          m = h[c];
          break;
        }
    m || ee(e, "unknown tag !<" + e.tag + ">"), e.result !== null && m.kind !== e.kind && ee(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + m.kind + '", not "' + e.kind + '"'), m.resolve(e.result, e.tag) ? (e.result = m.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : ee(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || u;
}
function tM(e) {
  var t = e.position, r, n, i, o = !1, a;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (a = e.input.charCodeAt(e.position)) !== 0 && (De(e, !0, -1), a = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || a !== 37)); ) {
    for (o = !0, a = e.input.charCodeAt(++e.position), r = e.position; a !== 0 && !vt(a); )
      a = e.input.charCodeAt(++e.position);
    for (n = e.input.slice(r, e.position), i = [], n.length < 1 && ee(e, "directive name must not be less than one character in length"); a !== 0; ) {
      for (; yn(a); )
        a = e.input.charCodeAt(++e.position);
      if (a === 35) {
        do
          a = e.input.charCodeAt(++e.position);
        while (a !== 0 && !Wt(a));
        break;
      }
      if (Wt(a)) break;
      for (r = e.position; a !== 0 && !vt(a); )
        a = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(r, e.position));
    }
    a !== 0 && uf(e), Hr.call(Lp, n) ? Lp[n](e, n, i) : Ka(e, 'unknown document directive "' + n + '"');
  }
  if (De(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, De(e, !0, -1)) : o && ee(e, "directives end mark is expected"), si(e, e.lineIndent - 1, Ya, !1, !0), De(e, !0, -1), e.checkLineBreaks && MU.test(e.input.slice(t, e.position)) && Ka(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Bs(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, De(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    ee(e, "end of the stream or a document separator is expected");
  else
    return;
}
function Ov(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new VU(e, t), n = e.indexOf("\0");
  for (n !== -1 && (r.position = n, ee(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    tM(r);
  return r.documents;
}
function rM(e, t, r) {
  t !== null && typeof t == "object" && typeof r > "u" && (r = t, t = null);
  var n = Ov(e, r);
  if (typeof t != "function")
    return n;
  for (var i = 0, o = n.length; i < o; i += 1)
    t(n[i]);
}
function nM(e, t) {
  var r = Ov(e, t);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new st("expected a single document in the stream, but found more");
  }
}
var iM = rM, oM = nM, Iv = {
  loadAll: iM,
  load: oM
}, Nv = Object.prototype.toString, Rv = Object.prototype.hasOwnProperty, df = 65279, aM = 9, Eo = 10, sM = 13, lM = 32, cM = 33, uM = 34, yc = 35, fM = 37, dM = 38, hM = 39, pM = 42, Dv = 44, mM = 45, Xa = 58, yM = 61, gM = 62, vM = 63, $M = 64, kv = 91, xv = 93, _M = 96, Fv = 123, wM = 124, Lv = 125, nt = {};
nt[0] = "\\0";
nt[7] = "\\a";
nt[8] = "\\b";
nt[9] = "\\t";
nt[10] = "\\n";
nt[11] = "\\v";
nt[12] = "\\f";
nt[13] = "\\r";
nt[27] = "\\e";
nt[34] = '\\"';
nt[92] = "\\\\";
nt[133] = "\\N";
nt[160] = "\\_";
nt[8232] = "\\L";
nt[8233] = "\\P";
var EM = [
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
], SM = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function bM(e, t) {
  var r, n, i, o, a, s, l;
  if (t === null) return {};
  for (r = {}, n = Object.keys(t), i = 0, o = n.length; i < o; i += 1)
    a = n[i], s = String(t[a]), a.slice(0, 2) === "!!" && (a = "tag:yaml.org,2002:" + a.slice(2)), l = e.compiledTypeMap.fallback[a], l && Rv.call(l.styleAliases, s) && (s = l.styleAliases[s]), r[a] = s;
  return r;
}
function AM(e) {
  var t, r, n;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    r = "x", n = 2;
  else if (e <= 65535)
    r = "u", n = 4;
  else if (e <= 4294967295)
    r = "U", n = 8;
  else
    throw new st("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + Fe.repeat("0", n - t.length) + t;
}
var TM = 1, So = 2;
function PM(e) {
  this.schema = e.schema || cf, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = Fe.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = bM(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? So : TM, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function jp(e, t) {
  for (var r = Fe.repeat(" ", t), n = 0, i = -1, o = "", a, s = e.length; n < s; )
    i = e.indexOf(`
`, n), i === -1 ? (a = e.slice(n), n = s) : (a = e.slice(n, i + 1), n = i + 1), a.length && a !== `
` && (o += r), o += a;
  return o;
}
function gc(e, t) {
  return `
` + Fe.repeat(" ", e.indent * t);
}
function CM(e, t) {
  var r, n, i;
  for (r = 0, n = e.implicitTypes.length; r < n; r += 1)
    if (i = e.implicitTypes[r], i.resolve(t))
      return !0;
  return !1;
}
function Ja(e) {
  return e === lM || e === aM;
}
function bo(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== df || 65536 <= e && e <= 1114111;
}
function Bp(e) {
  return bo(e) && e !== df && e !== sM && e !== Eo;
}
function Hp(e, t, r) {
  var n = Bp(e), i = n && !Ja(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      n
    ) : n && e !== Dv && e !== kv && e !== xv && e !== Fv && e !== Lv) && e !== yc && !(t === Xa && !i) || Bp(t) && !Ja(t) && e === yc || t === Xa && i
  );
}
function OM(e) {
  return bo(e) && e !== df && !Ja(e) && e !== mM && e !== vM && e !== Xa && e !== Dv && e !== kv && e !== xv && e !== Fv && e !== Lv && e !== yc && e !== dM && e !== pM && e !== cM && e !== wM && e !== yM && e !== gM && e !== hM && e !== uM && e !== fM && e !== $M && e !== _M;
}
function IM(e) {
  return !Ja(e) && e !== Xa;
}
function Yi(e, t) {
  var r = e.charCodeAt(t), n;
  return r >= 55296 && r <= 56319 && t + 1 < e.length && (n = e.charCodeAt(t + 1), n >= 56320 && n <= 57343) ? (r - 55296) * 1024 + n - 56320 + 65536 : r;
}
function Uv(e) {
  var t = /^\n* /;
  return t.test(e);
}
var Mv = 1, vc = 2, jv = 3, Bv = 4, jn = 5;
function NM(e, t, r, n, i, o, a, s) {
  var l, f = 0, u = null, c = !1, d = !1, h = n !== -1, m = -1, y = OM(Yi(e, 0)) && IM(Yi(e, e.length - 1));
  if (t || a)
    for (l = 0; l < e.length; f >= 65536 ? l += 2 : l++) {
      if (f = Yi(e, l), !bo(f))
        return jn;
      y = y && Hp(f, u, s), u = f;
    }
  else {
    for (l = 0; l < e.length; f >= 65536 ? l += 2 : l++) {
      if (f = Yi(e, l), f === Eo)
        c = !0, h && (d = d || // Foldable line = too long, and not more-indented.
        l - m - 1 > n && e[m + 1] !== " ", m = l);
      else if (!bo(f))
        return jn;
      y = y && Hp(f, u, s), u = f;
    }
    d = d || h && l - m - 1 > n && e[m + 1] !== " ";
  }
  return !c && !d ? y && !a && !i(e) ? Mv : o === So ? jn : vc : r > 9 && Uv(e) ? jn : a ? o === So ? jn : vc : d ? Bv : jv;
}
function RM(e, t, r, n, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === So ? '""' : "''";
    if (!e.noCompatMode && (EM.indexOf(t) !== -1 || SM.test(t)))
      return e.quotingType === So ? '"' + t + '"' : "'" + t + "'";
    var o = e.indent * Math.max(1, r), a = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o), s = n || e.flowLevel > -1 && r >= e.flowLevel;
    function l(f) {
      return CM(e, f);
    }
    switch (NM(
      t,
      s,
      e.indent,
      a,
      l,
      e.quotingType,
      e.forceQuotes && !n,
      i
    )) {
      case Mv:
        return t;
      case vc:
        return "'" + t.replace(/'/g, "''") + "'";
      case jv:
        return "|" + qp(t, e.indent) + Gp(jp(t, o));
      case Bv:
        return ">" + qp(t, e.indent) + Gp(jp(DM(t, a), o));
      case jn:
        return '"' + kM(t) + '"';
      default:
        throw new st("impossible error: invalid scalar style");
    }
  }();
}
function qp(e, t) {
  var r = Uv(e) ? String(t) : "", n = e[e.length - 1] === `
`, i = n && (e[e.length - 2] === `
` || e === `
`), o = i ? "+" : n ? "" : "-";
  return r + o + `
`;
}
function Gp(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function DM(e, t) {
  for (var r = /(\n+)([^\n]*)/g, n = function() {
    var f = e.indexOf(`
`);
    return f = f !== -1 ? f : e.length, r.lastIndex = f, Vp(e.slice(0, f), t);
  }(), i = e[0] === `
` || e[0] === " ", o, a; a = r.exec(e); ) {
    var s = a[1], l = a[2];
    o = l[0] === " ", n += s + (!i && !o && l !== "" ? `
` : "") + Vp(l, t), i = o;
  }
  return n;
}
function Vp(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, n, i = 0, o, a = 0, s = 0, l = ""; n = r.exec(e); )
    s = n.index, s - i > t && (o = a > i ? a : s, l += `
` + e.slice(i, o), i = o + 1), a = s;
  return l += `
`, e.length - i > t && a > i ? l += e.slice(i, a) + `
` + e.slice(a + 1) : l += e.slice(i), l.slice(1);
}
function kM(e) {
  for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? i += 2 : i++)
    r = Yi(e, i), n = nt[r], !n && bo(r) ? (t += e[i], r >= 65536 && (t += e[i + 1])) : t += n || AM(r);
  return t;
}
function xM(e, t, r) {
  var n = "", i = e.tag, o, a, s;
  for (o = 0, a = r.length; o < a; o += 1)
    s = r[o], e.replacer && (s = e.replacer.call(r, String(o), s)), (dr(e, t, s, !1, !1) || typeof s > "u" && dr(e, t, null, !1, !1)) && (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), n += e.dump);
  e.tag = i, e.dump = "[" + n + "]";
}
function zp(e, t, r, n) {
  var i = "", o = e.tag, a, s, l;
  for (a = 0, s = r.length; a < s; a += 1)
    l = r[a], e.replacer && (l = e.replacer.call(r, String(a), l)), (dr(e, t + 1, l, !0, !0, !1, !0) || typeof l > "u" && dr(e, t + 1, null, !0, !0, !1, !0)) && ((!n || i !== "") && (i += gc(e, t)), e.dump && Eo === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = o, e.dump = i || "[]";
}
function FM(e, t, r) {
  var n = "", i = e.tag, o = Object.keys(r), a, s, l, f, u;
  for (a = 0, s = o.length; a < s; a += 1)
    u = "", n !== "" && (u += ", "), e.condenseFlow && (u += '"'), l = o[a], f = r[l], e.replacer && (f = e.replacer.call(r, l, f)), dr(e, t, l, !1, !1) && (e.dump.length > 1024 && (u += "? "), u += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), dr(e, t, f, !1, !1) && (u += e.dump, n += u));
  e.tag = i, e.dump = "{" + n + "}";
}
function LM(e, t, r, n) {
  var i = "", o = e.tag, a = Object.keys(r), s, l, f, u, c, d;
  if (e.sortKeys === !0)
    a.sort();
  else if (typeof e.sortKeys == "function")
    a.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new st("sortKeys must be a boolean or a function");
  for (s = 0, l = a.length; s < l; s += 1)
    d = "", (!n || i !== "") && (d += gc(e, t)), f = a[s], u = r[f], e.replacer && (u = e.replacer.call(r, f, u)), dr(e, t + 1, f, !0, !0, !0) && (c = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, c && (e.dump && Eo === e.dump.charCodeAt(0) ? d += "?" : d += "? "), d += e.dump, c && (d += gc(e, t)), dr(e, t + 1, u, !0, c) && (e.dump && Eo === e.dump.charCodeAt(0) ? d += ":" : d += ": ", d += e.dump, i += d));
  e.tag = o, e.dump = i || "{}";
}
function Wp(e, t, r) {
  var n, i, o, a, s, l;
  for (i = r ? e.explicitTypes : e.implicitTypes, o = 0, a = i.length; o < a; o += 1)
    if (s = i[o], (s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (r ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        if (l = e.styleMap[s.tag] || s.defaultStyle, Nv.call(s.represent) === "[object Function]")
          n = s.represent(t, l);
        else if (Rv.call(s.represent, l))
          n = s.represent[l](t, l);
        else
          throw new st("!<" + s.tag + '> tag resolver accepts not "' + l + '" style');
        e.dump = n;
      }
      return !0;
    }
  return !1;
}
function dr(e, t, r, n, i, o, a) {
  e.tag = null, e.dump = r, Wp(e, r, !1) || Wp(e, r, !0);
  var s = Nv.call(e.dump), l = n, f;
  n && (n = e.flowLevel < 0 || e.flowLevel > t);
  var u = s === "[object Object]" || s === "[object Array]", c, d;
  if (u && (c = e.duplicates.indexOf(r), d = c !== -1), (e.tag !== null && e.tag !== "?" || d || e.indent !== 2 && t > 0) && (i = !1), d && e.usedDuplicates[c])
    e.dump = "*ref_" + c;
  else {
    if (u && d && !e.usedDuplicates[c] && (e.usedDuplicates[c] = !0), s === "[object Object]")
      n && Object.keys(e.dump).length !== 0 ? (LM(e, t, e.dump, i), d && (e.dump = "&ref_" + c + e.dump)) : (FM(e, t, e.dump), d && (e.dump = "&ref_" + c + " " + e.dump));
    else if (s === "[object Array]")
      n && e.dump.length !== 0 ? (e.noArrayIndent && !a && t > 0 ? zp(e, t - 1, e.dump, i) : zp(e, t, e.dump, i), d && (e.dump = "&ref_" + c + e.dump)) : (xM(e, t, e.dump), d && (e.dump = "&ref_" + c + " " + e.dump));
    else if (s === "[object String]")
      e.tag !== "?" && RM(e, e.dump, t, o, l);
    else {
      if (s === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new st("unacceptable kind of an object to dump " + s);
    }
    e.tag !== null && e.tag !== "?" && (f = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? f = "!" + f : f.slice(0, 18) === "tag:yaml.org,2002:" ? f = "!!" + f.slice(18) : f = "!<" + f + ">", e.dump = f + " " + e.dump);
  }
  return !0;
}
function UM(e, t) {
  var r = [], n = [], i, o;
  for ($c(e, r, n), i = 0, o = n.length; i < o; i += 1)
    t.duplicates.push(r[n[i]]);
  t.usedDuplicates = new Array(o);
}
function $c(e, t, r) {
  var n, i, o;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      r.indexOf(i) === -1 && r.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, o = e.length; i < o; i += 1)
        $c(e[i], t, r);
    else
      for (n = Object.keys(e), i = 0, o = n.length; i < o; i += 1)
        $c(e[n[i]], t, r);
}
function MM(e, t) {
  t = t || {};
  var r = new PM(t);
  r.noRefs || UM(e, r);
  var n = e;
  return r.replacer && (n = r.replacer.call({ "": n }, "", n)), dr(r, 0, n, !0, !0) ? r.dump + `
` : "";
}
var jM = MM, BM = {
  dump: jM
};
function hf(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
var HM = We, qM = nv, GM = sv, VM = dv, zM = hv, WM = cf, YM = Iv.load, KM = Iv.loadAll, XM = BM.dump, JM = st, QM = {
  binary: vv,
  float: fv,
  map: av,
  null: lv,
  pairs: _v,
  set: wv,
  timestamp: yv,
  bool: cv,
  int: uv,
  merge: gv,
  omap: $v,
  seq: ov,
  str: iv
}, ZM = hf("safeLoad", "load"), ej = hf("safeLoadAll", "loadAll"), tj = hf("safeDump", "dump"), rj = {
  Type: HM,
  Schema: qM,
  FAILSAFE_SCHEMA: GM,
  JSON_SCHEMA: VM,
  CORE_SCHEMA: zM,
  DEFAULT_SCHEMA: WM,
  load: YM,
  loadAll: KM,
  dump: XM,
  YAMLException: JM,
  types: QM,
  safeLoad: ZM,
  safeLoadAll: ej,
  safeDump: tj
};
const Ne = new js({
  name: "userData",
  cwd: "arma3-data",
  fileExtension: "json"
}), sr = new js({
  name: "modsListClient",
  cwd: "arma3-data",
  defaults: {
    modsList: []
  },
  fileExtension: "json"
}), Qa = new js({
  name: "modsListServer",
  cwd: "arma3-data",
  fileExtension: "json"
}), Yp = new js({
  name: "news",
  cwd: "arma3-data",
  fileExtension: "md"
});
async function nj() {
  return new Promise((e) => {
    new za({
      hive: za.HKLM,
      key: "\\SOFTWARE\\WOW6432Node\\Bohemia Interactive\\Arma 3"
    }).get("main", (r, n) => {
      e(r || !n ? null : n.value);
    });
  });
}
function ij(e) {
  return Pe.existsSync(`${e}\\${Et.folderModsName}`);
}
async function oj(e) {
  return await Pe.pathExists(`${e}\\arma3.exe`);
}
async function Kp(e) {
  return await Pe.pathExists(`${e}\\package_inst.exe`);
}
function Se(e, t, r, n, i, o, a) {
  e == null || e.webContents.send("main-process-message", {
    message: t,
    success: r,
    error: n,
    data: i,
    fileProgress: o,
    timeRemaining: a
  });
}
function aj(e) {
  e.webContents.on("did-finish-load", async () => {
    let r = Ne.get("arma3Path");
    const n = Ne.get("firstLaunch"), o = await (await fetch(Et.mdNews)).text();
    try {
      const a = rj.load(o);
      Yp.set("lastNews", a);
    } catch (a) {
      console.error("Erreur lors de l'analyse du YAML:", a), Se(
        e,
        "yaml-parse-error",
        void 0,
        "Erreur lors de l'analyse des nouvelles"
      );
    }
    if ((!r || r === "null") && (r = await nj(), r && Ne.set("arma3Path", r)), r && r !== "null") {
      const a = ij(r);
      Se(
        e,
        a ? "arma3Path-mod-loaded" : "arma3Path-mod-not-loaded",
        void 0,
        a ? void 0 : `Mod ${Et.folderModsName} non installé`
      ), n && (Se(
        e,
        "firstLaunch-done",
        "Nous vous avons trouvé Arma 3 automatiquement"
      ), Ne.set("firstLaunch", !1));
    } else
      Ne.set("arma3Path", null), Se(e, "arma3Path-not-loaded");
    sj(e);
  }), jt.on("locate-arma3", async () => {
    try {
      const r = await Df.showOpenDialog({
        properties: ["openDirectory"],
        title: "Sélectionner le dossier d'installation d'Arma 3",
        defaultPath: "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Arma 3"
      });
      if (!r.canceled && r.filePaths.length > 0) {
        const n = r.filePaths[0];
        await oj(n) ? (Ne.set("arma3Path", n), Se(e, "arma3Path-ready", "Arma 3 trouvé")) : Se(
          e,
          "arma3Path-invalid",
          void 0,
          "Le dossier sélectionné ne contient pas Arma 3"
        );
      }
    } catch (r) {
      console.error("Erreur lors de la sélection du dossier Arma 3:", r), Se(
        e,
        "arma3Path-error",
        void 0,
        r instanceof Error ? r.message : "Erreur inconnue"
      );
    }
  });
  let t = !1;
  jt.on("download-mods", async () => {
    var n;
    const r = Ne.get("arma3Path");
    if (!r) {
      Se(e, "download-error", void 0, "Chemin Arma 3 non trouvé");
      return;
    }
    lj(), Se(e, "download-start"), await cj(e), t && (t = !1);
    try {
      const i = `${r}\\${Et.folderModsName}\\addons`;
      await Pe.ensureDir(i);
      const o = Qa.get("modsList") || [], a = sr.get("modsList") || [];
      if (!Array.isArray(o))
        throw new Error("La liste des mods serveur est invalide");
      let s = 0, l = 0;
      const f = Date.now();
      let u = 0;
      for (const c of a) {
        if (!(c != null && c.name)) continue;
        if (!o.find(
          (h) => (h == null ? void 0 : h.name) === c.name
        )) {
          const h = `${i}\\${c.name}`;
          await Pe.pathExists(h) && await Pe.remove(h);
        }
      }
      for (const c of o) {
        if (!(c != null && c.name) || !(c != null && c.hash)) continue;
        const d = a.find(
          (h) => (h == null ? void 0 : h.name) === c.name
        );
        (!d || d.hash !== c.hash) && (s += c.size);
      }
      for (const c of o) {
        if (!(c != null && c.name) || !(c != null && c.hash)) continue;
        const d = a.find(
          (h) => (h == null ? void 0 : h.name) === c.name
        );
        if (!d || d.hash !== c.hash)
          try {
            const h = await fetch(`${Et.urlMods}/${c.name}`);
            if (!h.ok)
              throw new Error(`Erreur HTTP: ${h.status}`);
            const m = parseInt(
              h.headers.get("content-length") || "0"
            );
            let y = 0;
            const g = (n = h.body) == null ? void 0 : n.getReader(), $ = [];
            for (; ; ) {
              if (t)
                return;
              const { done: O, value: N } = await (g == null ? void 0 : g.read()) || {
                done: !0,
                value: void 0
              };
              if (O) break;
              $.push(N), y += (N == null ? void 0 : N.length) || 0, l += (N == null ? void 0 : N.length) || 0;
              const j = Math.round(
                y / m * 100
              ), I = (Date.now() - f) / 1e3, F = l / I, q = s - l, E = Math.round(
                q / F
              ), Y = Math.floor(E / 60), B = Math.round(E % 60), z = `${Y}m ${B}s`, X = Math.round(
                l / s * 100
              );
              Date.now() - u > 1e3 && (Se(
                e,
                "download-progress",
                X.toString(),
                void 0,
                c.name,
                j.toString(),
                z
              ), u = Date.now());
            }
            const w = Buffer.concat($);
            await Pe.writeFile(`${i}\\${c.name}`, w), a.push(c), sr.set("modsList", a);
          } catch (h) {
            console.error(
              `Erreur lors du téléchargement de ${c.name}:`,
              h
            );
            continue;
          }
      }
      Se(e, "download-complete", "Mods mis à jour avec succès"), Se(e, "arma3Path-mod-loaded", "Jeu prêt à être lancé");
    } catch (i) {
      console.error("Erreur lors du téléchargement des mods:", i), Se(
        e,
        "download-error",
        void 0,
        i instanceof Error ? i.message : "Erreur inconnue"
      );
    }
  }), jt.on("stop-download-mods", () => {
    t = !0, Se(e, "download-stop", "Téléchargement arrêté");
  }), jt.handle("get-arma3-path", async () => {
    const r = Ne.get("arma3Path");
    return r || null;
  }), jt.handle("locate-ts3", async () => {
    let r = Ne.get("ts3Path");
    if (!r || r === "null") {
      try {
        const i = new za({
          hive: za.HKLM,
          key: "\\SOFTWARE\\WOW6432Node\\TeamSpeak 3 Client"
        }), o = await new Promise((a) => {
          i.get("Install_Dir", (s, l) => {
            a(s || !l ? null : l.value);
          });
        });
        if (o && await Kp(o))
          return r = o, Ne.set("ts3Path", o), Se(e, "ts3Path-ready", "TeamSpeak 3 trouvé"), await Ul(), r;
      } catch (i) {
        console.error("Erreur lors de la lecture du registre:", i);
      }
      const n = await Df.showOpenDialog({
        properties: ["openDirectory"],
        title: "Sélectionner le dossier d'installation de TeamSpeak 3",
        defaultPath: "C:\\Program Files\\TeamSpeak 3 Client"
      });
      if (!n.canceled && n.filePaths.length > 0) {
        const i = n.filePaths[0];
        await Kp(i) ? (r = i, Ne.set("ts3Path", r), Se(e, "ts3Path-ready", "TeamSpeak 3 trouvé"), await Ul()) : Se(
          e,
          "ts3Path-invalid",
          void 0,
          "Chemin TeamSpeak 3 invalide"
        );
      }
    } else
      Se(e, "ts3Path-ready", "TeamSpeak 3 trouvé"), await Ul();
    return r;
  }), jt.handle("save-params-launch", async (r, n) => {
    Ne.set("paramsLaunch", n);
  }), jt.handle("launch-game", async () => {
    const r = Ne.get("arma3Path"), n = Ne.get("paramsLaunch");
    if (!r) return;
    let i = "-noSplash ";
    const o = re.join(r, "arma3.exe");
    n ? Ml(o, [i, n]) : Ml(o, [i]), Se(e, "launch-game-success", "Jeu lancé avec succès"), setTimeout(() => {
      e.close();
    }, 5e3);
  }), jt.handle("get-last-news", async () => {
    const r = Yp.get("lastNews");
    return r || null;
  }), jt.handle("open-url", async (r, n) => {
    G$.openExternal(n);
  }), jt.handle("repair-launcher", async () => {
    sr.clear();
  });
}
async function Ul() {
  const e = Ne.get("ts3Path"), t = Ne.get("arma3Path"), r = re.join(
    t || "",
    Et.folderModsName,
    "task_force_radio.ts3_plugin"
  );
  if (!e || !t) return;
  const n = re.join(e, "package_inst.exe");
  Ml(n, [r]);
}
async function sj(e) {
  const t = Ne.get("arma3Path");
  if (!t) return !1;
  const r = `${t}\\${Et.folderModsName}`;
  try {
    await Pe.existsSync(r) || await Pe.mkdir(r);
    const i = await (await fetch(`${Et.urlMods}/modsList.json`)).json();
    Qa.clear(), Qa.set("modsList", i), await uj();
    const o = sr.get("modsList") || [], a = [], s = [];
    for (const f of i) {
      const u = o.find((c) => c.name === f.name);
      (!u || u.hash !== f.hash) && a.push(f);
    }
    for (const f of o)
      i.find(
        (c) => c.name === f.name
      ) || s.push(f);
    for (const f of s) {
      const u = re.join(r, f.name);
      Pe.existsSync(u) && Pe.unlinkSync(u);
      const c = o.findIndex(
        (d) => d.name === f.name
      );
      c > -1 && o.splice(c, 1);
    }
    return sr.set("modsList", o), Et.maintenance || a.length > 0 && Se(
      e,
      "updateMod-needed",
      `Mise à jour nécessaire, ${a.length} mods à mettre à jour`
    ), !0;
  } catch (n) {
    return console.error("Erreur lors de la création du dossier mod:", n), !1;
  }
}
async function lj() {
  const e = `${Et.urlRessources}`, t = Ne.get("arma3Path");
  if (!t) return !1;
  const r = `${t}\\${Et.folderModsName}`;
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
`).map((l) => {
        const f = l.match(/href="([^"]+)"/);
        return f ? { name: f[1], hash: "" } : null;
      }).filter(
        (l) => l && (l.name.endsWith(".dll") || l.name.endsWith(".cpp") || l.name.endsWith(".paa"))
      ).filter(
        (l) => l !== null
      );
    } catch (a) {
      return console.error("Erreur lors du parsing JSON:", a), !1;
    }
    if (!Array.isArray(i))
      return console.error("La réponse n'est pas un tableau valide"), !1;
    for (const a of i) {
      const s = re.join(r, a.name);
      if (!Pe.existsSync(s) || Pe.existsSync(s) && // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("crypto").createHash("sha256").update(Pe.readFileSync(s)).digest("hex") !== a.hash) {
        const l = await fetch(`${e}/${a.name}`);
        if (!l.ok) {
          console.error(`Erreur lors du téléchargement de ${a.name}`);
          continue;
        }
        const f = await l.arrayBuffer().then((u) => Buffer.from(u));
        Pe.writeFileSync(s, f);
      }
    }
    const o = Pe.readdirSync(r);
    for (const a of o)
      i.find(
        (s) => s.name === a
      ) || Pe.unlinkSync(re.join(r, a));
    return !0;
  } catch {
    return !1;
  }
}
async function cj(e) {
  const t = Ne.get("arma3Path");
  if (!t) return !1;
  const r = re.join(t, Et.folderModsName, "addons");
  if (!Pe.existsSync(r)) return !1;
  Se(e, "check_mods", "Nous vérifions les mods deja installer");
  const n = sr.get("modsList"), i = Qa.get("modsList");
  for (const o of Pe.readdirSync(r)) {
    const a = re.join(r, o), s = i.find((d) => d.name === o), l = n.find((d) => d.name === o);
    if (Se(
      e,
      "file_finds",
      void 0,
      void 0,
      o,
      void 0,
      void 0
    ), s && l && s.hash === l.hash && s.size === l.size && s.name === l.name)
      continue;
    const f = Pe.readFileSync(a), u = V$.createHash("sha256").update(f).digest("hex"), c = i.find((d) => d.name === o);
    if (c && c.hash === u) {
      if (n.find((d) => d.name === o)) continue;
      n.push({
        hash: u,
        name: o,
        size: f.length
      }), sr.set("modsList", n);
    }
  }
  return Se(e, "file_finds_end"), !0;
}
async function uj() {
  const e = Ne.get("arma3Path");
  if (!e) return !1;
  const t = re.join(e, Et.folderModsName, "addons");
  if (!Pe.existsSync(t)) return !1;
  const r = sr.get("modsList");
  for (const n of r) {
    const i = re.join(t, n.name);
    Pe.existsSync(i) || r.splice(r.indexOf(n), 1);
  }
  sr.set("modsList", r);
}
const Hv = re.dirname(K$(import.meta.url));
process.env.APP_ROOT = re.join(Hv, "..");
const _c = process.env.VITE_DEV_SERVER_URL, qj = re.join(process.env.APP_ROOT, "dist-electron"), qv = re.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = _c ? re.join(process.env.APP_ROOT, "public") : qv;
let Te;
Yt.autoUpdater.autoDownload = !0;
Yt.autoUpdater.autoInstallOnAppQuit = !0;
Yt.autoUpdater.on("update-available", () => {
  Te && Te.webContents.send("update-available");
});
Yt.autoUpdater.on("update-downloaded", () => {
  Te && (Te.webContents.send("update-ready"), setTimeout(() => {
    Yt.autoUpdater.quitAndInstall(!1, !0);
  }, 5e3));
});
Yt.autoUpdater.on("error", (e) => {
  Te && Te.webContents.send("update-error", e.message);
});
Yt.autoUpdater.on("checking-for-update", () => {
  Te && Te.webContents.send("checking-update");
});
Yt.autoUpdater.on("update-not-available", () => {
  Te && Te.webContents.send("update-not-available");
});
Yt.autoUpdater.on("download-progress", (e) => {
  Te && Te.webContents.send("update-progress", {
    percent: e.percent,
    transferred: e.transferred,
    total: e.total,
    bytesPerSecond: e.bytesPerSecond
  });
});
const fj = an.requestSingleInstanceLock();
if (!fj)
  an.quit();
else {
  let e = function() {
    Te = new kf({
      icon: re.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
      autoHideMenuBar: !0,
      height: 512,
      width: 800,
      frame: !1,
      maximizable: !1,
      minimizable: !1,
      resizable: !1,
      center: !0,
      webPreferences: {
        preload: re.join(Hv, "preload.mjs")
      }
    }), aj(Te), Yt.autoUpdater.checkForUpdates().catch(console.error), _c ? (Te.loadURL(_c), Te.webContents.openDevTools({
      mode: "detach"
    })) : Te.loadFile(re.join(qv, "index.html"));
  };
  an.on("second-instance", () => {
    Te && (Te.isMinimized() && Te.restore(), Te.focus());
  }), an.on("window-all-closed", () => {
    process.platform !== "darwin" && (an.quit(), Te = null);
  }), an.on("activate", () => {
    kf.getAllWindows().length === 0 && e();
  }), an.whenReady().then(() => {
    e();
  });
}
export {
  qj as MAIN_DIST,
  qv as RENDERER_DIST,
  _c as VITE_DEV_SERVER_URL
};
