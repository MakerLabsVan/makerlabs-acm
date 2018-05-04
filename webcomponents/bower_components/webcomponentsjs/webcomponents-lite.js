/**
@license @nocompile
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
;(function() {
  /*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
  'use strict'
  var p,
    q =
      'undefined' != typeof window && window === this
        ? this
        : 'undefined' != typeof global && null != global
          ? global
          : this,
    da =
      'function' == typeof Object.defineProperties
        ? Object.defineProperty
        : function(a, b, c) {
            a != Array.prototype && a != Object.prototype && (a[b] = c.value)
          }
  function ea() {
    ea = function() {}
    q.Symbol || (q.Symbol = fa)
  }
  var fa = (function() {
    var a = 0
    return function(b) {
      return 'jscomp_symbol_' + (b || '') + a++
    }
  })()
  function ha() {
    ea()
    var a = q.Symbol.iterator
    a || (a = q.Symbol.iterator = q.Symbol('iterator'))
    'function' != typeof Array.prototype[a] &&
      da(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function() {
          return ia(this)
        }
      })
    ha = function() {}
  }
  function ia(a) {
    var b = 0
    return la(function() {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 }
    })
  }
  function la(a) {
    ha()
    a = { next: a }
    a[q.Symbol.iterator] = function() {
      return this
    }
    return a
  }
  function ma(a) {
    ha()
    var b = a[Symbol.iterator]
    return b ? b.call(a) : ia(a)
  }
  function na(a) {
    for (var b, c = []; !(b = a.next()).done; ) c.push(b.value)
    return c
  }
  ;(function() {
    if (
      !(function() {
        var a = document.createEvent('Event')
        a.initEvent('foo', !0, !0)
        a.preventDefault()
        return a.defaultPrevented
      })()
    ) {
      var a = Event.prototype.preventDefault
      Event.prototype.preventDefault = function() {
        this.cancelable &&
          (a.call(this),
          Object.defineProperty(this, 'defaultPrevented', {
            get: function() {
              return !0
            },
            configurable: !0
          }))
      }
    }
    var b = /Trident/.test(navigator.userAgent)
    if (!window.CustomEvent || (b && 'function' !== typeof window.CustomEvent))
      (window.CustomEvent = function(a, b) {
        b = b || {}
        var c = document.createEvent('CustomEvent')
        c.initCustomEvent(a, !!b.bubbles, !!b.cancelable, b.detail)
        return c
      }),
        (window.CustomEvent.prototype = window.Event.prototype)
    if (!window.Event || (b && 'function' !== typeof window.Event)) {
      var c = window.Event
      window.Event = function(a, b) {
        b = b || {}
        var c = document.createEvent('Event')
        c.initEvent(a, !!b.bubbles, !!b.cancelable)
        return c
      }
      if (c) for (var d in c) window.Event[d] = c[d]
      window.Event.prototype = c.prototype
    }
    if (!window.MouseEvent || (b && 'function' !== typeof window.MouseEvent)) {
      b = window.MouseEvent
      window.MouseEvent = function(a, b) {
        b = b || {}
        var c = document.createEvent('MouseEvent')
        c.initMouseEvent(
          a,
          !!b.bubbles,
          !!b.cancelable,
          b.view || window,
          b.detail,
          b.screenX,
          b.screenY,
          b.clientX,
          b.clientY,
          b.ctrlKey,
          b.altKey,
          b.shiftKey,
          b.metaKey,
          b.button,
          b.relatedTarget
        )
        return c
      }
      if (b) for (d in b) window.MouseEvent[d] = b[d]
      window.MouseEvent.prototype = b.prototype
    }
    Array.from ||
      (Array.from = function(a) {
        return [].slice.call(a)
      })
    Object.assign ||
      (Object.assign = function(a, b) {
        for (var c = [].slice.call(arguments, 1), d = 0, e; d < c.length; d++)
          if ((e = c[d]))
            for (
              var f = a, m = e, n = Object.getOwnPropertyNames(m), t = 0;
              t < n.length;
              t++
            )
              (e = n[t]), (f[e] = m[e])
        return a
      })
  })(window.WebComponents)
  ;(function() {
    function a() {}
    function b(a, b) {
      if (!a.childNodes.length) return []
      switch (a.nodeType) {
        case Node.DOCUMENT_NODE:
          return t.call(a, b)
        case Node.DOCUMENT_FRAGMENT_NODE:
          return C.call(a, b)
        default:
          return n.call(a, b)
      }
    }
    var c = 'undefined' === typeof HTMLTemplateElement,
      d = !(
        document.createDocumentFragment().cloneNode() instanceof
        DocumentFragment
      ),
      e = !1
    ;/Trident/.test(navigator.userAgent) &&
      (function() {
        function a(a, b) {
          if (a instanceof DocumentFragment)
            for (var d; (d = a.firstChild); ) c.call(this, d, b)
          else c.call(this, a, b)
          return a
        }
        e = !0
        var b = Node.prototype.cloneNode
        Node.prototype.cloneNode = function(a) {
          a = b.call(this, a)
          this instanceof DocumentFragment &&
            (a.__proto__ = DocumentFragment.prototype)
          return a
        }
        DocumentFragment.prototype.querySelectorAll =
          HTMLElement.prototype.querySelectorAll
        DocumentFragment.prototype.querySelector =
          HTMLElement.prototype.querySelector
        Object.defineProperties(DocumentFragment.prototype, {
          nodeType: {
            get: function() {
              return Node.DOCUMENT_FRAGMENT_NODE
            },
            configurable: !0
          },
          localName: {
            get: function() {},
            configurable: !0
          },
          nodeName: {
            get: function() {
              return '#document-fragment'
            },
            configurable: !0
          }
        })
        var c = Node.prototype.insertBefore
        Node.prototype.insertBefore = a
        var d = Node.prototype.appendChild
        Node.prototype.appendChild = function(b) {
          b instanceof DocumentFragment
            ? a.call(this, b, null)
            : d.call(this, b)
          return b
        }
        var f = Node.prototype.removeChild,
          h = Node.prototype.replaceChild
        Node.prototype.replaceChild = function(b, c) {
          b instanceof DocumentFragment
            ? (a.call(this, b, c), f.call(this, c))
            : h.call(this, b, c)
          return c
        }
        Document.prototype.createDocumentFragment = function() {
          var a = this.createElement('df')
          a.__proto__ = DocumentFragment.prototype
          return a
        }
        var g = Document.prototype.importNode
        Document.prototype.importNode = function(a, b) {
          b = g.call(this, a, b || !1)
          a instanceof DocumentFragment &&
            (b.__proto__ = DocumentFragment.prototype)
          return b
        }
      })()
    var f = Node.prototype.cloneNode,
      h = Document.prototype.createElement,
      g = Document.prototype.importNode,
      k = Node.prototype.removeChild,
      l = Node.prototype.appendChild,
      m = Node.prototype.replaceChild,
      n = Element.prototype.querySelectorAll,
      t = Document.prototype.querySelectorAll,
      C = DocumentFragment.prototype.querySelectorAll,
      aa = (function() {
        if (!c) {
          var a = document.createElement('template'),
            b = document.createElement('template')
          b.content.appendChild(document.createElement('div'))
          a.content.appendChild(b)
          a = a.cloneNode(!0)
          return (
            0 === a.content.childNodes.length ||
            0 === a.content.firstChild.content.childNodes.length ||
            d
          )
        }
      })()
    if (c) {
      var P = document.implementation.createHTMLDocument('template'),
        Ka = !0,
        ba = document.createElement('style')
      ba.textContent = 'template{display:none;}'
      var La = document.head
      La.insertBefore(ba, La.firstElementChild)
      a.prototype = Object.create(HTMLElement.prototype)
      var D = !document.createElement('div').hasOwnProperty('innerHTML')
      a.H = function(b) {
        if (
          !b.content &&
          b.namespaceURI === document.documentElement.namespaceURI
        ) {
          b.content = P.createDocumentFragment()
          for (var c; (c = b.firstChild); ) l.call(b.content, c)
          if (D) b.__proto__ = a.prototype
          else if (
            ((b.cloneNode = function(b) {
              return a.ha(this, b)
            }),
            Ka)
          )
            try {
              va(b), ja(b)
            } catch (rh) {
              Ka = !1
            }
          a.M(b.content)
        }
      }
      var va = function(b) {
          Object.defineProperty(b, 'innerHTML', {
            get: function() {
              return nb(this)
            },
            set: function(b) {
              P.body.innerHTML = b
              for (a.M(P); this.content.firstChild; )
                k.call(this.content, this.content.firstChild)
              for (; P.body.firstChild; )
                l.call(this.content, P.body.firstChild)
            },
            configurable: !0
          })
        },
        ja = function(a) {
          Object.defineProperty(a, 'outerHTML', {
            get: function() {
              return '<template>' + this.innerHTML + '</template>'
            },
            set: function(a) {
              if (this.parentNode) {
                P.body.innerHTML = a
                for (
                  a = this.ownerDocument.createDocumentFragment();
                  P.body.firstChild;

                )
                  l.call(a, P.body.firstChild)
                m.call(this.parentNode, a, this)
              } else
                throw Error(
                  "Failed to set the 'outerHTML' property on 'Element': This element has no parent node."
                )
            },
            configurable: !0
          })
        }
      va(a.prototype)
      ja(a.prototype)
      a.M = function(c) {
        c = b(c, 'template')
        for (var d = 0, e = c.length, f; d < e && (f = c[d]); d++) a.H(f)
      }
      document.addEventListener('DOMContentLoaded', function() {
        a.M(document)
      })
      Document.prototype.createElement = function() {
        var b = h.apply(this, arguments)
        'template' === b.localName && a.H(b)
        return b
      }
      var wa = /[&\u00A0"]/g,
        ca = /[&\u00A0<>]/g,
        ka = function(a) {
          switch (a) {
            case '&':
              return '&amp;'
            case '<':
              return '&lt;'
            case '>':
              return '&gt;'
            case '"':
              return '&quot;'
            case '\u00a0':
              return '&nbsp;'
          }
        }
      ba = function(a) {
        for (var b = {}, c = 0; c < a.length; c++) b[a[c]] = !0
        return b
      }
      var hf = ba(
          'area base br col command embed hr img input keygen link meta param source track wbr'.split(
            ' '
          )
        ),
        xa = ba(
          'style script xmp iframe noembed noframes plaintext noscript'.split(
            ' '
          )
        ),
        nb = function(a, b) {
          'template' === a.localName && (a = a.content)
          for (
            var c = '', d = b ? b(a) : a.childNodes, e = 0, f = d.length, h;
            e < f && (h = d[e]);
            e++
          ) {
            a: {
              var g = h
              var k = a
              var l = b
              switch (g.nodeType) {
                case Node.ELEMENT_NODE:
                  for (
                    var m = g.localName, n = '<' + m, ya = g.attributes, Ma = 0;
                    (k = ya[Ma]);
                    Ma++
                  )
                    n += ' ' + k.name + '="' + k.value.replace(wa, ka) + '"'
                  n += '>'
                  g = hf[m] ? n : n + nb(g, l) + '</' + m + '>'
                  break a
                case Node.TEXT_NODE:
                  g = g.data
                  g = k && xa[k.localName] ? g : g.replace(ca, ka)
                  break a
                case Node.COMMENT_NODE:
                  g = '\x3c!--' + g.data + '--\x3e'
                  break a
                default:
                  throw (window.console.error(g), Error('not implemented'))
              }
            }
            c += g
          }
          return c
        }
    }
    if (c || aa) {
      a.ha = function(a, b) {
        var c = f.call(a, !1)
        this.H && this.H(c)
        b &&
          (l.call(c.content, f.call(a.content, !0)), ya(c.content, a.content))
        return c
      }
      var ya = function(c, d) {
          if (d.querySelectorAll && ((d = b(d, 'template')), 0 !== d.length)) {
            c = b(c, 'template')
            for (var e = 0, f = c.length, h, g; e < f; e++)
              (g = d[e]),
                (h = c[e]),
                a && a.H && a.H(g),
                m.call(h.parentNode, Ma.call(g, !0), h)
          }
        },
        Ma = (Node.prototype.cloneNode = function(b) {
          if (!e && d && this instanceof DocumentFragment)
            if (b) var c = jf.call(this.ownerDocument, this, !0)
            else return this.ownerDocument.createDocumentFragment()
          else
            c =
              this.nodeType === Node.ELEMENT_NODE &&
              'template' === this.localName &&
              this.namespaceURI == document.documentElement.namespaceURI
                ? a.ha(this, b)
                : f.call(this, b)
          b && ya(c, this)
          return c
        }),
        jf = (Document.prototype.importNode = function(c, d) {
          d = d || !1
          if ('template' === c.localName) return a.ha(c, d)
          var e = g.call(this, c, d)
          if (d) {
            ya(e, c)
            c = b(
              e,
              'script:not([type]),script[type="application/javascript"],script[type="text/javascript"]'
            )
            for (var f, k = 0; k < c.length; k++) {
              f = c[k]
              d = h.call(document, 'script')
              d.textContent = f.textContent
              for (var l = f.attributes, ka = 0, xa; ka < l.length; ka++)
                (xa = l[ka]), d.setAttribute(xa.name, xa.value)
              m.call(f.parentNode, d, f)
            }
          }
          return e
        })
    }
    c && (window.HTMLTemplateElement = a)
  })()
  var oa = Array.isArray
    ? Array.isArray
    : function(a) {
        return '[object Array]' === Object.prototype.toString.call(a)
      }
  var pa = 0,
    qa,
    ra = 'undefined' !== typeof window ? window : void 0,
    sa = ra || {},
    ta = sa.MutationObserver || sa.WebKitMutationObserver,
    ua =
      'undefined' !== typeof Uint8ClampedArray &&
      'undefined' !== typeof importScripts &&
      'undefined' !== typeof MessageChannel
  function za() {
    return 'undefined' !== typeof qa
      ? function() {
          qa(Aa)
        }
      : Ba()
  }
  function Ca() {
    var a = 0,
      b = new ta(Aa),
      c = document.createTextNode('')
    b.observe(c, { characterData: !0 })
    return function() {
      c.data = a = ++a % 2
    }
  }
  function Da() {
    var a = new MessageChannel()
    a.port1.onmessage = Aa
    return function() {
      return a.port2.postMessage(0)
    }
  }
  function Ba() {
    var a = setTimeout
    return function() {
      return a(Aa, 1)
    }
  }
  var Ea = Array(1e3)
  function Aa() {
    for (var a = 0; a < pa; a += 2)
      (0, Ea[a])(Ea[a + 1]), (Ea[a] = void 0), (Ea[a + 1] = void 0)
    pa = 0
  }
  var Fa, Ga
  if (
    'undefined' === typeof self &&
    'undefined' !== typeof process &&
    '[object process]' === {}.toString.call(process)
  )
    Ga = function() {
      return process.ub(Aa)
    }
  else {
    var Ha
    if (ta) Ha = Ca()
    else {
      var Ia
      if (ua) Ia = Da()
      else {
        var Ja
        if (void 0 === ra && 'function' === typeof require)
          try {
            var Na = require('vertx')
            qa = Na.wb || Na.vb
            Ja = za()
          } catch (a) {
            Ja = Ba()
          }
        else Ja = Ba()
        Ia = Ja
      }
      Ha = Ia
    }
    Ga = Ha
  }
  Fa = Ga
  function Oa(a, b) {
    Ea[pa] = a
    Ea[pa + 1] = b
    pa += 2
    2 === pa && Fa()
  }
  function Pa(a, b) {
    var c = this,
      d = new this.constructor(Qa)
    void 0 === d[Ra] && Sa(d)
    var e = c.h
    if (e) {
      var f = arguments[e - 1]
      Oa(function() {
        return Ta(e, d, f, c.f)
      })
    } else Ua(c, d, a, b)
    return d
  }
  function Va(a) {
    if (a && 'object' === typeof a && a.constructor === this) return a
    var b = new this(Qa)
    Wa(b, a)
    return b
  }
  var Ra = Math.random()
    .toString(36)
    .substring(16)
  function Qa() {}
  var Ya = new Xa()
  function Za(a) {
    try {
      return a.then
    } catch (b) {
      return (Ya.error = b), Ya
    }
  }
  function $a(a, b, c, d) {
    try {
      a.call(b, c, d)
    } catch (e) {
      return e
    }
  }
  function ab(a, b, c) {
    Oa(function(a) {
      var d = !1,
        f = $a(
          c,
          b,
          function(c) {
            d || ((d = !0), b !== c ? Wa(a, c) : r(a, c))
          },
          function(b) {
            d || ((d = !0), u(a, b))
          }
        )
      !d && f && ((d = !0), u(a, f))
    }, a)
  }
  function bb(a, b) {
    1 === b.h
      ? r(a, b.f)
      : 2 === b.h
        ? u(a, b.f)
        : Ua(
            b,
            void 0,
            function(b) {
              return Wa(a, b)
            },
            function(b) {
              return u(a, b)
            }
          )
  }
  function cb(a, b, c) {
    b.constructor === a.constructor && c === Pa && b.constructor.resolve === Va
      ? bb(a, b)
      : c === Ya
        ? (u(a, Ya.error), (Ya.error = null))
        : void 0 === c
          ? r(a, b)
          : 'function' === typeof c
            ? ab(a, b, c)
            : r(a, b)
  }
  function Wa(a, b) {
    if (a === b) u(a, new TypeError('You cannot resolve a promise with itself'))
    else {
      var c = typeof b
      null === b || ('object' !== c && 'function' !== c)
        ? r(a, b)
        : cb(a, b, Za(b))
    }
  }
  function db(a) {
    a.ra && a.ra(a.f)
    eb(a)
  }
  function r(a, b) {
    void 0 === a.h && ((a.f = b), (a.h = 1), 0 !== a.L.length && Oa(eb, a))
  }
  function u(a, b) {
    void 0 === a.h && ((a.h = 2), (a.f = b), Oa(db, a))
  }
  function Ua(a, b, c, d) {
    var e = a.L,
      f = e.length
    a.ra = null
    e[f] = b
    e[f + 1] = c
    e[f + 2] = d
    0 === f && a.h && Oa(eb, a)
  }
  function eb(a) {
    var b = a.L,
      c = a.h
    if (0 !== b.length) {
      for (var d, e, f = a.f, h = 0; h < b.length; h += 3)
        (d = b[h]), (e = b[h + c]), d ? Ta(c, d, e, f) : e(f)
      a.L.length = 0
    }
  }
  function Xa() {
    this.error = null
  }
  var fb = new Xa()
  function Ta(a, b, c, d) {
    var e = 'function' === typeof c
    if (e) {
      try {
        var f = c(d)
      } catch (l) {
        ;(fb.error = l), (f = fb)
      }
      if (f === fb) {
        var h = !0
        var g = f.error
        f.error = null
      } else var k = !0
      if (b === f) {
        u(
          b,
          new TypeError('A promises callback cannot return that same promise.')
        )
        return
      }
    } else (f = d), (k = !0)
    void 0 === b.h &&
      (e && k ? Wa(b, f) : h ? u(b, g) : 1 === a ? r(b, f) : 2 === a && u(b, f))
  }
  function gb(a, b) {
    try {
      b(
        function(b) {
          Wa(a, b)
        },
        function(b) {
          u(a, b)
        }
      )
    } catch (c) {
      u(a, c)
    }
  }
  var hb = 0
  function Sa(a) {
    a[Ra] = hb++
    a.h = void 0
    a.f = void 0
    a.L = []
  }
  function ib(a, b) {
    this.Ia = a
    this.D = new a(Qa)
    this.D[Ra] || Sa(this.D)
    if (oa(b))
      if (
        ((this.U = this.length = b.length),
        (this.f = Array(this.length)),
        0 === this.length)
      )
        r(this.D, this.f)
      else {
        this.length = this.length || 0
        for (a = 0; void 0 === this.h && a < b.length; a++) jb(this, b[a], a)
        0 === this.U && r(this.D, this.f)
      }
    else u(this.D, Error('Array Methods must be provided an Array'))
  }
  function jb(a, b, c) {
    var d = a.Ia,
      e = d.resolve
    e === Va
      ? ((e = Za(b)),
        e === Pa && void 0 !== b.h
          ? kb(a, b.h, c, b.f)
          : 'function' !== typeof e
            ? (a.U--, (a.f[c] = b))
            : d === v
              ? ((d = new d(Qa)), cb(d, b, e), lb(a, d, c))
              : lb(
                  a,
                  new d(function(a) {
                    return a(b)
                  }),
                  c
                ))
      : lb(a, e(b), c)
  }
  function kb(a, b, c, d) {
    var e = a.D
    void 0 === e.h && (a.U--, 2 === b ? u(e, d) : (a.f[c] = d))
    0 === a.U && r(e, a.f)
  }
  function lb(a, b, c) {
    Ua(
      b,
      void 0,
      function(b) {
        return kb(a, 1, c, b)
      },
      function(b) {
        return kb(a, 2, c, b)
      }
    )
  }
  function mb(a) {
    return new ib(this, a).D
  }
  function ob(a) {
    var b = this
    return oa(a)
      ? new b(function(c, d) {
          for (var e = a.length, f = 0; f < e; f++) b.resolve(a[f]).then(c, d)
        })
      : new b(function(a, b) {
          return b(new TypeError('You must pass an array to race.'))
        })
  }
  function pb(a) {
    var b = new this(Qa)
    u(b, a)
    return b
  }
  function v(a) {
    this[Ra] = hb++
    this.f = this.h = void 0
    this.L = []
    if (Qa !== a) {
      if ('function' !== typeof a)
        throw new TypeError(
          'You must pass a resolver function as the first argument to the promise constructor'
        )
      if (this instanceof v) gb(this, a)
      else
        throw new TypeError(
          "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
        )
    }
  }
  v.prototype = {
    constructor: v,
    then: Pa,
    a: function(a) {
      return this.then(null, a)
    }
  } /*

Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
  window.Promise ||
    ((window.Promise = v),
    (v.prototype['catch'] = v.prototype.a),
    (v.prototype.then = v.prototype.then),
    (v.all = mb),
    (v.race = ob),
    (v.resolve = Va),
    (v.reject = pb))
  ;(function(a) {
    function b(a, b) {
      if ('function' === typeof window.CustomEvent) return new CustomEvent(a, b)
      var c = document.createEvent('CustomEvent')
      c.initCustomEvent(a, !!b.bubbles, !!b.cancelable, b.detail)
      return c
    }
    function c(a) {
      if (C) return a.ownerDocument !== document ? a.ownerDocument : null
      var b = a.__importDoc
      if (!b && a.parentNode) {
        b = a.parentNode
        if ('function' === typeof b.closest) b = b.closest('link[rel=import]')
        else for (; !g(b) && (b = b.parentNode); );
        a.__importDoc = b
      }
      return b
    }
    function d(a) {
      var b = m(document, 'link[rel=import]:not([import-dependency])'),
        c = b.length
      c
        ? n(b, function(b) {
            return h(b, function() {
              0 === --c && a()
            })
          })
        : a()
    }
    function e(a) {
      function b() {
        'loading' !== document.readyState &&
          document.body &&
          (document.removeEventListener('readystatechange', b), a())
      }
      document.addEventListener('readystatechange', b)
      b()
    }
    function f(a) {
      e(function() {
        return d(function() {
          return a && a()
        })
      })
    }
    function h(a, b) {
      if (a.__loaded) b && b()
      else if (
        ('script' === a.localName && !a.src) ||
        ('style' === a.localName && !a.firstChild)
      )
        (a.__loaded = !0), b && b()
      else {
        var c = function(d) {
          a.removeEventListener(d.type, c)
          a.__loaded = !0
          b && b()
        }
        a.addEventListener('load', c)
        ;(ja && 'style' === a.localName) || a.addEventListener('error', c)
      }
    }
    function g(a) {
      return (
        a.nodeType === Node.ELEMENT_NODE &&
        'link' === a.localName &&
        'import' === a.rel
      )
    }
    function k() {
      var a = this
      this.a = {}
      this.b = 0
      this.c = new MutationObserver(function(b) {
        return a.Va(b)
      })
      this.c.observe(document.head, { childList: !0, subtree: !0 })
      this.loadImports(document)
    }
    function l(a) {
      n(m(a, 'template'), function(a) {
        n(
          m(
            a.content,
            'script:not([type]),script[type="application/javascript"],script[type="text/javascript"]'
          ),
          function(a) {
            var b = document.createElement('script')
            n(a.attributes, function(a) {
              return b.setAttribute(a.name, a.value)
            })
            b.textContent = a.textContent
            a.parentNode.replaceChild(b, a)
          }
        )
        l(a.content)
      })
    }
    function m(a, b) {
      return a.childNodes.length ? a.querySelectorAll(b) : aa
    }
    function n(a, b, c) {
      var d = a ? a.length : 0,
        e = c ? -1 : 1
      for (c = c ? d - 1 : 0; c < d && 0 <= c; c += e) b(a[c], c)
    }
    var t = document.createElement('link'),
      C = 'import' in t,
      aa = t.querySelectorAll('*'),
      P = null
    !1 === 'currentScript' in document &&
      Object.defineProperty(document, 'currentScript', {
        get: function() {
          return (
            P ||
            ('complete' !== document.readyState
              ? document.scripts[document.scripts.length - 1]
              : null)
          )
        },
        configurable: !0
      })
    var Ka = /(url\()([^)]*)(\))/g,
      ba = /(@import[\s]+(?!url\())([^;]*)(;)/g,
      La = /(<link[^>]*)(rel=['|"]?stylesheet['|"]?[^>]*>)/g,
      D = {
        Pa: function(a, b) {
          a.href && a.setAttribute('href', D.aa(a.getAttribute('href'), b))
          a.src && a.setAttribute('src', D.aa(a.getAttribute('src'), b))
          if ('style' === a.localName) {
            var c = D.ya(a.textContent, b, Ka)
            a.textContent = D.ya(c, b, ba)
          }
        },
        ya: function(a, b, c) {
          return a.replace(c, function(a, c, d, e) {
            a = d.replace(/["']/g, '')
            b && (a = D.aa(a, b))
            return c + "'" + a + "'" + e
          })
        },
        aa: function(a, b) {
          if (void 0 === D.ga) {
            D.ga = !1
            try {
              var c = new URL('b', 'http://a')
              c.pathname = 'c%20d'
              D.ga = 'http://a/c%20d' === c.href
            } catch (nb) {}
          }
          if (D.ga) return new URL(a, b).href
          c = D.Fa
          c ||
            ((c = document.implementation.createHTMLDocument('temp')),
            (D.Fa = c),
            (c.pa = c.createElement('base')),
            c.head.appendChild(c.pa),
            (c.oa = c.createElement('a')))
          c.pa.href = b
          c.oa.href = a
          return c.oa.href || a
        }
      },
      va = {
        async: !0,
        load: function(a, b, c) {
          if (a)
            if (a.match(/^data:/)) {
              a = a.split(',')
              var d = a[1]
              d = -1 < a[0].indexOf(';base64') ? atob(d) : decodeURIComponent(d)
              b(d)
            } else {
              var e = new XMLHttpRequest()
              e.open('GET', a, va.async)
              e.onload = function() {
                var a = e.responseURL || e.getResponseHeader('Location')
                a &&
                  0 === a.indexOf('/') &&
                  (a =
                    (location.origin ||
                      location.protocol + '//' + location.host) + a)
                var d = e.response || e.responseText
                304 === e.status ||
                0 === e.status ||
                (200 <= e.status && 300 > e.status)
                  ? b(d, a)
                  : c(d)
              }
              e.send()
            }
          else c('error: href must be specified')
        }
      },
      ja =
        /Trident/.test(navigator.userAgent) ||
        /Edge\/\d./i.test(navigator.userAgent)
    k.prototype.loadImports = function(a) {
      var b = this
      a = m(a, 'link[rel=import]')
      n(a, function(a) {
        return b.s(a)
      })
    }
    k.prototype.s = function(a) {
      var b = this,
        c = a.href
      if (void 0 !== this.a[c]) {
        var d = this.a[c]
        d && d.__loaded && ((a.__import = d), this.i(a))
      } else
        this.b++,
          (this.a[c] = 'pending'),
          va.load(
            c,
            function(a, d) {
              a = b.Wa(a, d || c)
              b.a[c] = a
              b.b--
              b.loadImports(a)
              b.N()
            },
            function() {
              b.a[c] = null
              b.b--
              b.N()
            }
          )
    }
    k.prototype.Wa = function(a, b) {
      if (!a) return document.createDocumentFragment()
      ja &&
        (a = a.replace(La, function(a, b, c) {
          return -1 === a.indexOf('type=') ? b + ' type=import-disable ' + c : a
        }))
      var c = document.createElement('template')
      c.innerHTML = a
      if (c.content) (a = c.content), l(a)
      else
        for (a = document.createDocumentFragment(); c.firstChild; )
          a.appendChild(c.firstChild)
      if ((c = a.querySelector('base')))
        (b = D.aa(c.getAttribute('href'), b)), c.removeAttribute('href')
      c = m(
        a,
        'link[rel=import],link[rel=stylesheet][href][type=import-disable],style:not([type]),link[rel=stylesheet][href]:not([type]),script:not([type]),script[type="application/javascript"],script[type="text/javascript"]'
      )
      var d = 0
      n(c, function(a) {
        h(a)
        D.Pa(a, b)
        a.setAttribute('import-dependency', '')
        'script' === a.localName &&
          !a.src &&
          a.textContent &&
          (a.setAttribute(
            'src',
            'data:text/javascript;charset=utf-8,' +
              encodeURIComponent(
                a.textContent +
                  ('\n//# sourceURL=' + b + (d ? '-' + d : '') + '.js\n')
              )
          ),
          (a.textContent = ''),
          d++)
      })
      return a
    }
    k.prototype.N = function() {
      var a = this
      if (!this.b) {
        this.c.disconnect()
        this.flatten(document)
        var b = !1,
          c = !1,
          d = function() {
            c &&
              b &&
              (a.loadImports(document),
              a.b ||
                (a.c.observe(document.head, { childList: !0, subtree: !0 }),
                a.Ta()))
          }
        this.Ya(function() {
          c = !0
          d()
        })
        this.Xa(function() {
          b = !0
          d()
        })
      }
    }
    k.prototype.flatten = function(a) {
      var b = this
      a = m(a, 'link[rel=import]')
      n(a, function(a) {
        var c = b.a[a.href]
        ;(a.__import = c) &&
          c.nodeType === Node.DOCUMENT_FRAGMENT_NODE &&
          ((b.a[a.href] = a),
          (a.readyState = 'loading'),
          (a.__import = a),
          b.flatten(c),
          a.appendChild(c))
      })
    }
    k.prototype.Xa = function(a) {
      function b(e) {
        if (e < d) {
          var f = c[e],
            g = document.createElement('script')
          f.removeAttribute('import-dependency')
          n(f.attributes, function(a) {
            return g.setAttribute(a.name, a.value)
          })
          P = g
          f.parentNode.replaceChild(g, f)
          h(g, function() {
            P = null
            b(e + 1)
          })
        } else a()
      }
      var c = m(document, 'script[import-dependency]'),
        d = c.length
      b(0)
    }
    k.prototype.Ya = function(a) {
      var b = m(
          document,
          'style[import-dependency],link[rel=stylesheet][import-dependency]'
        ),
        d = b.length
      if (d) {
        var e =
          ja &&
          !!document.querySelector(
            'link[rel=stylesheet][href][type=import-disable]'
          )
        n(b, function(b) {
          h(b, function() {
            b.removeAttribute('import-dependency')
            0 === --d && a()
          })
          if (e && b.parentNode !== document.head) {
            var f = document.createElement(b.localName)
            f.__appliedElement = b
            f.setAttribute('type', 'import-placeholder')
            b.parentNode.insertBefore(f, b.nextSibling)
            for (f = c(b); f && c(f); ) f = c(f)
            f.parentNode !== document.head && (f = null)
            document.head.insertBefore(b, f)
            b.removeAttribute('type')
          }
        })
      } else a()
    }
    k.prototype.Ta = function() {
      var a = this,
        b = m(document, 'link[rel=import]')
      n(
        b,
        function(b) {
          return a.i(b)
        },
        !0
      )
    }
    k.prototype.i = function(a) {
      a.__loaded ||
        ((a.__loaded = !0),
        a.import && (a.import.readyState = 'complete'),
        a.dispatchEvent(
          b(a.import ? 'load' : 'error', {
            bubbles: !1,
            cancelable: !1,
            detail: void 0
          })
        ))
    }
    k.prototype.Va = function(a) {
      var b = this
      n(a, function(a) {
        return n(a.addedNodes, function(a) {
          a &&
            a.nodeType === Node.ELEMENT_NODE &&
            (g(a) ? b.s(a) : b.loadImports(a))
        })
      })
    }
    var wa = null
    if (C)
      (t = m(document, 'link[rel=import]')),
        n(t, function(a) {
          ;(a.import && 'loading' === a.import.readyState) || (a.__loaded = !0)
        }),
        (t = function(a) {
          a = a.target
          g(a) && (a.__loaded = !0)
        }),
        document.addEventListener('load', t, !0),
        document.addEventListener('error', t, !0)
    else {
      var ca = Object.getOwnPropertyDescriptor(Node.prototype, 'baseURI')
      Object.defineProperty(
        (!ca || ca.configurable ? Node : Element).prototype,
        'baseURI',
        {
          get: function() {
            var a = g(this) ? this : c(this)
            return a
              ? a.href
              : ca && ca.get
                ? ca.get.call(this)
                : (document.querySelector('base') || window.location).href
          },
          configurable: !0,
          enumerable: !0
        }
      )
      Object.defineProperty(HTMLLinkElement.prototype, 'import', {
        get: function() {
          return this.__import || null
        },
        configurable: !0,
        enumerable: !0
      })
      e(function() {
        wa = new k()
      })
    }
    f(function() {
      return document.dispatchEvent(
        b('HTMLImportsLoaded', {
          cancelable: !0,
          bubbles: !0,
          detail: void 0
        })
      )
    })
    a.useNative = C
    a.whenReady = f
    a.importForElement = c
    a.loadImports = function(a) {
      wa && wa.loadImports(a)
    }
  })(
    (window.HTMLImports = window.HTMLImports || {})
  ) /*

 Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
  window.WebComponents = window.WebComponents || { flags: {} }
  var qb = document.querySelector('script[src*="webcomponents-lite.js"]'),
    rb = /wc-(.+)/,
    w = {}
  if (!w.noOpts) {
    location.search
      .slice(1)
      .split('&')
      .forEach(function(a) {
        a = a.split('=')
        var b
        a[0] && (b = a[0].match(rb)) && (w[b[1]] = a[1] || !0)
      })
    if (qb)
      for (var sb = 0, tb; (tb = qb.attributes[sb]); sb++)
        'src' !== tb.name && (w[tb.name] = tb.value || !0)
    if (w.log && w.log.split) {
      var ub = w.log.split(',')
      w.log = {}
      ub.forEach(function(a) {
        w.log[a] = !0
      })
    } else w.log = {}
  }
  window.WebComponents.flags = w
  var vb = w.shadydom
  vb &&
    ((window.ShadyDOM = window.ShadyDOM || {}), (window.ShadyDOM.force = vb))
  var wb = w.register || w.ce
  wb &&
    window.customElements &&
    (window.customElements.forcePolyfill = wb) /*

Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
  function xb() {
    this.xa = this.root = null
    this.Y = !1
    this.C = this.T = this.la = this.assignedSlot = this.assignedNodes = this.J = null
    this.childNodes = this.nextSibling = this.previousSibling = this.lastChild = this.firstChild = this.parentNode = this.O = void 0
    this.Da = this.qa = !1
  }
  xb.prototype.toJSON = function() {
    return {}
  }
  function x(a) {
    a.ea || (a.ea = new xb())
    return a.ea
  }
  function y(a) {
    return a && a.ea
  }
  var z = window.ShadyDOM || {}
  z.Ra = !(!Element.prototype.attachShadow || !Node.prototype.getRootNode)
  var yb = Object.getOwnPropertyDescriptor(Node.prototype, 'firstChild')
  z.w = !!(yb && yb.configurable && yb.get)
  z.va = z.force || !z.Ra
  var zb = navigator.userAgent.match('Trident'),
    Ab = navigator.userAgent.match('Edge')
  void 0 === z.Aa && (z.Aa = z.w && (zb || Ab))
  function Bb(a) {
    return (a = y(a)) && void 0 !== a.firstChild
  }
  function A(a) {
    return 'ShadyRoot' === a.Ja
  }
  function Cb(a) {
    a = a.getRootNode()
    if (A(a)) return a
  }
  var Db = Element.prototype,
    Eb =
      Db.matches ||
      Db.matchesSelector ||
      Db.mozMatchesSelector ||
      Db.msMatchesSelector ||
      Db.oMatchesSelector ||
      Db.webkitMatchesSelector
  function Fb(a, b) {
    if (a && b)
      for (
        var c = Object.getOwnPropertyNames(b), d = 0, e;
        d < c.length && (e = c[d]);
        d++
      ) {
        var f = Object.getOwnPropertyDescriptor(b, e)
        f && Object.defineProperty(a, e, f)
      }
  }
  function Gb(a, b) {
    for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d]
    for (d = 0; d < c.length; d++) Fb(a, c[d])
    return a
  }
  function Hb(a, b) {
    for (var c in b) a[c] = b[c]
  }
  var Ib = document.createTextNode(''),
    Jb = 0,
    Kb = []
  new MutationObserver(function() {
    for (; Kb.length; )
      try {
        Kb.shift()()
      } catch (a) {
        throw ((Ib.textContent = Jb++), a)
      }
  }).observe(Ib, { characterData: !0 })
  function Lb(a) {
    Kb.push(a)
    Ib.textContent = Jb++
  }
  var Mb = !!document.contains
  function Nb(a, b) {
    for (; b; ) {
      if (b == a) return !0
      b = b.parentNode
    }
    return !1
  }
  var Ob = [],
    Pb
  function Qb(a) {
    Pb || ((Pb = !0), Lb(Rb))
    Ob.push(a)
  }
  function Rb() {
    Pb = !1
    for (var a = !!Ob.length; Ob.length; ) Ob.shift()()
    return a
  }
  Rb.list = Ob
  function Sb() {
    this.a = !1
    this.addedNodes = []
    this.removedNodes = []
    this.X = new Set()
  }
  function Tb(a) {
    a.a ||
      ((a.a = !0),
      Lb(function() {
        Ub(a)
      }))
  }
  function Ub(a) {
    if (a.a) {
      a.a = !1
      var b = a.takeRecords()
      b.length &&
        a.X.forEach(function(a) {
          a(b)
        })
    }
  }
  Sb.prototype.takeRecords = function() {
    if (this.addedNodes.length || this.removedNodes.length) {
      var a = [{ addedNodes: this.addedNodes, removedNodes: this.removedNodes }]
      this.addedNodes = []
      this.removedNodes = []
      return a
    }
    return []
  }
  function Vb(a, b) {
    var c = x(a)
    c.J || (c.J = new Sb())
    c.J.X.add(b)
    var d = c.J
    return {
      Ga: b,
      G: d,
      Ka: a,
      takeRecords: function() {
        return d.takeRecords()
      }
    }
  }
  function Wb(a) {
    var b = a && a.G
    b && (b.X.delete(a.Ga), b.X.size || (x(a.Ka).J = null))
  }
  function Xb(a, b) {
    var c = b.getRootNode()
    return a
      .map(function(a) {
        var b = c === a.target.getRootNode()
        if (b && a.addedNodes) {
          if (
            ((b = Array.from(a.addedNodes).filter(function(a) {
              return c === a.getRootNode()
            })),
            b.length)
          )
            return (
              (a = Object.create(a)),
              Object.defineProperty(a, 'addedNodes', {
                value: b,
                configurable: !0
              }),
              a
            )
        } else if (b) return a
      })
      .filter(function(a) {
        return a
      })
  }
  var B = {},
    Yb = Element.prototype.insertBefore,
    Zb = Element.prototype.replaceChild,
    $b = Element.prototype.removeChild,
    ac = Element.prototype.setAttribute,
    bc = Element.prototype.removeAttribute,
    cc = Element.prototype.cloneNode,
    dc = Document.prototype.importNode,
    ec = Element.prototype.addEventListener,
    fc = Element.prototype.removeEventListener,
    gc = Window.prototype.addEventListener,
    hc = Window.prototype.removeEventListener,
    ic = Element.prototype.dispatchEvent,
    jc = Node.prototype.contains || HTMLElement.prototype.contains,
    kc = Document.prototype.getElementById,
    lc = Element.prototype.querySelector,
    mc = DocumentFragment.prototype.querySelector,
    nc = Document.prototype.querySelector,
    oc = Element.prototype.querySelectorAll,
    pc = DocumentFragment.prototype.querySelectorAll,
    qc = Document.prototype.querySelectorAll
  B.appendChild = Element.prototype.appendChild
  B.insertBefore = Yb
  B.replaceChild = Zb
  B.removeChild = $b
  B.setAttribute = ac
  B.removeAttribute = bc
  B.cloneNode = cc
  B.importNode = dc
  B.addEventListener = ec
  B.removeEventListener = fc
  B.fb = gc
  B.gb = hc
  B.dispatchEvent = ic
  B.contains = jc
  B.getElementById = kc
  B.ob = lc
  B.rb = mc
  B.mb = nc
  B.querySelector = function(a) {
    switch (this.nodeType) {
      case Node.ELEMENT_NODE:
        return lc.call(this, a)
      case Node.DOCUMENT_NODE:
        return nc.call(this, a)
      default:
        return mc.call(this, a)
    }
  }
  B.pb = oc
  B.sb = pc
  B.nb = qc
  B.querySelectorAll = function(a) {
    switch (this.nodeType) {
      case Node.ELEMENT_NODE:
        return oc.call(this, a)
      case Node.DOCUMENT_NODE:
        return qc.call(this, a)
      default:
        return pc.call(this, a)
    }
  }
  var rc = /[&\u00A0"]/g,
    sc = /[&\u00A0<>]/g
  function tc(a) {
    switch (a) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      case '\u00a0':
        return '&nbsp;'
    }
  }
  function uc(a) {
    for (var b = {}, c = 0; c < a.length; c++) b[a[c]] = !0
    return b
  }
  var vc = uc(
      'area base br col command embed hr img input keygen link meta param source track wbr'.split(
        ' '
      )
    ),
    wc = uc(
      'style script xmp iframe noembed noframes plaintext noscript'.split(' ')
    )
  function xc(a, b) {
    'template' === a.localName && (a = a.content)
    for (
      var c = '', d = b ? b(a) : a.childNodes, e = 0, f = d.length, h;
      e < f && (h = d[e]);
      e++
    ) {
      a: {
        var g = h
        var k = a
        var l = b
        switch (g.nodeType) {
          case Node.ELEMENT_NODE:
            for (
              var m = g.localName, n = '<' + m, t = g.attributes, C = 0;
              (k = t[C]);
              C++
            )
              n += ' ' + k.name + '="' + k.value.replace(rc, tc) + '"'
            n += '>'
            g = vc[m] ? n : n + xc(g, l) + '</' + m + '>'
            break a
          case Node.TEXT_NODE:
            g = g.data
            g = k && wc[k.localName] ? g : g.replace(sc, tc)
            break a
          case Node.COMMENT_NODE:
            g = '\x3c!--' + g.data + '--\x3e'
            break a
          default:
            throw (window.console.error(g), Error('not implemented'))
        }
      }
      c += g
    }
    return c
  }
  var E = {},
    F = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, !1),
    G = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT, null, !1)
  function yc(a) {
    var b = []
    F.currentNode = a
    for (a = F.firstChild(); a; ) b.push(a), (a = F.nextSibling())
    return b
  }
  E.parentNode = function(a) {
    F.currentNode = a
    return F.parentNode()
  }
  E.firstChild = function(a) {
    F.currentNode = a
    return F.firstChild()
  }
  E.lastChild = function(a) {
    F.currentNode = a
    return F.lastChild()
  }
  E.previousSibling = function(a) {
    F.currentNode = a
    return F.previousSibling()
  }
  E.nextSibling = function(a) {
    F.currentNode = a
    return F.nextSibling()
  }
  E.childNodes = yc
  E.parentElement = function(a) {
    G.currentNode = a
    return G.parentNode()
  }
  E.firstElementChild = function(a) {
    G.currentNode = a
    return G.firstChild()
  }
  E.lastElementChild = function(a) {
    G.currentNode = a
    return G.lastChild()
  }
  E.previousElementSibling = function(a) {
    G.currentNode = a
    return G.previousSibling()
  }
  E.nextElementSibling = function(a) {
    G.currentNode = a
    return G.nextSibling()
  }
  E.children = function(a) {
    var b = []
    G.currentNode = a
    for (a = G.firstChild(); a; ) b.push(a), (a = G.nextSibling())
    return b
  }
  E.innerHTML = function(a) {
    return xc(a, function(a) {
      return yc(a)
    })
  }
  E.textContent = function(a) {
    switch (a.nodeType) {
      case Node.ELEMENT_NODE:
      case Node.DOCUMENT_FRAGMENT_NODE:
        a = document.createTreeWalker(a, NodeFilter.SHOW_TEXT, null, !1)
        for (var b = '', c; (c = a.nextNode()); ) b += c.nodeValue
        return b
      default:
        return a.nodeValue
    }
  }
  var H = {},
    zc = z.w,
    Ac = [Node.prototype, Element.prototype, HTMLElement.prototype]
  function I(a) {
    var b
    a: {
      for (b = 0; b < Ac.length; b++) {
        var c = Ac[b]
        if (c.hasOwnProperty(a)) {
          b = c
          break a
        }
      }
      b = void 0
    }
    if (!b) throw Error('Could not find descriptor for ' + a)
    return Object.getOwnPropertyDescriptor(b, a)
  }
  var J = zc
      ? {
          parentNode: I('parentNode'),
          firstChild: I('firstChild'),
          lastChild: I('lastChild'),
          previousSibling: I('previousSibling'),
          nextSibling: I('nextSibling'),
          childNodes: I('childNodes'),
          parentElement: I('parentElement'),
          previousElementSibling: I('previousElementSibling'),
          nextElementSibling: I('nextElementSibling'),
          innerHTML: I('innerHTML'),
          textContent: I('textContent'),
          firstElementChild: I('firstElementChild'),
          lastElementChild: I('lastElementChild'),
          children: I('children')
        }
      : {},
    Bc = zc
      ? {
          firstElementChild: Object.getOwnPropertyDescriptor(
            DocumentFragment.prototype,
            'firstElementChild'
          ),
          lastElementChild: Object.getOwnPropertyDescriptor(
            DocumentFragment.prototype,
            'lastElementChild'
          ),
          children: Object.getOwnPropertyDescriptor(
            DocumentFragment.prototype,
            'children'
          )
        }
      : {},
    Cc = zc
      ? {
          firstElementChild: Object.getOwnPropertyDescriptor(
            Document.prototype,
            'firstElementChild'
          ),
          lastElementChild: Object.getOwnPropertyDescriptor(
            Document.prototype,
            'lastElementChild'
          ),
          children: Object.getOwnPropertyDescriptor(
            Document.prototype,
            'children'
          )
        }
      : {}
  H.wa = J
  H.qb = Bc
  H.lb = Cc
  H.parentNode = function(a) {
    return J.parentNode.get.call(a)
  }
  H.firstChild = function(a) {
    return J.firstChild.get.call(a)
  }
  H.lastChild = function(a) {
    return J.lastChild.get.call(a)
  }
  H.previousSibling = function(a) {
    return J.previousSibling.get.call(a)
  }
  H.nextSibling = function(a) {
    return J.nextSibling.get.call(a)
  }
  H.childNodes = function(a) {
    return Array.prototype.slice.call(J.childNodes.get.call(a))
  }
  H.parentElement = function(a) {
    return J.parentElement.get.call(a)
  }
  H.previousElementSibling = function(a) {
    return J.previousElementSibling.get.call(a)
  }
  H.nextElementSibling = function(a) {
    return J.nextElementSibling.get.call(a)
  }
  H.innerHTML = function(a) {
    return J.innerHTML.get.call(a)
  }
  H.textContent = function(a) {
    return J.textContent.get.call(a)
  }
  H.children = function(a) {
    switch (a.nodeType) {
      case Node.DOCUMENT_FRAGMENT_NODE:
        a = Bc.children.get.call(a)
        break
      case Node.DOCUMENT_NODE:
        a = Cc.children.get.call(a)
        break
      default:
        a = J.children.get.call(a)
    }
    return Array.prototype.slice.call(a)
  }
  H.firstElementChild = function(a) {
    switch (a.nodeType) {
      case Node.DOCUMENT_FRAGMENT_NODE:
        return Bc.firstElementChild.get.call(a)
      case Node.DOCUMENT_NODE:
        return Cc.firstElementChild.get.call(a)
      default:
        return J.firstElementChild.get.call(a)
    }
  }
  H.lastElementChild = function(a) {
    switch (a.nodeType) {
      case Node.DOCUMENT_FRAGMENT_NODE:
        return Bc.lastElementChild.get.call(a)
      case Node.DOCUMENT_NODE:
        return Cc.lastElementChild.get.call(a)
      default:
        return J.lastElementChild.get.call(a)
    }
  }
  var K = z.Aa ? H : E
  function Dc(a) {
    for (; a.firstChild; ) a.removeChild(a.firstChild)
  }
  var Ec = z.w,
    Fc = document.implementation.createHTMLDocument('inert'),
    Gc = Object.getOwnPropertyDescriptor(Node.prototype, 'isConnected'),
    Hc = Gc && Gc.get,
    Ic = Object.getOwnPropertyDescriptor(Document.prototype, 'activeElement'),
    Jc = {
      parentElement: {
        get: function() {
          var a = y(this)
          ;(a = a && a.parentNode) &&
            a.nodeType !== Node.ELEMENT_NODE &&
            (a = null)
          return void 0 !== a ? a : K.parentElement(this)
        },
        configurable: !0
      },
      parentNode: {
        get: function() {
          var a = y(this)
          a = a && a.parentNode
          return void 0 !== a ? a : K.parentNode(this)
        },
        configurable: !0
      },
      nextSibling: {
        get: function() {
          var a = y(this)
          a = a && a.nextSibling
          return void 0 !== a ? a : K.nextSibling(this)
        },
        configurable: !0
      },
      previousSibling: {
        get: function() {
          var a = y(this)
          a = a && a.previousSibling
          return void 0 !== a ? a : K.previousSibling(this)
        },
        configurable: !0
      },
      nextElementSibling: {
        get: function() {
          var a = y(this)
          if (a && void 0 !== a.nextSibling) {
            for (a = this.nextSibling; a && a.nodeType !== Node.ELEMENT_NODE; )
              a = a.nextSibling
            return a
          }
          return K.nextElementSibling(this)
        },
        configurable: !0
      },
      previousElementSibling: {
        get: function() {
          var a = y(this)
          if (a && void 0 !== a.previousSibling) {
            for (
              a = this.previousSibling;
              a && a.nodeType !== Node.ELEMENT_NODE;

            )
              a = a.previousSibling
            return a
          }
          return K.previousElementSibling(this)
        },
        configurable: !0
      }
    },
    Kc = {
      className: {
        get: function() {
          return this.getAttribute('class') || ''
        },
        set: function(a) {
          this.setAttribute('class', a)
        },
        configurable: !0
      }
    },
    Lc = {
      childNodes: {
        get: function() {
          if (Bb(this)) {
            var a = y(this)
            if (!a.childNodes) {
              a.childNodes = []
              for (var b = this.firstChild; b; b = b.nextSibling)
                a.childNodes.push(b)
            }
            var c = a.childNodes
          } else c = K.childNodes(this)
          c.item = function(a) {
            return c[a]
          }
          return c
        },
        configurable: !0
      },
      childElementCount: {
        get: function() {
          return this.children.length
        },
        configurable: !0
      },
      firstChild: {
        get: function() {
          var a = y(this)
          a = a && a.firstChild
          return void 0 !== a ? a : K.firstChild(this)
        },
        configurable: !0
      },
      lastChild: {
        get: function() {
          var a = y(this)
          a = a && a.lastChild
          return void 0 !== a ? a : K.lastChild(this)
        },
        configurable: !0
      },
      textContent: {
        get: function() {
          if (Bb(this)) {
            for (var a = [], b = 0, c = this.childNodes, d; (d = c[b]); b++)
              d.nodeType !== Node.COMMENT_NODE && a.push(d.textContent)
            return a.join('')
          }
          return K.textContent(this)
        },
        set: function(a) {
          if ('undefined' === typeof a || null === a) a = ''
          switch (this.nodeType) {
            case Node.ELEMENT_NODE:
            case Node.DOCUMENT_FRAGMENT_NODE:
              if (!Bb(this) && Ec) {
                var b = this.firstChild
                ;(b != this.lastChild || (b && b.nodeType != Node.TEXT_NODE)) &&
                  Dc(this)
                H.wa.textContent.set.call(this, a)
              } else
                Dc(this),
                  (0 < a.length || this.nodeType === Node.ELEMENT_NODE) &&
                    this.appendChild(document.createTextNode(a))
              break
            default:
              this.nodeValue = a
          }
        },
        configurable: !0
      },
      firstElementChild: {
        get: function() {
          var a = y(this)
          if (a && void 0 !== a.firstChild) {
            for (a = this.firstChild; a && a.nodeType !== Node.ELEMENT_NODE; )
              a = a.nextSibling
            return a
          }
          return K.firstElementChild(this)
        },
        configurable: !0
      },
      lastElementChild: {
        get: function() {
          var a = y(this)
          if (a && void 0 !== a.lastChild) {
            for (a = this.lastChild; a && a.nodeType !== Node.ELEMENT_NODE; )
              a = a.previousSibling
            return a
          }
          return K.lastElementChild(this)
        },
        configurable: !0
      },
      children: {
        get: function() {
          var a = Bb(this)
            ? Array.prototype.filter.call(this.childNodes, function(a) {
                return a.nodeType === Node.ELEMENT_NODE
              })
            : K.children(this)
          a.item = function(b) {
            return a[b]
          }
          return a
        },
        configurable: !0
      },
      innerHTML: {
        get: function() {
          return Bb(this)
            ? xc('template' === this.localName ? this.content : this)
            : K.innerHTML(this)
        },
        set: function(a) {
          var b = 'template' === this.localName ? this.content : this
          Dc(b)
          var c = this.localName
          ;(c && 'template' !== c) || (c = 'div')
          c = Fc.createElement(c)
          for (
            Ec ? H.wa.innerHTML.set.call(c, a) : (c.innerHTML = a);
            c.firstChild;

          )
            b.appendChild(c.firstChild)
        },
        configurable: !0
      }
    },
    Mc = {
      shadowRoot: {
        get: function() {
          var a = y(this)
          return (a && a.xa) || null
        },
        configurable: !0
      }
    },
    Nc = {
      activeElement: {
        get: function() {
          var a =
            Ic && Ic.get
              ? Ic.get.call(document)
              : z.w
                ? void 0
                : document.activeElement
          if (a && a.nodeType) {
            var b = !!A(this)
            if (
              this === document ||
              (b && this.host !== a && B.contains.call(this.host, a))
            ) {
              for (b = Cb(a); b && b !== this; ) (a = b.host), (b = Cb(a))
              a = this === document ? (b ? null : a) : b === this ? a : null
            } else a = null
          } else a = null
          return a
        },
        set: function() {},
        configurable: !0
      }
    }
  function L(a, b, c) {
    for (var d in b) {
      var e = Object.getOwnPropertyDescriptor(a, d)
      ;(e && e.configurable) || (!e && c)
        ? Object.defineProperty(a, d, b[d])
        : c && console.warn('Could not define', d, 'on', a)
    }
  }
  function Oc(a) {
    L(a, Jc)
    L(a, Kc)
    L(a, Lc)
    L(a, Nc)
  }
  function Pc() {
    var a = Qc.prototype
    a.__proto__ = DocumentFragment.prototype
    L(a, Jc, !0)
    L(a, Lc, !0)
    L(a, Nc, !0)
    Object.defineProperties(a, {
      nodeType: { value: Node.DOCUMENT_FRAGMENT_NODE, configurable: !0 },
      nodeName: { value: '#document-fragment', configurable: !0 },
      nodeValue: { value: null, configurable: !0 }
    })
    ;['localName', 'namespaceURI', 'prefix'].forEach(function(b) {
      Object.defineProperty(a, b, { value: void 0, configurable: !0 })
    })
    ;['ownerDocument', 'baseURI', 'isConnected'].forEach(function(b) {
      Object.defineProperty(a, b, {
        get: function() {
          return this.host[b]
        },
        configurable: !0
      })
    })
  }
  var Rc = z.w
      ? function() {}
      : function(a) {
          var b = x(a)
          b.qa || ((b.qa = !0), L(a, Jc, !0), L(a, Kc, !0))
        },
    Sc = z.w
      ? function() {}
      : function(a) {
          x(a).Da || (L(a, Lc, !0), L(a, Mc, !0))
        }
  var Tc = K.childNodes
  function Uc(a, b, c) {
    Rc(a)
    c = c || null
    var d = x(a),
      e = x(b),
      f = c ? x(c) : null
    d.previousSibling = c ? f.previousSibling : b.lastChild
    if ((f = y(d.previousSibling))) f.nextSibling = a
    if ((f = y((d.nextSibling = c)))) f.previousSibling = a
    d.parentNode = b
    c
      ? c === e.firstChild && (e.firstChild = a)
      : ((e.lastChild = a), e.firstChild || (e.firstChild = a))
    e.childNodes = null
  }
  function Vc(a, b) {
    var c = x(a)
    if (void 0 === c.firstChild)
      for (
        b = b || Tc(a),
          c.firstChild = b[0] || null,
          c.lastChild = b[b.length - 1] || null,
          Sc(a),
          c = 0;
        c < b.length;
        c++
      ) {
        var d = b[c],
          e = x(d)
        e.parentNode = a
        e.nextSibling = b[c + 1] || null
        e.previousSibling = b[c - 1] || null
        Rc(d)
      }
  }
  var Wc = K.parentNode
  function Xc(a, b, c) {
    if (b === a)
      throw Error(
        "Failed to execute 'appendChild' on 'Node': The new child element contains the parent."
      )
    if (c) {
      var d = y(c)
      d = d && d.parentNode
      if ((void 0 !== d && d !== a) || (void 0 === d && Wc(c) !== a))
        throw Error(
          "Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node."
        )
    }
    if (c === b) return b
    b.parentNode && Yc(b.parentNode, b)
    var e, f
    if (!b.__noInsertionPoint) {
      if ((f = e = Cb(a))) {
        var h
        'slot' === b.localName
          ? (h = [b])
          : b.querySelectorAll && (h = b.querySelectorAll('slot'))
        f = h && h.length ? h : void 0
      }
      f &&
        ((h = e),
        (d = f),
        (h.v = h.v || []),
        (h.g = h.g || []),
        (h.j = h.j || {}),
        h.v.push.apply(h.v, [].concat(d instanceof Array ? d : na(ma(d)))))
    }
    ;('slot' === a.localName || f) && (e = e || Cb(a)) && Zc(e)
    if (Bb(a)) {
      e = c
      Sc(a)
      f = x(a)
      void 0 !== f.firstChild && (f.childNodes = null)
      if (b.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        f = b.childNodes
        for (h = 0; h < f.length; h++) Uc(f[h], a, e)
        e = x(b)
        f = void 0 !== e.firstChild ? null : void 0
        e.firstChild = e.lastChild = f
        e.childNodes = f
      } else Uc(b, a, e)
      e = y(a)
      if ($c(a)) {
        Zc(e.root)
        var g = !0
      } else e.root && (g = !0)
    }
    g ||
      ((g = A(a) ? a.host : a),
      c
        ? ((c = ad(c)), B.insertBefore.call(g, b, c))
        : B.appendChild.call(g, b))
    bd(a, b)
    return b
  }
  function Yc(a, b) {
    if (b.parentNode !== a)
      throw Error('The node to be removed is not a child of this node: ' + b)
    var c = Cb(b),
      d = y(a)
    if (Bb(a)) {
      var e = x(b),
        f = x(a)
      b === f.firstChild && (f.firstChild = e.nextSibling)
      b === f.lastChild && (f.lastChild = e.previousSibling)
      var h = e.previousSibling,
        g = e.nextSibling
      h && (x(h).nextSibling = g)
      g && (x(g).previousSibling = h)
      e.parentNode = e.previousSibling = e.nextSibling = void 0
      void 0 !== f.childNodes && (f.childNodes = null)
      if ($c(a)) {
        Zc(d.root)
        var k = !0
      }
    }
    cd(b)
    if (c) {
      ;(e = a && 'slot' === a.localName) && (k = !0)
      if (c.g) {
        dd(c)
        f = c.j
        for (aa in f)
          for (h = f[aa], g = 0; g < h.length; g++) {
            var l = h[g]
            if (Nb(b, l)) {
              h.splice(g, 1)
              var m = c.g.indexOf(l)
              0 <= m && c.g.splice(m, 1)
              g--
              m = y(l)
              if ((l = m.C))
                for (var n = 0; n < l.length; n++) {
                  var t = l[n],
                    C = ed(t)
                  C && B.removeChild.call(C, t)
                }
              m.C = []
              m.assignedNodes = []
              m = !0
            }
          }
        var aa = m
      } else aa = void 0
      ;(aa || e) && Zc(c)
    }
    k ||
      ((k = A(a) ? a.host : a),
      ((!d.root && 'slot' !== b.localName) || k === Wc(b)) &&
        B.removeChild.call(k, b))
    bd(a, null, b)
    return b
  }
  function cd(a) {
    var b = y(a)
    if (b && void 0 !== b.O) {
      b = a.childNodes
      for (var c = 0, d = b.length, e; c < d && (e = b[c]); c++) cd(e)
    }
    if ((a = y(a))) a.O = void 0
  }
  function ad(a) {
    var b = a
    a &&
      'slot' === a.localName &&
      (b = (b = (b = y(a)) && b.C) && b.length ? b[0] : ad(a.nextSibling))
    return b
  }
  function $c(a) {
    return (a = (a = y(a)) && a.root) && fd(a)
  }
  function gd(a, b) {
    if ('slot' === b) (a = a.parentNode), $c(a) && Zc(y(a).root)
    else if ('slot' === a.localName && 'name' === b && (b = Cb(a))) {
      if (b.g) {
        var c = a.Ea,
          d = hd(a)
        if (d !== c) {
          c = b.j[c]
          var e = c.indexOf(a)
          0 <= e && c.splice(e, 1)
          c = b.j[d] || (b.j[d] = [])
          c.push(a)
          1 < c.length && (b.j[d] = id(c))
        }
      }
      Zc(b)
    }
  }
  function bd(a, b, c) {
    if ((a = (a = y(a)) && a.J))
      b && a.addedNodes.push(b), c && a.removedNodes.push(c), Tb(a)
  }
  function jd(a) {
    if (a && a.nodeType) {
      var b = x(a),
        c = b.O
      void 0 === c &&
        (A(a)
          ? ((c = a), (b.O = c))
          : ((c = (c = a.parentNode) ? jd(c) : a),
            B.contains.call(document.documentElement, a) && (b.O = c)))
      return c
    }
  }
  function kd(a, b, c) {
    var d = []
    ld(a.childNodes, b, c, d)
    return d
  }
  function ld(a, b, c, d) {
    for (var e = 0, f = a.length, h; e < f && (h = a[e]); e++) {
      var g
      if ((g = h.nodeType === Node.ELEMENT_NODE)) {
        g = h
        var k = b,
          l = c,
          m = d,
          n = k(g)
        n && m.push(g)
        l && l(n) ? (g = n) : (ld(g.childNodes, k, l, m), (g = void 0))
      }
      if (g) break
    }
  }
  var md = null
  function nd(a, b, c) {
    md || (md = window.ShadyCSS && window.ShadyCSS.ScopingShim)
    md && 'class' === b
      ? md.setElementClass(a, c)
      : (B.setAttribute.call(a, b, c), gd(a, b))
  }
  function od(a, b) {
    if (a.ownerDocument !== document) return B.importNode.call(document, a, b)
    var c = B.importNode.call(document, a, !1)
    if (b) {
      a = a.childNodes
      b = 0
      for (var d; b < a.length; b++) (d = od(a[b], !0)), c.appendChild(d)
    }
    return c
  }
  var pd = '__eventWrappers' + Date.now(),
    qd = {
      blur: !0,
      focus: !0,
      focusin: !0,
      focusout: !0,
      click: !0,
      dblclick: !0,
      mousedown: !0,
      mouseenter: !0,
      mouseleave: !0,
      mousemove: !0,
      mouseout: !0,
      mouseover: !0,
      mouseup: !0,
      wheel: !0,
      beforeinput: !0,
      input: !0,
      keydown: !0,
      keyup: !0,
      compositionstart: !0,
      compositionupdate: !0,
      compositionend: !0,
      touchstart: !0,
      touchend: !0,
      touchmove: !0,
      touchcancel: !0,
      pointerover: !0,
      pointerenter: !0,
      pointerdown: !0,
      pointermove: !0,
      pointerup: !0,
      pointercancel: !0,
      pointerout: !0,
      pointerleave: !0,
      gotpointercapture: !0,
      lostpointercapture: !0,
      dragstart: !0,
      drag: !0,
      dragenter: !0,
      dragleave: !0,
      dragover: !0,
      drop: !0,
      dragend: !0,
      DOMActivate: !0,
      DOMFocusIn: !0,
      DOMFocusOut: !0,
      keypress: !0
    }
  function rd(a, b) {
    var c = [],
      d = a
    for (a = a === window ? window : a.getRootNode(); d; )
      c.push(d),
        (d = d.assignedSlot
          ? d.assignedSlot
          : d.nodeType === Node.DOCUMENT_FRAGMENT_NODE &&
            d.host &&
            (b || d !== a)
            ? d.host
            : d.parentNode)
    c[c.length - 1] === document && c.push(window)
    return c
  }
  function sd(a, b) {
    if (!A) return a
    a = rd(a, !0)
    for (var c = 0, d, e, f, h; c < b.length; c++)
      if (
        ((d = b[c]),
        (f = d === window ? window : d.getRootNode()),
        f !== e && ((h = a.indexOf(f)), (e = f)),
        !A(f) || -1 < h)
      )
        return d
  }
  var td = {
    get composed() {
      !1 !== this.isTrusted && void 0 === this.ca && (this.ca = qd[this.type])
      return this.ca || !1
    },
    composedPath: function() {
      this.b || (this.b = rd(this.__target, this.composed))
      return this.b
    },
    get target() {
      return sd(this.currentTarget, this.composedPath())
    },
    get relatedTarget() {
      if (!this.da) return null
      this.c || (this.c = rd(this.da, !0))
      return sd(this.currentTarget, this.c)
    },
    stopPropagation: function() {
      Event.prototype.stopPropagation.call(this)
      this.a = !0
    },
    stopImmediatePropagation: function() {
      Event.prototype.stopImmediatePropagation.call(this)
      this.a = this.i = !0
    }
  }
  function ud(a) {
    function b(b, d) {
      b = new a(b, d)
      b.ca = d && !!d.composed
      return b
    }
    Hb(b, a)
    b.prototype = a.prototype
    return b
  }
  var vd = { focus: !0, blur: !0 }
  function wd(a) {
    return a.__target !== a.target || a.da !== a.relatedTarget
  }
  function xd(a, b, c) {
    if ((c = b.__handlers && b.__handlers[a.type] && b.__handlers[a.type][c]))
      for (
        var d = 0, e;
        (e = c[d]) &&
        (!wd(a) || a.target !== a.relatedTarget) &&
        (e.call(b, a), !a.i);
        d++
      );
  }
  function yd(a) {
    var b = a.composedPath()
    Object.defineProperty(a, 'currentTarget', {
      get: function() {
        return d
      },
      configurable: !0
    })
    for (var c = b.length - 1; 0 <= c; c--) {
      var d = b[c]
      xd(a, d, 'capture')
      if (a.a) return
    }
    Object.defineProperty(a, 'eventPhase', {
      get: function() {
        return Event.AT_TARGET
      }
    })
    var e
    for (c = 0; c < b.length; c++) {
      d = b[c]
      var f = y(d)
      f = f && f.root
      if (0 === c || (f && f === e))
        if ((xd(a, d, 'bubble'), d !== window && (e = d.getRootNode()), a.a))
          break
    }
  }
  function zd(a, b, c, d, e, f) {
    for (var h = 0; h < a.length; h++) {
      var g = a[h],
        k = g.type,
        l = g.capture,
        m = g.once,
        n = g.passive
      if (b === g.node && c === k && d === l && e === m && f === n) return h
    }
    return -1
  }
  function Ad(a, b, c) {
    if (b) {
      var d = typeof b
      if ('function' === d || 'object' === d)
        if (
          'object' !== d ||
          (b.handleEvent && 'function' === typeof b.handleEvent)
        ) {
          if (c && 'object' === typeof c) {
            var e = !!c.capture
            var f = !!c.once
            var h = !!c.passive
          } else (e = !!c), (h = f = !1)
          var g = (c && c.fa) || this,
            k = b[pd]
          if (k) {
            if (-1 < zd(k, g, a, e, f, h)) return
          } else b[pd] = []
          k = function(e) {
            f && this.removeEventListener(a, b, c)
            e.__target || Bd(e)
            if (g !== this) {
              var h = Object.getOwnPropertyDescriptor(e, 'currentTarget')
              Object.defineProperty(e, 'currentTarget', {
                get: function() {
                  return g
                },
                configurable: !0
              })
            }
            if (e.composed || -1 < e.composedPath().indexOf(g))
              if (wd(e) && e.target === e.relatedTarget)
                e.eventPhase === Event.BUBBLING_PHASE &&
                  e.stopImmediatePropagation()
              else if (
                e.eventPhase === Event.CAPTURING_PHASE ||
                e.bubbles ||
                e.target === g ||
                g instanceof Window
              ) {
                var k =
                  'function' === d
                    ? b.call(g, e)
                    : b.handleEvent && b.handleEvent(e)
                g !== this &&
                  (h
                    ? (Object.defineProperty(e, 'currentTarget', h), (h = null))
                    : delete e.currentTarget)
                return k
              }
          }
          b[pd].push({
            node: g,
            type: a,
            capture: e,
            once: f,
            passive: h,
            hb: k
          })
          vd[a]
            ? ((this.__handlers = this.__handlers || {}),
              (this.__handlers[a] = this.__handlers[a] || {
                capture: [],
                bubble: []
              }),
              this.__handlers[a][e ? 'capture' : 'bubble'].push(k))
            : (this instanceof Window ? B.fb : B.addEventListener).call(
                this,
                a,
                k,
                c
              )
        }
    }
  }
  function Cd(a, b, c) {
    if (b) {
      if (c && 'object' === typeof c) {
        var d = !!c.capture
        var e = !!c.once
        var f = !!c.passive
      } else (d = !!c), (f = e = !1)
      var h = (c && c.fa) || this,
        g = void 0
      var k = null
      try {
        k = b[pd]
      } catch (l) {}
      k &&
        ((e = zd(k, h, a, d, e, f)),
        -1 < e && ((g = k.splice(e, 1)[0].hb), k.length || (b[pd] = void 0)))
      ;(this instanceof Window ? B.gb : B.removeEventListener).call(
        this,
        a,
        g || b,
        c
      )
      g &&
        vd[a] &&
        this.__handlers &&
        this.__handlers[a] &&
        ((a = this.__handlers[a][d ? 'capture' : 'bubble']),
        (g = a.indexOf(g)),
        -1 < g && a.splice(g, 1))
    }
  }
  function Dd() {
    for (var a in vd)
      window.addEventListener(
        a,
        function(a) {
          a.__target || (Bd(a), yd(a))
        },
        !0
      )
  }
  function Bd(a) {
    a.__target = a.target
    a.da = a.relatedTarget
    if (z.w) {
      var b = Object.getPrototypeOf(a)
      if (!b.hasOwnProperty('__patchProto')) {
        var c = Object.create(b)
        c.jb = b
        Fb(c, td)
        b.__patchProto = c
      }
      a.__proto__ = b.__patchProto
    } else Fb(a, td)
  }
  var Ed = ud(window.Event),
    Fd = ud(window.CustomEvent),
    Gd = ud(window.MouseEvent)
  function Hd(a, b) {
    return { index: a, P: [], W: b }
  }
  function Id(a, b, c, d) {
    var e = 0,
      f = 0,
      h = 0,
      g = 0,
      k = Math.min(b - e, d - f)
    if (0 == e && 0 == f)
      a: {
        for (h = 0; h < k; h++) if (a[h] !== c[h]) break a
        h = k
      }
    if (b == a.length && d == c.length) {
      g = a.length
      for (var l = c.length, m = 0; m < k - h && Jd(a[--g], c[--l]); ) m++
      g = m
    }
    e += h
    f += h
    b -= g
    d -= g
    if (0 == b - e && 0 == d - f) return []
    if (e == b) {
      for (b = Hd(e, 0); f < d; ) b.P.push(c[f++])
      return [b]
    }
    if (f == d) return [Hd(e, b - e)]
    k = e
    h = f
    d = d - h + 1
    g = b - k + 1
    b = Array(d)
    for (l = 0; l < d; l++) (b[l] = Array(g)), (b[l][0] = l)
    for (l = 0; l < g; l++) b[0][l] = l
    for (l = 1; l < d; l++)
      for (m = 1; m < g; m++)
        if (a[k + m - 1] === c[h + l - 1]) b[l][m] = b[l - 1][m - 1]
        else {
          var n = b[l - 1][m] + 1,
            t = b[l][m - 1] + 1
          b[l][m] = n < t ? n : t
        }
    k = b.length - 1
    h = b[0].length - 1
    d = b[k][h]
    for (a = []; 0 < k || 0 < h; )
      0 == k
        ? (a.push(2), h--)
        : 0 == h
          ? (a.push(3), k--)
          : ((g = b[k - 1][h - 1]),
            (l = b[k - 1][h]),
            (m = b[k][h - 1]),
            (n = l < m ? (l < g ? l : g) : m < g ? m : g),
            n == g
              ? (g == d ? a.push(0) : (a.push(1), (d = g)), k--, h--)
              : n == l
                ? (a.push(3), k--, (d = l))
                : (a.push(2), h--, (d = m)))
    a.reverse()
    b = void 0
    k = []
    for (h = 0; h < a.length; h++)
      switch (a[h]) {
        case 0:
          b && (k.push(b), (b = void 0))
          e++
          f++
          break
        case 1:
          b || (b = Hd(e, 0))
          b.W++
          e++
          b.P.push(c[f])
          f++
          break
        case 2:
          b || (b = Hd(e, 0))
          b.W++
          e++
          break
        case 3:
          b || (b = Hd(e, 0)), b.P.push(c[f]), f++
      }
    b && k.push(b)
    return k
  }
  function Jd(a, b) {
    return a === b
  }
  var ed = K.parentNode,
    Kd = K.childNodes,
    Ld = {}
  function Md(a) {
    var b = []
    do b.unshift(a)
    while ((a = a.parentNode))
    return b
  }
  function Qc(a, b, c) {
    if (a !== Ld) throw new TypeError('Illegal constructor')
    this.Ja = 'ShadyRoot'
    a = Kd(b)
    this.host = b
    this.a = c && c.mode
    Vc(b, a)
    c = y(b)
    c.root = this
    c.xa = 'closed' !== this.a ? this : null
    c = x(this)
    c.firstChild = c.lastChild = c.parentNode = c.nextSibling = c.previousSibling = null
    c.childNodes = []
    this.V = !1
    this.v = this.j = this.g = null
    c = 0
    for (var d = a.length; c < d; c++) B.removeChild.call(b, a[c])
  }
  function Zc(a) {
    a.V ||
      ((a.V = !0),
      Qb(function() {
        return Nd(a)
      }))
  }
  function Nd(a) {
    for (var b; a; ) {
      a.V && (b = a)
      a: {
        var c = a
        a = c.host.getRootNode()
        if (A(a))
          for (var d = c.host.childNodes, e = 0; e < d.length; e++)
            if (((c = d[e]), 'slot' == c.localName)) break a
        a = void 0
      }
    }
    b && b._renderRoot()
  }
  Qc.prototype._renderRoot = function() {
    this.V = !1
    if (this.g) {
      dd(this)
      for (var a = 0, b; a < this.g.length; a++) {
        b = this.g[a]
        var c = y(b),
          d = c.assignedNodes
        c.assignedNodes = []
        c.C = []
        if ((c.la = d))
          for (c = 0; c < d.length; c++) {
            var e = y(d[c])
            e.T = e.assignedSlot
            e.assignedSlot === b && (e.assignedSlot = null)
          }
      }
      for (b = this.host.firstChild; b; b = b.nextSibling) Od(this, b)
      for (a = 0; a < this.g.length; a++) {
        b = this.g[a]
        d = y(b)
        if (!d.assignedNodes.length)
          for (c = b.firstChild; c; c = c.nextSibling) Od(this, c, b)
        ;(c = (c = y(b.parentNode)) && c.root) && fd(c) && c._renderRoot()
        Pd(this, d.C, d.assignedNodes)
        if ((c = d.la)) {
          for (e = 0; e < c.length; e++) y(c[e]).T = null
          d.la = null
          c.length > d.assignedNodes.length && (d.Y = !0)
        }
        d.Y && ((d.Y = !1), Qd(this, b))
      }
      a = this.g
      b = []
      for (d = 0; d < a.length; d++)
        (c = a[d].parentNode),
          ((e = y(c)) && e.root) || !(0 > b.indexOf(c)) || b.push(c)
      for (a = 0; a < b.length; a++) {
        d = b[a]
        c = d === this ? this.host : d
        e = []
        d = d.childNodes
        for (var f = 0; f < d.length; f++) {
          var h = d[f]
          if ('slot' == h.localName) {
            h = y(h).C
            for (var g = 0; g < h.length; g++) e.push(h[g])
          } else e.push(h)
        }
        d = void 0
        f = Kd(c)
        h = Id(e, e.length, f, f.length)
        for (var k = (g = 0); g < h.length && (d = h[g]); g++) {
          for (var l = 0, m; l < d.P.length && (m = d.P[l]); l++)
            ed(m) === c && B.removeChild.call(c, m), f.splice(d.index + k, 1)
          k -= d.W
        }
        for (k = 0; k < h.length && (d = h[k]); k++)
          for (g = f[d.index], l = d.index; l < d.index + d.W; l++)
            (m = e[l]), B.insertBefore.call(c, m, g), f.splice(l, 0, m)
      }
    }
  }
  function Od(a, b, c) {
    var d = x(b),
      e = d.T
    d.T = null
    c || (c = (a = a.j[b.slot || '__catchall']) && a[0])
    c
      ? (x(c).assignedNodes.push(b), (d.assignedSlot = c))
      : (d.assignedSlot = void 0)
    e !== d.assignedSlot && d.assignedSlot && (x(d.assignedSlot).Y = !0)
  }
  function Pd(a, b, c) {
    for (var d = 0, e; d < c.length && (e = c[d]); d++)
      if ('slot' == e.localName) {
        var f = y(e).assignedNodes
        f && f.length && Pd(a, b, f)
      } else b.push(c[d])
  }
  function Qd(a, b) {
    B.dispatchEvent.call(b, new Event('slotchange'))
    b = y(b)
    b.assignedSlot && Qd(a, b.assignedSlot)
  }
  function dd(a) {
    if (a.v && a.v.length) {
      for (var b = a.v, c, d = 0; d < b.length; d++) {
        var e = b[d]
        Vc(e)
        Vc(e.parentNode)
        var f = hd(e)
        a.j[f] ? ((c = c || {}), (c[f] = !0), a.j[f].push(e)) : (a.j[f] = [e])
        a.g.push(e)
      }
      if (c) for (var h in c) a.j[h] = id(a.j[h])
      a.v = []
    }
  }
  function hd(a) {
    var b = a.name || a.getAttribute('name') || '__catchall'
    return (a.Ea = b)
  }
  function id(a) {
    return a.sort(function(a, c) {
      a = Md(a)
      for (var b = Md(c), e = 0; e < a.length; e++) {
        c = a[e]
        var f = b[e]
        if (c !== f)
          return (
            (a = Array.from(c.parentNode.childNodes)),
            a.indexOf(c) - a.indexOf(f)
          )
      }
    })
  }
  function fd(a) {
    dd(a)
    return !(!a.g || !a.g.length)
  }
  function Rd(a) {
    var b = a.getRootNode()
    A(b) && Nd(b)
    return ((a = y(a)) && a.assignedSlot) || null
  }
  var Sd = {
      addEventListener: Ad.bind(window),
      removeEventListener: Cd.bind(window)
    },
    Td = {
      addEventListener: Ad,
      removeEventListener: Cd,
      appendChild: function(a) {
        return Xc(this, a)
      },
      insertBefore: function(a, b) {
        return Xc(this, a, b)
      },
      removeChild: function(a) {
        return Yc(this, a)
      },
      replaceChild: function(a, b) {
        Xc(this, a, b)
        Yc(this, b)
        return a
      },
      cloneNode: function(a) {
        if ('template' == this.localName) var b = B.cloneNode.call(this, a)
        else if (((b = B.cloneNode.call(this, !1)), a)) {
          a = this.childNodes
          for (var c = 0, d; c < a.length; c++)
            (d = a[c].cloneNode(!0)), b.appendChild(d)
        }
        return b
      },
      getRootNode: function() {
        return jd(this)
      },
      contains: function(a) {
        return Nb(this, a)
      },
      dispatchEvent: function(a) {
        Rb()
        return B.dispatchEvent.call(this, a)
      }
    }
  Object.defineProperties(Td, {
    isConnected: {
      get: function() {
        if (Hc && Hc.call(this)) return !0
        if (this.nodeType == Node.DOCUMENT_FRAGMENT_NODE) return !1
        var a = this.ownerDocument
        if (Mb) {
          if (B.contains.call(a, this)) return !0
        } else if (
          a.documentElement &&
          B.contains.call(a.documentElement, this)
        )
          return !0
        for (a = this; a && !(a instanceof Document); )
          a = a.parentNode || (A(a) ? a.host : void 0)
        return !!(a && a instanceof Document)
      },
      configurable: !0
    }
  })
  var Ud = {
      get assignedSlot() {
        return Rd(this)
      }
    },
    Vd = {
      querySelector: function(a) {
        return (
          kd(
            this,
            function(b) {
              return Eb.call(b, a)
            },
            function(a) {
              return !!a
            }
          )[0] || null
        )
      },
      querySelectorAll: function(a, b) {
        if (b) {
          b = Array.prototype.slice.call(B.querySelectorAll(this, a))
          var c = this.getRootNode()
          return b.filter(function(a) {
            return a.getRootNode() == c
          })
        }
        return kd(this, function(b) {
          return Eb.call(b, a)
        })
      }
    },
    Wd = {
      assignedNodes: function(a) {
        if ('slot' === this.localName) {
          var b = this.getRootNode()
          A(b) && Nd(b)
          return (b = y(this))
            ? (a && a.flatten ? b.C : b.assignedNodes) || []
            : []
        }
      }
    },
    Xd = Gb(
      {
        setAttribute: function(a, b) {
          nd(this, a, b)
        },
        removeAttribute: function(a) {
          B.removeAttribute.call(this, a)
          gd(this, a)
        },
        attachShadow: function(a) {
          if (!this) throw 'Must provide a host.'
          if (!a) throw 'Not enough arguments.'
          return new Qc(Ld, this, a)
        },
        get slot() {
          return this.getAttribute('slot')
        },
        set slot(a) {
          nd(this, 'slot', a)
        },
        get assignedSlot() {
          return Rd(this)
        }
      },
      Vd,
      Wd
    )
  Object.defineProperties(Xd, Mc)
  var Yd = Gb(
    {
      importNode: function(a, b) {
        return od(a, b)
      },
      getElementById: function(a) {
        return (
          kd(
            this,
            function(b) {
              return b.id == a
            },
            function(a) {
              return !!a
            }
          )[0] || null
        )
      }
    },
    Vd
  )
  Object.defineProperties(Yd, { _activeElement: Nc.activeElement })
  var Zd = HTMLElement.prototype.blur,
    $d = Gb({
      blur: function() {
        var a = y(this)
        ;(a = (a = a && a.root) && a.activeElement) ? a.blur() : Zd.call(this)
      }
    }),
    ae = {
      addEventListener: function(a, b, c) {
        'object' !== typeof c && (c = { capture: !!c })
        c.fa = this
        this.host.addEventListener(a, b, c)
      },
      removeEventListener: function(a, b, c) {
        'object' !== typeof c && (c = { capture: !!c })
        c.fa = this
        this.host.removeEventListener(a, b, c)
      },
      getElementById: function(a) {
        return (
          kd(
            this,
            function(b) {
              return b.id == a
            },
            function(a) {
              return !!a
            }
          )[0] || null
        )
      }
    }
  function M(a, b) {
    for (var c = Object.getOwnPropertyNames(b), d = 0; d < c.length; d++) {
      var e = c[d],
        f = Object.getOwnPropertyDescriptor(b, e)
      f.value ? (a[e] = f.value) : Object.defineProperty(a, e, f)
    }
  }
  if (z.va) {
    var ShadyDOM = {
      inUse: z.va,
      patch: function(a) {
        Sc(a)
        Rc(a)
        return a
      },
      isShadyRoot: A,
      enqueue: Qb,
      flush: Rb,
      settings: z,
      filterMutations: Xb,
      observeChildren: Vb,
      unobserveChildren: Wb,
      nativeMethods: B,
      nativeTree: K
    }
    window.ShadyDOM = ShadyDOM
    window.Event = Ed
    window.CustomEvent = Fd
    window.MouseEvent = Gd
    Dd()
    var be =
      (window.customElements && window.customElements.nativeHTMLElement) ||
      HTMLElement
    M(Qc.prototype, ae)
    M(window.Node.prototype, Td)
    M(window.Window.prototype, Sd)
    M(window.Text.prototype, Ud)
    M(window.DocumentFragment.prototype, Vd)
    M(window.Element.prototype, Xd)
    M(window.Document.prototype, Yd)
    window.HTMLSlotElement && M(window.HTMLSlotElement.prototype, Wd)
    M(be.prototype, $d)
    z.w &&
      (Oc(window.Node.prototype),
      Oc(window.Text.prototype),
      Oc(window.DocumentFragment.prototype),
      Oc(window.Element.prototype),
      Oc(be.prototype),
      Oc(window.Document.prototype),
      window.HTMLSlotElement && Oc(window.HTMLSlotElement.prototype))
    Pc()
    window.ShadowRoot = Qc
  }
  var ce = new Set(
    'annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph'.split(
      ' '
    )
  )
  function de(a) {
    var b = ce.has(a)
    a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a)
    return !b && a
  }
  function N(a) {
    var b = a.isConnected
    if (void 0 !== b) return b
    for (; a && !(a.__CE_isImportDocument || a instanceof Document); )
      a =
        a.parentNode ||
        (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0)
    return !(!a || !(a.__CE_isImportDocument || a instanceof Document))
  }
  function ee(a, b) {
    for (; b && b !== a && !b.nextSibling; ) b = b.parentNode
    return b && b !== a ? b.nextSibling : null
  }
  function fe(a, b, c) {
    c = void 0 === c ? new Set() : c
    for (var d = a; d; ) {
      if (d.nodeType === Node.ELEMENT_NODE) {
        var e = d
        b(e)
        var f = e.localName
        if ('link' === f && 'import' === e.getAttribute('rel')) {
          d = e.import
          if (d instanceof Node && !c.has(d))
            for (c.add(d), d = d.firstChild; d; d = d.nextSibling) fe(d, b, c)
          d = ee(a, e)
          continue
        } else if ('template' === f) {
          d = ee(a, e)
          continue
        }
        if ((e = e.__CE_shadowRoot))
          for (e = e.firstChild; e; e = e.nextSibling) fe(e, b, c)
      }
      d = d.firstChild ? d.firstChild : ee(a, d)
    }
  }
  function O(a, b, c) {
    a[b] = c
  }
  function ge() {
    this.a = new Map()
    this.s = new Map()
    this.i = []
    this.c = !1
  }
  function he(a, b, c) {
    a.a.set(b, c)
    a.s.set(c.constructor, c)
  }
  function ie(a, b) {
    a.c = !0
    a.i.push(b)
  }
  function je(a, b) {
    a.c &&
      fe(b, function(b) {
        return a.b(b)
      })
  }
  ge.prototype.b = function(a) {
    if (this.c && !a.__CE_patched) {
      a.__CE_patched = !0
      for (var b = 0; b < this.i.length; b++) this.i[b](a)
    }
  }
  function Q(a, b) {
    var c = []
    fe(b, function(a) {
      return c.push(a)
    })
    for (b = 0; b < c.length; b++) {
      var d = c[b]
      1 === d.__CE_state ? a.connectedCallback(d) : ke(a, d)
    }
  }
  function R(a, b) {
    var c = []
    fe(b, function(a) {
      return c.push(a)
    })
    for (b = 0; b < c.length; b++) {
      var d = c[b]
      1 === d.__CE_state && a.disconnectedCallback(d)
    }
  }
  function S(a, b, c) {
    c = void 0 === c ? {} : c
    var d = c.eb || new Set(),
      e =
        c.ba ||
        function(b) {
          return ke(a, b)
        },
      f = []
    fe(
      b,
      function(b) {
        if ('link' === b.localName && 'import' === b.getAttribute('rel')) {
          var c = b.import
          c instanceof Node &&
            ((c.__CE_isImportDocument = !0), (c.__CE_hasRegistry = !0))
          c && 'complete' === c.readyState
            ? (c.__CE_documentLoadHandled = !0)
            : b.addEventListener('load', function() {
                var c = b.import
                if (!c.__CE_documentLoadHandled) {
                  c.__CE_documentLoadHandled = !0
                  var f = new Set(d)
                  f.delete(c)
                  S(a, c, { eb: f, ba: e })
                }
              })
        } else f.push(b)
      },
      d
    )
    if (a.c) for (b = 0; b < f.length; b++) a.b(f[b])
    for (b = 0; b < f.length; b++) e(f[b])
  }
  function ke(a, b) {
    if (void 0 === b.__CE_state) {
      var c = b.ownerDocument
      if (c.defaultView || (c.__CE_isImportDocument && c.__CE_hasRegistry))
        if ((c = a.a.get(b.localName))) {
          c.constructionStack.push(b)
          var d = c.constructor
          try {
            try {
              if (new d() !== b)
                throw Error(
                  'The custom element constructor did not produce the element being upgraded.'
                )
            } finally {
              c.constructionStack.pop()
            }
          } catch (h) {
            throw ((b.__CE_state = 2), h)
          }
          b.__CE_state = 1
          b.__CE_definition = c
          if (c.attributeChangedCallback)
            for (c = c.observedAttributes, d = 0; d < c.length; d++) {
              var e = c[d],
                f = b.getAttribute(e)
              null !== f && a.attributeChangedCallback(b, e, null, f, null)
            }
          N(b) && a.connectedCallback(b)
        }
    }
  }
  ge.prototype.connectedCallback = function(a) {
    var b = a.__CE_definition
    b.connectedCallback && b.connectedCallback.call(a)
  }
  ge.prototype.disconnectedCallback = function(a) {
    var b = a.__CE_definition
    b.disconnectedCallback && b.disconnectedCallback.call(a)
  }
  ge.prototype.attributeChangedCallback = function(a, b, c, d, e) {
    var f = a.__CE_definition
    f.attributeChangedCallback &&
      -1 < f.observedAttributes.indexOf(b) &&
      f.attributeChangedCallback.call(a, b, c, d, e)
  }
  function le(a) {
    var b = document
    this.l = a
    this.a = b
    this.G = void 0
    S(this.l, this.a)
    'loading' === this.a.readyState &&
      ((this.G = new MutationObserver(this.b.bind(this))),
      this.G.observe(this.a, { childList: !0, subtree: !0 }))
  }
  le.prototype.disconnect = function() {
    this.G && this.G.disconnect()
  }
  le.prototype.b = function(a) {
    var b = this.a.readyState
    ;('interactive' !== b && 'complete' !== b) || this.disconnect()
    for (b = 0; b < a.length; b++)
      for (var c = a[b].addedNodes, d = 0; d < c.length; d++) S(this.l, c[d])
  }
  function me() {
    var a = this
    this.b = this.a = void 0
    this.c = new Promise(function(b) {
      a.b = b
      a.a && b(a.a)
    })
  }
  me.prototype.resolve = function(a) {
    if (this.a) throw Error('Already resolved.')
    this.a = a
    this.b && this.b(a)
  }
  function T(a) {
    this.ia = !1
    this.l = a
    this.ma = new Map()
    this.ja = function(a) {
      return a()
    }
    this.S = !1
    this.ka = []
    this.Ha = new le(a)
  }
  p = T.prototype
  p.define = function(a, b) {
    var c = this
    if (!(b instanceof Function))
      throw new TypeError('Custom element constructors must be functions.')
    if (!de(a))
      throw new SyntaxError("The element name '" + a + "' is not valid.")
    if (this.l.a.get(a))
      throw Error(
        "A custom element with name '" + a + "' has already been defined."
      )
    if (this.ia) throw Error('A custom element is already being defined.')
    this.ia = !0
    try {
      var d = function(a) {
          var b = e[a]
          if (void 0 !== b && !(b instanceof Function))
            throw Error("The '" + a + "' callback must be a function.")
          return b
        },
        e = b.prototype
      if (!(e instanceof Object))
        throw new TypeError(
          "The custom element constructor's prototype is not an object."
        )
      var f = d('connectedCallback')
      var h = d('disconnectedCallback')
      var g = d('adoptedCallback')
      var k = d('attributeChangedCallback')
      var l = b.observedAttributes || []
    } catch (m) {
      return
    } finally {
      this.ia = !1
    }
    b = {
      localName: a,
      constructor: b,
      connectedCallback: f,
      disconnectedCallback: h,
      adoptedCallback: g,
      attributeChangedCallback: k,
      observedAttributes: l,
      constructionStack: []
    }
    he(this.l, a, b)
    this.ka.push(b)
    this.S ||
      ((this.S = !0),
      this.ja(function() {
        return ne(c)
      }))
  }
  p.ba = function(a) {
    S(this.l, a)
  }
  function ne(a) {
    if (!1 !== a.S) {
      a.S = !1
      for (var b = a.ka, c = [], d = new Map(), e = 0; e < b.length; e++)
        d.set(b[e].localName, [])
      S(a.l, document, {
        ba: function(b) {
          if (void 0 === b.__CE_state) {
            var e = b.localName,
              f = d.get(e)
            f ? f.push(b) : a.l.a.get(e) && c.push(b)
          }
        }
      })
      for (e = 0; e < c.length; e++) ke(a.l, c[e])
      for (; 0 < b.length; ) {
        var f = b.shift()
        e = f.localName
        f = d.get(f.localName)
        for (var h = 0; h < f.length; h++) ke(a.l, f[h])
        ;(e = a.ma.get(e)) && e.resolve(void 0)
      }
    }
  }
  p.get = function(a) {
    if ((a = this.l.a.get(a))) return a.constructor
  }
  p.Ba = function(a) {
    if (!de(a))
      return Promise.reject(
        new SyntaxError("'" + a + "' is not a valid custom element name.")
      )
    var b = this.ma.get(a)
    if (b) return b.c
    b = new me()
    this.ma.set(a, b)
    this.l.a.get(a) &&
      !this.ka.some(function(b) {
        return b.localName === a
      }) &&
      b.resolve(void 0)
    return b.c
  }
  p.Za = function(a) {
    this.Ha.disconnect()
    var b = this.ja
    this.ja = function(c) {
      return a(function() {
        return b(c)
      })
    }
  }
  window.CustomElementRegistry = T
  T.prototype.define = T.prototype.define
  T.prototype.upgrade = T.prototype.ba
  T.prototype.get = T.prototype.get
  T.prototype.whenDefined = T.prototype.Ba
  T.prototype.polyfillWrapFlushCallback = T.prototype.Za
  var oe = window.Document.prototype.createElement,
    pe = window.Document.prototype.createElementNS,
    qe = window.Document.prototype.importNode,
    re = window.Document.prototype.prepend,
    se = window.Document.prototype.append,
    te = window.DocumentFragment.prototype.prepend,
    ue = window.DocumentFragment.prototype.append,
    ve = window.Node.prototype.cloneNode,
    we = window.Node.prototype.appendChild,
    xe = window.Node.prototype.insertBefore,
    ye = window.Node.prototype.removeChild,
    ze = window.Node.prototype.replaceChild,
    Ae = Object.getOwnPropertyDescriptor(window.Node.prototype, 'textContent'),
    Be = window.Element.prototype.attachShadow,
    Ce = Object.getOwnPropertyDescriptor(window.Element.prototype, 'innerHTML'),
    De = window.Element.prototype.getAttribute,
    Ee = window.Element.prototype.setAttribute,
    Fe = window.Element.prototype.removeAttribute,
    Ge = window.Element.prototype.getAttributeNS,
    He = window.Element.prototype.setAttributeNS,
    Ie = window.Element.prototype.removeAttributeNS,
    Je = window.Element.prototype.insertAdjacentElement,
    Ke = window.Element.prototype.insertAdjacentHTML,
    Le = window.Element.prototype.prepend,
    Me = window.Element.prototype.append,
    Ne = window.Element.prototype.before,
    Oe = window.Element.prototype.after,
    Pe = window.Element.prototype.replaceWith,
    Qe = window.Element.prototype.remove,
    Re = window.HTMLElement,
    Se = Object.getOwnPropertyDescriptor(
      window.HTMLElement.prototype,
      'innerHTML'
    ),
    Te = window.HTMLElement.prototype.insertAdjacentElement,
    Ue = window.HTMLElement.prototype.insertAdjacentHTML
  var Ve = new function() {}()
  function We() {
    var a = Xe
    window.HTMLElement = (function() {
      function b() {
        var b = this.constructor,
          d = a.s.get(b)
        if (!d)
          throw Error(
            'The custom element being constructed was not registered with `customElements`.'
          )
        var e = d.constructionStack
        if (0 === e.length)
          return (
            (e = oe.call(document, d.localName)),
            Object.setPrototypeOf(e, b.prototype),
            (e.__CE_state = 1),
            (e.__CE_definition = d),
            a.b(e),
            e
          )
        d = e.length - 1
        var f = e[d]
        if (f === Ve)
          throw Error(
            'The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.'
          )
        e[d] = Ve
        Object.setPrototypeOf(f, b.prototype)
        a.b(f)
        return f
      }
      b.prototype = Re.prototype
      return b
    })()
  }
  function Ye(a, b, c) {
    function d(b) {
      return function(c) {
        for (var d = [], e = 0; e < arguments.length; ++e)
          d[e - 0] = arguments[e]
        e = []
        for (var f = [], l = 0; l < d.length; l++) {
          var m = d[l]
          m instanceof Element && N(m) && f.push(m)
          if (m instanceof DocumentFragment)
            for (m = m.firstChild; m; m = m.nextSibling) e.push(m)
          else e.push(m)
        }
        b.apply(this, d)
        for (d = 0; d < f.length; d++) R(a, f[d])
        if (N(this))
          for (d = 0; d < e.length; d++)
            (f = e[d]), f instanceof Element && Q(a, f)
      }
    }
    void 0 !== c.$ && (b.prepend = d(c.$))
    void 0 !== c.append && (b.append = d(c.append))
  }
  function Ze() {
    var a = Xe
    O(Document.prototype, 'createElement', function(b) {
      if (this.__CE_hasRegistry) {
        var c = a.a.get(b)
        if (c) return new c.constructor()
      }
      b = oe.call(this, b)
      a.b(b)
      return b
    })
    O(Document.prototype, 'importNode', function(b, c) {
      b = qe.call(this, b, c)
      this.__CE_hasRegistry ? S(a, b) : je(a, b)
      return b
    })
    O(Document.prototype, 'createElementNS', function(b, c) {
      if (
        this.__CE_hasRegistry &&
        (null === b || 'http://www.w3.org/1999/xhtml' === b)
      ) {
        var d = a.a.get(c)
        if (d) return new d.constructor()
      }
      b = pe.call(this, b, c)
      a.b(b)
      return b
    })
    Ye(a, Document.prototype, { $: re, append: se })
  }
  function $e() {
    var a = Xe
    function b(b, d) {
      Object.defineProperty(b, 'textContent', {
        enumerable: d.enumerable,
        configurable: !0,
        get: d.get,
        set: function(b) {
          if (this.nodeType === Node.TEXT_NODE) d.set.call(this, b)
          else {
            var c = void 0
            if (this.firstChild) {
              var e = this.childNodes,
                g = e.length
              if (0 < g && N(this)) {
                c = Array(g)
                for (var k = 0; k < g; k++) c[k] = e[k]
              }
            }
            d.set.call(this, b)
            if (c) for (b = 0; b < c.length; b++) R(a, c[b])
          }
        }
      })
    }
    O(Node.prototype, 'insertBefore', function(b, d) {
      if (b instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(b.childNodes)
        b = xe.call(this, b, d)
        if (N(this)) for (d = 0; d < c.length; d++) Q(a, c[d])
        return b
      }
      c = N(b)
      d = xe.call(this, b, d)
      c && R(a, b)
      N(this) && Q(a, b)
      return d
    })
    O(Node.prototype, 'appendChild', function(b) {
      if (b instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(b.childNodes)
        b = we.call(this, b)
        if (N(this)) for (var e = 0; e < c.length; e++) Q(a, c[e])
        return b
      }
      c = N(b)
      e = we.call(this, b)
      c && R(a, b)
      N(this) && Q(a, b)
      return e
    })
    O(Node.prototype, 'cloneNode', function(b) {
      b = ve.call(this, b)
      this.ownerDocument.__CE_hasRegistry ? S(a, b) : je(a, b)
      return b
    })
    O(Node.prototype, 'removeChild', function(b) {
      var c = N(b),
        e = ye.call(this, b)
      c && R(a, b)
      return e
    })
    O(Node.prototype, 'replaceChild', function(b, d) {
      if (b instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(b.childNodes)
        b = ze.call(this, b, d)
        if (N(this)) for (R(a, d), d = 0; d < c.length; d++) Q(a, c[d])
        return b
      }
      c = N(b)
      var f = ze.call(this, b, d),
        h = N(this)
      h && R(a, d)
      c && R(a, b)
      h && Q(a, b)
      return f
    })
    Ae && Ae.get
      ? b(Node.prototype, Ae)
      : ie(a, function(a) {
          b(a, {
            enumerable: !0,
            configurable: !0,
            get: function() {
              for (var a = [], b = 0; b < this.childNodes.length; b++)
                a.push(this.childNodes[b].textContent)
              return a.join('')
            },
            set: function(a) {
              for (; this.firstChild; ) ye.call(this, this.firstChild)
              we.call(this, document.createTextNode(a))
            }
          })
        })
  }
  function af(a) {
    var b = Element.prototype
    function c(b) {
      return function(c) {
        for (var d = [], e = 0; e < arguments.length; ++e)
          d[e - 0] = arguments[e]
        e = []
        for (var g = [], k = 0; k < d.length; k++) {
          var l = d[k]
          l instanceof Element && N(l) && g.push(l)
          if (l instanceof DocumentFragment)
            for (l = l.firstChild; l; l = l.nextSibling) e.push(l)
          else e.push(l)
        }
        b.apply(this, d)
        for (d = 0; d < g.length; d++) R(a, g[d])
        if (N(this))
          for (d = 0; d < e.length; d++)
            (g = e[d]), g instanceof Element && Q(a, g)
      }
    }
    void 0 !== Ne && (b.before = c(Ne))
    void 0 !== Ne && (b.after = c(Oe))
    void 0 !== Pe &&
      O(b, 'replaceWith', function(b) {
        for (var c = [], d = 0; d < arguments.length; ++d)
          c[d - 0] = arguments[d]
        d = []
        for (var h = [], g = 0; g < c.length; g++) {
          var k = c[g]
          k instanceof Element && N(k) && h.push(k)
          if (k instanceof DocumentFragment)
            for (k = k.firstChild; k; k = k.nextSibling) d.push(k)
          else d.push(k)
        }
        g = N(this)
        Pe.apply(this, c)
        for (c = 0; c < h.length; c++) R(a, h[c])
        if (g)
          for (R(a, this), c = 0; c < d.length; c++)
            (h = d[c]), h instanceof Element && Q(a, h)
      })
    void 0 !== Qe &&
      O(b, 'remove', function() {
        var b = N(this)
        Qe.call(this)
        b && R(a, this)
      })
  }
  function bf() {
    var a = Xe
    function b(b, c) {
      Object.defineProperty(b, 'innerHTML', {
        enumerable: c.enumerable,
        configurable: !0,
        get: c.get,
        set: function(b) {
          var d = this,
            e = void 0
          N(this) &&
            ((e = []),
            fe(this, function(a) {
              a !== d && e.push(a)
            }))
          c.set.call(this, b)
          if (e)
            for (var f = 0; f < e.length; f++) {
              var h = e[f]
              1 === h.__CE_state && a.disconnectedCallback(h)
            }
          this.ownerDocument.__CE_hasRegistry ? S(a, this) : je(a, this)
          return b
        }
      })
    }
    function c(b, c) {
      O(b, 'insertAdjacentElement', function(b, d) {
        var e = N(d)
        b = c.call(this, b, d)
        e && R(a, d)
        N(b) && Q(a, d)
        return b
      })
    }
    function d(b, c) {
      function d(b, c) {
        for (var d = []; b !== c; b = b.nextSibling) d.push(b)
        for (c = 0; c < d.length; c++) S(a, d[c])
      }
      O(b, 'insertAdjacentHTML', function(a, b) {
        a = a.toLowerCase()
        if ('beforebegin' === a) {
          var e = this.previousSibling
          c.call(this, a, b)
          d(e || this.parentNode.firstChild, this)
        } else if ('afterbegin' === a)
          (e = this.firstChild), c.call(this, a, b), d(this.firstChild, e)
        else if ('beforeend' === a)
          (e = this.lastChild),
            c.call(this, a, b),
            d(e || this.firstChild, null)
        else if ('afterend' === a)
          (e = this.nextSibling), c.call(this, a, b), d(this.nextSibling, e)
        else
          throw new SyntaxError(
            'The value provided (' +
              String(a) +
              ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'."
          )
      })
    }
    Be &&
      O(Element.prototype, 'attachShadow', function(a) {
        return (this.__CE_shadowRoot = a = Be.call(this, a))
      })
    Ce && Ce.get
      ? b(Element.prototype, Ce)
      : Se && Se.get
        ? b(HTMLElement.prototype, Se)
        : ie(a, function(a) {
            b(a, {
              enumerable: !0,
              configurable: !0,
              get: function() {
                return ve.call(this, !0).innerHTML
              },
              set: function(a) {
                var b = 'template' === this.localName,
                  c = b ? this.content : this,
                  d = oe.call(document, this.localName)
                for (d.innerHTML = a; 0 < c.childNodes.length; )
                  ye.call(c, c.childNodes[0])
                for (a = b ? d.content : d; 0 < a.childNodes.length; )
                  we.call(c, a.childNodes[0])
              }
            })
          })
    O(Element.prototype, 'setAttribute', function(b, c) {
      if (1 !== this.__CE_state) return Ee.call(this, b, c)
      var d = De.call(this, b)
      Ee.call(this, b, c)
      c = De.call(this, b)
      a.attributeChangedCallback(this, b, d, c, null)
    })
    O(Element.prototype, 'setAttributeNS', function(b, c, d) {
      if (1 !== this.__CE_state) return He.call(this, b, c, d)
      var e = Ge.call(this, b, c)
      He.call(this, b, c, d)
      d = Ge.call(this, b, c)
      a.attributeChangedCallback(this, c, e, d, b)
    })
    O(Element.prototype, 'removeAttribute', function(b) {
      if (1 !== this.__CE_state) return Fe.call(this, b)
      var c = De.call(this, b)
      Fe.call(this, b)
      null !== c && a.attributeChangedCallback(this, b, c, null, null)
    })
    O(Element.prototype, 'removeAttributeNS', function(b, c) {
      if (1 !== this.__CE_state) return Ie.call(this, b, c)
      var d = Ge.call(this, b, c)
      Ie.call(this, b, c)
      var e = Ge.call(this, b, c)
      d !== e && a.attributeChangedCallback(this, c, d, e, b)
    })
    Te
      ? c(HTMLElement.prototype, Te)
      : Je
        ? c(Element.prototype, Je)
        : console.warn(
            'Custom Elements: `Element#insertAdjacentElement` was not patched.'
          )
    Ue
      ? d(HTMLElement.prototype, Ue)
      : Ke
        ? d(Element.prototype, Ke)
        : console.warn(
            'Custom Elements: `Element#insertAdjacentHTML` was not patched.'
          )
    Ye(a, Element.prototype, { $: Le, append: Me })
    af(a)
  }
  var cf = window.customElements
  if (
    !cf ||
    cf.forcePolyfill ||
    'function' != typeof cf.define ||
    'function' != typeof cf.get
  ) {
    var Xe = new ge()
    We()
    Ze()
    Ye(Xe, DocumentFragment.prototype, { $: te, append: ue })
    $e()
    bf()
    document.__CE_hasRegistry = !0
    var customElements = new T(Xe)
    Object.defineProperty(window, 'customElements', {
      configurable: !0,
      enumerable: !0,
      value: customElements
    })
  }
  function df() {
    this.end = this.start = 0
    this.rules = this.parent = this.previous = null
    this.cssText = this.parsedCssText = ''
    this.atRule = !1
    this.type = 0
    this.parsedSelector = this.selector = this.keyframesName = ''
  }
  function ef(a) {
    a = a.replace(ff, '').replace(gf, '')
    var b = kf,
      c = a,
      d = new df()
    d.start = 0
    d.end = c.length
    for (var e = d, f = 0, h = c.length; f < h; f++)
      if ('{' === c[f]) {
        e.rules || (e.rules = [])
        var g = e,
          k = g.rules[g.rules.length - 1] || null
        e = new df()
        e.start = f + 1
        e.parent = g
        e.previous = k
        g.rules.push(e)
      } else '}' === c[f] && ((e.end = f + 1), (e = e.parent || d))
    return b(d, a)
  }
  function kf(a, b) {
    var c = b.substring(a.start, a.end - 1)
    a.parsedCssText = a.cssText = c.trim()
    a.parent &&
      ((c = b.substring(
        a.previous ? a.previous.end : a.parent.start,
        a.start - 1
      )),
      (c = lf(c)),
      (c = c.replace(mf, ' ')),
      (c = c.substring(c.lastIndexOf(';') + 1)),
      (c = a.parsedSelector = a.selector = c.trim()),
      (a.atRule = 0 === c.indexOf('@')),
      a.atRule
        ? 0 === c.indexOf('@media')
          ? (a.type = nf)
          : c.match(of) &&
            ((a.type = pf), (a.keyframesName = a.selector.split(mf).pop()))
        : (a.type = 0 === c.indexOf('--') ? qf : rf))
    if ((c = a.rules))
      for (var d = 0, e = c.length, f; d < e && (f = c[d]); d++) kf(f, b)
    return a
  }
  function lf(a) {
    return a.replace(/\\([0-9a-f]{1,6})\s/gi, function(a, c) {
      a = c
      for (c = 6 - a.length; c--; ) a = '0' + a
      return '\\' + a
    })
  }
  function sf(a, b, c) {
    c = void 0 === c ? '' : c
    var d = ''
    if (a.cssText || a.rules) {
      var e = a.rules,
        f
      if ((f = e))
        (f = e[0]), (f = !(f && f.selector && 0 === f.selector.indexOf('--')))
      if (f) {
        f = 0
        for (var h = e.length, g; f < h && (g = e[f]); f++) d = sf(g, b, d)
      } else
        b
          ? (b = a.cssText)
          : ((b = a.cssText),
            (b = b.replace(tf, '').replace(uf, '')),
            (b = b.replace(vf, '').replace(wf, ''))),
          (d = b.trim()) && (d = '  ' + d + '\n')
    }
    d &&
      (a.selector && (c += a.selector + ' {\n'),
      (c += d),
      a.selector && (c += '}\n\n'))
    return c
  }
  var rf = 1,
    pf = 7,
    nf = 4,
    qf = 1e3,
    ff = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
    gf = /@import[^;]*;/gim,
    tf = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
    uf = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
    vf = /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
    wf = /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
    of = /^@[^\s]*keyframes/,
    mf = /\s+/g
  var U = !(window.ShadyDOM && window.ShadyDOM.inUse),
    xf
  function yf(a) {
    xf =
      a && a.shimcssproperties
        ? !1
        : U ||
          !(
            navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) ||
            !window.CSS ||
            !CSS.supports ||
            !CSS.supports('box-shadow', '0 0 0 var(--foo)')
          )
  }
  window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss
    ? (xf = window.ShadyCSS.nativeCss)
    : window.ShadyCSS
      ? (yf(window.ShadyCSS), (window.ShadyCSS = void 0))
      : yf(window.WebComponents && window.WebComponents.flags)
  var V = xf
  var zf = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
    Af = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,
    Bf = /(--[\w-]+)\s*([:,;)]|$)/gi,
    Cf = /(animation\s*:)|(animation-name\s*:)/,
    Df = /@media\s(.*)/,
    Ef = /\{[^}]*\}/g
  var Ff = new Set()
  function Gf(a, b) {
    if (!a) return ''
    'string' === typeof a && (a = ef(a))
    b && Hf(a, b)
    return sf(a, V)
  }
  function If(a) {
    !a.__cssRules && a.textContent && (a.__cssRules = ef(a.textContent))
    return a.__cssRules || null
  }
  function Jf(a) {
    return !!a.parent && a.parent.type === pf
  }
  function Hf(a, b, c, d) {
    if (a) {
      var e = !1,
        f = a.type
      if (d && f === nf) {
        var h = a.selector.match(Df)
        h && (window.matchMedia(h[1]).matches || (e = !0))
      }
      f === rf ? b(a) : c && f === pf ? c(a) : f === qf && (e = !0)
      if ((a = a.rules) && !e) {
        e = 0
        f = a.length
        for (var g; e < f && (g = a[e]); e++) Hf(g, b, c, d)
      }
    }
  }
  function Kf(a, b, c, d) {
    var e = document.createElement('style')
    b && e.setAttribute('scope', b)
    e.textContent = a
    Lf(e, c, d)
    return e
  }
  var Mf = null
  function Lf(a, b, c) {
    b = b || document.head
    b.insertBefore(a, (c && c.nextSibling) || b.firstChild)
    Mf
      ? a.compareDocumentPosition(Mf) === Node.DOCUMENT_POSITION_PRECEDING &&
        (Mf = a)
      : (Mf = a)
  }
  function Nf(a, b) {
    var c = a.indexOf('var(')
    if (-1 === c) return b(a, '', '', '')
    a: {
      var d = 0
      var e = c + 3
      for (var f = a.length; e < f; e++)
        if ('(' === a[e]) d++
        else if (')' === a[e] && 0 === --d) break a
      e = -1
    }
    d = a.substring(c + 4, e)
    c = a.substring(0, c)
    a = Nf(a.substring(e + 1), b)
    e = d.indexOf(',')
    return -1 === e
      ? b(c, d.trim(), '', a)
      : b(c, d.substring(0, e).trim(), d.substring(e + 1).trim(), a)
  }
  function Of(a, b) {
    U
      ? a.setAttribute('class', b)
      : window.ShadyDOM.nativeMethods.setAttribute.call(a, 'class', b)
  }
  function Pf(a) {
    var b = a.localName,
      c = ''
    b
      ? -1 < b.indexOf('-') ||
        ((c = b), (b = (a.getAttribute && a.getAttribute('is')) || ''))
      : ((b = a.is), (c = a.extends))
    return { is: b, R: c }
  }
  function Qf() {}
  function Rf(a, b, c) {
    var d = W
    a.__styleScoped ? (a.__styleScoped = null) : Sf(d, a, b || '', c)
  }
  function Sf(a, b, c, d) {
    b.nodeType === Node.ELEMENT_NODE && Tf(b, c, d)
    if (
      (b =
        'template' === b.localName
          ? (b.content || b.kb).childNodes
          : b.children || b.childNodes)
    )
      for (var e = 0; e < b.length; e++) Sf(a, b[e], c, d)
  }
  function Tf(a, b, c) {
    if (b)
      if (a.classList)
        c
          ? (a.classList.remove('style-scope'), a.classList.remove(b))
          : (a.classList.add('style-scope'), a.classList.add(b))
      else if (a.getAttribute) {
        var d = a.getAttribute(Uf)
        c
          ? d && ((b = d.replace('style-scope', '').replace(b, '')), Of(a, b))
          : Of(a, (d ? d + ' ' : '') + 'style-scope ' + b)
      }
  }
  function Vf(a, b, c) {
    var d = W,
      e = a.__cssBuild
    U || 'shady' === e
      ? (b = Gf(b, c))
      : ((a = Pf(a)), (b = Wf(d, b, a.is, a.R, c) + '\n\n'))
    return b.trim()
  }
  function Wf(a, b, c, d, e) {
    var f = Xf(c, d)
    c = c ? Yf + c : ''
    return Gf(b, function(b) {
      b.c || ((b.selector = b.o = Zf(a, b, a.b, c, f)), (b.c = !0))
      e && e(b, c, f)
    })
  }
  function Xf(a, b) {
    return b ? '[is=' + a + ']' : a
  }
  function Zf(a, b, c, d, e) {
    var f = b.selector.split($f)
    if (!Jf(b)) {
      b = 0
      for (var h = f.length, g; b < h && (g = f[b]); b++)
        f[b] = c.call(a, g, d, e)
    }
    return f.join($f)
  }
  function ag(a) {
    return a.replace(bg, function(a, c, d) {
      ;-1 < d.indexOf('+')
        ? (d = d.replace(/\+/g, '___'))
        : -1 < d.indexOf('___') && (d = d.replace(/___/g, '+'))
      return ':' + c + '(' + d + ')'
    })
  }
  Qf.prototype.b = function(a, b, c) {
    var d = !1
    a = a.trim()
    var e = bg.test(a)
    e &&
      ((a = a.replace(bg, function(a, b, c) {
        return ':' + b + '(' + c.replace(/\s/g, '') + ')'
      })),
      (a = ag(a)))
    a = a.replace(cg, dg + ' $1')
    a = a.replace(eg, function(a, e, g) {
      d || ((a = fg(g, e, b, c)), (d = d || a.stop), (e = a.Oa), (g = a.value))
      return e + g
    })
    e && (a = ag(a))
    return a
  }
  function fg(a, b, c, d) {
    var e = a.indexOf(gg)
    0 <= a.indexOf(dg) ? (a = hg(a, d)) : 0 !== e && (a = c ? ig(a, c) : a)
    c = !1
    0 <= e && ((b = ''), (c = !0))
    if (c) {
      var f = !0
      c &&
        (a = a.replace(jg, function(a, b) {
          return ' > ' + b
        }))
    }
    a = a.replace(kg, function(a, b, c) {
      return '[dir="' + c + '"] ' + b + ', ' + b + '[dir="' + c + '"]'
    })
    return { value: a, Oa: b, stop: f }
  }
  function ig(a, b) {
    a = a.split(lg)
    a[0] += b
    return a.join(lg)
  }
  function hg(a, b) {
    var c = a.match(mg)
    return (c = (c && c[2].trim()) || '')
      ? c[0].match(ng)
        ? a.replace(mg, function(a, c, f) {
            return b + f
          })
        : c.split(ng)[0] === b
          ? c
          : og
      : a.replace(dg, b)
  }
  function pg(a) {
    a.selector === qg && (a.selector = 'html')
  }
  Qf.prototype.c = function(a) {
    return a.match(gg) ? this.b(a, rg) : ig(a.trim(), rg)
  }
  q.Object.defineProperties(Qf.prototype, {
    a: {
      configurable: !0,
      enumerable: !0,
      get: function() {
        return 'style-scope'
      }
    }
  })
  var bg = /:(nth[-\w]+)\(([^)]+)\)/,
    rg = ':not(.style-scope)',
    $f = ',',
    eg = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g,
    ng = /[[.:#*]/,
    dg = ':host',
    qg = ':root',
    gg = '::slotted',
    cg = new RegExp('^(' + gg + ')'),
    mg = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
    jg = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
    kg = /(.*):dir\((?:(ltr|rtl))\)/,
    Yf = '.',
    lg = ':',
    Uf = 'class',
    og = 'should_not_match',
    W = new Qf()
  function sg(a, b, c, d) {
    this.B = a || null
    this.b = b || null
    this.na = c || []
    this.K = null
    this.R = d || ''
    this.a = this.u = this.F = null
  }
  function X(a) {
    return a ? a.__styleInfo : null
  }
  function tg(a, b) {
    return (a.__styleInfo = b)
  }
  sg.prototype.c = function() {
    return this.B
  }
  sg.prototype._getStyleRules = sg.prototype.c
  function ug(a) {
    var b =
      this.matches ||
      this.matchesSelector ||
      this.mozMatchesSelector ||
      this.msMatchesSelector ||
      this.oMatchesSelector ||
      this.webkitMatchesSelector
    return b && b.call(this, a)
  }
  var vg = navigator.userAgent.match('Trident')
  function wg() {}
  function xg(a) {
    var b = {},
      c = [],
      d = 0
    Hf(
      a,
      function(a) {
        yg(a)
        a.index = d++
        a = a.m.cssText
        for (var c; (c = Bf.exec(a)); ) {
          var e = c[1]
          ':' !== c[2] && (b[e] = !0)
        }
      },
      function(a) {
        c.push(a)
      }
    )
    a.b = c
    a = []
    for (var e in b) a.push(e)
    return a
  }
  function yg(a) {
    if (!a.m) {
      var b = {},
        c = {}
      zg(a, c) && ((b.A = c), (a.rules = null))
      b.cssText = a.parsedCssText.replace(Ef, '').replace(zf, '')
      a.m = b
    }
  }
  function zg(a, b) {
    var c = a.m
    if (c) {
      if (c.A) return Object.assign(b, c.A), !0
    } else {
      c = a.parsedCssText
      for (var d; (a = zf.exec(c)); ) {
        d = (a[2] || a[3]).trim()
        if ('inherit' !== d || 'unset' !== d) b[a[1].trim()] = d
        d = !0
      }
      return d
    }
  }
  function Ag(a, b, c) {
    b &&
      (b =
        0 <= b.indexOf(';')
          ? Bg(a, b, c)
          : Nf(b, function(b, e, f, h) {
              if (!e) return b + h
              ;(e = Ag(a, c[e], c)) && 'initial' !== e
                ? 'apply-shim-inherit' === e && (e = 'inherit')
                : (e = Ag(a, c[f] || f, c) || f)
              return b + (e || '') + h
            }))
    return (b && b.trim()) || ''
  }
  function Bg(a, b, c) {
    b = b.split(';')
    for (var d = 0, e, f; d < b.length; d++)
      if ((e = b[d])) {
        Af.lastIndex = 0
        if ((f = Af.exec(e))) e = Ag(a, c[f[1]], c)
        else if (((f = e.indexOf(':')), -1 !== f)) {
          var h = e.substring(f)
          h = h.trim()
          h = Ag(a, h, c) || h
          e = e.substring(0, f) + h
        }
        b[d] =
          e && e.lastIndexOf(';') === e.length - 1 ? e.slice(0, -1) : e || ''
      }
    return b.join(';')
  }
  function Cg(a, b) {
    var c = {},
      d = []
    Hf(
      a,
      function(a) {
        a.m || yg(a)
        var e = a.o || a.parsedSelector
        b &&
          a.m.A &&
          e &&
          ug.call(b, e) &&
          (zg(a, c),
          (a = a.index),
          (e = parseInt(a / 32, 10)),
          (d[e] = (d[e] || 0) | (1 << (a % 32))))
      },
      null,
      !0
    )
    return { A: c, key: d }
  }
  function Dg(a, b, c, d) {
    b.m || yg(b)
    if (b.m.A) {
      var e = Pf(a)
      a = e.is
      e = e.R
      e = a ? Xf(a, e) : 'html'
      var f = b.parsedSelector,
        h = ':host > *' === f || 'html' === f,
        g = 0 === f.indexOf(':host') && !h
      'shady' === c &&
        ((h = f === e + ' > *.' + e || -1 !== f.indexOf('html')),
        (g = !h && 0 === f.indexOf(e)))
      'shadow' === c && ((h = ':host > *' === f || 'html' === f), (g = g && !h))
      if (h || g)
        (c = e),
          g &&
            (b.o || (b.o = Zf(W, b, W.b, a ? Yf + a : '', e)), (c = b.o || e)),
          d({ ab: c, Ua: g, tb: h })
    }
  }
  function Eg(a, b) {
    var c = {},
      d = {},
      e = b && b.__cssBuild
    Hf(
      b,
      function(b) {
        Dg(a, b, e, function(e) {
          ug.call(a.b || a, e.ab) && (e.Ua ? zg(b, c) : zg(b, d))
        })
      },
      null,
      !0
    )
    return { $a: d, Sa: c }
  }
  function Fg(a, b, c, d) {
    var e = Pf(b),
      f = Xf(e.is, e.R),
      h = new RegExp(
        '(?:^|[^.#[:])' +
          (b.extends ? '\\' + f.slice(0, -1) + '\\]' : f) +
          '($|[.:[\\s>+~])'
      )
    e = X(b).B
    var g = Gg(e, d)
    return Vf(b, e, function(b) {
      var e = ''
      b.m || yg(b)
      b.m.cssText && (e = Bg(a, b.m.cssText, c))
      b.cssText = e
      if (!U && !Jf(b) && b.cssText) {
        var k = (e = b.cssText)
        null == b.ua && (b.ua = Cf.test(e))
        if (b.ua)
          if (null == b.Z) {
            b.Z = []
            for (var n in g)
              (k = g[n]), (k = k(e)), e !== k && ((e = k), b.Z.push(n))
          } else {
            for (n = 0; n < b.Z.length; ++n) (k = g[b.Z[n]]), (e = k(e))
            k = e
          }
        b.cssText = k
        b.o = b.o || b.selector
        e = '.' + d
        n = b.o.split(',')
        k = 0
        for (var t = n.length, C; k < t && (C = n[k]); k++)
          n[k] = C.match(h) ? C.replace(f, e) : e + ' ' + C
        b.selector = n.join(',')
      }
    })
  }
  function Gg(a, b) {
    a = a.b
    var c = {}
    if (!U && a)
      for (var d = 0, e = a[d]; d < a.length; e = a[++d]) {
        var f = e,
          h = b
        f.i = new RegExp('\\b' + f.keyframesName + '(?!\\B|-)', 'g')
        f.a = f.keyframesName + '-' + h
        f.o = f.o || f.selector
        f.selector = f.o.replace(f.keyframesName, f.a)
        c[e.keyframesName] = Hg(e)
      }
    return c
  }
  function Hg(a) {
    return function(b) {
      return b.replace(a.i, a.a)
    }
  }
  function Ig(a, b) {
    var c = Jg,
      d = If(a)
    a.textContent = Gf(d, function(a) {
      var d = (a.cssText = a.parsedCssText)
      a.m &&
        a.m.cssText &&
        ((d = d.replace(tf, '').replace(uf, '')), (a.cssText = Bg(c, d, b)))
    })
  }
  q.Object.defineProperties(wg.prototype, {
    a: {
      configurable: !0,
      enumerable: !0,
      get: function() {
        return 'x-scope'
      }
    }
  })
  var Jg = new wg()
  var Kg = {},
    Lg = window.customElements
  if (Lg && !U) {
    var Mg = Lg.define
    Lg.define = function(a, b, c) {
      var d = document.createComment(' Shady DOM styles for ' + a + ' '),
        e = document.head
      e.insertBefore(d, (Mf ? Mf.nextSibling : null) || e.firstChild)
      Mf = d
      Kg[a] = d
      Mg.call(Lg, a, b, c)
    }
  }
  function Ng() {
    this.cache = {}
  }
  Ng.prototype.store = function(a, b, c, d) {
    var e = this.cache[a] || []
    e.push({ A: b, styleElement: c, u: d })
    100 < e.length && e.shift()
    this.cache[a] = e
  }
  Ng.prototype.fetch = function(a, b, c) {
    if ((a = this.cache[a]))
      for (var d = a.length - 1; 0 <= d; d--) {
        var e = a[d],
          f
        a: {
          for (f = 0; f < c.length; f++) {
            var h = c[f]
            if (e.A[h] !== b[h]) {
              f = !1
              break a
            }
          }
          f = !0
        }
        if (f) return e
      }
  }
  function Og() {}
  function Pg(a) {
    for (var b = 0; b < a.length; b++) {
      var c = a[b]
      if (c.target !== document.documentElement && c.target !== document.head)
        for (var d = 0; d < c.addedNodes.length; d++) {
          var e = c.addedNodes[d]
          if (e.nodeType === Node.ELEMENT_NODE) {
            var f = e.getRootNode()
            var h = e
            var g = []
            h.classList
              ? (g = Array.from(h.classList))
              : h instanceof window.SVGElement &&
                h.hasAttribute('class') &&
                (g = h.getAttribute('class').split(/\s+/))
            h = g
            g = h.indexOf(W.a)
            if ((h = -1 < g ? h[g + 1] : '') && f === e.ownerDocument)
              Rf(e, h, !0)
            else if (f.nodeType === Node.DOCUMENT_FRAGMENT_NODE && (f = f.host))
              if (((f = Pf(f).is), h === f))
                for (
                  e = window.ShadyDOM.nativeMethods.querySelectorAll.call(
                    e,
                    ':not(.' + W.a + ')'
                  ),
                    f = 0;
                  f < e.length;
                  f++
                )
                  Tf(e[f], h)
              else h && Rf(e, h, !0), Rf(e, f)
          }
        }
    }
  }
  if (!U) {
    var Qg = new MutationObserver(Pg),
      Rg = function(a) {
        Qg.observe(a, { childList: !0, subtree: !0 })
      }
    if (
      window.customElements &&
      !window.customElements.polyfillWrapFlushCallback
    )
      Rg(document)
    else {
      var Sg = function() {
        Rg(document.body)
      }
      window.HTMLImports
        ? window.HTMLImports.whenReady(Sg)
        : requestAnimationFrame(function() {
            if ('loading' === document.readyState) {
              var a = function() {
                Sg()
                document.removeEventListener('readystatechange', a)
              }
              document.addEventListener('readystatechange', a)
            } else Sg()
          })
    }
    Og = function() {
      Pg(Qg.takeRecords())
    }
  }
  var Tg = Og
  var Ug = {}
  var Vg = Promise.resolve()
  function Wg(a) {
    if ((a = Ug[a]))
      (a._applyShimCurrentVersion = a._applyShimCurrentVersion || 0),
        (a._applyShimValidatingVersion = a._applyShimValidatingVersion || 0),
        (a._applyShimNextVersion = (a._applyShimNextVersion || 0) + 1)
  }
  function Xg(a) {
    return a._applyShimCurrentVersion === a._applyShimNextVersion
  }
  function Yg(a) {
    a._applyShimValidatingVersion = a._applyShimNextVersion
    a.ta ||
      ((a.ta = !0),
      Vg.then(function() {
        a._applyShimCurrentVersion = a._applyShimNextVersion
        a.ta = !1
      }))
  }
  var Zg = null,
    $g = (window.HTMLImports && window.HTMLImports.whenReady) || null,
    ah
  function bh(a) {
    requestAnimationFrame(function() {
      $g
        ? $g(a)
        : (Zg ||
            ((Zg = new Promise(function(a) {
              ah = a
            })),
            'complete' === document.readyState
              ? ah()
              : document.addEventListener('readystatechange', function() {
                  'complete' === document.readyState && ah()
                })),
          Zg.then(function() {
            a && a()
          }))
    })
  }
  var ch = new Ng()
  function Y() {
    var a = this
    this.N = {}
    this.c = document.documentElement
    var b = new df()
    b.rules = []
    this.i = tg(this.c, new sg(b))
    this.s = !1
    this.b = this.a = null
    bh(function() {
      dh(a)
    })
  }
  p = Y.prototype
  p.Ca = function() {
    Tg()
  }
  p.Qa = function(a) {
    return If(a)
  }
  p.cb = function(a) {
    return Gf(a)
  }
  p.prepareTemplate = function(a, b, c) {
    if (!a.Ma) {
      a.Ma = !0
      a.name = b
      a.extends = c
      Ug[b] = a
      var d = (d = a.content.querySelector('style'))
        ? d.getAttribute('css-build') || ''
        : ''
      var e = []
      for (
        var f = a.content.querySelectorAll('style'), h = 0;
        h < f.length;
        h++
      ) {
        var g = f[h]
        if (g.hasAttribute('shady-unscoped')) {
          if (!U) {
            var k = g.textContent
            Ff.has(k) ||
              (Ff.add(k), (k = g.cloneNode(!0)), document.head.appendChild(k))
            g.parentNode.removeChild(g)
          }
        } else e.push(g.textContent), g.parentNode.removeChild(g)
      }
      e = e.join('').trim()
      c = {
        is: b,
        extends: c,
        ib: d
      }
      U || Rf(a.content, b)
      dh(this)
      f = Af.test(e) || zf.test(e)
      Af.lastIndex = 0
      zf.lastIndex = 0
      e = ef(e)
      f && V && this.a && this.a.transformRules(e, b)
      a._styleAst = e
      a.a = d
      d = []
      V || (d = xg(a._styleAst))
      if (!d.length || V)
        (e = U ? a.content : null),
          (b = Kg[b]),
          (f = Vf(c, a._styleAst)),
          (b = f.length ? Kf(f, c.is, e, b) : void 0),
          (a.sa = b)
      a.La = d
    }
  }
  function eh(a) {
    !a.b &&
      window.ShadyCSS &&
      window.ShadyCSS.CustomStyleInterface &&
      ((a.b = window.ShadyCSS.CustomStyleInterface),
      (a.b.transformCallback = function(b) {
        a.za(b)
      }),
      (a.b.validateCallback = function() {
        requestAnimationFrame(function() {
          ;(a.b.enqueued || a.s) && a.I()
        })
      }))
  }
  function dh(a) {
    !a.a &&
      window.ShadyCSS &&
      window.ShadyCSS.ApplyShim &&
      ((a.a = window.ShadyCSS.ApplyShim), (a.a.invalidCallback = Wg))
    eh(a)
  }
  p.I = function() {
    dh(this)
    if (this.b) {
      var a = this.b.processStyles()
      if (this.b.enqueued) {
        if (V)
          for (var b = 0; b < a.length; b++) {
            var c = this.b.getStyleForCustomStyle(a[b])
            if (c && V && this.a) {
              var d = If(c)
              dh(this)
              this.a.transformRules(d)
              c.textContent = Gf(d)
            }
          }
        else
          for (fh(this, this.c, this.i), b = 0; b < a.length; b++)
            (c = this.b.getStyleForCustomStyle(a[b])) && Ig(c, this.i.F)
        this.b.enqueued = !1
        this.s && !V && this.styleDocument()
      }
    }
  }
  p.styleElement = function(a, b) {
    var c = Pf(a).is,
      d = X(a)
    if (!d) {
      var e = Pf(a)
      d = e.is
      e = e.R
      var f = Kg[d]
      d = Ug[d]
      if (d) {
        var h = d._styleAst
        var g = d.La
      }
      d = tg(a, new sg(h, f, g, e))
    }
    a !== this.c && (this.s = !0)
    b && ((d.K = d.K || {}), Object.assign(d.K, b))
    if (V) {
      if (d.K) {
        b = d.K
        for (var k in b)
          null === k ? a.style.removeProperty(k) : a.style.setProperty(k, b[k])
      }
      if (((k = Ug[c]) || a === this.c) && k && k.sa && !Xg(k)) {
        if (Xg(k) || k._applyShimValidatingVersion !== k._applyShimNextVersion)
          dh(this),
            this.a && this.a.transformRules(k._styleAst, c),
            (k.sa.textContent = Vf(a, d.B)),
            Yg(k)
        U &&
          (c = a.shadowRoot) &&
          (c.querySelector('style').textContent = Vf(a, d.B))
        d.B = k._styleAst
      }
    } else if ((fh(this, a, d), d.na && d.na.length)) {
      c = d
      k = Pf(a).is
      d = (b = ch.fetch(k, c.F, c.na)) ? b.styleElement : null
      h = c.u
      ;(g = b && b.u) ||
        ((g = this.N[k] = (this.N[k] || 0) + 1), (g = k + '-' + g))
      c.u = g
      g = c.u
      e = Jg
      e = d ? d.textContent || '' : Fg(e, a, c.F, g)
      f = X(a)
      var l = f.a
      l &&
        !U &&
        l !== d &&
        (l._useCount--,
        0 >= l._useCount && l.parentNode && l.parentNode.removeChild(l))
      U
        ? f.a
          ? ((f.a.textContent = e), (d = f.a))
          : e && (d = Kf(e, g, a.shadowRoot, f.b))
        : d
          ? d.parentNode ||
            (vg && -1 < e.indexOf('@media') && (d.textContent = e),
            Lf(d, null, f.b))
          : e && (d = Kf(e, g, null, f.b))
      d &&
        ((d._useCount = d._useCount || 0), f.a != d && d._useCount++, (f.a = d))
      g = d
      U ||
        ((d = c.u),
        (f = e = a.getAttribute('class') || ''),
        h &&
          (f = e.replace(new RegExp('\\s*x-scope\\s*' + h + '\\s*', 'g'), ' ')),
        (f += (f ? ' ' : '') + 'x-scope ' + d),
        e !== f && Of(a, f))
      b || ch.store(k, c.F, g, c.u)
    }
  }
  function gh(a, b) {
    return (b = b.getRootNode().host) ? (X(b) ? b : gh(a, b)) : a.c
  }
  function fh(a, b, c) {
    a = gh(a, b)
    var d = X(a)
    a = Object.create(d.F || null)
    var e = Eg(b, c.B)
    b = Cg(d.B, b).A
    Object.assign(a, e.Sa, b, e.$a)
    b = c.K
    for (var f in b) if ((e = b[f]) || 0 === e) a[f] = e
    f = Jg
    b = Object.getOwnPropertyNames(a)
    for (e = 0; e < b.length; e++) (d = b[e]), (a[d] = Ag(f, a[d], a))
    c.F = a
  }
  p.styleDocument = function(a) {
    this.styleSubtree(this.c, a)
  }
  p.styleSubtree = function(a, b) {
    var c = a.shadowRoot
    ;(c || a === this.c) && this.styleElement(a, b)
    if ((b = c && (c.children || c.childNodes)))
      for (a = 0; a < b.length; a++) this.styleSubtree(b[a])
    else if ((a = a.children || a.childNodes))
      for (b = 0; b < a.length; b++) this.styleSubtree(a[b])
  }
  p.za = function(a) {
    var b = this,
      c = If(a)
    Hf(c, function(a) {
      if (U) pg(a)
      else {
        var c = W
        a.selector = a.parsedSelector
        pg(a)
        a.selector = a.o = Zf(c, a, c.c, void 0, void 0)
      }
      V && (dh(b), b.a && b.a.transformRule(a))
    })
    V ? (a.textContent = Gf(c)) : this.i.B.rules.push(c)
  }
  p.getComputedStyleValue = function(a, b) {
    var c
    V || (c = (X(a) || X(gh(this, a))).F[b])
    return (c = c || window.getComputedStyle(a).getPropertyValue(b))
      ? c.trim()
      : ''
  }
  p.bb = function(a, b) {
    var c = a.getRootNode()
    b = b ? b.split(/\s/) : []
    c = c.host && c.host.localName
    if (!c) {
      var d = a.getAttribute('class')
      if (d) {
        d = d.split(/\s/)
        for (var e = 0; e < d.length; e++)
          if (d[e] === W.a) {
            c = d[e + 1]
            break
          }
      }
    }
    c && b.push(W.a, c)
    V || ((c = X(a)) && c.u && b.push(Jg.a, c.u))
    Of(a, b.join(' '))
  }
  p.Na = function(a) {
    return X(a)
  }
  Y.prototype.flush = Y.prototype.Ca
  Y.prototype.prepareTemplate = Y.prototype.prepareTemplate
  Y.prototype.styleElement = Y.prototype.styleElement
  Y.prototype.styleDocument = Y.prototype.styleDocument
  Y.prototype.styleSubtree = Y.prototype.styleSubtree
  Y.prototype.getComputedStyleValue = Y.prototype.getComputedStyleValue
  Y.prototype.setElementClass = Y.prototype.bb
  Y.prototype._styleInfoForNode = Y.prototype.Na
  Y.prototype.transformCustomStyleForDocument = Y.prototype.za
  Y.prototype.getStyleAst = Y.prototype.Qa
  Y.prototype.styleAstToString = Y.prototype.cb
  Y.prototype.flushCustomStyles = Y.prototype.I
  Object.defineProperties(Y.prototype, {
    nativeShadow: {
      get: function() {
        return U
      }
    },
    nativeCss: {
      get: function() {
        return V
      }
    }
  })
  var Z = new Y(),
    hh,
    ih
  window.ShadyCSS &&
    ((hh = window.ShadyCSS.ApplyShim),
    (ih = window.ShadyCSS.CustomStyleInterface))
  window.ShadyCSS = {
    ScopingShim: Z,
    prepareTemplate: function(a, b, c) {
      Z.I()
      Z.prepareTemplate(a, b, c)
    },
    styleSubtree: function(a, b) {
      Z.I()
      Z.styleSubtree(a, b)
    },
    styleElement: function(a) {
      Z.I()
      Z.styleElement(a)
    },
    styleDocument: function(a) {
      Z.I()
      Z.styleDocument(a)
    },
    getComputedStyleValue: function(a, b) {
      return Z.getComputedStyleValue(a, b)
    },
    nativeCss: V,
    nativeShadow: U
  }
  hh && (window.ShadyCSS.ApplyShim = hh)
  ih && (window.ShadyCSS.CustomStyleInterface = ih)
  var jh = window.customElements,
    kh = window.HTMLImports,
    lh = window.HTMLTemplateElement
  window.WebComponents = window.WebComponents || {}
  if (jh && jh.polyfillWrapFlushCallback) {
    var mh,
      nh = function() {
        if (mh) {
          lh.M && lh.M(window.document)
          var a = mh
          mh = null
          a()
          return !0
        }
      },
      oh = kh.whenReady
    jh.polyfillWrapFlushCallback(function(a) {
      mh = a
      oh(nh)
    })
    kh.whenReady = function(a) {
      oh(function() {
        nh() ? kh.whenReady(a) : a()
      })
    }
  }
  kh.whenReady(function() {
    requestAnimationFrame(function() {
      window.WebComponents.ready = !0
      document.dispatchEvent(
        new CustomEvent('WebComponentsReady', { bubbles: !0 })
      )
    })
  })
  var ph = document.createElement('style')
  ph.textContent =
    'body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n'
  var qh = document.querySelector('head')
  qh.insertBefore(ph, qh.firstChild)
}.call(this))

//# sourceMappingURL=webcomponents-lite.js.map
