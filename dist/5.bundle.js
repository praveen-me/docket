(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{93:function(n,t,e){"use strict";e.r(t);var o=e(81),v=e.n(o),a=e(78),g=e.n(a),h=e(0),y=e.n(h),r=e(37),j=e(52),E=e(38),d=e(77),u=e.n(d),c=e(51);function i(){var n=u()(["\n  mutation ToggleTodoDone($input: ToggleTodoDoneInput!) {\n    toggleTodoDone(input: $input) {\n      ...TodoFragment\n    }\n  }\n  ","\n"]);return i=function(){return n},n}function l(){var n=u()(["\n  mutation DeleteTodo($id: ID!) {\n    deleteTodo(id: $id) {\n      isDeleted\n      _id\n    }\n  }\n"]);return l=function(){return n},n}function s(){var n=u()(["\n  mutation AddTodo($input: String!) {\n    addTodo(input: $input) {\n      ...TodoFragment\n    }\n  }\n  ","\n"]);return s=function(){return n},n}function m(){var n=u()(["\n  fragment TodoFragment on Todo {\n    todo\n    done\n    _id\n  }\n"]);return m=function(){return n},n}var f=Object(c.a)(m()),O=Object(c.a)(s(),f),w=Object(c.a)(l()),_=Object(c.a)(i(),f);function p(){var n=u()(["\n  query GetAllTodos {\n    todos {\n      todo\n      done\n      _id\n    }\n  }\n"]);return p=function(){return n},n}var k=Object(c.a)(p());t.default=Object(r.b)(function(n){return{currentUser:n.currentUser,currentTodos:n.currentTodos}})(function(){function n(n){var t=n.target.parentElement;f({variables:{id:t.id}})}var t=Object(h.useState)(""),e=g()(t,2),o=e[0],a=e[1],r=Object(j.b)(k),d=r.data,u=r.loading,c=Object(j.a)(O,{update:function(n,t){var e=t.data.addTodo,o=n.readQuery({query:k}).todos;n.writeQuery({query:k,data:{todos:[].concat(v()(o),[e])}})}}),i=g()(c,2),l=i[0],s=i[1],m=(s.error,s.data,Object(j.a)(w,{update:function(n,t){var e=t.data.deleteTodo,o=n.readQuery({query:k}).todos;e._id&&n.writeQuery({query:k,data:{todos:o.filter(function(n){return n._id!==e._id})}})}})),f=g()(m,1)[0],p=Object(j.a)(_),b=g()(p,1)[0],T=Object(h.useRef)("");return y.a.createElement("main",{className:"wrapper"},y.a.createElement("h2",{className:"center todo_form-head"},"Add Your Todo"),y.a.createElement("form",{onSubmit:function(n){n.preventDefault(),l({variables:{input:o}})},className:"todo-form"},y.a.createElement("input",{type:"text",name:"",id:"todoVal",onChange:function(n){var t=n.target.value;a(t)}}),y.a.createElement("button",{type:"submit"},"Add Todo")),u?y.a.createElement(E.a,null):d.todos&&d.todos.map(function(t){return y.a.createElement("div",{className:"todo-block",id:t._id,key:t._id,style:{background:(T.current="rgb(".concat(Math.floor(240*Math.random()),",").concat(Math.floor(240*Math.random()),",").concat(Math.floor(240*Math.random()),")"),T.current),boxShadow:"0px 1px 11px 3px ".concat(T.currentTodos)}},y.a.createElement("input",{type:"checkbox",className:"todo_done",onChange:function(n){return function(n,t){var e=n.target.parentElement;b({variables:{input:{id:e.id,lastValue:t}}})}(n,t.done)},checked:t.done}),y.a.createElement("p",{className:"todo-name"},t.todo),y.a.createElement("button",{className:"todo-delete",onClick:n},"x"))}))})}}]);