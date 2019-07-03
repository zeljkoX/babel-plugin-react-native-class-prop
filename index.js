const syntax = require('@babel/plugin-syntax-jsx').default;
const {
  createClassPropAST,
  createClassPropLogicalExpressionAST,
} = require('./utils');

const REACT_NATIVE_STYLE_PROP = 'style';

const EVALUATE_CLASS = 'evaluateClass';

module.exports = function(babel, { propName = 'class', classes }) {
  const { types: t } = babel;
  if (!classes) {
    throw new Error(
      '"babel-plugin-react-native-class-prop": required argument "classes" is missing.'
    );
  }

  return {
    inherits: syntax,
    visitor: {
      JSXAttribute(path) {
        if (
          path.node &&
          path.node.name &&
          path.node.name.name &&
          path.node.name.name !== propName
        ) {
          // Don't do anything if we didn't find an attribute named 'class'
          return;
        }
        const elem = path.parentPath;

        elem.node.attributes = elem.node.attributes.filter(
          attr => attr !== path.node
        );
        const stylePropAST = elem.node.attributes.find(attr => {
          return (
            attr.name &&
            attr.name.name &&
            attr.name.name === REACT_NATIVE_STYLE_PROP
          );
        });
        let classPropAST;
        if (t.isLiteral(path.node.value)) {
          classPropAST = createClassPropAST(
            path.node.value.value,
            babel,
            classes
          );
        }

        if (
          t.isJSXExpressionContainer(path.node.value) &&
          t.isArrayExpression(path.node.value.expression)
        ) {
          let values = [];
          path.node.value.expression.elements.forEach(item => {
            if (t.isStringLiteral(item)) {
              values.push(createClassPropAST(item.value, babel, classes));
            }

            if (t.isObjectExpression(item)) {
              item.properties.forEach(i => {
                values.push(
                  createClassPropLogicalExpressionAST(
                    i.key.value,
                    i.value,
                    babel,
                    t,
                    classes
                  )
                );
              });
            }
          });
          classPropAST = t.arrayExpression(values);
        }

        if (!classPropAST) {
          return;
        }

        // style prop is not defined
        if (!stylePropAST) {
          elem.node.attributes.push(
            t.jSXAttribute(
              t.jSXIdentifier(REACT_NATIVE_STYLE_PROP),
              t.jSXExpressionContainer(classPropAST)
            )
          );
          return;
        }

        let result = t.ArrayExpression();

        if (t.isArrayExpression(stylePropAST.value.expression)) {
          result.elements = result.elements.concat(
            stylePropAST.value.expression.elements
          );
        } else {
          result.elements.push(stylePropAST.value.expression);
        }

        if (t.isArrayExpression(classPropAST)) {
          result.elements = result.elements.concat(classPropAST.elements);
        } else {
          result.elements.push(classPropAST);
        }
        stylePropAST.value.expression = result;
      },
      ImportDeclaration(path, state) {
        if (
          !t.isLiteral(path.node.source, {
            value: 'babel-plugin-react-native-class-prop',
          }) ||
          !(path.node.specifiers[0].local.name === EVALUATE_CLASS)
        ) {
          return;
        }
        const program = path.findParent(t.isProgram);
        const evaluateVisitor = {
          JSXExpressionContainer(path) {
            if (
              !t.isJSXExpressionContainer(path.node) ||
              !t.isCallExpression(path.node.expression) ||
              !t.isIdentifier(path.node.expression.callee, {
                name: EVALUATE_CLASS,
              })
            ) {
              return;
            }
            const classNames = path.node.expression.arguments[0].value;
            path.node.expression = createClassPropAST(
              classNames,
              babel,
              classes
            );
          },
        };
        program.traverse(evaluateVisitor, { state });
      },
    },
  };
};

module.exports['EVALUATE_CLASS'] = () => {};
