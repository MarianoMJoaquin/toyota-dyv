/*!
 * jQuery JavaScript Library v3.6.0
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2021-03-02T17:08Z
 */

!(function (e, t) {
  "use strict";
  "object" == typeof module && "object" == typeof module.exports
    ? (module.exports = e.document
        ? t(e, !0)
        : function (e) {
            if (!e.document)
              throw new Error("jQuery requires a window with a document");
            return t(e);
          })
    : t(e);
})("undefined" != typeof window ? window : this, function (e, t) {
  "use strict";
  var n = [],
    r = Object.getPrototypeOf,
    i = n.slice,
    o = n.flat
      ? function (e) {
          return n.flat.call(e);
        }
      : function (e) {
          return n.concat.apply([], e);
        },
    s = n.push,
    a = n.indexOf,
    l = {},
    u = l.toString,
    c = l.hasOwnProperty,
    f = c.toString,
    d = f.call(Object),
    p = {},
    h = function (e) {
      return (
        "function" == typeof e &&
        "number" != typeof e.nodeType &&
        "function" != typeof e.item
      );
    },
    g = function (e) {
      return null != e && e === e.window;
    },
    v = e.document,
    m = { type: !0, src: !0, nonce: !0, noModule: !0 };
  function y(e, t, n) {
    var r,
      i,
      o = (n = n || v).createElement("script");
    if (((o.text = e), t))
      for (r in m)
        (i = t[r] || (t.getAttribute && t.getAttribute(r))) &&
          o.setAttribute(r, i);
    n.head.appendChild(o).parentNode.removeChild(o);
  }
  function x(e) {
    return null == e
      ? e + ""
      : "object" == typeof e || "function" == typeof e
      ? l[u.call(e)] || "object"
      : typeof e;
  }
  var b = function (e, t) {
    return new b.fn.init(e, t);
  };
  function w(e) {
    var t = !!e && "length" in e && e.length,
      n = x(e);
    return (
      !h(e) &&
      !g(e) &&
      ("array" === n ||
        0 === t ||
        ("number" == typeof t && t > 0 && t - 1 in e))
    );
  }
  (b.fn = b.prototype =
    {
      jquery: "3.6.0",
      constructor: b,
      length: 0,
      toArray: function () {
        return i.call(this);
      },
      get: function (e) {
        return null == e
          ? i.call(this)
          : e < 0
          ? this[e + this.length]
          : this[e];
      },
      pushStack: function (e) {
        var t = b.merge(this.constructor(), e);
        return (t.prevObject = this), t;
      },
      each: function (e) {
        return b.each(this, e);
      },
      map: function (e) {
        return this.pushStack(
          b.map(this, function (t, n) {
            return e.call(t, n, t);
          })
        );
      },
      slice: function () {
        return this.pushStack(i.apply(this, arguments));
      },
      first: function () {
        return this.eq(0);
      },
      last: function () {
        return this.eq(-1);
      },
      even: function () {
        return this.pushStack(
          b.grep(this, function (e, t) {
            return (t + 1) % 2;
          })
        );
      },
      odd: function () {
        return this.pushStack(
          b.grep(this, function (e, t) {
            return t % 2;
          })
        );
      },
      eq: function (e) {
        var t = this.length,
          n = +e + (e < 0 ? t : 0);
        return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
      },
      end: function () {
        return this.prevObject || this.constructor();
      },
      push: s,
      sort: n.sort,
      splice: n.splice,
    }),
    (b.extend = b.fn.extend =
      function () {
        var e,
          t,
          n,
          r,
          i,
          o,
          s = arguments[0] || {},
          a = 1,
          l = arguments.length,
          u = !1;
        for (
          "boolean" == typeof s && ((u = s), (s = arguments[a] || {}), a++),
            "object" == typeof s || h(s) || (s = {}),
            a === l && ((s = this), a--);
          a < l;
          a++
        )
          if (null != (e = arguments[a]))
            for (t in e)
              (r = e[t]),
                "__proto__" !== t &&
                  s !== r &&
                  (u && r && (b.isPlainObject(r) || (i = Array.isArray(r)))
                    ? ((n = s[t]),
                      (o =
                        i && !Array.isArray(n)
                          ? []
                          : i || b.isPlainObject(n)
                          ? n
                          : {}),
                      (i = !1),
                      (s[t] = b.extend(u, o, r)))
                    : void 0 !== r && (s[t] = r));
        return s;
      }),
    b.extend({
      expando: "jQuery" + ("3.6.0" + Math.random()).replace(/\D/g, ""),
      isReady: !0,
      error: function (e) {
        throw new Error(e);
      },
      noop: function () {},
      isPlainObject: function (e) {
        var t, n;
        return (
          !(!e || "[object Object]" !== u.call(e)) &&
          (!(t = r(e)) ||
            ("function" ==
              typeof (n = c.call(t, "constructor") && t.constructor) &&
              f.call(n) === d))
        );
      },
      isEmptyObject: function (e) {
        var t;
        for (t in e) return !1;
        return !0;
      },
      globalEval: function (e, t, n) {
        y(e, { nonce: t && t.nonce }, n);
      },
      each: function (e, t) {
        var n,
          r = 0;
        if (w(e))
          for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++);
        else for (r in e) if (!1 === t.call(e[r], r, e[r])) break;
        return e;
      },
      makeArray: function (e, t) {
        var n = t || [];
        return (
          null != e &&
            (w(Object(e))
              ? b.merge(n, "string" == typeof e ? [e] : e)
              : s.call(n, e)),
          n
        );
      },
      inArray: function (e, t, n) {
        return null == t ? -1 : a.call(t, e, n);
      },
      merge: function (e, t) {
        for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
        return (e.length = i), e;
      },
      grep: function (e, t, n) {
        for (var r = [], i = 0, o = e.length, s = !n; i < o; i++)
          !t(e[i], i) !== s && r.push(e[i]);
        return r;
      },
      map: function (e, t, n) {
        var r,
          i,
          s = 0,
          a = [];
        if (w(e))
          for (r = e.length; s < r; s++)
            null != (i = t(e[s], s, n)) && a.push(i);
        else for (s in e) null != (i = t(e[s], s, n)) && a.push(i);
        return o(a);
      },
      guid: 1,
      support: p,
    }),
    "function" == typeof Symbol && (b.fn[Symbol.iterator] = n[Symbol.iterator]),
    b.each(
      "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
        " "
      ),
      function (e, t) {
        l["[object " + t + "]"] = t.toLowerCase();
      }
    );
  var T =
    /*!
     * Sizzle CSS Selector Engine v2.3.6
     * https://sizzlejs.com/
     *
     * Copyright JS Foundation and other contributors
     * Released under the MIT license
     * https://js.foundation/
     *
     * Date: 2021-02-16
     */
    (function (e) {
      var t,
        n,
        r,
        i,
        o,
        s,
        a,
        l,
        u,
        c,
        f,
        d,
        p,
        h,
        g,
        v,
        m,
        y,
        x,
        b = "sizzle" + 1 * new Date(),
        w = e.document,
        T = 0,
        C = 0,
        E = le(),
        S = le(),
        A = le(),
        k = le(),
        N = function (e, t) {
          return e === t && (f = !0), 0;
        },
        D = {}.hasOwnProperty,
        j = [],
        L = j.pop,
        q = j.push,
        _ = j.push,
        H = j.slice,
        I = function (e, t) {
          for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
          return -1;
        },
        O =
          "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        M = "[\\x20\\t\\r\\n\\f]",
        P =
          "(?:\\\\[\\da-fA-F]{1,6}" +
          M +
          "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
        R =
          "\\[" +
          M +
          "*(" +
          P +
          ")(?:" +
          M +
          "*([*^$|!~]?=)" +
          M +
          "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
          P +
          "))|)" +
          M +
          "*\\]",
        B =
          ":(" +
          P +
          ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
          R +
          ")*)|.*)\\)|)",
        $ = new RegExp(M + "+", "g"),
        W = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
        F = new RegExp("^" + M + "*," + M + "*"),
        X = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
        z = new RegExp(M + "|>"),
        U = new RegExp(B),
        V = new RegExp("^" + P + "$"),
        Y = {
          ID: new RegExp("^#(" + P + ")"),
          CLASS: new RegExp("^\\.(" + P + ")"),
          TAG: new RegExp("^(" + P + "|[*])"),
          ATTR: new RegExp("^" + R),
          PSEUDO: new RegExp("^" + B),
          CHILD: new RegExp(
            "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
              M +
              "*(even|odd|(([+-]|)(\\d*)n|)" +
              M +
              "*(?:([+-]|)" +
              M +
              "*(\\d+)|))" +
              M +
              "*\\)|)",
            "i"
          ),
          bool: new RegExp("^(?:" + O + ")$", "i"),
          needsContext: new RegExp(
            "^" +
              M +
              "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
              M +
              "*((?:-\\d)?\\d*)" +
              M +
              "*\\)|)(?=[^-]|$)",
            "i"
          ),
        },
        G = /HTML$/i,
        Q = /^(?:input|select|textarea|button)$/i,
        J = /^h\d$/i,
        K = /^[^{]+\{\s*\[native \w/,
        Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        ee = /[+~]/,
        te = new RegExp(
          "\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\([^\\r\\n\\f])",
          "g"
        ),
        ne = function (e, t) {
          var n = "0x" + e.slice(1) - 65536;
          return (
            t ||
            (n < 0
              ? String.fromCharCode(n + 65536)
              : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320))
          );
        },
        re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        ie = function (e, t) {
          return t
            ? "\0" === e
              ? "�"
              : e.slice(0, -1) +
                "\\" +
                e.charCodeAt(e.length - 1).toString(16) +
                " "
            : "\\" + e;
        },
        oe = function () {
          d();
        },
        se = be(
          function (e) {
            return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase();
          },
          { dir: "parentNode", next: "legend" }
        );
      try {
        _.apply((j = H.call(w.childNodes)), w.childNodes),
          j[w.childNodes.length].nodeType;
      } catch (e) {
        _ = {
          apply: j.length
            ? function (e, t) {
                q.apply(e, H.call(t));
              }
            : function (e, t) {
                for (var n = e.length, r = 0; (e[n++] = t[r++]); );
                e.length = n - 1;
              },
        };
      }
      function ae(e, t, r, i) {
        var o,
          a,
          u,
          c,
          f,
          h,
          m,
          y = t && t.ownerDocument,
          w = t ? t.nodeType : 9;
        if (
          ((r = r || []),
          "string" != typeof e || !e || (1 !== w && 9 !== w && 11 !== w))
        )
          return r;
        if (!i && (d(t), (t = t || p), g)) {
          if (11 !== w && (f = Z.exec(e)))
            if ((o = f[1])) {
              if (9 === w) {
                if (!(u = t.getElementById(o))) return r;
                if (u.id === o) return r.push(u), r;
              } else if (
                y &&
                (u = y.getElementById(o)) &&
                x(t, u) &&
                u.id === o
              )
                return r.push(u), r;
            } else {
              if (f[2]) return _.apply(r, t.getElementsByTagName(e)), r;
              if (
                (o = f[3]) &&
                n.getElementsByClassName &&
                t.getElementsByClassName
              )
                return _.apply(r, t.getElementsByClassName(o)), r;
            }
          if (
            n.qsa &&
            !k[e + " "] &&
            (!v || !v.test(e)) &&
            (1 !== w || "object" !== t.nodeName.toLowerCase())
          ) {
            if (((m = e), (y = t), 1 === w && (z.test(e) || X.test(e)))) {
              for (
                ((y = (ee.test(e) && me(t.parentNode)) || t) === t &&
                  n.scope) ||
                  ((c = t.getAttribute("id"))
                    ? (c = c.replace(re, ie))
                    : t.setAttribute("id", (c = b))),
                  a = (h = s(e)).length;
                a--;

              )
                h[a] = (c ? "#" + c : ":scope") + " " + xe(h[a]);
              m = h.join(",");
            }
            try {
              return _.apply(r, y.querySelectorAll(m)), r;
            } catch (t) {
              k(e, !0);
            } finally {
              c === b && t.removeAttribute("id");
            }
          }
        }
        return l(e.replace(W, "$1"), t, r, i);
      }
      function le() {
        var e = [];
        return function t(n, i) {
          return (
            e.push(n + " ") > r.cacheLength && delete t[e.shift()],
            (t[n + " "] = i)
          );
        };
      }
      function ue(e) {
        return (e[b] = !0), e;
      }
      function ce(e) {
        var t = p.createElement("fieldset");
        try {
          return !!e(t);
        } catch (e) {
          return !1;
        } finally {
          t.parentNode && t.parentNode.removeChild(t), (t = null);
        }
      }
      function fe(e, t) {
        for (var n = e.split("|"), i = n.length; i--; ) r.attrHandle[n[i]] = t;
      }
      function de(e, t) {
        var n = t && e,
          r =
            n &&
            1 === e.nodeType &&
            1 === t.nodeType &&
            e.sourceIndex - t.sourceIndex;
        if (r) return r;
        if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
        return e ? 1 : -1;
      }
      function pe(e) {
        return function (t) {
          return "input" === t.nodeName.toLowerCase() && t.type === e;
        };
      }
      function he(e) {
        return function (t) {
          var n = t.nodeName.toLowerCase();
          return ("input" === n || "button" === n) && t.type === e;
        };
      }
      function ge(e) {
        return function (t) {
          return "form" in t
            ? t.parentNode && !1 === t.disabled
              ? "label" in t
                ? "label" in t.parentNode
                  ? t.parentNode.disabled === e
                  : t.disabled === e
                : t.isDisabled === e || (t.isDisabled !== !e && se(t) === e)
              : t.disabled === e
            : "label" in t && t.disabled === e;
        };
      }
      function ve(e) {
        return ue(function (t) {
          return (
            (t = +t),
            ue(function (n, r) {
              for (var i, o = e([], n.length, t), s = o.length; s--; )
                n[(i = o[s])] && (n[i] = !(r[i] = n[i]));
            })
          );
        });
      }
      function me(e) {
        return e && void 0 !== e.getElementsByTagName && e;
      }
      for (t in ((n = ae.support = {}),
      (o = ae.isXML =
        function (e) {
          var t = e && e.namespaceURI,
            n = e && (e.ownerDocument || e).documentElement;
          return !G.test(t || (n && n.nodeName) || "HTML");
        }),
      (d = ae.setDocument =
        function (e) {
          var t,
            i,
            s = e ? e.ownerDocument || e : w;
          return s != p && 9 === s.nodeType && s.documentElement
            ? ((h = (p = s).documentElement),
              (g = !o(p)),
              w != p &&
                (i = p.defaultView) &&
                i.top !== i &&
                (i.addEventListener
                  ? i.addEventListener("unload", oe, !1)
                  : i.attachEvent && i.attachEvent("onunload", oe)),
              (n.scope = ce(function (e) {
                return (
                  h.appendChild(e).appendChild(p.createElement("div")),
                  void 0 !== e.querySelectorAll &&
                    !e.querySelectorAll(":scope fieldset div").length
                );
              })),
              (n.attributes = ce(function (e) {
                return (e.className = "i"), !e.getAttribute("className");
              })),
              (n.getElementsByTagName = ce(function (e) {
                return (
                  e.appendChild(p.createComment("")),
                  !e.getElementsByTagName("*").length
                );
              })),
              (n.getElementsByClassName = K.test(p.getElementsByClassName)),
              (n.getById = ce(function (e) {
                return (
                  (h.appendChild(e).id = b),
                  !p.getElementsByName || !p.getElementsByName(b).length
                );
              })),
              n.getById
                ? ((r.filter.ID = function (e) {
                    var t = e.replace(te, ne);
                    return function (e) {
                      return e.getAttribute("id") === t;
                    };
                  }),
                  (r.find.ID = function (e, t) {
                    if (void 0 !== t.getElementById && g) {
                      var n = t.getElementById(e);
                      return n ? [n] : [];
                    }
                  }))
                : ((r.filter.ID = function (e) {
                    var t = e.replace(te, ne);
                    return function (e) {
                      var n =
                        void 0 !== e.getAttributeNode &&
                        e.getAttributeNode("id");
                      return n && n.value === t;
                    };
                  }),
                  (r.find.ID = function (e, t) {
                    if (void 0 !== t.getElementById && g) {
                      var n,
                        r,
                        i,
                        o = t.getElementById(e);
                      if (o) {
                        if ((n = o.getAttributeNode("id")) && n.value === e)
                          return [o];
                        for (i = t.getElementsByName(e), r = 0; (o = i[r++]); )
                          if ((n = o.getAttributeNode("id")) && n.value === e)
                            return [o];
                      }
                      return [];
                    }
                  })),
              (r.find.TAG = n.getElementsByTagName
                ? function (e, t) {
                    return void 0 !== t.getElementsByTagName
                      ? t.getElementsByTagName(e)
                      : n.qsa
                      ? t.querySelectorAll(e)
                      : void 0;
                  }
                : function (e, t) {
                    var n,
                      r = [],
                      i = 0,
                      o = t.getElementsByTagName(e);
                    if ("*" === e) {
                      for (; (n = o[i++]); ) 1 === n.nodeType && r.push(n);
                      return r;
                    }
                    return o;
                  }),
              (r.find.CLASS =
                n.getElementsByClassName &&
                function (e, t) {
                  if (void 0 !== t.getElementsByClassName && g)
                    return t.getElementsByClassName(e);
                }),
              (m = []),
              (v = []),
              (n.qsa = K.test(p.querySelectorAll)) &&
                (ce(function (e) {
                  var t;
                  (h.appendChild(e).innerHTML =
                    "<a id='" +
                    b +
                    "'></a><select id='" +
                    b +
                    "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                    e.querySelectorAll("[msallowcapture^='']").length &&
                      v.push("[*^$]=" + M + "*(?:''|\"\")"),
                    e.querySelectorAll("[selected]").length ||
                      v.push("\\[" + M + "*(?:value|" + O + ")"),
                    e.querySelectorAll("[id~=" + b + "-]").length ||
                      v.push("~="),
                    (t = p.createElement("input")).setAttribute("name", ""),
                    e.appendChild(t),
                    e.querySelectorAll("[name='']").length ||
                      v.push(
                        "\\[" + M + "*name" + M + "*=" + M + "*(?:''|\"\")"
                      ),
                    e.querySelectorAll(":checked").length || v.push(":checked"),
                    e.querySelectorAll("a#" + b + "+*").length ||
                      v.push(".#.+[+~]"),
                    e.querySelectorAll("\\\f"),
                    v.push("[\\r\\n\\f]");
                }),
                ce(function (e) {
                  e.innerHTML =
                    "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                  var t = p.createElement("input");
                  t.setAttribute("type", "hidden"),
                    e.appendChild(t).setAttribute("name", "D"),
                    e.querySelectorAll("[name=d]").length &&
                      v.push("name" + M + "*[*^$|!~]?="),
                    2 !== e.querySelectorAll(":enabled").length &&
                      v.push(":enabled", ":disabled"),
                    (h.appendChild(e).disabled = !0),
                    2 !== e.querySelectorAll(":disabled").length &&
                      v.push(":enabled", ":disabled"),
                    e.querySelectorAll("*,:x"),
                    v.push(",.*:");
                })),
              (n.matchesSelector = K.test(
                (y =
                  h.matches ||
                  h.webkitMatchesSelector ||
                  h.mozMatchesSelector ||
                  h.oMatchesSelector ||
                  h.msMatchesSelector)
              )) &&
                ce(function (e) {
                  (n.disconnectedMatch = y.call(e, "*")),
                    y.call(e, "[s!='']:x"),
                    m.push("!=", B);
                }),
              (v = v.length && new RegExp(v.join("|"))),
              (m = m.length && new RegExp(m.join("|"))),
              (t = K.test(h.compareDocumentPosition)),
              (x =
                t || K.test(h.contains)
                  ? function (e, t) {
                      var n = 9 === e.nodeType ? e.documentElement : e,
                        r = t && t.parentNode;
                      return (
                        e === r ||
                        !(
                          !r ||
                          1 !== r.nodeType ||
                          !(n.contains
                            ? n.contains(r)
                            : e.compareDocumentPosition &&
                              16 & e.compareDocumentPosition(r))
                        )
                      );
                    }
                  : function (e, t) {
                      if (t)
                        for (; (t = t.parentNode); ) if (t === e) return !0;
                      return !1;
                    }),
              (N = t
                ? function (e, t) {
                    if (e === t) return (f = !0), 0;
                    var r =
                      !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return (
                      r ||
                      (1 &
                        (r =
                          (e.ownerDocument || e) == (t.ownerDocument || t)
                            ? e.compareDocumentPosition(t)
                            : 1) ||
                      (!n.sortDetached && t.compareDocumentPosition(e) === r)
                        ? e == p || (e.ownerDocument == w && x(w, e))
                          ? -1
                          : t == p || (t.ownerDocument == w && x(w, t))
                          ? 1
                          : c
                          ? I(c, e) - I(c, t)
                          : 0
                        : 4 & r
                        ? -1
                        : 1)
                    );
                  }
                : function (e, t) {
                    if (e === t) return (f = !0), 0;
                    var n,
                      r = 0,
                      i = e.parentNode,
                      o = t.parentNode,
                      s = [e],
                      a = [t];
                    if (!i || !o)
                      return e == p
                        ? -1
                        : t == p
                        ? 1
                        : i
                        ? -1
                        : o
                        ? 1
                        : c
                        ? I(c, e) - I(c, t)
                        : 0;
                    if (i === o) return de(e, t);
                    for (n = e; (n = n.parentNode); ) s.unshift(n);
                    for (n = t; (n = n.parentNode); ) a.unshift(n);
                    for (; s[r] === a[r]; ) r++;
                    return r
                      ? de(s[r], a[r])
                      : s[r] == w
                      ? -1
                      : a[r] == w
                      ? 1
                      : 0;
                  }),
              p)
            : p;
        }),
      (ae.matches = function (e, t) {
        return ae(e, null, null, t);
      }),
      (ae.matchesSelector = function (e, t) {
        if (
          (d(e),
          n.matchesSelector &&
            g &&
            !k[t + " "] &&
            (!m || !m.test(t)) &&
            (!v || !v.test(t)))
        )
          try {
            var r = y.call(e, t);
            if (
              r ||
              n.disconnectedMatch ||
              (e.document && 11 !== e.document.nodeType)
            )
              return r;
          } catch (e) {
            k(t, !0);
          }
        return ae(t, p, null, [e]).length > 0;
      }),
      (ae.contains = function (e, t) {
        return (e.ownerDocument || e) != p && d(e), x(e, t);
      }),
      (ae.attr = function (e, t) {
        (e.ownerDocument || e) != p && d(e);
        var i = r.attrHandle[t.toLowerCase()],
          o = i && D.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !g) : void 0;
        return void 0 !== o
          ? o
          : n.attributes || !g
          ? e.getAttribute(t)
          : (o = e.getAttributeNode(t)) && o.specified
          ? o.value
          : null;
      }),
      (ae.escape = function (e) {
        return (e + "").replace(re, ie);
      }),
      (ae.error = function (e) {
        throw new Error("Syntax error, unrecognized expression: " + e);
      }),
      (ae.uniqueSort = function (e) {
        var t,
          r = [],
          i = 0,
          o = 0;
        if (
          ((f = !n.detectDuplicates),
          (c = !n.sortStable && e.slice(0)),
          e.sort(N),
          f)
        ) {
          for (; (t = e[o++]); ) t === e[o] && (i = r.push(o));
          for (; i--; ) e.splice(r[i], 1);
        }
        return (c = null), e;
      }),
      (i = ae.getText =
        function (e) {
          var t,
            n = "",
            r = 0,
            o = e.nodeType;
          if (o) {
            if (1 === o || 9 === o || 11 === o) {
              if ("string" == typeof e.textContent) return e.textContent;
              for (e = e.firstChild; e; e = e.nextSibling) n += i(e);
            } else if (3 === o || 4 === o) return e.nodeValue;
          } else for (; (t = e[r++]); ) n += i(t);
          return n;
        }),
      ((r = ae.selectors =
        {
          cacheLength: 50,
          createPseudo: ue,
          match: Y,
          attrHandle: {},
          find: {},
          relative: {
            ">": { dir: "parentNode", first: !0 },
            " ": { dir: "parentNode" },
            "+": { dir: "previousSibling", first: !0 },
            "~": { dir: "previousSibling" },
          },
          preFilter: {
            ATTR: function (e) {
              return (
                (e[1] = e[1].replace(te, ne)),
                (e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne)),
                "~=" === e[2] && (e[3] = " " + e[3] + " "),
                e.slice(0, 4)
              );
            },
            CHILD: function (e) {
              return (
                (e[1] = e[1].toLowerCase()),
                "nth" === e[1].slice(0, 3)
                  ? (e[3] || ae.error(e[0]),
                    (e[4] = +(e[4]
                      ? e[5] + (e[6] || 1)
                      : 2 * ("even" === e[3] || "odd" === e[3]))),
                    (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                  : e[3] && ae.error(e[0]),
                e
              );
            },
            PSEUDO: function (e) {
              var t,
                n = !e[6] && e[2];
              return Y.CHILD.test(e[0])
                ? null
                : (e[3]
                    ? (e[2] = e[4] || e[5] || "")
                    : n &&
                      U.test(n) &&
                      (t = s(n, !0)) &&
                      (t = n.indexOf(")", n.length - t) - n.length) &&
                      ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
                  e.slice(0, 3));
            },
          },
          filter: {
            TAG: function (e) {
              var t = e.replace(te, ne).toLowerCase();
              return "*" === e
                ? function () {
                    return !0;
                  }
                : function (e) {
                    return e.nodeName && e.nodeName.toLowerCase() === t;
                  };
            },
            CLASS: function (e) {
              var t = E[e + " "];
              return (
                t ||
                ((t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) &&
                  E(e, function (e) {
                    return t.test(
                      ("string" == typeof e.className && e.className) ||
                        (void 0 !== e.getAttribute &&
                          e.getAttribute("class")) ||
                        ""
                    );
                  }))
              );
            },
            ATTR: function (e, t, n) {
              return function (r) {
                var i = ae.attr(r, e);
                return null == i
                  ? "!=" === t
                  : !t ||
                      ((i += ""),
                      "=" === t
                        ? i === n
                        : "!=" === t
                        ? i !== n
                        : "^=" === t
                        ? n && 0 === i.indexOf(n)
                        : "*=" === t
                        ? n && i.indexOf(n) > -1
                        : "$=" === t
                        ? n && i.slice(-n.length) === n
                        : "~=" === t
                        ? (" " + i.replace($, " ") + " ").indexOf(n) > -1
                        : "|=" === t &&
                          (i === n || i.slice(0, n.length + 1) === n + "-"));
              };
            },
            CHILD: function (e, t, n, r, i) {
              var o = "nth" !== e.slice(0, 3),
                s = "last" !== e.slice(-4),
                a = "of-type" === t;
              return 1 === r && 0 === i
                ? function (e) {
                    return !!e.parentNode;
                  }
                : function (t, n, l) {
                    var u,
                      c,
                      f,
                      d,
                      p,
                      h,
                      g = o !== s ? "nextSibling" : "previousSibling",
                      v = t.parentNode,
                      m = a && t.nodeName.toLowerCase(),
                      y = !l && !a,
                      x = !1;
                    if (v) {
                      if (o) {
                        for (; g; ) {
                          for (d = t; (d = d[g]); )
                            if (
                              a
                                ? d.nodeName.toLowerCase() === m
                                : 1 === d.nodeType
                            )
                              return !1;
                          h = g = "only" === e && !h && "nextSibling";
                        }
                        return !0;
                      }
                      if (((h = [s ? v.firstChild : v.lastChild]), s && y)) {
                        for (
                          x =
                            (p =
                              (u =
                                (c =
                                  (f = (d = v)[b] || (d[b] = {}))[d.uniqueID] ||
                                  (f[d.uniqueID] = {}))[e] || [])[0] === T &&
                              u[1]) && u[2],
                            d = p && v.childNodes[p];
                          (d = (++p && d && d[g]) || (x = p = 0) || h.pop());

                        )
                          if (1 === d.nodeType && ++x && d === t) {
                            c[e] = [T, p, x];
                            break;
                          }
                      } else if (
                        (y &&
                          (x = p =
                            (u =
                              (c =
                                (f = (d = t)[b] || (d[b] = {}))[d.uniqueID] ||
                                (f[d.uniqueID] = {}))[e] || [])[0] === T &&
                            u[1]),
                        !1 === x)
                      )
                        for (
                          ;
                          (d = (++p && d && d[g]) || (x = p = 0) || h.pop()) &&
                          ((a
                            ? d.nodeName.toLowerCase() !== m
                            : 1 !== d.nodeType) ||
                            !++x ||
                            (y &&
                              ((c =
                                (f = d[b] || (d[b] = {}))[d.uniqueID] ||
                                (f[d.uniqueID] = {}))[e] = [T, x]),
                            d !== t));

                        );
                      return (x -= i) === r || (x % r == 0 && x / r >= 0);
                    }
                  };
            },
            PSEUDO: function (e, t) {
              var n,
                i =
                  r.pseudos[e] ||
                  r.setFilters[e.toLowerCase()] ||
                  ae.error("unsupported pseudo: " + e);
              return i[b]
                ? i(t)
                : i.length > 1
                ? ((n = [e, e, "", t]),
                  r.setFilters.hasOwnProperty(e.toLowerCase())
                    ? ue(function (e, n) {
                        for (var r, o = i(e, t), s = o.length; s--; )
                          e[(r = I(e, o[s]))] = !(n[r] = o[s]);
                      })
                    : function (e) {
                        return i(e, 0, n);
                      })
                : i;
            },
          },
          pseudos: {
            not: ue(function (e) {
              var t = [],
                n = [],
                r = a(e.replace(W, "$1"));
              return r[b]
                ? ue(function (e, t, n, i) {
                    for (var o, s = r(e, null, i, []), a = e.length; a--; )
                      (o = s[a]) && (e[a] = !(t[a] = o));
                  })
                : function (e, i, o) {
                    return (
                      (t[0] = e), r(t, null, o, n), (t[0] = null), !n.pop()
                    );
                  };
            }),
            has: ue(function (e) {
              return function (t) {
                return ae(e, t).length > 0;
              };
            }),
            contains: ue(function (e) {
              return (
                (e = e.replace(te, ne)),
                function (t) {
                  return (t.textContent || i(t)).indexOf(e) > -1;
                }
              );
            }),
            lang: ue(function (e) {
              return (
                V.test(e || "") || ae.error("unsupported lang: " + e),
                (e = e.replace(te, ne).toLowerCase()),
                function (t) {
                  var n;
                  do {
                    if (
                      (n = g
                        ? t.lang
                        : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                    )
                      return (
                        (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                      );
                  } while ((t = t.parentNode) && 1 === t.nodeType);
                  return !1;
                }
              );
            }),
            target: function (t) {
              var n = e.location && e.location.hash;
              return n && n.slice(1) === t.id;
            },
            root: function (e) {
              return e === h;
            },
            focus: function (e) {
              return (
                e === p.activeElement &&
                (!p.hasFocus || p.hasFocus()) &&
                !!(e.type || e.href || ~e.tabIndex)
              );
            },
            enabled: ge(!1),
            disabled: ge(!0),
            checked: function (e) {
              var t = e.nodeName.toLowerCase();
              return (
                ("input" === t && !!e.checked) ||
                ("option" === t && !!e.selected)
              );
            },
            selected: function (e) {
              return (
                e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
              );
            },
            empty: function (e) {
              for (e = e.firstChild; e; e = e.nextSibling)
                if (e.nodeType < 6) return !1;
              return !0;
            },
            parent: function (e) {
              return !r.pseudos.empty(e);
            },
            header: function (e) {
              return J.test(e.nodeName);
            },
            input: function (e) {
              return Q.test(e.nodeName);
            },
            button: function (e) {
              var t = e.nodeName.toLowerCase();
              return ("input" === t && "button" === e.type) || "button" === t;
            },
            text: function (e) {
              var t;
              return (
                "input" === e.nodeName.toLowerCase() &&
                "text" === e.type &&
                (null == (t = e.getAttribute("type")) ||
                  "text" === t.toLowerCase())
              );
            },
            first: ve(function () {
              return [0];
            }),
            last: ve(function (e, t) {
              return [t - 1];
            }),
            eq: ve(function (e, t, n) {
              return [n < 0 ? n + t : n];
            }),
            even: ve(function (e, t) {
              for (var n = 0; n < t; n += 2) e.push(n);
              return e;
            }),
            odd: ve(function (e, t) {
              for (var n = 1; n < t; n += 2) e.push(n);
              return e;
            }),
            lt: ve(function (e, t, n) {
              for (var r = n < 0 ? n + t : n > t ? t : n; --r >= 0; ) e.push(r);
              return e;
            }),
            gt: ve(function (e, t, n) {
              for (var r = n < 0 ? n + t : n; ++r < t; ) e.push(r);
              return e;
            }),
          },
        }).pseudos.nth = r.pseudos.eq),
      { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
        r.pseudos[t] = pe(t);
      for (t in { submit: !0, reset: !0 }) r.pseudos[t] = he(t);
      function ye() {}
      function xe(e) {
        for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
        return r;
      }
      function be(e, t, n) {
        var r = t.dir,
          i = t.next,
          o = i || r,
          s = n && "parentNode" === o,
          a = C++;
        return t.first
          ? function (t, n, i) {
              for (; (t = t[r]); ) if (1 === t.nodeType || s) return e(t, n, i);
              return !1;
            }
          : function (t, n, l) {
              var u,
                c,
                f,
                d = [T, a];
              if (l) {
                for (; (t = t[r]); )
                  if ((1 === t.nodeType || s) && e(t, n, l)) return !0;
              } else
                for (; (t = t[r]); )
                  if (1 === t.nodeType || s)
                    if (
                      ((c =
                        (f = t[b] || (t[b] = {}))[t.uniqueID] ||
                        (f[t.uniqueID] = {})),
                      i && i === t.nodeName.toLowerCase())
                    )
                      t = t[r] || t;
                    else {
                      if ((u = c[o]) && u[0] === T && u[1] === a)
                        return (d[2] = u[2]);
                      if (((c[o] = d), (d[2] = e(t, n, l)))) return !0;
                    }
              return !1;
            };
      }
      function we(e) {
        return e.length > 1
          ? function (t, n, r) {
              for (var i = e.length; i--; ) if (!e[i](t, n, r)) return !1;
              return !0;
            }
          : e[0];
      }
      function Te(e, t, n, r, i) {
        for (var o, s = [], a = 0, l = e.length, u = null != t; a < l; a++)
          (o = e[a]) && ((n && !n(o, r, i)) || (s.push(o), u && t.push(a)));
        return s;
      }
      function Ce(e, t, n, r, i, o) {
        return (
          r && !r[b] && (r = Ce(r)),
          i && !i[b] && (i = Ce(i, o)),
          ue(function (o, s, a, l) {
            var u,
              c,
              f,
              d = [],
              p = [],
              h = s.length,
              g =
                o ||
                (function (e, t, n) {
                  for (var r = 0, i = t.length; r < i; r++) ae(e, t[r], n);
                  return n;
                })(t || "*", a.nodeType ? [a] : a, []),
              v = !e || (!o && t) ? g : Te(g, d, e, a, l),
              m = n ? (i || (o ? e : h || r) ? [] : s) : v;
            if ((n && n(v, m, a, l), r))
              for (u = Te(m, p), r(u, [], a, l), c = u.length; c--; )
                (f = u[c]) && (m[p[c]] = !(v[p[c]] = f));
            if (o) {
              if (i || e) {
                if (i) {
                  for (u = [], c = m.length; c--; )
                    (f = m[c]) && u.push((v[c] = f));
                  i(null, (m = []), u, l);
                }
                for (c = m.length; c--; )
                  (f = m[c]) &&
                    (u = i ? I(o, f) : d[c]) > -1 &&
                    (o[u] = !(s[u] = f));
              }
            } else (m = Te(m === s ? m.splice(h, m.length) : m)), i ? i(null, s, m, l) : _.apply(s, m);
          })
        );
      }
      function Ee(e) {
        for (
          var t,
            n,
            i,
            o = e.length,
            s = r.relative[e[0].type],
            a = s || r.relative[" "],
            l = s ? 1 : 0,
            c = be(
              function (e) {
                return e === t;
              },
              a,
              !0
            ),
            f = be(
              function (e) {
                return I(t, e) > -1;
              },
              a,
              !0
            ),
            d = [
              function (e, n, r) {
                var i =
                  (!s && (r || n !== u)) ||
                  ((t = n).nodeType ? c(e, n, r) : f(e, n, r));
                return (t = null), i;
              },
            ];
          l < o;
          l++
        )
          if ((n = r.relative[e[l].type])) d = [be(we(d), n)];
          else {
            if ((n = r.filter[e[l].type].apply(null, e[l].matches))[b]) {
              for (i = ++l; i < o && !r.relative[e[i].type]; i++);
              return Ce(
                l > 1 && we(d),
                l > 1 &&
                  xe(
                    e
                      .slice(0, l - 1)
                      .concat({ value: " " === e[l - 2].type ? "*" : "" })
                  ).replace(W, "$1"),
                n,
                l < i && Ee(e.slice(l, i)),
                i < o && Ee((e = e.slice(i))),
                i < o && xe(e)
              );
            }
            d.push(n);
          }
        return we(d);
      }
      return (
        (ye.prototype = r.filters = r.pseudos),
        (r.setFilters = new ye()),
        (s = ae.tokenize =
          function (e, t) {
            var n,
              i,
              o,
              s,
              a,
              l,
              u,
              c = S[e + " "];
            if (c) return t ? 0 : c.slice(0);
            for (a = e, l = [], u = r.preFilter; a; ) {
              for (s in ((n && !(i = F.exec(a))) ||
                (i && (a = a.slice(i[0].length) || a), l.push((o = []))),
              (n = !1),
              (i = X.exec(a)) &&
                ((n = i.shift()),
                o.push({ value: n, type: i[0].replace(W, " ") }),
                (a = a.slice(n.length))),
              r.filter))
                !(i = Y[s].exec(a)) ||
                  (u[s] && !(i = u[s](i))) ||
                  ((n = i.shift()),
                  o.push({ value: n, type: s, matches: i }),
                  (a = a.slice(n.length)));
              if (!n) break;
            }
            return t ? a.length : a ? ae.error(e) : S(e, l).slice(0);
          }),
        (a = ae.compile =
          function (e, t) {
            var n,
              i = [],
              o = [],
              a = A[e + " "];
            if (!a) {
              for (t || (t = s(e)), n = t.length; n--; )
                (a = Ee(t[n]))[b] ? i.push(a) : o.push(a);
              (a = A(
                e,
                (function (e, t) {
                  var n = t.length > 0,
                    i = e.length > 0,
                    o = function (o, s, a, l, c) {
                      var f,
                        h,
                        v,
                        m = 0,
                        y = "0",
                        x = o && [],
                        b = [],
                        w = u,
                        C = o || (i && r.find.TAG("*", c)),
                        E = (T += null == w ? 1 : Math.random() || 0.1),
                        S = C.length;
                      for (
                        c && (u = s == p || s || c);
                        y !== S && null != (f = C[y]);
                        y++
                      ) {
                        if (i && f) {
                          for (
                            h = 0,
                              s || f.ownerDocument == p || (d(f), (a = !g));
                            (v = e[h++]);

                          )
                            if (v(f, s || p, a)) {
                              l.push(f);
                              break;
                            }
                          c && (T = E);
                        }
                        n && ((f = !v && f) && m--, o && x.push(f));
                      }
                      if (((m += y), n && y !== m)) {
                        for (h = 0; (v = t[h++]); ) v(x, b, s, a);
                        if (o) {
                          if (m > 0)
                            for (; y--; ) x[y] || b[y] || (b[y] = L.call(l));
                          b = Te(b);
                        }
                        _.apply(l, b),
                          c &&
                            !o &&
                            b.length > 0 &&
                            m + t.length > 1 &&
                            ae.uniqueSort(l);
                      }
                      return c && ((T = E), (u = w)), x;
                    };
                  return n ? ue(o) : o;
                })(o, i)
              )).selector = e;
            }
            return a;
          }),
        (l = ae.select =
          function (e, t, n, i) {
            var o,
              l,
              u,
              c,
              f,
              d = "function" == typeof e && e,
              p = !i && s((e = d.selector || e));
            if (((n = n || []), 1 === p.length)) {
              if (
                (l = p[0] = p[0].slice(0)).length > 2 &&
                "ID" === (u = l[0]).type &&
                9 === t.nodeType &&
                g &&
                r.relative[l[1].type]
              ) {
                if (
                  !(t = (r.find.ID(u.matches[0].replace(te, ne), t) || [])[0])
                )
                  return n;
                d && (t = t.parentNode), (e = e.slice(l.shift().value.length));
              }
              for (
                o = Y.needsContext.test(e) ? 0 : l.length;
                o-- && ((u = l[o]), !r.relative[(c = u.type)]);

              )
                if (
                  (f = r.find[c]) &&
                  (i = f(
                    u.matches[0].replace(te, ne),
                    (ee.test(l[0].type) && me(t.parentNode)) || t
                  ))
                ) {
                  if ((l.splice(o, 1), !(e = i.length && xe(l))))
                    return _.apply(n, i), n;
                  break;
                }
            }
            return (
              (d || a(e, p))(
                i,
                t,
                !g,
                n,
                !t || (ee.test(e) && me(t.parentNode)) || t
              ),
              n
            );
          }),
        (n.sortStable = b.split("").sort(N).join("") === b),
        (n.detectDuplicates = !!f),
        d(),
        (n.sortDetached = ce(function (e) {
          return 1 & e.compareDocumentPosition(p.createElement("fieldset"));
        })),
        ce(function (e) {
          return (
            (e.innerHTML = "<a href='#'></a>"),
            "#" === e.firstChild.getAttribute("href")
          );
        }) ||
          fe("type|href|height|width", function (e, t, n) {
            if (!n)
              return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
          }),
        (n.attributes &&
          ce(function (e) {
            return (
              (e.innerHTML = "<input/>"),
              e.firstChild.setAttribute("value", ""),
              "" === e.firstChild.getAttribute("value")
            );
          })) ||
          fe("value", function (e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase())
              return e.defaultValue;
          }),
        ce(function (e) {
          return null == e.getAttribute("disabled");
        }) ||
          fe(O, function (e, t, n) {
            var r;
            if (!n)
              return !0 === e[t]
                ? t.toLowerCase()
                : (r = e.getAttributeNode(t)) && r.specified
                ? r.value
                : null;
          }),
        ae
      );
    })(e);
  (b.find = T),
    (b.expr = T.selectors),
    (b.expr[":"] = b.expr.pseudos),
    (b.uniqueSort = b.unique = T.uniqueSort),
    (b.text = T.getText),
    (b.isXMLDoc = T.isXML),
    (b.contains = T.contains),
    (b.escapeSelector = T.escape);
  var C = function (e, t, n) {
      for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
        if (1 === e.nodeType) {
          if (i && b(e).is(n)) break;
          r.push(e);
        }
      return r;
    },
    E = function (e, t) {
      for (var n = []; e; e = e.nextSibling)
        1 === e.nodeType && e !== t && n.push(e);
      return n;
    },
    S = b.expr.match.needsContext;
  function A(e, t) {
    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
  }
  var k = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
  function N(e, t, n) {
    return h(t)
      ? b.grep(e, function (e, r) {
          return !!t.call(e, r, e) !== n;
        })
      : t.nodeType
      ? b.grep(e, function (e) {
          return (e === t) !== n;
        })
      : "string" != typeof t
      ? b.grep(e, function (e) {
          return a.call(t, e) > -1 !== n;
        })
      : b.filter(t, e, n);
  }
  (b.filter = function (e, t, n) {
    var r = t[0];
    return (
      n && (e = ":not(" + e + ")"),
      1 === t.length && 1 === r.nodeType
        ? b.find.matchesSelector(r, e)
          ? [r]
          : []
        : b.find.matches(
            e,
            b.grep(t, function (e) {
              return 1 === e.nodeType;
            })
          )
    );
  }),
    b.fn.extend({
      find: function (e) {
        var t,
          n,
          r = this.length,
          i = this;
        if ("string" != typeof e)
          return this.pushStack(
            b(e).filter(function () {
              for (t = 0; t < r; t++) if (b.contains(i[t], this)) return !0;
            })
          );
        for (n = this.pushStack([]), t = 0; t < r; t++) b.find(e, i[t], n);
        return r > 1 ? b.uniqueSort(n) : n;
      },
      filter: function (e) {
        return this.pushStack(N(this, e || [], !1));
      },
      not: function (e) {
        return this.pushStack(N(this, e || [], !0));
      },
      is: function (e) {
        return !!N(this, "string" == typeof e && S.test(e) ? b(e) : e || [], !1)
          .length;
      },
    });
  var D,
    j = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
  ((b.fn.init = function (e, t, n) {
    var r, i;
    if (!e) return this;
    if (((n = n || D), "string" == typeof e)) {
      if (
        !(r =
          "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3
            ? [null, e, null]
            : j.exec(e)) ||
        (!r[1] && t)
      )
        return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
      if (r[1]) {
        if (
          ((t = t instanceof b ? t[0] : t),
          b.merge(
            this,
            b.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : v, !0)
          ),
          k.test(r[1]) && b.isPlainObject(t))
        )
          for (r in t) h(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
        return this;
      }
      return (
        (i = v.getElementById(r[2])) && ((this[0] = i), (this.length = 1)), this
      );
    }
    return e.nodeType
      ? ((this[0] = e), (this.length = 1), this)
      : h(e)
      ? void 0 !== n.ready
        ? n.ready(e)
        : e(b)
      : b.makeArray(e, this);
  }).prototype = b.fn),
    (D = b(v));
  var L = /^(?:parents|prev(?:Until|All))/,
    q = { children: !0, contents: !0, next: !0, prev: !0 };
  function _(e, t) {
    for (; (e = e[t]) && 1 !== e.nodeType; );
    return e;
  }
  b.fn.extend({
    has: function (e) {
      var t = b(e, this),
        n = t.length;
      return this.filter(function () {
        for (var e = 0; e < n; e++) if (b.contains(this, t[e])) return !0;
      });
    },
    closest: function (e, t) {
      var n,
        r = 0,
        i = this.length,
        o = [],
        s = "string" != typeof e && b(e);
      if (!S.test(e))
        for (; r < i; r++)
          for (n = this[r]; n && n !== t; n = n.parentNode)
            if (
              n.nodeType < 11 &&
              (s
                ? s.index(n) > -1
                : 1 === n.nodeType && b.find.matchesSelector(n, e))
            ) {
              o.push(n);
              break;
            }
      return this.pushStack(o.length > 1 ? b.uniqueSort(o) : o);
    },
    index: function (e) {
      return e
        ? "string" == typeof e
          ? a.call(b(e), this[0])
          : a.call(this, e.jquery ? e[0] : e)
        : this[0] && this[0].parentNode
        ? this.first().prevAll().length
        : -1;
    },
    add: function (e, t) {
      return this.pushStack(b.uniqueSort(b.merge(this.get(), b(e, t))));
    },
    addBack: function (e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    },
  }),
    b.each(
      {
        parent: function (e) {
          var t = e.parentNode;
          return t && 11 !== t.nodeType ? t : null;
        },
        parents: function (e) {
          return C(e, "parentNode");
        },
        parentsUntil: function (e, t, n) {
          return C(e, "parentNode", n);
        },
        next: function (e) {
          return _(e, "nextSibling");
        },
        prev: function (e) {
          return _(e, "previousSibling");
        },
        nextAll: function (e) {
          return C(e, "nextSibling");
        },
        prevAll: function (e) {
          return C(e, "previousSibling");
        },
        nextUntil: function (e, t, n) {
          return C(e, "nextSibling", n);
        },
        prevUntil: function (e, t, n) {
          return C(e, "previousSibling", n);
        },
        siblings: function (e) {
          return E((e.parentNode || {}).firstChild, e);
        },
        children: function (e) {
          return E(e.firstChild);
        },
        contents: function (e) {
          return null != e.contentDocument && r(e.contentDocument)
            ? e.contentDocument
            : (A(e, "template") && (e = e.content || e),
              b.merge([], e.childNodes));
        },
      },
      function (e, t) {
        b.fn[e] = function (n, r) {
          var i = b.map(this, t, n);
          return (
            "Until" !== e.slice(-5) && (r = n),
            r && "string" == typeof r && (i = b.filter(r, i)),
            this.length > 1 &&
              (q[e] || b.uniqueSort(i), L.test(e) && i.reverse()),
            this.pushStack(i)
          );
        };
      }
    );
  var H = /[^\x20\t\r\n\f]+/g;
  function I(e) {
    return e;
  }
  function O(e) {
    throw e;
  }
  function M(e, t, n, r) {
    var i;
    try {
      e && h((i = e.promise))
        ? i.call(e).done(t).fail(n)
        : e && h((i = e.then))
        ? i.call(e, t, n)
        : t.apply(void 0, [e].slice(r));
    } catch (e) {
      n.apply(void 0, [e]);
    }
  }
  (b.Callbacks = function (e) {
    e =
      "string" == typeof e
        ? (function (e) {
            var t = {};
            return (
              b.each(e.match(H) || [], function (e, n) {
                t[n] = !0;
              }),
              t
            );
          })(e)
        : b.extend({}, e);
    var t,
      n,
      r,
      i,
      o = [],
      s = [],
      a = -1,
      l = function () {
        for (i = i || e.once, r = t = !0; s.length; a = -1)
          for (n = s.shift(); ++a < o.length; )
            !1 === o[a].apply(n[0], n[1]) &&
              e.stopOnFalse &&
              ((a = o.length), (n = !1));
        e.memory || (n = !1), (t = !1), i && (o = n ? [] : "");
      },
      u = {
        add: function () {
          return (
            o &&
              (n && !t && ((a = o.length - 1), s.push(n)),
              (function t(n) {
                b.each(n, function (n, r) {
                  h(r)
                    ? (e.unique && u.has(r)) || o.push(r)
                    : r && r.length && "string" !== x(r) && t(r);
                });
              })(arguments),
              n && !t && l()),
            this
          );
        },
        remove: function () {
          return (
            b.each(arguments, function (e, t) {
              for (var n; (n = b.inArray(t, o, n)) > -1; )
                o.splice(n, 1), n <= a && a--;
            }),
            this
          );
        },
        has: function (e) {
          return e ? b.inArray(e, o) > -1 : o.length > 0;
        },
        empty: function () {
          return o && (o = []), this;
        },
        disable: function () {
          return (i = s = []), (o = n = ""), this;
        },
        disabled: function () {
          return !o;
        },
        lock: function () {
          return (i = s = []), n || t || (o = n = ""), this;
        },
        locked: function () {
          return !!i;
        },
        fireWith: function (e, n) {
          return (
            i ||
              ((n = [e, (n = n || []).slice ? n.slice() : n]),
              s.push(n),
              t || l()),
            this
          );
        },
        fire: function () {
          return u.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!r;
        },
      };
    return u;
  }),
    b.extend({
      Deferred: function (t) {
        var n = [
            [
              "notify",
              "progress",
              b.Callbacks("memory"),
              b.Callbacks("memory"),
              2,
            ],
            [
              "resolve",
              "done",
              b.Callbacks("once memory"),
              b.Callbacks("once memory"),
              0,
              "resolved",
            ],
            [
              "reject",
              "fail",
              b.Callbacks("once memory"),
              b.Callbacks("once memory"),
              1,
              "rejected",
            ],
          ],
          r = "pending",
          i = {
            state: function () {
              return r;
            },
            always: function () {
              return o.done(arguments).fail(arguments), this;
            },
            catch: function (e) {
              return i.then(null, e);
            },
            pipe: function () {
              var e = arguments;
              return b
                .Deferred(function (t) {
                  b.each(n, function (n, r) {
                    var i = h(e[r[4]]) && e[r[4]];
                    o[r[1]](function () {
                      var e = i && i.apply(this, arguments);
                      e && h(e.promise)
                        ? e
                            .promise()
                            .progress(t.notify)
                            .done(t.resolve)
                            .fail(t.reject)
                        : t[r[0] + "With"](this, i ? [e] : arguments);
                    });
                  }),
                    (e = null);
                })
                .promise();
            },
            then: function (t, r, i) {
              var o = 0;
              function s(t, n, r, i) {
                return function () {
                  var a = this,
                    l = arguments,
                    u = function () {
                      var e, u;
                      if (!(t < o)) {
                        if ((e = r.apply(a, l)) === n.promise())
                          throw new TypeError("Thenable self-resolution");
                        (u =
                          e &&
                          ("object" == typeof e || "function" == typeof e) &&
                          e.then),
                          h(u)
                            ? i
                              ? u.call(e, s(o, n, I, i), s(o, n, O, i))
                              : (o++,
                                u.call(
                                  e,
                                  s(o, n, I, i),
                                  s(o, n, O, i),
                                  s(o, n, I, n.notifyWith)
                                ))
                            : (r !== I && ((a = void 0), (l = [e])),
                              (i || n.resolveWith)(a, l));
                      }
                    },
                    c = i
                      ? u
                      : function () {
                          try {
                            u();
                          } catch (e) {
                            b.Deferred.exceptionHook &&
                              b.Deferred.exceptionHook(e, c.stackTrace),
                              t + 1 >= o &&
                                (r !== O && ((a = void 0), (l = [e])),
                                n.rejectWith(a, l));
                          }
                        };
                  t
                    ? c()
                    : (b.Deferred.getStackHook &&
                        (c.stackTrace = b.Deferred.getStackHook()),
                      e.setTimeout(c));
                };
              }
              return b
                .Deferred(function (e) {
                  n[0][3].add(s(0, e, h(i) ? i : I, e.notifyWith)),
                    n[1][3].add(s(0, e, h(t) ? t : I)),
                    n[2][3].add(s(0, e, h(r) ? r : O));
                })
                .promise();
            },
            promise: function (e) {
              return null != e ? b.extend(e, i) : i;
            },
          },
          o = {};
        return (
          b.each(n, function (e, t) {
            var s = t[2],
              a = t[5];
            (i[t[1]] = s.add),
              a &&
                s.add(
                  function () {
                    r = a;
                  },
                  n[3 - e][2].disable,
                  n[3 - e][3].disable,
                  n[0][2].lock,
                  n[0][3].lock
                ),
              s.add(t[3].fire),
              (o[t[0]] = function () {
                return (
                  o[t[0] + "With"](this === o ? void 0 : this, arguments), this
                );
              }),
              (o[t[0] + "With"] = s.fireWith);
          }),
          i.promise(o),
          t && t.call(o, o),
          o
        );
      },
      when: function (e) {
        var t = arguments.length,
          n = t,
          r = Array(n),
          o = i.call(arguments),
          s = b.Deferred(),
          a = function (e) {
            return function (n) {
              (r[e] = this),
                (o[e] = arguments.length > 1 ? i.call(arguments) : n),
                --t || s.resolveWith(r, o);
            };
          };
        if (
          t <= 1 &&
          (M(e, s.done(a(n)).resolve, s.reject, !t),
          "pending" === s.state() || h(o[n] && o[n].then))
        )
          return s.then();
        for (; n--; ) M(o[n], a(n), s.reject);
        return s.promise();
      },
    });
  var P = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  (b.Deferred.exceptionHook = function (t, n) {
    e.console &&
      e.console.warn &&
      t &&
      P.test(t.name) &&
      e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n);
  }),
    (b.readyException = function (t) {
      e.setTimeout(function () {
        throw t;
      });
    });
  var R = b.Deferred();
  function B() {
    v.removeEventListener("DOMContentLoaded", B),
      e.removeEventListener("load", B),
      b.ready();
  }
  (b.fn.ready = function (e) {
    return (
      R.then(e).catch(function (e) {
        b.readyException(e);
      }),
      this
    );
  }),
    b.extend({
      isReady: !1,
      readyWait: 1,
      ready: function (e) {
        (!0 === e ? --b.readyWait : b.isReady) ||
          ((b.isReady = !0),
          (!0 !== e && --b.readyWait > 0) || R.resolveWith(v, [b]));
      },
    }),
    (b.ready.then = R.then),
    "complete" === v.readyState ||
    ("loading" !== v.readyState && !v.documentElement.doScroll)
      ? e.setTimeout(b.ready)
      : (v.addEventListener("DOMContentLoaded", B),
        e.addEventListener("load", B));
  var $ = function (e, t, n, r, i, o, s) {
      var a = 0,
        l = e.length,
        u = null == n;
      if ("object" === x(n))
        for (a in ((i = !0), n)) $(e, t, a, n[a], !0, o, s);
      else if (
        void 0 !== r &&
        ((i = !0),
        h(r) || (s = !0),
        u &&
          (s
            ? (t.call(e, r), (t = null))
            : ((u = t),
              (t = function (e, t, n) {
                return u.call(b(e), n);
              }))),
        t)
      )
        for (; a < l; a++) t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n)));
      return i ? e : u ? t.call(e) : l ? t(e[0], n) : o;
    },
    W = /^-ms-/,
    F = /-([a-z])/g;
  function X(e, t) {
    return t.toUpperCase();
  }
  function z(e) {
    return e.replace(W, "ms-").replace(F, X);
  }
  var U = function (e) {
    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
  };
  function V() {
    this.expando = b.expando + V.uid++;
  }
  (V.uid = 1),
    (V.prototype = {
      cache: function (e) {
        var t = e[this.expando];
        return (
          t ||
            ((t = {}),
            U(e) &&
              (e.nodeType
                ? (e[this.expando] = t)
                : Object.defineProperty(e, this.expando, {
                    value: t,
                    configurable: !0,
                  }))),
          t
        );
      },
      set: function (e, t, n) {
        var r,
          i = this.cache(e);
        if ("string" == typeof t) i[z(t)] = n;
        else for (r in t) i[z(r)] = t[r];
        return i;
      },
      get: function (e, t) {
        return void 0 === t
          ? this.cache(e)
          : e[this.expando] && e[this.expando][z(t)];
      },
      access: function (e, t, n) {
        return void 0 === t || (t && "string" == typeof t && void 0 === n)
          ? this.get(e, t)
          : (this.set(e, t, n), void 0 !== n ? n : t);
      },
      remove: function (e, t) {
        var n,
          r = e[this.expando];
        if (void 0 !== r) {
          if (void 0 !== t) {
            n = (t = Array.isArray(t)
              ? t.map(z)
              : (t = z(t)) in r
              ? [t]
              : t.match(H) || []).length;
            for (; n--; ) delete r[t[n]];
          }
          (void 0 === t || b.isEmptyObject(r)) &&
            (e.nodeType ? (e[this.expando] = void 0) : delete e[this.expando]);
        }
      },
      hasData: function (e) {
        var t = e[this.expando];
        return void 0 !== t && !b.isEmptyObject(t);
      },
    });
  var Y = new V(),
    G = new V(),
    Q = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    J = /[A-Z]/g;
  function K(e, t, n) {
    var r;
    if (void 0 === n && 1 === e.nodeType)
      if (
        ((r = "data-" + t.replace(J, "-$&").toLowerCase()),
        "string" == typeof (n = e.getAttribute(r)))
      ) {
        try {
          n = (function (e) {
            return (
              "true" === e ||
              ("false" !== e &&
                ("null" === e
                  ? null
                  : e === +e + ""
                  ? +e
                  : Q.test(e)
                  ? JSON.parse(e)
                  : e))
            );
          })(n);
        } catch (e) {}
        G.set(e, t, n);
      } else n = void 0;
    return n;
  }
  b.extend({
    hasData: function (e) {
      return G.hasData(e) || Y.hasData(e);
    },
    data: function (e, t, n) {
      return G.access(e, t, n);
    },
    removeData: function (e, t) {
      G.remove(e, t);
    },
    _data: function (e, t, n) {
      return Y.access(e, t, n);
    },
    _removeData: function (e, t) {
      Y.remove(e, t);
    },
  }),
    b.fn.extend({
      data: function (e, t) {
        var n,
          r,
          i,
          o = this[0],
          s = o && o.attributes;
        if (void 0 === e) {
          if (
            this.length &&
            ((i = G.get(o)), 1 === o.nodeType && !Y.get(o, "hasDataAttrs"))
          ) {
            for (n = s.length; n--; )
              s[n] &&
                0 === (r = s[n].name).indexOf("data-") &&
                ((r = z(r.slice(5))), K(o, r, i[r]));
            Y.set(o, "hasDataAttrs", !0);
          }
          return i;
        }
        return "object" == typeof e
          ? this.each(function () {
              G.set(this, e);
            })
          : $(
              this,
              function (t) {
                var n;
                if (o && void 0 === t)
                  return void 0 !== (n = G.get(o, e)) ||
                    void 0 !== (n = K(o, e))
                    ? n
                    : void 0;
                this.each(function () {
                  G.set(this, e, t);
                });
              },
              null,
              t,
              arguments.length > 1,
              null,
              !0
            );
      },
      removeData: function (e) {
        return this.each(function () {
          G.remove(this, e);
        });
      },
    }),
    b.extend({
      queue: function (e, t, n) {
        var r;
        if (e)
          return (
            (t = (t || "fx") + "queue"),
            (r = Y.get(e, t)),
            n &&
              (!r || Array.isArray(n)
                ? (r = Y.access(e, t, b.makeArray(n)))
                : r.push(n)),
            r || []
          );
      },
      dequeue: function (e, t) {
        t = t || "fx";
        var n = b.queue(e, t),
          r = n.length,
          i = n.shift(),
          o = b._queueHooks(e, t);
        "inprogress" === i && ((i = n.shift()), r--),
          i &&
            ("fx" === t && n.unshift("inprogress"),
            delete o.stop,
            i.call(
              e,
              function () {
                b.dequeue(e, t);
              },
              o
            )),
          !r && o && o.empty.fire();
      },
      _queueHooks: function (e, t) {
        var n = t + "queueHooks";
        return (
          Y.get(e, n) ||
          Y.access(e, n, {
            empty: b.Callbacks("once memory").add(function () {
              Y.remove(e, [t + "queue", n]);
            }),
          })
        );
      },
    }),
    b.fn.extend({
      queue: function (e, t) {
        var n = 2;
        return (
          "string" != typeof e && ((t = e), (e = "fx"), n--),
          arguments.length < n
            ? b.queue(this[0], e)
            : void 0 === t
            ? this
            : this.each(function () {
                var n = b.queue(this, e, t);
                b._queueHooks(this, e),
                  "fx" === e && "inprogress" !== n[0] && b.dequeue(this, e);
              })
        );
      },
      dequeue: function (e) {
        return this.each(function () {
          b.dequeue(this, e);
        });
      },
      clearQueue: function (e) {
        return this.queue(e || "fx", []);
      },
      promise: function (e, t) {
        var n,
          r = 1,
          i = b.Deferred(),
          o = this,
          s = this.length,
          a = function () {
            --r || i.resolveWith(o, [o]);
          };
        for (
          "string" != typeof e && ((t = e), (e = void 0)), e = e || "fx";
          s--;

        )
          (n = Y.get(o[s], e + "queueHooks")) &&
            n.empty &&
            (r++, n.empty.add(a));
        return a(), i.promise(t);
      },
    });
  var Z = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    ee = new RegExp("^(?:([+-])=|)(" + Z + ")([a-z%]*)$", "i"),
    te = ["Top", "Right", "Bottom", "Left"],
    ne = v.documentElement,
    re = function (e) {
      return b.contains(e.ownerDocument, e);
    },
    ie = { composed: !0 };
  ne.getRootNode &&
    (re = function (e) {
      return (
        b.contains(e.ownerDocument, e) || e.getRootNode(ie) === e.ownerDocument
      );
    });
  var oe = function (e, t) {
    return (
      "none" === (e = t || e).style.display ||
      ("" === e.style.display && re(e) && "none" === b.css(e, "display"))
    );
  };
  function se(e, t, n, r) {
    var i,
      o,
      s = 20,
      a = r
        ? function () {
            return r.cur();
          }
        : function () {
            return b.css(e, t, "");
          },
      l = a(),
      u = (n && n[3]) || (b.cssNumber[t] ? "" : "px"),
      c =
        e.nodeType &&
        (b.cssNumber[t] || ("px" !== u && +l)) &&
        ee.exec(b.css(e, t));
    if (c && c[3] !== u) {
      for (l /= 2, u = u || c[3], c = +l || 1; s--; )
        b.style(e, t, c + u),
          (1 - o) * (1 - (o = a() / l || 0.5)) <= 0 && (s = 0),
          (c /= o);
      (c *= 2), b.style(e, t, c + u), (n = n || []);
    }
    return (
      n &&
        ((c = +c || +l || 0),
        (i = n[1] ? c + (n[1] + 1) * n[2] : +n[2]),
        r && ((r.unit = u), (r.start = c), (r.end = i))),
      i
    );
  }
  var ae = {};
  function le(e) {
    var t,
      n = e.ownerDocument,
      r = e.nodeName,
      i = ae[r];
    return (
      i ||
      ((t = n.body.appendChild(n.createElement(r))),
      (i = b.css(t, "display")),
      t.parentNode.removeChild(t),
      "none" === i && (i = "block"),
      (ae[r] = i),
      i)
    );
  }
  function ue(e, t) {
    for (var n, r, i = [], o = 0, s = e.length; o < s; o++)
      (r = e[o]).style &&
        ((n = r.style.display),
        t
          ? ("none" === n &&
              ((i[o] = Y.get(r, "display") || null),
              i[o] || (r.style.display = "")),
            "" === r.style.display && oe(r) && (i[o] = le(r)))
          : "none" !== n && ((i[o] = "none"), Y.set(r, "display", n)));
    for (o = 0; o < s; o++) null != i[o] && (e[o].style.display = i[o]);
    return e;
  }
  b.fn.extend({
    show: function () {
      return ue(this, !0);
    },
    hide: function () {
      return ue(this);
    },
    toggle: function (e) {
      return "boolean" == typeof e
        ? e
          ? this.show()
          : this.hide()
        : this.each(function () {
            oe(this) ? b(this).show() : b(this).hide();
          });
    },
  });
  var ce,
    fe,
    de = /^(?:checkbox|radio)$/i,
    pe = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
    he = /^$|^module$|\/(?:java|ecma)script/i;
  (ce = v.createDocumentFragment().appendChild(v.createElement("div"))),
    (fe = v.createElement("input")).setAttribute("type", "radio"),
    fe.setAttribute("checked", "checked"),
    fe.setAttribute("name", "t"),
    ce.appendChild(fe),
    (p.checkClone = ce.cloneNode(!0).cloneNode(!0).lastChild.checked),
    (ce.innerHTML = "<textarea>x</textarea>"),
    (p.noCloneChecked = !!ce.cloneNode(!0).lastChild.defaultValue),
    (ce.innerHTML = "<option></option>"),
    (p.option = !!ce.lastChild);
  var ge = {
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""],
  };
  function ve(e, t) {
    var n;
    return (
      (n =
        void 0 !== e.getElementsByTagName
          ? e.getElementsByTagName(t || "*")
          : void 0 !== e.querySelectorAll
          ? e.querySelectorAll(t || "*")
          : []),
      void 0 === t || (t && A(e, t)) ? b.merge([e], n) : n
    );
  }
  function me(e, t) {
    for (var n = 0, r = e.length; n < r; n++)
      Y.set(e[n], "globalEval", !t || Y.get(t[n], "globalEval"));
  }
  (ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead),
    (ge.th = ge.td),
    p.option ||
      (ge.optgroup = ge.option =
        [1, "<select multiple='multiple'>", "</select>"]);
  var ye = /<|&#?\w+;/;
  function xe(e, t, n, r, i) {
    for (
      var o,
        s,
        a,
        l,
        u,
        c,
        f = t.createDocumentFragment(),
        d = [],
        p = 0,
        h = e.length;
      p < h;
      p++
    )
      if ((o = e[p]) || 0 === o)
        if ("object" === x(o)) b.merge(d, o.nodeType ? [o] : o);
        else if (ye.test(o)) {
          for (
            s = s || f.appendChild(t.createElement("div")),
              a = (pe.exec(o) || ["", ""])[1].toLowerCase(),
              l = ge[a] || ge._default,
              s.innerHTML = l[1] + b.htmlPrefilter(o) + l[2],
              c = l[0];
            c--;

          )
            s = s.lastChild;
          b.merge(d, s.childNodes), ((s = f.firstChild).textContent = "");
        } else d.push(t.createTextNode(o));
    for (f.textContent = "", p = 0; (o = d[p++]); )
      if (r && b.inArray(o, r) > -1) i && i.push(o);
      else if (
        ((u = re(o)), (s = ve(f.appendChild(o), "script")), u && me(s), n)
      )
        for (c = 0; (o = s[c++]); ) he.test(o.type || "") && n.push(o);
    return f;
  }
  var be = /^([^.]*)(?:\.(.+)|)/;
  function we() {
    return !0;
  }
  function Te() {
    return !1;
  }
  function Ce(e, t) {
    return (
      (e ===
        (function () {
          try {
            return v.activeElement;
          } catch (e) {}
        })()) ==
      ("focus" === t)
    );
  }
  function Ee(e, t, n, r, i, o) {
    var s, a;
    if ("object" == typeof t) {
      for (a in ("string" != typeof n && ((r = r || n), (n = void 0)), t))
        Ee(e, a, n, r, t[a], o);
      return e;
    }
    if (
      (null == r && null == i
        ? ((i = n), (r = n = void 0))
        : null == i &&
          ("string" == typeof n
            ? ((i = r), (r = void 0))
            : ((i = r), (r = n), (n = void 0))),
      !1 === i)
    )
      i = Te;
    else if (!i) return e;
    return (
      1 === o &&
        ((s = i),
        ((i = function (e) {
          return b().off(e), s.apply(this, arguments);
        }).guid = s.guid || (s.guid = b.guid++))),
      e.each(function () {
        b.event.add(this, t, i, r, n);
      })
    );
  }
  function Se(e, t, n) {
    n
      ? (Y.set(e, t, !1),
        b.event.add(e, t, {
          namespace: !1,
          handler: function (e) {
            var r,
              o,
              s = Y.get(this, t);
            if (1 & e.isTrigger && this[t]) {
              if (s.length)
                (b.event.special[t] || {}).delegateType && e.stopPropagation();
              else if (
                ((s = i.call(arguments)),
                Y.set(this, t, s),
                (r = n(this, t)),
                this[t](),
                s !== (o = Y.get(this, t)) || r ? Y.set(this, t, !1) : (o = {}),
                s !== o)
              )
                return (
                  e.stopImmediatePropagation(), e.preventDefault(), o && o.value
                );
            } else
              s.length &&
                (Y.set(this, t, {
                  value: b.event.trigger(
                    b.extend(s[0], b.Event.prototype),
                    s.slice(1),
                    this
                  ),
                }),
                e.stopImmediatePropagation());
          },
        }))
      : void 0 === Y.get(e, t) && b.event.add(e, t, we);
  }
  (b.event = {
    global: {},
    add: function (e, t, n, r, i) {
      var o,
        s,
        a,
        l,
        u,
        c,
        f,
        d,
        p,
        h,
        g,
        v = Y.get(e);
      if (U(e))
        for (
          n.handler && ((n = (o = n).handler), (i = o.selector)),
            i && b.find.matchesSelector(ne, i),
            n.guid || (n.guid = b.guid++),
            (l = v.events) || (l = v.events = Object.create(null)),
            (s = v.handle) ||
              (s = v.handle =
                function (t) {
                  return void 0 !== b && b.event.triggered !== t.type
                    ? b.event.dispatch.apply(e, arguments)
                    : void 0;
                }),
            u = (t = (t || "").match(H) || [""]).length;
          u--;

        )
          (p = g = (a = be.exec(t[u]) || [])[1]),
            (h = (a[2] || "").split(".").sort()),
            p &&
              ((f = b.event.special[p] || {}),
              (p = (i ? f.delegateType : f.bindType) || p),
              (f = b.event.special[p] || {}),
              (c = b.extend(
                {
                  type: p,
                  origType: g,
                  data: r,
                  handler: n,
                  guid: n.guid,
                  selector: i,
                  needsContext: i && b.expr.match.needsContext.test(i),
                  namespace: h.join("."),
                },
                o
              )),
              (d = l[p]) ||
                (((d = l[p] = []).delegateCount = 0),
                (f.setup && !1 !== f.setup.call(e, r, h, s)) ||
                  (e.addEventListener && e.addEventListener(p, s))),
              f.add &&
                (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)),
              i ? d.splice(d.delegateCount++, 0, c) : d.push(c),
              (b.event.global[p] = !0));
    },
    remove: function (e, t, n, r, i) {
      var o,
        s,
        a,
        l,
        u,
        c,
        f,
        d,
        p,
        h,
        g,
        v = Y.hasData(e) && Y.get(e);
      if (v && (l = v.events)) {
        for (u = (t = (t || "").match(H) || [""]).length; u--; )
          if (
            ((p = g = (a = be.exec(t[u]) || [])[1]),
            (h = (a[2] || "").split(".").sort()),
            p)
          ) {
            for (
              f = b.event.special[p] || {},
                d = l[(p = (r ? f.delegateType : f.bindType) || p)] || [],
                a =
                  a[2] &&
                  new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                s = o = d.length;
              o--;

            )
              (c = d[o]),
                (!i && g !== c.origType) ||
                  (n && n.guid !== c.guid) ||
                  (a && !a.test(c.namespace)) ||
                  (r && r !== c.selector && ("**" !== r || !c.selector)) ||
                  (d.splice(o, 1),
                  c.selector && d.delegateCount--,
                  f.remove && f.remove.call(e, c));
            s &&
              !d.length &&
              ((f.teardown && !1 !== f.teardown.call(e, h, v.handle)) ||
                b.removeEvent(e, p, v.handle),
              delete l[p]);
          } else for (p in l) b.event.remove(e, p + t[u], n, r, !0);
        b.isEmptyObject(l) && Y.remove(e, "handle events");
      }
    },
    dispatch: function (e) {
      var t,
        n,
        r,
        i,
        o,
        s,
        a = new Array(arguments.length),
        l = b.event.fix(e),
        u = (Y.get(this, "events") || Object.create(null))[l.type] || [],
        c = b.event.special[l.type] || {};
      for (a[0] = l, t = 1; t < arguments.length; t++) a[t] = arguments[t];
      if (
        ((l.delegateTarget = this),
        !c.preDispatch || !1 !== c.preDispatch.call(this, l))
      ) {
        for (
          s = b.event.handlers.call(this, l, u), t = 0;
          (i = s[t++]) && !l.isPropagationStopped();

        )
          for (
            l.currentTarget = i.elem, n = 0;
            (o = i.handlers[n++]) && !l.isImmediatePropagationStopped();

          )
            (l.rnamespace &&
              !1 !== o.namespace &&
              !l.rnamespace.test(o.namespace)) ||
              ((l.handleObj = o),
              (l.data = o.data),
              void 0 !==
                (r = (
                  (b.event.special[o.origType] || {}).handle || o.handler
                ).apply(i.elem, a)) &&
                !1 === (l.result = r) &&
                (l.preventDefault(), l.stopPropagation()));
        return c.postDispatch && c.postDispatch.call(this, l), l.result;
      }
    },
    handlers: function (e, t) {
      var n,
        r,
        i,
        o,
        s,
        a = [],
        l = t.delegateCount,
        u = e.target;
      if (l && u.nodeType && !("click" === e.type && e.button >= 1))
        for (; u !== this; u = u.parentNode || this)
          if (1 === u.nodeType && ("click" !== e.type || !0 !== u.disabled)) {
            for (o = [], s = {}, n = 0; n < l; n++)
              void 0 === s[(i = (r = t[n]).selector + " ")] &&
                (s[i] = r.needsContext
                  ? b(i, this).index(u) > -1
                  : b.find(i, this, null, [u]).length),
                s[i] && o.push(r);
            o.length && a.push({ elem: u, handlers: o });
          }
      return (
        (u = this), l < t.length && a.push({ elem: u, handlers: t.slice(l) }), a
      );
    },
    addProp: function (e, t) {
      Object.defineProperty(b.Event.prototype, e, {
        enumerable: !0,
        configurable: !0,
        get: h(t)
          ? function () {
              if (this.originalEvent) return t(this.originalEvent);
            }
          : function () {
              if (this.originalEvent) return this.originalEvent[e];
            },
        set: function (t) {
          Object.defineProperty(this, e, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: t,
          });
        },
      });
    },
    fix: function (e) {
      return e[b.expando] ? e : new b.Event(e);
    },
    special: {
      load: { noBubble: !0 },
      click: {
        setup: function (e) {
          var t = this || e;
          return (
            de.test(t.type) && t.click && A(t, "input") && Se(t, "click", we),
            !1
          );
        },
        trigger: function (e) {
          var t = this || e;
          return (
            de.test(t.type) && t.click && A(t, "input") && Se(t, "click"), !0
          );
        },
        _default: function (e) {
          var t = e.target;
          return (
            (de.test(t.type) &&
              t.click &&
              A(t, "input") &&
              Y.get(t, "click")) ||
            A(t, "a")
          );
        },
      },
      beforeunload: {
        postDispatch: function (e) {
          void 0 !== e.result &&
            e.originalEvent &&
            (e.originalEvent.returnValue = e.result);
        },
      },
    },
  }),
    (b.removeEvent = function (e, t, n) {
      e.removeEventListener && e.removeEventListener(t, n);
    }),
    (b.Event = function (e, t) {
      if (!(this instanceof b.Event)) return new b.Event(e, t);
      e && e.type
        ? ((this.originalEvent = e),
          (this.type = e.type),
          (this.isDefaultPrevented =
            e.defaultPrevented ||
            (void 0 === e.defaultPrevented && !1 === e.returnValue)
              ? we
              : Te),
          (this.target =
            e.target && 3 === e.target.nodeType
              ? e.target.parentNode
              : e.target),
          (this.currentTarget = e.currentTarget),
          (this.relatedTarget = e.relatedTarget))
        : (this.type = e),
        t && b.extend(this, t),
        (this.timeStamp = (e && e.timeStamp) || Date.now()),
        (this[b.expando] = !0);
    }),
    (b.Event.prototype = {
      constructor: b.Event,
      isDefaultPrevented: Te,
      isPropagationStopped: Te,
      isImmediatePropagationStopped: Te,
      isSimulated: !1,
      preventDefault: function () {
        var e = this.originalEvent;
        (this.isDefaultPrevented = we),
          e && !this.isSimulated && e.preventDefault();
      },
      stopPropagation: function () {
        var e = this.originalEvent;
        (this.isPropagationStopped = we),
          e && !this.isSimulated && e.stopPropagation();
      },
      stopImmediatePropagation: function () {
        var e = this.originalEvent;
        (this.isImmediatePropagationStopped = we),
          e && !this.isSimulated && e.stopImmediatePropagation(),
          this.stopPropagation();
      },
    }),
    b.each(
      {
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: !0,
      },
      b.event.addProp
    ),
    b.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
      b.event.special[e] = {
        setup: function () {
          return Se(this, e, Ce), !1;
        },
        trigger: function () {
          return Se(this, e), !0;
        },
        _default: function () {
          return !0;
        },
        delegateType: t,
      };
    }),
    b.each(
      {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout",
      },
      function (e, t) {
        b.event.special[e] = {
          delegateType: t,
          bindType: t,
          handle: function (e) {
            var n,
              r = this,
              i = e.relatedTarget,
              o = e.handleObj;
            return (
              (i && (i === r || b.contains(r, i))) ||
                ((e.type = o.origType),
                (n = o.handler.apply(this, arguments)),
                (e.type = t)),
              n
            );
          },
        };
      }
    ),
    b.fn.extend({
      on: function (e, t, n, r) {
        return Ee(this, e, t, n, r);
      },
      one: function (e, t, n, r) {
        return Ee(this, e, t, n, r, 1);
      },
      off: function (e, t, n) {
        var r, i;
        if (e && e.preventDefault && e.handleObj)
          return (
            (r = e.handleObj),
            b(e.delegateTarget).off(
              r.namespace ? r.origType + "." + r.namespace : r.origType,
              r.selector,
              r.handler
            ),
            this
          );
        if ("object" == typeof e) {
          for (i in e) this.off(i, t, e[i]);
          return this;
        }
        return (
          (!1 !== t && "function" != typeof t) || ((n = t), (t = void 0)),
          !1 === n && (n = Te),
          this.each(function () {
            b.event.remove(this, e, n, t);
          })
        );
      },
    });
  var Ae = /<script|<style|<link/i,
    ke = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Ne = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  function De(e, t) {
    return (
      (A(e, "table") &&
        A(11 !== t.nodeType ? t : t.firstChild, "tr") &&
        b(e).children("tbody")[0]) ||
      e
    );
  }
  function je(e) {
    return (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e;
  }
  function Le(e) {
    return (
      "true/" === (e.type || "").slice(0, 5)
        ? (e.type = e.type.slice(5))
        : e.removeAttribute("type"),
      e
    );
  }
  function qe(e, t) {
    var n, r, i, o, s, a;
    if (1 === t.nodeType) {
      if (Y.hasData(e) && (a = Y.get(e).events))
        for (i in (Y.remove(t, "handle events"), a))
          for (n = 0, r = a[i].length; n < r; n++) b.event.add(t, i, a[i][n]);
      G.hasData(e) && ((o = G.access(e)), (s = b.extend({}, o)), G.set(t, s));
    }
  }
  function _e(e, t) {
    var n = t.nodeName.toLowerCase();
    "input" === n && de.test(e.type)
      ? (t.checked = e.checked)
      : ("input" !== n && "textarea" !== n) ||
        (t.defaultValue = e.defaultValue);
  }
  function He(e, t, n, r) {
    t = o(t);
    var i,
      s,
      a,
      l,
      u,
      c,
      f = 0,
      d = e.length,
      g = d - 1,
      v = t[0],
      m = h(v);
    if (m || (d > 1 && "string" == typeof v && !p.checkClone && ke.test(v)))
      return e.each(function (i) {
        var o = e.eq(i);
        m && (t[0] = v.call(this, i, o.html())), He(o, t, n, r);
      });
    if (
      d &&
      ((s = (i = xe(t, e[0].ownerDocument, !1, e, r)).firstChild),
      1 === i.childNodes.length && (i = s),
      s || r)
    ) {
      for (l = (a = b.map(ve(i, "script"), je)).length; f < d; f++)
        (u = i),
          f !== g &&
            ((u = b.clone(u, !0, !0)), l && b.merge(a, ve(u, "script"))),
          n.call(e[f], u, f);
      if (l)
        for (c = a[a.length - 1].ownerDocument, b.map(a, Le), f = 0; f < l; f++)
          (u = a[f]),
            he.test(u.type || "") &&
              !Y.access(u, "globalEval") &&
              b.contains(c, u) &&
              (u.src && "module" !== (u.type || "").toLowerCase()
                ? b._evalUrl &&
                  !u.noModule &&
                  b._evalUrl(
                    u.src,
                    { nonce: u.nonce || u.getAttribute("nonce") },
                    c
                  )
                : y(u.textContent.replace(Ne, ""), u, c));
    }
    return e;
  }
  function Ie(e, t, n) {
    for (var r, i = t ? b.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
      n || 1 !== r.nodeType || b.cleanData(ve(r)),
        r.parentNode &&
          (n && re(r) && me(ve(r, "script")), r.parentNode.removeChild(r));
    return e;
  }
  b.extend({
    htmlPrefilter: function (e) {
      return e;
    },
    clone: function (e, t, n) {
      var r,
        i,
        o,
        s,
        a = e.cloneNode(!0),
        l = re(e);
      if (
        !(
          p.noCloneChecked ||
          (1 !== e.nodeType && 11 !== e.nodeType) ||
          b.isXMLDoc(e)
        )
      )
        for (s = ve(a), r = 0, i = (o = ve(e)).length; r < i; r++)
          _e(o[r], s[r]);
      if (t)
        if (n)
          for (o = o || ve(e), s = s || ve(a), r = 0, i = o.length; r < i; r++)
            qe(o[r], s[r]);
        else qe(e, a);
      return (
        (s = ve(a, "script")).length > 0 && me(s, !l && ve(e, "script")), a
      );
    },
    cleanData: function (e) {
      for (var t, n, r, i = b.event.special, o = 0; void 0 !== (n = e[o]); o++)
        if (U(n)) {
          if ((t = n[Y.expando])) {
            if (t.events)
              for (r in t.events)
                i[r] ? b.event.remove(n, r) : b.removeEvent(n, r, t.handle);
            n[Y.expando] = void 0;
          }
          n[G.expando] && (n[G.expando] = void 0);
        }
    },
  }),
    b.fn.extend({
      detach: function (e) {
        return Ie(this, e, !0);
      },
      remove: function (e) {
        return Ie(this, e);
      },
      text: function (e) {
        return $(
          this,
          function (e) {
            return void 0 === e
              ? b.text(this)
              : this.empty().each(function () {
                  (1 !== this.nodeType &&
                    11 !== this.nodeType &&
                    9 !== this.nodeType) ||
                    (this.textContent = e);
                });
          },
          null,
          e,
          arguments.length
        );
      },
      append: function () {
        return He(this, arguments, function (e) {
          (1 !== this.nodeType &&
            11 !== this.nodeType &&
            9 !== this.nodeType) ||
            De(this, e).appendChild(e);
        });
      },
      prepend: function () {
        return He(this, arguments, function (e) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var t = De(this, e);
            t.insertBefore(e, t.firstChild);
          }
        });
      },
      before: function () {
        return He(this, arguments, function (e) {
          this.parentNode && this.parentNode.insertBefore(e, this);
        });
      },
      after: function () {
        return He(this, arguments, function (e) {
          this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
        });
      },
      empty: function () {
        for (var e, t = 0; null != (e = this[t]); t++)
          1 === e.nodeType && (b.cleanData(ve(e, !1)), (e.textContent = ""));
        return this;
      },
      clone: function (e, t) {
        return (
          (e = null != e && e),
          (t = null == t ? e : t),
          this.map(function () {
            return b.clone(this, e, t);
          })
        );
      },
      html: function (e) {
        return $(
          this,
          function (e) {
            var t = this[0] || {},
              n = 0,
              r = this.length;
            if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
            if (
              "string" == typeof e &&
              !Ae.test(e) &&
              !ge[(pe.exec(e) || ["", ""])[1].toLowerCase()]
            ) {
              e = b.htmlPrefilter(e);
              try {
                for (; n < r; n++)
                  1 === (t = this[n] || {}).nodeType &&
                    (b.cleanData(ve(t, !1)), (t.innerHTML = e));
                t = 0;
              } catch (e) {}
            }
            t && this.empty().append(e);
          },
          null,
          e,
          arguments.length
        );
      },
      replaceWith: function () {
        var e = [];
        return He(
          this,
          arguments,
          function (t) {
            var n = this.parentNode;
            b.inArray(this, e) < 0 &&
              (b.cleanData(ve(this)), n && n.replaceChild(t, this));
          },
          e
        );
      },
    }),
    b.each(
      {
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith",
      },
      function (e, t) {
        b.fn[e] = function (e) {
          for (var n, r = [], i = b(e), o = i.length - 1, a = 0; a <= o; a++)
            (n = a === o ? this : this.clone(!0)),
              b(i[a])[t](n),
              s.apply(r, n.get());
          return this.pushStack(r);
        };
      }
    );
  var Oe = new RegExp("^(" + Z + ")(?!px)[a-z%]+$", "i"),
    Me = function (t) {
      var n = t.ownerDocument.defaultView;
      return (n && n.opener) || (n = e), n.getComputedStyle(t);
    },
    Pe = function (e, t, n) {
      var r,
        i,
        o = {};
      for (i in t) (o[i] = e.style[i]), (e.style[i] = t[i]);
      for (i in ((r = n.call(e)), t)) e.style[i] = o[i];
      return r;
    },
    Re = new RegExp(te.join("|"), "i");
  function Be(e, t, n) {
    var r,
      i,
      o,
      s,
      a = e.style;
    return (
      (n = n || Me(e)) &&
        ("" !== (s = n.getPropertyValue(t) || n[t]) ||
          re(e) ||
          (s = b.style(e, t)),
        !p.pixelBoxStyles() &&
          Oe.test(s) &&
          Re.test(t) &&
          ((r = a.width),
          (i = a.minWidth),
          (o = a.maxWidth),
          (a.minWidth = a.maxWidth = a.width = s),
          (s = n.width),
          (a.width = r),
          (a.minWidth = i),
          (a.maxWidth = o))),
      void 0 !== s ? s + "" : s
    );
  }
  function $e(e, t) {
    return {
      get: function () {
        if (!e()) return (this.get = t).apply(this, arguments);
        delete this.get;
      },
    };
  }
  !(function () {
    function t() {
      if (c) {
        (u.style.cssText =
          "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
          (c.style.cssText =
            "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
          ne.appendChild(u).appendChild(c);
        var t = e.getComputedStyle(c);
        (r = "1%" !== t.top),
          (l = 12 === n(t.marginLeft)),
          (c.style.right = "60%"),
          (s = 36 === n(t.right)),
          (i = 36 === n(t.width)),
          (c.style.position = "absolute"),
          (o = 12 === n(c.offsetWidth / 3)),
          ne.removeChild(u),
          (c = null);
      }
    }
    function n(e) {
      return Math.round(parseFloat(e));
    }
    var r,
      i,
      o,
      s,
      a,
      l,
      u = v.createElement("div"),
      c = v.createElement("div");
    c.style &&
      ((c.style.backgroundClip = "content-box"),
      (c.cloneNode(!0).style.backgroundClip = ""),
      (p.clearCloneStyle = "content-box" === c.style.backgroundClip),
      b.extend(p, {
        boxSizingReliable: function () {
          return t(), i;
        },
        pixelBoxStyles: function () {
          return t(), s;
        },
        pixelPosition: function () {
          return t(), r;
        },
        reliableMarginLeft: function () {
          return t(), l;
        },
        scrollboxSize: function () {
          return t(), o;
        },
        reliableTrDimensions: function () {
          var t, n, r, i;
          return (
            null == a &&
              ((t = v.createElement("table")),
              (n = v.createElement("tr")),
              (r = v.createElement("div")),
              (t.style.cssText =
                "position:absolute;left:-11111px;border-collapse:separate"),
              (n.style.cssText = "border:1px solid"),
              (n.style.height = "1px"),
              (r.style.height = "9px"),
              (r.style.display = "block"),
              ne.appendChild(t).appendChild(n).appendChild(r),
              (i = e.getComputedStyle(n)),
              (a =
                parseInt(i.height, 10) +
                  parseInt(i.borderTopWidth, 10) +
                  parseInt(i.borderBottomWidth, 10) ===
                n.offsetHeight),
              ne.removeChild(t)),
            a
          );
        },
      }));
  })();
  var We = ["Webkit", "Moz", "ms"],
    Fe = v.createElement("div").style,
    Xe = {};
  function ze(e) {
    var t = b.cssProps[e] || Xe[e];
    return (
      t ||
      (e in Fe
        ? e
        : (Xe[e] =
            (function (e) {
              for (
                var t = e[0].toUpperCase() + e.slice(1), n = We.length;
                n--;

              )
                if ((e = We[n] + t) in Fe) return e;
            })(e) || e))
    );
  }
  var Ue = /^(none|table(?!-c[ea]).+)/,
    Ve = /^--/,
    Ye = { position: "absolute", visibility: "hidden", display: "block" },
    Ge = { letterSpacing: "0", fontWeight: "400" };
  function Qe(e, t, n) {
    var r = ee.exec(t);
    return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
  }
  function Je(e, t, n, r, i, o) {
    var s = "width" === t ? 1 : 0,
      a = 0,
      l = 0;
    if (n === (r ? "border" : "content")) return 0;
    for (; s < 4; s += 2)
      "margin" === n && (l += b.css(e, n + te[s], !0, i)),
        r
          ? ("content" === n && (l -= b.css(e, "padding" + te[s], !0, i)),
            "margin" !== n &&
              (l -= b.css(e, "border" + te[s] + "Width", !0, i)))
          : ((l += b.css(e, "padding" + te[s], !0, i)),
            "padding" !== n
              ? (l += b.css(e, "border" + te[s] + "Width", !0, i))
              : (a += b.css(e, "border" + te[s] + "Width", !0, i)));
    return (
      !r &&
        o >= 0 &&
        (l +=
          Math.max(
            0,
            Math.ceil(
              e["offset" + t[0].toUpperCase() + t.slice(1)] - o - l - a - 0.5
            )
          ) || 0),
      l
    );
  }
  function Ke(e, t, n) {
    var r = Me(e),
      i =
        (!p.boxSizingReliable() || n) &&
        "border-box" === b.css(e, "boxSizing", !1, r),
      o = i,
      s = Be(e, t, r),
      a = "offset" + t[0].toUpperCase() + t.slice(1);
    if (Oe.test(s)) {
      if (!n) return s;
      s = "auto";
    }
    return (
      ((!p.boxSizingReliable() && i) ||
        (!p.reliableTrDimensions() && A(e, "tr")) ||
        "auto" === s ||
        (!parseFloat(s) && "inline" === b.css(e, "display", !1, r))) &&
        e.getClientRects().length &&
        ((i = "border-box" === b.css(e, "boxSizing", !1, r)),
        (o = a in e) && (s = e[a])),
      (s = parseFloat(s) || 0) +
        Je(e, t, n || (i ? "border" : "content"), o, r, s) +
        "px"
    );
  }
  function Ze(e, t, n, r, i) {
    return new Ze.prototype.init(e, t, n, r, i);
  }
  b.extend({
    cssHooks: {
      opacity: {
        get: function (e, t) {
          if (t) {
            var n = Be(e, "opacity");
            return "" === n ? "1" : n;
          }
        },
      },
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      gridArea: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnStart: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowStart: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
    },
    cssProps: {},
    style: function (e, t, n, r) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var i,
          o,
          s,
          a = z(t),
          l = Ve.test(t),
          u = e.style;
        if (
          (l || (t = ze(a)), (s = b.cssHooks[t] || b.cssHooks[a]), void 0 === n)
        )
          return s && "get" in s && void 0 !== (i = s.get(e, !1, r)) ? i : u[t];
        "string" === (o = typeof n) &&
          (i = ee.exec(n)) &&
          i[1] &&
          ((n = se(e, t, i)), (o = "number")),
          null != n &&
            n == n &&
            ("number" !== o ||
              l ||
              (n += (i && i[3]) || (b.cssNumber[a] ? "" : "px")),
            p.clearCloneStyle ||
              "" !== n ||
              0 !== t.indexOf("background") ||
              (u[t] = "inherit"),
            (s && "set" in s && void 0 === (n = s.set(e, n, r))) ||
              (l ? u.setProperty(t, n) : (u[t] = n)));
      }
    },
    css: function (e, t, n, r) {
      var i,
        o,
        s,
        a = z(t);
      return (
        Ve.test(t) || (t = ze(a)),
        (s = b.cssHooks[t] || b.cssHooks[a]) &&
          "get" in s &&
          (i = s.get(e, !0, n)),
        void 0 === i && (i = Be(e, t, r)),
        "normal" === i && t in Ge && (i = Ge[t]),
        "" === n || n
          ? ((o = parseFloat(i)), !0 === n || isFinite(o) ? o || 0 : i)
          : i
      );
    },
  }),
    b.each(["height", "width"], function (e, t) {
      b.cssHooks[t] = {
        get: function (e, n, r) {
          if (n)
            return !Ue.test(b.css(e, "display")) ||
              (e.getClientRects().length && e.getBoundingClientRect().width)
              ? Ke(e, t, r)
              : Pe(e, Ye, function () {
                  return Ke(e, t, r);
                });
        },
        set: function (e, n, r) {
          var i,
            o = Me(e),
            s = !p.scrollboxSize() && "absolute" === o.position,
            a = (s || r) && "border-box" === b.css(e, "boxSizing", !1, o),
            l = r ? Je(e, t, r, a, o) : 0;
          return (
            a &&
              s &&
              (l -= Math.ceil(
                e["offset" + t[0].toUpperCase() + t.slice(1)] -
                  parseFloat(o[t]) -
                  Je(e, t, "border", !1, o) -
                  0.5
              )),
            l &&
              (i = ee.exec(n)) &&
              "px" !== (i[3] || "px") &&
              ((e.style[t] = n), (n = b.css(e, t))),
            Qe(0, n, l)
          );
        },
      };
    }),
    (b.cssHooks.marginLeft = $e(p.reliableMarginLeft, function (e, t) {
      if (t)
        return (
          (parseFloat(Be(e, "marginLeft")) ||
            e.getBoundingClientRect().left -
              Pe(e, { marginLeft: 0 }, function () {
                return e.getBoundingClientRect().left;
              })) + "px"
        );
    })),
    b.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
      (b.cssHooks[e + t] = {
        expand: function (n) {
          for (
            var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n];
            r < 4;
            r++
          )
            i[e + te[r] + t] = o[r] || o[r - 2] || o[0];
          return i;
        },
      }),
        "margin" !== e && (b.cssHooks[e + t].set = Qe);
    }),
    b.fn.extend({
      css: function (e, t) {
        return $(
          this,
          function (e, t, n) {
            var r,
              i,
              o = {},
              s = 0;
            if (Array.isArray(t)) {
              for (r = Me(e), i = t.length; s < i; s++)
                o[t[s]] = b.css(e, t[s], !1, r);
              return o;
            }
            return void 0 !== n ? b.style(e, t, n) : b.css(e, t);
          },
          e,
          t,
          arguments.length > 1
        );
      },
    }),
    (b.Tween = Ze),
    (Ze.prototype = {
      constructor: Ze,
      init: function (e, t, n, r, i, o) {
        (this.elem = e),
          (this.prop = n),
          (this.easing = i || b.easing._default),
          (this.options = t),
          (this.start = this.now = this.cur()),
          (this.end = r),
          (this.unit = o || (b.cssNumber[n] ? "" : "px"));
      },
      cur: function () {
        var e = Ze.propHooks[this.prop];
        return e && e.get ? e.get(this) : Ze.propHooks._default.get(this);
      },
      run: function (e) {
        var t,
          n = Ze.propHooks[this.prop];
        return (
          this.options.duration
            ? (this.pos = t =
                b.easing[this.easing](
                  e,
                  this.options.duration * e,
                  0,
                  1,
                  this.options.duration
                ))
            : (this.pos = t = e),
          (this.now = (this.end - this.start) * t + this.start),
          this.options.step &&
            this.options.step.call(this.elem, this.now, this),
          n && n.set ? n.set(this) : Ze.propHooks._default.set(this),
          this
        );
      },
    }),
    (Ze.prototype.init.prototype = Ze.prototype),
    (Ze.propHooks = {
      _default: {
        get: function (e) {
          var t;
          return 1 !== e.elem.nodeType ||
            (null != e.elem[e.prop] && null == e.elem.style[e.prop])
            ? e.elem[e.prop]
            : (t = b.css(e.elem, e.prop, "")) && "auto" !== t
            ? t
            : 0;
        },
        set: function (e) {
          b.fx.step[e.prop]
            ? b.fx.step[e.prop](e)
            : 1 !== e.elem.nodeType ||
              (!b.cssHooks[e.prop] && null == e.elem.style[ze(e.prop)])
            ? (e.elem[e.prop] = e.now)
            : b.style(e.elem, e.prop, e.now + e.unit);
        },
      },
    }),
    (Ze.propHooks.scrollTop = Ze.propHooks.scrollLeft =
      {
        set: function (e) {
          e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        },
      }),
    (b.easing = {
      linear: function (e) {
        return e;
      },
      swing: function (e) {
        return 0.5 - Math.cos(e * Math.PI) / 2;
      },
      _default: "swing",
    }),
    (b.fx = Ze.prototype.init),
    (b.fx.step = {});
  var et,
    tt,
    nt = /^(?:toggle|show|hide)$/,
    rt = /queueHooks$/;
  function it() {
    tt &&
      (!1 === v.hidden && e.requestAnimationFrame
        ? e.requestAnimationFrame(it)
        : e.setTimeout(it, b.fx.interval),
      b.fx.tick());
  }
  function ot() {
    return (
      e.setTimeout(function () {
        et = void 0;
      }),
      (et = Date.now())
    );
  }
  function st(e, t) {
    var n,
      r = 0,
      i = { height: e };
    for (t = t ? 1 : 0; r < 4; r += 2 - t)
      i["margin" + (n = te[r])] = i["padding" + n] = e;
    return t && (i.opacity = i.width = e), i;
  }
  function at(e, t, n) {
    for (
      var r,
        i = (lt.tweeners[t] || []).concat(lt.tweeners["*"]),
        o = 0,
        s = i.length;
      o < s;
      o++
    )
      if ((r = i[o].call(n, t, e))) return r;
  }
  function lt(e, t, n) {
    var r,
      i,
      o = 0,
      s = lt.prefilters.length,
      a = b.Deferred().always(function () {
        delete l.elem;
      }),
      l = function () {
        if (i) return !1;
        for (
          var t = et || ot(),
            n = Math.max(0, u.startTime + u.duration - t),
            r = 1 - (n / u.duration || 0),
            o = 0,
            s = u.tweens.length;
          o < s;
          o++
        )
          u.tweens[o].run(r);
        return (
          a.notifyWith(e, [u, r, n]),
          r < 1 && s
            ? n
            : (s || a.notifyWith(e, [u, 1, 0]), a.resolveWith(e, [u]), !1)
        );
      },
      u = a.promise({
        elem: e,
        props: b.extend({}, t),
        opts: b.extend(!0, { specialEasing: {}, easing: b.easing._default }, n),
        originalProperties: t,
        originalOptions: n,
        startTime: et || ot(),
        duration: n.duration,
        tweens: [],
        createTween: function (t, n) {
          var r = b.Tween(
            e,
            u.opts,
            t,
            n,
            u.opts.specialEasing[t] || u.opts.easing
          );
          return u.tweens.push(r), r;
        },
        stop: function (t) {
          var n = 0,
            r = t ? u.tweens.length : 0;
          if (i) return this;
          for (i = !0; n < r; n++) u.tweens[n].run(1);
          return (
            t
              ? (a.notifyWith(e, [u, 1, 0]), a.resolveWith(e, [u, t]))
              : a.rejectWith(e, [u, t]),
            this
          );
        },
      }),
      c = u.props;
    for (
      !(function (e, t) {
        var n, r, i, o, s;
        for (n in e)
          if (
            ((i = t[(r = z(n))]),
            (o = e[n]),
            Array.isArray(o) && ((i = o[1]), (o = e[n] = o[0])),
            n !== r && ((e[r] = o), delete e[n]),
            (s = b.cssHooks[r]) && ("expand" in s))
          )
            for (n in ((o = s.expand(o)), delete e[r], o))
              (n in e) || ((e[n] = o[n]), (t[n] = i));
          else t[r] = i;
      })(c, u.opts.specialEasing);
      o < s;
      o++
    )
      if ((r = lt.prefilters[o].call(u, e, c, u.opts)))
        return (
          h(r.stop) &&
            (b._queueHooks(u.elem, u.opts.queue).stop = r.stop.bind(r)),
          r
        );
    return (
      b.map(c, at, u),
      h(u.opts.start) && u.opts.start.call(e, u),
      u
        .progress(u.opts.progress)
        .done(u.opts.done, u.opts.complete)
        .fail(u.opts.fail)
        .always(u.opts.always),
      b.fx.timer(b.extend(l, { elem: e, anim: u, queue: u.opts.queue })),
      u
    );
  }
  (b.Animation = b.extend(lt, {
    tweeners: {
      "*": [
        function (e, t) {
          var n = this.createTween(e, t);
          return se(n.elem, e, ee.exec(t), n), n;
        },
      ],
    },
    tweener: function (e, t) {
      h(e) ? ((t = e), (e = ["*"])) : (e = e.match(H));
      for (var n, r = 0, i = e.length; r < i; r++)
        (n = e[r]),
          (lt.tweeners[n] = lt.tweeners[n] || []),
          lt.tweeners[n].unshift(t);
    },
    prefilters: [
      function (e, t, n) {
        var r,
          i,
          o,
          s,
          a,
          l,
          u,
          c,
          f = "width" in t || "height" in t,
          d = this,
          p = {},
          h = e.style,
          g = e.nodeType && oe(e),
          v = Y.get(e, "fxshow");
        for (r in (n.queue ||
          (null == (s = b._queueHooks(e, "fx")).unqueued &&
            ((s.unqueued = 0),
            (a = s.empty.fire),
            (s.empty.fire = function () {
              s.unqueued || a();
            })),
          s.unqueued++,
          d.always(function () {
            d.always(function () {
              s.unqueued--, b.queue(e, "fx").length || s.empty.fire();
            });
          })),
        t))
          if (((i = t[r]), nt.test(i))) {
            if (
              (delete t[r],
              (o = o || "toggle" === i),
              i === (g ? "hide" : "show"))
            ) {
              if ("show" !== i || !v || void 0 === v[r]) continue;
              g = !0;
            }
            p[r] = (v && v[r]) || b.style(e, r);
          }
        if ((l = !b.isEmptyObject(t)) || !b.isEmptyObject(p))
          for (r in (f &&
            1 === e.nodeType &&
            ((n.overflow = [h.overflow, h.overflowX, h.overflowY]),
            null == (u = v && v.display) && (u = Y.get(e, "display")),
            "none" === (c = b.css(e, "display")) &&
              (u
                ? (c = u)
                : (ue([e], !0),
                  (u = e.style.display || u),
                  (c = b.css(e, "display")),
                  ue([e]))),
            ("inline" === c || ("inline-block" === c && null != u)) &&
              "none" === b.css(e, "float") &&
              (l ||
                (d.done(function () {
                  h.display = u;
                }),
                null == u && ((c = h.display), (u = "none" === c ? "" : c))),
              (h.display = "inline-block"))),
          n.overflow &&
            ((h.overflow = "hidden"),
            d.always(function () {
              (h.overflow = n.overflow[0]),
                (h.overflowX = n.overflow[1]),
                (h.overflowY = n.overflow[2]);
            })),
          (l = !1),
          p))
            l ||
              (v
                ? "hidden" in v && (g = v.hidden)
                : (v = Y.access(e, "fxshow", { display: u })),
              o && (v.hidden = !g),
              g && ue([e], !0),
              d.done(function () {
                for (r in (g || ue([e]), Y.remove(e, "fxshow"), p))
                  b.style(e, r, p[r]);
              })),
              (l = at(g ? v[r] : 0, r, d)),
              r in v ||
                ((v[r] = l.start), g && ((l.end = l.start), (l.start = 0)));
      },
    ],
    prefilter: function (e, t) {
      t ? lt.prefilters.unshift(e) : lt.prefilters.push(e);
    },
  })),
    (b.speed = function (e, t, n) {
      var r =
        e && "object" == typeof e
          ? b.extend({}, e)
          : {
              complete: n || (!n && t) || (h(e) && e),
              duration: e,
              easing: (n && t) || (t && !h(t) && t),
            };
      return (
        b.fx.off
          ? (r.duration = 0)
          : "number" != typeof r.duration &&
            (r.duration in b.fx.speeds
              ? (r.duration = b.fx.speeds[r.duration])
              : (r.duration = b.fx.speeds._default)),
        (null != r.queue && !0 !== r.queue) || (r.queue = "fx"),
        (r.old = r.complete),
        (r.complete = function () {
          h(r.old) && r.old.call(this), r.queue && b.dequeue(this, r.queue);
        }),
        r
      );
    }),
    b.fn.extend({
      fadeTo: function (e, t, n, r) {
        return this.filter(oe)
          .css("opacity", 0)
          .show()
          .end()
          .animate({ opacity: t }, e, n, r);
      },
      animate: function (e, t, n, r) {
        var i = b.isEmptyObject(e),
          o = b.speed(t, n, r),
          s = function () {
            var t = lt(this, b.extend({}, e), o);
            (i || Y.get(this, "finish")) && t.stop(!0);
          };
        return (
          (s.finish = s),
          i || !1 === o.queue ? this.each(s) : this.queue(o.queue, s)
        );
      },
      stop: function (e, t, n) {
        var r = function (e) {
          var t = e.stop;
          delete e.stop, t(n);
        };
        return (
          "string" != typeof e && ((n = t), (t = e), (e = void 0)),
          t && this.queue(e || "fx", []),
          this.each(function () {
            var t = !0,
              i = null != e && e + "queueHooks",
              o = b.timers,
              s = Y.get(this);
            if (i) s[i] && s[i].stop && r(s[i]);
            else for (i in s) s[i] && s[i].stop && rt.test(i) && r(s[i]);
            for (i = o.length; i--; )
              o[i].elem !== this ||
                (null != e && o[i].queue !== e) ||
                (o[i].anim.stop(n), (t = !1), o.splice(i, 1));
            (!t && n) || b.dequeue(this, e);
          })
        );
      },
      finish: function (e) {
        return (
          !1 !== e && (e = e || "fx"),
          this.each(function () {
            var t,
              n = Y.get(this),
              r = n[e + "queue"],
              i = n[e + "queueHooks"],
              o = b.timers,
              s = r ? r.length : 0;
            for (
              n.finish = !0,
                b.queue(this, e, []),
                i && i.stop && i.stop.call(this, !0),
                t = o.length;
              t--;

            )
              o[t].elem === this &&
                o[t].queue === e &&
                (o[t].anim.stop(!0), o.splice(t, 1));
            for (t = 0; t < s; t++)
              r[t] && r[t].finish && r[t].finish.call(this);
            delete n.finish;
          })
        );
      },
    }),
    b.each(["toggle", "show", "hide"], function (e, t) {
      var n = b.fn[t];
      b.fn[t] = function (e, r, i) {
        return null == e || "boolean" == typeof e
          ? n.apply(this, arguments)
          : this.animate(st(t, !0), e, r, i);
      };
    }),
    b.each(
      {
        slideDown: st("show"),
        slideUp: st("hide"),
        slideToggle: st("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" },
      },
      function (e, t) {
        b.fn[e] = function (e, n, r) {
          return this.animate(t, e, n, r);
        };
      }
    ),
    (b.timers = []),
    (b.fx.tick = function () {
      var e,
        t = 0,
        n = b.timers;
      for (et = Date.now(); t < n.length; t++)
        (e = n[t])() || n[t] !== e || n.splice(t--, 1);
      n.length || b.fx.stop(), (et = void 0);
    }),
    (b.fx.timer = function (e) {
      b.timers.push(e), b.fx.start();
    }),
    (b.fx.interval = 13),
    (b.fx.start = function () {
      tt || ((tt = !0), it());
    }),
    (b.fx.stop = function () {
      tt = null;
    }),
    (b.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
    (b.fn.delay = function (t, n) {
      return (
        (t = (b.fx && b.fx.speeds[t]) || t),
        (n = n || "fx"),
        this.queue(n, function (n, r) {
          var i = e.setTimeout(n, t);
          r.stop = function () {
            e.clearTimeout(i);
          };
        })
      );
    }),
    (function () {
      var e = v.createElement("input"),
        t = v.createElement("select").appendChild(v.createElement("option"));
      (e.type = "checkbox"),
        (p.checkOn = "" !== e.value),
        (p.optSelected = t.selected),
        ((e = v.createElement("input")).value = "t"),
        (e.type = "radio"),
        (p.radioValue = "t" === e.value);
    })();
  var ut,
    ct = b.expr.attrHandle;
  b.fn.extend({
    attr: function (e, t) {
      return $(this, b.attr, e, t, arguments.length > 1);
    },
    removeAttr: function (e) {
      return this.each(function () {
        b.removeAttr(this, e);
      });
    },
  }),
    b.extend({
      attr: function (e, t, n) {
        var r,
          i,
          o = e.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return void 0 === e.getAttribute
            ? b.prop(e, t, n)
            : ((1 === o && b.isXMLDoc(e)) ||
                (i =
                  b.attrHooks[t.toLowerCase()] ||
                  (b.expr.match.bool.test(t) ? ut : void 0)),
              void 0 !== n
                ? null === n
                  ? void b.removeAttr(e, t)
                  : i && "set" in i && void 0 !== (r = i.set(e, n, t))
                  ? r
                  : (e.setAttribute(t, n + ""), n)
                : i && "get" in i && null !== (r = i.get(e, t))
                ? r
                : null == (r = b.find.attr(e, t))
                ? void 0
                : r);
      },
      attrHooks: {
        type: {
          set: function (e, t) {
            if (!p.radioValue && "radio" === t && A(e, "input")) {
              var n = e.value;
              return e.setAttribute("type", t), n && (e.value = n), t;
            }
          },
        },
      },
      removeAttr: function (e, t) {
        var n,
          r = 0,
          i = t && t.match(H);
        if (i && 1 === e.nodeType) for (; (n = i[r++]); ) e.removeAttribute(n);
      },
    }),
    (ut = {
      set: function (e, t, n) {
        return !1 === t ? b.removeAttr(e, n) : e.setAttribute(n, n), n;
      },
    }),
    b.each(b.expr.match.bool.source.match(/\w+/g), function (e, t) {
      var n = ct[t] || b.find.attr;
      ct[t] = function (e, t, r) {
        var i,
          o,
          s = t.toLowerCase();
        return (
          r ||
            ((o = ct[s]),
            (ct[s] = i),
            (i = null != n(e, t, r) ? s : null),
            (ct[s] = o)),
          i
        );
      };
    });
  var ft = /^(?:input|select|textarea|button)$/i,
    dt = /^(?:a|area)$/i;
  function pt(e) {
    return (e.match(H) || []).join(" ");
  }
  function ht(e) {
    return (e.getAttribute && e.getAttribute("class")) || "";
  }
  function gt(e) {
    return Array.isArray(e) ? e : ("string" == typeof e && e.match(H)) || [];
  }
  b.fn.extend({
    prop: function (e, t) {
      return $(this, b.prop, e, t, arguments.length > 1);
    },
    removeProp: function (e) {
      return this.each(function () {
        delete this[b.propFix[e] || e];
      });
    },
  }),
    b.extend({
      prop: function (e, t, n) {
        var r,
          i,
          o = e.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return (
            (1 === o && b.isXMLDoc(e)) ||
              ((t = b.propFix[t] || t), (i = b.propHooks[t])),
            void 0 !== n
              ? i && "set" in i && void 0 !== (r = i.set(e, n, t))
                ? r
                : (e[t] = n)
              : i && "get" in i && null !== (r = i.get(e, t))
              ? r
              : e[t]
          );
      },
      propHooks: {
        tabIndex: {
          get: function (e) {
            var t = b.find.attr(e, "tabindex");
            return t
              ? parseInt(t, 10)
              : ft.test(e.nodeName) || (dt.test(e.nodeName) && e.href)
              ? 0
              : -1;
          },
        },
      },
      propFix: { for: "htmlFor", class: "className" },
    }),
    p.optSelected ||
      (b.propHooks.selected = {
        get: function (e) {
          var t = e.parentNode;
          return t && t.parentNode && t.parentNode.selectedIndex, null;
        },
        set: function (e) {
          var t = e.parentNode;
          t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
        },
      }),
    b.each(
      [
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable",
      ],
      function () {
        b.propFix[this.toLowerCase()] = this;
      }
    ),
    b.fn.extend({
      addClass: function (e) {
        var t,
          n,
          r,
          i,
          o,
          s,
          a,
          l = 0;
        if (h(e))
          return this.each(function (t) {
            b(this).addClass(e.call(this, t, ht(this)));
          });
        if ((t = gt(e)).length)
          for (; (n = this[l++]); )
            if (((i = ht(n)), (r = 1 === n.nodeType && " " + pt(i) + " "))) {
              for (s = 0; (o = t[s++]); )
                r.indexOf(" " + o + " ") < 0 && (r += o + " ");
              i !== (a = pt(r)) && n.setAttribute("class", a);
            }
        return this;
      },
      removeClass: function (e) {
        var t,
          n,
          r,
          i,
          o,
          s,
          a,
          l = 0;
        if (h(e))
          return this.each(function (t) {
            b(this).removeClass(e.call(this, t, ht(this)));
          });
        if (!arguments.length) return this.attr("class", "");
        if ((t = gt(e)).length)
          for (; (n = this[l++]); )
            if (((i = ht(n)), (r = 1 === n.nodeType && " " + pt(i) + " "))) {
              for (s = 0; (o = t[s++]); )
                for (; r.indexOf(" " + o + " ") > -1; )
                  r = r.replace(" " + o + " ", " ");
              i !== (a = pt(r)) && n.setAttribute("class", a);
            }
        return this;
      },
      toggleClass: function (e, t) {
        var n = typeof e,
          r = "string" === n || Array.isArray(e);
        return "boolean" == typeof t && r
          ? t
            ? this.addClass(e)
            : this.removeClass(e)
          : h(e)
          ? this.each(function (n) {
              b(this).toggleClass(e.call(this, n, ht(this), t), t);
            })
          : this.each(function () {
              var t, i, o, s;
              if (r)
                for (i = 0, o = b(this), s = gt(e); (t = s[i++]); )
                  o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
              else
                (void 0 !== e && "boolean" !== n) ||
                  ((t = ht(this)) && Y.set(this, "__className__", t),
                  this.setAttribute &&
                    this.setAttribute(
                      "class",
                      t || !1 === e ? "" : Y.get(this, "__className__") || ""
                    ));
            });
      },
      hasClass: function (e) {
        var t,
          n,
          r = 0;
        for (t = " " + e + " "; (n = this[r++]); )
          if (1 === n.nodeType && (" " + pt(ht(n)) + " ").indexOf(t) > -1)
            return !0;
        return !1;
      },
    });
  var vt = /\r/g;
  b.fn.extend({
    val: function (e) {
      var t,
        n,
        r,
        i = this[0];
      return arguments.length
        ? ((r = h(e)),
          this.each(function (n) {
            var i;
            1 === this.nodeType &&
              (null == (i = r ? e.call(this, n, b(this).val()) : e)
                ? (i = "")
                : "number" == typeof i
                ? (i += "")
                : Array.isArray(i) &&
                  (i = b.map(i, function (e) {
                    return null == e ? "" : e + "";
                  })),
              ((t =
                b.valHooks[this.type] ||
                b.valHooks[this.nodeName.toLowerCase()]) &&
                "set" in t &&
                void 0 !== t.set(this, i, "value")) ||
                (this.value = i));
          }))
        : i
        ? (t = b.valHooks[i.type] || b.valHooks[i.nodeName.toLowerCase()]) &&
          "get" in t &&
          void 0 !== (n = t.get(i, "value"))
          ? n
          : "string" == typeof (n = i.value)
          ? n.replace(vt, "")
          : null == n
          ? ""
          : n
        : void 0;
    },
  }),
    b.extend({
      valHooks: {
        option: {
          get: function (e) {
            var t = b.find.attr(e, "value");
            return null != t ? t : pt(b.text(e));
          },
        },
        select: {
          get: function (e) {
            var t,
              n,
              r,
              i = e.options,
              o = e.selectedIndex,
              s = "select-one" === e.type,
              a = s ? null : [],
              l = s ? o + 1 : i.length;
            for (r = o < 0 ? l : s ? o : 0; r < l; r++)
              if (
                ((n = i[r]).selected || r === o) &&
                !n.disabled &&
                (!n.parentNode.disabled || !A(n.parentNode, "optgroup"))
              ) {
                if (((t = b(n).val()), s)) return t;
                a.push(t);
              }
            return a;
          },
          set: function (e, t) {
            for (
              var n, r, i = e.options, o = b.makeArray(t), s = i.length;
              s--;

            )
              ((r = i[s]).selected =
                b.inArray(b.valHooks.option.get(r), o) > -1) && (n = !0);
            return n || (e.selectedIndex = -1), o;
          },
        },
      },
    }),
    b.each(["radio", "checkbox"], function () {
      (b.valHooks[this] = {
        set: function (e, t) {
          if (Array.isArray(t))
            return (e.checked = b.inArray(b(e).val(), t) > -1);
        },
      }),
        p.checkOn ||
          (b.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value;
          });
    }),
    (p.focusin = "onfocusin" in e);
  var mt = /^(?:focusinfocus|focusoutblur)$/,
    yt = function (e) {
      e.stopPropagation();
    };
  b.extend(b.event, {
    trigger: function (t, n, r, i) {
      var o,
        s,
        a,
        l,
        u,
        f,
        d,
        p,
        m = [r || v],
        y = c.call(t, "type") ? t.type : t,
        x = c.call(t, "namespace") ? t.namespace.split(".") : [];
      if (
        ((s = p = a = r = r || v),
        3 !== r.nodeType &&
          8 !== r.nodeType &&
          !mt.test(y + b.event.triggered) &&
          (y.indexOf(".") > -1 &&
            ((x = y.split(".")), (y = x.shift()), x.sort()),
          (u = y.indexOf(":") < 0 && "on" + y),
          ((t = t[b.expando]
            ? t
            : new b.Event(y, "object" == typeof t && t)).isTrigger = i ? 2 : 3),
          (t.namespace = x.join(".")),
          (t.rnamespace = t.namespace
            ? new RegExp("(^|\\.)" + x.join("\\.(?:.*\\.|)") + "(\\.|$)")
            : null),
          (t.result = void 0),
          t.target || (t.target = r),
          (n = null == n ? [t] : b.makeArray(n, [t])),
          (d = b.event.special[y] || {}),
          i || !d.trigger || !1 !== d.trigger.apply(r, n)))
      ) {
        if (!i && !d.noBubble && !g(r)) {
          for (
            l = d.delegateType || y, mt.test(l + y) || (s = s.parentNode);
            s;
            s = s.parentNode
          )
            m.push(s), (a = s);
          a === (r.ownerDocument || v) &&
            m.push(a.defaultView || a.parentWindow || e);
        }
        for (o = 0; (s = m[o++]) && !t.isPropagationStopped(); )
          (p = s),
            (t.type = o > 1 ? l : d.bindType || y),
            (f =
              (Y.get(s, "events") || Object.create(null))[t.type] &&
              Y.get(s, "handle")) && f.apply(s, n),
            (f = u && s[u]) &&
              f.apply &&
              U(s) &&
              ((t.result = f.apply(s, n)),
              !1 === t.result && t.preventDefault());
        return (
          (t.type = y),
          i ||
            t.isDefaultPrevented() ||
            (d._default && !1 !== d._default.apply(m.pop(), n)) ||
            !U(r) ||
            (u &&
              h(r[y]) &&
              !g(r) &&
              ((a = r[u]) && (r[u] = null),
              (b.event.triggered = y),
              t.isPropagationStopped() && p.addEventListener(y, yt),
              r[y](),
              t.isPropagationStopped() && p.removeEventListener(y, yt),
              (b.event.triggered = void 0),
              a && (r[u] = a))),
          t.result
        );
      }
    },
    simulate: function (e, t, n) {
      var r = b.extend(new b.Event(), n, { type: e, isSimulated: !0 });
      b.event.trigger(r, null, t);
    },
  }),
    b.fn.extend({
      trigger: function (e, t) {
        return this.each(function () {
          b.event.trigger(e, t, this);
        });
      },
      triggerHandler: function (e, t) {
        var n = this[0];
        if (n) return b.event.trigger(e, t, n, !0);
      },
    }),
    p.focusin ||
      b.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
        var n = function (e) {
          b.event.simulate(t, e.target, b.event.fix(e));
        };
        b.event.special[t] = {
          setup: function () {
            var r = this.ownerDocument || this.document || this,
              i = Y.access(r, t);
            i || r.addEventListener(e, n, !0), Y.access(r, t, (i || 0) + 1);
          },
          teardown: function () {
            var r = this.ownerDocument || this.document || this,
              i = Y.access(r, t) - 1;
            i
              ? Y.access(r, t, i)
              : (r.removeEventListener(e, n, !0), Y.remove(r, t));
          },
        };
      });
  var xt = e.location,
    bt = { guid: Date.now() },
    wt = /\?/;
  b.parseXML = function (t) {
    var n, r;
    if (!t || "string" != typeof t) return null;
    try {
      n = new e.DOMParser().parseFromString(t, "text/xml");
    } catch (e) {}
    return (
      (r = n && n.getElementsByTagName("parsererror")[0]),
      (n && !r) ||
        b.error(
          "Invalid XML: " +
            (r
              ? b
                  .map(r.childNodes, function (e) {
                    return e.textContent;
                  })
                  .join("\n")
              : t)
        ),
      n
    );
  };
  var Tt = /\[\]$/,
    Ct = /\r?\n/g,
    Et = /^(?:submit|button|image|reset|file)$/i,
    St = /^(?:input|select|textarea|keygen)/i;
  function At(e, t, n, r) {
    var i;
    if (Array.isArray(t))
      b.each(t, function (t, i) {
        n || Tt.test(e)
          ? r(e, i)
          : At(
              e + "[" + ("object" == typeof i && null != i ? t : "") + "]",
              i,
              n,
              r
            );
      });
    else if (n || "object" !== x(t)) r(e, t);
    else for (i in t) At(e + "[" + i + "]", t[i], n, r);
  }
  (b.param = function (e, t) {
    var n,
      r = [],
      i = function (e, t) {
        var n = h(t) ? t() : t;
        r[r.length] =
          encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n);
      };
    if (null == e) return "";
    if (Array.isArray(e) || (e.jquery && !b.isPlainObject(e)))
      b.each(e, function () {
        i(this.name, this.value);
      });
    else for (n in e) At(n, e[n], t, i);
    return r.join("&");
  }),
    b.fn.extend({
      serialize: function () {
        return b.param(this.serializeArray());
      },
      serializeArray: function () {
        return this.map(function () {
          var e = b.prop(this, "elements");
          return e ? b.makeArray(e) : this;
        })
          .filter(function () {
            var e = this.type;
            return (
              this.name &&
              !b(this).is(":disabled") &&
              St.test(this.nodeName) &&
              !Et.test(e) &&
              (this.checked || !de.test(e))
            );
          })
          .map(function (e, t) {
            var n = b(this).val();
            return null == n
              ? null
              : Array.isArray(n)
              ? b.map(n, function (e) {
                  return { name: t.name, value: e.replace(Ct, "\r\n") };
                })
              : { name: t.name, value: n.replace(Ct, "\r\n") };
          })
          .get();
      },
    });
  var kt = /%20/g,
    Nt = /#.*$/,
    Dt = /([?&])_=[^&]*/,
    jt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    Lt = /^(?:GET|HEAD)$/,
    qt = /^\/\//,
    _t = {},
    Ht = {},
    It = "*/".concat("*"),
    Ot = v.createElement("a");
  function Mt(e) {
    return function (t, n) {
      "string" != typeof t && ((n = t), (t = "*"));
      var r,
        i = 0,
        o = t.toLowerCase().match(H) || [];
      if (h(n))
        for (; (r = o[i++]); )
          "+" === r[0]
            ? ((r = r.slice(1) || "*"), (e[r] = e[r] || []).unshift(n))
            : (e[r] = e[r] || []).push(n);
    };
  }
  function Pt(e, t, n, r) {
    var i = {},
      o = e === Ht;
    function s(a) {
      var l;
      return (
        (i[a] = !0),
        b.each(e[a] || [], function (e, a) {
          var u = a(t, n, r);
          return "string" != typeof u || o || i[u]
            ? o
              ? !(l = u)
              : void 0
            : (t.dataTypes.unshift(u), s(u), !1);
        }),
        l
      );
    }
    return s(t.dataTypes[0]) || (!i["*"] && s("*"));
  }
  function Rt(e, t) {
    var n,
      r,
      i = b.ajaxSettings.flatOptions || {};
    for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
    return r && b.extend(!0, e, r), e;
  }
  (Ot.href = xt.href),
    b.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: xt.href,
        type: "GET",
        isLocal:
          /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
            xt.protocol
          ),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
          "*": It,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript",
        },
        contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON",
        },
        converters: {
          "* text": String,
          "text html": !0,
          "text json": JSON.parse,
          "text xml": b.parseXML,
        },
        flatOptions: { url: !0, context: !0 },
      },
      ajaxSetup: function (e, t) {
        return t ? Rt(Rt(e, b.ajaxSettings), t) : Rt(b.ajaxSettings, e);
      },
      ajaxPrefilter: Mt(_t),
      ajaxTransport: Mt(Ht),
      ajax: function (t, n) {
        "object" == typeof t && ((n = t), (t = void 0)), (n = n || {});
        var r,
          i,
          o,
          s,
          a,
          l,
          u,
          c,
          f,
          d,
          p = b.ajaxSetup({}, n),
          h = p.context || p,
          g = p.context && (h.nodeType || h.jquery) ? b(h) : b.event,
          m = b.Deferred(),
          y = b.Callbacks("once memory"),
          x = p.statusCode || {},
          w = {},
          T = {},
          C = "canceled",
          E = {
            readyState: 0,
            getResponseHeader: function (e) {
              var t;
              if (u) {
                if (!s)
                  for (s = {}; (t = jt.exec(o)); )
                    s[t[1].toLowerCase() + " "] = (
                      s[t[1].toLowerCase() + " "] || []
                    ).concat(t[2]);
                t = s[e.toLowerCase() + " "];
              }
              return null == t ? null : t.join(", ");
            },
            getAllResponseHeaders: function () {
              return u ? o : null;
            },
            setRequestHeader: function (e, t) {
              return (
                null == u &&
                  ((e = T[e.toLowerCase()] = T[e.toLowerCase()] || e),
                  (w[e] = t)),
                this
              );
            },
            overrideMimeType: function (e) {
              return null == u && (p.mimeType = e), this;
            },
            statusCode: function (e) {
              var t;
              if (e)
                if (u) E.always(e[E.status]);
                else for (t in e) x[t] = [x[t], e[t]];
              return this;
            },
            abort: function (e) {
              var t = e || C;
              return r && r.abort(t), S(0, t), this;
            },
          };
        if (
          (m.promise(E),
          (p.url = ((t || p.url || xt.href) + "").replace(
            qt,
            xt.protocol + "//"
          )),
          (p.type = n.method || n.type || p.method || p.type),
          (p.dataTypes = (p.dataType || "*").toLowerCase().match(H) || [""]),
          null == p.crossDomain)
        ) {
          l = v.createElement("a");
          try {
            (l.href = p.url),
              (l.href = l.href),
              (p.crossDomain =
                Ot.protocol + "//" + Ot.host != l.protocol + "//" + l.host);
          } catch (e) {
            p.crossDomain = !0;
          }
        }
        if (
          (p.data &&
            p.processData &&
            "string" != typeof p.data &&
            (p.data = b.param(p.data, p.traditional)),
          Pt(_t, p, n, E),
          u)
        )
          return E;
        for (f in ((c = b.event && p.global) &&
          0 == b.active++ &&
          b.event.trigger("ajaxStart"),
        (p.type = p.type.toUpperCase()),
        (p.hasContent = !Lt.test(p.type)),
        (i = p.url.replace(Nt, "")),
        p.hasContent
          ? p.data &&
            p.processData &&
            0 ===
              (p.contentType || "").indexOf(
                "application/x-www-form-urlencoded"
              ) &&
            (p.data = p.data.replace(kt, "+"))
          : ((d = p.url.slice(i.length)),
            p.data &&
              (p.processData || "string" == typeof p.data) &&
              ((i += (wt.test(i) ? "&" : "?") + p.data), delete p.data),
            !1 === p.cache &&
              ((i = i.replace(Dt, "$1")),
              (d = (wt.test(i) ? "&" : "?") + "_=" + bt.guid++ + d)),
            (p.url = i + d)),
        p.ifModified &&
          (b.lastModified[i] &&
            E.setRequestHeader("If-Modified-Since", b.lastModified[i]),
          b.etag[i] && E.setRequestHeader("If-None-Match", b.etag[i])),
        ((p.data && p.hasContent && !1 !== p.contentType) || n.contentType) &&
          E.setRequestHeader("Content-Type", p.contentType),
        E.setRequestHeader(
          "Accept",
          p.dataTypes[0] && p.accepts[p.dataTypes[0]]
            ? p.accepts[p.dataTypes[0]] +
                ("*" !== p.dataTypes[0] ? ", " + It + "; q=0.01" : "")
            : p.accepts["*"]
        ),
        p.headers))
          E.setRequestHeader(f, p.headers[f]);
        if (p.beforeSend && (!1 === p.beforeSend.call(h, E, p) || u))
          return E.abort();
        if (
          ((C = "abort"),
          y.add(p.complete),
          E.done(p.success),
          E.fail(p.error),
          (r = Pt(Ht, p, n, E)))
        ) {
          if (((E.readyState = 1), c && g.trigger("ajaxSend", [E, p]), u))
            return E;
          p.async &&
            p.timeout > 0 &&
            (a = e.setTimeout(function () {
              E.abort("timeout");
            }, p.timeout));
          try {
            (u = !1), r.send(w, S);
          } catch (e) {
            if (u) throw e;
            S(-1, e);
          }
        } else S(-1, "No Transport");
        function S(t, n, s, l) {
          var f,
            d,
            v,
            w,
            T,
            C = n;
          u ||
            ((u = !0),
            a && e.clearTimeout(a),
            (r = void 0),
            (o = l || ""),
            (E.readyState = t > 0 ? 4 : 0),
            (f = (t >= 200 && t < 300) || 304 === t),
            s &&
              (w = (function (e, t, n) {
                for (
                  var r, i, o, s, a = e.contents, l = e.dataTypes;
                  "*" === l[0];

                )
                  l.shift(),
                    void 0 === r &&
                      (r = e.mimeType || t.getResponseHeader("Content-Type"));
                if (r)
                  for (i in a)
                    if (a[i] && a[i].test(r)) {
                      l.unshift(i);
                      break;
                    }
                if (l[0] in n) o = l[0];
                else {
                  for (i in n) {
                    if (!l[0] || e.converters[i + " " + l[0]]) {
                      o = i;
                      break;
                    }
                    s || (s = i);
                  }
                  o = o || s;
                }
                if (o) return o !== l[0] && l.unshift(o), n[o];
              })(p, E, s)),
            !f &&
              b.inArray("script", p.dataTypes) > -1 &&
              b.inArray("json", p.dataTypes) < 0 &&
              (p.converters["text script"] = function () {}),
            (w = (function (e, t, n, r) {
              var i,
                o,
                s,
                a,
                l,
                u = {},
                c = e.dataTypes.slice();
              if (c[1])
                for (s in e.converters) u[s.toLowerCase()] = e.converters[s];
              for (o = c.shift(); o; )
                if (
                  (e.responseFields[o] && (n[e.responseFields[o]] = t),
                  !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                  (l = o),
                  (o = c.shift()))
                )
                  if ("*" === o) o = l;
                  else if ("*" !== l && l !== o) {
                    if (!(s = u[l + " " + o] || u["* " + o]))
                      for (i in u)
                        if (
                          (a = i.split(" "))[1] === o &&
                          (s = u[l + " " + a[0]] || u["* " + a[0]])
                        ) {
                          !0 === s
                            ? (s = u[i])
                            : !0 !== u[i] && ((o = a[0]), c.unshift(a[1]));
                          break;
                        }
                    if (!0 !== s)
                      if (s && e.throws) t = s(t);
                      else
                        try {
                          t = s(t);
                        } catch (e) {
                          return {
                            state: "parsererror",
                            error: s
                              ? e
                              : "No conversion from " + l + " to " + o,
                          };
                        }
                  }
              return { state: "success", data: t };
            })(p, w, E, f)),
            f
              ? (p.ifModified &&
                  ((T = E.getResponseHeader("Last-Modified")) &&
                    (b.lastModified[i] = T),
                  (T = E.getResponseHeader("etag")) && (b.etag[i] = T)),
                204 === t || "HEAD" === p.type
                  ? (C = "nocontent")
                  : 304 === t
                  ? (C = "notmodified")
                  : ((C = w.state), (d = w.data), (f = !(v = w.error))))
              : ((v = C), (!t && C) || ((C = "error"), t < 0 && (t = 0))),
            (E.status = t),
            (E.statusText = (n || C) + ""),
            f ? m.resolveWith(h, [d, C, E]) : m.rejectWith(h, [E, C, v]),
            E.statusCode(x),
            (x = void 0),
            c && g.trigger(f ? "ajaxSuccess" : "ajaxError", [E, p, f ? d : v]),
            y.fireWith(h, [E, C]),
            c &&
              (g.trigger("ajaxComplete", [E, p]),
              --b.active || b.event.trigger("ajaxStop")));
        }
        return E;
      },
      getJSON: function (e, t, n) {
        return b.get(e, t, n, "json");
      },
      getScript: function (e, t) {
        return b.get(e, void 0, t, "script");
      },
    }),
    b.each(["get", "post"], function (e, t) {
      b[t] = function (e, n, r, i) {
        return (
          h(n) && ((i = i || r), (r = n), (n = void 0)),
          b.ajax(
            b.extend(
              { url: e, type: t, dataType: i, data: n, success: r },
              b.isPlainObject(e) && e
            )
          )
        );
      };
    }),
    b.ajaxPrefilter(function (e) {
      var t;
      for (t in e.headers)
        "content-type" === t.toLowerCase() &&
          (e.contentType = e.headers[t] || "");
    }),
    (b._evalUrl = function (e, t, n) {
      return b.ajax({
        url: e,
        type: "GET",
        dataType: "script",
        cache: !0,
        async: !1,
        global: !1,
        converters: { "text script": function () {} },
        dataFilter: function (e) {
          b.globalEval(e, t, n);
        },
      });
    }),
    b.fn.extend({
      wrapAll: function (e) {
        var t;
        return (
          this[0] &&
            (h(e) && (e = e.call(this[0])),
            (t = b(e, this[0].ownerDocument).eq(0).clone(!0)),
            this[0].parentNode && t.insertBefore(this[0]),
            t
              .map(function () {
                for (var e = this; e.firstElementChild; )
                  e = e.firstElementChild;
                return e;
              })
              .append(this)),
          this
        );
      },
      wrapInner: function (e) {
        return h(e)
          ? this.each(function (t) {
              b(this).wrapInner(e.call(this, t));
            })
          : this.each(function () {
              var t = b(this),
                n = t.contents();
              n.length ? n.wrapAll(e) : t.append(e);
            });
      },
      wrap: function (e) {
        var t = h(e);
        return this.each(function (n) {
          b(this).wrapAll(t ? e.call(this, n) : e);
        });
      },
      unwrap: function (e) {
        return (
          this.parent(e)
            .not("body")
            .each(function () {
              b(this).replaceWith(this.childNodes);
            }),
          this
        );
      },
    }),
    (b.expr.pseudos.hidden = function (e) {
      return !b.expr.pseudos.visible(e);
    }),
    (b.expr.pseudos.visible = function (e) {
      return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    }),
    (b.ajaxSettings.xhr = function () {
      try {
        return new e.XMLHttpRequest();
      } catch (e) {}
    });
  var Bt = { 0: 200, 1223: 204 },
    $t = b.ajaxSettings.xhr();
  (p.cors = !!$t && "withCredentials" in $t),
    (p.ajax = $t = !!$t),
    b.ajaxTransport(function (t) {
      var n, r;
      if (p.cors || ($t && !t.crossDomain))
        return {
          send: function (i, o) {
            var s,
              a = t.xhr();
            if (
              (a.open(t.type, t.url, t.async, t.username, t.password),
              t.xhrFields)
            )
              for (s in t.xhrFields) a[s] = t.xhrFields[s];
            for (s in (t.mimeType &&
              a.overrideMimeType &&
              a.overrideMimeType(t.mimeType),
            t.crossDomain ||
              i["X-Requested-With"] ||
              (i["X-Requested-With"] = "XMLHttpRequest"),
            i))
              a.setRequestHeader(s, i[s]);
            (n = function (e) {
              return function () {
                n &&
                  ((n =
                    r =
                    a.onload =
                    a.onerror =
                    a.onabort =
                    a.ontimeout =
                    a.onreadystatechange =
                      null),
                  "abort" === e
                    ? a.abort()
                    : "error" === e
                    ? "number" != typeof a.status
                      ? o(0, "error")
                      : o(a.status, a.statusText)
                    : o(
                        Bt[a.status] || a.status,
                        a.statusText,
                        "text" !== (a.responseType || "text") ||
                          "string" != typeof a.responseText
                          ? { binary: a.response }
                          : { text: a.responseText },
                        a.getAllResponseHeaders()
                      ));
              };
            }),
              (a.onload = n()),
              (r = a.onerror = a.ontimeout = n("error")),
              void 0 !== a.onabort
                ? (a.onabort = r)
                : (a.onreadystatechange = function () {
                    4 === a.readyState &&
                      e.setTimeout(function () {
                        n && r();
                      });
                  }),
              (n = n("abort"));
            try {
              a.send((t.hasContent && t.data) || null);
            } catch (e) {
              if (n) throw e;
            }
          },
          abort: function () {
            n && n();
          },
        };
    }),
    b.ajaxPrefilter(function (e) {
      e.crossDomain && (e.contents.script = !1);
    }),
    b.ajaxSetup({
      accepts: {
        script:
          "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
      },
      contents: { script: /\b(?:java|ecma)script\b/ },
      converters: {
        "text script": function (e) {
          return b.globalEval(e), e;
        },
      },
    }),
    b.ajaxPrefilter("script", function (e) {
      void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
    }),
    b.ajaxTransport("script", function (e) {
      var t, n;
      if (e.crossDomain || e.scriptAttrs)
        return {
          send: function (r, i) {
            (t = b("<script>")
              .attr(e.scriptAttrs || {})
              .prop({ charset: e.scriptCharset, src: e.url })
              .on(
                "load error",
                (n = function (e) {
                  t.remove(),
                    (n = null),
                    e && i("error" === e.type ? 404 : 200, e.type);
                })
              )),
              v.head.appendChild(t[0]);
          },
          abort: function () {
            n && n();
          },
        };
    });
  var Wt,
    Ft = [],
    Xt = /(=)\?(?=&|$)|\?\?/;
  b.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var e = Ft.pop() || b.expando + "_" + bt.guid++;
      return (this[e] = !0), e;
    },
  }),
    b.ajaxPrefilter("json jsonp", function (t, n, r) {
      var i,
        o,
        s,
        a =
          !1 !== t.jsonp &&
          (Xt.test(t.url)
            ? "url"
            : "string" == typeof t.data &&
              0 ===
                (t.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) &&
              Xt.test(t.data) &&
              "data");
      if (a || "jsonp" === t.dataTypes[0])
        return (
          (i = t.jsonpCallback =
            h(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
          a
            ? (t[a] = t[a].replace(Xt, "$1" + i))
            : !1 !== t.jsonp &&
              (t.url += (wt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i),
          (t.converters["script json"] = function () {
            return s || b.error(i + " was not called"), s[0];
          }),
          (t.dataTypes[0] = "json"),
          (o = e[i]),
          (e[i] = function () {
            s = arguments;
          }),
          r.always(function () {
            void 0 === o ? b(e).removeProp(i) : (e[i] = o),
              t[i] && ((t.jsonpCallback = n.jsonpCallback), Ft.push(i)),
              s && h(o) && o(s[0]),
              (s = o = void 0);
          }),
          "script"
        );
    }),
    (p.createHTMLDocument =
      (((Wt = v.implementation.createHTMLDocument("").body).innerHTML =
        "<form></form><form></form>"),
      2 === Wt.childNodes.length)),
    (b.parseHTML = function (e, t, n) {
      return "string" != typeof e
        ? []
        : ("boolean" == typeof t && ((n = t), (t = !1)),
          t ||
            (p.createHTMLDocument
              ? (((r = (t =
                  v.implementation.createHTMLDocument("")).createElement(
                  "base"
                )).href = v.location.href),
                t.head.appendChild(r))
              : (t = v)),
          (o = !n && []),
          (i = k.exec(e))
            ? [t.createElement(i[1])]
            : ((i = xe([e], t, o)),
              o && o.length && b(o).remove(),
              b.merge([], i.childNodes)));
      var r, i, o;
    }),
    (b.fn.load = function (e, t, n) {
      var r,
        i,
        o,
        s = this,
        a = e.indexOf(" ");
      return (
        a > -1 && ((r = pt(e.slice(a))), (e = e.slice(0, a))),
        h(t)
          ? ((n = t), (t = void 0))
          : t && "object" == typeof t && (i = "POST"),
        s.length > 0 &&
          b
            .ajax({ url: e, type: i || "GET", dataType: "html", data: t })
            .done(function (e) {
              (o = arguments),
                s.html(r ? b("<div>").append(b.parseHTML(e)).find(r) : e);
            })
            .always(
              n &&
                function (e, t) {
                  s.each(function () {
                    n.apply(this, o || [e.responseText, t, e]);
                  });
                }
            ),
        this
      );
    }),
    (b.expr.pseudos.animated = function (e) {
      return b.grep(b.timers, function (t) {
        return e === t.elem;
      }).length;
    }),
    (b.offset = {
      setOffset: function (e, t, n) {
        var r,
          i,
          o,
          s,
          a,
          l,
          u = b.css(e, "position"),
          c = b(e),
          f = {};
        "static" === u && (e.style.position = "relative"),
          (a = c.offset()),
          (o = b.css(e, "top")),
          (l = b.css(e, "left")),
          ("absolute" === u || "fixed" === u) && (o + l).indexOf("auto") > -1
            ? ((s = (r = c.position()).top), (i = r.left))
            : ((s = parseFloat(o) || 0), (i = parseFloat(l) || 0)),
          h(t) && (t = t.call(e, n, b.extend({}, a))),
          null != t.top && (f.top = t.top - a.top + s),
          null != t.left && (f.left = t.left - a.left + i),
          "using" in t ? t.using.call(e, f) : c.css(f);
      },
    }),
    b.fn.extend({
      offset: function (e) {
        if (arguments.length)
          return void 0 === e
            ? this
            : this.each(function (t) {
                b.offset.setOffset(this, e, t);
              });
        var t,
          n,
          r = this[0];
        return r
          ? r.getClientRects().length
            ? ((t = r.getBoundingClientRect()),
              (n = r.ownerDocument.defaultView),
              { top: t.top + n.pageYOffset, left: t.left + n.pageXOffset })
            : { top: 0, left: 0 }
          : void 0;
      },
      position: function () {
        if (this[0]) {
          var e,
            t,
            n,
            r = this[0],
            i = { top: 0, left: 0 };
          if ("fixed" === b.css(r, "position")) t = r.getBoundingClientRect();
          else {
            for (
              t = this.offset(),
                n = r.ownerDocument,
                e = r.offsetParent || n.documentElement;
              e &&
              (e === n.body || e === n.documentElement) &&
              "static" === b.css(e, "position");

            )
              e = e.parentNode;
            e &&
              e !== r &&
              1 === e.nodeType &&
              (((i = b(e).offset()).top += b.css(e, "borderTopWidth", !0)),
              (i.left += b.css(e, "borderLeftWidth", !0)));
          }
          return {
            top: t.top - i.top - b.css(r, "marginTop", !0),
            left: t.left - i.left - b.css(r, "marginLeft", !0),
          };
        }
      },
      offsetParent: function () {
        return this.map(function () {
          for (
            var e = this.offsetParent;
            e && "static" === b.css(e, "position");

          )
            e = e.offsetParent;
          return e || ne;
        });
      },
    }),
    b.each(
      { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
      function (e, t) {
        var n = "pageYOffset" === t;
        b.fn[e] = function (r) {
          return $(
            this,
            function (e, r, i) {
              var o;
              if (
                (g(e) ? (o = e) : 9 === e.nodeType && (o = e.defaultView),
                void 0 === i)
              )
                return o ? o[t] : e[r];
              o
                ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset)
                : (e[r] = i);
            },
            e,
            r,
            arguments.length
          );
        };
      }
    ),
    b.each(["top", "left"], function (e, t) {
      b.cssHooks[t] = $e(p.pixelPosition, function (e, n) {
        if (n)
          return (n = Be(e, t)), Oe.test(n) ? b(e).position()[t] + "px" : n;
      });
    }),
    b.each({ Height: "height", Width: "width" }, function (e, t) {
      b.each(
        { padding: "inner" + e, content: t, "": "outer" + e },
        function (n, r) {
          b.fn[r] = function (i, o) {
            var s = arguments.length && (n || "boolean" != typeof i),
              a = n || (!0 === i || !0 === o ? "margin" : "border");
            return $(
              this,
              function (t, n, i) {
                var o;
                return g(t)
                  ? 0 === r.indexOf("outer")
                    ? t["inner" + e]
                    : t.document.documentElement["client" + e]
                  : 9 === t.nodeType
                  ? ((o = t.documentElement),
                    Math.max(
                      t.body["scroll" + e],
                      o["scroll" + e],
                      t.body["offset" + e],
                      o["offset" + e],
                      o["client" + e]
                    ))
                  : void 0 === i
                  ? b.css(t, n, a)
                  : b.style(t, n, i, a);
              },
              t,
              s ? i : void 0,
              s
            );
          };
        }
      );
    }),
    b.each(
      [
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend",
      ],
      function (e, t) {
        b.fn[t] = function (e) {
          return this.on(t, e);
        };
      }
    ),
    b.fn.extend({
      bind: function (e, t, n) {
        return this.on(e, null, t, n);
      },
      unbind: function (e, t) {
        return this.off(e, null, t);
      },
      delegate: function (e, t, n, r) {
        return this.on(t, e, n, r);
      },
      undelegate: function (e, t, n) {
        return 1 === arguments.length
          ? this.off(e, "**")
          : this.off(t, e || "**", n);
      },
      hover: function (e, t) {
        return this.mouseenter(e).mouseleave(t || e);
      },
    }),
    b.each(
      "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
        " "
      ),
      function (e, t) {
        b.fn[t] = function (e, n) {
          return arguments.length > 0
            ? this.on(t, null, e, n)
            : this.trigger(t);
        };
      }
    );
  var zt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  (b.proxy = function (e, t) {
    var n, r, o;
    if (("string" == typeof t && ((n = e[t]), (t = e), (e = n)), h(e)))
      return (
        (r = i.call(arguments, 2)),
        ((o = function () {
          return e.apply(t || this, r.concat(i.call(arguments)));
        }).guid = e.guid =
          e.guid || b.guid++),
        o
      );
  }),
    (b.holdReady = function (e) {
      e ? b.readyWait++ : b.ready(!0);
    }),
    (b.isArray = Array.isArray),
    (b.parseJSON = JSON.parse),
    (b.nodeName = A),
    (b.isFunction = h),
    (b.isWindow = g),
    (b.camelCase = z),
    (b.type = x),
    (b.now = Date.now),
    (b.isNumeric = function (e) {
      var t = b.type(e);
      return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
    }),
    (b.trim = function (e) {
      return null == e ? "" : (e + "").replace(zt, "");
    }),
    "function" == typeof define &&
      define.amd &&
      define("jquery", [], function () {
        return b;
      });
  var Ut = e.jQuery,
    Vt = e.$;
  return (
    (b.noConflict = function (t) {
      return e.$ === b && (e.$ = Vt), t && e.jQuery === b && (e.jQuery = Ut), b;
    }),
    void 0 === t && (e.jQuery = e.$ = b),
    b
  );
});

  const scrollArrow = document.querySelector(".scroll-arrow");
  if (scrollArrow) {
    window.addEventListener("scroll", function () {
      pageYOffset > 450
        ? scrollArrow.classList.add("scroll-arrow_active")
        : pageYOffset < 450 && scrollArrow.classList.remove("scroll-arrow_active");
    });
    scrollArrow.addEventListener("click", () => {
      window.scrollTo(0, 0);
    });
  }
  
  /*const menuBtn = document.querySelector(".menu__btn"),
  menu = document.querySelector(".menu");
  function closeMenu() {
    menu.classList.remove("menu_active"),
      menuBtn.classList.remove("menu__btn_active"),
      document.body.classList.remove("body_remove-scroll");
  }
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("menu_active"),
      menuBtn.classList.toggle("menu__btn_active"),
      document.body.classList.toggle("body_remove-scroll");
  }),
    document.querySelectorAll(".menu__link").forEach((e) => {
      e.addEventListener("click", () => closeMenu());
    });*/
  
  
  const sliderWrapper = document.querySelector(".slider__wrapper"),
    sliderInner = document.querySelector(".slider__inner"),
    sliderItems = document.querySelectorAll(".slider__item"),
    sliderArrowNext = document.querySelector(".slider__arrow_next"),
    sliderArrowPrev = document.querySelector(".slider__arrow_prev"),
    sliderNavBtns = document.querySelectorAll(".slider__nav-btn");
  let slideIndex = 1,
    offset = 0;
  function slideMoveNext() {
    removeBtnClass(),
      slideIndex == sliderItems.length
        ? ((offset = 0), (slideIndex = 1))
        : ((offset += 100 / sliderItems.length), slideIndex++),
      addBtnClass(slideIndex - 1),
      (sliderInner.style.transform = `translateX(-${offset}%)`);
  }
  function slideMovePrev() {
    removeBtnClass(),
      1 == slideIndex
        ? ((offset = (100 / sliderItems.length) * (sliderItems.length - 1)),
          (slideIndex = sliderItems.length))
        : ((offset -= 100 / sliderItems.length), slideIndex--),
      addBtnClass(slideIndex - 1),
      (sliderInner.style.transform = `translateX(-${offset}%)`);
  }
  if (sliderInner) {
    sliderInner.style.cssText = `display: flex; width: ${100 * sliderItems.length}%;`;
  }
  if (sliderWrapper) {
    sliderWrapper.style.overflow = "hidden";
  }
  let slideTimer = setInterval(slideMoveNext, 1e4);
  function removeBtnClass() {
    sliderNavBtns.forEach((e) => e.classList.remove("slider__nav-btn_active"));
  }
  function addBtnClass(e = 0) {
    sliderNavBtns[e].classList.add("slider__nav-btn_active"),
      clearInterval(slideTimer),
      (slideTimer = setInterval(slideMoveNext, 1e4));
  }
  if (sliderInner) {
    sliderArrowNext.addEventListener("click", () => {
      slideMoveNext();
    }),
      sliderArrowPrev.addEventListener("click", () => {
        slideMovePrev();
      }),
      sliderNavBtns.forEach((e, t) => {
        e.addEventListener("click", () => {
          removeBtnClass(),
            (offset = (100 / sliderItems.length) * t),
            (slideIndex = t + 1),
            (sliderInner.style.transform = `translateX(-${offset}%)`),
            addBtnClass(t);
        });
      });
  }
  let x1 = null,
    y1 = null;
  function handleTouchStart(e) {
    (x1 = e.touches[0].clientX), (y1 = e.touches[0].clientY);
  }
  function handleTouchMove(e) {
    if (!x1 || !y1) return !1;
    let t = e.touches[0].clientX,
      n = e.touches[0].clientY,
      r = t - x1,
      i = n - y1;
    return (
      (x1 = null),
      (y1 = null),
      Math.abs(r) > Math.abs(i) ? (r > 0 ? "prev" : "next") : void 0
    );
  }
  if (sliderInner) {
    sliderInner.addEventListener("touchstart", handleTouchStart);
  }
    if (sliderInner) {
      sliderInner.addEventListener("touchmove", (e) => {
        let t = handleTouchMove(e);
        "prev" === t ? slideMovePrev() : "next" === t && slideMoveNext();
      });
    }

