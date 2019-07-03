function objectToAST(object, babel) {
  const stringified = stringify(object);
  const variableDeclarationNode = babel.template(`var x = ${stringified}`, {
    preserveComments: true,
    placeholderPattern: false,
    sourceType: 'module',
  })();
  return variableDeclarationNode.declarations[0].init;
}

function stringify(object) {
  let str = JSON.stringify(object, stringifyReplacer);
  if (str === undefined) {
    str = 'undefined';
  }
  return str.replace(
    /"__FUNCTION_START__(.*?)__FUNCTION_END__"/g,
    functionReplacer
  );
  function stringifyReplacer(key, value) {
    if (typeof value === 'function') {
      return `__FUNCTION_START__${value.toString()}__FUNCTION_END__`;
    }
    return value;
  }
  function functionReplacer(match, p1) {
    return p1.replace(/\\"/g, '"').replace(/\\n/g, '\n');
  }
}

function createClassPropAST(classes, babel, styles) {
  if (!classes || !classes.length) {
    throw new Error('Passed arguments are invalid');
  }
  let classArray = classes.trim().split(' ');

  let mappedClassArray = classArray
    .filter(item => styles[item])
    .map(function(item) {
      return styles[item];
    });

  if (!mappedClassArray.length) {
    return null;
  }

  if (mappedClassArray.length === 1) {
    return objectToAST(mappedClassArray[0], babel);
  }
  return objectToAST(mappedClassArray, babel);
}

function createClassPropLogicalExpressionAST(
  classes,
  expression,
  babel,
  t,
  styles
) {
  return t.logicalExpression(
    '&&',
    expression,
    createClassPropAST(classes, babel, styles)
  );
}

module.exports = {
  objectToAST,
  createClassPropAST,
  createClassPropLogicalExpressionAST,
};
