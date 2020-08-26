/**
 * edython
 *
 * Copyright 2020 Jérôme LAURENS.
 *
 * @license EUPL-1.2
 */
/**
 * @fileoverview Span object to store the dimensions of bricks
 * in order to support line splitting, doc strings  and continuation lines.
 * 
 * Next description is not that accurate.
 * 
 * Splitting long lines:
 * ```
 * ....print(a,
 * b,
 * c)
 * ```
 * Group statements have an indented suite.
 * ```
 * ....if test(a,
 * b,
 * c):
 * ......|
 * ```
 * 
 * A brick span is a connected geometrical region
 * corresponding to letters and spaces typed in a stream.
 * Limitations are:
 * – only the first line is indented.
 * - next lines but the last one are considered to have the same length (we only care about the longest line)
 * 
 * We may have one of the following situations:
 * ```
 * print('''foo
 *         |bar'''); print('''foo
 *                         |bar'''); print('''foo
 *                                           |bar''')
 * ```
 * 
 * Both print statements have 2 main lines.
 * The first print has 0 header line, 2 footer lines.
 * The second print has 1 header line, 1 footer line.
 * The third print has 2 header lines, 0 footer line.
 * An expression brick has no header lines nor footer lines.
 * The initial values are set to 0, except the column and main lines
 * which are respectively 2, one for each end, and 1.
 * During runtime, all the number of lines are modified relatively.
 * 
 * We do not make difference between expressions,
 * group bricks and simple statement bricks
 * despite that groups cannot have headers, only footers,
 * statements cannot have hole line and expression have no right padding.
 * 
 * Instruction bricks may have a trailing semicolon.
 * This semicolon is visible only when there is a statement to the right.
 * We do not allow a comment to follow a trailing semicolon.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

/**
 * @name{eYo.span}
 * @namespace
 */
eYo.o4t.newNS(eYo, 'span', {
  /**
   * @type {Number} positive number of indentation spaces, in python sense.
   */
  INDENT: 2,
  /**
   * The tab width in board unit.
   */
  TAB_WIDTH () {
    return eYo.span.INDENT * eYo.geom.X // this is a getter
  },
}, true)

/**
 * @name {eYo.Span}
 * Class for a Span object.
 * A span object stores various dimensions of a brick, in text units.
 * Each node has a span object.
 * Any public action is expected to behave atomically.
 * The state is always in a consistent state.
 * However, the span state may not be consistent with the brick state.
 * For edython.
 * @param {eYo.brick.C9rBase} brick The brick owning the span.
 * @constructor
 */
eYo.span.makeC9rBase({
  //<<< mochai: Span
  init () {
    this.resetC()
    this.resetL()
  },
  aliases: {
    'size.x': ['x', 'width'],
    'size.y': ['y', 'height'],
  },
  properties: {
    u: {
      //<<< mochai: eYo.geom.Span: u
      value: 0,
      validate(after) {
        return after > 0 ? after : 0
      },
      //... let s = new eYo.geom.Span()
      //... chai.expect(s.u).equal(0)
      //... s.u_ = 123
      //... chai.expect(s.u).equal(123)
      //... s.u_ = -123
      //... chai.expect(s.u).equal(0)
      //>>>
    },
    c: {
      //<<< mochai: eYo.geom.Span: c
      value: 0,
      validate(after) {
        return after > 0 ? after : 0
      },
      //... let s = new eYo.geom.Span()
      //... chai.expect(s.c).equal(0)
      //... s.c_ = 123
      //... chai.expect(s.c).equal(123)
      //... s.c_ = -123
      //... chai.expect(s.c).equal(0)
      //>>>
    },
    i: {
      //<<< mochai: eYo.geom.Span: i
      value: 0,
      validate(after) {
        return after > 0 ? after : 0
      },
      //... let s = new eYo.geom.Span()
      //... chai.expect(s.i).equal(0)
      //... s.i_ = 123
      //... chai.expect(s.i).equal(123)
      //... s.i_ = -123
      //... chai.expect(s.i).equal(0)
      //>>>
    },
    x: {
      //<<< mochai: eYo.geom.Span: x
      value: 0,
      validate(after) {
        return after > 0 ? after : 0
      },
      //... let s = new eYo.geom.Span()
      //... chai.expect(s.x).equal(0)
      //... s.p_ = 123
      //... chai.expect(s.x).equal(123)
      //... s.p_ = -123
      //... chai.expect(s.x).equal(0)
      //>>>
    },
    l: {
      //<<< mochai: eYo.geom.Span: l
      value: 0,
      validate(after) {
        return after > 0 ? after : 0
      },
      //... let s = new eYo.geom.Span()
      //... chai.expect(s.l).equal(0)
      //... s.l_ = 123
      //... chai.expect(s.l).equal(123)
      //... s.l_ = -123
      //... chai.expect(s.l).equal(0)
      //>>>
    },
    /**
     * @readonly
     * @property {eYo.brick.C9rBase} brick - The owning brick
     */
    brick: {
      get () {
        return this.owner_
      },
    },
    parentSpan: {
      after: 'brick',
      get () {
        var p = this.brick.parent
        return p && p.span
      },
    },
    rightSpan: {
      after: 'brick',
      get () {
        let b3k = this.brick.right
        return b3k && b3k.span
      },
    },
    leftSpan: {
      after: 'brick',
      get () {
        let b3k = this.brick.left
        return b3k && b3k.span
      },
    },
    offset: {
      value () {
        return new eYo.geom.Point()
      },
      copy: true,
      set (stored, after) {
        stored.pSet(after)
      }
    },
    /**
     * This is the total number of columns in that brick.
     * At least two.
     * @readonly
     * @property {number} c_max - The full number of columns, regardless the extra padding
     */
    c_max: {
      after: ['u', 'c', 'i'],
      get () {
        return this.u + this.c + this.i
      },
    },
    /**
     * This is the total number of columns in that brick.
     * At least two.
     * @readonly
     * @property {number} c_max - The full number of columns
     */
    c_right: {
      after: ['u', 'c', 'i', 'x'],
      get () {
        return this.u + this.c + this.i + this.x
      },
      validate(after) {
        return after >= this.c_min ? after : this.c_min
      },
      set (after) {
        this.x_ = after - (this.u + this.c + this.i)
      }
    },
    /**
     * The minimum number of columns, read only.
     * @readonly
     * @property {number} c_min_0 - The minimum number of columns
     */
    c_min_0: {
      after: 'brick',
      get () {
        let b3k = this.brick
        return b3k.wrapped
          ? 0
          : b3k.isGroup
            ? 2 * eYo.span.INDENT + 1
            : b3k.isStmt
              ? eYo.span.INDENT + 1
              : 2
      }
    },
    /**
     * The minimum number of columns, at least `this.c_min_init`.
     * @readonly
     * @property {number} c_min - The minimum number of columns
     */
    c_min: {
      after: 'c_min_0',
      value: 0,
      set (builtin, after) {
        this.addC(after - this.c_min)
      }
    },
    /**
     * The padding at the right is used to draw the outline of compound bricks.
     * All statements in one list will have the same number of columns.
     * @property {number} c_padding - The extra padding at the right
     */
    c_padding: {
      after: ['brick', 'rightSpan', 'c_min'],
      value: 0,
      validate(after) {
        return after>=0 ? after : eYo.INVALID
      },
      set (builtin, after) {
        if (after>=0) {
          var right = this.rightSpan
          if (right) {
            // cascade to all the right statements
            right.c_padding_ = after
            builtin(0)
          } else {
            if (this.brick.isGroup && !this.brick.right) {
              this.c_min_ + after >= 2 * eYo.span.INDENT
              var min = 2 * eYo.span.INDENT - this.c_min_
              if (after < min) {
                after = min
              }
            }
            builtin(after)
          }
        }
      },
    },
    /**
     * @property {number} right  The number of right columns
     */
    right: 0,
    /**
     * The main count is the number of main lines in statements.
     * A statement has one main line in general.
     * When there is a doc string inside the statement,
     * the main line might be bigger:
     * ```
     * print('abc')
     * ```
     * has exactly one main line whereas
     * ```
     * print('''foo
     * bar''')
     * ```
     * has exactly two main lines.
     * When there is more than one main line,
     * the horizontal siblings may have header and footer counts.
     * @property {number} main - The number of main lines
     */
    main: {
      value: 1, // 1 or more
      set (builtin, after) {
        this.addMain(after - this.main)
      }
    },
    /** 
     * @property {number} header - The number of header lines
     */
    header: {
      value: 0,
      set (builtin, after) {
        this.addHeader(after - this.header_)
      }
    },
    /**
     * @property {number} footer - The number of footer lines
     */
    footer: {
      value: 0,
      set (builtin, after) {
        this.addFooter(after - this.footer)
      }
    },
    /**
     * If we have a suite, we do not have a header nor a footer.
     * It is the responsibility of the caller to verify that
     * there is no right brick, except a one line comment.
     * @property {number} suite - The number of suite lines
     */
    suite: {
      value: 0,
      set (builtin, after) {
        this.addSuite(after - this.suite)
      },
    },
    /**
     * Groups need a suite, but may not be provided with one.
     * The hole count is used to display a hole,
     * where bricks should be connected.
     * If groups have a right connected statement, they have no suite
     * hence no suite hole.
     * @readonly
     * @property {number} hole - The number of hole lines
     */
    hole: 0,
    /**
     * @property {number} foot - The number of foot lines
     */
    foot: {
      value: 0,
      set (builtin, after) {
        this.addFoot(after - this.foot)
      },
    },
  },
  methods: {
    /**
     * 
     * @param {*} s - a String we can reset with, including quotes
     */
    resetVerbatim (s, stick) { // eslint-disable-line

      //<<< mochai: resetWithString
      //>>>
    },
    /**
     * Reset the padding to 0.
     * @result {Boolean}  true iff there was a positive padding.
     */
    resetPadding () {
      if (this.c_padding > 0) {
        this.c_padding_ = 0
        return true
      }
    },
    /**
     * Reset the column counts to initial values.
     */
    resetC () {
      this.c_min__ = this.c_min_0_
      this.c_padding_ = 0
      var c = this.c_min_ + this.c_padding_
      this.addC(c - this.c_)
    },
    /**
     * Change the number of columns.
     * This may occur at initialization time, when fields are edited, when input bricks are added, removed or edited.
     * The suite bricks, if any, influence the padding.
     * @param {Number} delta  the difference from the old value to value and the old one.
     */
    addC (delta) {
      let c_min = this.c_min
      if (c_min + delta < this.c_min_0_) {
        delta = this.c_min_0_ - c_min
      }
      if (delta) {
        this.c_min__ = c_min + delta
        if (this.brick.isExpr) {
          var parent = this.parentSpan
          if (parent) {
            parent.addC(delta)
          }
        }
      }
    },
    /**
     * Change the number of lines.
     * This may occur at initialization time, when fields are edited, when input bricks are added, removed or edited.
     * The suite bricks, if any, influence the padding.
     * @param {Number} delta  the difference from the old value to value and the old one.
     */
    addL (delta) {
      if (delta) {
        this.l__ += delta
      }
    },
    /**
     * Convenient method
     * @param {Number}delta  the value to add to the ressource.
     */
    resetL () {
      this.main_ = 1
      this.header_ = this.suite_ = this.footer_ = 0
      var b = this.brick_
      this.hole_ = b.isGroup && (!b.right || b.right.isComment) ? 1 : 0
      this.l_ = b.isGroup
        ? this.main_ + this.hole_ + this.suite_
        : b.isStmt
          ? this.header_ + this.main_ + this.footer_
          : this.main_
    },
    /**
     * Add to the header line number.
     * This may happen only in 3 situation:
     * 1) the left brick changes its header line number
     * 2) The left brick changes its main line number
     * 3) the left connection changes
     * @param {Number}delta  the value to add to the ressource.
     */
    addHeader (delta) {
      if (delta) {
        this.header__ += delta
        this.l_ += delta
        // cascade to all the right statements
        var right = this.rightSpan
        right && (right.addHeader(delta))
      }
    },
    /**
     * Add to the main line number.
     * This may happen in 3 situations:
     * 1) a target brick with more than one line has been connected to
     * one of the brick input magnets.
     * 2) a line break is added inside a list (continuation lines)
     * 3) an input brick has changed its height.
     * As a consequence, the main line number of the receiver is changed
     * accordingly. This change is cascaded ot the left and the right,
     * and possibly to the head.
     * @param {Number}delta  the value to add to the ressource.
     */
    addMain (delta) {
      if (delta) {
        this.main__ += delta
        this.l_ += delta
        // propagates to the right
        var right = this.rightSpan
        if (right) {
          right.addHeader(delta)
        }
        // propagates to the left
        this.addLeft_(delta)
      }
    },
    /**
     * Convenient method
     * @param {Number}delta  the value to add to the ressource.
     */
    addLeft_ (delta) {
      var left = this.leftSpan
      if (left) {
        left.addFooter(delta)
      } else {
        this.addParent_(delta)
      }
    },
    /**
     * Convenient method
     * @param {Number}delta  the value to add to the ressource.
     */
    addParent_ (delta) {
      var parent = this.parentSpan
      if (parent) {
        this.brick.isTop
          ? parent.addSuite(delta)
          : parent.addFoot(delta)
      }
    },
    /**
     * Add to the footer line number.
     * This may happen only in 3 situation:
     * 1) the right brick changes its footer line number
     * 2) The right brick changes its main line number
     * 3) The right connection changes
     * @param {Number}delta  the value to add to the ressource.
     */
    addFooter (delta) {
      if (delta) {
        this.footer__ += delta
        this.l_ += delta
        this.addLeft_(delta)
      }
    },
    /**
     * Add to the foot line number.
     * This may happen only in on of 2 situation:
     * 1) the suite magnet connection status changes
     * 2) the right magnet connection status changes
     * @param {Number}delta  the value to add to the ressource.
     * Actually it can only be 1 or -1.
     */
    addFoot (delta) {
      if (delta) {
        this.foot__ += delta
        this.addParent_(delta)
      }
    },
    /**
     * Add to the suite line number.
     * @param {Number}delta  the value to add to the ressource.
     * Actually it can only be 1 or -1.
     */
    addSuite (delta) {
      var b = this.brick
      if (delta && b.isGroup) {
        this.suite__ += delta
        if (this.suite_) {
          if (this.hole_) {
            delta -= this.hole_
            this.hole_ = 0
          }
        } else {
          var r = b.right
          if (!r || r.isComment) {
            this.hole_ = 1
            delta += this.hole_
          }
        }
        this.l_ += delta
        this.addParent_(delta)
      }
    },
    /**
     * Convenient method
     * @param {Object}delta  the value to add to the ressource.
     */
    reset (where) { // eslint-disable-line
      console.error('WHAT IS THE PURPOSE ?')
    },
  },
  //>>>
})
