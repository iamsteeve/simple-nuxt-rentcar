(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-796bfc6c"],{"1f64":function(t,s,a){},f4a9:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("section",{staticClass:"clientes"},[a("v-content",[a("v-container",{attrs:{fluid:"","grid-list-md":"","text-xs-center":""}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs12:""}},[a("h1",{staticStyle:{"padding-bottom":".5em"}},[t._v("\n            Estadísticas actuales\n          ")]),a("h3",{staticStyle:{"padding-bottom":"1em"}},[t._v("\n            Bienvenido "+t._s(t.username)+"\n          ")])]),a("v-flex",{attrs:{xs12:"",sm6:"",md4:""}},[a("v-card",{staticClass:"white--text",attrs:{color:"teal"}},[a("v-layout",[a("v-flex",{attrs:{xs4:""}},[a("v-icon",{staticStyle:{"font-size":"90px"},attrs:{color:"white"}},[t._v("person")])],1),a("v-flex",{attrs:{xs8:""}},[a("v-card-title",{attrs:{"primary-title":""}},[a("div",[a("div",{staticClass:"title"},[t._v("Clientes")]),a("div",{staticClass:"headline"},[t._v(t._s(t.stats.totalCustomers))])])])],1)],1),a("v-divider",{attrs:{light:""}}),a("v-card-actions",[a("v-spacer"),t._v("\n              Ir a Clientes\n              "),a("v-btn",{attrs:{router:"",to:"/customers",flat:"",icon:""}},[a("v-icon",[t._v("directions")])],1)],1)],1)],1),a("v-flex",{attrs:{xs12:"",sm6:"",md4:""}},[a("v-card",{staticClass:"white--text",attrs:{color:"green darken-3"}},[a("v-layout",[a("v-flex",{attrs:{xs4:""}},[a("v-icon",{staticStyle:{"font-size":"90px"}},[t._v("person_add")])],1),a("v-flex",{attrs:{xs8:""}},[a("v-card-title",{attrs:{"primary-title":""}},[a("div",[a("div",{staticClass:"title"},[t._v("Ventas")]),a("div",{staticClass:"headline"},[t._v(t._s(t.stats.totalSales))])])])],1)],1),a("v-card-actions",[a("v-spacer"),t._v("\n              Ir a Ventas\n              "),a("v-btn",{attrs:{router:"",to:"/sales",flat:"",icon:""}},[a("v-icon",[t._v("directions")])],1)],1)],1)],1),a("v-flex",{attrs:{xs12:"",sm6:"",md4:""}},[a("v-card",{staticClass:"white--text",attrs:{color:"orange darken-1"}},[a("v-layout",[a("v-flex",{attrs:{xs4:""}},[a("v-icon",{staticStyle:{"font-size":"90px"},attrs:{color:"white"}},[t._v("payment")])],1),a("v-flex",{attrs:{xs8:""}},[a("v-card-title",{attrs:{"primary-title":""}},[a("div",[a("div",{staticClass:"title"},[t._v("Reservaciones")]),a("div",{staticClass:"headline"},[t._v(t._s(t.stats.totalReservations))])])])],1)],1),a("v-card-actions",[a("v-spacer"),t._v("\n              Ir a Reservaciones\n              "),a("v-btn",{attrs:{router:"",to:"/reservations",flat:"",icon:""}},[a("v-icon",[t._v("directions")])],1)],1)],1)],1)],1)],1)],1)],1)},r=[],i=(a("96cf"),a("3b8d")),n=a("d225"),c=a("b0b4"),o=a("308d"),l=a("6bb5"),v=a("4e2b"),d=(a("cadf"),a("551c"),a("f751"),a("097d"),a("9ab4")),u=a("60a3"),f=a("7c41"),x=a("1175"),p=function(t){function s(){var t;return Object(n["a"])(this,s),t=Object(o["a"])(this,Object(l["a"])(s).apply(this,arguments)),t.stats={totalCustomers:0,totalReservations:2,totalSales:3},t.username=x["a"].user.username,t}return Object(v["a"])(s,t),Object(c["a"])(s,[{key:"mounted",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var s,a,e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,f["a"].Strapi.axios.get("/customers/count");case 2:return s=t.sent,this.stats.totalCustomers=s.data,t.next=6,f["a"].Strapi.axios.get("/reservations/count");case 6:return a=t.sent,this.stats.totalReservations=a.data,t.next=10,f["a"].Strapi.axios.get("/sales/count");case 10:e=t.sent,this.stats.totalSales=e.data;case 12:case"end":return t.stop()}},t,this)}));function s(){return t.apply(this,arguments)}return s}()}]),s}(u["b"]);p=d["a"]([u["a"]],p);var m=p,b=m,h=(a("f507"),a("2877")),_=Object(h["a"])(b,e,r,!1,null,"e7e746ba",null);s["default"]=_.exports},f507:function(t,s,a){"use strict";var e=a("1f64"),r=a.n(e);r.a}}]);
//# sourceMappingURL=chunk-796bfc6c.f2d6d700.js.map