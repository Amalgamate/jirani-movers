/* Optional local diagnostics. Counts are stored in this browser only and are not shared. */
(function(){
  var KEY='jirani_site_metrics_v1';
  function read(){
    try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return {}}
  }
  function write(data){
    try{localStorage.setItem(KEY,JSON.stringify(data))}catch(e){}
  }
  function dayKey(){return new Date().toISOString().slice(0,10)}
  function increment(name){
    var data=read(), day=dayKey();
    data[day]=data[day]||{};
    data[day][name]=(data[day][name]||0)+1;
    write(data);
  }
  window.siteMetrics=function(name){increment(name)};
  var today=dayKey(), seen='jirani_visit_'+today;
  try{if(!sessionStorage.getItem(seen)){increment('visits');sessionStorage.setItem(seen,'1')}}catch(e){increment('visits')}
  document.addEventListener('click',function(event){
    var link=event.target.closest&&event.target.closest('a[href]');
    if(!link)return;
    var href=link.getAttribute('href')||'';
    if(/^tel:/i.test(href))increment('phone_clicks');
    else if(/wa\.me|whatsapp\.com/i.test(href))increment('whatsapp_clicks');
    else if(/moving-checklist\.html/i.test(href))increment('checklist_clicks');
  });
  window.getJiraniMetrics=function(){return read()};
})();
