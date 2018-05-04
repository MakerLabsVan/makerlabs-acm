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
  function ja(a) {
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
      if (B) return a.ownerDocument !== document ? a.ownerDocument : null
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
        ;(Ca && 'style' === a.localName) || a.addEventListener('error', c)
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
        return a.Aa(b)
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
      return a.childNodes.length ? a.querySelectorAll(b) : T
    }
    function p(a, b, c) {
      var d = a ? a.length : 0,
        e = c ? -1 : 1
      for (c = c ? d - 1 : 0; c < d && 0 <= c; c += e) b(a[c], c)
    }
    var x = document.createElement('link'),
      B = 'import' in x,
      T = x.querySelectorAll('*'),
      Da = null
    !1 === 'currentScript' in document &&
      Object.defineProperty(document, 'currentScript', {
        get: function() {
          return (
            Da ||
            ('complete' !== document.readyState
              ? document.scripts[document.scripts.length - 1]
              : null)
          )
        },
        configurable: !0
      })
    var vd = /(url\()([^)]*)(\))/g,
      wd = /(@import[\s]+(?!url\())([^;]*)(;)/g,
      xd = /(<link[^>]*)(rel=['|"]?stylesheet['|"]?[^>]*>)/g,
      F = {
        ua: function(a, b) {
          a.href && a.setAttribute('href', F.P(a.getAttribute('href'), b))
          a.src && a.setAttribute('src', F.P(a.getAttribute('src'), b))
          if ('style' === a.localName) {
            var c = F.fa(a.textContent, b, vd)
            a.textContent = F.fa(c, b, wd)
          }
        },
        fa: function(a, b, c) {
          return a.replace(c, function(a, c, d, e) {
            a = d.replace(/["']/g, '')
            b && (a = F.P(a, b))
            return c + "'" + a + "'" + e
          })
        },
        P: function(a, b) {
          if (void 0 === F.V) {
            F.V = !1
            try {
              var c = new URL('b', 'http://a')
              c.pathname = 'c%20d'
              F.V = 'http://a/c%20d' === c.href
            } catch (Ye) {}
          }
          if (F.V) return new URL(a, b).href
          c = F.la
          c ||
            ((c = document.implementation.createHTMLDocument('temp')),
            (F.la = c),
            (c.Z = c.createElement('base')),
            c.head.appendChild(c.Z),
            (c.Y = c.createElement('a')))
          c.Z.href = b
          c.Y.href = a
          return c.Y.href || a
        }
      },
      zb = {
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
              e.open('GET', a, zb.async)
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
      Ca =
        /Trident/.test(navigator.userAgent) ||
        /Edge\/\d./i.test(navigator.userAgent)
    k.prototype.loadImports = function(a) {
      var b = this
      a = m(a, 'link[rel=import]')
      p(a, function(a) {
        return b.B(a)
      })
    }
    k.prototype.B = function(a) {
      var b = this,
        c = a.href
      if (void 0 !== this.a[c]) {
        var d = this.a[c]
        d && d.__loaded && ((a.__import = d), this.i(a))
      } else
        this.b++,
          (this.a[c] = 'pending'),
          zb.load(
            c,
            function(a, d) {
              a = b.Ba(a, d || c)
              b.a[c] = a
              b.b--
              b.loadImports(a)
              b.F()
            },
            function() {
              b.a[c] = null
              b.b--
              b.F()
            }
          )
    }
    k.prototype.Ba = function(a, b) {
      if (!a) return document.createDocumentFragment()
      Ca &&
        (a = a.replace(xd, function(a, b, c) {
          return -1 === a.indexOf('type=') ? b + ' type=import-disable ' + c : a
        }))
      var c = document.createElement('template')
      c.innerHTML = a
      if (c.content) (a = c.content), l(a)
      else
        for (a = document.createDocumentFragment(); c.firstChild; )
          a.appendChild(c.firstChild)
      if ((c = a.querySelector('base')))
        (b = F.P(c.getAttribute('href'), b)), c.removeAttribute('href')
      c = m(
        a,
        'link[rel=import],link[rel=stylesheet][href][type=import-disable],style:not([type]),link[rel=stylesheet][href]:not([type]),script:not([type]),script[type="application/javascript"],script[type="text/javascript"]'
      )
      var d = 0
      p(c, function(a) {
        h(a)
        F.ua(a, b)
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
    k.prototype.F = function() {
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
                a.ya()))
          }
        this.Da(function() {
          c = !0
          d()
        })
        this.Ca(function() {
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
    k.prototype.Ca = function(a) {
      function b(e) {
        if (e < d) {
          var f = c[e],
            g = document.createElement('script')
          f.removeAttribute('import-dependency')
          p(f.attributes, function(a) {
            return g.setAttribute(a.name, a.value)
          })
          Da = g
          f.parentNode.replaceChild(g, f)
          h(g, function() {
            Da = null
            b(e + 1)
          })
        } else a()
      }
      var c = m(document, 'script[import-dependency]'),
        d = c.length
      b(0)
    }
    k.prototype.Da = function(a) {
      var b = m(
          document,
          'style[import-dependency],link[rel=stylesheet][import-dependency]'
        ),
        d = b.length
      if (d) {
        var e =
          Ca &&
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
    k.prototype.ya = function() {
      var a = this,
        b = m(document, 'link[rel=import]')
      p(
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
    k.prototype.Aa = function(a) {
      var b = this
      p(a, function(a) {
        return p(a.addedNodes, function(a) {
          a &&
            a.nodeType === Node.ELEMENT_NODE &&
            (g(a) ? b.B(a) : b.loadImports(a))
        })
      })
    }
    var Ea = null
    if (B)
      (x = m(document, 'link[rel=import]')),
        p(x, function(a) {
          ;(a.import && 'loading' === a.import.readyState) || (a.__loaded = !0)
        }),
        (x = function(a) {
          a = a.target
          g(a) && (a.__loaded = !0)
        }),
        document.addEventListener('load', x, !0),
        document.addEventListener('error', x, !0)
    else {
      var aa = Object.getOwnPropertyDescriptor(Node.prototype, 'baseURI')
      Object.defineProperty(
        (!aa || aa.configurable ? Node : Element).prototype,
        'baseURI',
        {
          get: function() {
            var a = g(this) ? this : c(this)
            return a
              ? a.href
              : aa && aa.get
                ? aa.get.call(this)
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
        Ea = new k()
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
    a.useNative = B
    a.whenReady = f
    a.importForElement = c
    a.loadImports = function(a) {
      Ea && Ea.loadImports(a)
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
  function ka() {
    this.ea = this.root = null
    this.N = !1
    this.v = this.J = this.W = this.assignedSlot = this.assignedNodes = this.C = null
    this.childNodes = this.nextSibling = this.previousSibling = this.lastChild = this.firstChild = this.parentNode = this.G = void 0
    this.ja = this.$ = !1
  }
  ka.prototype.toJSON = function() {
    return {}
  }
  function r(a) {
    a.T || (a.T = new ka())
    return a.T
  }
  function t(a) {
    return a && a.T
  }
  var u = window.ShadyDOM || {}
  u.wa = !(!Element.prototype.attachShadow || !Node.prototype.getRootNode)
  var la = Object.getOwnPropertyDescriptor(Node.prototype, 'firstChild')
  u.o = !!(la && la.configurable && la.get)
  u.ca = u.force || !u.wa
  var ma = navigator.userAgent.match('Trident'),
    na = navigator.userAgent.match('Edge')
  void 0 === u.ha && (u.ha = u.o && (ma || na))
  function v(a) {
    return (a = t(a)) && void 0 !== a.firstChild
  }
  function w(a) {
    return 'ShadyRoot' === a.na
  }
  function y(a) {
    a = a.getRootNode()
    if (w(a)) return a
  }
  var z = Element.prototype,
    oa =
      z.matches ||
      z.matchesSelector ||
      z.mozMatchesSelector ||
      z.msMatchesSelector ||
      z.oMatchesSelector ||
      z.webkitMatchesSelector
  function pa(a, b) {
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
  function qa(a, b) {
    for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d]
    for (d = 0; d < c.length; d++) pa(a, c[d])
    return a
  }
  function ra(a, b) {
    for (var c in b) a[c] = b[c]
  }
  var sa = document.createTextNode(''),
    ta = 0,
    ua = []
  new MutationObserver(function() {
    for (; ua.length; )
      try {
        ua.shift()()
      } catch (a) {
        throw ((sa.textContent = ta++), a)
      }
  }).observe(sa, { characterData: !0 })
  function va(a) {
    ua.push(a)
    sa.textContent = ta++
  }
  var wa = !!document.contains
  function xa(a, b) {
    for (; b; ) {
      if (b == a) return !0
      b = b.parentNode
    }
    return !1
  }
  var ya = [],
    za
  function Aa(a) {
    za || ((za = !0), va(Ba))
    ya.push(a)
  }
  function Ba() {
    za = !1
    for (var a = !!ya.length; ya.length; ) ya.shift()()
    return a
  }
  Ba.list = ya
  function Fa() {
    this.a = !1
    this.addedNodes = []
    this.removedNodes = []
    this.M = new Set()
  }
  function Ga(a) {
    a.a ||
      ((a.a = !0),
      va(function() {
        Ha(a)
      }))
  }
  function Ha(a) {
    if (a.a) {
      a.a = !1
      var b = a.takeRecords()
      b.length &&
        a.M.forEach(function(a) {
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
    c.C || (c.C = new Fa())
    c.C.M.add(b)
    var d = c.C
    return {
      ma: b,
      pa: d,
      oa: a,
      takeRecords: function() {
        return d.takeRecords()
      }
    }
  }
  function Ja(a) {
    var b = a && a.pa
    b && (b.M.delete(a.ma), b.M.size || (r(a.oa).C = null))
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
  var A = {},
    La = Element.prototype.insertBefore,
    Ma = Element.prototype.replaceChild,
    Na = Element.prototype.removeChild,
    Oa = Element.prototype.setAttribute,
    Pa = Element.prototype.removeAttribute,
    Qa = Element.prototype.cloneNode,
    Ra = Document.prototype.importNode,
    Sa = Element.prototype.addEventListener,
    Ta = Element.prototype.removeEventListener,
    Ua = Window.prototype.addEventListener,
    Va = Window.prototype.removeEventListener,
    Wa = Element.prototype.dispatchEvent,
    Xa = Node.prototype.contains || HTMLElement.prototype.contains,
    Ya = Document.prototype.getElementById,
    Za = Element.prototype.querySelector,
    $a = DocumentFragment.prototype.querySelector,
    ab = Document.prototype.querySelector,
    bb = Element.prototype.querySelectorAll,
    cb = DocumentFragment.prototype.querySelectorAll,
    db = Document.prototype.querySelectorAll
  A.appendChild = Element.prototype.appendChild
  A.insertBefore = La
  A.replaceChild = Ma
  A.removeChild = Na
  A.setAttribute = Oa
  A.removeAttribute = Pa
  A.cloneNode = Qa
  A.importNode = Ra
  A.addEventListener = Sa
  A.removeEventListener = Ta
  A.Ia = Ua
  A.Ja = Va
  A.dispatchEvent = Wa
  A.contains = Xa
  A.getElementById = Ya
  A.Ra = Za
  A.Ua = $a
  A.Pa = ab
  A.querySelector = function(a) {
    switch (this.nodeType) {
      case Node.ELEMENT_NODE:
        return Za.call(this, a)
      case Node.DOCUMENT_NODE:
        return ab.call(this, a)
      default:
        return $a.call(this, a)
    }
  }
  A.Sa = bb
  A.Va = cb
  A.Qa = db
  A.querySelectorAll = function(a) {
    switch (this.nodeType) {
      case Node.ELEMENT_NODE:
        return bb.call(this, a)
      case Node.DOCUMENT_NODE:
        return db.call(this, a)
      default:
        return cb.call(this, a)
    }
  }
  var eb = /[&\u00A0"]/g,
    fb = /[&\u00A0<>]/g
  function gb(a) {
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
  function hb(a) {
    for (var b = {}, c = 0; c < a.length; c++) b[a[c]] = !0
    return b
  }
  var ib = hb(
      'area base br col command embed hr img input keygen link meta param source track wbr'.split(
        ' '
      )
    ),
    jb = hb(
      'style script xmp iframe noembed noframes plaintext noscript'.split(' ')
    )
  function kb(a, b) {
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
              var m = g.localName, p = '<' + m, x = g.attributes, B = 0;
              (k = x[B]);
              B++
            )
              p += ' ' + k.name + '="' + k.value.replace(eb, gb) + '"'
            p += '>'
            g = ib[m] ? p : p + kb(g, l) + '</' + m + '>'
            break a
          case Node.TEXT_NODE:
            g = g.data
            g = k && jb[k.localName] ? g : g.replace(fb, gb)
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
  var C = {},
    D = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, !1),
    E = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT, null, !1)
  function lb(a) {
    var b = []
    D.currentNode = a
    for (a = D.firstChild(); a; ) b.push(a), (a = D.nextSibling())
    return b
  }
  C.parentNode = function(a) {
    D.currentNode = a
    return D.parentNode()
  }
  C.firstChild = function(a) {
    D.currentNode = a
    return D.firstChild()
  }
  C.lastChild = function(a) {
    D.currentNode = a
    return D.lastChild()
  }
  C.previousSibling = function(a) {
    D.currentNode = a
    return D.previousSibling()
  }
  C.nextSibling = function(a) {
    D.currentNode = a
    return D.nextSibling()
  }
  C.childNodes = lb
  C.parentElement = function(a) {
    E.currentNode = a
    return E.parentNode()
  }
  C.firstElementChild = function(a) {
    E.currentNode = a
    return E.firstChild()
  }
  C.lastElementChild = function(a) {
    E.currentNode = a
    return E.lastChild()
  }
  C.previousElementSibling = function(a) {
    E.currentNode = a
    return E.previousSibling()
  }
  C.nextElementSibling = function(a) {
    E.currentNode = a
    return E.nextSibling()
  }
  C.children = function(a) {
    var b = []
    E.currentNode = a
    for (a = E.firstChild(); a; ) b.push(a), (a = E.nextSibling())
    return b
  }
  C.innerHTML = function(a) {
    return kb(a, function(a) {
      return lb(a)
    })
  }
  C.textContent = function(a) {
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
  var G = {},
    mb = u.o,
    nb = [Node.prototype, Element.prototype, HTMLElement.prototype]
  function H(a) {
    var b
    a: {
      for (b = 0; b < nb.length; b++) {
        var c = nb[b]
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
  var I = mb
      ? {
          parentNode: H('parentNode'),
          firstChild: H('firstChild'),
          lastChild: H('lastChild'),
          previousSibling: H('previousSibling'),
          nextSibling: H('nextSibling'),
          childNodes: H('childNodes'),
          parentElement: H('parentElement'),
          previousElementSibling: H('previousElementSibling'),
          nextElementSibling: H('nextElementSibling'),
          innerHTML: H('innerHTML'),
          textContent: H('textContent'),
          firstElementChild: H('firstElementChild'),
          lastElementChild: H('lastElementChild'),
          children: H('children')
        }
      : {},
    ob = mb
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
    pb = mb
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
  G.da = I
  G.Ta = ob
  G.Oa = pb
  G.parentNode = function(a) {
    return I.parentNode.get.call(a)
  }
  G.firstChild = function(a) {
    return I.firstChild.get.call(a)
  }
  G.lastChild = function(a) {
    return I.lastChild.get.call(a)
  }
  G.previousSibling = function(a) {
    return I.previousSibling.get.call(a)
  }
  G.nextSibling = function(a) {
    return I.nextSibling.get.call(a)
  }
  G.childNodes = function(a) {
    return Array.prototype.slice.call(I.childNodes.get.call(a))
  }
  G.parentElement = function(a) {
    return I.parentElement.get.call(a)
  }
  G.previousElementSibling = function(a) {
    return I.previousElementSibling.get.call(a)
  }
  G.nextElementSibling = function(a) {
    return I.nextElementSibling.get.call(a)
  }
  G.innerHTML = function(a) {
    return I.innerHTML.get.call(a)
  }
  G.textContent = function(a) {
    return I.textContent.get.call(a)
  }
  G.children = function(a) {
    switch (a.nodeType) {
      case Node.DOCUMENT_FRAGMENT_NODE:
        a = ob.children.get.call(a)
        break
      case Node.DOCUMENT_NODE:
        a = pb.children.get.call(a)
        break
      default:
        a = I.children.get.call(a)
    }
    return Array.prototype.slice.call(a)
  }
  G.firstElementChild = function(a) {
    switch (a.nodeType) {
      case Node.DOCUMENT_FRAGMENT_NODE:
        return ob.firstElementChild.get.call(a)
      case Node.DOCUMENT_NODE:
        return pb.firstElementChild.get.call(a)
      default:
        return I.firstElementChild.get.call(a)
    }
  }
  G.lastElementChild = function(a) {
    switch (a.nodeType) {
      case Node.DOCUMENT_FRAGMENT_NODE:
        return ob.lastElementChild.get.call(a)
      case Node.DOCUMENT_NODE:
        return pb.lastElementChild.get.call(a)
      default:
        return I.lastElementChild.get.call(a)
    }
  }
  var J = u.ha ? G : C
  function qb(a) {
    for (; a.firstChild; ) a.removeChild(a.firstChild)
  }
  var rb = u.o,
    sb = document.implementation.createHTMLDocument('inert'),
    tb = Object.getOwnPropertyDescriptor(Node.prototype, 'isConnected'),
    ub = tb && tb.get,
    vb = Object.getOwnPropertyDescriptor(Document.prototype, 'activeElement'),
    wb = {
      parentElement: {
        get: function() {
          var a = t(this)
          ;(a = a && a.parentNode) &&
            a.nodeType !== Node.ELEMENT_NODE &&
            (a = null)
          return void 0 !== a ? a : J.parentElement(this)
        },
        configurable: !0
      },
      parentNode: {
        get: function() {
          var a = t(this)
          a = a && a.parentNode
          return void 0 !== a ? a : J.parentNode(this)
        },
        configurable: !0
      },
      nextSibling: {
        get: function() {
          var a = t(this)
          a = a && a.nextSibling
          return void 0 !== a ? a : J.nextSibling(this)
        },
        configurable: !0
      },
      previousSibling: {
        get: function() {
          var a = t(this)
          a = a && a.previousSibling
          return void 0 !== a ? a : J.previousSibling(this)
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
          return J.nextElementSibling(this)
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
          return J.previousElementSibling(this)
        },
        configurable: !0
      }
    },
    xb = {
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
    yb = {
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
          } else c = J.childNodes(this)
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
          return void 0 !== a ? a : J.firstChild(this)
        },
        configurable: !0
      },
      lastChild: {
        get: function() {
          var a = t(this)
          a = a && a.lastChild
          return void 0 !== a ? a : J.lastChild(this)
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
          return J.textContent(this)
        },
        set: function(a) {
          if ('undefined' === typeof a || null === a) a = ''
          switch (this.nodeType) {
            case Node.ELEMENT_NODE:
            case Node.DOCUMENT_FRAGMENT_NODE:
              if (!v(this) && rb) {
                var b = this.firstChild
                ;(b != this.lastChild || (b && b.nodeType != Node.TEXT_NODE)) &&
                  qb(this)
                G.da.textContent.set.call(this, a)
              } else
                qb(this),
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
          return J.firstElementChild(this)
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
          return J.lastElementChild(this)
        },
        configurable: !0
      },
      children: {
        get: function() {
          var a = v(this)
            ? Array.prototype.filter.call(this.childNodes, function(a) {
                return a.nodeType === Node.ELEMENT_NODE
              })
            : J.children(this)
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
            ? kb('template' === this.localName ? this.content : this)
            : J.innerHTML(this)
        },
        set: function(a) {
          var b = 'template' === this.localName ? this.content : this
          qb(b)
          var c = this.localName
          ;(c && 'template' !== c) || (c = 'div')
          c = sb.createElement(c)
          for (
            rb ? G.da.innerHTML.set.call(c, a) : (c.innerHTML = a);
            c.firstChild;

          )
            b.appendChild(c.firstChild)
        },
        configurable: !0
      }
    },
    Ab = {
      shadowRoot: {
        get: function() {
          var a = t(this)
          return (a && a.ea) || null
        },
        configurable: !0
      }
    },
    Bb = {
      activeElement: {
        get: function() {
          var a =
            vb && vb.get
              ? vb.get.call(document)
              : u.o
                ? void 0
                : document.activeElement
          if (a && a.nodeType) {
            var b = !!w(this)
            if (
              this === document ||
              (b && this.host !== a && A.contains.call(this.host, a))
            ) {
              for (b = y(a); b && b !== this; ) (a = b.host), (b = y(a))
              a = this === document ? (b ? null : a) : b === this ? a : null
            } else a = null
          } else a = null
          return a
        },
        set: function() {},
        configurable: !0
      }
    }
  function K(a, b, c) {
    for (var d in b) {
      var e = Object.getOwnPropertyDescriptor(a, d)
      ;(e && e.configurable) || (!e && c)
        ? Object.defineProperty(a, d, b[d])
        : c && console.warn('Could not define', d, 'on', a)
    }
  }
  function L(a) {
    K(a, wb)
    K(a, xb)
    K(a, yb)
    K(a, Bb)
  }
  function Cb() {
    var a = Db.prototype
    a.__proto__ = DocumentFragment.prototype
    K(a, wb, !0)
    K(a, yb, !0)
    K(a, Bb, !0)
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
  var Eb = u.o
      ? function() {}
      : function(a) {
          var b = r(a)
          b.$ || ((b.$ = !0), K(a, wb, !0), K(a, xb, !0))
        },
    Fb = u.o
      ? function() {}
      : function(a) {
          r(a).ja || (K(a, yb, !0), K(a, Ab, !0))
        }
  var Gb = J.childNodes
  function Hb(a, b, c) {
    Eb(a)
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
  function Ib(a, b) {
    var c = r(a)
    if (void 0 === c.firstChild)
      for (
        b = b || Gb(a),
          c.firstChild = b[0] || null,
          c.lastChild = b[b.length - 1] || null,
          Fb(a),
          c = 0;
        c < b.length;
        c++
      ) {
        var d = b[c],
          e = r(d)
        e.parentNode = a
        e.nextSibling = b[c + 1] || null
        e.previousSibling = b[c - 1] || null
        Eb(d)
      }
  }
  var Jb = J.parentNode
  function Kb(a, b, c) {
    if (b === a)
      throw Error(
        "Failed to execute 'appendChild' on 'Node': The new child element contains the parent."
      )
    if (c) {
      var d = t(c)
      d = d && d.parentNode
      if ((void 0 !== d && d !== a) || (void 0 === d && Jb(c) !== a))
        throw Error(
          "Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node."
        )
    }
    if (c === b) return b
    b.parentNode && Lb(b.parentNode, b)
    var e, f
    if (!b.__noInsertionPoint) {
      if ((f = e = y(a))) {
        var h
        'slot' === b.localName
          ? (h = [b])
          : b.querySelectorAll && (h = b.querySelectorAll('slot'))
        f = h && h.length ? h : void 0
      }
      f &&
        ((h = e),
        (d = f),
        (h.m = h.m || []),
        (h.f = h.f || []),
        (h.g = h.g || {}),
        h.m.push.apply(h.m, [].concat(d instanceof Array ? d : ja(ia(d)))))
    }
    ;('slot' === a.localName || f) && (e = e || y(a)) && M(e)
    if (v(a)) {
      e = c
      Fb(a)
      f = r(a)
      void 0 !== f.firstChild && (f.childNodes = null)
      if (b.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        f = b.childNodes
        for (h = 0; h < f.length; h++) Hb(f[h], a, e)
        e = r(b)
        f = void 0 !== e.firstChild ? null : void 0
        e.firstChild = e.lastChild = f
        e.childNodes = f
      } else Hb(b, a, e)
      e = t(a)
      if (Mb(a)) {
        M(e.root)
        var g = !0
      } else e.root && (g = !0)
    }
    g ||
      ((g = w(a) ? a.host : a),
      c
        ? ((c = Nb(c)), A.insertBefore.call(g, b, c))
        : A.appendChild.call(g, b))
    Ob(a, b)
    return b
  }
  function Lb(a, b) {
    if (b.parentNode !== a)
      throw Error('The node to be removed is not a child of this node: ' + b)
    var c = y(b),
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
      if (Mb(a)) {
        M(d.root)
        var k = !0
      }
    }
    Pb(b)
    if (c) {
      ;(e = a && 'slot' === a.localName) && (k = !0)
      if (c.f) {
        Qb(c)
        f = c.g
        for (T in f)
          for (h = f[T], g = 0; g < h.length; g++) {
            var l = h[g]
            if (xa(b, l)) {
              h.splice(g, 1)
              var m = c.f.indexOf(l)
              0 <= m && c.f.splice(m, 1)
              g--
              m = t(l)
              if ((l = m.v))
                for (var p = 0; p < l.length; p++) {
                  var x = l[p],
                    B = Rb(x)
                  B && A.removeChild.call(B, x)
                }
              m.v = []
              m.assignedNodes = []
              m = !0
            }
          }
        var T = m
      } else T = void 0
      ;(T || e) && M(c)
    }
    k ||
      ((k = w(a) ? a.host : a),
      ((!d.root && 'slot' !== b.localName) || k === Jb(b)) &&
        A.removeChild.call(k, b))
    Ob(a, null, b)
    return b
  }
  function Pb(a) {
    var b = t(a)
    if (b && void 0 !== b.G) {
      b = a.childNodes
      for (var c = 0, d = b.length, e; c < d && (e = b[c]); c++) Pb(e)
    }
    if ((a = t(a))) a.G = void 0
  }
  function Nb(a) {
    var b = a
    a &&
      'slot' === a.localName &&
      (b = (b = (b = t(a)) && b.v) && b.length ? b[0] : Nb(a.nextSibling))
    return b
  }
  function Mb(a) {
    return (a = (a = t(a)) && a.root) && Sb(a)
  }
  function Tb(a, b) {
    if ('slot' === b) (a = a.parentNode), Mb(a) && M(t(a).root)
    else if ('slot' === a.localName && 'name' === b && (b = y(a))) {
      if (b.f) {
        var c = a.ka,
          d = Ub(a)
        if (d !== c) {
          c = b.g[c]
          var e = c.indexOf(a)
          0 <= e && c.splice(e, 1)
          c = b.g[d] || (b.g[d] = [])
          c.push(a)
          1 < c.length && (b.g[d] = Vb(c))
        }
      }
      M(b)
    }
  }
  function Ob(a, b, c) {
    if ((a = (a = t(a)) && a.C))
      b && a.addedNodes.push(b), c && a.removedNodes.push(c), Ga(a)
  }
  function Wb(a) {
    if (a && a.nodeType) {
      var b = r(a),
        c = b.G
      void 0 === c &&
        (w(a)
          ? ((c = a), (b.G = c))
          : ((c = (c = a.parentNode) ? Wb(c) : a),
            A.contains.call(document.documentElement, a) && (b.G = c)))
      return c
    }
  }
  function Xb(a, b, c) {
    var d = []
    Yb(a.childNodes, b, c, d)
    return d
  }
  function Yb(a, b, c, d) {
    for (var e = 0, f = a.length, h; e < f && (h = a[e]); e++) {
      var g
      if ((g = h.nodeType === Node.ELEMENT_NODE)) {
        g = h
        var k = b,
          l = c,
          m = d,
          p = k(g)
        p && m.push(g)
        l && l(p) ? (g = p) : (Yb(g.childNodes, k, l, m), (g = void 0))
      }
      if (g) break
    }
  }
  var Zb = null
  function $b(a, b, c) {
    Zb || (Zb = window.ShadyCSS && window.ShadyCSS.ScopingShim)
    Zb && 'class' === b
      ? Zb.setElementClass(a, c)
      : (A.setAttribute.call(a, b, c), Tb(a, b))
  }
  function ac(a, b) {
    if (a.ownerDocument !== document) return A.importNode.call(document, a, b)
    var c = A.importNode.call(document, a, !1)
    if (b) {
      a = a.childNodes
      b = 0
      for (var d; b < a.length; b++) (d = ac(a[b], !0)), c.appendChild(d)
    }
    return c
  }
  var bc = '__eventWrappers' + Date.now(),
    cc = {
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
  function dc(a, b) {
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
  function ec(a, b) {
    if (!w) return a
    a = dc(a, !0)
    for (var c = 0, d, e, f, h; c < b.length; c++)
      if (
        ((d = b[c]),
        (f = d === window ? window : d.getRootNode()),
        f !== e && ((h = a.indexOf(f)), (e = f)),
        !w(f) || -1 < h)
      )
        return d
  }
  var fc = {
    get composed() {
      !1 !== this.isTrusted && void 0 === this.R && (this.R = cc[this.type])
      return this.R || !1
    },
    composedPath: function() {
      this.b || (this.b = dc(this.__target, this.composed))
      return this.b
    },
    get target() {
      return ec(this.currentTarget, this.composedPath())
    },
    get relatedTarget() {
      if (!this.S) return null
      this.c || (this.c = dc(this.S, !0))
      return ec(this.currentTarget, this.c)
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
  function gc(a) {
    function b(b, d) {
      b = new a(b, d)
      b.R = d && !!d.composed
      return b
    }
    ra(b, a)
    b.prototype = a.prototype
    return b
  }
  var hc = { focus: !0, blur: !0 }
  function ic(a) {
    return a.__target !== a.target || a.S !== a.relatedTarget
  }
  function jc(a, b, c) {
    if ((c = b.__handlers && b.__handlers[a.type] && b.__handlers[a.type][c]))
      for (
        var d = 0, e;
        (e = c[d]) &&
        (!ic(a) || a.target !== a.relatedTarget) &&
        (e.call(b, a), !a.i);
        d++
      );
  }
  function kc(a) {
    var b = a.composedPath()
    Object.defineProperty(a, 'currentTarget', {
      get: function() {
        return d
      },
      configurable: !0
    })
    for (var c = b.length - 1; 0 <= c; c--) {
      var d = b[c]
      jc(a, d, 'capture')
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
        if ((jc(a, d, 'bubble'), d !== window && (e = d.getRootNode()), a.a))
          break
    }
  }
  function lc(a, b, c, d, e, f) {
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
  function mc(a, b, c) {
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
          var g = (c && c.U) || this,
            k = b[bc]
          if (k) {
            if (-1 < lc(k, g, a, e, f, h)) return
          } else b[bc] = []
          k = function(e) {
            f && this.removeEventListener(a, b, c)
            e.__target || nc(e)
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
              if (ic(e) && e.target === e.relatedTarget)
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
          b[bc].push({
            node: g,
            type: a,
            capture: e,
            once: f,
            passive: h,
            Ka: k
          })
          hc[a]
            ? ((this.__handlers = this.__handlers || {}),
              (this.__handlers[a] = this.__handlers[a] || {
                capture: [],
                bubble: []
              }),
              this.__handlers[a][e ? 'capture' : 'bubble'].push(k))
            : (this instanceof Window ? A.Ia : A.addEventListener).call(
                this,
                a,
                k,
                c
              )
        }
    }
  }
  function oc(a, b, c) {
    if (b) {
      if (c && 'object' === typeof c) {
        var d = !!c.capture
        var e = !!c.once
        var f = !!c.passive
      } else (d = !!c), (f = e = !1)
      var h = (c && c.U) || this,
        g = void 0
      var k = null
      try {
        k = b[bc]
      } catch (l) {}
      k &&
        ((e = lc(k, h, a, d, e, f)),
        -1 < e && ((g = k.splice(e, 1)[0].Ka), k.length || (b[bc] = void 0)))
      ;(this instanceof Window ? A.Ja : A.removeEventListener).call(
        this,
        a,
        g || b,
        c
      )
      g &&
        hc[a] &&
        this.__handlers &&
        this.__handlers[a] &&
        ((a = this.__handlers[a][d ? 'capture' : 'bubble']),
        (g = a.indexOf(g)),
        -1 < g && a.splice(g, 1))
    }
  }
  function pc() {
    for (var a in hc)
      window.addEventListener(
        a,
        function(a) {
          a.__target || (nc(a), kc(a))
        },
        !0
      )
  }
  function nc(a) {
    a.__target = a.target
    a.S = a.relatedTarget
    if (u.o) {
      var b = Object.getPrototypeOf(a)
      if (!b.hasOwnProperty('__patchProto')) {
        var c = Object.create(b)
        c.Ma = b
        pa(c, fc)
        b.__patchProto = c
      }
      a.__proto__ = b.__patchProto
    } else pa(a, fc)
  }
  var qc = gc(window.Event),
    rc = gc(window.CustomEvent),
    sc = gc(window.MouseEvent)
  function tc(a, b) {
    return { index: a, H: [], L: b }
  }
  function uc(a, b, c, d) {
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
      for (var l = c.length, m = 0; m < k - h && vc(a[--g], c[--l]); ) m++
      g = m
    }
    e += h
    f += h
    b -= g
    d -= g
    if (0 == b - e && 0 == d - f) return []
    if (e == b) {
      for (b = tc(e, 0); f < d; ) b.H.push(c[f++])
      return [b]
    }
    if (f == d) return [tc(e, b - e)]
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
            x = b[l][m - 1] + 1
          b[l][m] = p < x ? p : x
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
          b || (b = tc(e, 0))
          b.L++
          e++
          b.H.push(c[f])
          f++
          break
        case 2:
          b || (b = tc(e, 0))
          b.L++
          e++
          break
        case 3:
          b || (b = tc(e, 0)), b.H.push(c[f]), f++
      }
    b && k.push(b)
    return k
  }
  function vc(a, b) {
    return a === b
  }
  var Rb = J.parentNode,
    wc = J.childNodes,
    xc = {}
  function yc(a) {
    var b = []
    do b.unshift(a)
    while ((a = a.parentNode))
    return b
  }
  function Db(a, b, c) {
    if (a !== xc) throw new TypeError('Illegal constructor')
    this.na = 'ShadyRoot'
    a = wc(b)
    this.host = b
    this.a = c && c.mode
    Ib(b, a)
    c = t(b)
    c.root = this
    c.ea = 'closed' !== this.a ? this : null
    c = r(this)
    c.firstChild = c.lastChild = c.parentNode = c.nextSibling = c.previousSibling = null
    c.childNodes = []
    this.K = !1
    this.m = this.g = this.f = null
    c = 0
    for (var d = a.length; c < d; c++) A.removeChild.call(b, a[c])
  }
  function M(a) {
    a.K ||
      ((a.K = !0),
      Aa(function() {
        return zc(a)
      }))
  }
  function zc(a) {
    for (var b; a; ) {
      a.K && (b = a)
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
  Db.prototype._renderRoot = function() {
    this.K = !1
    if (this.f) {
      Qb(this)
      for (var a = 0, b; a < this.f.length; a++) {
        b = this.f[a]
        var c = t(b),
          d = c.assignedNodes
        c.assignedNodes = []
        c.v = []
        if ((c.W = d))
          for (c = 0; c < d.length; c++) {
            var e = t(d[c])
            e.J = e.assignedSlot
            e.assignedSlot === b && (e.assignedSlot = null)
          }
      }
      for (b = this.host.firstChild; b; b = b.nextSibling) Ac(this, b)
      for (a = 0; a < this.f.length; a++) {
        b = this.f[a]
        d = t(b)
        if (!d.assignedNodes.length)
          for (c = b.firstChild; c; c = c.nextSibling) Ac(this, c, b)
        ;(c = (c = t(b.parentNode)) && c.root) && Sb(c) && c._renderRoot()
        Bc(this, d.v, d.assignedNodes)
        if ((c = d.W)) {
          for (e = 0; e < c.length; e++) t(c[e]).J = null
          d.W = null
          c.length > d.assignedNodes.length && (d.N = !0)
        }
        d.N && ((d.N = !1), Cc(this, b))
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
            h = t(h).v
            for (var g = 0; g < h.length; g++) e.push(h[g])
          } else e.push(h)
        }
        d = void 0
        f = wc(c)
        h = uc(e, e.length, f, f.length)
        for (var k = (g = 0); g < h.length && (d = h[g]); g++) {
          for (var l = 0, m; l < d.H.length && (m = d.H[l]); l++)
            Rb(m) === c && A.removeChild.call(c, m), f.splice(d.index + k, 1)
          k -= d.L
        }
        for (k = 0; k < h.length && (d = h[k]); k++)
          for (g = f[d.index], l = d.index; l < d.index + d.L; l++)
            (m = e[l]), A.insertBefore.call(c, m, g), f.splice(l, 0, m)
      }
    }
  }
  function Ac(a, b, c) {
    var d = r(b),
      e = d.J
    d.J = null
    c || (c = (a = a.g[b.slot || '__catchall']) && a[0])
    c
      ? (r(c).assignedNodes.push(b), (d.assignedSlot = c))
      : (d.assignedSlot = void 0)
    e !== d.assignedSlot && d.assignedSlot && (r(d.assignedSlot).N = !0)
  }
  function Bc(a, b, c) {
    for (var d = 0, e; d < c.length && (e = c[d]); d++)
      if ('slot' == e.localName) {
        var f = t(e).assignedNodes
        f && f.length && Bc(a, b, f)
      } else b.push(c[d])
  }
  function Cc(a, b) {
    A.dispatchEvent.call(b, new Event('slotchange'))
    b = t(b)
    b.assignedSlot && Cc(a, b.assignedSlot)
  }
  function Qb(a) {
    if (a.m && a.m.length) {
      for (var b = a.m, c, d = 0; d < b.length; d++) {
        var e = b[d]
        Ib(e)
        Ib(e.parentNode)
        var f = Ub(e)
        a.g[f] ? ((c = c || {}), (c[f] = !0), a.g[f].push(e)) : (a.g[f] = [e])
        a.f.push(e)
      }
      if (c) for (var h in c) a.g[h] = Vb(a.g[h])
      a.m = []
    }
  }
  function Ub(a) {
    var b = a.name || a.getAttribute('name') || '__catchall'
    return (a.ka = b)
  }
  function Vb(a) {
    return a.sort(function(a, c) {
      a = yc(a)
      for (var b = yc(c), e = 0; e < a.length; e++) {
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
  function Sb(a) {
    Qb(a)
    return !(!a.f || !a.f.length)
  }
  function Dc(a) {
    var b = a.getRootNode()
    w(b) && zc(b)
    return ((a = t(a)) && a.assignedSlot) || null
  }
  var Ec = {
      addEventListener: mc.bind(window),
      removeEventListener: oc.bind(window)
    },
    Fc = {
      addEventListener: mc,
      removeEventListener: oc,
      appendChild: function(a) {
        return Kb(this, a)
      },
      insertBefore: function(a, b) {
        return Kb(this, a, b)
      },
      removeChild: function(a) {
        return Lb(this, a)
      },
      replaceChild: function(a, b) {
        Kb(this, a, b)
        Lb(this, b)
        return a
      },
      cloneNode: function(a) {
        if ('template' == this.localName) var b = A.cloneNode.call(this, a)
        else if (((b = A.cloneNode.call(this, !1)), a)) {
          a = this.childNodes
          for (var c = 0, d; c < a.length; c++)
            (d = a[c].cloneNode(!0)), b.appendChild(d)
        }
        return b
      },
      getRootNode: function() {
        return Wb(this)
      },
      contains: function(a) {
        return xa(this, a)
      },
      dispatchEvent: function(a) {
        Ba()
        return A.dispatchEvent.call(this, a)
      }
    }
  Object.defineProperties(Fc, {
    isConnected: {
      get: function() {
        if (ub && ub.call(this)) return !0
        if (this.nodeType == Node.DOCUMENT_FRAGMENT_NODE) return !1
        var a = this.ownerDocument
        if (wa) {
          if (A.contains.call(a, this)) return !0
        } else if (
          a.documentElement &&
          A.contains.call(a.documentElement, this)
        )
          return !0
        for (a = this; a && !(a instanceof Document); )
          a = a.parentNode || (w(a) ? a.host : void 0)
        return !!(a && a instanceof Document)
      },
      configurable: !0
    }
  })
  var Gc = {
      get assignedSlot() {
        return Dc(this)
      }
    },
    Hc = {
      querySelector: function(a) {
        return (
          Xb(
            this,
            function(b) {
              return oa.call(b, a)
            },
            function(a) {
              return !!a
            }
          )[0] || null
        )
      },
      querySelectorAll: function(a, b) {
        if (b) {
          b = Array.prototype.slice.call(A.querySelectorAll(this, a))
          var c = this.getRootNode()
          return b.filter(function(a) {
            return a.getRootNode() == c
          })
        }
        return Xb(this, function(b) {
          return oa.call(b, a)
        })
      }
    },
    Ic = {
      assignedNodes: function(a) {
        if ('slot' === this.localName) {
          var b = this.getRootNode()
          w(b) && zc(b)
          return (b = t(this))
            ? (a && a.flatten ? b.v : b.assignedNodes) || []
            : []
        }
      }
    },
    Jc = qa(
      {
        setAttribute: function(a, b) {
          $b(this, a, b)
        },
        removeAttribute: function(a) {
          A.removeAttribute.call(this, a)
          Tb(this, a)
        },
        attachShadow: function(a) {
          if (!this) throw 'Must provide a host.'
          if (!a) throw 'Not enough arguments.'
          return new Db(xc, this, a)
        },
        get slot() {
          return this.getAttribute('slot')
        },
        set slot(a) {
          $b(this, 'slot', a)
        },
        get assignedSlot() {
          return Dc(this)
        }
      },
      Hc,
      Ic
    )
  Object.defineProperties(Jc, Ab)
  var Kc = qa(
    {
      importNode: function(a, b) {
        return ac(a, b)
      },
      getElementById: function(a) {
        return (
          Xb(
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
    Hc
  )
  Object.defineProperties(Kc, { _activeElement: Bb.activeElement })
  var Lc = HTMLElement.prototype.blur,
    Mc = qa({
      blur: function() {
        var a = t(this)
        ;(a = (a = a && a.root) && a.activeElement) ? a.blur() : Lc.call(this)
      }
    }),
    Nc = {
      addEventListener: function(a, b, c) {
        'object' !== typeof c && (c = { capture: !!c })
        c.U = this
        this.host.addEventListener(a, b, c)
      },
      removeEventListener: function(a, b, c) {
        'object' !== typeof c && (c = { capture: !!c })
        c.U = this
        this.host.removeEventListener(a, b, c)
      },
      getElementById: function(a) {
        return (
          Xb(
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
  function N(a, b) {
    for (var c = Object.getOwnPropertyNames(b), d = 0; d < c.length; d++) {
      var e = c[d],
        f = Object.getOwnPropertyDescriptor(b, e)
      f.value ? (a[e] = f.value) : Object.defineProperty(a, e, f)
    }
  }
  if (u.ca) {
    var ShadyDOM = {
      inUse: u.ca,
      patch: function(a) {
        Fb(a)
        Eb(a)
        return a
      },
      isShadyRoot: w,
      enqueue: Aa,
      flush: Ba,
      settings: u,
      filterMutations: Ka,
      observeChildren: Ia,
      unobserveChildren: Ja,
      nativeMethods: A,
      nativeTree: J
    }
    window.ShadyDOM = ShadyDOM
    window.Event = qc
    window.CustomEvent = rc
    window.MouseEvent = sc
    pc()
    var Oc =
      (window.customElements && window.customElements.nativeHTMLElement) ||
      HTMLElement
    N(Db.prototype, Nc)
    N(window.Node.prototype, Fc)
    N(window.Window.prototype, Ec)
    N(window.Text.prototype, Gc)
    N(window.DocumentFragment.prototype, Hc)
    N(window.Element.prototype, Jc)
    N(window.Document.prototype, Kc)
    window.HTMLSlotElement && N(window.HTMLSlotElement.prototype, Ic)
    N(Oc.prototype, Mc)
    u.o &&
      (L(window.Node.prototype),
      L(window.Text.prototype),
      L(window.DocumentFragment.prototype),
      L(window.Element.prototype),
      L(Oc.prototype),
      L(window.Document.prototype),
      window.HTMLSlotElement && L(window.HTMLSlotElement.prototype))
    Cb()
    window.ShadowRoot = Db
  } /*

Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
  function Pc() {
    this.end = this.start = 0
    this.rules = this.parent = this.previous = null
    this.cssText = this.parsedCssText = ''
    this.atRule = !1
    this.type = 0
    this.parsedSelector = this.selector = this.keyframesName = ''
  }
  function Qc(a) {
    a = a.replace(Rc, '').replace(Sc, '')
    var b = Tc,
      c = a,
      d = new Pc()
    d.start = 0
    d.end = c.length
    for (var e = d, f = 0, h = c.length; f < h; f++)
      if ('{' === c[f]) {
        e.rules || (e.rules = [])
        var g = e,
          k = g.rules[g.rules.length - 1] || null
        e = new Pc()
        e.start = f + 1
        e.parent = g
        e.previous = k
        g.rules.push(e)
      } else '}' === c[f] && ((e.end = f + 1), (e = e.parent || d))
    return b(d, a)
  }
  function Tc(a, b) {
    var c = b.substring(a.start, a.end - 1)
    a.parsedCssText = a.cssText = c.trim()
    a.parent &&
      ((c = b.substring(
        a.previous ? a.previous.end : a.parent.start,
        a.start - 1
      )),
      (c = Uc(c)),
      (c = c.replace(Vc, ' ')),
      (c = c.substring(c.lastIndexOf(';') + 1)),
      (c = a.parsedSelector = a.selector = c.trim()),
      (a.atRule = 0 === c.indexOf('@')),
      a.atRule
        ? 0 === c.indexOf('@media')
          ? (a.type = Wc)
          : c.match(Xc) &&
            ((a.type = Yc), (a.keyframesName = a.selector.split(Vc).pop()))
        : (a.type = 0 === c.indexOf('--') ? Zc : $c))
    if ((c = a.rules))
      for (var d = 0, e = c.length, f; d < e && (f = c[d]); d++) Tc(f, b)
    return a
  }
  function Uc(a) {
    return a.replace(/\\([0-9a-f]{1,6})\s/gi, function(a, c) {
      a = c
      for (c = 6 - a.length; c--; ) a = '0' + a
      return '\\' + a
    })
  }
  function ad(a, b, c) {
    c = void 0 === c ? '' : c
    var d = ''
    if (a.cssText || a.rules) {
      var e = a.rules,
        f
      if ((f = e))
        (f = e[0]), (f = !(f && f.selector && 0 === f.selector.indexOf('--')))
      if (f) {
        f = 0
        for (var h = e.length, g; f < h && (g = e[f]); f++) d = ad(g, b, d)
      } else
        b
          ? (b = a.cssText)
          : ((b = a.cssText),
            (b = b.replace(bd, '').replace(cd, '')),
            (b = b.replace(dd, '').replace(ed, ''))),
          (d = b.trim()) && (d = '  ' + d + '\n')
    }
    d &&
      (a.selector && (c += a.selector + ' {\n'),
      (c += d),
      a.selector && (c += '}\n\n'))
    return c
  }
  var $c = 1,
    Yc = 7,
    Wc = 4,
    Zc = 1e3,
    Rc = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
    Sc = /@import[^;]*;/gim,
    bd = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
    cd = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
    dd = /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
    ed = /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
    Xc = /^@[^\s]*keyframes/,
    Vc = /\s+/g
  var O = !(window.ShadyDOM && window.ShadyDOM.inUse),
    fd
  function gd(a) {
    fd =
      a && a.shimcssproperties
        ? !1
        : O ||
          !(
            navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) ||
            !window.CSS ||
            !CSS.supports ||
            !CSS.supports('box-shadow', '0 0 0 var(--foo)')
          )
  }
  window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss
    ? (fd = window.ShadyCSS.nativeCss)
    : window.ShadyCSS
      ? (gd(window.ShadyCSS), (window.ShadyCSS = void 0))
      : gd(window.WebComponents && window.WebComponents.flags)
  var P = fd
  var hd = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
    id = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,
    jd = /(--[\w-]+)\s*([:,;)]|$)/gi,
    kd = /(animation\s*:)|(animation-name\s*:)/,
    ld = /@media\s(.*)/,
    md = /\{[^}]*\}/g
  var nd = new Set()
  function Q(a, b) {
    if (!a) return ''
    'string' === typeof a && (a = Qc(a))
    b && R(a, b)
    return ad(a, P)
  }
  function od(a) {
    !a.__cssRules && a.textContent && (a.__cssRules = Qc(a.textContent))
    return a.__cssRules || null
  }
  function pd(a) {
    return !!a.parent && a.parent.type === Yc
  }
  function R(a, b, c, d) {
    if (a) {
      var e = !1,
        f = a.type
      if (d && f === Wc) {
        var h = a.selector.match(ld)
        h && (window.matchMedia(h[1]).matches || (e = !0))
      }
      f === $c ? b(a) : c && f === Yc ? c(a) : f === Zc && (e = !0)
      if ((a = a.rules) && !e) {
        e = 0
        f = a.length
        for (var g; e < f && (g = a[e]); e++) R(g, b, c, d)
      }
    }
  }
  function qd(a, b, c, d) {
    var e = document.createElement('style')
    b && e.setAttribute('scope', b)
    e.textContent = a
    rd(e, c, d)
    return e
  }
  var S = null
  function rd(a, b, c) {
    b = b || document.head
    b.insertBefore(a, (c && c.nextSibling) || b.firstChild)
    S
      ? a.compareDocumentPosition(S) === Node.DOCUMENT_POSITION_PRECEDING &&
        (S = a)
      : (S = a)
  }
  function sd(a, b) {
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
    a = sd(a.substring(e + 1), b)
    e = d.indexOf(',')
    return -1 === e
      ? b(c, d.trim(), '', a)
      : b(c, d.substring(0, e).trim(), d.substring(e + 1).trim(), a)
  }
  function td(a, b) {
    O
      ? a.setAttribute('class', b)
      : window.ShadyDOM.nativeMethods.setAttribute.call(a, 'class', b)
  }
  function U(a) {
    var b = a.localName,
      c = ''
    b
      ? -1 < b.indexOf('-') ||
        ((c = b), (b = (a.getAttribute && a.getAttribute('is')) || ''))
      : ((b = a.is), (c = a.extends))
    return { is: b, I: c }
  }
  function ud() {}
  function yd(a, b, c) {
    var d = V
    a.__styleScoped ? (a.__styleScoped = null) : zd(d, a, b || '', c)
  }
  function zd(a, b, c, d) {
    b.nodeType === Node.ELEMENT_NODE && Ad(b, c, d)
    if (
      (b =
        'template' === b.localName
          ? (b.content || b.Na).childNodes
          : b.children || b.childNodes)
    )
      for (var e = 0; e < b.length; e++) zd(a, b[e], c, d)
  }
  function Ad(a, b, c) {
    if (b)
      if (a.classList)
        c
          ? (a.classList.remove('style-scope'), a.classList.remove(b))
          : (a.classList.add('style-scope'), a.classList.add(b))
      else if (a.getAttribute) {
        var d = a.getAttribute(Bd)
        c
          ? d && ((b = d.replace('style-scope', '').replace(b, '')), td(a, b))
          : td(a, (d ? d + ' ' : '') + 'style-scope ' + b)
      }
  }
  function Cd(a, b, c) {
    var d = V,
      e = a.__cssBuild
    O || 'shady' === e
      ? (b = Q(b, c))
      : ((a = U(a)), (b = Dd(d, b, a.is, a.I, c) + '\n\n'))
    return b.trim()
  }
  function Dd(a, b, c, d, e) {
    var f = Ed(c, d)
    c = c ? Fd + c : ''
    return Q(b, function(b) {
      b.c || ((b.selector = b.j = Gd(a, b, a.b, c, f)), (b.c = !0))
      e && e(b, c, f)
    })
  }
  function Ed(a, b) {
    return b ? '[is=' + a + ']' : a
  }
  function Gd(a, b, c, d, e) {
    var f = b.selector.split(Hd)
    if (!pd(b)) {
      b = 0
      for (var h = f.length, g; b < h && (g = f[b]); b++)
        f[b] = c.call(a, g, d, e)
    }
    return f.join(Hd)
  }
  function Id(a) {
    return a.replace(Jd, function(a, c, d) {
      ;-1 < d.indexOf('+')
        ? (d = d.replace(/\+/g, '___'))
        : -1 < d.indexOf('___') && (d = d.replace(/___/g, '+'))
      return ':' + c + '(' + d + ')'
    })
  }
  ud.prototype.b = function(a, b, c) {
    var d = !1
    a = a.trim()
    var e = Jd.test(a)
    e &&
      ((a = a.replace(Jd, function(a, b, c) {
        return ':' + b + '(' + c.replace(/\s/g, '') + ')'
      })),
      (a = Id(a)))
    a = a.replace(Kd, Ld + ' $1')
    a = a.replace(Md, function(a, e, g) {
      d || ((a = Nd(g, e, b, c)), (d = d || a.stop), (e = a.ta), (g = a.value))
      return e + g
    })
    e && (a = Id(a))
    return a
  }
  function Nd(a, b, c, d) {
    var e = a.indexOf(Od)
    0 <= a.indexOf(Ld) ? (a = Pd(a, d)) : 0 !== e && (a = c ? Qd(a, c) : a)
    c = !1
    0 <= e && ((b = ''), (c = !0))
    if (c) {
      var f = !0
      c &&
        (a = a.replace(Rd, function(a, b) {
          return ' > ' + b
        }))
    }
    a = a.replace(Sd, function(a, b, c) {
      return '[dir="' + c + '"] ' + b + ', ' + b + '[dir="' + c + '"]'
    })
    return { value: a, ta: b, stop: f }
  }
  function Qd(a, b) {
    a = a.split(Td)
    a[0] += b
    return a.join(Td)
  }
  function Pd(a, b) {
    var c = a.match(Ud)
    return (c = (c && c[2].trim()) || '')
      ? c[0].match(Vd)
        ? a.replace(Ud, function(a, c, f) {
            return b + f
          })
        : c.split(Vd)[0] === b
          ? c
          : Wd
      : a.replace(Ld, b)
  }
  function Xd(a) {
    a.selector === Yd && (a.selector = 'html')
  }
  ud.prototype.c = function(a) {
    return a.match(Od) ? this.b(a, Zd) : Qd(a.trim(), Zd)
  }
  q.Object.defineProperties(ud.prototype, {
    a: {
      configurable: !0,
      enumerable: !0,
      get: function() {
        return 'style-scope'
      }
    }
  })
  var Jd = /:(nth[-\w]+)\(([^)]+)\)/,
    Zd = ':not(.style-scope)',
    Hd = ',',
    Md = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g,
    Vd = /[[.:#*]/,
    Ld = ':host',
    Yd = ':root',
    Od = '::slotted',
    Kd = new RegExp('^(' + Od + ')'),
    Ud = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
    Rd = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
    Sd = /(.*):dir\((?:(ltr|rtl))\)/,
    Fd = '.',
    Td = ':',
    Bd = 'class',
    Wd = 'should_not_match',
    V = new ud()
  function $d(a, b, c, d) {
    this.u = a || null
    this.b = b || null
    this.X = c || []
    this.D = null
    this.I = d || ''
    this.a = this.l = this.w = null
  }
  function W(a) {
    return a ? a.__styleInfo : null
  }
  function ae(a, b) {
    return (a.__styleInfo = b)
  }
  $d.prototype.c = function() {
    return this.u
  }
  $d.prototype._getStyleRules = $d.prototype.c
  function be(a) {
    var b =
      this.matches ||
      this.matchesSelector ||
      this.mozMatchesSelector ||
      this.msMatchesSelector ||
      this.oMatchesSelector ||
      this.webkitMatchesSelector
    return b && b.call(this, a)
  }
  var ce = navigator.userAgent.match('Trident')
  function de() {}
  function ee(a) {
    var b = {},
      c = [],
      d = 0
    R(
      a,
      function(a) {
        fe(a)
        a.index = d++
        a = a.h.cssText
        for (var c; (c = jd.exec(a)); ) {
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
  function fe(a) {
    if (!a.h) {
      var b = {},
        c = {}
      ge(a, c) && ((b.s = c), (a.rules = null))
      b.cssText = a.parsedCssText.replace(md, '').replace(hd, '')
      a.h = b
    }
  }
  function ge(a, b) {
    var c = a.h
    if (c) {
      if (c.s) return Object.assign(b, c.s), !0
    } else {
      c = a.parsedCssText
      for (var d; (a = hd.exec(c)); ) {
        d = (a[2] || a[3]).trim()
        if ('inherit' !== d || 'unset' !== d) b[a[1].trim()] = d
        d = !0
      }
      return d
    }
  }
  function he(a, b, c) {
    b &&
      (b =
        0 <= b.indexOf(';')
          ? ie(a, b, c)
          : sd(b, function(b, e, f, h) {
              if (!e) return b + h
              ;(e = he(a, c[e], c)) && 'initial' !== e
                ? 'apply-shim-inherit' === e && (e = 'inherit')
                : (e = he(a, c[f] || f, c) || f)
              return b + (e || '') + h
            }))
    return (b && b.trim()) || ''
  }
  function ie(a, b, c) {
    b = b.split(';')
    for (var d = 0, e, f; d < b.length; d++)
      if ((e = b[d])) {
        id.lastIndex = 0
        if ((f = id.exec(e))) e = he(a, c[f[1]], c)
        else if (((f = e.indexOf(':')), -1 !== f)) {
          var h = e.substring(f)
          h = h.trim()
          h = he(a, h, c) || h
          e = e.substring(0, f) + h
        }
        b[d] =
          e && e.lastIndexOf(';') === e.length - 1 ? e.slice(0, -1) : e || ''
      }
    return b.join(';')
  }
  function je(a, b) {
    var c = {},
      d = []
    R(
      a,
      function(a) {
        a.h || fe(a)
        var e = a.j || a.parsedSelector
        b &&
          a.h.s &&
          e &&
          be.call(b, e) &&
          (ge(a, c),
          (a = a.index),
          (e = parseInt(a / 32, 10)),
          (d[e] = (d[e] || 0) | (1 << (a % 32))))
      },
      null,
      !0
    )
    return { s: c, key: d }
  }
  function ke(a, b, c, d) {
    b.h || fe(b)
    if (b.h.s) {
      var e = U(a)
      a = e.is
      e = e.I
      e = a ? Ed(a, e) : 'html'
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
            (b.j || (b.j = Gd(V, b, V.b, a ? Fd + a : '', e)), (c = b.j || e)),
          d({ Fa: c, za: g, Wa: h })
    }
  }
  function le(a, b) {
    var c = {},
      d = {},
      e = b && b.__cssBuild
    R(
      b,
      function(b) {
        ke(a, b, e, function(e) {
          be.call(a.i || a, e.Fa) && (e.za ? ge(b, c) : ge(b, d))
        })
      },
      null,
      !0
    )
    return { Ea: d, xa: c }
  }
  function me(a, b, c, d) {
    var e = U(b),
      f = Ed(e.is, e.I),
      h = new RegExp(
        '(?:^|[^.#[:])' +
          (b.extends ? '\\' + f.slice(0, -1) + '\\]' : f) +
          '($|[.:[\\s>+~])'
      )
    e = W(b).u
    var g = ne(e, d)
    return Cd(b, e, function(b) {
      var e = ''
      b.h || fe(b)
      b.h.cssText && (e = ie(a, b.h.cssText, c))
      b.cssText = e
      if (!O && !pd(b) && b.cssText) {
        var k = (e = b.cssText)
        null == b.ba && (b.ba = kd.test(e))
        if (b.ba)
          if (null == b.O) {
            b.O = []
            for (var p in g)
              (k = g[p]), (k = k(e)), e !== k && ((e = k), b.O.push(p))
          } else {
            for (p = 0; p < b.O.length; ++p) (k = g[b.O[p]]), (e = k(e))
            k = e
          }
        b.cssText = k
        b.j = b.j || b.selector
        e = '.' + d
        p = b.j.split(',')
        k = 0
        for (var x = p.length, B; k < x && (B = p[k]); k++)
          p[k] = B.match(h) ? B.replace(f, e) : e + ' ' + B
        b.selector = p.join(',')
      }
    })
  }
  function ne(a, b) {
    a = a.b
    var c = {}
    if (!O && a)
      for (var d = 0, e = a[d]; d < a.length; e = a[++d]) {
        var f = e,
          h = b
        f.i = new RegExp('\\b' + f.keyframesName + '(?!\\B|-)', 'g')
        f.a = f.keyframesName + '-' + h
        f.j = f.j || f.selector
        f.selector = f.j.replace(f.keyframesName, f.a)
        c[e.keyframesName] = oe(e)
      }
    return c
  }
  function oe(a) {
    return function(b) {
      return b.replace(a.i, a.a)
    }
  }
  function pe(a, b) {
    var c = qe,
      d = od(a)
    a.textContent = Q(d, function(a) {
      var d = (a.cssText = a.parsedCssText)
      a.h &&
        a.h.cssText &&
        ((d = d.replace(bd, '').replace(cd, '')), (a.cssText = ie(c, d, b)))
    })
  }
  q.Object.defineProperties(de.prototype, {
    a: {
      configurable: !0,
      enumerable: !0,
      get: function() {
        return 'x-scope'
      }
    }
  })
  var qe = new de()
  var re = {},
    se = window.customElements
  if (se && !O) {
    var te = se.define
    se.define = function(a, b, c) {
      var d = document.createComment(' Shady DOM styles for ' + a + ' '),
        e = document.head
      e.insertBefore(d, (S ? S.nextSibling : null) || e.firstChild)
      S = d
      re[a] = d
      te.call(se, a, b, c)
    }
  }
  function ue() {
    this.cache = {}
  }
  ue.prototype.store = function(a, b, c, d) {
    var e = this.cache[a] || []
    e.push({ s: b, styleElement: c, l: d })
    100 < e.length && e.shift()
    this.cache[a] = e
  }
  ue.prototype.fetch = function(a, b, c) {
    if ((a = this.cache[a]))
      for (var d = a.length - 1; 0 <= d; d--) {
        var e = a[d],
          f
        a: {
          for (f = 0; f < c.length; f++) {
            var h = c[f]
            if (e.s[h] !== b[h]) {
              f = !1
              break a
            }
          }
          f = !0
        }
        if (f) return e
      }
  }
  function ve() {}
  function we(a) {
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
            g = h.indexOf(V.a)
            if ((h = -1 < g ? h[g + 1] : '') && f === e.ownerDocument)
              yd(e, h, !0)
            else if (f.nodeType === Node.DOCUMENT_FRAGMENT_NODE && (f = f.host))
              if (((f = U(f).is), h === f))
                for (
                  e = window.ShadyDOM.nativeMethods.querySelectorAll.call(
                    e,
                    ':not(.' + V.a + ')'
                  ),
                    f = 0;
                  f < e.length;
                  f++
                )
                  Ad(e[f], h)
              else h && yd(e, h, !0), yd(e, f)
          }
        }
    }
  }
  if (!O) {
    var xe = new MutationObserver(we),
      ye = function(a) {
        xe.observe(a, { childList: !0, subtree: !0 })
      }
    if (
      window.customElements &&
      !window.customElements.polyfillWrapFlushCallback
    )
      ye(document)
    else {
      var ze = function() {
        ye(document.body)
      }
      window.HTMLImports
        ? window.HTMLImports.whenReady(ze)
        : requestAnimationFrame(function() {
            if ('loading' === document.readyState) {
              var a = function() {
                ze()
                document.removeEventListener('readystatechange', a)
              }
              document.addEventListener('readystatechange', a)
            } else ze()
          })
    }
    ve = function() {
      we(xe.takeRecords())
    }
  }
  var Ae = ve
  var Be = {}
  var Ce = Promise.resolve()
  function De(a) {
    if ((a = Be[a]))
      (a._applyShimCurrentVersion = a._applyShimCurrentVersion || 0),
        (a._applyShimValidatingVersion = a._applyShimValidatingVersion || 0),
        (a._applyShimNextVersion = (a._applyShimNextVersion || 0) + 1)
  }
  function Ee(a) {
    return a._applyShimCurrentVersion === a._applyShimNextVersion
  }
  function Fe(a) {
    a._applyShimValidatingVersion = a._applyShimNextVersion
    a.a ||
      ((a.a = !0),
      Ce.then(function() {
        a._applyShimCurrentVersion = a._applyShimNextVersion
        a.a = !1
      }))
  }
  var Ge = null,
    He = (window.HTMLImports && window.HTMLImports.whenReady) || null,
    Ie
  function Je(a) {
    requestAnimationFrame(function() {
      He
        ? He(a)
        : (Ge ||
            ((Ge = new Promise(function(a) {
              Ie = a
            })),
            'complete' === document.readyState
              ? Ie()
              : document.addEventListener('readystatechange', function() {
                  'complete' === document.readyState && Ie()
                })),
          Ge.then(function() {
            a && a()
          }))
    })
  }
  var Ke = new ue()
  function X() {
    var a = this
    this.F = {}
    this.c = document.documentElement
    var b = new Pc()
    b.rules = []
    this.i = ae(this.c, new $d(b))
    this.B = !1
    this.b = this.a = null
    Je(function() {
      Y(a)
    })
  }
  n = X.prototype
  n.ia = function() {
    Ae()
  }
  n.va = function(a) {
    return od(a)
  }
  n.Ha = function(a) {
    return Q(a)
  }
  n.prepareTemplate = function(a, b, c) {
    if (!a.b) {
      a.b = !0
      a.name = b
      a.extends = c
      Be[b] = a
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
          if (!O) {
            var k = g.textContent
            nd.has(k) ||
              (nd.add(k), (k = g.cloneNode(!0)), document.head.appendChild(k))
            g.parentNode.removeChild(g)
          }
        } else e.push(g.textContent), g.parentNode.removeChild(g)
      }
      e = e.join('').trim()
      c = { is: b, extends: c, La: d }
      O || yd(a.content, b)
      Y(this)
      f = id.test(e) || hd.test(e)
      id.lastIndex = 0
      hd.lastIndex = 0
      e = Qc(e)
      f && P && this.a && this.a.transformRules(e, b)
      a._styleAst = e
      a.c = d
      d = []
      P || (d = ee(a._styleAst))
      if (!d.length || P)
        (e = O ? a.content : null),
          (b = re[b]),
          (f = Cd(c, a._styleAst)),
          (b = f.length ? qd(f, c.is, e, b) : void 0),
          (a.aa = b)
      a.qa = d
    }
  }
  function Le(a) {
    !a.b &&
      window.ShadyCSS &&
      window.ShadyCSS.CustomStyleInterface &&
      ((a.b = window.ShadyCSS.CustomStyleInterface),
      (a.b.transformCallback = function(b) {
        a.ga(b)
      }),
      (a.b.validateCallback = function() {
        requestAnimationFrame(function() {
          ;(a.b.enqueued || a.B) && a.A()
        })
      }))
  }
  function Y(a) {
    !a.a &&
      window.ShadyCSS &&
      window.ShadyCSS.ApplyShim &&
      ((a.a = window.ShadyCSS.ApplyShim), (a.a.invalidCallback = De))
    Le(a)
  }
  n.A = function() {
    Y(this)
    if (this.b) {
      var a = this.b.processStyles()
      if (this.b.enqueued) {
        if (P)
          for (var b = 0; b < a.length; b++) {
            var c = this.b.getStyleForCustomStyle(a[b])
            if (c && P && this.a) {
              var d = od(c)
              Y(this)
              this.a.transformRules(d)
              c.textContent = Q(d)
            }
          }
        else
          for (Me(this, this.c, this.i), b = 0; b < a.length; b++)
            (c = this.b.getStyleForCustomStyle(a[b])) && pe(c, this.i.w)
        this.b.enqueued = !1
        this.B && !P && this.styleDocument()
      }
    }
  }
  n.styleElement = function(a, b) {
    var c = U(a).is,
      d = W(a)
    if (!d) {
      var e = U(a)
      d = e.is
      e = e.I
      var f = re[d]
      d = Be[d]
      if (d) {
        var h = d._styleAst
        var g = d.qa
      }
      d = ae(a, new $d(h, f, g, e))
    }
    a !== this.c && (this.B = !0)
    b && ((d.D = d.D || {}), Object.assign(d.D, b))
    if (P) {
      if (d.D) {
        b = d.D
        for (var k in b)
          null === k ? a.style.removeProperty(k) : a.style.setProperty(k, b[k])
      }
      if (((k = Be[c]) || a === this.c) && k && k.aa && !Ee(k)) {
        if (Ee(k) || k._applyShimValidatingVersion !== k._applyShimNextVersion)
          Y(this),
            this.a && this.a.transformRules(k._styleAst, c),
            (k.aa.textContent = Cd(a, d.u)),
            Fe(k)
        O &&
          (c = a.shadowRoot) &&
          (c.querySelector('style').textContent = Cd(a, d.u))
        d.u = k._styleAst
      }
    } else if ((Me(this, a, d), d.X && d.X.length)) {
      c = d
      k = U(a).is
      d = (b = Ke.fetch(k, c.w, c.X)) ? b.styleElement : null
      h = c.l
      ;(g = b && b.l) ||
        ((g = this.F[k] = (this.F[k] || 0) + 1), (g = k + '-' + g))
      c.l = g
      g = c.l
      e = qe
      e = d ? d.textContent || '' : me(e, a, c.w, g)
      f = W(a)
      var l = f.a
      l &&
        !O &&
        l !== d &&
        (l._useCount--,
        0 >= l._useCount && l.parentNode && l.parentNode.removeChild(l))
      O
        ? f.a
          ? ((f.a.textContent = e), (d = f.a))
          : e && (d = qd(e, g, a.shadowRoot, f.b))
        : d
          ? d.parentNode ||
            (ce && -1 < e.indexOf('@media') && (d.textContent = e),
            rd(d, null, f.b))
          : e && (d = qd(e, g, null, f.b))
      d &&
        ((d._useCount = d._useCount || 0), f.a != d && d._useCount++, (f.a = d))
      g = d
      O ||
        ((d = c.l),
        (f = e = a.getAttribute('class') || ''),
        h &&
          (f = e.replace(new RegExp('\\s*x-scope\\s*' + h + '\\s*', 'g'), ' ')),
        (f += (f ? ' ' : '') + 'x-scope ' + d),
        e !== f && td(a, f))
      b || Ke.store(k, c.w, g, c.l)
    }
  }
  function Ne(a, b) {
    return (b = b.getRootNode().host) ? (W(b) ? b : Ne(a, b)) : a.c
  }
  function Me(a, b, c) {
    a = Ne(a, b)
    var d = W(a)
    a = Object.create(d.w || null)
    var e = le(b, c.u)
    b = je(d.u, b).s
    Object.assign(a, e.xa, b, e.Ea)
    b = c.D
    for (var f in b) if ((e = b[f]) || 0 === e) a[f] = e
    f = qe
    b = Object.getOwnPropertyNames(a)
    for (e = 0; e < b.length; e++) (d = b[e]), (a[d] = he(f, a[d], a))
    c.w = a
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
  n.ga = function(a) {
    var b = this,
      c = od(a)
    R(c, function(a) {
      if (O) Xd(a)
      else {
        var c = V
        a.selector = a.parsedSelector
        Xd(a)
        a.selector = a.j = Gd(c, a, c.c, void 0, void 0)
      }
      P && (Y(b), b.a && b.a.transformRule(a))
    })
    P ? (a.textContent = Q(c)) : this.i.u.rules.push(c)
  }
  n.getComputedStyleValue = function(a, b) {
    var c
    P || (c = (W(a) || W(Ne(this, a))).w[b])
    return (c = c || window.getComputedStyle(a).getPropertyValue(b))
      ? c.trim()
      : ''
  }
  n.Ga = function(a, b) {
    var c = a.getRootNode()
    b = b ? b.split(/\s/) : []
    c = c.host && c.host.localName
    if (!c) {
      var d = a.getAttribute('class')
      if (d) {
        d = d.split(/\s/)
        for (var e = 0; e < d.length; e++)
          if (d[e] === V.a) {
            c = d[e + 1]
            break
          }
      }
    }
    c && b.push(V.a, c)
    P || ((c = W(a)) && c.l && b.push(qe.a, c.l))
    td(a, b.join(' '))
  }
  n.ra = function(a) {
    return W(a)
  }
  X.prototype.flush = X.prototype.ia
  X.prototype.prepareTemplate = X.prototype.prepareTemplate
  X.prototype.styleElement = X.prototype.styleElement
  X.prototype.styleDocument = X.prototype.styleDocument
  X.prototype.styleSubtree = X.prototype.styleSubtree
  X.prototype.getComputedStyleValue = X.prototype.getComputedStyleValue
  X.prototype.setElementClass = X.prototype.Ga
  X.prototype._styleInfoForNode = X.prototype.ra
  X.prototype.transformCustomStyleForDocument = X.prototype.ga
  X.prototype.getStyleAst = X.prototype.va
  X.prototype.styleAstToString = X.prototype.Ha
  X.prototype.flushCustomStyles = X.prototype.A
  Object.defineProperties(X.prototype, {
    nativeShadow: {
      get: function() {
        return O
      }
    },
    nativeCss: {
      get: function() {
        return P
      }
    }
  })
  var Z = new X(),
    Oe,
    Pe
  window.ShadyCSS &&
    ((Oe = window.ShadyCSS.ApplyShim),
    (Pe = window.ShadyCSS.CustomStyleInterface))
  window.ShadyCSS = {
    ScopingShim: Z,
    prepareTemplate: function(a, b, c) {
      Z.A()
      Z.prepareTemplate(a, b, c)
    },
    styleSubtree: function(a, b) {
      Z.A()
      Z.styleSubtree(a, b)
    },
    styleElement: function(a) {
      Z.A()
      Z.styleElement(a)
    },
    styleDocument: function(a) {
      Z.A()
      Z.styleDocument(a)
    },
    getComputedStyleValue: function(a, b) {
      return Z.getComputedStyleValue(a, b)
    },
    nativeCss: P,
    nativeShadow: O
  }
  Oe && (window.ShadyCSS.ApplyShim = Oe)
  Pe &&
    (window.ShadyCSS.CustomStyleInterface = Pe) /*

 Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
  var Qe = window.customElements,
    Re = window.HTMLImports,
    Se = window.HTMLTemplateElement
  window.WebComponents = window.WebComponents || {}
  if (Qe && Qe.polyfillWrapFlushCallback) {
    var Te,
      Ue = function() {
        if (Te) {
          Se.sa && Se.sa(window.document)
          var a = Te
          Te = null
          a()
          return !0
        }
      },
      Ve = Re.whenReady
    Qe.polyfillWrapFlushCallback(function(a) {
      Te = a
      Ve(Ue)
    })
    Re.whenReady = function(a) {
      Ve(function() {
        Ue() ? Re.whenReady(a) : a()
      })
    }
  }
  Re.whenReady(function() {
    requestAnimationFrame(function() {
      window.WebComponents.ready = !0
      document.dispatchEvent(
        new CustomEvent('WebComponentsReady', { bubbles: !0 })
      )
    })
  })
  var We = document.createElement('style')
  We.textContent =
    'body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n'
  var Xe = document.querySelector('head')
  Xe.insertBefore(
    We,
    Xe.firstChild
  ) /*

Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
}.call(this))

//# sourceMappingURL=webcomponents-hi-sd.js.map
