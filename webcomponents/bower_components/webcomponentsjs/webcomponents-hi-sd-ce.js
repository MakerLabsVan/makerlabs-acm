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
  var n,
    q =
      'undefined' != typeof window && window === this
        ? this
        : 'undefined' != typeof global && null != global
          ? global
          : this,
    ba =
      'function' == typeof Object.defineProperties
        ? Object.defineProperty
        : function(a, b, c) {
            a != Array.prototype && a != Object.prototype && (a[b] = c.value)
          }
  function ca() {
    ca = function() {}
    q.Symbol || (q.Symbol = da)
  }
  var da = (function() {
    var a = 0
    return function(b) {
      return 'jscomp_symbol_' + (b || '') + a++
    }
  })()
  function ea() {
    ca()
    var a = q.Symbol.iterator
    a || (a = q.Symbol.iterator = q.Symbol('iterator'))
    'function' != typeof Array.prototype[a] &&
      ba(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function() {
          return fa(this)
        }
      })
    ea = function() {}
  }
  function fa(a) {
    var b = 0
    return ha(function() {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 }
    })
  }
  function ha(a) {
    ea()
    a = { next: a }
    a[q.Symbol.iterator] = function() {
      return this
    }
    return a
  }
  function ia(a) {
    ea()
    var b = a[Symbol.iterator]
    return b ? b.call(a) : fa(a)
  }
  function ka(a) {
    for (var b, c = []; !(b = a.next()).done; ) c.push(b.value)
    return c
  }
  ;(function(a) {
    function b(a, b) {
      if ('function' === typeof window.CustomEvent) return new CustomEvent(a, b)
      var c = document.createEvent('CustomEvent')
      c.initCustomEvent(a, !!b.bubbles, !!b.cancelable, b.detail)
      return c
    }
    function c(a) {
      if (E) return a.ownerDocument !== document ? a.ownerDocument : null
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
        ? p(b, function(b) {
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
        ;(Pa && 'style' === a.localName) || a.addEventListener('error', c)
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
        return a.Ka(b)
      })
      this.c.observe(document.head, { childList: !0, subtree: !0 })
      this.loadImports(document)
    }
    function l(a) {
      p(m(a, 'template'), function(a) {
        p(
          m(
            a.content,
            'script:not([type]),script[type="application/javascript"],script[type="text/javascript"]'
          ),
          function(a) {
            var b = document.createElement('script')
            p(a.attributes, function(a) {
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
    function p(a, b, c) {
      var d = a ? a.length : 0,
        e = c ? -1 : 1
      for (c = c ? d - 1 : 0; c < d && 0 <= c; c += e) b(a[c], c)
    }
    var z = document.createElement('link'),
      E = 'import' in z,
      aa = z.querySelectorAll('*'),
      Qa = null
    !1 === 'currentScript' in document &&
      Object.defineProperty(document, 'currentScript', {
        get: function() {
          return (
            Qa ||
            ('complete' !== document.readyState
              ? document.scripts[document.scripts.length - 1]
              : null)
          )
        },
        configurable: !0
      })
    var ke = /(url\()([^)]*)(\))/g,
      le = /(@import[\s]+(?!url\())([^;]*)(;)/g,
      me = /(<link[^>]*)(rel=['|"]?stylesheet['|"]?[^>]*>)/g,
      H = {
        Ea: function(a, b) {
          a.href && a.setAttribute('href', H.U(a.getAttribute('href'), b))
          a.src && a.setAttribute('src', H.U(a.getAttribute('src'), b))
          if ('style' === a.localName) {
            var c = H.oa(a.textContent, b, ke)
            a.textContent = H.oa(c, b, le)
          }
        },
        oa: function(a, b, c) {
          return a.replace(c, function(a, c, d, e) {
            a = d.replace(/["']/g, '')
            b && (a = H.U(a, b))
            return c + "'" + a + "'" + e
          })
        },
        U: function(a, b) {
          if (void 0 === H.$) {
            H.$ = !1
            try {
              var c = new URL('b', 'http://a')
              c.pathname = 'c%20d'
              H.$ = 'http://a/c%20d' === c.href
            } catch (gg) {}
          }
          if (H.$) return new URL(a, b).href
          c = H.va
          c ||
            ((c = document.implementation.createHTMLDocument('temp')),
            (H.va = c),
            (c.ha = c.createElement('base')),
            c.head.appendChild(c.ha),
            (c.ga = c.createElement('a')))
          c.ha.href = b
          c.ga.href = a
          return c.ga.href || a
        }
      },
      Xb = {
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
              e.open('GET', a, Xb.async)
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
      Pa =
        /Trident/.test(navigator.userAgent) ||
        /Edge\/\d./i.test(navigator.userAgent)
    k.prototype.loadImports = function(a) {
      var b = this
      a = m(a, 'link[rel=import]')
      p(a, function(a) {
        return b.m(a)
      })
    }
    k.prototype.m = function(a) {
      var b = this,
        c = a.href
      if (void 0 !== this.a[c]) {
        var d = this.a[c]
        d && d.__loaded && ((a.__import = d), this.g(a))
      } else
        this.b++,
          (this.a[c] = 'pending'),
          Xb.load(
            c,
            function(a, d) {
              a = b.La(a, d || c)
              b.a[c] = a
              b.b--
              b.loadImports(a)
              b.H()
            },
            function() {
              b.a[c] = null
              b.b--
              b.H()
            }
          )
    }
    k.prototype.La = function(a, b) {
      if (!a) return document.createDocumentFragment()
      Pa &&
        (a = a.replace(me, function(a, b, c) {
          return -1 === a.indexOf('type=') ? b + ' type=import-disable ' + c : a
        }))
      var c = document.createElement('template')
      c.innerHTML = a
      if (c.content) (a = c.content), l(a)
      else
        for (a = document.createDocumentFragment(); c.firstChild; )
          a.appendChild(c.firstChild)
      if ((c = a.querySelector('base')))
        (b = H.U(c.getAttribute('href'), b)), c.removeAttribute('href')
      c = m(
        a,
        'link[rel=import],link[rel=stylesheet][href][type=import-disable],style:not([type]),link[rel=stylesheet][href]:not([type]),script:not([type]),script[type="application/javascript"],script[type="text/javascript"]'
      )
      var d = 0
      p(c, function(a) {
        h(a)
        H.Ea(a, b)
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
    k.prototype.H = function() {
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
                a.Ia()))
          }
        this.Na(function() {
          c = !0
          d()
        })
        this.Ma(function() {
          b = !0
          d()
        })
      }
    }
    k.prototype.flatten = function(a) {
      var b = this
      a = m(a, 'link[rel=import]')
      p(a, function(a) {
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
    k.prototype.Ma = function(a) {
      function b(e) {
        if (e < d) {
          var f = c[e],
            g = document.createElement('script')
          f.removeAttribute('import-dependency')
          p(f.attributes, function(a) {
            return g.setAttribute(a.name, a.value)
          })
          Qa = g
          f.parentNode.replaceChild(g, f)
          h(g, function() {
            Qa = null
            b(e + 1)
          })
        } else a()
      }
      var c = m(document, 'script[import-dependency]'),
        d = c.length
      b(0)
    }
    k.prototype.Na = function(a) {
      var b = m(
          document,
          'style[import-dependency],link[rel=stylesheet][import-dependency]'
        ),
        d = b.length
      if (d) {
        var e =
          Pa &&
          !!document.querySelector(
            'link[rel=stylesheet][href][type=import-disable]'
          )
        p(b, function(b) {
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
    k.prototype.Ia = function() {
      var a = this,
        b = m(document, 'link[rel=import]')
      p(
        b,
        function(b) {
          return a.g(b)
        },
        !0
      )
    }
    k.prototype.g = function(a) {
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
    k.prototype.Ka = function(a) {
      var b = this
      p(a, function(a) {
        return p(a.addedNodes, function(a) {
          a &&
            a.nodeType === Node.ELEMENT_NODE &&
            (g(a) ? b.m(a) : b.loadImports(a))
        })
      })
    }
    var Ra = null
    if (E)
      (z = m(document, 'link[rel=import]')),
        p(z, function(a) {
          ;(a.import && 'loading' === a.import.readyState) || (a.__loaded = !0)
        }),
        (z = function(a) {
          a = a.target
          g(a) && (a.__loaded = !0)
        }),
        document.addEventListener('load', z, !0),
        document.addEventListener('error', z, !0)
    else {
      var ja = Object.getOwnPropertyDescriptor(Node.prototype, 'baseURI')
      Object.defineProperty(
        (!ja || ja.configurable ? Node : Element).prototype,
        'baseURI',
        {
          get: function() {
            var a = g(this) ? this : c(this)
            return a
              ? a.href
              : ja && ja.get
                ? ja.get.call(this)
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
        Ra = new k()
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
    a.useNative = E
    a.whenReady = f
    a.importForElement = c
    a.loadImports = function(a) {
      Ra && Ra.loadImports(a)
    }
  })(
    (window.HTMLImports = window.HTMLImports || {})
  ) /*

Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
  function la() {
    this.na = this.root = null
    this.R = !1
    this.A = this.M = this.da = this.assignedSlot = this.assignedNodes = this.F = null
    this.childNodes = this.nextSibling = this.previousSibling = this.lastChild = this.firstChild = this.parentNode = this.I = void 0
    this.ta = this.ia = !1
  }
  la.prototype.toJSON = function() {
    return {}
  }
  function r(a) {
    a.Y || (a.Y = new la())
    return a.Y
  }
  function t(a) {
    return a && a.Y
  }
  var u = window.ShadyDOM || {}
  u.Ga = !(!Element.prototype.attachShadow || !Node.prototype.getRootNode)
  var ma = Object.getOwnPropertyDescriptor(Node.prototype, 'firstChild')
  u.u = !!(ma && ma.configurable && ma.get)
  u.la = u.force || !u.Ga
  var na = navigator.userAgent.match('Trident'),
    oa = navigator.userAgent.match('Edge')
  void 0 === u.qa && (u.qa = u.u && (na || oa))
  function v(a) {
    return (a = t(a)) && void 0 !== a.firstChild
  }
  function w(a) {
    return 'ShadyRoot' === a.ya
  }
  function pa(a) {
    a = a.getRootNode()
    if (w(a)) return a
  }
  var qa = Element.prototype,
    ra =
      qa.matches ||
      qa.matchesSelector ||
      qa.mozMatchesSelector ||
      qa.msMatchesSelector ||
      qa.oMatchesSelector ||
      qa.webkitMatchesSelector
  function sa(a, b) {
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
  function ta(a, b) {
    for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d]
    for (d = 0; d < c.length; d++) sa(a, c[d])
    return a
  }
  function ua(a, b) {
    for (var c in b) a[c] = b[c]
  }
  var va = document.createTextNode(''),
    wa = 0,
    xa = []
  new MutationObserver(function() {
    for (; xa.length; )
      try {
        xa.shift()()
      } catch (a) {
        throw ((va.textContent = wa++), a)
      }
  }).observe(va, { characterData: !0 })
  function ya(a) {
    xa.push(a)
    va.textContent = wa++
  }
  var za = !!document.contains
  function Aa(a, b) {
    for (; b; ) {
      if (b == a) return !0
      b = b.parentNode
    }
    return !1
  }
  var Ba = [],
    Ca
  function Da(a) {
    Ca || ((Ca = !0), ya(Ea))
    Ba.push(a)
  }
  function Ea() {
    Ca = !1
    for (var a = !!Ba.length; Ba.length; ) Ba.shift()()
    return a
  }
  Ea.list = Ba
  function Fa() {
    this.a = !1
    this.addedNodes = []
    this.removedNodes = []
    this.P = new Set()
  }
  function Ga(a) {
    a.a ||
      ((a.a = !0),
      ya(function() {
        Ha(a)
      }))
  }
  function Ha(a) {
    if (a.a) {
      a.a = !1
      var b = a.takeRecords()
      b.length &&
        a.P.forEach(function(a) {
          a(b)
        })
    }
  }
  Fa.prototype.takeRecords = function() {
    if (this.addedNodes.length || this.removedNodes.length) {
      var a = [{ addedNodes: this.addedNodes, removedNodes: this.removedNodes }]
      this.addedNodes = []
      this.removedNodes = []
      return a
    }
    return []
  }
  function Ia(a, b) {
    var c = r(a)
    c.F || (c.F = new Fa())
    c.F.P.add(b)
    var d = c.F
    return {
      wa: b,
      C: d,
      za: a,
      takeRecords: function() {
        return d.takeRecords()
      }
    }
  }
  function Ja(a) {
    var b = a && a.C
    b && (b.P.delete(a.wa), b.P.size || (r(a.za).F = null))
  }
  function Ka(a, b) {
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
  var x = {},
    La = Element.prototype.insertBefore,
    Ma = Element.prototype.replaceChild,
    Na = Element.prototype.removeChild,
    Oa = Element.prototype.setAttribute,
    Sa = Element.prototype.removeAttribute,
    Ta = Element.prototype.cloneNode,
    Ua = Document.prototype.importNode,
    Va = Element.prototype.addEventListener,
    Wa = Element.prototype.removeEventListener,
    Xa = Window.prototype.addEventListener,
    Ya = Window.prototype.removeEventListener,
    Za = Element.prototype.dispatchEvent,
    $a = Node.prototype.contains || HTMLElement.prototype.contains,
    ab = Document.prototype.getElementById,
    bb = Element.prototype.querySelector,
    cb = DocumentFragment.prototype.querySelector,
    db = Document.prototype.querySelector,
    eb = Element.prototype.querySelectorAll,
    fb = DocumentFragment.prototype.querySelectorAll,
    gb = Document.prototype.querySelectorAll
  x.appendChild = Element.prototype.appendChild
  x.insertBefore = La
  x.replaceChild = Ma
  x.removeChild = Na
  x.setAttribute = Oa
  x.removeAttribute = Sa
  x.cloneNode = Ta
  x.importNode = Ua
  x.addEventListener = Va
  x.removeEventListener = Wa
  x.Ua = Xa
  x.Va = Ya
  x.dispatchEvent = Za
  x.contains = $a
  x.getElementById = ab
  x.cb = bb
  x.gb = cb
  x.ab = db
  x.querySelector = function(a) {
    switch (this.nodeType) {
      case Node.ELEMENT_NODE:
        return bb.call(this, a)
      case Node.DOCUMENT_NODE:
        return db.call(this, a)
      default:
        return cb.call(this, a)
    }
  }
  x.eb = eb
  x.hb = fb
  x.bb = gb
  x.querySelectorAll = function(a) {
    switch (this.nodeType) {
      case Node.ELEMENT_NODE:
        return eb.call(this, a)
      case Node.DOCUMENT_NODE:
        return gb.call(this, a)
      default:
        return fb.call(this, a)
    }
  }
  var hb = /[&\u00A0"]/g,
    ib = /[&\u00A0<>]/g
  function jb(a) {
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
  function kb(a) {
    for (var b = {}, c = 0; c < a.length; c++) b[a[c]] = !0
    return b
  }
  var lb = kb(
      'area base br col command embed hr img input keygen link meta param source track wbr'.split(
        ' '
      )
    ),
    mb = kb(
      'style script xmp iframe noembed noframes plaintext noscript'.split(' ')
    )
  function nb(a, b) {
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
              var m = g.localName, p = '<' + m, z = g.attributes, E = 0;
              (k = z[E]);
              E++
            )
              p += ' ' + k.name + '="' + k.value.replace(hb, jb) + '"'
            p += '>'
            g = lb[m] ? p : p + nb(g, l) + '</' + m + '>'
            break a
          case Node.TEXT_NODE:
            g = g.data
            g = k && mb[k.localName] ? g : g.replace(ib, jb)
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
  var y = {},
    A = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, !1),
    B = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT, null, !1)
  function ob(a) {
    var b = []
    A.currentNode = a
    for (a = A.firstChild(); a; ) b.push(a), (a = A.nextSibling())
    return b
  }
  y.parentNode = function(a) {
    A.currentNode = a
    return A.parentNode()
  }
  y.firstChild = function(a) {
    A.currentNode = a
    return A.firstChild()
  }
  y.lastChild = function(a) {
    A.currentNode = a
    return A.lastChild()
  }
  y.previousSibling = function(a) {
    A.currentNode = a
    return A.previousSibling()
  }
  y.nextSibling = function(a) {
    A.currentNode = a
    return A.nextSibling()
  }
  y.childNodes = ob
  y.parentElement = function(a) {
    B.currentNode = a
    return B.parentNode()
  }
  y.firstElementChild = function(a) {
    B.currentNode = a
    return B.firstChild()
  }
  y.lastElementChild = function(a) {
    B.currentNode = a
    return B.lastChild()
  }
  y.previousElementSibling = function(a) {
    B.currentNode = a
    return B.previousSibling()
  }
  y.nextElementSibling = function(a) {
    B.currentNode = a
    return B.nextSibling()
  }
  y.children = function(a) {
    var b = []
    B.currentNode = a
    for (a = B.firstChild(); a; ) b.push(a), (a = B.nextSibling())
    return b
  }
  y.innerHTML = function(a) {
    return nb(a, function(a) {
      return ob(a)
    })
  }
  y.textContent = function(a) {
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
  var C = {},
    pb = u.u,
    qb = [Node.prototype, Element.prototype, HTMLElement.prototype]
  function D(a) {
    var b
    a: {
      for (b = 0; b < qb.length; b++) {
        var c = qb[b]
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
  var F = pb
      ? {
          parentNode: D('parentNode'),
          firstChild: D('firstChild'),
          lastChild: D('lastChild'),
          previousSibling: D('previousSibling'),
          nextSibling: D('nextSibling'),
          childNodes: D('childNodes'),
          parentElement: D('parentElement'),
          previousElementSibling: D('previousElementSibling'),
          nextElementSibling: D('nextElementSibling'),
          innerHTML: D('innerHTML'),
          textContent: D('textContent'),
          firstElementChild: D('firstElementChild'),
          lastElementChild: D('lastElementChild'),
          children: D('children')
        }
      : {},
    rb = pb
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
    sb = pb
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
  C.ma = F
  C.fb = rb
  C.$a = sb
  C.parentNode = function(a) {
    return F.parentNode.get.call(a)
  }
  C.firstChild = function(a) {
    return F.firstChild.get.call(a)
  }
  C.lastChild = function(a) {
    return F.lastChild.get.call(a)
  }
  C.previousSibling = function(a) {
    return F.previousSibling.get.call(a)
  }
  C.nextSibling = function(a) {
    return F.nextSibling.get.call(a)
  }
  C.childNodes = function(a) {
    return Array.prototype.slice.call(F.childNodes.get.call(a))
  }
  C.parentElement = function(a) {
    return F.parentElement.get.call(a)
  }
  C.previousElementSibling = function(a) {
    return F.previousElementSibling.get.call(a)
  }
  C.nextElementSibling = function(a) {
    return F.nextElementSibling.get.call(a)
  }
  C.innerHTML = function(a) {
    return F.innerHTML.get.call(a)
  }
  C.textContent = function(a) {
    return F.textContent.get.call(a)
  }
  C.children = function(a) {
    switch (a.nodeType) {
      case Node.DOCUMENT_FRAGMENT_NODE:
        a = rb.children.get.call(a)
        break
      case Node.DOCUMENT_NODE:
        a = sb.children.get.call(a)
        break
      default:
        a = F.children.get.call(a)
    }
    return Array.prototype.slice.call(a)
  }
  C.firstElementChild = function(a) {
    switch (a.nodeType) {
      case Node.DOCUMENT_FRAGMENT_NODE:
        return rb.firstElementChild.get.call(a)
      case Node.DOCUMENT_NODE:
        return sb.firstElementChild.get.call(a)
      default:
        return F.firstElementChild.get.call(a)
    }
  }
  C.lastElementChild = function(a) {
    switch (a.nodeType) {
      case Node.DOCUMENT_FRAGMENT_NODE:
        return rb.lastElementChild.get.call(a)
      case Node.DOCUMENT_NODE:
        return sb.lastElementChild.get.call(a)
      default:
        return F.lastElementChild.get.call(a)
    }
  }
  var G = u.qa ? C : y
  function tb(a) {
    for (; a.firstChild; ) a.removeChild(a.firstChild)
  }
  var ub = u.u,
    vb = document.implementation.createHTMLDocument('inert'),
    wb = Object.getOwnPropertyDescriptor(Node.prototype, 'isConnected'),
    xb = wb && wb.get,
    yb = Object.getOwnPropertyDescriptor(Document.prototype, 'activeElement'),
    zb = {
      parentElement: {
        get: function() {
          var a = t(this)
          ;(a = a && a.parentNode) &&
            a.nodeType !== Node.ELEMENT_NODE &&
            (a = null)
          return void 0 !== a ? a : G.parentElement(this)
        },
        configurable: !0
      },
      parentNode: {
        get: function() {
          var a = t(this)
          a = a && a.parentNode
          return void 0 !== a ? a : G.parentNode(this)
        },
        configurable: !0
      },
      nextSibling: {
        get: function() {
          var a = t(this)
          a = a && a.nextSibling
          return void 0 !== a ? a : G.nextSibling(this)
        },
        configurable: !0
      },
      previousSibling: {
        get: function() {
          var a = t(this)
          a = a && a.previousSibling
          return void 0 !== a ? a : G.previousSibling(this)
        },
        configurable: !0
      },
      nextElementSibling: {
        get: function() {
          var a = t(this)
          if (a && void 0 !== a.nextSibling) {
            for (a = this.nextSibling; a && a.nodeType !== Node.ELEMENT_NODE; )
              a = a.nextSibling
            return a
          }
          return G.nextElementSibling(this)
        },
        configurable: !0
      },
      previousElementSibling: {
        get: function() {
          var a = t(this)
          if (a && void 0 !== a.previousSibling) {
            for (
              a = this.previousSibling;
              a && a.nodeType !== Node.ELEMENT_NODE;

            )
              a = a.previousSibling
            return a
          }
          return G.previousElementSibling(this)
        },
        configurable: !0
      }
    },
    Ab = {
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
    Bb = {
      childNodes: {
        get: function() {
          if (v(this)) {
            var a = t(this)
            if (!a.childNodes) {
              a.childNodes = []
              for (var b = this.firstChild; b; b = b.nextSibling)
                a.childNodes.push(b)
            }
            var c = a.childNodes
          } else c = G.childNodes(this)
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
          var a = t(this)
          a = a && a.firstChild
          return void 0 !== a ? a : G.firstChild(this)
        },
        configurable: !0
      },
      lastChild: {
        get: function() {
          var a = t(this)
          a = a && a.lastChild
          return void 0 !== a ? a : G.lastChild(this)
        },
        configurable: !0
      },
      textContent: {
        get: function() {
          if (v(this)) {
            for (var a = [], b = 0, c = this.childNodes, d; (d = c[b]); b++)
              d.nodeType !== Node.COMMENT_NODE && a.push(d.textContent)
            return a.join('')
          }
          return G.textContent(this)
        },
        set: function(a) {
          if ('undefined' === typeof a || null === a) a = ''
          switch (this.nodeType) {
            case Node.ELEMENT_NODE:
            case Node.DOCUMENT_FRAGMENT_NODE:
              if (!v(this) && ub) {
                var b = this.firstChild
                ;(b != this.lastChild || (b && b.nodeType != Node.TEXT_NODE)) &&
                  tb(this)
                C.ma.textContent.set.call(this, a)
              } else
                tb(this),
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
          var a = t(this)
          if (a && void 0 !== a.firstChild) {
            for (a = this.firstChild; a && a.nodeType !== Node.ELEMENT_NODE; )
              a = a.nextSibling
            return a
          }
          return G.firstElementChild(this)
        },
        configurable: !0
      },
      lastElementChild: {
        get: function() {
          var a = t(this)
          if (a && void 0 !== a.lastChild) {
            for (a = this.lastChild; a && a.nodeType !== Node.ELEMENT_NODE; )
              a = a.previousSibling
            return a
          }
          return G.lastElementChild(this)
        },
        configurable: !0
      },
      children: {
        get: function() {
          var a = v(this)
            ? Array.prototype.filter.call(this.childNodes, function(a) {
                return a.nodeType === Node.ELEMENT_NODE
              })
            : G.children(this)
          a.item = function(b) {
            return a[b]
          }
          return a
        },
        configurable: !0
      },
      innerHTML: {
        get: function() {
          return v(this)
            ? nb('template' === this.localName ? this.content : this)
            : G.innerHTML(this)
        },
        set: function(a) {
          var b = 'template' === this.localName ? this.content : this
          tb(b)
          var c = this.localName
          ;(c && 'template' !== c) || (c = 'div')
          c = vb.createElement(c)
          for (
            ub ? C.ma.innerHTML.set.call(c, a) : (c.innerHTML = a);
            c.firstChild;

          )
            b.appendChild(c.firstChild)
        },
        configurable: !0
      }
    },
    Cb = {
      shadowRoot: {
        get: function() {
          var a = t(this)
          return (a && a.na) || null
        },
        configurable: !0
      }
    },
    Db = {
      activeElement: {
        get: function() {
          var a =
            yb && yb.get
              ? yb.get.call(document)
              : u.u
                ? void 0
                : document.activeElement
          if (a && a.nodeType) {
            var b = !!w(this)
            if (
              this === document ||
              (b && this.host !== a && x.contains.call(this.host, a))
            ) {
              for (b = pa(a); b && b !== this; ) (a = b.host), (b = pa(a))
              a = this === document ? (b ? null : a) : b === this ? a : null
            } else a = null
          } else a = null
          return a
        },
        set: function() {},
        configurable: !0
      }
    }
  function I(a, b, c) {
    for (var d in b) {
      var e = Object.getOwnPropertyDescriptor(a, d)
      ;(e && e.configurable) || (!e && c)
        ? Object.defineProperty(a, d, b[d])
        : c && console.warn('Could not define', d, 'on', a)
    }
  }
  function J(a) {
    I(a, zb)
    I(a, Ab)
    I(a, Bb)
    I(a, Db)
  }
  function Eb() {
    var a = Fb.prototype
    a.__proto__ = DocumentFragment.prototype
    I(a, zb, !0)
    I(a, Bb, !0)
    I(a, Db, !0)
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
  var Gb = u.u
      ? function() {}
      : function(a) {
          var b = r(a)
          b.ia || ((b.ia = !0), I(a, zb, !0), I(a, Ab, !0))
        },
    Hb = u.u
      ? function() {}
      : function(a) {
          r(a).ta || (I(a, Bb, !0), I(a, Cb, !0))
        }
  var Ib = G.childNodes
  function Jb(a, b, c) {
    Gb(a)
    c = c || null
    var d = r(a),
      e = r(b),
      f = c ? r(c) : null
    d.previousSibling = c ? f.previousSibling : b.lastChild
    if ((f = t(d.previousSibling))) f.nextSibling = a
    if ((f = t((d.nextSibling = c)))) f.previousSibling = a
    d.parentNode = b
    c
      ? c === e.firstChild && (e.firstChild = a)
      : ((e.lastChild = a), e.firstChild || (e.firstChild = a))
    e.childNodes = null
  }
  function Kb(a, b) {
    var c = r(a)
    if (void 0 === c.firstChild)
      for (
        b = b || Ib(a),
          c.firstChild = b[0] || null,
          c.lastChild = b[b.length - 1] || null,
          Hb(a),
          c = 0;
        c < b.length;
        c++
      ) {
        var d = b[c],
          e = r(d)
        e.parentNode = a
        e.nextSibling = b[c + 1] || null
        e.previousSibling = b[c - 1] || null
        Gb(d)
      }
  }
  var Lb = G.parentNode
  function Mb(a, b, c) {
    if (b === a)
      throw Error(
        "Failed to execute 'appendChild' on 'Node': The new child element contains the parent."
      )
    if (c) {
      var d = t(c)
      d = d && d.parentNode
      if ((void 0 !== d && d !== a) || (void 0 === d && Lb(c) !== a))
        throw Error(
          "Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node."
        )
    }
    if (c === b) return b
    b.parentNode && Nb(b.parentNode, b)
    var e, f
    if (!b.__noInsertionPoint) {
      if ((f = e = pa(a))) {
        var h
        'slot' === b.localName
          ? (h = [b])
          : b.querySelectorAll && (h = b.querySelectorAll('slot'))
        f = h && h.length ? h : void 0
      }
      f &&
        ((h = e),
        (d = f),
        (h.s = h.s || []),
        (h.f = h.f || []),
        (h.h = h.h || {}),
        h.s.push.apply(h.s, [].concat(d instanceof Array ? d : ka(ia(d)))))
    }
    ;('slot' === a.localName || f) && (e = e || pa(a)) && Ob(e)
    if (v(a)) {
      e = c
      Hb(a)
      f = r(a)
      void 0 !== f.firstChild && (f.childNodes = null)
      if (b.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        f = b.childNodes
        for (h = 0; h < f.length; h++) Jb(f[h], a, e)
        e = r(b)
        f = void 0 !== e.firstChild ? null : void 0
        e.firstChild = e.lastChild = f
        e.childNodes = f
      } else Jb(b, a, e)
      e = t(a)
      if (Pb(a)) {
        Ob(e.root)
        var g = !0
      } else e.root && (g = !0)
    }
    g ||
      ((g = w(a) ? a.host : a),
      c
        ? ((c = Qb(c)), x.insertBefore.call(g, b, c))
        : x.appendChild.call(g, b))
    Rb(a, b)
    return b
  }
  function Nb(a, b) {
    if (b.parentNode !== a)
      throw Error('The node to be removed is not a child of this node: ' + b)
    var c = pa(b),
      d = t(a)
    if (v(a)) {
      var e = r(b),
        f = r(a)
      b === f.firstChild && (f.firstChild = e.nextSibling)
      b === f.lastChild && (f.lastChild = e.previousSibling)
      var h = e.previousSibling,
        g = e.nextSibling
      h && (r(h).nextSibling = g)
      g && (r(g).previousSibling = h)
      e.parentNode = e.previousSibling = e.nextSibling = void 0
      void 0 !== f.childNodes && (f.childNodes = null)
      if (Pb(a)) {
        Ob(d.root)
        var k = !0
      }
    }
    Sb(b)
    if (c) {
      ;(e = a && 'slot' === a.localName) && (k = !0)
      if (c.f) {
        Tb(c)
        f = c.h
        for (aa in f)
          for (h = f[aa], g = 0; g < h.length; g++) {
            var l = h[g]
            if (Aa(b, l)) {
              h.splice(g, 1)
              var m = c.f.indexOf(l)
              0 <= m && c.f.splice(m, 1)
              g--
              m = t(l)
              if ((l = m.A))
                for (var p = 0; p < l.length; p++) {
                  var z = l[p],
                    E = Ub(z)
                  E && x.removeChild.call(E, z)
                }
              m.A = []
              m.assignedNodes = []
              m = !0
            }
          }
        var aa = m
      } else aa = void 0
      ;(aa || e) && Ob(c)
    }
    k ||
      ((k = w(a) ? a.host : a),
      ((!d.root && 'slot' !== b.localName) || k === Lb(b)) &&
        x.removeChild.call(k, b))
    Rb(a, null, b)
    return b
  }
  function Sb(a) {
    var b = t(a)
    if (b && void 0 !== b.I) {
      b = a.childNodes
      for (var c = 0, d = b.length, e; c < d && (e = b[c]); c++) Sb(e)
    }
    if ((a = t(a))) a.I = void 0
  }
  function Qb(a) {
    var b = a
    a &&
      'slot' === a.localName &&
      (b = (b = (b = t(a)) && b.A) && b.length ? b[0] : Qb(a.nextSibling))
    return b
  }
  function Pb(a) {
    return (a = (a = t(a)) && a.root) && Vb(a)
  }
  function Wb(a, b) {
    if ('slot' === b) (a = a.parentNode), Pb(a) && Ob(t(a).root)
    else if ('slot' === a.localName && 'name' === b && (b = pa(a))) {
      if (b.f) {
        var c = a.ua,
          d = Yb(a)
        if (d !== c) {
          c = b.h[c]
          var e = c.indexOf(a)
          0 <= e && c.splice(e, 1)
          c = b.h[d] || (b.h[d] = [])
          c.push(a)
          1 < c.length && (b.h[d] = Zb(c))
        }
      }
      Ob(b)
    }
  }
  function Rb(a, b, c) {
    if ((a = (a = t(a)) && a.F))
      b && a.addedNodes.push(b), c && a.removedNodes.push(c), Ga(a)
  }
  function $b(a) {
    if (a && a.nodeType) {
      var b = r(a),
        c = b.I
      void 0 === c &&
        (w(a)
          ? ((c = a), (b.I = c))
          : ((c = (c = a.parentNode) ? $b(c) : a),
            x.contains.call(document.documentElement, a) && (b.I = c)))
      return c
    }
  }
  function ac(a, b, c) {
    var d = []
    bc(a.childNodes, b, c, d)
    return d
  }
  function bc(a, b, c, d) {
    for (var e = 0, f = a.length, h; e < f && (h = a[e]); e++) {
      var g
      if ((g = h.nodeType === Node.ELEMENT_NODE)) {
        g = h
        var k = b,
          l = c,
          m = d,
          p = k(g)
        p && m.push(g)
        l && l(p) ? (g = p) : (bc(g.childNodes, k, l, m), (g = void 0))
      }
      if (g) break
    }
  }
  var cc = null
  function dc(a, b, c) {
    cc || (cc = window.ShadyCSS && window.ShadyCSS.ScopingShim)
    cc && 'class' === b
      ? cc.setElementClass(a, c)
      : (x.setAttribute.call(a, b, c), Wb(a, b))
  }
  function ec(a, b) {
    if (a.ownerDocument !== document) return x.importNode.call(document, a, b)
    var c = x.importNode.call(document, a, !1)
    if (b) {
      a = a.childNodes
      b = 0
      for (var d; b < a.length; b++) (d = ec(a[b], !0)), c.appendChild(d)
    }
    return c
  }
  var fc = '__eventWrappers' + Date.now(),
    gc = {
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
  function hc(a, b) {
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
  function ic(a, b) {
    if (!w) return a
    a = hc(a, !0)
    for (var c = 0, d, e, f, h; c < b.length; c++)
      if (
        ((d = b[c]),
        (f = d === window ? window : d.getRootNode()),
        f !== e && ((h = a.indexOf(f)), (e = f)),
        !w(f) || -1 < h)
      )
        return d
  }
  var jc = {
    get composed() {
      !1 !== this.isTrusted && void 0 === this.W && (this.W = gc[this.type])
      return this.W || !1
    },
    composedPath: function() {
      this.b || (this.b = hc(this.__target, this.composed))
      return this.b
    },
    get target() {
      return ic(this.currentTarget, this.composedPath())
    },
    get relatedTarget() {
      if (!this.X) return null
      this.c || (this.c = hc(this.X, !0))
      return ic(this.currentTarget, this.c)
    },
    stopPropagation: function() {
      Event.prototype.stopPropagation.call(this)
      this.a = !0
    },
    stopImmediatePropagation: function() {
      Event.prototype.stopImmediatePropagation.call(this)
      this.a = this.g = !0
    }
  }
  function kc(a) {
    function b(b, d) {
      b = new a(b, d)
      b.W = d && !!d.composed
      return b
    }
    ua(b, a)
    b.prototype = a.prototype
    return b
  }
  var lc = { focus: !0, blur: !0 }
  function mc(a) {
    return a.__target !== a.target || a.X !== a.relatedTarget
  }
  function nc(a, b, c) {
    if ((c = b.__handlers && b.__handlers[a.type] && b.__handlers[a.type][c]))
      for (
        var d = 0, e;
        (e = c[d]) &&
        (!mc(a) || a.target !== a.relatedTarget) &&
        (e.call(b, a), !a.g);
        d++
      );
  }
  function oc(a) {
    var b = a.composedPath()
    Object.defineProperty(a, 'currentTarget', {
      get: function() {
        return d
      },
      configurable: !0
    })
    for (var c = b.length - 1; 0 <= c; c--) {
      var d = b[c]
      nc(a, d, 'capture')
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
      var f = t(d)
      f = f && f.root
      if (0 === c || (f && f === e))
        if ((nc(a, d, 'bubble'), d !== window && (e = d.getRootNode()), a.a))
          break
    }
  }
  function pc(a, b, c, d, e, f) {
    for (var h = 0; h < a.length; h++) {
      var g = a[h],
        k = g.type,
        l = g.capture,
        m = g.once,
        p = g.passive
      if (b === g.node && c === k && d === l && e === m && f === p) return h
    }
    return -1
  }
  function qc(a, b, c) {
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
          var g = (c && c.Z) || this,
            k = b[fc]
          if (k) {
            if (-1 < pc(k, g, a, e, f, h)) return
          } else b[fc] = []
          k = function(e) {
            f && this.removeEventListener(a, b, c)
            e.__target || rc(e)
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
              if (mc(e) && e.target === e.relatedTarget)
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
          b[fc].push({
            node: g,
            type: a,
            capture: e,
            once: f,
            passive: h,
            Wa: k
          })
          lc[a]
            ? ((this.__handlers = this.__handlers || {}),
              (this.__handlers[a] = this.__handlers[a] || {
                capture: [],
                bubble: []
              }),
              this.__handlers[a][e ? 'capture' : 'bubble'].push(k))
            : (this instanceof Window ? x.Ua : x.addEventListener).call(
                this,
                a,
                k,
                c
              )
        }
    }
  }
  function sc(a, b, c) {
    if (b) {
      if (c && 'object' === typeof c) {
        var d = !!c.capture
        var e = !!c.once
        var f = !!c.passive
      } else (d = !!c), (f = e = !1)
      var h = (c && c.Z) || this,
        g = void 0
      var k = null
      try {
        k = b[fc]
      } catch (l) {}
      k &&
        ((e = pc(k, h, a, d, e, f)),
        -1 < e && ((g = k.splice(e, 1)[0].Wa), k.length || (b[fc] = void 0)))
      ;(this instanceof Window ? x.Va : x.removeEventListener).call(
        this,
        a,
        g || b,
        c
      )
      g &&
        lc[a] &&
        this.__handlers &&
        this.__handlers[a] &&
        ((a = this.__handlers[a][d ? 'capture' : 'bubble']),
        (g = a.indexOf(g)),
        -1 < g && a.splice(g, 1))
    }
  }
  function tc() {
    for (var a in lc)
      window.addEventListener(
        a,
        function(a) {
          a.__target || (rc(a), oc(a))
        },
        !0
      )
  }
  function rc(a) {
    a.__target = a.target
    a.X = a.relatedTarget
    if (u.u) {
      var b = Object.getPrototypeOf(a)
      if (!b.hasOwnProperty('__patchProto')) {
        var c = Object.create(b)
        c.Ya = b
        sa(c, jc)
        b.__patchProto = c
      }
      a.__proto__ = b.__patchProto
    } else sa(a, jc)
  }
  var uc = kc(window.Event),
    vc = kc(window.CustomEvent),
    wc = kc(window.MouseEvent)
  function xc(a, b) {
    return { index: a, J: [], O: b }
  }
  function yc(a, b, c, d) {
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
      for (var l = c.length, m = 0; m < k - h && zc(a[--g], c[--l]); ) m++
      g = m
    }
    e += h
    f += h
    b -= g
    d -= g
    if (0 == b - e && 0 == d - f) return []
    if (e == b) {
      for (b = xc(e, 0); f < d; ) b.J.push(c[f++])
      return [b]
    }
    if (f == d) return [xc(e, b - e)]
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
          var p = b[l - 1][m] + 1,
            z = b[l][m - 1] + 1
          b[l][m] = p < z ? p : z
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
            (p = l < m ? (l < g ? l : g) : m < g ? m : g),
            p == g
              ? (g == d ? a.push(0) : (a.push(1), (d = g)), k--, h--)
              : p == l
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
          b || (b = xc(e, 0))
          b.O++
          e++
          b.J.push(c[f])
          f++
          break
        case 2:
          b || (b = xc(e, 0))
          b.O++
          e++
          break
        case 3:
          b || (b = xc(e, 0)), b.J.push(c[f]), f++
      }
    b && k.push(b)
    return k
  }
  function zc(a, b) {
    return a === b
  }
  var Ub = G.parentNode,
    Ac = G.childNodes,
    Bc = {}
  function Cc(a) {
    var b = []
    do b.unshift(a)
    while ((a = a.parentNode))
    return b
  }
  function Fb(a, b, c) {
    if (a !== Bc) throw new TypeError('Illegal constructor')
    this.ya = 'ShadyRoot'
    a = Ac(b)
    this.host = b
    this.a = c && c.mode
    Kb(b, a)
    c = t(b)
    c.root = this
    c.na = 'closed' !== this.a ? this : null
    c = r(this)
    c.firstChild = c.lastChild = c.parentNode = c.nextSibling = c.previousSibling = null
    c.childNodes = []
    this.N = !1
    this.s = this.h = this.f = null
    c = 0
    for (var d = a.length; c < d; c++) x.removeChild.call(b, a[c])
  }
  function Ob(a) {
    a.N ||
      ((a.N = !0),
      Da(function() {
        return Dc(a)
      }))
  }
  function Dc(a) {
    for (var b; a; ) {
      a.N && (b = a)
      a: {
        var c = a
        a = c.host.getRootNode()
        if (w(a))
          for (var d = c.host.childNodes, e = 0; e < d.length; e++)
            if (((c = d[e]), 'slot' == c.localName)) break a
        a = void 0
      }
    }
    b && b._renderRoot()
  }
  Fb.prototype._renderRoot = function() {
    this.N = !1
    if (this.f) {
      Tb(this)
      for (var a = 0, b; a < this.f.length; a++) {
        b = this.f[a]
        var c = t(b),
          d = c.assignedNodes
        c.assignedNodes = []
        c.A = []
        if ((c.da = d))
          for (c = 0; c < d.length; c++) {
            var e = t(d[c])
            e.M = e.assignedSlot
            e.assignedSlot === b && (e.assignedSlot = null)
          }
      }
      for (b = this.host.firstChild; b; b = b.nextSibling) Ec(this, b)
      for (a = 0; a < this.f.length; a++) {
        b = this.f[a]
        d = t(b)
        if (!d.assignedNodes.length)
          for (c = b.firstChild; c; c = c.nextSibling) Ec(this, c, b)
        ;(c = (c = t(b.parentNode)) && c.root) && Vb(c) && c._renderRoot()
        Fc(this, d.A, d.assignedNodes)
        if ((c = d.da)) {
          for (e = 0; e < c.length; e++) t(c[e]).M = null
          d.da = null
          c.length > d.assignedNodes.length && (d.R = !0)
        }
        d.R && ((d.R = !1), Gc(this, b))
      }
      a = this.f
      b = []
      for (d = 0; d < a.length; d++)
        (c = a[d].parentNode),
          ((e = t(c)) && e.root) || !(0 > b.indexOf(c)) || b.push(c)
      for (a = 0; a < b.length; a++) {
        d = b[a]
        c = d === this ? this.host : d
        e = []
        d = d.childNodes
        for (var f = 0; f < d.length; f++) {
          var h = d[f]
          if ('slot' == h.localName) {
            h = t(h).A
            for (var g = 0; g < h.length; g++) e.push(h[g])
          } else e.push(h)
        }
        d = void 0
        f = Ac(c)
        h = yc(e, e.length, f, f.length)
        for (var k = (g = 0); g < h.length && (d = h[g]); g++) {
          for (var l = 0, m; l < d.J.length && (m = d.J[l]); l++)
            Ub(m) === c && x.removeChild.call(c, m), f.splice(d.index + k, 1)
          k -= d.O
        }
        for (k = 0; k < h.length && (d = h[k]); k++)
          for (g = f[d.index], l = d.index; l < d.index + d.O; l++)
            (m = e[l]), x.insertBefore.call(c, m, g), f.splice(l, 0, m)
      }
    }
  }
  function Ec(a, b, c) {
    var d = r(b),
      e = d.M
    d.M = null
    c || (c = (a = a.h[b.slot || '__catchall']) && a[0])
    c
      ? (r(c).assignedNodes.push(b), (d.assignedSlot = c))
      : (d.assignedSlot = void 0)
    e !== d.assignedSlot && d.assignedSlot && (r(d.assignedSlot).R = !0)
  }
  function Fc(a, b, c) {
    for (var d = 0, e; d < c.length && (e = c[d]); d++)
      if ('slot' == e.localName) {
        var f = t(e).assignedNodes
        f && f.length && Fc(a, b, f)
      } else b.push(c[d])
  }
  function Gc(a, b) {
    x.dispatchEvent.call(b, new Event('slotchange'))
    b = t(b)
    b.assignedSlot && Gc(a, b.assignedSlot)
  }
  function Tb(a) {
    if (a.s && a.s.length) {
      for (var b = a.s, c, d = 0; d < b.length; d++) {
        var e = b[d]
        Kb(e)
        Kb(e.parentNode)
        var f = Yb(e)
        a.h[f] ? ((c = c || {}), (c[f] = !0), a.h[f].push(e)) : (a.h[f] = [e])
        a.f.push(e)
      }
      if (c) for (var h in c) a.h[h] = Zb(a.h[h])
      a.s = []
    }
  }
  function Yb(a) {
    var b = a.name || a.getAttribute('name') || '__catchall'
    return (a.ua = b)
  }
  function Zb(a) {
    return a.sort(function(a, c) {
      a = Cc(a)
      for (var b = Cc(c), e = 0; e < a.length; e++) {
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
  function Vb(a) {
    Tb(a)
    return !(!a.f || !a.f.length)
  }
  function Hc(a) {
    var b = a.getRootNode()
    w(b) && Dc(b)
    return ((a = t(a)) && a.assignedSlot) || null
  }
  var Ic = {
      addEventListener: qc.bind(window),
      removeEventListener: sc.bind(window)
    },
    Jc = {
      addEventListener: qc,
      removeEventListener: sc,
      appendChild: function(a) {
        return Mb(this, a)
      },
      insertBefore: function(a, b) {
        return Mb(this, a, b)
      },
      removeChild: function(a) {
        return Nb(this, a)
      },
      replaceChild: function(a, b) {
        Mb(this, a, b)
        Nb(this, b)
        return a
      },
      cloneNode: function(a) {
        if ('template' == this.localName) var b = x.cloneNode.call(this, a)
        else if (((b = x.cloneNode.call(this, !1)), a)) {
          a = this.childNodes
          for (var c = 0, d; c < a.length; c++)
            (d = a[c].cloneNode(!0)), b.appendChild(d)
        }
        return b
      },
      getRootNode: function() {
        return $b(this)
      },
      contains: function(a) {
        return Aa(this, a)
      },
      dispatchEvent: function(a) {
        Ea()
        return x.dispatchEvent.call(this, a)
      }
    }
  Object.defineProperties(Jc, {
    isConnected: {
      get: function() {
        if (xb && xb.call(this)) return !0
        if (this.nodeType == Node.DOCUMENT_FRAGMENT_NODE) return !1
        var a = this.ownerDocument
        if (za) {
          if (x.contains.call(a, this)) return !0
        } else if (
          a.documentElement &&
          x.contains.call(a.documentElement, this)
        )
          return !0
        for (a = this; a && !(a instanceof Document); )
          a = a.parentNode || (w(a) ? a.host : void 0)
        return !!(a && a instanceof Document)
      },
      configurable: !0
    }
  })
  var Kc = {
      get assignedSlot() {
        return Hc(this)
      }
    },
    Lc = {
      querySelector: function(a) {
        return (
          ac(
            this,
            function(b) {
              return ra.call(b, a)
            },
            function(a) {
              return !!a
            }
          )[0] || null
        )
      },
      querySelectorAll: function(a, b) {
        if (b) {
          b = Array.prototype.slice.call(x.querySelectorAll(this, a))
          var c = this.getRootNode()
          return b.filter(function(a) {
            return a.getRootNode() == c
          })
        }
        return ac(this, function(b) {
          return ra.call(b, a)
        })
      }
    },
    Mc = {
      assignedNodes: function(a) {
        if ('slot' === this.localName) {
          var b = this.getRootNode()
          w(b) && Dc(b)
          return (b = t(this))
            ? (a && a.flatten ? b.A : b.assignedNodes) || []
            : []
        }
      }
    },
    Nc = ta(
      {
        setAttribute: function(a, b) {
          dc(this, a, b)
        },
        removeAttribute: function(a) {
          x.removeAttribute.call(this, a)
          Wb(this, a)
        },
        attachShadow: function(a) {
          if (!this) throw 'Must provide a host.'
          if (!a) throw 'Not enough arguments.'
          return new Fb(Bc, this, a)
        },
        get slot() {
          return this.getAttribute('slot')
        },
        set slot(a) {
          dc(this, 'slot', a)
        },
        get assignedSlot() {
          return Hc(this)
        }
      },
      Lc,
      Mc
    )
  Object.defineProperties(Nc, Cb)
  var Oc = ta(
    {
      importNode: function(a, b) {
        return ec(a, b)
      },
      getElementById: function(a) {
        return (
          ac(
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
    Lc
  )
  Object.defineProperties(Oc, { _activeElement: Db.activeElement })
  var Pc = HTMLElement.prototype.blur,
    Qc = ta({
      blur: function() {
        var a = t(this)
        ;(a = (a = a && a.root) && a.activeElement) ? a.blur() : Pc.call(this)
      }
    }),
    Rc = {
      addEventListener: function(a, b, c) {
        'object' !== typeof c && (c = { capture: !!c })
        c.Z = this
        this.host.addEventListener(a, b, c)
      },
      removeEventListener: function(a, b, c) {
        'object' !== typeof c && (c = { capture: !!c })
        c.Z = this
        this.host.removeEventListener(a, b, c)
      },
      getElementById: function(a) {
        return (
          ac(
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
  function K(a, b) {
    for (var c = Object.getOwnPropertyNames(b), d = 0; d < c.length; d++) {
      var e = c[d],
        f = Object.getOwnPropertyDescriptor(b, e)
      f.value ? (a[e] = f.value) : Object.defineProperty(a, e, f)
    }
  }
  if (u.la) {
    var ShadyDOM = {
      inUse: u.la,
      patch: function(a) {
        Hb(a)
        Gb(a)
        return a
      },
      isShadyRoot: w,
      enqueue: Da,
      flush: Ea,
      settings: u,
      filterMutations: Ka,
      observeChildren: Ia,
      unobserveChildren: Ja,
      nativeMethods: x,
      nativeTree: G
    }
    window.ShadyDOM = ShadyDOM
    window.Event = uc
    window.CustomEvent = vc
    window.MouseEvent = wc
    tc()
    var Sc =
      (window.customElements && window.customElements.nativeHTMLElement) ||
      HTMLElement
    K(Fb.prototype, Rc)
    K(window.Node.prototype, Jc)
    K(window.Window.prototype, Ic)
    K(window.Text.prototype, Kc)
    K(window.DocumentFragment.prototype, Lc)
    K(window.Element.prototype, Nc)
    K(window.Document.prototype, Oc)
    window.HTMLSlotElement && K(window.HTMLSlotElement.prototype, Mc)
    K(Sc.prototype, Qc)
    u.u &&
      (J(window.Node.prototype),
      J(window.Text.prototype),
      J(window.DocumentFragment.prototype),
      J(window.Element.prototype),
      J(Sc.prototype),
      J(window.Document.prototype),
      window.HTMLSlotElement && J(window.HTMLSlotElement.prototype))
    Eb()
    window.ShadowRoot = Fb
  }
  var Tc = new Set(
    'annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph'.split(
      ' '
    )
  )
  function Uc(a) {
    var b = Tc.has(a)
    a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a)
    return !b && a
  }
  function L(a) {
    var b = a.isConnected
    if (void 0 !== b) return b
    for (; a && !(a.__CE_isImportDocument || a instanceof Document); )
      a =
        a.parentNode ||
        (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0)
    return !(!a || !(a.__CE_isImportDocument || a instanceof Document))
  }
  function Vc(a, b) {
    for (; b && b !== a && !b.nextSibling; ) b = b.parentNode
    return b && b !== a ? b.nextSibling : null
  }
  function M(a, b, c) {
    c = void 0 === c ? new Set() : c
    for (var d = a; d; ) {
      if (d.nodeType === Node.ELEMENT_NODE) {
        var e = d
        b(e)
        var f = e.localName
        if ('link' === f && 'import' === e.getAttribute('rel')) {
          d = e.import
          if (d instanceof Node && !c.has(d))
            for (c.add(d), d = d.firstChild; d; d = d.nextSibling) M(d, b, c)
          d = Vc(a, e)
          continue
        } else if ('template' === f) {
          d = Vc(a, e)
          continue
        }
        if ((e = e.__CE_shadowRoot))
          for (e = e.firstChild; e; e = e.nextSibling) M(e, b, c)
      }
      d = d.firstChild ? d.firstChild : Vc(a, d)
    }
  }
  function N(a, b, c) {
    a[b] = c
  }
  function Wc() {
    this.a = new Map()
    this.m = new Map()
    this.g = []
    this.c = !1
  }
  function Xc(a, b, c) {
    a.a.set(b, c)
    a.m.set(c.constructor, c)
  }
  function Yc(a, b) {
    a.c = !0
    a.g.push(b)
  }
  function Zc(a, b) {
    a.c &&
      M(b, function(b) {
        return a.b(b)
      })
  }
  Wc.prototype.b = function(a) {
    if (this.c && !a.__CE_patched) {
      a.__CE_patched = !0
      for (var b = 0; b < this.g.length; b++) this.g[b](a)
    }
  }
  function O(a, b) {
    var c = []
    M(b, function(a) {
      return c.push(a)
    })
    for (b = 0; b < c.length; b++) {
      var d = c[b]
      1 === d.__CE_state ? a.connectedCallback(d) : $c(a, d)
    }
  }
  function P(a, b) {
    var c = []
    M(b, function(a) {
      return c.push(a)
    })
    for (b = 0; b < c.length; b++) {
      var d = c[b]
      1 === d.__CE_state && a.disconnectedCallback(d)
    }
  }
  function Q(a, b, c) {
    c = void 0 === c ? {} : c
    var d = c.Ta || new Set(),
      e =
        c.V ||
        function(b) {
          return $c(a, b)
        },
      f = []
    M(
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
                  Q(a, c, { Ta: f, V: e })
                }
              })
        } else f.push(b)
      },
      d
    )
    if (a.c) for (b = 0; b < f.length; b++) a.b(f[b])
    for (b = 0; b < f.length; b++) e(f[b])
  }
  function $c(a, b) {
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
          L(b) && a.connectedCallback(b)
        }
    }
  }
  Wc.prototype.connectedCallback = function(a) {
    var b = a.__CE_definition
    b.connectedCallback && b.connectedCallback.call(a)
  }
  Wc.prototype.disconnectedCallback = function(a) {
    var b = a.__CE_definition
    b.disconnectedCallback && b.disconnectedCallback.call(a)
  }
  Wc.prototype.attributeChangedCallback = function(a, b, c, d, e) {
    var f = a.__CE_definition
    f.attributeChangedCallback &&
      -1 < f.observedAttributes.indexOf(b) &&
      f.attributeChangedCallback.call(a, b, c, d, e)
  }
  function ad(a) {
    var b = document
    this.i = a
    this.a = b
    this.C = void 0
    Q(this.i, this.a)
    'loading' === this.a.readyState &&
      ((this.C = new MutationObserver(this.b.bind(this))),
      this.C.observe(this.a, { childList: !0, subtree: !0 }))
  }
  ad.prototype.disconnect = function() {
    this.C && this.C.disconnect()
  }
  ad.prototype.b = function(a) {
    var b = this.a.readyState
    ;('interactive' !== b && 'complete' !== b) || this.disconnect()
    for (b = 0; b < a.length; b++)
      for (var c = a[b].addedNodes, d = 0; d < c.length; d++) Q(this.i, c[d])
  }
  function bd() {
    var a = this
    this.b = this.a = void 0
    this.c = new Promise(function(b) {
      a.b = b
      a.a && b(a.a)
    })
  }
  function cd(a) {
    if (a.a) throw Error('Already resolved.')
    a.a = void 0
    a.b && a.b(void 0)
  }
  function R(a) {
    this.aa = !1
    this.i = a
    this.ea = new Map()
    this.ba = function(a) {
      return a()
    }
    this.L = !1
    this.ca = []
    this.xa = new ad(a)
  }
  n = R.prototype
  n.define = function(a, b) {
    var c = this
    if (!(b instanceof Function))
      throw new TypeError('Custom element constructors must be functions.')
    if (!Uc(a))
      throw new SyntaxError("The element name '" + a + "' is not valid.")
    if (this.i.a.get(a))
      throw Error(
        "A custom element with name '" + a + "' has already been defined."
      )
    if (this.aa) throw Error('A custom element is already being defined.')
    this.aa = !0
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
      this.aa = !1
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
    Xc(this.i, a, b)
    this.ca.push(b)
    this.L ||
      ((this.L = !0),
      this.ba(function() {
        return dd(c)
      }))
  }
  n.V = function(a) {
    Q(this.i, a)
  }
  function dd(a) {
    if (!1 !== a.L) {
      a.L = !1
      for (var b = a.ca, c = [], d = new Map(), e = 0; e < b.length; e++)
        d.set(b[e].localName, [])
      Q(a.i, document, {
        V: function(b) {
          if (void 0 === b.__CE_state) {
            var e = b.localName,
              f = d.get(e)
            f ? f.push(b) : a.i.a.get(e) && c.push(b)
          }
        }
      })
      for (e = 0; e < c.length; e++) $c(a.i, c[e])
      for (; 0 < b.length; ) {
        var f = b.shift()
        e = f.localName
        f = d.get(f.localName)
        for (var h = 0; h < f.length; h++) $c(a.i, f[h])
        ;(e = a.ea.get(e)) && cd(e)
      }
    }
  }
  n.get = function(a) {
    if ((a = this.i.a.get(a))) return a.constructor
  }
  n.ra = function(a) {
    if (!Uc(a))
      return Promise.reject(
        new SyntaxError("'" + a + "' is not a valid custom element name.")
      )
    var b = this.ea.get(a)
    if (b) return b.c
    b = new bd()
    this.ea.set(a, b)
    this.i.a.get(a) &&
      !this.ca.some(function(b) {
        return b.localName === a
      }) &&
      cd(b)
    return b.c
  }
  n.Oa = function(a) {
    this.xa.disconnect()
    var b = this.ba
    this.ba = function(c) {
      return a(function() {
        return b(c)
      })
    }
  }
  window.CustomElementRegistry = R
  R.prototype.define = R.prototype.define
  R.prototype.upgrade = R.prototype.V
  R.prototype.get = R.prototype.get
  R.prototype.whenDefined = R.prototype.ra
  R.prototype.polyfillWrapFlushCallback = R.prototype.Oa
  var ed = window.Document.prototype.createElement,
    fd = window.Document.prototype.createElementNS,
    gd = window.Document.prototype.importNode,
    hd = window.Document.prototype.prepend,
    id = window.Document.prototype.append,
    jd = window.DocumentFragment.prototype.prepend,
    kd = window.DocumentFragment.prototype.append,
    ld = window.Node.prototype.cloneNode,
    md = window.Node.prototype.appendChild,
    nd = window.Node.prototype.insertBefore,
    od = window.Node.prototype.removeChild,
    pd = window.Node.prototype.replaceChild,
    qd = Object.getOwnPropertyDescriptor(window.Node.prototype, 'textContent'),
    rd = window.Element.prototype.attachShadow,
    sd = Object.getOwnPropertyDescriptor(window.Element.prototype, 'innerHTML'),
    td = window.Element.prototype.getAttribute,
    ud = window.Element.prototype.setAttribute,
    vd = window.Element.prototype.removeAttribute,
    wd = window.Element.prototype.getAttributeNS,
    xd = window.Element.prototype.setAttributeNS,
    yd = window.Element.prototype.removeAttributeNS,
    zd = window.Element.prototype.insertAdjacentElement,
    Ad = window.Element.prototype.insertAdjacentHTML,
    Bd = window.Element.prototype.prepend,
    Cd = window.Element.prototype.append,
    Dd = window.Element.prototype.before,
    Ed = window.Element.prototype.after,
    Fd = window.Element.prototype.replaceWith,
    Gd = window.Element.prototype.remove,
    Hd = window.HTMLElement,
    Id = Object.getOwnPropertyDescriptor(
      window.HTMLElement.prototype,
      'innerHTML'
    ),
    Jd = window.HTMLElement.prototype.insertAdjacentElement,
    Kd = window.HTMLElement.prototype.insertAdjacentHTML
  var Ld = new function() {}()
  function Md() {
    var a = Nd
    window.HTMLElement = (function() {
      function b() {
        var b = this.constructor,
          d = a.m.get(b)
        if (!d)
          throw Error(
            'The custom element being constructed was not registered with `customElements`.'
          )
        var e = d.constructionStack
        if (0 === e.length)
          return (
            (e = ed.call(document, d.localName)),
            Object.setPrototypeOf(e, b.prototype),
            (e.__CE_state = 1),
            (e.__CE_definition = d),
            a.b(e),
            e
          )
        d = e.length - 1
        var f = e[d]
        if (f === Ld)
          throw Error(
            'The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.'
          )
        e[d] = Ld
        Object.setPrototypeOf(f, b.prototype)
        a.b(f)
        return f
      }
      b.prototype = Hd.prototype
      return b
    })()
  }
  function Od(a, b, c) {
    function d(b) {
      return function(c) {
        for (var d = [], e = 0; e < arguments.length; ++e)
          d[e - 0] = arguments[e]
        e = []
        for (var f = [], l = 0; l < d.length; l++) {
          var m = d[l]
          m instanceof Element && L(m) && f.push(m)
          if (m instanceof DocumentFragment)
            for (m = m.firstChild; m; m = m.nextSibling) e.push(m)
          else e.push(m)
        }
        b.apply(this, d)
        for (d = 0; d < f.length; d++) P(a, f[d])
        if (L(this))
          for (d = 0; d < e.length; d++)
            (f = e[d]), f instanceof Element && O(a, f)
      }
    }
    void 0 !== c.T && (b.prepend = d(c.T))
    void 0 !== c.append && (b.append = d(c.append))
  }
  function Pd() {
    var a = Nd
    N(Document.prototype, 'createElement', function(b) {
      if (this.__CE_hasRegistry) {
        var c = a.a.get(b)
        if (c) return new c.constructor()
      }
      b = ed.call(this, b)
      a.b(b)
      return b
    })
    N(Document.prototype, 'importNode', function(b, c) {
      b = gd.call(this, b, c)
      this.__CE_hasRegistry ? Q(a, b) : Zc(a, b)
      return b
    })
    N(Document.prototype, 'createElementNS', function(b, c) {
      if (
        this.__CE_hasRegistry &&
        (null === b || 'http://www.w3.org/1999/xhtml' === b)
      ) {
        var d = a.a.get(c)
        if (d) return new d.constructor()
      }
      b = fd.call(this, b, c)
      a.b(b)
      return b
    })
    Od(a, Document.prototype, { T: hd, append: id })
  }
  function Qd() {
    var a = Nd
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
              if (0 < g && L(this)) {
                c = Array(g)
                for (var k = 0; k < g; k++) c[k] = e[k]
              }
            }
            d.set.call(this, b)
            if (c) for (b = 0; b < c.length; b++) P(a, c[b])
          }
        }
      })
    }
    N(Node.prototype, 'insertBefore', function(b, d) {
      if (b instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(b.childNodes)
        b = nd.call(this, b, d)
        if (L(this)) for (d = 0; d < c.length; d++) O(a, c[d])
        return b
      }
      c = L(b)
      d = nd.call(this, b, d)
      c && P(a, b)
      L(this) && O(a, b)
      return d
    })
    N(Node.prototype, 'appendChild', function(b) {
      if (b instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(b.childNodes)
        b = md.call(this, b)
        if (L(this)) for (var e = 0; e < c.length; e++) O(a, c[e])
        return b
      }
      c = L(b)
      e = md.call(this, b)
      c && P(a, b)
      L(this) && O(a, b)
      return e
    })
    N(Node.prototype, 'cloneNode', function(b) {
      b = ld.call(this, b)
      this.ownerDocument.__CE_hasRegistry ? Q(a, b) : Zc(a, b)
      return b
    })
    N(Node.prototype, 'removeChild', function(b) {
      var c = L(b),
        e = od.call(this, b)
      c && P(a, b)
      return e
    })
    N(Node.prototype, 'replaceChild', function(b, d) {
      if (b instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(b.childNodes)
        b = pd.call(this, b, d)
        if (L(this)) for (P(a, d), d = 0; d < c.length; d++) O(a, c[d])
        return b
      }
      c = L(b)
      var f = pd.call(this, b, d),
        h = L(this)
      h && P(a, d)
      c && P(a, b)
      h && O(a, b)
      return f
    })
    qd && qd.get
      ? b(Node.prototype, qd)
      : Yc(a, function(a) {
          b(a, {
            enumerable: !0,
            configurable: !0,
            get: function() {
              for (var a = [], b = 0; b < this.childNodes.length; b++)
                a.push(this.childNodes[b].textContent)
              return a.join('')
            },
            set: function(a) {
              for (; this.firstChild; ) od.call(this, this.firstChild)
              md.call(this, document.createTextNode(a))
            }
          })
        })
  }
  function Rd(a) {
    var b = Element.prototype
    function c(b) {
      return function(c) {
        for (var d = [], e = 0; e < arguments.length; ++e)
          d[e - 0] = arguments[e]
        e = []
        for (var g = [], k = 0; k < d.length; k++) {
          var l = d[k]
          l instanceof Element && L(l) && g.push(l)
          if (l instanceof DocumentFragment)
            for (l = l.firstChild; l; l = l.nextSibling) e.push(l)
          else e.push(l)
        }
        b.apply(this, d)
        for (d = 0; d < g.length; d++) P(a, g[d])
        if (L(this))
          for (d = 0; d < e.length; d++)
            (g = e[d]), g instanceof Element && O(a, g)
      }
    }
    void 0 !== Dd && (b.before = c(Dd))
    void 0 !== Dd && (b.after = c(Ed))
    void 0 !== Fd &&
      N(b, 'replaceWith', function(b) {
        for (var c = [], d = 0; d < arguments.length; ++d)
          c[d - 0] = arguments[d]
        d = []
        for (var h = [], g = 0; g < c.length; g++) {
          var k = c[g]
          k instanceof Element && L(k) && h.push(k)
          if (k instanceof DocumentFragment)
            for (k = k.firstChild; k; k = k.nextSibling) d.push(k)
          else d.push(k)
        }
        g = L(this)
        Fd.apply(this, c)
        for (c = 0; c < h.length; c++) P(a, h[c])
        if (g)
          for (P(a, this), c = 0; c < d.length; c++)
            (h = d[c]), h instanceof Element && O(a, h)
      })
    void 0 !== Gd &&
      N(b, 'remove', function() {
        var b = L(this)
        Gd.call(this)
        b && P(a, this)
      })
  }
  function Sd() {
    var a = Nd
    function b(b, c) {
      Object.defineProperty(b, 'innerHTML', {
        enumerable: c.enumerable,
        configurable: !0,
        get: c.get,
        set: function(b) {
          var d = this,
            e = void 0
          L(this) &&
            ((e = []),
            M(this, function(a) {
              a !== d && e.push(a)
            }))
          c.set.call(this, b)
          if (e)
            for (var f = 0; f < e.length; f++) {
              var h = e[f]
              1 === h.__CE_state && a.disconnectedCallback(h)
            }
          this.ownerDocument.__CE_hasRegistry ? Q(a, this) : Zc(a, this)
          return b
        }
      })
    }
    function c(b, c) {
      N(b, 'insertAdjacentElement', function(b, d) {
        var e = L(d)
        b = c.call(this, b, d)
        e && P(a, d)
        L(b) && O(a, d)
        return b
      })
    }
    function d(b, c) {
      function d(b, c) {
        for (var d = []; b !== c; b = b.nextSibling) d.push(b)
        for (c = 0; c < d.length; c++) Q(a, d[c])
      }
      N(b, 'insertAdjacentHTML', function(a, b) {
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
    rd &&
      N(Element.prototype, 'attachShadow', function(a) {
        return (this.__CE_shadowRoot = a = rd.call(this, a))
      })
    sd && sd.get
      ? b(Element.prototype, sd)
      : Id && Id.get
        ? b(HTMLElement.prototype, Id)
        : Yc(a, function(a) {
            b(a, {
              enumerable: !0,
              configurable: !0,
              get: function() {
                return ld.call(this, !0).innerHTML
              },
              set: function(a) {
                var b = 'template' === this.localName,
                  c = b ? this.content : this,
                  d = ed.call(document, this.localName)
                for (d.innerHTML = a; 0 < c.childNodes.length; )
                  od.call(c, c.childNodes[0])
                for (a = b ? d.content : d; 0 < a.childNodes.length; )
                  md.call(c, a.childNodes[0])
              }
            })
          })
    N(Element.prototype, 'setAttribute', function(b, c) {
      if (1 !== this.__CE_state) return ud.call(this, b, c)
      var d = td.call(this, b)
      ud.call(this, b, c)
      c = td.call(this, b)
      a.attributeChangedCallback(this, b, d, c, null)
    })
    N(Element.prototype, 'setAttributeNS', function(b, c, d) {
      if (1 !== this.__CE_state) return xd.call(this, b, c, d)
      var e = wd.call(this, b, c)
      xd.call(this, b, c, d)
      d = wd.call(this, b, c)
      a.attributeChangedCallback(this, c, e, d, b)
    })
    N(Element.prototype, 'removeAttribute', function(b) {
      if (1 !== this.__CE_state) return vd.call(this, b)
      var c = td.call(this, b)
      vd.call(this, b)
      null !== c && a.attributeChangedCallback(this, b, c, null, null)
    })
    N(Element.prototype, 'removeAttributeNS', function(b, c) {
      if (1 !== this.__CE_state) return yd.call(this, b, c)
      var d = wd.call(this, b, c)
      yd.call(this, b, c)
      var e = wd.call(this, b, c)
      d !== e && a.attributeChangedCallback(this, c, d, e, b)
    })
    Jd
      ? c(HTMLElement.prototype, Jd)
      : zd
        ? c(Element.prototype, zd)
        : console.warn(
            'Custom Elements: `Element#insertAdjacentElement` was not patched.'
          )
    Kd
      ? d(HTMLElement.prototype, Kd)
      : Ad
        ? d(Element.prototype, Ad)
        : console.warn(
            'Custom Elements: `Element#insertAdjacentHTML` was not patched.'
          )
    Od(a, Element.prototype, { T: Bd, append: Cd })
    Rd(a)
  }
  var Td = window.customElements
  if (
    !Td ||
    Td.forcePolyfill ||
    'function' != typeof Td.define ||
    'function' != typeof Td.get
  ) {
    var Nd = new Wc()
    Md()
    Pd()
    Od(Nd, DocumentFragment.prototype, { T: jd, append: kd })
    Qd()
    Sd()
    document.__CE_hasRegistry = !0
    var customElements = new R(Nd)
    Object.defineProperty(window, 'customElements', {
      configurable: !0,
      enumerable: !0,
      value: customElements
    })
  } /*

Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
  function Ud() {
    this.end = this.start = 0
    this.rules = this.parent = this.previous = null
    this.cssText = this.parsedCssText = ''
    this.atRule = !1
    this.type = 0
    this.parsedSelector = this.selector = this.keyframesName = ''
  }
  function Vd(a) {
    a = a.replace(Wd, '').replace(Xd, '')
    var b = Yd,
      c = a,
      d = new Ud()
    d.start = 0
    d.end = c.length
    for (var e = d, f = 0, h = c.length; f < h; f++)
      if ('{' === c[f]) {
        e.rules || (e.rules = [])
        var g = e,
          k = g.rules[g.rules.length - 1] || null
        e = new Ud()
        e.start = f + 1
        e.parent = g
        e.previous = k
        g.rules.push(e)
      } else '}' === c[f] && ((e.end = f + 1), (e = e.parent || d))
    return b(d, a)
  }
  function Yd(a, b) {
    var c = b.substring(a.start, a.end - 1)
    a.parsedCssText = a.cssText = c.trim()
    a.parent &&
      ((c = b.substring(
        a.previous ? a.previous.end : a.parent.start,
        a.start - 1
      )),
      (c = Zd(c)),
      (c = c.replace($d, ' ')),
      (c = c.substring(c.lastIndexOf(';') + 1)),
      (c = a.parsedSelector = a.selector = c.trim()),
      (a.atRule = 0 === c.indexOf('@')),
      a.atRule
        ? 0 === c.indexOf('@media')
          ? (a.type = ae)
          : c.match(be) &&
            ((a.type = ce), (a.keyframesName = a.selector.split($d).pop()))
        : (a.type = 0 === c.indexOf('--') ? de : ee))
    if ((c = a.rules))
      for (var d = 0, e = c.length, f; d < e && (f = c[d]); d++) Yd(f, b)
    return a
  }
  function Zd(a) {
    return a.replace(/\\([0-9a-f]{1,6})\s/gi, function(a, c) {
      a = c
      for (c = 6 - a.length; c--; ) a = '0' + a
      return '\\' + a
    })
  }
  function fe(a, b, c) {
    c = void 0 === c ? '' : c
    var d = ''
    if (a.cssText || a.rules) {
      var e = a.rules,
        f
      if ((f = e))
        (f = e[0]), (f = !(f && f.selector && 0 === f.selector.indexOf('--')))
      if (f) {
        f = 0
        for (var h = e.length, g; f < h && (g = e[f]); f++) d = fe(g, b, d)
      } else
        b
          ? (b = a.cssText)
          : ((b = a.cssText),
            (b = b.replace(ge, '').replace(he, '')),
            (b = b.replace(ie, '').replace(je, ''))),
          (d = b.trim()) && (d = '  ' + d + '\n')
    }
    d &&
      (a.selector && (c += a.selector + ' {\n'),
      (c += d),
      a.selector && (c += '}\n\n'))
    return c
  }
  var ee = 1,
    ce = 7,
    ae = 4,
    de = 1e3,
    Wd = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
    Xd = /@import[^;]*;/gim,
    ge = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
    he = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
    ie = /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
    je = /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
    be = /^@[^\s]*keyframes/,
    $d = /\s+/g
  var S = !(window.ShadyDOM && window.ShadyDOM.inUse),
    ne
  function oe(a) {
    ne =
      a && a.shimcssproperties
        ? !1
        : S ||
          !(
            navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) ||
            !window.CSS ||
            !CSS.supports ||
            !CSS.supports('box-shadow', '0 0 0 var(--foo)')
          )
  }
  window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss
    ? (ne = window.ShadyCSS.nativeCss)
    : window.ShadyCSS
      ? (oe(window.ShadyCSS), (window.ShadyCSS = void 0))
      : oe(window.WebComponents && window.WebComponents.flags)
  var T = ne
  var pe = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
    qe = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,
    re = /(--[\w-]+)\s*([:,;)]|$)/gi,
    se = /(animation\s*:)|(animation-name\s*:)/,
    te = /@media\s(.*)/,
    ue = /\{[^}]*\}/g
  var ve = new Set()
  function we(a, b) {
    if (!a) return ''
    'string' === typeof a && (a = Vd(a))
    b && xe(a, b)
    return fe(a, T)
  }
  function ye(a) {
    !a.__cssRules && a.textContent && (a.__cssRules = Vd(a.textContent))
    return a.__cssRules || null
  }
  function ze(a) {
    return !!a.parent && a.parent.type === ce
  }
  function xe(a, b, c, d) {
    if (a) {
      var e = !1,
        f = a.type
      if (d && f === ae) {
        var h = a.selector.match(te)
        h && (window.matchMedia(h[1]).matches || (e = !0))
      }
      f === ee ? b(a) : c && f === ce ? c(a) : f === de && (e = !0)
      if ((a = a.rules) && !e) {
        e = 0
        f = a.length
        for (var g; e < f && (g = a[e]); e++) xe(g, b, c, d)
      }
    }
  }
  function Ae(a, b, c, d) {
    var e = document.createElement('style')
    b && e.setAttribute('scope', b)
    e.textContent = a
    Be(e, c, d)
    return e
  }
  var U = null
  function Be(a, b, c) {
    b = b || document.head
    b.insertBefore(a, (c && c.nextSibling) || b.firstChild)
    U
      ? a.compareDocumentPosition(U) === Node.DOCUMENT_POSITION_PRECEDING &&
        (U = a)
      : (U = a)
  }
  function Ce(a, b) {
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
    a = Ce(a.substring(e + 1), b)
    e = d.indexOf(',')
    return -1 === e
      ? b(c, d.trim(), '', a)
      : b(c, d.substring(0, e).trim(), d.substring(e + 1).trim(), a)
  }
  function De(a, b) {
    S
      ? a.setAttribute('class', b)
      : window.ShadyDOM.nativeMethods.setAttribute.call(a, 'class', b)
  }
  function V(a) {
    var b = a.localName,
      c = ''
    b
      ? -1 < b.indexOf('-') ||
        ((c = b), (b = (a.getAttribute && a.getAttribute('is')) || ''))
      : ((b = a.is), (c = a.extends))
    return { is: b, K: c }
  }
  function Ee() {}
  function Fe(a, b, c) {
    var d = W
    a.__styleScoped ? (a.__styleScoped = null) : Ge(d, a, b || '', c)
  }
  function Ge(a, b, c, d) {
    b.nodeType === Node.ELEMENT_NODE && He(b, c, d)
    if (
      (b =
        'template' === b.localName
          ? (b.content || b.Za).childNodes
          : b.children || b.childNodes)
    )
      for (var e = 0; e < b.length; e++) Ge(a, b[e], c, d)
  }
  function He(a, b, c) {
    if (b)
      if (a.classList)
        c
          ? (a.classList.remove('style-scope'), a.classList.remove(b))
          : (a.classList.add('style-scope'), a.classList.add(b))
      else if (a.getAttribute) {
        var d = a.getAttribute(Ie)
        c
          ? d && ((b = d.replace('style-scope', '').replace(b, '')), De(a, b))
          : De(a, (d ? d + ' ' : '') + 'style-scope ' + b)
      }
  }
  function Je(a, b, c) {
    var d = W,
      e = a.__cssBuild
    S || 'shady' === e
      ? (b = we(b, c))
      : ((a = V(a)), (b = Ke(d, b, a.is, a.K, c) + '\n\n'))
    return b.trim()
  }
  function Ke(a, b, c, d, e) {
    var f = Le(c, d)
    c = c ? Me + c : ''
    return we(b, function(b) {
      b.c || ((b.selector = b.l = Ne(a, b, a.b, c, f)), (b.c = !0))
      e && e(b, c, f)
    })
  }
  function Le(a, b) {
    return b ? '[is=' + a + ']' : a
  }
  function Ne(a, b, c, d, e) {
    var f = b.selector.split(Oe)
    if (!ze(b)) {
      b = 0
      for (var h = f.length, g; b < h && (g = f[b]); b++)
        f[b] = c.call(a, g, d, e)
    }
    return f.join(Oe)
  }
  function Pe(a) {
    return a.replace(Qe, function(a, c, d) {
      ;-1 < d.indexOf('+')
        ? (d = d.replace(/\+/g, '___'))
        : -1 < d.indexOf('___') && (d = d.replace(/___/g, '+'))
      return ':' + c + '(' + d + ')'
    })
  }
  Ee.prototype.b = function(a, b, c) {
    var d = !1
    a = a.trim()
    var e = Qe.test(a)
    e &&
      ((a = a.replace(Qe, function(a, b, c) {
        return ':' + b + '(' + c.replace(/\s/g, '') + ')'
      })),
      (a = Pe(a)))
    a = a.replace(Re, Se + ' $1')
    a = a.replace(Te, function(a, e, g) {
      d || ((a = Ue(g, e, b, c)), (d = d || a.stop), (e = a.Da), (g = a.value))
      return e + g
    })
    e && (a = Pe(a))
    return a
  }
  function Ue(a, b, c, d) {
    var e = a.indexOf(Ve)
    0 <= a.indexOf(Se) ? (a = We(a, d)) : 0 !== e && (a = c ? Xe(a, c) : a)
    c = !1
    0 <= e && ((b = ''), (c = !0))
    if (c) {
      var f = !0
      c &&
        (a = a.replace(Ye, function(a, b) {
          return ' > ' + b
        }))
    }
    a = a.replace(Ze, function(a, b, c) {
      return '[dir="' + c + '"] ' + b + ', ' + b + '[dir="' + c + '"]'
    })
    return { value: a, Da: b, stop: f }
  }
  function Xe(a, b) {
    a = a.split($e)
    a[0] += b
    return a.join($e)
  }
  function We(a, b) {
    var c = a.match(af)
    return (c = (c && c[2].trim()) || '')
      ? c[0].match(bf)
        ? a.replace(af, function(a, c, f) {
            return b + f
          })
        : c.split(bf)[0] === b
          ? c
          : cf
      : a.replace(Se, b)
  }
  function df(a) {
    a.selector === ef && (a.selector = 'html')
  }
  Ee.prototype.c = function(a) {
    return a.match(Ve) ? this.b(a, ff) : Xe(a.trim(), ff)
  }
  q.Object.defineProperties(Ee.prototype, {
    a: {
      configurable: !0,
      enumerable: !0,
      get: function() {
        return 'style-scope'
      }
    }
  })
  var Qe = /:(nth[-\w]+)\(([^)]+)\)/,
    ff = ':not(.style-scope)',
    Oe = ',',
    Te = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g,
    bf = /[[.:#*]/,
    Se = ':host',
    ef = ':root',
    Ve = '::slotted',
    Re = new RegExp('^(' + Ve + ')'),
    af = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
    Ye = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
    Ze = /(.*):dir\((?:(ltr|rtl))\)/,
    Me = '.',
    $e = ':',
    Ie = 'class',
    cf = 'should_not_match',
    W = new Ee()
  function gf(a, b, c, d) {
    this.w = a || null
    this.b = b || null
    this.fa = c || []
    this.G = null
    this.K = d || ''
    this.a = this.o = this.B = null
  }
  function X(a) {
    return a ? a.__styleInfo : null
  }
  function hf(a, b) {
    return (a.__styleInfo = b)
  }
  gf.prototype.c = function() {
    return this.w
  }
  gf.prototype._getStyleRules = gf.prototype.c
  function jf(a) {
    var b =
      this.matches ||
      this.matchesSelector ||
      this.mozMatchesSelector ||
      this.msMatchesSelector ||
      this.oMatchesSelector ||
      this.webkitMatchesSelector
    return b && b.call(this, a)
  }
  var kf = navigator.userAgent.match('Trident')
  function lf() {}
  function mf(a) {
    var b = {},
      c = [],
      d = 0
    xe(
      a,
      function(a) {
        nf(a)
        a.index = d++
        a = a.j.cssText
        for (var c; (c = re.exec(a)); ) {
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
  function nf(a) {
    if (!a.j) {
      var b = {},
        c = {}
      of(a, c) && ((b.v = c), (a.rules = null))
      b.cssText = a.parsedCssText.replace(ue, '').replace(pe, '')
      a.j = b
    }
  }
  function of(a, b) {
    var c = a.j
    if (c) {
      if (c.v) return Object.assign(b, c.v), !0
    } else {
      c = a.parsedCssText
      for (var d; (a = pe.exec(c)); ) {
        d = (a[2] || a[3]).trim()
        if ('inherit' !== d || 'unset' !== d) b[a[1].trim()] = d
        d = !0
      }
      return d
    }
  }
  function pf(a, b, c) {
    b &&
      (b =
        0 <= b.indexOf(';')
          ? qf(a, b, c)
          : Ce(b, function(b, e, f, h) {
              if (!e) return b + h
              ;(e = pf(a, c[e], c)) && 'initial' !== e
                ? 'apply-shim-inherit' === e && (e = 'inherit')
                : (e = pf(a, c[f] || f, c) || f)
              return b + (e || '') + h
            }))
    return (b && b.trim()) || ''
  }
  function qf(a, b, c) {
    b = b.split(';')
    for (var d = 0, e, f; d < b.length; d++)
      if ((e = b[d])) {
        qe.lastIndex = 0
        if ((f = qe.exec(e))) e = pf(a, c[f[1]], c)
        else if (((f = e.indexOf(':')), -1 !== f)) {
          var h = e.substring(f)
          h = h.trim()
          h = pf(a, h, c) || h
          e = e.substring(0, f) + h
        }
        b[d] =
          e && e.lastIndexOf(';') === e.length - 1 ? e.slice(0, -1) : e || ''
      }
    return b.join(';')
  }
  function rf(a, b) {
    var c = {},
      d = []
    xe(
      a,
      function(a) {
        a.j || nf(a)
        var e = a.l || a.parsedSelector
        b &&
          a.j.v &&
          e &&
          jf.call(b, e) &&
          (of(a, c),
          (a = a.index),
          (e = parseInt(a / 32, 10)),
          (d[e] = (d[e] || 0) | (1 << (a % 32))))
      },
      null,
      !0
    )
    return { v: c, key: d }
  }
  function sf(a, b, c, d) {
    b.j || nf(b)
    if (b.j.v) {
      var e = V(a)
      a = e.is
      e = e.K
      e = a ? Le(a, e) : 'html'
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
            (b.l || (b.l = Ne(W, b, W.b, a ? Me + a : '', e)), (c = b.l || e)),
          d({ Qa: c, Ja: g, ib: h })
    }
  }
  function tf(a, b) {
    var c = {},
      d = {},
      e = b && b.__cssBuild
    xe(
      b,
      function(b) {
        sf(a, b, e, function(e) {
          jf.call(a.g || a, e.Qa) && (e.Ja ? of(b, c) : of(b, d))
        })
      },
      null,
      !0
    )
    return { Pa: d, Ha: c }
  }
  function uf(a, b, c, d) {
    var e = V(b),
      f = Le(e.is, e.K),
      h = new RegExp(
        '(?:^|[^.#[:])' +
          (b.extends ? '\\' + f.slice(0, -1) + '\\]' : f) +
          '($|[.:[\\s>+~])'
      )
    e = X(b).w
    var g = vf(e, d)
    return Je(b, e, function(b) {
      var e = ''
      b.j || nf(b)
      b.j.cssText && (e = qf(a, b.j.cssText, c))
      b.cssText = e
      if (!S && !ze(b) && b.cssText) {
        var k = (e = b.cssText)
        null == b.ka && (b.ka = se.test(e))
        if (b.ka)
          if (null == b.S) {
            b.S = []
            for (var p in g)
              (k = g[p]), (k = k(e)), e !== k && ((e = k), b.S.push(p))
          } else {
            for (p = 0; p < b.S.length; ++p) (k = g[b.S[p]]), (e = k(e))
            k = e
          }
        b.cssText = k
        b.l = b.l || b.selector
        e = '.' + d
        p = b.l.split(',')
        k = 0
        for (var z = p.length, E; k < z && (E = p[k]); k++)
          p[k] = E.match(h) ? E.replace(f, e) : e + ' ' + E
        b.selector = p.join(',')
      }
    })
  }
  function vf(a, b) {
    a = a.b
    var c = {}
    if (!S && a)
      for (var d = 0, e = a[d]; d < a.length; e = a[++d]) {
        var f = e,
          h = b
        f.g = new RegExp('\\b' + f.keyframesName + '(?!\\B|-)', 'g')
        f.a = f.keyframesName + '-' + h
        f.l = f.l || f.selector
        f.selector = f.l.replace(f.keyframesName, f.a)
        c[e.keyframesName] = wf(e)
      }
    return c
  }
  function wf(a) {
    return function(b) {
      return b.replace(a.g, a.a)
    }
  }
  function xf(a, b) {
    var c = yf,
      d = ye(a)
    a.textContent = we(d, function(a) {
      var d = (a.cssText = a.parsedCssText)
      a.j &&
        a.j.cssText &&
        ((d = d.replace(ge, '').replace(he, '')), (a.cssText = qf(c, d, b)))
    })
  }
  q.Object.defineProperties(lf.prototype, {
    a: {
      configurable: !0,
      enumerable: !0,
      get: function() {
        return 'x-scope'
      }
    }
  })
  var yf = new lf()
  var zf = {},
    Af = window.customElements
  if (Af && !S) {
    var Bf = Af.define
    Af.define = function(a, b, c) {
      var d = document.createComment(' Shady DOM styles for ' + a + ' '),
        e = document.head
      e.insertBefore(d, (U ? U.nextSibling : null) || e.firstChild)
      U = d
      zf[a] = d
      Bf.call(Af, a, b, c)
    }
  }
  function Cf() {
    this.cache = {}
  }
  Cf.prototype.store = function(a, b, c, d) {
    var e = this.cache[a] || []
    e.push({ v: b, styleElement: c, o: d })
    100 < e.length && e.shift()
    this.cache[a] = e
  }
  Cf.prototype.fetch = function(a, b, c) {
    if ((a = this.cache[a]))
      for (var d = a.length - 1; 0 <= d; d--) {
        var e = a[d],
          f
        a: {
          for (f = 0; f < c.length; f++) {
            var h = c[f]
            if (e.v[h] !== b[h]) {
              f = !1
              break a
            }
          }
          f = !0
        }
        if (f) return e
      }
  }
  function Df() {}
  function Ef(a) {
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
              Fe(e, h, !0)
            else if (f.nodeType === Node.DOCUMENT_FRAGMENT_NODE && (f = f.host))
              if (((f = V(f).is), h === f))
                for (
                  e = window.ShadyDOM.nativeMethods.querySelectorAll.call(
                    e,
                    ':not(.' + W.a + ')'
                  ),
                    f = 0;
                  f < e.length;
                  f++
                )
                  He(e[f], h)
              else h && Fe(e, h, !0), Fe(e, f)
          }
        }
    }
  }
  if (!S) {
    var Ff = new MutationObserver(Ef),
      Gf = function(a) {
        Ff.observe(a, { childList: !0, subtree: !0 })
      }
    if (
      window.customElements &&
      !window.customElements.polyfillWrapFlushCallback
    )
      Gf(document)
    else {
      var Hf = function() {
        Gf(document.body)
      }
      window.HTMLImports
        ? window.HTMLImports.whenReady(Hf)
        : requestAnimationFrame(function() {
            if ('loading' === document.readyState) {
              var a = function() {
                Hf()
                document.removeEventListener('readystatechange', a)
              }
              document.addEventListener('readystatechange', a)
            } else Hf()
          })
    }
    Df = function() {
      Ef(Ff.takeRecords())
    }
  }
  var If = Df
  var Jf = {}
  var Kf = Promise.resolve()
  function Lf(a) {
    if ((a = Jf[a]))
      (a._applyShimCurrentVersion = a._applyShimCurrentVersion || 0),
        (a._applyShimValidatingVersion = a._applyShimValidatingVersion || 0),
        (a._applyShimNextVersion = (a._applyShimNextVersion || 0) + 1)
  }
  function Mf(a) {
    return a._applyShimCurrentVersion === a._applyShimNextVersion
  }
  function Nf(a) {
    a._applyShimValidatingVersion = a._applyShimNextVersion
    a.a ||
      ((a.a = !0),
      Kf.then(function() {
        a._applyShimCurrentVersion = a._applyShimNextVersion
        a.a = !1
      }))
  }
  var Of = null,
    Pf = (window.HTMLImports && window.HTMLImports.whenReady) || null,
    Qf
  function Rf(a) {
    requestAnimationFrame(function() {
      Pf
        ? Pf(a)
        : (Of ||
            ((Of = new Promise(function(a) {
              Qf = a
            })),
            'complete' === document.readyState
              ? Qf()
              : document.addEventListener('readystatechange', function() {
                  'complete' === document.readyState && Qf()
                })),
          Of.then(function() {
            a && a()
          }))
    })
  }
  var Sf = new Cf()
  function Y() {
    var a = this
    this.H = {}
    this.c = document.documentElement
    var b = new Ud()
    b.rules = []
    this.g = hf(this.c, new gf(b))
    this.m = !1
    this.b = this.a = null
    Rf(function() {
      Tf(a)
    })
  }
  n = Y.prototype
  n.sa = function() {
    If()
  }
  n.Fa = function(a) {
    return ye(a)
  }
  n.Sa = function(a) {
    return we(a)
  }
  n.prepareTemplate = function(a, b, c) {
    if (!a.b) {
      a.b = !0
      a.name = b
      a.extends = c
      Jf[b] = a
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
          if (!S) {
            var k = g.textContent
            ve.has(k) ||
              (ve.add(k), (k = g.cloneNode(!0)), document.head.appendChild(k))
            g.parentNode.removeChild(g)
          }
        } else e.push(g.textContent), g.parentNode.removeChild(g)
      }
      e = e.join('').trim()
      c = { is: b, extends: c, Xa: d }
      S || Fe(a.content, b)
      Tf(this)
      f = qe.test(e) || pe.test(e)
      qe.lastIndex = 0
      pe.lastIndex = 0
      e = Vd(e)
      f && T && this.a && this.a.transformRules(e, b)
      a._styleAst = e
      a.c = d
      d = []
      T || (d = mf(a._styleAst))
      if (!d.length || T)
        (e = S ? a.content : null),
          (b = zf[b]),
          (f = Je(c, a._styleAst)),
          (b = f.length ? Ae(f, c.is, e, b) : void 0),
          (a.ja = b)
      a.Aa = d
    }
  }
  function Uf(a) {
    !a.b &&
      window.ShadyCSS &&
      window.ShadyCSS.CustomStyleInterface &&
      ((a.b = window.ShadyCSS.CustomStyleInterface),
      (a.b.transformCallback = function(b) {
        a.pa(b)
      }),
      (a.b.validateCallback = function() {
        requestAnimationFrame(function() {
          ;(a.b.enqueued || a.m) && a.D()
        })
      }))
  }
  function Tf(a) {
    !a.a &&
      window.ShadyCSS &&
      window.ShadyCSS.ApplyShim &&
      ((a.a = window.ShadyCSS.ApplyShim), (a.a.invalidCallback = Lf))
    Uf(a)
  }
  n.D = function() {
    Tf(this)
    if (this.b) {
      var a = this.b.processStyles()
      if (this.b.enqueued) {
        if (T)
          for (var b = 0; b < a.length; b++) {
            var c = this.b.getStyleForCustomStyle(a[b])
            if (c && T && this.a) {
              var d = ye(c)
              Tf(this)
              this.a.transformRules(d)
              c.textContent = we(d)
            }
          }
        else
          for (Vf(this, this.c, this.g), b = 0; b < a.length; b++)
            (c = this.b.getStyleForCustomStyle(a[b])) && xf(c, this.g.B)
        this.b.enqueued = !1
        this.m && !T && this.styleDocument()
      }
    }
  }
  n.styleElement = function(a, b) {
    var c = V(a).is,
      d = X(a)
    if (!d) {
      var e = V(a)
      d = e.is
      e = e.K
      var f = zf[d]
      d = Jf[d]
      if (d) {
        var h = d._styleAst
        var g = d.Aa
      }
      d = hf(a, new gf(h, f, g, e))
    }
    a !== this.c && (this.m = !0)
    b && ((d.G = d.G || {}), Object.assign(d.G, b))
    if (T) {
      if (d.G) {
        b = d.G
        for (var k in b)
          null === k ? a.style.removeProperty(k) : a.style.setProperty(k, b[k])
      }
      if (((k = Jf[c]) || a === this.c) && k && k.ja && !Mf(k)) {
        if (Mf(k) || k._applyShimValidatingVersion !== k._applyShimNextVersion)
          Tf(this),
            this.a && this.a.transformRules(k._styleAst, c),
            (k.ja.textContent = Je(a, d.w)),
            Nf(k)
        S &&
          (c = a.shadowRoot) &&
          (c.querySelector('style').textContent = Je(a, d.w))
        d.w = k._styleAst
      }
    } else if ((Vf(this, a, d), d.fa && d.fa.length)) {
      c = d
      k = V(a).is
      d = (b = Sf.fetch(k, c.B, c.fa)) ? b.styleElement : null
      h = c.o
      ;(g = b && b.o) ||
        ((g = this.H[k] = (this.H[k] || 0) + 1), (g = k + '-' + g))
      c.o = g
      g = c.o
      e = yf
      e = d ? d.textContent || '' : uf(e, a, c.B, g)
      f = X(a)
      var l = f.a
      l &&
        !S &&
        l !== d &&
        (l._useCount--,
        0 >= l._useCount && l.parentNode && l.parentNode.removeChild(l))
      S
        ? f.a
          ? ((f.a.textContent = e), (d = f.a))
          : e && (d = Ae(e, g, a.shadowRoot, f.b))
        : d
          ? d.parentNode ||
            (kf && -1 < e.indexOf('@media') && (d.textContent = e),
            Be(d, null, f.b))
          : e && (d = Ae(e, g, null, f.b))
      d &&
        ((d._useCount = d._useCount || 0), f.a != d && d._useCount++, (f.a = d))
      g = d
      S ||
        ((d = c.o),
        (f = e = a.getAttribute('class') || ''),
        h &&
          (f = e.replace(new RegExp('\\s*x-scope\\s*' + h + '\\s*', 'g'), ' ')),
        (f += (f ? ' ' : '') + 'x-scope ' + d),
        e !== f && De(a, f))
      b || Sf.store(k, c.B, g, c.o)
    }
  }
  function Wf(a, b) {
    return (b = b.getRootNode().host) ? (X(b) ? b : Wf(a, b)) : a.c
  }
  function Vf(a, b, c) {
    a = Wf(a, b)
    var d = X(a)
    a = Object.create(d.B || null)
    var e = tf(b, c.w)
    b = rf(d.w, b).v
    Object.assign(a, e.Ha, b, e.Pa)
    b = c.G
    for (var f in b) if ((e = b[f]) || 0 === e) a[f] = e
    f = yf
    b = Object.getOwnPropertyNames(a)
    for (e = 0; e < b.length; e++) (d = b[e]), (a[d] = pf(f, a[d], a))
    c.B = a
  }
  n.styleDocument = function(a) {
    this.styleSubtree(this.c, a)
  }
  n.styleSubtree = function(a, b) {
    var c = a.shadowRoot
    ;(c || a === this.c) && this.styleElement(a, b)
    if ((b = c && (c.children || c.childNodes)))
      for (a = 0; a < b.length; a++) this.styleSubtree(b[a])
    else if ((a = a.children || a.childNodes))
      for (b = 0; b < a.length; b++) this.styleSubtree(a[b])
  }
  n.pa = function(a) {
    var b = this,
      c = ye(a)
    xe(c, function(a) {
      if (S) df(a)
      else {
        var c = W
        a.selector = a.parsedSelector
        df(a)
        a.selector = a.l = Ne(c, a, c.c, void 0, void 0)
      }
      T && (Tf(b), b.a && b.a.transformRule(a))
    })
    T ? (a.textContent = we(c)) : this.g.w.rules.push(c)
  }
  n.getComputedStyleValue = function(a, b) {
    var c
    T || (c = (X(a) || X(Wf(this, a))).B[b])
    return (c = c || window.getComputedStyle(a).getPropertyValue(b))
      ? c.trim()
      : ''
  }
  n.Ra = function(a, b) {
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
    T || ((c = X(a)) && c.o && b.push(yf.a, c.o))
    De(a, b.join(' '))
  }
  n.Ba = function(a) {
    return X(a)
  }
  Y.prototype.flush = Y.prototype.sa
  Y.prototype.prepareTemplate = Y.prototype.prepareTemplate
  Y.prototype.styleElement = Y.prototype.styleElement
  Y.prototype.styleDocument = Y.prototype.styleDocument
  Y.prototype.styleSubtree = Y.prototype.styleSubtree
  Y.prototype.getComputedStyleValue = Y.prototype.getComputedStyleValue
  Y.prototype.setElementClass = Y.prototype.Ra
  Y.prototype._styleInfoForNode = Y.prototype.Ba
  Y.prototype.transformCustomStyleForDocument = Y.prototype.pa
  Y.prototype.getStyleAst = Y.prototype.Fa
  Y.prototype.styleAstToString = Y.prototype.Sa
  Y.prototype.flushCustomStyles = Y.prototype.D
  Object.defineProperties(Y.prototype, {
    nativeShadow: {
      get: function() {
        return S
      }
    },
    nativeCss: {
      get: function() {
        return T
      }
    }
  })
  var Z = new Y(),
    Xf,
    Yf
  window.ShadyCSS &&
    ((Xf = window.ShadyCSS.ApplyShim),
    (Yf = window.ShadyCSS.CustomStyleInterface))
  window.ShadyCSS = {
    ScopingShim: Z,
    prepareTemplate: function(a, b, c) {
      Z.D()
      Z.prepareTemplate(a, b, c)
    },
    styleSubtree: function(a, b) {
      Z.D()
      Z.styleSubtree(a, b)
    },
    styleElement: function(a) {
      Z.D()
      Z.styleElement(a)
    },
    styleDocument: function(a) {
      Z.D()
      Z.styleDocument(a)
    },
    getComputedStyleValue: function(a, b) {
      return Z.getComputedStyleValue(a, b)
    },
    nativeCss: T,
    nativeShadow: S
  }
  Xf && (window.ShadyCSS.ApplyShim = Xf)
  Yf &&
    (window.ShadyCSS.CustomStyleInterface = Yf) /*

 Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
  var Zf = window.customElements,
    $f = window.HTMLImports,
    ag = window.HTMLTemplateElement
  window.WebComponents = window.WebComponents || {}
  if (Zf && Zf.polyfillWrapFlushCallback) {
    var bg,
      cg = function() {
        if (bg) {
          ag.Ca && ag.Ca(window.document)
          var a = bg
          bg = null
          a()
          return !0
        }
      },
      dg = $f.whenReady
    Zf.polyfillWrapFlushCallback(function(a) {
      bg = a
      dg(cg)
    })
    $f.whenReady = function(a) {
      dg(function() {
        cg() ? $f.whenReady(a) : a()
      })
    }
  }
  $f.whenReady(function() {
    requestAnimationFrame(function() {
      window.WebComponents.ready = !0
      document.dispatchEvent(
        new CustomEvent('WebComponentsReady', { bubbles: !0 })
      )
    })
  })
  var eg = document.createElement('style')
  eg.textContent =
    'body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n'
  var fg = document.querySelector('head')
  fg.insertBefore(eg, fg.firstChild)
}.call(this))

//# sourceMappingURL=webcomponents-hi-sd-ce.js.map
