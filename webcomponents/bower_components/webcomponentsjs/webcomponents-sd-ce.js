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
    p =
      'undefined' != typeof window && window === this
        ? this
        : 'undefined' != typeof global && null != global
          ? global
          : this,
    aa =
      'function' == typeof Object.defineProperties
        ? Object.defineProperty
        : function(a, b, c) {
            a != Array.prototype && a != Object.prototype && (a[b] = c.value)
          }
  function ba() {
    ba = function() {}
    p.Symbol || (p.Symbol = ca)
  }
  var ca = (function() {
    var a = 0
    return function(b) {
      return 'jscomp_symbol_' + (b || '') + a++
    }
  })()
  function da() {
    ba()
    var a = p.Symbol.iterator
    a || (a = p.Symbol.iterator = p.Symbol('iterator'))
    'function' != typeof Array.prototype[a] &&
      aa(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function() {
          return ea(this)
        }
      })
    da = function() {}
  }
  function ea(a) {
    var b = 0
    return fa(function() {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 }
    })
  }
  function fa(a) {
    da()
    a = { next: a }
    a[p.Symbol.iterator] = function() {
      return this
    }
    return a
  }
  function ha(a) {
    da()
    var b = a[Symbol.iterator]
    return b ? b.call(a) : ea(a)
  }
  function ia(a) {
    for (var b, c = []; !(b = a.next()).done; ) c.push(b.value)
    return c
  }
  function ja() {
    this.ja = this.root = null
    this.P = !1
    this.w = this.L = this.aa = this.assignedSlot = this.assignedNodes = this.F = null
    this.childNodes = this.nextSibling = this.previousSibling = this.lastChild = this.firstChild = this.parentNode = this.H = void 0
    this.oa = this.da = !1
  }
  ja.prototype.toJSON = function() {
    return {}
  }
  function r(a) {
    a.W || (a.W = new ja())
    return a.W
  }
  function t(a) {
    return a && a.W
  }
  var u = window.ShadyDOM || {}
  u.ya = !(!Element.prototype.attachShadow || !Node.prototype.getRootNode)
  var ka = Object.getOwnPropertyDescriptor(Node.prototype, 'firstChild')
  u.s = !!(ka && ka.configurable && ka.get)
  u.ha = u.force || !u.ya
  var la = navigator.userAgent.match('Trident'),
    ma = navigator.userAgent.match('Edge')
  void 0 === u.la && (u.la = u.s && (la || ma))
  function v(a) {
    return (a = t(a)) && void 0 !== a.firstChild
  }
  function w(a) {
    return 'ShadyRoot' === a.sa
  }
  function x(a) {
    a = a.getRootNode()
    if (w(a)) return a
  }
  var na = Element.prototype,
    oa =
      na.matches ||
      na.matchesSelector ||
      na.mozMatchesSelector ||
      na.msMatchesSelector ||
      na.oMatchesSelector ||
      na.webkitMatchesSelector
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
  function sa(a, b) {
    for (var c in b) a[c] = b[c]
  }
  var ta = document.createTextNode(''),
    ua = 0,
    va = []
  new MutationObserver(function() {
    for (; va.length; )
      try {
        va.shift()()
      } catch (a) {
        throw ((ta.textContent = ua++), a)
      }
  }).observe(ta, { characterData: !0 })
  function wa(a) {
    va.push(a)
    ta.textContent = ua++
  }
  var xa = !!document.contains
  function ya(a, b) {
    for (; b; ) {
      if (b == a) return !0
      b = b.parentNode
    }
    return !1
  }
  var za = [],
    Aa
  function Ba(a) {
    Aa || ((Aa = !0), wa(Ca))
    za.push(a)
  }
  function Ca() {
    Aa = !1
    for (var a = !!za.length; za.length; ) za.shift()()
    return a
  }
  Ca.list = za
  function Da() {
    this.a = !1
    this.addedNodes = []
    this.removedNodes = []
    this.O = new Set()
  }
  function Ea(a) {
    a.a ||
      ((a.a = !0),
      wa(function() {
        Fa(a)
      }))
  }
  function Fa(a) {
    if (a.a) {
      a.a = !1
      var b = a.takeRecords()
      b.length &&
        a.O.forEach(function(a) {
          a(b)
        })
    }
  }
  Da.prototype.takeRecords = function() {
    if (this.addedNodes.length || this.removedNodes.length) {
      var a = [{ addedNodes: this.addedNodes, removedNodes: this.removedNodes }]
      this.addedNodes = []
      this.removedNodes = []
      return a
    }
    return []
  }
  function Ga(a, b) {
    var c = r(a)
    c.F || (c.F = new Da())
    c.F.O.add(b)
    var d = c.F
    return {
      qa: b,
      B: d,
      ta: a,
      takeRecords: function() {
        return d.takeRecords()
      }
    }
  }
  function Ha(a) {
    var b = a && a.B
    b && (b.O.delete(a.qa), b.O.size || (r(a.ta).F = null))
  }
  function Ia(a, b) {
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
  var y = {},
    Ja = Element.prototype.insertBefore,
    Ka = Element.prototype.replaceChild,
    La = Element.prototype.removeChild,
    Ma = Element.prototype.setAttribute,
    Na = Element.prototype.removeAttribute,
    Oa = Element.prototype.cloneNode,
    Pa = Document.prototype.importNode,
    Qa = Element.prototype.addEventListener,
    Ra = Element.prototype.removeEventListener,
    Sa = Window.prototype.addEventListener,
    Ta = Window.prototype.removeEventListener,
    Ua = Element.prototype.dispatchEvent,
    Va = Node.prototype.contains || HTMLElement.prototype.contains,
    Wa = Document.prototype.getElementById,
    Xa = Element.prototype.querySelector,
    Ya = DocumentFragment.prototype.querySelector,
    Za = Document.prototype.querySelector,
    $a = Element.prototype.querySelectorAll,
    ab = DocumentFragment.prototype.querySelectorAll,
    bb = Document.prototype.querySelectorAll
  y.appendChild = Element.prototype.appendChild
  y.insertBefore = Ja
  y.replaceChild = Ka
  y.removeChild = La
  y.setAttribute = Ma
  y.removeAttribute = Na
  y.cloneNode = Oa
  y.importNode = Pa
  y.addEventListener = Qa
  y.removeEventListener = Ra
  y.Ha = Sa
  y.Ia = Ta
  y.dispatchEvent = Ua
  y.contains = Va
  y.getElementById = Wa
  y.Qa = Xa
  y.Ta = Ya
  y.Oa = Za
  y.querySelector = function(a) {
    switch (this.nodeType) {
      case Node.ELEMENT_NODE:
        return Xa.call(this, a)
      case Node.DOCUMENT_NODE:
        return Za.call(this, a)
      default:
        return Ya.call(this, a)
    }
  }
  y.Ra = $a
  y.Ua = ab
  y.Pa = bb
  y.querySelectorAll = function(a) {
    switch (this.nodeType) {
      case Node.ELEMENT_NODE:
        return $a.call(this, a)
      case Node.DOCUMENT_NODE:
        return bb.call(this, a)
      default:
        return ab.call(this, a)
    }
  }
  var cb = /[&\u00A0"]/g,
    db = /[&\u00A0<>]/g
  function eb(a) {
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
  function fb(a) {
    for (var b = {}, c = 0; c < a.length; c++) b[a[c]] = !0
    return b
  }
  var gb = fb(
      'area base br col command embed hr img input keygen link meta param source track wbr'.split(
        ' '
      )
    ),
    hb = fb(
      'style script xmp iframe noembed noframes plaintext noscript'.split(' ')
    )
  function ib(a, b) {
    'template' === a.localName && (a = a.content)
    for (
      var c = '', d = b ? b(a) : a.childNodes, e = 0, f = d.length, g;
      e < f && (g = d[e]);
      e++
    ) {
      a: {
        var h = g
        var k = a
        var l = b
        switch (h.nodeType) {
          case Node.ELEMENT_NODE:
            for (
              var m = h.localName, q = '<' + m, O = h.attributes, L = 0;
              (k = O[L]);
              L++
            )
              q += ' ' + k.name + '="' + k.value.replace(cb, eb) + '"'
            q += '>'
            h = gb[m] ? q : q + ib(h, l) + '</' + m + '>'
            break a
          case Node.TEXT_NODE:
            h = h.data
            h = k && hb[k.localName] ? h : h.replace(db, eb)
            break a
          case Node.COMMENT_NODE:
            h = '\x3c!--' + h.data + '--\x3e'
            break a
          default:
            throw (window.console.error(h), Error('not implemented'))
        }
      }
      c += h
    }
    return c
  }
  var z = {},
    A = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, !1),
    B = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT, null, !1)
  function jb(a) {
    var b = []
    A.currentNode = a
    for (a = A.firstChild(); a; ) b.push(a), (a = A.nextSibling())
    return b
  }
  z.parentNode = function(a) {
    A.currentNode = a
    return A.parentNode()
  }
  z.firstChild = function(a) {
    A.currentNode = a
    return A.firstChild()
  }
  z.lastChild = function(a) {
    A.currentNode = a
    return A.lastChild()
  }
  z.previousSibling = function(a) {
    A.currentNode = a
    return A.previousSibling()
  }
  z.nextSibling = function(a) {
    A.currentNode = a
    return A.nextSibling()
  }
  z.childNodes = jb
  z.parentElement = function(a) {
    B.currentNode = a
    return B.parentNode()
  }
  z.firstElementChild = function(a) {
    B.currentNode = a
    return B.firstChild()
  }
  z.lastElementChild = function(a) {
    B.currentNode = a
    return B.lastChild()
  }
  z.previousElementSibling = function(a) {
    B.currentNode = a
    return B.previousSibling()
  }
  z.nextElementSibling = function(a) {
    B.currentNode = a
    return B.nextSibling()
  }
  z.children = function(a) {
    var b = []
    B.currentNode = a
    for (a = B.firstChild(); a; ) b.push(a), (a = B.nextSibling())
    return b
  }
  z.innerHTML = function(a) {
    return ib(a, function(a) {
      return jb(a)
    })
  }
  z.textContent = function(a) {
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
    kb = u.s,
    lb = [Node.prototype, Element.prototype, HTMLElement.prototype]
  function D(a) {
    var b
    a: {
      for (b = 0; b < lb.length; b++) {
        var c = lb[b]
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
  var E = kb
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
    mb = kb
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
    nb = kb
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
  C.ia = E
  C.Sa = mb
  C.Na = nb
  C.parentNode = function(a) {
    return E.parentNode.get.call(a)
  }
  C.firstChild = function(a) {
    return E.firstChild.get.call(a)
  }
  C.lastChild = function(a) {
    return E.lastChild.get.call(a)
  }
  C.previousSibling = function(a) {
    return E.previousSibling.get.call(a)
  }
  C.nextSibling = function(a) {
    return E.nextSibling.get.call(a)
  }
  C.childNodes = function(a) {
    return Array.prototype.slice.call(E.childNodes.get.call(a))
  }
  C.parentElement = function(a) {
    return E.parentElement.get.call(a)
  }
  C.previousElementSibling = function(a) {
    return E.previousElementSibling.get.call(a)
  }
  C.nextElementSibling = function(a) {
    return E.nextElementSibling.get.call(a)
  }
  C.innerHTML = function(a) {
    return E.innerHTML.get.call(a)
  }
  C.textContent = function(a) {
    return E.textContent.get.call(a)
  }
  C.children = function(a) {
    switch (a.nodeType) {
      case Node.DOCUMENT_FRAGMENT_NODE:
        a = mb.children.get.call(a)
        break
      case Node.DOCUMENT_NODE:
        a = nb.children.get.call(a)
        break
      default:
        a = E.children.get.call(a)
    }
    return Array.prototype.slice.call(a)
  }
  C.firstElementChild = function(a) {
    switch (a.nodeType) {
      case Node.DOCUMENT_FRAGMENT_NODE:
        return mb.firstElementChild.get.call(a)
      case Node.DOCUMENT_NODE:
        return nb.firstElementChild.get.call(a)
      default:
        return E.firstElementChild.get.call(a)
    }
  }
  C.lastElementChild = function(a) {
    switch (a.nodeType) {
      case Node.DOCUMENT_FRAGMENT_NODE:
        return mb.lastElementChild.get.call(a)
      case Node.DOCUMENT_NODE:
        return nb.lastElementChild.get.call(a)
      default:
        return E.lastElementChild.get.call(a)
    }
  }
  var F = u.la ? C : z
  function ob(a) {
    for (; a.firstChild; ) a.removeChild(a.firstChild)
  }
  var pb = u.s,
    qb = document.implementation.createHTMLDocument('inert'),
    rb = Object.getOwnPropertyDescriptor(Node.prototype, 'isConnected'),
    sb = rb && rb.get,
    tb = Object.getOwnPropertyDescriptor(Document.prototype, 'activeElement'),
    ub = {
      parentElement: {
        get: function() {
          var a = t(this)
          ;(a = a && a.parentNode) &&
            a.nodeType !== Node.ELEMENT_NODE &&
            (a = null)
          return void 0 !== a ? a : F.parentElement(this)
        },
        configurable: !0
      },
      parentNode: {
        get: function() {
          var a = t(this)
          a = a && a.parentNode
          return void 0 !== a ? a : F.parentNode(this)
        },
        configurable: !0
      },
      nextSibling: {
        get: function() {
          var a = t(this)
          a = a && a.nextSibling
          return void 0 !== a ? a : F.nextSibling(this)
        },
        configurable: !0
      },
      previousSibling: {
        get: function() {
          var a = t(this)
          a = a && a.previousSibling
          return void 0 !== a ? a : F.previousSibling(this)
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
          return F.nextElementSibling(this)
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
          return F.previousElementSibling(this)
        },
        configurable: !0
      }
    },
    vb = {
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
    wb = {
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
          } else c = F.childNodes(this)
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
          return void 0 !== a ? a : F.firstChild(this)
        },
        configurable: !0
      },
      lastChild: {
        get: function() {
          var a = t(this)
          a = a && a.lastChild
          return void 0 !== a ? a : F.lastChild(this)
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
          return F.textContent(this)
        },
        set: function(a) {
          if ('undefined' === typeof a || null === a) a = ''
          switch (this.nodeType) {
            case Node.ELEMENT_NODE:
            case Node.DOCUMENT_FRAGMENT_NODE:
              if (!v(this) && pb) {
                var b = this.firstChild
                ;(b != this.lastChild || (b && b.nodeType != Node.TEXT_NODE)) &&
                  ob(this)
                C.ia.textContent.set.call(this, a)
              } else
                ob(this),
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
          return F.firstElementChild(this)
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
          return F.lastElementChild(this)
        },
        configurable: !0
      },
      children: {
        get: function() {
          var a = v(this)
            ? Array.prototype.filter.call(this.childNodes, function(a) {
                return a.nodeType === Node.ELEMENT_NODE
              })
            : F.children(this)
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
            ? ib('template' === this.localName ? this.content : this)
            : F.innerHTML(this)
        },
        set: function(a) {
          var b = 'template' === this.localName ? this.content : this
          ob(b)
          var c = this.localName
          ;(c && 'template' !== c) || (c = 'div')
          c = qb.createElement(c)
          for (
            pb ? C.ia.innerHTML.set.call(c, a) : (c.innerHTML = a);
            c.firstChild;

          )
            b.appendChild(c.firstChild)
        },
        configurable: !0
      }
    },
    xb = {
      shadowRoot: {
        get: function() {
          var a = t(this)
          return (a && a.ja) || null
        },
        configurable: !0
      }
    },
    yb = {
      activeElement: {
        get: function() {
          var a =
            tb && tb.get
              ? tb.get.call(document)
              : u.s
                ? void 0
                : document.activeElement
          if (a && a.nodeType) {
            var b = !!w(this)
            if (
              this === document ||
              (b && this.host !== a && y.contains.call(this.host, a))
            ) {
              for (b = x(a); b && b !== this; ) (a = b.host), (b = x(a))
              a = this === document ? (b ? null : a) : b === this ? a : null
            } else a = null
          } else a = null
          return a
        },
        set: function() {},
        configurable: !0
      }
    }
  function G(a, b, c) {
    for (var d in b) {
      var e = Object.getOwnPropertyDescriptor(a, d)
      ;(e && e.configurable) || (!e && c)
        ? Object.defineProperty(a, d, b[d])
        : c && console.warn('Could not define', d, 'on', a)
    }
  }
  function H(a) {
    G(a, ub)
    G(a, vb)
    G(a, wb)
    G(a, yb)
  }
  function zb() {
    var a = Ab.prototype
    a.__proto__ = DocumentFragment.prototype
    G(a, ub, !0)
    G(a, wb, !0)
    G(a, yb, !0)
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
  var Bb = u.s
      ? function() {}
      : function(a) {
          var b = r(a)
          b.da || ((b.da = !0), G(a, ub, !0), G(a, vb, !0))
        },
    Cb = u.s
      ? function() {}
      : function(a) {
          r(a).oa || (G(a, wb, !0), G(a, xb, !0))
        }
  var Db = F.childNodes
  function Eb(a, b, c) {
    Bb(a)
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
  function Fb(a, b) {
    var c = r(a)
    if (void 0 === c.firstChild)
      for (
        b = b || Db(a),
          c.firstChild = b[0] || null,
          c.lastChild = b[b.length - 1] || null,
          Cb(a),
          c = 0;
        c < b.length;
        c++
      ) {
        var d = b[c],
          e = r(d)
        e.parentNode = a
        e.nextSibling = b[c + 1] || null
        e.previousSibling = b[c - 1] || null
        Bb(d)
      }
  }
  var Gb = F.parentNode
  function Hb(a, b, c) {
    if (b === a)
      throw Error(
        "Failed to execute 'appendChild' on 'Node': The new child element contains the parent."
      )
    if (c) {
      var d = t(c)
      d = d && d.parentNode
      if ((void 0 !== d && d !== a) || (void 0 === d && Gb(c) !== a))
        throw Error(
          "Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node."
        )
    }
    if (c === b) return b
    b.parentNode && Ib(b.parentNode, b)
    var e, f
    if (!b.__noInsertionPoint) {
      if ((f = e = x(a))) {
        var g
        'slot' === b.localName
          ? (g = [b])
          : b.querySelectorAll && (g = b.querySelectorAll('slot'))
        f = g && g.length ? g : void 0
      }
      f &&
        ((g = e),
        (d = f),
        (g.o = g.o || []),
        (g.f = g.f || []),
        (g.g = g.g || {}),
        g.o.push.apply(g.o, [].concat(d instanceof Array ? d : ia(ha(d)))))
    }
    ;('slot' === a.localName || f) && (e = e || x(a)) && Jb(e)
    if (v(a)) {
      e = c
      Cb(a)
      f = r(a)
      void 0 !== f.firstChild && (f.childNodes = null)
      if (b.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        f = b.childNodes
        for (g = 0; g < f.length; g++) Eb(f[g], a, e)
        e = r(b)
        f = void 0 !== e.firstChild ? null : void 0
        e.firstChild = e.lastChild = f
        e.childNodes = f
      } else Eb(b, a, e)
      e = t(a)
      if (Kb(a)) {
        Jb(e.root)
        var h = !0
      } else e.root && (h = !0)
    }
    h ||
      ((h = w(a) ? a.host : a),
      c
        ? ((c = Lb(c)), y.insertBefore.call(h, b, c))
        : y.appendChild.call(h, b))
    Mb(a, b)
    return b
  }
  function Ib(a, b) {
    if (b.parentNode !== a)
      throw Error('The node to be removed is not a child of this node: ' + b)
    var c = x(b),
      d = t(a)
    if (v(a)) {
      var e = r(b),
        f = r(a)
      b === f.firstChild && (f.firstChild = e.nextSibling)
      b === f.lastChild && (f.lastChild = e.previousSibling)
      var g = e.previousSibling,
        h = e.nextSibling
      g && (r(g).nextSibling = h)
      h && (r(h).previousSibling = g)
      e.parentNode = e.previousSibling = e.nextSibling = void 0
      void 0 !== f.childNodes && (f.childNodes = null)
      if (Kb(a)) {
        Jb(d.root)
        var k = !0
      }
    }
    Nb(b)
    if (c) {
      ;(e = a && 'slot' === a.localName) && (k = !0)
      if (c.f) {
        Ob(c)
        f = c.g
        for (ra in f)
          for (g = f[ra], h = 0; h < g.length; h++) {
            var l = g[h]
            if (ya(b, l)) {
              g.splice(h, 1)
              var m = c.f.indexOf(l)
              0 <= m && c.f.splice(m, 1)
              h--
              m = t(l)
              if ((l = m.w))
                for (var q = 0; q < l.length; q++) {
                  var O = l[q],
                    L = Pb(O)
                  L && y.removeChild.call(L, O)
                }
              m.w = []
              m.assignedNodes = []
              m = !0
            }
          }
        var ra = m
      } else ra = void 0
      ;(ra || e) && Jb(c)
    }
    k ||
      ((k = w(a) ? a.host : a),
      ((!d.root && 'slot' !== b.localName) || k === Gb(b)) &&
        y.removeChild.call(k, b))
    Mb(a, null, b)
    return b
  }
  function Nb(a) {
    var b = t(a)
    if (b && void 0 !== b.H) {
      b = a.childNodes
      for (var c = 0, d = b.length, e; c < d && (e = b[c]); c++) Nb(e)
    }
    if ((a = t(a))) a.H = void 0
  }
  function Lb(a) {
    var b = a
    a &&
      'slot' === a.localName &&
      (b = (b = (b = t(a)) && b.w) && b.length ? b[0] : Lb(a.nextSibling))
    return b
  }
  function Kb(a) {
    return (a = (a = t(a)) && a.root) && Qb(a)
  }
  function Rb(a, b) {
    if ('slot' === b) (a = a.parentNode), Kb(a) && Jb(t(a).root)
    else if ('slot' === a.localName && 'name' === b && (b = x(a))) {
      if (b.f) {
        var c = a.pa,
          d = Sb(a)
        if (d !== c) {
          c = b.g[c]
          var e = c.indexOf(a)
          0 <= e && c.splice(e, 1)
          c = b.g[d] || (b.g[d] = [])
          c.push(a)
          1 < c.length && (b.g[d] = Tb(c))
        }
      }
      Jb(b)
    }
  }
  function Mb(a, b, c) {
    if ((a = (a = t(a)) && a.F))
      b && a.addedNodes.push(b), c && a.removedNodes.push(c), Ea(a)
  }
  function Ub(a) {
    if (a && a.nodeType) {
      var b = r(a),
        c = b.H
      void 0 === c &&
        (w(a)
          ? ((c = a), (b.H = c))
          : ((c = (c = a.parentNode) ? Ub(c) : a),
            y.contains.call(document.documentElement, a) && (b.H = c)))
      return c
    }
  }
  function Vb(a, b, c) {
    var d = []
    Wb(a.childNodes, b, c, d)
    return d
  }
  function Wb(a, b, c, d) {
    for (var e = 0, f = a.length, g; e < f && (g = a[e]); e++) {
      var h
      if ((h = g.nodeType === Node.ELEMENT_NODE)) {
        h = g
        var k = b,
          l = c,
          m = d,
          q = k(h)
        q && m.push(h)
        l && l(q) ? (h = q) : (Wb(h.childNodes, k, l, m), (h = void 0))
      }
      if (h) break
    }
  }
  var Xb = null
  function Yb(a, b, c) {
    Xb || (Xb = window.ShadyCSS && window.ShadyCSS.ScopingShim)
    Xb && 'class' === b
      ? Xb.setElementClass(a, c)
      : (y.setAttribute.call(a, b, c), Rb(a, b))
  }
  function Zb(a, b) {
    if (a.ownerDocument !== document) return y.importNode.call(document, a, b)
    var c = y.importNode.call(document, a, !1)
    if (b) {
      a = a.childNodes
      b = 0
      for (var d; b < a.length; b++) (d = Zb(a[b], !0)), c.appendChild(d)
    }
    return c
  }
  var $b = '__eventWrappers' + Date.now(),
    ac = {
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
  function bc(a, b) {
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
  function cc(a, b) {
    if (!w) return a
    a = bc(a, !0)
    for (var c = 0, d, e, f, g; c < b.length; c++)
      if (
        ((d = b[c]),
        (f = d === window ? window : d.getRootNode()),
        f !== e && ((g = a.indexOf(f)), (e = f)),
        !w(f) || -1 < g)
      )
        return d
  }
  var dc = {
    get composed() {
      !1 !== this.isTrusted && void 0 === this.U && (this.U = ac[this.type])
      return this.U || !1
    },
    composedPath: function() {
      this.b || (this.b = bc(this.__target, this.composed))
      return this.b
    },
    get target() {
      return cc(this.currentTarget, this.composedPath())
    },
    get relatedTarget() {
      if (!this.V) return null
      this.c || (this.c = bc(this.V, !0))
      return cc(this.currentTarget, this.c)
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
  function ec(a) {
    function b(b, d) {
      b = new a(b, d)
      b.U = d && !!d.composed
      return b
    }
    sa(b, a)
    b.prototype = a.prototype
    return b
  }
  var fc = { focus: !0, blur: !0 }
  function gc(a) {
    return a.__target !== a.target || a.V !== a.relatedTarget
  }
  function hc(a, b, c) {
    if ((c = b.__handlers && b.__handlers[a.type] && b.__handlers[a.type][c]))
      for (
        var d = 0, e;
        (e = c[d]) &&
        (!gc(a) || a.target !== a.relatedTarget) &&
        (e.call(b, a), !a.i);
        d++
      );
  }
  function ic(a) {
    var b = a.composedPath()
    Object.defineProperty(a, 'currentTarget', {
      get: function() {
        return d
      },
      configurable: !0
    })
    for (var c = b.length - 1; 0 <= c; c--) {
      var d = b[c]
      hc(a, d, 'capture')
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
        if ((hc(a, d, 'bubble'), d !== window && (e = d.getRootNode()), a.a))
          break
    }
  }
  function jc(a, b, c, d, e, f) {
    for (var g = 0; g < a.length; g++) {
      var h = a[g],
        k = h.type,
        l = h.capture,
        m = h.once,
        q = h.passive
      if (b === h.node && c === k && d === l && e === m && f === q) return g
    }
    return -1
  }
  function kc(a, b, c) {
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
            var g = !!c.passive
          } else (e = !!c), (g = f = !1)
          var h = (c && c.X) || this,
            k = b[$b]
          if (k) {
            if (-1 < jc(k, h, a, e, f, g)) return
          } else b[$b] = []
          k = function(e) {
            f && this.removeEventListener(a, b, c)
            e.__target || lc(e)
            if (h !== this) {
              var g = Object.getOwnPropertyDescriptor(e, 'currentTarget')
              Object.defineProperty(e, 'currentTarget', {
                get: function() {
                  return h
                },
                configurable: !0
              })
            }
            if (e.composed || -1 < e.composedPath().indexOf(h))
              if (gc(e) && e.target === e.relatedTarget)
                e.eventPhase === Event.BUBBLING_PHASE &&
                  e.stopImmediatePropagation()
              else if (
                e.eventPhase === Event.CAPTURING_PHASE ||
                e.bubbles ||
                e.target === h ||
                h instanceof Window
              ) {
                var k =
                  'function' === d
                    ? b.call(h, e)
                    : b.handleEvent && b.handleEvent(e)
                h !== this &&
                  (g
                    ? (Object.defineProperty(e, 'currentTarget', g), (g = null))
                    : delete e.currentTarget)
                return k
              }
          }
          b[$b].push({
            node: h,
            type: a,
            capture: e,
            once: f,
            passive: g,
            Ja: k
          })
          fc[a]
            ? ((this.__handlers = this.__handlers || {}),
              (this.__handlers[a] = this.__handlers[a] || {
                capture: [],
                bubble: []
              }),
              this.__handlers[a][e ? 'capture' : 'bubble'].push(k))
            : (this instanceof Window ? y.Ha : y.addEventListener).call(
                this,
                a,
                k,
                c
              )
        }
    }
  }
  function mc(a, b, c) {
    if (b) {
      if (c && 'object' === typeof c) {
        var d = !!c.capture
        var e = !!c.once
        var f = !!c.passive
      } else (d = !!c), (f = e = !1)
      var g = (c && c.X) || this,
        h = void 0
      var k = null
      try {
        k = b[$b]
      } catch (l) {}
      k &&
        ((e = jc(k, g, a, d, e, f)),
        -1 < e && ((h = k.splice(e, 1)[0].Ja), k.length || (b[$b] = void 0)))
      ;(this instanceof Window ? y.Ia : y.removeEventListener).call(
        this,
        a,
        h || b,
        c
      )
      h &&
        fc[a] &&
        this.__handlers &&
        this.__handlers[a] &&
        ((a = this.__handlers[a][d ? 'capture' : 'bubble']),
        (h = a.indexOf(h)),
        -1 < h && a.splice(h, 1))
    }
  }
  function nc() {
    for (var a in fc)
      window.addEventListener(
        a,
        function(a) {
          a.__target || (lc(a), ic(a))
        },
        !0
      )
  }
  function lc(a) {
    a.__target = a.target
    a.V = a.relatedTarget
    if (u.s) {
      var b = Object.getPrototypeOf(a)
      if (!b.hasOwnProperty('__patchProto')) {
        var c = Object.create(b)
        c.La = b
        pa(c, dc)
        b.__patchProto = c
      }
      a.__proto__ = b.__patchProto
    } else pa(a, dc)
  }
  var oc = ec(window.Event),
    pc = ec(window.CustomEvent),
    qc = ec(window.MouseEvent)
  function rc(a, b) {
    return { index: a, I: [], N: b }
  }
  function sc(a, b, c, d) {
    var e = 0,
      f = 0,
      g = 0,
      h = 0,
      k = Math.min(b - e, d - f)
    if (0 == e && 0 == f)
      a: {
        for (g = 0; g < k; g++) if (a[g] !== c[g]) break a
        g = k
      }
    if (b == a.length && d == c.length) {
      h = a.length
      for (var l = c.length, m = 0; m < k - g && tc(a[--h], c[--l]); ) m++
      h = m
    }
    e += g
    f += g
    b -= h
    d -= h
    if (0 == b - e && 0 == d - f) return []
    if (e == b) {
      for (b = rc(e, 0); f < d; ) b.I.push(c[f++])
      return [b]
    }
    if (f == d) return [rc(e, b - e)]
    k = e
    g = f
    d = d - g + 1
    h = b - k + 1
    b = Array(d)
    for (l = 0; l < d; l++) (b[l] = Array(h)), (b[l][0] = l)
    for (l = 0; l < h; l++) b[0][l] = l
    for (l = 1; l < d; l++)
      for (m = 1; m < h; m++)
        if (a[k + m - 1] === c[g + l - 1]) b[l][m] = b[l - 1][m - 1]
        else {
          var q = b[l - 1][m] + 1,
            O = b[l][m - 1] + 1
          b[l][m] = q < O ? q : O
        }
    k = b.length - 1
    g = b[0].length - 1
    d = b[k][g]
    for (a = []; 0 < k || 0 < g; )
      0 == k
        ? (a.push(2), g--)
        : 0 == g
          ? (a.push(3), k--)
          : ((h = b[k - 1][g - 1]),
            (l = b[k - 1][g]),
            (m = b[k][g - 1]),
            (q = l < m ? (l < h ? l : h) : m < h ? m : h),
            q == h
              ? (h == d ? a.push(0) : (a.push(1), (d = h)), k--, g--)
              : q == l
                ? (a.push(3), k--, (d = l))
                : (a.push(2), g--, (d = m)))
    a.reverse()
    b = void 0
    k = []
    for (g = 0; g < a.length; g++)
      switch (a[g]) {
        case 0:
          b && (k.push(b), (b = void 0))
          e++
          f++
          break
        case 1:
          b || (b = rc(e, 0))
          b.N++
          e++
          b.I.push(c[f])
          f++
          break
        case 2:
          b || (b = rc(e, 0))
          b.N++
          e++
          break
        case 3:
          b || (b = rc(e, 0)), b.I.push(c[f]), f++
      }
    b && k.push(b)
    return k
  }
  function tc(a, b) {
    return a === b
  }
  var Pb = F.parentNode,
    uc = F.childNodes,
    vc = {}
  function wc(a) {
    var b = []
    do b.unshift(a)
    while ((a = a.parentNode))
    return b
  }
  function Ab(a, b, c) {
    if (a !== vc) throw new TypeError('Illegal constructor')
    this.sa = 'ShadyRoot'
    a = uc(b)
    this.host = b
    this.a = c && c.mode
    Fb(b, a)
    c = t(b)
    c.root = this
    c.ja = 'closed' !== this.a ? this : null
    c = r(this)
    c.firstChild = c.lastChild = c.parentNode = c.nextSibling = c.previousSibling = null
    c.childNodes = []
    this.M = !1
    this.o = this.g = this.f = null
    c = 0
    for (var d = a.length; c < d; c++) y.removeChild.call(b, a[c])
  }
  function Jb(a) {
    a.M ||
      ((a.M = !0),
      Ba(function() {
        return xc(a)
      }))
  }
  function xc(a) {
    for (var b; a; ) {
      a.M && (b = a)
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
  Ab.prototype._renderRoot = function() {
    this.M = !1
    if (this.f) {
      Ob(this)
      for (var a = 0, b; a < this.f.length; a++) {
        b = this.f[a]
        var c = t(b),
          d = c.assignedNodes
        c.assignedNodes = []
        c.w = []
        if ((c.aa = d))
          for (c = 0; c < d.length; c++) {
            var e = t(d[c])
            e.L = e.assignedSlot
            e.assignedSlot === b && (e.assignedSlot = null)
          }
      }
      for (b = this.host.firstChild; b; b = b.nextSibling) yc(this, b)
      for (a = 0; a < this.f.length; a++) {
        b = this.f[a]
        d = t(b)
        if (!d.assignedNodes.length)
          for (c = b.firstChild; c; c = c.nextSibling) yc(this, c, b)
        ;(c = (c = t(b.parentNode)) && c.root) && Qb(c) && c._renderRoot()
        zc(this, d.w, d.assignedNodes)
        if ((c = d.aa)) {
          for (e = 0; e < c.length; e++) t(c[e]).L = null
          d.aa = null
          c.length > d.assignedNodes.length && (d.P = !0)
        }
        d.P && ((d.P = !1), Ac(this, b))
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
          var g = d[f]
          if ('slot' == g.localName) {
            g = t(g).w
            for (var h = 0; h < g.length; h++) e.push(g[h])
          } else e.push(g)
        }
        d = void 0
        f = uc(c)
        g = sc(e, e.length, f, f.length)
        for (var k = (h = 0); h < g.length && (d = g[h]); h++) {
          for (var l = 0, m; l < d.I.length && (m = d.I[l]); l++)
            Pb(m) === c && y.removeChild.call(c, m), f.splice(d.index + k, 1)
          k -= d.N
        }
        for (k = 0; k < g.length && (d = g[k]); k++)
          for (h = f[d.index], l = d.index; l < d.index + d.N; l++)
            (m = e[l]), y.insertBefore.call(c, m, h), f.splice(l, 0, m)
      }
    }
  }
  function yc(a, b, c) {
    var d = r(b),
      e = d.L
    d.L = null
    c || (c = (a = a.g[b.slot || '__catchall']) && a[0])
    c
      ? (r(c).assignedNodes.push(b), (d.assignedSlot = c))
      : (d.assignedSlot = void 0)
    e !== d.assignedSlot && d.assignedSlot && (r(d.assignedSlot).P = !0)
  }
  function zc(a, b, c) {
    for (var d = 0, e; d < c.length && (e = c[d]); d++)
      if ('slot' == e.localName) {
        var f = t(e).assignedNodes
        f && f.length && zc(a, b, f)
      } else b.push(c[d])
  }
  function Ac(a, b) {
    y.dispatchEvent.call(b, new Event('slotchange'))
    b = t(b)
    b.assignedSlot && Ac(a, b.assignedSlot)
  }
  function Ob(a) {
    if (a.o && a.o.length) {
      for (var b = a.o, c, d = 0; d < b.length; d++) {
        var e = b[d]
        Fb(e)
        Fb(e.parentNode)
        var f = Sb(e)
        a.g[f] ? ((c = c || {}), (c[f] = !0), a.g[f].push(e)) : (a.g[f] = [e])
        a.f.push(e)
      }
      if (c) for (var g in c) a.g[g] = Tb(a.g[g])
      a.o = []
    }
  }
  function Sb(a) {
    var b = a.name || a.getAttribute('name') || '__catchall'
    return (a.pa = b)
  }
  function Tb(a) {
    return a.sort(function(a, c) {
      a = wc(a)
      for (var b = wc(c), e = 0; e < a.length; e++) {
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
  function Qb(a) {
    Ob(a)
    return !(!a.f || !a.f.length)
  }
  function Bc(a) {
    var b = a.getRootNode()
    w(b) && xc(b)
    return ((a = t(a)) && a.assignedSlot) || null
  }
  var Cc = {
      addEventListener: kc.bind(window),
      removeEventListener: mc.bind(window)
    },
    Dc = {
      addEventListener: kc,
      removeEventListener: mc,
      appendChild: function(a) {
        return Hb(this, a)
      },
      insertBefore: function(a, b) {
        return Hb(this, a, b)
      },
      removeChild: function(a) {
        return Ib(this, a)
      },
      replaceChild: function(a, b) {
        Hb(this, a, b)
        Ib(this, b)
        return a
      },
      cloneNode: function(a) {
        if ('template' == this.localName) var b = y.cloneNode.call(this, a)
        else if (((b = y.cloneNode.call(this, !1)), a)) {
          a = this.childNodes
          for (var c = 0, d; c < a.length; c++)
            (d = a[c].cloneNode(!0)), b.appendChild(d)
        }
        return b
      },
      getRootNode: function() {
        return Ub(this)
      },
      contains: function(a) {
        return ya(this, a)
      },
      dispatchEvent: function(a) {
        Ca()
        return y.dispatchEvent.call(this, a)
      }
    }
  Object.defineProperties(Dc, {
    isConnected: {
      get: function() {
        if (sb && sb.call(this)) return !0
        if (this.nodeType == Node.DOCUMENT_FRAGMENT_NODE) return !1
        var a = this.ownerDocument
        if (xa) {
          if (y.contains.call(a, this)) return !0
        } else if (
          a.documentElement &&
          y.contains.call(a.documentElement, this)
        )
          return !0
        for (a = this; a && !(a instanceof Document); )
          a = a.parentNode || (w(a) ? a.host : void 0)
        return !!(a && a instanceof Document)
      },
      configurable: !0
    }
  })
  var Ec = {
      get assignedSlot() {
        return Bc(this)
      }
    },
    Fc = {
      querySelector: function(a) {
        return (
          Vb(
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
          b = Array.prototype.slice.call(y.querySelectorAll(this, a))
          var c = this.getRootNode()
          return b.filter(function(a) {
            return a.getRootNode() == c
          })
        }
        return Vb(this, function(b) {
          return oa.call(b, a)
        })
      }
    },
    Gc = {
      assignedNodes: function(a) {
        if ('slot' === this.localName) {
          var b = this.getRootNode()
          w(b) && xc(b)
          return (b = t(this))
            ? (a && a.flatten ? b.w : b.assignedNodes) || []
            : []
        }
      }
    },
    Hc = qa(
      {
        setAttribute: function(a, b) {
          Yb(this, a, b)
        },
        removeAttribute: function(a) {
          y.removeAttribute.call(this, a)
          Rb(this, a)
        },
        attachShadow: function(a) {
          if (!this) throw 'Must provide a host.'
          if (!a) throw 'Not enough arguments.'
          return new Ab(vc, this, a)
        },
        get slot() {
          return this.getAttribute('slot')
        },
        set slot(a) {
          Yb(this, 'slot', a)
        },
        get assignedSlot() {
          return Bc(this)
        }
      },
      Fc,
      Gc
    )
  Object.defineProperties(Hc, xb)
  var Ic = qa(
    {
      importNode: function(a, b) {
        return Zb(a, b)
      },
      getElementById: function(a) {
        return (
          Vb(
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
    Fc
  )
  Object.defineProperties(Ic, { _activeElement: yb.activeElement })
  var Jc = HTMLElement.prototype.blur,
    Kc = qa({
      blur: function() {
        var a = t(this)
        ;(a = (a = a && a.root) && a.activeElement) ? a.blur() : Jc.call(this)
      }
    }),
    Lc = {
      addEventListener: function(a, b, c) {
        'object' !== typeof c && (c = { capture: !!c })
        c.X = this
        this.host.addEventListener(a, b, c)
      },
      removeEventListener: function(a, b, c) {
        'object' !== typeof c && (c = { capture: !!c })
        c.X = this
        this.host.removeEventListener(a, b, c)
      },
      getElementById: function(a) {
        return (
          Vb(
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
  function I(a, b) {
    for (var c = Object.getOwnPropertyNames(b), d = 0; d < c.length; d++) {
      var e = c[d],
        f = Object.getOwnPropertyDescriptor(b, e)
      f.value ? (a[e] = f.value) : Object.defineProperty(a, e, f)
    }
  }
  if (u.ha) {
    var ShadyDOM = {
      inUse: u.ha,
      patch: function(a) {
        Cb(a)
        Bb(a)
        return a
      },
      isShadyRoot: w,
      enqueue: Ba,
      flush: Ca,
      settings: u,
      filterMutations: Ia,
      observeChildren: Ga,
      unobserveChildren: Ha,
      nativeMethods: y,
      nativeTree: F
    }
    window.ShadyDOM = ShadyDOM
    window.Event = oc
    window.CustomEvent = pc
    window.MouseEvent = qc
    nc()
    var Mc =
      (window.customElements && window.customElements.nativeHTMLElement) ||
      HTMLElement
    I(Ab.prototype, Lc)
    I(window.Node.prototype, Dc)
    I(window.Window.prototype, Cc)
    I(window.Text.prototype, Ec)
    I(window.DocumentFragment.prototype, Fc)
    I(window.Element.prototype, Hc)
    I(window.Document.prototype, Ic)
    window.HTMLSlotElement && I(window.HTMLSlotElement.prototype, Gc)
    I(Mc.prototype, Kc)
    u.s &&
      (H(window.Node.prototype),
      H(window.Text.prototype),
      H(window.DocumentFragment.prototype),
      H(window.Element.prototype),
      H(Mc.prototype),
      H(window.Document.prototype),
      window.HTMLSlotElement && H(window.HTMLSlotElement.prototype))
    zb()
    window.ShadowRoot = Ab
  }
  var Nc = new Set(
    'annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph'.split(
      ' '
    )
  )
  function Oc(a) {
    var b = Nc.has(a)
    a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a)
    return !b && a
  }
  function J(a) {
    var b = a.isConnected
    if (void 0 !== b) return b
    for (; a && !(a.__CE_isImportDocument || a instanceof Document); )
      a =
        a.parentNode ||
        (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0)
    return !(!a || !(a.__CE_isImportDocument || a instanceof Document))
  }
  function Pc(a, b) {
    for (; b && b !== a && !b.nextSibling; ) b = b.parentNode
    return b && b !== a ? b.nextSibling : null
  }
  function K(a, b, c) {
    c = void 0 === c ? new Set() : c
    for (var d = a; d; ) {
      if (d.nodeType === Node.ELEMENT_NODE) {
        var e = d
        b(e)
        var f = e.localName
        if ('link' === f && 'import' === e.getAttribute('rel')) {
          d = e.import
          if (d instanceof Node && !c.has(d))
            for (c.add(d), d = d.firstChild; d; d = d.nextSibling) K(d, b, c)
          d = Pc(a, e)
          continue
        } else if ('template' === f) {
          d = Pc(a, e)
          continue
        }
        if ((e = e.__CE_shadowRoot))
          for (e = e.firstChild; e; e = e.nextSibling) K(e, b, c)
      }
      d = d.firstChild ? d.firstChild : Pc(a, d)
    }
  }
  function M(a, b, c) {
    a[b] = c
  }
  function Qc() {
    this.a = new Map()
    this.D = new Map()
    this.i = []
    this.c = !1
  }
  function Rc(a, b, c) {
    a.a.set(b, c)
    a.D.set(c.constructor, c)
  }
  function Sc(a, b) {
    a.c = !0
    a.i.push(b)
  }
  function Tc(a, b) {
    a.c &&
      K(b, function(b) {
        return a.b(b)
      })
  }
  Qc.prototype.b = function(a) {
    if (this.c && !a.__CE_patched) {
      a.__CE_patched = !0
      for (var b = 0; b < this.i.length; b++) this.i[b](a)
    }
  }
  function N(a, b) {
    var c = []
    K(b, function(a) {
      return c.push(a)
    })
    for (b = 0; b < c.length; b++) {
      var d = c[b]
      1 === d.__CE_state ? a.connectedCallback(d) : Uc(a, d)
    }
  }
  function P(a, b) {
    var c = []
    K(b, function(a) {
      return c.push(a)
    })
    for (b = 0; b < c.length; b++) {
      var d = c[b]
      1 === d.__CE_state && a.disconnectedCallback(d)
    }
  }
  function Q(a, b, c) {
    c = void 0 === c ? {} : c
    var d = c.Ga || new Set(),
      e =
        c.T ||
        function(b) {
          return Uc(a, b)
        },
      f = []
    K(
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
                  Q(a, c, { Ga: f, T: e })
                }
              })
        } else f.push(b)
      },
      d
    )
    if (a.c) for (b = 0; b < f.length; b++) a.b(f[b])
    for (b = 0; b < f.length; b++) e(f[b])
  }
  function Uc(a, b) {
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
          } catch (g) {
            throw ((b.__CE_state = 2), g)
          }
          b.__CE_state = 1
          b.__CE_definition = c
          if (c.attributeChangedCallback)
            for (c = c.observedAttributes, d = 0; d < c.length; d++) {
              var e = c[d],
                f = b.getAttribute(e)
              null !== f && a.attributeChangedCallback(b, e, null, f, null)
            }
          J(b) && a.connectedCallback(b)
        }
    }
  }
  Qc.prototype.connectedCallback = function(a) {
    var b = a.__CE_definition
    b.connectedCallback && b.connectedCallback.call(a)
  }
  Qc.prototype.disconnectedCallback = function(a) {
    var b = a.__CE_definition
    b.disconnectedCallback && b.disconnectedCallback.call(a)
  }
  Qc.prototype.attributeChangedCallback = function(a, b, c, d, e) {
    var f = a.__CE_definition
    f.attributeChangedCallback &&
      -1 < f.observedAttributes.indexOf(b) &&
      f.attributeChangedCallback.call(a, b, c, d, e)
  }
  function Vc(a) {
    var b = document
    this.h = a
    this.a = b
    this.B = void 0
    Q(this.h, this.a)
    'loading' === this.a.readyState &&
      ((this.B = new MutationObserver(this.b.bind(this))),
      this.B.observe(this.a, { childList: !0, subtree: !0 }))
  }
  function Wc(a) {
    a.B && a.B.disconnect()
  }
  Vc.prototype.b = function(a) {
    var b = this.a.readyState
    ;('interactive' !== b && 'complete' !== b) || Wc(this)
    for (b = 0; b < a.length; b++)
      for (var c = a[b].addedNodes, d = 0; d < c.length; d++) Q(this.h, c[d])
  }
  function Xc() {
    var a = this
    this.b = this.a = void 0
    this.c = new Promise(function(b) {
      a.b = b
      a.a && b(a.a)
    })
  }
  function Yc(a) {
    if (a.a) throw Error('Already resolved.')
    a.a = void 0
    a.b && a.b(void 0)
  }
  function R(a) {
    this.Y = !1
    this.h = a
    this.ba = new Map()
    this.Z = function(a) {
      return a()
    }
    this.K = !1
    this.$ = []
    this.ra = new Vc(a)
  }
  n = R.prototype
  n.define = function(a, b) {
    var c = this
    if (!(b instanceof Function))
      throw new TypeError('Custom element constructors must be functions.')
    if (!Oc(a))
      throw new SyntaxError("The element name '" + a + "' is not valid.")
    if (this.h.a.get(a))
      throw Error(
        "A custom element with name '" + a + "' has already been defined."
      )
    if (this.Y) throw Error('A custom element is already being defined.')
    this.Y = !0
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
      var g = d('disconnectedCallback')
      var h = d('adoptedCallback')
      var k = d('attributeChangedCallback')
      var l = b.observedAttributes || []
    } catch (m) {
      return
    } finally {
      this.Y = !1
    }
    b = {
      localName: a,
      constructor: b,
      connectedCallback: f,
      disconnectedCallback: g,
      adoptedCallback: h,
      attributeChangedCallback: k,
      observedAttributes: l,
      constructionStack: []
    }
    Rc(this.h, a, b)
    this.$.push(b)
    this.K ||
      ((this.K = !0),
      this.Z(function() {
        return Zc(c)
      }))
  }
  n.T = function(a) {
    Q(this.h, a)
  }
  function Zc(a) {
    if (!1 !== a.K) {
      a.K = !1
      for (var b = a.$, c = [], d = new Map(), e = 0; e < b.length; e++)
        d.set(b[e].localName, [])
      Q(a.h, document, {
        T: function(b) {
          if (void 0 === b.__CE_state) {
            var e = b.localName,
              f = d.get(e)
            f ? f.push(b) : a.h.a.get(e) && c.push(b)
          }
        }
      })
      for (e = 0; e < c.length; e++) Uc(a.h, c[e])
      for (; 0 < b.length; ) {
        var f = b.shift()
        e = f.localName
        f = d.get(f.localName)
        for (var g = 0; g < f.length; g++) Uc(a.h, f[g])
        ;(e = a.ba.get(e)) && Yc(e)
      }
    }
  }
  n.get = function(a) {
    if ((a = this.h.a.get(a))) return a.constructor
  }
  n.ma = function(a) {
    if (!Oc(a))
      return Promise.reject(
        new SyntaxError("'" + a + "' is not a valid custom element name.")
      )
    var b = this.ba.get(a)
    if (b) return b.c
    b = new Xc()
    this.ba.set(a, b)
    this.h.a.get(a) &&
      !this.$.some(function(b) {
        return b.localName === a
      }) &&
      Yc(b)
    return b.c
  }
  n.Ba = function(a) {
    Wc(this.ra)
    var b = this.Z
    this.Z = function(c) {
      return a(function() {
        return b(c)
      })
    }
  }
  window.CustomElementRegistry = R
  R.prototype.define = R.prototype.define
  R.prototype.upgrade = R.prototype.T
  R.prototype.get = R.prototype.get
  R.prototype.whenDefined = R.prototype.ma
  R.prototype.polyfillWrapFlushCallback = R.prototype.Ba
  var $c = window.Document.prototype.createElement,
    ad = window.Document.prototype.createElementNS,
    bd = window.Document.prototype.importNode,
    cd = window.Document.prototype.prepend,
    dd = window.Document.prototype.append,
    ed = window.DocumentFragment.prototype.prepend,
    fd = window.DocumentFragment.prototype.append,
    gd = window.Node.prototype.cloneNode,
    hd = window.Node.prototype.appendChild,
    id = window.Node.prototype.insertBefore,
    jd = window.Node.prototype.removeChild,
    kd = window.Node.prototype.replaceChild,
    ld = Object.getOwnPropertyDescriptor(window.Node.prototype, 'textContent'),
    md = window.Element.prototype.attachShadow,
    nd = Object.getOwnPropertyDescriptor(window.Element.prototype, 'innerHTML'),
    od = window.Element.prototype.getAttribute,
    pd = window.Element.prototype.setAttribute,
    qd = window.Element.prototype.removeAttribute,
    rd = window.Element.prototype.getAttributeNS,
    sd = window.Element.prototype.setAttributeNS,
    td = window.Element.prototype.removeAttributeNS,
    ud = window.Element.prototype.insertAdjacentElement,
    vd = window.Element.prototype.insertAdjacentHTML,
    wd = window.Element.prototype.prepend,
    xd = window.Element.prototype.append,
    yd = window.Element.prototype.before,
    zd = window.Element.prototype.after,
    Ad = window.Element.prototype.replaceWith,
    Bd = window.Element.prototype.remove,
    Cd = window.HTMLElement,
    Dd = Object.getOwnPropertyDescriptor(
      window.HTMLElement.prototype,
      'innerHTML'
    ),
    Ed = window.HTMLElement.prototype.insertAdjacentElement,
    Fd = window.HTMLElement.prototype.insertAdjacentHTML
  var Gd = new function() {}()
  function Hd() {
    var a = Id
    window.HTMLElement = (function() {
      function b() {
        var b = this.constructor,
          d = a.D.get(b)
        if (!d)
          throw Error(
            'The custom element being constructed was not registered with `customElements`.'
          )
        var e = d.constructionStack
        if (0 === e.length)
          return (
            (e = $c.call(document, d.localName)),
            Object.setPrototypeOf(e, b.prototype),
            (e.__CE_state = 1),
            (e.__CE_definition = d),
            a.b(e),
            e
          )
        d = e.length - 1
        var f = e[d]
        if (f === Gd)
          throw Error(
            'The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.'
          )
        e[d] = Gd
        Object.setPrototypeOf(f, b.prototype)
        a.b(f)
        return f
      }
      b.prototype = Cd.prototype
      return b
    })()
  }
  function Jd(a, b, c) {
    function d(b) {
      return function(c) {
        for (var e = [], d = 0; d < arguments.length; ++d)
          e[d - 0] = arguments[d]
        d = []
        for (var f = [], l = 0; l < e.length; l++) {
          var m = e[l]
          m instanceof Element && J(m) && f.push(m)
          if (m instanceof DocumentFragment)
            for (m = m.firstChild; m; m = m.nextSibling) d.push(m)
          else d.push(m)
        }
        b.apply(this, e)
        for (e = 0; e < f.length; e++) P(a, f[e])
        if (J(this))
          for (e = 0; e < d.length; e++)
            (f = d[e]), f instanceof Element && N(a, f)
      }
    }
    void 0 !== c.S && (b.prepend = d(c.S))
    void 0 !== c.append && (b.append = d(c.append))
  }
  function Kd() {
    var a = Id
    M(Document.prototype, 'createElement', function(b) {
      if (this.__CE_hasRegistry) {
        var c = a.a.get(b)
        if (c) return new c.constructor()
      }
      b = $c.call(this, b)
      a.b(b)
      return b
    })
    M(Document.prototype, 'importNode', function(b, c) {
      b = bd.call(this, b, c)
      this.__CE_hasRegistry ? Q(a, b) : Tc(a, b)
      return b
    })
    M(Document.prototype, 'createElementNS', function(b, c) {
      if (
        this.__CE_hasRegistry &&
        (null === b || 'http://www.w3.org/1999/xhtml' === b)
      ) {
        var d = a.a.get(c)
        if (d) return new d.constructor()
      }
      b = ad.call(this, b, c)
      a.b(b)
      return b
    })
    Jd(a, Document.prototype, { S: cd, append: dd })
  }
  function Ld() {
    var a = Id
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
                h = e.length
              if (0 < h && J(this)) {
                c = Array(h)
                for (var k = 0; k < h; k++) c[k] = e[k]
              }
            }
            d.set.call(this, b)
            if (c) for (b = 0; b < c.length; b++) P(a, c[b])
          }
        }
      })
    }
    M(Node.prototype, 'insertBefore', function(b, d) {
      if (b instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(b.childNodes)
        b = id.call(this, b, d)
        if (J(this)) for (d = 0; d < c.length; d++) N(a, c[d])
        return b
      }
      c = J(b)
      d = id.call(this, b, d)
      c && P(a, b)
      J(this) && N(a, b)
      return d
    })
    M(Node.prototype, 'appendChild', function(b) {
      if (b instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(b.childNodes)
        b = hd.call(this, b)
        if (J(this)) for (var e = 0; e < c.length; e++) N(a, c[e])
        return b
      }
      c = J(b)
      e = hd.call(this, b)
      c && P(a, b)
      J(this) && N(a, b)
      return e
    })
    M(Node.prototype, 'cloneNode', function(b) {
      b = gd.call(this, b)
      this.ownerDocument.__CE_hasRegistry ? Q(a, b) : Tc(a, b)
      return b
    })
    M(Node.prototype, 'removeChild', function(b) {
      var c = J(b),
        e = jd.call(this, b)
      c && P(a, b)
      return e
    })
    M(Node.prototype, 'replaceChild', function(b, d) {
      if (b instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(b.childNodes)
        b = kd.call(this, b, d)
        if (J(this)) for (P(a, d), d = 0; d < c.length; d++) N(a, c[d])
        return b
      }
      c = J(b)
      var f = kd.call(this, b, d),
        g = J(this)
      g && P(a, d)
      c && P(a, b)
      g && N(a, b)
      return f
    })
    ld && ld.get
      ? b(Node.prototype, ld)
      : Sc(a, function(a) {
          b(a, {
            enumerable: !0,
            configurable: !0,
            get: function() {
              for (var a = [], b = 0; b < this.childNodes.length; b++)
                a.push(this.childNodes[b].textContent)
              return a.join('')
            },
            set: function(a) {
              for (; this.firstChild; ) jd.call(this, this.firstChild)
              hd.call(this, document.createTextNode(a))
            }
          })
        })
  }
  function Md(a) {
    var b = Element.prototype
    function c(b) {
      return function(c) {
        for (var d = [], e = 0; e < arguments.length; ++e)
          d[e - 0] = arguments[e]
        e = []
        for (var h = [], k = 0; k < d.length; k++) {
          var l = d[k]
          l instanceof Element && J(l) && h.push(l)
          if (l instanceof DocumentFragment)
            for (l = l.firstChild; l; l = l.nextSibling) e.push(l)
          else e.push(l)
        }
        b.apply(this, d)
        for (d = 0; d < h.length; d++) P(a, h[d])
        if (J(this))
          for (d = 0; d < e.length; d++)
            (h = e[d]), h instanceof Element && N(a, h)
      }
    }
    void 0 !== yd && (b.before = c(yd))
    void 0 !== yd && (b.after = c(zd))
    void 0 !== Ad &&
      M(b, 'replaceWith', function(b) {
        for (var c = [], d = 0; d < arguments.length; ++d)
          c[d - 0] = arguments[d]
        d = []
        for (var g = [], h = 0; h < c.length; h++) {
          var k = c[h]
          k instanceof Element && J(k) && g.push(k)
          if (k instanceof DocumentFragment)
            for (k = k.firstChild; k; k = k.nextSibling) d.push(k)
          else d.push(k)
        }
        h = J(this)
        Ad.apply(this, c)
        for (c = 0; c < g.length; c++) P(a, g[c])
        if (h)
          for (P(a, this), c = 0; c < d.length; c++)
            (g = d[c]), g instanceof Element && N(a, g)
      })
    void 0 !== Bd &&
      M(b, 'remove', function() {
        var b = J(this)
        Bd.call(this)
        b && P(a, this)
      })
  }
  function Nd() {
    var a = Id
    function b(b, c) {
      Object.defineProperty(b, 'innerHTML', {
        enumerable: c.enumerable,
        configurable: !0,
        get: c.get,
        set: function(b) {
          var d = this,
            e = void 0
          J(this) &&
            ((e = []),
            K(this, function(a) {
              a !== d && e.push(a)
            }))
          c.set.call(this, b)
          if (e)
            for (var f = 0; f < e.length; f++) {
              var g = e[f]
              1 === g.__CE_state && a.disconnectedCallback(g)
            }
          this.ownerDocument.__CE_hasRegistry ? Q(a, this) : Tc(a, this)
          return b
        }
      })
    }
    function c(b, c) {
      M(b, 'insertAdjacentElement', function(b, d) {
        var e = J(d)
        b = c.call(this, b, d)
        e && P(a, d)
        J(b) && N(a, d)
        return b
      })
    }
    function d(b, c) {
      function d(b, c) {
        for (var d = []; b !== c; b = b.nextSibling) d.push(b)
        for (c = 0; c < d.length; c++) Q(a, d[c])
      }
      M(b, 'insertAdjacentHTML', function(a, b) {
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
    md &&
      M(Element.prototype, 'attachShadow', function(a) {
        return (this.__CE_shadowRoot = a = md.call(this, a))
      })
    nd && nd.get
      ? b(Element.prototype, nd)
      : Dd && Dd.get
        ? b(HTMLElement.prototype, Dd)
        : Sc(a, function(a) {
            b(a, {
              enumerable: !0,
              configurable: !0,
              get: function() {
                return gd.call(this, !0).innerHTML
              },
              set: function(a) {
                var b = 'template' === this.localName,
                  c = b ? this.content : this,
                  d = $c.call(document, this.localName)
                for (d.innerHTML = a; 0 < c.childNodes.length; )
                  jd.call(c, c.childNodes[0])
                for (a = b ? d.content : d; 0 < a.childNodes.length; )
                  hd.call(c, a.childNodes[0])
              }
            })
          })
    M(Element.prototype, 'setAttribute', function(b, c) {
      if (1 !== this.__CE_state) return pd.call(this, b, c)
      var d = od.call(this, b)
      pd.call(this, b, c)
      c = od.call(this, b)
      a.attributeChangedCallback(this, b, d, c, null)
    })
    M(Element.prototype, 'setAttributeNS', function(b, c, d) {
      if (1 !== this.__CE_state) return sd.call(this, b, c, d)
      var e = rd.call(this, b, c)
      sd.call(this, b, c, d)
      d = rd.call(this, b, c)
      a.attributeChangedCallback(this, c, e, d, b)
    })
    M(Element.prototype, 'removeAttribute', function(b) {
      if (1 !== this.__CE_state) return qd.call(this, b)
      var c = od.call(this, b)
      qd.call(this, b)
      null !== c && a.attributeChangedCallback(this, b, c, null, null)
    })
    M(Element.prototype, 'removeAttributeNS', function(b, c) {
      if (1 !== this.__CE_state) return td.call(this, b, c)
      var d = rd.call(this, b, c)
      td.call(this, b, c)
      var e = rd.call(this, b, c)
      d !== e && a.attributeChangedCallback(this, c, d, e, b)
    })
    Ed
      ? c(HTMLElement.prototype, Ed)
      : ud
        ? c(Element.prototype, ud)
        : console.warn(
            'Custom Elements: `Element#insertAdjacentElement` was not patched.'
          )
    Fd
      ? d(HTMLElement.prototype, Fd)
      : vd
        ? d(Element.prototype, vd)
        : console.warn(
            'Custom Elements: `Element#insertAdjacentHTML` was not patched.'
          )
    Jd(a, Element.prototype, { S: wd, append: xd })
    Md(a)
  } /*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
  var Od = window.customElements
  if (
    !Od ||
    Od.forcePolyfill ||
    'function' != typeof Od.define ||
    'function' != typeof Od.get
  ) {
    var Id = new Qc()
    Hd()
    Kd()
    Jd(Id, DocumentFragment.prototype, { S: ed, append: fd })
    Ld()
    Nd()
    document.__CE_hasRegistry = !0
    var customElements = new R(Id)
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
  function Pd() {
    this.end = this.start = 0
    this.rules = this.parent = this.previous = null
    this.cssText = this.parsedCssText = ''
    this.atRule = !1
    this.type = 0
    this.parsedSelector = this.selector = this.keyframesName = ''
  }
  function Qd(a) {
    a = a.replace(Rd, '').replace(Sd, '')
    var b = Td,
      c = a,
      d = new Pd()
    d.start = 0
    d.end = c.length
    for (var e = d, f = 0, g = c.length; f < g; f++)
      if ('{' === c[f]) {
        e.rules || (e.rules = [])
        var h = e,
          k = h.rules[h.rules.length - 1] || null
        e = new Pd()
        e.start = f + 1
        e.parent = h
        e.previous = k
        h.rules.push(e)
      } else '}' === c[f] && ((e.end = f + 1), (e = e.parent || d))
    return b(d, a)
  }
  function Td(a, b) {
    var c = b.substring(a.start, a.end - 1)
    a.parsedCssText = a.cssText = c.trim()
    a.parent &&
      ((c = b.substring(
        a.previous ? a.previous.end : a.parent.start,
        a.start - 1
      )),
      (c = Ud(c)),
      (c = c.replace(Vd, ' ')),
      (c = c.substring(c.lastIndexOf(';') + 1)),
      (c = a.parsedSelector = a.selector = c.trim()),
      (a.atRule = 0 === c.indexOf('@')),
      a.atRule
        ? 0 === c.indexOf('@media')
          ? (a.type = Wd)
          : c.match(Xd) &&
            ((a.type = Yd), (a.keyframesName = a.selector.split(Vd).pop()))
        : (a.type = 0 === c.indexOf('--') ? Zd : $d))
    if ((c = a.rules))
      for (var d = 0, e = c.length, f; d < e && (f = c[d]); d++) Td(f, b)
    return a
  }
  function Ud(a) {
    return a.replace(/\\([0-9a-f]{1,6})\s/gi, function(a, c) {
      a = c
      for (c = 6 - a.length; c--; ) a = '0' + a
      return '\\' + a
    })
  }
  function ae(a, b, c) {
    c = void 0 === c ? '' : c
    var d = ''
    if (a.cssText || a.rules) {
      var e = a.rules,
        f
      if ((f = e))
        (f = e[0]), (f = !(f && f.selector && 0 === f.selector.indexOf('--')))
      if (f) {
        f = 0
        for (var g = e.length, h; f < g && (h = e[f]); f++) d = ae(h, b, d)
      } else
        b
          ? (b = a.cssText)
          : ((b = a.cssText),
            (b = b.replace(be, '').replace(ce, '')),
            (b = b.replace(de, '').replace(ee, ''))),
          (d = b.trim()) && (d = '  ' + d + '\n')
    }
    d &&
      (a.selector && (c += a.selector + ' {\n'),
      (c += d),
      a.selector && (c += '}\n\n'))
    return c
  }
  var $d = 1,
    Yd = 7,
    Wd = 4,
    Zd = 1e3,
    Rd = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
    Sd = /@import[^;]*;/gim,
    be = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
    ce = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
    de = /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
    ee = /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
    Xd = /^@[^\s]*keyframes/,
    Vd = /\s+/g
  var S = !(window.ShadyDOM && window.ShadyDOM.inUse),
    fe
  function ge(a) {
    fe =
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
    ? (fe = window.ShadyCSS.nativeCss)
    : window.ShadyCSS
      ? (ge(window.ShadyCSS), (window.ShadyCSS = void 0))
      : ge(window.WebComponents && window.WebComponents.flags)
  var T = fe
  var he = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
    ie = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,
    je = /(--[\w-]+)\s*([:,;)]|$)/gi,
    ke = /(animation\s*:)|(animation-name\s*:)/,
    le = /@media\s(.*)/,
    me = /\{[^}]*\}/g
  var ne = new Set()
  function oe(a, b) {
    if (!a) return ''
    'string' === typeof a && (a = Qd(a))
    b && pe(a, b)
    return ae(a, T)
  }
  function qe(a) {
    !a.__cssRules && a.textContent && (a.__cssRules = Qd(a.textContent))
    return a.__cssRules || null
  }
  function re(a) {
    return !!a.parent && a.parent.type === Yd
  }
  function pe(a, b, c, d) {
    if (a) {
      var e = !1,
        f = a.type
      if (d && f === Wd) {
        var g = a.selector.match(le)
        g && (window.matchMedia(g[1]).matches || (e = !0))
      }
      f === $d ? b(a) : c && f === Yd ? c(a) : f === Zd && (e = !0)
      if ((a = a.rules) && !e) {
        e = 0
        f = a.length
        for (var h; e < f && (h = a[e]); e++) pe(h, b, c, d)
      }
    }
  }
  function se(a, b, c, d) {
    var e = document.createElement('style')
    b && e.setAttribute('scope', b)
    e.textContent = a
    te(e, c, d)
    return e
  }
  var U = null
  function te(a, b, c) {
    b = b || document.head
    b.insertBefore(a, (c && c.nextSibling) || b.firstChild)
    U
      ? a.compareDocumentPosition(U) === Node.DOCUMENT_POSITION_PRECEDING &&
        (U = a)
      : (U = a)
  }
  function ue(a, b) {
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
    a = ue(a.substring(e + 1), b)
    e = d.indexOf(',')
    return -1 === e
      ? b(c, d.trim(), '', a)
      : b(c, d.substring(0, e).trim(), d.substring(e + 1).trim(), a)
  }
  function ve(a, b) {
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
    return { is: b, J: c }
  }
  function we() {}
  function xe(a, b, c) {
    var d = W
    a.__styleScoped ? (a.__styleScoped = null) : ye(d, a, b || '', c)
  }
  function ye(a, b, c, d) {
    b.nodeType === Node.ELEMENT_NODE && ze(b, c, d)
    if (
      (b =
        'template' === b.localName
          ? (b.content || b.Ma).childNodes
          : b.children || b.childNodes)
    )
      for (var e = 0; e < b.length; e++) ye(a, b[e], c, d)
  }
  function ze(a, b, c) {
    if (b)
      if (a.classList)
        c
          ? (a.classList.remove('style-scope'), a.classList.remove(b))
          : (a.classList.add('style-scope'), a.classList.add(b))
      else if (a.getAttribute) {
        var d = a.getAttribute(Ae)
        c
          ? d && ((b = d.replace('style-scope', '').replace(b, '')), ve(a, b))
          : ve(a, (d ? d + ' ' : '') + 'style-scope ' + b)
      }
  }
  function Be(a, b, c) {
    var d = W,
      e = a.__cssBuild
    S || 'shady' === e
      ? (b = oe(b, c))
      : ((a = V(a)), (b = Ce(d, b, a.is, a.J, c) + '\n\n'))
    return b.trim()
  }
  function Ce(a, b, c, d, e) {
    var f = De(c, d)
    c = c ? Ee + c : ''
    return oe(b, function(b) {
      b.c || ((b.selector = b.l = Fe(a, b, a.b, c, f)), (b.c = !0))
      e && e(b, c, f)
    })
  }
  function De(a, b) {
    return b ? '[is=' + a + ']' : a
  }
  function Fe(a, b, c, d, e) {
    var f = b.selector.split(Ge)
    if (!re(b)) {
      b = 0
      for (var g = f.length, h; b < g && (h = f[b]); b++)
        f[b] = c.call(a, h, d, e)
    }
    return f.join(Ge)
  }
  function He(a) {
    return a.replace(Ie, function(a, c, d) {
      ;-1 < d.indexOf('+')
        ? (d = d.replace(/\+/g, '___'))
        : -1 < d.indexOf('___') && (d = d.replace(/___/g, '+'))
      return ':' + c + '(' + d + ')'
    })
  }
  we.prototype.b = function(a, b, c) {
    var d = !1
    a = a.trim()
    var e = Ie.test(a)
    e &&
      ((a = a.replace(Ie, function(a, b, c) {
        return ':' + b + '(' + c.replace(/\s/g, '') + ')'
      })),
      (a = He(a)))
    a = a.replace(Je, Ke + ' $1')
    a = a.replace(Le, function(a, e, h) {
      d || ((a = Me(h, e, b, c)), (d = d || a.stop), (e = a.wa), (h = a.value))
      return e + h
    })
    e && (a = He(a))
    return a
  }
  function Me(a, b, c, d) {
    var e = a.indexOf(Ne)
    0 <= a.indexOf(Ke) ? (a = Oe(a, d)) : 0 !== e && (a = c ? Pe(a, c) : a)
    c = !1
    0 <= e && ((b = ''), (c = !0))
    if (c) {
      var f = !0
      c &&
        (a = a.replace(Qe, function(a, b) {
          return ' > ' + b
        }))
    }
    a = a.replace(Re, function(a, b, c) {
      return '[dir="' + c + '"] ' + b + ', ' + b + '[dir="' + c + '"]'
    })
    return { value: a, wa: b, stop: f }
  }
  function Pe(a, b) {
    a = a.split(Se)
    a[0] += b
    return a.join(Se)
  }
  function Oe(a, b) {
    var c = a.match(Te)
    return (c = (c && c[2].trim()) || '')
      ? c[0].match(Ue)
        ? a.replace(Te, function(a, c, f) {
            return b + f
          })
        : c.split(Ue)[0] === b
          ? c
          : Ve
      : a.replace(Ke, b)
  }
  function We(a) {
    a.selector === Xe && (a.selector = 'html')
  }
  we.prototype.c = function(a) {
    return a.match(Ne) ? this.b(a, Ye) : Pe(a.trim(), Ye)
  }
  p.Object.defineProperties(we.prototype, {
    a: {
      configurable: !0,
      enumerable: !0,
      get: function() {
        return 'style-scope'
      }
    }
  })
  var Ie = /:(nth[-\w]+)\(([^)]+)\)/,
    Ye = ':not(.style-scope)',
    Ge = ',',
    Le = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g,
    Ue = /[[.:#*]/,
    Ke = ':host',
    Xe = ':root',
    Ne = '::slotted',
    Je = new RegExp('^(' + Ne + ')'),
    Te = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
    Qe = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
    Re = /(.*):dir\((?:(ltr|rtl))\)/,
    Ee = '.',
    Se = ':',
    Ae = 'class',
    Ve = 'should_not_match',
    W = new we()
  function Ze(a, b, c, d) {
    this.v = a || null
    this.b = b || null
    this.ca = c || []
    this.G = null
    this.J = d || ''
    this.a = this.m = this.A = null
  }
  function X(a) {
    return a ? a.__styleInfo : null
  }
  function $e(a, b) {
    return (a.__styleInfo = b)
  }
  Ze.prototype.c = function() {
    return this.v
  }
  Ze.prototype._getStyleRules = Ze.prototype.c
  function af(a) {
    var b =
      this.matches ||
      this.matchesSelector ||
      this.mozMatchesSelector ||
      this.msMatchesSelector ||
      this.oMatchesSelector ||
      this.webkitMatchesSelector
    return b && b.call(this, a)
  }
  var bf = navigator.userAgent.match('Trident')
  function cf() {}
  function df(a) {
    var b = {},
      c = [],
      d = 0
    pe(
      a,
      function(a) {
        ef(a)
        a.index = d++
        a = a.j.cssText
        for (var c; (c = je.exec(a)); ) {
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
  function ef(a) {
    if (!a.j) {
      var b = {},
        c = {}
      ff(a, c) && ((b.u = c), (a.rules = null))
      b.cssText = a.parsedCssText.replace(me, '').replace(he, '')
      a.j = b
    }
  }
  function ff(a, b) {
    var c = a.j
    if (c) {
      if (c.u) return Object.assign(b, c.u), !0
    } else {
      c = a.parsedCssText
      for (var d; (a = he.exec(c)); ) {
        d = (a[2] || a[3]).trim()
        if ('inherit' !== d || 'unset' !== d) b[a[1].trim()] = d
        d = !0
      }
      return d
    }
  }
  function gf(a, b, c) {
    b &&
      (b =
        0 <= b.indexOf(';')
          ? hf(a, b, c)
          : ue(b, function(b, e, f, g) {
              if (!e) return b + g
              ;(e = gf(a, c[e], c)) && 'initial' !== e
                ? 'apply-shim-inherit' === e && (e = 'inherit')
                : (e = gf(a, c[f] || f, c) || f)
              return b + (e || '') + g
            }))
    return (b && b.trim()) || ''
  }
  function hf(a, b, c) {
    b = b.split(';')
    for (var d = 0, e, f; d < b.length; d++)
      if ((e = b[d])) {
        ie.lastIndex = 0
        if ((f = ie.exec(e))) e = gf(a, c[f[1]], c)
        else if (((f = e.indexOf(':')), -1 !== f)) {
          var g = e.substring(f)
          g = g.trim()
          g = gf(a, g, c) || g
          e = e.substring(0, f) + g
        }
        b[d] =
          e && e.lastIndexOf(';') === e.length - 1 ? e.slice(0, -1) : e || ''
      }
    return b.join(';')
  }
  function jf(a, b) {
    var c = {},
      d = []
    pe(
      a,
      function(a) {
        a.j || ef(a)
        var e = a.l || a.parsedSelector
        b &&
          a.j.u &&
          e &&
          af.call(b, e) &&
          (ff(a, c),
          (a = a.index),
          (e = parseInt(a / 32, 10)),
          (d[e] = (d[e] || 0) | (1 << (a % 32))))
      },
      null,
      !0
    )
    return { u: c, key: d }
  }
  function kf(a, b, c, d) {
    b.j || ef(b)
    if (b.j.u) {
      var e = V(a)
      a = e.is
      e = e.J
      e = a ? De(a, e) : 'html'
      var f = b.parsedSelector,
        g = ':host > *' === f || 'html' === f,
        h = 0 === f.indexOf(':host') && !g
      'shady' === c &&
        ((g = f === e + ' > *.' + e || -1 !== f.indexOf('html')),
        (h = !g && 0 === f.indexOf(e)))
      'shadow' === c && ((g = ':host > *' === f || 'html' === f), (h = h && !g))
      if (g || h)
        (c = e),
          h &&
            (b.l || (b.l = Fe(W, b, W.b, a ? Ee + a : '', e)), (c = b.l || e)),
          d({ Da: c, Aa: h, Va: g })
    }
  }
  function lf(a, b) {
    var c = {},
      d = {},
      e = b && b.__cssBuild
    pe(
      b,
      function(b) {
        kf(a, b, e, function(e) {
          af.call(a.i || a, e.Da) && (e.Aa ? ff(b, c) : ff(b, d))
        })
      },
      null,
      !0
    )
    return { Ca: d, za: c }
  }
  function mf(a, b, c, d) {
    var e = V(b),
      f = De(e.is, e.J),
      g = new RegExp(
        '(?:^|[^.#[:])' +
          (b.extends ? '\\' + f.slice(0, -1) + '\\]' : f) +
          '($|[.:[\\s>+~])'
      )
    e = X(b).v
    var h = nf(e, d)
    return Be(b, e, function(b) {
      var e = ''
      b.j || ef(b)
      b.j.cssText && (e = hf(a, b.j.cssText, c))
      b.cssText = e
      if (!S && !re(b) && b.cssText) {
        var k = (e = b.cssText)
        null == b.ga && (b.ga = ke.test(e))
        if (b.ga)
          if (null == b.R) {
            b.R = []
            for (var q in h)
              (k = h[q]), (k = k(e)), e !== k && ((e = k), b.R.push(q))
          } else {
            for (q = 0; q < b.R.length; ++q) (k = h[b.R[q]]), (e = k(e))
            k = e
          }
        b.cssText = k
        b.l = b.l || b.selector
        e = '.' + d
        q = b.l.split(',')
        k = 0
        for (var O = q.length, L; k < O && (L = q[k]); k++)
          q[k] = L.match(g) ? L.replace(f, e) : e + ' ' + L
        b.selector = q.join(',')
      }
    })
  }
  function nf(a, b) {
    a = a.b
    var c = {}
    if (!S && a)
      for (var d = 0, e = a[d]; d < a.length; e = a[++d]) {
        var f = e,
          g = b
        f.i = new RegExp('\\b' + f.keyframesName + '(?!\\B|-)', 'g')
        f.a = f.keyframesName + '-' + g
        f.l = f.l || f.selector
        f.selector = f.l.replace(f.keyframesName, f.a)
        c[e.keyframesName] = of(e)
      }
    return c
  }
  function of(a) {
    return function(b) {
      return b.replace(a.i, a.a)
    }
  }
  function pf(a, b) {
    var c = qf,
      d = qe(a)
    a.textContent = oe(d, function(a) {
      var d = (a.cssText = a.parsedCssText)
      a.j &&
        a.j.cssText &&
        ((d = d.replace(be, '').replace(ce, '')), (a.cssText = hf(c, d, b)))
    })
  }
  p.Object.defineProperties(cf.prototype, {
    a: {
      configurable: !0,
      enumerable: !0,
      get: function() {
        return 'x-scope'
      }
    }
  })
  var qf = new cf()
  var rf = {},
    sf = window.customElements
  if (sf && !S) {
    var tf = sf.define
    sf.define = function(a, b, c) {
      var d = document.createComment(' Shady DOM styles for ' + a + ' '),
        e = document.head
      e.insertBefore(d, (U ? U.nextSibling : null) || e.firstChild)
      U = d
      rf[a] = d
      tf.call(sf, a, b, c)
    }
  }
  function uf() {
    this.cache = {}
  }
  uf.prototype.store = function(a, b, c, d) {
    var e = this.cache[a] || []
    e.push({ u: b, styleElement: c, m: d })
    100 < e.length && e.shift()
    this.cache[a] = e
  }
  uf.prototype.fetch = function(a, b, c) {
    if ((a = this.cache[a]))
      for (var d = a.length - 1; 0 <= d; d--) {
        var e = a[d],
          f
        a: {
          for (f = 0; f < c.length; f++) {
            var g = c[f]
            if (e.u[g] !== b[g]) {
              f = !1
              break a
            }
          }
          f = !0
        }
        if (f) return e
      }
  }
  function vf() {}
  function wf(a) {
    for (var b = 0; b < a.length; b++) {
      var c = a[b]
      if (c.target !== document.documentElement && c.target !== document.head)
        for (var d = 0; d < c.addedNodes.length; d++) {
          var e = c.addedNodes[d]
          if (e.nodeType === Node.ELEMENT_NODE) {
            var f = e.getRootNode()
            var g = e
            var h = []
            g.classList
              ? (h = Array.from(g.classList))
              : g instanceof window.SVGElement &&
                g.hasAttribute('class') &&
                (h = g.getAttribute('class').split(/\s+/))
            g = h
            h = g.indexOf(W.a)
            if ((g = -1 < h ? g[h + 1] : '') && f === e.ownerDocument)
              xe(e, g, !0)
            else if (f.nodeType === Node.DOCUMENT_FRAGMENT_NODE && (f = f.host))
              if (((f = V(f).is), g === f))
                for (
                  e = window.ShadyDOM.nativeMethods.querySelectorAll.call(
                    e,
                    ':not(.' + W.a + ')'
                  ),
                    f = 0;
                  f < e.length;
                  f++
                )
                  ze(e[f], g)
              else g && xe(e, g, !0), xe(e, f)
          }
        }
    }
  }
  if (!S) {
    var xf = new MutationObserver(wf),
      yf = function(a) {
        xf.observe(a, { childList: !0, subtree: !0 })
      }
    if (
      window.customElements &&
      !window.customElements.polyfillWrapFlushCallback
    )
      yf(document)
    else {
      var zf = function() {
        yf(document.body)
      }
      window.HTMLImports
        ? window.HTMLImports.whenReady(zf)
        : requestAnimationFrame(function() {
            if ('loading' === document.readyState) {
              var a = function() {
                zf()
                document.removeEventListener('readystatechange', a)
              }
              document.addEventListener('readystatechange', a)
            } else zf()
          })
    }
    vf = function() {
      wf(xf.takeRecords())
    }
  }
  var Af = vf
  var Bf = {}
  var Cf = Promise.resolve()
  function Df(a) {
    if ((a = Bf[a]))
      (a._applyShimCurrentVersion = a._applyShimCurrentVersion || 0),
        (a._applyShimValidatingVersion = a._applyShimValidatingVersion || 0),
        (a._applyShimNextVersion = (a._applyShimNextVersion || 0) + 1)
  }
  function Ef(a) {
    return a._applyShimCurrentVersion === a._applyShimNextVersion
  }
  function Ff(a) {
    a._applyShimValidatingVersion = a._applyShimNextVersion
    a.a ||
      ((a.a = !0),
      Cf.then(function() {
        a._applyShimCurrentVersion = a._applyShimNextVersion
        a.a = !1
      }))
  }
  var Gf = null,
    Hf = (window.HTMLImports && window.HTMLImports.whenReady) || null,
    If
  function Jf(a) {
    requestAnimationFrame(function() {
      Hf
        ? Hf(a)
        : (Gf ||
            ((Gf = new Promise(function(a) {
              If = a
            })),
            'complete' === document.readyState
              ? If()
              : document.addEventListener('readystatechange', function() {
                  'complete' === document.readyState && If()
                })),
          Gf.then(function() {
            a && a()
          }))
    })
  }
  var Kf = new uf()
  function Y() {
    var a = this
    this.fa = {}
    this.c = document.documentElement
    var b = new Pd()
    b.rules = []
    this.i = $e(this.c, new Ze(b))
    this.D = !1
    this.b = this.a = null
    Jf(function() {
      Lf(a)
    })
  }
  n = Y.prototype
  n.na = function() {
    Af()
  }
  n.xa = function(a) {
    return qe(a)
  }
  n.Fa = function(a) {
    return oe(a)
  }
  n.prepareTemplate = function(a, b, c) {
    if (!a.b) {
      a.b = !0
      a.name = b
      a.extends = c
      Bf[b] = a
      var d = (d = a.content.querySelector('style'))
        ? d.getAttribute('css-build') || ''
        : ''
      var e = []
      for (
        var f = a.content.querySelectorAll('style'), g = 0;
        g < f.length;
        g++
      ) {
        var h = f[g]
        if (h.hasAttribute('shady-unscoped')) {
          if (!S) {
            var k = h.textContent
            ne.has(k) ||
              (ne.add(k), (k = h.cloneNode(!0)), document.head.appendChild(k))
            h.parentNode.removeChild(h)
          }
        } else e.push(h.textContent), h.parentNode.removeChild(h)
      }
      e = e.join('').trim()
      c = { is: b, extends: c, Ka: d }
      S || xe(a.content, b)
      Lf(this)
      f = ie.test(e) || he.test(e)
      ie.lastIndex = 0
      he.lastIndex = 0
      e = Qd(e)
      f && T && this.a && this.a.transformRules(e, b)
      a._styleAst = e
      a.c = d
      d = []
      T || (d = df(a._styleAst))
      if (!d.length || T)
        (e = S ? a.content : null),
          (b = rf[b]),
          (f = Be(c, a._styleAst)),
          (b = f.length ? se(f, c.is, e, b) : void 0),
          (a.ea = b)
      a.ua = d
    }
  }
  function Mf(a) {
    !a.b &&
      window.ShadyCSS &&
      window.ShadyCSS.CustomStyleInterface &&
      ((a.b = window.ShadyCSS.CustomStyleInterface),
      (a.b.transformCallback = function(b) {
        a.ka(b)
      }),
      (a.b.validateCallback = function() {
        requestAnimationFrame(function() {
          ;(a.b.enqueued || a.D) && a.C()
        })
      }))
  }
  function Lf(a) {
    !a.a &&
      window.ShadyCSS &&
      window.ShadyCSS.ApplyShim &&
      ((a.a = window.ShadyCSS.ApplyShim), (a.a.invalidCallback = Df))
    Mf(a)
  }
  n.C = function() {
    Lf(this)
    if (this.b) {
      var a = this.b.processStyles()
      if (this.b.enqueued) {
        if (T)
          for (var b = 0; b < a.length; b++) {
            var c = this.b.getStyleForCustomStyle(a[b])
            if (c && T && this.a) {
              var d = qe(c)
              Lf(this)
              this.a.transformRules(d)
              c.textContent = oe(d)
            }
          }
        else
          for (Nf(this, this.c, this.i), b = 0; b < a.length; b++)
            (c = this.b.getStyleForCustomStyle(a[b])) && pf(c, this.i.A)
        this.b.enqueued = !1
        this.D && !T && this.styleDocument()
      }
    }
  }
  n.styleElement = function(a, b) {
    var c = V(a).is,
      d = X(a)
    if (!d) {
      var e = V(a)
      d = e.is
      e = e.J
      var f = rf[d]
      d = Bf[d]
      if (d) {
        var g = d._styleAst
        var h = d.ua
      }
      d = $e(a, new Ze(g, f, h, e))
    }
    a !== this.c && (this.D = !0)
    b && ((d.G = d.G || {}), Object.assign(d.G, b))
    if (T) {
      if (d.G) {
        b = d.G
        for (var k in b)
          null === k ? a.style.removeProperty(k) : a.style.setProperty(k, b[k])
      }
      if (((k = Bf[c]) || a === this.c) && k && k.ea && !Ef(k)) {
        if (Ef(k) || k._applyShimValidatingVersion !== k._applyShimNextVersion)
          Lf(this),
            this.a && this.a.transformRules(k._styleAst, c),
            (k.ea.textContent = Be(a, d.v)),
            Ff(k)
        S &&
          (c = a.shadowRoot) &&
          (c.querySelector('style').textContent = Be(a, d.v))
        d.v = k._styleAst
      }
    } else if ((Nf(this, a, d), d.ca && d.ca.length)) {
      c = d
      k = V(a).is
      d = (b = Kf.fetch(k, c.A, c.ca)) ? b.styleElement : null
      g = c.m
      ;(h = b && b.m) ||
        ((h = this.fa[k] = (this.fa[k] || 0) + 1), (h = k + '-' + h))
      c.m = h
      h = c.m
      e = qf
      e = d ? d.textContent || '' : mf(e, a, c.A, h)
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
          : e && (d = se(e, h, a.shadowRoot, f.b))
        : d
          ? d.parentNode ||
            (bf && -1 < e.indexOf('@media') && (d.textContent = e),
            te(d, null, f.b))
          : e && (d = se(e, h, null, f.b))
      d &&
        ((d._useCount = d._useCount || 0), f.a != d && d._useCount++, (f.a = d))
      h = d
      S ||
        ((d = c.m),
        (f = e = a.getAttribute('class') || ''),
        g &&
          (f = e.replace(new RegExp('\\s*x-scope\\s*' + g + '\\s*', 'g'), ' ')),
        (f += (f ? ' ' : '') + 'x-scope ' + d),
        e !== f && ve(a, f))
      b || Kf.store(k, c.A, h, c.m)
    }
  }
  function Of(a, b) {
    return (b = b.getRootNode().host) ? (X(b) ? b : Of(a, b)) : a.c
  }
  function Nf(a, b, c) {
    a = Of(a, b)
    var d = X(a)
    a = Object.create(d.A || null)
    var e = lf(b, c.v)
    b = jf(d.v, b).u
    Object.assign(a, e.za, b, e.Ca)
    b = c.G
    for (var f in b) if ((e = b[f]) || 0 === e) a[f] = e
    f = qf
    b = Object.getOwnPropertyNames(a)
    for (e = 0; e < b.length; e++) (d = b[e]), (a[d] = gf(f, a[d], a))
    c.A = a
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
  n.ka = function(a) {
    var b = this,
      c = qe(a)
    pe(c, function(a) {
      if (S) We(a)
      else {
        var c = W
        a.selector = a.parsedSelector
        We(a)
        a.selector = a.l = Fe(c, a, c.c, void 0, void 0)
      }
      T && (Lf(b), b.a && b.a.transformRule(a))
    })
    T ? (a.textContent = oe(c)) : this.i.v.rules.push(c)
  }
  n.getComputedStyleValue = function(a, b) {
    var c
    T || (c = (X(a) || X(Of(this, a))).A[b])
    return (c = c || window.getComputedStyle(a).getPropertyValue(b))
      ? c.trim()
      : ''
  }
  n.Ea = function(a, b) {
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
    T || ((c = X(a)) && c.m && b.push(qf.a, c.m))
    ve(a, b.join(' '))
  }
  n.va = function(a) {
    return X(a)
  }
  Y.prototype.flush = Y.prototype.na
  Y.prototype.prepareTemplate = Y.prototype.prepareTemplate
  Y.prototype.styleElement = Y.prototype.styleElement
  Y.prototype.styleDocument = Y.prototype.styleDocument
  Y.prototype.styleSubtree = Y.prototype.styleSubtree
  Y.prototype.getComputedStyleValue = Y.prototype.getComputedStyleValue
  Y.prototype.setElementClass = Y.prototype.Ea
  Y.prototype._styleInfoForNode = Y.prototype.va
  Y.prototype.transformCustomStyleForDocument = Y.prototype.ka
  Y.prototype.getStyleAst = Y.prototype.xa
  Y.prototype.styleAstToString = Y.prototype.Fa
  Y.prototype.flushCustomStyles = Y.prototype.C
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
    Pf,
    Qf
  window.ShadyCSS &&
    ((Pf = window.ShadyCSS.ApplyShim),
    (Qf = window.ShadyCSS.CustomStyleInterface))
  window.ShadyCSS = {
    ScopingShim: Z,
    prepareTemplate: function(a, b, c) {
      Z.C()
      Z.prepareTemplate(a, b, c)
    },
    styleSubtree: function(a, b) {
      Z.C()
      Z.styleSubtree(a, b)
    },
    styleElement: function(a) {
      Z.C()
      Z.styleElement(a)
    },
    styleDocument: function(a) {
      Z.C()
      Z.styleDocument(a)
    },
    getComputedStyleValue: function(a, b) {
      return Z.getComputedStyleValue(a, b)
    },
    nativeCss: T,
    nativeShadow: S
  }
  Pf && (window.ShadyCSS.ApplyShim = Pf)
  Qf && (window.ShadyCSS.CustomStyleInterface = Qf)
  var Rf = window.document
  window.WebComponents = window.WebComponents || {}
  function Sf() {
    requestAnimationFrame(function() {
      window.WebComponents.ready = !0
      window.document.dispatchEvent(
        new CustomEvent('WebComponentsReady', { bubbles: !0 })
      )
    })
  }
  function Tf() {
    Sf()
    Rf.removeEventListener('readystatechange', Tf)
  }
  'loading' !== Rf.readyState
    ? Sf()
    : Rf.addEventListener('readystatechange', Tf)
}.call(this))

//# sourceMappingURL=webcomponents-sd-ce.js.map
