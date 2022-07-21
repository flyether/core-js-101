/* eslint-disable max-len */
/* eslint-disable prefer-template */
/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  const obj = {
    width,
    height,
    getArea() {
      return this.width * this.height;
    },
  };
  return obj;
}

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  return Object.assign(Object.create(proto), JSON.parse(json));
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */
class ElementSelector {
  constructor() {
    this.string = '';
    this.elementT = '';
    this.idT = '';
    this.classT = '';
    this.pseudoElementT = '';
    this.pseudoClassT = '';
    this.attrT = '';
  }

  element(value) {
    if (this.elementT) { throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector'); } else { this.elementT = `${value}`; return this; }
  }

  id(value) {
    if (this.idT) { throw new Error('Id should not occur more then one time inside the selector'); } else { this.idT = `#${value}`; return this; }
  }

  class(value) {
    this.classT += `.${value}`;
    return this;
  }

  attr(value) {
    this.attrT += `[${value}]`;
    return this;
  }

  pseudoClass(value) {
    this.pseudoClassT += `:${value}`;
    return this;
  }

  pseudoElement(value) {
    if (this.pseudoElementT) { throw new Error('Pseudo-element should not occur more then one time inside the selector'); } else { this.pseudoElementT += `::${value}`; return this; }
  }

  // eslint-disable-next-line class-methods-use-this
  combine(selector1, combinator, selector2) {
    // const obj = {
    //   selector1Q: selector1,
    //   combinatorQ: combinator,
    //   selector2Q: selector2,
    //   com(selector1Q, combinatorQ, selector2Q) { return selector1Q + combinatorQ + selector2Q; },
    // };
    // return obj.com;
    this.string = `${selector1.string} ${combinator} ${selector2.string}`;
    return this;
  }

  stringify() {
    if (this.elementT || this.idT || this.classT || this.attrT || this.pseudoClassT || this.pseudoElementT) { this.string = this.elementT + this.idT + this.classT + this.attrT + this.pseudoClassT + this.pseudoElementT; } else { this.string = ''; }
    return this.string;
  }
}

const cssSelectorBuilder = {
  element(value) {
    const el = new ElementSelector();
    return el.element(value);
  },

  id(value) {
    const el = new ElementSelector();
    return el.id(value);
  },

  class(value) {
    const el = new ElementSelector();
    return el.class(value);
  },

  attr(value) {
    const el = new ElementSelector();
    return el.attr(value);
  },

  pseudoClass(value) {
    const el = new ElementSelector();
    return el.pseudoClass(value);
  },

  pseudoElement(value) {
    const el = new ElementSelector();
    return el.pseudoElement(value);
  },

  combine(selector1, combinator, selector2) {
    const el = new ElementSelector();
    return el.combine(selector1, combinator, selector2);
  },
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
