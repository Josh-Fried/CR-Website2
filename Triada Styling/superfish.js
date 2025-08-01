!(function (e) {
  "use strict";
  e(window).on("resize", function () {
    e(".sf-menu ul.tracked-pos").removeClass("tracked-pos");
  });
  var t,
    s,
    n,
    a,
    o,
    r,
    i,
    h,
    l,
    d,
    p,
    u,
    f,
    c,
    m,
    v,
    g =
      ((s = "sf-breadcrumb"),
      (n = "sf-js-enabled"),
      (a = "sf-with-ul"),
      (o = "sf-arrows"),
      (r = (function () {
        var t = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        return t && e("html").css("cursor", "pointer").on("click", e.noop), t;
      })()),
      (i =
        "behavior" in (t = document.documentElement.style) &&
        "fill" in t &&
        /iemobile/i.test(navigator.userAgent)),
      (h = function (e, t) {
        var s = n;
        t.cssArrows && (s += " " + o), e.toggleClass(s);
      }),
      (l = function (e) {
        e.children("a").toggleClass(a);
      }),
      (d = function (e) {
        var t = e.css("ms-touch-action");
        (t = "pan-y" === t ? "auto" : "pan-y"), e.css("ms-touch-action", t);
      }),
      (p = function (t) {
        var s = e(this),
          n = s.siblings(t.data.popUpSelector);
        n.length > 0 &&
          n.is(":hidden") &&
          (s.one("click.superfish", !1),
          "MSPointerDown" === t.type
            ? s.trigger("focus")
            : e.proxy(u, s.parent("li"))());
      }),
      (u = function () {
        var t = e(this),
          s = v(t);
        e(this).parents(".megamenu").length > 0 ||
          (clearTimeout(s.sfTimer),
          t.siblings().superfish("hide").end().superfish("show"));
      }),
      (f = function () {
        var t = e(this),
          s = v(t);
        r
          ? e.proxy(c, t, s)()
          : (clearTimeout(s.sfTimer),
            (s.sfTimer = setTimeout(e.proxy(c, t, s), s.delay)));
      }),
      (c = function (t) {
        (t.retainPath = e.inArray(this[0], t.$path) > -1),
          this.superfish("hide"),
          this.parents("." + t.hoverClass).length ||
            (t.onIdle.call(m(this)), t.$path.length && e.proxy(u, t.$path)());
      }),
      (m = function (e) {
        return e.closest("." + n);
      }),
      (v = function (e) {
        return m(e).data("sf-options");
      }),
      {
        hide: function (t) {
          if (this.length) {
            var s = v((r = this));
            if (!s) return this;
            if (
              e(this).hasClass("menu-item-over") &&
              e(this).hasClass("megamenu")
            )
              return !0;
            var n = !0 === s.retainPath ? s.$path : "",
              a = r
                .find("li." + s.hoverClass)
                .add(this)
                .not(n)
                .removeClass(s.hoverClass)
                .children(s.popUpSelector),
              o = s.speedOut;
            if (
              (t && (a.show(), (o = 0)),
              (s.retainPath = !1),
              s.onBeforeHide.call(a),
              "minimal" == s.dropdownStyle)
            ) {
              var r = e(this);
              s.onHide.call(r);
            } else
              a.stop(!0, !0).animate(s.animationOut, o, function () {
                var t = e(this);
                s.onHide.call(t);
              });
            if (e(this).parents(".megamenu").length > 0) return;
            e('#header-outer[data-megamenu-rt="1"]').length > 0 &&
              e('#header-outer[data-transparent-header="true"]').length > 0 &&
              (0 == e("#header-outer.scrolled-down").length &&
                0 == e("#header-outer.small-nav").length &&
                0 == e("#header-outer.detached").length &&
                0 == e("#header-outer.fixed-menu").length &&
                e("#header-outer").addClass("transparent"),
              e(
                '#header-outer[data-permanent-transparent="1"][data-transparent-header="true"]'
              ).length > 0 && e("#header-outer").addClass("transparent"));
          }
          return this;
        },
        show: function () {
          if (!(e(this).parents(".megamenu").length > 0)) {
            var t = v(this);
            if (!t) return this;
            var s = this.addClass(t.hoverClass).children(t.popUpSelector);
            if (
              (e('#header-outer[data-megamenu-rt="1"]').length > 0 &&
                e(this).hasClass("megamenu") &&
                !e(this).hasClass("width-75") &&
                !e(this).hasClass("width-50") &&
                "true" == e("#header-outer").attr("data-transparent-header") &&
                (e("#header-outer").addClass("no-transition"),
                e("#header-outer").removeClass("transparent")),
              t.onBeforeShow.call(s),
              !s.hasClass("tracked-pos") &&
                !e(s).parents("li").hasClass("megamenu") &&
                !e(s).parents("ul").hasClass("sub-menu") &&
                s.offset())
            ) {
              s.addClass("temp-hidden-display");
              var n = e("#top .container").width(),
                a = s;
              a.offset().left - (e(window).width() - n) / 2 + a.width() <=
              e(window).width() - 100
                ? s.parents("li").removeClass("edge")
                : s.parents("li").addClass("edge"),
                s.removeClass("temp-hidden-display");
            }
            return (
              "minimal" == t.dropdownStyle
                ? t.onShow.call(s)
                : s.stop(!0, !0).animate(t.animation, t.speed, function () {
                    t.onShow.call(s);
                  }),
              s.hasClass("tracked-pos") ||
                (s.length > 0 &&
                  s.parents(".sub-menu").length > 0 &&
                  s.parents(".sf-menu").length > 0 &&
                  s.offset().left + s.outerWidth() > e(window).width() &&
                  (s.addClass("on-left-side"),
                  s.find("ul").addClass("on-left-side"))),
              s.addClass("tracked-pos"),
              this
            );
          }
        },
        destroy: function () {
          return this.each(function () {
            var t,
              n = e(this),
              a = n.data("sf-options");
            if (!a) return !1;
            (t = n.find(a.popUpSelector).parent("li")),
              clearTimeout(a.sfTimer),
              h(n, a),
              l(t),
              d(n),
              n.off(".superfish").off(".hoverIntent"),
              t.children(a.popUpSelector).attr("style", function (e, t) {
                return t.replace(/display[^;]+;?/g, "");
              }),
              a.$path.removeClass(a.hoverClass + " " + s).addClass(a.pathClass),
              n.find("." + a.hoverClass).removeClass(a.hoverClass),
              a.onDestroy.call(n),
              n.removeData("sf-options");
          });
        },
        init: function (t) {
          return this.each(function () {
            var n = e(this);
            if (n.data("sf-options")) return !1;
            var a = e.extend({}, e.fn.superfish.defaults, t),
              o = n.find(a.popUpSelector).parent("li");
            (a.$path = (function (t, n) {
              return t
                .find("li." + n.pathClass)
                .slice(0, n.pathLevels)
                .addClass(n.hoverClass + " " + s)
                .filter(function () {
                  return e(this).children(n.popUpSelector).hide().show().length;
                })
                .removeClass(n.pathClass);
            })(n, a)),
              n.data("sf-options", a),
              h(n, a),
              l(o),
              d(n),
              (function (t, s) {
                var n = "li:has(" + s.popUpSelector + ")";
                e.fn.hoverIntent && !s.disableHI
                  ? t.hoverIntent(u, f, n)
                  : t
                      .on("mouseenter.superfish", n, u)
                      .on("mouseleave.superfish", n, f);
                var a = "MSPointerDown.superfish";
                r || (a += " touchend.superfish"),
                  i && (a += " mousedown.superfish"),
                  t
                    .on("focusin.superfish", "li", u)
                    .on("focusout.superfish", "li", f)
                    .on(a, "a", s, p);
              })(n, a),
              o.not("." + s).superfish("hide", !0),
              a.onInit.call(this);
          });
        },
      });
  (e.fn.superfish = function (t, s) {
    return g[t]
      ? g[t].apply(this, Array.prototype.slice.call(arguments, 1))
      : "object" != typeof t && t
      ? e.error("Method " + t + " does not exist on jQuery.fn.superfish")
      : g.init.apply(this, arguments);
  }),
    (e.fn.superfish.defaults = {
      popUpSelector: "ul,.sf-mega, .nectar-global-section-megamenu",
      hoverClass: "sfHover",
      pathClass: "overrideThisToUse",
      pathLevels: 1,
      delay: 800,
      animation: { opacity: "show" },
      animationOut: { opacity: "hide" },
      speed: "normal",
      speedOut: "fast",
      cssArrows: !0,
      disableHI: !1,
      onInit: e.noop,
      onBeforeShow: e.noop,
      onShow: e.noop,
      onBeforeHide: e.noop,
      onHide: e.noop,
      onIdle: e.noop,
      onDestroy: e.noop,
      dropdownStyle:
        e('body[data-dropdown-style="minimal"]').length > 0
          ? "minimal"
          : "classic",
    }),
    e.fn.extend({ hideSuperfishUl: g.hide, showSuperfishUl: g.show });
})(jQuery);
