(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04ae0ab8"],{5176:function(e,t,a){e.exports=a("51b6")},"51b6":function(e,t,a){a("a3c3"),e.exports=a("584a").Object.assign},9306:function(e,t,a){"use strict";var r=a("c3a1"),s=a("9aa9"),i=a("355d"),n=a("241e"),l=a("335c"),o=Object.assign;e.exports=!o||a("294c")(function(){var e={},t={},a=Symbol(),r="abcdefghijklmnopqrst";return e[a]=7,r.split("").forEach(function(e){t[e]=e}),7!=o({},e)[a]||Object.keys(o({},t)).join("")!=r})?function(e,t){var a=n(e),o=arguments.length,d=1,c=s.f,u=i.f;while(o>d){var m,v=l(arguments[d++]),f=c?r(v).concat(c(v)):r(v),h=f.length,b=0;while(h>b)u.call(v,m=f[b++])&&(a[m]=v[m])}return a}:o},"98dd":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-toolbar",{attrs:{flat:""}},[a("v-toolbar-title",[e._v("Usuarios")]),a("v-divider",{staticClass:"mx-2",attrs:{inset:"",vertical:""}}),a("v-spacer"),a("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-btn",{staticClass:"mb-2",attrs:{slot:"activator",color:"primary"},slot:"activator"},[e._v("Agrega un nuevo Usuario")]),a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[e._v(e._s(e.editedItem.firstName?e.editedItem.firstName:e.formTitle))])]),a("v-card-text",[a("v-container",{attrs:{"grid-list-md":""}},[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{attrs:{xs12:"",sm6:"",md4:""}},[a("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{"error-messages":e.errors.collect("username"),"data-vv-name":"username",label:"Nombre de usuario"},model:{value:e.editedItem.username,callback:function(t){e.$set(e.editedItem,"username",t)},expression:"editedItem.username"}})],1),a("v-flex",{attrs:{xs12:"",sm6:"",md4:""}},[a("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],attrs:{"error-messages":e.errors.collect("email"),"data-vv-name":"email",type:"email",label:"Email"},model:{value:e.editedItem.email,callback:function(t){e.$set(e.editedItem,"email",t)},expression:"editedItem.email"}})],1),a("v-flex",{attrs:{xs12:"",sm6:"",md4:""}},[-1===e.editedIndex?a("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{"error-messages":e.errors.collect("password"),"data-vv-name":"password",type:"password",label:"Contraseña"},model:{value:e.editedItem.password,callback:function(t){e.$set(e.editedItem,"password",t)},expression:"editedItem.password"}}):e._e()],1),a("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[e.editedIndex>-1?a("v-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{items:e.rolesSelected,"item-text":"text","item-value":"value",label:"Escoga un Rol","data-vv-name":"select","error-messages":e.errors.collect("select"),required:""},model:{value:e.editedItem.role._id,callback:function(t){e.$set(e.editedItem.role,"_id",t)},expression:"editedItem.role._id"}}):e._e()],1),e.editedIndex>-1?a("v-checkbox",{attrs:{label:"¿Bloquear? "},model:{value:e.editedItem.blocked,callback:function(t){e.$set(e.editedItem,"blocked",t)},expression:"editedItem.blocked"}}):e._e()],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:e.close}},[e._v("Cancelar")]),a("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:e.save}},[e._v("Guardar")])],1)],1)],1)],1),a("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.users},scopedSlots:e._u([{key:"items",fn:function(t){return[a("td",{staticClass:"text-sm-center subheading"},[e._v(e._s(t.item.username))]),a("td",{staticClass:"text-sm-center subheading"},[e._v(e._s(t.item.role?t.item.role.name:"No tiene rol")+"\n            ")]),a("td",{staticClass:"justify-center layout px-0"},[a("v-btn",{attrs:{flat:"",icon:"",color:"blue lighten-2"}},[a("v-icon",{attrs:{medium:""},on:{click:function(a){return e.editItem(t.item)}}},[e._v("\n                        edit\n                    ")])],1),a("v-btn",{attrs:{flat:"",icon:"",color:"red darken-2"}},[a("v-icon",{attrs:{medium:""},on:{click:function(a){return e.deleteItem(t.item)}}},[e._v("\n                        delete\n                    ")])],1)],1)]}}])},[a("template",{slot:"no-data"},[a("h2",[e._v(" No hay datos disponibles")])])],2),a("v-toolbar",{attrs:{flat:""}},[a("v-toolbar-title",[e._v("Roles Diponibles")]),a("v-divider",{staticClass:"mx-2",attrs:{inset:"",vertical:""}}),a("v-spacer")],1),a("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headersRoles,items:e.roles},scopedSlots:e._u([{key:"items",fn:function(t){return[a("td",{staticClass:"text-sm-center subheading"},[e._v(e._s(t.item.name))]),a("td",{staticClass:"text-sm-center subheading"},[e._v(e._s(t.item.description)+"\n            ")])]}}])},[a("template",{slot:"no-data"},[a("h2",[e._v(" No hay datos disponibles")])])],2)],1)},s=[],i=a("5176"),n=a.n(i),l=(a("7f7f"),a("96cf"),a("3b8d")),o=a("d225"),d=a("b0b4"),c=a("308d"),u=a("6bb5"),m=a("4e2b"),v=(a("cadf"),a("551c"),a("f751"),a("097d"),a("9ab4")),f=a("60a3"),h=a("7c41"),b=a("1175"),p=function(e){function t(){var e;return Object(o["a"])(this,t),e=Object(c["a"])(this,Object(u["a"])(t).apply(this,arguments)),e.users=[],e.dialog=!1,e.headers=[{text:"Nombre de Usuario",class:"subheading",value:"username"},{text:"Tipo de usuario",class:"subheading",value:"role",sortable:!1},{text:"Actions",class:"subheading",value:"actions",sortable:!1}],e.headersRoles=[{text:"Nombre del Rol",class:"subheading",value:"name"},{text:"Descripción",class:"subheading",value:"description",sortable:!1}],e.dictionary={attributes:{email:"E-mail Address"},custom:{name:{required:function(){return"Name can not be empty"},max:"The name field may not be greater than 10 characters"},select:{required:"Select field is required"}}},e.editedIndex=-1,e.editedItem={_id:"",confirmed:!0,blocked:!1,username:"",email:"",provider:"local",role:{_id:""}},e.defaultItem={_id:"",confirmed:!0,blocked:!1,username:"",email:"",provider:"local",role:{_id:""}},e.roles=[],e.rolesSelected=[],e}return Object(m["a"])(t,e),Object(d["a"])(t,[{key:"dialogWatch",value:function(e){e||this.close()}},{key:"fetchRoles",value:function(){var e=Object(l["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,h["a"].Strapi.axios.get("/users-permissions/roles");case 2:t=e.sent,this.rolesSelected=t.data.roles.map(function(e){return{text:"".concat(e.name),value:e.id}}),this.roles=t.data.roles;case 5:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"mounted",value:function(){var e=Object(l["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.fetchRoles();case 2:return e.next=4,this.fetchUsers();case 4:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"editItem",value:function(e){this.editedIndex=this.users.indexOf(e),this.editedItem=n()({},e),this.dialog=!0}},{key:"deleteItem",value:function(){var e=Object(l["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(b["a"].user._id===t._id){e.next=9;break}if(e.t0=confirm("Está seguro de querer eliminar el usuario?"),!e.t0){e.next=5;break}return e.next=5,h["a"].Strapi.axios.delete("/users/".concat(t._id));case 5:return e.next=7,this.fetchUsers();case 7:e.next=10;break;case 9:alert("No puede eliminar su usuario");case 10:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"close",value:function(){var e=this;this.dialog=!1,setTimeout(function(){e.editedItem=n()({},e.defaultItem),e.editedIndex=-1},300)}},{key:"save",value:function(){var e=Object(l["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$validator.validateAll();case 2:if(t=e.sent,!t){e.next=18;break}if(!(this.editedIndex>-1)){e.next=12;break}return e.next=7,h["a"].Strapi.axios.put("/users/".concat(this.editedItem._id),{email:this.editedItem.email,username:this.editedItem.username,blocked:this.editedItem.blocked,confirmed:this.editedItem.confirmed,provider:this.editedItem.provider,role:this.editedItem.role._id});case 7:return e.sent,e.next=10,this.fetchUsers();case 10:e.next=17;break;case 12:return e.next=14,h["a"].Strapi.axios.post("/auth/local/register",{email:this.editedItem.email,username:this.editedItem.username,password:this.editedItem.password});case 14:return e.sent,e.next=17,this.fetchUsers();case 17:this.close();case 18:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"fetchUsers",value:function(){var e=Object(l["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,h["a"].Strapi.axios.get("/users");case 2:t=e.sent,this.users=t.data;case 4:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"formTitle",get:function(){return-1===this.editedIndex?"Nuevo Usuario":"Editar Usuario"}}]),t}(f["b"]);v["a"]([Object(f["c"])("dialog")],p.prototype,"dialogWatch",null),p=v["a"]([Object(f["a"])({$_veeValidate:{validator:"new"}})],p);var x=p,g=x,k=a("2877"),I=Object(k["a"])(g,r,s,!1,null,"c96af1f4",null);t["default"]=I.exports},a3c3:function(e,t,a){var r=a("63b6");r(r.S+r.F,"Object",{assign:a("9306")})}}]);
//# sourceMappingURL=chunk-04ae0ab8.7b576dbf.js.map