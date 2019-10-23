import React, {Component} from 'react';


/**
 *  Context示例，用于全局变量设置，父组件中用Provider包裹，子组件用Consumer取值。一般用于主题设置。
 * @type {React.Context<any>}
 */
export const ThemeContext = React.createContext();

function Context() {
  return (
    <ThemeContext.Provider value={{a: 1, b: 2, c: 3,}}>
      <Child/>
    </ThemeContext.Provider>
  )
}

function Child() {
  return (
    <div>
      子组件
      <Leaf/>
    </div>
  )
}

function Leaf(props) {
  return (
    <div>
      孙组件
      <ThemeContext.Consumer>
        {
          context => {
            console.log("测试Context：", context)
          }
        }
      </ThemeContext.Consumer>
    </div>
  )
}

/**
 * Context示例
 * @type {function(): *}
 */





export const Test = Context;
