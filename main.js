(function(){
var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return[].slice.call((c||document).querySelectorAll(s))};
var K='hph_sel';
function get(){try{return JSON.parse(sessionStorage.getItem(K))||[]}catch(e){return[]}}
function put(a){try{sessionStorage.setItem(K,JSON.stringify(a))}catch(e){}paint()}
var form=$('#enq-form'),bar=$('.selbar');
function paint(){
 var a=get();
 $$('.enq').forEach(function(b){var on=a.indexOf(b.dataset.product)>-1;b.classList.toggle('on',on);b.textContent=on?'Added \u2713':'Add to enquiry';b.setAttribute('aria-pressed',on)});
 if(bar){$('.n',bar).textContent=a.length;bar.hidden=!a.length||!!form}
}
// nav
var nav=$('.nav'),bg=$('.burger');
if(bg)bg.addEventListener('click',function(){var o=nav.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
// filter
$$('.filters button').forEach(function(b){b.addEventListener('click',function(){
 $$('.filters button').forEach(function(x){x.classList.remove('on')});b.classList.add('on');
 var f=b.dataset.f;$$('.card').forEach(function(c){c.hidden=!(f==='all'||c.dataset.cat.split(' ').indexOf(f)>-1)});
})});
// add / remove products
$$('.enq').forEach(function(b){b.addEventListener('click',function(){
 var a=get(),i=a.indexOf(b.dataset.product);i>-1?a.splice(i,1):a.push(b.dataset.product);put(a);
})});
paint();
// enquiry form
if(form){
 var boxes=$$('input[name="product[]"]',form),a=get();
 boxes.forEach(function(c){c.checked=a.indexOf(c.value)>-1;c.addEventListener('change',function(){put(boxes.filter(function(x){return x.checked}).map(function(x){return x.value}))})});
 form.addEventListener('submit',function(e){
  e.preventDefault();
  var st=$('.status',form),d=new FormData(form),v=function(k){return(d.get(k)||'').toString().trim()},prods=d.getAll('product[]');
  if(!prods.length){st.textContent='Please choose at least one product.';return}
  var lines=['Hello Harsh Plastic House, I would like to enquire about your products.','','Name: '+v('name'),'Phone: '+v('phone'),'City: '+v('city'),'Products:'].concat(prods.map(function(p){return'- '+p}),['Quantity: '+v('qty')]);
  if(v('message'))lines.push('Message: '+v('message'));
  var url='https://wa.me/'+HPH.wa+'?text='+encodeURIComponent(lines.join('\n'));
  st.innerHTML='Opening WhatsApp. If nothing happens, <a href="'+url+'" target="_blank" rel="noopener">tap here to send your enquiry</a>.';
  d.append('action','hph_enquiry');
  var done=false,once=function(){if(!done){done=true;try{sessionStorage.removeItem(K)}catch(x){}window.location.href=url}};
  once()
  setTimeout(once,1500);
 });
}
})();
