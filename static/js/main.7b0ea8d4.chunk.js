(this["webpackJsonpreact-threejs"]=this["webpackJsonpreact-threejs"]||[]).push([[0],{20:function(e,t,n){},21:function(e,t,n){},22:function(e,t,n){},24:function(e,t,n){},26:function(e,t,n){"use strict";n.r(t);var i=n(9),o=n.n(i),a=n(13),r=n.n(a),c=(n(20),n(0)),s=n(1),l=n(2),d=n(3),u=n.p+"static/media/logo.6ce24c58.svg",h=(n(21),n(22),n(8)),j=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){return Object(h.jsxs)("div",{className:"Title",children:[Object(h.jsx)("h1",{children:"React and ThreeJS"}),Object(h.jsx)("p",{children:this.props.subtitle})]})}}]),n}(i.Component),b=n(4),p=n(14),w=n(15),m=(n(24),n.p+"static/media/sky_bg.381dc4c1.jpg"),f=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(c.a)(this,n);for(var i=arguments.length,o=new Array(i),a=0;a<i;a++)o[a]=arguments[a];return(e=t.call.apply(t,[this].concat(o))).mount=null,e.whaleMesh=null,e}return Object(s.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=new b.tb;t.setSize(window.innerWidth,window.innerHeight),t.setPixelRatio(window.devicePixelRatio),this.mount&&this.mount.appendChild(t.domElement);var n=new b.eb,i=new b.U(75,window.innerWidth/window.innerHeight,.1,1e3);i.position.setZ(30),i.position.setX(-3),t.render(n,i);var o=new b.nb(10,3,16,100),a=new b.M({color:16737095}),r=new b.J(o,a);n.add(r);var c=new b.V(16777215);c.position.set(5,5,5);var s=new b.a(16777215);n.add(c,s);var l=new b.W(c),d=new b.o(200,50);n.add(l,d),(new p.a).load("/react-threejs/models/bluewhale_edited.glb",(function(t){e.whaleMesh=t.scene,n.add(e.whaleMesh)}),void 0,(function(e){console.log("That's a whale of an error!"),console.log(e)}));var u=new w.a(i,t.domElement),h=(new b.mb).load(m);n.background=h;!function o(){requestAnimationFrame(o),r.rotation.x+=.01,r.rotation.y+=.005,r.rotation.z+=.01,e.whaleMesh&&(e.whaleMesh.rotation.z+=.01),t.render(n,i),u.update()}()}},{key:"render",value:function(){var e=this;return Object(h.jsx)("div",{ref:function(t){return e.mount=t}})}}]),n}(i.Component),v=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){return Object(h.jsxs)("div",{className:"App",children:[Object(h.jsx)(f,{}),Object(h.jsx)(j,{subtitle:"Subtitle from props"}),Object(h.jsxs)("header",{className:"App-header",children:[Object(h.jsx)("img",{src:u,className:"App-logo",alt:"logo"}),Object(h.jsx)("p",{children:"This is some body text."})]})]})}}]),n}(i.Component),O=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,27)).then((function(t){var n=t.getCLS,i=t.getFID,o=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),i(e),o(e),a(e),r(e)}))};r.a.render(Object(h.jsx)(o.a.StrictMode,{children:Object(h.jsx)(v,{})}),document.getElementById("root")),O()}},[[26,1,2]]]);
//# sourceMappingURL=main.7b0ea8d4.chunk.js.map